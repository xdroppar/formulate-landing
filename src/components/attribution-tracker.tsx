"use client";

import { useEffect } from "react";
import { captureFirstTouch, trackEvent } from "@/lib/analytics";

/**
 * Mount once in the root layout. On first arrival of a new visitor, captures
 * utm_* / gclid / fbclid / referrer into localStorage and fires a `visit_start`
 * event. Subsequent visits are no-ops.
 *
 * Renders nothing.
 */
export function AttributionTracker() {
  useEffect(() => {
    const firstVisit = captureFirstTouch();
    if (firstVisit) {
      trackEvent("visit_start", {
        landing_path:
          typeof window !== "undefined" ? window.location.pathname : null,
      });
    }
  }, []);

  return null;
}
