import type { Product } from "@/lib/products";

/**
 * The parsed timing rule, shown as chips above the label's own prose.
 *
 * Mirrors formulate-web's `timing-chips.tsx`. A server component here because
 * nothing about it is interactive and the supplement page is server-rendered;
 * the only real difference is plain English rather than the app's i18n keys.
 *
 * WHY CHIPS AND NOT MORE PROSE. `recommended_use` already says "take with a
 * meal" and repeating that as a sentence would just be a second copy of the
 * paragraph beside it. The chip earns its place by being the STRUCTURED form —
 * the same value a score reads — shown to the person it will be applied to.
 *
 * IT RENDERS NOTHING RATHER THAN GUESS. Products whose ingredient reference and
 * own label disagreed carry `unknown: "conflict"` and get no chip, as do those
 * with no reference record. A missing chip costs a reader nothing; a chip
 * reading "Morning" above a label reading "30-60 minutes before bedtime" costs
 * the page its credibility, and the reader cannot tell which to believe.
 */
export function TimingChips({ rule }: { rule?: Product["timing_rule"] }) {
  if (!rule || rule.unknown) return null;

  const hedged = rule.strength === "preferred";
  const chips: { key: string; label: string; hedged: boolean }[] = [];

  const TIME: Record<string, string> = {
    morning: "Morning",
    evening: "Evening",
    exercise: "Around exercise",
  };
  if (rule.time_of_day && TIME[rule.time_of_day]) {
    chips.push({ key: "tod", label: TIME[rule.time_of_day], hedged });
  }
  if (rule.food === "with") chips.push({ key: "food", label: "With food", hedged });
  if (rule.food === "without") chips.push({ key: "food", label: "On an empty stomach", hedged });
  if (rule.separate_from?.length) {
    chips.push({
      key: "sep",
      // Not hedged — a spacing rule exists because two things interfere, and
      // there is no softer version of that.
      hedged: false,
      label: `Space apart from ${rule.separate_from.join(", ")}`,
    });
  }
  if (!chips.length) return null;

  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <span
          key={c.key}
          className={
            "rounded-lg border px-2.5 py-1 text-xs font-medium " +
            // A STATED INSTRUCTION AND A STATED PREFERENCE LOOK DIFFERENT.
            // "Slightly better with carbs" and "With meals (important)" are not
            // the same claim, and 41% of the source guidance hedges. Printing
            // both at the same weight is what makes a rule feel arbitrary — the
            // reader cannot tell which ones actually matter.
            (c.hedged
              ? "border-border bg-white/[0.04] text-muted"
              : "border-accent/20 bg-accent/10 text-accent")
          }
        >
          {c.label}
        </span>
      ))}
      {hedged && <span className="text-[11px] text-muted">preferred, not required</span>}
    </div>
  );
}
