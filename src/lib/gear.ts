/**
 * The three catalogs that are not supplements or food.
 *
 * WHY THEY ARRIVED LATE. The homepage's pillar picker has had five chips since
 * the console landed, and two of them filtered while three could only say
 * "browse →" and point into the app. That reads as "coming soon" about
 * catalogs that have been live for weeks. They were never gated — the data
 * simply was not in this repo. It is now, mirrored by scripts/sync-from-web.
 *
 * THE ONE RULE HERE: A SCORE IS SHOWN ONLY WHERE ONE EXISTS.
 *
 *   personal care   666 products (skin, hair, oral, body), every one scored,
 *                   on the same 0-100 scale as supplements and food
 *   fitness         133 products, 72 scored — and that number is a rank INSIDE
 *                   a category (the catalog carries rank / ranked_of /
 *                   comparison_label), not a cross-catalog score
 *   sleep           552 products, no score field at all
 *
 * Sleep is not missing a score; it declined one. A mask and a mattress share
 * no attribute a single number could rank, so the catalog compares within a
 * category and carries price bands instead. Manufacturing a number for the
 * sake of a consistent card would be inventing the one thing this site sells
 * itself on not inventing.
 *
 * So `score` is nullable and `price` fills the space where there is none.
 */
import skinData from "@/data/skin-catalog.json";
import hairData from "@/data/hair-catalog.json";
import oralData from "@/data/oral-catalog.json";
import bodyData from "@/data/body-catalog.json";
import fitnessData from "@/data/fitness-catalog.json";
import sleepData from "@/data/sleep-catalog.json";

export type GearKind = "care" | "fitness" | "sleep";

export interface GearItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  /** null where the catalog has no number, which is not the same as zero. */
  score: number | null;
  /** "$35–45", or a single price. Shown where there is no score. */
  price: string | null;
  image: string | null;
  kind: GearKind;
}

interface RawGear {
  id?: string;
  name?: string;
  brand?: string;
  category?: string;
  category_group?: string;
  subcategory?: string;
  score?: number | null;
  price_usd?: number | null;
  price_min?: number | null;
  price_max?: number | null;
  image_url?: string | null;
}

/** "lifting_accessories" → "Lifting accessories". The gear catalogs carry
 *  snake_case category keys where the supplement catalog carries prose. */
function pretty(s: string): string {
  const t = s.replace(/[_-]+/g, " ").trim();
  return t ? t[0].toUpperCase() + t.slice(1) : t;
}

/** A band where the catalog gives two numbers, one price where it gives one,
 *  null where it gives none — never a guess, and never "$0". */
function priceOf(p: RawGear): string | null {
  const one = typeof p.price_usd === "number" && p.price_usd > 0 ? p.price_usd : null;
  const lo = typeof p.price_min === "number" && p.price_min > 0 ? p.price_min : null;
  const hi = typeof p.price_max === "number" && p.price_max > 0 ? p.price_max : null;
  if (lo && hi && hi > lo) return `$${Math.round(lo)}–${Math.round(hi)}`;
  const single = one ?? lo ?? hi;
  if (single == null) return null;
  return single < 100 ? `$${single.toFixed(2).replace(/\.00$/, "")}` : `$${Math.round(single)}`;
}

function map(list: RawGear[], kind: GearKind): GearItem[] {
  const out: GearItem[] = [];
  for (const p of list) {
    if (!p.id || !p.name) continue;
    out.push({
      id: p.id,
      name: p.name,
      brand: p.brand ?? "",
      category: pretty(p.subcategory || p.category || p.category_group || ""),
      score: typeof p.score === "number" && p.score > 0 ? p.score : null,
      price: priceOf(p),
      image: p.image_url || null,
      kind,
    });
  }
  return out;
}

/* Personal care is four files and one pillar. The app splits skin, hair, oral
   and body because they are separate shelves to shop; a person picking a
   pillar on this page is not making that distinction yet. */
export const careItems: GearItem[] = [
  ...map((skinData as { products: RawGear[] }).products, "care"),
  ...map((hairData as { products: RawGear[] }).products, "care"),
  ...map((oralData as { products: RawGear[] }).products, "care"),
  ...map((bodyData as { products: RawGear[] }).products, "care"),
];

export const fitnessItems: GearItem[] = map(
  (fitnessData as { products: RawGear[] }).products,
  "fitness",
);

export const sleepItems: GearItem[] = map(
  (sleepData as { products: RawGear[] }).products,
  "sleep",
);

export const gearItems: GearItem[] = [...careItems, ...fitnessItems, ...sleepItems];
