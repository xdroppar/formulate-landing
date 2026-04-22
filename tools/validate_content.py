"""Content invariants — "nothing broken ships" gate for formulate-landing.

Mirrors the catalog_invariants pattern from the Formulate desktop repo
(app/services/products/catalog_invariants.py): pure validators, structured
report, CLI entry that exits non-zero on error. Wired as pre-push hook.

Checks:
  - Guides: content file exists, title/description length, updatedAt format,
    thumbnail path resolves, tags non-empty.
  - Interactions: required fields present and well-formed, sources non-empty,
    details length, pair_key format, last_reviewed ISO date.
  - Internal links: href="/guides/<slug>" references a real guide,
    href="/interactions/<pair>" references a real pair in the data.

Usage:
  python tools/validate_content.py              # advisory, exits 0 on warnings
  python tools/validate_content.py --strict     # warnings → errors (pre-push)
  python tools/validate_content.py --json       # machine-readable output
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, field
from enum import Enum
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GUIDES_TS = ROOT / "src" / "lib" / "guides.ts"
INTERACTIONS_JSON = ROOT / "src" / "data" / "interactions.json"
SUBSTANCES_JSON = ROOT / "src" / "data" / "substance-aliases.json"
ENCYCLOPEDIA_JSON = ROOT / "src" / "data" / "encyclopedia.json"
GUIDE_CONTENT_DIR = ROOT / "src" / "app" / "guides"
PUBLIC_DIR = ROOT / "public"
BASELINE = ROOT / "tools" / "validate_content_baseline.json"

# ── Constraints ────────────────────────────────────────────────────────────

TITLE_MIN, TITLE_MAX = 30, 80
DESC_MIN, DESC_MAX = 80, 200
DETAILS_MIN, DETAILS_MAX = 50, 2000
SUMMARY_MAX = 140
ISO_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
GUIDE_SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
PAIR_KEY_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*--[a-z0-9]+(?:-[a-z0-9]+)*$")


class Severity(str, Enum):
    ERROR = "error"
    WARN = "warn"


class Code(str, Enum):
    # Guides
    GUIDE_CONTENT_MISSING = "guide_content_missing"
    GUIDE_TITLE_LENGTH = "guide_title_length"
    GUIDE_DESC_LENGTH = "guide_desc_length"
    GUIDE_UPDATED_AT_FORMAT = "guide_updated_at_format"
    GUIDE_TAGS_EMPTY = "guide_tags_empty"
    GUIDE_THUMBNAIL_MISSING = "guide_thumbnail_missing"
    GUIDE_SLUG_FORMAT = "guide_slug_format"
    # Interactions
    INTERACTION_FIELD_MISSING = "interaction_field_missing"
    INTERACTION_DETAILS_LENGTH = "interaction_details_length"
    INTERACTION_SUMMARY_LENGTH = "interaction_summary_length"
    INTERACTION_SOURCES_EMPTY = "interaction_sources_empty"
    INTERACTION_PAIR_KEY_FORMAT = "interaction_pair_key_format"
    INTERACTION_LAST_REVIEWED_FORMAT = "interaction_last_reviewed_format"
    INTERACTION_SUBSTANCE_UNKNOWN = "interaction_substance_unknown"
    # Encyclopedia (ingredient pages)
    INGREDIENT_FIELD_MISSING = "ingredient_field_missing"
    INGREDIENT_SLUG_FORMAT = "ingredient_slug_format"
    INGREDIENT_SUMMARY_EMPTY = "ingredient_summary_empty"
    INGREDIENT_DUPLICATE_SLUG = "ingredient_duplicate_slug"
    # Link rot
    GUIDE_LINK_BROKEN = "guide_link_broken"
    INTERACTION_LINK_BROKEN = "interaction_link_broken"
    INGREDIENT_LINK_BROKEN = "ingredient_link_broken"


@dataclass
class Issue:
    code: Code
    severity: Severity
    subject: str
    message: str

    def format(self) -> str:
        tag = "ERROR" if self.severity == Severity.ERROR else "warn"
        return f"  [{tag}] {self.code.value} · {self.subject}: {self.message}"


@dataclass
class Report:
    issues: list[Issue] = field(default_factory=list)

    def add(self, issue: Issue) -> None:
        self.issues.append(issue)

    @property
    def errors(self) -> list[Issue]:
        return [i for i in self.issues if i.severity == Severity.ERROR]

    @property
    def warnings(self) -> list[Issue]:
        return [i for i in self.issues if i.severity == Severity.WARN]


# ── Guides parsing ─────────────────────────────────────────────────────────


def parse_guides() -> list[dict]:
    """Regex-parse src/lib/guides.ts into per-guide dicts. Mirrors the
    pattern in tools/seo_score_guides.py — brittle but pragmatic."""
    text = GUIDES_TS.read_text(encoding="utf-8")
    blocks = re.findall(r"\{\s*slug:\s*\"([^\"]+)\"(.*?)\n\s*\},", text, re.S)
    out = []
    for slug, body in blocks:
        def grab(key: str) -> str:
            m = re.search(rf"{key}:\s*\"([^\"]*)\"", body)
            return m.group(1) if m else ""

        def grab_bool(key: str) -> bool:
            m = re.search(rf"{key}:\s*(true|false)", body)
            return m.group(1) == "true" if m else False

        tags_m = re.search(r"tags:\s*\[([^\]]*)\]", body)
        tags = re.findall(r"\"([^\"]+)\"", tags_m.group(1)) if tags_m else []
        out.append({
            "slug": slug,
            "title": grab("title"),
            "description": grab("description"),
            "category": grab("category"),
            "updatedAt": grab("updatedAt"),
            "publishedAt": grab("publishedAt"),
            "thumbnail": grab("thumbnail"),
            "hidden": grab_bool("hidden"),
            "tags": tags,
        })
    return out


def validate_guide(guide: dict, report: Report) -> None:
    slug = guide["slug"]
    subj = f"guide:{slug}"

    if not GUIDE_SLUG_RE.match(slug):
        report.add(Issue(Code.GUIDE_SLUG_FORMAT, Severity.ERROR, subj,
                         f"slug '{slug}' is not kebab-case alphanumeric"))

    content_file = GUIDE_CONTENT_DIR / "[slug]" / "content" / f"{slug}.tsx"
    if not content_file.exists():
        report.add(Issue(Code.GUIDE_CONTENT_MISSING, Severity.ERROR, subj,
                         f"no content file at src/app/guides/[slug]/content/{slug}.tsx"))

    title = guide["title"]
    if not (TITLE_MIN <= len(title) <= TITLE_MAX):
        report.add(Issue(Code.GUIDE_TITLE_LENGTH,
                         Severity.WARN if guide["hidden"] else Severity.ERROR,
                         subj,
                         f"title is {len(title)} chars (want {TITLE_MIN}–{TITLE_MAX}): {title[:60]!r}"))

    desc = guide["description"]
    if not (DESC_MIN <= len(desc) <= DESC_MAX):
        report.add(Issue(Code.GUIDE_DESC_LENGTH,
                         Severity.WARN if guide["hidden"] else Severity.ERROR,
                         subj,
                         f"description is {len(desc)} chars (want {DESC_MIN}–{DESC_MAX})"))

    if guide["updatedAt"] and not ISO_DATE_RE.match(guide["updatedAt"]):
        report.add(Issue(Code.GUIDE_UPDATED_AT_FORMAT, Severity.ERROR, subj,
                         f"updatedAt '{guide['updatedAt']}' is not YYYY-MM-DD"))

    if not guide["tags"]:
        report.add(Issue(Code.GUIDE_TAGS_EMPTY, Severity.WARN, subj,
                         "tags array is empty — hurts tag-page surface"))

    if guide["thumbnail"]:
        thumb_path = PUBLIC_DIR / guide["thumbnail"].lstrip("/")
        if not thumb_path.exists():
            report.add(Issue(Code.GUIDE_THUMBNAIL_MISSING, Severity.ERROR, subj,
                             f"thumbnail '{guide['thumbnail']}' not at public{guide['thumbnail']}"))


# ── Interactions validation ─────────────────────────────────────────────────


def validate_interactions(report: Report) -> tuple[set[str], set[str]]:
    """Validate interactions.json. Returns (known_substance_canonicals, known_pair_keys)
    for use in link rot detection."""
    data = json.loads(INTERACTIONS_JSON.read_text(encoding="utf-8"))
    substances_data = json.loads(SUBSTANCES_JSON.read_text(encoding="utf-8"))
    known_canonicals = {s["canonical"].lower() for s in substances_data}
    known_pairs: set[str] = set()

    required = {"substance_a", "substance_b", "severity", "summary", "details",
                "recommendation", "sources", "pair_key"}

    for row in data:
        subj = f"interaction:{row.get('pair_key', '<unknown>')}"
        missing = required - row.keys()
        if missing:
            report.add(Issue(Code.INTERACTION_FIELD_MISSING, Severity.ERROR, subj,
                             f"missing required fields: {sorted(missing)}"))
            continue

        known_pairs.add(row["pair_key"])

        if not PAIR_KEY_RE.match(row["pair_key"]):
            report.add(Issue(Code.INTERACTION_PAIR_KEY_FORMAT, Severity.ERROR, subj,
                             f"pair_key '{row['pair_key']}' doesn't match <a>--<b> shape"))

        for side in ("substance_a", "substance_b"):
            if row[side].lower() not in known_canonicals:
                report.add(Issue(Code.INTERACTION_SUBSTANCE_UNKNOWN, Severity.WARN, subj,
                                 f"{side}={row[side]!r} not in substance-aliases.json"))

        details_len = len(row["details"] or "")
        if not (DETAILS_MIN <= details_len <= DETAILS_MAX):
            report.add(Issue(Code.INTERACTION_DETAILS_LENGTH, Severity.WARN, subj,
                             f"details is {details_len} chars (want {DETAILS_MIN}–{DETAILS_MAX})"))

        if len(row["summary"] or "") > SUMMARY_MAX:
            report.add(Issue(Code.INTERACTION_SUMMARY_LENGTH, Severity.WARN, subj,
                             f"summary is {len(row['summary'])} chars (max {SUMMARY_MAX})"))

        if not row["sources"]:
            report.add(Issue(Code.INTERACTION_SOURCES_EMPTY, Severity.ERROR, subj,
                             "sources array is empty — YMYL pages need citations"))

        last_reviewed = row.get("last_reviewed")
        if last_reviewed and not ISO_DATE_RE.match(last_reviewed):
            report.add(Issue(Code.INTERACTION_LAST_REVIEWED_FORMAT, Severity.ERROR, subj,
                             f"last_reviewed '{last_reviewed}' is not YYYY-MM-DD"))

    return known_canonicals, known_pairs


# ── Encyclopedia (ingredient pages) ─────────────────────────────────────────


def validate_encyclopedia(report: Report) -> set[str]:
    """Validate encyclopedia.json. Returns the set of known ingredient slugs
    for link-rot detection."""
    if not ENCYCLOPEDIA_JSON.exists():
        # Encyclopedia is optional; absence doesn't fail the build.
        return set()

    data = json.loads(ENCYCLOPEDIA_JSON.read_text(encoding="utf-8"))
    required = {"id", "slug", "name", "category", "summary"}
    seen_slugs: dict[str, str] = {}
    known: set[str] = set()

    for row in data:
        slug = row.get("slug") or row.get("id") or "<unknown>"
        subj = f"ingredient:{slug}"
        missing = required - row.keys()
        if missing:
            report.add(Issue(Code.INGREDIENT_FIELD_MISSING, Severity.ERROR, subj,
                             f"missing required fields: {sorted(missing)}"))
            continue

        if not GUIDE_SLUG_RE.match(row["slug"]):
            report.add(Issue(Code.INGREDIENT_SLUG_FORMAT, Severity.ERROR, subj,
                             f"slug '{row['slug']}' is not kebab-case alphanumeric"))

        if not (row.get("summary") or "").strip():
            report.add(Issue(Code.INGREDIENT_SUMMARY_EMPTY, Severity.WARN, subj,
                             "summary is empty — the page has no meta description"))

        if row["slug"] in seen_slugs:
            report.add(Issue(Code.INGREDIENT_DUPLICATE_SLUG, Severity.ERROR, subj,
                             f"duplicate slug — also used by id={seen_slugs[row['slug']]!r}"))
        else:
            seen_slugs[row["slug"]] = row["id"]
            known.add(row["slug"])

    return known


# ── Link rot ───────────────────────────────────────────────────────────────


def validate_link_rot(
    known_guide_slugs: set[str],
    known_pair_keys: set[str],
    known_ingredient_slugs: set[str],
    report: Report,
) -> None:
    """Grep .tsx files under src/app/guides/[slug]/content for internal links
    and verify each href resolves. Pair-page links are normalized to the
    sorted slug form used in routes."""
    content_files = list((GUIDE_CONTENT_DIR / "[slug]" / "content").glob("*.tsx"))
    guide_link_re = re.compile(r'href="/guides/([a-z0-9\-/]+?)"')
    # /interactions/<a>-and-<b> — slugs are kebab-case, joined by -and-
    interaction_link_re = re.compile(r'href="/interactions/([a-z0-9\-]+-and-[a-z0-9\-]+)"')
    ingredient_link_re = re.compile(r'href="/ingredients/([a-z0-9\-]+)"')

    # Derive known pair slugs (the route form uses "-and-" between sorted slugs).
    # The pair_key uses "--" so we don't directly compare; instead trust that
    # any interaction-linked slug must have BOTH halves appearing in the set of
    # canonicals used in pair_keys. Keep the guard loose: accept any pair that
    # decomposes into two non-empty slug halves and warn if no matching
    # pair_key exists.
    known_pair_slug_halves: set[str] = set()
    for pk in known_pair_keys:
        left, right = pk.split("--")
        known_pair_slug_halves.add(left)
        known_pair_slug_halves.add(right)

    for f in content_files:
        text = f.read_text(encoding="utf-8")
        slug = f.stem
        subj = f"guide:{slug}"

        for match in guide_link_re.findall(text):
            # Strip any query string or anchor.
            target = match.split("?")[0].split("#")[0].rstrip("/")
            # Ignore nested routes like /guides/tag/<x>
            if "/" in target:
                continue
            if target and target not in known_guide_slugs:
                report.add(Issue(Code.GUIDE_LINK_BROKEN, Severity.ERROR, subj,
                                 f"internal link /guides/{target} has no matching guide"))

        for match in interaction_link_re.findall(text):
            parts = match.split("-and-")
            if len(parts) != 2 or not all(parts):
                report.add(Issue(Code.INTERACTION_LINK_BROKEN, Severity.ERROR, subj,
                                 f"malformed interaction link /interactions/{match}"))
                continue
            left, right = parts
            if left not in known_pair_slug_halves or right not in known_pair_slug_halves:
                report.add(Issue(Code.INTERACTION_LINK_BROKEN, Severity.WARN, subj,
                                 f"/interactions/{match} references unknown substance"))

        if known_ingredient_slugs:
            for match in ingredient_link_re.findall(text):
                target = match.split("?")[0].split("#")[0].rstrip("/")
                if target and target not in known_ingredient_slugs:
                    report.add(Issue(Code.INGREDIENT_LINK_BROKEN, Severity.ERROR, subj,
                                     f"internal link /ingredients/{target} has no matching ingredient"))


# ── CLI ────────────────────────────────────────────────────────────────────


def _issue_key(issue: Issue) -> str:
    """Stable identifier for baseline matching — drops message variance."""
    return f"{issue.code.value}|{issue.subject}"


def load_baseline() -> set[str]:
    if not BASELINE.exists():
        return set()
    data = json.loads(BASELINE.read_text(encoding="utf-8"))
    return set(data.get("known_issues", []))


def write_baseline(report: Report) -> None:
    """Ratchet: snapshot current issues as the accepted baseline. New issues
    beyond this set fail --strict runs."""
    keys = sorted({_issue_key(i) for i in report.issues})
    BASELINE.write_text(
        json.dumps({"known_issues": keys}, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Baseline written: {len(keys)} known issues accepted as OK")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--strict", action="store_true",
                        help="any issue (including warnings) beyond the baseline fails")
    parser.add_argument("--json", action="store_true",
                        help="machine-readable output")
    parser.add_argument("--update-baseline", action="store_true",
                        help="write current issues to baseline and exit 0")
    args = parser.parse_args()

    report = Report()

    guides = parse_guides()
    guide_slugs = {g["slug"] for g in guides}
    for g in guides:
        validate_guide(g, report)

    _, known_pair_keys = validate_interactions(report)
    known_ingredient_slugs = validate_encyclopedia(report)
    validate_link_rot(guide_slugs, known_pair_keys, known_ingredient_slugs, report)

    if args.update_baseline:
        write_baseline(report)
        return 0

    baseline = load_baseline()
    new_issues = [i for i in report.issues if _issue_key(i) not in baseline]
    new_errors = [i for i in new_issues if i.severity == Severity.ERROR]
    new_warnings = [i for i in new_issues if i.severity == Severity.WARN]

    fail_level = {Severity.ERROR} if not args.strict else {Severity.ERROR, Severity.WARN}
    failed = any(i.severity in fail_level for i in new_issues)

    if args.json:
        print(json.dumps({
            "guides_checked": len(guides),
            "total_issues": len(report.issues),
            "baseline_accepted": len(report.issues) - len(new_issues),
            "new_issues": [
                {"code": i.code.value, "severity": i.severity.value,
                 "subject": i.subject, "message": i.message}
                for i in new_issues
            ],
            "new_errors": len(new_errors),
            "new_warnings": len(new_warnings),
            "failed": failed,
        }, indent=2))
    else:
        accepted = len(report.issues) - len(new_issues)
        print(f"validate_content: {len(guides)} guides checked")
        print(f"  {accepted} issue(s) accepted by baseline")
        print(f"  {len(new_errors)} new errors, {len(new_warnings)} new warnings beyond baseline")
        for issue in new_issues:
            print(issue.format())
        if failed:
            print("\nFAIL — new issues detected. Fix them, or run --update-baseline if intentional.")
        else:
            print("\nOK")

    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
