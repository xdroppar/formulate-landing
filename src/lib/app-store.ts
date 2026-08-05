/**
 * Where the mobile apps live, and whether each store can actually be linked.
 *
 * Extracted from `components/mobile-app-badges.tsx` because these facts are
 * needed on the SERVER too — the Apple Smart App Banner is a `<meta>` tag that
 * has to go in the document head via Next's metadata API, and a client
 * component cannot put it there.
 *
 * The two stores are gated SEPARATELY and deliberately. A single flag covering
 * both is what kept this dead for months: iOS went live in June 2026 while
 * Android was still a closed test, so the honest state was never "both off" or
 * "both on" and the flag stayed off.
 *
 * Verified 2026-08-05, both by fetching the listings:
 *   iOS  — 200. "Formulate: Longevity Tracker", free with IAP, Health &
 *          Fitness. LIVE, so IOS_LIVE is now true.
 *   Play — 404. `com.formulate.health` is still a closed/internal track
 *          (eas.json submits Android to `internal` with releaseStatus
 *          `draft`), so ANDROID_LIVE stays false.
 *
 * Do NOT flip ANDROID_LIVE before the Play listing returns 200. A badge
 * pointing at a 404 reads as a broken product, not a missing platform — worse
 * than showing nothing.
 */

export const APP_STORE_ID = "6783192989";

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/formulate-longevity-tracker/id6783192989";

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.formulate.health";

// Typed as `boolean` rather than inferred literals so a flip is a one-word
// edit that never has to fight TypeScript narrowing `false` into a type that
// makes every guarded branch look unreachable.
export const IOS_LIVE: boolean = true;
export const ANDROID_LIVE: boolean = false;

/** Any store link at all? Used to decide whether a download surface renders. */
export const ANY_STORE_LIVE: boolean = IOS_LIVE || ANDROID_LIVE;

/**
 * Attribution note, deliberately NOT implemented yet.
 *
 * Apple attributes installs by campaign with `?pt=<providerToken>&ct=<campaign>&mt=8`,
 * which would let App Store Connect break installs down by which page kind sent
 * them. `ct` is IGNORED without a valid `pt`, and the provider token has to be
 * read out of App Store Connect — so adding it now would look like attribution
 * while measuring nothing.
 *
 * Until then the honest measurement is the owned one: every store link fires
 * `mobile_badge_click` with its source, and the app fires
 * `mobile_install_attribution` on first run. Those two correlate without Apple.
 */
export const APP_STORE_CAMPAIGN_ATTRIBUTION_ENABLED = false;
