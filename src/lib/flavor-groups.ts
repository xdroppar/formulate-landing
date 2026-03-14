/**
 * Groups flavor-variant products into a single representative card.
 *
 * Products like "Creatine - Strawberry" and "Creatine - Pineapple Orange"
 * are merged into one card with flavor switching chips.
 *
 * Rules:
 * - Only products with a known flavor word in the name get grouped
 * - Products without a flavor word (e.g., plain "Creatine") stay as separate cards
 * - Combo products with "+" (e.g., "Creatine + Alpha GPC") are never grouped
 * - Travel Packs, Sustained Release, etc. are not flavors
 */

import type { CatalogProduct } from "./types";

/* ── Known flavor words (lowercase) ────────────────────────────────── */
const FLAVOR_WORDS = new Set([
  "strawberry", "cherry", "raspberry", "cranberry", "pomegranate",
  "watermelon", "orange", "mango", "peach", "pineapple", "banana",
  "coconut", "caramel", "lemon", "citrus", "lime", "limeade",
  "chocolate", "mocha", "cocoa", "vanilla", "blueberry", "grape",
  "berry", "mint", "peppermint", "spearmint", "matcha",
  "unflavored", "plain",
]);

/* ── Flavor → pill color mapping ───────────────────────────────────── */
export const FLAVOR_COLORS: Record<string, { bg: string; text: string }> = {
  strawberry:  { bg: "rgba(239,68,68,0.18)",   text: "#F87171" },
  cherry:      { bg: "rgba(220,38,38,0.18)",   text: "#EF4444" },
  raspberry:   { bg: "rgba(236,72,153,0.18)",  text: "#F472B6" },
  cranberry:   { bg: "rgba(220,38,38,0.18)",   text: "#EF4444" },
  pomegranate: { bg: "rgba(190,18,60,0.18)",   text: "#E11D48" },
  watermelon:  { bg: "rgba(251,113,133,0.18)", text: "#FB7185" },
  orange:      { bg: "rgba(249,115,22,0.18)",  text: "#FB923C" },
  mango:       { bg: "rgba(251,146,60,0.18)",  text: "#FDBA74" },
  peach:       { bg: "rgba(251,146,60,0.18)",  text: "#FDBA74" },
  pineapple:   { bg: "rgba(250,204,21,0.18)",  text: "#FACC15" },
  banana:      { bg: "rgba(250,204,21,0.18)",  text: "#EAB308" },
  coconut:     { bg: "rgba(245,245,244,0.40)", text: "#78716C" },
  caramel:     { bg: "rgba(180,83,9,0.18)",    text: "#D97706" },
  lemon:       { bg: "rgba(250,204,21,0.18)",  text: "#EAB308" },
  citrus:      { bg: "rgba(250,204,21,0.18)",  text: "#EAB308" },
  lime:        { bg: "rgba(132,204,22,0.18)",  text: "#84CC16" },
  limeade:     { bg: "rgba(132,204,22,0.18)",  text: "#84CC16" },
  chocolate:   { bg: "rgba(120,53,15,0.22)",   text: "#A16207" },
  mocha:       { bg: "rgba(120,53,15,0.22)",   text: "#A16207" },
  cocoa:       { bg: "rgba(120,53,15,0.22)",   text: "#A16207" },
  vanilla:     { bg: "rgba(194,154,108,0.25)", text: "#D4A574" },
  blueberry:   { bg: "rgba(99,102,241,0.18)",  text: "#818CF8" },
  grape:       { bg: "rgba(139,92,246,0.18)",  text: "#A78BFA" },
  berry:       { bg: "rgba(139,92,246,0.18)",  text: "#A78BFA" },
  mint:        { bg: "rgba(16,185,129,0.18)",  text: "#34D399" },
  peppermint:  { bg: "rgba(16,185,129,0.18)",  text: "#34D399" },
  spearmint:   { bg: "rgba(16,185,129,0.18)",  text: "#34D399" },
  matcha:      { bg: "rgba(34,197,94,0.18)",   text: "#4ADE80" },
  unflavored:  { bg: "rgba(245,245,244,0.30)", text: "#78716C" },
  plain:       { bg: "rgba(245,245,244,0.30)", text: "#78716C" },
};

const DEFAULT_FLAVOR_COLOR = { bg: "rgba(100,116,139,0.18)", text: "#94A3B8" };

export function getFlavorColor(label: string): { bg: string; text: string } {
  const key = label.toLowerCase().trim();
  if (key in FLAVOR_COLORS) return FLAVOR_COLORS[key];
  // Partial match
  for (const [fk, colors] of Object.entries(FLAVOR_COLORS)) {
    if (key.includes(fk) || fk.includes(key)) return colors;
  }
  return DEFAULT_FLAVOR_COLOR;
}

/** A flavor variant visible on a card */
export interface FlavorVariant {
  id: string;
  slug: string;
  label: string;        // e.g. "Strawberry", "Pineapple Orange"
  image_url: string | null;
  gallery_images: string[];
  price_usd: number | null;
  servings_per_container: number | null;
  score: number | null;
}

export interface GroupedProduct {
  /** The representative product shown on the card */
  product: CatalogProduct;
  /** Flavor variants (including the representative). Empty if no grouping. */
  variants: FlavorVariant[];
}

/**
 * Extract the flavor label from a product name.
 * Returns null if no known flavor word is found.
 *
 * Examples:
 *   "Creatine - Strawberry" → "Strawberry"
 *   "Creatine - Pineapple Orange" → "Pineapple Orange"
 *   "Creatine" → null
 *   "Creatine + Alpha GPC" → null
 */
function extractFlavor(name: string): string | null {
  // Combo products are never flavors
  if (name.includes("+")) return null;

  // Look for "Name - Flavor" pattern
  const dashIdx = name.indexOf(" - ");
  if (dashIdx === -1) return null;

  const afterDash = name.slice(dashIdx + 3).trim();
  // Strip colon descriptions: "Strawberry: High-quality..." → "Strawberry"
  const label = afterDash.includes(":") ? afterDash.split(":")[0].trim() : afterDash;

  // Check if any word in the label is a known flavor
  const words = label.toLowerCase().split(/\s+/);
  const hasFlavor = words.some((w) => FLAVOR_WORDS.has(w));
  if (!hasFlavor) return null;

  return label;
}

/**
 * Extract the base name (without flavor) for grouping.
 * "Creatine - Strawberry" → "creatine" (brand-scoped)
 */
function baseKey(product: CatalogProduct): string | null {
  const flavor = extractFlavor(product.name);
  if (!flavor) return null;

  const dashIdx = product.name.indexOf(" - ");
  const base = product.name.slice(0, dashIdx).trim().toLowerCase();
  return `${product.brand_slug}|${base}`;
}

/**
 * Group products by flavor variants.
 *
 * Returns a list of GroupedProduct objects:
 * - Products with 2+ flavor siblings → grouped with variants[]
 * - All other products → standalone (variants = [])
 */
export function buildFlavorGroups(products: CatalogProduct[]): GroupedProduct[] {
  // Pass 1: bucket products by base key
  const buckets = new Map<string, CatalogProduct[]>();
  const standalone: CatalogProduct[] = [];

  for (const p of products) {
    const key = baseKey(p);
    if (key) {
      const bucket = buckets.get(key) || [];
      bucket.push(p);
      buckets.set(key, bucket);
    } else {
      standalone.push(p);
    }
  }

  // Pass 2: build grouped products
  const result: GroupedProduct[] = [];
  const hiddenIds = new Set<string>();

  for (const [, bucket] of buckets) {
    if (bucket.length < 2) {
      // Single flavor product — show as standalone
      result.push({ product: bucket[0], variants: [] });
      continue;
    }

    // Pick representative: highest score, then first alphabetically
    const sorted = [...bucket].sort((a, b) => {
      const scoreDiff = (b.score ?? 0) - (a.score ?? 0);
      if (scoreDiff !== 0) return scoreDiff;
      return a.name.localeCompare(b.name);
    });
    const representative = sorted[0];

    // Build variant list
    const variants: FlavorVariant[] = sorted.map((p) => ({
      id: p.id,
      slug: p.slug,
      label: extractFlavor(p.name) || p.name,
      image_url: p.image_url,
      gallery_images: p.gallery_images,
      price_usd: p.price_usd,
      servings_per_container: p.servings_per_container,
      score: p.score,
    }));

    result.push({ product: representative, variants });

    // Mark non-representative products as hidden
    for (const p of sorted.slice(1)) {
      hiddenIds.add(p.id);
    }
  }

  // Add standalone products
  for (const p of standalone) {
    if (!hiddenIds.has(p.id)) {
      result.push({ product: p, variants: [] });
    }
  }

  return result;
}
