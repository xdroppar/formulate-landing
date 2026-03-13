import Link from "next/link";
import { ScoreRing } from "./score-ring";
import { DevBadge } from "./dev-badge";
import type { CatalogProduct } from "@/lib/types";

interface ProductCardProps {
  product: CatalogProduct;
  showDevBadge?: boolean;
}

export function ProductCard({ product, showDevBadge }: ProductCardProps) {
  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="group bg-surface border border-border rounded-2xl p-5 hover:border-accent/30 hover:-translate-y-0.5 transition-all block"
    >
      {/* Top row: score + dev badge */}
      <div className="flex items-start justify-between mb-3">
        <ScoreRing score={product.score} size={52} strokeWidth={4} />
        <div className="flex flex-col items-end gap-1.5">
          {product.grade && (
            <span className={`grade-${product.grade[0].toLowerCase()} px-2 py-0.5 rounded-md text-[11px] font-bold`}>
              {product.grade}
            </span>
          )}
          {showDevBadge && product.is_draft && <DevBadge />}
        </div>
      </div>

      {/* Product image placeholder */}
      {product.image_url ? (
        <div className="w-full h-32 rounded-lg bg-surface2 border border-border mb-3 overflow-hidden">
          <img src={product.image_url} alt={product.name} className="w-full h-full object-contain" />
        </div>
      ) : (
        <div className="w-full h-32 rounded-lg bg-surface2 border border-border mb-3 flex items-center justify-center">
          <span className="text-3xl opacity-20">💊</span>
        </div>
      )}

      {/* Info */}
      <div className="text-sm font-bold text-text leading-tight mb-1 group-hover:text-accent transition-colors line-clamp-2">
        {product.name}
      </div>
      <div className="text-[11px] text-muted mb-2">{product.brand}</div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {product.category_tags.slice(0, 3).map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-surface2 text-muted border border-border">
            {tag}
          </span>
        ))}
      </div>

      {/* Price */}
      {product.price_usd && (
        <div className="mt-3 text-xs text-muted">
          ${product.price_usd.toFixed(2)}
          {product.form && <span className="ml-1 opacity-60">· {product.form}</span>}
        </div>
      )}
    </Link>
  );
}
