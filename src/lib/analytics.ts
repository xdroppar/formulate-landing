/**
 * Analytics helper — fans an event out to:
 *   1. Vercel Web Analytics custom events (for the dashboard)
 *   2. Our own formulate-api /events endpoint (for funnel/cohort queries)
 *
 * Also owns first-touch attribution: on a visitor's first arrival we capture
 * utm_* / gclid / fbclid / referrer into localStorage and then auto-attach
 * that attribution to every subsequent event. First-touch semantics means we
 * never overwrite — whichever source first brought the user is what sticks.
 *
 * Landing is unauthenticated, so every call is anonymous. All calls are
 * fire-and-forget; we never block user interactions on analytics.
 */

import { track as vercelTrack } from "@vercel/analytics";
import { phCapture } from "@/lib/posthog";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://formulate-api.onrender.com";

const SOURCE = "landing" as const;
const ANON_ID_KEY = "formulate.anon_id";
const ATTRIBUTION_KEY = "formulate.first_touch";

interface FirstTouch {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landing_path?: string;
  captured_at?: string;
}

export function getAnonId(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    let id = window.localStorage.getItem(ANON_ID_KEY);
    if (!id) {
      id = Array.from(crypto.getRandomValues(new Uint8Array(16)))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      window.localStorage.setItem(ANON_ID_KEY, id);
    }
    return id;
  } catch {
    return undefined;
  }
}

function readFirstTouch(): FirstTouch | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as FirstTouch) : null;
  } catch {
    return null;
  }
}

/**
 * Capture first-touch attribution from the current URL + referrer. Idempotent.
 * Returns `true` if this call actually captured attribution.
 */
export function captureFirstTouch(): boolean {
  if (typeof window === "undefined") return false;

  try {
    if (readFirstTouch()) return false;

    const params = new URLSearchParams(window.location.search);
    const referrer = document.referrer || "";
    const sameOrigin =
      referrer && new URL(referrer).host === window.location.host;

    let source = params.get("utm_source") || undefined;
    if (!source) {
      if (params.get("gclid")) source = "google_ads";
      else if (params.get("fbclid")) source = "facebook_ads";
      else if (referrer && !sameOrigin) {
        try {
          source = `referral:${new URL(referrer).host}`;
        } catch {
          source = "referral";
        }
      } else if (!referrer) {
        source = "direct";
      }
    }

    const payload: FirstTouch = {
      source,
      medium: params.get("utm_medium") || undefined,
      campaign: params.get("utm_campaign") || undefined,
      content: params.get("utm_content") || undefined,
      term: params.get("utm_term") || undefined,
      gclid: params.get("gclid") || undefined,
      fbclid: params.get("fbclid") || undefined,
      referrer: !sameOrigin ? referrer || undefined : undefined,
      landing_path: window.location.pathname || undefined,
      captured_at: new Date().toISOString(),
    };

    const clean: FirstTouch = {};
    for (const [k, v] of Object.entries(payload)) {
      if (v !== undefined && v !== null && v !== "") {
        (clean as Record<string, string>)[k] = v;
      }
    }

    window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(clean));
    return true;
  } catch {
    return false;
  }
}

type PropValue = string | number | boolean | null;
type EventProps = Record<string, PropValue>;

function withAttribution(props: EventProps | undefined): EventProps {
  const out: EventProps = { ...(props ?? {}) };
  const ft = readFirstTouch();
  if (!ft) return out;

  const pairs: Array<[string, string | undefined]> = [
    ["first_source", ft.source],
    ["first_medium", ft.medium],
    ["first_campaign", ft.campaign],
    ["first_content", ft.content],
    ["first_term", ft.term],
    ["first_gclid", ft.gclid],
    ["first_fbclid", ft.fbclid],
    ["first_landing_path", ft.landing_path],
  ];
  for (const [k, v] of pairs) {
    if (v && out[k] === undefined) out[k] = v;
  }
  return out;
}

type BuyDestination = "amazon" | "iherb" | "official" | "other";

export function classifyBuyDestination(url: string | null | undefined): BuyDestination {
  if (!url) return "other";
  try {
    const host = new URL(url).hostname.toLowerCase();
    if (host.includes("amazon") || host.endsWith("amzn.to")) return "amazon";
    if (host.includes("iherb")) return "iherb";
    return "official";
  } catch {
    return "other";
  }
}

/**
 * Fire a buy_click event for an outbound affiliate click. Call at every
 * "Buy on X" / "Shop" site so we can measure intent toward the Amazon
 * Associates 3-sale requirement.
 */
export function trackBuyClick(params: {
  url: string | null | undefined;
  source: string;
  product_slug?: string | null;
  product_id?: string | null;
}): void {
  const destination = classifyBuyDestination(params.url);
  let host: string | null = null;
  try {
    if (params.url) host = new URL(params.url).hostname.toLowerCase();
  } catch {
    host = null;
  }
  trackEvent("buy_click", {
    source: params.source,
    destination,
    host,
    product_slug: params.product_slug ?? null,
    product_id: params.product_id ?? null,
  });
}

/**
 * POST an event to our own /events stream (the owned, queryable pipeline).
 * `properties` should already be attribution-merged. Fire-and-forget.
 */
function postOwnedStream(name: string, properties: EventProps): void {
  try {
    void fetch(`${API_URL}/api/v1/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        name,
        source: SOURCE,
        properties,
        anon_id: getAnonId() ?? null,
        referrer:
          typeof document !== "undefined" ? document.referrer || null : null,
      }),
    }).catch(() => {
      /* ignore */
    });
  } catch {
    /* ignore */
  }
}

export function trackEvent(name: string, properties?: EventProps): void {
  if (typeof window === "undefined") return;

  const merged = withAttribution(properties);

  try {
    vercelTrack(name, merged);
  } catch {
    // swallow
  }

  postOwnedStream(name, merged);
  phCapture(name, merged);
}

/**
 * Record a page view into the owned /events stream. NOT sent to Vercel (it
 * auto-tracks pageviews) or PostHog ($pageview is captured natively in the
 * PageTracker) — this populates our own table so entry pages, paths, and
 * per-path metrics are queryable from data we own.
 */
export function trackPageView(path: string, properties?: EventProps): void {
  if (typeof window === "undefined") return;
  postOwnedStream("page_view", withAttribution({ ...(properties ?? {}), path }));
}

/**
 * Record leaving a page, with how long the visitor spent on it (ms). Powers
 * time-on-page and exit-page analysis in the owned stream. Fired on route
 * change and on tab close/hide (keepalive fetch survives unload).
 */
export function trackPageLeave(path: string, dwellMs: number): void {
  if (typeof window === "undefined") return;
  postOwnedStream(
    "page_leave",
    withAttribution({ path, dwell_ms: Math.max(0, Math.round(dwellMs)) })
  );
}
