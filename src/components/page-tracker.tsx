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
  // Guards page_leave to exactly ONE per page_view. Two independent paths can
  // close a page out — the route-change effect below, and the pagehide /
  // visibilitychange flush — and a browser fires BOTH pagehide and
  // visibilitychange on the same unload, so an unguarded flush sent two
  // page_leave rows ~1ms apart with dwell differing by 1ms. Measured
  // 2026-08-11: a walk producing 4 page_views recorded 5 page_leaves.
  // visibilitychange also fires on every tab switch or minimise, which would
  // otherwise accumulate leaves against a single view forever.
  const sentLeaveRef = useRef(false);

  // Init PostHog once, sharing our anon_id as its distinct_id.
  useEffect(() => {
    initPostHog(getAnonId());
  }, []);

  // Route change: close out the previous page, open the new one.
  useEffect(() => {
    if (typeof window === "undefined" || !pathname) return;
    const now =
      typeof performance !== "undefined" ? performance.now() : Date.now();

    if (pathRef.current && pathRef.current !== pathname && !sentLeaveRef.current) {
      trackPageLeave(pathRef.current, now - startRef.current);
    }
    pathRef.current = pathname;
    startRef.current = now;
    sentLeaveRef.current = false;

    trackPageView(pathname);
    phCapture("$pageview", { $current_url: window.location.href });
  }, [pathname]);

  // Tab close / hide: flush a page_leave for the current page. keepalive fetch
  // in trackPageLeave survives unload.
  useEffect(() => {
    const flush = () => {
      if (!pathRef.current || sentLeaveRef.current) return;
      sentLeaveRef.current = true;
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
