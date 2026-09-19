/**
 * One row of /api/score-index — the homepage builder's catalog.
 *
 * Shared by the route that writes it and the builder that reads it, so a
 * field cannot be served that nothing reads, or read that nothing serves. The
 * index used to carry `image` and `word` for the old hero builder; when the
 * console builder replaced it they kept shipping, 31% of the payload, to a
 * component that never rendered them.
 */
export type ScoreItem = {
  slug: string;
  name: string;
  brand: string;
  /** NULL where the catalog has no cross-category number, which is not zero
   *  and is not missing data. Sleep gear declines a score on purpose — a mask
   *  and a mattress share no attribute one number could rank — so it carries
   *  a price band instead. Anything reading this must handle null rather than
   *  coerce it: a 0 here would print "Weak" over a perfectly good mattress. */
  score: number | null;
  /** Tier colour for the score; empty where there is no score. */
  color: string;
  /** The most decisive line from the product's score_components, or the
   *  category for gear, which has no components. */
  why: string;
  /** Shown in place of a score where there is none. "$35–45". */
  price?: string | null;
  /** Which catalog this came from; the pillar chips filter on it. */
  kind: "supplement" | "food" | "care" | "fitness" | "sleep";
};
