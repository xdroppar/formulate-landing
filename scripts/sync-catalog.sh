#!/bin/bash
# Sync catalog data from desktop app to landing page + API
# Usage: npm run sync (or bash scripts/sync-catalog.sh)

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LANDING_DIR="$(dirname "$SCRIPT_DIR")"
FORMULATE_DIR="${FORMULATE_DIR:-$(dirname "$LANDING_DIR")/Formulate}"
API_URL="${API_URL:-https://formulate-api.onrender.com}"

echo "=== Formulate Catalog Sync ==="
echo "Desktop app: $FORMULATE_DIR"
echo "Landing page: $LANDING_DIR"
echo ""

# 1. Run the existing export script (reads from desktop DB, writes catalog.json + images)
echo "[1/3] Exporting catalog from desktop app..."
cd "$LANDING_DIR"
python scripts/export-catalog.py
echo "  ✓ catalog.json updated"

# 2. Copy NDJSON files to API data directory for seeding
API_DIR="${API_DIR:-$(dirname "$LANDING_DIR")/formulate-api}"
if [ -d "$API_DIR/data" ]; then
    echo "[2/3] Copying NDJSON to API..."
    cp "$FORMULATE_DIR/data/products/items.ndjson" "$API_DIR/data/products.ndjson" 2>/dev/null || true
    echo "  ✓ products.ndjson copied"
else
    echo "[2/3] API directory not found, skipping NDJSON copy"
fi

# 3. Trigger API re-seed (requires admin token)
echo "[3/3] Seeding API database..."
if [ -n "$ADMIN_TOKEN" ]; then
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
        -X POST "$API_URL/api/v1/products/seed" \
        -H "Authorization: Bearer $ADMIN_TOKEN" \
        -H "Content-Type: application/json")
    if [ "$STATUS" = "200" ]; then
        echo "  ✓ API seeded successfully"
    else
        echo "  ⚠ API seed returned status $STATUS (you may need to set ADMIN_TOKEN)"
    fi
else
    echo "  ⚠ Skipping API seed (set ADMIN_TOKEN to enable)"
fi

echo ""
echo "=== Sync complete ==="
