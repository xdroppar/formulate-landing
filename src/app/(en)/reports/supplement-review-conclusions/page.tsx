import type { Metadata } from "next";
import Link from "next/link";
import {
  evidenceTotals,
  evidenceSource,
  ingredientTallies,
  allIngredientEvidence,
  type IngredientTally,
} from "@/lib/ingredient-evidence";
import { goalPages, pubmedUrl } from "@/lib/goals";

const BASE = "https://formulate-health.app";
const URL = `${BASE}/reports/supplement-review-conclusions`;
const CSV = `${BASE}/reports/supplement-review-conclusions.csv`;

const t = evidenceTotals;
const pct = (n: number) => `${Math.round((n / t.conclusions) * 100)}%`;
const refreshed = new Date(evidenceSource.generated_at);
const refreshedLabel = refreshed.toLocaleDateString("en-US", { year: "numeric", month: "long" });

export const metadata: Metadata = {
  title: `What ${t.conclusions.toLocaleString("en-US")} Systematic-Review Conclusions Say About ${t.ingredients} Supplements`,
  description: `We read what systematic reviews concluded about ${t.ingredients} supplement ingredients: ${pct(t.benefit)} of conclusions found a benefit, ${pct(t.no_effect)} found no effect, ${pct(t.unclear)} could not tell. Full dataset, every conclusion quoted and linked.`,
  alternates: { canonical: URL },
  openGraph: {
    title: `What ${t.conclusions.toLocaleString("en-US")} systematic-review conclusions say about supplements`,
    description: `${pct(t.benefit)} found a benefit. ${pct(t.no_effect)} found no effect. Every conclusion quoted, linked, and downloadable.`,
    type: "article",
    url: URL,
  },
};

/** Ingredients with enough conclusions for a share to mean something. */
const MIN_FOR_SHARE = 8;

function Row({ i }: { i: IngredientTally }) {
  return (
    <tr className="border-t border-border">
      <td className="py-2 pr-3 text-text">
        {i.slug ? (
          <Link href={`/ingredients/${i.slug}`} className="hover:text-accent transition-colors">
            {i.name}
          </Link>
        ) : (
          i.name
        )}
      </td>
      <td className="py-2 px-2 text-right tabular-nums">{i.total}</td>
      <td className="py-2 px-2 text-right tabular-nums text-accent">{i.benefit}</td>
      <td className="py-2 px-2 text-right tabular-nums">{i.no_effect}</td>
      <td className="py-2 px-2 text-right tabular-nums">{i.unclear}</td>
      <td className="py-2 pl-2 text-right tabular-nums text-orange-400">{i.harm || ""}</td>
    </tr>
  );
}

function Table({ rows }: { rows: IngredientTally[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-muted min-w-[480px]">
        <thead>
          <tr className="text-xs uppercase tracking-wider">
            <th className="text-left py-2 pr-3 font-semibold">Ingredient</th>
            <th className="text-right py-2 px-2 font-semibold">Conclusions</th>
            <th className="text-right py-2 px-2 font-semibold">Benefit</th>
            <th className="text-right py-2 px-2 font-semibold">No effect</th>
            <th className="text-right py-2 px-2 font-semibold">Unclear</th>
            <th className="text-right py-2 pl-2 font-semibold">Harm</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((i) => (
            <Row key={i.name} i={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ReviewConclusionsReport() {
  const byTotal = [...ingredientTallies].sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
  const mostStudied = byTotal.slice(0, 15);
  const rated = ingredientTallies.filter((i) => i.total >= MIN_FOR_SHARE);
  const share = (i: (typeof rated)[number]) => i.benefit / i.total;
  const mostPositive = [...rated].sort((a, b) => share(b) - share(a) || b.total - a.total).slice(0, 10);
  const leastSupported = [...rated].sort((a, b) => share(a) - share(b) || b.total - a.total).slice(0, 10);
  const harm = allIngredientEvidence
    .flatMap((i) => i.findings.filter((f) => f.direction === "harm").map((f) => ({ i, f })))
    .filter(({ f }, n, all) => all.findIndex((x) => x.f.quote_pmid === f.quote_pmid && x.f.outcome === f.outcome) === n)
    .sort((a, b) => a.i.name.localeCompare(b.i.name));

  const datasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Supplement systematic-review conclusions",
    description: `What systematic reviews concluded, per outcome, for ${t.ingredients} supplement ingredients: ${t.conclusions} conclusions classified as benefit, no effect, unclear or harm, each with a sentence quoted from a cited PubMed abstract.`,
    url: URL,
    creator: { "@type": "Organization", name: "Formulate", url: BASE },
    dateModified: refreshed.toISOString(),
    isAccessibleForFree: true,
    variableMeasured: ["ingredient", "outcome", "direction", "PubMed ID", "quoted conclusion"],
    distribution: [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: CSV }],
  };

  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }} />

      <header className="mb-10">
        <p className="fm-eyebrow text-accent mb-3">Formulate report · {refreshedLabel}</p>
        <h1 className="fm-display text-[clamp(26px,3.5vw,var(--text-h-argument))] text-text mb-4">
          What {t.conclusions.toLocaleString("en-US")} systematic-review conclusions say about {t.ingredients}{" "}
          supplements
        </h1>
        <p className="text-base text-muted leading-relaxed">
          For each supplement ingredient we read what systematic reviews and meta-analyses concluded, outcome by
          outcome — did it improve the thing it was tested for, make no difference, or could the reviews not tell?
          Every conclusion is quoted from a review and linked to it, and the whole dataset is{" "}
          <a href={CSV} className="text-accent hover:underline">
            free to download
          </a>
          .
        </p>
      </header>

      <section className="mb-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { n: t.benefit, label: "found a benefit", cls: "text-accent" },
          { n: t.no_effect, label: "found no effect", cls: "text-text" },
          { n: t.unclear, label: "could not tell", cls: "text-text" },
          { n: t.harm, label: "reported harm", cls: "text-orange-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-white/[0.02] p-4">
            <div className={`fm-display text-3xl ${s.cls}`}>{pct(s.n)}</div>
            <div className="text-xs text-muted mt-1">
              {s.n.toLocaleString("en-US")} {s.label}
            </div>
          </div>
        ))}
      </section>

      <section className="mb-12">
        <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-3">What stands out</h2>
        <ul className="text-sm text-muted leading-relaxed space-y-2 list-disc pl-5">
          <li>
            {t.benefit / t.conclusions < 0.5 ? "Fewer than half" : "Just over half"} of all conclusions ({pct(t.benefit)}) found
            that an ingredient improved the outcome it was reviewed for.
          </li>
          <li>
            About one in {Math.round(t.conclusions / t.no_effect)} ({pct(t.no_effect)}) concluded it made no difference.
          </li>
          <li>
            {pct(t.unclear)} could not conclude either way.
          </li>
          <li>
            {t.harm} conclusions ({pct(t.harm)}) reported a harm — listed in full below.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-2">The most-reviewed ingredients</h2>
        <p className="text-sm text-muted mb-4">Ranked by how many outcome conclusions the reviews reached.</p>
        <Table rows={mostStudied} />
      </section>

      <section className="mb-12">
        <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-2">Most consistently positive</h2>
        <p className="text-sm text-muted mb-4">
          Among ingredients with at least {MIN_FOR_SHARE} conclusions, the highest share that found a benefit.
        </p>
        <Table rows={mostPositive} />
      </section>

      <section className="mb-12">
        <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-2">Least supported</h2>
        <p className="text-sm text-muted mb-4">
          Among ingredients with at least {MIN_FOR_SHARE} conclusions, the lowest share that found a benefit — mostly
          no effect, or not enough to say.
        </p>
        <Table rows={leastSupported} />
      </section>

      <section className="mb-12 rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-orange-400 mb-3">Every harm reported</h2>
        <ul className="text-sm text-muted leading-relaxed space-y-2">
          {harm.map(({ i, f }) => (
            <li key={`${i.name}-${f.quote_pmid}-${f.outcome}`}>
              <span className="text-text font-semibold">{i.name}</span> — {f.outcome}.{" "}
              <span className="italic">&ldquo;{f.quote}&rdquo;</span>{" "}
              <a href={pubmedUrl(f.quote_pmid)} rel="noopener" target="_blank" className="text-accent hover:underline whitespace-nowrap">
                PMID {f.quote_pmid}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="fm-display text-[length:var(--text-h-section)] text-text mb-3">By goal</h2>
        <div className="flex flex-wrap gap-2">
          {goalPages.map((g) => (
            <Link
              key={g.slug}
              href={`/supplements/for/${g.slug}`}
              className="inline-flex items-center rounded-full border border-border bg-white/[0.02] px-3 py-1.5 text-sm text-text hover:border-accent/40 transition-colors"
            >
              {g.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10 rounded-2xl border border-border bg-card/30 p-6">
        <h2 className="fm-eyebrow mb-3">How this was done</h2>
        <div className="text-sm text-muted leading-relaxed space-y-3">
          <p>
            For each ingredient, two PubMed searches for systematic reviews and meta-analyses — the newest, and the
            most relevant — up to 14 reviews in all, keeping the conclusions each review states in its abstract.
          </p>
          <p>
            An AI model (Anthropic&apos;s Claude) read those conclusions and recorded, for every outcome they
            address, whether the review found a benefit, no effect, harm, or could not tell. Every recorded conclusion
            must quote a sentence, and that sentence is checked word for word against the abstract of a review it
            cites; any that cannot be found is dropped rather than kept.
          </p>
          <p>
            We checked the result against 28 claims a person had read from the literature by hand: the two agreed on
            19, differed only in strength on 7, and disagreed outright on 2.
          </p>
          <p>
            <span className="text-text">Limits.</span> A conclusion records the direction of an effect, not its size.
            Reviews inherit the quality and the publication bias of the trials they pool, and study populations vary
            — the outcome is shown as the review worded it. This is research, not medical advice.
          </p>
          <p>
            Last refreshed {refreshedLabel}. Source data version {evidenceSource.commit.slice(0, 7)}. Abstracts courtesy
            of the U.S. National Library of Medicine (PubMed).
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="fm-eyebrow mb-3">Data and citation</h2>
        <p className="text-sm text-muted leading-relaxed">
          <a href={CSV} className="text-accent hover:underline">
            Download all {t.conclusions.toLocaleString("en-US")} conclusions (CSV)
          </a>{" "}
          — ingredient, outcome, direction, PubMed IDs and the quoted sentence. To cite: Formulate, &ldquo;Supplement
          systematic-review conclusions,&rdquo; {refreshedLabel}, formulate-health.app/reports/supplement-review-conclusions.
        </p>
      </section>
    </main>
  );
}
