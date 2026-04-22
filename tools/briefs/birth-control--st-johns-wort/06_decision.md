# Stage 6 — Ship Decision

Pair: **Birth control** + **St John's wort**

## Pre-ship checklist

- [x] `02_evidence.json` fully populated
- [x] Every claim has `[strength, S#]` tag
- [x] All strong/moderate claims have >= 2 supporting sources
- [x] No retracted sources
- [x] Adversarial review: all claims survived
- [x] GRADE: HIGH+MODERATE+HIGH — exceeds DANGER bar
- [x] `details` ~670 words
- [x] `summary` 109 chars
- [x] Recommendation specific and actionable
- [x] Populations explicit (combined OC, progestin-only, emergency contraception)
- [x] Dose threshold specified (hyperforin content dependency noted)
- [x] Re-review due 2027-04-21

## Physician sign-off (REQUIRED — DANGER)

- [ ] Reviewed by: **REQUIRED BEFORE SHIP** — OB/GYN or clinical pharmacology
- [ ] Date: ______________________

## Severity change

Original: DANGER. Final: DANGER (no change in severity, massive content upgrade).
- Details: 15 words → ~670 words with 14 `[strength, S#]` tags
- Sources: 2 vague → 4 specific (1 RCT, 3 systematic reviews)

## Final decision

- [x] HOLD for OB/GYN or PharmD sign-off
- [ ] SHIP

## If SHIPPING: Python entry

```python
Interaction(
    substance_a="birth control",
    substance_b="st johns wort",
    severity=InteractionSeverity.DANGER,
    interaction_type=InteractionType.METABOLISM,
    summary="St John's wort reduces oral contraceptive effectiveness and has caused breakthrough bleeding and unintended pregnancies.",
    details=(
        "Hyperforin, a primary constituent of St John's wort, activates the "
        "pregnane X receptor (PXR) and induces cytochrome P450 3A4 and "
        "P-glycoprotein. CYP3A4 metabolizes ethinylestradiol and most progestins; "
        "inducing it accelerates contraceptive clearance and lowers circulating "
        "hormone levels. A direct RCT (Pfrunder 2003, N=17 healthy women on a "
        "low-dose combined OC) found breakthrough bleeding rose from 6/17 (35%) "
        "on OC alone to 13/17 (77%, p<0.015) with SJW 300 mg twice daily and "
        "15/17 (88%, p<0.001) with SJW 300 mg three times daily — a clean "
        "dose-response pattern. Ovulation was not detected but follicle-like "
        "structures appeared sporadically, meaning the contraceptive margin "
        "narrows. Pharmacovigilance confirms the clinical impact: by December "
        "2001 the UK and Sweden together had received 9 reports of unintended "
        "pregnancies attributed to SJW + OC co-use, all in women who had used "
        "OCs without problems for at least seven months before adding SJW. "
        "Products with greater than 1 mg hyperforin/day are considered high-risk; "
        "a low-hyperforin extract study (Will-Shahab 2009) showed no measurable "
        "PK interaction, but most retail SJW products are high-hyperforin and "
        "hyperforin content is rarely disclosed on US labels. CYP3A4 induction "
        "persists for 1-2 weeks after stopping SJW. Progestin-only pills, "
        "patches, rings, implants, hormonal IUDs, and levonorgestrel emergency "
        "contraception are all metabolized by CYP3A4 and likely affected; direct "
        "trial data on non-combined methods are sparse."
    ),
    recommendation=(
        "If you rely on oral contraception, do not take St John's wort without "
        "discussing it with your prescriber. If you are taking both, use a "
        "reliable backup method (condom, non-hormonal IUD, abstinence) during "
        "SJW use and for at least two weeks after stopping. Breakthrough bleeding "
        "on a previously stable OC regimen is a warning sign. For levonorgestrel "
        "emergency contraception, SJW use in the prior 1-2 weeks reduces "
        "efficacy — a copper IUD is a more reliable alternative."
    ),
    timing_advice=(
        "Spacing doses does not help. CYP3A4 induction is a transcriptional "
        "effect developing over days and resolving over days — unrelated to "
        "hour-by-hour timing."
    ),
    sources=[
        "PMID:12911359 — Pfrunder A et al. Interaction of St John's wort with low-dose oral contraceptive therapy: a randomized controlled trial. Br J Clin Pharmacol 2003.",
        "PMID:17486092 — Borrelli F, Izzo AA. St John's wort (Hypericum perforatum): drug interactions and clinical outcomes. CNS Drugs 2007.",
        "PMID:31943241 — Nicolussi S et al. Clinical relevance of St John's wort drug interactions revisited. Br J Pharmacol 2020.",
        "https://pmc.ncbi.nlm.nih.gov/articles/PMC11283811/ — Co-administration of St John's wort and hormonal contraceptives: a systematic review. 2024.",
    ],
    mechanism=(
        "Hyperforin, a primary constituent of St John's wort, activates the "
        "pregnane X receptor (PXR) and induces cytochrome P450 3A4 and "
        "P-glycoprotein. CYP3A4 metabolizes ethinylestradiol and most "
        "progestins; inducing it accelerates contraceptive clearance and lowers "
        "circulating hormone levels. P-glycoprotein induction additionally "
        "reduces intestinal absorption. Net effect: less hormone in circulation, "
        "less ovulation suppression, more breakthrough bleeding and pregnancy risk."
    ),
    evidence_quality="high",
    populations=[
        "Women on combined oral contraceptives — highest evidence base.",
        "Women on progestin-only pills, patches, rings, implants, hormonal IUDs — same mechanism, sparser direct data.",
        "Women on combination patches or rings — same caution as combined OCs.",
        "Anyone needing levonorgestrel emergency contraception — SJW use in the prior 1-2 weeks reduces efficacy.",
    ],
    what_we_dont_know=(
        "Post-stopping-SJW washout time is not precisely quantified (CYP3A4 "
        "induction typically persists 1-2 weeks). Direct RCTs on progestin-only "
        "pills, hormonal IUDs, or emergency contraception + SJW are lacking."
    ),
    severity_rationale=(
        "DANGER. Unintended pregnancy is definitionally non-reversible. The "
        "interaction is RCT-confirmed (Pfrunder 2003, dose-response p<0.001), "
        "mechanistically explained, and validated by pharmacovigilance (9 "
        "documented unintended pregnancies by 2001)."
    ),
)
```
