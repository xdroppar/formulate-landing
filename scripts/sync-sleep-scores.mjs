/**
 * Copy the web app's sleep scores into src/data/sleep-scores.json.
 *
 * WHY A COPY OF THE NUMBERS AND NOT OF THE SCORER. Sleep gear is scored inside
 * formulate-web (src/lib/sleep-catalog.ts): 27 comparison sets, each with its
 * own feature map and weights, so a mattress is only ever compared with
 * mattresses. That module is the one place the rule lives — putting a second
 * copy here is how scores drifted apart between clients before. The web app
 * already publishes the result at /api/catalogs/sleep (the feed the phone app
 * reads), so this takes the SCORES from there and nothing else. Product facts
 * (name, brand, price, photo, maker link) stay in src/data/sleep-catalog.json,
 * mirrored by sync-from-web as before; the two join on id.
 *
 *   node scripts/sync-sleep-scores.mjs [origin]
 *
 * Re-run after the sleep catalog changes, alongside sync-from-web.
 */
import { readFileSync, writeFileSync } from "node:fs";

const ORIGIN = process.argv[2] || "https://app.formulate-health.app";
const res = await fetch(`${ORIGIN}/api/catalogs/sleep`);
if (!res.ok) {
  console.error(`sleep feed: HTTP ${res.status}`);
  process.exit(1);
}
const feed = await res.json();
const products = feed?.data?.products;
if (!Array.isArray(products) || !products.length) {
  console.error("sleep feed: no products in data.products");
  process.exit(1);
}

const local = JSON.parse(readFileSync("src/data/sleep-catalog.json", "utf8"));
const localIds = new Set(local.products.map((p) => p.id));

const scores = {};
let unmatched = 0;
for (const p of products) {
  if (typeof p.quality !== "number") continue;
  if (!localIds.has(p.id)) { unmatched++; continue; }
  scores[p.id] = {
    quality: p.quality,
    grade: p.grade,
    peer: p.peerLabel,
    attributes: (p.attributes ?? []).map((a) => a.detail).filter(Boolean),
    cautions: (p.cautions ?? []).map((c) => c.detail).filter(Boolean),
  };
}

writeFileSync(
  "src/data/sleep-scores.json",
  JSON.stringify(
    {
      _source: {
        url: `${ORIGIN}/api/catalogs/sleep`,
        generated_at: feed.generated_at,
        note: "Scores only, from the web app's sleep scorer. Do not edit by hand; re-run scripts/sync-sleep-scores.mjs.",
      },
      scores,
    },
    null,
    1,
  ) + "\n",
);
console.log(`sleep scores: ${Object.keys(scores).length} scored of ${products.length} in the feed; ${unmatched} scored ids not in the local catalog`);
if (unmatched) console.log("  -> run sync-from-web first: the local catalog is behind the feed");
