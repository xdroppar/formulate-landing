import Link from "next/link";
import { guides, type Guide } from "@/lib/guides";

interface RelatedGuidesProps {
  current: Guide;
  /** Max number of related guides to show */
  count?: number;
}

const categoryColors: Record<string, string> = {
  roundup: "text-accent",
  protocol: "text-accent2",
  review: "text-warning",
  guide: "text-accent",
};

/**
 * Picks related guides by tag overlap, then category match, then recency.
 * Excludes the current guide. Deterministic — no randomness.
 */
function findRelated(current: Guide, count: number): Guide[] {
  const currentTags = new Set(current.tags);

  const scored = guides
    .filter((g) => g.slug !== current.slug)
    .map((g) => {
      const tagOverlap = g.tags.filter((t) => currentTags.has(t)).length;
      const categoryMatch = g.category === current.category ? 1 : 0;
      return { guide: g, tagOverlap, categoryMatch };
    })
    .sort((a, b) => {
      // Primary: tag overlap (more shared tags = more related)
      if (b.tagOverlap !== a.tagOverlap) return b.tagOverlap - a.tagOverlap;
      // Secondary: same category
      if (b.categoryMatch !== a.categoryMatch) return b.categoryMatch - a.categoryMatch;
      // Tertiary: newer first
      return b.guide.updatedAt.localeCompare(a.guide.updatedAt);
    });

  return scored.slice(0, count).map((s) => s.guide);
}

export function RelatedGuides({ current, count = 3 }: RelatedGuidesProps) {
  const related = findRelated(current, count);

  if (related.length === 0) return null;

  return (
    <div className="mt-14">
      <h3 className="text-[11px] font-bold tracking-[1.5px] uppercase text-muted mb-4">
        Read next
      </h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {related.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="group block p-5 rounded-xl bg-surface border border-border hover:border-accent/30 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-[10px] font-bold tracking-[1.5px] uppercase ${
                  categoryColors[g.category] || "text-accent"
                }`}
              >
                {g.categoryLabel}
              </span>
              <span className="text-[10px] text-muted">{g.readTime}</span>
            </div>
            <h4 className="text-sm font-semibold text-text leading-snug group-hover:text-accent transition-colors line-clamp-2">
              {g.title}
            </h4>
            <p className="text-xs text-muted mt-1.5 leading-relaxed line-clamp-2">
              {g.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
