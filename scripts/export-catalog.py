"""
Export supplement catalog from Formulate SQLite DB to static JSON for the website.

Usage:
    python scripts/export-catalog.py

Output:
    src/data/catalog.json
"""

import sqlite3
import json
import os
from datetime import datetime, timezone
from pathlib import Path

# Paths
DB_PATH = os.environ.get(
    "FORMULATE_DB",
    str(Path(__file__).resolve().parents[1].parent / "Formulate" / "data" / "app.db"),
)
OUTPUT_PATH = Path(__file__).resolve().parents[1] / "src" / "data" / "catalog.json"


def slugify(text: str) -> str:
    """Convert text to URL-friendly slug."""
    return text.lower().replace(" ", "-").replace("'", "").replace("&", "and")


def score_to_grade(score: int | None) -> str | None:
    """Map numeric score to letter grade."""
    if score is None:
        return None
    if score >= 93:
        return "A+"
    if score >= 87:
        return "A"
    if score >= 80:
        return "A-"
    if score >= 73:
        return "B+"
    if score >= 67:
        return "B"
    if score >= 60:
        return "B-"
    if score >= 53:
        return "C+"
    if score >= 47:
        return "C"
    if score >= 40:
        return "C-"
    if score >= 33:
        return "D+"
    if score >= 27:
        return "D"
    return "F"


def export_catalog():
    print(f"Connecting to: {DB_PATH}")
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row

    # --- Load all published product families ---
    families = conn.execute(
        """
        SELECT id, brand, name, canonical_url, amazon_url, iherb_url,
               category, categories_json, description, overview,
               recommended_use, warnings, certifications_json, status
        FROM product_family
        WHERE status = 'published'
        ORDER BY brand, name
        """
    ).fetchall()

    print(f"Found {len(families)} published product families")

    products = []

    for fam in families:
        family_id = fam["id"]
        brand = fam["brand"]
        brand_slug = slugify(brand)

        # Categories
        category = fam["category"] or ""
        category_tags = []
        if fam["categories_json"]:
            try:
                tags = json.loads(fam["categories_json"])
                if tags and not category:
                    category = tags[0]
                category_tags = tags
            except (json.JSONDecodeError, IndexError):
                pass

        # Certifications
        certifications = []
        if fam["certifications_json"]:
            try:
                certifications = json.loads(fam["certifications_json"])
            except json.JSONDecodeError:
                pass

        # --- Default variant (for serving info, price, form) ---
        variant = conn.execute(
            """
            SELECT id, form, serving_size_text, servings_per_container,
                   price_cents, image_url, gallery_json
            FROM product_variant
            WHERE family_id = ?
            ORDER BY is_default DESC, sort_order ASC
            LIMIT 1
            """,
            (family_id,),
        ).fetchone()

        if not variant:
            continue

        variant_id = variant["id"]
        price_usd = variant["price_cents"] / 100.0 if variant["price_cents"] else None

        # --- Ingredients ---
        ingredients_rows = conn.execute(
            """
            SELECT raw_label_name, amount, unit, form_details, daily_value_percent
            FROM product_ingredient
            WHERE variant_id = ?
            ORDER BY sort_order ASC
            """,
            (variant_id,),
        ).fetchall()

        ingredients = [
            {
                "name": row["raw_label_name"],
                "amount": row["amount"],
                "unit": row["unit"],
                "form_details": row["form_details"],
                "daily_value_pct": row["daily_value_percent"],
            }
            for row in ingredients_rows
        ]

        # --- Other ingredients ---
        other_rows = conn.execute(
            "SELECT name FROM product_other_ingredient WHERE variant_id = ?",
            (variant_id,),
        ).fetchall()
        other_ingredients = [row["name"] for row in other_rows]

        # --- Score (best/primary score for this product) ---
        # Score variant_id uses "product:<family_id>" format
        score_key = f"product:{family_id}"
        score_row = conn.execute(
            """
            SELECT category_score_abs, evidence_score, dose_score,
                   bioavailability_score, transparency_score, safety_score,
                   manufacturing_score, value_score, explain_json,
                   comparison_group_id
            FROM product_score
            WHERE variant_id = ?
            ORDER BY category_score_abs DESC
            LIMIT 1
            """,
            (score_key,),
        ).fetchone()

        score = None
        grade = None
        score_components = []
        explanation = None

        if score_row:
            score = score_row["category_score_abs"]

            # Try to get grade from explain_json first
            explain = {}
            if score_row["explain_json"]:
                try:
                    explain = json.loads(score_row["explain_json"])
                except json.JSONDecodeError:
                    pass

            grade = explain.get("grade") or score_to_grade(score)
            explanation = explain.get("summary")

            # Build score components from DB columns
            score_components = [
                {
                    "name": "Evidence Quality",
                    "weight": 0.25,
                    "raw_score": score_row["evidence_score"],
                    "weighted_score": round(score_row["evidence_score"] * 0.25, 2),
                },
                {
                    "name": "Dose Accuracy",
                    "weight": 0.20,
                    "raw_score": score_row["dose_score"],
                    "weighted_score": round(score_row["dose_score"] * 0.20, 2),
                },
                {
                    "name": "Bioavailability",
                    "weight": 0.20,
                    "raw_score": score_row["bioavailability_score"],
                    "weighted_score": round(score_row["bioavailability_score"] * 0.20, 2),
                },
                {
                    "name": "Transparency",
                    "weight": 0.10,
                    "raw_score": score_row["transparency_score"],
                    "weighted_score": round(score_row["transparency_score"] * 0.10, 2),
                },
                {
                    "name": "Safety",
                    "weight": 0.10,
                    "raw_score": score_row["safety_score"],
                    "weighted_score": round(score_row["safety_score"] * 0.10, 2),
                },
                {
                    "name": "Manufacturing",
                    "weight": 0.10,
                    "raw_score": score_row["manufacturing_score"],
                    "weighted_score": round(score_row["manufacturing_score"] * 0.10, 2),
                },
            ]

            if score_row["value_score"] is not None:
                score_components.append(
                    {
                        "name": "Value",
                        "weight": 0.05,
                        "raw_score": score_row["value_score"],
                        "weighted_score": round(score_row["value_score"] * 0.05, 2),
                    }
                )

        # --- Build product entry ---
        slug = f"{brand_slug}-{family_id}" if not family_id.startswith(brand_slug) else family_id

        product = {
            "id": f"product:{family_id}",
            "slug": slug,
            "brand": brand,
            "brand_slug": brand_slug,
            "name": fam["name"],
            "category": category,
            "category_tags": category_tags,
            "score": score,
            "grade": grade,
            "image_url": None,  # Images served separately
            "gallery_images": [],
            "price_usd": price_usd,
            "serving_size": variant["serving_size_text"],
            "servings_per_container": variant["servings_per_container"],
            "form": variant["form"],
            "ingredients": ingredients,
            "other_ingredients": other_ingredients,
            "certifications": certifications,
            "score_components": score_components,
            "explanation": explanation,
            "amazon_url": fam["amazon_url"],
            "iherb_url": fam["iherb_url"],
            "url": fam["canonical_url"],
            "is_draft": False,
        }
        products.append(product)

    # --- Build brand summaries ---
    brand_map: dict[str, list] = {}
    for p in products:
        brand_map.setdefault(p["brand_slug"], []).append(p)

    brands = []
    for bslug, bproducts in sorted(brand_map.items()):
        scores = [p["score"] for p in bproducts if p["score"] is not None]
        categories = [p["category"] for p in bproducts if p["category"]]
        top_cat = max(set(categories), key=categories.count) if categories else None

        brands.append(
            {
                "slug": bslug,
                "name": bproducts[0]["brand"],
                "product_count": len(bproducts),
                "avg_score": round(sum(scores) / len(scores)) if scores else None,
                "top_category": top_cat,
                "logo_url": None,
            }
        )

    brands.sort(key=lambda b: b["avg_score"] or 0, reverse=True)

    # --- Output ---
    catalog = {
        "version": "1.0.0",
        "exported_at": datetime.now(timezone.utc).isoformat(),
        "product_count": len(products),
        "brand_count": len(brands),
        "products": products,
        "brands": brands,
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(catalog, f, indent=2, ensure_ascii=False)

    print(f"Exported {len(products)} products, {len(brands)} brands")
    print(f"Output: {OUTPUT_PATH}")

    scored = sum(1 for p in products if p["score"] is not None)
    print(f"Scored: {scored}/{len(products)}")

    conn.close()


if __name__ == "__main__":
    export_catalog()
