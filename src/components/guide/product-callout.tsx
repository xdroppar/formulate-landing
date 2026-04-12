/**
 * Inline product score card — shows a real product from the catalog
 * with its score ring, image, and link. The conversion bridge between
 * educational content and the webapp.
 */

import Image from "next/image";
import { type GuideProduct, catalogUrl } from "./products";

/* ── Score ring (SVG) ──────────────────────────────────────────── */

function ScoreRing({ score }: { score: number }) {
  const r = 17;
  const circumference = 2 * Math.PI * r;
  const progress = (score / 100) * circumference;
  const color =
    score >= 85 ? "#10B981" : score >= 70 ? "#3B82F6" : score >= 55 ? "#F59E0B" : "#EF4444";

  return (
    <svg width="48" height="48" viewBox="0 0 48 48" className="flex-shrink-0">
      <circle cx="24" cy="24" r={r} fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.08" />
      <circle
        cx="24" cy="24" r={r}
        fill="none" stroke={color} strokeWidth="2.5"
        strokeDasharray={`${progress} ${circumference}`}
        strokeLinecap="round"
        transform="rotate(-90 24 24)"
      />
      <text
        x="24" y="24"
        textAnchor="middle" dominantBaseline="central"
        fill={color} fontSize="14" fontWeight="800"
      >
        {score}
      </text>
    </svg>
  );
}

/* ── Single product card ───────────────────────────────────────── */

interface ProductCalloutProps {
  product: GuideProduct;
}

export function ProductCallout({ product }: ProductCalloutProps) {
  const href = catalogUrl(product.slug);

  return (
    <div className="not-prose my-6">
      <a
        href={href}
        className="group flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-accent/30 transition-all"
      >
        {/* Product image */}
        <div className="w-14 h-14 rounded-lg bg-surface2 flex items-center justify-center flex-shrink-0 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={48}
            height={48}
            className="object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-text group-hover:text-accent transition-colors">
            {product.name}
          </div>
          <div className="text-xs text-muted">{product.brand}</div>
          <div className="text-xs text-muted/70 mt-0.5 truncate">{product.verdict}</div>
        </div>

        {/* Score ring */}
        <ScoreRing score={product.score} />

        {/* Arrow */}
        <svg
          className="w-4 h-4 text-muted/40 group-hover:text-accent transition-colors flex-shrink-0"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}

/* ── Multi-product row ─────────────────────────────────────────── */

interface ProductRowProps {
  products: GuideProduct[];
  title?: string;
}

export function ProductRow({ products, title }: ProductRowProps) {
  return (
    <div className="not-prose my-8">
      {title && (
        <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-muted mb-3">
          {title}
        </div>
      )}
      <div className="grid gap-2 sm:grid-cols-2">
        {products.map((product) => (
          <a
            key={product.slug}
            href={catalogUrl(product.slug)}
            className="group flex items-center gap-3 p-3 rounded-xl bg-surface border border-border hover:border-accent/30 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-surface2 flex items-center justify-center flex-shrink-0 overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-text group-hover:text-accent transition-colors truncate">
                {product.name}
              </div>
              <div className="text-[11px] text-muted">{product.brand}</div>
            </div>
            <ScoreRing score={product.score} />
          </a>
        ))}
      </div>
    </div>
  );
}
