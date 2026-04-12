/**
 * Visual supplement schedule — replaces bullet-list cheat sheets
 * with a scannable, card-based time-of-day layout.
 */

interface ScheduleSlot {
  emoji: string;
  label: string;
  time?: string;
  color: string;
  supplements: string[];
  note?: string;
}

interface ScheduleTableProps {
  slots: ScheduleSlot[];
  title?: string;
}

export function ScheduleTable({ slots, title }: ScheduleTableProps) {
  return (
    <div className="not-prose my-8">
      {title && (
        <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-muted mb-3">
          {title}
        </div>
      )}
      <div className="space-y-2">
        {slots.map((slot) => (
          <div
            key={slot.label}
            className="rounded-xl bg-surface border border-border overflow-hidden"
          >
            <div className="flex items-stretch">
              {/* Colored accent bar */}
              <div
                className="w-1 flex-shrink-0"
                style={{ backgroundColor: slot.color }}
              />

              <div className="flex-1 px-4 py-3.5">
                {/* Slot header */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">{slot.emoji}</span>
                  <span className="text-sm font-bold text-text">{slot.label}</span>
                  {slot.time && (
                    <span className="text-[11px] text-muted/50">{slot.time}</span>
                  )}
                </div>

                {/* Supplement chips */}
                <div className="flex flex-wrap gap-1.5">
                  {slot.supplements.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium text-text/80 border border-border bg-bg"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Note */}
                {slot.note && (
                  <div className="mt-2 text-xs text-muted/60 flex items-start gap-1.5">
                    <span className="mt-px">💡</span>
                    <span>{slot.note}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
