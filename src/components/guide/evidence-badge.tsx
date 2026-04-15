"use client";

/**
 * Inline evidence strength indicator — three dots showing how strong
 * the clinical evidence is. When supporting studies are provided, the
 * badge becomes clickable and opens a popover listing each study with
 * a link to the original paper (PubMed, DOI, or publisher URL).
 *
 * This is the key E-E-A-T signal: readers can verify every evidence
 * claim against the source, and Google treats linked citations as a
 * credibility indicator.
 */

import { useState, useRef, useEffect } from "react";
import { getStudies, type Study } from "@/lib/guide-evidence";

type EvidenceLevel = "strong" | "moderate" | "emerging" | "mixed";

interface EvidenceBadgeProps {
  level: EvidenceLevel;
  label?: string;
  /** Inline study list for one-off citations not worth adding to the registry */
  studies?: Study[];
  /** Single study id from src/lib/guide-evidence.ts */
  studiesId?: string;
  /** Multiple study ids from the registry */
  studiesIds?: string[];
}

const config: Record<EvidenceLevel, { dots: number; color: string; text: string }> = {
  strong:   { dots: 3, color: "#10B981", text: "Strong evidence" },
  moderate: { dots: 2, color: "#F59E0B", text: "Moderate evidence" },
  emerging: { dots: 1, color: "#6B7280", text: "Emerging evidence" },
  mixed:    { dots: 2, color: "#8B5CF6", text: "Mixed evidence" },
};

function resolveStudies(props: EvidenceBadgeProps): Study[] {
  const out: Study[] = [];
  if (props.studiesId) {
    const ids = [props.studiesId];
    out.push(...getStudies(ids));
  }
  if (props.studiesIds && props.studiesIds.length > 0) {
    out.push(...getStudies(props.studiesIds));
  }
  if (props.studies && props.studies.length > 0) {
    out.push(...props.studies);
  }
  // Dedup by URL in case a caller passes the same study twice
  const seen = new Set<string>();
  return out.filter((s) => {
    if (seen.has(s.url)) return false;
    seen.add(s.url);
    return true;
  });
}

export function EvidenceBadge(props: EvidenceBadgeProps) {
  const { level, label } = props;
  const c = config[level];
  const dots = [1, 2, 3];
  const resolved = resolveStudies(props);
  const hasStudies = resolved.length > 0;

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  // Non-interactive variant — original behavior when no studies supplied
  if (!hasStudies) {
    return (
      <span className="not-prose inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-surface border border-border text-[11px] font-medium whitespace-nowrap">
        <span className="inline-flex gap-[3px]">
          {dots.map((d) => (
            <span
              key={d}
              className="w-[5px] h-[5px] rounded-full"
              style={{
                backgroundColor: d <= c.dots ? c.color : "rgba(100,116,139,0.2)",
              }}
            />
          ))}
        </span>
        <span style={{ color: c.color }}>{label || c.text}</span>
      </span>
    );
  }

  // Interactive variant — clickable, opens a popover with studies
  return (
    <span ref={containerRef} className="not-prose relative inline-block align-middle">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`${c.text} — view ${resolved.length} supporting ${resolved.length === 1 ? "study" : "studies"}`}
        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-surface border border-border text-[11px] font-medium whitespace-nowrap hover:border-accent/40 transition-colors cursor-pointer"
      >
        <span className="inline-flex gap-[3px]">
          {dots.map((d) => (
            <span
              key={d}
              className="w-[5px] h-[5px] rounded-full"
              style={{
                backgroundColor: d <= c.dots ? c.color : "rgba(100,116,139,0.2)",
              }}
            />
          ))}
        </span>
        <span style={{ color: c.color }}>{label || c.text}</span>
        <span className="text-muted/70 ml-0.5">
          {resolved.length} {resolved.length === 1 ? "study" : "studies"}
        </span>
        <svg
          className={`w-2.5 h-2.5 text-muted/60 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <span
          role="dialog"
          aria-label="Supporting studies"
          className="absolute z-50 mt-2 left-0 w-[min(420px,calc(100vw-32px))] p-4 rounded-xl bg-bg border border-border shadow-2xl text-left"
          style={{ fontSize: "13px", lineHeight: 1.5 }}
        >
          <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-muted mb-3">
            Supporting {resolved.length === 1 ? "study" : "studies"}
          </div>
          <ul className="space-y-3">
            {resolved.map((s) => (
              <li key={s.url} className="border-l-2 border-border pl-3">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="block group"
                >
                  <div className="text-[11px] text-muted/80 mb-0.5">
                    {s.authors} ({s.year}) · <em>{s.journal}</em>
                  </div>
                  <div className="text-[13px] font-semibold text-text group-hover:text-accent transition-colors leading-snug">
                    {s.title}
                  </div>
                  {s.summary && (
                    <div className="text-[12px] text-muted mt-1 leading-relaxed">
                      {s.summary}
                    </div>
                  )}
                  <div className="text-[11px] text-accent/80 mt-1 group-hover:underline">
                    View on PubMed &rarr;
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </span>
      )}
    </span>
  );
}
