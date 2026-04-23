import type { Metadata } from "next";
import { ingredients } from "@/lib/encyclopedia";
import { DoseCalculatorClient } from "./dose-calculator-client";

const BASE = "https://formulate-health.app";

export const metadata: Metadata = {
  title: `Supplement Dose Calculator — Formulate`,
  description: `Look up evidence-based dose ranges for 969 supplement ingredients. Typical range, timing, with-food notes, forms, and bodyweight-adjusted dosing where it matters.`,
  alternates: { canonical: `${BASE}/tools/dose-calculator` },
  openGraph: {
    title: `Supplement Dose Calculator`,
    description: `Evidence-based dose lookup for 969 supplement ingredients.`,
    type: "website",
    url: `${BASE}/tools/dose-calculator`,
  },
};

export default function DoseCalculatorPage() {
  // Serialize only the fields the calculator needs — keeps the client bundle small.
  const ingredientOptions = ingredients.map((i) => ({
    slug: i.slug,
    name: i.name,
    category: i.category,
    evidence_grade: i.evidence_grade,
    summary: i.summary,
    dosage: i.dosage,
    forms: i.forms.map((f) => ({ form: f.form, score: f.score ?? null })),
  }));

  return <DoseCalculatorClient ingredients={ingredientOptions} />;
}
