import catalog from "@/data/whole-foods-catalog.json";

export type FoodBenefit = { benefit: string; mechanism?: string; evidence_strength?: string };

export type FoodTiming = {
  best_time?: string | null;
  reasoning?: string | null;
  avoid_times?: string[] | null;
  fasting_compatible?: boolean | null;
  notes?: string | null;
};

export type FoodVariant = {
  variant_id: string;
  variety?: string | null;
  prep?: string | null;
  form?: string | null;
  notes?: string | null;
  serving_basis?: string | null;
  calories?: number | null;
  macros?: Record<string, number | null> | null;
  micros?: Record<string, number | null> | null;
  source?: string | null;
  image_url?: string | null;
  gallery_images?: string[];
};

export type FoodScoreBreakdown = {
  nutrient_density?: number | null;
  protein_quality?: number | null;
  fiber_content?: number | null;
  healthy_fats?: number | null;
  bioactive_compounds?: number | null;
  glycemic_impact?: number | null;
  anti_nutrient_penalty?: number | null;
  /** [nutrient name, %DV at the variant's serving_basis] pairs. */
  top_nutrients?: [string, number][];
  bioactives_found?: string[];
  concerns?: string[];
};

export type Food = {
  base_id: string;
  name: string;
  group: string;
  subgroup: string | null;
  aliases?: string[];
  tags?: string[];
  icon?: string | null;
  image_url: string | null;
  gallery_images?: string[];
  description?: string | null;
  overview?: string | null;
  health_benefits?: FoodBenefit[];
  food_pairings?: string[] | string | null;
  practical_tips?: string[] | string | null;
  optimal_timing?: FoodTiming | string | null;
  default_variant_id?: string | null;
  price_avg?: number | null;
  price_unit?: string | null;
  score: number | null;
  grade: string | null;
  grade_color?: string | null;
  score_breakdown?: FoodScoreBreakdown;
  variants?: FoodVariant[];
};

// Only foods with a real score + image are publishable on the SEO surface.
export const foods: Food[] = (catalog.foods as unknown as Food[]).filter(
  (f) => f.score != null && !!f.image_url,
);

/** Human-readable timing line — optimal_timing is sometimes an object, sometimes a string.
 *
 * `best_time` is only worth printing when it says something. "anytime" is the
 * schema default in `OptimalTiming`, so a row can carry it while the real
 * guidance sits unread in `reasoning` — 215 of the 487 publishable foods were
 * in exactly that state, rendering a bare "anytime" on their page while a
 * usable sentence ("Pepper is most useful taken alongside meals so piperine
 * can…") went unused. Falling back keeps every specific best_time exactly as
 * it was and only replaces the placeholder.
 *
 * This also protects the four rows (cacao, green-tea, anchovy, kimchi) whose
 * `optimal_timing` used to be a prose STRING and rendered in full here. They
 * were reshaped into proper objects at source, which parked that prose in
 * `reasoning`; without this fallback they would have silently regressed to
 * "anytime".
 */
export function timingText(t: FoodTiming | string | null | undefined): string | null {
  if (!t) return null;
  if (typeof t === "string") return t;
  const best = (t.best_time ?? "").trim();
  if (best && best.toLowerCase() !== "anytime") return best;
  return t.reasoning || t.notes || best || null;
}

export const foodCount = foods.length;

export function foodBySlug(slug: string): Food | undefined {
  return foods.find((f) => f.base_id === slug);
}

export function defaultVariant(f: Food): FoodVariant | undefined {
  const list = f.variants ?? [];
  return list.find((v) => v.variant_id === f.default_variant_id) ?? list[0];
}

/** URL-safe slug for a food group ("Herbs & Spices" -> "herbs-and-spices"). */
export function groupSlug(group: string): string {
  return group
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function foodGroups(): { group: string; slug: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const f of foods) counts[f.group] = (counts[f.group] ?? 0) + 1;
  return Object.entries(counts)
    .map(([group, count]) => ({ group, slug: groupSlug(group), count }))
    .sort((a, b) => b.count - a.count);
}

export function foodsByGroup(group: string): Food[] {
  return foods
    .filter((f) => f.group === group)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
}

// Group collections (pSEO: "healthiest vegetables", "best nuts & seeds", …).
export const BEST_GROUP_MIN = 8;
export function bestFoodGroups(): { group: string; slug: string; count: number }[] {
  return foodGroups().filter((g) => g.count >= BEST_GROUP_MIN);
}

export function groupByGroupSlug(slug: string): string | null {
  return foodGroups().find((g) => g.slug === slug)?.group ?? null;
}

export function relatedFoods(f: Food, limit = 6): Food[] {
  return foods
    .filter((x) => x.base_id !== f.base_id && (x.subgroup ? x.subgroup === f.subgroup : x.group === f.group))
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, limit);
}

/** Score colour: prefer the catalog's stored grade_color, else a sensible ramp. */
export function foodColor(f: Pick<Food, "score" | "grade_color">): string {
  if (f.grade_color) return f.grade_color;
  const s = f.score ?? 0;
  if (s >= 90) return "#22C55E";
  if (s >= 80) return "#3B82F6";
  if (s >= 70) return "#F59E0B";
  if (s >= 60) return "#F97316";
  return "#EF4444";
}

/** The score-breakdown rows worth surfacing as meters (skip penalties/arrays). */
export const FOOD_BREAKDOWN_ROWS: { key: keyof FoodScoreBreakdown; label: string }[] = [
  { key: "nutrient_density", label: "Nutrient density" },
  { key: "protein_quality", label: "Protein quality" },
  { key: "fiber_content", label: "Fiber content" },
  { key: "healthy_fats", label: "Healthy fats" },
  { key: "bioactive_compounds", label: "Bioactive compounds" },
  { key: "glycemic_impact", label: "Glycemic impact" },
];


// ─────────────────────────────────────────────────────────────────────────────
// Serving basis.
//
// PORT — keep in sync with formulate-web/src/lib/whole-foods.ts
// (variantBasisGrams, standardServingG) and formulate-mobile/lib/wholeFoods.ts
// (standardServingLabel). Landing mirrors web; do not diverge these.
//
// Catalog nutrition is stored per the variant's basis — 100 g for all but the
// per-piece variants. 100 g of nuts is ~65 nuts, so a %DV shown without a basis
// is not just unhelpful, it is wrong by ~3.5x.
// ─────────────────────────────────────────────────────────────────────────────

const _PIECE_GRAMS = /\(\s*~?\s*(\d+(?:\.\d+)?)\s*g\b/;

/** The grams a variant's STORED numbers actually represent. Never hardcode 100. */
export function variantBasisGrams(f: Food, variant?: FoodVariant | null): number {
  const v = variant ?? defaultVariant(f);
  const basis = (v?.serving_basis ?? "per_100g").toLowerCase();
  if (!v || basis === "per_100g") return 100;

  const own = _PIECE_GRAMS.exec(v.notes ?? "");
  if (own) {
    const g = parseFloat(own[1]);
    if (Number.isFinite(g) && g > 0) return g;
  }
  // No gram note: borrow from an equal-calorie sibling on the same basis —
  // identical calories means identical grams.
  const cal = typeof v.calories === "number" ? v.calories : null;
  if (cal != null && cal > 0) {
    for (const sib of f.variants ?? []) {
      if (sib.variant_id === v.variant_id) continue;
      if ((sib.serving_basis ?? "").toLowerCase() !== basis) continue;
      if (typeof sib.calories !== "number") continue;
      if (Math.abs(sib.calories - cal) > 0.5) continue;
      const m = _PIECE_GRAMS.exec(sib.notes ?? "");
      if (m) {
        const g = parseFloat(m[1]);
        if (Number.isFinite(g) && g > 0) return g;
      }
    }
  }
  return 100;
}

/** Studied serving in grams — FDA/USDA RACC by category. */
export function standardServingG(f: Food, variant?: FoodVariant | null): number {
  const group = (f.group || "").toLowerCase();
  const sub = (f.subgroup || "").toLowerCase();
  const name = (f.name || "").toLowerCase();

  if (group.includes("herb") || group.includes("spice")) return 2;

  const dv = variant ?? defaultVariant(f);
  if (dv) {
    if ((dv.form || "").toLowerCase().includes("powder")) return 15;
    if ((dv.prep || "").toLowerCase().includes("dried")) return 40;
  }

  if (/\bbutter\b/.test(name) && !name.includes("nut")) return 14;
  if (name.includes("ghee") || name.includes("butter oil")) return 14;
  if (name.includes("dessert topping") || name.includes("whipped")) return 15;

  if (group.includes("oil") || group.includes("fat")) return 14;
  if (group.includes("nuts") || group.includes("seed")) {
    if (name.includes("butter") || name.includes("paste") || name.includes("tahini")) return 32;
    return 28;
  }
  if (name.includes("powder")) return 15;
  if (name.includes("flour") || name.includes("starch") || name.includes("bran")) return 30;

  if (group.includes("dairy")) {
    const CHEESE = /cheese|cotija|brie|feta|gouda|mozzarella|ricotta|parmesan|parmigiano|cheddar|gruy|halloumi|paneer|manchego|provolone|camembert|mascarpone|asiago|queso|gorgonzola|\bedam\b|colby|havarti|pecorino|romano|stilton|roquefort|emmental/;
    if (sub.includes("cheese") || CHEESE.test(name)) return 30;
    if (sub.includes("liquid") || name.includes("milk")) return 240;
    if (sub.includes("ferment") || name.includes("yogurt")) return 245;
    if (name.includes("cream") && !name.includes("ice cream") && !name.includes("creamer")) return 30;
    return 100;
  }
  if (group.includes("meat") || group.includes("seafood")) return 85;
  if (group.includes("legume")) {
    if (name.includes("butter") || name.includes("spread") || name.includes("paste")) return 32;
    if (name.includes("peanut")) return 28;
    return 90;
  }
  if (group.includes("grain")) return name.includes("seed") ? 28 : 50;
  if (group.includes("fruit")) {
    if (name.includes("avocado")) return 50;
    if (/\b(prune|raisin|sultana|currant|date|dates)\b/.test(name) || name.includes("dried") || name.includes("dehydrated")) return 40;
    return 140;
  }
  if (group.includes("vegetable")) return sub.includes("leafy") ? 40 : 85;
  return 100;
}

/** Household description of one standard serving, plus its grams. */
export function standardServingLabel(f: Food, variant?: FoodVariant | null): { grams: number; approx: string } {
  const g = standardServingG(f, variant);
  const group = (f.group || "").toLowerCase();
  let approx: string;
  if (g <= 3) approx = "a pinch";
  else if (g <= 16) approx = "1 tbsp";
  else if (g <= 30) approx = "1 oz";
  else if (g <= 45) approx = "a handful";
  else if (g <= 60) approx = "½ cup";
  else if (g <= 95) approx = group.includes("meat") || group.includes("seafood") ? "3 oz" : "½ cup";
  else if (g <= 160) approx = group.includes("fruit") ? "1 medium" : "1 cup";
  else approx = "1 cup";
  return { grams: g, approx };
}

/** Multiply a stored per-basis figure by this to get it per studied serving. */
export function servingFactor(f: Food, variant?: FoodVariant | null): number {
  return standardServingG(f, variant) / variantBasisGrams(f, variant);
}
