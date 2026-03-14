import Link from "next/link";
import { ScoreRing } from "./score-ring";
import { DevBadge } from "./dev-badge";
import { CardImageCarousel } from "./card-image-carousel";
import { CardBorderWrap } from "./card-border-wrap";
import type { CatalogProduct } from "@/lib/types";

/* ── Tag → emoji + vivid color mapping (matches app CategoryChip style) ── */
const TAG_INFO: Record<string, { emoji: string; bg: string; text: string; label?: string }> = {
  Energy: { emoji: "⚡", bg: "rgba(180,140,20,0.30)", text: "#f0d060", label: "Energy" },
  Muscle: { emoji: "💪", bg: "rgba(30,140,80,0.30)", text: "#60e0a0", label: "Muscle" },
  "Brain Health": { emoji: "🧠", bg: "rgba(30,100,170,0.30)", text: "#60b8e8", label: "Brain" },
  Cognition: { emoji: "🧠", bg: "rgba(40,90,170,0.30)", text: "#70b0e8", label: "Cognition" },
  Memory: { emoji: "🧠", bg: "rgba(40,90,170,0.30)", text: "#70b0e8", label: "Memory" },
  "Heart Health": { emoji: "❤️", bg: "rgba(170,50,60,0.30)", text: "#f08090", label: "Heart" },
  "Gut Health": { emoji: "🦠", bg: "rgba(60,60,160,0.30)", text: "#a0a0f0", label: "Gut" },
  "GI Support": { emoji: "🦠", bg: "rgba(60,60,160,0.30)", text: "#a0a0f0", label: "GI" },
  Digestive: { emoji: "🦠", bg: "rgba(30,140,80,0.30)", text: "#60e0a0", label: "Digestive" },
  Prebiotics: { emoji: "🦠", bg: "rgba(60,60,160,0.30)", text: "#a0a0f0", label: "Prebiotics" },
  "Immune Support": { emoji: "🛡️", bg: "rgba(80,140,30,0.30)", text: "#b0e860", label: "Immunity" },
  Sleep: { emoji: "🌙", bg: "rgba(100,60,160,0.30)", text: "#c0a0f0", label: "Sleep" },
  Mood: { emoji: "😊", bg: "rgba(160,50,120,0.30)", text: "#f080c0", label: "Mood" },
  Stress: { emoji: "🧘", bg: "rgba(120,50,160,0.30)", text: "#d090f0", label: "Stress" },
  "Sports Performance": { emoji: "🏃", bg: "rgba(170,50,50,0.30)", text: "#f08080", label: "Sports" },
  Endurance: { emoji: "🏋️", bg: "rgba(170,40,40,0.30)", text: "#f07070", label: "Endurance" },
  Recovery: { emoji: "🔄", bg: "rgba(30,140,80,0.30)", text: "#60e0a0", label: "Recovery" },
  "Joint Support": { emoji: "🦵", bg: "rgba(170,110,30,0.30)", text: "#f0c060", label: "Joint" },
  "Bone Support": { emoji: "🦴", bg: "rgba(120,120,110,0.30)", text: "#d0d0c8", label: "Bone" },
  Inflammation: { emoji: "🔥", bg: "rgba(170,100,30,0.30)", text: "#f0b860", label: "Inflammation" },
  "Healthy Aging": { emoji: "⏳", bg: "rgba(30,140,150,0.30)", text: "#60e0e8", label: "Aging" },
  "Weight Management": { emoji: "⚖️", bg: "rgba(40,140,60,0.30)", text: "#70e080", label: "Weight" },
  Antioxidant: { emoji: "🍇", bg: "rgba(100,60,160,0.30)", text: "#c0a0f0", label: "Antioxidant" },
  "Skin / Hair": { emoji: "✨", bg: "rgba(140,50,160,0.30)", text: "#e090f0", label: "Skin" },
  Hormones: { emoji: "🔬", bg: "rgba(160,40,60,0.30)", text: "#f07090", label: "Hormones" },
  "Women's Health": { emoji: "♀️", bg: "rgba(160,50,120,0.30)", text: "#f080c0", label: "Women" },
  "Men's Health": { emoji: "♂️", bg: "rgba(40,90,170,0.30)", text: "#70b0e8", label: "Men" },
  Prenatal: { emoji: "🤰", bg: "rgba(170,50,70,0.30)", text: "#f08098", label: "Prenatal" },
  Fertility: { emoji: "🌸", bg: "rgba(150,50,100,0.30)", text: "#f080b0", label: "Fertility" },
  Metabolism: { emoji: "🔥", bg: "rgba(170,100,30,0.30)", text: "#f0b860", label: "Metabolism" },
  "Liver Support": { emoji: "🫀", bg: "rgba(30,140,80,0.30)", text: "#60e0a0", label: "Liver" },
  Detox: { emoji: "🌿", bg: "rgba(80,140,30,0.30)", text: "#b0e860", label: "Detox" },
  Cholesterol: { emoji: "❤️", bg: "rgba(170,50,60,0.30)", text: "#f08090", label: "Cholesterol" },
  "Blood Sugar": { emoji: "🩸", bg: "rgba(170,40,40,0.30)", text: "#f07070", label: "Blood Sugar" },
  "Blood Pressure": { emoji: "🩸", bg: "rgba(170,40,40,0.30)", text: "#f07070", label: "Blood Pressure" },
  Protein: { emoji: "💪", bg: "rgba(30,140,80,0.30)", text: "#60e0a0", label: "Protein" },
  Foundational: { emoji: "🏛️", bg: "rgba(80,90,120,0.30)", text: "#b0c0d8", label: "Foundation" },
  "General Health": { emoji: "💊", bg: "rgba(90,100,120,0.30)", text: "#c0c8d8", label: "General" },
  Methylation: { emoji: "🧬", bg: "rgba(30,140,150,0.30)", text: "#60e0e8", label: "Methylation" },
  "Eye Health": { emoji: "👁️", bg: "rgba(30,140,130,0.30)", text: "#60e0d0", label: "Eye" },
  Respiratory: { emoji: "🫁", bg: "rgba(30,140,130,0.30)", text: "#60e0d0", label: "Respiratory" },
  Thyroid: { emoji: "🦋", bg: "rgba(100,60,160,0.30)", text: "#c0a0f0", label: "Thyroid" },
  CoQ10: { emoji: "⚡", bg: "rgba(180,140,20,0.30)", text: "#f0d060", label: "CoQ10" },
  energy: { emoji: "⚡", bg: "rgba(180,140,20,0.30)", text: "#f0d060", label: "Energy" },
  muscle: { emoji: "💪", bg: "rgba(30,140,80,0.30)", text: "#60e0a0", label: "Muscle" },
  cognition: { emoji: "🧠", bg: "rgba(40,90,170,0.30)", text: "#70b0e8", label: "Cognition" },
  heart: { emoji: "❤️", bg: "rgba(170,50,60,0.30)", text: "#f08090", label: "Heart" },
  gut: { emoji: "🦠", bg: "rgba(60,60,160,0.30)", text: "#a0a0f0", label: "Gut" },
  immune: { emoji: "🛡️", bg: "rgba(80,140,30,0.30)", text: "#b0e860", label: "Immunity" },
  "immune-support": { emoji: "🛡️", bg: "rgba(80,140,30,0.30)", text: "#b0e860", label: "Immunity" },
  sleep: { emoji: "🌙", bg: "rgba(100,60,160,0.30)", text: "#c0a0f0", label: "Sleep" },
  mood: { emoji: "😊", bg: "rgba(160,50,120,0.30)", text: "#f080c0", label: "Mood" },
  stress: { emoji: "🧘", bg: "rgba(120,50,160,0.30)", text: "#d090f0", label: "Stress" },
  sports: { emoji: "🏃", bg: "rgba(170,50,50,0.30)", text: "#f08080", label: "Sports" },
  recovery: { emoji: "🔄", bg: "rgba(30,140,80,0.30)", text: "#60e0a0", label: "Recovery" },
  bone: { emoji: "🦴", bg: "rgba(120,120,110,0.30)", text: "#d0d0c8", label: "Bone" },
  "joint-health": { emoji: "🦵", bg: "rgba(170,110,30,0.30)", text: "#f0c060", label: "Joint" },
  hormones: { emoji: "🔬", bg: "rgba(160,40,60,0.30)", text: "#f07090", label: "Hormones" },
  liver: { emoji: "🫀", bg: "rgba(30,140,80,0.30)", text: "#60e0a0", label: "Liver" },
  "detox-liver": { emoji: "🫀", bg: "rgba(80,140,30,0.30)", text: "#b0e860", label: "Liver" },
  adaptogen: { emoji: "🌿", bg: "rgba(80,140,30,0.30)", text: "#b0e860", label: "Adaptogen" },
  minerals: { emoji: "💎", bg: "rgba(140,50,160,0.30)", text: "#e090f0", label: "Minerals" },
  "omega-fatty-acids": { emoji: "🐟", bg: "rgba(40,90,170,0.30)", text: "#70b0e8", label: "Omega-3" },
  probiotic: { emoji: "🦠", bg: "rgba(60,60,160,0.30)", text: "#a0a0f0", label: "Probiotic" },
};

const DEFAULT_TAG = { emoji: "💊", bg: "rgba(100,110,130,0.25)", text: "#98a8b8" };

/* ── Category → emoji + color (for the chip next to name) ────────── */
/* Keys here are the *display labels* returned by formatCategory()    */
const CATEGORY_INFO: Record<string, { emoji: string; bg: string; text: string }> = {
  Vitamins: { emoji: "💊", bg: "rgba(248,250,252,0.3)", text: "#CBD5E1" },
  Multivitamin: { emoji: "💊", bg: "rgba(248,250,252,0.3)", text: "#CBD5E1" },
  Multivitamins: { emoji: "💊", bg: "rgba(248,250,252,0.3)", text: "#CBD5E1" },
  "B Vitamins": { emoji: "🅱️", bg: "rgba(254,243,199,0.3)", text: "#FCD34D" },
  "Vitamin C": { emoji: "🍊", bg: "rgba(254,215,170,0.3)", text: "#FDBA74" },
  "Vitamin D": { emoji: "☀️", bg: "rgba(254,243,199,0.3)", text: "#FCD34D" },
  "Vitamin K": { emoji: "🥬", bg: "rgba(236,252,203,0.3)", text: "#BEF264" },
  Minerals: { emoji: "💎", bg: "rgba(253,244,255,0.3)", text: "#D8B4FE" },
  "Fish Oil & Omegas": { emoji: "🐟", bg: "rgba(219,234,254,0.3)", text: "#93C5FD" },
  "Amino Acids": { emoji: "🧬", bg: "rgba(207,250,254,0.3)", text: "#67E8F9" },
  Protein: { emoji: "💪", bg: "rgba(209,250,229,0.3)", text: "#6EE7B7" },
  Creatine: { emoji: "💪", bg: "rgba(209,250,229,0.3)", text: "#6EE7B7" },
  "Sports Performance": { emoji: "🏋️", bg: "rgba(254,226,226,0.3)", text: "#FCA5A5" },
  Recovery: { emoji: "🔄", bg: "rgba(209,250,229,0.3)", text: "#6EE7B7" },
  Electrolytes: { emoji: "⚡", bg: "rgba(254,243,199,0.3)", text: "#FCD34D" },
  Collagen: { emoji: "✨", bg: "rgba(253,244,255,0.3)", text: "#D8B4FE" },
  Adaptogens: { emoji: "🌿", bg: "rgba(236,252,203,0.3)", text: "#BEF264" },
  Antioxidants: { emoji: "🫐", bg: "rgba(237,233,254,0.3)", text: "#C4B5FD" },
  Probiotics: { emoji: "🦠", bg: "rgba(224,231,255,0.3)", text: "#A5B4FC" },
  "Digestive Enzymes": { emoji: "🦠", bg: "rgba(224,231,255,0.3)", text: "#A5B4FC" },
  "Gut Health": { emoji: "🦠", bg: "rgba(224,231,255,0.3)", text: "#A5B4FC" },
  Nootropics: { emoji: "🧠", bg: "rgba(219,234,254,0.3)", text: "#93C5FD" },
  Energy: { emoji: "⚡", bg: "rgba(254,243,199,0.3)", text: "#FCD34D" },
  Sleep: { emoji: "😴", bg: "rgba(237,233,254,0.3)", text: "#C4B5FD" },
  Mood: { emoji: "💜", bg: "rgba(252,231,243,0.3)", text: "#F9A8D4" },
  Stress: { emoji: "🧘", bg: "rgba(243,232,255,0.3)", text: "#D8B4FE" },
  Greens: { emoji: "🥬", bg: "rgba(236,252,203,0.3)", text: "#BEF264" },
  Mushrooms: { emoji: "🍄", bg: "rgba(254,215,170,0.3)", text: "#FDBA74" },
  "Liver Support": { emoji: "🫘", bg: "rgba(209,250,229,0.3)", text: "#6EE7B7" },
  "Heart Health": { emoji: "❤️", bg: "rgba(255,228,230,0.3)", text: "#FCA5A5" },
  Metabolism: { emoji: "🔥", bg: "rgba(254,215,170,0.3)", text: "#FDBA74" },
  "Joint Support": { emoji: "🦵", bg: "rgba(255,237,213,0.3)", text: "#FDBA74" },
  "Bone Support": { emoji: "🦴", bg: "rgba(245,245,244,0.3)", text: "#D6D3D1" },
  "Anti-Inflammatory": { emoji: "🔥", bg: "rgba(254,215,170,0.3)", text: "#FDBA74" },
  Hormones: { emoji: "🧬", bg: "rgba(255,241,242,0.3)", text: "#FCA5A5" },
  "Men's Health": { emoji: "♂️", bg: "rgba(219,234,254,0.3)", text: "#93C5FD" },
  "Women's Health": { emoji: "♀️", bg: "rgba(252,231,243,0.3)", text: "#F9A8D4" },
  Prenatal: { emoji: "🤰", bg: "rgba(254,205,211,0.3)", text: "#FCA5A5" },
  "Immune Support": { emoji: "🛡️", bg: "rgba(236,252,203,0.3)", text: "#BEF264" },
  Thyroid: { emoji: "🦋", bg: "rgba(237,233,254,0.3)", text: "#C4B5FD" },
  // ── Fallback ─────────────────────────────────────────────────────
  Supplements: { emoji: "💊", bg: "rgba(148,163,184,0.2)", text: "#94A3B8" },
};

/* ── Certification → emoji + color + tooltip ─────────────────────── */
const CERT_INFO: Record<string, { emoji: string; bg: string; text: string; tooltip: string }> = {
  nsf_sport: { emoji: "🏅", bg: "rgba(37,99,235,0.2)", text: "#93C5FD", tooltip: "NSF Certified for Sport — tested for banned substances" },
  nsf: { emoji: "✅", bg: "rgba(59,130,246,0.2)", text: "#93C5FD", tooltip: "NSF Certified — independently verified" },
  "3p": { emoji: "🔬", bg: "rgba(13,148,136,0.2)", text: "#5EEAD4", tooltip: "Third-Party Tested — verified by independent lab" },
  gmp: { emoji: "🏭", bg: "rgba(124,58,237,0.2)", text: "#C4B5FD", tooltip: "cGMP Certified — manufactured in certified facility" },
  usp: { emoji: "🛡️", bg: "rgba(217,119,6,0.2)", text: "#FCD34D", tooltip: "USP Verified — meets purity & potency standards" },
  organic: { emoji: "🌱", bg: "rgba(21,128,61,0.2)", text: "#86EFAC", tooltip: "Certified Organic ingredients" },
  vegan: { emoji: "🌿", bg: "rgba(22,163,74,0.2)", text: "#86EFAC", tooltip: "100% plant-based, no animal-derived ingredients" },
  gf: { emoji: "🌾", bg: "rgba(139,92,246,0.2)", text: "#C4B5FD", tooltip: "Gluten-Free — no wheat or gluten ingredients" },
  fda: { emoji: "🏛️", bg: "rgba(59,130,246,0.2)", text: "#93C5FD", tooltip: "FDA Registered manufacturing facility" },
  usa: { emoji: "🇺🇸", bg: "rgba(59,130,246,0.2)", text: "#93C5FD", tooltip: "Made in USA" },
  non_gmo: { emoji: "🚫", bg: "rgba(22,163,74,0.2)", text: "#86EFAC", tooltip: "Non-GMO — no genetically modified ingredients" },
  kosher: { emoji: "✡️", bg: "rgba(100,116,139,0.2)", text: "#CBD5E1", tooltip: "Kosher certified" },
  soy_free: { emoji: "🚫", bg: "rgba(217,119,6,0.2)", text: "#FCD34D", tooltip: "Soy-Free — no soy-derived ingredients" },
  cruelty_free: { emoji: "🐰", bg: "rgba(236,72,153,0.2)", text: "#F9A8D4", tooltip: "Cruelty-Free — not tested on animals" },
  vegetarian: { emoji: "🥬", bg: "rgba(22,163,74,0.2)", text: "#86EFAC", tooltip: "Suitable for vegetarians" },
  lactose_free: { emoji: "🥛", bg: "rgba(139,92,246,0.2)", text: "#C4B5FD", tooltip: "Lactose-Free" },
  iso: { emoji: "📋", bg: "rgba(100,116,139,0.2)", text: "#CBD5E1", tooltip: "ISO/IEC Certified manufacturing" },
  coa: { emoji: "📄", bg: "rgba(13,148,136,0.2)", text: "#5EEAD4", tooltip: "Certificate of Analysis available" },
};

function getTagInfo(tag: string) {
  return TAG_INFO[tag] ?? DEFAULT_TAG;
}

function getCategoryInfo(cat: string) {
  return CATEGORY_INFO[cat] ?? CATEGORY_INFO["Supplements"]!;
}

/* ── Grade → color mapping ───────────────────────────────────────── */
const GRADE_COLORS: Record<string, string> = {
  "A+": "#059669",
  A: "#059669",
  "A-": "#10B981",
  "B+": "#2563EB",
  B: "#2563EB",
  "B-": "#3B82F6",
  "C+": "#D97706",
  C: "#D97706",
  "C-": "#F59E0B",
  "D+": "#EA580C",
  D: "#EA580C",
  "D-": "#F97316",
  F: "#DC2626",
};

function getGradeColor(grade: string): string {
  return GRADE_COLORS[grade] ?? "#6B7280";
}

/* ── Certification parsing ───────────────────────────────────────── */
interface CertLabel {
  key: string;
  label: string;
}

function parseCertifications(certs: string[]): CertLabel[] {
  const labels: CertLabel[] = [];
  const seen = new Set<string>();

  function add(key: string, label: string) {
    if (!seen.has(key)) {
      labels.push({ key, label });
      seen.add(key);
    }
  }

  for (const c of certs) {
    const cl = c.toLowerCase();
    if (cl.includes("nsf") && cl.includes("sport")) {
      add("nsf_sport", "NSF Sport");
    } else if (cl.includes("nsf")) {
      add("nsf", "NSF");
    }
    if (cl.includes("third") && (cl.includes("party") || cl.includes("tested"))) {
      add("3p", "3rd Party");
    }
    if (cl.includes("gmp") || cl.includes("cgmp")) {
      add("gmp", "GMP");
    }
    if (cl.includes("usp")) {
      add("usp", "USP");
    }
    if (cl.includes("organic")) {
      add("organic", "Organic");
    }
    if (cl.includes("vegan") && !cl.includes("vegetarian")) {
      add("vegan", "Vegan");
    }
    if (cl.includes("gluten") && cl.includes("free")) {
      add("gf", "GF");
    }
    if (cl.includes("fda") && cl.includes("register")) {
      add("fda", "FDA");
    }
    if (cl.includes("made in") && cl.includes("usa")) {
      add("usa", "USA");
    }
    if (cl.includes("non") && cl.includes("gmo")) {
      add("non_gmo", "Non-GMO");
    }
    if (cl.includes("kosher")) {
      add("kosher", "Kosher");
    }
    if (cl.includes("soy") && cl.includes("free")) {
      add("soy_free", "Soy Free");
    }
    if (cl.includes("cruelty") && cl.includes("free")) {
      add("cruelty_free", "Cruelty Free");
    }
    if (cl.includes("vegetarian") && !cl.includes("vegan")) {
      add("vegetarian", "Vegetarian");
    }
    if (cl.includes("lactose") && cl.includes("free")) {
      add("lactose_free", "Lactose Free");
    }
    if (cl.includes("iso") && cl.includes("iec")) {
      add("iso", "ISO");
    }
    if (cl.includes("coa") || (cl.includes("certificate") && cl.includes("analysis"))) {
      add("coa", "COA");
    }
  }
  return labels;
}

/* ── Normalize granular categories to broader display labels ──────── */
const CATEGORY_DISPLAY: Record<string, string> = {
  // Specific amino acids → Amino Acids
  NAC: "Amino Acids", GABA: "Amino Acids", "5-HTP": "Amino Acids",
  Carnitine: "Amino Acids", Glycine: "Amino Acids", Lysine: "Amino Acids",
  "L-Arginine": "Amino Acids", "L-Glutamine": "Amino Acids", "L-Theanine": "Amino Acids",
  Phosphatidylcholine: "Amino Acids", Phosphatidylserine: "Amino Acids",
  // Specific B vitamins → B Vitamins
  "B-Complex": "B Vitamins", "Vitamin B12": "B Vitamins",
  "Vitamin B2": "B Vitamins", "Vitamin B6": "B Vitamins",
  Folate: "B Vitamins", Biotin: "B Vitamins", Niacinamide: "B Vitamins",
  // Specific minerals → Minerals
  Magnesium: "Minerals", "Calcium-Magnesium": "Minerals", Calcium: "Minerals",
  Zinc: "Minerals", Selenium: "Minerals", Copper: "Minerals",
  Potassium: "Minerals", Chromium: "Minerals", "Trace Minerals": "Minerals",
  Iron: "Minerals",
  // Omega / Fish Oil → Fish Oil & Omegas
  "Omega-3": "Fish Oil & Omegas", "Fish Oil": "Fish Oil & Omegas",
  // Adaptogens/herbs → Adaptogens
  Ashwagandha: "Adaptogens", Rhodiola: "Adaptogens", Ginseng: "Adaptogens",
  Valerian: "Adaptogens",
  // Antioxidants/polyphenols → Antioxidants
  Resveratrol: "Antioxidants", Quercetin: "Antioxidants", Curcumin: "Antioxidants",
  "Alpha-Lipoic Acid": "Antioxidants", "Grape Seed Extract": "Antioxidants",
  "Green Tea Extract": "Antioxidants",
  // Gut / Digestive
  Probiotic: "Probiotics", Fiber: "Gut Health", Berberine: "Gut Health",
  "GI Support": "Gut Health",
  // Sleep
  Melatonin: "Sleep", "Sleep Formula": "Sleep",
  // Energy
  CoQ10: "Energy", NR: "Energy", energy: "Energy",
  // Heart
  "Heart Formula": "Heart Health", "Red Yeast Rice": "Heart Health", Cholesterol: "Heart Health",
  // Liver
  "Liver Formula": "Liver Support", "Milk Thistle": "Liver Support",
  // Joint / Bone
  "Joint Formula": "Joint Support", Glucosamine: "Joint Support",
  "Bone Formula": "Bone Support",
  Boswellia: "Anti-Inflammatory", "Anti-Inflammatory": "Anti-Inflammatory",
  // Hormones
  "Hormone Formula": "Hormones", "Ovarian Support": "Women's Health",
  "Testosterone Support": "Men's Health",
  // Other
  Glutathione: "Antioxidants", "Thyroid Formula": "Thyroid",
  "Adrenal Extract": "Adaptogens", "Broccoli Extract": "Antioxidants",
  "immune-support": "Immune Support", "Undecylenic Acid": "Immune Support",
  "Blood Sugar Formula": "Metabolism", "Metabolism Formula": "Metabolism",
  "Greens Powder": "Greens", "Mood Formula": "Mood", "Stress Formula": "Stress",
  Nootropic: "Nootropics", "Recovery Formula": "Recovery",
  "Beta-Alanine": "Sports Performance", "Beta Alanine": "Sports Performance",
  "Pre-Workout": "Sports Performance",
  "Vitamin D+K2": "Vitamin D",
  "Vitamin K2": "Vitamin K",
  "Vitamin E": "Vitamins",
};

function formatCategory(cat: string): string {
  if (CATEGORY_DISPLAY[cat]) return CATEGORY_DISPLAY[cat];
  if (cat.includes("-")) {
    return cat
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }
  return cat;
}

interface ProductCardProps {
  product: CatalogProduct;
  showDevBadge?: boolean;
}

export function ProductCard({ product, showDevBadge }: ProductCardProps) {
  const brandColor = "var(--color-accent)";
  const catInfo = product.category ? getCategoryInfo(formatCategory(product.category)) : null;
  const certLabels = parseCertifications(product.certifications);

  // Per-serving price
  const perServing =
    product.price_usd && product.servings_per_container && product.servings_per_container > 0
      ? product.price_usd / product.servings_per_container
      : null;

  return (
    <CardBorderWrap>
    <Link
      href={`/catalog/${product.slug}`}
      className="group bg-[#0d0d1a] overflow-hidden block h-full"
    >
      {/* Image carousel with score overlay */}
      <div className="relative w-full aspect-square bg-[#111125]">
        <CardImageCarousel
          images={[
            ...(product.image_url ? [product.image_url] : []),
            ...product.gallery_images,
          ]}
          alt={product.name}
        />
        {/* Score ring overlay */}
        <div className="absolute top-2 left-2">
          <ScoreRing score={product.score} size={44} strokeWidth={5} />
        </div>
        {showDevBadge && product.is_draft && (
          <div className="absolute top-2 right-2">
            <DevBadge />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-3 pt-2 pb-3 flex flex-col gap-1">
        {/* Name + category chip with emoji & color */}
        <div className="flex items-start gap-1.5">
          <span className="text-[12px] font-bold text-text leading-tight group-hover:text-accent transition-colors line-clamp-1 flex-1">
            {product.name}
          </span>
          {product.category && catInfo && (
            <span
              className="shrink-0 text-[9px] font-semibold px-1.5 py-px rounded inline-flex items-center gap-0.5"
              style={{ backgroundColor: catInfo.bg, color: catInfo.text }}
            >
              <span className="text-[8px]">{catInfo.emoji}</span>
              {formatCategory(product.category)}
            </span>
          )}
        </div>

        {/* Brand + grade badge */}
        <div className="flex items-center gap-1.5">
          <span
            className="text-[10px] font-extrabold tracking-wider uppercase hover:underline cursor-pointer"
            style={{ color: brandColor }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = `/catalog?brand=${product.brand_slug}`;
            }}
          >
            {product.brand}
          </span>
          {product.grade && product.grade !== "?" && (
            <span
              className="text-[9px] font-bold px-1.5 py-px rounded text-white leading-tight"
              style={{ backgroundColor: getGradeColor(product.grade) }}
            >
              {product.grade}
            </span>
          )}
        </div>

        {/* Price: per-serving · servings · total */}
        {product.price_usd != null && (
          <div className="flex items-baseline gap-1">
            {perServing != null && (
              <span className="text-[12px] font-bold text-accent">
                ${perServing.toFixed(2)}/srv
              </span>
            )}
            <span className="text-[10px] text-text/70">
              {product.servings_per_container != null && (
                <>{product.servings_per_container} srv · </>
              )}
              ${product.price_usd.toFixed(2)}
              {product.form && <> · {product.form}</>}
            </span>
          </div>
        )}

        {/* Benefit tags with emojis and colored backgrounds */}
        <div className="flex flex-wrap gap-1">
          {product.category_tags.slice(0, 4).map((tag) => {
            const info = getTagInfo(tag);
            return (
              <span
                key={tag}
                className="inline-flex items-center gap-0.5 px-1.5 py-px rounded-full text-[9px] font-semibold"
                style={{ backgroundColor: info.bg, color: info.text }}
              >
                <span className="text-[8px]">{info.emoji}</span>
                {"label" in info ? info.label : tag}
              </span>
            );
          })}
          {product.category_tags.length > 4 && (
            <span className="text-[9px] text-muted/50 py-px">
              +{product.category_tags.length - 4}
            </span>
          )}
        </div>

        {/* Certifications as emoji circle bubbles with tooltips */}
        {certLabels.length > 0 && (
          <div className="flex flex-wrap gap-1 items-center">
            {certLabels.slice(0, 5).map((cert) => {
              const info = CERT_INFO[cert.key] ?? { emoji: "✓", bg: "rgba(100,116,139,0.15)", text: "#94A3B8", tooltip: cert.label };
              return (
                <span
                  key={cert.key}
                  title={info.tooltip}
                  className="inline-flex items-center justify-center w-[22px] h-[22px] rounded-full text-[11px] cursor-default shrink-0"
                  style={{ backgroundColor: info.bg }}
                >
                  {info.emoji}
                </span>
              );
            })}
            {certLabels.length > 5 && (
              <span
                title={certLabels.slice(5).map((c) => {
                  const i = CERT_INFO[c.key];
                  return i ? `${i.emoji} ${c.label}` : c.label;
                }).join(", ")}
                className="inline-flex items-center justify-center h-[22px] px-1.5 rounded-full text-[9px] font-semibold cursor-default"
                style={{ backgroundColor: "rgba(100,116,139,0.15)", color: "#94A3B8" }}
              >
                +{certLabels.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
    </CardBorderWrap>
  );
}
