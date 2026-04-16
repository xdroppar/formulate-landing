"""Merge faq_expander_output.json into src/lib/guide-faqs.ts.

Appends new FAQ entries to each guide's existing array. Deduplicates
by checking if the question text already exists (case-insensitive).
"""
import json
import re
import sys
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

ROOT = Path(__file__).resolve().parent.parent
FAQS_FILE = ROOT / "src" / "lib" / "guide-faqs.ts"
NEW_FILE = ROOT / "tools" / "faq_expander_output.json"


def escape_ts(s: str) -> str:
    s = s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").strip()
    return s


def main():
    text = FAQS_FILE.read_text(encoding="utf-8")
    new_data = json.loads(NEW_FILE.read_text(encoding="utf-8"))

    total_merged = 0
    total_dupes = 0

    for slug, faqs in new_data.items():
        if not faqs:
            continue

        # Find this slug's array block
        # Pattern: "slug": [\n  ...\n  ],
        pattern = rf'("{re.escape(slug)}":\s*\[)(.*?)(\n  \],)'
        match = re.search(pattern, text, re.S)
        if not match:
            print(f"SKIP {slug}: not found in file")
            continue

        existing_block = match.group(2)
        existing_questions = set(
            q.lower() for q in re.findall(r'question:\s*\n?\s*"([^"]+)"', existing_block)
        )

        entries = []
        for f in faqs:
            q = f.get("question", "")
            a = f.get("answer", "")
            if q.lower() in existing_questions:
                total_dupes += 1
                continue
            q_escaped = escape_ts(q)
            a_escaped = escape_ts(a)
            entries.append(
                f'    {{\n'
                f'      question:\n'
                f'        "{q_escaped}",\n'
                f'      answer:\n'
                f'        "{a_escaped}",\n'
                f'    }},'
            )

        if not entries:
            continue

        insertion = "\n".join(entries)
        # Insert before the closing ],
        replacement = match.group(1) + existing_block + "\n" + insertion + match.group(3)
        text = text[:match.start()] + replacement + text[match.end():]
        total_merged += len(entries)
        print(f"  {slug}: +{len(entries)} FAQs")

    FAQS_FILE.write_text(text, encoding="utf-8")
    print(f"\nMerged {total_merged} new FAQs ({total_dupes} duplicates skipped)")


if __name__ == "__main__":
    main()
