export const metadata = {
  title: "Support — Formulate",
  description: "Get help with the Formulate desktop, web, and mobile apps. Contact, FAQ, and troubleshooting.",
};

export default function SupportPage() {
  return (
    <div className="pt-24 px-6 pb-16 max-w-[720px] mx-auto">
      <div className="text-xs font-bold tracking-[2px] uppercase text-accent mb-3">
        Help
      </div>
      <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-[-1px] mb-2">
        Support
      </h1>
      <p className="text-xs text-muted mb-8">Last updated: April 2026</p>

      <div className="space-y-8 text-sm text-muted leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-text mb-3">Contact</h2>
          <p>
            Email{" "}
            <a
              href="mailto:support@formulate-health.app"
              className="text-accent underline-offset-2 hover:underline"
            >
              support@formulate-health.app
            </a>{" "}
            and we&apos;ll get back to you within a couple of business days.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Mobile app</h2>
          <p className="mb-3">
            The Formulate mobile app is currently rolling out on iOS and
            Android. If you&apos;re having trouble installing or signing in:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="text-text font-medium">Sign-in fails</span> —
              the API may be cold-starting; wait 10 seconds and try again. If
              the issue persists, email us your account email and the time of
              the failure so we can check logs.
            </li>
            <li>
              <span className="text-text font-medium">Stack didn&apos;t sync</span>{" "}
              — pull-to-refresh on the My Stack tab. Sync runs against the
              same backend as desktop and web, so anything you logged on
              another device should appear within a few seconds.
            </li>
            <li>
              <span className="text-text font-medium">Push notifications not arriving</span>{" "}
              — confirm notifications are enabled in your phone&apos;s system
              settings, then in Profile → Settings re-toggle reminders.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Account</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="text-text font-medium">Forgot password</span> —
              use the &quot;Forgot password&quot; link on the sign-in screen.
              Reset emails come from{" "}
              <span className="text-text font-medium">no-reply@formulate-health.app</span>{" "}
              and may land in spam on first send.
            </li>
            <li>
              <span className="text-text font-medium">Delete account</span> —
              in mobile go to Profile → Settings → Delete account, or email
              support and we&apos;ll wipe your row, stack, log history, and
              push tokens within 5 business days.
            </li>
            <li>
              <span className="text-text font-medium">Export your data</span>{" "}
              — email support and we&apos;ll send a JSON export of your stack
              and log history.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Catalog</h2>
          <p className="mb-3">
            Don&apos;t see a supplement you take? Tap{" "}
            <span className="text-text font-medium">Add a product</span> on
            the Browse tab to request it, or email us with the brand,
            product name, and a link. We add new products weekly.
          </p>
          <p>
            Spot a wrong score, missing ingredient, or stale image? Tap the
            three-dot menu on any product card and choose{" "}
            <span className="text-text font-medium">Report Issue</span>, or
            email support with the product name.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Subscriptions</h2>
          <p>
            Subscription detection scans your inbox for receipt emails after
            you connect Gmail. We never read message bodies beyond the parsing
            step, never store full message contents, and never send anything
            from your account. Disconnect at any time in Profile → Settings
            → Connected accounts.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text mb-3">Privacy &amp; data</h2>
          <p>
            See our{" "}
            <a href="/privacy" className="text-accent underline-offset-2 hover:underline">
              Privacy Policy
            </a>{" "}
            for what we collect, how it&apos;s used, and how to remove it.
            For a comprehensive summary of consumer health data rights, see
            the{" "}
            <a
              href="/privacy#consumer-health-data"
              className="text-accent underline-offset-2 hover:underline"
            >
              Consumer Health Data
            </a>{" "}
            section.
          </p>
        </section>
      </div>
    </div>
  );
}
