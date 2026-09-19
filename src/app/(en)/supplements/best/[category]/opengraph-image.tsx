import { categoryBySlug, topProductsByCategory } from "@/lib/products";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate supplement rankings";

export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categoryBySlug(category);
  const top = cat ? topProductsByCategory(cat, 1)[0] : undefined;
  return renderOgImage({
    topic: "Ranked by evidence",
    title: cat ? `Best ${cat} supplements` : "Best supplements",
    subtitle: top ? `Top pick: ${top.brand} ${top.name} — ${top.score}/100` : undefined,
  });
}
