#!/usr/bin/env node
// Lint ratchet. The error count may fall, never rise.
//
// Why a ratchet and not a plain `eslint .`: linting was switched on here on 2026-08-18
// against a codebase ESLint had never read, because `next lint` broke at the Next 16
// upgrade and nothing invoked it afterwards. Gating on zero would block every push
// behind a cleanup, so the gate holds the line: land nothing new, the number only falls.
//
//   node scripts/lint-gate.mjs           check against .lint-baseline.json
//   node scripts/lint-gate.mjs --write   record the current count as the baseline
//
// The baseline is COMMITTED on purpose. core.hooksPath is local config that no
// clone inherits, but the baseline must be shared or every worktree ratchets
// against a different number. Mirrors scripts/parity-manifest.json in mobile.

import { ESLint } from "eslint";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASELINE = join(root, ".lint-baseline.json");
const write = process.argv.includes("--write");

const eslint = new ESLint({ cwd: root });
const results = await eslint.lintFiles(["."]);

let errors = 0;
let warnings = 0;
const perFile = {};
for (const r of results) {
  errors += r.errorCount;
  warnings += r.warningCount;
  if (r.errorCount > 0) {
    // Forward slashes so a baseline recorded on Windows still matches on Linux CI.
    perFile[r.filePath.slice(root.length + 1).replace(/\\/g, "/")] = r.errorCount;
  }
}

if (write) {
  writeFileSync(
    BASELINE,
    JSON.stringify({ errors, warnings, files: perFile }, null, 2) + "\n"
  );
  console.log(`[lint-gate] baseline recorded: ${errors} errors, ${warnings} warnings`);
  console.log(`[lint-gate] commit .lint-baseline.json so every worktree shares it`);
  process.exit(0);
}

if (!existsSync(BASELINE)) {
  console.error(`[lint-gate] x no .lint-baseline.json - run: npm run lint:baseline`);
  process.exit(1);
}

const base = JSON.parse(readFileSync(BASELINE, "utf8"));

// Gate PER FILE, not on the total. A total-only ratchet is maskable: on 2026-08-18
// a planted error in one file was cancelled out by a fix landing in another, and the
// gate passed while a regression sat in the tree. Any file above its own baseline fails.
const was = base.files || {};
const risen = Object.entries(perFile)
  .map(([f, n]) => [f, n, was[f] || 0])
  .filter(([, n, before]) => n > before)
  .sort((a, b) => (b[1] - b[2]) - (a[1] - a[2]));

if (risen.length > 0) {
  const added = risen.reduce((a, [, n, before]) => a + (n - before), 0);
  console.error("");
  console.error(`[lint-gate] x ${risen.length} file(s) gained ${added} lint error(s). Total ${base.errors} -> ${errors}.`);
  console.error(`            The baseline holds the line; new errors are not allowed.`);
  console.error(`            Files that gained errors:`);
  for (const [f, n, before] of risen.slice(0, 8)) {
    console.error(`              ${before} -> ${n}   ${f}`);
  }
  console.error(`            See details with: npm run lint`);
  console.error(`            Emergency bypass:  git push --no-verify`);
  console.error("");
  process.exit(1);
}

if (errors < base.errors) {
  console.log(`[lint-gate] v lint errors fell: ${base.errors} -> ${errors} (-${base.errors - errors})`);
  console.log(`            Lock it in: npm run lint:baseline && git add .lint-baseline.json`);
  process.exit(0);
}

console.log(`[lint-gate] v lint errors held at ${errors} (warnings ${warnings})`);
process.exit(0);
