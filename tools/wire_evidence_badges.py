"""Auto-wire bare <EvidenceBadge /> instances to matching studies in the registry.

For each bare badge in a guide, look backward in the prose for author names
that match a study in src/lib/guide-evidence.ts. When a match is found within
a lookback window, rewrite the badge with a studiesId reference.

Rules:
  - Only wire bare badges: `<EvidenceBadge level="X" />`. Skip already-wired.
  - Lookback window: 400 chars before the badge.
  - First matching author wins. If multiple authors match (e.g. "Manson"
    could refer to VITAL omega-3 or VITAL vitamin-D), use context keywords
    (nearby substance/topic words) to disambiguate.
  - Year-in-prose match is a strong signal — prefer the study whose year
    appears nearest the badge.
  - Script is idempotent: re-running doesn't double-wire.

Run: python tools/wire_evidence_badges.py
"""
from __future__ import annotations
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = ROOT / "src" / "app" / "guides" / "[slug]" / "content"

# (canonical-author-regex, [disambiguation-keywords, ...], study-id, year)
# Order matters for some entries: more specific patterns first.
MATCHERS: list[tuple[str, list[str], str, int]] = [
    # Ashwagandha
    (r"Chandrasekhar", ["ashwagandha", "cortisol"], "ashwagandha-cortisol-2012", 2012),
    (r"Lopresti", ["ashwagandha", "shoden", "stress"], "ashwagandha-lopresti-2019", 2019),
    (r"Pratte", ["ashwagandha", "anxiety"], "ashwagandha-pratte-2014", 2014),
    (r"Langade", ["ashwagandha", "sleep", "cureus"], "ashwagandha-langade-sleep-2019", 2019),
    (r"Wankhede", ["ashwagandha", "ksm", "strength", "muscle"], "ashwagandha-wankhede-2015", 2015),

    # Creatine
    (r"Harris[,\s].*?(?:Söderlund|Soderlund|Hultman)|Harris et al.*?1992", ["creatine", "clinical science"], "creatine-loading-harris-1992", 1992),
    (r"Hultman", ["creatine", "loading"], "creatine-hultman-1996", 1996),
    (r"Kreider", ["creatine", "position", "issn"], "creatine-kreider-issn-2017", 2017),
    (r"Antonio and Ciccone|Antonio.*?Ciccone", ["creatine", "pre", "post", "workout"], "creatine-post-vs-pre-antonio-2013", 2013),
    (r"Antonio et al.*?2021|Antonio.*?common questions", ["creatine", "forms"], "creatine-antonio-forms-2021", 2021),
    (r"Smith-Ryan", ["creatine", "women"], "creatine-smith-ryan-women-2021", 2021),
    (r"Avgerinos", ["creatine", "cognitive"], "creatine-avgerinos-cognitive-2018", 2018),

    # Omega-3
    (r"Aung", ["omega", "epa", "dha", "jama"], "omega3-mortality-meta-2018", 2018),
    (r"Skulas-Ray", ["omega", "triglyceride", "aha"], "omega3-triglyceride-skulas-ray-2019", 2019),
    (r"Bhatt|REDUCE-IT", ["omega", "icosapent", "ep"], "omega3-reduce-it-bhatt-2019", 2019),
    (r"Dyerberg", ["omega", "triglyceride", "ethyl ester"], "omega3-dyerberg-tg-vs-ee-2010", 2010),
    (r"Liao", ["omega", "epa", "depression"], "omega3-liao-epa-depression-2019", 2019),
    (r"Albert", ["omega", "oxidation", "totox"], "omega3-albert-oxidation-2015", 2015),
    (r"Makrides|MFGD", ["omega", "dha", "pregnancy"], "omega3-mfgd-makrides-2010", 2010),

    # Vitamin D
    (r"Tripkovic", ["vitamin d", "d3", "d2"], "vitamin-d-tripkovic-d3vsd2-2012", 2012),
    (r"Knapen", ["vitamin k", "mk-7", "arterial"], "vitamin-d-knapen-k2-2017", 2017),
    (r"Dawson-Hughes", ["vitamin d", "fat", "absorption"], "vitamin-d-absorption-fat-2015", 2015),
    (r"Holick", ["vitamin d", "endocrine"], "vitamin-d-holick-endocrine-2011", 2011),
    (r"Scragg|ViDA", ["vitamin d", "vida"], "vitamin-d-scragg-vida-2017", 2017),
    (r"Neale|D-Health", ["vitamin d", "d-health", "mortality"], "vitamin-d-neale-dhealth-2022", 2022),

    # Magnesium
    (r"Pouteau", ["magnesium", "b6"], "magnesium-b6-stress-2018", 2018),
    (r"Abbasi", ["magnesium", "sleep"], "magnesium-abbasi-sleep-2012", 2012),
    (r"Slutsky", ["magnesium", "threonate", "neuron"], "magnesium-slutsky-threonate-2010", 2010),
    (r"Zhang.*?(?:hypertension|blood pressure)|magnesium.*?Zhang", ["magnesium", "blood pressure"], "magnesium-zhang-bp-2017", 2017),
    (r"Firoz|Graber", ["magnesium", "oxide", "bioavailability"], "magnesium-firoz-graber-2001", 2001),
    (r"Rosanoff", ["magnesium", "intake"], "magnesium-rosanoff-2012", 2012),
    (r"Liu.*?Magtein|Magtein.*?Liu", ["magnesium", "threonate", "alzheimer"], "magnesium-liu-magtein-2016", 2016),

    # Protein / sleep
    (r"Schoenfeld", ["protein", "timing", "hypertrophy"], "protein-timing-schoenfeld-2013", 2013),
    (r"Bannai|glycine.*?sleep", ["glycine", "sleep"], "glycine-sleep-bannai-2012", 2012),

    # Zinc
    (r"Hemilä|Hemila", ["zinc", "cold", "lozenge"], "zinc-hemila-cold-2017", 2017),

    # Probiotics
    (r"Goldenberg", ["probiotic", "cochrane", "difficile", "c\\. diff"], "probiotics-cdifficile-jama-2017", 2017),
    (r"Szajewska", ["probiotic", "lgg", "gastroenteritis"], "probiotics-lgg-pediatric-2013", 2013),
    (r"Whorwell", ["probiotic", "bifido", "infantis", "align"], "probiotics-whorwell-bifido-2006", 2006),
    (r"Ducrotté|Ducrotte", ["probiotic", "lp299v", "plantarum"], "probiotics-ducrotte-lp299v-2012", 2012),
    (r"McFarland", ["saccharomyces", "boulardii"], "probiotics-mcfarland-sboulardii-2010", 2010),
    (r"Ford.*?(?:ibs|irritable)", ["probiotic", "ibs"], "probiotics-ibs-meta-ford-2014", 2014),

    # VITAL — ambiguous (omega-3 vs vitamin-D). Disambiguate by guide topic.
    (r"Manson.*?2019|VITAL", ["omega", "cardiovascular"], "omega3-vital-manson-2019", 2019),
    (r"Manson.*?2019|VITAL", ["vitamin d", "d3"], "vitamin-d-vital-manson-2019", 2019),
]

BARE_BADGE = re.compile(r'<EvidenceBadge\s+level="([^"]+)"\s*/>')
LOOKBACK = 450  # chars of prose before the badge to scan


def wire_file(path: Path) -> tuple[int, int]:
    """Returns (wired_count, total_bare)."""
    src = path.read_text(encoding="utf-8")
    wired = 0
    total_bare = 0

    # We iterate with a cursor since replacements change offsets
    out = []
    pos = 0
    for m in BARE_BADGE.finditer(src):
        out.append(src[pos:m.start()])
        total_bare += 1
        level = m.group(1)

        # Look back at prose before this badge
        ctx_start = max(0, m.start() - LOOKBACK)
        ctx = src[ctx_start:m.start()].lower()

        chosen_id: str | None = None
        # Score each matcher; pick the highest-scoring match
        best_score = 0
        for pattern, keywords, study_id, year in MATCHERS:
            if not re.search(pattern, src[ctx_start:m.start()], re.I):
                continue
            # Count keyword hits
            kw_score = sum(1 for kw in keywords if kw.lower() in ctx)
            # Year in context is a strong signal
            year_score = 2 if str(year) in ctx else 0
            score = kw_score + year_score
            if score > best_score:
                best_score = score
                chosen_id = study_id

        if chosen_id and best_score >= 1:
            out.append(f'<EvidenceBadge level="{level}" studiesId="{chosen_id}" />')
            wired += 1
        else:
            out.append(m.group(0))
        pos = m.end()
    out.append(src[pos:])

    new_src = "".join(out)
    if wired > 0:
        path.write_text(new_src, encoding="utf-8")
    return wired, total_bare


def main():
    total_wired = 0
    total_bare = 0
    results = []
    for path in sorted(CONTENT_DIR.glob("*.tsx")):
        w, b = wire_file(path)
        if b > 0:
            results.append((path.stem, w, b))
        total_wired += w
        total_bare += b

    # Print results
    results.sort(key=lambda x: -x[1])
    for slug, w, b in results:
        if w > 0:
            print(f"{w:3}/{b:3}  {slug}")
    print(f"\nTotal: wired {total_wired} of {total_bare} bare badges ({total_wired / total_bare * 100:.1f}%)")


if __name__ == "__main__":
    main()
