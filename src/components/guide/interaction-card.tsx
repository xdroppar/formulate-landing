/**
 * Supplement interaction cards — visual conflict/synergy indicators.
 * No other supplement guide does this visually. Immediately scannable.
 */

type InteractionType = "conflict" | "synergy";

interface InteractionCardProps {
  type: InteractionType;
  a: string;
  b: string;
  effect: string;
  recommendation: string;
}

export function InteractionCard({ type, a, b, effect, recommendation }: InteractionCardProps) {
  const isConflict = type === "conflict";

  return (
    <div
      className={`not-prose my-4 rounded-xl border px-5 py-4 ${
        isConflict
          ? "bg-[#EF4444]/[0.03] border-[#EF4444]/20"
          : "bg-accent/[0.03] border-accent/20"
      }`}
    >
      {/* Header */}
      <div className={`text-[10px] font-bold tracking-[1.5px] uppercase mb-3 ${
        isConflict ? "text-[#EF4444]/70" : "text-accent/70"
      }`}>
        {isConflict ? "✕ Conflict" : "✓ Synergy"}
      </div>

      {/* Visual interaction line */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-sm font-semibold text-text">{a}</span>
        <div className="flex-1 flex items-center">
          <div className={`flex-1 h-px ${isConflict ? "bg-[#EF4444]/30" : "bg-accent/30"}`} />
          <span className={`mx-2 text-xs font-bold ${isConflict ? "text-[#EF4444]" : "text-accent"}`}>
            {isConflict ? "✕" : "+"}
          </span>
          <div className={`flex-1 h-px ${isConflict ? "bg-[#EF4444]/30" : "bg-accent/30"}`} />
        </div>
        <span className="text-sm font-semibold text-text">{b}</span>
      </div>

      {/* Effect */}
      <div className="text-sm text-text/80 leading-relaxed mb-1.5">{effect}</div>

      {/* Recommendation */}
      <div className="text-xs text-muted/70 italic">{recommendation}</div>
    </div>
  );
}

/* ── Grouped list ────────────────────────────────────── */

interface InteractionGroupProps {
  title?: string;
  children: React.ReactNode;
}

export function InteractionGroup({ title, children }: InteractionGroupProps) {
  return (
    <div className="not-prose my-8">
      {title && (
        <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-muted mb-3">
          {title}
        </div>
      )}
      <div className="space-y-3">{children}</div>
    </div>
  );
}
