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
  "thorne-vitamin-d-5000": p("thorne-vitamin-d-5000", {
    name: "Vitamin D 5,000 IU",
    brand: "Thorne",
    score: 82,
    image: "/images/products/thorne/thorne-vitamin-d-5000/primary.webp",
    verdict: "D3 at clinical dose, NSF certified, pairs well with K2",
  }),
  "thorne-magnesium-bisglycinate": p("thorne-magnesium-bisglycinate", {
    name: "Magnesium Bisglycinate",
    brand: "Thorne",
    score: 88,
    image: "/images/products/thorne/thorne-magnesium-bisglycinate/primary.webp",
    verdict: "Chelated glycinate form — superior absorption, gentle on stomach",
  }),
  "thorne-omega-3-coq10": p("thorne-omega-3-coq10", {
    name: "Omega-3 with CoQ10",
    brand: "Thorne",
    score: 86,
    image: "/images/products/thorne/thorne-omega-3-coq10/primary.webp",
    verdict: "EPA/DHA at therapeutic doses plus CoQ10 in one softgel",
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
  "thorne-iron-bisglycinate": p("thorne-iron-bisglycinate", {
    name: "Iron Bisglycinate",
    brand: "Thorne",
    score: 87,
    image: "/images/products/thorne/thorne-iron-bisglycinate/primary.webp",
    verdict: "Chelated bisglycinate — well-absorbed with minimal GI side effects",
  }),
  "nootropics-depot-l-theanine": p("nootropics-depot-l-theanine-capsules", {
    name: "L-Theanine Capsules",
    brand: "Nootropics Depot",
    score: 85,
    image: "/images/products/nootropics-depot/nootropics-depot-l-theanine-capsules/primary.jpg",
    verdict: "200mg per cap, promotes alpha waves for calm focus",
  }),
  "thorne-magnesium-glycinate": p("thorne-magnesium-glycinate", {
    name: "Magnesium Glycinate",
    brand: "Thorne",
    score: 86,
    image: "/images/products/thorne/thorne-magnesium-glycinate/primary.webp",
    verdict: "Glycinate chelate optimized for sleep and relaxation",
  }),
};

export function catalogUrl(slug: string): string {
  return `${APP_URL}/catalog/${slug}`;
}
