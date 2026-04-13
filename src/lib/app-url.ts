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
