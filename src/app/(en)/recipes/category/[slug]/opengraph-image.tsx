import { categoryByCategorySlug, recipesByCategory } from "@/lib/recipes";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate recipes";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categoryByCategorySlug(slug);
  const n = cat ? recipesByCategory(cat).length : 0;
  return renderOgImage({ topic: "Recipes", title: cat ?? "Recipes", subtitle: n ? `${n} scored on real nutrition` : undefined });
}
