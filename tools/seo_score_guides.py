"""Score guide pages on 8 SEO/content axes. Outputs JSON + markdown report.

Run: python tools/seo_score_guides.py
"""
from __future__ import annotations
import json
import re
from pathlib import Path
from dataclasses import dataclass, asdict

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / "src" / "app" / "guides" / "[slug]" / "content"
GUIDES_TS = ROOT / "src" / "lib" / "guides.ts"
FAQS_TS = ROOT / "src" / "lib" / "guide-faqs.ts"
CROSS_SELLS_TS = ROOT / "src" / "lib" / "guide-cross-sells.ts"
OUT_JSON = ROOT / "seo_audit_report.json"
OUT_MD = ROOT / "seo_audit_report.md"


# --------------------------------------------------------------------------- metadata

def load_meta() -> dict[str, dict]:
    """Parse src/lib/guides.ts for slug -> {title, description, category, tags}."""
    text = GUIDES_TS.read_text(encoding="utf-8")
    blocks = re.findall(r"\{\s*slug:\s*\"([^\"]+)\"(.*?)\n\s*\}", text, re.S)
    out = {}
    for slug, body in blocks:
        def grab(key):
            m = re.search(rf"{key}:\s*\"([^\"]*)\"", body)
            return m.group(1) if m else ""
        tags = re.search(r"tags:\s*\[([^\]]*)\]", body)
        tag_list = re.findall(r"\"([^\"]+)\"", tags.group(1)) if tags else []
        out[slug] = {
            "title": grab("title"),
            "description": grab("description"),
            "category": grab("category"),
            "catalogLink": grab("catalogLink"),
            "tags": tag_list,
        }
    return out


def load_faqs() -> set[str]:
    if not FAQS_TS.exists():
        return set()
    text = FAQS_TS.read_text(encoding="utf-8")
    return set(re.findall(r"\"([a-z0-9\-]+)\":\s*\[", text))


def load_cross_sells() -> dict[str, int]:
    """Returns slug -> count of cross-sell links configured for that guide."""
    if not CROSS_SELLS_TS.exists():
        return {}
    text = CROSS_SELLS_TS.read_text(encoding="utf-8")
    # find each "slug": [ ... ], block and count { inside
    out = {}
    for m in re.finditer(r"\"([a-z0-9\-]+)\":\s*\[(.*?)\n\s*\],", text, re.S):
        out[m.group(1)] = len(re.findall(r"\{\s*slug:", m.group(2)))
    return out


# --------------------------------------------------------------------------- text utils

JSX_TAG = re.compile(r"<[^>]+>")
ENTITY = re.compile(r"&[a-z]+;|&#\d+;")
WS = re.compile(r"\s+")

def strip_jsx(src: str) -> str:
    # remove imports + export line
    src = re.sub(r"^import[\s\S]*?;\s*$", "", src, flags=re.M)
    src = re.sub(r"^export function[^{]*\{", "", src, flags=re.M)
    # drop JSX tags but keep inner text
    text = JSX_TAG.sub(" ", src)
    text = ENTITY.sub(" ", text)
    return WS.sub(" ", text).strip()


def flesch(text: str) -> float:
    words = re.findall(r"[A-Za-z]+", text)
    sentences = re.findall(r"[.!?]+", text)
    if not words or not sentences:
        return 0
    def syllables(w):
        w = w.lower()
        groups = re.findall(r"[aeiouy]+", w)
        n = len(groups)
        if w.endswith("e") and n > 1:
            n -= 1
        return max(1, n)
    total_syll = sum(syllables(w) for w in words)
    return 206.835 - 1.015 * (len(words) / len(sentences)) - 84.6 * (total_syll / len(words))


def clamp(v, lo=0, hi=5):
    return max(lo, min(hi, v))


# --------------------------------------------------------------------------- scorers

TRANSACTIONAL = ("best ", "top ", "review", "vs", "comparison")
INFORMATIONAL = ("what", "how", "why", "when", "guide", "signs", "do you", "should")


@dataclass
class Score:
    intent_fit: float
    monetization: float
    structure: float
    unique_value: float
    internal_linking: float
    actionability: float
    trust: float
    engagement: float
    notes: list[str]

    @property
    def total(self):
        return round(
            self.intent_fit + self.monetization + self.structure + self.unique_value
            + self.internal_linking + self.actionability + self.trust + self.engagement, 1
        )


def score_guide(slug: str, src: str, meta: dict, has_faq: bool, cross_sell_count: int = 0) -> Score:
    text = strip_jsx(src)
    words = re.findall(r"[A-Za-z][A-Za-z\-']+", text)
    wc = len(words)
    notes: list[str] = []

    # --- INTENT FIT -----------------------------------------------------------
    title = (meta.get("title") or slug).lower()
    slug_l = slug.lower()
    is_transactional = any(t in title for t in TRANSACTIONAL) or slug_l.startswith("best-")
    is_informational = any(t in title for t in INFORMATIONAL) or slug_l.startswith(("how-", "what-", "signs-", "do-"))
    product_mentions = len(re.findall(r"ProductCallout|ProductRow|PRODUCTS\.", src))
    intent = 3.0
    if is_transactional and product_mentions >= 3:
        intent = 5.0
    elif is_transactional and product_mentions < 2:
        intent = 2.5
        notes.append("transactional title but few product mentions")
    elif is_informational:
        intent = 4.5 if wc > 1500 else 3.5
    # description present?
    if not meta.get("description"):
        intent -= 0.5
        notes.append("missing meta description")

    # --- MONETIZATION ---------------------------------------------------------
    ctas = len(re.findall(r"ProductCallout|ProductRow", src))
    catalog_link_url = meta.get("catalogLink") or ""
    # Only credit catalog link if it actually points to a targeted catalog/stack path
    catalog_link = 1 if ("/catalog" in catalog_link_url or "/stack" in catalog_link_url) else 0
    affiliate_hits = len(re.findall(r"amazon\.com|amzn\.to|iherb\.com|affiliate", src, re.I))
    stack_link = len(re.findall(r"app\.formulate|/catalog|/supplements/", src))
    # Cross-sells to supplement guides count as monetization (they push users to product guides)
    monetization = clamp(ctas * 0.8 + catalog_link * 1.0 + affiliate_hits * 0.5
                         + min(stack_link, 4) * 0.4 + min(cross_sell_count, 4) * 0.5)
    if ctas == 0 and not catalog_link and cross_sell_count == 0:
        notes.append("no product CTAs, catalog link, or supplement cross-sells")

    # --- STRUCTURE & READABILITY ---------------------------------------------
    h2 = len(re.findall(r"<h2[ >]", src))
    h3 = len(re.findall(r"<h3[ >]", src))
    lists = len(re.findall(r"<(ul|ol)[ >]", src))
    tables = len(re.findall(r"<table[ >]", src))
    paragraphs = re.findall(r"<p[^>]*>([\s\S]*?)</p>", src)
    avg_para_words = (sum(len(re.findall(r"\w+", p)) for p in paragraphs) / len(paragraphs)) if paragraphs else 0
    fk = flesch(text)
    structure = 0
    structure += clamp(h2 / 2, 0, 2)                 # H2 density
    structure += clamp(h3 / 4, 0, 1)                 # H3 density
    structure += clamp((lists + tables) / 2, 0, 1)   # scannability
    if 40 <= avg_para_words <= 90:
        structure += 0.5
    if 50 <= fk <= 75:
        structure += 0.5
    structure = clamp(structure)
    if avg_para_words > 120:
        notes.append(f"avg paragraph {avg_para_words:.0f} words — too dense")
    if fk < 40:
        notes.append(f"low readability (Flesch {fk:.0f})")

    # --- UNIQUE VALUE ---------------------------------------------------------
    numbers = len(re.findall(r"\b\d+(?:\.\d+)?%|\b\d{2,4}\s?mg\b|\b\d{4}\s", text))
    studies = len(re.findall(r"\bRCT\b|meta-analysis|randomized|placebo|double-blind|systematic review", text, re.I))
    custom_components = len(re.findall(r"<(TLDRBox|InteractionCard|InteractionGroup|EvidenceBadge|Callout)[ >]", src))
    unique = clamp(min(numbers, 20) * 0.1 + min(studies, 10) * 0.2 + min(custom_components, 10) * 0.15)
    if studies < 2 and meta.get("category") in {"roundup", "guide", "review"}:
        notes.append("few study references")

    # --- INTERNAL LINKING -----------------------------------------------------
    internal = len(re.findall(r"href=\"/guides/|href=\"/supplements|href=\"/brands|Link\s+href=\"/", src))
    # Layout always renders RelatedGuides (3 links). Cross-sells add N more.
    layout_links = 3 + cross_sell_count
    link_score = clamp(internal * 0.6 + min(layout_links, 6) * 0.5)
    if internal == 0 and cross_sell_count == 0:
        notes.append("no inline internal links and no cross-sells")

    # --- ACTIONABILITY --------------------------------------------------------
    dose_hits = len(re.findall(r"\b\d+\s?(?:mg|g|mcg|IU|µg)\b", text))
    protocol_words = len(re.findall(r"\b(take|dose|cycle|timing|protocol|week|daily|morning|bedtime)\b", text, re.I))
    checklists = len(re.findall(r"<li[ >]", src))
    action = clamp(min(dose_hits, 15) * 0.15 + min(protocol_words, 40) * 0.04 + min(checklists, 20) * 0.08)

    # --- TRUST & CREDIBILITY --------------------------------------------------
    citations = len(re.findall(r"pubmed|doi\.org|ncbi\.nlm|\bet al\b|\b\d{4}\)", text, re.I))
    named_journals = len(re.findall(r"Journal|JAMA|Lancet|BMJ|Cell|Nature", text))
    disclaimer = 1 if re.search(r"not medical advice|consult", text, re.I) else 0
    evidence_badges = len(re.findall(r"EvidenceBadge", src))
    trust = clamp(min(citations, 10) * 0.3 + min(named_journals, 5) * 0.3 + disclaimer * 0.5 + min(evidence_badges, 5) * 0.3)
    if citations < 2:
        notes.append("weak citation density")

    # --- ENGAGEMENT / STICKINESS ---------------------------------------------
    # TOC, RelatedGuides, NewsletterSignup are rendered by ArticleLayout — credit them
    # to every guide. TLDR + FAQ + Callouts are per-guide.
    tldr = 1 if "TLDRBox" in src else 0
    faq = 1 if has_faq else 0
    callouts = len(re.findall(r"<Callout[ >]", src))
    layout_engagement = 0.8 + 0.8 + 0.5  # TOC + RelatedGuides + Newsletter (always present)
    engagement = clamp(tldr * 1.0 + faq * 1.0 + min(callouts, 5) * 0.2 + layout_engagement)
    if not faq:
        notes.append("no FAQ entries")
    if not tldr:
        notes.append("no TLDR box")

    return Score(
        intent_fit=round(intent, 1),
        monetization=round(monetization, 1),
        structure=round(structure, 1),
        unique_value=round(unique, 1),
        internal_linking=round(link_score, 1),
        actionability=round(action, 1),
        trust=round(trust, 1),
        engagement=round(engagement, 1),
        notes=notes,
    )


# --------------------------------------------------------------------------- main

def main():
    meta = load_meta()
    faqs = load_faqs()
    cross_sells = load_cross_sells()
    results = []
    for path in sorted(CONTENT_DIR.glob("*.tsx")):
        slug = path.stem
        src = path.read_text(encoding="utf-8")
        m = meta.get(slug, {})
        score = score_guide(slug, src, m, has_faq=slug in faqs,
                            cross_sell_count=cross_sells.get(slug, 0))
        wc = len(re.findall(r"\w+", strip_jsx(src)))
        results.append({
            "slug": slug,
            "title": m.get("title", slug),
            "category": m.get("category", ""),
            "word_count": wc,
            **asdict(score),
            "total": score.total,
        })

    results.sort(key=lambda r: r["total"], reverse=True)
    OUT_JSON.write_text(json.dumps(results, indent=2), encoding="utf-8")

    # markdown
    lines = ["# SEO Guide Audit\n"]
    lines.append(f"Scored {len(results)} guides on 8 axes (0–5 each, 40 total).\n")
    lines.append("## Rankings\n")
    lines.append("| # | Guide | Total | Intent | Mon | Struct | Unique | Links | Action | Trust | Engage | Words |")
    lines.append("|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|")
    for i, r in enumerate(results, 1):
        lines.append(
            f"| {i} | [{r['slug']}](src/app/guides/[slug]/content/{r['slug']}.tsx) "
            f"| **{r['total']}** | {r['intent_fit']} | {r['monetization']} | {r['structure']} "
            f"| {r['unique_value']} | {r['internal_linking']} | {r['actionability']} "
            f"| {r['trust']} | {r['engagement']} | {r['word_count']} |"
        )

    lines.append("\n## Bottom 10 — fix these first\n")
    for r in results[-10:][::-1]:
        lines.append(f"### {r['slug']}  — {r['total']}/40")
        lines.append(f"- **Title:** {r['title']}")
        lines.append(f"- **Weakest axes:** " + ", ".join(
            f"{k}({v})" for k, v in sorted(
                {"intent": r['intent_fit'], "mon": r['monetization'], "struct": r['structure'],
                 "unique": r['unique_value'], "links": r['internal_linking'], "action": r['actionability'],
                 "trust": r['trust'], "engage": r['engagement']}.items(), key=lambda x: x[1])[:3]
        ))
        if r["notes"]:
            lines.append(f"- **Flags:** " + "; ".join(r["notes"]))
        lines.append("")

    lines.append("\n## Axis averages\n")
    axes = ["intent_fit", "monetization", "structure", "unique_value",
            "internal_linking", "actionability", "trust", "engagement"]
    for a in axes:
        avg = sum(r[a] for r in results) / len(results)
        lines.append(f"- **{a}**: {avg:.2f}")

    OUT_MD.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {OUT_JSON} and {OUT_MD}")
    print(f"Top 3: {', '.join(r['slug'] for r in results[:3])}")
    print(f"Bottom 3: {', '.join(r['slug'] for r in results[-3:])}")


if __name__ == "__main__":
    main()
