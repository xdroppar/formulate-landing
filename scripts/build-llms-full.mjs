/**
 * Build public/llms-full.txt from the pages the site actually publishes.
 *
 * llms.txt is an INDEX — links plus one-line descriptions. llms-full.txt is the
 * convention for the content itself, so an assistant can answer from one fetch
 * instead of crawling. It matters here because the citable, differentiating
 * material is the scoring methodology: an assistant quoting "Formulate scores
 * this 82" without knowing what the rubric measures is citing a number it
 * cannot explain.
 *
 * Text is EXTRACTED FROM THE LIVE PAGES rather than written by hand. A
 * hand-written summary drifts from the rubric it describes, and the failure is
 * silent — the file keeps asserting a methodology the product no longer uses.
 *
 *   node scripts/build-llms-full.mjs [origin]
 */
const ORIGIN = process.argv[2] || "https://formulate-health.app";

const PAGES = [
  ["/methodology", "Methodology — overview"],
  ["/methodology/supplements", "Methodology — supplement scoring"],
  ["/methodology/foods", "Methodology — whole food scoring"],
  ["/methodology/nutrients", "Methodology — nutrient targets"],
];

function textFrom(html) {
  // Scope to <main>. The page shell contributes "Skip to main content", the tab
  // bar and "Get started free" to every extraction -- repeated across four
  // pages that is chrome an assistant would read as if it were content.
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const scoped = main ? main[1] : html;
  const body = scoped.replace(/<script[\s\S]*?<\/script>/gi, " ")
                     .replace(/<style[\s\S]*?<\/style>/gi, " ")
                     .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
                     .replace(/<footer[\s\S]*?<\/footer>/gi, " ");
  return body
    .replace(/<\/(p|div|section|li|h[1-6]|tr)>/gi, "\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&[a-z]+;/gi, " ")
    .split("\n").map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
}

const index = await (await fetch(`${ORIGIN}/llms.txt`)).text();
const parts = [
  index.trim(),
  "",
  "---",
  "",
  "# Full content",
  "",
  "The scoring methodology in full, extracted from the published pages so that a",
  "score quoted from Formulate can be explained rather than only repeated.",
  "",
];

for (const [path, title] of PAGES) {
  const res = await fetch(ORIGIN + path, { headers: { "user-agent": "FormulateLlmsFullBuilder/1.0" } });
  if (!res.ok) { console.error(`  SKIP ${path} — HTTP ${res.status}`); continue; }
  const text = textFrom(await res.text());
  if (text.length < 400) { console.error(`  SKIP ${path} — only ${text.length} chars extracted`); continue; }
  parts.push(`## ${title}`, `Source: ${ORIGIN}${path}`, "", text, "");
  console.error(`  ok   ${path} — ${text.length} chars`);
}

const out = parts.join("\n");
const { writeFileSync } = await import("node:fs");
writeFileSync("public/llms-full.txt", out, "utf8");
console.error(`\nwrote public/llms-full.txt — ${out.length} bytes, ${out.split("\n").length} lines`);
