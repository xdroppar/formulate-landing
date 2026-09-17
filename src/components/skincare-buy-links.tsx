"use client";

import { trackBuyClick } from "@/lib/analytics";

/**
 * Compact buy links for a ranked skincare row. Same tracking as the supplement
 * buy buttons (one `buy_click` per click, with destination and host), smaller
 * because a ranked page carries ten of them.
 */
export function SkincareBuyLinks({
  productId,
  amazonUrl,
  retailer,
  source,
}: {
  productId: string;
  amazonUrl: string;
  retailer: { url: string; host: string } | null;
  source: string;
}) {
  const track = (url: string) => () => trackBuyClick({ url, source, product_id: productId });
  const cls =
    "inline-flex items-center rounded-lg border border-border px-2.5 py-1 text-xs font-semibold text-text hover:border-accent/40 transition-colors";
  return (
    <div className="flex flex-wrap gap-2">
      <a href={amazonUrl} rel="noopener sponsored" target="_blank" onClick={track(amazonUrl)} className={cls}>
        Find on Amazon
      </a>
      {retailer && retailer.host !== "amazon.com" && (
        <a
          href={retailer.url}
          rel="noopener nofollow"
          target="_blank"
          onClick={track(retailer.url)}
          className={cls}
        >
          {retailer.host}
        </a>
      )}
    </div>
  );
}
