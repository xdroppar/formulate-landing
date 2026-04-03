import Link from "next/link";
import type { Guide } from "@/lib/guides";

interface ArticleLayoutProps {
  guide: Guide;
  children: React.ReactNode;
}

function buildArticleSchema(guide: Guide) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: {
      "@type": "Organization",
      name: "Formulate",
      url: "https://formulate-health.app",
    },
    publisher: {
      "@type": "Organization",
      name: "Formulate",
      url: "https://formulate-health.app",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://formulate-health.app/guides/${guide.slug}`,
    },
    keywords: guide.tags.join(", "),
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
        </header>

        {/* Body */}
        <div className="prose">{children}</div>

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-surface border border-border text-center">
          <h3 className="text-lg font-bold mb-2">
            See full scores in the Formulate app
          </h3>
          <p className="text-sm text-muted mb-5 max-w-[440px] mx-auto">
            Every product scored 50–100 against clinical research. Compare
            brands, check dose safety, and build your stack.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {guide.catalogLink && (
              <a
                href={guide.catalogLink}
                className="px-6 py-3 rounded-xl text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
              >
                View in Catalog
              </a>
            )}
            <Link
              href="/download"
              className="px-6 py-3 rounded-xl text-sm font-semibold bg-surface2 text-text hover:bg-surface2/80 border border-border transition-all"
            >
              Download Desktop App
            </Link>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-10 flex flex-wrap gap-2">
          {guide.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs text-muted bg-surface border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
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
