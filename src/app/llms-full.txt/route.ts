import { buildLlmsIndex, LLMS_FULL_PAGES, SITE_ORIGIN, textFrom } from "@/lib/llms";

/**
 * The index plus the methodology in full, so an assistant can answer from one
 * fetch instead of crawling — a score quoted without the rubric behind it is a
 * number the assistant cannot explain.
 *
 * This replaced a script whose output was committed to public/ and went stale
 * the moment the pages it copied changed. The methodology text is still read
 * from the RENDERED pages, but now on a timer: a deploy serves whatever the
 * live pages said at build time, and the file re-reads them daily, so it can
 * trail a methodology change by a day rather than indefinitely. The index half
 * is built from source, so it is never behind at all.
 */
export const revalidate = 86400;

export async function GET() {
  const parts = [
    buildLlmsIndex().trim(),
    "",
    "---",
    "",
    "# Full content",
    "",
    "The scoring methodology in full, extracted from the published pages so that a",
    "score quoted from Formulate can be explained rather than only repeated.",
    "",
  ];
  for (const [path, title] of LLMS_FULL_PAGES) {
    try {
      const res = await fetch(SITE_ORIGIN + path, {
        headers: { "user-agent": "FormulateLlmsFull/1.0" },
        next: { revalidate },
      });
      if (!res.ok) {
        console.error(`llms-full: skip ${path} (HTTP ${res.status})`);
        continue;
      }
      const text = textFrom(await res.text());
      // A near-empty extraction means the page shape changed, not that the
      // methodology is short. Leaving the section out beats publishing chrome.
      if (text.length < 400) {
        console.error(`llms-full: skip ${path} (only ${text.length} chars)`);
        continue;
      }
      parts.push(`## ${title}`, `Source: ${SITE_ORIGIN}${path}`, "", text, "");
    } catch (err) {
      console.error(`llms-full: skip ${path}`, err);
    }
  }
  return new Response(parts.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
