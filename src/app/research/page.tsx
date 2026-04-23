import type { Metadata } from "next";
import Link from "next/link";
import {
  researchEntries,
  studiesByTopic,
  type MethodologyGrade,
} from "@/lib/research";

const BASE = "https://formulate-health.app";

const GRADE_TONE: Record<MethodologyGrade, string> = {
  A: "text-[#10b981] border-[#10b981]/40 bg-[#10b981]/10",
  B: "text-[#3b82f6] border-[#3b82f6]/40 bg-[#3b82f6]/10",
  C: "text-[#f59e0b] border-[#f59e0b]/40 bg-[#f59e0b]/10",
  D: "text-[#f97316] border-[#f97316]/40 bg-[#f97316]/10",
  F: "text-[#ef4444] border-[#ef4444]/40 bg-[#ef4444]/10",
};

export const metadata: Metadata = {
  title: `Cited Studies: Supplement Research Index — Formulate`,
  description: `${researchEntries.length} clinical studies cited across Formulate's guides and interaction pages — PubMed-linked, searchable by topic, reverse-indexed against the content that cites them.`,
  alternates: { canonical: `${BASE}/research` },
  openGraph: {
    title: `Supplement Research Index`,
    description: `Primary-source studies behind Formulate's evidence grades.`,
    type: "website",
    url: `${BASE}/research`,
  },
};

export default function ResearchIndex() {
  const groups = studiesByTopic();

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Supplement Research Index",
    description: `${researchEntries.length} clinical studies cited across Formulate.`,
    url: `${BASE}/research`,
    numberOfItems: researchEntries.length,
  };

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />

      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
          Cited Studies
        </h1>
        <p className="text-base text-muted leading-relaxed">
          Every evidence grade on Formulate traces back to primary research.
          This is the index of {researchEntries.length} clinical studies and
          meta-analyses cited across our guides and interaction pages — each
          linked to the PubMed article and cross-referenced against the
          content that cites it.
        </p>
      </header>

      {groups.map(({ topic, items }) => (
        <section key={topic} className="mb-10">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-xl font-bold text-text">{topic}</h2>
            <span className="text-xs text-muted">
              {items.length} {items.length === 1 ? "study" : "studies"}
            </span>
          </div>
          <ul className="divide-y divide-border border border-border rounded-xl overflow-hidden">
            {items.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/research/${s.slug}`}
                  className="block px-4 py-3 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-sm font-semibold text-text truncate max-w-full">
                      {s.authors} ({s.year})
                    </span>
                    <span className="text-xs text-muted italic">{s.journal}</span>
                    {s.methodology && (
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                          GRADE_TONE[s.methodology.grade]
                        }`}
                        title={`Methodology review: grade ${s.methodology.grade} (${s.methodology.overall}/100)`}
                      >
                        Grade {s.methodology.grade}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted mt-0.5 line-clamp-2">{s.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        New studies are added as Formulate&apos;s content expands. If you see
        a study missing that should be here, it&apos;s probably on the queue
        for the next content pass. For the full methodology behind evidence
        grades, see{" "}
        <Link href="/methodology" className="text-accent hover:underline">
          how we score supplements
        </Link>
        .
      </p>
    </main>
  );
}
