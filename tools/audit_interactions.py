"""Audit the INTERACTIONS database for content depth and source quality.

Scores every interaction on:
  - details_words      : word count of the details field (depth proxy)
  - summary_words      : word count of the summary
  - has_timing         : bool
  - source_count       : total cited sources
  - specific_sources   : sources that look like real citations (PMID/DOI/URL)
  - vague_sources      : sources that read like "studies show" / journal-name-only
  - depth_tier         : thin | ok | good (based on details word count)
  - source_tier        : weak | ok | strong
  - page_ready_score   : 0-100, used to rank rewrite priority

Outputs:
  tools/interactions_audit_report.md   (human-readable, ranked)
  tools/interactions_audit_report.json (machine-readable)

Run from formulate-landing/:  python tools/audit_interactions.py
"""
from __future__ import annotations

import json
import re
import sys
from collections import Counter
from dataclasses import dataclass, asdict
from pathlib import Path

LANDING_ROOT = Path(__file__).resolve().parents[1]
FORMULATE_ROOT = LANDING_ROOT.parent / "Formulate"
sys.path.insert(0, str(FORMULATE_ROOT))

from app.services.interaction_service import INTERACTIONS  # noqa: E402

OUT_MD = LANDING_ROOT / "tools" / "interactions_audit_report.md"
OUT_JSON = LANDING_ROOT / "tools" / "interactions_audit_report.json"

SPECIFIC_SOURCE = re.compile(
    r"(?i)\b(pmid[:\s]*\d+|doi[:\s]*10\.\d|https?://\S+|pubmed\.ncbi|clinicaltrials\.gov)"
)

DEPTH_THIN_MAX = 60     # <= 60 words = thin
DEPTH_OK_MAX = 150      # 61-150 = ok, >150 = good
SOURCE_WEAK_MAX = 1
SOURCE_OK_MAX = 3


@dataclass
class AuditRow:
    pair: str
    severity: str
    interaction_type: str
    details_words: int
    summary_words: int
    has_timing: bool
    source_count: int
    specific_sources: int
    vague_sources: int
    depth_tier: str
    source_tier: str
    page_ready_score: int
    rewrite_priority: int  # higher = rewrite first


def _classify_source(s: str) -> bool:
    return bool(SPECIFIC_SOURCE.search(s))


def _depth_tier(words: int) -> str:
    if words <= DEPTH_THIN_MAX:
        return "thin"
    if words <= DEPTH_OK_MAX:
        return "ok"
    return "good"


def _source_tier(specific: int, total: int) -> str:
    if total == 0 or specific == 0:
        return "weak"
    if specific < 2:
        return "ok"
    return "strong"


def _page_ready_score(r: AuditRow) -> int:
    """0-100. 100 = ship-quality; 0 = needs full rewrite."""
    depth = min(r.details_words / 300 * 60, 60)        # 60pt max from depth
    src = min(r.specific_sources * 15, 30)             # 30pt max from specific sources
    timing = 10 if r.has_timing else 0                 # 10pt for timing
    return int(round(depth + src + timing))


def _rewrite_priority(r: AuditRow) -> int:
    """Higher = rewrite sooner. Weights severity (DANGER first) + current thinness."""
    severity_weight = {
        "danger": 100, "warning": 80, "caution": 60, "synergy": 40, "info": 20,
    }.get(r.severity, 30)
    thinness_penalty = max(0, 100 - r.page_ready_score)
    return severity_weight + thinness_penalty


def audit_one(i) -> AuditRow:
    sources = i.sources or []
    specific = sum(1 for s in sources if _classify_source(s))
    vague = len(sources) - specific
    details_words = len((i.details or "").split())
    summary_words = len((i.summary or "").split())

    row = AuditRow(
        pair=f"{i.substance_a} + {i.substance_b}",
        severity=i.severity.value,
        interaction_type=i.interaction_type.value,
        details_words=details_words,
        summary_words=summary_words,
        has_timing=bool(i.timing_advice),
        source_count=len(sources),
        specific_sources=specific,
        vague_sources=vague,
        depth_tier=_depth_tier(details_words),
        source_tier=_source_tier(specific, len(sources)),
        page_ready_score=0,
        rewrite_priority=0,
    )
    row.page_ready_score = _page_ready_score(row)
    row.rewrite_priority = _rewrite_priority(row)
    return row


def main() -> None:
    rows = [audit_one(i) for i in INTERACTIONS]
    rows.sort(key=lambda r: -r.rewrite_priority)

    # Aggregates
    depth_counts = Counter(r.depth_tier for r in rows)
    source_counts = Counter(r.source_tier for r in rows)
    sev_counts = Counter(r.severity for r in rows)
    avg_score = sum(r.page_ready_score for r in rows) / len(rows)
    thin_count = depth_counts["thin"]
    weak_src = source_counts["weak"]

    # JSON
    OUT_JSON.write_text(
        json.dumps([asdict(r) for r in rows], indent=2),
        encoding="utf-8",
    )

    # Markdown
    lines = []
    lines.append("# Interactions Audit Report\n")
    lines.append(f"- Total interactions: **{len(rows)}**")
    lines.append(f"- Average page-ready score: **{avg_score:.0f}/100**")
    lines.append(f"- Depth tiers: thin={depth_counts['thin']}, ok={depth_counts['ok']}, good={depth_counts['good']}")
    lines.append(f"- Source tiers: weak={source_counts['weak']}, ok={source_counts['ok']}, strong={source_counts['strong']}")
    lines.append(f"- Severity: {dict(sev_counts)}\n")

    lines.append("## Summary\n")
    if thin_count == len(rows):
        lines.append(f"- **All {len(rows)} pages are thin (<{DEPTH_THIN_MAX+1} words in `details`).** Depth expansion is the single biggest quality lever.")
    else:
        lines.append(f"- {thin_count}/{len(rows)} pages are thin (<{DEPTH_THIN_MAX+1} words in `details`).")
    lines.append(f"- {weak_src}/{len(rows)} pages have weak sourcing (no PMID/DOI/URL).")
    lines.append(f"- Only {sum(1 for r in rows if r.page_ready_score >= 70)} pages score >=70/100 page-ready.\n")

    lines.append("## Top 20 Rewrite Priorities\n")
    lines.append("| Pair | Severity | Type | Details (w) | Sources (spec/total) | Score |")
    lines.append("|---|---|---|---|---|---|")
    for r in rows[:20]:
        lines.append(
            f"| {r.pair} | {r.severity} | {r.interaction_type} | "
            f"{r.details_words} | {r.specific_sources}/{r.source_count} | "
            f"**{r.page_ready_score}** |"
        )

    lines.append("\n## Full Audit (sorted by rewrite priority, descending)\n")
    lines.append("| Pair | Severity | Words | Src (spec/total) | Score |")
    lines.append("|---|---|---|---|---|")
    for r in rows:
        lines.append(
            f"| {r.pair} | {r.severity} | {r.details_words} | "
            f"{r.specific_sources}/{r.source_count} | {r.page_ready_score} |"
        )

    OUT_MD.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {OUT_MD}")
    print(f"Wrote {OUT_JSON}")
    print(f"\nHeadline numbers:")
    print(f"  {len(rows)} interactions, avg page-ready score {avg_score:.0f}/100")
    print(f"  thin: {thin_count}  weak-sourced: {weak_src}")


if __name__ == "__main__":
    main()
