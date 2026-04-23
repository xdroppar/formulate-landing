import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  researchEntries,
  researchBySlug,
  guidesCitingStudy,
  type MethodologyGrade,
} from "@/lib/research";
import { ingredientBySlug } from "@/lib/encyclopedia";

const GRADE_TONE: Record<MethodologyGrade, { bg: string; border: string; text: string }> = {
  A: { bg: "rgba(16,185,129,0.12)", border: "#10b981", text: "#10b981" },
  B: { bg: "rgba(59,130,246,0.12)", border: "#3b82f6", text: "#3b82f6" },
  C: { bg: "rgba(245,158,11,0.12)", border: "#f59e0b", text: "#f59e0b" },
  D: { bg: "rgba(249,115,22,0.12)", border: "#f97316", text: "#f97316" },
  F: { bg: "rgba(239,68,68,0.12)", border: "#ef4444", text: "#ef4444" },
};

const FLAG_LABELS: Record<string, { label: string; tone: "strength" | "limit" }> = {
  "small-n": { label: "Small n", tone: "limit" },
  "short-duration": { label: "Short duration", tone: "limit" },
  "surrogate-endpoint": { label: "Surrogate endpoint", tone: "limit" },
  "industry-funded": { label: "Industry-funded", tone: "limit" },
  "industry-adjacent": { label: "Industry-adjacent", tone: "limit" },
  "unreplicated": { label: "Unreplicated", tone: "limit" },
  "population-mismatch": { label: "Population mismatch", tone: "limit" },
  "dose-mismatch": { label: "Dose mismatch", tone: "limit" },
  "post-hoc-subgroup": { label: "Post-hoc subgroup", tone: "limit" },
  "no-active-comparator": { label: "No active comparator", tone: "limit" },
  "animal-study": { label: "Animal study", tone: "limit" },
  "single-center": { label: "Single-center", tone: "limit" },
  "large-n": { label: "Large n", tone: "strength" },
  "multi-center": { label: "Multi-center", tone: "strength" },
  "landmark-replicated": { label: "Landmark replicated", tone: "strength" },
  "independent-funded": { label: "Independent-funded", tone: "strength" },
  "pre-registered": { label: "Pre-registered", tone: "strength" },
  "real-world-outcome": { label: "Real-world outcome", tone: "strength" },
  "long-duration": { label: "Long duration", tone: "strength" },
  "active-comparator": { label: "Active comparator", tone: "strength" },
};

const BASE = "https://formulate-health.app";

export async function generateStaticParams() {
  return researchEntries.map((r) => ({ slug: r.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const s = researchBySlug(slug);
  if (!s) return { title: "Study not found" };
  const title = `${s.authors} (${s.year}): ${s.title}`;
  const description = (s.summary ?? `${s.authors} (${s.year}) — ${s.journal}. ${s.title}`).slice(0, 160);
  const url = `${BASE}/research/${slug}`;
  return {
    title: `${title.slice(0, 70)} — Formulate`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${s.authors} (${s.year}): ${s.title.slice(0, 100)}`,
      description,
      type: "article",
      url,
    },
  };
}

export default async function ResearchPage({ params }: { params: Params }) {
  const { slug } = await params;
  const s = researchBySlug(slug);
  if (!s) notFound();

  const citingGuides = guidesCitingStudy(s.id);
  const url = `${BASE}/research/${slug}`;

  // Schema.org ScholarlyArticle JSON-LD — signals to Google that this is
  // citation metadata about a research paper, not original content.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: s.title,
    author: s.authors,
    datePublished: String(s.year),
    publisher: s.journal,
    isPartOf: { "@type": "Periodical", name: s.journal },
    url: s.url,
    mainEntityOfPage: url,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Research", item: `${BASE}/research` },
      { "@type": "ListItem", position: 3, name: `${s.authors} (${s.year})`, item: url },
    ],
  };

  return (
    <main id="main-content" className="max-w-3xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/research" className="hover:text-text transition-colors">
          Research
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">
          {s.authors} ({s.year})
        </span>
      </nav>

      <header className="mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-3">
          Primary Research · {s.year}
        </p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-text tracking-tight mb-3 leading-tight">
          {s.title}
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          <span className="text-text font-semibold">{s.authors}</span> ·{" "}
          <em>{s.journal}</em>, {s.year}
        </p>
      </header>

      {s.summary && (
        <section className="mb-8 rounded-xl border border-border bg-white/[0.02] p-5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-2">
            Key finding
          </p>
          <p className="text-base text-text leading-relaxed">{s.summary}</p>
        </section>
      )}

      {s.methodology && (() => {
        const tone = GRADE_TONE[s.methodology.grade];
        const flags = s.methodology.flags.map((f) => ({
          key: f,
          ...FLAG_LABELS[f],
        }));
        return (
          <section className="mb-10 rounded-xl border border-border bg-white/[0.02] p-5">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="flex-shrink-0 rounded-lg border px-5 py-3 text-center"
                style={{ background: tone.bg, borderColor: tone.border }}
              >
                <p
                  className="text-4xl font-black leading-none"
                  style={{ color: tone.text }}
                >
                  {s.methodology.grade}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-muted mt-1">
                  {s.methodology.overall}/100
                </p>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent mb-1">
                  Methodology review
                </p>
                <p className="text-sm text-text font-semibold">
                  Formulate&apos;s editorial read of the paper&apos;s design,
                  scope, and limitations.
                </p>
              </div>
            </div>
            {flags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {flags.map((f) =>
                  f.label ? (
                    <span
                      key={f.key}
                      className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded ${
                        f.tone === "strength"
                          ? "bg-[rgba(16,185,129,0.10)] text-[#10b981] border border-[rgba(16,185,129,0.30)]"
                          : "bg-[rgba(249,115,22,0.10)] text-[#f97316] border border-[rgba(249,115,22,0.30)]"
                      }`}
                    >
                      {f.label}
                    </span>
                  ) : null,
                )}
              </div>
            )}
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-2">
              Critique
            </p>
            <p className="text-sm text-text leading-relaxed whitespace-pre-line mb-5">
              {s.methodology.critique}
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-2">
              What would be more convincing
            </p>
            <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
              {s.methodology.ideal_design}
            </p>
            <p className="text-[10px] text-muted mt-4 pt-3 border-t border-border">
              Reviewed {s.methodology.reviewed_at} · Opinion based on
              verifiable facts in the published paper.
            </p>
          </section>
        );
      })()}

      {s.supplementId && (() => {
        const ing = ingredientBySlug(s.supplementId);
        if (!ing) return null;
        return (
          <section className="mb-8">
            <Link
              href={`/ingredients/${ing.slug}`}
              className="flex items-center justify-between rounded-lg border border-border bg-card/20 px-4 py-3 hover:border-accent transition-colors"
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-accent mb-1">
                  About the supplement
                </p>
                <p className="text-sm font-semibold text-text">{ing.name}</p>
                <p className="text-xs text-muted mt-0.5">
                  Dose · mechanism · evidence grade · safety →
                </p>
              </div>
            </Link>
          </section>
        );
      })()}

      <section className="mb-10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
          Read the paper
        </h2>
        <a
          href={s.url}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-white/[0.03] hover:border-accent transition-colors text-sm text-text"
        >
          {s.url.includes("pubmed") ? "Open on PubMed" : "Open source"}{" "}
          <span aria-hidden>→</span>
        </a>
        <p className="text-xs text-muted mt-3 leading-relaxed break-all">
          {s.url}
        </p>
      </section>

      {citingGuides.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-text mb-3">
            Cited in {citingGuides.length} {citingGuides.length === 1 ? "guide" : "guides"}
          </h2>
          <ul className="space-y-2">
            {citingGuides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="block rounded-lg border border-border bg-white/[0.02] px-4 py-3 hover:border-accent transition-colors"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-accent mb-1">
                    {g.categoryLabel}
                  </p>
                  <p className="text-sm font-semibold text-text">{g.title}</p>
                  <p className="text-xs text-muted mt-0.5 line-clamp-2">{g.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 rounded-2xl border border-border bg-card/30 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
          About this page
        </h2>
        <p className="text-sm text-text leading-relaxed mb-3">
          Formulate maintains a registry of clinical studies cited across
          its guides and evidence grades. This page links the study metadata
          to the content that cites it — one canonical entry per landmark
          study.
        </p>
        <p className="text-xs text-muted">
          The full citation chain is public so readers can verify claims
          without hunting through individual guide pages.{" "}
          <Link href="/research" className="text-accent hover:underline">
            Browse all cited studies →
          </Link>
        </p>
      </section>

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">Note:</strong> Study summaries on this
        page are editorial interpretations of the research. Always consult
        the primary source before drawing clinical conclusions.
      </p>
    </main>
  );
}
