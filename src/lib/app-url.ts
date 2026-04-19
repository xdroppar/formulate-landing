const APP_URL = "https://app.formulate-health.app";

/**
 * Append UTM params to a webapp URL so conversions from the landing site
 * can be attributed back to the specific source (guide slug, page, etc).
 * Preserves existing query params. Safe to call on a URL that already has
 * utm_* params — will overwrite to the new source.
 */
export function withUtm(
  rawUrl: string,
  params: { source: string; medium?: string; campaign?: string; content?: string }
): string {
  try {
    const url = new URL(rawUrl);
    url.searchParams.set("utm_source", params.source);
    url.searchParams.set("utm_medium", params.medium ?? "landing");
    if (params.campaign) url.searchParams.set("utm_campaign", params.campaign);
    if (params.content) url.searchParams.set("utm_content", params.content);
    return url.toString();
  } catch {
    return rawUrl;
  }
}

/**
 * Build a URL to an ingredient encyclopedia page on the webapp, with UTM
 * attribution back to the referring guide. Use the canonical lc-supplements id
 * (e.g. "magnesium", "vitamin-d3", "ashwagandha"). Mismatched ids will 404.
 */
export function ingredientLearnUrl(
  ingredientId: string,
  source: string = "guide"
): string {
  return withUtm(`${APP_URL}/learning/supplements/${ingredientId}`, {
    source,
    medium: "guide-link",
    content: ingredientId,
  });
}
