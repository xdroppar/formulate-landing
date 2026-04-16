"""Write the top N high-impact new sections identified by the critic sweep.

Each section is:
- 150–300 words of guide-quality prose
- Matches the tone/voice of the existing guide
- Grounded in established science (no hallucinated claims)
- TSX-ready (can be pasted into the guide content file)

Uses Opus for medical/health content precision.

Reads critic_action_matrix.json → agent_b_high_additions → sorts by impact,
deduplicates by topic, picks top N, generates prose for each.

Usage:
    ANTHROPIC_API_KEY=sk-... python tools/content_section_writer.py --limit 20
    # Estimated cost: ~$0.75 per section × 20 = ~$15

Outputs: tools/content_sections_output.{json,md}
"""
from __future__ import annotations

import json
import os
import re
import sys
import time
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

try:
    from anthropic import Anthropic
except ImportError:
    print("ERROR: pip install anthropic", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / "src" / "app" / "guides" / "[slug]" / "content"
MATRIX_JSON = ROOT / "critic_action_matrix.json"
OUT_JSON = ROOT / "tools" / "content_sections_output.json"
OUT_MD = ROOT / "tools" / "content_sections_output.md"

MODEL = "claude-opus-4-6"

SYSTEM_PROMPT = """You write new H2/H3 sections for a health/supplement content site. Each section will be inserted into an existing guide.

RULES:

1. TONE: Informed, direct, slightly skeptical of marketing. Second person ("you"). Short paragraphs (40-80 words). No filler, no "in this section we'll explore..."

2. LENGTH: 150-300 words total. Tight, not padded.

3. MEDICAL SAFETY: Never invent doses or safety thresholds. Use "evidence suggests" not "research proves." For specific populations (pregnant, medicated), default to "consult your healthcare provider."

4. EVIDENCE: Reference specific studies/meta-analyses by author name and year where possible. Use concrete numbers (percentages, mg, weeks) rather than vague qualifiers.

5. FORMAT: Output as TSX-ready JSX. Use these components (already imported in every guide):
   - <h2> / <h3> for headings
   - <p> for paragraphs
   - <Callout variant="info|warning" title="...">...</Callout> for callouts
   - <EvidenceBadge level="strong|moderate|emerging" /> inline after claims
   - <a href="/guides/...">text</a> for internal links
   - <strong> and <em> for emphasis

   DO NOT use <ul>/<ol> unless the content genuinely needs a list. Prefer prose.

6. GROUNDING: The section must be factually defensible. If the topic is genuinely unsettled (emerging evidence, conflicting studies), say so explicitly rather than cherry-picking one side.

7. KEYWORD INTEGRATION: Naturally include the section's target keyword in the first sentence and once more in the body. Don't stuff.

Output ONLY valid JSON:
{
  "section_jsx": "the full TSX block as a single string with proper newlines",
  "word_count": N,
  "target_keyword": "the long-tail query this section targets",
  "internal_links_used": ["slug1", "slug2"]
}"""


def strip_jsx_light(src: str) -> str:
    src = re.sub(r"^import[\s\S]*?;\s*$", "", src, flags=re.M)
    src = re.sub(r"<[^>]+>", " ", src)
    src = re.sub(r"\{[^}]{0,200}\}", " ", src)
    for k, v in {"&mdash;": "—", "&ndash;": "–", "&rsquo;": "'", "&ldquo;": '"', "&rdquo;": '"'}.items():
        src = src.replace(k, v)
    src = re.sub(r"&[a-z]+;", " ", src)
    src = re.sub(r"[ \t]+", " ", src)
    return src.strip()


def main():
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("ERROR: ANTHROPIC_API_KEY not set", file=sys.stderr)
        sys.exit(1)

    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=20, help="Max sections to generate")
    args = ap.parse_args()

    matrix = json.loads(MATRIX_JSON.read_text(encoding="utf-8"))
    additions = matrix["agent_b_high_additions"]

    # Deduplicate by (slug, section_title) — some critics suggest similar sections
    seen = set()
    unique = []
    for a in additions:
        key = (a["slug"], a.get("section_title", ""))
        if key not in seen:
            seen.add(key)
            unique.append(a)

    # Skip already-generated sections from previous runs
    already_done = set()
    if OUT_JSON.exists():
        try:
            prev = json.loads(OUT_JSON.read_text(encoding="utf-8"))
            for p in prev:
                already_done.add((p["slug"], p.get("section_title", "")))
            print(f"Skipping {len(already_done)} already-generated sections from previous run")
        except Exception:
            pass

    remaining = [a for a in unique if (a["slug"], a.get("section_title", "")) not in already_done]
    targets = remaining[: args.limit]
    print(f"Will generate {len(targets)} high-impact sections (est. ${len(targets) * 0.75:.2f})")

    client = Anthropic()
    results = []
    total_cost = 0.0

    for i, addition in enumerate(targets, 1):
        slug = addition["slug"]
        section_title = addition.get("section_title", "")
        content_summary = addition.get("content_summary", "")
        rationale = addition.get("rationale", "")

        content_path = CONTENT_DIR / f"{slug}.tsx"
        if not content_path.exists():
            print(f"SKIP {slug}: no content file")
            continue

        # Read guide for context (first 3000 words)
        guide_text = strip_jsx_light(content_path.read_text(encoding="utf-8"))
        words = guide_text.split()
        guide_context = " ".join(words[:3000])

        user_msg = (
            f"GUIDE SLUG: {slug}\n"
            f"SECTION TO WRITE:\n"
            f"  Title: {section_title}\n"
            f"  Summary: {content_summary}\n"
            f"  Rationale: {rationale}\n\n"
            f"EXISTING GUIDE CONTEXT (match this tone):\n{guide_context}"
        )

        print(f"[{i}/{len(targets)}] {slug} / {section_title[:50]} ...", end=" ", flush=True)
        t0 = time.time()
        try:
            resp = client.messages.create(
                model=MODEL,
                max_tokens=2500,
                system=[{"type": "text", "text": SYSTEM_PROMPT, "cache_control": {"type": "ephemeral"}}],
                messages=[{"role": "user", "content": user_msg}],
            )
        except Exception as e:
            print(f"ERR: {e}")
            continue
        elapsed = time.time() - t0

        text = resp.content[0].text.strip()
        if text.startswith("```"):
            text = re.sub(r"^```[a-z]*\n?", "", text)
            text = re.sub(r"\n?```$", "", text)

        parsed = None
        try:
            parsed = json.loads(text)
        except json.JSONDecodeError:
            mm = re.search(r"\{[\s\S]*\}", text)
            if mm:
                try:
                    parsed = json.loads(mm.group())
                except Exception:
                    pass
        if not parsed:
            print(f"ERR parse")
            continue

        usage = resp.usage
        cost = (usage.input_tokens * 15 + usage.output_tokens * 75) / 1_000_000
        total_cost += cost

        results.append({
            "slug": slug,
            "section_title": section_title,
            "impact": addition.get("impact", ""),
            **parsed,
        })
        wc = parsed.get("word_count", "?")
        print(f"OK ({wc} words, ${cost:.4f}, {elapsed:.1f}s)")

    # Append to existing results from previous runs
    all_results = []
    if OUT_JSON.exists():
        try:
            all_results = json.loads(OUT_JSON.read_text(encoding="utf-8"))
        except Exception:
            pass
    all_results.extend(results)
    OUT_JSON.write_text(json.dumps(all_results, indent=2, ensure_ascii=False), encoding="utf-8")

    lines = ["# Content Sections Output", f"\n{len(results)} sections. Total: ${total_cost:.3f}\n"]
    for r in results:
        lines.append(f"## {r['slug']} — {r['section_title']}")
        lines.append(f"- **Impact:** {r.get('impact', '?')}")
        lines.append(f"- **Target keyword:** {r.get('target_keyword', '?')}")
        lines.append(f"- **Word count:** {r.get('word_count', '?')}")
        if r.get("internal_links_used"):
            lines.append(f"- **Internal links:** {', '.join(r['internal_links_used'])}")
        lines.append("")
        lines.append("```tsx")
        lines.append(r.get("section_jsx", ""))
        lines.append("```")
        lines.append("\n---\n")
    OUT_MD.write_text("\n".join(lines), encoding="utf-8")

    print(f"\nDONE: {len(results)} sections, ${total_cost:.3f}")


if __name__ == "__main__":
    main()
