"use client";

import { useState } from "react";
import type { Interaction } from "@/lib/interactions";
import { SEVERITY_META } from "@/lib/interactions";

export function InteractionCard({
  interaction,
  defaultOpen = false,
}: {
  interaction: Interaction;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const meta = SEVERITY_META[interaction.severity];

  return (
    <article
      className={`rounded-xl border ${meta.border} ${meta.bg} overflow-hidden`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-5 py-4 flex items-start gap-3 hover:bg-white/5 transition-colors"
        aria-expanded={open}
      >
        <span className="text-2xl leading-none pt-0.5" aria-hidden>
          {meta.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`text-xs font-semibold uppercase tracking-wider ${meta.color}`}>
              {meta.label}
            </span>
            <span className="text-xs text-muted uppercase tracking-wider">
              {interaction.interaction_type.replace(/_/g, " ")}
            </span>
          </div>
          <h3 className="text-base font-semibold text-text mb-1">
            <span className="capitalize">{interaction.substance_a}</span>
            <span className="text-muted mx-2">↔</span>
            <span className="capitalize">{interaction.substance_b}</span>
          </h3>
          <p className="text-sm text-muted">{interaction.summary}</p>
        </div>
        <span className="text-muted text-lg" aria-hidden>
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-white/5 space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
              What's happening
            </h4>
            <p className="text-sm text-text leading-relaxed">{interaction.details}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
              Recommendation
            </h4>
            <p className="text-sm text-text leading-relaxed">{interaction.recommendation}</p>
          </div>
          {interaction.timing_advice && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Timing
              </h4>
              <p className="text-sm text-text leading-relaxed">{interaction.timing_advice}</p>
            </div>
          )}
          {interaction.sources.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">
                Sources
              </h4>
              <ul className="text-xs text-muted space-y-0.5">
                {interaction.sources.map((src) => (
                  <li key={src}>— {src}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
