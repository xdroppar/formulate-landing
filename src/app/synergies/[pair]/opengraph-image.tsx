import { synergyBySlug } from "@/lib/synergies";
import { ingredientBySlug } from "@/lib/encyclopedia";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate supplement synergy";

export default async function Image({
  params,
}: {
  params: Promise<{ pair: string }>;
}) {
  const { pair } = await params;
  const s = synergyBySlug(pair);
  const a = s ? ingredientBySlug(s.a) : null;
  const b = s ? ingredientBySlug(s.b) : null;
  const title = a && b ? `${a.name} + ${b.name}` : "Supplement Synergy";

  return renderOgImage({
    topic: "Synergy",
    title,
    subtitle: s?.bottom_line,
    accentColor: "#34D399",
  });
}
