import { evidenceTotals as t } from "@/lib/ingredient-evidence";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "What systematic reviews concluded about supplements";

const pct = (n: number) => `${Math.round((n / t.conclusions) * 100)}%`;

export default function Image() {
  return renderOgImage({
    topic: "Formulate report",
    title: `What ${t.conclusions.toLocaleString("en-US")} systematic-review conclusions say about supplements`,
    subtitle: `${pct(t.benefit)} found a benefit · ${pct(t.no_effect)} no effect · ${pct(t.unclear)} unclear · ${pct(t.harm)} harm`,
  });
}
