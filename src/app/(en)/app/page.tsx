import type { Metadata } from "next";
import Link from "next/link";
import { MobileAppBadges } from "@/components/mobile-app-badges";
import { ANDROID_LIVE, APP_STORE_URL, IOS_LIVE } from "@/lib/app-store";

/**
 * The download page for the MOBILE app.
 *
 * Distinct from `/download`, which is the desktop-app waitlist (token-gated
 * installer + email request) and is not what someone searching "formulate app"
 * wants. Before this page the iOS app was reachable from exactly one place on
 * the whole site — a footer badge — and that badge was switched off.
 *
 * Deliberately a SERVER component so the copy is in the HTML for crawlers and
 * answer engines; only the store badge is client-side, because it fires
 * `mobile_badge_click`.
 */

const APP_NAME = "Formulate: Longevity Tracker";
const APP_TAGLINE = "Score your supplements & diet";

export const metadata: Metadata = {
  title: "Download the Formulate App — Free for iPhone",
  description:
    "Scan any supplement label and see it scored against research. Track food and supplements on one scale, watch your nutrient coverage fill in, and get interaction warnings. Free on iPhone.",
  alternates: { canonical: "https://formulate-health.app/app" },
  openGraph: {
    title: "Download the Formulate App — Free for iPhone",
    description:
      "Scan a label, see it scored on the evidence, and watch your nutrient gaps close. Free on iPhone.",
    url: "https://formulate-health.app/app",
    type: "website",
  },
};

const FEATURES: { title: string; body: string }[] = [
  {
    title: "Scan a label, get a real score",
    body: "Point the camera at any supplement and see every ingredient graded on the research behind it and the dose actually in the bottle — not the marketing on the front.",
  },
  {
    title: "Food and supplements on one scale",
    body: "Log a meal and a capsule the same way. Your nutrient coverage counts both, so you stop buying a pill for something dinner already handled.",
  },
  {
    title: "Interactions across your whole stack",
    body: "Every pairing you take gets checked for severity and timing, with the evidence cited — not just the pair you happened to search for.",
  },
  {
    title: "Your gaps, filled in order",
    body: "See which body systems your stack actually covers and which are still open, ranked by what matters for the goals you picked.",
  },
];

export default function AppPage() {
  return (
    <main className="max-w-[720px] mx-auto px-6 py-16">
      <p className="text-[13px] font-medium text-accent mb-3">Free · iPhone</p>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-text leading-[1.1] mb-4">
        {APP_TAGLINE}
      </h1>
      <p className="text-[17px] text-muted leading-relaxed mb-8">
        {APP_NAME} is the all-in-one app for tracking what you take and what it
        actually does for you. Free to use, with no brand sponsorships anywhere
        in the scoring.
      </p>

      {IOS_LIVE && (
        <div className="mb-4">
          <MobileAppBadges source="app_page_hero" emphasis="primary" />
        </div>
      )}

      <p className="text-[13px] text-muted/70 mb-14">
        {ANDROID_LIVE
          ? "Available on iPhone and Android."
          : "Android is still in testing — "}
        {!ANDROID_LIVE && (
          <>
            <Link href="/start" className="underline underline-offset-2 hover:text-accent transition-colors">
              use the web app
            </Link>{" "}
            in the meantime, it works in any mobile browser.
          </>
        )}
      </p>

      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-9 mb-14">
        {FEATURES.map((f) => (
          <section key={f.title}>
            <h2 className="text-[15px] font-bold text-text mb-1.5">{f.title}</h2>
            <p className="text-sm text-muted leading-relaxed">{f.body}</p>
          </section>
        ))}
      </div>

      <section className="rounded-2xl border border-border px-6 py-7">
        <h2 className="text-lg font-bold text-text mb-2">Not on an iPhone?</h2>
        <p className="text-sm text-muted leading-relaxed mb-5">
          The web app does the same scoring in any browser — answer two
          questions and it builds a starting stack you can adjust.
        </p>
        <Link
          href="/start"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-[#00ffb3] transition-colors"
        >
          Start on the web
        </Link>
      </section>

      {/* Answer engines and crawlers read this even when the badge above is a
          client component they may not execute. */}
      {IOS_LIVE && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              name: APP_NAME,
              applicationCategory: "HealthApplication",
              operatingSystem: "iOS",
              url: APP_STORE_URL,
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            }),
          }}
        />
      )}
    </main>
  );
}
