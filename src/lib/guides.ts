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
    title: "Best Creatine Supplements 2026, Ranked by Evidence",
    description:
      "We tested 8 creatine supplements on dose accuracy, purity, and Creapure sourcing. Find out which monohydrate products actually deliver 3–5g per serving.",
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
    title: "Best Magnesium Supplements 2026, Ranked by Clinical Evidence",
    description:
      "Learn which magnesium form actually matches your goal. We scored glycinate, threonate, and citrate on absorption, dose accuracy, and third-party testing.",
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
    title: "Best Omega-3 Supplements 2026, Ranked by Clinical Evidence",
    description:
      "Learn to decode EPA+DHA labels, absorption forms, and oxidation scores. We ranked 8 omega-3 supplements using clinical evidence — no guesswork.",
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
    title: "Best Vitamin D Supplements 2026: Ranked by Clinical Evidence",
    description:
      "42% of adults are deficient. Learn which D3 form, dose, and brand actually raises blood levels — with cofactor guidance and lab-verified picks.",
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
    title: "Best Sleep Supplement Protocol 2026: Clinical Evidence Stack",
    description:
      "Build a cheap, non-habit-forming sleep stack using magnesium glycinate, L-theanine, and glycine — three compounds with the strongest clinical trial support.",
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
    title: "Best Pre-Workout Protocol 2026: Clinical Evidence Stack",
    description:
      "Build a pre-workout stack that actually works. Learn the 4 clinically validated ingredients — creatine, citrulline, beta-alanine, caffeine — at doses that deliver results.",
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
    title: "How to Build a Supplement Stack (2026) — Evidence-Based",
    description:
      "Skip the influencer hauls. Learn a step-by-step, evidence-based method to build a supplement stack that fits your goals — without wasting money.",
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
    title: "Supplement Timing Guide 2026 — Backed by Science",
    description:
      "Learn which supplement timing rules genuinely affect absorption — fat-soluble vitamins, mineral conflicts, and what disrupts sleep. A practical, evidence-based guide.",
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
    title: "How to Read a Supplement Label 2026 — No Sponsorships",
    description:
      "Learn to decode the Supplement Facts panel in 60 seconds — spot proprietary blends, underdosed ingredients, and cheap forms before you buy.",
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
    title: "8 Signs of Magnesium Deficiency – 2026 Guide",
    description:
      "Muscle cramps, twitching eyelids, and poor sleep may signal low magnesium. Learn all 8 signs, why standard blood tests miss it, and how to fix it.",
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
    title: "Do You Need a Multivitamin? Clinical Evidence 2026",
    description:
      "Most adults take multivitamins as nutritional insurance — but 700,000-person studies show near-zero mortality benefit. Learn when one helps and when to target instead.",
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
    title: "What to Look for in a Probiotic — Evidence-Based 2026",
    description:
      "Strain specificity beats CFU count every time. Learn the 3 label clues that separate clinically backed probiotics from marketing noise in 2026.",
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
    title: "Longevity Supplement Stack for Beginners 2026",
    description:
      "Learn which longevity supplements are actually backed by human evidence. We tier NAD+, omega-3s, and more by clinical strength — no hype, no wasted money.",
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
    title: "Creatine Loading Phase: Evidence-Based Guide 2026",
    description:
      "Find out if creatine loading is worth it. We break down the saturation science, compare both protocols, and tell you which fits your timeline.",
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
    title: "Zinc Supplement Guide 2026: Evidence-Based & Ranked",
    description:
      "Learn which zinc forms actually shorten colds, how dosing affects testosterone and copper balance, and who faces the highest deficiency risk.",
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
    title: "Lion\u2019s Mane Mushroom: Evidence-Based Guide 2026",
    description:
      "Discover how lion\u2019s mane stimulates NGF and BDNF to support cognition. Human trial data, fruiting body vs mycelium, dosing, and quality markers — all explained.",
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
    title: "NAC Supplement Guide 2026 | Evidence-Based Overview",
    description:
      "NAC is your body\u2019s most efficient glutathione precursor. Explore clinical evidence on dosing, OCD, liver protection, and who benefits most from supplementing.",
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
    title: "Ashwagandha Guide 2026: Clinical Evidence Reviewed",
    description:
      "Learn which ashwagandha extract actually matches the RCT evidence — KSM-66, Sensoril, or generic powder — and what cortisol, anxiety, and testosterone data show.",
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
    title: "Collagen Supplements 2026 — Backed by Clinical Evidence",
    description:
      "Learn which collagen supplements actually work and why. Bioactive peptides survive digestion and signal tissue repair — here\u2019s what 2026 clinical research supports.",
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
    title: "Vitamin B12 Guide 2026: Which Form & Dose You Need",
    description:
      "Find out if you\u2019re actually B12 deficient — and why standard tests miss it. Covers methylcobalamin vs cyanocobalamin, dosing, and the MMA test.",
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
    title: "Berberine 2026: Blood Sugar Benefits, Clinical Evidence",
    description:
      "Learn how berberine activates AMPK, matches metformin in 3 clinical trials, cuts triglycerides 35%, and who actually benefits — dosing and drug interactions included.",
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
    title: "Electrolytes Guide 2026: Evidence-Based Sodium, Potassium & Magnesium",
    description:
      "Discover who actually needs electrolyte supplements, the real science on sodium, and a DIY fix for keto flu symptoms — for about 15 cents a day.",
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
    title: "Taurine for Longevity: Clinical Evidence & Guide 2026",
    description:
      "Taurine deficiency accelerates aging — a 2023 Science study showed 10\u201312% lifespan extension in mice. Explore dosing, cardiovascular benefits, and the energy drink paradox.",
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
    title: "Iron Supplements Guide 2026: Evidence-Based & Ranked",
    description:
      "Learn who needs iron supplements, what bloodwork to get, and which forms won\u2019t wreck your stomach. Covers dosing science most doctors skip.",
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
    title: "Nootropics Guide 2026: Ranked by Clinical Evidence",
    description:
      "Learn which nootropics actually work for focus and cognition. Tiered by human RCT data — from caffeine + L-theanine to lion\u2019s mane — with doses, red flags, and stack advice.",
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
    slug: "creatine-for-women",
    title: "Creatine for Women: The Complete Evidence-Based Guide (2026)",
    description:
      "Women's creatine research through menopause, training, body composition, and mood. No bloating myths, no men's-magazine claims — just the evidence.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-04-15",
    updatedAt: "2026-04-15",
    readTime: "10 min read",
    tags: ["Creatine", "Women", "Menopause", "Sports Performance"],
    catalogLink: "https://app.formulate-health.app/catalog?q=creatine",
    isNew: true,
  },
  {
    slug: "best-time-to-take-magnesium",
    title: "Best Time to Take Magnesium: The Timing Science (2026)",
    description:
      "Morning, evening, or with food — when you take magnesium matters more than you think. Form-specific timing rules backed by clinical research.",
    category: "guide",
    categoryLabel: "Guide",
    publishedAt: "2026-04-15",
    updatedAt: "2026-04-15",
    readTime: "9 min read",
    tags: ["Magnesium", "Timing", "Sleep", "Absorption"],
    catalogLink: "https://app.formulate-health.app/catalog?q=magnesium",
    isNew: true,
  },
  {
    slug: "alpha-gpc-vs-citicoline",
    title: "Alpha-GPC vs Citicoline: Which Choline Source Actually Works?",
    description:
      "Two of the most effective nootropics, both precursors to acetylcholine. We break down the evidence, dosing, bioavailability, and which one fits which goal.",
    category: "review",
    categoryLabel: "Review",
    publishedAt: "2026-04-15",
    updatedAt: "2026-04-15",
    readTime: "9 min read",
    tags: ["Nootropics", "Choline", "Cognitive", "Comparison"],
    catalogLink: "https://app.formulate-health.app/catalog?q=choline",
    isNew: true,
  },
  {
    slug: "best-adaptogens-for-stress",
    title: "Best Adaptogens for Stress: Ashwagandha vs Rhodiola vs Reishi",
    description:
      "Three of the most-studied adaptogens, compared head-to-head on clinical evidence, mechanism, and which one fits which stress profile.",
    category: "roundup",
    categoryLabel: "Roundup",
    publishedAt: "2026-04-15",
    updatedAt: "2026-04-15",
    readTime: "11 min read",
    tags: ["Adaptogens", "Ashwagandha", "Rhodiola", "Stress", "Anxiety"],
    catalogLink: "https://app.formulate-health.app/catalog?q=adaptogens",
    isNew: true,
  },
  {
    slug: "creatine-and-hair-loss",
    title: "Creatine and Hair Loss: What the 2009 Study Actually Says",
    description:
      "The only study linking creatine to hair loss measured a DHT proxy, not actual hair loss — and has never been replicated. Here's what the evidence really shows.",
    category: "review",
    categoryLabel: "Review",
    publishedAt: "2026-04-15",
    updatedAt: "2026-04-15",
    readTime: "8 min read",
    tags: ["Creatine", "Hair Loss", "DHT", "Myths"],
    catalogLink: "https://app.formulate-health.app/catalog?q=creatine",
    isNew: true,
  },
  {
    slug: "vitamin-d3-vs-d2",
    title: "Vitamin D3 vs D2: The Science Behind the 87% Gap",
    description:
      "D3 raises blood levels 87% more effectively than D2 — and your prescription vitamin D might be the inferior form. Here's what to know.",
    category: "review",
    categoryLabel: "Review",
    publishedAt: "2026-04-15",
    updatedAt: "2026-04-15",
    readTime: "8 min read",
    tags: ["Vitamin D", "D3", "D2", "Comparison"],
    catalogLink: "https://app.formulate-health.app/catalog?q=vitamin+d3",
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
