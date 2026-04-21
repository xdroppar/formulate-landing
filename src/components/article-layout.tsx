import Link from "next/link";
import { slugifyTag, type Guide } from "@/lib/guides";
import { getFaqsForGuide } from "@/lib/guide-faqs";
import { getCrossSellsForGuide } from "@/lib/guide-cross-sells";
import { getAuthor, getReviewer, type Author } from "@/lib/authors";
import { withUtm } from "@/lib/app-url";
import { GuideStickyCTA } from "@/components/guide-sticky-cta";
import { RelatedGuides } from "@/components/related-guides";
import { RelatedInteractions } from "@/components/related-interactions";
import { TableOfContents } from "@/components/table-of-contents";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { TrackedDownloadLink } from "@/components/tracked-download-link";

const APP_URL = "https://app.formulate-health.app";

interface ArticleLayoutProps {
  guide: Guide;
  children: React.ReactNode;
}

function authorSchema(a: Author) {
  return {
    "@type": "Person",
    name: a.name,
    jobTitle: a.title,
    description: a.bio,
    ...(a.slug ? { url: `https://formulate-health.app/about/${a.slug}` } : {}),
    ...(a.sameAs && a.sameAs.length > 0 ? { sameAs: a.sameAs } : {}),
  };
}

function buildArticleSchema(guide: Guide) {
  const author = getAuthor(guide.author);
  const reviewer = getReviewer(guide.reviewer);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    image: [
      {
        "@type": "ImageObject",
        url: `https://formulate-health.app/guides/${guide.slug}/opengraph-image`,
        width: 1200,
        height: 630,
      },
    ],
    author: authorSchema(author),
    ...(reviewer ? { reviewedBy: authorSchema(reviewer) } : {}),
    publisher: {
      "@type": "Organization",
      name: "Formulate",
      url: "https://formulate-health.app",
      logo: {
        "@type": "ImageObject",
        url: "https://formulate-health.app/logo.png",
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://formulate-health.app/guides/${guide.slug}`,
    },
    keywords: guide.tags.join(", "),
  };
}

function buildFaqSchema(guide: Guide) {
  const faqs = getFaqsForGuide(guide.slug);
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

function buildBreadcrumbSchema(guide: Guide) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://formulate-health.app" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://formulate-health.app/guides" },
      { "@type": "ListItem", position: 3, name: guide.title },
    ],
  };
}

const categoryColors: Record<string, string> = {
  roundup: "text-accent",
  protocol: "text-accent2",
  review: "text-warning",
  guide: "text-accent",
};

export function ArticleLayout({ guide, children }: ArticleLayoutProps) {
  const faqSchema = buildFaqSchema(guide);
  const crossSells = getCrossSellsForGuide(guide.slug);
  const author = getAuthor(guide.author);
  const reviewer = getReviewer(guide.reviewer);
  return (
    <div className="pt-24 pb-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleSchema(guide)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(guide)) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <article className="max-w-[760px] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted mb-8">
          <Link href="/" className="hover:text-text transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-text transition-colors">
            Guides
          </Link>
          <span>/</span>
          <span className="text-text/60 truncate max-w-[200px]">{guide.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div
            className={`text-xs font-bold tracking-[2px] uppercase mb-3 ${
              categoryColors[guide.category] || "text-accent"
            }`}
          >
            {guide.categoryLabel}
          </div>
          <h1 className="text-[clamp(26px,4vw,42px)] font-extrabold tracking-[-1px] leading-[1.15] mb-4">
            {guide.title}
          </h1>
          <p className="text-base text-muted leading-relaxed mb-4">
            {guide.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted">
            <time dateTime={guide.updatedAt}>
              Updated {formatDate(guide.updatedAt)}
            </time>
            <span>·</span>
            <span>{guide.readTime}</span>
          </div>
          <div className="mt-5 pt-5 border-t border-border text-xs text-muted leading-relaxed">
            <div>
              <span className="text-muted/70">By </span>
              {author.slug ? (
                <Link href={`/about/${author.slug}`} className="text-text font-medium hover:text-accent transition-colors">
                  {author.name}
                </Link>
              ) : (
                <span className="text-text font-medium">{author.name}</span>
              )}
              <span className="text-muted/70"> · {author.title}</span>
            </div>
            {reviewer && (
              <div className="mt-1">
                <span className="text-muted/70">Medically reviewed by </span>
                {reviewer.slug ? (
                  <Link href={`/about/${reviewer.slug}`} className="text-text font-medium hover:text-accent transition-colors">
                    {reviewer.name}
                  </Link>
                ) : (
                  <span className="text-text font-medium">{reviewer.name}</span>
                )}
                <span className="text-muted/70"> · {reviewer.title}</span>
              </div>
            )}
          </div>
        </header>

        {/* Body */}
        <div className="prose">
          <TableOfContents />
          {children}
        </div>

        {/* Supplement cross-sells (for guides where the topic has supplement support) */}
        {crossSells && crossSells.length > 0 && (
          <div className="mt-14 p-6 rounded-2xl bg-surface/50 border border-border">
            <h3 className="text-[11px] font-bold tracking-[1.5px] uppercase text-muted mb-4">
              Supplements that support this
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {crossSells.map((cs) => (
                <Link
                  key={cs.slug}
                  href={`/guides/${cs.slug}`}
                  className="group block p-4 rounded-xl bg-bg border border-border hover:border-accent/30 transition-all"
                >
                  <div className="text-sm font-semibold text-text group-hover:text-accent transition-colors">
                    {cs.label}
                  </div>
                  <div className="text-xs text-muted mt-1 leading-relaxed">
                    {cs.blurb}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-surface border border-border text-center">
          <h3 className="text-lg font-bold mb-2">
            See full scores in Formulate
          </h3>
          <p className="text-sm text-muted mb-5 max-w-[440px] mx-auto">
            Every product scored 50–100 against clinical research. Compare
            brands, check dose safety, and build your stack — free, no account required.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href={withUtm(guide.catalogLink || `${APP_URL}/catalog`, {
                source: "guide",
                campaign: "guide_cta_bottom",
                content: guide.slug,
              })}
              className="px-6 py-3 rounded-xl text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
            >
              Browse Supplement Scores
            </a>
            <TrackedDownloadLink
              href="/download"
              source={`guide_cta:${guide.slug}`}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-muted hover:text-text transition-all"
            >
              Or download the desktop app →
            </TrackedDownloadLink>
          </div>
        </div>

        {/* Related interactions (auto-injected from guide tags) */}
        <RelatedInteractions tags={guide.tags} />

        {/* Related guides */}
        <RelatedGuides current={guide} />

        {/* Newsletter signup */}
        <NewsletterSignup source={`guide:${guide.slug}`} />

        {/* Tags */}
        <div className="mt-10 flex flex-wrap gap-2">
          {guide.tags.map((tag) => (
            <Link
              key={tag}
              href={`/guides/tag/${slugifyTag(tag)}`}
              className="px-3 py-1 rounded-full text-xs text-muted bg-surface border border-border hover:border-accent/30 hover:text-text transition-all"
            >
              {tag}
            </Link>
          ))}
        </div>
      </article>

      {/* Sticky bottom CTA — always visible while reading long guides */}
      <GuideStickyCTA slug={guide.slug} catalogLink={guide.catalogLink} />
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
