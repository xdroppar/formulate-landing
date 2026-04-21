import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { visibleGuides, getAllTags } from "@/lib/guides";
import { withUtm } from "@/lib/app-url";

export const metadata: Metadata = {
  title: "Supplement Guides — Evidence-Based Reviews & Protocols",
  description:
    "Expert supplement guides backed by clinical research. Best-of roundups, stacking protocols, and product deep-dives — no sponsorships, just data.",
  alternates: { canonical: "https://formulate-health.app/guides" },
};

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

// Tailwind-safe category gradient fallbacks (used when `thumbnail` is absent).
// Kept in sync with `categoryColors` above.
const categoryFallbackGradient: Record<string, string> = {
  roundup: "bg-gradient-to-br from-accent/20 via-accent/5 to-transparent",
  protocol: "bg-gradient-to-br from-accent2/20 via-accent2/5 to-transparent",
  review: "bg-gradient-to-br from-warning/20 via-warning/5 to-transparent",
  guide: "bg-gradient-to-br from-accent/20 via-accent/5 to-transparent",
};

export default function GuidesPage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-[960px] mx-auto">
        <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">
          Evidence-Based
        </div>
        <h1 className="text-[clamp(28px,4vw,48px)] font-extrabold tracking-[-1px] mb-3">
          Supplement Guides
        </h1>
        <p className="text-base text-muted max-w-[540px] mb-12 leading-relaxed">
          Best-of roundups, stacking protocols, and deep-dives — every
          recommendation backed by clinical research and scored in our catalog.
        </p>

        {/* CTA banner */}
        <div className="mb-10 p-6 rounded-2xl bg-surface border border-accent/20 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="text-base font-bold text-text mb-1">
              See how your supplements score
            </div>
            <div className="text-sm text-muted">
              230+ products scored 50–100 against clinical research. Free, no account required.
            </div>
          </div>
          <a
            href={withUtm("https://app.formulate-health.app/catalog", {
              source: "guides_hub",
              campaign: "guides_hub_banner",
            })}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all"
          >
            Browse Scores
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        {/* Browse by topic */}
        <div className="mb-10">
          <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-muted mb-3">
            Browse by topic
          </div>
          <div className="flex flex-wrap gap-2">
            {getAllTags().slice(0, 20).map(({ tag, slug, count }) => (
              <Link
                key={slug}
                href={`/guides/tag/${slug}`}
                className="px-3 py-1.5 rounded-full text-xs text-muted bg-surface border border-border hover:border-accent/30 hover:text-text transition-all"
              >
                {tag} <span className="text-muted/70">· {count}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {visibleGuides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className={`group block rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all overflow-hidden`}
            >
              <div
                className={`relative w-full aspect-[16/9] overflow-hidden ${
                  guide.thumbnail ? "bg-bg" : categoryFallbackGradient[guide.category] || categoryFallbackGradient.guide
                }`}
              >
                {guide.thumbnail ? (
                  <Image
                    src={guide.thumbnail}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 460px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={`text-[56px] font-extrabold tracking-tight opacity-[0.12] ${
                        categoryColors[guide.category] || "text-accent"
                      }`}
                      aria-hidden="true"
                    >
                      {guide.title.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`text-[10px] font-bold tracking-[1.5px] uppercase ${
                      categoryColors[guide.category] || "text-accent"
                    }`}
                  >
                    {guide.categoryLabel}
                  </span>
                  <span className="text-[10px] text-muted">{guide.readTime}</span>
                  {guide.isNew && (
                    <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold tracking-wide uppercase bg-accent/15 text-accent border border-accent/25">
                      New
                    </span>
                  )}
                </div>
                <h2 className="text-base font-bold leading-snug mb-2 group-hover:text-accent transition-colors">
                  {guide.title}
                </h2>
                <p className="text-sm text-muted leading-relaxed line-clamp-2">
                  {guide.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {guide.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-0.5 rounded-full text-[10px] text-muted bg-bg border ${
                        categoryBorders[guide.category] || "border-border"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
