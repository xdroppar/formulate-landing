export const metadata = {
  title: "Affiliate Disclosure — Formulate",
  description: "Formulate affiliate disclosure — how we earn revenue and maintain independence.",
};

export default function DisclosurePage() {
  return (
    <div className="pt-24 px-6 pb-16 max-w-[720px] mx-auto">
      <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">
        Transparency
      </div>
      <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] mb-2">
        Affiliate Disclosure
      </h1>
      <p className="text-xs text-muted mb-8">Last updated: March 2026</p>

      <div className="space-y-8 text-sm text-muted leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-text mb-3">How We Earn Revenue</h2>
          <p>
            Formulate is a free tool. We earn revenue through affiliate
            partnerships with retailers like Amazon and iHerb. When you click a
            product link and make a purchase, we may receive a small commission
            at no extra cost to you.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">
            Scores Are Independent
          </h2>
          <p>
            Our supplement scores are calculated using an automated,
            evidence-based scoring engine. Affiliate relationships have zero
            influence on scores. Products are scored before any purchase links
            are added. A product with no affiliate link receives the same
            scoring treatment as one with a link.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">
            What This Means for You
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>You never pay more by using our links.</li>
            <li>
              We recommend products based on evidence, not affiliate payouts.
            </li>
            <li>
              Low-scoring products are shown with the same purchase links as
              high-scoring ones — we do not hide products to push affiliate
              sales.
            </li>
            <li>
              Not every product has an affiliate link. Our catalog includes
              products regardless of whether we have a commercial relationship
              with the retailer.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">FTC Compliance</h2>
          <p>
            This disclosure is provided in accordance with the Federal Trade
            Commission&apos;s guidelines on endorsements and testimonials. We
            believe in full transparency about how we fund this project.
          </p>
        </section>
      </div>
    </div>
  );
}
