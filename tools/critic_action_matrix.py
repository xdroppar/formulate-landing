"""Parse guide_critic_report.json and produce a prioritized action matrix.

Buckets findings by action type so implementation can be parallelized:
  - BLOCKING rebuttals       -> inline safety/contraindication sections
  - follow_up_questions      -> guide-faqs.ts entries
  - audience_gaps            -> inline audience callouts
  - evidence_gaps            -> guide-evidence.ts studies + inline citations
  - suggested_additions      -> inline H2 sections (high impact) or new guides

Outputs:
  critic_action_matrix.md   human-readable plan grouped by agent
  critic_action_matrix.json machine-readable for agent dispatch
"""
from __future__ import annotations

import json
import sys
from collections import Counter
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

ROOT = Path(__file__).resolve().parent.parent
REPORT = ROOT / "guide_critic_report.json"
OUT_MD = ROOT / "critic_action_matrix.md"
OUT_JSON = ROOT / "critic_action_matrix.json"


def main():
    data = json.loads(REPORT.read_text(encoding="utf-8"))

    # Aggregate counts
    total_rebuttals = Counter()
    total_additions_by_impact = Counter()
    guides_with_blocking = []
    all_blocking_rebuttals = []
    all_high_additions = []
    all_faq_opportunities = []
    all_audience_gaps = []
    all_evidence_gaps = []

    for g in data:
        slug = g["slug"]
        title = g.get("title", "")

        for r in g.get("rebuttals", []):
            sev = r.get("severity", "")
            total_rebuttals[sev] += 1
            if sev == "blocking":
                all_blocking_rebuttals.append({"slug": slug, **r})
                if slug not in [x["slug"] for x in guides_with_blocking]:
                    guides_with_blocking.append({"slug": slug, "title": title})

        for a in g.get("suggested_additions", []):
            impact = a.get("impact", "")
            total_additions_by_impact[impact] += 1
            if impact == "high":
                all_high_additions.append({"slug": slug, **a})

        for q in g.get("follow_up_questions", []):
            all_faq_opportunities.append({"slug": slug, **q})

        for ag in g.get("audience_gaps", []):
            all_audience_gaps.append({"slug": slug, **ag})

        for e in g.get("evidence_gaps", []):
            all_evidence_gaps.append({"slug": slug, **e})

    # Write summary markdown
    lines = ["# Critic Action Matrix", ""]
    lines.append(f"**Guides analyzed:** {len(data)}")
    lines.append(f"**Total rebuttals:** {sum(total_rebuttals.values())} "
                 f"({total_rebuttals['blocking']} blocking, "
                 f"{total_rebuttals['important']} important, "
                 f"{total_rebuttals['nice_to_have']} nice-to-have)")
    lines.append(f"**Total suggested additions:** {sum(total_additions_by_impact.values())} "
                 f"({total_additions_by_impact['high']} high, "
                 f"{total_additions_by_impact['medium']} medium, "
                 f"{total_additions_by_impact['low']} low)")
    lines.append(f"**Total follow-up FAQ opportunities:** {len(all_faq_opportunities)}")
    lines.append(f"**Total audience gaps:** {len(all_audience_gaps)}")
    lines.append(f"**Total evidence gaps:** {len(all_evidence_gaps)}")
    lines.append("")

    lines.append("---")
    lines.append(f"## Agent A: Blocking Safety/Contraindication Sections ({len(all_blocking_rebuttals)})")
    lines.append("")
    lines.append("These are YMYL liability issues. Each guide needs an inline 'Who should talk to a doctor' or 'Contraindications' section. Highest priority.")
    lines.append("")
    by_slug = {}
    for r in all_blocking_rebuttals:
        by_slug.setdefault(r["slug"], []).append(r)
    for slug, items in sorted(by_slug.items()):
        lines.append(f"### {slug}")
        for it in items:
            lines.append(f"- **Claim:** {it['claim']}")
            lines.append(f"  - **Critique:** {it['critique']}")
        lines.append("")

    lines.append("---")
    lines.append(f"## Agent B: High-Impact New Sections ({len(all_high_additions)})")
    lines.append("")
    lines.append("Inline H2 sections to add. Each targets a specific query cluster or retention play.")
    lines.append("")
    by_slug = {}
    for a in all_high_additions:
        by_slug.setdefault(a["slug"], []).append(a)
    for slug, items in sorted(by_slug.items()):
        lines.append(f"### {slug}")
        for it in items:
            lines.append(f"- **{it['section_title']}**")
            lines.append(f"  - {it['content_summary']}")
            lines.append(f"  - *Why:* {it['rationale']}")
        lines.append("")

    lines.append("---")
    lines.append(f"## Agent C: FAQ Expansion for guide-faqs.ts ({len(all_faq_opportunities)})")
    lines.append("")
    lines.append("Each follow-up question becomes an FaqItem. Mechanical: write concise answers, append to guide-faqs.ts, auto-renders via FAQPage schema.")
    lines.append("")
    by_slug = {}
    for q in all_faq_opportunities:
        by_slug.setdefault(q["slug"], []).append(q)
    for slug, items in sorted(by_slug.items()):
        lines.append(f"### {slug} ({len(items)} new FAQs)")
        for it in items:
            lines.append(f"- **Q:** {it['question']}")
            lines.append(f"  - Gap: {it['why_missing']}")
        lines.append("")

    lines.append("---")
    lines.append(f"## Agent D: Audience Gaps ({len(all_audience_gaps)})")
    lines.append("")
    lines.append("Short inline callouts for underserved segments. Usually 1-2 paragraphs per gap.")
    lines.append("")
    by_slug = {}
    for g in all_audience_gaps:
        by_slug.setdefault(g["slug"], []).append(g)
    for slug, items in sorted(by_slug.items()):
        lines.append(f"### {slug}")
        for it in items:
            lines.append(f"- **{it['audience']}** — {it['missing_need']}")
        lines.append("")

    lines.append("---")
    lines.append(f"## Agent E: Evidence Citations ({len(all_evidence_gaps)})")
    lines.append("")
    lines.append("Add to guide-evidence.ts study registry, link from guides via EvidenceBadge.")
    lines.append("")
    by_slug = {}
    for e in all_evidence_gaps:
        by_slug.setdefault(e["slug"], []).append(e)
    for slug, items in sorted(by_slug.items()):
        lines.append(f"### {slug}")
        for it in items:
            lines.append(f"- **Claim:** {it['claim']}")
            lines.append(f"  - **Needs:** {it['evidence_needed']}")
        lines.append("")

    OUT_MD.write_text("\n".join(lines), encoding="utf-8")

    matrix = {
        "summary": {
            "guides": len(data),
            "blocking_rebuttals": total_rebuttals["blocking"],
            "important_rebuttals": total_rebuttals["important"],
            "high_additions": total_additions_by_impact["high"],
            "medium_additions": total_additions_by_impact["medium"],
            "faq_opportunities": len(all_faq_opportunities),
            "audience_gaps": len(all_audience_gaps),
            "evidence_gaps": len(all_evidence_gaps),
        },
        "agent_a_blocking": all_blocking_rebuttals,
        "agent_b_high_additions": all_high_additions,
        "agent_c_faqs": all_faq_opportunities,
        "agent_d_audience": all_audience_gaps,
        "agent_e_evidence": all_evidence_gaps,
    }
    OUT_JSON.write_text(json.dumps(matrix, indent=2, ensure_ascii=False), encoding="utf-8")

    print("Action matrix summary:")
    for k, v in matrix["summary"].items():
        print(f"  {k}: {v}")
    print(f"\nWrote {OUT_MD.name} ({OUT_MD.stat().st_size // 1024}KB)")
    print(f"Wrote {OUT_JSON.name} ({OUT_JSON.stat().st_size // 1024}KB)")


if __name__ == "__main__":
    main()
