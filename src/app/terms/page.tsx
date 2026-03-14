export const metadata = {
  title: "Terms of Service — Formulate",
  description: "Formulate terms of service — rules and guidelines for using our platform.",
};

export default function TermsPage() {
  return (
    <div className="pt-24 px-6 pb-16 max-w-[720px] mx-auto">
      <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">
        Legal
      </div>
      <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] mb-2">
        Terms of Service
      </h1>
      <p className="text-xs text-muted mb-8">Last updated: March 2026</p>

      <div className="space-y-8 text-sm text-muted leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-text mb-3">Acceptance</h2>
          <p>
            By using Formulate (the website at formulate-health.app and the
            desktop application), you agree to these terms. If you do not agree,
            please do not use the service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">What Formulate Is</h2>
          <p>
            Formulate is an informational tool that scores and ranks dietary
            supplements based on publicly available clinical research. It is not
            a medical service, and scores are not medical advice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Not Medical Advice</h2>
          <p>
            Content on Formulate is for informational purposes only and is not
            intended to diagnose, treat, cure, or prevent any disease. Always
            consult a qualified healthcare professional before starting any
            supplement regimen. Scores reflect our analysis of published evidence
            and do not constitute medical recommendations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Accounts</h2>
          <p>
            You are responsible for maintaining the security of your account
            credentials. One account per person. We may suspend accounts that
            violate these terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Affiliate Links</h2>
          <p>
            Some product links on Formulate are affiliate links. When you
            purchase through these links, we may earn a commission at no
            additional cost to you. Affiliate relationships never influence
            product scores.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Intellectual Property</h2>
          <p>
            Scores, analysis, and written content on Formulate are our original
            work. Product names, images, and trademarks belong to their
            respective owners. You may not scrape, reproduce, or redistribute
            our scoring data without permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Limitation of Liability</h2>
          <p>
            Formulate is provided &quot;as is&quot; without warranty. We are not
            liable for any health outcomes, purchasing decisions, or damages
            arising from the use of our scores or content. Use of any supplement
            is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Changes</h2>
          <p>
            We may update these terms at any time. Continued use of Formulate
            after changes constitutes acceptance of the updated terms.
          </p>
        </section>
      </div>
    </div>
  );
}
