/**
 * The shelf's six products — chosen on the SERVER, at build time.
 *
 * This lives apart from the component for one reason: the whole console tree
 * is `"use client"`, and the three catalogs it picks from are 2,185 rows.
 * Importing them from a client component pulls every one of those rows into
 * the browser bundle — Turbopack refused to generate the chunk at all, which
 * is a kinder failure than shipping it. So the catalogs are read here, six
 * small objects come out, and the client renders those.
 *
 * `color` is resolved here too, for the same reason: scoreGrade lives in
 * lib/products, which imports the supplement catalog at module scope.
 *
 * Nothing is typed. Highest score with a photograph, no brand twice. Re-score
 * a catalog and the shelf follows it.
 */
import catalogData from "@/data/catalog.json";
import foodsData from "@/data/whole-foods-catalog.json";
import recipesData from "@/data/recipes-catalog.json";
import { scoreGrade } from "@/lib/products";

export type ShelfCard = {
  key: string;
  catalog: string;
  name: string;
  sub: string;
  score: number;
  color: string;
  image: string;
  href: string;
};

type Row = {
  name?: string;
  score?: number | null;
  image_url?: string;
  brand?: string;
  group?: string;
  category?: string;
  slug?: string;
  id?: string;
  base_id?: string;
};

function pick(
  rows: Row[],
  count: number,
  catalog: string,
  href: (r: Row) => string,
  sub: (r: Row) => string,
  usedBrands: Set<string>,
): ShelfCard[] {
  const out: ShelfCard[] = [];
  const sorted = rows
    .filter((r) => typeof r.score === "number" && !!r.image_url && !!r.name)
    .sort((a, b) => (b.score as number) - (a.score as number));

  for (const r of sorted) {
    if (out.length >= count) break;
    const brand = (r.brand ?? "").toLowerCase();
    if (brand && usedBrands.has(brand)) continue;
    if (brand) usedBrands.add(brand);
    const score = r.score as number;
    out.push({
      key: `${catalog}:${r.slug ?? r.base_id ?? r.id ?? r.name}`,
      catalog,
      name: r.name as string,
      sub: sub(r),
      score,
      color: scoreGrade(score).color,
      image: (r.image_url as string).split("?")[0],
      href: href(r),
    });
  }
  return out;
}

const products = (catalogData as { products: Row[] }).products;
const foods = (foodsData as { foods: Row[] }).foods;
const recipes = (recipesData as { recipes: Row[] }).recipes;

export function getShelfCards(): ShelfCard[] {
  const used = new Set<string>();
  return [
    ...pick(products, 2, "Supplements", (r) => `/supplements/${r.slug}`, (r) => r.brand ?? "", used),
    ...pick(foods, 2, "Whole foods", (r) => `/foods/${r.base_id}`, (r) => r.group ?? "", used),
    ...pick(recipes, 2, "Recipes", (r) => `/recipes/${r.id}`, (r) => r.category ?? "", used),
  ];
}

/** Every scored thing on this site, counted rather than claimed. */
export function getScoredTotal(): number {
  const scored = (rows: Row[]) => rows.filter((r) => typeof r.score === "number").length;
  return scored(products) + scored(foods) + scored(recipes);
}
