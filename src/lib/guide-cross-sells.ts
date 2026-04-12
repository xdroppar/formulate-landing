/**
 * Per-guide supplement cross-sell mapping. Exercise/training guides don't have
 * in-body product callouts, so the layout renders this block above the catalog
 * CTA to surface 2–4 supplement guides relevant to that training topic.
 *
 * Keep entries short — the goal is to give the reader a clear next click to a
 * monetizable supplement guide without competing with the primary CTA.
 */
export interface CrossSellLink {
  /** Target guide slug within /guides/ */
  slug: string;
  /** Short label shown as the link text */
  label: string;
  /** One-line why-this-matters copy */
  blurb: string;
}

export const guideCrossSells: Record<string, CrossSellLink[]> = {
  "strength-training-frequency-longevity": [
    { slug: "best-creatine-supplements", label: "Best Creatine Supplements", blurb: "Largest effect size of any legal performance supplement for strength gains." },
    { slug: "protein-intake-muscle-after-40", label: "Protein Intake After 40", blurb: "Training frequency means nothing without the protein to recover between sessions." },
    { slug: "best-magnesium-supplements", label: "Best Magnesium Supplements", blurb: "Magnesium status affects muscle function and recovery quality." },
  ],
  "best-longevity-exercises": [
    { slug: "best-creatine-supplements", label: "Best Creatine Supplements", blurb: "The one supplement with strong evidence for every longevity-relevant outcome." },
    { slug: "best-omega-3-supplements", label: "Best Omega-3 Supplements", blurb: "Anti-inflammatory support for joints under long-term training load." },
    { slug: "best-vitamin-d-supplements", label: "Best Vitamin D Supplements", blurb: "Deficiency correlates with lower muscle strength and higher fall risk." },
  ],
  "zone-2-cardio-longevity": [
    { slug: "electrolytes-guide", label: "Electrolytes Guide", blurb: "Long steady-state sessions demand proper sodium and potassium replacement." },
    { slug: "best-omega-3-supplements", label: "Best Omega-3 Supplements", blurb: "Supports the mitochondrial adaptations that Zone 2 is training." },
  ],
  "minimum-effective-dose-strength-training": [
    { slug: "best-creatine-supplements", label: "Best Creatine Supplements", blurb: "If you're training minimally, creatine is the highest-leverage addition." },
    { slug: "protein-intake-muscle-after-40", label: "Protein Intake After 40", blurb: "Low training volume makes protein intake matter more, not less." },
  ],
  "weekly-longevity-training-plan": [
    { slug: "how-to-build-a-supplement-stack", label: "How to Build a Supplement Stack", blurb: "The supplement side of the weekly longevity equation." },
    { slug: "best-creatine-supplements", label: "Best Creatine Supplements", blurb: "Pairs with the strength component of the weekly plan." },
    { slug: "electrolytes-guide", label: "Electrolytes Guide", blurb: "Matters for the Zone 2 and HIIT sessions in the week." },
  ],
  "vo2-max-longevity": [
    { slug: "best-creatine-supplements", label: "Best Creatine Supplements", blurb: "Small but measurable improvements in high-intensity interval performance." },
    { slug: "electrolytes-guide", label: "Electrolytes Guide", blurb: "HIIT sessions that push VO2 max need proper electrolyte replacement." },
    { slug: "taurine-guide", label: "Taurine Guide", blurb: "Some evidence for endurance and VO2 max effects, though modest." },
  ],
  "grip-strength-longevity": [
    { slug: "best-creatine-supplements", label: "Best Creatine Supplements", blurb: "Creatine produces measurable gains in grip strength in older adults." },
    { slug: "protein-intake-muscle-after-40", label: "Protein Intake After 40", blurb: "Grip strength tracks total muscle mass — and muscle needs protein." },
    { slug: "sarcopenia-reverse-muscle-loss", label: "Reverse Age-Related Muscle Loss", blurb: "Grip strength is the canary; sarcopenia is the deeper problem." },
  ],
  "how-to-train-after-50": [
    { slug: "protein-intake-muscle-after-40", label: "Protein Intake After 40", blurb: "Older adults need more protein per meal to trigger muscle growth." },
    { slug: "best-creatine-supplements", label: "Best Creatine Supplements", blurb: "Benefits are larger in older adults than in young lifters." },
    { slug: "best-vitamin-d-supplements", label: "Best Vitamin D Supplements", blurb: "Low D is the most common fixable cause of weakness after 50." },
  ],
  "sets-per-muscle-per-week": [
    { slug: "best-creatine-supplements", label: "Best Creatine Supplements", blurb: "Effectively adds ~5–10% to every set you do." },
    { slug: "protein-intake-muscle-after-40", label: "Protein Intake After 40", blurb: "High-volume training only pays off if you're eating enough protein." },
  ],
  "best-exercises-for-legs": [
    { slug: "best-creatine-supplements", label: "Best Creatine Supplements", blurb: "The supplement most directly supporting heavy lower-body training." },
    { slug: "protein-intake-muscle-after-40", label: "Protein Intake After 40", blurb: "Legs are the largest muscle group — biggest protein demand per session." },
    { slug: "best-magnesium-supplements", label: "Best Magnesium Supplements", blurb: "Muscle function and cramp prevention after hard leg days." },
  ],
  "best-exercises-for-back": [
    { slug: "best-creatine-supplements", label: "Best Creatine Supplements", blurb: "Direct support for the deadlift, row, and pull-up volume this plan requires." },
    { slug: "protein-intake-muscle-after-40", label: "Protein Intake After 40", blurb: "Back growth is protein-limited for most adults over 40." },
  ],
  "zone-2-vs-hiit": [
    { slug: "electrolytes-guide", label: "Electrolytes Guide", blurb: "Both protocols benefit from proper sodium and potassium replacement." },
    { slug: "best-creatine-supplements", label: "Best Creatine Supplements", blurb: "Measurable support for the HIIT component of the weekly split." },
    { slug: "taurine-guide", label: "Taurine Guide", blurb: "Modest endurance benefits relevant to the Zone 2 component." },
  ],
  "walking-vs-running-longevity": [
    { slug: "best-omega-3-supplements", label: "Best Omega-3 Supplements", blurb: "Joint support for runners; cardiovascular support for walkers." },
    { slug: "best-vitamin-d-supplements", label: "Best Vitamin D Supplements", blurb: "Outdoor activity produces D, but not reliably — supplement matters." },
    { slug: "best-magnesium-supplements", label: "Best Magnesium Supplements", blurb: "Supports cardiovascular adaptation and cramp prevention." },
  ],
  "protein-intake-muscle-after-40": [
    { slug: "best-creatine-supplements", label: "Best Creatine Supplements", blurb: "Protein provides substrate; creatine improves the training that drives muscle protein synthesis." },
    { slug: "best-vitamin-d-supplements", label: "Best Vitamin D Supplements", blurb: "Low D is one of the most common reasons high protein intake underperforms." },
    { slug: "how-to-build-a-supplement-stack", label: "How to Build a Supplement Stack", blurb: "Where protein fits into the broader longevity stack." },
  ],
  "sarcopenia-reverse-muscle-loss": [
    { slug: "best-creatine-supplements", label: "Best Creatine Supplements", blurb: "Strongest supplement evidence for muscle mass gains in older adults." },
    { slug: "protein-intake-muscle-after-40", label: "Protein Intake After 40", blurb: "Anabolic resistance means older adults need more per meal, not less." },
    { slug: "best-vitamin-d-supplements", label: "Best Vitamin D Supplements", blurb: "Low D directly worsens sarcopenia; correction improves strength." },
  ],
};

export function getCrossSellsForGuide(slug: string): CrossSellLink[] | undefined {
  return guideCrossSells[slug];
}
