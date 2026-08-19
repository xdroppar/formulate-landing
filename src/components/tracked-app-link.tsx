"use client";

import type { ReactNode } from "react";

interface Props {
  href: string;
  /** Where on the page this CTA lives (hero, pricing, footer, …). */
  source: string;
  className?: string;
  children: ReactNode;
}

/**
 * A link into the web app that carries an explicit CTA label.
 *
 * The click itself is recorded by AppLinkTracker, which is delegated at the
 * shell and catches every app link on the site. This component no longer fires
 * its own event — two listeners for one click would double-count the homepage
 * against the 157 links that only the delegate sees. What it still does is
 * name the CTA: `data-cta-source` is what separates hero from pricing from
 * footer, where an unlabelled link falls back to its utm_medium.
 */
export function TrackedAppLink({ href, source, className, children }: Props) {
  return (
    <a
      href={href}
      className={className}
      data-cta-source={source}
    >
      {children}
    </a>
  );
}
