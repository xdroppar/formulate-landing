import Link from "next/link";
import type { Metadata } from "next";
import { guides } from "@/lib/guides";

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

        <div className="grid gap-5 sm:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className={`group block p-6 rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all`}
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
