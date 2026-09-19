import { ingredientBySlug } from "@/lib/encyclopedia";
import { forIngredientPage } from "@/lib/ingredient-evidence";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate ingredient reference";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ing = ingredientBySlug(slug);
  const e = ing ? forIngredientPage(ing.slug) : null;
  const grade = ing?.evidence_grade ? `Evidence grade ${ing.evidence_grade}` : "Evidence-graded";
  const reviews = e
    ? `reviews: ${e.benefit.length} with a benefit, ${e.noEffect.length} with no effect`
    : "uses, dose, evidence and interactions";
  return renderOgImage({ topic: "Ingredient", title: ing?.name ?? "Ingredient", subtitle: `${grade} · ${reviews}` });
}
