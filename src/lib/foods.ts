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
  top_nutrients?: string[];
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

/** Human-readable timing line — optimal_timing is sometimes an object, sometimes a string. */
export function timingText(t: FoodTiming | string | null | undefined): string | null {
  if (!t) return null;
  if (typeof t === "string") return t;
  return t.best_time || t.notes || null;
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
