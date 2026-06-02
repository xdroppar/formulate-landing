/**
 * Guarded PostHog wrapper.
 *
 * No-op until NEXT_PUBLIC_POSTHOG_KEY is set, so this ships INERT and turns on
 * the moment you create a free PostHog project and add the key to the Vercel
 * env. We bootstrap PostHog's distinct_id from our own `anon_id` so the owned
 * /events stream and PostHog share one identity — and because landing + the web
 * app use the same anon_id, the SEO-page -> app-open journey stitches across
 * both properties in PostHog.
 *
 * Pageviews are captured manually on route change (App Router SPA navigation),
 * so capture_pageview is off; capture_pageleave stays on for time-on-page.
 */

import posthog from "posthog-js";

// Write-only, public-by-design project token (safe to ship in the client
// bundle). Env var overrides it — set NEXT_PUBLIC_POSTHOG_KEY on Vercel if you
// rotate the token. US Cloud project, so the default host is correct.
const KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ||
  "phc_qiNOmrs6f02PdNTH0IQ07ul3fZ86JuZYKcHYjve3eZL";
// Default to the same-origin reverse proxy (/ingest -> us.i.posthog.com, see
// next.config.ts rewrites) so ad blockers can't drop events. Set
// NEXT_PUBLIC_POSTHOG_HOST to a direct host to bypass the proxy.
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "/ingest";
const UI_HOST = "https://us.posthog.com";

let started = false;

export function isPostHogEnabled(): boolean {
  return !!KEY;
}

export function initPostHog(anonId?: string): void {
  if (started || !KEY || typeof window === "undefined") return;
  try {
    posthog.init(KEY, {
      api_host: HOST,
      ui_host: UI_HOST,
      person_profiles: "always",
      capture_pageview: false, // fired manually per route change
      capture_pageleave: true, // time-on-page / exit pages
      autocapture: true,
      persistence: "localStorage+cookie",
      bootstrap: anonId ? { distinctID: anonId } : undefined,
      // Session replay stays OFF by default (privacy) — enable in the PostHog
      // project settings if you want it.
      disable_session_recording: true,
    });
    started = true;
  } catch {
    /* never let analytics break the page */
  }
}

export function phCapture(
  name: string,
  props?: Record<string, unknown>
): void {
  if (!KEY || !started || typeof window === "undefined") return;
  try {
    posthog.capture(name, props);
  } catch {
    /* ignore */
  }
}
