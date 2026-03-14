export const metadata = {
  title: "Privacy Policy — Formulate",
  description: "Formulate privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 px-6 pb-16 max-w-[720px] mx-auto">
      <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">
        Legal
      </div>
      <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] mb-2">
        Privacy Policy
      </h1>
      <p className="text-xs text-muted mb-8">Last updated: March 2026</p>

      <div className="space-y-8 text-sm text-muted leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-text mb-3">What We Collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="text-text font-medium">Account information</span>{" "}
              — Email address and display name when you create an account.
            </li>
            <li>
              <span className="text-text font-medium">Stack data</span> — The
              supplements you add to your personal stack are stored to sync
              across sessions.
            </li>
            <li>
              <span className="text-text font-medium">Usage analytics</span> —
              Anonymous page views and feature usage to improve the product. No
              personal health data is included in analytics.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">What We Don&apos;t Collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>We do not sell your data to third parties.</li>
            <li>We do not track your browsing outside of formulate-health.app.</li>
            <li>We do not share personal information with supplement brands.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Cookies</h2>
          <p>
            We use essential cookies for authentication and session management.
            We do not use advertising or third-party tracking cookies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Third-Party Services</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="text-text font-medium">Google Sign-In</span> —
              If you choose to sign in with Google, we receive your name and
              email from Google. See Google&apos;s privacy policy for their data
              practices.
            </li>
            <li>
              <span className="text-text font-medium">Vercel</span> — Our site
              is hosted on Vercel. See Vercel&apos;s privacy policy for their
              infrastructure data handling.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Data Deletion</h2>
          <p>
            You can delete your account and all associated data at any time from
            your account settings, or by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Contact</h2>
          <p>
            Questions about this policy? Reach us at{" "}
            <span className="text-accent">privacy@formulate-health.app</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
