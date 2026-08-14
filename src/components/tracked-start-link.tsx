"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

interface Props {
  href?: string;
  /** Where on the page this CTA lives (hero, nav, app_page, …). */
  source: string;
  className?: string;
  children: ReactNode;
}

/**
 * A link into /start that records the click.
 *
 * The wizard's own funnel starts at `start_click`, but the two biggest doors
 * into /start — the homepage hero and the nav — were plain <Link>s with no
 * tracking. Over 30 days that read as 2 clicks against 23 arrivals at /start,
 * which looks like people teleporting in and hides which CTA actually works.
 *
 * The sibling of TrackedAppLink, and it exists for the same reason: an
 * untracked CTA is invisible, and the fix has to be a component rather than a
 * remembered onClick, or the next CTA someone adds is invisible too.
 *
 * `source` is what separates hero from nav from a guide's sticky bar in the
 * dashboard, so "which door do people use" is answerable.
 */
export function TrackedStartLink({ href = "/start", source, className, children }: Props) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackEvent("start_click", { source })}
    >
      {children}
    </Link>
  );
}
