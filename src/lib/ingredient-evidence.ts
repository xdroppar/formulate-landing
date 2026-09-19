/**
 * Every review conclusion per ingredient — for the ingredient pages and the
 * review-conclusions report.
 *
 * Data: src/data/ingredient-evidence.json, written by
 * scripts/build-goal-evidence.mjs from the hub's evidence_directions.json at a
 * recorded commit (see that script, and lib/goals.ts for the per-goal cut of
 * the same rows).
 *
 * Findings measured in special populations (cancer, pregnancy, surgery,
 * children…) are kept in the data — the report counts the whole dataset — but
 * `forIngredientPage` leaves them out, for the same reason the goal pages do:
 * a general reader would apply them to themselves.
 */
import data from "@/data/ingredient-evidence.json";
import { dedupeFindings, type Finding } from "@/lib/goals";

export type IngredientFinding = Finding & { goal?: string; special?: boolean };

export type IngredientEvidence = {
  name: string;
  slug: string | null;
  findings: IngredientFinding[];
};

type Raw = {
  _source: { file: string; commit: string; generated_at: string };
  totals: { ingredients: number; conclusions: number; benefit: number; no_effect: number; unclear: number; harm: number };
  ingredients: IngredientEvidence[];
};
const raw = data as unknown as Raw;

export const evidenceTotals = raw.totals;
export const evidenceSource = raw._source;
export const allIngredientEvidence: IngredientEvidence[] = raw.ingredients;

const bySlug = new Map(raw.ingredients.filter((i) => i.slug).map((i) => [i.slug as string, i]));

export type PageEvidence = {
  name: string;
  benefit: IngredientFinding[];
  noEffect: IngredientFinding[];
  harm: IngredientFinding[];
  unclear: IngredientFinding[];
  /** Findings left out because they were measured in a special population. */
  specialCount: number;
};

export function forIngredientPage(slug: string): PageEvidence | null {
  const e = bySlug.get(slug);
  if (!e) return null;
  const general = dedupeFindings(e.findings.filter((f) => !f.special)) as IngredientFinding[];
  if (!general.length) return null;
  const pick = (d: Finding["direction"]) => general.filter((f) => f.direction === d);
  return {
    name: e.name,
    benefit: pick("benefit"),
    noEffect: pick("no_effect"),
    harm: pick("harm"),
    unclear: pick("unclear"),
    specialCount: e.findings.length - e.findings.filter((f) => !f.special).length,
  };
}

/** Per-ingredient counts over the WHOLE dataset, for the report. */
export type IngredientTally = {
  name: string;
  slug: string | null;
  total: number;
  benefit: number;
  no_effect: number;
  unclear: number;
  harm: number;
};

export const ingredientTallies: IngredientTally[] = raw.ingredients.map((i) => {
  const f = dedupeFindings(i.findings);
  const count = (d: Finding["direction"]) => f.filter((x) => x.direction === d).length;
  return {
    name: i.name,
    slug: i.slug,
    total: f.length,
    benefit: count("benefit"),
    no_effect: count("no_effect"),
    unclear: count("unclear"),
    harm: count("harm"),
  };
});
