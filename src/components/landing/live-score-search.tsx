"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

export type ScoreItem = {
  slug: string;
  name: string;
  brand: string;
  score: number;
  color: string;
};

const EXAMPLES = ["magnesium", "creatine", "vitamin d", "omega-3", "ashwagandha", "zinc"];

/**
 * Interactive "type a supplement → see its real score" widget. Gives a cold
 * visitor the product's core magic instantly, on-page, before they commit to
 * clicking in — the highest-leverage "want to see more" trigger. Results link
 * into the app catalog (UTM + web_app_cta_click tracked). The index is a
 * trimmed, build-time list so the full 2MB catalog never ships to the client.
 */
export function LiveScoreSearch({ index, appUrl }: { index: ScoreItem[]; appUrl: string }) {
  const [q, setQ] = useState("");

  const term = q.trim().toLowerCase();
  const results = useMemo(() => {
    if (!term) return [];
    return index
      .filter((p) => (p.name + " " + p.brand).toLowerCase().includes(term))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [term, index]);

  return (
    <div className="max-w-[640px] mx-auto">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Type a supplement — magnesium, creatine, vitamin D…"
        aria-label="Search a supplement to see its score"
        className="w-full px-5 py-4 rounded-xl bg-surface border border-border text-text text-[15px] placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
      />

      {!term && (
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setQ(ex)}
              className="px-3 py-1.5 rounded-full bg-surface border border-border text-xs font-medium text-muted hover:border-accent hover:text-accent transition-all"
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {term && (
        <div className="mt-3 rounded-xl border border-border bg-surface overflow-hidden divide-y divide-border text-left">
          {results.length === 0 ? (
            <a
              href={`${appUrl}/catalog?utm_source=landing&utm_medium=hero_search`}
              onClick={() => trackEvent("web_app_cta_click", { source: "hero_score_search_empty" })}
              className="flex items-center justify-between px-5 py-4 text-sm text-muted hover:text-accent transition-colors"
            >
              <span>No match for &ldquo;{q}&rdquo; — browse the full catalog</span>
              <span aria-hidden="true">→</span>
            </a>
          ) : (
            results.map((p) => (
              <a
                key={p.slug}
                href={`${appUrl}/catalog/${p.slug}?utm_source=landing&utm_medium=hero_search`}
                onClick={() => trackEvent("web_app_cta_click", { source: "hero_score_search" })}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-surface2 transition-colors group"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-black border-2 flex-shrink-0"
                  style={{ color: p.color, borderColor: p.color }}
                >
                  {p.score}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-text truncate">{p.name}</div>
                  <div className="text-xs text-muted truncate">{p.brand}</div>
                </div>
                <span className="text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  See why →
                </span>
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
}
