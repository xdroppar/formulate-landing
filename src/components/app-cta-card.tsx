"use client";

import { trackEvent } from "@/lib/analytics";
import { withUtm } from "@/lib/app-url";
import { APP_STORE_URL, IOS_LIVE } from "@/lib/app-store";
import { useIsIOS } from "@/components/use-is-ios";

const APP_URL = "https://app.formulate-health.app";

/**
 * Contextual "open the app" call-to-action card — the SEO→app conversion bridge
 * dropped onto reference pages (ingredients, brands, …) that otherwise dead-end.
 * `path` is appended to the app URL, `campaign` tags UTM.
 *
 * On an iPhone the card points at the App Store instead (same rule as
 * PageConversion): the reader is holding the device the app runs on. The
 * server and first paint keep the web link, so the HTML stays identical.
 */
export function AppCtaCard({
  title,
  sub,
  campaign,
  path = "",
  className = "",
  href,
  cta = "Open app →",
  source,
}: {
  title: string;
  sub: string;
  campaign: string;
  path?: string;
  className?: string;
  /** A ready-made app URL (e.g. stackAddUrl) in place of `path`. */
  href?: string;
  cta?: string;
  /** What to file the click under, when `campaign` is per-page (one value per
   *  slug makes a "top sources" list unreadable). Defaults to `campaign`. */
  source?: string;
}) {
  const isIOS = useIsIOS();
  const appFirst = IOS_LIVE && isIOS;
  return (
    <a
      href={appFirst ? APP_STORE_URL : href ?? withUtm(`${APP_URL}${path}`, { source: "landing", campaign })}
      onClick={
        appFirst
          ? () => trackEvent("mobile_badge_click", { source: `cta_card:${source ?? campaign}`, destination: "ios" })
          : undefined
      }
      /* AppLinkTracker counts every app link; without this it reads the
         utm_medium and files each of these cards as plain "landing", so the
         one that earns the click is indistinguishable from the rest. */
      data-cta-source={source ?? campaign}
      className={`not-prose flex items-center justify-between gap-4 rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-4 hover:border-accent/50 transition-colors ${className}`}
    >
      <div>
        <div className="text-sm font-bold text-text">{title}</div>
        <div className="text-xs text-muted">{sub}</div>
      </div>
      <span className="text-sm font-semibold text-accent whitespace-nowrap">
        {appFirst ? "Get the iPhone app →" : cta}
      </span>
    </a>
  );
}
