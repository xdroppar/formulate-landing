/** Mirrors the desktop app's BrandedProduct — trimmed for web catalog */
export interface CatalogProduct {
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
  ingredients: CatalogIngredient[];
  other_ingredients: string[];
  certifications: string[];
  score_components: ScoreComponent[];
  explanation: string | null;
  amazon_url: string | null;
  iherb_url: string | null;
  url: string | null;
  /** dev-only: unreleased/draft products */
  is_draft?: boolean;
}

export interface CatalogIngredient {
  name: string;
  amount: number | null;
  unit: string | null;
  form_details: string | null;
  daily_value_pct: number | null;
}

export interface ScoreComponent {
  name: string;
  weight: number;
  raw_score: number;
  weighted_score: number;
}

export interface BrandComponents {
  integrity: number;
  product_quality: number;
  innovation: number;
  transparency: number;
  verification: number;
}

export interface BrandTag {
  text: string;
  color: string;
  icon: string;
}

export interface CatalogBrand {
  slug: string;
  name: string;
  product_count: number;
  avg_score: number | null;
  score: number | null;
  grade: string | null;
  confidence: string | null;
  components: BrandComponents | null;
  standout: string | null;
  tags: BrandTag[];
  top_category: string | null;
  logo_url: string | null;
}

export interface CatalogData {
  version: string;
  exported_at: string;
  product_count: number;
  brand_count: number;
  products: CatalogProduct[];
  brands: CatalogBrand[];
}

export type UserRole = "dev" | "user" | "anonymous";
