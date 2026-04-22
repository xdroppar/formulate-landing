import { existsSync } from "node:fs";
import { join } from "node:path";
import catalogData from "@/data/catalog.json";

export type ScoreComponent = {
  name: string;
  weight: number;
  raw_score: number;
  weighted_score: number;
};

export type Ingredient = {
  name: string;
  amount: number | null;
  unit: string | null;
  form_details: string | null;
  daily_value_pct: number | null;
};

export type Product = {
  id: string;
  slug: string;
  brand: string;
  brand_slug: string;
  name: string;
  category: string;
  category_tags: string[];
  score: number | null;
  grade: string | null;
  image_url: string | null;
  gallery_images: string[];
  price_usd: number | null;
  serving_size: string | null;
  servings_per_container: number | null;
  form: string | null;
  ingredients: Ingredient[];
  other_ingredients: string[];
  certifications: string[];
  score_components: ScoreComponent[];
  explanation: string | null;
  description: string | null;
  overview: string | null;
  recommended_use: string | null;
  warnings: string | null;
  amazon_url: string | null;
  iherb_url: string | null;
  url: string | null;
  is_draft: boolean;
};

export type BrandSummary = {
  slug: string;
  name: string;
  product_count: number;
  avg_score: number | null;
  score: number | null;
  grade: string | null;
};

type Catalog = {
  version: string;
  exported_at: string;
  latest_score_update: string | null;
  product_count: number;
  brand_count: number;
  products: Product[];
  brands: BrandSummary[];
};

const catalog = catalogData as Catalog;

export const products: Product[] = catalog.products.filter(
  (p) => !p.is_draft && p.score !== null,
);

const bySlug = new Map(products.map((p) => [p.slug, p]));

export function productBySlug(slug: string): Product | undefined {
  return bySlug.get(slug);
}

// Precomputed at module load (server-side, SSG). Maps image_url → thumb variant
// when a thumb.webp sits on disk next to the primary. `unoptimized: true` in
// next.config.ts disables Next/Vercel's image resizer, so card-sized surfaces
// must reference the pre-generated ~256px thumb to avoid shipping full-size
// product photography (often 4000×4000) for a 140px card.
const thumbBySrc: Map<string, string> = (() => {
  const map = new Map<string, string>();
  const publicDir = join(process.cwd(), "public");
  for (const p of products) {
    if (!p.image_url) continue;
    const candidate = p.image_url.replace(/\/primary\.webp$/, "/thumb.webp");
    if (candidate === p.image_url) continue;
    try {
      if (existsSync(join(publicDir, candidate))) map.set(p.image_url, candidate);
    } catch {
      // fs unavailable (e.g. accidental client bundle) — fall back to primary
    }
  }
  return map;
})();

export function thumbUrl(p: Product): string | null {
  if (!p.image_url) return null;
  return thumbBySrc.get(p.image_url) ?? p.image_url;
}

export function productsByCategory(category: string): Product[] {
  const key = category.toLowerCase();
  return products.filter((p) => p.category.toLowerCase() === key);
}

export function relatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (p.category === product.category ||
          p.category_tags.some((t) => product.category_tags.includes(t))),
    )
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, limit);
}

export function scoreGrade(score: number | null): {
  letter: string;
  color: string;
} {
  if (score === null) return { letter: "—", color: "#6B7280" };
  if (score >= 87) return { letter: "A", color: "#10B981" };
  if (score >= 80) return { letter: "A-", color: "#10B981" };
  if (score >= 73) return { letter: "B+", color: "#3B82F6" };
  if (score >= 67) return { letter: "B", color: "#3B82F6" };
  if (score >= 60) return { letter: "B-", color: "#3B82F6" };
  if (score >= 53) return { letter: "C+", color: "#F59E0B" };
  if (score >= 47) return { letter: "C", color: "#F59E0B" };
  if (score >= 40) return { letter: "C-", color: "#F59E0B" };
  return { letter: "D", color: "#EF4444" };
}

export function formatIngredientAmount(ing: Ingredient): string {
  if (ing.amount === null) return ing.form_details ?? "";
  const amount = Number.isInteger(ing.amount)
    ? ing.amount.toString()
    : ing.amount.toFixed(2).replace(/\.?0+$/, "");
  return `${amount}${ing.unit ? ` ${ing.unit}` : ""}`;
}

// ── Brand helpers ───────────────────────────────────────────────────────────

export const brands: BrandSummary[] = [...catalog.brands]
  .filter((b) => b.product_count > 0)
  .sort((a, b) => b.product_count - a.product_count);

const brandBySlugMap = new Map(brands.map((b) => [b.slug, b]));

export function brandBySlug(slug: string): BrandSummary | undefined {
  return brandBySlugMap.get(slug);
}

export function productsForBrand(brandSlug: string): Product[] {
  return products
    .filter((p) => p.brand_slug === brandSlug)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
}

export function brandCategoryBreakdown(brandSlug: string): { category: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const p of productsForBrand(brandSlug)) {
    const key = p.category || "Other";
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return Object.entries(counts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}
