/**
 * Which products list an ingredient. Shared by the ingredient page (its
 * "Products containing X" block) and lib/indexability.ts (an ingredient page
 * with weak evidence AND no product is not submitted), so the two can never
 * disagree about whether a page has products on it.
 */
import { products, type Product } from "@/lib/products";
import type { Ingredient } from "@/lib/encyclopedia";

/** Normalize a product-label ingredient name down to the base substance.
 * Product labels contain amounts, forms, source, and percentages —
 * "Vitamin D [as cholecalciferol (D3)]", "Magnesium (as Albion DiMagnesium
 * Malate)", "Tongkat Ali Extract (Eurycoma longifolia) (root)". Strip all
 * parenthetical/bracketed content, trim, lowercase. */
export function normalizeIngredientLabel(name: string): string {
  return name
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\b(extract|powder|complex)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/** Find products that list this ingredient, ranked by product score desc.
 *
 * Matching is conservative: we only use the canonical encyclopedia name,
 * not the aliases (alias strings include parentheticals and short tokens
 * that produced false positives — e.g. alias "Ashwagandha (Thyroid Support)"
 * vs a DHA ingredient name, where "dha" is substring-inside "ashwagandha").
 * Word-boundary regex ensures "magnesium" matches "Magnesium Bisglycinate"
 * but doesn't bleed into unrelated tokens.
 */
export function productsContaining(ing: Ingredient, limit = 4): Product[] {
  // Build normalized needles from canonical name + aliases. Normalization
  // strips parentheticals so "Ashwagandha (Thyroid Support)" becomes just
  // "ashwagandha" — that also neutralizes the false-positive vector that
  // killed an earlier pass (alias-substring match had "ashwagandha"
  // matching DHA because "dha" is inside "ashwagandha"). Word-boundary
  // regex ensures that doesn't happen. ≥3 char minimum rejects the
  // ultra-short slugs that would otherwise hit random tokens.
  const rawNeedles = [ing.name, ...(ing.aliases ?? [])];
  const needles = Array.from(
    new Set(
      rawNeedles
        .map((n) => normalizeIngredientLabel(n))
        .filter((n) => n.length >= 3),
    ),
  );
  if (needles.length === 0) return [];

  const regexes = needles.map((n) => {
    const escaped = n.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    return new RegExp(`\\b${escaped}\\b`);
  });

  const hits: Product[] = [];
  for (const p of products) {
    for (const row of p.ingredients) {
      const normalized = normalizeIngredientLabel(row.name);
      if (regexes.some((re) => re.test(normalized))) {
        hits.push(p);
        break;
      }
    }
  }
  return hits
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, limit);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\/-]/g, "\\$&");
}

/**
 * The one product to offer for an ingredient.
 *
 * The product must be a product OF that ingredient — its NAME says so.
 * "Highest-scoring product listing it" put a collagen powder beside vitamin C
 * and a berberine beside grape seed: true that they contain it, wrong as an
 * answer to "what should I take for this". A single-ingredient product wins;
 * a combination ("Caffeine + L-Theanine" matched L-theanine on the insomnia
 * page) is offered only when no single one exists.
 *
 * This is the rule the site states wherever it makes the pick for a reader —
 * goal pages, ingredient pages, and the two stack tools — so it lives here
 * once rather than in each of them.
 */
export function topProductForIngredient(ing: Ingredient | undefined | null): Product | null {
  if (!ing) return null;
  const needles = [ing.name, ...(ing.aliases ?? [])]
    .map((n) => normalizeIngredientLabel(n))
    .filter((n) => n.length >= 3)
    .map((n) => new RegExp(`\\b${escapeRegExp(n)}\\b`));
  const named = productsContaining(ing, 200).filter((p) =>
    needles.some((re) => re.test(p.name.toLowerCase())),
  );
  const combination = /\+|&|\bwith\b|\band\b/i;
  return named.find((p) => !combination.test(p.name)) ?? named[0] ?? null;
}
