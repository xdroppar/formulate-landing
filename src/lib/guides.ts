export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: "roundup" | "protocol" | "review" | "guide";
  categoryLabel: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  tags: string[];
  /** Link to relevant catalog page in the web app */
  catalogLink?: string;
  /** Show a "New" badge on the guide card */
  isNew?: boolean;
  /**
   * Hide from listings, sitemap, related-guides, and tag pages. The page still
   * renders at its URL but is marked noindex so search engines drop it.
   */
  hidden?: boolean;
  /** Author id from authors.ts — omit to use the default team byline. */
  author?: string;
  /** Optional medical/clinical reviewer id from authors.ts. */
  reviewer?: string;
}

export const guides: Guide[] = [
  {
    slug: "best-creatine-supplements",
    title: "Best Creatine Supplements in 2026, Ranked by Clinical Evidence",
    description:
      "We scored 8 creatine supplements on dose accuracy, purity, and bioavailability. Here are the results — no sponsorships, just data.",
    category: "roundup",
    categoryLabel: "Roundup",
    publishedAt: "2026-03-29",
    updatedAt: "2026-03-29",
    readTime: "8 min read",
    tags: ["Creatine", "Muscle", "Sports Performance"],
    catalogLink: "https://app.formulate-health.app/catalog?q=creatine",
  },
  {
    slug: "best-magnesium-supplements",
    title: "Best Magnesium Supplements in 2026, Ranked by Clinical Evidence",
    description:
      "Magnesium glycinate vs citrate vs threonate — we scored every form on absorption, dose accuracy, and third-party testing.",
    category: "roundup",
    categoryLabel: "Roundup",
    publishedAt: "2026-03-29",
    updatedAt: "2026-03-29",
    readTime: "9 min read",
    tags: ["Magnesium", "Minerals", "Sleep", "Recovery"],
    catalogLink: "https://app.formulate-health.app/catalog?q=magnesium",
  },
  {
    slug: "best-omega-3-supplements",
    title: "Best Omega-3 & Fish Oil Supplements in 2026, Ranked by Clinical Evidence",
    description:
      "EPA/DHA dose, oxidation levels, heavy metal testing — we scored 8 omega-3 supplements so you don't have to guess.",
    category: "roundup",
    categoryLabel: "Roundup",
    publishedAt: "2026-03-29",
    updatedAt: "2026-03-29",
    readTime: "9 min read",
    tags: ["Omega-3", "Heart Health", "Brain Health"],
    catalogLink: "https://app.formulate-health.app/catalog?q=omega",
  },
  {
    slug: "best-vitamin-d-supplements",
    title: "Best Vitamin D Supplements in 2026, Ranked by Clinical Evidence",
    description:
      "D3 vs D2, dosing for deficiency, and which brands actually deliver what's on the label. Evidence-based rankings inside.",
    category: "roundup",
    categoryLabel: "Roundup",
    publishedAt: "2026-03-29",
    updatedAt: "2026-03-29",
    readTime: "8 min read",
    tags: ["Vitamin D", "Immune Support", "Bone Support"],
    catalogLink: "https://app.formulate-health.app/catalog?q=vitamin+d",
  },
  {
    slug: "best-sleep-supplement-protocol",
    title: "The Best Sleep Supplement Protocol — Evidence-Based Stack for Deep Sleep",
    description:
      "Magnesium, L-theanine, and glycine — how to combine sleep supplements backed by clinical trials into one effective protocol.",
    category: "protocol",
    categoryLabel: "Protocol",
    publishedAt: "2026-03-29",
    updatedAt: "2026-03-29",
    readTime: "10 min read",
    tags: ["Sleep", "Magnesium", "L-Theanine", "Glycine", "Protocol"],
    catalogLink: "https://app.formulate-health.app/catalog?q=sleep",
  },
  {
    slug: "best-pre-workout-supplement-protocol",
    title: "The Best Pre-Workout Supplement Protocol — Build Your Own Evidence-Based Stack",
    description:
      "Creatine, beta-alanine, citrulline, and caffeine — the clinically validated pre-workout stack without proprietary blend nonsense.",
    category: "protocol",
    categoryLabel: "Protocol",
    publishedAt: "2026-03-29",
    updatedAt: "2026-03-29",
    readTime: "10 min read",
    tags: ["Pre-Workout", "Creatine", "Sports Performance", "Protocol"],
    catalogLink: "https://app.formulate-health.app/catalog?q=pre-workout",
  },
  {
    slug: "how-to-build-a-supplement-stack",
    title: "How to Build a Supplement Stack — A Beginner's Evidence-Based Guide",
    description:
      "Stop guessing. Learn how to pick supplements that actually work, avoid redundancy, and build a stack tailored to your goals.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-03-29",
    updatedAt: "2026-03-29",
    readTime: "12 min read",
    tags: ["Stack Building", "Beginner", "General Health"],
    catalogLink: "https://app.formulate-health.app/stack",
  },
  {
    slug: "supplement-timing-guide",
    title: "When to Take Your Supplements — A Complete Timing Guide",
    description:
      "Which supplements to take morning vs night, what to pair together, what to separate, and which timing rules actually matter.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-03-30",
    updatedAt: "2026-03-30",
    readTime: "10 min read",
    tags: ["Timing", "Stack Building", "Absorption", "General Health"],
    catalogLink: "https://app.formulate-health.app/stack",
  },
  {
    slug: "how-to-read-a-supplement-label",
    title: "How to Read a Supplement Label — Doses, Forms, and Red Flags",
    description:
      "Proprietary blends, underdosed ingredients, and cheap forms — learn to spot them in 60 seconds by reading the Supplement Facts panel.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-03-30",
    updatedAt: "2026-03-30",
    readTime: "11 min read",
    tags: ["Label Reading", "Beginner", "Quality", "Third-Party Testing"],
    catalogLink: "https://app.formulate-health.app/catalog",
  },
  {
    slug: "signs-you-are-magnesium-deficient",
    title: "8 Signs You Might Be Magnesium Deficient",
    description:
      "Muscle cramps, poor sleep, anxiety, fatigue — subclinical magnesium deficiency is common and easy to miss. Here's how to identify and fix it.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-03-30",
    updatedAt: "2026-03-30",
    readTime: "9 min read",
    tags: ["Magnesium", "Deficiency", "Sleep", "Minerals"],
    catalogLink: "https://app.formulate-health.app/catalog?q=magnesium",
  },
  {
    slug: "do-you-need-a-multivitamin",
    title: "Do You Actually Need a Multivitamin?",
    description:
      "The research is surprisingly mixed. We break down when multivitamins make sense, when they don't, and what to do instead.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-03-30",
    updatedAt: "2026-03-30",
    readTime: "10 min read",
    tags: ["Multivitamin", "Beginner", "General Health", "Nutrition"],
    catalogLink: "https://app.formulate-health.app/catalog",
  },
  {
    slug: "what-to-look-for-in-a-probiotic",
    title: "What to Look for in a Probiotic — Strains, CFU, and Red Flags",
    description:
      "Most probiotic advice is wrong. Strain specificity matters more than CFU count — here's how to choose one that actually works.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-03-30",
    updatedAt: "2026-03-30",
    readTime: "10 min read",
    tags: ["Probiotics", "Gut Health", "Digestive Health"],
    catalogLink: "https://app.formulate-health.app/catalog?q=probiotic",
  },
  {
    slug: "beginner-longevity-supplement-stack",
    title: "A Beginner's Longevity Supplement Stack — What the Evidence Actually Supports",
    description:
      "NAD+, resveratrol, spermidine — longevity supplements are everywhere. We tier them by evidence strength so you know where to start.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-03-30",
    updatedAt: "2026-03-30",
    readTime: "12 min read",
    tags: ["Longevity", "NAD+", "Anti-Aging", "Stack Building"],
    catalogLink: "https://app.formulate-health.app/stack",
  },
  {
    slug: "creatine-loading-phase",
    title: "Creatine Loading Phase — Is It Necessary?",
    description:
      "The loading phase gets you to saturation faster, but you end up in the same place either way. Here's what the research says about loading, cycling, and timing.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-03-30",
    updatedAt: "2026-03-30",
    readTime: "8 min read",
    tags: ["Creatine", "Dosing", "Sports Performance"],
    catalogLink: "https://app.formulate-health.app/catalog?q=creatine",
  },
  {
    slug: "zinc-guide",
    title: "Zinc — Immune Support, Testosterone, and the Copper Connection",
    description:
      "Zinc lozenges cut colds by 33%, but high-dose zinc depletes copper. Forms, dosing, the testosterone question, and who's most at risk for deficiency.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-03-31",
    updatedAt: "2026-03-31",
    readTime: "11 min read",
    tags: ["Zinc", "Minerals", "Immune Support", "Testosterone", "Copper"],
    catalogLink: "https://app.formulate-health.app/catalog?q=zinc",
    isNew: true,
  },
  {
    slug: "lions-mane-guide",
    title: "Lion\u2019s Mane Mushroom \u2014 Cognitive Benefits, Evidence, and What to Look For",
    description:
      "Lion\u2019s mane stimulates nerve growth factor (NGF) and has real human trial data for cognition. Fruiting body vs mycelium, dosing, and quality markers explained.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-03-31",
    updatedAt: "2026-03-31",
    readTime: "10 min read",
    tags: ["Lion\u2019s Mane", "Nootropics", "Brain Health", "Mushrooms", "NGF"],
    catalogLink: "https://app.formulate-health.app/catalog?q=lion%27s+mane",
    isNew: true,
  },
  {
    slug: "nac-guide",
    title: "NAC (N-Acetyl Cysteine) \u2014 The Antioxidant Precursor You Should Know About",
    description:
      "NAC is the most efficient oral precursor to glutathione. From ER overdose treatment to mental health research \u2014 dosing, evidence, and who benefits most.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-03-31",
    updatedAt: "2026-03-31",
    readTime: "11 min read",
    tags: ["NAC", "Glutathione", "Antioxidant", "Liver Support", "Mental Health"],
    catalogLink: "https://app.formulate-health.app/catalog?q=nac",
    isNew: true,
  },
  {
    slug: "ashwagandha-guide",
    title: "Ashwagandha — Does It Actually Work?",
    description:
      "KSM-66 vs Sensoril vs generic root powder. The cortisol, anxiety, and testosterone evidence — what holds up and what doesn't.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-03-31",
    updatedAt: "2026-03-31",
    readTime: "11 min read",
    tags: ["Ashwagandha", "Stress", "Cortisol", "Adaptogens", "KSM-66"],
    catalogLink: "https://app.formulate-health.app/catalog?q=ashwagandha",
    isNew: true,
  },
  {
    slug: "collagen-guide",
    title: "Collagen Supplements — What the Evidence Actually Supports",
    description:
      "Your body doesn't just digest collagen into random amino acids. Specific peptides survive intact and signal tissue repair. Here's what works and what's marketing.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-03-31",
    updatedAt: "2026-03-31",
    readTime: "10 min read",
    tags: ["Collagen", "Skin Health", "Joint Health", "Peptides"],
    catalogLink: "https://app.formulate-health.app/catalog?q=collagen",
    isNew: true,
  },
  {
    slug: "vitamin-b12-guide",
    title: "Vitamin B12 \u2014 Who Actually Needs It and Which Form to Take",
    description:
      "B12 deficiency is common in vegans, older adults, and metformin users \u2014 and standard blood tests can miss it. Methylcobalamin vs cyanocobalamin, dosing, and the MMA test explained.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-04-01",
    updatedAt: "2026-04-01",
    readTime: "11 min read",
    tags: ["Vitamin B12", "Deficiency", "Nerve Health", "Methylation", "Vegan"],
    catalogLink: "https://app.formulate-health.app/catalog?q=b12",
    isNew: true,
  },
  {
    slug: "berberine-guide",
    title: "Berberine \u2014 The Blood Sugar Supplement Compared to Metformin",
    description:
      "Berberine activates AMPK, lowers blood sugar comparably to metformin in clinical trials, and improves lipid markers. Dosing, drug interactions, and who actually benefits.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-04-01",
    updatedAt: "2026-04-01",
    readTime: "12 min read",
    tags: ["Berberine", "Blood Sugar", "Metabolic Health", "AMPK", "Longevity"],
    catalogLink: "https://app.formulate-health.app/catalog?q=berberine",
    isNew: true,
  },
  {
    slug: "electrolytes-guide",
    title: "Electrolytes \u2014 What You Actually Need, When, and How Much",
    description:
      "The sports drink industry massively overstates the need. Sodium, potassium, magnesium \u2014 who actually benefits, the DIY recipe, and why \u201Cketo flu\u201D is just an electrolyte deficit.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-04-01",
    updatedAt: "2026-04-01",
    readTime: "12 min read",
    tags: ["Electrolytes", "Sodium", "Potassium", "Magnesium", "Hydration", "Keto"],
    catalogLink: "https://app.formulate-health.app/catalog?q=electrolytes",
    isNew: true,
  },
  {
    slug: "taurine-guide",
    title: "Taurine \u2014 The Longevity Amino Acid Hiding in Your Energy Drink",
    description:
      "A 2023 Science paper linked taurine deficiency to aging and showed 10\u201312% lifespan extension in mice. Cardiovascular evidence, exercise performance, dosing, and the energy drink irony.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-04-01",
    updatedAt: "2026-04-01",
    readTime: "11 min read",
    tags: ["Taurine", "Longevity", "Cardiovascular", "Exercise", "Anti-Aging"],
    catalogLink: "https://app.formulate-health.app/catalog?q=taurine",
    isNew: true,
  },
  {
    slug: "iron-guide",
    title: "Iron Supplements \u2014 Who Needs Them, Who Should Avoid Them, and How to Not Waste Your Money",
    description:
      "Iron is one of the few supplements that can genuinely harm you in excess. Ferritin testing, bisglycinate vs sulfate, the every-other-day dosing trick, and absorption boosters explained.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-04-01",
    updatedAt: "2026-04-01",
    readTime: "12 min read",
    tags: ["Iron", "Minerals", "Deficiency", "Ferritin", "Women\u2019s Health"],
    catalogLink: "https://app.formulate-health.app/catalog?q=iron",
    isNew: true,
  },
  {
    slug: "nootropics-guide",
    title: "A Beginner\u2019s Guide to Nootropics \u2014 What Works, What\u2019s Hype, and Where to Start",
    description:
      "We tier nootropics by human evidence: caffeine + L-theanine, creatine, and omega-3 on top \u2014 then lion\u2019s mane, bacopa, alpha-GPC. Red flags, stack building, and realistic expectations.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-04-01",
    updatedAt: "2026-04-01",
    readTime: "13 min read",
    tags: ["Nootropics", "Brain Health", "Caffeine", "Creatine", "Lion\u2019s Mane", "Focus"],
    catalogLink: "https://app.formulate-health.app/catalog",
    isNew: true,
  },
  {
    slug: "strength-training-frequency-longevity",
    title: "How Many Times Per Week Should You Strength Train for Longevity?",
    description:
      "The dose-response research on strength training and all-cause mortality — how many weekly sessions actually matter, and where diminishing returns kick in.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-05",
    readTime: "11 min read",
    tags: ["Strength Training", "Longevity", "Frequency", "Fitness"],
    catalogLink: "https://app.formulate-health.app/catalog?q=creatine",
    isNew: true,
    hidden: true,
  },
  {
    slug: "best-longevity-exercises",
    title: "The 6 Best Exercises for Longevity, Backed by Research",
    description:
      "Squat, hinge, carry, push, pull, and Zone 2 — the six movement patterns that predict how well you age, and how to train each one.",
    category: "roundup",
    categoryLabel: "Roundup",
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-05",
    readTime: "12 min read",
    tags: ["Longevity", "Strength Training", "Exercise Selection", "Fitness"],
    catalogLink: "https://app.formulate-health.app/catalog?q=creatine",
    isNew: true,
    hidden: true,
  },
  {
    slug: "zone-2-cardio-longevity",
    title: "How Much Zone 2 Cardio You Actually Need for Longevity",
    description:
      "What Zone 2 really is, how to find it without a lab, and the weekly dose that drives mitochondrial adaptation and long-term VO2 max.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-05",
    readTime: "12 min read",
    tags: ["Zone 2", "Cardio", "Longevity", "VO2 Max", "Fitness"],
    catalogLink: "https://app.formulate-health.app/catalog?q=electrolytes",
    isNew: true,
    hidden: true,
  },
  {
    slug: "minimum-effective-dose-strength-training",
    title: "The Minimum Effective Dose for Strength Training",
    description:
      "The smallest amount of lifting that still builds strength, muscle, bone density, and longevity benefit — two sessions a week, done right.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-05",
    readTime: "11 min read",
    tags: ["Strength Training", "Longevity", "Minimum Effective Dose", "Fitness"],
    catalogLink: "https://app.formulate-health.app/catalog?q=creatine",
    isNew: true,
    hidden: true,
  },
  {
    slug: "weekly-longevity-training-plan",
    title: "The Ideal Weekly Training Plan for Longevity",
    description:
      "Strength, Zone 2, VO2 max, and walking — the complete weekly training structure that covers every adaptation that matters for healthspan.",
    category: "protocol",
    categoryLabel: "Protocol",
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-05",
    readTime: "13 min read",
    tags: ["Longevity", "Weekly Plan", "Strength Training", "Zone 2", "VO2 Max", "Fitness"],
    catalogLink: "https://app.formulate-health.app/stack",
    isNew: true,
    hidden: true,
  },
  {
    slug: "vo2-max-longevity",
    title: "VO2 Max and Longevity: Why It\u2019s the #1 Mortality Predictor",
    description:
      "VO2 max predicts all-cause mortality better than smoking, hypertension, or diabetes. Here\u2019s what it is, how to measure it, and how to raise yours at any age.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-05",
    readTime: "13 min read",
    tags: ["VO2 Max", "Longevity", "Cardio", "Mortality", "Fitness"],
    catalogLink: "https://app.formulate-health.app/catalog?q=beetroot",
    isNew: true,
    hidden: true,
  },
  {
    slug: "grip-strength-longevity",
    title: "Grip Strength and Longevity: Why It Predicts Mortality Better Than Blood Pressure",
    description:
      "Every 5 kg drop in grip strength is linked to a 16% higher risk of all-cause mortality. What grip strength measures, target numbers by age, and three exercises that build it.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-05",
    readTime: "11 min read",
    tags: ["Grip Strength", "Longevity", "Mortality", "Sarcopenia", "Fitness"],
    catalogLink: "https://app.formulate-health.app/catalog?q=creatine",
    isNew: true,
    hidden: true,
  },
  {
    slug: "how-to-train-after-50",
    title: "How to Train After 50: The Evidence-Based Playbook",
    description:
      "Heavier, not lighter. More focused, not less. What actually works for strength, power, and cardio training in adults over 50 \u2014 plus how to train around old injuries.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-05",
    readTime: "14 min read",
    tags: ["Training Over 50", "Longevity", "Strength Training", "Sarcopenia", "Fitness"],
    catalogLink: "https://app.formulate-health.app/catalog?q=creatine",
    isNew: true,
    hidden: true,
  },
  {
    slug: "sets-per-muscle-per-week",
    title: "How Many Sets Per Muscle Per Week? The Volume Guide",
    description:
      "10\u201320 sets for hypertrophy, 5\u201312 for strength, 4\u201310 for longevity \u2014 but the word \u201chard\u201d is doing most of the work. Here\u2019s what the volume research actually shows.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-05",
    readTime: "12 min read",
    tags: ["Training Volume", "Hypertrophy", "Strength Training", "Programming", "Fitness"],
    catalogLink: "https://app.formulate-health.app/catalog?q=creatine",
    isNew: true,
    hidden: true,
  },
  {
    slug: "best-exercises-for-legs",
    title: "The Best Leg Exercises for Strength and Longevity",
    description:
      "Squats, trap bar deadlifts, Bulgarian split squats, RDLs, step-ups \u2014 the lower-body exercises that actually build useful strength and predict how well you\u2019ll age.",
    category: "roundup",
    categoryLabel: "Roundup",
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-05",
    readTime: "12 min read",
    tags: ["Leg Exercises", "Squats", "Deadlifts", "Longevity", "Fitness"],
    catalogLink: "https://app.formulate-health.app/catalog?q=creatine",
    isNew: true,
    hidden: true,
  },
  {
    slug: "best-exercises-for-back",
    title: "The Best Back Exercises for Strength, Posture, and Longevity",
    description:
      "Deadlifts, pull-ups, rows, and face pulls \u2014 the four back exercises that build the muscle mass and postural strength that protect you into old age.",
    category: "roundup",
    categoryLabel: "Roundup",
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-05",
    readTime: "12 min read",
    tags: ["Back Exercises", "Pull-Ups", "Deadlifts", "Posture", "Fitness"],
    catalogLink: "https://app.formulate-health.app/catalog?q=creatine",
    isNew: true,
    hidden: true,
  },
  {
    slug: "zone-2-vs-hiit",
    title: "Zone 2 vs HIIT: Which Matters More for Longevity?",
    description:
      "Zone 2 and HIIT aren\u2019t competitors \u2014 they produce different adaptations. The 80/20 polarized split that elite endurance athletes use, and why it works for non-athletes too.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-05",
    readTime: "12 min read",
    tags: ["Zone 2", "HIIT", "Cardio", "VO2 Max", "Longevity", "Fitness"],
    catalogLink: "https://app.formulate-health.app/catalog?q=electrolytes",
    isNew: true,
    hidden: true,
  },
  {
    slug: "walking-vs-running-longevity",
    title: "Walking vs Running for Longevity: What the Research Actually Shows",
    description:
      "Running produces bigger per-minute mortality benefits; walking produces benefits with almost no injury risk. The real answer isn\u2019t either \u2014 it\u2019s both, in a specific ratio.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-05",
    readTime: "12 min read",
    tags: ["Walking", "Running", "Longevity", "Cardio", "Steps", "Fitness"],
    catalogLink: "https://app.formulate-health.app/catalog?q=omega",
    isNew: true,
    hidden: true,
  },
  {
    slug: "protein-intake-muscle-after-40",
    title: "Protein Intake for Muscle Growth After 40 \u2014 How Much and When",
    description:
      "The RDA is half of what you need. The evidence-based target for adults over 40 is 1.6\u20132.0 g/kg per day across 3\u20134 meals of 30\u201340g each. Here\u2019s how to actually hit it.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-05",
    readTime: "13 min read",
    tags: ["Protein", "Nutrition", "Muscle Growth", "Sarcopenia", "Over 40", "Fitness"],
    catalogLink: "https://app.formulate-health.app/catalog?q=protein",
    isNew: true,
    hidden: true,
  },
  {
    slug: "sarcopenia-reverse-muscle-loss",
    title: "Sarcopenia: How to Reverse Age-Related Muscle Loss",
    description:
      "Studies in adults in their 80s and 90s show sarcopenia is reversible. The evidence-based protocol: resistance training, protein, vitamin D, and creatine \u2014 plus how to tell if you have it.",
    category: "protocol",
    categoryLabel: "Protocol",
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-05",
    readTime: "14 min read",
    tags: ["Sarcopenia", "Muscle Loss", "Aging", "Strength Training", "Protein", "Fitness"],
    catalogLink: "https://app.formulate-health.app/catalog?q=creatine",
    isNew: true,
    hidden: true,
  },
];

/** Guides visible in listings, sitemap, tag pages, and related-guides. */
export const visibleGuides: Guide[] = guides.filter((g) => !g.hidden);

export function getGuideBySlug(slug: string): Guide | undefined {
  // Still resolve hidden guides so existing URLs don't 404; the page marks them noindex.
  return guides.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  // Keep hidden routes pre-rendered so direct URL hits still work.
  return guides.map((g) => g.slug);
}

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getAllTags(): { tag: string; slug: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const g of visibleGuides) {
    for (const t of g.tags) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, slug: slugifyTag(tag), count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getGuidesByTagSlug(tagSlug: string): { tag: string; guides: Guide[] } | null {
  const matched = visibleGuides.filter((g) =>
    g.tags.some((t) => slugifyTag(t) === tagSlug)
  );
  if (matched.length === 0) return null;
  const canonical = matched[0].tags.find((t) => slugifyTag(t) === tagSlug) ?? tagSlug;
  return { tag: canonical, guides: matched };
}
