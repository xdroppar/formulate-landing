"""LLM-powered critic for guide content. Surfaces what intelligent readers
would push back on, follow-up questions, audience gaps, and concrete
content additions to preempt pogo-sticking (Google's #1 ranking killer
for "helpful content").

Complements seo_score_guides.py:
  - seo_score_guides.py  = rule-based structural scoring (regex)
  - critic_guides.py     = LLM semantic critique (what's MISSING)

Usage:
    # Single guide, prints report to stdout
    ANTHROPIC_API_KEY=sk-... python tools/critic_guides.py --slug best-creatine-supplements

    # All visible guides, writes JSON + markdown report
    ANTHROPIC_API_KEY=sk-... python tools/critic_guides.py --all

    # Dry run — show what would be critiqued, no API spend
    python tools/critic_guides.py --all --dry-run

Outputs:
  ./guide_critic_report.json   structured results for each guide
  ./guide_critic_report.md     human-readable summary

Cost estimate: ~$0.03-0.08 per guide with Sonnet 4.6 + prompt caching.
24 visible guides ≈ $1-2 total per full sweep.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")  # type: ignore[attr-defined]
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")  # type: ignore[attr-defined]
except Exception:
    pass
from dataclasses import dataclass
from pathlib import Path

try:
    from anthropic import Anthropic
except ImportError:
    print("ERROR: anthropic SDK not installed. Run: pip install anthropic", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / "src" / "app" / "guides" / "[slug]" / "content"
GUIDES_TS = ROOT / "src" / "lib" / "guides.ts"
OUT_JSON = ROOT / "guide_critic_report.json"
OUT_MD = ROOT / "guide_critic_report.md"

MODEL = "claude-sonnet-4-6"
MAX_TOKENS = 8000


SYSTEM_PROMPT = """You are a skeptical but fair expert reader evaluating a consumer-facing supplement/longevity guide. You combine three perspectives:

1. EDUCATED SKEPTIC: You know evidence hierarchies (meta-analyses > RCTs > observational > anecdote), biochemistry basics, and how supplement marketing manipulates.
2. PRAGMATIC READER: You care what a real reader actually does after reading. Incomplete answers send them back to Google — that pogo-sticking tanks rankings.
3. UNDERSERVED AUDIENCE ADVOCATE: You notice when guides only address the "default" reader and miss segments (pregnant, medicated, vegan, budget, older adults, athletes, beginners).

Your job: identify what an intelligent reader NEEDS to know but the guide FAILS to address. Be harsh — vague feedback wastes the author's time.

Output ONLY valid JSON (no prose before/after) with these exact keys:

{
  "rebuttals": [
    {"claim": "exact or paraphrased claim from guide", "critique": "why it's weak/incomplete/misleading", "severity": "blocking|important|nice_to_have"}
  ],
  "follow_up_questions": [
    {"question": "query a reader would Google right after", "why_missing": "what guide should cover to answer it"}
  ],
  "audience_gaps": [
    {"audience": "specific sub-segment", "missing_need": "what they'd want addressed"}
  ],
  "evidence_gaps": [
    {"claim": "claim lacking support", "evidence_needed": "specific study/data/citation that would fix it"}
  ],
  "suggested_additions": [
    {"section_title": "proposed new H2/H3 heading", "content_summary": "1-2 sentence outline", "impact": "high|medium|low", "rationale": "why this moves rankings or conversion"}
  ],
  "overall_verdict": "2-3 sentence summary of the guide's biggest weakness and what to fix first"
}

Be specific and concrete. Cite exact phrases from the guide when critiquing. Prioritize rebuttals/additions by real-world impact on a reader's decision, not just nitpicks."""


def strip_jsx(src: str) -> str:
    """Convert TSX guide content into plain text for the critic."""
    src = re.sub(r"^import[\s\S]*?;\s*$", "", src, flags=re.M)
    src = re.sub(r"^export function[^{]*\{", "", src, flags=re.M)
    # preserve heading structure by converting tags to markers
    src = re.sub(r"<h2[^>]*>", "\n\n## ", src)
    src = re.sub(r"</h2>", "", src)
    src = re.sub(r"<h3[^>]*>", "\n\n### ", src)
    src = re.sub(r"</h3>", "", src)
    src = re.sub(r"<p[^>]*>", "\n", src)
    src = re.sub(r"</p>", "", src)
    src = re.sub(r"<li[^>]*>", "\n- ", src)
    src = re.sub(r"</li>", "", src)
    # strip remaining JSX
    src = re.sub(r"<[^>]+>", " ", src)
    src = re.sub(r"\{[^}]{0,200}\}", " ", src)  # JSX expressions
    # decode common entities
    for k, v in {
        "&mdash;": "—", "&ndash;": "–", "&rsquo;": "'", "&ldquo;": '"',
        "&rdquo;": '"', "&amp;": "&", "&deg;": "°", "&nbsp;": " ",
    }.items():
        src = src.replace(k, v)
    src = re.sub(r"&[a-z]+;|&#\d+;", " ", src)
    src = re.sub(r"[ \t]+", " ", src)
    src = re.sub(r"\n\s*\n+", "\n\n", src)
    return src.strip()


def load_meta() -> dict[str, dict]:
    """Parse guides.ts for slug -> metadata including hidden flag."""
    text = GUIDES_TS.read_text(encoding="utf-8")
    blocks = re.findall(r"\{\s*slug:\s*\"([^\"]+)\"(.*?)\n\s*\}", text, re.S)
    out = {}
    for slug, body in blocks:
        def grab(key):
            m = re.search(rf"{key}:\s*\"([^\"]*)\"", body)
            return m.group(1) if m else ""
        hidden = bool(re.search(r"hidden:\s*true", body))
        out[slug] = {
            "title": grab("title"),
            "description": grab("description"),
            "category": grab("category"),
            "hidden": hidden,
        }
    return out


@dataclass
class CritiqueResult:
    slug: str
    title: str
    input_tokens: int
    output_tokens: int
    cache_read_tokens: int
    critique: dict
    elapsed_sec: float

    @property
    def cost_usd(self) -> float:
        # Sonnet 4.6 pricing (approximate): $3/Mtok input, $15/Mtok output, $0.30/Mtok cached read
        return (
            self.input_tokens * 3 / 1_000_000
            + self.output_tokens * 15 / 1_000_000
            + self.cache_read_tokens * 0.30 / 1_000_000
        )


def critique_guide(client: Anthropic, slug: str, meta: dict, content: str) -> CritiqueResult:
    user_message = (
        f"GUIDE SLUG: {slug}\n"
        f"TITLE: {meta.get('title', '')}\n"
        f"CATEGORY: {meta.get('category', '')}\n"
        f"DESCRIPTION: {meta.get('description', '')}\n\n"
        f"--- BEGIN GUIDE CONTENT ---\n{content}\n--- END GUIDE CONTENT ---"
    )

    t0 = time.time()
    resp = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        system=[{
            "type": "text",
            "text": SYSTEM_PROMPT,
            "cache_control": {"type": "ephemeral"},
        }],
        messages=[{"role": "user", "content": user_message}],
    )
    elapsed = time.time() - t0

    text = resp.content[0].text.strip()
    # strip markdown code fences if present
    if text.startswith("```"):
        text = re.sub(r"^```[a-z]*\n?", "", text)
        text = re.sub(r"\n?```$", "", text)

    try:
        critique = json.loads(text)
    except json.JSONDecodeError as e:
        # attempt to salvage: find the outermost {...}
        m = re.search(r"\{[\s\S]*\}", text)
        critique = json.loads(m.group()) if m else {"error": f"parse failed: {e}", "raw": text[:500]}

    usage = resp.usage
    return CritiqueResult(
        slug=slug,
        title=meta.get("title", ""),
        input_tokens=usage.input_tokens,
        output_tokens=usage.output_tokens,
        cache_read_tokens=getattr(usage, "cache_read_input_tokens", 0) or 0,
        critique=critique,
        elapsed_sec=elapsed,
    )


def write_markdown_report(results: list[CritiqueResult], out_path: Path) -> None:
    lines = ["# Guide Critic Report", ""]
    total_cost = sum(r.cost_usd for r in results)
    lines.append(f"**Guides critiqued:** {len(results)}  ")
    lines.append(f"**Total cost:** ${total_cost:.3f}  ")
    lines.append(f"**Model:** {MODEL}")
    lines.append("")
    lines.append("---")
    lines.append("")

    for r in results:
        c = r.critique
        if "error" in c:
            lines.append(f"## {r.slug} ⚠️ PARSE ERROR")
            lines.append(f"```\n{c.get('error')}\n```\n")
            continue

        lines.append(f"## {r.slug}")
        lines.append(f"*{r.title}*")
        lines.append("")
        lines.append(f"**Verdict:** {c.get('overall_verdict', '—')}")
        lines.append("")

        for section, key, singular in [
            ("Rebuttals", "rebuttals", "rebuttal"),
            ("Follow-up questions readers will Google", "follow_up_questions", "question"),
            ("Audience gaps", "audience_gaps", "gap"),
            ("Evidence gaps", "evidence_gaps", "gap"),
            ("Suggested additions", "suggested_additions", "addition"),
        ]:
            items = c.get(key, [])
            if not items:
                continue
            lines.append(f"### {section} ({len(items)})")
            for it in items:
                if key == "rebuttals":
                    sev = it.get("severity", "")
                    badge = {"blocking": "🔴", "important": "🟠", "nice_to_have": "🟡"}.get(sev, "")
                    lines.append(f"- {badge} **{it.get('claim', '')}**")
                    lines.append(f"  - {it.get('critique', '')}")
                elif key == "follow_up_questions":
                    lines.append(f"- **{it.get('question', '')}**")
                    lines.append(f"  - {it.get('why_missing', '')}")
                elif key == "audience_gaps":
                    lines.append(f"- **{it.get('audience', '')}** — {it.get('missing_need', '')}")
                elif key == "evidence_gaps":
                    lines.append(f"- **{it.get('claim', '')}**")
                    lines.append(f"  - Needs: {it.get('evidence_needed', '')}")
                elif key == "suggested_additions":
                    impact = it.get("impact", "")
                    badge = {"high": "🔥", "medium": "•", "low": "·"}.get(impact, "")
                    lines.append(f"- {badge} **{it.get('section_title', '')}** _({impact})_")
                    lines.append(f"  - {it.get('content_summary', '')}")
                    lines.append(f"  - *Why:* {it.get('rationale', '')}")
            lines.append("")

        lines.append(f"<sub>Tokens: in={r.input_tokens} out={r.output_tokens} cached={r.cache_read_tokens} · cost=${r.cost_usd:.4f} · {r.elapsed_sec:.1f}s</sub>")
        lines.append("")
        lines.append("---")
        lines.append("")

    out_path.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--slug", help="Critique a single guide by slug")
    ap.add_argument("--all", action="store_true", help="Critique all visible (non-hidden) guides")
    ap.add_argument("--include-hidden", action="store_true", help="Also include guides marked hidden")
    ap.add_argument("--dry-run", action="store_true", help="List guides without calling API")
    ap.add_argument("--limit", type=int, help="Max number of guides to critique")
    args = ap.parse_args()

    if not args.slug and not args.all:
        ap.error("Specify --slug <slug> or --all")

    meta_all = load_meta()

    if args.slug:
        targets = [args.slug]
    else:
        targets = [
            slug for slug, m in meta_all.items()
            if args.include_hidden or not m.get("hidden")
        ]
        if args.limit:
            targets = targets[: args.limit]

    # resolve content files
    pairs = []
    for slug in targets:
        path = CONTENT_DIR / f"{slug}.tsx"
        if not path.exists():
            print(f"SKIP {slug}: content file not found at {path}", file=sys.stderr)
            continue
        pairs.append((slug, path))

    print(f"Will critique {len(pairs)} guide(s). Estimated cost: ${len(pairs) * 0.05:.2f}")

    if args.dry_run:
        for slug, path in pairs:
            print(f"  {slug} ({path.stat().st_size} bytes)")
        return

    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("ERROR: ANTHROPIC_API_KEY env var not set", file=sys.stderr)
        sys.exit(1)

    client = Anthropic()
    results: list[CritiqueResult] = []

    for i, (slug, path) in enumerate(pairs, 1):
        print(f"[{i}/{len(pairs)}] {slug} ...", end=" ", flush=True)
        src = path.read_text(encoding="utf-8")
        content = strip_jsx(src)
        meta = meta_all.get(slug, {})
        try:
            result = critique_guide(client, slug, meta, content)
            results.append(result)
            n_rebuttals = len(result.critique.get("rebuttals", []))
            n_adds = len(result.critique.get("suggested_additions", []))
            print(f"OK  {n_rebuttals} rebuttals, {n_adds} additions (${result.cost_usd:.3f})")
        except Exception as e:
            print(f"ERR {type(e).__name__}: {e}")
            import traceback
            traceback.print_exc()

    # write reports
    OUT_JSON.write_text(json.dumps(
        [{"slug": r.slug, "title": r.title, "cost_usd": r.cost_usd, **r.critique} for r in results],
        indent=2, ensure_ascii=False,
    ), encoding="utf-8")
    write_markdown_report(results, OUT_MD)

    total_cost = sum(r.cost_usd for r in results)
    print(f"\nDONE: wrote {OUT_JSON.name} and {OUT_MD.name}")
    print(f"  Total cost: ${total_cost:.3f} across {len(results)} guides")


if __name__ == "__main__":
    main()
