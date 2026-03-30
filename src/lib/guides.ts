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
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}
