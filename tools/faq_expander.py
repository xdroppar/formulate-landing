"""Expand guide-faqs.ts with the follow-up questions surfaced by critic_guides.py.

For each guide with new follow-up questions:
  - Read existing guide content (for grounding)
  - Read existing FAQs (to dedupe)
  - Ask Claude to write concise, conservative answers grounded ONLY in the guide's
    existing claims + well-established facts
  - Output a TypeScript snippet ready to paste or append to guide-faqs.ts

Grounding rule: if the guide does not directly address a follow-up question
(e.g., pregnancy safety), the answer explicitly acknowledges that and points
to consulting a healthcare provider rather than inventing specifics.

Usage:
    ANTHROPIC_API_KEY=sk-... python tools/faq_expander.py
    # writes tools/faq_expander_output.ts with all new FAQs (to be reviewed,
    # then manually merged into src/lib/guide-faqs.ts)
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
CRITIC_JSON = ROOT / "guide_critic_report.json"
EXISTING_FAQS = ROOT / "src" / "lib" / "guide-faqs.ts"
OUT_TS = ROOT / "tools" / "faq_expander_output.ts"
OUT_JSON = ROOT / "tools" / "faq_expander_output.json"

MODEL = "claude-sonnet-4-6"

SYSTEM_PROMPT = """You write FAQ entries for a health/supplement content site. Each answer must be:

1. GROUNDED in the provided guide content. If the guide doesn't cover a topic (e.g., pregnancy, specific medications), your answer should say so plainly and suggest consulting a healthcare provider — do NOT invent specifics or doses.
2. CONCISE: 40–120 words. Direct, factual, no filler.
3. CONSISTENT with the guide's voice: informed, direct, slightly skeptical.
4. SAFE for YMYL (Your Money Your Life) content: never recommend doses not already in the guide, never make absolute medical claims, flag limitations.
5. STRUCTURED for rich results: lead with a direct answer in the first sentence, support with 1–2 sentences of detail.

Output ONLY valid JSON:
{
  "faqs": [
    {"question": "exact question from input", "answer": "40–120 word answer"}
  ]
}

For questions the guide does NOT address, write an answer that:
- Acknowledges the specific gap ("The guide doesn't cover this directly.")
- Gives the general safety principle (e.g., "For X, consult a physician because...")
- Stays under 80 words
- Never invents dose/timing/protocol specifics

Rewrite any redundant questions to be distinct from existing FAQs. Drop any question already well-covered by existing FAQs."""


def strip_jsx(src: str) -> str:
    src = re.sub(r"^import[\s\S]*?;\s*$", "", src, flags=re.M)
    src = re.sub(r"^export function[^{]*\{", "", src, flags=re.M)
    src = re.sub(r"<h2[^>]*>", "\n## ", src)
    src = re.sub(r"<h3[^>]*>", "\n### ", src)
    src = re.sub(r"</h[23]>", "\n", src)
    src = re.sub(r"<p[^>]*>", "\n", src)
    src = re.sub(r"</p>", "", src)
    src = re.sub(r"<[^>]+>", " ", src)
    src = re.sub(r"\{[^}]{0,200}\}", " ", src)
    for k, v in {"&mdash;": "—", "&ndash;": "–", "&rsquo;": "'", "&ldquo;": '"', "&rdquo;": '"'}.items():
        src = src.replace(k, v)
    src = re.sub(r"&[a-z]+;", " ", src)
    src = re.sub(r"[ \t]+", " ", src)
    src = re.sub(r"\n\s*\n+", "\n\n", src)
    return src.strip()


def load_existing_faqs() -> dict[str, list[str]]:
    """slug -> list of existing question strings"""
    text = EXISTING_FAQS.read_text(encoding="utf-8")
    out: dict[str, list[str]] = {}
    for m in re.finditer(r'"([a-z0-9\-]+)":\s*\[(.*?)\n\s*\],', text, re.S):
        slug = m.group(1)
        block = m.group(2)
        questions = re.findall(r'question:\s*"([^"]+)"', block)
        out[slug] = questions
    return out


def escape_ts(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").strip()


def main():
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("ERROR: ANTHROPIC_API_KEY not set", file=sys.stderr)
        sys.exit(1)

    critic_data = json.loads(CRITIC_JSON.read_text(encoding="utf-8"))
    existing = load_existing_faqs()
    client = Anthropic()

    all_new_faqs: dict[str, list[dict]] = {}
    total_cost = 0.0

    for g in critic_data:
        slug = g["slug"]
        follow_ups = g.get("follow_up_questions", [])
        if not follow_ups:
            continue

        content_path = CONTENT_DIR / f"{slug}.tsx"
        if not content_path.exists():
            print(f"  SKIP {slug}: no content file", file=sys.stderr)
            continue

        content = strip_jsx(content_path.read_text(encoding="utf-8"))
        # trim if very long — keep first ~6000 words
        words = content.split()
        if len(words) > 6000:
            content = " ".join(words[:6000])

        existing_q = existing.get(slug, [])
        questions_list = [f"- {fu['question']} (gap: {fu['why_missing']})" for fu in follow_ups]

        user_msg = (
            f"GUIDE SLUG: {slug}\n"
            f"TITLE: {g.get('title', '')}\n\n"
            f"EXISTING FAQs on this guide (skip duplicates):\n"
            + "\n".join(f"- {q}" for q in existing_q) + "\n\n"
            f"NEW FOLLOW-UP QUESTIONS to answer:\n"
            + "\n".join(questions_list) + "\n\n"
            f"--- GUIDE CONTENT ---\n{content}\n--- END GUIDE ---"
        )

        print(f"[{slug}] writing {len(follow_ups)} FAQ answers ...", end=" ", flush=True)
        t0 = time.time()
        resp = client.messages.create(
            model=MODEL,
            max_tokens=6000,
            system=[{"type": "text", "text": SYSTEM_PROMPT, "cache_control": {"type": "ephemeral"}}],
            messages=[{"role": "user", "content": user_msg}],
        )
        elapsed = time.time() - t0

        text = resp.content[0].text.strip()
        if text.startswith("```"):
            text = re.sub(r"^```[a-z]*\n?", "", text)
            text = re.sub(r"\n?```$", "", text)

        try:
            parsed = json.loads(text)
            new_faqs = parsed.get("faqs", [])
        except json.JSONDecodeError:
            m = re.search(r"\{[\s\S]*\}", text)
            if m:
                try:
                    parsed = json.loads(m.group())
                    new_faqs = parsed.get("faqs", [])
                except Exception:
                    new_faqs = []
            else:
                new_faqs = []

        all_new_faqs[slug] = new_faqs
        usage = resp.usage
        cost = (usage.input_tokens * 3 + usage.output_tokens * 15) / 1_000_000
        total_cost += cost
        print(f"OK {len(new_faqs)} answers ({elapsed:.1f}s, ${cost:.4f})")

    # write JSON for review
    OUT_JSON.write_text(json.dumps(all_new_faqs, indent=2, ensure_ascii=False), encoding="utf-8")

    # write TS snippet ready to paste into guide-faqs.ts
    ts_lines = ["// --- generated by faq_expander.py --- ",
                "// Review each entry, then append to guideFaqs object in guide-faqs.ts.",
                ""]
    for slug, faqs in all_new_faqs.items():
        if not faqs:
            continue
        ts_lines.append(f"// --- {slug} ({len(faqs)} new FAQs) ---")
        for f in faqs:
            q = escape_ts(f.get("question", ""))
            a = escape_ts(f.get("answer", ""))
            ts_lines.append(
                f'  {{ question: "{q}", answer: "{a}" }},'
            )
        ts_lines.append("")

    OUT_TS.write_text("\n".join(ts_lines), encoding="utf-8")

    total_faqs = sum(len(v) for v in all_new_faqs.values())
    print(f"\nDONE: {total_faqs} new FAQ entries across {len(all_new_faqs)} guides")
    print(f"Total cost: ${total_cost:.3f}")
    print(f"Output: {OUT_JSON} and {OUT_TS}")


if __name__ == "__main__":
    main()
