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
  // ------------------------------- New spoke guides
  "creatine-for-women": [
    { slug: "best-creatine-supplements", label: "Best Creatine Supplements", blurb: "Which creatine to buy once you've decided to supplement — same picks apply to women." },
    { slug: "creatine-and-hair-loss", label: "Creatine and Hair Loss", blurb: "Why the hair-loss concern doesn't apply to women — and barely applies to men." },
    { slug: "creatine-loading-phase", label: "Creatine Loading: Yes or No?", blurb: "Saturation math and who actually benefits from loading vs steady-state dosing." },
  ],
  "best-time-to-take-magnesium": [
    { slug: "best-magnesium-supplements", label: "Best Magnesium Supplements", blurb: "Which form to pick before you decide when to take it — form drives timing." },
    { slug: "signs-you-are-magnesium-deficient", label: "Signs You're Magnesium Deficient", blurb: "Whether timing even matters depends on whether you're deficient in the first place." },
    { slug: "supplement-timing-guide", label: "Supplement Timing Guide", blurb: "How magnesium fits alongside the rest of your daily supplement schedule." },
  ],
  "alpha-gpc-vs-citicoline": [
    { slug: "nootropics-guide", label: "Nootropics Guide", blurb: "Where choline sources fit in the broader cognitive-support landscape." },
    { slug: "lions-mane-guide", label: "Lion's Mane Guide", blurb: "Complementary nootropic often stacked with choline for nerve growth factor support." },
    { slug: "best-pre-workout-supplement-protocol", label: "Best Pre-Workout Protocol", blurb: "Alpha-GPC is one of the few cognitive ingredients with real pre-workout performance data." },
  ],
  "best-adaptogens-for-stress": [
    { slug: "ashwagandha-guide", label: "Ashwagandha Guide", blurb: "Deep-dive on the strongest-evidence adaptogen for chronic stress." },
    { slug: "best-sleep-supplement-protocol", label: "Best Sleep Supplement Protocol", blurb: "Stress and sleep are tightly coupled — adaptogens fit into the evening stack." },
    { slug: "nootropics-guide", label: "Nootropics Guide", blurb: "Rhodiola and other adaptogens overlap with the nootropic space for cognitive performance under pressure." },
  ],
  "creatine-and-hair-loss": [
    { slug: "best-creatine-supplements", label: "Best Creatine Supplements", blurb: "Which creatine to buy once the hair-loss concern is off the table." },
    { slug: "creatine-for-women", label: "Creatine for Women", blurb: "Why female pattern hair loss operates through different mechanisms than the 2009 rugby-player study." },
    { slug: "creatine-loading-phase", label: "Creatine Loading: Yes or No?", blurb: "Skip the loading phase if you want to avoid even the theoretical DHT bump." },
  ],
  "vitamin-d3-vs-d2": [
    { slug: "best-vitamin-d-supplements", label: "Best Vitamin D Supplements", blurb: "Which D3 product to buy now that you've ruled out D2." },
    { slug: "best-magnesium-supplements", label: "Best Magnesium Supplements", blurb: "Magnesium is a required cofactor for both hepatic and renal vitamin D activation." },
    { slug: "how-to-read-a-supplement-label", label: "How to Read a Supplement Label", blurb: "How to spot 'cholecalciferol' vs 'ergocalciferol' on the ingredients panel." },
  ],
  // ------------------------------- Round 2 spoke guides
  "berberine-vs-metformin": [
    { slug: "berberine-guide", label: "Berberine Guide", blurb: "The full mechanism, dosing, and evidence deep-dive that sits behind the metformin comparison." },
    { slug: "how-to-build-a-supplement-stack", label: "How to Build a Supplement Stack", blurb: "Where berberine fits as a targeted metabolic addition to a broader stack." },
    { slug: "vitamin-b12-guide", label: "Vitamin B12 Guide", blurb: "Both berberine and metformin can deplete B12 long-term — worth monitoring if you're using either." },
  ],
  "creatine-for-endurance-athletes": [
    { slug: "best-creatine-supplements", label: "Best Creatine Supplements", blurb: "Which creatine to buy — same monohydrate picks apply to endurance athletes." },
    { slug: "creatine-loading-phase", label: "Creatine Loading: Yes or No?", blurb: "Skip the loading phase if you're worried about water weight — 3–5 g/day saturates in 28 days." },
    { slug: "electrolytes-guide", label: "Electrolytes Guide", blurb: "Creatine pairs with sodium and potassium replacement for long-duration endurance sessions." },
  ],
  "ashwagandha-for-testosterone": [
    { slug: "ashwagandha-guide", label: "Ashwagandha Guide", blurb: "The full cortisol, sleep, and adaptogen evidence base behind the testosterone story." },
    { slug: "best-adaptogens-for-stress", label: "Best Adaptogens for Stress", blurb: "Ashwagandha's testosterone effect is downstream of cortisol — adaptogens are upstream." },
    { slug: "zinc-guide", label: "Zinc Guide", blurb: "Zinc is a more direct lever for testosterone in deficient men, and it's commonly overlooked." },
  ],
  "best-multivitamin-over-50": [
    { slug: "do-you-need-a-multivitamin", label: "Do You Need a Multivitamin?", blurb: "Whether the format itself makes sense before picking a senior formula." },
    { slug: "vitamin-b12-methylcobalamin-vs-cyanocobalamin", label: "Methylcobalamin vs Cyanocobalamin", blurb: "B12 form matters more after 50 — here's why methylcobalamin often wins." },
    { slug: "best-vitamin-d-supplements", label: "Best Vitamin D Supplements", blurb: "Most senior multis underdose D3 — you likely need a standalone D3 alongside." },
  ],
  "nac-and-alcohol": [
    { slug: "nac-guide", label: "NAC Guide", blurb: "The full mechanism, dose, and evidence deep-dive on NAC beyond the alcohol use case." },
    { slug: "how-to-build-a-supplement-stack", label: "How to Build a Supplement Stack", blurb: "Where NAC fits as a targeted add-on rather than a foundation pick." },
    { slug: "best-omega-3-supplements", label: "Best Omega-3 Supplements", blurb: "Complementary anti-inflammatory support for the liver under regular alcohol load." },
  ],
  "probiotic-strains-for-ibs": [
    { slug: "what-to-look-for-in-a-probiotic", label: "What to Look for in a Probiotic", blurb: "How to evaluate any probiotic product — strain, CFU, and storage basics." },
    { slug: "how-to-read-a-supplement-label", label: "How to Read a Supplement Label", blurb: "Probiotic labels are where strain designations aren't optional — here's how to spot them." },
    { slug: "collagen-guide", label: "Collagen Guide", blurb: "Glycine and proline from collagen may support epithelial repair alongside targeted IBS strains." },
  ],
  "magnesium-for-anxiety": [
    { slug: "best-magnesium-supplements", label: "Best Magnesium Supplements", blurb: "Which form to buy once you've decided magnesium fits your anxiety protocol." },
    { slug: "signs-you-are-magnesium-deficient", label: "Signs You're Magnesium Deficient", blurb: "The deficiency symptoms most likely to respond to glycinate supplementation." },
    { slug: "best-sleep-supplement-protocol", label: "Best Sleep Supplement Protocol", blurb: "Anxiety and sleep are tightly coupled — glycinate does double duty in the evening stack." },
  ],
  "best-collagen-for-joints": [
    { slug: "collagen-guide", label: "Collagen Guide", blurb: "The broader collagen evidence base — skin, hair, and connective tissue beyond joints." },
    { slug: "best-omega-3-supplements", label: "Best Omega-3 Supplements", blurb: "Complementary anti-inflammatory support for joints under repetitive training load." },
    { slug: "how-to-read-a-supplement-label", label: "How to Read a Supplement Label", blurb: "Collagen labels conflate Type I peptides with Type II UC-II — here's how to tell them apart." },
  ],
  "zinc-for-immune-support": [
    { slug: "zinc-guide", label: "Zinc Guide", blurb: "The full zinc picture beyond colds — testosterone, wound healing, and copper balance." },
    { slug: "best-vitamin-d-supplements", label: "Best Vitamin D Supplements", blurb: "Low vitamin D is the most common fixable immune weakness, and it pairs synergistically with zinc." },
    { slug: "what-to-look-for-in-a-probiotic", label: "What to Look for in a Probiotic", blurb: "Gut-based immune modulation is the other evidence-backed pillar alongside zinc for immunity." },
  ],
  "vitamin-b12-methylcobalamin-vs-cyanocobalamin": [
    { slug: "vitamin-b12-guide", label: "Vitamin B12 Guide", blurb: "The full B12 picture — dosing, deficiency, at-risk populations, and form choice in context." },
    { slug: "best-multivitamin-over-50", label: "Best Multivitamin Over 50", blurb: "B12 form matters most in senior formulas — here's which multis get it right." },
    { slug: "do-you-need-a-multivitamin", label: "Do You Need a Multivitamin?", blurb: "B12 is one of the nutrients where targeted supplementation usually beats a generic multi." },
  ],
  // ------------------------------- Condition-specific spoke guides (Round 3)
  "best-supplements-for-pcos": [
    { slug: "nac-guide", label: "NAC Guide", blurb: "The full mechanism behind NAC's role in PCOS ovulation and insulin sensitivity — dosing, safety, and fertility considerations." },
    { slug: "berberine-guide", label: "Berberine Guide", blurb: "Metformin-like AMPK activation for insulin-resistant PCOS — forms, timing, and drug interactions in depth." },
    { slug: "berberine-vs-metformin", label: "Berberine vs Metformin", blurb: "Head-to-head comparison for anyone weighing a non-pharmaceutical path in PCOS management." },
  ],
  "best-supplements-for-menopause": [
    { slug: "best-vitamin-d-supplements", label: "Best Vitamin D Supplements", blurb: "The D3+K2 foundation for postmenopausal bone health — ranked by clinical evidence and third-party testing." },
    { slug: "creatine-for-women", label: "Creatine for Women", blurb: "Why 3–5 g/day preserves bone density and lean mass after menopause without bulking or water weight concerns." },
    { slug: "ashwagandha-guide", label: "Ashwagandha Guide", blurb: "KSM-66 for cortisol modulation, mood stability, and the sleep disruption that defines the menopausal transition." },
  ],
  "best-supplements-for-fatty-liver": [
    { slug: "nac-guide", label: "NAC Guide", blurb: "Glutathione replenishment mechanism behind NAC's ALT-lowering effects in NAFLD — dosing, safety, and timing." },
    { slug: "best-omega-3-supplements", label: "Best Omega-3 Supplements", blurb: "2–4 g EPA+DHA reliably reduces liver fat content on MRI — ranked picks with verified concentration." },
    { slug: "nac-and-alcohol", label: "NAC and Alcohol", blurb: "If alcohol is part of your liver risk picture, NAC's hepatoprotective mechanisms overlap meaningfully with the NAFLD evidence." },
  ],
  "best-supplements-for-adhd-focus": [
    { slug: "best-omega-3-supplements", label: "Best Omega-3 Supplements", blurb: "EPA-dominant formulas are the strongest-evidence ADHD supplement — here's how to find one that's actually dosed correctly." },
    { slug: "best-magnesium-supplements", label: "Best Magnesium Supplements", blurb: "Magnesium glycinate for the deficiency-driven hyperactivity component — form matters more than dose for neurological applications." },
    { slug: "nootropics-guide", label: "Nootropics Guide", blurb: "Where ADHD supplements fit in the broader cognitive-support landscape — including what's overhyped and what actually works." },
  ],
  "best-supplements-for-runners": [
    { slug: "iron-guide", label: "Iron Guide", blurb: "Ferritin testing and safe supplementation for the #1 runner-specific deficiency — foot-strike hemolysis is real." },
    { slug: "electrolytes-guide", label: "Electrolytes Guide", blurb: "Sodium-forward hydration for runs over 60 minutes — most commercial sports drinks underdose where it matters." },
    { slug: "creatine-for-endurance-athletes", label: "Creatine for Endurance Athletes", blurb: "Why 3–5 g/day improves hard session quality without meaningful water weight for marathoners and trail runners." },
  ],
  "best-supplements-for-perimenopause": [
    { slug: "best-magnesium-supplements", label: "Best Magnesium Supplements", blurb: "Glycinate form targets the sleep disruption that defines early perimenopause — form and timing both matter." },
    { slug: "best-supplements-for-menopause", label: "Best Supplements for Menopause", blurb: "The post-menopause stack once cycles have stopped — different hormonal picture, different priorities." },
    { slug: "creatine-for-women", label: "Creatine for Women", blurb: "Muscle and bone preservation during the transition — Smith-Ryan 2021 evidence applies before menopause, not just after." },
  ],
};

export function getCrossSellsForGuide(slug: string): CrossSellLink[] | undefined {
  return guideCrossSells[slug];
}
