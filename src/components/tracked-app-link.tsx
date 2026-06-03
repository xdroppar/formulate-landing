"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

interface Props {
  href: string;
  /** Where on the page this CTA lives (hero, pricing, footer, …). */
  source: string;
  className?: string;
  children: ReactNode;
}

/**
 * Client-side wrapper around an external link into the web app that fires a
 * `web_app_cta_click` event on click. This is the exact event name the API's
 * `/events/journey` endpoint counts as a CTA click — without it, the funnel
 * reads 0 clicks even when people click through. `source` distinguishes
 * hero vs pricing vs footer in the dashboard.
 */
export function TrackedAppLink({ href, source, className, children }: Props) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => trackEvent("web_app_cta_click", { source })}
    >
      {children}
    </a>
  );
}
