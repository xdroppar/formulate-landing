"""
Check if catalog.json scores are stale compared to the app database.

Run this before deploys or as a CI check to catch score drift early.

Usage:
    python scripts/check-catalog-freshness.py          # warn on stale
    python scripts/check-catalog-freshness.py --strict  # exit 1 on any mismatch

Exit codes:
    0 = catalog is fresh (scores match DB)
    1 = catalog is stale (scores differ from DB)
"""

import sqlite3
import json
import os
import sys
from pathlib import Path

LANDING_ROOT = Path(__file__).resolve().parents[1]
DB_PATH = os.environ.get(
    "FORMULATE_DB",
    str(LANDING_ROOT.parent / "Formulate" / "data" / "app.db"),
)
CATALOG_PATH = LANDING_ROOT / "src" / "data" / "catalog.json"


def check():
    strict = "--strict" in sys.argv

    if not os.path.exists(DB_PATH):
        print(f"DB not found at {DB_PATH} — skipping freshness check")
        return 0

    if not CATALOG_PATH.exists():
        print(f"catalog.json not found — run export-catalog.py first")
        return 1

    with open(CATALOG_PATH) as f:
        catalog = json.load(f)

    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row

    exported_at = catalog.get("exported_at", "unknown")
    mismatches = []
    missing = []

    for p in catalog["products"]:
        if p["score"] is None:
            continue

        row = conn.execute(
            """
            SELECT category_score_abs, comparison_group_id
            FROM product_score
            WHERE variant_id = ?
            ORDER BY updated_at DESC
            LIMIT 1
            """,
            (p["id"],),
        ).fetchone()

        if row is None:
            missing.append(p["name"])
        elif row["category_score_abs"] != p["score"]:
            mismatches.append(
                f"  {p['brand']} - {p['name']}: catalog={p['score']}, db={row['category_score_abs']}"
            )

    # Check for new published products not in catalog
    db_count = conn.execute(
        "SELECT COUNT(*) as n FROM product_family WHERE status = 'published'"
    ).fetchone()["n"]
    catalog_count = catalog.get("product_count", 0)

    conn.close()

    # Report
    if not mismatches and not missing and db_count == catalog_count:
        print(f"Catalog is fresh (exported {exported_at}, {catalog_count} products, all scores match)")
        return 0

    print(f"CATALOG IS STALE (exported {exported_at})")
    if db_count != catalog_count:
        print(f"  Product count: catalog={catalog_count}, db={db_count} ({db_count - catalog_count:+d})")
    if mismatches:
        print(f"  {len(mismatches)} score mismatches:")
        for m in mismatches[:20]:
            print(m)
        if len(mismatches) > 20:
            print(f"  ... and {len(mismatches) - 20} more")
    if missing:
        print(f"  {len(missing)} products with scores in catalog but not in DB")

    print(f"\nRun: python scripts/export-catalog.py")

    return 1 if strict else 0


if __name__ == "__main__":
    sys.exit(check())
