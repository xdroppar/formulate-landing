import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { InteractionCard } from "@/components/interaction-card";
import {
  SEVERITY_META,
  checkPair,
  interactions,
  substances,
  substanceFromSlug,
  type Substance,
} from "@/lib/interactions";

const BASE = "https://formulate-health.app";

function parsePairSlug(slug: string): { a: Substance; b: Substance } | null {
  const parts = slug.split("-and-");
  if (parts.length !== 2) return null;
  const a = substanceFromSlug(parts[0]);
  const b = substanceFromSlug(parts[1]);
  if (!a || !b) return null;
  return { a, b };
}

export async function generateStaticParams() {
  const params: { pair: string }[] = [];
  const seen = new Set<string>();
  for (const i of interactions) {
    const [x, y] = [i.substance_a, i.substance_b].map((s) => s.toLowerCase());
    const sa = substances.find((s) => s.canonical.toLowerCase() === x);
    const sb = substances.find((s) => s.canonical.toLowerCase() === y);
    if (!sa || !sb) continue;
    const [first, second] = [sa.slug, sb.slug].sort();
    const pair = `${first}-and-${second}`;
    if (seen.has(pair)) continue;
    seen.add(pair);
    params.push({ pair });
  }
  return params;
}

type Params = Promise<{ pair: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { pair } = await params;
  const parsed = parsePairSlug(pair);
  if (!parsed) return { title: "Interaction not found" };
  const { a, b } = parsed;
  const found = checkPair(a.canonical, b.canonical);
  const aName = a.display;
  const bName = b.display;
  const title = found
    ? `${aName} and ${bName} — ${SEVERITY_META[found.severity].label}`
    : `${aName} and ${bName} Interaction`;
  const description = found
    ? `${found.summary}. ${found.recommendation}`
    : `Check interactions between ${aName} and ${bName}. See timing advice, severity, and cited sources.`;
  const url = `${BASE}/interactions/${pair}`;
  return {
    title: `${title} — Formulate`,
    description: description.slice(0, 160),
    alternates: { canonical: url },
    openGraph: {
      title,
      description: description.slice(0, 200),
      type: "article",
      url,
    },
  };
}

export default async function PairPage({ params }: { params: Params }) {
  const { pair } = await params;
  const parsed = parsePairSlug(pair);
  if (!parsed) notFound();
  const { a, b } = parsed;
  const found = checkPair(a.canonical, b.canonical);

  const aName = a.display;
  const bName = b.display;
  const url = `${BASE}/interactions/${pair}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: found
      ? `${aName} and ${bName}: ${found.summary}`
      : `${aName} and ${bName} Interaction`,
    author: { "@type": "Organization", name: "Formulate Team", url: BASE },
    publisher: {
      "@type": "Organization",
      name: "Formulate",
      url: BASE,
      logo: { "@type": "ImageObject", url: `${BASE}/logo.png`, width: 512, height: 512 },
    },
    url,
    mainEntityOfPage: url,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Interactions", item: `${BASE}/interactions` },
      { "@type": "ListItem", position: 3, name: `${aName} and ${bName}`, item: url },
    ],
  };

  const faqLd = found
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `Can I take ${aName.toLowerCase()} and ${bName.toLowerCase()} together?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${found.summary}. ${found.recommendation}`,
            },
          },
          ...(found.timing_advice
            ? [
                {
                  "@type": "Question",
                  name: `How should I time ${aName.toLowerCase()} and ${bName.toLowerCase()}?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: found.timing_advice,
                  },
                },
              ]
            : []),
          {
            "@type": "Question",
            name: `Is the ${aName.toLowerCase()} and ${bName.toLowerCase()} interaction dangerous?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `This interaction is rated "${SEVERITY_META[found.severity].label}" by Formulate. ${found.details}`,
            },
          },
        ],
      }
    : null;

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
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/interactions" className="hover:text-text transition-colors">
          Interaction Checker
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">
          {aName} + {bName}
        </span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-3">
          <span className="capitalize">{aName}</span> and{" "}
          <span className="capitalize">{bName}</span>
        </h1>
        {found ? (
          <p className="text-muted text-base leading-relaxed">{found.summary}</p>
        ) : (
          <p className="text-muted text-base leading-relaxed">
            We don&apos;t have a documented interaction between {aName.toLowerCase()} and{" "}
            {bName.toLowerCase()} in our curated database. This doesn&apos;t guarantee
            they&apos;re safe to combine — only that we haven&apos;t indexed evidence of a
            specific interaction. When in doubt, ask a pharmacist.
          </p>
        )}
      </header>

      {found && (
        <div className="mb-10">
          <InteractionCard interaction={found} defaultOpen />
        </div>
      )}

      {found && (
        <section className="mb-10">
          <h2 className="text-lg font-bold text-text mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-text mb-1">
                Can I take {aName.toLowerCase()} and {bName.toLowerCase()} together?
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {found.summary}. {found.recommendation}
              </p>
            </div>
            {found.timing_advice && (
              <div>
                <h3 className="text-sm font-semibold text-text mb-1">
                  How should I time {aName.toLowerCase()} and {bName.toLowerCase()}?
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {found.timing_advice}
                </p>
              </div>
            )}
            <div>
              <h3 className="text-sm font-semibold text-text mb-1">
                Is this interaction dangerous?
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                This interaction is rated &ldquo;{SEVERITY_META[found.severity].label}&rdquo; by Formulate. {found.details}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-border bg-card/30 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
          Want to check your whole stack?
        </h2>
        <p className="text-sm text-text mb-4 leading-relaxed">
          The free checker lets you add any combination of supplements and medications at
          once. Formulate&apos;s desktop app goes further — every stack change surfaces
          interaction alerts automatically.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/interactions"
            className="px-4 py-2 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-[#00ffb3] transition-colors"
          >
            Open the checker
          </Link>
          <Link
            href="/download"
            className="px-4 py-2 rounded-lg border border-border text-text font-semibold text-sm hover:border-accent transition-colors"
          >
            Get the desktop app
          </Link>
        </div>
      </section>

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">Medical disclaimer.</strong> This page is for
        educational purposes only and does not replace advice from a qualified healthcare
        provider.
      </p>
    </main>
  );
}
