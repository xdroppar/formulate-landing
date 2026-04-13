"""Add inline internal links across guide .tsx files.

For each (phrase, target-slug) pair, finds the first prose occurrence in each
guide and wraps it in an anchor tag — skipping:
  - The guide that IS the target (no self-links)
  - Text already inside an <a ...> tag
  - Text inside headings (<h1> to <h3>)
  - Text inside JSX attribute values (title=, label=, etc.)
  - Takeaway string arrays in TLDRBox (can't put JSX there)

Run: python tools/add_inline_links.py
"""
from __future__ import annotations
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / "src" / "app" / "guides" / "[slug]" / "content"

# Order matters: more specific phrases first so "magnesium glycinate" wins over "magnesium".
LINK_MAP: list[tuple[str, str]] = [
    ("magnesium glycinate", "best-magnesium-supplements"),
    ("magnesium citrate", "best-magnesium-supplements"),
    ("magnesium threonate", "best-magnesium-supplements"),
    ("creatine monohydrate", "best-creatine-supplements"),
    ("vitamin D3", "best-vitamin-d-supplements"),
    ("vitamin D", "best-vitamin-d-supplements"),
    ("vitamin B12", "vitamin-b12-guide"),
    ("lion's mane", "lions-mane-guide"),
    ("lion\u2019s mane", "lions-mane-guide"),
    ("ashwagandha", "ashwagandha-guide"),
    ("berberine", "berberine-guide"),
    ("electrolytes", "electrolytes-guide"),
    ("collagen", "collagen-guide"),
    ("taurine", "taurine-guide"),
    ("nootropics", "nootropics-guide"),
    ("omega-3", "best-omega-3-supplements"),
    ("fish oil", "best-omega-3-supplements"),
    ("magnesium", "best-magnesium-supplements"),
    ("creatine", "best-creatine-supplements"),
    ("zinc", "zinc-guide"),
    ("iron", "iron-guide"),
    ("NAC", "nac-guide"),
    ("B12", "vitamin-b12-guide"),
]


def is_protected_context(src: str, match_start: int, match_end: int) -> bool:
    """Return True if the match is inside a context where we shouldn't add a link."""
    # Look back 400 chars to find the enclosing tag context
    before = src[max(0, match_start - 400):match_start]
    after = src[match_end:match_end + 100]

    # Already inside an anchor
    last_a_open = before.rfind("<a ")
    last_a_close = before.rfind("</a>")
    if last_a_open > last_a_close:
        return True

    # Inside a heading tag
    for tag in ("<h1", "<h2", "<h3"):
        last_open = before.rfind(tag)
        if last_open == -1:
            continue
        # Find the matching close tag
        # Simple check: is there a </hN> between last open and match?
        close_tag = "</" + tag[1:3] + ">"
        last_close = before.rfind(close_tag)
        if last_open > last_close:
            return True

    # Inside a JSX attribute value — check if we're between a `="` and a closing `"`
    # Look backward for unclosed `="` pattern
    last_gt = before.rfind(">")
    attr_region = before[last_gt + 1:] if last_gt >= 0 else before
    # Count quotes in attr_region — odd number means we're inside a quoted attribute
    if attr_region.count('"') % 2 == 1:
        return True

    # Inside a JSX expression block {...} containing a string literal (array item,
    # object value, etc. — we can't put raw JSX inside those strings).
    # Walk back to the most recent unmatched `{` and check for an intervening `"`.
    depth = 0
    last_brace = -1
    for i in range(len(before) - 1, -1, -1):
        c = before[i]
        if c == "}":
            depth += 1
        elif c == "{":
            if depth == 0:
                last_brace = i
                break
            depth -= 1
    if last_brace >= 0:
        brace_region = before[last_brace:]
        # If we're inside an open string inside a JSX expression, odd quote count
        if brace_region.count('"') % 2 == 1:
            return True

    # Inside a string literal in a JSX expression (e.g., takeaways={[...]} or title="...")
    # If there's a { before without a closing } between it and match, and we're in a string — skip.
    # Already covered by quote count above for most cases.

    # Inside a comment
    last_comment_open = before.rfind("{/*")
    last_comment_close = before.rfind("*/}")
    if last_comment_open > last_comment_close:
        return True

    return False


def add_links_to_file(path: Path) -> list[str]:
    """Add inline links to a single file. Returns list of added link descriptions."""
    slug = path.stem
    src = path.read_text(encoding="utf-8")
    added: list[str] = []

    for phrase, target in LINK_MAP:
        if target == slug:
            continue  # no self-links

        # Already linked to this target anywhere in the file? Skip.
        if f'href="/guides/{target}"' in src:
            continue

        # Find first match that's in a safe context
        # Use word-boundary-ish regex: must be surrounded by non-word chars or tag edges
        pattern = re.compile(
            r"(?<![a-zA-Z0-9-])" + re.escape(phrase) + r"(?![a-zA-Z0-9-])",
            re.IGNORECASE if phrase not in {"NAC", "B12"} else 0,
        )

        for m in pattern.finditer(src):
            if is_protected_context(src, m.start(), m.end()):
                continue
            # Wrap it
            matched_text = m.group(0)
            replacement = f'<a href="/guides/{target}">{matched_text}</a>'
            src = src[:m.start()] + replacement + src[m.end():]
            added.append(f"{phrase} -> {target}")
            break  # only first occurrence per target per file

    if added:
        path.write_text(src, encoding="utf-8")
    return added


def main():
    total_added = 0
    for path in sorted(CONTENT_DIR.glob("*.tsx")):
        added = add_links_to_file(path)
        if added:
            print(f"{path.stem}: {len(added)} links added")
            for link in added:
                print(f"  - {link}")
            total_added += len(added)
    print(f"\nTotal: {total_added} inline links added")


if __name__ == "__main__":
    main()
