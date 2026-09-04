import raw from "@/data/evidence-profiles.json";

/**
 * How much human literature exists for an ingredient, and of what study design.
 *
 * These are VOLUMES, never strengths. A count says how much has been published;
 * it says nothing about which way the findings went, and the two are not even
 * correlated in the direction you would expect — publication volume tracks
 * CONTROVERSY. There are 96 meta-analyses on vitamin D and depression precisely
 * because the answer keeps coming back unclear, and selenium has 47 cancer RCTs
 * because an early signal failed to replicate. Deriving a strength from these
 * numbers was tried and validated against 73 hand-read ingredients: it agreed
 * 3 times out of 15 and overstated almost every error.
 *
 * So: render the counts, link the citations, and never turn them into a grade.
 */
export type EvidenceProfile = {
  substance: string;
  counts: {
    systematic?: number | null;
    rct?: number | null;
    human_trial?: number | null;
    all?: number | null;
  };
  pmids: string[];
  query?: string | null;
  fetched_at?: string | null;
  /** Present when the row asserts a genuine absence rather than a count. */
  resolution?: "true_low" | "rejected";
  resolution_reason?: string;
  /**
   * What the systematic reviews CONCLUDED, per outcome. This is the one thing
   * the counts above cannot give: an ingredient is never good or bad on its
   * own, it is effective FOR something, and the same substance routinely earns
   * different verdicts on different outcomes. Every row quotes a sentence
   * verified to occur in the abstract of the PMID it cites.
   */
  outcomes?: EvidenceOutcome[];
};

export type EvidenceOutcome = {
  /** What was MEASURED — "muscle strength", never a verdict. */
  outcome: string;
  direction: "benefit" | "no_effect" | "harm" | "unclear";
  pmids: string[];
  quote: string;
  quote_pmid: string;
};

/**
 * Outcomes worth showing, strongest signal first, capped.
 *
 * `benefit` and `no_effect` are both real findings and lead. `unclear` is
 * shown last and only to fill the list: "the evidence is mixed" is honest but
 * it is not what a reader came for, and a wall of it buries the two rows that
 * actually say something.
 */
const DIRECTION_RANK: Record<EvidenceOutcome["direction"], number> = {
  benefit: 0,
  no_effect: 1,
  harm: 2,
  unclear: 3,
};

export function topOutcomes(p: EvidenceProfile, limit = 4): EvidenceOutcome[] {
  if (!p.outcomes?.length) return [];
  return [...p.outcomes]
    .sort((a, b) => DIRECTION_RANK[a.direction] - DIRECTION_RANK[b.direction])
    .slice(0, limit);
}

/** Plain-language label for a direction. Never a grade, never a score. */
export function directionLabel(d: EvidenceOutcome["direction"]): string {
  switch (d) {
    case "benefit":
      return "benefit";
    case "no_effect":
      return "no effect found";
    case "harm":
      return "harm";
    default:
      return "unclear";
  }
}

export function pubmedAbstractUrl(pmid: string): string {
  return `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;
}

const PROFILES = (raw as { profiles: Record<string, EvidenceProfile> }).profiles;

export function evidenceProfileFor(ingredientName: string): EvidenceProfile | undefined {
  return PROFILES[ingredientName.trim()];
}

/** A short, honest phrase for the counts — or null when there is nothing to say. */
export function evidenceSummary(p: EvidenceProfile): string | null {
  const { systematic, rct, human_trial, all } = p.counts;
  // A null count means a request failed. It must NEVER read as "none published".
  if (all === null || all === undefined) return null;
  if (all === 0) return "no human studies found";
  const bits: string[] = [];
  if (systematic) bits.push(`${systematic} systematic review${systematic === 1 ? "" : "s"}`);
  if (rct) bits.push(`${rct} randomised trial${rct === 1 ? "" : "s"}`);
  if (!bits.length && human_trial) bits.push(`${human_trial} human trial${human_trial === 1 ? "" : "s"}`);
  if (!bits.length) return `${all} paper${all === 1 ? "" : "s"}, no controlled trials`;
  return bits.join(" · ");
}

export function pubmedSearchUrl(p: EvidenceProfile): string {
  return `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(p.query || p.substance)}`;
}
