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
import {
  FLAG_EDUCATION,
  READING_PRIMER,
  CONFIDENCE_PALETTE,
  gradeToConfidence,
  type FlagEducation,
} from "@/lib/research-education";
import { ReadingProgressBar } from "@/components/reading-progress-bar";

const GRADE_TONE: Record<MethodologyGrade, { bg: string; border: string; text: string }> = {
  A: { bg: "rgba(16,185,129,0.12)", border: "#10b981", text: "#10b981" },
  B: { bg: "rgba(59,130,246,0.12)", border: "#3b82f6", text: "#3b82f6" },
  C: { bg: "rgba(245,158,11,0.12)", border: "#f59e0b", text: "#f59e0b" },
  D: { bg: "rgba(249,115,22,0.12)", border: "#f97316", text: "#f97316" },
  F: { bg: "rgba(239,68,68,0.12)", border: "#ef4444", text: "#ef4444" },
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
      <ReadingProgressBar />
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
        const m = s.methodology;
        const tone = GRADE_TONE[m.grade];
        const conf = gradeToConfidence(m.grade);
        const pal = CONFIDENCE_PALETTE[conf.tone];
        const positive = m.flags.filter((f) => FLAG_EDUCATION[f]?.kind === "pos");
        const negative = m.flags.filter((f) => FLAG_EDUCATION[f]?.kind === "neg");

        return (
          <>
            {/* Confidence banner — plain-English translation of the grade */}
            <section
              className="mb-6 rounded-xl border p-5 flex items-center gap-4"
              style={{ background: pal.bg, borderColor: pal.border }}
            >
              <div
                className="flex-shrink-0 rounded-lg border px-5 py-3 text-center"
                style={{ background: tone.bg, borderColor: tone.border }}
              >
                <p
                  className="text-4xl font-black leading-none"
                  style={{ color: tone.text }}
                >
                  {m.grade}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-muted mt-1">
                  {m.overall}/100
                </p>
              </div>
              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-1"
                  style={{ color: pal.color }}
                >
                  {conf.label}
                </p>
                <p className="text-sm text-text leading-relaxed">
                  {conf.description}
                </p>
              </div>
            </section>

            {/* Strengths + limitations summary */}
            <section className="mb-6 grid md:grid-cols-2 gap-3">
              <FlagColumn title="Strengths" kind="pos" flags={positive} />
              <FlagColumn title="Limitations" kind="neg" flags={negative} />
            </section>

            {/* Critique + ideal design */}
            <section className="mb-8 rounded-xl border border-border bg-white/[0.02] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-2">
                Critique
              </p>
              <p className="text-sm text-text leading-relaxed whitespace-pre-line mb-5">
                {m.critique}
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-2">
                What would be more convincing
              </p>
              <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
                {m.ideal_design}
              </p>
              <p className="text-[10px] text-muted mt-4 pt-3 border-t border-border">
                Reviewed {m.reviewed_at} · Opinion based on verifiable facts
                in the published paper.
              </p>
            </section>

            {/* Per-flag deep dive — the "teach users to read studies" layer */}
            {m.flags.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-bold text-text mb-1">
                  What these flags mean for you
                </h2>
                <p className="text-sm text-muted mb-4 leading-relaxed">
                  Each flag on this study comes with a plain-English breakdown
                  of why it matters and how it should change the confidence
                  you place in the result.
                </p>
                <div className="space-y-3">
                  {m.flags.map((flag) => {
                    const info = FLAG_EDUCATION[flag];
                    if (!info) return null;
                    return <FlagExplainer key={flag} info={info} />;
                  })}
                </div>
              </section>
            )}
          </>
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

      {/* Generic reading primer — shown on every study, even unreviewed ones.
          This is the core educational payload: one visitor learning to
          read research is worth more than a flashier methodology section. */}
      <section className="mb-10 rounded-2xl border border-border bg-white/[0.02] p-6">
        <h2 className="text-xl font-bold text-text mb-1">
          {READING_PRIMER.title}
        </h2>
        <p className="text-sm text-muted mb-5 leading-relaxed">
          The same questions worth asking about any research paper, not just
          this one. Worth a minute even if you trust the grade.
        </p>
        <div className="space-y-4">
          {READING_PRIMER.points.map((p) => (
            <div key={p.heading}>
              <p className="text-sm font-bold text-text mb-1">{p.heading}</p>
              <p className="text-sm text-muted leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

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

/** Two-column summary: positive flags (strengths) and negative flags
 *  (limitations). Shown above the detailed critique. */
function FlagColumn({
  title,
  kind,
  flags,
}: {
  title: string;
  kind: "pos" | "neg";
  flags: string[];
}) {
  const color = kind === "pos" ? "#10b981" : "#f59e0b";
  const bg = kind === "pos" ? "rgba(16,185,129,0.06)" : "rgba(245,158,11,0.06)";
  const border =
    kind === "pos" ? "rgba(16,185,129,0.30)" : "rgba(245,158,11,0.30)";
  return (
    <div
      className="rounded-xl border p-4"
      style={{ background: bg, borderColor: border }}
    >
      <p
        className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-3"
        style={{ color }}
      >
        {title}
      </p>
      {flags.length === 0 ? (
        <p className="text-xs text-muted italic">
          {kind === "pos"
            ? "No notable design strengths identified."
            : "No major methodological limitations flagged."}
        </p>
      ) : (
        <ul className="space-y-1.5">
          {flags.map((f) => {
            const info = FLAG_EDUCATION[f];
            if (!info) return null;
            return (
              <li key={f} className="text-sm text-text flex gap-2">
                <span style={{ color }}>{kind === "pos" ? "✓" : "⚠"}</span>
                {info.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/** Per-flag deep-dive block. Teaches users what the flag means, why it
 *  matters, and how to read around it — the educational core of the page. */
function FlagExplainer({ info }: { info: FlagEducation }) {
  const color = info.kind === "pos" ? "#10b981" : "#f59e0b";
  return (
    <div className="rounded-xl border border-border bg-white/[0.02] p-5">
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold"
          style={{
            color,
            background: `${color}1A`,
            border: `1px solid ${color}55`,
          }}
        >
          {info.kind === "pos" ? "✓" : "⚠"}
        </span>
        <p className="text-sm font-extrabold text-text">{info.label}</p>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-1">
            What it means
          </p>
          <p className="text-sm text-text leading-relaxed">
            {info.plainLanguage}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-1">
            Why it matters
          </p>
          <p className="text-sm text-text leading-relaxed">
            {info.whyItMatters}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted mb-1">
            How to read around it
          </p>
          <p className="text-sm text-text leading-relaxed">
            {info.howToInterpret}
          </p>
        </div>
      </div>
    </div>
  );
}
