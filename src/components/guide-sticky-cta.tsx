"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { withUtm } from "@/lib/app-url";

interface Props {
  slug: string;
  catalogLink?: string;
}

const APP_URL = "https://app.formulate-health.app";
const DISMISS_KEY = "formulate.guide_cta_dismissed";

/**
 * Sticky bottom bar on guide articles. Guides are 400+ lines so the CTA at
 * the end of the article is invisible to anyone who doesn't read to the
 * bottom. This bar stays pinned while reading, fires analytics on tap,
 * and can be dismissed (persisted in localStorage so we don't nag return
 * visitors).
 *
 * Appears after a small scroll threshold so it doesn't cover the article
 * header on load.
 */
export function GuideStickyCTA({ slug, catalogLink }: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Check dismissed state on mount
  useEffect(() => {
    try {
      if (window.localStorage.getItem(DISMISS_KEY) === "1") {
        setDismissed(true);
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
    trackEvent("catalog_click", {
      source: `guide_sticky:${slug}`,
    });
  };

  const handleDismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
    trackEvent("guide_sticky_dismiss", { guide: slug });
  };

  if (dismissed || !visible) return null;

  const href = withUtm(catalogLink || `${APP_URL}/catalog`, {
    source: "guide",
    campaign: "guide_cta_sticky",
    content: slug,
  });

  return (
    <div
      role="region"
      aria-label="Browse Formulate catalog"
      style={{
        animation: "sticky-cta-slide-up 280ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-bg/95 backdrop-blur-md shadow-[0_-8px_32px_rgba(0,0,0,0.3)]"
    >
      <div className="max-w-[900px] mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-text truncate">
            See full scores in Formulate
          </div>
          <div className="text-xs text-muted truncate">
            Free · No account required · 230+ products scored
          </div>
        </div>
        <a
          href={href}
          onClick={handleClick}
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
        >
          Browse Scores
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
        </a>
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
