# Stage 1 — Search Strategy

Pair: **birth control** + **st johns wort**

## Rationale

Real evidence requires a structured search, not a vibe check. Do each of the
queries below, in order. Record what you found in `02_evidence.json`.

## 1. PubMed (primary)

**Broad:** `("birth control"[MeSH Terms] OR "birth control"[Title/Abstract]) AND ("st johns wort"[MeSH Terms] OR "st johns wort"[Title/Abstract])`

**Filtered to high-quality evidence:**
- Add: `AND ("randomized controlled trial"[Publication Type] OR "meta-analysis"[Publication Type] OR "systematic review"[Publication Type])`
- Date filter: last 15 years (older is fine if seminal)
- Species: `AND "humans"[MeSH Terms]` (unless mechanism justifies animal data)

**Interaction-specific terms to include:**
- `AND ("drug interactions"[MeSH] OR "absorption" OR "bioavailability" OR "pharmacokinetics")`
- For synergy: `OR "synergism"[MeSH] OR "combined"`

## 2. NIH Office of Dietary Supplements

- https://ods.od.nih.gov/factsheets/ — check both A and B fact sheets
- Look for the "Interactions with Medications" and "Interactions with Supplements" sections
- These are physician-authored and citable

## 3. Memorial Sloan Kettering Integrative Medicine

- https://www.mskcc.org/cancer-care/integrative-medicine/herbs
- Search each substance. Look at "Adverse Reactions" and "Herb-Drug Interactions."
- MSK reviews are the most physician-oriented source for herb/supplement data.

## 4. Examine.com

- https://examine.com/supplements/birth-control/ and /st-johns-wort/
- Look at the "Caution / Adverse" and "Combines with" sections
- Examine is exhaustive but commercial — cross-check their citations

## 5. Cochrane Library (for top-tier evidence)

- https://www.cochranelibrary.com — systematic reviews only
- Use for big-effect claims; empty result = noted absence (worth recording)

## 6. Cross-database checks

- **RxNorm** (if A or B is a drug): check the NIH RxNav Interaction API
- **Retraction Watch**: search each PMID you cite. Retracted papers must be dropped.

## 7. Negative-result recording

If searches return **no** direct-pair evidence:
- Record queries and dates in `02_evidence.json` under `searches_with_no_results`
- Decide: drop the pair (no page) vs write a "no documented interaction" page
- Default: drop. A no-result page has low SEO value unless the pair is high-volume.

## Output of this stage

In `02_evidence.json`, populate `searches_performed[]` with each query you ran,
the database, date, and result count. This makes the research reproducible and
lets a reviewer spot missed queries.
