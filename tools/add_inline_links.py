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
    """Return True if the match is inside a context where we shouldn't add a link.

    Uses a 400-char lookback for local tag-scope checks (anchor/heading/
    comment) and a full-file backward scan for JSX expression/string state —
    the 400-char window was too narrow for multi-entry `takeaways={[...]}`
    arrays, which could put the enclosing `{` well beyond 400 chars back.
    """
    # 400-char window for nearby tag context (anchors, headings, comments).
    nearby = src[max(0, match_start - 400):match_start]

    # Already inside an anchor — either a plain <a> or a custom <IngredientLink>
    # (they both produce anchor tags; wrapping their content creates nested
    # anchors which React rejects and browsers render unpredictably).
    for open_tag, close_tag in (
        ("<a ", "</a>"),
        ("<IngredientLink", "</IngredientLink>"),
    ):
        last_open = nearby.rfind(open_tag)
        last_close = nearby.rfind(close_tag)
        if last_open > last_close:
            return True

    # Inside a heading tag
    for tag in ("<h1", "<h2", "<h3"):
        last_open = nearby.rfind(tag)
        if last_open == -1:
            continue
        close_tag = "</" + tag[1:3] + ">"
        last_close = nearby.rfind(close_tag)
        if last_open > last_close:
            return True

    # Inside a JSX attribute value — check if we're between `="` and its close.
    # Local scope is fine here because attributes don't span large distances.
    last_gt = nearby.rfind(">")
    attr_region = nearby[last_gt + 1:] if last_gt >= 0 else nearby
    if attr_region.count('"') % 2 == 1:
        return True

    # Inside a JSX comment
    last_comment_open = nearby.rfind("{/*")
    last_comment_close = nearby.rfind("*/}")
    if last_comment_open > last_comment_close:
        return True

    # JSX-expression-block string check — must use FULL file backward scan.
    # The innermost unclosed `{` can be thousands of chars back for things like
    # `takeaways={[...]}` arrays with multiple long entries. A 400-char window
    # misses it and counts an even number of prior string-boundary quotes,
    # giving a false-negative and wrapping text inside a string literal with
    # literal `<a>` tags.
    before_full = src[:match_start]
    depth = 0
    last_brace = -1
    for i in range(len(before_full) - 1, -1, -1):
        c = before_full[i]
        if c == "}":
            depth += 1
        elif c == "{":
            if depth == 0:
                last_brace = i
                break
            depth -= 1
    if last_brace >= 0:
        brace_region = before_full[last_brace:]
        # Odd number of unescaped double quotes after the opening `{` means
        # we're inside an open string literal within a JSX expression.
        if brace_region.count('"') % 2 == 1:
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
