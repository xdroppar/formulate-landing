"""
Export supplement catalog from Formulate SQLite DB to static JSON for the website.

Also copies product images (primary.webp, thumb.webp, gallery_*.webp) into
public/images/products/{brand}/{product}/ so Next.js can serve them.

Usage:
    python scripts/export-catalog.py

Output:
    src/data/catalog.json
    public/images/products/...
"""

import sqlite3
import json
import os
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path

# Paths
LANDING_ROOT = Path(__file__).resolve().parents[1]
DB_PATH = os.environ.get(
    "FORMULATE_DB",
    str(LANDING_ROOT.parent / "Formulate" / "data" / "app.db"),
)
ASSETS_ROOT = LANDING_ROOT.parent / "Formulate" / "assets" / "products"
OUTPUT_PATH = LANDING_ROOT / "src" / "data" / "catalog.json"
IMAGES_DEST = LANDING_ROOT / "public" / "images" / "products"


def slugify(text: str) -> str:
    """Convert text to URL-friendly slug."""
    return text.lower().replace(" ", "-").replace("'", "").replace("&", "and").rstrip(".")


def find_asset_dir(brand_slug: str, family_id: str) -> Path | None:
    """Find the asset directory for a product by matching family_id prefix."""
    brand_dir = ASSETS_ROOT / brand_slug
    if not brand_dir.exists():
        return None

    # Strip brand prefix from family_id to get product prefix
    if family_id.startswith(brand_slug + "-"):
        product_prefix = family_id[len(brand_slug) + 1 :]
    else:
        product_prefix = family_id

    # Find directories starting with this prefix
    matches = [d for d in brand_dir.iterdir() if d.is_dir() and d.name.startswith(product_prefix)]

    if not matches:
        return None

    # Prefer exact match, then shortest name
    for m in matches:
        if m.name == product_prefix:
            return m
    return min(matches, key=lambda p: len(p.name))


def _find_primary_image(asset_dir: Path) -> Path | None:
    """Find the best primary image: prefer primary.webp, fall back to 01_gallery_hero.*"""
    primary = asset_dir / "primary.webp"
    if primary.exists():
        return primary
    for hero in sorted(asset_dir.glob("01_gallery_hero.*")):
        if hero.suffix.lower() in (".webp", ".jpg", ".jpeg", ".png"):
            return hero
    return None


def copy_product_images(asset_dir: Path, brand_slug: str, product_slug: str) -> tuple[str | None, list[str]]:
    """Copy processed images to public dir. Returns (image_url, gallery_images) with web paths."""
    dest_dir = IMAGES_DEST / brand_slug / product_slug
    primary_src = _find_primary_image(asset_dir)
    if not primary_src:
        return None, []

    dest_dir.mkdir(parents=True, exist_ok=True)

    # Copy primary (keep original extension)
    primary_name = f"primary{primary_src.suffix}"
    shutil.copy2(primary_src, dest_dir / primary_name)
    image_url = f"/images/products/{brand_slug}/{product_slug}/{primary_name}"

    # Copy thumb if present
    thumb_path = asset_dir / "thumb.webp"
    if thumb_path.exists():
        shutil.copy2(thumb_path, dest_dir / "thumb.webp")

    # Copy gallery images (prefer .webp, fall back to raw)
    gallery = []
    webp_gallery = sorted(asset_dir.glob("gallery_*.webp"))
    if webp_gallery:
        for gimg in webp_gallery:
            shutil.copy2(gimg, dest_dir / gimg.name)
            gallery.append(f"/images/products/{brand_slug}/{product_slug}/{gimg.name}")
    else:
        # Fall back to raw gallery images (02_gallery_02.*, 03_gallery_03.*, etc.)
        for raw in sorted(asset_dir.glob("0[2-9]_gallery_*.*")):
            if raw.suffix.lower() in (".webp", ".jpg", ".jpeg", ".png"):
                shutil.copy2(raw, dest_dir / raw.name)
                gallery.append(f"/images/products/{brand_slug}/{product_slug}/{raw.name}")

    return image_url, gallery


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


def _get_latest_score(conn: sqlite3.Connection, score_key: str) -> sqlite3.Row | None:
    """Get the most recent score for a product — matches the app's get_latest_score() logic.

    The app uses ORDER BY updated_at DESC LIMIT 1 (see app/scoring/repo.py).
    We must use the exact same query to stay in sync.
    """
    return conn.execute(
        """
        SELECT category_score_abs, evidence_score, dose_score,
               bioavailability_score, transparency_score, safety_score,
               manufacturing_score, value_score, explain_json,
               comparison_group_id, updated_at
        FROM product_score
        WHERE variant_id = ?
        ORDER BY updated_at DESC
        LIMIT 1
        """,
        (score_key,),
    ).fetchone()


def _validate_scores(conn: sqlite3.Connection, products: list[dict]) -> list[str]:
    """Cross-check exported scores against the DB using the same query the app uses.

    Returns a list of error messages (empty = all good).
    """
    errors = []
    for p in products:
        if p["score"] is None:
            continue
        score_key = p["id"]
        row = _get_latest_score(conn, score_key)
        if row is None:
            errors.append(f"  {p['brand']} - {p['name']}: exported score={p['score']} but no DB row found")
        elif row["category_score_abs"] != p["score"]:
            errors.append(
                f"  {p['brand']} - {p['name']}: "
                f"exported={p['score']}, DB={row['category_score_abs']} "
                f"(group={row['comparison_group_id']})"
            )
    return errors


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

    # Track the latest score update across all products for staleness detection
    latest_score_update = None

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

        # --- Score (most recently updated — matches app's get_latest_score()) ---
        score_key = f"product:{family_id}"
        score_row = _get_latest_score(conn, score_key)

        score = None
        grade = None
        score_components = []
        explanation = None

        if score_row:
            score = score_row["category_score_abs"]

            # Track latest update for staleness metadata
            if score_row["updated_at"]:
                if latest_score_update is None or score_row["updated_at"] > latest_score_update:
                    latest_score_update = score_row["updated_at"]

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

        # --- Find and copy product images ---
        image_url = None
        gallery_images = []
        asset_dir = find_asset_dir(brand_slug, family_id)
        if asset_dir:
            image_url, gallery_images = copy_product_images(asset_dir, brand_slug, slug)

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
            "image_url": image_url,
            "gallery_images": gallery_images,
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

    # --- Self-validation: cross-check every score against the DB ---
    print("Validating scores...")
    errors = _validate_scores(conn, products)
    if errors:
        print(f"\nERROR: {len(errors)} score mismatches detected!")
        for e in errors:
            print(e)
        print("\nAborting export — catalog.json was NOT updated.")
        conn.close()
        sys.exit(1)
    print(f"  All {sum(1 for p in products if p['score'] is not None)} scores verified OK")

    # --- Load brand scores from DB ---
    brand_scores_map: dict[str, dict] = {}
    for row in conn.execute(
        "SELECT brand_gid, final_score, grade, breakdown_json, confidence_level FROM brand_scores"
    ).fetchall():
        gid = row["brand_gid"]  # e.g., "brand:thorne"
        slug = gid.replace("brand:", "") if gid.startswith("brand:") else gid
        slug = slug.rstrip(".")  # normalize trailing period (e.g., "megafood-inc." → "megafood-inc")
        breakdown = {}
        if row["breakdown_json"]:
            try:
                breakdown = json.loads(row["breakdown_json"])
            except json.JSONDecodeError:
                pass

        # Extract component scores
        components = {}
        for comp in breakdown.get("components", []):
            key = comp["name"].lower().replace(" ", "_")
            components[key] = comp["raw_score"]

        brand_scores_map[slug] = {
            "score": row["final_score"],
            "grade": row["grade"],
            "confidence": row["confidence_level"],
            "components": {
                "integrity": components.get("integrity", 0),
                "product_quality": components.get("product_quality", 0),
                "innovation": components.get("innovation", 0),
                "transparency": components.get("transparency", 0),
                "verification": components.get("verification", 0),
            },
        }

    # --- Build brand summaries ---
    brand_map: dict[str, list] = {}
    for p in products:
        brand_map.setdefault(p["brand_slug"], []).append(p)

    # Determine standout badges (highest score per dimension across all brands)
    standout_map: dict[str, str] = {}  # dimension -> brand_slug
    dimensions = ["integrity", "product_quality", "innovation", "transparency", "verification"]
    for dim in dimensions:
        best_slug = None
        best_score = -1
        for bslug in brand_map:
            bs = brand_scores_map.get(bslug)
            if bs and bs["components"].get(dim, 0) > best_score:
                best_score = bs["components"][dim]
                best_slug = bslug
        if best_slug and best_score >= 85:
            standout_map[best_slug] = dim

    standout_labels = {
        "integrity": "Most Trusted",
        "product_quality": "Highest Quality",
        "innovation": "Most Innovative",
        "transparency": "Most Transparent",
        "verification": "Most Verified",
    }

    # Derive brand tags from component scores
    achievement_thresholds = [
        ("verification", 85, "Science-Led", "#06B6D4", "🔬"),
        ("product_quality", 85, "Clean Labels", "#3B82F6", "🧼"),
        ("transparency", 90, "Open Book", "#22C55E", "📖"),
        ("innovation", 85, "Trailblazer", "#F59E0B", "🔥"),
        ("integrity", 90, "Gold Standard", "#8B5CF6", "🏅"),
    ]

    def _derive_brand_tags(bslug: str, bproducts: list) -> list[dict]:
        """Derive up to 3 display tags for a brand card."""
        tags = []
        bs = brand_scores_map.get(bslug)
        if bs:
            comps = bs["components"]
            for dim, threshold, label, color, icon in achievement_thresholds:
                if comps.get(dim, 0) >= threshold and len(tags) < 2:
                    tags.append({"text": label, "color": color, "icon": icon})

        # Fill remaining slots with top product category tags
        if len(tags) < 3:
            cat_counts: dict[str, int] = {}
            for p in bproducts:
                for tag in p.get("category_tags", []):
                    if tag.lower() not in ("general", "other", "supplements"):
                        cat_counts[tag] = cat_counts.get(tag, 0) + 1
            top_cats = sorted(cat_counts.items(), key=lambda x: -x[1])
            for cat, _ in top_cats:
                if len(tags) >= 3:
                    break
                tags.append({"text": cat, "color": "#6B7280", "icon": ""})

        return tags[:3]

    brands = []
    for bslug, bproducts in sorted(brand_map.items()):
        scores = [p["score"] for p in bproducts if p["score"] is not None]
        categories = [p["category"] for p in bproducts if p["category"]]
        top_cat = max(set(categories), key=categories.count) if categories else None

        bs = brand_scores_map.get(bslug)
        standout_dim = standout_map.get(bslug)

        brands.append(
            {
                "slug": bslug,
                "name": bproducts[0]["brand"],
                "product_count": len(bproducts),
                "avg_score": round(sum(scores) / len(scores)) if scores else None,
                "score": bs["score"] if bs else None,
                "grade": bs["grade"] if bs else None,
                "confidence": bs["confidence"] if bs else None,
                "components": bs["components"] if bs else None,
                "standout": standout_labels.get(standout_dim, "") if standout_dim else None,
                "tags": _derive_brand_tags(bslug, bproducts),
                "top_category": top_cat,
                "logo_url": None,
            }
        )

    brands.sort(key=lambda b: b["score"] or b["avg_score"] or 0, reverse=True)

    # --- Output ---
    catalog = {
        "version": "1.0.0",
        "exported_at": datetime.now(timezone.utc).isoformat(),
        "latest_score_update": latest_score_update,
        "product_count": len(products),
        "brand_count": len(brands),
        "products": products,
        "brands": brands,
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(catalog, f, indent=2, ensure_ascii=False)

    print(f"\nExported {len(products)} products, {len(brands)} brands")
    print(f"Output: {OUTPUT_PATH}")

    scored = sum(1 for p in products if p["score"] is not None)
    with_images = sum(1 for p in products if p["image_url"] is not None)
    print(f"Scored: {scored}/{len(products)}")
    print(f"Images: {with_images}/{len(products)}")
    if latest_score_update:
        print(f"Latest score update: {latest_score_update}")

    conn.close()


if __name__ == "__main__":
    export_catalog()
