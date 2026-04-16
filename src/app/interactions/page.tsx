import type { Metadata } from "next";
import Link from "next/link";
import { InteractionChecker } from "@/components/interaction-checker";
import { interactions, substances } from "@/lib/interactions";

const BASE = "https://formulate-health.app";
const URL = `${BASE}/interactions`;

export const metadata: Metadata = {
  title: "Supplement Interaction Checker — Formulate",
  description:
    "Free tool: check whether your supplements and medications interact. Covers dangerous combinations, timing conflicts, and synergies — with cited sources.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Supplement Interaction Checker",
    description:
      "Check your supplement stack for dangerous combinations, timing conflicts, and synergies. Curated database with cited sources.",
    type: "website",
    url: URL,
  },
};

const FEATURED_PAIRS = [
  { a: "vitamin-d", b: "vitamin-k2", label: "Vitamin D + K2" },
  { a: "calcium", b: "iron", label: "Calcium + Iron" },
  { a: "zinc", b: "copper", label: "Zinc + Copper" },
  { a: "curcumin", b: "black-pepper", label: "Curcumin + Black Pepper" },
  { a: "magnesium", b: "calcium", label: "Magnesium + Calcium" },
  { a: "st-johns-wort", b: "ssri", label: "St. John's Wort + SSRIs" },
];

export default function InteractionsPage() {
  const severityCounts = interactions.reduce(
    (acc, i) => {
      acc[i.severity] = (acc[i.severity] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Formulate Supplement Interaction Checker",
    url: URL,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free supplement and medication interaction checker with cited sources and severity ratings.",
    publisher: {
      "@type": "Organization",
      name: "Formulate",
      url: BASE,
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is the interaction checker free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The interaction checker is 100% free and requires no account.",
        },
      },
      {
        "@type": "Question",
        name: "Where does the interaction data come from?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Every interaction is curated from primary sources including the NIH Office of Dietary Supplements, FDA labeling, and peer-reviewed journals. We currently track ${interactions.length} pairwise interactions across ${substances.length} substances.`,
        },
      },
      {
        "@type": "Question",
        name: "Does it include prescription medications?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the database includes common interactions between supplements and prescription medications such as warfarin, SSRIs, statins, thyroid medications, and blood pressure drugs. Always consult your prescriber before changing anything.",
        },
      },
      {
        "@type": "Question",
        name: "Is this medical advice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Formulate is an educational tool. The interaction checker surfaces published evidence, but it is not a substitute for a qualified healthcare provider.",
        },
      },
    ],
  };

  return (
    <main id="main-content" className="max-w-3xl mx-auto px-6 md:px-8 pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">
          Free Tool
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-text tracking-tight mb-3">
          Supplement Interaction Checker
        </h1>
        <p className="text-muted text-base leading-relaxed">
          Add the supplements and medications you&apos;re taking. We&apos;ll check them
          against a curated database of {interactions.length} documented interactions —
          including dangerous combinations, absorption conflicts, timing issues, and
          beneficial synergies. Every entry has a cited source.
        </p>
      </header>

      <InteractionChecker />

      <section className="mt-12 pt-10 border-t border-border">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
          Popular pairs
        </h2>
        <ul className="flex flex-wrap gap-2">
          {FEATURED_PAIRS.map((p) => (
            <li key={`${p.a}-${p.b}`}>
              <Link
                href={`/interactions/${p.a}-and-${p.b}`}
                className="inline-block px-3 py-1.5 rounded-full bg-card/50 border border-border text-sm text-text hover:border-accent/60 hover:text-accent transition-colors"
              >
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 pt-8 border-t border-border">
        <h2 className="text-lg font-bold text-text mb-4">What we track</h2>
        <dl className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
          {(["danger", "warning", "caution", "synergy", "info"] as const).map((sev) => (
            <div key={sev} className="rounded-lg border border-border bg-card/30 p-3">
              <dt className="text-xs uppercase tracking-wider text-muted mb-1">{sev}</dt>
              <dd className="text-2xl font-bold text-text">{severityCounts[sev] ?? 0}</dd>
            </div>
          ))}
        </dl>
        <p className="text-xs text-muted mt-4 leading-relaxed">
          Formulate surfaces the same interaction intelligence inside the desktop app so
          you can see warnings on every stack change.{" "}
          <Link href="/download" className="text-accent hover:underline">
            Get the desktop app →
          </Link>
        </p>
      </section>

      <p className="text-xs text-muted mt-10 pt-6 border-t border-border leading-relaxed">
        <strong className="text-text">Medical disclaimer.</strong> This tool is for
        educational purposes only and does not replace advice from a qualified healthcare
        provider. Always consult your prescriber before combining supplements with
        prescription medication.
      </p>
    </main>
  );
}
