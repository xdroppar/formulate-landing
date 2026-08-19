/**
 * Links from the landing site into the web app, and the anon_id that has to
 * survive the trip.
 *
 * The landing site and the app are separate origins (formulate-health.app and
 * app.formulate-health.app), and `anon_id` lives in localStorage, which is
 * per-origin. So the app can never see the id the landing site issued, and
 * `/events/journey` — which measures crossover by intersecting landing anon_ids
 * with app anon_ids — reported `crossed_over: 0` across 90 days, 17,873 landing
 * visitors and 3,837 app visitors. That zero was never a fact about people; it
 * was a fact about localStorage.
 *
 * Carrying the id in the URL is the only channel the two origins share. The app
 * adopts it on arrival, so the two sides agree on who someone is and the
 * intersection starts describing behaviour instead of the storage model.
 *
 * Pure and origin-agnostic so it can be tested without a browser.
 */

/** Query parameter carrying the landing site's anon_id across the origin gap. */
export const ANON_PARAM = "aid";

/** Hosts that count as "the app". Anything else is left completely alone. */
const APP_HOSTS = new Set(["app.formulate-health.app"]);

export function isAppLink(href: string | null | undefined): boolean {
  if (!href) return false;
  try {
    return APP_HOSTS.has(new URL(href, "https://formulate-health.app").hostname);
  } catch {
    return false;
  }
}

/**
 * Add the anon_id to an app-bound URL.
 *
 * Returns `href` untouched when it is not an app link, when there is no id, or
 * when the URL already carries one — a link that was already stamped must not
 * be restamped, or a second click would overwrite a first-touch id.
 */
export function withAnonId(href: string, anonId: string | null | undefined): string {
  if (!href || !anonId || !isAppLink(href)) return href;
  try {
    const url = new URL(href, "https://formulate-health.app");
    if (url.searchParams.has(ANON_PARAM)) return href;
    url.searchParams.set(ANON_PARAM, anonId);
    return url.toString();
  } catch {
    return href;
  }
}

/**
 * Where a CTA lives, for the dashboard breakdown.
 *
 * Prefers an explicit `data-cta-source`, then the utm_medium the guide links
 * already carry (`guide_body`), so 157 existing links get a meaningful label
 * without being edited. Never throws — an unlabelled click is still a click,
 * and losing it to a malformed URL would be worse than calling it "unknown".
 */
export function ctaSource(href: string, explicit?: string | null): string {
  if (explicit) return explicit;
  try {
    const medium = new URL(href, "https://formulate-health.app").searchParams.get("utm_medium");
    if (medium) return medium;
  } catch {
    /* fall through */
  }
  return "unknown";
}
