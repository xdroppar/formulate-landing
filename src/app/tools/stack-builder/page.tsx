import type { Metadata } from "next";
import { ingredients } from "@/lib/encyclopedia";
import { StackBuilderClient } from "./stack-builder-client";

const BASE = "https://formulate-health.app";

export const metadata: Metadata = {
  title: `Supplement Stack Builder — Formulate`,
  description: `Build a custom supplement stack from 969 evidence-graded ingredients. Auto-checks for interactions between everything in your stack, shows dose for each, and generates a shareable URL.`,
  alternates: { canonical: `${BASE}/tools/stack-builder` },
  openGraph: {
    title: `Supplement Stack Builder`,
    description: `Build a custom stack, auto-check interactions, share the result.`,
    type: "website",
    url: `${BASE}/tools/stack-builder`,
  },
};

export default function StackBuilderPage() {
  // Trim ingredient data down to what the builder needs. Keeps the
  // client bundle small — no heavy prose, no safety object.
  const options = ingredients.map((i) => ({
    slug: i.slug,
    name: i.name,
    category: i.category,
    evidence_grade: i.evidence_grade,
    typical_range: i.dosage?.typical_range ?? null,
    timing: i.dosage?.timing ?? null,
  }));

  return <StackBuilderClient ingredients={options} />;
}
