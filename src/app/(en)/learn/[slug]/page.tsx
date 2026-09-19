import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  LIBRARY_REVIEWED,
  PILLAR_META,
  isThinLibraryEntry,
  shelfBySlug,
  shelfEntries,
  slugOf,
} from "@/lib/shelf-library";
import { EvidenceMeter, Bullets, Claims, Prose, Studies } from "@/components/library-bits";
import { AppCtaCard } from "@/components/app-cta-card";
import { ReadingProgressBar } from "@/components/reading-progress-bar";

const BASE = "https://formulate-health.app";

export async function generateStaticParams() {
  return shelfEntries.map((e) => ({ slug: slugOf(e.id) }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const e = shelfBySlug(slug);
  if (!e) return { title: "Not found" };
  const url = `${BASE}/learn/${slug}`;
  const title = `${e.name}: Does It Work? Evidence, What to Look For, Safety`;
  return {
    title,
    description: e.summary.slice(0, 160),
    alternates: { canonical: url },
    openGraph: { title, description: e.summary, type: "article", url },
    robots: isThinLibraryEntry(e) ? { index: false, follow: true } : undefined,
  };
}

export default async function LearnEntryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const e = shelfBySlug(slug);
  if (!e) notFound();

  const url = `${BASE}/learn/${slug}`;
  const pillar = PILLAR_META[e.pillar];
  const related = e.related
    .map((r) => shelfEntries.find((x) => x.id === r))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${e.name}: what the evidence says`,
    headline: `${e.name}: Does It Work? Evidence, What to Look For, Safety`,
    description: e.summary,
    url,
    mainEntityOfPage: url,
    inLanguage: "en-US",
    dateModified: LIBRARY_REVIEWED,
    lastReviewed: LIBRARY_REVIEWED,
    author: { "@type": "Organization", name: "Formulate Team", url: BASE },
    publisher: { "@type": "Organization", name: "Formulate", url: BASE },
    citation: e.studies.map((s) => ({
      "@type": "ScholarlyArticle",
      headline: s.title,
      author: s.authors,
      datePublished: String(s.year),
      publisher: s.journal,
      sameAs: `https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/`,
    })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Products, explained", item: `${BASE}/learn` },
      { "@type": "ListItem", position: 3, name: e.name, item: url },
    ],
  };

  return (
    <main id="main-content" className="max-w-[1100px] mx-auto px-6 md:px-8 pt-28 pb-20">
      <ReadingProgressBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="text-xs text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/learn" className="hover:text-accent">Products, explained</Link>
        <span className="mx-2">/</span>
        <Link href={`/learn#${e.pillar}`} className="hover:text-accent">{pillar.label}</Link>
      </nav>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-10">
        <article className="min-w-0 max-w-[760px]">
          <header className="mb-8">
            <p className="fm-eyebrow text-accent mb-3">{pillar.label} · product guide</p>
            <h1 className="fm-display text-[clamp(28px,4vw,var(--text-h-argument))] text-text mb-4">
              {e.name}: does it work?
            </h1>
            <p className="text-base text-muted leading-relaxed mb-4">{e.summary}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <EvidenceMeter level={e.evidence.level} />
              <span className="text-xs text-muted">
                Reviewed{" "}
                {new Date(LIBRARY_REVIEWED).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
            </div>
          </header>

          <section className="mb-10">
            <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-4">What it is</h2>
            <Prose text={e.what} />
          </section>

          <section className="mb-10 rounded-2xl border border-border bg-white/[0.02] p-5">
            <div className="flex items-center justify-between gap-4 mb-3">
              <h2 className="fm-display text-[length:var(--text-h-section)] text-text">How strong is the evidence?</h2>
              <EvidenceMeter level={e.evidence.level} />
            </div>
            <Prose text={e.evidence.summary} />
          </section>

          <Claims title="The claims you'll see, checked" rows={e.claims} />
          <Bullets title="What to look for" items={e.look_for} mark="✓" tone="good" />
          <Bullets title="What to skip" items={e.skip} mark="×" tone="bad" />
          <Bullets title="How to use it" items={e.how_to_use} mark="→" />
          <Bullets title="Who should be careful" items={e.safety} mark="!" tone="warn" />
          <Studies studies={e.studies} />
        </article>

        <aside className="lg:sticky lg:top-28 self-start space-y-4">
          <AppCtaCard
            title={`Compare ${e.name.toLowerCase()} in the app`}
            sub={`The ${pillar.label.toLowerCase()} shelf, with what each product actually offers.`}
            campaign={`learn-${slug}`}
            source="learn_cta"
            path={pillar.appPath}
          />
          {related.length > 0 && (
            <div className="rounded-2xl border border-border p-4">
              <div className="fm-eyebrow text-muted mb-3">Related</div>
              <ul className="space-y-2">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link href={`/learn/${slugOf(r.id)}`} className="text-sm text-text hover:text-accent">
                      {r.name} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-[11px] text-muted leading-relaxed">
            Formulate earns nothing from any product named or linked here. Education, not medical advice.
          </p>
        </aside>
      </div>
    </main>
  );
}
