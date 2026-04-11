"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

interface Props {
  href: string;
  source: string;
  className?: string;
  children: ReactNode;
}

/**
 * Client-side wrapper around next/link that fires a `download_click` event
 * with a `source` property so we can tell hero vs article-cta vs bottom-cta
 * downloads apart in the dashboard.
 */
export function TrackedDownloadLink({ href, source, className, children }: Props) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackEvent("download_click", { source })}
    >
      {children}
    </Link>
  );
}
