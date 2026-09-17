import Link from "next/link";
import { ScoreMeter } from "@/components/score-meter";
import { pubmedUrl, type Finding, type Goal, type RankedIngredient } from "@/lib/goals";

/**
 * What systematic reviews concluded for one goal: helps, mixed, no effect,
 * harm, unclear. Every line quotes the review and links it, so a reader can
 * check the sentence rather than trust the label. Shared by
 * /supplements/for/[goal] and the hand-written /conditions pages.
 */

const DIRECTION_LABEL: Record<Finding["direction"], string> = {
  benefit: "Benefit",
  no_effect: "No effect",
  unclear: "Unclear",
  harm: "Harm reported",
};

const DIRECTION_CLASS: Record<Finding["direction"], string> = {
  benefit: "text-accent border-accent/30",
  no_effect: "text-muted border-border",
  unclear: "text-muted border-border",
  harm: "text-orange-400 border-orange-500/40",
};

function IngredientName({ i }: { i: RankedIngredient }) {
  return i.slug ? (
    <Link href={`/ingredients/${i.slug}`} className="hover:text-accent transition-colors">
      {i.name}
    </Link>
  ) : (
    <>{i.name}</>
  );
}

function FindingLine({ f }: { f: Finding }) {
  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${DIRECTION_CLASS[f.direction]}`}>
          {DIRECTION_LABEL[f.direction]}
        </span>
        <span className="text-xs text-text">{f.outcome}</span>
        {f.as && <span className="text-xs text-muted">(as {f.as})</span>}
      </div>
      <blockquote className="text-xs text-muted leading-relaxed border-l-2 border-border pl-3">
        &ldquo;{f.quote}&rdquo;{" "}
        <a href={pubmedUrl(f.quote_pmid)} rel="noopener" target="_blank" className="text-accent hover:underline whitespace-nowrap">
          PMID {f.quote_pmid}
        </a>
        {f.pmids.length > 1 && <span className="whitespace-nowrap"> · {f.pmids.length} reviews</span>}
      </blockquote>
    </div>
  );
}

/** A card shows its strongest few findings; one ingredient with twenty review
 *  rows (omega-3 on cholesterol) otherwise runs longer than a phone screen five
 *  times over, burying every ingredient after it. */
const MAX_FINDINGS = 3;

function IngredientCard({ i, directions }: { i: RankedIngredient; directions: Finding["direction"][] }) {
  const matching = i.findings.filter((f) => directions.includes(f.direction));
  const shown = matching.slice(0, MAX_FINDINGS);
  const hidden = matching.length - shown.length;
  return (
    <li className="rounded-xl border border-border bg-white/[0.02] p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-bold text-text">
            <IngredientName i={i} />
          </div>
          <div className="text-xs text-muted">
            {i.reviewCount} review{i.reviewCount === 1 ? "" : "s"} cited
            {i.harm.length > 0 && directions.every((d) => d !== "harm") && (
              <span className="text-orange-400"> · harm also reported, see below</span>
            )}
          </div>
        </div>
        {i.topProduct && (
          <Link
            href={`/supplements/${i.topProduct.slug}`}
            className="flex items-center gap-2 rounded-lg border border-border px-2.5 py-1.5 hover:border-accent/40 transition-colors max-w-full"
          >
            <span className="text-xs text-muted min-w-0">
              <span className="block text-[10px] uppercase tracking-wider">Top-scored product</span>
              <span className="block text-text truncate max-w-[220px]">
                {i.topProduct.brand} {i.topProduct.name}
              </span>
            </span>
            <ScoreMeter score={i.topProduct.score} size={32} strokeWidth={3} />
          </Link>
        )}
      </div>
      {shown.map((f, n) => (
        <FindingLine key={`${f.outcome}-${f.quote_pmid}-${n}`} f={f} />
      ))}
      {hidden > 0 && (
        <p className="text-xs text-muted mt-2">
          {hidden} more review finding{hidden === 1 ? "" : "s"}
          {directions.length === 1 ? (hidden === 1 ? " points the same way" : " point the same way") : ""}
          {i.slug && (
            <>
              {" "}
              —{" "}
              <Link href={`/ingredients/${i.slug}`} className="text-accent hover:underline">
                see {i.name}
              </Link>
            </>
          )}
          .
        </p>
      )}
    </li>
  );
}

export function ReviewEvidence({ goal, headingLevel = 2 }: { goal: Goal; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const lower = goal.label.toLowerCase();
  const hClass = "fm-display text-[length:var(--text-h-section)] text-text mb-2";
  return (
    <div className="space-y-10">
      {goal.helps.length > 0 && (
        <section>
          <H className={hClass}>Reviews found a benefit</H>
          <p className="text-sm text-muted mb-4">
            Systematic reviews concluded these improve an outcome tied to {lower}, and none concluded no effect.
          </p>
          <ol className="space-y-3">
            {goal.helps.map((i) => (
              <IngredientCard key={i.name} i={i} directions={["benefit"]} />
            ))}
          </ol>
        </section>
      )}

      {goal.mixed.length > 0 && (
        <section>
          <H className={hClass}>Mixed: a benefit on one measure, no effect on another</H>
          <ol className="space-y-3">
            {goal.mixed.map((i) => (
              <IngredientCard key={i.name} i={i} directions={["benefit", "no_effect"]} />
            ))}
          </ol>
        </section>
      )}

      {goal.noEffect.length > 0 && (
        <section>
          <H className={hClass}>Reviews found no effect</H>
          <p className="text-sm text-muted mb-4">
            Reviews studied these for an outcome tied to {lower} and concluded they made no difference.
          </p>
          <ol className="space-y-3">
            {goal.noEffect.map((i) => (
              <IngredientCard key={i.name} i={i} directions={["no_effect"]} />
            ))}
          </ol>
        </section>
      )}

      {goal.harmed.length > 0 && (
        <section className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5">
          <H className="text-sm font-semibold uppercase tracking-wider text-orange-400 mb-3">Harm reported</H>
          <ol className="space-y-3">
            {goal.harmed.map((i) => (
              <IngredientCard key={i.name} i={i} directions={["harm"]} />
            ))}
          </ol>
        </section>
      )}

      {goal.unclear.length > 0 && (
        <section>
          <H className={hClass}>Not enough to say</H>
          <p className="text-sm text-muted leading-relaxed">
            Reviews of {goal.unclear.map((i) => i.name).join(", ")} could not conclude either way on {lower}.
          </p>
        </section>
      )}
    </div>
  );
}
