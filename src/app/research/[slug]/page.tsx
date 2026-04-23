import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  researchEntries,
  researchBySlug,
  guidesCitingStudy,
} from "@/lib/research";

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
