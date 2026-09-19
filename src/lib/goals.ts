/**
 * Supplements by goal, from what systematic reviews concluded.
 *
 * Data: src/data/goal-evidence.json, built by scripts/build-goal-evidence.mjs
 * from the Formulate hub's evidence_directions.json at a recorded commit. See
 * that script for why this is per-outcome review conclusions and never the
 * encyclopedia's overall letter grades.
 *
 * What a page may say is decided here, once:
 *  - An ingredient HELPS when at least one review set concluded a benefit on an
 *    outcome for this goal and none concluded no effect. If both, it is MIXED,
 *    and the page shows both rather than choosing.
 *  - Any HARM finding is shown in its own section, whatever else was found.
 *  - A goal gets a page only when MIN_HELPS ingredients help or are mixed.
 *    Below that it is a short list, not a comparison.
 */
import data from "@/data/goal-evidence.json";
import { ingredientBySlug } from "@/lib/encyclopedia";
import { topProductForIngredient } from "@/lib/ingredient-products";
import type { Product } from "@/lib/products";

export const MIN_HELPS = 5;

export type Direction = "benefit" | "no_effect" | "unclear" | "harm";

export type Finding = {
  direction: Direction;
  outcome: string;
  /** The name the review set used, when it differs from the display name. */
  as?: string;
  quote: string;
  quote_pmid: string;
  pmids: string[];
};

export type GoalIngredient = {
  name: string;
  slug: string | null;
  findings: Finding[];
};

export type Verdict = "helps" | "mixed" | "no_effect" | "unclear";

export type RankedIngredient = GoalIngredient & {
  verdict: Verdict;
  harm: Finding[];
  reviewCount: number;
  topProduct: Product | null;
};

export type Goal = {
  slug: string;
  label: string;
  condition?: string;
  ingredients: RankedIngredient[];
  helps: RankedIngredient[];
  mixed: RankedIngredient[];
  noEffect: RankedIngredient[];
  unclear: RankedIngredient[];
  harmed: RankedIngredient[];
};

type Raw = {
  _source: { file: string; commit: string; generated_at: string };
  goals: { slug: string; label: string; condition?: string; ingredients: GoalIngredient[] }[];
};
const raw = data as unknown as Raw;

export const goalEvidenceSource = raw._source;

function verdictOf(findings: Finding[]): Verdict {
  const benefit = findings.some((f) => f.direction === "benefit");
  const none = findings.some((f) => f.direction === "no_effect");
  if (benefit && none) return "mixed";
  if (benefit) return "helps";
  if (none) return "no_effect";
  return "unclear";
}

/**
 * One review quoted under two names (Vitamin C and "Ascorbic Acid", omega-3 and
 * "EPA") arrives as two identical findings. Shown twice, it reads as two
 * reviews agreeing.
 */
export function dedupeFindings<T extends Finding>(findings: T[]): T[] {
  const seen = new Set<string>();
  return findings.filter((f) => {
    const key = `${f.direction}|${f.quote_pmid}|${f.quote}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** The rule lives in lib/ingredient-products, because four surfaces state it. */
function topProductFor(slug: string | null): Product | null {
  return topProductForIngredient(slug ? ingredientBySlug(slug) : null);
}

function rank(i: GoalIngredient): RankedIngredient {
  const findings = dedupeFindings(i.findings);
  return {
    ...i,
    findings,
    verdict: verdictOf(findings),
    harm: findings.filter((f) => f.direction === "harm"),
    reviewCount: new Set(findings.flatMap((f) => f.pmids)).size,
    topProduct: topProductFor(i.slug),
  };
}

const byStrength = (a: RankedIngredient, b: RankedIngredient) =>
  b.findings.filter((f) => f.direction === "benefit").length - a.findings.filter((f) => f.direction === "benefit").length ||
  b.reviewCount - a.reviewCount ||
  a.name.localeCompare(b.name);

function build(g: Raw["goals"][number]): Goal {
  const ingredients = g.ingredients.map(rank);
  return {
    slug: g.slug,
    label: g.label,
    condition: g.condition,
    ingredients,
    helps: ingredients.filter((i) => i.verdict === "helps").sort(byStrength),
    mixed: ingredients.filter((i) => i.verdict === "mixed").sort(byStrength),
    noEffect: ingredients.filter((i) => i.verdict === "no_effect").sort((a, b) => a.name.localeCompare(b.name)),
    unclear: ingredients.filter((i) => i.verdict === "unclear").sort((a, b) => a.name.localeCompare(b.name)),
    harmed: ingredients.filter((i) => i.harm.length > 0).sort((a, b) => a.name.localeCompare(b.name)),
  };
}

const allGoals: Goal[] = raw.goals.map(build);

/** Goals that get their own /supplements/for page. */
export const goalPages: Goal[] = allGoals
  .filter((g) => !g.condition && g.helps.length + g.mixed.length >= MIN_HELPS)
  .sort((a, b) => a.label.localeCompare(b.label));

export function goalBySlug(slug: string): Goal | undefined {
  return goalPages.find((g) => g.slug === slug);
}

/** Review evidence for a hand-written /conditions page, if any. */
export function goalForCondition(conditionSlug: string): Goal | undefined {
  return allGoals.find((g) => g.condition === conditionSlug);
}

export function pubmedUrl(pmid: string): string {
  return `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
}

export const goalEvidenceDateLabel = new Date(raw._source.generated_at).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
});
