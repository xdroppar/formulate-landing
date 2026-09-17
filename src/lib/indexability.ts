/**
 * Which pages we ask search engines to index.
 *
 * ONE decision, read by both sitemap.ts and each page's robots meta. Submitting
 * a page in the sitemap while its meta says noindex (or the reverse) teaches the
 * crawler the wrong thing about the site, so the two must come from the same
 * function rather than two lists kept in step by hand.
 *
 * WHY PAGES ARE WITHHELD AT ALL. In August Search Console had 1,611 URLs
 * "Discovered – currently not indexed" and rising, while the indexed count fell
 * (see the recipe note in sitemap.ts). Crawl budget is per site: pages that
 * repeat other pages spend it and teach Google the domain is not worth crawling
 * deeply, which costs the ingredient and food pages that carry real traffic.
 *
 * The rule is the same everywhere: a page earns a place when it carries
 * something no other page on the site has. Withheld pages stay reachable and
 * keep `follow`, so the links on them still count.
 */
import type { Product } from "@/lib/products";
import type { Ingredient } from "@/lib/encyclopedia";
import { productsContaining } from "@/lib/ingredient-products";

/**
 * A tag page lists guides that already have their own pages. With one or two
 * guides behind it, it is a near-copy of those pages. Measured 2026-09-17: 126
 * of 190 tags held exactly one guide.
 */
export const MIN_GUIDES_PER_TAG = 3;

export function isIndexableTag(guideCount: number): boolean {
  return guideCount >= MIN_GUIDES_PER_TAG;
}

/**
 * A supplement whose label gave the scorer nothing to read: every component
 * fell back to its default, so the page says nothing specific about the
 * product. 12 of 972 on 2026-09-17.
 */
export function isThinSupplement(p: Product): boolean {
  return (p.score_components ?? []).some((c) =>
    (c.explanations ?? []).some((e) => /no scoreable ingredients/i.test(e)),
  );
}

/**
 * An ingredient page with weak or no evidence AND no product listing it has
 * neither of the two things that make ingredient pages worth visiting — a
 * graded evidence summary or products to compare.
 */
export function isThinIngredient(i: Ingredient): boolean {
  const weakEvidence = i.evidence_grade === "D" || i.evidence_grade == null;
  return weakEvidence && productsContaining(i, 1).length === 0;
}
