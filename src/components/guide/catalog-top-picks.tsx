/**
 * The top-scored products for a guide, read from the catalog at build.
 *
 * WHY THIS EXISTS. The roundup guides were written when the catalog held a
 * few brands, and named their picks by hand: "we evaluated 15 magnesium
 * products", a Thorne pick first. The catalog now holds ~1,000 products from
 * many brands and the ingest adds more every night, so by September 2026 the
 * magnesium guide's picks sat 11th, 20th and 25th of 118 and its "15" was
 * wrong by eight times. Correcting the prose would be correct exactly once.
 * This list is computed from the catalog every build, so it cannot go stale;
 * the prose keeps teaching forms, doses and red flags, which do not.
 *
 * WHY A RULE PER GUIDE, NOT A CATEGORY. Category alone was tried and read as
 * nonsense: the top "Multivitamins" were an inositol pill, a ZMA sleep
 * formula and a prenatal; the top "Adaptogens" were milk thistle and
 * berberine (the catalog's category field mixes two axes — see
 * catalog-category-two-axes). Each guide states what it is ranking.
 *
 * Server component — it reads the full catalog. Guide pages are server
 * rendered, so this never reaches a client bundle.
 */

import Image from "next/image";
import catalogJson from "@/data/catalog.json";
import { catalogUrl } from "./products";

interface CatalogIngredient {
  amount?: number | null;
}
interface CatalogProduct {
  slug: string;
  brand: string;
  name: string;
  category?: string;
  score?: number | string | null;
  image_url?: string | null;
  price_usd?: number | string | null;
  is_draft?: boolean | string;
  ingredients?: CatalogIngredient[] | null;
}

export interface PickRule {
  /** Keep products whose catalog category is one of these. */
  categories?: string[];
  /** Keep products whose name matches ANY of these (case-insensitive). */
  nameAny?: RegExp[];
  /** Drop products whose name matches any of these. */
  nameNone?: RegExp[];
  /** Dosed actives on the label, inclusive bounds. */
  minActives?: number;
  maxActives?: number;
}

const PRODUCTS = (catalogJson as { products: CatalogProduct[] }).products;

function num(v: unknown): number | null {
  const n = typeof v === "string" ? Number(v) : typeof v === "number" ? v : NaN;
  return Number.isFinite(n) ? n : null;
}

function activeCount(p: CatalogProduct): number {
  return (p.ingredients ?? []).filter((i) => (num(i?.amount) ?? 0) > 0).length;
}

/** "Creatine - Strawberry" and "Creatine - Travel Packs" are one product. */
function baseName(p: CatalogProduct): string {
  return `${p.brand}|${p.name.split(/\s+[-–—]\s+/)[0].trim().toLowerCase()}`;
}

/** Every product a rule admits, best score first, one row per base product. */
export function catalogPicks(rule: PickRule): CatalogProduct[] {
  const seen = new Set<string>();
  const out: CatalogProduct[] = [];
  const pool = PRODUCTS.filter((p) => {
    if (num(p.score) == null) return false;
    if (p.is_draft === true || p.is_draft === "True") return false;
    if (rule.categories && !rule.categories.includes(p.category ?? "")) return false;
    if (rule.nameAny && !rule.nameAny.some((r) => r.test(p.name))) return false;
    if (rule.nameNone && rule.nameNone.some((r) => r.test(p.name))) return false;
    const n = activeCount(p);
    if (rule.minActives != null && n < rule.minActives) return false;
    if (rule.maxActives != null && n > rule.maxActives) return false;
    return true;
  }).sort((a, b) => (num(b.score) ?? 0) - (num(a.score) ?? 0) || a.name.localeCompare(b.name));
  for (const p of pool) {
    const k = baseName(p);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(p);
  }
  return out;
}

/** How many products the catalog holds under a rule — for a sentence. */
export function CatalogCount({ rule }: { rule: PickRule }) {
  return <>{catalogPicks(rule).length}</>;
}

function scoreColor(score: number): string {
  return score >= 85 ? "#10B981" : score >= 70 ? "#3B82F6" : score >= 55 ? "#F59E0B" : "#EF4444";
}

export function CatalogTopPicks({
  rule,
  what,
  n = 5,
}: {
  rule: PickRule;
  /** What is being ranked, mid-sentence: "creatine monohydrate products". */
  what: string;
  n?: number;
}) {
  const all = catalogPicks(rule);
  const top = all.slice(0, n);
  if (!top.length) return null;
  return (
    <div className="not-prose my-8">
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-muted">
          Top-scored in the catalog right now
        </div>
        <div className="text-[11px] text-muted">
          {top.length} of {all.length} {what}
        </div>
      </div>
      <ol className="flex flex-col gap-2">
        {top.map((p, i) => {
          const score = Math.round(num(p.score) ?? 0);
          const price = num(p.price_usd);
          return (
            <li key={p.slug}>
              <a
                href={catalogUrl(p.slug)}
                className="group flex items-center gap-3 p-3 rounded-xl bg-surface border border-border hover:border-accent/30 transition-all"
              >
                <span className="w-5 text-[11px] font-bold text-muted tabular-nums">{i + 1}</span>
                <span className="w-10 h-10 rounded-lg bg-surface2 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {p.image_url ? (
                    <Image src={p.image_url} alt="" width={36} height={36} className="object-contain" />
                  ) : null}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[13px] font-semibold text-text group-hover:text-accent transition-colors truncate">
                    {p.name}
                  </span>
                  <span className="block text-[11px] text-muted">
                    {p.brand}
                    {price != null ? ` · $${price.toFixed(2)}` : ""}
                  </span>
                </span>
                <span
                  className="text-[15px] font-extrabold tabular-nums"
                  style={{ color: scoreColor(score) }}
                  aria-label={`Score ${score} of 100`}
                >
                  {score}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
      <p className="mt-2 text-[11px] text-muted leading-relaxed">
        Recomputed from the catalog every time this page is built, so it moves as products are
        added and rescored. Flavours and pack sizes of one product count once.
      </p>
    </div>
  );
}
