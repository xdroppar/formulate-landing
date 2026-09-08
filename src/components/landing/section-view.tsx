"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * How far down the homepage a visitor actually got.
 *
 * WHY THIS IS ONE EVENT AND NOT TWELVE. The first version fired a
 * `home_section_view` per section as it came into view. Measured on a single
 * page load against the real API, that was 12 POSTs to /api/v1/events of which
 * **7 returned 202 and 7 returned 429** — the rate limiter dropped half of
 * them, from one visitor, on one scroll. An instrument that silently loses half
 * its readings is worse than no instrument, because the resulting drop-off
 * curve looks plausible and is wrong.
 *
 * The fix is not a bigger limit, it is noticing that the twelve events carried
 * one fact between them. Section depth is monotonic: a visitor who reached the
 * FAQ passed everything above it. So the deepest section reached is the whole
 * curve — with one reading per visitor you can still answer "what share got to
 * the comparison table", for every section, exactly as before.
 *
 * Sent on pagehide (and on the tab being hidden, which is how mobile Safari
 * usually ends a session) rather than on a timer, so a visitor who leaves
 * mid-scroll is still counted at the depth they reached.
 */

type Mark = { id: string; depth: number };

// Module scope so every marker on the page writes to one place. Reset by the
// reporter on mount, since a client-side navigation does not reload the module.
let deepest: Mark = { id: "", depth: 0 };

/** Invisible marker placed at the top of a section. */
export function SectionView({ id, depth }: { id: string; depth: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    // No IntersectionObserver (old browser, prerender): record nothing rather
    // than guess, so the data never contains invented views.
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (depth > deepest.depth) deepest = { id, depth };
          io.disconnect();
        }
      },
      // Half the marker's own height, not half the section's: a full section is
      // taller than the viewport on a phone and could never reach 50%.
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id, depth]);

  // A real box. A 0px element cannot satisfy a visibility threshold reliably,
  // and would report nothing while looking like it worked.
  return <div ref={ref} aria-hidden="true" className="h-px w-full" />;
}

/** Mount once per page. Sends the single depth reading when the visit ends. */
export function SectionDepthReporter({ total }: { total: number }) {
  useEffect(() => {
    deepest = { id: "", depth: 0 };
    let sent = false;

    const flush = () => {
      if (sent || !deepest.depth) return;
      sent = true;
      trackEvent("home_scroll_depth", {
        deepest_section: deepest.id,
        deepest_depth: deepest.depth,
        total_sections: total,
        // Pre-computed so a query does not have to know the section count that
        // was live on the day — this page has already been 18, 14, 13 and 10.
        pct: Math.round((deepest.depth / total) * 100),
      });
    };

    const onHidden = () => {
      if (document.visibilityState === "hidden") flush();
    };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onHidden);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onHidden);
      flush();
    };
  }, [total]);

  return null;
}
