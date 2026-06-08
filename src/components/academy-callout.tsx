import { academyLinkForTags } from "@/lib/academy-cross-link";

/**
 * Contextual "go deeper in the Academy" block. Routes the reader from a
 * high-authority landing page (guide / condition) to the most relevant deep
 * course on the webapp, flowing SEO link equity into the Academy. Renders a
 * single outbound link; the target is chosen from the page's tags and always
 * resolves (matched course or the hub).
 */
export function AcademyCallout({
  tags,
  source,
}: {
  tags: string[] | undefined;
  source: string;
}) {
  const link = academyLinkForTags(tags, source);
  return (
    <section className="mt-10">
      <a
        href={link.href}
        className="group flex items-center gap-4 rounded-2xl border border-border bg-card/30 p-5 transition-colors hover:border-accent/50 hover:bg-card/60"
      >
        <span
          aria-hidden
          className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-accent/10 border border-accent/25"
        >
          🎓
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-accent mb-0.5">
            Go deeper · Free course
          </div>
          <div className="text-sm font-bold text-text">{link.title}</div>
          <p className="text-xs text-muted leading-snug mt-0.5">{link.blurb}</p>
        </div>
        <span className="text-muted transition-colors group-hover:text-accent">
          →
        </span>
      </a>
    </section>
  );
}
