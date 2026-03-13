import Link from "next/link";
import { ScoreRing } from "./score-ring";
import { DevBadge } from "./dev-badge";
import { CardImageCarousel } from "./card-image-carousel";
import type { CatalogProduct } from "@/lib/types";

/* ── Tag → emoji + color mapping ─────────────────────────────────── */
const TAG_INFO: Record<string, { emoji: string; bg: string; text: string }> = {
  Energy: { emoji: "⚡", bg: "rgba(254,243,199,0.25)", text: "#FEF3C7" },
  Muscle: { emoji: "💪", bg: "rgba(209,250,229,0.25)", text: "#D1FAE5" },
  "Brain Health": { emoji: "🧠", bg: "rgba(224,242,254,0.25)", text: "#E0F2FE" },
  Cognition: { emoji: "🧠", bg: "rgba(219,234,254,0.25)", text: "#DBEAFE" },
  Memory: { emoji: "🧠", bg: "rgba(219,234,254,0.25)", text: "#DBEAFE" },
  "Heart Health": { emoji: "❤️", bg: "rgba(255,228,230,0.25)", text: "#FFE4E6" },
  "Gut Health": { emoji: "🦠", bg: "rgba(224,231,255,0.25)", text: "#E0E7FF" },
  "GI Support": { emoji: "🦠", bg: "rgba(224,231,255,0.25)", text: "#E0E7FF" },
  Digestive: { emoji: "🦠", bg: "rgba(209,250,229,0.25)", text: "#D1FAE5" },
  Prebiotics: { emoji: "🦠", bg: "rgba(224,231,255,0.25)", text: "#E0E7FF" },
  "Immune Support": { emoji: "🛡️", bg: "rgba(236,252,203,0.25)", text: "#ECFCCB" },
  Sleep: { emoji: "😴", bg: "rgba(237,233,254,0.25)", text: "#EDE9FE" },
  Mood: { emoji: "💜", bg: "rgba(252,231,243,0.25)", text: "#FCE7F3" },
  Stress: { emoji: "🧘", bg: "rgba(243,232,255,0.25)", text: "#F3E8FF" },
  "Sports Performance": { emoji: "🏃", bg: "rgba(254,242,242,0.25)", text: "#FEF2F2" },
  Endurance: { emoji: "🏋️", bg: "rgba(254,226,226,0.25)", text: "#FEE2E2" },
  Recovery: { emoji: "🔄", bg: "rgba(209,250,229,0.25)", text: "#D1FAE5" },
  "Joint Support": { emoji: "🦵", bg: "rgba(255,237,213,0.25)", text: "#FFEDD5" },
  "Bone Support": { emoji: "🦴", bg: "rgba(245,245,244,0.25)", text: "#F5F5F4" },
  Inflammation: { emoji: "🔥", bg: "rgba(254,215,170,0.25)", text: "#FED7AA" },
  "Healthy Aging": { emoji: "⏳", bg: "rgba(207,250,254,0.25)", text: "#CFFAFE" },
  "Weight Management": { emoji: "⚖️", bg: "rgba(240,253,244,0.25)", text: "#F0FDF4" },
  Antioxidant: { emoji: "🫐", bg: "rgba(237,233,254,0.25)", text: "#EDE9FE" },
  "Skin / Hair": { emoji: "✨", bg: "rgba(253,244,255,0.25)", text: "#FDF4FF" },
  Hormones: { emoji: "🧬", bg: "rgba(255,241,242,0.25)", text: "#FFF1F2" },
  "Women's Health": { emoji: "♀️", bg: "rgba(252,231,243,0.25)", text: "#FCE7F3" },
  "Men's Health": { emoji: "♂️", bg: "rgba(219,234,254,0.25)", text: "#DBEAFE" },
  Prenatal: { emoji: "🤰", bg: "rgba(254,205,211,0.25)", text: "#FECDD3" },
  Fertility: { emoji: "🌱", bg: "rgba(253,242,248,0.25)", text: "#FDF2F8" },
  Metabolism: { emoji: "🔥", bg: "rgba(254,215,170,0.25)", text: "#FED7AA" },
  "Liver Support": { emoji: "🫘", bg: "rgba(209,250,229,0.25)", text: "#D1FAE5" },
  Detox: { emoji: "🫘", bg: "rgba(236,252,203,0.25)", text: "#ECFCCB" },
  Cholesterol: { emoji: "❤️", bg: "rgba(255,228,230,0.25)", text: "#FFE4E6" },
  "Blood Sugar": { emoji: "🩸", bg: "rgba(254,226,226,0.25)", text: "#FEE2E2" },
  "Blood Pressure": { emoji: "🩸", bg: "rgba(254,226,226,0.25)", text: "#FEE2E2" },
  Protein: { emoji: "💪", bg: "rgba(209,250,229,0.25)", text: "#D1FAE5" },
  Foundational: { emoji: "🏗️", bg: "rgba(241,245,249,0.25)", text: "#F1F5F9" },
  "General Health": { emoji: "💊", bg: "rgba(248,250,252,0.25)", text: "#F8FAFC" },
  Methylation: { emoji: "🧬", bg: "rgba(207,250,254,0.25)", text: "#CFFAFE" },
  "Eye Health": { emoji: "👁️", bg: "rgba(240,253,250,0.25)", text: "#F0FDFA" },
  Respiratory: { emoji: "🫁", bg: "rgba(240,253,250,0.25)", text: "#F0FDFA" },
  Thyroid: { emoji: "🦋", bg: "rgba(237,233,254,0.25)", text: "#EDE9FE" },
  CoQ10: { emoji: "⚡", bg: "rgba(254,243,199,0.25)", text: "#FEF3C7" },
  energy: { emoji: "⚡", bg: "rgba(254,243,199,0.25)", text: "#FEF3C7" },
  muscle: { emoji: "💪", bg: "rgba(209,250,229,0.25)", text: "#D1FAE5" },
  cognition: { emoji: "🧠", bg: "rgba(219,234,254,0.25)", text: "#DBEAFE" },
  heart: { emoji: "❤️", bg: "rgba(255,228,230,0.25)", text: "#FFE4E6" },
  gut: { emoji: "🦠", bg: "rgba(224,231,255,0.25)", text: "#E0E7FF" },
  immune: { emoji: "🛡️", bg: "rgba(236,252,203,0.25)", text: "#ECFCCB" },
  "immune-support": { emoji: "🛡️", bg: "rgba(236,252,203,0.25)", text: "#ECFCCB" },
  sleep: { emoji: "😴", bg: "rgba(237,233,254,0.25)", text: "#EDE9FE" },
  mood: { emoji: "💜", bg: "rgba(252,231,243,0.25)", text: "#FCE7F3" },
  stress: { emoji: "🧘", bg: "rgba(243,232,255,0.25)", text: "#F3E8FF" },
  sports: { emoji: "🏃", bg: "rgba(254,242,242,0.25)", text: "#FEF2F2" },
  recovery: { emoji: "🔄", bg: "rgba(209,250,229,0.25)", text: "#D1FAE5" },
  bone: { emoji: "🦴", bg: "rgba(245,245,244,0.25)", text: "#F5F5F4" },
  "joint-health": { emoji: "🦵", bg: "rgba(255,237,213,0.25)", text: "#FFEDD5" },
  hormones: { emoji: "🧬", bg: "rgba(255,241,242,0.25)", text: "#FFF1F2" },
  liver: { emoji: "🫘", bg: "rgba(209,250,229,0.25)", text: "#D1FAE5" },
  "detox-liver": { emoji: "🫘", bg: "rgba(236,252,203,0.25)", text: "#ECFCCB" },
  adaptogen: { emoji: "🌿", bg: "rgba(236,252,203,0.25)", text: "#ECFCCB" },
  minerals: { emoji: "💎", bg: "rgba(253,244,255,0.25)", text: "#FDF4FF" },
  "omega-fatty-acids": { emoji: "🐟", bg: "rgba(219,234,254,0.25)", text: "#DBEAFE" },
  probiotic: { emoji: "🦠", bg: "rgba(224,231,255,0.25)", text: "#E0E7FF" },
};

const DEFAULT_TAG = { emoji: "📦", bg: "rgba(148,163,184,0.15)", text: "#94A3B8" };

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

/* ── Certification → emoji + color ───────────────────────────────── */
const CERT_INFO: Record<string, { emoji: string; bg: string; text: string }> = {
  nsf_sport: { emoji: "🏅", bg: "rgba(37,99,235,0.2)", text: "#93C5FD" },
  nsf: { emoji: "✅", bg: "rgba(59,130,246,0.2)", text: "#93C5FD" },
  "3p": { emoji: "🔬", bg: "rgba(13,148,136,0.2)", text: "#5EEAD4" },
  gmp: { emoji: "🏭", bg: "rgba(124,58,237,0.2)", text: "#C4B5FD" },
  usp: { emoji: "🛡️", bg: "rgba(217,119,6,0.2)", text: "#FCD34D" },
  organic: { emoji: "🌱", bg: "rgba(21,128,61,0.2)", text: "#86EFAC" },
  vegan: { emoji: "🌿", bg: "rgba(22,163,74,0.2)", text: "#86EFAC" },
  gf: { emoji: "🌾", bg: "rgba(139,92,246,0.2)", text: "#C4B5FD" },
};

/* ── Brand → color mapping ────────────────────────────────────────── */
export const BRAND_COLOR: Record<string, string> = {
  Thorne: "#00e5a0",
  "Nootropics Depot": "#7c6dfa",
  Complement: "#ffa94d",
  "Transparent Labs": "#ff4f6a",
  Momentous: "#4dc9f6",
  "MegaFood Inc.": "#a3e635",
};

function getTagInfo(tag: string) {
  return TAG_INFO[tag] ?? DEFAULT_TAG;
}

function getCategoryInfo(cat: string) {
  return CATEGORY_INFO[cat] ?? CATEGORY_INFO["Supplements"]!;
}

function getBrandColor(brand: string): string {
  return BRAND_COLOR[brand] ?? "#7a7a9a";
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
  for (const c of certs) {
    const cl = c.toLowerCase();
    if (cl.includes("nsf") && cl.includes("sport") && !seen.has("nsf_sport")) {
      labels.push({ key: "nsf_sport", label: "NSF Sport" });
      seen.add("nsf_sport");
    } else if (cl.includes("nsf") && !seen.has("nsf") && !seen.has("nsf_sport")) {
      labels.push({ key: "nsf", label: "NSF" });
      seen.add("nsf");
    } else if (cl.includes("third") && (cl.includes("party") || cl.includes("tested")) && !seen.has("3p")) {
      labels.push({ key: "3p", label: "3rd Party" });
      seen.add("3p");
    } else if (cl.includes("gmp") && !seen.has("gmp")) {
      labels.push({ key: "gmp", label: "GMP" });
      seen.add("gmp");
    } else if (cl.includes("usp") && !seen.has("usp")) {
      labels.push({ key: "usp", label: "USP" });
      seen.add("usp");
    } else if (cl.includes("organic") && !seen.has("organic")) {
      labels.push({ key: "organic", label: "Organic" });
      seen.add("organic");
    } else if (cl.includes("vegan") && !seen.has("vegan")) {
      labels.push({ key: "vegan", label: "Vegan" });
      seen.add("vegan");
    } else if (cl.includes("gluten") && cl.includes("free") && !seen.has("gf")) {
      labels.push({ key: "gf", label: "GF" });
      seen.add("gf");
    }
  }
  return labels.slice(0, 4);
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
  const brandColor = getBrandColor(product.brand);
  const catInfo = product.category ? getCategoryInfo(formatCategory(product.category)) : null;
  const certLabels = parseCertifications(product.certifications);

  // Per-serving price
  const perServing =
    product.price_usd && product.servings_per_container && product.servings_per_container > 0
      ? product.price_usd / product.servings_per_container
      : null;

  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="group relative bg-[#0d0d1a] overflow-hidden hover:-translate-y-0.5 transition-all block h-full card-border"
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
        <div className="absolute top-2 left-2 bg-[rgba(8,8,15,0.7)] rounded-full p-0.5">
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
            className="text-[10px] font-extrabold tracking-wider uppercase"
            style={{ color: brandColor }}
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
                {tag}
              </span>
            );
          })}
          {product.category_tags.length > 4 && (
            <span className="text-[9px] text-muted/50 py-px">
              +{product.category_tags.length - 4}
            </span>
          )}
        </div>

        {/* Certifications as bubble tags with emojis (under benefit tags) */}
        {certLabels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {certLabels.map((cert) => {
              const info = CERT_INFO[cert.key] ?? { emoji: "✓", bg: "rgba(100,116,139,0.15)", text: "#94A3B8" };
              return (
                <span
                  key={cert.key}
                  className="inline-flex items-center gap-0.5 px-1.5 py-px rounded-full text-[8px] font-semibold"
                  style={{ backgroundColor: info.bg, color: info.text }}
                >
                  <span className="text-[8px]">{info.emoji}</span>
                  {cert.label}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </Link>
  );
}
