"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initPostHog, phCapture } from "@/lib/posthog";
import { getAnonId, trackPageView, trackPageLeave } from "@/lib/analytics";

/**
 * Mount once in the root layout. Two jobs:
 *   1. Owned stream — fire page_view on every route change and page_leave
 *      (with dwell ms) when the visitor moves on or closes the tab. This is
 *      what makes entry/exit pages, paths, and time-on-page queryable from
 *      our own /events data.
 *   2. PostHog — init (guarded; no-op without a key) bootstrapped from the same
 *      anon_id, and capture $pageview per SPA route change.
 *
 * Renders nothing.
 */
export function PageTracker() {
  const pathname = usePathname();
  const startRef = useRef<number>(0);
  const pathRef = useRef<string>("");

  // Init PostHog once, sharing our anon_id as its distinct_id.
  useEffect(() => {
    initPostHog(getAnonId());
  }, []);

  // Route change: close out the previous page, open the new one.
  useEffect(() => {
    if (typeof window === "undefined" || !pathname) return;
    const now =
      typeof performance !== "undefined" ? performance.now() : Date.now();

    if (pathRef.current && pathRef.current !== pathname) {
      trackPageLeave(pathRef.current, now - startRef.current);
    }
    pathRef.current = pathname;
    startRef.current = now;

    trackPageView(pathname);
    phCapture("$pageview", { $current_url: window.location.href });
  }, [pathname]);

  // Tab close / hide: flush a page_leave for the current page. keepalive fetch
  // in trackPageLeave survives unload.
  useEffect(() => {
    const flush = () => {
      if (!pathRef.current) return;
      const now =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      trackPageLeave(pathRef.current, now - startRef.current);
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
    };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}
