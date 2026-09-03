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
};

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
