/**
 * Curated goal-based supplement stacks. Each entry produces a page at
 * `/stacks/<slug>` that pulls deep detail from the ingredient encyclopedia
 * and the interaction database — this file carries only the editorial
 * layer: which ingredients belong together for this goal, why, in what
 * role, and the stack's dose/timing pattern.
 *
 * Add a new stack = add a new entry. No template changes needed.
 */

export type StackIngredient = {
  /** Encyclopedia slug for the ingredient. Renderer pulls the rest. */
  slug: string;
  /** How this ingredient contributes to the stack's goal. ~30 words. */
  role: string;
  /** Concrete dose + timing recommendation for this stack. */
  dose: string;
  /** Priority within the stack (core / supporting / optional). */
  tier: "core" | "supporting" | "optional";
};

export type Stack = {
  slug: string;
  /** Display title. */
  name: string;
  /** One-sentence high-level description, used as meta description prefix. */
  tagline: string;
  /** Longer intro (~120 words) explaining the stack's logic. */
  summary: string;
  /** Ingredients ordered by priority tier then by importance within tier. */
  ingredients: StackIngredient[];
  /** When/how to take the stack as a whole — daily schedule, etc. */
  protocol: string;
  /** Known cautions or interactions specific to this stack. ~80 words. */
  cautions: string;
  /** Tags used on the index page for filtering. */
  tags: string[];
};

export const stacks: Stack[] = [
  {
    slug: "sleep",
    name: "Sleep Stack",
    tagline: "Four evidence-backed supplements that improve sleep quality without sedating you the next morning.",
    summary:
      "The goal isn't to knock yourself out — it's to let your body do what it already knows how to do. This stack combines a calming magnesium form (glycinate) that also doubles as a laxative-free GI-friendly mineral source, an acute calming amino (L-theanine) that blunts pre-sleep anxiety, a deep-sleep enhancer (glycine) that specifically increases slow-wave sleep duration, and a low-dose hormonal signaler (melatonin) that shifts circadian phase when your problem is timing rather than quality. Skipped: valerian (inconsistent evidence), diphenhydramine (sedating but disrupts sleep architecture), and mega-dose melatonin (paradoxical disruption).",
    ingredients: [
      {
        slug: "magnesium-glycinate",
        role: "Parasympathetic activator — calms the nervous system, relaxes muscles, supports deep sleep maintenance.",
        dose: "300-400 mg elemental, 30-60 minutes before bed",
        tier: "core",
      },
      {
        slug: "l-theanine",
        role: "Acute anxiolytic — raises alpha-wave activity, reduces pre-sleep rumination without drowsiness.",
        dose: "200 mg, 30 minutes before bed",
        tier: "core",
      },
      {
        slug: "glycine",
        role: "Deep-sleep enhancer — RCTs show subjective sleep quality improvement and next-day fatigue reduction.",
        dose: "3 g as powder in water, 60 minutes before bed",
        tier: "supporting",
      },
      {
        slug: "melatonin",
        role: "Circadian signaler — useful when the problem is falling asleep (not maintaining it). Low-dose only.",
        dose: "0.3-1 mg, 30-60 minutes before bed. Higher doses disrupt sleep architecture paradoxically.",
        tier: "optional",
      },
    ],
    protocol:
      "Take the core pair (magnesium + L-theanine) nightly. Add glycine for 2-3 weeks to gauge whether it noticeably deepens sleep for you — responders report clearer mornings. Reserve melatonin for timing issues (jet lag, shift work, genuine can't-fall-asleep). Don't stack melatonin nightly if you're sleeping fine — the body becomes less responsive to its own endogenous signal.",
    cautions:
      "Melatonin can interact with blood pressure and anticoagulant medications — check before long-term daily use. High-dose magnesium competes for absorption with calcium and thyroid medications; separate by 2-4 hours. Glycine is generally very safe. L-theanine has no documented drug interactions at supplement doses.",
    tags: ["Sleep", "Insomnia", "Calming"],
  },
  {
    slug: "cognitive",
    name: "Cognitive Stack",
    tagline: "Four ingredients with human-trial evidence for memory, focus, or processing speed — not the kitchen-sink nootropic shopping list.",
    summary:
      "Nootropics marketing has produced a lot of noise. This stack narrows to compounds with RCT-level evidence in healthy or mild-impairment populations. Creatine (yes, the gym supplement) has growing evidence for cognitive benefit particularly under stress or sleep deprivation — its brain role is distinct from its muscle role. Omega-3s (specifically DHA) are the structural fat of neurons. L-theanine + caffeine is the acute focus stack with the best-documented combination benefit. Bacopa is the best-evidenced verbal-memory herb for chronic use. Skipped: piracetam and racetams (off-label prescription pharmacokinetics, not supplements), phenylpiracetam, modafinil.",
    ingredients: [
      {
        slug: "creatine",
        role: "Brain ATP support — increases cognitive performance under sleep deprivation and mental fatigue; 5g/day is the same dose that helps muscles.",
        dose: "5 g/day, any time with a meal",
        tier: "core",
      },
      {
        slug: "omega-3",
        role: "Structural support for neuron membranes; DHA is the dominant brain fat. Cognitive and mood benefits at 1-2 g combined EPA+DHA.",
        dose: "1-2 g combined EPA+DHA/day, with food",
        tier: "core",
      },
      {
        slug: "caffeine-theanine-stack",
        role: "Acute focus and sustained attention — the best-studied cognitive combination. Smoother curve than caffeine alone.",
        dose: "100 mg caffeine + 200 mg L-theanine, morning or pre-task",
        tier: "supporting",
      },
      {
        slug: "bacopa-monnieri",
        role: "Chronic memory and learning enhancer — best-evidenced nootropic herb. Effects emerge at 8-12 weeks.",
        dose: "300 mg standardized bacosides, with a fat-containing meal",
        tier: "optional",
      },
    ],
    protocol:
      "Creatine and omega-3 go daily and don't depend on timing — both work via steady concentration. L-theanine + caffeine is an acute, as-needed pairing for demanding tasks (avoid within 6 hours of intended sleep). Bacopa requires commitment — no acute effect, build up over 2-3 months for evaluation.",
    cautions:
      "Creatine is remarkably safe but doubles water retention early — hydrate accordingly. Omega-3 at high doses has mild anticoagulant effect; check if on blood thinners. Caffeine interacts with multiple medications and can disrupt sleep if timed late. Bacopa can cause GI upset in some users at full dose — start with half.",
    tags: ["Cognition", "Focus", "Memory", "Nootropics"],
  },
  {
    slug: "immunity",
    name: "Immunity Stack",
    tagline: "The foundational immune stack — vitamin D year-round, zinc + quercetin + vitamin C for acute illness, not daily mega-dosing.",
    summary:
      "Daily mega-dose 'immune support' marketing isn't evidence-based for preventing illness in already-healthy people. What is: correcting vitamin D deficiency (a real problem for most of the indoor-living population), and having a ready acute-illness trio (zinc + quercetin + vitamin C) that reduces cold duration. The 'zinc ionophore' mechanism — quercetin helping zinc enter cells — is the most-studied acute viral combination. Skipped: echinacea (mixed evidence), elderberry (modest acute benefit with a possible immune-stimulation concern in autoimmune users), colostrum (thin data).",
    ingredients: [
      {
        slug: "vitamin-d",
        role: "Foundational immunomodulator — T-cell function, reduced respiratory infection risk in deficient users. Year-round daily.",
        dose: "1,000-2,000 IU/day with a fat-containing meal; higher if blood level is below 30 ng/mL",
        tier: "core",
      },
      {
        slug: "zinc-picolinate",
        role: "Acute viral support — reduces cold duration in multiple meta-analyses. Not for chronic high-dose.",
        dose: "15-30 mg daily baseline; 50 mg split across the day during acute illness (max 7 days)",
        tier: "core",
      },
      {
        slug: "vitamin-c",
        role: "Partner to zinc in acute illness stacks. Modest duration reduction in normal users, stronger in physical-stress populations.",
        dose: "500 mg daily baseline; 1-2 g/day split during acute illness",
        tier: "supporting",
      },
      {
        slug: "quercetin",
        role: "Zinc ionophore + mast cell stabilizer. Helps zinc enter cells during viral acute phase; also useful for allergies.",
        dose: "500-1,000 mg/day during acute illness; poor bioavailability without phytosome form",
        tier: "supporting",
      },
    ],
    protocol:
      "Vitamin D daily, year-round. Low-dose zinc (15 mg) daily is reasonable insurance. At first sign of a cold: bump zinc to 50 mg/day (split), add 1-2 g vitamin C (split), and 500-1,000 mg quercetin. Stop the acute protocol within 7 days of symptom resolution — chronic high-dose zinc causes copper deficiency.",
    cautions:
      "Long-term zinc >40 mg/day causes copper deficiency; co-supplement copper (2 mg) if using high-dose for more than 2 weeks. Vitamin D at very high chronic doses (>5,000 IU without blood monitoring) can cause hypercalcemia. Vitamin C at >1 g/day can increase kidney stone risk in users with a stone history.",
    tags: ["Immune", "Antiviral", "Cold Flu", "Vitamin D"],
  },
  {
    slug: "longevity",
    name: "Longevity Stack",
    tagline: "Five supplements with either strong aging-biomarker evidence or strong all-cause mortality / disease-prevention evidence.",
    summary:
      "Longevity supplementation is hype-prone. This stack is conservative: compounds with either direct RCT evidence on meaningful endpoints (muscle preservation, cardiovascular events, cognitive function) or strong mechanism plus safety profile. Creatine and omega-3 both have mortality-reduction signals in meta-analyses. Vitamin D3 + K2 is the evidence-based cardiovascular-calcification pair. NMN is the best-supported NAD+ precursor with human pharmacokinetic data. Skipped: rapamycin (off-label pharmaceutical), metformin (prescription, mixed healthy-adult evidence), high-dose resveratrol monotherapy (weak absorption, inconsistent outcomes).",
    ingredients: [
      {
        slug: "creatine",
        role: "Muscle-mass preservation and cognitive support in aging — two of the most predictive healthspan markers.",
        dose: "5 g/day, daily and indefinitely",
        tier: "core",
      },
      {
        slug: "omega-3",
        role: "Cardiovascular, cognitive, and inflammatory benefits. Strongest mortality-association data of any supplement.",
        dose: "2-3 g combined EPA+DHA/day with food",
        tier: "core",
      },
      {
        slug: "vitamin-d",
        role: "Deficiency is the single most common correctable supplement intervention. Multiple disease-prevention signals.",
        dose: "1,000-2,000 IU/day; higher if blood level <30 ng/mL",
        tier: "core",
      },
      {
        slug: "vitamin-k2",
        role: "Pairs with vitamin D — directs calcium to bones and away from arterial walls (the 'calcification' problem).",
        dose: "90-180 mcg MK-7/day with vitamin D",
        tier: "supporting",
      },
      {
        slug: "nmn",
        role: "NAD+ precursor. Restores NAD+ levels that decline sharply with age. The cleanest human evidence in this category.",
        dose: "250-500 mg/day, morning",
        tier: "optional",
      },
    ],
    protocol:
      "The core three (creatine, omega-3, vitamin D) are high-confidence daily foundations. K2 pairs naturally with D — many products bundle them (D3+K2). NMN is optional and still on a cost-benefit frontier. Save it for after the foundation is solid and you have budget for experimentation. Don't expect 'feel' — these are long-game supplements.",
    cautions:
      "Vitamin K2 interacts with warfarin (see /interactions/vitamin-k-and-warfarin) — avoid if on it. Omega-3 has mild anticoagulant effect at high doses. Creatine is among the safest supplements; transient water retention in first week is normal. NMN has no established drug interactions at supplement doses.",
    tags: ["Longevity", "Healthspan", "NAD+", "Cardiovascular", "Anti-Aging"],
  },
  {
    slug: "recovery",
    name: "Recovery Stack",
    tagline: "Four compounds that reduce post-training inflammation and support the adaptation your workout was trying to produce.",
    summary:
      "Training produces adaptations only during recovery. Supplements can't replace sleep or protein intake — but they can accelerate inflammation resolution, support protein synthesis, and mitigate oxidative damage. Creatine and protein are the foundations. Omega-3s and curcumin target inflammation through non-overlapping mechanisms. Magnesium is the most-commonly-deficient mineral in hard-training populations and supports sleep quality — the real recovery lever. Skipped: glutamine (thin evidence in non-clinical populations), BCAAs (redundant with adequate protein), high-dose antioxidants (blunt training adaptations).",
    ingredients: [
      {
        slug: "creatine",
        role: "Primary ergogenic + brain fuel + recovery accelerant. Directly restores phosphocreatine between sets and sessions.",
        dose: "5 g/day, any time",
        tier: "core",
      },
      {
        slug: "whey-protein",
        role: "Fast-absorbing complete protein. Post-training and for daily target hitting (1.6-2.2 g/kg).",
        dose: "25-40 g post-training and as needed to hit daily protein target",
        tier: "core",
      },
      {
        slug: "omega-3",
        role: "Resolution of exercise-induced inflammation; improves between-session recovery and joint comfort.",
        dose: "2-3 g combined EPA+DHA/day with food",
        tier: "supporting",
      },
      {
        slug: "magnesium-glycinate",
        role: "Supports sleep quality (where most recovery happens) and muscle relaxation. Hard training depletes magnesium.",
        dose: "300-400 mg elemental, before bed",
        tier: "supporting",
      },
    ],
    protocol:
      "Creatine daily (timing irrelevant). Whey around training or to fill daily protein gaps. Omega-3 daily with food. Magnesium glycinate at night for sleep quality. Don't take high-dose vitamin C/E around training — they blunt the very oxidative signaling the adaptation requires.",
    cautions:
      "Omega-3 + anticoagulants requires physician oversight. Whey is dairy-derived — lactose-intolerant users need whey isolate or plant protein. Magnesium competes with thyroid medication; separate by 4 hours.",
    tags: ["Recovery", "Muscle", "Sports Performance", "Inflammation"],
  },
  {
    slug: "metabolic",
    name: "Metabolic Stack",
    tagline: "Four supplements with RCT evidence on blood sugar, triglycerides, or insulin sensitivity — the real metabolic risk markers.",
    summary:
      "Metabolic-health marketing ranges from legitimate (berberine) to marketing noise (chromium megadoses). This stack focuses on compounds with actual RCT evidence on glucose, HbA1c, or triglycerides in prediabetic or metabolic-syndrome populations. Berberine is the standout — AMPK activation with head-to-head evidence against metformin. Alpha-lipoic acid has specific diabetic-neuropathy evidence. Omega-3 at 2-3 g/day meaningfully reduces triglycerides. Cinnamon is an accessory, not a primary lever. Skipped: chromium (mostly ineffective at supplement doses), bitter melon (weak evidence in human trials), apple cider vinegar (minimal glucose effect).",
    ingredients: [
      {
        slug: "berberine",
        role: "AMPK activator — comparable to metformin in newly-diagnosed type 2 diabetics in multiple head-to-heads.",
        dose: "500 mg 2-3x/day with meals (short half-life requires split dosing)",
        tier: "core",
      },
      {
        slug: "omega-3",
        role: "Reduces triglycerides substantially at 2-3 g/day EPA+DHA. The only consistently-effective natural triglyceride lowerer.",
        dose: "2-3 g combined EPA+DHA/day with food",
        tier: "core",
      },
      {
        slug: "alpha-lipoic-acid",
        role: "Antioxidant + insulin sensitizer. Best-evidenced for diabetic neuropathy pain; modest glycemic effect.",
        dose: "300-600 mg/day split, on empty stomach",
        tier: "supporting",
      },
      {
        slug: "ceylon-cinnamon",
        role: "Modest fasting-glucose effect. Ceylon specifically — cassia cinnamon contains liver-stressing coumarin.",
        dose: "1-3 g/day",
        tier: "optional",
      },
    ],
    protocol:
      "Berberine dominates this stack — split doses are critical because of the short half-life. Omega-3 pairs well with any lipid-lowering strategy. Alpha-lipoic acid daily, morning. Cinnamon is accessory — not worth a dedicated regimen on its own. Monitor fasting glucose and HbA1c over 3-month cycles; this is a measurable stack.",
    cautions:
      "Berberine + diabetes medications (metformin, sulfonylureas, insulin) can cause additive hypoglycemia — monitor closely and coordinate with prescriber. Alpha-lipoic acid can lower blood sugar in diabetics. Omega-3 has mild anticoagulant effect. Cassia cinnamon (the cheap kind) has coumarin-related liver concerns at high chronic doses — Ceylon is the safer choice.",
    tags: ["Metabolic Health", "Blood Sugar", "Diabetes", "Triglycerides"],
  },
];

const bySlug = new Map(stacks.map((s) => [s.slug, s]));

export function stackBySlug(slug: string): Stack | undefined {
  return bySlug.get(slug);
}
