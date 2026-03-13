import Link from "next/link";
import { ScoreRing } from "./score-ring";
import { DevBadge } from "./dev-badge";
import type { CatalogProduct } from "@/lib/types";

/* ── Tag → emoji mapping ─────────────────────────────────────────── */
const TAG_EMOJI: Record<string, string> = {
  Energy: "⚡",
  Muscle: "💪",
  "Brain Health": "🧠",
  Cognition: "🧠",
  Memory: "🧠",
  "Heart Health": "❤️",
  "Gut Health": "🦠",
  "GI Support": "🦠",
  Digestive: "🦠",
  Prebiotics: "🦠",
  "Immune Support": "🛡️",
  Sleep: "😴",
  Mood: "💜",
  Stress: "🧘",
  "Sports Performance": "🏃",
  Endurance: "🏋️",
  Recovery: "🔄",
  "Joint Support": "🦴",
  "Bone Support": "🦴",
  Inflammation: "🔥",
  "Healthy Aging": "⏳",
  "Weight Management": "⚖️",
  Antioxidant: "🫐",
  "Skin / Hair": "✨",
  Hormones: "🧬",
  "Women's Health": "♀️",
  "Men's Health": "♂️",
  Prenatal: "🤰",
  Fertility: "🌱",
  Metabolism: "🔥",
  "Liver Support": "🫘",
  Detox: "🫘",
  Cholesterol: "❤️",
  "Blood Sugar": "🩸",
  "Blood Pressure": "🩸",
  Protein: "💪",
  Foundational: "🏗️",
  "General Health": "💊",
  Methylation: "🧬",
  "Eye Health": "👁️",
  Respiratory: "🫁",
  Thyroid: "🦋",
  CoQ10: "⚡",
  energy: "⚡",
  muscle: "💪",
  cognition: "🧠",
  heart: "❤️",
  gut: "🦠",
  immune: "🛡️",
  "immune-support": "🛡️",
  sleep: "😴",
  mood: "💜",
  stress: "🧘",
  sports: "🏃",
  recovery: "🔄",
  bone: "🦴",
  "joint-health": "🦴",
  hormones: "🧬",
  liver: "🫘",
  "detox-liver": "🫘",
  adaptogen: "🌿",
  minerals: "💎",
  "omega-fatty-acids": "🐟",
  probiotic: "🦠",
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

function getTagEmoji(tag: string): string {
  return TAG_EMOJI[tag] ?? "•";
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

/* ── Certification display labels ────────────────────────────────── */
function formatCertifications(certs: string[]): string[] {
  const labels: string[] = [];
  const seen = new Set<string>();
  for (const c of certs) {
    const cl = c.toLowerCase();
    if (cl.includes("nsf") && cl.includes("sport") && !seen.has("nsf_sport")) {
      labels.push("NSF Sport");
      seen.add("nsf_sport");
    } else if (cl.includes("nsf") && !seen.has("nsf") && !seen.has("nsf_sport")) {
      labels.push("NSF");
      seen.add("nsf");
    } else if (cl.includes("third") && (cl.includes("party") || cl.includes("tested")) && !seen.has("3p")) {
      labels.push("3rd Party Tested");
      seen.add("3p");
    } else if (cl.includes("gmp") && !seen.has("gmp")) {
      labels.push("GMP");
      seen.add("gmp");
    } else if (cl.includes("usp") && !seen.has("usp")) {
      labels.push("USP");
      seen.add("usp");
    } else if (cl.includes("organic") && !seen.has("organic")) {
      labels.push("Organic");
      seen.add("organic");
    } else if (cl.includes("vegan") && !seen.has("vegan")) {
      labels.push("Vegan");
      seen.add("vegan");
    } else if (cl.includes("gluten") && cl.includes("free") && !seen.has("gf")) {
      labels.push("Gluten Free");
      seen.add("gf");
    }
  }
  return labels.slice(0, 4);
}

function formatCategory(cat: string): string {
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

  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="group bg-[#0d0d1a] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden hover:border-[rgba(255,255,255,0.12)] hover:-translate-y-0.5 transition-all block"
    >
      {/* Image with score overlay */}
      <div className="relative w-full aspect-square bg-[#111125]">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-contain p-2"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-3xl opacity-10">💊</span>
          </div>
        )}
        {/* Score ring overlay */}
        <div className="absolute top-2 left-2 bg-[rgba(8,8,15,0.7)] rounded-full p-0.5">
          <ScoreRing score={product.score} size={36} strokeWidth={3} />
        </div>
        {showDevBadge && product.is_draft && (
          <div className="absolute top-2 right-2">
            <DevBadge />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-3 pt-2 pb-3">
        {/* Name + category */}
        <div className="flex items-start gap-1.5 mb-1">
          <span className="text-[12px] font-bold text-text leading-tight group-hover:text-accent transition-colors line-clamp-1 flex-1">
            {product.name}
          </span>
          {product.category && (
            <span className="shrink-0 text-[9px] font-semibold text-accent/70 bg-accent/10 px-1.5 py-px rounded">
              {formatCategory(product.category)}
            </span>
          )}
        </div>

        {/* Brand + grade badge */}
        <div className="flex items-center gap-1.5 mb-1">
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

        {/* Price + form */}
        {product.price_usd && (
          <div className="text-[11px] text-muted/70 mb-1">
            ${product.price_usd.toFixed(2)}
            {product.form && (
              <span className="ml-1 opacity-60">· {product.form}</span>
            )}
          </div>
        )}

        {/* Certifications */}
        {product.certifications.length > 0 && (() => {
          const labels = formatCertifications(product.certifications);
          return labels.length > 0 ? (
            <div className="text-[8px] text-muted/40 mb-1.5 leading-tight">
              {labels.join(" · ")}
            </div>
          ) : null;
        })()}

        {/* Benefit tags with emojis */}
        <div className="flex flex-wrap gap-1">
          {product.category_tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-0.5 px-1.5 py-px rounded-full text-[9px] font-medium bg-[#16162a] text-muted border border-[rgba(255,255,255,0.05)]"
            >
              <span className="text-[9px]">{getTagEmoji(tag)}</span>
              {tag}
            </span>
          ))}
          {product.category_tags.length > 3 && (
            <span className="text-[9px] text-muted/50 py-px">
              +{product.category_tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
