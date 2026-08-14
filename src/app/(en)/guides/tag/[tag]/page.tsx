import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllTags,
  getGuidesByTagSlug,
  slugifyTag,
} from "@/lib/guides";

const categoryColors: Record<string, string> = {
  roundup: "text-accent",
  protocol: "text-accent2",
  review: "text-warning",
  guide: "text-accent",
};

const categoryBorders: Record<string, string> = {
  roundup: "border-accent/20",
  protocol: "border-accent2/20",
  review: "border-warning/20",
  guide: "border-accent/20",
};

export function generateStaticParams() {
  return getAllTags().map(({ slug }) => ({ tag: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const result = getGuidesByTagSlug(tag);
  if (!result) return {};

  const title = `${result.tag} Guides — Evidence-Based Supplement & Longevity Content`;
  const description = `${result.guides.length} guide${result.guides.length === 1 ? "" : "s"} on ${result.tag}. Clinical research, protocols, and product scores — no sponsorships.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://formulate-health.app/guides/tag/${tag}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const result = getGuidesByTagSlug(tag);
  if (!result) notFound();

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-[960px] mx-auto">
        <nav className="flex items-center gap-2 text-xs text-muted mb-8">
          <Link href="/" className="hover:text-text transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-text transition-colors">
            Guides
          </Link>
          <span>/</span>
          <span className="text-text/60">{result.tag}</span>
        </nav>

        <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">
          Topic
        </div>
        <h1 className="text-[clamp(28px,4vw,48px)] font-extrabold tracking-[-1px] mb-3">
          {result.tag}
        </h1>
        <p className="text-base text-muted max-w-[540px] mb-12 leading-relaxed">
          {result.guides.length} evidence-based guide
          {result.guides.length === 1 ? "" : "s"} on {result.tag.toLowerCase()} — backed by clinical research and scored in our catalog.
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          {result.guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group block p-6 rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`text-[10px] font-bold tracking-[1.5px] uppercase ${
                    categoryColors[guide.category] || "text-accent"
                  }`}
                >
                  {guide.categoryLabel}
                </span>
                <span className="text-[10px] text-muted">{guide.readTime}</span>
              </div>
              <h2 className="text-base font-bold leading-snug mb-2 group-hover:text-accent transition-colors">
                {guide.title}
              </h2>
              <p className="text-sm text-muted leading-relaxed line-clamp-2">
                {guide.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {guide.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className={`px-2 py-0.5 rounded-full text-[10px] text-muted bg-bg border ${
                      categoryBorders[guide.category] || "border-border"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-muted mb-4">
            Browse all topics
          </div>
          <div className="flex flex-wrap gap-2">
            {getAllTags().map(({ tag: t, slug, count }) => {
              const isActive = slug === slugifyTag(result.tag);
              return (
                <Link
                  key={slug}
                  href={`/guides/tag/${slug}`}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                    isActive
                      ? "bg-accent/15 text-accent border-accent/30"
                      : "text-muted bg-surface border-border hover:border-accent/30 hover:text-text"
                  }`}
                >
                  {t} <span className="text-muted/70">· {count}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
