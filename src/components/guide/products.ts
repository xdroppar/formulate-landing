/**
 * Curated product data for inline guide callouts.
 *
 * SCORES ARE NOT WRITTEN IN THIS FILE. They are read from the shipped catalog
 * when the module loads, because a hand-copied score is a score that drifts.
 * On 2026-09-05, 28 of these 31 entries disagreed with the catalog — Thorne
 * Berberine by 14 points, Vitamin D 5,000 by 8 — and the guides had been
 * publishing those numbers publicly the whole time, on the same site whose
 * product pages showed different ones. The catalog is the only place a score
 * is allowed to live; everything else reads it.
 *
 * An unknown slug THROWS at module load, which fails the build. That is the
 * point: 12 of these entries pointed at slugs the catalog no longer had, so
 * their cards linked to pages that do not exist, and nothing complained.
 */

import catalogJson from "@/data/catalog.json";

const CATALOG_SCORES: Map<string, number | null> = new Map(
  (catalogJson.products as { slug: string; score: number | null }[]).map((p) => [
    p.slug,
    p.score ?? null,
  ]),
);

const APP_URL = "https://app.formulate-health.app";

export interface GuideProduct {
  name: string;
  brand: string;
  /** Read from the catalog, never authored here. `null` = catalog has no score. */
  score: number | null;
  slug: string;
  image: string;
  verdict: string;
}

function p(slug: string, data: Omit<GuideProduct, "slug" | "score">): GuideProduct {
  if (!CATALOG_SCORES.has(slug)) {
    throw new Error(
      `guide product "${slug}" is not in the catalog — its card would link to a 404`,
    );
  }
  return { slug, score: CATALOG_SCORES.get(slug) ?? null, ...data };
}

export const PRODUCTS: Record<string, GuideProduct> = {
  /* ── Thorne ───────────────────────────────────────────── */
  "thorne-vitamin-d-5000": p("thorne-vitamin-d-5000", {
    name: "Vitamin D 5,000 IU",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-vitamin-d-5000/primary.webp",
    verdict: "D3 at clinical dose, NSF certified, pairs well with K2",
  }),
  "thorne-vitamin-d-k2": p("thorne-vitamin-d-k2", {
    name: "Vitamin D & K2",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-vitamin-d-k2/primary.webp",
    verdict: "D3 + MK-7 combo for calcium direction — the essential pair",
  }),
  "thorne-magnesium-bisglycinate": p("thorne-magnesium-bisglycinate", {
    name: "Magnesium Bisglycinate",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-magnesium-bisglycinate/primary.webp",
    verdict: "Chelated glycinate form — superior absorption, gentle on stomach",
  }),
  "thorne-magnesium-glycinate": p("thorne-magnesium-glycinate", {
    name: "Magnesium Glycinate",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-magnesium-glycinate/primary.webp",
    verdict: "Glycinate chelate optimized for sleep and relaxation",
  }),
  "thorne-magnesium-citramate": p("thorne-magnesium-citramate-a-well-absorbed-form-of-magnesium-that-supports-the-heart-and-skeletal-muscles", {
    name: "Magnesium CitraMate",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-magnesium-citramate/primary.webp",
    verdict: "Citrate-malate blend — good general-purpose magnesium",
  }),
  "thorne-omega-3-coq10": p("thorne-omega-3-with-coq10-omega-3s-to-support-cardiovascular-and-brain-health-enhanced-with-coq10-for-cellular-energy-production", {
    name: "Omega-3 with CoQ10",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-omega-3-coq10/primary.webp",
    verdict: "EPA/DHA at therapeutic doses plus CoQ10 in one softgel",
  }),
  "thorne-super-epa-pro": p("thorne-super-epa-pro-support-healthy-blood-lipids-with-a-high-concentration-of-the-omega-3-fatty-acid-epa", {
    name: "Super EPA Pro",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-super-epa-pro-support-healthy-blood-lipids-with-a-high-concentration-of-the-omega-3-fatty-acid-epa/primary.webp",
    verdict: "High-concentration EPA for cardiovascular and inflammatory support",
  }),
  "thorne-creatine": p("thorne-creatine", {
    name: "Creatine Monohydrate",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-creatine/primary.webp",
    verdict: "Pure micronized monohydrate, 5g clinical dose, NSF certified",
  }),
  "thorne-b-complex-12": p("thorne-b-complex-12-b-vitamin-complex-with-extra-b12-and-folate", {
    name: "B-Complex #12",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-b-complex-12/primary.webp",
    verdict: "Active B-vitamin forms including methylcobalamin and 5-MTHF",
  }),
  "thorne-vitamin-b12": p("thorne-vitamin-b12-active-form-of-vitamin-b12-that-supports-heart-and-nerve-health-normal-circadian-rhythms-and-healthy-methylation", {
    name: "Vitamin B12",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-vitamin-b12/primary.webp",
    verdict: "Methylcobalamin form — the most bioactive B12 for absorption",
  }),
  "thorne-iron-bisglycinate": p("thorne-iron-bisglycinate-a-well-absorbed-form-of-iron-that-reduces-gastrointestinal-side-effects", {
    name: "Iron Bisglycinate",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-iron-bisglycinate/primary.webp",
    verdict: "Chelated bisglycinate — well-absorbed with minimal GI side effects",
  }),
  "thorne-zinc-bisglycinate": p("thorne-zinc-bisglycinate-15-mg-a-well-absorbed-form-of-zinc-that-supports-general-health-from-immune-function-to-reproductive-health", {
    name: "Zinc Bisglycinate 15mg",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-zinc-bisglycinate-15-mg/primary.webp",
    verdict: "Chelated zinc at a safe daily dose — won't deplete copper",
  }),
  "thorne-ashwagandha": p("thorne-ashwagandha", {
    name: "Ashwagandha",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-ashwagandha/primary.webp",
    verdict: "Adaptogen for cortisol management and stress resilience",
  }),
  "thorne-nac": p("thorne-nac-n-acetylcysteine", {
    name: "NAC",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-nac/primary.webp",
    verdict: "N-Acetyl Cysteine — the most efficient oral glutathione precursor",
  }),
  "thorne-berberine": p("thorne-berberine", {
    name: "Berberine",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-berberine/primary.webp",
    verdict: "AMPK activator — comparable to metformin for blood sugar in trials",
  }),
  "thorne-collagen-plus": p("thorne-collagen-plus-promote-glowing-skin-healthy-hair-and-reduce-fine-lines-and-wrinkles-to-help-combat-the-visible-signs-of-aging", {
    name: "Collagen Plus",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-collagen-plus/primary.webp",
    verdict: "Hydrolyzed collagen peptides for skin, joint, and connective tissue",
  }),
  "thorne-glycine": p("thorne-glycine-amino-acid-that-promotes-relaxation-detoxification-and-normal-muscle-function", {
    name: "Glycine",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-glycine-amino-acid-that-promotes-relaxation-detoxification-and-normal-muscle-function/primary.webp",
    verdict: "3g before bed lowers core temperature and improves sleep quality",
  }),
  "thorne-coq10": p("thorne-coq10-support-cardiovascular-and-neurological-health-cellular-energy-production-and-healthy-aging-with-well-absorbed-coq10", {
    name: "CoQ10",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-coq10/primary.webp",
    verdict: "Ubiquinone form for mitochondrial energy and heart health",
  }),
  "thorne-curcumin-phytosome": p("thorne-curcumin-phytosome", {
    name: "Curcumin Phytosome",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-curcumin-phytosome/primary.webp",
    verdict: "Meriva phytosome technology — 29x better absorption than standard",
  }),
  "thorne-daily-electrolytes": p("thorne-daily-electrolytes-blood-orange-replenish-electrolytes-to-optimize-cellular-rehydration-and-recovery", {
    name: "Daily Electrolytes",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-daily-electrolytes-blood-orange-replenish-electrolytes-to-optimize-cellular-rehydration-and-recovery/primary.webp",
    verdict: "Sodium, potassium, magnesium — clean electrolyte replenishment",
  }),
  "thorne-floramend": p("thorne-floramend-prime-probiotic", {
    name: "FloraMend Prime Probiotic",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-floramend-prime-probiotic/primary.webp",
    verdict: "Three clinically studied strains — shelf-stable, no refrigeration needed",
  }),
  "thorne-vitamin-k": p("thorne-vitamin-k-helps-maintain-bone-mineral-density-and-supports-healthy-blood-vessels", {
    name: "Vitamin K",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-vitamin-k/primary.webp",
    verdict: "K1 + MK-4 blend for bone metabolism and calcium direction",
  }),
  "thorne-beta-alanine": p("thorne-beta-alanine-sr-train-harder-for-longer-with-support-for-muscle-output-and-endurance", {
    name: "Beta Alanine-SR",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-beta-alanine-sr-train-harder-for-longer-with-support-for-muscle-output-and-endurance/primary.webp",
    verdict: "Sustained-release beta-alanine for endurance without the tingles",
  }),
  "thorne-advanced-nutrients": p("thorne-advanced-nutrients", {
    name: "Advanced Nutrients",
    brand: "Thorne",
    image: "/images/products/thorne/thorne-advanced-nutrients-an-advanced-multi-formula-with-added-benefits-to-support-healthy-aging-and-eye-he/primary.webp",
    verdict: "Advanced multi with active B-forms, eye health, and aging support",
  }),

  /* ── Nootropics Depot ─────────────────────────────────── */
  "nootropics-depot-l-theanine": p("nootropics-depot-l-theanine-capsules", {
    name: "L-Theanine Capsules",
    brand: "Nootropics Depot",
    image: "/images/products/nootropics-depot/nootropics-depot-l-theanine-capsules/primary.jpg",
    verdict: "200mg per cap, promotes alpha waves for calm focus",
  }),
  "nootropics-depot-creatine": p("nootropics-depot-creatine-monohydrate-powder", {
    name: "Creatine Monohydrate",
    brand: "Nootropics Depot",
    image: "/images/products/nootropics-depot/nootropics-depot-creatine-monohydrate-powder/primary.jpg",
    verdict: "Pure monohydrate powder — excellent value at clinical 5g dose",
  }),
  "nootropics-depot-taurine": p("nootropics-depot-taurine-capsules", {
    name: "Taurine Capsules",
    brand: "Nootropics Depot",
    image: "/images/products/nootropics-depot/nootropics-depot-taurine-capsules/primary.jpg",
    verdict: "The longevity amino acid — cardiovascular and exercise support",
  }),
  "nootropics-depot-magnesium-glycinate": p("nootropics-depot-magnesium-glycinate-capsules", {
    name: "Magnesium Glycinate",
    brand: "Nootropics Depot",
    image: "/images/products/nootropics-depot/nootropics-depot-magnesium-glycinate-capsules/primary.jpg",
    verdict: "Well-dosed glycinate chelate at a competitive price",
  }),
  "nootropics-depot-cognizin": p("nootropics-depot-cognizin-citicoline-capsules", {
    name: "Cognizin Citicoline",
    brand: "Nootropics Depot",
    image: "/images/products/nootropics-depot/nootropics-depot-cognizin-citicoline-capsules/primary.jpg",
    verdict: "Branded citicoline for focus, memory, and neuroprotection",
  }),

  /* ── MegaFood ─────────────────────────────────────────── */
  "megafood-blood-builder": p("megafood-blood-builder", {
    name: "Blood Builder Iron",
    brand: "MegaFood",
    image: "/images/products/megafood-inc/megafood-inc-blood-buildera-iron-supplement/primary.webp",
    verdict: "Whole-food iron with beet root and vitamin C for absorption",
  }),

  /* ── Seed ─────────────────────────────────────────────── */
  // Seed images may not be in the landing page public dir yet

  /* ── Complement ───────────────────────────────────────── */
  "complement-sulfora": p("complement-complement-sulfora-evidence-based-sulforaphane-formula", {
    name: "Sulfora (Sulforaphane)",
    brand: "Complement",
    image: "/images/products/complement/complement-complement-sulfora-evidence-based-sulforaphane-formula/primary.webp",
    verdict: "Stabilized sulforaphane for Nrf2 activation and cellular defense",
  }),
};

export function catalogUrl(slug: string): string {
  return `${APP_URL}/catalog/${slug}`;
}
