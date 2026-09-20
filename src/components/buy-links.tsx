"use client";

import { trackBuyClick } from "@/lib/analytics";

/**
 * The compact buy row for a product in a list, wherever the list is.
 *
 * WHY ONE COMPONENT. Skincare and sleep each grew their own copy of this —
 * same markup, same tracking, different noun — and supplements were about to
 * get a third. They are the same thing: a tagged Amazon link, an optional
 * second destination, and one `buy_click` per click carrying where it went.
 *
 * WHY IT MATTERS THAT EVERY LIST HAS ONE. Amazon is the destination that has
 * measurably earned (Jul–Sep 2026: 29 clicks, 10 orders), and a sweep of the
 * live site on 2026-09-20 found 2,150 pages with no buy link at all —
 * including the 930 ingredient pages, which carry the largest share of views,
 * and the 30 "best X supplements" pages, which are the highest buying intent
 * on the site. Naming a product and offering no way to get it is the cheapest
 * revenue left lying around.
 *
 * `secondary` is the maker's or retailer's own page where one is known to
 * work; it is marked nofollow, the Amazon link sponsored.
 */
export function BuyLinks({
  productId,
  amazonUrl,
  secondary,
  source,
  className = "",
}: {
  productId: string | null;
  amazonUrl: string;
  secondary?: { url: string; host: string } | null;
  source: string;
  className?: string;
}) {
  const track = (url: string) => () => trackBuyClick({ url, source, product_id: productId });
  const cls =
    "inline-flex items-center rounded-lg border border-border px-2.5 py-1 text-xs font-semibold text-text hover:border-accent/40 transition-colors";
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <a
        href={amazonUrl}
        rel="noopener sponsored"
        target="_blank"
        onClick={track(amazonUrl)}
        className={cls}
      >
        Find on Amazon
      </a>
      {secondary && secondary.host !== "amazon.com" && (
        <a
          href={secondary.url}
          rel="noopener nofollow"
          target="_blank"
          onClick={track(secondary.url)}
          className={cls}
        >
          {secondary.host}
        </a>
      )}
    </div>
  );
}
