/**
 * The skincare catalog, as the public site's ranked pages read it.
 *
 * WHY SKIN AND NOT ALL OF PERSONAL CARE. The site mirrors four personal-care
 * catalogs (skin, hair, oral, body). Only skin is scored in a form a page can
 * stand behind: 250 of 250 products at score_version 2.8.0, every efficacy
 * breakdown adding up to its total, a letter grade on each. Hair, oral and
 * body carry a score but no version or grade, and in 400 of 416 rows every
 * efficacy component reads 0 while the total does not — measured 2026-09-17,
 * identically in formulate-web's copy. A ranking whose reasons are blank
 * cannot be defended, so those three stay off until they are rescored.
 *
 * THE FORMULA IS CHECKED, NOT RESTATED. The pages say a skincare score is the
 * efficacy score, less a quarter point for every point safety falls below 95.
 * That held for 250 of 250 products when written. `assertFormula` runs when
 * this module loads, so if the scorer changes and the data stops following the
 * sentence, the build fails instead of the page quietly describing a rubric
 * the numbers no longer use.
 */
import skinData from "@/data/skin-catalog.json";

export const SAFETY_FLOOR = 95;
export const SAFETY_SEVERITY = 0.25;
/** A ranked page needs enough products to be a comparison, not a list of two. */
export const MIN_PRODUCTS_PER_PAGE = 5;
export const BEST_LIMIT = 10;

export type SkinComponent = {
  key: string;
  label: string;
  value: number;
  max: number;
  explanations?: string[];
  warnings?: string[];
  upgrades?: string[];
};

export type SkinProduct = {
  id: string;
  name: string;
  brand: string;
  brand_id: string;
  subcategory: string;
  image_url: string | null;
  source_url: string | null;
  score: number;
  efficacy_score: number;
  safety_score: number;
  price_usd: number | null;
  quantity: string | null;
  overview: string | null;
  actives: string[];
  flags: {
    fragrance_present: boolean;
    allergen_count: number;
    irritant_count: number;
    comedogenic_risk: number;
    active_count: number;
  };
  breakdown: {
    efficacy: { total: number; components: SkinComponent[] };
    safety: { total: number; deductions: SkinComponent[] };
  };
  grade: string;
  grade_color: string;
  ready?: boolean;
};

type SkinBrandRow = {
  id: string;
  name: string;
  slug: string;
  grade: string | null;
  score: number | null;
  product_count: number;
};

const raw = skinData as unknown as { products: SkinProduct[]; brands: SkinBrandRow[] };

export const skinProducts: SkinProduct[] = raw.products
  .filter((p) => p.ready !== false && typeof p.score === "number")
  .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

function assertFormula(products: SkinProduct[]) {
  const off = products.filter((p) => {
    const expected = p.efficacy_score - Math.max(0, SAFETY_FLOOR - p.safety_score) * SAFETY_SEVERITY;
    return Math.abs(Math.round(expected) - p.score) > 1;
  });
  if (off.length) {
    throw new Error(
      `skincare: ${off.length} products no longer follow "efficacy less ${SAFETY_SEVERITY} per point of safety below ${SAFETY_FLOOR}" ` +
        `(e.g. ${off[0].id}: score ${off[0].score}, efficacy ${off[0].efficacy_score}, safety ${off[0].safety_score}). ` +
        `Update the copy in lib/skincare.ts and the skincare pages before shipping.`,
    );
  }
}
assertFormula(skinProducts);

/** Product types, with the words a reader searches for. */
const TYPE_META: Record<string, { slug: string; plural: string; singular: string }> = {
  serum: { slug: "serums", plural: "Serums", singular: "serum" },
  moisturizer: { slug: "moisturizers", plural: "Moisturizers", singular: "moisturizer" },
  sunscreen: { slug: "sunscreens", plural: "Sunscreens", singular: "sunscreen" },
  toner: { slug: "toners", plural: "Toners", singular: "toner" },
  treatment: { slug: "treatments", plural: "Spot & Targeted Treatments", singular: "treatment" },
  mask: { slug: "face-masks", plural: "Face Masks", singular: "face mask" },
  exfoliant: { slug: "exfoliants", plural: "Exfoliants", singular: "exfoliant" },
  eye_cream: { slug: "eye-creams", plural: "Eye Creams", singular: "eye cream" },
  cleanser: { slug: "cleansers", plural: "Cleansers", singular: "cleanser" },
};

export type SkinType = {
  key: string;
  slug: string;
  plural: string;
  singular: string;
  products: SkinProduct[];
};

export const skinTypes: SkinType[] = Object.entries(
  skinProducts.reduce<Record<string, SkinProduct[]>>((acc, p) => {
    (acc[p.subcategory] ??= []).push(p);
    return acc;
  }, {}),
)
  .filter(([key, list]) => TYPE_META[key] && list.length >= MIN_PRODUCTS_PER_PAGE)
  .map(([key, list]) => ({ key, ...TYPE_META[key], products: list }))
  .sort((a, b) => b.products.length - a.products.length);

export function skinTypeBySlug(slug: string): SkinType | undefined {
  return skinTypes.find((t) => t.slug === slug);
}

export function skinTypeFor(p: SkinProduct): SkinType | undefined {
  return skinTypes.find((t) => t.key === p.subcategory);
}

export type SkinBrand = {
  slug: string;
  name: string;
  grade: string | null;
  score: number | null;
  products: SkinProduct[];
};

/**
 * Brands are grouped by NAME, not by brand_id. The export carries duplicate
 * brand records for one brand: "Dr. Jart+" is split 5 + 2 across
 * `dr-jartplus` and `dr.-jart`, and "Lancôme" 4 + 1 across `lancome` and
 * `lancôme` — which left Dr. Jart+'s page two products short and gave
 * Lancôme no page at all (neither half reached five). The upstream records
 * should be merged in formulate-web's catalog; until then the page groups what
 * is plainly one brand, and takes its URL from the record with the most
 * products whose slug is plain ASCII.
 */
function brandKey(name: string): string {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

export const skinBrands: SkinBrand[] = Object.values(
  skinProducts.reduce<Record<string, SkinProduct[]>>((acc, p) => {
    (acc[brandKey(p.brand)] ??= []).push(p);
    return acc;
  }, {}),
)
  .filter((products) => products.length >= MIN_PRODUCTS_PER_PAGE)
  .map((products) => {
    const counts = new Map<string, number>();
    for (const p of products) counts.set(p.brand_id, (counts.get(p.brand_id) ?? 0) + 1);
    const rows = raw.brands
      .filter((b) => counts.has(b.id) && b.slug)
      .sort(
        (a, b) =>
          Number(/^[a-z0-9-]+$/.test(b.slug)) - Number(/^[a-z0-9-]+$/.test(a.slug)) ||
          (counts.get(b.id) ?? 0) - (counts.get(a.id) ?? 0),
      );
    const row = rows[0];
    return {
      slug: row?.slug ?? brandKey(products[0].brand),
      name: products[0].brand,
      grade: row?.grade ?? null,
      score: row?.score ?? null,
      products,
    };
  })
  .sort((a, b) => b.products.length - a.products.length || a.name.localeCompare(b.name));

export function skinBrandBySlug(slug: string): SkinBrand | undefined {
  return skinBrands.find((b) => b.slug === slug);
}

export function skinBrandFor(p: SkinProduct): SkinBrand | undefined {
  return skinBrands.find((b) => b.products.includes(p));
}

/** Rank of a product inside its type, 1-based. */
export function rankInType(p: SkinProduct): number | null {
  const t = skinTypeFor(p);
  if (!t) return null;
  return t.products.indexOf(p) + 1;
}

/**
 * The one line that explains a product's score, read from its own breakdown:
 * the efficacy component closest to full marks, and — if safety cost it points
 * — the reason. Never written by hand.
 */
export function whyLine(p: SkinProduct): string {
  const parts: string[] = [];
  const best = [...(p.breakdown.efficacy.components ?? [])]
    .filter((c) => c.max > 0 && (c.explanations ?? []).some(Boolean))
    .sort((a, b) => b.value / b.max - a.value / a.max)[0];
  const lead = best?.explanations?.find(Boolean);
  if (lead) parts.push(lead);
  if (p.safety_score < SAFETY_FLOOR) {
    const worst = [...(p.breakdown.safety.deductions ?? [])]
      .filter((d) => d.value > 0 && (d.warnings ?? []).some(Boolean))
      .sort((a, b) => b.value - a.value)[0];
    const warning = worst?.warnings?.find(Boolean);
    parts.push(warning ? `Loses points on safety: ${warning.charAt(0).toLowerCase()}${warning.slice(1)}` : "Loses points on safety");
  } else if (!p.flags.fragrance_present) {
    parts.push("Fragrance-free");
  }
  return parts.join(". ").replace(/\.\./g, ".");
}

export function priceLabel(p: SkinProduct): string | null {
  if (typeof p.price_usd !== "number") return null;
  const price = `$${p.price_usd.toFixed(2)}`;
  return p.quantity ? `${price} · ${p.quantity}` : price;
}

/** The retailer the product was captured from, named by its host. */
export function retailerFor(p: SkinProduct): { url: string; host: string } | null {
  if (!p.source_url) return null;
  try {
    const u = new URL(p.source_url);
    return { url: u.toString(), host: u.hostname.replace(/^www\./, "") };
  } catch {
    return null;
  }
}

export const APP_SKIN_URL = "https://app.formulate-health.app/skin";
