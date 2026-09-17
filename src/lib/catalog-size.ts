/**
 * How many scored products we may claim, in copy.
 *
 * Four numbers were once in circulation for one thing: the app's metadata said
 * "500+" (false), this site said "260+", the app's brands page showed 452 (the
 * sum of brand-reported range sizes, not what we score), and the live catalogue
 * served 295. That was fixed with one hand-set constant, rounded DOWN so growth
 * would keep it true.
 *
 * Growth did keep it true, and made it useless: by 2026-09-17 it read "290+" on
 * /about and /guides against 972 scored products, because nobody remembers to
 * raise a number that is not wrong. The live app's /catalog showed 938 (flavour
 * variants grouped into one card), web's static catalog held 977.
 *
 * So it is counted from src/data/catalog.json at build, in next.config.ts, and
 * rounded down to the hundred — which keeps it true under either way of counting
 * and keeps it in step with formulate-web, which rounds the same way. It is an
 * env value rather than an import because the nav (a client component) reads it.
 */
const claim = process.env.SCORED_PRODUCTS_CLAIM;
if (!claim) {
  throw new Error("SCORED_PRODUCTS_CLAIM is not set: it is computed in next.config.ts env");
}
export const SCORED_PRODUCTS_CLAIM: string = claim;
