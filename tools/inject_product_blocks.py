"""Inject ProductCallout + ProductRow into spoke guides missing them.

Safer than hand-editing 10 files. For each guide in the map:
  1. Replace imports to include ProductCallout, ProductRow, PRODUCTS
  2. Insert a ProductCallout block right before "The Bottom Line" h2
  3. Insert a ProductRow block right before the Bottom Line

Run: python tools/inject_product_blocks.py
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "src" / "app" / "guides" / "[slug]" / "content"

# slug -> (single ProductCallout key, ProductRow title, [row product keys])
INJECTIONS: dict[str, tuple[str, str, list[str]]] = {
    "nac-and-alcohol": (
        "thorne-nac",
        "Top-scored NAC products",
        ["thorne-nac"],
    ),
    "berberine-vs-metformin": (
        "thorne-berberine",
        "Top-scored berberine products",
        ["thorne-berberine"],
    ),
    "creatine-for-endurance-athletes": (
        "thorne-creatine",
        "Top-scored creatine products",
        ["thorne-creatine", "nootropics-depot-creatine"],
    ),
    "probiotic-strains-for-ibs": (
        "thorne-floramend",
        "Top-scored gut-support products",
        ["thorne-floramend", "thorne-omega-3-coq10"],
    ),
    "vitamin-b12-methylcobalamin-vs-cyanocobalamin": (
        "thorne-vitamin-b12",
        "Top-scored B12 products",
        ["thorne-vitamin-b12", "thorne-b-complex-12"],
    ),
    "zinc-for-immune-support": (
        "thorne-zinc-bisglycinate",
        "Top-scored immune-support products",
        ["thorne-zinc-bisglycinate", "thorne-vitamin-d-5000"],
    ),
    "best-multivitamin-over-50": (
        "thorne-advanced-nutrients",
        "Top-scored supplements for adults over 50",
        ["thorne-advanced-nutrients", "thorne-vitamin-d-k2", "thorne-magnesium-bisglycinate"],
    ),
    "magnesium-for-anxiety": (
        "thorne-magnesium-bisglycinate",
        "Top-scored anxiety-support stack",
        ["thorne-magnesium-bisglycinate", "nootropics-depot-l-theanine", "thorne-ashwagandha"],
    ),
    "best-collagen-for-joints": (
        "thorne-collagen-plus",
        "Top-scored collagen + joint products",
        ["thorne-collagen-plus", "thorne-curcumin-phytosome"],
    ),
    "ashwagandha-for-testosterone": (
        "thorne-ashwagandha",
        "Top-scored adaptogen + hormone-support stack",
        ["thorne-ashwagandha", "thorne-zinc-bisglycinate"],
    ),
}

OLD_IMPORT = """import {
  TLDRBox,
  Callout,
  EvidenceBadge,
} from "@/components/guide";"""

NEW_IMPORT = """import {
  TLDRBox,
  Callout,
  ProductCallout,
  ProductRow,
  EvidenceBadge,
  PRODUCTS,
} from "@/components/guide";"""


def inject(slug: str, callout_key: str, row_title: str, row_keys: list[str]) -> str:
    path = CONTENT / f"{slug}.tsx"
    src = path.read_text(encoding="utf-8")

    if OLD_IMPORT not in src:
        return f"SKIP {slug}: imports don't match template"
    src = src.replace(OLD_IMPORT, NEW_IMPORT, 1)

    # Find the Bottom Line h2 — insert product blocks before it
    anchor = "      <h2>The Bottom Line</h2>"
    if anchor not in src:
        # Try alternate
        anchor_alt = "<h2>The Bottom Line</h2>"
        if anchor_alt not in src:
            return f"SKIP {slug}: no 'Bottom Line' h2 found"
        # Use the alt with different indentation
        anchor = "<h2>The Bottom Line</h2>"

    callout_block = f"""      <ProductCallout product={{PRODUCTS["{callout_key}"]}} />

"""
    row_products = "\n".join(f'          PRODUCTS["{k}"],' for k in row_keys)
    row_block = f"""      <ProductRow
        title="{row_title}"
        products={{[
{row_products}
        ]}}
      />

"""
    injection = callout_block + row_block
    src = src.replace(anchor, injection + anchor, 1)
    path.write_text(src, encoding="utf-8")
    return f"OK   {slug}"


def main():
    for slug, (callout, row_title, row_keys) in INJECTIONS.items():
        result = inject(slug, callout, row_title, row_keys)
        print(result)


if __name__ == "__main__":
    main()
