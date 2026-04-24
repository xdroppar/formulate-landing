/**
 * Plain-English explanations for every methodology flag plus the generic
 * "learn to read a study" primer that appears on every study detail page.
 *
 * Mirrors formulate-web/src/lib/research-education.ts so both surfaces feel
 * consistent to users moving between landing and app. Landing uses string-
 * typed flags (rather than the webapp's union type) because the study data
 * here can come from guide-evidence.ts or the imported supplement-studies
 * JSON, neither of which narrows the flag type at the source.
 *
 * Content is opinion-based but grounded in standard methodology pedagogy
 * (CONSORT, GRADE, Cochrane handbook). Not medical advice.
 */

export interface FlagEducation {
  /** Short human label — matches the chip shown on cards. */
  label: string;
  /** "pos" = study strength, "neg" = study limitation. */
  kind: "pos" | "neg";
  /** One-sentence plain-English definition. */
  plainLanguage: string;
  /** Why this matters to a reader deciding whether to trust the result. */
  whyItMatters: string;
  /** How to interpret the study differently because this flag applies. */
  howToInterpret: string;
}

export const FLAG_EDUCATION: Record<string, FlagEducation> = {
  // ── Limitations ────────────────────────────────────────────────────
  "small-n": {
    label: "Small sample size",
    kind: "neg",
    plainLanguage:
      "The study enrolled too few participants for its results to be statistically reliable on their own.",
    whyItMatters:
      "With a small sample, random variation can look like a real effect. A positive finding in 20 people may vanish when the trial is repeated in 200.",
    howToInterpret:
      "Treat this as a signal, not proof. Look for larger replications before changing your behavior based on the result.",
  },
  "short-duration": {
    label: "Short duration",
    kind: "neg",
    plainLanguage:
      "The trial ran for weeks when the outcome it claims to affect usually takes months or years to change.",
    whyItMatters:
      "Short trials catch early biomarker shifts but miss tolerance, plateaus, side effects that appear later, and whether the benefit sustains.",
    howToInterpret:
      "Useful for acute effects (sleep, mood, energy). Weak evidence for chronic claims (bone density, cardiovascular risk, aging).",
  },
  "surrogate-endpoint": {
    label: "Surrogate endpoint",
    kind: "neg",
    plainLanguage:
      "The study measured a blood marker or proxy rather than something you'd actually notice or care about.",
    whyItMatters:
      "Lowering LDL on paper doesn't always translate to fewer heart attacks. Surrogate outcomes don't always track with real-world health outcomes.",
    howToInterpret:
      "Ask: has this marker been shown to predict the outcome I care about in other trials? If not, the finding is mechanistically interesting but practically unproven.",
  },
  "industry-funded": {
    label: "Industry-funded",
    kind: "neg",
    plainLanguage:
      "The trial was paid for by a company that sells the product or ingredient being tested.",
    whyItMatters:
      "Industry-funded trials are 2–4× more likely to report positive results than independently funded ones — through study design choices, selective publication, and outcome reporting, not usually outright fraud.",
    howToInterpret:
      "Not disqualifying, but weight the result less heavily and look for independent replications before trusting the magnitude of the effect.",
  },
  "industry-adjacent": {
    label: "Industry-adjacent",
    kind: "neg",
    plainLanguage:
      "Authors have consulting arrangements, equity, or other financial ties to the industry even if the trial itself wasn't directly sponsored.",
    whyItMatters:
      "Conflict of interest operates through question selection and interpretation, not just funding. A researcher with equity has incentive to frame findings favorably.",
    howToInterpret:
      "Read the disclosures section. Consistent replication by unaffiliated groups matters more than a single favorable trial from a conflicted team.",
  },
  unreplicated: {
    label: "Unreplicated",
    kind: "neg",
    plainLanguage:
      "No independent research group has repeated this finding in a separate population.",
    whyItMatters:
      "Roughly half of nutrition and biomedical findings don't replicate. A single positive trial — even a well-run one — is a hypothesis, not a fact.",
    howToInterpret:
      "Wait for replication before investing in a supplement based on a single unreplicated trial.",
  },
  "population-mismatch": {
    label: "Population mismatch",
    kind: "neg",
    plainLanguage:
      "The people studied don't resemble the people the result is being applied to (e.g., elite athletes vs. sedentary adults; deficient vs. replete).",
    whyItMatters:
      "Supplements often work only in people who need them. Vitamin D helps deficient people; effects in replete people are usually null.",
    howToInterpret:
      "Ask whether your baseline resembles the trial population. If you're not deficient and the trial was in deficient people, don't expect their results.",
  },
  "dose-mismatch": {
    label: "Dose mismatch",
    kind: "neg",
    plainLanguage:
      "The dose used in the study is different from the dose in the product being marketed.",
    whyItMatters:
      "A 2 g trial dose can't justify claims for a 200 mg capsule. Dose–response is the most common way supplement marketing misrepresents research.",
    howToInterpret:
      "Check the trial dose against what you'd actually be taking. If the product delivers 10% of the effective dose, expect roughly 0% of the effect.",
  },
  "post-hoc-subgroup": {
    label: "Post-hoc subgroup",
    kind: "neg",
    plainLanguage:
      "The headline result came from slicing the data after the trial finished, not from the pre-specified main analysis.",
    whyItMatters:
      "If you test enough subgroups, you'll find a positive one by chance. Post-hoc findings are hypothesis-generating, not hypothesis-confirming.",
    howToInterpret:
      "Check the pre-registered primary outcome. If that was null and a subgroup result is being headlined, treat the claim as unconfirmed.",
  },
  "no-active-comparator": {
    label: "No active comparator",
    kind: "neg",
    plainLanguage:
      "The study compared the supplement to a placebo rather than to an established treatment.",
    whyItMatters:
      "Beating placebo only tells you the supplement has some effect. It doesn't tell you whether it's better, worse, or equivalent to existing options.",
    howToInterpret:
      "Fine for novel claims. Weak evidence for 'X works as well as Y' style claims unless Y was actually in the trial.",
  },
  "animal-study": {
    label: "Animal study",
    kind: "neg",
    plainLanguage:
      "The trial was conducted in mice, rats, or other animals — not humans.",
    whyItMatters:
      "Roughly 90% of drugs that work in mice fail in humans. Mechanism often translates; dose and effect size usually don't.",
    howToInterpret:
      "Useful for understanding how something might work. Not evidence that it does work in humans. Look for a follow-up human trial before acting.",
  },
  "single-center": {
    label: "Single-center",
    kind: "neg",
    plainLanguage:
      "All participants were recruited and treated at one clinic or institution.",
    whyItMatters:
      "Single-center trials reflect one practice pattern, one population, and one set of local confounders. Effects often shrink in multi-center replications.",
    howToInterpret:
      "Consistent with a real effect, but the magnitude is probably optimistic. Multi-center replications give better generalizability.",
  },

  // ── Strengths ──────────────────────────────────────────────────────
  "large-n": {
    label: "Large sample size",
    kind: "pos",
    plainLanguage:
      "The trial enrolled enough participants to detect realistic effect sizes with high statistical power.",
    whyItMatters:
      "Large samples shrink the role of chance. A positive finding in thousands is much less likely to be a fluke than the same finding in dozens.",
    howToInterpret:
      "Gives you more confidence the reported effect size is close to the true effect — but still doesn't prove the study is well-designed in other ways.",
  },
  "multi-center": {
    label: "Multi-center",
    kind: "pos",
    plainLanguage:
      "Participants were recruited across several independent clinics or regions.",
    whyItMatters:
      "Multi-center design spreads out local confounders and makes the result more generalizable.",
    howToInterpret:
      "More trustworthy than single-center evidence at the same sample size. Effect sizes are usually closer to what you'd see in practice.",
  },
  "landmark-replicated": {
    label: "Replicated",
    kind: "pos",
    plainLanguage:
      "Independent research groups have reproduced this finding in separate populations.",
    whyItMatters:
      "Replication is the strongest signal in science. A replicated finding is orders of magnitude more likely to be real than a novel one.",
    howToInterpret:
      "Treat the central claim as reliable. Edge cases (different populations, doses, formulations) may still vary.",
  },
  "independent-funded": {
    label: "Independent funding",
    kind: "pos",
    plainLanguage:
      "Funded by a public agency, university, or philanthropic grant with no commercial stake in the outcome.",
    whyItMatters:
      "Removes the financial incentive that skews industry-funded results. Independent trials historically show smaller effect sizes — closer to the truth.",
    howToInterpret:
      "Weight independent results more heavily. When independent and industry-funded trials disagree, the independent result is usually closer to reality.",
  },
  "pre-registered": {
    label: "Pre-registered",
    kind: "pos",
    plainLanguage:
      "The trial's hypothesis, outcomes, and analysis plan were publicly posted before data collection started.",
    whyItMatters:
      "Pre-registration prevents the most common forms of results manipulation: outcome switching, p-hacking, and cherry-picking subgroups after the fact.",
    howToInterpret:
      "Much higher confidence that the reported result is the one the researchers actually set out to test, not the one they found by looking.",
  },
  "real-world-outcome": {
    label: "Real-world outcome",
    kind: "pos",
    plainLanguage:
      "The trial measured something a patient would actually notice — symptoms, function, quality of life, hospitalization, mortality.",
    whyItMatters:
      "Real-world outcomes skip the surrogate-endpoint problem entirely. If symptoms improved, symptoms improved.",
    howToInterpret:
      "Higher translational value than biomarker trials. What the trial measured is closer to what you'd get from taking the supplement.",
  },
  "long-duration": {
    label: "Long duration",
    kind: "pos",
    plainLanguage:
      "The trial ran long enough to observe sustained effects, tolerance, and delayed side effects.",
    whyItMatters:
      "Many supplement effects fade (tolerance), reverse (rebound), or only emerge months in. Long trials catch patterns short trials miss entirely.",
    howToInterpret:
      "More trustworthy for chronic claims. A 12-week trial for something you'll take for 20 years is evidence, but not much.",
  },
  "active-comparator": {
    label: "Active comparator",
    kind: "pos",
    plainLanguage:
      "The supplement was compared head-to-head against an established drug or gold-standard treatment, not just placebo.",
    whyItMatters:
      "Placebo trials only tell you whether something works at all. Active-comparator trials tell you whether it works better, as well, or worse than existing options.",
    howToInterpret:
      "Stronger support for 'this is a real alternative to X' claims. If the active comparator is well-chosen, the result is clinically actionable.",
  },
};

/** Map the A–F grade to a plain-English confidence bucket. */
export function gradeToConfidence(grade: "A" | "B" | "C" | "D" | "F"): {
  label: string;
  description: string;
  tone: "strong" | "moderate" | "weak" | "preliminary" | "poor";
} {
  switch (grade) {
    case "A":
      return {
        label: "Strong evidence",
        description:
          "Well-designed study that answers the question it set out to ask. Safe to treat the central finding as reliable, though edge cases may still vary.",
        tone: "strong",
      };
    case "B":
      return {
        label: "Moderate evidence",
        description:
          "Reasonable design with one or two notable limitations. The finding is credible but less certain than an A-grade result.",
        tone: "moderate",
      };
    case "C":
      return {
        label: "Weak evidence",
        description:
          "Several methodological limitations. The finding is suggestive, not confirmatory. Don't change behavior based on this alone.",
        tone: "weak",
      };
    case "D":
      return {
        label: "Preliminary evidence",
        description:
          "Major design weaknesses. This is a hypothesis-generating result that needs a better-designed follow-up before it should influence decisions.",
        tone: "preliminary",
      };
    case "F":
      return {
        label: "Poor evidence",
        description:
          "The design doesn't support the conclusions being drawn from it. Often cited in marketing despite not demonstrating what the marketing claims.",
        tone: "poor",
      };
  }
}

/** Tone → CSS color set used by the landing page palette. */
export const CONFIDENCE_PALETTE: Record<
  "strong" | "moderate" | "weak" | "preliminary" | "poor",
  { color: string; bg: string; border: string }
> = {
  strong: { color: "#10b981", bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.40)" },
  moderate: { color: "#3b82f6", bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.40)" },
  weak: { color: "#f59e0b", bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.40)" },
  preliminary: { color: "#f97316", bg: "rgba(249,115,22,0.10)", border: "rgba(249,115,22,0.40)" },
  poor: { color: "#ef4444", bg: "rgba(239,68,68,0.10)", border: "rgba(239,68,68,0.40)" },
};

/** Generic reading primer — same as the webapp's. */
export const READING_PRIMER = {
  title: "How to read a study like this",
  points: [
    {
      heading: "Who was studied, and do you resemble them?",
      body: "Supplement effects often depend on baseline status. Vitamin D helps people who are deficient; iron helps people who are anemic. A result in people unlike you may not apply to you.",
    },
    {
      heading: "What was measured, and does it matter in daily life?",
      body: "A study that shows a blood marker moved isn't the same as a study that shows people felt or functioned better. Ask what the outcome means in practice.",
    },
    {
      heading: "How large was the effect — not just whether it was significant.",
      body: "'Statistically significant' only means the effect is unlikely to be zero. It doesn't tell you the effect is large enough to notice. Look for effect sizes, not just p-values.",
    },
    {
      heading: "Who paid for the trial, and what did they stand to gain?",
      body: "Industry-funded trials are several times more likely to report positive results than independent ones. It's not usually fraud — it's subtle design and reporting choices. Weight accordingly.",
    },
    {
      heading: "Has anyone else replicated this?",
      body: "Single positive trials are hypotheses. Replication by independent groups is what turns a hypothesis into reliable evidence. If the only positive trial is the one you're reading, wait.",
    },
    {
      heading: "Does the dose in the trial match what's being sold?",
      body: "Supplement marketing routinely cites trials that used 5–10× the dose in the product. If the effective dose was 2 g/day and the capsule has 200 mg, expect roughly no effect.",
    },
  ],
};
