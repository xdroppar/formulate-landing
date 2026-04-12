/**
 * TL;DR box — key takeaways at the top of a guide.
 * Respects the reader's time and builds trust immediately.
 */

interface TLDRBoxProps {
  takeaways: string[];
  readTime?: string;
}

export function TLDRBox({ takeaways, readTime }: TLDRBoxProps) {
  return (
    <div className="not-prose my-8 rounded-2xl bg-accent/[0.04] border border-accent/20 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-accent/10">
        <div className="flex items-center gap-2">
          <span className="text-accent text-sm">⚡</span>
          <span className="text-[11px] font-bold tracking-[1.5px] uppercase text-accent">
            Key Takeaways
          </span>
        </div>
        {readTime && (
          <span className="text-[11px] text-muted/60">{readTime}</span>
        )}
      </div>
      <ul className="px-5 py-4 space-y-2.5">
        {takeaways.map((t, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-text/90 leading-relaxed">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
