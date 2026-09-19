"use client";

import { trackBuyClick } from "@/lib/analytics";

/** Compact tracked buy links for a ranked sleep row: a tagged Amazon search and
 *  the maker's own page where the last link check found it working. */
export function SleepBuyLinks({
  productId,
  amazonUrl,
  maker,
  source,
}: {
  productId: string;
  amazonUrl: string;
  maker: { url: string; host: string } | null;
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
      {maker && (
        <a href={maker.url} rel="noopener nofollow" target="_blank" onClick={track(maker.url)} className={cls}>
          {maker.host}
        </a>
      )}
    </div>
  );
}
