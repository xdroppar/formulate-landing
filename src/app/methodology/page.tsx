export const metadata = {
  title: "Methodology — Formulate",
  description:
    "How Formulate scores supplements: our evidence-based methodology for rating products on a 0–100 scale.",
};

export default function MethodologyPage() {
  return (
    <div className="pt-24 px-6 pb-16 max-w-[720px] mx-auto">
      <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">
        Methodology
      </div>
      <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] mb-6">
        How We Score Supplements
      </h1>

      <div className="space-y-8 text-sm text-muted leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-text mb-3">Overview</h2>
          <p>
            Every product in our catalog receives a score from 0 to 100 based on
            clinical evidence, ingredient quality, dosing accuracy, label
            transparency, and third-party verification. We do not accept payment
            from brands to influence scores.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Scoring Components</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="text-text font-medium">Ingredient Evidence</span>{" "}
              — Are the active ingredients backed by peer-reviewed research for
              the claimed benefits?
            </li>
            <li>
              <span className="text-text font-medium">Dose Accuracy</span> —
              Does the product provide clinically effective doses, not
              under-dosed token amounts?
            </li>
            <li>
              <span className="text-text font-medium">Formulation Quality</span>{" "}
              — Are bioavailable forms used? Are there unnecessary fillers or
              proprietary blends hiding actual amounts?
            </li>
            <li>
              <span className="text-text font-medium">Label Transparency</span>{" "}
              — Does the label clearly disclose every ingredient and amount?
            </li>
            <li>
              <span className="text-text font-medium">Third-Party Testing</span>{" "}
              — Is the product verified by independent labs (NSF, USP,
              Informed-Sport, etc.)?
            </li>
            <li>
              <span className="text-text font-medium">Value</span> — How does
              cost per effective serving compare to alternatives in the same
              category?
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Grade Scale</h2>
          <div className="bg-surface border border-border rounded-2xl p-5 space-y-2">
            <div><span className="font-bold text-accent">A (85–100)</span> — Excellent. Clinical doses, strong evidence, verified.</div>
            <div><span className="font-bold text-accent">B (70–84)</span> — Good. Mostly well-formulated with minor gaps.</div>
            <div><span className="font-bold text-warning">C (50–69)</span> — Average. Some effective ingredients but notable shortcomings.</div>
            <div><span className="font-bold text-danger">D (25–49)</span> — Below average. Under-dosed, poor transparency, or weak evidence.</div>
            <div><span className="font-bold text-danger">F (0–24)</span> — Poor. Not recommended based on available evidence.</div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Brand Scoring</h2>
          <p>
            Brand grades are derived from the average quality of their scored
            products plus additional factors: manufacturing transparency,
            third-party testing coverage, and track record. A brand with
            consistently high-scoring products earns a higher brand grade.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Independence</h2>
          <p>
            Formulate is independently operated. We may earn affiliate
            commissions when you purchase through links on our site, but this
            never influences scores. Products are scored before any commercial
            links are added.
          </p>
        </section>
      </div>
    </div>
  );
}
