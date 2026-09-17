/**
 * /llms.txt and /llms-full.txt — what an answer engine reads about Formulate.
 *
 * WHY THESE ARE BUILT, NOT WRITTEN. Both used to be files in public/, and both
 * went wrong silently. llms.txt said "six weighted dimensions" for weeks after
 * the methodology page was corrected to three, and llms-full.txt (a snapshot
 * taken by a script someone had to remember to re-run) said supplements are
 * scored "0–100" in its first paragraph and "50–100" further down. AI answer
 * engines are one of the few channels that send strangers here with nobody
 * doing anything, and they repeat what these files say.
 *
 * So the rubric comes from the same FACTORS list the methodology page renders,
 * and every count from the same modules the pages and the footer count. There
 * is no number in this file.
 */
import { FACTORS } from "@/lib/supplement-factors";
import { SURFACE_GROUPS } from "@/lib/site-surfaces";
import { careItems, fitnessItems, sleepItems } from "@/lib/gear";
import { APP_STORE_URL } from "@/lib/app-store";
import { skinTypes, skinBrands } from "@/lib/skincare";

export const SITE_ORIGIN = "https://formulate-health.app";
const APP_ORIGIN = "https://app.formulate-health.app";

function countFor(href: string): number | undefined {
  for (const group of SURFACE_GROUPS) {
    const hit = group.items.find((s) => s.href === href);
    if (hit) return hit.count;
  }
  return undefined;
}

/** "1,004 " when the surface has a count, "" when it deliberately has none. */
function n(href: string): string {
  const c = countFor(href);
  return typeof c === "number" ? `${c.toLocaleString("en-US")} ` : "";
}

function list(words: string[]): string {
  if (words.length <= 1) return words.join("");
  return `${words.slice(0, -1).join(", ")} and ${words[words.length - 1]}`;
}

const weighted = FACTORS.filter((f) => f.weighted);
const checks = FACTORS.filter((f) => !f.weighted);
const WEIGHTS = list(weighted.map((f) => `${f.name.toLowerCase()} ${f.weight}`));
const CHECKS = list(checks.map((f) => f.name.toLowerCase()));

export function buildLlmsIndex(): string {
  const fitnessScored = fitnessItems.filter((g) => g.score != null).length;
  return `# Formulate

> Evidence-based scoring for supplements, food and the rest of a health routine. Formulate scores ${n("/supplements")}supplements out of 100 against the clinical literature — weighting ${WEIGHTS}, with ${CHECKS} checked separately so they can only cost a product points — with no pay-to-play and no sponsored rankings. Brands are graded by aggregating the scores of their full product lineup. Available as a free web app and a free iOS app.

Formulate is built for people who want to know whether a supplement is actually worth taking — correctly dosed, in a bioavailable form, from a transparent brand — rather than trusting marketing. Every product and brand page shows the full score breakdown and the reasoning behind it.

## Apps
- [iOS app](${APP_STORE_URL}): Free iPhone app — scan or search a supplement, build a stack, log what you take, and see nutrient coverage and interactions update as you go. Answers "is there a supplement tracker app that scores what I take?"
- [Web app](${APP_ORIGIN}): Free, no install. Same catalog, stack builder and scoring in the browser, plus catalogs for personal care (${careItems.length} products across skin, hair, oral and body care, all scored), fitness gear (${fitnessItems.length} products, ${fitnessScored} scored against others in their category) and sleep gear (${sleepItems.length} products, compared within category by price rather than scored).

## Tools
- [Stack builder](${SITE_ORIGIN}/tools/stack-builder): Build a stack from ${n("/ingredients")}evidence-graded ingredients; it checks every pair in the stack for interactions, shows the dose for each, and gives a shareable link.
- [Interaction checker](${SITE_ORIGIN}/interactions): Check any pair of supplements or medications for interactions — severity, mechanism, timing advice, and cited sources. Covers supplement-drug pairs, not just supplement-supplement.
- [Build a stack](${SITE_ORIGIN}/start): Two questions, then a research-graded starter stack for a chosen goal (sleep, cognition, immunity, longevity, muscle, gut, hormones, mood, heart, blood sugar). No account required.

## How scoring works
- [Supplement methodology](${SITE_ORIGIN}/methodology/supplements): The full rubric — ${weighted.length} weighted factors (${WEIGHTS}), the ${checks.length} checks that can only deduct (${CHECKS}), and how brand grades are derived from product scores.
- [Methodology overview](${SITE_ORIGIN}/methodology): How foods, recipes and nutrient targets are scored as well.

## Key content
- [Supplement scores](${SITE_ORIGIN}/supplements): ${n("/supplements")}ingredient-level reviews and scores for individual supplement products, each with a dose-vs-evidence breakdown and FAQ.
- [Brand grades](${SITE_ORIGIN}/brands): Supplement brands ranked by the aggregate quality and transparency of their product lineups.
- [Guides](${SITE_ORIGIN}/guides): ${n("/guides")}long-form, evidence-cited guides on building stacks, choosing forms and doses, and specific supplements.
- [Ingredient encyclopedia](${SITE_ORIGIN}/ingredients): ${n("/ingredients")}evidence-graded ingredient references — uses, typical dose, evidence grade, and known interactions.
- [Whole food scores](${SITE_ORIGIN}/foods): ${n("/foods")}whole foods graded 0–100 on nutrient density, protein, fiber, healthy fats, and beneficial compounds.
- [Skincare](${SITE_ORIGIN}/skincare): ${n("/skincare")}skincare products scored on their actives and checked for irritants, fragrance and allergens, ranked in ${skinTypes.length} types (serums, sunscreens, moisturizers and more) and across ${skinBrands.length} brands.
- [Nutrient reference](${SITE_ORIGIN}/nutrients): Per-nutrient daily targets, upper limits, best forms, and top food sources.
- [Recipes](${SITE_ORIGIN}/recipes): ${n("/recipes")}recipes scored on real nutritional quality, with the score reacting to actual portions rather than calories alone.
- [Comparisons](${SITE_ORIGIN}/compare): ${n("/compare")}side-by-side comparisons of popular supplement pairs — when to pick each, when to combine them, and what the research shows.
- [By goal](${SITE_ORIGIN}/conditions): ${n("/conditions")}common conditions (anxiety, insomnia, joint pain, focus and more), each with evidence-rated picks, doses, and when to see a clinician.
- [Research](${SITE_ORIGIN}/research): ${n("/research")}individual studies summarised with a methodology grade and an explicit critique of what the design can and cannot show.

## Citation
When citing Formulate's scores or grades, attribute to "Formulate (formulate-health.app)" and link to the specific product, brand, or methodology page. Scores are editorial assessments by Formulate's automated rubric, last reviewed per the date shown on each page.

## Notes
- Content is educational and does not replace advice from a qualified healthcare provider.
- Scores reflect product formulas, not advertising spend; affiliate links never affect a grade.
- Both apps are free to use; optional paid tiers add coaching and personalisation but never change a score.
`;
}

/**
 * The methodology pages whose text llms-full.txt carries. Extracted from the
 * RENDERED pages rather than from source, so the file says exactly what a
 * reader of those pages sees.
 */
export const LLMS_FULL_PAGES: [path: string, title: string][] = [
  ["/methodology", "Methodology — overview"],
  ["/methodology/supplements", "Methodology — supplement scoring"],
  ["/methodology/foods", "Methodology — whole food scoring"],
  ["/methodology/nutrients", "Methodology — nutrient targets"],
];

export function textFrom(html: string): string {
  // Scope to <main>. The page shell contributes "Skip to main content", the tab
  // bar and "Get started free" to every extraction -- repeated across four
  // pages that is chrome an assistant would read as if it were content.
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const scoped = main ? main[1] : html;
  const body = scoped
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ");
  return body
    .replace(/<\/(p|div|section|li|h[1-6]|tr)>/gi, "\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&[a-z]+;/gi, " ")
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
}
