#!/usr/bin/env node
/**
 * Fails when browser code can reach a large data file.
 *
 * A module ships whole. If a "use client" file imports one small constant from
 * a module that also imports src/data/encyclopedia.json, every visitor
 * downloads the encyclopedia. That happened on 2026-09-18: /start, the stack
 * builder and the dose calculator each shipped 2 MB of JSON to render four
 * evidence labels. Nothing in the build complains, because the page still works.
 *
 * This walks every "use client" file's imports transitively (the @/ alias and
 * relative paths; `import type` is skipped because it never ships) and lists
 * each JSON file it reaches. Anything over LIMIT_KB fails. A small JSON (a
 * label table, a caption file) is fine, so the rule is about size, not about
 * data/ being off limits.
 *
 *   node scripts/check-client-data.mjs          # check
 *   node scripts/check-client-data.mjs --list   # also print every JSON reached
 */
import { readFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const SRC = join(ROOT, "src");
const LIMIT_KB = 100;
// Data the browser genuinely runs on. Each entry says why.
const ALLOWED = new Set([
  // The interaction checker runs client-side against the whole table
  // (/start, the stack builder, /interactions). 112 KB raw, 25 KB gzipped.
  "src/data/interactions.json",
]);
const LIST = process.argv.includes("--list");

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(tsx?|jsx?|mjs)$/.test(e.name)) out.push(p);
  }
  return out;
}

const EXTS = ["", ".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", "/index.ts", "/index.tsx", "/index.js"];
function resolveSpec(spec, from) {
  let base;
  if (spec.startsWith("@/")) base = join(SRC, spec.slice(2));
  else if (spec.startsWith(".")) base = resolve(dirname(from), spec);
  else return null; // a package; not our data
  for (const ext of EXTS) {
    const p = base + ext;
    if (existsSync(p) && statSync(p).isFile()) return p;
  }
  return null;
}

// Static imports and re-exports start a line; dynamic imports can sit anywhere.
// `import type` / `export type` are erased at compile time, so they never pull
// a module into the bundle. Comments are stripped first: prose saying "import"
// once let a match run on into a type-only import below it.
const STATIC_RE = /^[ \t]*(?:import|export)\s+(type\s+)?(?:[^'"`;]*?\sfrom\s+)?["']([^"']+)["']/gm;
const DYNAMIC_RE = /import\(\s*["']([^"']+)["']\s*\)/g;
const stripComments = (src) => src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'\\])\/\/.*$/gm, "$1");
function importsOf(file) {
  const src = stripComments(readFileSync(file, "utf8"));
  const specs = [];
  for (const m of src.matchAll(STATIC_RE)) if (!m[1]) specs.push(m[2]);
  for (const m of src.matchAll(DYNAMIC_RE)) specs.push(m[1]);
  return specs;
}

const isClient = (file) => /^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/\s*)*\s*["']use client["']/.test(readFileSync(file, "utf8"));

const clientFiles = walk(SRC).filter(isClient);
const failures = [];
const reachedAll = new Map(); // json -> Set(client entry)

for (const entry of clientFiles) {
  const seen = new Set([entry]);
  const via = new Map([[entry, null]]);
  const queue = [entry];
  while (queue.length) {
    const file = queue.shift();
    if (file.endsWith(".json")) continue;
    for (const spec of importsOf(file)) {
      const target = resolveSpec(spec, file);
      if (!target || seen.has(target)) continue;
      seen.add(target);
      via.set(target, file);
      if (target.endsWith(".json")) {
        const kb = statSync(target).size / 1024;
        if (!reachedAll.has(target)) reachedAll.set(target, new Set());
        reachedAll.get(target).add(entry);
        if (kb > LIMIT_KB && !ALLOWED.has(relative(ROOT, target).replaceAll("\\", "/"))) {
          const chain = [];
          for (let f = target; f; f = via.get(f)) chain.unshift(relative(ROOT, f).replaceAll("\\", "/"));
          failures.push({ kb: Math.round(kb), chain });
        }
      } else queue.push(target);
    }
  }
}

if (LIST) {
  for (const [json, entries] of [...reachedAll].sort()) {
    console.log(`${Math.round(statSync(json).size / 1024)} KB  ${relative(ROOT, json).replaceAll("\\", "/")}  <- ${entries.size} client file(s)`);
  }
}

if (failures.length) {
  console.error(`check-client-data: ${failures.length} client import chain(s) ship a data file over ${LIMIT_KB} KB to the browser:\n`);
  for (const f of failures) console.error(`  ${f.kb} KB: ${f.chain.join("\n      -> ")}\n`);
  console.error("Move what the client needs into a module that does not import the data (see src/lib/evidence-grade.ts).");
  process.exit(1);
}
console.log(`check-client-data: ${clientFiles.length} client files, no data file over ${LIMIT_KB} KB reachable.`);
