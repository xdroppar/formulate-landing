import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { goalPages, goalBySlug, goalEvidenceDateLabel } from "@/lib/goals";
import { ReviewEvidence } from "@/components/review-evidence";

const BASE = "https://formulate-health.app";

export function generateStaticParams() {
  return goalPages.map((g) => ({ goal: g.slug }));
}

type Params = Promise<{ goal: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { goal: slug } = await params;
  const g = goalBySlug(slug);
  if (!g) return { title: "Not found" };
  const title = `Supplements for ${g.label}: What Systematic Reviews Found`;
  const description =
    `${g.helps.length + g.mixed.length} supplements where systematic reviews found a benefit for ${g.label.toLowerCase()}, ` +
    `${g.noEffect.length} where they found none — each with the review quoted and linked.`;
  const url = `${BASE}/supplements/for/${slug}`;
  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical: url },
    openGraph: { title, description: description.slice(0, 200), type: "article", url },
  };
}

export default async function GoalPage({ params }: { params: Params }) {
  const { goal: slug } = await params;
  const g = goalBySlug(slug);
  if (!g) notFound();

  const url = `${BASE}/supplements/for/${slug}`;
  const lower = g.label.toLowerCase();
  const helpNames = [...g.helps, ...g.mixed].slice(0, 6).map((i) => i.name);
  const noneNames = g.noEffect.slice(0, 6).map((i) => i.name);

  const faqs = [
    {
      q: `What supplements help with ${lower}?`,
      a: `Systematic reviews concluded a benefit for ${helpNames.join(", ")}${g.helps.length + g.mixed.length > helpNames.length ? ", among others" : ""}. The size of the effect varies by study and population; the reviews are quoted and linked on this page.`,
    },
    ...(noneNames.length
      ? [
          {
            q: `Which supplements don't help with ${lower}?`,
            a: `Reviews concluded no effect for ${noneNames.join(", ")}${g.noEffect.length > noneNames.length ? ", among others" : ""}.`,
          },
        ]
      : []),
  ];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: "Supplements by goal", item: `${BASE}/supplements/for` },
      { "@type": "ListItem", position: 3, name: g.label, item: url },
    ],
  };
  const others = goalPages.filter((x) => x.slug !== slug);

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
        <Link href="/supplements/for" className="hover:text-text transition-colors">
          Supplements by goal
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text">{g.label}</span>
      </nav>

      <header className="mb-10">
        <p className="fm-eyebrow text-accent mb-3">What the reviews found</p>
        <h1 className="fm-display text-[clamp(26px,3.5vw,var(--text-h-argument))] text-text mb-4">
          Supplements for {g.label}
        </h1>
        <p className="text-base text-muted leading-relaxed">
          {g.helps.length} where systematic reviews concluded a benefit, {g.mixed.length} with mixed findings,{" "}
          {g.noEffect.length} where they concluded no effect
          {g.harmed.length > 0 ? `, and ${g.harmed.length} where harm was reported` : ""}. Every line quotes the
          review and links it, so you can read the sentence yourself.
        </p>
      </header>

      <ReviewEvidence goal={g} />

      <section className="mt-12 rounded-2xl border border-border bg-card/30 p-6">
        <h2 className="fm-eyebrow mb-3">How this page is built</h2>
        <p className="text-sm text-muted leading-relaxed">
          Each finding is the conclusion a set of systematic reviews reached on one outcome — whether an ingredient
          helped, made no difference, or could not be judged — with a sentence quoted from one review, checked to
          appear in its PubMed abstract. It records the direction, not the size, of an effect. Reviews run in
          populations such as people with cancer, pregnancy, surgery or children are left out, because applying
          them to a general reader would mislead. Evidence last refreshed {goalEvidenceDateLabel}. Abstracts courtesy
          of the U.S. National Library of Medicine (PubMed).
        </p>
      </section>

      {others.length > 0 && (
        <section className="mt-10">
          <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-4">Other goals</h2>
          <div className="flex flex-wrap gap-2">
            {others.map((x) => (
              <Link
                key={x.slug}
                href={`/supplements/for/${x.slug}`}
                className="inline-flex items-center rounded-full border border-border bg-white/[0.02] px-3 py-1.5 text-sm text-text hover:border-accent/40 transition-colors"
              >
                {x.label}
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">Educational only.</strong> A review finding a benefit on average does not mean a
        supplement will help you, or that it is safe alongside your medication. If you are treated for {lower}, talk to
        your clinician before adding anything.
      </p>
    </main>
  );
}
