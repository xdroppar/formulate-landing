import { FACTORS } from "@/lib/supplement-factors";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Formulate";

export default function Image() {
  return renderOgImage({
    topic: "Methodology",
    title: "How supplements are scored",
    subtitle: FACTORS.filter((f) => f.weighted).map((f) => `${f.name.toLowerCase()} ${f.weight}`).join(" · "),
  });
}
