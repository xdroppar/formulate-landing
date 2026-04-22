"""Validate a completed interaction research workflow before shipping.

Reads tools/briefs/<pair>/02_evidence.json and 03_draft.md, enforces the
quality bar set by interaction_research_workflow.py, and exits non-zero
if the workflow is not ship-ready. Use as a manual check or wire into a
git pre-commit hook.

Usage:
    python tools/interaction_workflow_validate.py magnesium--zinc
    python tools/interaction_workflow_validate.py --all      # validate every workflow
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

LANDING_ROOT = Path(__file__).resolve().parents[1]
BRIEFS_DIR = LANDING_ROOT / "tools" / "briefs"

SPECIFIC_SOURCE = re.compile(
    r"(?i)\b(pmid[:\s]*\d+|doi[:\s]*10\.\d|https?://\S+|pubmed\.ncbi|clinicaltrials\.gov)"
)
STRENGTH_TAG = re.compile(r"\[(strong|moderate|weak|absent),\s*S\d+\]")

MIN_DETAILS_WORDS = 400
MAX_DETAILS_WORDS = 800
MAX_SUMMARY_CHARS = 120
MIN_SOURCES_PER_CLAIM = 2


@dataclass
class ValidationResult:
    pair: str
    ok: bool
    errors: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)


def _is_specific_source(source: dict) -> bool:
    joined = " ".join(str(source.get(k, "") or "") for k in ("pmid", "doi", "url"))
    return bool(SPECIFIC_SOURCE.search(joined))


def _count_words(text: str) -> int:
    return len((text or "").split())


def validate_one(pair_dir: Path) -> ValidationResult:
    name = pair_dir.name
    res = ValidationResult(pair=name, ok=True)

    evidence_path = pair_dir / "02_evidence.json"
    draft_path = pair_dir / "03_draft.md"

    if not evidence_path.exists():
        res.errors.append("02_evidence.json missing")
        res.ok = False
        return res
    if not draft_path.exists():
        res.errors.append("03_draft.md missing")
        res.ok = False
        return res

    # ---- Evidence JSON checks ----
    try:
        evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        res.errors.append(f"02_evidence.json invalid JSON: {e}")
        res.ok = False
        return res

    sources = evidence.get("sources") or []
    claims = evidence.get("claims") or []

    # 1. Source quality
    if not sources or sources == [dict()] or (len(sources) == 1 and not sources[0].get("title")):
        res.errors.append("sources[] is empty or scaffold-only")
    else:
        for s in sources:
            if not _is_specific_source(s):
                res.errors.append(
                    f"source {s.get('id', '?')} has no PMID/DOI/URL — vague source"
                )
            rc = s.get("retracted_check") or {}
            if not rc.get("checked"):
                res.warnings.append(f"source {s.get('id', '?')} retraction not checked")
            if rc.get("retracted"):
                res.errors.append(f"source {s.get('id', '?')} is RETRACTED — must be removed")

    # 2. Claims structure + corroboration
    if not claims or (len(claims) == 1 and not claims[0].get("statement")):
        res.errors.append("claims[] is empty or scaffold-only")
    else:
        source_ids = {s.get("id") for s in sources if s.get("id")}
        for c in claims:
            cid = c.get("claim_id", "?")
            supporting = c.get("supporting_source_ids") or []
            if len(supporting) < MIN_SOURCES_PER_CLAIM:
                if c.get("strength") in ("strong", "moderate"):
                    res.errors.append(
                        f"claim {cid} has {len(supporting)} source(s) but strength={c.get('strength')} "
                        f"— requires >= {MIN_SOURCES_PER_CLAIM}"
                    )
                else:
                    res.warnings.append(
                        f"claim {cid} has {len(supporting)} source(s); acceptable for weak/absent only"
                    )
            missing = set(supporting) - source_ids
            if missing:
                res.errors.append(f"claim {cid} references unknown source ids: {missing}")

            # Dose threshold required
            dt = c.get("dose_threshold") or {}
            if not dt.get("a") or not dt.get("b"):
                res.warnings.append(f"claim {cid} missing dose_threshold for A or B")

            # Population scope required
            if not c.get("population_scope"):
                res.warnings.append(f"claim {cid} missing population_scope")

    # 3. Severity / confidence alignment
    severity = (evidence.get("final_severity_proposed") or "").lower()
    if severity in ("danger", "warning"):
        # Require at least one strong/moderate claim
        strong_claims = [c for c in claims if (c.get("strength") in ("strong", "moderate"))]
        if not strong_claims:
            res.errors.append(
                f"severity={severity} but no claims with strong/moderate evidence"
            )

    # 4. Re-review metadata
    if not evidence.get("last_reviewed"):
        res.warnings.append("last_reviewed date not set")
    if not evidence.get("re_review_due"):
        res.warnings.append("re_review_due date not set")

    # 4b. Structured rendering fields — check if the 06_decision.md Python
    # entry populates the optional fields that enable structured H2 sections
    # on the public page (mechanism=, populations=, what_we_dont_know=,
    # severity_rationale=). These live in the decision file's Python literal,
    # not the evidence JSON. Soft warnings — existing pages render fine without.
    decision_path = pair_dir / "06_decision.md"
    if decision_path.exists():
        decision_text = decision_path.read_text(encoding="utf-8")
        for field_name, label in (
            ("mechanism", "mechanism"),
            ("populations", "populations"),
            ("severity_rationale", "severity rationale"),
        ):
            if f"{field_name}=" not in decision_text:
                res.warnings.append(
                    f"06_decision.md Python entry has no `{field_name}=` field — "
                    f"page will render without {label} section"
                )

    # 5. Contradictions actively considered
    if evidence.get("contradictions") is None:
        res.warnings.append("contradictions[] not populated — did Stage 4 actually run?")

    # ---- Draft checks ----
    draft = draft_path.read_text(encoding="utf-8")

    # details section word count
    details_match = re.search(r"## Details.*?\n(.*?)(?=\n## )", draft, re.S)
    if details_match:
        details_text = details_match.group(1)
        wc = _count_words(details_text)
        if wc < MIN_DETAILS_WORDS:
            res.errors.append(f"details section is {wc} words; min {MIN_DETAILS_WORDS}")
        if wc > MAX_DETAILS_WORDS:
            res.warnings.append(f"details section is {wc} words; soft max {MAX_DETAILS_WORDS}")
    else:
        res.errors.append("could not locate '## Details' section in draft")

    # strength tags present
    tags = STRENGTH_TAG.findall(draft)
    if len(tags) < max(3, len(claims)):
        res.errors.append(
            f"draft has {len(tags)} [strength, S#] tags; expected >= max(3, #claims={len(claims)})"
        )

    # summary length
    summary_match = re.search(r"## Summary.*?\n\n(.*?)\n\n", draft, re.S)
    if summary_match:
        s = summary_match.group(1).strip()
        # Strip placeholder
        if s.startswith("<"):
            res.errors.append("summary is still a placeholder")
        elif len(s) > MAX_SUMMARY_CHARS:
            res.errors.append(f"summary is {len(s)} chars; max {MAX_SUMMARY_CHARS}")

    # Recommendation actionable
    rec_match = re.search(r"## Recommendation\s*\n\n(.*?)\n\n", draft, re.S)
    if rec_match:
        rec = rec_match.group(1).strip().lower()
        if rec.startswith("<"):
            res.errors.append("recommendation is still a placeholder")
        elif "consult your doctor" in rec and len(rec) < 80:
            res.errors.append("recommendation is boilerplate 'consult your doctor' only — not actionable")

    res.ok = not res.errors
    return res


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("pair", nargs="?", help="workflow directory name, e.g. magnesium--zinc")
    ap.add_argument("--all", action="store_true", help="validate every workflow")
    args = ap.parse_args()

    if args.all:
        pair_dirs = [p for p in BRIEFS_DIR.iterdir() if p.is_dir()]
    elif args.pair:
        pair_dirs = [BRIEFS_DIR / args.pair]
        if not pair_dirs[0].exists():
            print(f"ERROR: {pair_dirs[0]} does not exist")
            sys.exit(2)
    else:
        ap.print_help()
        sys.exit(1)

    results = [validate_one(p) for p in pair_dirs]

    for r in results:
        status = "OK" if r.ok else "FAIL"
        print(f"\n[{status}] {r.pair}")
        for e in r.errors:
            print(f"  ERROR: {e}")
        for w in r.warnings:
            print(f"  warn:  {w}")

    failed = [r for r in results if not r.ok]
    print(f"\n{len(results) - len(failed)}/{len(results)} workflows pass.")
    if failed:
        sys.exit(1)


if __name__ == "__main__":
    main()
