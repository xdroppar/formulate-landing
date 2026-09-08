import type { ReactNode } from "react";

/**
 * The furniture every page on this site was missing.
 *
 * Measured across the 50 page templates, almost nothing was shared: three of
 * the four catalog hubs carried a byte-identical
 * `text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4`, the
 * fourth had its own clamp, and each repeated the same intro paragraph and
 * per-group description by hand. That is why the homepage restyle did not
 * propagate — there was nothing for it to propagate THROUGH.
 *
 * So these exist before the pages are touched. The point is not that a header
 * is hard to write; it is that the fiftieth one should not be a decision.
 *
 * Deliberately two components and no options beyond what the pages already
 * vary. A configurable layout kit would be a second design system competing
 * with the utilities, which is worse than either alone.
 */

/**
 * A page's opening: optional eyebrow, the title, an optional lead.
 *
 * The title sits on the ARGUMENT step (36px), not the hero step (56px). Only
 * the homepage hero is allowed to be the biggest thing on the site — a hub
 * title matching it would tell a reader the two carry equal weight.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Filters, counts, a back link — anything that belongs with the title. */
  children?: ReactNode;
}) {
  return (
    <header className="mb-10">
      {eyebrow ? <div className="fm-eyebrow mb-3">{eyebrow}</div> : null}
      <h1 className="fm-display text-[clamp(26px,3.5vw,var(--text-h-argument))] mb-3 max-w-[760px]">
        {title}
      </h1>
      {lead ? (
        <p className="text-[16px] text-muted leading-relaxed max-w-[620px]">{lead}</p>
      ) : null}
      {children ? <div className="mt-6">{children}</div> : null}
    </header>
  );
}

/**
 * A band within a page — a food group, a recipe category, a guide tag.
 *
 * Sits on the QUIET step (26px), because a section inside a page cannot
 * outrank the page's own title. That relationship was inverted on several
 * hubs, where group headings were set larger than the h1's siblings.
 */
export function SectionHeader({
  title,
  description,
  action,
}: {
  title: ReactNode;
  description?: ReactNode;
  /** A "browse all" link, or a count. */
  action?: ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="fm-display text-[clamp(20px,2.6vw,var(--text-h-section))]">{title}</h2>
        {action ? <div className="shrink-0 text-[12px]">{action}</div> : null}
      </div>
      {description ? (
        <p className="text-[14px] text-muted leading-relaxed mt-2 max-w-[680px]">{description}</p>
      ) : null}
    </div>
  );
}
