import catalog from "@/data/recipes-catalog.json";

export type RecipeNutrition = {
  serving_size?: string | null;
  serving_weight_g?: number | null;
  calories?: number | null;
  protein_g?: number | null;
  carbs_g?: number | null;
  carbohydrate_g?: number | null;
  fat_g?: number | null;
  fiber_g?: number | null;
  sugar_g?: number | null;
  [k: string]: number | string | null | undefined;
};

export type RecipeScoreBreakdown = {
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

export type Recipe = {
  id: string;
  name: string;
  category: string;
  cuisine?: string | null;
  diet_tags?: string[];
  icon?: string | null;
  description?: string | null;
  servings?: number | null;
  prep_min?: number | null;
  cook_min?: number | null;
  difficulty?: string | null;
  ingredients?: string[];
  steps?: string[];
  tips?: string[];
  image_url: string | null;
  nutrition?: RecipeNutrition | null;
  score: number | null;
  grade: string | null;
  grade_color?: string | null;
  score_breakdown?: RecipeScoreBreakdown;
};

export const recipes: Recipe[] = (catalog.recipes as unknown as Recipe[]).filter(
  (r) => r.score != null && !!r.image_url,
);

export const recipeCount = recipes.length;

// Catalog-defined category order (Breakfast → Mains → … → Drinks).
export const RECIPE_CATEGORY_ORDER: string[] = (catalog.categories as string[]) ?? [];

export function recipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((r) => r.id === slug);
}

export function categorySlug(category: string): string {
  return category.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function recipeCategories(): { category: string; slug: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const r of recipes) counts[r.category] = (counts[r.category] ?? 0) + 1;
  const order = RECIPE_CATEGORY_ORDER.length ? RECIPE_CATEGORY_ORDER : Object.keys(counts);
  return order
    .filter((c) => counts[c])
    .map((category) => ({ category, slug: categorySlug(category), count: counts[category] }));
}

export function recipesByCategory(category: string): Recipe[] {
  return recipes.filter((r) => r.category === category).sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
}

export function categoryByCategorySlug(slug: string): string | null {
  return recipeCategories().find((c) => c.slug === slug)?.category ?? null;
}

export function relatedRecipes(r: Recipe, limit = 6): Recipe[] {
  return recipes
    .filter((x) => x.id !== r.id && x.category === r.category)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, limit);
}

export function totalMinutes(r: Recipe): number | null {
  const t = (r.prep_min ?? 0) + (r.cook_min ?? 0);
  return t > 0 ? t : null;
}

export function recipeColor(r: Pick<Recipe, "score" | "grade_color">): string {
  if (r.grade_color) return r.grade_color;
  const s = r.score ?? 0;
  if (s >= 90) return "#22C55E";
  if (s >= 80) return "#3B82F6";
  if (s >= 70) return "#F59E0B";
  if (s >= 60) return "#F97316";
  return "#EF4444";
}

export const RECIPE_BREAKDOWN_ROWS: { key: keyof RecipeScoreBreakdown; label: string }[] = [
  { key: "nutrient_density", label: "Nutrient density" },
  { key: "protein_quality", label: "Protein quality" },
  { key: "fiber_content", label: "Fiber content" },
  { key: "healthy_fats", label: "Healthy fats" },
  { key: "bioactive_compounds", label: "Bioactive compounds" },
  { key: "glycemic_impact", label: "Glycemic impact" },
];
