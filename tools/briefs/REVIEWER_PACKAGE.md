# Interaction Pages — Reviewer Package

**Date prepared:** 2026-04-21
**Purpose:** Seven supplement-drug interaction pages drafted using a 6-stage systematic-review-style workflow. Each has passed an internal validator. Your sign-off is the final gate before these go on the public Formulate interaction checker at `https://formulate-health.app/interactions/`.

## Who should review what

| Pair | Severity | Suggested reviewer |
|---|---|---|
| SSRI + St John's wort | DANGER | Psychiatrist or clinical pharmacologist |
| Birth control + St John's wort | DANGER | OB/GYN or PharmD |
| Cyclosporine + St John's wort | DANGER | Transplant pharmacist or transplant physician |
| Ashwagandha + thyroid medication | WARNING | Endocrinologist or PharmD |
| Vitamin K + warfarin | WARNING | Anticoagulation-clinic PharmD |
| Dong quai + warfarin | WARNING | Anticoagulation-clinic PharmD |
| Ginkgo biloba + blood thinners | WARNING | Anticoagulation-clinic PharmD |

**Single-reviewer path:** A PharmD with broad clinical experience can realistically review all seven in a 45-60 minute sitting. Only the transplant pair (cyclosporine + SJW) genuinely benefits from transplant-specialist input; the others are within a generalist PharmD's scope.

## How to review each pair (quick)

For each pair, 4 files matter:
1. **`03_draft.md`** — the draft that would appear on the public page. Read this first.
2. **`02_evidence.json > sources[]`** — every citation referenced in the draft. Spot-check any you'd like.
3. **`02_evidence.json > claims[]`** — structured claims with strength tags and dose thresholds.
4. **`06_decision.md`** — the final Python entry that would be merged into the interaction database.

Optional deeper review:
- `04_adversarial.md` — red-team pass for each claim. Reviewer can skip if draft looks solid.
- `05_grade_scoring.md` — GRADE-style evidence rating. Useful for calibrating whether severity matches the evidence.

## Sign-off rubric — check these per pair

For each draft, verify:

- [ ] Severity (DANGER / WARNING) matches clinical judgment
- [ ] Mechanism description is accurate for the current scientific understanding
- [ ] Recommendation is actionable and not dangerously prescriptive (no dosing patients should do without clinician involvement)
- [ ] Populations flagged are appropriate
- [ ] Nothing factually wrong that a patient could act on

If a pair fails your review, note the issue on the pair's `06_decision.md` and check **REVISE**. We'll fix and re-queue.

## Severity framework used

| Label | Criteria |
|---|---|
| DANGER | Non-reversible harm documented, or emergency-level morbidity. Requires MODERATE+ evidence AND physician sign-off. |
| WARNING | Meaningful clinical impact, mitigatable with timing/dose/monitoring. Requires MODERATE+ evidence. |
| CAUTION | Theoretical or mild effect, timing-dependent. Requires LOW+ evidence. |
| SYNERGY | Beneficial combined effect. |
| INFO | Minor note worth flagging. |

## Per-pair quick facts

### 1. SSRI + St John's wort — DANGER (severity holds)

- **Mechanism:** Additive serotonergic activity (SJW has monoamine-reuptake-inhibitor activity independent of SSRIs). Not purely pharmacokinetic — low-hyperforin SJW does not eliminate risk.
- **Key sources:** Borrelli 2007 (PMID 17486092), Nicolussi 2020 (PMID 31943241), StatPearls 2024.
- **Primary concern:** Serotonin syndrome — mild to fatal. No RCT of direct coadministration (unethical).
- **Reviewer questions:** Is DANGER correct? Recommended washout period when switching?
- **File:** [ssri--st-johns-wort/](./ssri--st-johns-wort/)

### 2. Birth control + St John's wort — DANGER (severity holds)

- **Mechanism:** Hyperforin activates PXR → CYP3A4 + P-gp induction → accelerated contraceptive clearance.
- **Key sources:** Pfrunder 2003 RCT (PMID 12911359 — N=17, breakthrough bleeding 35% → 77% → 88% dose-response, p<0.001), Borrelli 2007, Nicolussi 2020, 2024 systematic review.
- **Primary concern:** Unintended pregnancy (9 documented cases by 2001 in UK/Sweden pharmacovigilance).
- **Reviewer questions:** Include progestin-only / IUD / emergency-contraception extrapolation? Duration of backup contraception after stopping SJW?
- **File:** [birth-control--st-johns-wort/](./birth-control--st-johns-wort/)

### 3. Cyclosporine + St John's wort — DANGER (severity holds)

- **Mechanism:** Hyperforin CYP3A4 + P-gp induction → 25-62% cyclosporine level drop within 3-4 weeks.
- **Key sources:** Ruschitzka 2000 Lancet (PMID 10683008, 2 heart transplants rejected), Mai-Bonde 2001 Am J Kidney Dis (PMID 11684566, 4-patient case series with heart/kidney/pancreas rejection), Borrelli 2007, Nicolussi 2020.
- **Primary concern:** Acute transplant rejection — non-reversible graft damage.
- **Reviewer questions:** Tacrolimus + sirolimus extrapolation fair? Any products that should be explicitly named/excluded?
- **File:** [cyclosporine--st-johns-wort/](./cyclosporine--st-johns-wort/)

### 4. Ashwagandha + thyroid medication — WARNING (severity downgrade from DANGER)

- **Mechanism:** Thyroid-stimulating effect — raises T3/T4, lowers TSH. Proposed: glandular stimulation OR exogenous T3/T4 contamination of supplement.
- **Key sources:** Sharma 2018 RCT (PMID 28829155, N=50 subclinical hypothyroid, 600mg/day 8 weeks, TSH p<0.001, T3 p=0.0031, T4 p=0.0096), Gannon 2014 RCT (N=60 bipolar, direction consistent), Kamal 2022 Cureus case (73F with SVT + thyrotoxicosis), MSK monograph.
- **Why downgrade:** No RCT has directly co-administered ashwagandha + levothyroxine. All documented thyrotoxicosis resolved on discontinuation. Effect is gradual endocrine stimulation, not acute toxicity.
- **Reviewer questions:** Is WARNING correct, or should DANGER be retained given narrow therapeutic window of levothyroxine? Is 4-8 week retest interval appropriate?
- **File:** [ashwagandha--thyroid-medication/](./ashwagandha--thyroid-medication/)

### 5. Vitamin K + warfarin — WARNING (severity downgrade from DANGER)

- **Mechanism:** Direct antagonism — warfarin blocks vitamin K epoxide reductase; exogenous K provides the substrate.
- **Key sources:** Violi 2016 systematic review (PMID 26962786), Sconce 2007 RCT (PMID 17690342, N=70, 150 microgram/day K stabilized INR), observational variability study (PMID 16941417, r=-0.600).
- **Why downgrade:** Contemporary clinical practice is "consistency of intake" not "avoidance." Old "avoid leafy greens" advice is outdated per S1. INR monitoring + dose adjustment is standard mitigation. DOAC patients have no interaction.
- **Reviewer questions:** Is the "consistency not avoidance" framing appropriate for public-facing content? Should K2 (MK-7) supplements be called out more explicitly?
- **File:** [vitamin-k--warfarin/](./vitamin-k--warfarin/)

### 6. Dong quai + warfarin — WARNING (severity downgrade from DANGER)

- **Mechanism:** Pharmacodynamic — dong quai coumarins (ferulic acid, osthole) add to warfarin's anticoagulant effect. Animal studies show PT rise without warfarin concentration change.
- **Key sources:** Page 1999 case report (PMID 10417036, 46F INR 4.05 then 4.90 on 565 mg BID, reversed on discontinuation), herbal-warfarin reviews.
- **Why WARNING:** Single case report + animal data + mechanism. No RCT. No bleeding in documented case; reversible.
- **Reviewer questions:** Is WARNING adequate? Should the peri-menopausal-symptoms context (dong quai's main consumer use) be in the recommendation?
- **File:** [dong-quai--warfarin/](./dong-quai--warfarin/)

### 7. Ginkgo biloba + blood thinners — WARNING (severity downgrade from DANGER)

- **Mechanism:** Ginkgolide B is a platelet-activating-factor (PAF) antagonist.
- **Key sources:** Stoddard 2015 VA retrospective (PMID 26958227, N=807,399, HR 1.38 CI 1.20-1.58 p<0.001 for warfarin+ginkgo bleeding), Mai 2025 PLOS ONE (N=2,647, aspirin/clopidogrel signal but NOT warfarin in this cohort), Gardner 2007 RCT (PMID 17982321, N=55, no platelet effect from ginkgo+aspirin), Bone 2008 systematic review (PMID 18214851, no hemostasis effect in controlled studies).
- **Why downgrade:** Evidence is genuinely mixed. Observational signal is modest (HR/OR 1.10-1.38). RCT evidence is null. Systematic review is skeptical.
- **Reviewer questions:** Is WARNING the right fit, or should it be CAUTION given the RCT-null + mixed-observational data? Is 5-7 day pre-surgery hold the right guidance?
- **File:** [blood-thinners--ginkgo-biloba/](./blood-thinners--ginkgo-biloba/)

## What happens after your sign-off

For each approved pair:

1. Check the `## Final decision` box in `06_decision.md` to **SHIP**.
2. The Python `Interaction(...)` entry at the bottom of `06_decision.md` gets pasted into `Formulate/app/services/interaction_service.py`'s `INTERACTIONS` list, replacing the current stub entry.
3. Run `python tools/export_interactions.py` in the `formulate-landing` repo. This regenerates `src/data/interactions.json`.
4. The Next.js static generation re-renders `/interactions/<pair>` pages on deploy.

Each approved page goes from ~15 words and zero citations to ~500-700 words with 3-4 named citations. The drafts are written for informed consumers, not clinicians — they assume no medical background but avoid alarmism.

## If you have time — tooling review

If you want to audit the process itself:

- `tools/audit_interactions.py` — scored all 105 existing entries; all are currently under 40 words, avg page-ready score 26/100.
- `tools/interaction_research_workflow.py` — generator for the 6-stage structure you're reviewing.
- `tools/interaction_workflow_validate.py` — automated ship-gate. Current status: 7/7 pass.

Contact [user's email] with questions, comments, or concerns before marking any pair as SHIP.
