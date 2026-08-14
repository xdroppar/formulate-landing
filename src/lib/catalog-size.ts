/**
 * How many scored products we may claim, in copy.
 *
 * Four numbers were in circulation for one thing: the app's metadata said
 * "500+" (false — fixed), this site said "260+", the app's brands page shows
 * 452 (the sum of brand-reported range sizes, not what we score), and the live
 * catalogue serves 295.
 *
 * "260+" was true but understated the catalogue by about 12%, on the pages
 * whose whole job is to make it sound worth visiting.
 *
 * Rounded DOWN from the live figure so growth keeps it true. Kept identical to
 * formulate-web's src/lib/catalog-size.ts — this site mirrors the web catalogue
 * and must not drift from what the app itself claims.
 *
 * To re-check: load app.formulate-health.app/catalog and read the count it
 * renders. This repo's own src/data/catalog.json holds 266 and trails the live
 * API, so it must not be used for a claim.
 */
export const SCORED_PRODUCTS_CLAIM = "290+";
