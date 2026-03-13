import Link from "next/link";
import { ScoreRing } from "./score-ring";
import { DevBadge } from "./dev-badge";
import type { CatalogProduct } from "@/lib/types";

/* ── Tag → emoji mapping ─────────────────────────────────────────── */
const TAG_EMOJI: Record<string, string> = {
  // Capitalized tags
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
  // Lowercase tags (older format)
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
const BRAND_COLOR: Record<string, string> = {
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

function formatCategory(cat: string): string {
  // Normalize kebab-case to title case
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
      className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-accent/30 hover:-translate-y-0.5 transition-all block"
    >
      {/* Image with score overlay */}
      <div className="relative w-full aspect-[4/3] bg-surface2">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl opacity-15">💊</span>
          </div>
        )}
        {/* Score ring overlay */}
        <div className="absolute top-3 left-3">
          <ScoreRing score={product.score} size={44} strokeWidth={3.5} />
        </div>
        {showDevBadge && product.is_draft && (
          <div className="absolute top-3 right-3">
            <DevBadge />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 pt-3 pb-4">
        {/* Name + category */}
        <div className="flex items-start gap-2 mb-1.5">
          <span className="text-[13px] font-bold text-text leading-tight group-hover:text-accent transition-colors line-clamp-1 flex-1">
            {product.name}
          </span>
          {product.category && (
            <span className="shrink-0 text-[10px] font-semibold text-accent/80 bg-accent/10 px-1.5 py-0.5 rounded mt-0.5">
              {formatCategory(product.category)}
            </span>
          )}
        </div>

        {/* Brand */}
        <div
          className="text-[11px] font-extrabold tracking-wider mb-2.5 uppercase"
          style={{ color: brandColor }}
        >
          {product.brand}
        </div>

        {/* Benefit tags with emojis */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.category_tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-surface2 text-muted border border-border"
            >
              <span className="text-[10px]">{getTagEmoji(tag)}</span>
              {tag}
            </span>
          ))}
          {product.category_tags.length > 4 && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium text-muted/60">
              +{product.category_tags.length - 4}
            </span>
          )}
        </div>

        {/* Price + form */}
        {product.price_usd && (
          <div className="text-xs text-muted">
            ${product.price_usd.toFixed(2)}
            {product.form && (
              <span className="ml-1 opacity-60">· {product.form}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
