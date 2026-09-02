import { existsSync } from "node:fs";
import { join } from "node:path";
import catalogData from "@/data/catalog.json";

export type ScoreComponent = {
  name: string;
  weight: number;
  raw_score: number;
  weighted_score: number;
  /**
   * Present only on GATE components (V3.23), which carry weight 0. The raw
   * score must stay at or above this floor; below it, the shortfall is
   * deducted from the total instead of the component contributing to it.
   */
  gate_floor?: number;
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

export type BrandComponents = {
  integrity: number;
  product_quality: number;
  innovation: number;
  transparency: number;
  verification: number;
};

export type BrandSummary = {
  slug: string;
  name: string;
  product_count: number;
  avg_score: number | null;
  score: number | null;
  grade: string | null;
  confidence?: "high" | "medium" | "low" | null;
  /**
   * True when the scorer does not stand behind this grade — confidence below
   * 0.50, or too few products to judge a company by. Ritual and Optimum
   * Nutrition are each graded on a SINGLE product. Render it as provisional;
   * a grade built on one product is not a verdict about a brand.
   */
  provisional?: boolean | null;
  components?: BrandComponents | null;
  standout?: string | null;
  top_category?: string | null;
  logo_url?: string | null;
  // tags are emitted by the exporter as rich objects ({text, color, icon})
  // but the landing renderer doesn't use them — leave typed loose rather
  // than couple this surface to the export shape.
  tags?: unknown[];
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

// Freshness signal for "Last reviewed" bylines + schema dateModified. Prefer the
// real scoring-engine update timestamp; fall back to the catalog export time.
// Surfacing a current date is a top E-E-A-T signal for YMYL/health content.
export const catalogUpdatedAt: string =
  catalog.latest_score_update ?? catalog.exported_at;

const REVIEW_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Stable, locale-independent "Month Year" for the visible "Last reviewed"
// byline (SSG-deterministic — no Date()/locale to keep prerender stable).
export function formatReviewDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})/.exec(iso);
  if (!m) return "";
  const month = REVIEW_MONTHS[Number(m[2]) - 1];
  return month ? `${month} ${m[1]}` : m[1];
}

// Shared label used across product, brand, and collection pages.
export const catalogReviewLabel = formatReviewDate(catalogUpdatedAt);

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

// ── "Best [category]" roundup helpers ────────────────────────────────────
// Powers the /supplements/best/[category] pSEO pages. Only categories with
// enough products to make a genuine ranking get a page — a "best of" with one
// product is thin content Google's helpful-content system penalizes.

/** Min products for a category to earn a ranked "best of" page. */
export const BEST_CATEGORY_MIN_PRODUCTS = 4;

/** URL-safe slug for a category name ("Amino Acids" → "amino-acids"). */
export function categorySlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Categories (by product count desc) that qualify for a "best of" page. */
export function bestCategories(): { category: string; slug: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of products) {
    const c = p.category?.trim();
    if (!c) continue;
    counts.set(c, (counts.get(c) ?? 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, n]) => n >= BEST_CATEGORY_MIN_PRODUCTS)
    .map(([category, count]) => ({ category, slug: categorySlug(category), count }))
    .sort((a, b) => b.count - a.count);
}

/** Resolve a category slug back to its canonical category name. */
export function categoryBySlug(slug: string): string | null {
  const match = bestCategories().find((c) => c.slug === slug);
  return match ? match.category : null;
}

/** Set of slugs that have a "best of" page — for cross-linking from the hub. */
export function bestCategorySlugSet(): Set<string> {
  return new Set(bestCategories().map((c) => c.slug));
}

/** Top-scoring products in a category, ranked, for the roundup page. */
export function topProductsByCategory(category: string, limit = 10): Product[] {
  return productsByCategory(category)
    .filter((p) => p.score !== null)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, limit);
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
