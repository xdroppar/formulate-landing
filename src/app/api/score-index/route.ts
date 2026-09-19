import { NextResponse } from "next/server";
import { products as catalogProducts, type Product, type ScoreComponent } from "@/lib/products";
import { foods as allFoods, type Food } from "@/lib/foods";
import { scoreTierColor } from "@/lib/score-tier-color";
import { gearItems } from "@/lib/gear";
import type { ScoreItem } from "@/lib/score-index";

/**
 * The homepage builder's catalog, served on demand instead of embedded in the page.
 *
 * WHY IT MOVED. Inlining it put ~212 KB into the homepage — and Next embeds a
 * server component's props TWICE, once in the HTML and again in the RSC
 * payload, so it was ~424 KB of a 560 KB document. On a landing page that is
 * the wrong 424 KB: nobody needs the catalog to read the headline, and most
 * visitors never type anything at all.
 *
 * Fetched when the builder comes near the screen (see ConsoleBuilder), and
 * cached by the CDN so it costs one request per visitor at most. The rows
 * carry only what the builder renders; lib/score-index types both ends.
 *
 * Single source of truth with the page: the same tier table and the same two
 * `why` derivations, so a score cannot wear one colour here and another there.
 */

/** The most decisive line from a supplement's weighted score components. */
function scoreWhy(p: Product): string {
  const parts = (p.score_components ?? []).filter(
    (c): c is ScoreComponent => !!c && (c.weight ?? 0) > 0,
  );
  if (!parts.length) return "Scored on evidence, dose and form.";
  const sorted = [...parts].sort((a, b) => (a.raw_score ?? 100) - (b.raw_score ?? 100));
  const weakest = sorted[0];
  const pick = (weakest.raw_score ?? 100) < 85 ? weakest : sorted[sorted.length - 1];
  // 236 of the 628 distinct explanation strings are enumerations rather than
  // findings ("1 clinical: Magnesium"), and they sort first on most components.
  const findings = (pick.explanations ?? []).filter(
    (e) => e && e.length > 8 && !/^\d+\s+(clinical|good|other|fair|poor)\b/i.test(e),
  );
  const line = findings.sort((a, b) => b.length - a.length)[0];
  return line ? `${pick.name}: ${line}` : `${pick.name}: ${pick.raw_score}/100`;
}

/** The same shape of answer for a whole food, which has no score_components. */
function foodWhy(f: Food): string {
  const b = f.score_breakdown;
  const concern = b?.concerns?.find((c) => c && c.length > 3);
  if (concern) return concern;
  const top = b?.top_nutrients?.[0];
  if (top) return `High in ${top[0]}`;
  return "Scored on nutrient density";
}

export const dynamic = "force-static";

export function GET() {
  const items: ScoreItem[] = [
    ...catalogProducts
      .filter((p) => p.score != null)
      .map((p) => ({
        slug: p.slug,
        name: p.name,
        brand: p.brand,
        score: p.score as number,
        color: scoreTierColor(p.score as number),
        why: scoreWhy(p),
        kind: "supplement" as const,
      })),
    // Recipes are deliberately absent: supplements run a median of 89 and whole
    // foods 87, but recipes a median of 61 with 325 of 719 below 60. In one
    // ranked list the lowest score would be a recipe nearly every time — not
    // because it is worse but because it is marked harder — and the weak-point
    // verdict would confidently name the wrong thing.
    ...allFoods
      .filter((f) => f.score != null)
      .map((f) => ({
        slug: "food-" + f.base_id,
        name: f.name,
        brand: [f.group, f.subgroup].filter(Boolean).join(" · "),
        score: f.score as number,
        color: scoreTierColor(f.score as number),
        why: foodWhy(f),
        kind: "food" as const,
      })),
    /* Personal care, fitness and sleep.
       These arrive with `score` possibly null and a `price` in its place —
       see lib/gear for why sleep has no number and why that is deliberate
       rather than missing. The builder renders whichever it is given; nothing
       downstream may substitute one for the other. */
    ...gearItems.map((g) => ({
      slug: `${g.kind}-${g.id}`,
      name: g.name,
      brand: g.brand || g.category,
      score: g.score,
      color: g.score != null ? scoreTierColor(g.score) : "",
      why: g.category,
      price: g.price,
      kind: g.kind,
    })),
  ];

  return NextResponse.json(
    { items },
    { headers: { "cache-control": "public, max-age=3600, s-maxage=86400" } },
  );
}
