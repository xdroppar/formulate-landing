/**
 * Supplement support by specific condition. Each entry produces a page at
 * `/conditions/<slug>` that answers: "I have X — which supplements have
 * evidence for it?"
 *
 * Distinct from `/stacks/`: stacks are goal-oriented protocols you build
 * once and take. Conditions are symptom-oriented and typically cover both
 * lifestyle + supplement angles with explicit "when to see a clinician"
 * guidance.
 *
 * Add a new condition = add a new entry. No template changes.
 */

export type ConditionIngredient = {
  /** Encyclopedia slug. */
  slug: string;
  /** Strength of evidence for THIS specific condition. */
  tier: "strong" | "moderate" | "preliminary";
  /** Dose specific to this condition. */
  dose: string;
  /** What the research shows for this condition. ~40 words. */
  evidence: string;
};

export type Condition = {
  slug: string;
  /** Display title (the condition name). */
  name: string;
  /** One-sentence definition of the condition. */
  tagline: string;
  /** Broader context (~150 words): what it is, what matters, where
   * supplements fit in the bigger picture. */
  overview: string;
  /** Supplements with evidence for this specific condition, ordered by
   * evidence strength then by relevance. */
  supplements: ConditionIngredient[];
  /** Non-supplement factors that usually matter more than pills. */
  lifestyle: string;
  /** Symptoms that warrant seeing a clinician rather than self-supplementing. */
  red_flags: string;
  /** Links to related guides (slug, label). */
  related_guides?: { slug: string; label: string }[];
  /** Related stack slug if one exists. */
  related_stack?: string;
  /** Tags for the condition index. */
  tags: string[];
};

export const conditions: Condition[] = [
  {
    slug: "anxiety",
    name: "Anxiety",
    tagline: "Supplement support for chronic anxiety — where the evidence actually sits vs. where the marketing does.",
    overview:
      "Anxiety disorders are the most common mental health condition in the US, affecting roughly 1 in 5 adults annually. For mild-to-moderate symptoms, supplements with real trial evidence can complement (not replace) therapy and prescribed medication. For severe anxiety, GAD, panic disorder, or PTSD, supplements are adjuncts — a psychiatrist-supervised plan is the core intervention. The evidence picture here is unusually clean: a few compounds have multiple RCTs, most don't.",
    supplements: [
      {
        slug: "ashwagandha",
        tier: "strong",
        dose: "300–600 mg/day of standardized root extract (KSM-66 or Sensoril), daily for 8+ weeks",
        evidence: "Multiple RCTs show reduced cortisol response and lower Hamilton Anxiety Scale scores in users with stress-related anxiety. Best-evidenced anxiety adaptogen.",
      },
      {
        slug: "l-theanine",
        tier: "strong",
        dose: "200 mg as-needed for acute calm, or 200–400 mg/day daily",
        evidence: "Rapid anxiolytic effect without drowsiness. EEG studies show raised alpha-wave activity within 30 minutes. Good for situational anxiety.",
      },
      {
        slug: "magnesium-glycinate",
        tier: "moderate",
        dose: "300–400 mg elemental/day, split or evening",
        evidence: "Meta-analyses suggest moderate benefit, particularly in magnesium-deficient users. Low risk, inexpensive baseline addition.",
      },
      {
        slug: "rhodiola",
        tier: "moderate",
        dose: "200–600 mg/day of 3% rosavins extract, morning only",
        evidence: "More 'wired' stress profile responds better to Rhodiola than Ashwagandha. Some users find Rhodiola activating — monitor.",
      },
    ],
    lifestyle:
      "Regular aerobic exercise has effect sizes comparable to medication for mild-to-moderate anxiety in meta-analyses — the strongest non-pharmacological intervention. Sleep quality (7+ hours, consistent timing) is foundational; supplements can't compensate for chronic sleep debt. Caffeine reduction and alcohol avoidance often produce noticeable improvement within 2 weeks.",
    red_flags:
      "Panic attacks, intrusive thoughts about self-harm, significant functional impairment (can't work, avoidance of daily activities), or co-occurring depression warrant a clinician visit rather than self-supplementation. SSRIs and cognitive behavioral therapy have decades of evidence; supplements complement these — they don't replace them.",
    related_guides: [
      { slug: "magnesium-for-anxiety", label: "Magnesium for Anxiety" },
      { slug: "ashwagandha-guide", label: "Ashwagandha Guide" },
      { slug: "best-adaptogens-for-stress", label: "Best Adaptogens for Stress" },
    ],
    tags: ["Mental Health", "Anxiety", "Stress"],
  },
  {
    slug: "insomnia",
    name: "Insomnia",
    tagline: "Evidence-based supplements for sleep — timing vs quality, acute vs chronic, and when melatonin actually helps.",
    overview:
      "Insomnia breaks into two loosely-overlapping problems: difficulty falling asleep (sleep-onset insomnia) and difficulty staying asleep or poor sleep quality (maintenance insomnia). Supplement picks depend on which you have. Sleep hygiene, exercise timing, light exposure, and caffeine curfews affect sleep more than any supplement does — start there. If sleep hygiene is solid and the problem persists, the supplements below have RCT-level evidence.",
    supplements: [
      {
        slug: "magnesium-glycinate",
        tier: "strong",
        dose: "300–400 mg elemental, 30–60 minutes before bed",
        evidence: "Improves subjective and objective sleep quality in insomnia RCTs. Particularly useful when anxious thoughts or muscle tension disrupt sleep.",
      },
      {
        slug: "melatonin",
        tier: "strong",
        dose: "0.3–1 mg, 30–60 minutes before bed. Higher doses paradoxically disrupt sleep architecture.",
        evidence: "Strongest for circadian-timing issues (jet lag, shift work, delayed sleep phase). Modest effect in ordinary insomnia but reliable when timing is the issue.",
      },
      {
        slug: "glycine",
        tier: "moderate",
        dose: "3 g powder in water, 60 minutes before bed",
        evidence: "Human RCTs show improved subjective sleep quality and reduced next-day fatigue. Effects are subtle but consistent.",
      },
      {
        slug: "l-theanine",
        tier: "moderate",
        dose: "200 mg, 30 minutes before bed",
        evidence: "Not a sleep initiator per se — reduces pre-sleep mental arousal. Best paired with magnesium for anxious-mind insomnia.",
      },
      {
        slug: "valerian",
        tier: "preliminary",
        dose: "400–900 mg root extract, 30–60 minutes before bed",
        evidence: "GABAergic action with modest RCT support. Stronger effect on subjective than objective sleep measures. Unpleasant smell limits compliance.",
      },
    ],
    lifestyle:
      "Consistent wake time (more important than bedtime), morning bright light exposure, caffeine cutoff by 12pm, screen cutoff 1–2 hours before bed, and bedroom at 65–68°F are the highest-impact non-pharmacological interventions. CBT-Insomnia (CBT-I) has better long-term evidence than any sleep medication or supplement.",
    red_flags:
      "Insomnia lasting more than 3 months, waking gasping for air (possible sleep apnea), severe daytime sleepiness, or sleep problems tied to emerging depression warrant a sleep study or clinician evaluation. CBT-I is first-line for chronic insomnia and outperforms medication long-term.",
    related_guides: [
      { slug: "best-sleep-supplement-protocol", label: "Best Sleep Supplement Protocol" },
      { slug: "best-time-to-take-magnesium", label: "Best Time to Take Magnesium" },
    ],
    related_stack: "sleep",
    tags: ["Sleep", "Insomnia", "Circadian"],
  },
  {
    slug: "joint-pain",
    name: "Joint Pain",
    tagline: "Supplements with real trial evidence for osteoarthritis, tendinopathy, and exercise-related joint discomfort.",
    overview:
      "Joint pain has two drivers: inflammation (the acute-flare, day-to-day painful part) and structural cartilage loss (the chronic mechanical pain). Effective supplement protocols address both. The tier-1 evidence is strongest for osteoarthritis of the knee and hip; evidence for tendon pain and rheumatoid arthritis is different (omega-3 dominant for RA, collagen more important for tendon). Lifestyle factors (weight, load management, physical therapy) produce larger effect sizes than any supplement.",
    supplements: [
      {
        slug: "curcumin",
        tier: "strong",
        dose: "500–1,000 mg/day of a bioavailable form (Meriva, Longvida, BCM-95, or with piperine)",
        evidence: "Multiple RCTs show pain reduction comparable to NSAIDs in knee osteoarthritis, with dramatically better GI tolerability. Bioavailable forms matter — plain curcumin barely absorbs.",
      },
      {
        slug: "boswellia",
        tier: "strong",
        dose: "250–500 mg/day of AKBA-rich Boswellia serrata (5-Loxin, AprèsFlex)",
        evidence: "Inhibits 5-LOX (a separate inflammatory pathway from curcumin's NF-κB). Combines rationally with curcumin. Strong knee OA evidence.",
      },
      {
        slug: "omega-3",
        tier: "strong",
        dose: "2–3 g/day combined EPA+DHA with food",
        evidence: "Systemic anti-inflammatory; particularly strong for rheumatoid arthritis. Moderate for OA. Doubles as cardiovascular insurance.",
      },
      {
        slug: "glucosamine-sulfate",
        tier: "moderate",
        dose: "1,500 mg/day Glucosamine Sulfate (not HCl) + 1,200 mg Chondroitin",
        evidence: "Combination outperforms either alone in moderate-to-severe knee OA per meta-analyses. Effects take 8–12 weeks. Form matters — sulfate > HCl.",
      },
    ],
    lifestyle:
      "Weight loss produces the largest single effect on knee OA pain — a 10% weight reduction roughly halves pain scores in meta-analyses. Structured exercise (particularly quad strengthening for knees) outperforms any supplement. Topical NSAIDs are often more effective than oral ones with better safety. Physical therapy is underused.",
    red_flags:
      "Joint pain with swelling, redness, warmth, fever, sudden severe pain, or joint deformity warrants urgent medical evaluation (infection, gout, autoimmune flare). Morning stiffness lasting >1 hour suggests inflammatory arthritis — see a rheumatologist.",
    related_guides: [
      { slug: "best-supplements-for-joint-pain", label: "Best Supplements for Joint Pain" },
      { slug: "best-collagen-for-joints", label: "Best Collagen for Joints" },
    ],
    tags: ["Joint Pain", "Osteoarthritis", "Anti-Inflammatory"],
  },
  {
    slug: "fatigue",
    name: "Chronic Fatigue",
    tagline: "Supplements for persistent fatigue — after ruling out the medical causes that account for most of it.",
    overview:
      "Persistent fatigue is almost always multifactorial. Before supplement-hunting, rule out: thyroid dysfunction (TSH), iron deficiency (ferritin <50 ng/mL is suspicious even if hemoglobin is normal), vitamin B12 deficiency, vitamin D deficiency, sleep apnea, depression, and medication side effects. If those are clear, the supplements below have evidence in general-population or mitochondrial-dysfunction fatigue. The biggest win is often correcting a deficiency, not adding a novel supplement.",
    supplements: [
      {
        slug: "coq10",
        tier: "moderate",
        dose: "100–200 mg/day (ubiquinol preferred 50+), with fat",
        evidence: "Strongest for statin-induced muscle fatigue and mitochondrial-dysfunction profiles. Age-related decline is real — tissue levels drop 50% by 80.",
      },
      {
        slug: "iron-bisglycinate",
        tier: "strong",
        dose: "Varies — test serum ferritin first. Target 50+ ng/mL",
        evidence: "Low iron is the most commonly missed cause of fatigue in menstruating women. Bisglycinate form tolerated by most who can't tolerate ferrous sulfate.",
      },
      {
        slug: "vitamin-d",
        tier: "moderate",
        dose: "1,000–2,000 IU/day; higher if blood level <30 ng/mL",
        evidence: "Deficiency is common and correcting it often improves energy. Test first if possible — supplementing above optimal doesn't add benefit.",
      },
      {
        slug: "rhodiola",
        tier: "moderate",
        dose: "200–600 mg/day of 3% rosavins extract, morning",
        evidence: "Stress-related mental fatigue and burnout-profile fatigue responds to Rhodiola in RCTs. Not a magic bullet; combined with lifestyle works best.",
      },
    ],
    lifestyle:
      "Sleep consolidation (same schedule, dark room, no screens 1h before bed) is the highest-leverage intervention. Regular aerobic exercise paradoxically reduces fatigue — even 20 minutes 3×/week produces measurable improvement in fatigue studies. Alcohol reduction is underrated. Caffeine habituation means gradually cutting back often restores responsiveness.",
    red_flags:
      "Fatigue lasting more than 6 months without improvement, unintentional weight loss, night sweats, new cognitive changes, persistent low mood, or lymphadenopathy warrant medical workup. Myalgic encephalomyelitis / chronic fatigue syndrome (ME/CFS) requires specialist care — supplement self-treatment is inappropriate.",
    related_guides: [
      { slug: "coq10-benefits", label: "CoQ10 Benefits" },
      { slug: "iron-guide", label: "Iron Guide" },
    ],
    tags: ["Fatigue", "Energy", "Mitochondrial"],
  },
  {
    slug: "focus",
    name: "Focus & Attention",
    tagline: "Supplements for mental focus — ADHD-adjacent questions, studying-period usage, and what the research actually supports.",
    overview:
      "Focus supplementation covers three partially-overlapping use cases: adults with diagnosed ADHD looking for adjunct support, students or professionals during high-demand periods, and users with age-related mild cognitive complaints. The evidence is different for each. For diagnosed ADHD, stimulant medication has 20x the effect size of any supplement — supplements complement, don't replace. For healthy adults, a few compounds have legitimate effect sizes on attention tasks.",
    supplements: [
      {
        slug: "caffeine-theanine-stack",
        tier: "strong",
        dose: "100 mg caffeine + 200 mg L-theanine, morning or pre-task",
        evidence: "Best-studied acute cognitive combination. Smoother alertness curve than caffeine alone with equal task performance. Multiple RCTs.",
      },
      {
        slug: "omega-3",
        tier: "moderate",
        dose: "1–2 g combined EPA+DHA/day with food",
        evidence: "Modest attention-task improvements in adults. Specifically useful in adult ADHD as adjunct. Long timeline — 8+ weeks.",
      },
      {
        slug: "creatine",
        tier: "moderate",
        dose: "5 g/day, any time",
        evidence: "Growing evidence for cognitive benefit under stress or sleep deprivation. Brain ATP mechanism distinct from muscle use.",
      },
      {
        slug: "bacopa-monnieri",
        tier: "moderate",
        dose: "300 mg/day of standardized bacosides, with fat, 8+ weeks",
        evidence: "Strongest-evidenced chronic nootropic herb. Memory encoding and learning speed. Not an acute focus aid.",
      },
    ],
    lifestyle:
      "Adequate sleep and exercise beat any supplement for sustained focus — stimulant medication included, in meta-analyses of healthy adults. Caffeine cycling (2 weeks on, 1 week off) prevents habituation that reduces effect. Task blocking and distraction management (software + environment) produces larger attentional gains than any nootropic.",
    red_flags:
      "If focus issues significantly impact work, school, or relationships, consider diagnostic evaluation for ADHD — particularly if symptoms existed in childhood. Adult ADHD is under-diagnosed. Effective prescription treatment exists; supplement-only strategies typically underperform it.",
    related_guides: [
      { slug: "nootropics-guide", label: "Nootropics Guide" },
      { slug: "best-supplements-for-adhd-focus", label: "Best Supplements for ADHD Focus" },
    ],
    related_stack: "cognitive",
    tags: ["Focus", "ADHD", "Cognition", "Nootropics"],
  },
  {
    slug: "acid-reflux",
    name: "Acid Reflux (GERD)",
    tagline: "Supplements for heartburn and GERD — most don't work and some make it worse; a few have real evidence.",
    overview:
      "GERD (gastroesophageal reflux disease) is driven by inadequate lower esophageal sphincter tone, not 'too much stomach acid' per the old narrative. Proton pump inhibitors (PPIs) reduce stomach acid effectively but have their own long-term concerns. Supplement marketing in this category includes a lot of noise (apple cider vinegar, digestive enzymes) — and a few supplements that do have evidence. Lifestyle changes usually produce larger effects than any supplement.",
    supplements: [
      {
        slug: "melatonin",
        tier: "moderate",
        dose: "3 mg at bedtime (higher than sleep-only dose)",
        evidence: "Not obvious — but melatonin protects esophageal mucosa and improves LES tone. Multiple RCTs support it for mild-to-moderate GERD. Can combine with PPIs.",
      },
      {
        slug: "ginger",
        tier: "moderate",
        dose: "500–1,000 mg/day of standardized extract",
        evidence: "Prokinetic effect — speeds gastric emptying, reducing reflux exposure. Strongest evidence for functional dyspepsia; useful GERD adjunct.",
      },
      {
        slug: "licorice-dgl",
        tier: "preliminary",
        dose: "380–1,140 mg DGL before meals",
        evidence: "Deglycyrrhized licorice (DGL) protects mucosa. Evidence is thinner but consistent positive signal in functional-dyspepsia trials.",
      },
    ],
    lifestyle:
      "Weight loss (~10% body weight) meaningfully reduces GERD symptoms in most users — the single highest-impact intervention. Elevate head of bed 6–8 inches. Avoid eating within 3 hours of sleep. Identify trigger foods individually (coffee, alcohol, chocolate, spicy foods are common but not universal). Smoking cessation.",
    red_flags:
      "Difficulty swallowing, unintentional weight loss, persistent vomiting, black/bloody stools, or reflux requiring daily medication for more than 8 weeks warrants medical evaluation. Barrett's esophagus screening is appropriate in chronic GERD. Don't self-manage severe or persistent symptoms with supplements.",
    tags: ["Digestive", "GERD", "Heartburn"],
  },
  {
    slug: "migraines",
    name: "Migraines",
    tagline: "Three supplements with real migraine-prophylaxis evidence — and several marketing-heavy ones that don't work.",
    overview:
      "Migraine prophylaxis (preventing attacks) is distinct from acute treatment (stopping one in progress). Supplements have evidence only for prophylaxis — nothing beats triptans or CGRP antagonists for acute abort. For prophylaxis, three supplements have meta-analyses-level evidence supporting a real frequency reduction. Effects take 2–3 months to evaluate; commit to the protocol that long or don't start.",
    supplements: [
      {
        slug: "magnesium-glycinate",
        tier: "strong",
        dose: "400–600 mg elemental/day, split (glycinate or citrate)",
        evidence: "American Headache Society and American Academy of Neurology both rate magnesium as 'probably effective' for prevention. Best for users with aura.",
      },
      {
        slug: "coq10",
        tier: "strong",
        dose: "150–300 mg/day (ubiquinol preferred), with food",
        evidence: "Multiple RCTs show ~30% frequency reduction after 3 months. Works best for episodic migraine (<15 days/month).",
      },
      {
        slug: "riboflavin",
        tier: "strong",
        dose: "400 mg/day (high — well above RDA)",
        evidence: "Meta-analyses support ~40% frequency reduction at prophylactic doses. Turns urine bright yellow (harmless). Well-tolerated.",
      },
      {
        slug: "feverfew",
        tier: "moderate",
        dose: "100–300 mg/day of standardized extract (MIG-99)",
        evidence: "Traditional migraine herb with moderate trial evidence. Standardized MIG-99 extract has the best data.",
      },
    ],
    lifestyle:
      "Identifying triggers via a migraine diary produces the biggest non-pharmacologic gains — sleep deprivation, dehydration, alcohol, and hormonal patterns are common. Regular aerobic exercise reduces attack frequency. Magnesium deficiency is particularly common in migraine patients.",
    red_flags:
      "Sudden severe 'thunderclap' headache, new headache pattern after age 50, headache with fever or neck stiffness, or focal neurological symptoms warrant immediate medical attention. Frequent migraines (>4/month) merit a neurologist visit — CGRP antagonists have transformed prevention.",
    related_guides: [
      { slug: "magnesium-for-anxiety", label: "Magnesium Guide" },
      { slug: "coq10-benefits", label: "CoQ10 Benefits" },
    ],
    tags: ["Migraines", "Headaches", "Neurological"],
  },
  {
    slug: "pcos",
    name: "PCOS",
    tagline: "Supplement support for polycystic ovary syndrome — the two ingredients with real RCT evidence vs. everything else.",
    overview:
      "Polycystic ovary syndrome affects ~10% of women of reproductive age and drives insulin resistance, androgen excess, and ovulatory dysfunction. Lifestyle intervention (weight management when appropriate, regular exercise) is first-line and has larger effect sizes than any supplement. For supplements, two compounds stand out with multiple RCTs specifically in PCOS populations. Marketing around this condition is heavy — be skeptical of 'PCOS blends' without per-ingredient dosing.",
    supplements: [
      {
        slug: "inositol",
        tier: "strong",
        dose: "2,000 mg myo-inositol + 50 mg D-chiro-inositol, 2×/day (the 40:1 ratio matches plasma levels)",
        evidence: "Multiple RCTs show improved insulin sensitivity, ovulation frequency, and androgen markers. Approaches metformin efficacy with better tolerability.",
      },
      {
        slug: "berberine",
        tier: "strong",
        dose: "500 mg 2–3×/day with meals",
        evidence: "AMPK activator with head-to-head evidence against metformin for PCOS insulin resistance. Improves androgen profile alongside glucose.",
      },
      {
        slug: "vitamin-d",
        tier: "moderate",
        dose: "1,000–2,000 IU/day; correct deficiency to 40+ ng/mL",
        evidence: "Vitamin D deficiency is common in PCOS and correcting it modestly improves insulin and hormonal markers.",
      },
      {
        slug: "omega-3",
        tier: "moderate",
        dose: "2 g combined EPA+DHA/day",
        evidence: "Modest improvements in triglycerides, inflammation markers, and androgen levels in PCOS-specific trials.",
      },
    ],
    lifestyle:
      "Weight management when appropriate (5–10% loss improves ovulation and insulin sensitivity substantially), resistance training (not just cardio — builds insulin-sensitive muscle), and reduced-sugar eating patterns have the biggest effect sizes of any intervention. Sleep quality is underrated.",
    red_flags:
      "PCOS benefits from gynecologist / endocrinologist management, especially around fertility planning. Self-supplementation is a complement to clinical care, not a replacement. If periods are absent for more than 3 months, uterine lining protection becomes a concern — discuss with clinician.",
    related_guides: [
      { slug: "berberine-guide", label: "Berberine Guide" },
      { slug: "best-supplements-for-pcos", label: "Best Supplements for PCOS" },
    ],
    tags: ["PCOS", "Women's Health", "Hormonal", "Insulin Resistance"],
  },
];

const bySlug = new Map(conditions.map((c) => [c.slug, c]));

export function conditionBySlug(slug: string): Condition | undefined {
  return bySlug.get(slug);
}

/**
 * Conditions whose supplement list includes an entry matching this nutrient.
 * Each match returns the condition + the specific ConditionIngredient row so
 * the caller can render dose/evidence inline. Uses `nutrientForSupplementSlug`
 * to handle form-named slugs ("magnesium-glycinate" → magnesium nutrient).
 */
export function conditionsForNutrient(
  nutrient: { key: string; slug: string; synonyms: string[] },
): { condition: Condition; supplement: ConditionIngredient }[] {
  const out: { condition: Condition; supplement: ConditionIngredient }[] = [];
  for (const c of conditions) {
    for (const s of c.supplements) {
      const norm = s.slug.trim().toLowerCase();
      if (norm === nutrient.slug) {
        out.push({ condition: c, supplement: s });
        break;
      }
      if (norm.startsWith(`${nutrient.slug}-`)) {
        out.push({ condition: c, supplement: s });
        break;
      }
      if (
        nutrient.synonyms.some(
          (syn) => syn.toLowerCase().replace(/\s+/g, "-") === norm,
        )
      ) {
        out.push({ condition: c, supplement: s });
        break;
      }
    }
  }
  return out;
}
