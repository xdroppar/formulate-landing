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
  // ------------------------------- Supplement roundups & core guides
  "best-creatine-supplements": [
    { slug: "creatine-loading-phase", label: "Creatine Loading: Yes or No?", blurb: "The saturation math and who actually benefits from loading vs steady-state." },
    { slug: "best-magnesium-supplements", label: "Best Magnesium Supplements", blurb: "Pairs well with creatine for recovery and cramp prevention during hard training blocks." },
    { slug: "how-to-build-a-supplement-stack", label: "How to Build a Supplement Stack", blurb: "Where creatine fits into a broader evidence-based stack." },
  ],
  "best-magnesium-supplements": [
    { slug: "signs-you-are-magnesium-deficient", label: "Signs You're Magnesium Deficient", blurb: "The symptoms people miss before they start supplementing." },
    { slug: "best-sleep-supplement-protocol", label: "Best Sleep Supplement Protocol", blurb: "Magnesium is the MVP of the evening stack — here's how it fits." },
    { slug: "how-to-read-a-supplement-label", label: "How to Read a Supplement Label", blurb: "Essential for picking a magnesium product that isn't underdosed oxide." },
  ],
  "best-omega-3-supplements": [
    { slug: "how-to-build-a-supplement-stack", label: "How to Build a Supplement Stack", blurb: "Omega-3 anchors the foundation stack for most adults." },
    { slug: "best-vitamin-d-supplements", label: "Best Vitamin D Supplements", blurb: "D3 is fat-soluble — pair it with omega-3 for a one-capsule absorption boost." },
    { slug: "beginner-longevity-supplement-stack", label: "Beginner Longevity Stack", blurb: "Omega-3 is one of the four foundation pillars of the beginner stack." },
  ],
  "best-vitamin-d-supplements": [
    { slug: "best-magnesium-supplements", label: "Best Magnesium Supplements", blurb: "Magnesium is required for vitamin D activation in the liver and kidneys." },
    { slug: "best-omega-3-supplements", label: "Best Omega-3 Supplements", blurb: "Fat-soluble vitamins absorb better alongside omega-3 at the same meal." },
    { slug: "how-to-build-a-supplement-stack", label: "How to Build a Supplement Stack", blurb: "Vitamin D is the single most common fixable deficiency in the US." },
  ],
  "best-sleep-supplement-protocol": [
    { slug: "best-magnesium-supplements", label: "Best Magnesium Supplements", blurb: "Glycinate form is the evening-stack cornerstone." },
    { slug: "ashwagandha-guide", label: "Ashwagandha Guide", blurb: "Lowers cortisol ~28% and supports the wind-down phase before bed." },
    { slug: "how-to-build-a-supplement-stack", label: "How to Build a Supplement Stack", blurb: "Sleep support fits within the broader evidence-based stack." },
  ],
  "best-pre-workout-supplement-protocol": [
    { slug: "best-creatine-supplements", label: "Best Creatine Supplements", blurb: "Covers ~80% of the performance benefit a commercial pre-workout delivers." },
    { slug: "electrolytes-guide", label: "Electrolytes Guide", blurb: "Sodium and potassium replacement during long/hot training sessions." },
    { slug: "taurine-guide", label: "Taurine Guide", blurb: "Modest endurance benefits; common pre-workout ingredient with thin evidence outside energy drinks." },
  ],
  // ------------------------------- Stack-building & how-to
  "how-to-build-a-supplement-stack": [
    { slug: "beginner-longevity-supplement-stack", label: "Beginner Longevity Stack", blurb: "The ready-made starter version of this framework." },
    { slug: "how-to-read-a-supplement-label", label: "How to Read a Supplement Label", blurb: "Every stack is only as good as the products inside it." },
    { slug: "supplement-timing-guide", label: "Supplement Timing Guide", blurb: "When to take each component of your stack." },
  ],
  "supplement-timing-guide": [
    { slug: "how-to-build-a-supplement-stack", label: "How to Build a Supplement Stack", blurb: "Timing matters, but picking the right supplements matters more." },
    { slug: "how-to-read-a-supplement-label", label: "How to Read a Supplement Label", blurb: "Forms and doses drive timing — knowing how to read labels is upstream." },
    { slug: "best-magnesium-supplements", label: "Best Magnesium Supplements", blurb: "The evening-stack anchor and most common timing question." },
  ],
  "how-to-read-a-supplement-label": [
    { slug: "how-to-build-a-supplement-stack", label: "How to Build a Supplement Stack", blurb: "Once you can read labels, use this to decide what belongs in your stack." },
    { slug: "supplement-timing-guide", label: "Supplement Timing Guide", blurb: "Form and dose affect when to take each supplement." },
    { slug: "best-magnesium-supplements", label: "Best Magnesium Supplements", blurb: "The magnesium aisle is where 'form matters' is most consequential." },
  ],
  "signs-you-are-magnesium-deficient": [
    { slug: "best-magnesium-supplements", label: "Best Magnesium Supplements", blurb: "Which form to buy once you've decided to supplement." },
    { slug: "supplement-timing-guide", label: "Supplement Timing Guide", blurb: "Best time of day and what to separate magnesium from." },
    { slug: "how-to-build-a-supplement-stack", label: "How to Build a Supplement Stack", blurb: "Where magnesium fits alongside D3, omega-3, and creatine." },
  ],
  "do-you-need-a-multivitamin": [
    { slug: "how-to-build-a-supplement-stack", label: "How to Build a Supplement Stack", blurb: "Targeted supplementation beats a generic multi for most people." },
    { slug: "best-vitamin-d-supplements", label: "Best Vitamin D Supplements", blurb: "The single most common fixable deficiency — worth doing right." },
    { slug: "best-magnesium-supplements", label: "Best Magnesium Supplements", blurb: "Most multis underdose magnesium in the wrong form; worth supplementing separately." },
  ],
  "what-to-look-for-in-a-probiotic": [
    { slug: "best-omega-3-supplements", label: "Best Omega-3 Supplements", blurb: "Complementary anti-inflammatory support for the gut lining." },
    { slug: "collagen-guide", label: "Collagen Guide", blurb: "Glycine and proline from collagen may support epithelial repair." },
    { slug: "how-to-read-a-supplement-label", label: "How to Read a Supplement Label", blurb: "Probiotics are where 'read the label' matters most — strain designations aren't optional." },
  ],
  "beginner-longevity-supplement-stack": [
    { slug: "how-to-build-a-supplement-stack", label: "How to Build a Supplement Stack", blurb: "The underlying framework behind the beginner stack." },
    { slug: "how-to-read-a-supplement-label", label: "How to Read a Supplement Label", blurb: "Picking the actual products that fill the framework." },
    { slug: "supplement-timing-guide", label: "Supplement Timing Guide", blurb: "When to take each piece of the four-pillar stack." },
  ],
  "creatine-loading-phase": [
    { slug: "best-creatine-supplements", label: "Best Creatine Supplements", blurb: "Which creatine to buy once you've picked a loading protocol." },
    { slug: "best-pre-workout-supplement-protocol", label: "Best Pre-Workout Protocol", blurb: "Where creatine fits alongside caffeine, citrulline, and beta-alanine." },
    { slug: "how-to-build-a-supplement-stack", label: "How to Build a Supplement Stack", blurb: "Creatine is one of the highest-evidence pillars of a longevity stack." },
  ],
  // ------------------------------- Single-nutrient guides
  "zinc-guide": [
    { slug: "iron-guide", label: "Iron Guide", blurb: "Zinc and iron compete for absorption — both require careful timing." },
    { slug: "best-magnesium-supplements", label: "Best Magnesium Supplements", blurb: "Another mineral that needs thoughtful separation from other supplements." },
    { slug: "do-you-need-a-multivitamin", label: "Do You Need a Multivitamin?", blurb: "Zinc is one of the nutrients most commonly underdosed in generic multis." },
  ],
  "lions-mane-guide": [
    { slug: "nootropics-guide", label: "Nootropics Guide", blurb: "Where lion's mane fits in the broader cognitive-support landscape." },
    { slug: "ashwagandha-guide", label: "Ashwagandha Guide", blurb: "Complementary adaptogen with stronger anxiety/stress evidence." },
    { slug: "best-omega-3-supplements", label: "Best Omega-3 Supplements", blurb: "The single highest-evidence cognitive supplement — pair with lion's mane rather than substitute." },
  ],
  "nac-guide": [
    { slug: "nootropics-guide", label: "Nootropics Guide", blurb: "NAC is one of the best-studied nootropic-adjacent compounds for mood." },
    { slug: "berberine-guide", label: "Berberine Guide", blurb: "Another metabolically-active compound with AMPK effects." },
    { slug: "how-to-build-a-supplement-stack", label: "How to Build a Supplement Stack", blurb: "NAC fits into the stack for specific goals — not a default pick." },
  ],
  "ashwagandha-guide": [
    { slug: "best-sleep-supplement-protocol", label: "Best Sleep Supplement Protocol", blurb: "Ashwagandha is a core evening-stack adaptogen." },
    { slug: "best-magnesium-supplements", label: "Best Magnesium Supplements", blurb: "Pairs well with ashwagandha for cortisol and sleep support." },
    { slug: "how-to-build-a-supplement-stack", label: "How to Build a Supplement Stack", blurb: "Where ashwagandha fits in a broader longevity-oriented stack." },
  ],
  "collagen-guide": [
    { slug: "how-to-build-a-supplement-stack", label: "How to Build a Supplement Stack", blurb: "Collagen as a tier-2 add-on once the core stack is built." },
    { slug: "best-omega-3-supplements", label: "Best Omega-3 Supplements", blurb: "Complementary anti-inflammatory support for joints and skin." },
    { slug: "best-vitamin-d-supplements", label: "Best Vitamin D Supplements", blurb: "Vitamin C and D both support collagen synthesis pathways." },
  ],
  "vitamin-b12-guide": [
    { slug: "iron-guide", label: "Iron Guide", blurb: "B12 and iron deficiencies often appear together and share symptoms." },
    { slug: "do-you-need-a-multivitamin", label: "Do You Need a Multivitamin?", blurb: "B12 is one of the few nutrients where age raises the supplementation case." },
    { slug: "how-to-build-a-supplement-stack", label: "How to Build a Supplement Stack", blurb: "B12 is a targeted-supplementation decision, not a default pick." },
  ],
  "berberine-guide": [
    { slug: "best-omega-3-supplements", label: "Best Omega-3 Supplements", blurb: "Complementary metabolic support alongside berberine's AMPK activation." },
    { slug: "nac-guide", label: "NAC Guide", blurb: "Another metabolically-active compound used in targeted protocols." },
    { slug: "how-to-build-a-supplement-stack", label: "How to Build a Supplement Stack", blurb: "Berberine is a targeted addition, not a stack foundation." },
  ],
  "electrolytes-guide": [
    { slug: "best-pre-workout-supplement-protocol", label: "Best Pre-Workout Protocol", blurb: "Electrolytes are the highest-evidence part of the pre/intra-workout stack." },
    { slug: "taurine-guide", label: "Taurine Guide", blurb: "Another endurance-adjacent amino acid often paired with electrolytes." },
    { slug: "best-magnesium-supplements", label: "Best Magnesium Supplements", blurb: "Magnesium is the most common subclinical deficiency in electrolyte-depleted adults." },
  ],
  "taurine-guide": [
    { slug: "electrolytes-guide", label: "Electrolytes Guide", blurb: "Taurine shares the endurance-support role with sodium and potassium." },
    { slug: "best-pre-workout-supplement-protocol", label: "Best Pre-Workout Protocol", blurb: "Common pre-workout ingredient with thin standalone evidence." },
    { slug: "nootropics-guide", label: "Nootropics Guide", blurb: "Taurine appears in several nootropic stacks for its calming effect." },
  ],
  "iron-guide": [
    { slug: "vitamin-b12-guide", label: "Vitamin B12 Guide", blurb: "Iron and B12 deficiencies often overlap and share fatigue symptoms." },
    { slug: "zinc-guide", label: "Zinc Guide", blurb: "Zinc competes with iron for absorption — timing matters." },
    { slug: "how-to-read-a-supplement-label", label: "How to Read a Supplement Label", blurb: "Iron forms (bisglycinate vs sulfate) are where labels matter most for GI tolerance." },
  ],
  "nootropics-guide": [
    { slug: "lions-mane-guide", label: "Lion's Mane Guide", blurb: "Deep-dive on the most-researched nootropic mushroom." },
    { slug: "ashwagandha-guide", label: "Ashwagandha Guide", blurb: "Cortisol reduction is one of the most replicable 'nootropic' effects in adaptogens." },
    { slug: "best-creatine-supplements", label: "Best Creatine Supplements", blurb: "Creatine's cognitive benefits under sleep deprivation are well-documented." },
  ],
  // ------------------------------- Fitness / training guides (hidden but keep cross-sells)
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
