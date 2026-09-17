/**
 * The supplement rubric, in one place.
 *
 * Moved out of /methodology/supplements so that every surface describing the
 * rubric reads the same list: the methodology page, and the /llms.txt index an
 * answer engine reads. That index said "six weighted dimensions" for weeks after
 * this page was corrected, because it was a second, hand-written copy.
 */
export type SupplementFactor = {
  weight: string;
  weighted: boolean;
  name: string;
  desc: string;
  cite?: string;
  href?: string;
};

/**
 * Corrected 2026-09-08 against the shipped catalog.
 *
 * This table published 25/20/20/15/10/10 across six weighted factors. Measured
 * over all 303 scored products at score_version 3.23/3.24, the engine runs
 * Evidence 40 / Dose 35 / Form 25, and Manufacturing, Transparency and Safety
 * carry weight ZERO in 303 of 303 — V3.23 turned them into gates that deduct
 * rather than contribute (23 products carry a score_gate_penalty).
 *
 * This is the page whose whole claim is that the weights are public, so it was
 * the worst place on the site for the number to be wrong. The homepage and
 * /supplements were corrected first; this is the third and last copy.
 *
 * `weighted: false` renders as a gate rather than a percentage — the word
 * "gate" is our vocabulary and reads as a missing value, so the grouping does
 * the explaining instead.
 */
export const FACTORS: SupplementFactor[] = [
  {
    weight: "40%",
    weighted: true,
    name: "Clinical Evidence",
    desc: "Quality and quantity of peer-reviewed human research supporting the ingredient, its dose, and its claimed outcome. Meta-analyses and RCTs score higher than animal studies or anecdote.",
  },
  {
    weight: "35%",
    weighted: true,
    name: "Dose Accuracy",
    desc: "Does the serving actually match the evidence-based range for the claimed benefit? Underdosed and overdosed products both lose points. Thresholds come from position stands where they exist — creatine is scored against 3–5 g/day, not against whatever the label rounds to.",
    cite: "ISSN position stand, Kreider 2017",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5469049/",
  },
  {
    weight: "25%",
    weighted: true,
    name: "Bioavailability",
    desc: "Form, chelation, and delivery method. Magnesium citrate is measurably better absorbed than magnesium oxide, and the two are not scored alike. Not every form difference is this well established — glycinate versus oxide is genuinely mixed in the literature — so forms are scored on the strength of their own evidence rather than on marketing.",
    cite: "Lindberg, J Am Coll Nutr 1990",
    href: "https://pubmed.ncbi.nlm.nih.gov/2407766/",
  },
  {
    weight: "",
    weighted: false,
    name: "Manufacturing Quality",
    desc: "Third-party certifications (NSF, USP, Informed Sport), facility audits, and batch-level testing. A product is only as good as its factory. Checked separately: it can cost a product points, never add them.",
  },
  {
    weight: "",
    weighted: false,
    name: "Label Transparency",
    desc: "Full ingredient disclosure, no proprietary blends hiding doses, verified COAs on request. If a brand won't tell you what's in it, we penalize it.",
  },
  {
    weight: "",
    weighted: false,
    name: "Safety Profile",
    desc: "Known interactions, contraindications, heavy-metal testing, and exposure to fillers or allergens. A supplement that works but hurts still loses points.",
  },
];
