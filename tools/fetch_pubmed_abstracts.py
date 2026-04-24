"""
Fetch PubMed abstracts for every study referenced on the landing.

Pulls PMIDs from two sources:
  - src/data/supplement-studies.json      (explicit `pmid` field)
  - src/lib/guide-evidence.ts             (parse pubmed.ncbi.nlm.nih.gov/<pmid>)

Writes src/data/pubmed-abstracts.json keyed by PMID. Idempotent — existing
entries are preserved unless --refresh is passed. Rate-limited well under
NCBI's 3 req/sec free-tier limit (one batch ≈ 200 PMIDs, with a 400ms
sleep between batches).

Attribution: abstracts are MEDLINE data from the U.S. National Library of
Medicine. Per NLM's data distribution terms they can be redistributed with
source attribution — the /research/[slug] page renders that attribution
inline below each abstract.

Usage:
    python tools/fetch_pubmed_abstracts.py          # fetch only missing
    python tools/fetch_pubmed_abstracts.py --refresh  # re-fetch all
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

LANDING_ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = LANDING_ROOT / "src" / "data"
STUDIES_JSON = DATA_DIR / "supplement-studies.json"
GUIDE_EVIDENCE_TS = LANDING_ROOT / "src" / "lib" / "guide-evidence.ts"
OUT_FILE = DATA_DIR / "pubmed-abstracts.json"

EFETCH_URL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"
BATCH_SIZE = 200
BATCH_SLEEP_SECONDS = 0.4  # ~2.5 req/s, under the 3/s anonymous limit
TOOL_NAME = "formulate-landing"
CONTACT_EMAIL = "support@formulate-health.app"

PMID_URL_RE = re.compile(r"pubmed\.ncbi\.nlm\.nih\.gov/(\d+)")


def collect_pmids() -> set[str]:
    """Union of PMIDs across supplement-studies.json + guide-evidence.ts."""
    pmids: set[str] = set()

    data = json.loads(STUDIES_JSON.read_text(encoding="utf-8"))
    for key, entries in data.items():
        if key.startswith("_") or not isinstance(entries, list):
            continue
        for s in entries:
            pmid = s.get("pmid")
            if pmid and str(pmid).isdigit():
                pmids.add(str(pmid))

    ts = GUIDE_EVIDENCE_TS.read_text(encoding="utf-8")
    for m in PMID_URL_RE.finditer(ts):
        pmids.add(m.group(1))

    return pmids


def fetch_batch(pmids: list[str]) -> dict[str, dict]:
    """Fetch a batch of up to BATCH_SIZE PMIDs. Returns {pmid: {...}}."""
    params = {
        "db": "pubmed",
        "id": ",".join(pmids),
        "rettype": "abstract",
        "retmode": "xml",
        "tool": TOOL_NAME,
        "email": CONTACT_EMAIL,
    }
    url = f"{EFETCH_URL}?{urllib.parse.urlencode(params)}"
    req = urllib.request.Request(
        url, headers={"User-Agent": f"{TOOL_NAME} (+{CONTACT_EMAIL})"}
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        xml_text = resp.read().decode("utf-8")

    root = ET.fromstring(xml_text)
    out: dict[str, dict] = {}
    for article in root.findall(".//PubmedArticle"):
        pmid_el = article.find(".//MedlineCitation/PMID")
        if pmid_el is None or not pmid_el.text:
            continue
        pmid = pmid_el.text.strip()

        title_el = article.find(".//Article/ArticleTitle")
        title = _inner_text(title_el).strip() if title_el is not None else ""

        abstract_parts: list[str] = []
        for at in article.findall(".//Article/Abstract/AbstractText"):
            body = _inner_text(at).strip()
            if not body:
                continue
            label = (at.get("Label") or "").strip()
            if label:
                abstract_parts.append(f"{label.upper()}: {body}")
            else:
                abstract_parts.append(body)
        abstract = "\n\n".join(abstract_parts).strip()
        if not abstract:
            # Letter/editorial/retraction — no abstract body. Skip silently so
            # the caller knows this PMID has nothing to display.
            continue

        copyright_el = article.find(".//Article/Abstract/CopyrightInformation")
        copyright_text = (
            _inner_text(copyright_el).strip() if copyright_el is not None else ""
        )

        out[pmid] = {
            "pmid": pmid,
            "title": title,
            "abstract": abstract,
            "copyright": copyright_text,
            "fetched_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        }
    return out


def _inner_text(el: ET.Element | None) -> str:
    """Concatenate text including nested inline elements (e.g. <i>, <sup>)."""
    if el is None:
        return ""
    return "".join(el.itertext())


def load_existing() -> dict:
    if OUT_FILE.exists():
        return json.loads(OUT_FILE.read_text(encoding="utf-8"))
    return {"_meta": {}, "abstracts": {}}


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument(
        "--refresh",
        action="store_true",
        help="Re-fetch all PMIDs even if already cached.",
    )
    args = ap.parse_args()

    wanted = collect_pmids()
    if not wanted:
        print("No PMIDs found — nothing to do.", file=sys.stderr)
        return 1

    existing = load_existing()
    cached = set(existing.get("abstracts", {}).keys())

    to_fetch = sorted(wanted) if args.refresh else sorted(wanted - cached)
    print(
        f"PMIDs wanted: {len(wanted)}  cached: {len(cached & wanted)}  "
        f"to fetch: {len(to_fetch)}"
    )
    if not to_fetch:
        print("Nothing to fetch. Use --refresh to re-pull.")
        return 0

    fetched: dict[str, dict] = {}
    missing: list[str] = []
    for i in range(0, len(to_fetch), BATCH_SIZE):
        batch = to_fetch[i : i + BATCH_SIZE]
        print(
            f"  batch {i // BATCH_SIZE + 1}: fetching {len(batch)} PMIDs "
            f"({i + 1}-{i + len(batch)} of {len(to_fetch)})"
        )
        try:
            got = fetch_batch(batch)
        except Exception as e:
            print(f"  batch failed: {e}", file=sys.stderr)
            return 2
        fetched.update(got)
        missing.extend(p for p in batch if p not in got)
        if i + BATCH_SIZE < len(to_fetch):
            time.sleep(BATCH_SLEEP_SECONDS)

    merged_abstracts = dict(existing.get("abstracts") or {})
    merged_abstracts.update(fetched)

    payload = {
        "_meta": {
            "generated_at": datetime.now(timezone.utc)
            .replace(microsecond=0)
            .isoformat(),
            "source": "NCBI PubMed E-utilities (efetch)",
            "attribution": (
                "Abstracts sourced from PubMed, a database of the U.S. "
                "National Library of Medicine. Displayed with source "
                "attribution on each study page."
            ),
            "count": len(merged_abstracts),
        },
        "abstracts": merged_abstracts,
    }
    OUT_FILE.write_text(
        json.dumps(payload, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    print(f"Fetched {len(fetched)} new abstracts ({len(missing)} had no abstract body)")
    print(f"Total cached: {len(merged_abstracts)}")
    print(f"Output: {OUT_FILE}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
