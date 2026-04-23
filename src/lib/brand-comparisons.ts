/**
 * Curated brand-vs-brand comparison pages. Parallel to ingredient
 * comparisons (/compare/[pair]) but one level up — comparing whole
 * brand philosophies, lineups, and scoring profiles.
 *
 * Data pulled at render time from catalog.json's brands + products
 * arrays. This file carries editorial layer only: which brands to
 * compare head-to-head, the positioning sentence, and the verdict
 * framework.
 *
 * Add a new pair = add one entry. No template changes.
 */

export type BrandComparison = {
  /** Brand slugs matching the catalog's brand.slug field. */
  a: string;
  b: string;
  /** One-sentence bottom-line. */
  bottom_line: string;
  /** Why these two get compared. ~120 words. */
  why_compare: string;
  /** When you'd pick brand A. ~80 words. */
  when_a: string;
  /** When you'd pick brand B. ~80 words. */
  when_b: string;
  /** How they stack overall on Formulate's rubric. ~60 words. */
  verdict: string;
  /** Tags for the compare index. */
  tags: string[];
};

export const brandComparisons: BrandComparison[] = [
  {
    a: "thorne",
    b: "momentous",
    bottom_line:
      "Thorne wins on catalog breadth and verification; Momentous wins on transparency and athlete focus.",
    why_compare:
      "These are two of the most recognized premium supplement brands in the US. Thorne has the deepest product catalog (150+ products) with the broadest NSF and USP testing coverage — it's the default recommendation for most users who want evidence-graded quality across categories. Momentous is the newer, athlete-focused brand with a smaller, tighter lineup and notably better ingredient transparency (the brand won Formulate's 'Most Transparent' standout). The question isn't quality — both score in the A range — it's which depth vs polish tradeoff fits your use case.",
    when_a:
      "Pick Thorne if you want one brand covering most of your stack (supplements + routine), want USP/NSF verification on most of what you buy, or you have specific needs outside sports nutrition (prenatal, liver support, women's health, thyroid). The catalog depth makes Thorne the best single-brand stack.",
    when_b:
      "Pick Momentous if your goal is sports performance or athletic recovery, you value per-ingredient transparency on the label (no 'proprietary blend' hiding anything), or you want a brand optimized for the athletic-research-evidence crossover. Fewer products, tighter focus, athlete-team partnerships.",
    verdict:
      "Thorne A (score 93, Most Verified) vs Momentous B+ (score 88, Most Transparent). Both are top-tier choices. Decide on catalog breadth vs athlete-polish alignment — there's no quality gap large enough to pick on that axis alone.",
    tags: ["Premium Brands", "Thorne", "Momentous"],
  },
  {
    a: "nootropics-depot",
    b: "thorne",
    bottom_line:
      "Thorne wins for general health and verified quality; Nootropics Depot wins for cognitive-performance specialization and sourcing transparency.",
    why_compare:
      "Thorne dominates the general premium supplement market with broad USP/NSF-verified catalog coverage. Nootropics Depot is the specialist — their catalog focuses on cognitive enhancement, adaptogens, and sleep stacks, with unusually detailed sourcing disclosure (they publish extract specifications and third-party test results per product). If you're building a cognitive or nootropic stack, ND has ingredients Thorne doesn't carry.",
    when_a:
      "Pick Nootropics Depot for cognitive-performance stacks: Lion's Mane, Bacopa, Alpha-GPC, unusual adaptogens, research-grade powders. They cater to serious nootropic users with ingredient-level transparency that most brands don't match.",
    when_b:
      "Pick Thorne for a general supplement foundation: multivitamin, vitamin D, magnesium, omega-3, basic performance. Broader retail availability, more NSF-certified products, a more mainstream quality story.",
    verdict:
      "Thorne A (93, Most Verified) vs Nootropics Depot B- (82). Thorne's verification story is stronger, but Nootropics Depot's specialty niche doesn't overlap much — they're complements more than competitors for serious users.",
    tags: ["Nootropics", "Cognition", "Premium Brands"],
  },
  {
    a: "thorne",
    b: "transparent-labs",
    bottom_line:
      "Thorne covers health and wellness broadly; Transparent Labs focuses on sports performance with thorough label transparency.",
    why_compare:
      "Thorne is the generalist premium brand. Transparent Labs narrowed its lineup to sports performance — pre-workouts, protein, BCAAs, creatine, testosterone support — with a deliberate 'nothing artificial, fully disclosed doses' positioning. If you're training seriously and care about exactly what's in your pre-workout or recovery formula, Transparent Labs has fewer products to evaluate but higher per-product transparency than most competitors in that category.",
    when_a:
      "Pick Thorne if your stack is health-focused: cognitive, cardiovascular, immune, multivitamin, prenatal, basic performance. USP and NSF coverage spans the catalog.",
    when_b:
      "Pick Transparent Labs for performance-specific products: pre-workouts, protein, BCAA/EAA, creatine, testosterone support. Full-dose, no-proprietary-blend labeling is standard on their lineup.",
    verdict:
      "Thorne A (93) vs Transparent Labs C+ (77). Thorne's verification is substantially stronger overall. Transparent Labs's product-level transparency is excellent but the third-party-testing coverage is thinner — worth it only if sports-performance is the specific need.",
    tags: ["Sports Performance", "Pre-Workout", "Protein"],
  },
  {
    a: "momentous",
    b: "transparent-labs",
    bottom_line:
      "Both are sports-focused with transparency emphasis; Momentous wins on third-party verification, Transparent Labs on price-per-dose.",
    why_compare:
      "Both brands position on transparency and athletic performance. Momentous has endorsements from Olympic and NFL teams, carries NSF Certified for Sport on a larger share of its lineup, and has a shorter ingredient list per product. Transparent Labs focuses on full-disclosure labels and competitive per-serving pricing — more accessible to everyday athletes vs. Momentous's pro-oriented positioning.",
    when_a:
      "Pick Momentous for pro-level sports nutrition where drug-testing matters (NSF Certified for Sport coverage is broader), when you want the cleanest possible pre-workout or protein formula, or when team / Olympic-athlete endorsements matter to you.",
    when_b:
      "Pick Transparent Labs if budget matters, you want full-dose transparency on per-serving basis, or you're doing higher-volume consumption where a per-serving cost difference meaningfully stacks up.",
    verdict:
      "Momentous B+ (88, Most Transparent) vs Transparent Labs C+ (77). Momentous wins on the third-party verification axis; Transparent Labs wins on price per scoop. Pick based on whether verified-for-sport certification matters to you.",
    tags: ["Sports Performance", "Athletes", "Transparency"],
  },
  {
    a: "complement",
    b: "thorne",
    bottom_line:
      "Thorne is the general premium play; Complement is the vegan-specific play with a tight, intentional lineup.",
    why_compare:
      "Complement built its brand around the nutrient gaps specific to plant-based diets: B12 (methylcobalamin), D3 (vegan-sourced), omega-3 (algae, not fish), zinc, K2, and a small vegan multivitamin. The lineup is short by design — five products covering what Complement argues are the critical vegan-diet gaps. Thorne has broader coverage and verification but requires you to assemble the vegan stack yourself from their larger catalog.",
    when_a:
      "Pick Thorne if you eat animal products and want a broad general supplement catalog with deep USP/NSF verification. The catalog breadth accommodates any dietary pattern.",
    when_b:
      "Pick Complement if you're vegan, vegetarian, or transitioning — and you want a curated 'these are the ones that matter' approach without having to research which B12 form, which D3 source, and which omega source works on a plant-based diet. Algae omega-3 vs fish oil is the standout differentiator.",
    verdict:
      "Thorne A (93, Most Verified) vs Complement B- (81). Thorne's overall score is higher, but Complement's vegan-specific focus adds value for that audience that a general Thorne stack doesn't replicate as cleanly.",
    tags: ["Vegan", "Plant-Based", "Curated Stacks"],
  },
  {
    a: "nootropics-depot",
    b: "transparent-labs",
    bottom_line:
      "Different use cases entirely — Nootropics Depot for cognitive/sleep, Transparent Labs for athletic performance.",
    why_compare:
      "These brands barely overlap in their core catalogs. Nootropics Depot specializes in cognitive support, adaptogens, sleep stacks, and unusual compounds (Alpha-GPC, Lion's Mane, Phenibut adjuncts, specialty Rhodiola). Transparent Labs specializes in sports nutrition — pre-workout, BCAA, creatine, protein, testosterone support. Users who need both typically buy from both rather than pick one. But if you're comparing on quality axes alone, the gap shows.",
    when_a:
      "Pick Nootropics Depot for anything cognitive, sleep-related, or involving less-mainstream adaptogens. Their niche expertise and sourcing transparency in that category is unmatched.",
    when_b:
      "Pick Transparent Labs for pre-workout, post-workout recovery, or protein — product categories where their full-disclosure positioning and per-serving value outweigh their narrower third-party testing coverage.",
    verdict:
      "Nootropics Depot B- (82) vs Transparent Labs C+ (77). Both are niche specialists. If you need both categories covered, buy from both — cross-shopping doesn't help. If forced to pick one as primary, go with whichever catalog matches your actual daily use.",
    tags: ["Nootropics", "Sports Performance", "Niche Brands"],
  },
];

function slugPair(a: string, b: string): string {
  const [first, second] = [a, b].sort();
  return `${first}-vs-${second}`;
}

export function brandComparisonSlug(c: BrandComparison): string {
  return slugPair(c.a, c.b);
}

const bySlug = new Map(
  brandComparisons.map((c) => [brandComparisonSlug(c), c]),
);

export function brandComparisonBySlug(slug: string): BrandComparison | undefined {
  return bySlug.get(slug);
}
