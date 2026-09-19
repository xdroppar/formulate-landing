/**
 * Sleep gear, as the public site's ranked pages read it.
 *
 * Facts (name, brand, price, photo, maker link) come from src/data/sleep-catalog.json,
 * mirrored from formulate-web by sync-from-web. Scores come from
 * src/data/sleep-scores.json, copied from the web app's own sleep scorer by
 * scripts/sync-sleep-scores.mjs — the scoring rule lives only there. See that
 * script for why.
 *
 * WHAT THE SCORE IS. "Declared quality": built from what a maker STATES about
 * materials, cooling, support, function, certification and durability, weighted
 * for the kind of product, and compared only with the same kind — a mattress
 * with mattresses, a platform bed with platform beds (bed frames and CPAP are
 * split into two comparison sets each). It is not a lab test, and the pages say
 * so. Products that state too little to grade are not ranked.
 */
import catalog from "@/data/sleep-catalog.json";
import scoresData from "@/data/sleep-scores.json";

/** A ranked list needs enough products to be a comparison. */
export const MIN_PER_PEER = 5;
export const BEST_LIMIT = 10;

type RawProduct = {
  id: string;
  name: string;
  brand: string;
  category: string;
  description?: string | null;
  price_min?: number | null;
  price_max?: number | null;
  url?: string | null;
  url_ok?: boolean;
  image_url?: string | null;
};

type RawCategory = { id: string; name: string; description?: string; group: string };
type Score = { quality: number; grade: string; peer: string; attributes: string[]; cautions: string[] };

const raw = catalog as unknown as {
  products: RawProduct[];
  categories: Record<string, RawCategory>;
  groups: Record<string, { name: string; categories: string[] }>;
};
const scores = (scoresData as unknown as { _source: { generated_at: string }; scores: Record<string, Score> });

export const sleepScoresTakenAt = new Date(scores._source.generated_at);
export const sleepCatalogSize = raw.products.length;

export type SleepProduct = RawProduct & Score;

export const sleepScored: SleepProduct[] = raw.products
  .filter((p) => scores.scores[p.id])
  .map((p) => ({ ...p, ...scores.scores[p.id] }))
  .sort((a, b) => b.quality - a.quality || a.name.localeCompare(b.name));

export type SleepPeerSet = { label: string; products: SleepProduct[] };

export type SleepCategory = {
  key: string;
  slug: string;
  name: string;
  description: string;
  group: string;
  products: SleepProduct[];
  peers: SleepPeerSet[];
};

export const sleepCategories: SleepCategory[] = Object.values(raw.categories)
  .map((c) => {
    const products = sleepScored.filter((p) => p.category === c.id);
    const byPeer = new Map<string, SleepProduct[]>();
    for (const p of products) byPeer.set(p.peer, [...(byPeer.get(p.peer) ?? []), p]);
    const peers = [...byPeer.entries()]
      .map(([label, list]) => ({ label, products: list }))
      .filter((s) => s.products.length >= MIN_PER_PEER)
      .sort((a, b) => b.products.length - a.products.length);
    return {
      key: c.id,
      slug: c.id.replace(/_/g, "-"),
      name: c.name,
      description: c.description ?? "",
      group: raw.groups[c.group]?.name ?? "",
      products,
      peers,
    };
  })
  .filter((c) => c.peers.length > 0)
  .sort((a, b) => b.products.length - a.products.length);

export function sleepCategoryBySlug(slug: string): SleepCategory | undefined {
  return sleepCategories.find((c) => c.slug === slug);
}

export function sleepPriceLabel(p: SleepProduct): string | null {
  const fmt = (n: number) => `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  if (typeof p.price_min !== "number") return null;
  if (typeof p.price_max === "number" && p.price_max > p.price_min) return `${fmt(p.price_min)}–${fmt(p.price_max)}`;
  return fmt(p.price_min);
}

/** The maker's page, only where the last link check found it working. */
export function makerLink(p: SleepProduct): { url: string; host: string } | null {
  if (!p.url || p.url_ok === false) return null;
  try {
    const u = new URL(p.url);
    return { url: u.toString(), host: u.hostname.replace(/^www\./, "") };
  } catch {
    return null;
  }
}
