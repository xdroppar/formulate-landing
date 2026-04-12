/**
 * Curated product data for inline guide callouts.
 * Scores and images must match the live catalog — update when catalog changes.
 */

const APP_URL = "https://app.formulate-health.app";

export interface GuideProduct {
  name: string;
  brand: string;
  score: number;
  slug: string;
  image: string;
  verdict: string;
}

function p(slug: string, data: Omit<GuideProduct, "slug">): GuideProduct {
  return { slug, ...data };
}

export const PRODUCTS: Record<string, GuideProduct> = {
  /* ── Thorne ───────────────────────────────────────────── */
  "thorne-vitamin-d-5000": p("thorne-vitamin-d-5000", {
    name: "Vitamin D 5,000 IU",
    brand: "Thorne",
    score: 82,
    image: "/images/products/thorne/thorne-vitamin-d-5000/primary.webp",
    verdict: "D3 at clinical dose, NSF certified, pairs well with K2",
  }),
  "thorne-vitamin-d-k2": p("thorne-vitamin-d-k2", {
    name: "Vitamin D & K2",
    brand: "Thorne",
    score: 84,
    image: "/images/products/thorne/thorne-vitamin-d-k2/primary.webp",
    verdict: "D3 + MK-7 combo for calcium direction — the essential pair",
  }),
  "thorne-magnesium-bisglycinate": p("thorne-magnesium-bisglycinate", {
    name: "Magnesium Bisglycinate",
    brand: "Thorne",
    score: 88,
    image: "/images/products/thorne/thorne-magnesium-bisglycinate/primary.webp",
    verdict: "Chelated glycinate form — superior absorption, gentle on stomach",
  }),
  "thorne-magnesium-glycinate": p("thorne-magnesium-glycinate", {
    name: "Magnesium Glycinate",
    brand: "Thorne",
    score: 86,
    image: "/images/products/thorne/thorne-magnesium-glycinate/primary.webp",
    verdict: "Glycinate chelate optimized for sleep and relaxation",
  }),
  "thorne-magnesium-citramate": p("thorne-magnesium-citramate", {
    name: "Magnesium CitraMate",
    brand: "Thorne",
    score: 83,
    image: "/images/products/thorne/thorne-magnesium-citramate/primary.webp",
    verdict: "Citrate-malate blend — good general-purpose magnesium",
  }),
  "thorne-omega-3-coq10": p("thorne-omega-3-coq10", {
    name: "Omega-3 with CoQ10",
    brand: "Thorne",
    score: 86,
    image: "/images/products/thorne/thorne-omega-3-coq10/primary.webp",
    verdict: "EPA/DHA at therapeutic doses plus CoQ10 in one softgel",
  }),
  "thorne-super-epa-pro": p("thorne-super-epa-pro-support-healthy-blood-lipids-with-a-high-concentration-of-the-omega-3-fatty-acid-epa", {
    name: "Super EPA Pro",
    brand: "Thorne",
    score: 89,
    image: "/images/products/thorne/thorne-super-epa-pro-support-healthy-blood-lipids-with-a-high-concentration-of-the-omega-3-fatty-acid-epa/primary.webp",
    verdict: "High-concentration EPA for cardiovascular and inflammatory support",
  }),
  "thorne-creatine": p("thorne-creatine", {
    name: "Creatine Monohydrate",
    brand: "Thorne",
    score: 94,
    image: "/images/products/thorne/thorne-creatine/primary.webp",
    verdict: "Pure micronized monohydrate, 5g clinical dose, NSF certified",
  }),
  "thorne-b-complex-12": p("thorne-b-complex-12", {
    name: "B-Complex #12",
    brand: "Thorne",
    score: 85,
    image: "/images/products/thorne/thorne-b-complex-12/primary.webp",
    verdict: "Active B-vitamin forms including methylcobalamin and 5-MTHF",
  }),
  "thorne-vitamin-b12": p("thorne-vitamin-b12", {
    name: "Vitamin B12",
    brand: "Thorne",
    score: 84,
    image: "/images/products/thorne/thorne-vitamin-b12/primary.webp",
    verdict: "Methylcobalamin form — the most bioactive B12 for absorption",
  }),
  "thorne-iron-bisglycinate": p("thorne-iron-bisglycinate", {
    name: "Iron Bisglycinate",
    brand: "Thorne",
    score: 87,
    image: "/images/products/thorne/thorne-iron-bisglycinate/primary.webp",
    verdict: "Chelated bisglycinate — well-absorbed with minimal GI side effects",
  }),
  "thorne-zinc-bisglycinate": p("thorne-zinc-bisglycinate-15-mg", {
    name: "Zinc Bisglycinate 15mg",
    brand: "Thorne",
    score: 86,
    image: "/images/products/thorne/thorne-zinc-bisglycinate-15-mg/primary.webp",
    verdict: "Chelated zinc at a safe daily dose — won't deplete copper",
  }),
  "thorne-ashwagandha": p("thorne-ashwagandha", {
    name: "Ashwagandha",
    brand: "Thorne",
    score: 80,
    image: "/images/products/thorne/thorne-ashwagandha/primary.webp",
    verdict: "Adaptogen for cortisol management and stress resilience",
  }),
  "thorne-nac": p("thorne-nac", {
    name: "NAC",
    brand: "Thorne",
    score: 85,
    image: "/images/products/thorne/thorne-nac/primary.webp",
    verdict: "N-Acetyl Cysteine — the most efficient oral glutathione precursor",
  }),
  "thorne-berberine": p("thorne-berberine", {
    name: "Berberine",
    brand: "Thorne",
    score: 82,
    image: "/images/products/thorne/thorne-berberine/primary.webp",
    verdict: "AMPK activator — comparable to metformin for blood sugar in trials",
  }),
  "thorne-collagen-plus": p("thorne-collagen-plus", {
    name: "Collagen Plus",
    brand: "Thorne",
    score: 78,
    image: "/images/products/thorne/thorne-collagen-plus/primary.webp",
    verdict: "Hydrolyzed collagen peptides for skin, joint, and connective tissue",
  }),
  "thorne-glycine": p("thorne-glycine-amino-acid-that-promotes-relaxation-detoxification-and-normal-muscle-function", {
    name: "Glycine",
    brand: "Thorne",
    score: 83,
    image: "/images/products/thorne/thorne-glycine-amino-acid-that-promotes-relaxation-detoxification-and-normal-muscle-function/primary.webp",
    verdict: "3g before bed lowers core temperature and improves sleep quality",
  }),
  "thorne-coq10": p("thorne-coq10", {
    name: "CoQ10",
    brand: "Thorne",
    score: 84,
    image: "/images/products/thorne/thorne-coq10/primary.webp",
    verdict: "Ubiquinone form for mitochondrial energy and heart health",
  }),
  "thorne-curcumin-phytosome": p("thorne-curcumin-phytosome", {
    name: "Curcumin Phytosome",
    brand: "Thorne",
    score: 81,
    image: "/images/products/thorne/thorne-curcumin-phytosome/primary.webp",
    verdict: "Meriva phytosome technology — 29x better absorption than standard",
  }),
  "thorne-daily-electrolytes": p("thorne-daily-electrolytes-blood-orange-replenish-electrolytes-to-optimize-cellular-rehydration-and-recovery", {
    name: "Daily Electrolytes",
    brand: "Thorne",
    score: 80,
    image: "/images/products/thorne/thorne-daily-electrolytes-blood-orange-replenish-electrolytes-to-optimize-cellular-rehydration-and-recovery/primary.webp",
    verdict: "Sodium, potassium, magnesium — clean electrolyte replenishment",
  }),
  "thorne-floramend": p("thorne-floramend-prime-probiotic", {
    name: "FloraMend Prime Probiotic",
    brand: "Thorne",
    score: 79,
    image: "/images/products/thorne/thorne-floramend-prime-probiotic/primary.webp",
    verdict: "Three clinically studied strains — shelf-stable, no refrigeration needed",
  }),
  "thorne-vitamin-k": p("thorne-vitamin-k", {
    name: "Vitamin K",
    brand: "Thorne",
    score: 82,
    image: "/images/products/thorne/thorne-vitamin-k/primary.webp",
    verdict: "K1 + MK-4 blend for bone metabolism and calcium direction",
  }),
  "thorne-beta-alanine": p("thorne-beta-alanine-sr-train-harder-for-longer-with-support-for-muscle-output-and-endurance", {
    name: "Beta Alanine-SR",
    brand: "Thorne",
    score: 83,
    image: "/images/products/thorne/thorne-beta-alanine-sr-train-harder-for-longer-with-support-for-muscle-output-and-endurance/primary.webp",
    verdict: "Sustained-release beta-alanine for endurance without the tingles",
  }),
  "thorne-advanced-nutrients": p("thorne-advanced-nutrients-an-advanced-multi-formula-with-added-benefits-to-support-healthy-aging-and-eye-he", {
    name: "Advanced Nutrients",
    brand: "Thorne",
    score: 81,
    image: "/images/products/thorne/thorne-advanced-nutrients-an-advanced-multi-formula-with-added-benefits-to-support-healthy-aging-and-eye-he/primary.webp",
    verdict: "Advanced multi with active B-forms, eye health, and aging support",
  }),

  /* ── Nootropics Depot ─────────────────────────────────── */
  "nootropics-depot-l-theanine": p("nootropics-depot-l-theanine-capsules", {
    name: "L-Theanine Capsules",
    brand: "Nootropics Depot",
    score: 85,
    image: "/images/products/nootropics-depot/nootropics-depot-l-theanine-capsules/primary.jpg",
    verdict: "200mg per cap, promotes alpha waves for calm focus",
  }),
  "nootropics-depot-creatine": p("nootropics-depot-creatine-monohydrate-powder", {
    name: "Creatine Monohydrate",
    brand: "Nootropics Depot",
    score: 91,
    image: "/images/products/nootropics-depot/nootropics-depot-creatine-monohydrate-powder/primary.jpg",
    verdict: "Pure monohydrate powder — excellent value at clinical 5g dose",
  }),
  "nootropics-depot-taurine": p("nootropics-depot-taurine-capsules", {
    name: "Taurine Capsules",
    brand: "Nootropics Depot",
    score: 84,
    image: "/images/products/nootropics-depot/nootropics-depot-taurine-capsules/primary.jpg",
    verdict: "The longevity amino acid — cardiovascular and exercise support",
  }),
  "nootropics-depot-magnesium-glycinate": p("nootropics-depot-magnesium-glycinate-capsules", {
    name: "Magnesium Glycinate",
    brand: "Nootropics Depot",
    score: 85,
    image: "/images/products/nootropics-depot/nootropics-depot-magnesium-glycinate-capsules/primary.jpg",
    verdict: "Well-dosed glycinate chelate at a competitive price",
  }),
  "nootropics-depot-cognizin": p("nootropics-depot-cognizin-citicoline-capsules", {
    name: "Cognizin Citicoline",
    brand: "Nootropics Depot",
    score: 87,
    image: "/images/products/nootropics-depot/nootropics-depot-cognizin-citicoline-capsules/primary.jpg",
    verdict: "Branded citicoline for focus, memory, and neuroprotection",
  }),

  /* ── MegaFood ─────────────────────────────────────────── */
  "megafood-blood-builder": p("megafood-inc-blood-buildera-iron-supplement", {
    name: "Blood Builder Iron",
    brand: "MegaFood",
    score: 80,
    image: "/images/products/megafood-inc/megafood-inc-blood-buildera-iron-supplement/primary.webp",
    verdict: "Whole-food iron with beet root and vitamin C for absorption",
  }),

  /* ── Seed ─────────────────────────────────────────────── */
  // Seed images may not be in the landing page public dir yet

  /* ── Complement ───────────────────────────────────────── */
  "complement-sulfora": p("complement-complement-sulfora-evidence-based-sulforaphane-formula", {
    name: "Sulfora (Sulforaphane)",
    brand: "Complement",
    score: 82,
    image: "/images/products/complement/complement-complement-sulfora-evidence-based-sulforaphane-formula/primary.webp",
    verdict: "Stabilized sulforaphane for Nrf2 activation and cellular defense",
  }),
};

export function catalogUrl(slug: string): string {
  return `${APP_URL}/catalog/${slug}`;
}
