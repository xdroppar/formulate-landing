import type { Metadata } from "next";
import { stacks } from "@/lib/stacks";
import { ingredients } from "@/lib/encyclopedia";
import { StartClient } from "./start-client";

const BASE = "https://formulate-health.app";

export const metadata: Metadata = {
  title: `Build Your Supplement Stack — Free Goal-Based Quiz | Formulate`,
  description: `Tell us your goal and we'll build you an evidence-based supplement stack in seconds — every ingredient dose, timing, and research grade included. Then carry it straight into the free app.`,
  alternates: { canonical: `${BASE}/start` },
  openGraph: {
    title: `Build Your Supplement Stack — Free`,
    description: `Pick a goal, get an evidence-based stack with doses and research grades, then continue in the app.`,
    type: "website",
    url: `${BASE}/start`,
  },
};

export default function StartPage() {
  // Editorial goal-stacks carry the recommendation logic. We hand the client
  // only the fields it renders — no need to ship the full encyclopedia prose.
  const goalStacks = stacks.map((s) => ({
    slug: s.slug,
    name: s.name,
    tagline: s.tagline,
    tags: s.tags,
    ingredients: s.ingredients.map((i) => ({
      slug: i.slug,
      role: i.role,
      dose: i.dose,
      tier: i.tier,
    })),
  }));

  // Trim the encyclopedia down to what enriches a recommendation row:
  // display name + research grade. Keeps the client bundle small.
  const ingredientIndex = ingredients.map((i) => ({
    slug: i.slug,
    name: i.name,
    evidence_grade: i.evidence_grade,
  }));

  return <StartClient goalStacks={goalStacks} ingredientIndex={ingredientIndex} />;
}
