/**
 * Pieces shared by /learn/<slug> and /care-ingredients/<slug>. Server
 * components; the pages hand them resolved data.
 */

import type { EvidenceLevel, LibraryStudy, Verdict } from "@/lib/shelf-library";
import { LEVEL_TEXT, VERDICT_TEXT } from "@/lib/shelf-library";

const LEVEL_SEGS: Record<EvidenceLevel, number> = { strong: 4, moderate: 3, limited: 2, weak: 1, none: 0 };

export function EvidenceMeter({ level }: { level: EvidenceLevel }) {
  const n = LEVEL_SEGS[level];
  const color = n >= 3 ? "var(--color-accent)" : n >= 1 ? "#ffc27a" : "var(--color-muted)";
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color }}>
      <span className="inline-grid grid-cols-4 gap-[3px]" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <i
            key={i}
            className="block w-3.5 h-[5px] rounded-sm"
            style={{ background: i < n ? color : "rgba(255,255,255,0.1)" }}
          />
        ))}
      </span>
      {LEVEL_TEXT[level]}
    </span>
  );
}

const VERDICT_TONE: Record<Verdict, string> = {
  supported: "text-accent border-accent/40",
  mixed: "text-[#ffc27a] border-[#ffc27a]/40",
  unproven: "text-muted border-border",
  false: "text-[#e0855c] border-[#e0855c]/45",
};

export function VerdictChip({ verdict }: { verdict: Verdict }) {
  return (
    <span className={`shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded border ${VERDICT_TONE[verdict]}`}>
      {VERDICT_TEXT[verdict]}
    </span>
  );
}

/** Blank-line paragraphs and **bold**. */
export function Prose({ text }: { text: string }) {
  return (
    <>
      {text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-text/85 mb-3 last:mb-0">
            {inline(p)}
          </p>
        ))}
    </>
  );
}

export function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-text">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function Claims({ title, rows }: { title: string; rows: { claim: string; verdict: Verdict; note: string }[] }) {
  if (!rows.length) return null;
  return (
    <section className="mb-10">
      <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-4">{title}</h2>
      <div className="rounded-2xl border border-border divide-y divide-border">
        {rows.map((c, i) => (
          <div key={i} className="p-4">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-[15px] font-semibold text-text">{c.claim}</h3>
              <VerdictChip verdict={c.verdict} />
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Bullets({ title, items, mark, tone }: { title: string; items?: string[]; mark: string; tone?: "warn" | "good" | "bad" }) {
  if (!items?.length) return null;
  const markColor = tone === "good" ? "text-accent" : tone === "bad" ? "text-[#e0855c]" : tone === "warn" ? "text-[#ffc27a]" : "text-muted";
  return (
    <section className={`mb-10 ${tone === "warn" ? "rounded-2xl border border-[#ffc27a]/30 bg-[#ffc27a]/[0.04] p-5" : ""}`}>
      <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-4">{title}</h2>
      <ul className="space-y-2.5">
        {items.map((s, i) => (
          <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-text/85">
            <span className={`font-mono text-xs mt-1 ${markColor}`} aria-hidden>
              {mark}
            </span>
            <span>{inline(s)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Studies({ studies }: { studies: LibraryStudy[] }) {
  if (!studies.length) return null;
  return (
    <section className="mb-10">
      <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-1">The studies</h2>
      <p className="text-xs text-muted mb-4">Every citation is checked against its PubMed record.</p>
      <ol className="space-y-4">
        {studies.map((s) => (
          <li key={s.pmid} className="rounded-xl border border-border p-4">
            <a
              href={`https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] font-semibold text-text hover:text-accent transition-colors"
            >
              {s.title} <span aria-hidden>↗</span>
            </a>
            <div className="mt-1 text-xs text-muted">
              {s.authors} · <em>{s.journal}</em> · {s.year} · {s.study_type}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text/80">{s.finding_summary}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
