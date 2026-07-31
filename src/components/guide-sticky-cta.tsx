"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface Props {
  slug: string;
}

// Timestamped rather than a permanent "1": the old key never expired, so a
// single dismiss on any one guide hid the bar on every guide forever.
const DISMISS_KEY = "formulate.guide_cta_dismissed_at";
const DISMISS_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Sticky bottom bar on guide articles. Guides are 400+ lines so the CTA at
 * the end of the article is invisible to anyone who doesn't read to the
 * bottom. This bar stays pinned while reading, fires analytics on tap,
 * and can be dismissed for a week.
 *
 * Points at /start (the landing-side goal quiz) rather than the app catalog.
 * The quiz is the only route out of a guide that ends in an account, and it
 * stays on this domain — so the click costs no cross-domain hop and the
 * session stays stitched.
 *
 * Appears after a small scroll threshold so it doesn't cover the article
 * header on load.
 */
export function GuideStickyCTA({ slug }: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Check dismissed state on mount; clear it once it has aged out.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DISMISS_KEY);
      if (!raw) return;
      const at = Number(raw);
      if (Number.isFinite(at) && Date.now() - at < DISMISS_TTL_MS) {
        setDismissed(true);
      } else {
        window.localStorage.removeItem(DISMISS_KEY);
      }
    } catch {
      // ignore
    }
  }, []);

  // Show after 300px scroll — lets the reader see the article title first
  useEffect(() => {
    if (dismissed) return;
    const onScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  const handleClick = () => {
    trackEvent("start_click", {
      source: `guide_sticky:${slug}`,
    });
  };

  const handleDismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      // ignore
    }
    trackEvent("guide_sticky_dismiss", { guide: slug });
  };

  if (dismissed || !visible) return null;

  return (
    <div
      role="region"
      aria-label="Build your supplement stack"
      style={{
        animation: "sticky-cta-slide-up 280ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-bg/95 backdrop-blur-md shadow-[0_-8px_32px_rgba(0,0,0,0.3)]"
    >
      <div className="max-w-[900px] mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-text truncate">
            Turn this into your stack
          </div>
          <div className="text-xs text-muted truncate">
            2 questions · every ingredient graded on research · free
          </div>
        </div>
        <Link
          href={`/start?from=guide&guide=${slug}`}
          onClick={handleClick}
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
        >
          Build my stack
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="shrink-0 w-8 h-8 rounded-lg text-muted hover:text-text hover:bg-surface transition-colors flex items-center justify-center text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}
