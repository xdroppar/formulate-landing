# Formulate Landing

Next.js 16 (App Router) + TypeScript. The **SEO-facing** surface — pSEO collection/detail pages for supplements, foods, ingredients, nutrients, recipes, guides, conditions, interactions, comparisons, research. Deployed on Vercel.

**Canonical split:** the landing OWNS public SEO surfaces (indexed); `formulate-web` (the app) owns the logged-in catalog (noindex) and is the **single source of truth for product data**. The landing MIRRORS web's catalog — it does not export its own.

---

## Run

```bash
npm run dev      # localhost:3000
npm run build    # prod build
npm run sync     # bash scripts/sync-catalog.sh
```

`npm run sync` does three things, in order: (1) `node scripts/sync-from-web.mjs` copies `formulate-web/src/data/catalog.json` → here + all referenced `public/images/products/...`; (2) copies NDJSON to `formulate-api/data/`; (3) seeds the API. **Step 1 is the rule: never edit `src/data/catalog.json` by hand — regenerate at the source (desktop publish → web export) and re-sync.** The deprecated `scripts/export-catalog.py` here regresses the catalog to a thin DB set — don't run it.

## Structure

```
src/app/        # App Router routes (see route patterns below) + /api (cron, OG image, sitemap)
src/data/       # checked-in JSON catalogs (catalog.json mirrored from web; whole-foods, recipes,
                #   interactions, encyclopedia, supplement-studies, substance-aliases, pubmed-abstracts)
src/lib/        # data accessors + page logic (products, guides, conditions, interactions, comparisons,
                #   synergies, research, encyclopedia, og-template.tsx, analytics)
tools/          # content pipeline (Python): generators + critics + validators (see below)
next.config.ts  # images unoptimized, file-tracing excludes, redirects, PostHog rewrites
middleware.ts   # passthrough only
```

**Route patterns (pSEO):** `conditions/[slug]`, `brands/[slug]` (landing owns this hub), `guides/[slug]` + `guides/tag/[tag]`, `supplements/[slug]` + `supplements/best/[category]`, `ingredients/[slug]`, `nutrients/[slug]`, `foods/[slug]` + `foods/best/[slug]`, `recipes/[slug]` + `recipes/diet/[slug]`, `stacks/[slug]`, `interactions/[pair]`, `compare/[pair]`, `synergies/[pair]`, `brand-compare/[pair]`, `research/[slug]`, plus `methodology/*`, `tools/*`, legal pages.

## Content pipeline (`tools/`)

`content_section_writer.py` (Opus-written guide sections) · `spoke_guide_writer.py` / `safety_section_writer.py` / `faq_expander.py` (more guide content) · `critic_guides.py` (LLM semantic critique → JSON+md) · `seo_score_guides.py` (rule-based structural score) · `meta_optimizer.py` · `export_interactions.py` (desktop interaction DB → `src/data/interactions.json` + aliases) · **`validate_content.py --strict`** (the pre-push gate). Generated `*_output.*` files are NOT checked in.

## Hard rules / gotchas

- **`validate_content.py --strict` is a pre-push gate** (wired in the monorepo `.git/hooks/pre-push`). It checks guides exist, title/desc/detail lengths, ISO dates, thumbnail paths, and that internal links (`/guides/<slug>`, `/interactions/<pair>`) resolve to real data. A broken link or malformed row blocks the Vercel build, so it blocks the push first.
- **Untracked generated files cause Vercel "Error" builds.** If a content script wrote a file a page imports but it isn't committed, the deploy diverges from local. Commit generated content WITH the page that uses it (or don't import it).
- **`next.config.ts` redirects can hide routes.** `/catalog/*` redirects to the app domain (legacy indexed URLs); `/brands/*` is deliberately NOT redirected (landing owns the SEO brand hub). Before adding a redirect, make sure it doesn't shadow a real landing route.
- **Images are `unoptimized: true`** (the desktop pipeline pre-optimizes WebP; this dodges Vercel's metered `/_next/image` quota). File-tracing excludes `public/images|food-assets|recipe-assets/**` (~322 MB) from serverless bundles to stay under the 250 MB function limit. A newly-referenced image dir must exist on disk (synced from web) or it 404s.
- **SEO canonicals must match the indexed URL** and respect the canonical split (landing indexed, app noindex for overlapping topics).
- `vercel.json` runs a Monday digest cron (`/api/cron/digest`, `CRON_SECRET`-gated) and sets security headers.

---

This mirrors `formulate-web`; the catalog/scoring source of truth is the desktop `Formulate` repo. Cross-repo rules live in `Formulate/CLAUDE.md`.
