"use client";

import { trackBuyClick } from "@/lib/analytics";

interface Props {
  product_slug: string | null;
  product_id: string | null;
  amazon_url: string | null;
  iherb_url: string | null;
  app_url: string;
  source?: string;
}

export function SupplementBuyButtons({
  product_slug,
  product_id,
  amazon_url,
  iherb_url,
  app_url,
  source = "landing_supplement_detail",
}: Props) {
  const track = (url: string) => () => {
    trackBuyClick({ url, source, product_slug, product_id });
  };

  return (
    <div className="flex flex-wrap gap-3">
      {amazon_url && (
        <a
          href={amazon_url}
          rel="noopener sponsored"
          target="_blank"
          onClick={track(amazon_url)}
          className="px-4 py-2 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-[#00ffb3] transition-colors"
        >
          Buy on Amazon
        </a>
      )}
      {iherb_url && (
        <a
          href={iherb_url}
          rel="noopener sponsored"
          target="_blank"
          onClick={track(iherb_url)}
          className="px-4 py-2 rounded-lg border border-border text-text font-semibold text-sm hover:border-accent transition-colors"
        >
          Buy on iHerb
        </a>
      )}
      <a
        href={app_url}
        className="px-4 py-2 rounded-lg border border-border text-text font-semibold text-sm hover:border-accent transition-colors"
      >
        Open in app
      </a>
    </div>
  );
}
