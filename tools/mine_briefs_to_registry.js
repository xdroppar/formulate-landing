/**
 * Mine interaction research briefs into guide-evidence.ts studies registry.
 *
 * Each brief at tools/briefs/<pair>/02_evidence.json has a `sources` array
 * with pmid / doi / url / title / year / key_findings. We turn each into
 * a Study entry and append to `studies` in guide-evidence.ts.
 *
 * Authors + journal are fetched from PubMed E-utilities for entries with
 * PMIDs; for DOI-only or URL-only sources we fall back to:
 *   - authors: "Primary literature" (+ we strongly prefer to have a PMID)
 *   - journal: derived from `type` field (case-report → "Case Report", etc.)
 *
 * Dedups against existing PubMed/PMC URLs in the registry so re-runs are
 * idempotent.
 *
 * Usage:
 *   node tools/mine_briefs_to_registry.js [--dry]
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const REGISTRY = path.resolve(__dirname, "..", "src", "lib", "guide-evidence.ts");
const BRIEFS_DIR = path.resolve(__dirname, "briefs");
const DRY = process.argv.includes("--dry");

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });
}

async function fetchPubmedMeta(pmids) {
  // esummary can batch multiple IDs at once
  if (pmids.length === 0) return {};
  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${pmids.join(",")}`;
  const out = {};
  try {
    const data = await fetchJson(url);
    const result = data.result || {};
    for (const pmid of pmids) {
      const r = result[pmid];
      if (!r) continue;
      const firstAuthor = (r.authors && r.authors[0] && r.authors[0].name) || "";
      const lastName = firstAuthor.split(" ")[0];
      const authorStr =
        r.authors && r.authors.length > 1 ? `${lastName} et al.` : lastName || "Author unknown";
      // Prefer the short MEDLINE abbreviation (r.source) — fulljournalname
      // can run 180+ chars ("International journal for vitamin and nutrition
      // research. Internationale Zeitschrift fur..."), which breaks OG images
      // and crowds the detail page. Fall back to fulljournalname if source
      // is missing.
      out[pmid] = {
        authors: authorStr,
        journal: r.source || r.fulljournalname || "Journal not specified",
      };
    }
  } catch (e) {
    console.error("PubMed fetch failed:", e.message);
  }
  return out;
}

function extractPmidFromUrl(url) {
  if (!url) return null;
  const direct = url.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/);
  return direct ? direct[1] : null;
}

function extractExistingIds(text) {
  const ids = new Set();
  const urlMatches = text.matchAll(/url:\s*"([^"]+)"/g);
  for (const m of urlMatches) {
    const pm = m[1].match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/);
    const pmc = m[1].match(/PMC(\d+)/);
    if (pm) ids.add(`pmid:${pm[1]}`);
    if (pmc) ids.add(`pmc:${pmc[1]}`);
  }
  const keyMatches = [...text.matchAll(/^\s{2}"([a-z0-9-]+)":\s*\{/gm)];
  const keys = new Set(keyMatches.map((m) => m[1]));
  return { ids, keys };
}

function pairToSlug(dirName) {
  return dirName.replace(/--/g, "-");
}

function journalFromType(type) {
  if (!type) return "Primary literature";
  const map = {
    "case-report": "Case report",
    rct: "Randomized controlled trial",
    review: "Review article",
    "systematic-review": "Systematic review",
    monograph: "Monograph",
    observational: "Observational study",
    "case-series": "Case series",
    "meta-analysis": "Meta-analysis",
  };
  return map[type] || type.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

async function main() {
  const registry = fs.readFileSync(REGISTRY, "utf-8");
  const { ids: existingIds, keys: existingKeys } = extractExistingIds(registry);

  const briefDirs = fs
    .readdirSync(BRIEFS_DIR)
    .filter((f) => fs.statSync(path.join(BRIEFS_DIR, f)).isDirectory());

  // First pass: collect candidates with their PMID (if any)
  const candidates = [];
  for (const dir of briefDirs) {
    const evPath = path.join(BRIEFS_DIR, dir, "02_evidence.json");
    if (!fs.existsSync(evPath)) continue;
    const data = JSON.parse(fs.readFileSync(evPath, "utf-8"));
    const pairSlug = pairToSlug(dir);
    for (const s of data.sources || []) {
      const pmid = s.pmid || extractPmidFromUrl(s.url);
      const dedupKeys = [];
      if (pmid) dedupKeys.push(`pmid:${pmid}`);
      const pmcMatch = (s.url || "").match(/PMC(\d+)/);
      if (pmcMatch) dedupKeys.push(`pmc:${pmcMatch[1]}`);
      if (dedupKeys.some((k) => existingIds.has(k))) {
        console.log(`  skip (dedup): ${s.title.slice(0, 60)}`);
        continue;
      }
      const baseKey = `${pairSlug}-${s.id.toLowerCase()}-${s.year}`;
      let key = baseKey;
      let n = 1;
      while (existingKeys.has(key)) {
        n += 1;
        key = `${baseKey}-${n}`;
      }
      existingKeys.add(key);
      dedupKeys.forEach((k) => existingIds.add(k));
      candidates.push({ ...s, pmid, key, pair: dir });
    }
  }

  console.log(`\nCandidates after dedup: ${candidates.length}`);
  if (candidates.length === 0) return;

  // Fetch PubMed metadata for entries with PMIDs
  const pmids = candidates.map((c) => c.pmid).filter(Boolean);
  console.log(`Fetching PubMed metadata for ${pmids.length} PMIDs...`);
  const pubmedMeta = await fetchPubmedMeta(pmids);
  console.log(`Got metadata for ${Object.keys(pubmedMeta).length} entries.`);

  const newEntries = candidates.map((c) => {
    const meta = c.pmid ? pubmedMeta[c.pmid] : null;
    const authors = meta?.authors || "Primary literature";
    const journal = meta?.journal || journalFromType(c.type);
    const summary = (c.key_findings || "").replace(/\s+/g, " ").trim();
    return {
      key: c.key,
      authors,
      year: c.year,
      journal,
      title: c.title,
      url: c.url || (c.doi ? `https://doi.org/${c.doi}` : ""),
      summary,
    };
  });

  console.log(`\nNew entries to write: ${newEntries.length}`);
  for (const e of newEntries) {
    console.log(`  [${e.year}] ${e.authors} — ${e.journal}: ${e.title.slice(0, 60)}...`);
  }

  if (DRY) {
    console.log("\n--dry specified, not writing.");
    return;
  }

  // Find end of `studies` object via brace-depth tracking
  const declMatch = registry.match(/export const studies[^=]*=\s*\{/);
  if (!declMatch) {
    console.error("Could not find `export const studies = {` declaration.");
    process.exit(1);
  }
  const startIdx = declMatch.index + declMatch[0].length;
  let depth = 1;
  let anchor = -1;
  for (let i = startIdx; i < registry.length; i++) {
    const c = registry[i];
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        anchor = i;
        break;
      }
    }
  }
  if (anchor === -1) {
    console.error("Could not balance braces in studies object.");
    process.exit(1);
  }

  const before = registry.slice(0, anchor);
  const after = registry.slice(anchor);

  const entriesSrc = newEntries
    .map(
      (e) => `  "${e.key}": {
    authors: ${JSON.stringify(e.authors)},
    year: ${e.year},
    journal: ${JSON.stringify(e.journal)},
    title: ${JSON.stringify(e.title)},
    url: ${JSON.stringify(e.url)},
    summary: ${JSON.stringify(e.summary)},
  },`,
    )
    .join("\n");

  const updated = before + entriesSrc + "\n" + after;
  fs.writeFileSync(REGISTRY, updated, "utf-8");
  console.log(`\nWrote ${newEntries.length} new study entries to ${REGISTRY}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
