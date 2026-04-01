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
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}
