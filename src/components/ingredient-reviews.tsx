import Link from "next/link";
import { FindingLine } from "@/components/review-evidence";
import { goalBySlug } from "@/lib/goals";
import { forIngredientPage, type IngredientFinding } from "@/lib/ingredient-evidence";

/**
 * "What systematic reviews concluded" on an ingredient page: every outcome the
 * reviews reached a verdict on, grouped by direction, each quoted and linked.
 * Beside the page's own primary-uses list, this is the check on it — a use
 * listed above can sit in the "no effect" group here.
 */
const SHOW = 6;

function Group({
  title,
  findings,
  note,
}: {
  title: string;
  findings: IngredientFinding[];
  note?: string;
}) {
  if (!findings.length) return null;
  const shown = findings.slice(0, SHOW);
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-text mb-1">
        {title} <span className="text-muted font-normal">({findings.length})</span>
      </h3>
      {note && <p className="text-xs text-muted mb-1">{note}</p>}
      {shown.map((f, n) => {
        const goal = f.goal ? goalBySlug(f.goal) : undefined;
        return (
          <div key={`${f.outcome}-${f.quote_pmid}-${n}`}>
            <FindingLine f={f} />
            {goal && (
              <Link
                href={`/supplements/for/${goal.slug}`}
                className="inline-block mt-1 ml-3 text-xs text-accent hover:underline"
              >
                Every supplement reviewed for {goal.label.toLowerCase()} →
              </Link>
            )}
          </div>
        );
      })}
      {findings.length > shown.length && (
        <p className="text-xs text-muted mt-2">and {findings.length - shown.length} more.</p>
      )}
    </div>
  );
}

export function IngredientReviews({ slug, name }: { slug: string; name: string }) {
  const e = forIngredientPage(slug);
  if (!e) return null;
  const parts = [
    e.benefit.length && `${e.benefit.length} with a benefit`,
    e.noEffect.length && `${e.noEffect.length} with no effect`,
    e.harm.length && `${e.harm.length} with harm reported`,
    e.unclear.length && `${e.unclear.length} unclear`,
  ].filter(Boolean);
  return (
    <section className="mb-10">
      <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-2">What systematic reviews concluded</h2>
      <p className="text-sm text-muted mb-5 leading-relaxed">
        Outcomes that systematic reviews of {name} reached a verdict on: {parts.join(", ")}. Each is quoted from a
        review and linked to it on PubMed.{" "}
        <Link href="/reports/supplement-review-conclusions" className="text-accent hover:underline">
          How these were read
        </Link>
        .
      </p>
      <Group title="Reviews found a benefit" findings={e.benefit} />
      <Group title="Reviews found no effect" findings={e.noEffect} />
      {e.harm.length > 0 && (
        <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-4 mb-6">
          <Group title="Harm reported" findings={e.harm} />
        </div>
      )}
      {e.unclear.length > 0 && (
        <p className="text-xs text-muted leading-relaxed">
          <span className="text-text font-semibold">Not enough to say:</span>{" "}
          {Array.from(new Set(e.unclear.map((f) => f.outcome))).join("; ")}.
        </p>
      )}
      {e.specialCount > 0 && (
        <p className="text-xs text-muted mt-3">
          {e.specialCount} finding{e.specialCount === 1 ? "" : "s"} from reviews in specific patient groups (such as
          cancer, pregnancy or surgery) {e.specialCount === 1 ? "is" : "are"} not shown here.
        </p>
      )}
    </section>
  );
}
