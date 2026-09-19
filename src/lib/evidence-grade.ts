/**
 * Evidence-grade labels and colours, with no data attached.
 *
 * WHY THIS IS ITS OWN MODULE. It used to live in lib/encyclopedia.ts, which
 * imports the whole 968-entry encyclopedia.json at load. Three client
 * components — /start, the stack builder and the dose calculator — imported
 * this one small constant from there, and a module is shipped whole: every
 * visitor to /start downloaded the entire encyclopedia (2 MB raw, ~470 KB
 * gzipped) to render four coloured labels, and every page linking those tools
 * prefetched it. Client code imports from here; lib/encyclopedia re-exports it
 * for server code. scripts/check-client-data.mjs keeps it that way.
 */
export type EvidenceGrade = "A" | "B" | "C" | "D";

export const EVIDENCE_GRADE_META: Record<EvidenceGrade, { label: string; color: string; description: string }> = {
  A: {
    label: "Strong evidence",
    color: "#10B981",
    description: "Multiple well-designed human trials support the main claims.",
  },
  B: {
    label: "Moderate evidence",
    color: "#3B82F6",
    description: "Some human trials support key claims; further confirmation needed.",
  },
  C: {
    label: "Limited evidence",
    color: "#F59E0B",
    description: "Mostly observational or small trials; mechanism is plausible but unproven at scale.",
  },
  D: {
    label: "Very limited evidence",
    color: "#EF4444",
    description: "Primarily pre-clinical or anecdotal; human efficacy not established.",
  },
};
