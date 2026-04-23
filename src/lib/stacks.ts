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
    slug: "gut-health",
    name: "Gut Health Stack",
    tagline: "Four evidence-backed supplements for microbiome support, regularity, and gut-barrier integrity — not another kombucha fad.",
    summary:
      "Gut-health marketing is cluttered with low-dose probiotic blends and proprietary gimmicks. What the research actually supports is a smaller, more targeted stack: a fermentable prebiotic fiber to feed beneficial bacteria, a bulking fiber for regularity and cholesterol, a targeted amino acid for mucosal repair, and a butyrate source (or precursor) to directly feed colonocytes. This stack covers the three pillars of gut health — microbiome composition, motility, and barrier function — without betting on any single probiotic strain that may or may not colonize your particular gut.",
    ingredients: [
      {
        slug: "psyllium-husk",
        role: "Bulking soluble fiber — improves regularity, binds bile acids (lowers cholesterol), and feeds bacteria slowly down the colon.",
        dose: "5–10 g/day with water, split across meals. Ramp up over 2 weeks to avoid bloat.",
        tier: "core",
      },
      {
        slug: "inulin",
        role: "Fermentable prebiotic — selectively feeds Bifidobacteria and Lactobacillus populations.",
        dose: "2–5 g/day, ramp up slowly. Higher doses cause gas in sensitive guts.",
        tier: "core",
      },
      {
        slug: "l-glutamine",
        role: "Primary fuel for enterocytes. Supports mucosal repair in leaky-gut profiles and post-antibiotic recovery.",
        dose: "5–10 g/day on empty stomach, split. 4–8 week course typical.",
        tier: "supporting",
      },
      {
        slug: "butyrate",
        role: "Short-chain fatty acid directly fuels colonocytes and has anti-inflammatory effects in the colon. Supplements supply it when fiber fermentation doesn't.",
        dose: "150–600 mg/day of butyrate salt (sodium/calcium/magnesium butyrate).",
        tier: "optional",
      },
    ],
    protocol:
      "Start with psyllium + inulin at low doses for 2–3 weeks to let your gut bacteria adapt (expect some gas; that's fermentation doing its job). Add L-glutamine if you have active gut issues (IBS, post-antibiotic, gastritis, recovering from illness). Butyrate is the niche add — skip unless you have a specific colon-health indication.",
    cautions:
      "Psyllium can reduce absorption of medications; separate by 2 hours. Inulin aggravates IBS-FODMAP sensitivity in some users — start very low. L-glutamine is contraindicated in advanced liver or kidney disease. Stop adding new supplements if symptoms worsen and reintroduce one at a time.",
    tags: ["Gut Health", "Microbiome", "Digestion", "Fiber"],
  },
  {
    slug: "testosterone",
    name: "Men's Testosterone Stack",
    tagline: "Evidence-based supplements for low-normal testosterone — micronutrient basics first, then the herbs with real RCT data.",
    summary:
      "Testosterone supplementation marketing is a minefield. The three things that meaningfully move testosterone at supplement doses: correcting micronutrient deficiencies (especially zinc and vitamin D), chronic stress reduction (ashwagandha), and the one herb with real RCT evidence (Tongkat Ali). Tribulus, maca, DHEA, and most 'natural T-boosters' consistently fail in trials. This stack covers the evidence base without the noise.",
    ingredients: [
      {
        slug: "vitamin-d",
        role: "Deficiency is strongly associated with low testosterone; correcting it modestly raises T in deficient men.",
        dose: "2,000–5,000 IU/day based on blood level (target 40+ ng/mL).",
        tier: "core",
      },
      {
        slug: "zinc",
        role: "Zinc is a direct cofactor in testosterone synthesis. Deficiency reliably lowers T; supplementation in deficient men raises it.",
        dose: "15–30 mg/day (picolinate or bisglycinate form). Pair with 2 mg copper if using long-term.",
        tier: "core",
      },
      {
        slug: "ashwagandha",
        role: "Lowers cortisol-driven T suppression. Multiple RCTs show small-to-moderate T increases in stressed men.",
        dose: "300–600 mg/day of standardized extract (KSM-66 or Sensoril). 8-week minimum trial.",
        tier: "supporting",
      },
      {
        slug: "tongkat-ali",
        role: "The one 'T-booster' herb with multiple placebo-controlled trials showing actual free-testosterone rise, especially in men with stress-related low T.",
        dose: "200–400 mg/day of standardized extract (eurycomanone 1–2%). 4–8 week trial.",
        tier: "supporting",
      },
    ],
    protocol:
      "Get labs first — total T, free T, SHBG, and vitamin D level. Correct vitamin D and zinc deficiencies before judging effect. Add Ashwagandha and/or Tongkat Ali for 8–12 weeks, then retest. Stack effect is modest (typically 10–20% total T rise in deficient men). Skip if already taking TRT.",
    cautions:
      "Low testosterone is often a symptom of deeper issues (sleep apnea, obesity, chronic stress, medications). Supplements address the margins; lifestyle addresses the root cause. Don't stack on top of TRT without prescriber sign-off. Ashwagandha can shift thyroid levels — monitor if on levothyroxine.",
    tags: ["Men's Health", "Testosterone", "Hormonal", "Sexual Health"],
  },
  {
    slug: "mood",
    name: "Mood Support Stack",
    tagline: "Supplements with RCT-level evidence for mild-to-moderate depressive symptoms — adjunct to, not replacement for, clinical care.",
    summary:
      "Depression supplement marketing ranges from 'hopeful but thin evidence' to outright dangerous interactions. This stack includes only compounds with RCT-level support for mood effects in mild-to-moderate symptom ranges. Critical caveat: supplements are adjunct, not replacement. For significant depression, evidence-based psychotherapy and/or prescribed antidepressants have dramatically larger effect sizes. This stack works best alongside clinical care or for users with sub-clinical mood symptoms.",
    ingredients: [
      {
        slug: "omega-3",
        role: "EPA-dominant omega-3 has meta-analyses showing modest but real antidepressant effect, strongest as SSRI adjunct.",
        dose: "1,000–2,000 mg EPA/day (not DHA-dominant) with food.",
        tier: "core",
      },
      {
        slug: "vitamin-d",
        role: "Deficiency is associated with depression; correcting it lifts mood in deficient users. Meta-analyses are mixed but favorable.",
        dose: "2,000 IU/day baseline; higher if blood level <30 ng/mL.",
        tier: "core",
      },
      {
        slug: "saffron",
        role: "Multiple RCTs show saffron equivalent to low-dose SSRIs for mild-to-moderate depression. Best-evidenced standalone mood herb.",
        dose: "30 mg/day of standardized extract (Affron, Satiereal, or 2% safranal).",
        tier: "supporting",
      },
      {
        slug: "sam-e",
        role: "Methyl-donor with SSRI-adjunct RCT evidence. Expensive but clinically meaningful effect sizes in head-to-head trials.",
        dose: "400–800 mg/day (enteric-coated) on empty stomach. Start low to avoid GI upset.",
        tier: "optional",
      },
    ],
    protocol:
      "Start with Omega-3 + Vitamin D as foundation (both have broader health benefits). Add Saffron for a 6–8 week trial if mood symptoms persist. SAM-e is the bigger lever but expensive; consider only if Saffron doesn't help. If on SSRIs or SNRIs — always coordinate with prescriber; serotonin syndrome is the acute risk.",
    cautions:
      "Multiple compounds here interact with antidepressants. SAM-e + SSRIs + St. John's Wort is a classic serotonin syndrome trigger (never combine without MD oversight). 5-HTP has similar concerns. This stack is for users NOT on serotonergic prescription drugs, or under clinician supervision if on them. See /conditions/anxiety for complementary anxiety-first approach.",
    tags: ["Mood", "Depression", "Mental Health", "SSRI Adjunct"],
  },
  {
    slug: "cardiovascular",
    name: "Cardiovascular Stack",
    tagline: "Four compounds with large-trial evidence on heart disease endpoints — not biomarker-only pixie dust.",
    summary:
      "Cardiovascular supplement marketing is rife with biomarker theater: compounds that move a lab number without affecting actual events (heart attacks, strokes, death). This stack includes only compounds with outcome-level evidence. Omega-3 at therapeutic doses has cardiovascular benefit in meta-analyses; CoQ10 has Q-SYMBIO-level evidence in heart failure; Vitamin K2 addresses arterial calcification; Magnesium has hard event evidence in large cohorts. Niacin, red yeast rice, and garlic are omitted — they move biomarkers but have mixed outcome data.",
    ingredients: [
      {
        slug: "omega-3",
        role: "High-dose EPA (REDUCE-IT trial, Vascepa) meaningfully reduces cardiovascular events. General fish-oil doses show smaller but real benefit.",
        dose: "2,000–4,000 mg combined EPA+DHA/day with food. Higher if triglycerides are elevated.",
        tier: "core",
      },
      {
        slug: "coq10",
        role: "Heart failure adjunct with Q-SYMBIO-level RCT evidence. Also addresses statin-induced muscle fatigue.",
        dose: "100–300 mg/day (ubiquinol preferred over 50) with fat.",
        tier: "core",
      },
      {
        slug: "vitamin-k2",
        role: "Redirects calcium from arterial walls to bones — reduces arterial stiffness in trials. Pairs with vitamin D.",
        dose: "90–180 mcg MK-7/day with a fat-containing meal.",
        tier: "supporting",
      },
      {
        slug: "magnesium",
        role: "Meta-analyses consistently show magnesium supplementation reduces blood pressure and atrial fibrillation risk.",
        dose: "300–400 mg elemental/day (glycinate or citrate form).",
        tier: "supporting",
      },
    ],
    protocol:
      "Omega-3 daily with fish meals or a quality IFOS-certified supplement. CoQ10 is particularly valuable if you're on a statin (mitigates muscle fatigue). K2 + vitamin D as a pair for long-term arterial health. Magnesium for BP support and general cardiovascular function. Monitor triglycerides and BP every 6 months to track effect.",
    cautions:
      "Vitamin K2 interacts meaningfully with warfarin — contraindicated if on it. High-dose omega-3 has mild anticoagulant effect; watch with blood thinners. CoQ10 modestly reduces warfarin's effect (structural similarity to vitamin K). Magnesium can accumulate in kidney disease — dose-adjust if GFR is impaired. Coordinate with your cardiologist if on multiple cardiovascular medications.",
    tags: ["Cardiovascular", "Heart Health", "Blood Pressure", "Cholesterol"],
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
