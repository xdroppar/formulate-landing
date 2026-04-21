#!/usr/bin/env node
/**
 * Generate DALL-E 3 thumbnails for guide cards.
 *
 * Each visible guide in src/lib/guides.ts gets one 1024x1024 abstract
 * illustration saved to public/guides/<slug>.png. The card in
 * src/app/guides/page.tsx automatically picks up any `thumbnail` field
 * that matches `/guides/<slug>.png` if you set it.
 *
 * Flow:
 *   1. Dry-run first to preview prompts + cost.
 *   2. Export your key, then run for real (idempotent — skips existing).
 *   3. Wire each generated thumbnail by adding `thumbnail: "/guides/<slug>.png"`
 *      to that guide in src/lib/guides.ts.
 *
 * Usage:
 *   export OPENAI_API_KEY=sk-...
 *   node scripts/generate_guide_thumbnails.mjs --dry-run
 *   node scripts/generate_guide_thumbnails.mjs --slug creatine-monohydrate
 *   node scripts/generate_guide_thumbnails.mjs --limit 5
 *   node scripts/generate_guide_thumbnails.mjs           # all missing
 *
 * Cost: DALL-E 3 standard 1024x1024 = $0.04/image. 66 guides ≈ $2.64 total.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");
const OUT_DIR = path.join(REPO, "public", "guides");
const GUIDES_TS = path.join(REPO, "src", "lib", "guides.ts");

const COST_PER_IMAGE = 0.04;

function parseArgs(argv) {
  // Default pace: 65s between requests. New OpenAI accounts are rate-limited
  // to 1 image/min for DALL-E 3; exceeding returns 429. Raise `--pace 0` once
  // the account moves to a higher tier.
  const args = { dryRun: false, slug: null, limit: null, force: false, paceMs: 65000 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--force") args.force = true;
    else if (a === "--slug") args.slug = argv[++i];
    else if (a === "--limit") args.limit = parseInt(argv[++i], 10);
    else if (a === "--pace") args.paceMs = parseFloat(argv[++i]) * 1000;
  }
  return args;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Extract the visibleGuides array from guides.ts without running the TS
 * compiler. The file is plain data (no runtime imports), so a light regex
 * pass over `slug:` / `title:` / `category:` / `tags:` is enough to build
 * a prompt.
 */
async function loadGuides() {
  const src = await fs.readFile(GUIDES_TS, "utf-8");
  // Each guide is a `{ slug: "...", title: "...", ... }` block.
  const blocks = src.match(/\{\s*slug:\s*"[^"]+"[\s\S]*?\n\s*\},/g) || [];
  const guides = [];
  for (const block of blocks) {
    const get = (key) => {
      const m = block.match(new RegExp(`\\b${key}:\\s*"([^"]*)"`));
      return m ? m[1] : null;
    };
    const tagsMatch = block.match(/tags:\s*\[([^\]]*)\]/);
    const tags = tagsMatch
      ? [...tagsMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1])
      : [];
    const hidden = /\bhidden:\s*true\b/.test(block);
    const slug = get("slug");
    const title = get("title");
    const category = get("category");
    if (!slug || !title) continue;
    if (hidden) continue;
    guides.push({ slug, title, category: category || "guide", tags });
  }
  return guides;
}

/**
 * Map each guide's tags to a non-representational "mood" word. DALL-E 3
 * ignores negative prompts (saying "no pills" primes it to draw pills), and
 * any mention of "supplement" / "health" / "wellness" leaks supplement-shop
 * imagery. So the prompt is 100% positive, zero subject matter, and the only
 * differentiation between images is this mood word.
 */
const TAG_TO_MOOD = [
  [/\b(sleep|melatonin|insomnia|circadian|glycine|relax|calm)\b/i, "serene, tranquil, restful"],
  [/\b(energy|pre[- ]?workout|caffeine|kinetic|performance|sport)\b/i, "kinetic, charged, dynamic"],
  [/\b(muscle|strength|creatine|recovery|protein)\b/i, "structured, grounded, solid"],
  [/\b(brain|cognitive|mental|nootropic|focus|memory)\b/i, "cerebral, focused, lucid"],
  [/\b(heart|cardio|longevity|blood pressure|cholesterol)\b/i, "steady, measured, enduring"],
  [/\b(immun|inflamm|anti[- ]?oxidant|quercetin)\b/i, "radiant, balanced, resilient"],
  [/\b(gut|probiotic|prebiotic|digest|microbiome)\b/i, "layered, organic, balanced"],
  [/\b(hormone|testosterone|estrogen|thyroid|adaptogen)\b/i, "elemental, harmonic"],
  [/\b(skin|collagen|hair|beauty)\b/i, "luminous, gentle"],
  [/\b(vitamin|mineral|nutrient|deficienc|multivit)\b/i, "elemental, crystalline"],
  [/\b(protocol|stack|timing|label|beginner|guide)\b/i, "systematic, ordered, foundational"],
];

function moodFor(guide) {
  const haystack = [guide.title, ...(guide.tags || [])].join(" ");
  for (const [rx, mood] of TAG_TO_MOOD) {
    if (rx.test(haystack)) return mood;
  }
  return "quiet, refined, considered";
}

function promptFor(guide) {
  const mood = moodFor(guide);
  // Purely positive prompt. No negatives, no subject matter, no mention of
  // pills/bottles/health/supplement/wellness — even in a forbidden list.
  return (
    `A minimal abstract geometric poster. Flat vector composition of tessellated hexagons, ` +
    `circles, triangles, and isometric cubes arranged symmetrically around a central focal ` +
    `point. Generous negative space. Gallery art print aesthetic, Bauhaus pattern study. ` +
    `Palette: deep charcoal background, muted sage-green mid-tones, soft cream highlights. ` +
    `Restrained, desaturated. Mood: ${mood}. Pure abstract pattern, no subject matter.`
  );
}

async function generateImage(prompt, apiKey) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "url",
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`OpenAI ${res.status}: ${body.slice(0, 400)}`);
  }
  const data = await res.json();
  return data.data[0].url;
}

async function downloadTo(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download failed: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(destPath, buf);
}

/**
 * Walk guides.ts and add `thumbnail: "/guides/<slug>.png"` to every guide
 * that has a matching file on disk but no thumbnail field yet. Idempotent.
 * Returns the count of entries updated.
 */
async function wireThumbnails(availableSlugs) {
  const src = await fs.readFile(GUIDES_TS, "utf-8");
  let updated = src;
  let count = 0;

  for (const slug of availableSlugs) {
    // Match the full guide block for this slug, up through its closing `},`.
    // Lazy match so we don't swallow neighbouring guides.
    const blockRe = new RegExp(
      `(\\{\\s*slug:\\s*"${slug.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}"[\\s\\S]*?\\n\\s*\\},)`
    );
    const m = updated.match(blockRe);
    if (!m) continue;
    const block = m[1];
    if (/\bthumbnail:\s*"/.test(block)) continue; // already wired

    // Insert right after the slug line. Preserve indentation of surrounding fields.
    const insertRe = /(slug:\s*"[^"]+",\s*\n)(\s+)/;
    const inserted = block.replace(
      insertRe,
      (_full, slugLine, indent) =>
        `${slugLine}${indent}thumbnail: "/guides/${slug}.png",\n${indent}`
    );
    if (inserted === block) continue;

    updated = updated.replace(block, inserted);
    count++;
  }

  if (count > 0) {
    await fs.writeFile(GUIDES_TS, updated, "utf-8");
  }
  return count;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  await fs.mkdir(OUT_DIR, { recursive: true });

  let guides = await loadGuides();
  if (args.slug) guides = guides.filter((g) => g.slug === args.slug);

  // Skip guides that already have a thumbnail file on disk unless --force.
  const pending = [];
  for (const g of guides) {
    const out = path.join(OUT_DIR, `${g.slug}.png`);
    const exists = await fs.stat(out).then(() => true).catch(() => false);
    if (exists && !args.force) continue;
    pending.push({ ...g, outPath: out });
  }

  const todo = args.limit ? pending.slice(0, args.limit) : pending;

  console.log(`\nGuides total:    ${guides.length}`);
  console.log(`Already on disk: ${guides.length - pending.length}`);
  console.log(`To generate:     ${todo.length}`);
  console.log(`Est. cost:       $${(todo.length * COST_PER_IMAGE).toFixed(2)}\n`);

  if (args.dryRun) {
    for (const g of todo.slice(0, 5)) {
      console.log(`— ${g.slug}`);
      console.log(`  ${promptFor(g)}\n`);
    }
    if (todo.length > 5) console.log(`  ... and ${todo.length - 5} more`);
    console.log("\n(dry run — no API calls made)");
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("error: OPENAI_API_KEY not set");
    process.exit(1);
  }

  let done = 0;
  let failed = 0;
  for (let i = 0; i < todo.length; i++) {
    const g = todo[i];
    process.stdout.write(`[${i + 1}/${todo.length}] ${g.slug} ... `);
    try {
      const url = await generateImage(promptFor(g), apiKey);
      await downloadTo(url, g.outPath);
      done++;
      console.log("ok");
    } catch (e) {
      failed++;
      console.log(`FAILED: ${e.message}`);
    }
    // Pace between calls (skip after last item).
    if (i < todo.length - 1 && args.paceMs > 0) {
      await sleep(args.paceMs);
    }
  }

  console.log(`\nGenerated: ${done}   Failed: ${failed}`);
  console.log(`Files in:  ${OUT_DIR}`);

  // Wire every thumbnail currently on disk into guides.ts. Covers both this
  // run's new images and any leftovers from prior runs.
  const entries = await fs.readdir(OUT_DIR).catch(() => []);
  const onDisk = entries
    .filter((f) => f.endsWith(".png"))
    .map((f) => f.slice(0, -4));
  const wired = await wireThumbnails(onDisk);
  if (wired > 0) {
    console.log(`Wired ${wired} guide(s) in ${path.relative(REPO, GUIDES_TS)}`);
  }
}

// Call main only when invoked directly (not imported).
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
