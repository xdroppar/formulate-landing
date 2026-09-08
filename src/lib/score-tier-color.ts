/**
 * THE 0-100 score-tier scale — mirrored VERBATIM from
 * `formulate-web/src/lib/score-tier-color.ts`. This site must not invent its
 * own; a product showing #3B82F6 blue here and #D4A853 in the app is the same
 * number wearing two colours one click apart.
 *
 * What was here before: five thresholds (90/80/70/60) over
 * #10B981 / #3B82F6 / #F59E0B / #F97316 / #EF4444 — a different palette AND
 * different bands from the app's, so nothing lined up. The app's own notes
 * record the same bug being fixed internally between two of its files, where a
 * score of 57 rendered orange on one surface and RED on another.
 *
 * MONOTONIC BY LUMINANCE — brighter is always better, every step >= 0.076
 * apart. The mint is retained for the top band only, so "good is green" still
 * holds while the rest of the site moves to the warm palette.
 *
 * The grade words a reader sees (Building / Solid / Strong / Elite) break at
 * 60/80/90, so the colours break there too.
 */

export interface ScoreTierBand {
  min: number;
  color: string;
  range: string;
  label: string;
  word: string;
}

export const SCORE_TIER_BANDS: ScoreTierBand[] = [
  { min: 90, color: "#00E5A0", range: "90+", label: "elite", word: "Elite" },
  { min: 80, color: "#D4A853", range: "80-89", label: "strong", word: "Strong" },
  { min: 60, color: "#BE9A4C", range: "60-79", label: "solid", word: "Solid" },
  { min: 0, color: "#C47D52", range: "below 60", label: "building", word: "Building" },
];

/** Colour for a 0-100 score. `null`/<=0 -> neutral grey. */
export function scoreTierColor(v: number | null | undefined): string {
  if (v == null || v <= 0) return "var(--color-muted)";
  for (const t of SCORE_TIER_BANDS) if (v >= t.min) return t.color;
  return "var(--color-muted)";
}

/** The tier's NAME, from the same band the colour comes from — so a surface
 *  showing both cannot disagree with itself. */
export function scoreTierWord(v: number | null | undefined): string | null {
  if (v == null || v <= 0) return null;
  return (SCORE_TIER_BANDS.find((t) => v >= t.min) ?? null)?.word ?? null;
}
