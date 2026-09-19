import type { Metadata } from "next";
import { ingredients } from "@/lib/encyclopedia";
import { DoseCalculatorClient } from "./dose-calculator-client";

const BASE = "https://formulate-health.app";

export const metadata: Metadata = {
  title: `Supplement Dose Calculator`,
  description: `Look up evidence-based dose ranges for ${ingredients.length} supplement ingredients. Typical range, timing, with-food notes, forms, and bodyweight-adjusted dosing where it matters.`,
  alternates: { canonical: `${BASE}/tools/dose-calculator` },
  openGraph: {
    title: `Supplement Dose Calculator`,
    description: `Evidence-based dose lookup for ${ingredients.length} supplement ingredients.`,
    type: "website",
    url: `${BASE}/tools/dose-calculator`,
  },
};

export default function DoseCalculatorPage() {
  // Only what the search list needs. The detail for the one ingredient picked
  // is fetched from /api/dose/[slug]: serialising summary, dosage and forms
  // for all 968 put ~575 KB of props into this page's HTML.
  const ingredientOptions = ingredients.map((i) => ({
    slug: i.slug,
    name: i.name,
    category: i.category,
    evidence_grade: i.evidence_grade,
  }));

  return <DoseCalculatorClient ingredients={ingredientOptions} />;
}
