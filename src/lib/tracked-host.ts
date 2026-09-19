/**
 * Whether this page is being served somewhere a real visitor could be.
 *
 * WHY. The owned /events stream records no hostname, so a page view from a
 * local `next start` or a Vercel preview is indistinguishable from a visitor
 * on formulate-health.app. Every speed test, screenshot harness and preview
 * check posted page_view and page_leave to the production stream, and a local
 * click-through of the homepage builder posted a real-looking hero_stack_add
 * (2026-09-18). For counts this small, a test run is not noise, it is a
 * result.
 *
 * Headless browsers on the live site are NOT excluded here: the API already
 * classifies them by user agent (/agents) so the JS-executing bot tail can be
 * sized, and dropping them in the page would blind that instrument.
 *
 * NEXT_PUBLIC_TRACK_LOCAL=1 turns tracking back on for a local build when the
 * point of the run is to test tracking itself.
 */
export function isTrackedHost(): boolean {
  if (typeof window === "undefined") return false;
  if (process.env.NEXT_PUBLIC_TRACK_LOCAL === "1") return true;
  const h = window.location.hostname.toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".local")) return false;
  if (h === "0.0.0.0" || h === "[::1]" || h === "::1") return false;
  if (/^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(h)) return false;
  // Preview and branch deployments; the production site is formulate-health.app.
  if (h.endsWith(".vercel.app")) return false;
  return true;
}
