# Stage 6 — Ship Decision

Pair: **Cyclosporine** + **St John's wort**

## Pre-ship checklist

- [x] evidence.json fully populated, severity=DANGER, interaction=metabolism
- [x] All draft claims tagged
- [x] 4 specific sources (2 case series + 2 reviews)
- [x] No retractions
- [x] Adversarial: all claims survived, DANGER holds
- [x] GRADE: HIGH+HIGH+HIGH — exceeds DANGER bar
- [x] details ~640 words
- [x] summary 105 chars
- [x] Recommendation absolute and actionable
- [x] Populations explicit (cyclosporine, tacrolimus, sirolimus, all transplant types)
- [x] Dose threshold noted
- [x] Re-review 2027-04-21

## Physician sign-off (REQUIRED — DANGER)

- [ ] **REQUIRED** — transplant pharmacist or nephrologist/cardiologist with transplant experience

## Severity change

Original DANGER 28 words → **DANGER** (stays) ~640 words, 4 specific sources.

## Decision

- [x] HOLD for transplant-specialist sign-off
- [ ] SHIP after sign-off

## Python entry

```python
Interaction(
    substance_a="cyclosporine",
    substance_b="st johns wort",
    severity=InteractionSeverity.DANGER,
    interaction_type=InteractionType.METABOLISM,
    summary="St John's wort substantially lowers cyclosporine levels and has caused documented transplant rejection.",
    details=(
        "Hyperforin, the primary CYP-active constituent of St John's wort, "
        "activates the pregnane X receptor (PXR) and strongly induces "
        "cytochrome P450 3A4 and P-glycoprotein. Cyclosporine is a "
        "narrow-therapeutic-index immunosuppressant metabolized by CYP3A4 and "
        "effluxed by P-gp. Inducing both pathways accelerates cyclosporine "
        "clearance and produces clinically meaningful under-exposure — which "
        "after a transplant means rejection. Published case reports span "
        "multiple organ types: two heart transplant recipients developed acute "
        "rejection after self-starting SJW (Ruschitzka 2000). A 4-patient case "
        "series (2001, Am J Kidney Dis) reported 2 heart, 1 kidney, and 1 "
        "pancreas transplant recipients whose cyclosporine levels fell 25-62% "
        "within 3-4 weeks of starting SJW, with graft rejection in all four. "
        "Cyclosporine levels returned to therapeutic range after SJW was "
        "stopped and rejection was treated — but graft function can be "
        "permanently reduced by a rejection episode, and not every rejection "
        "is successfully treated. Standard retail SJW products (600-900 mg/day "
        "high-hyperforin) have caused the interaction. Low-hyperforin products "
        "may trigger less PK induction but are not reliable for transplant "
        "patients given the non-reversible consequence. The same mechanism "
        "applies to tacrolimus and sirolimus."
    ),
    recommendation=(
        "If you have had an organ transplant and take cyclosporine, tacrolimus, "
        "or sirolimus, do not take St John's wort under any circumstance. This "
        "applies to every product form: capsules, teas, tinctures, combination "
        "mood supplements listing hypericum as an ingredient. If you are "
        "currently taking both, contact your transplant center today — not "
        "your next routine appointment — and stop the SJW. Your cyclosporine "
        "levels need to be rechecked quickly. For mood symptoms, your "
        "transplant team can discuss alternatives."
    ),
    timing_advice=(
        "Spacing doses does not help. CYP3A4 induction is transcriptional, "
        "taking days to develop and 1-2 weeks to resolve. No timing workaround."
    ),
    sources=[
        "PMID:10683008 — Acute heart transplant rejection due to Saint John's wort. 2000.",
        "PMID:11684566 — Interaction between cyclosporine and Hypericum perforatum after organ transplantation. Am J Kidney Dis 2001.",
        "PMID:17486092 — Borrelli F, Izzo AA. St John's wort: drug interactions and clinical outcomes. CNS Drugs 2007.",
        "PMID:31943241 — Nicolussi S et al. Clinical relevance of St John's wort drug interactions revisited. Br J Pharmacol 2020.",
    ],
    mechanism=(
        "Hyperforin activates the pregnane X receptor (PXR) and strongly induces "
        "CYP3A4 and P-glycoprotein. Cyclosporine is a narrow-therapeutic-index "
        "immunosuppressant metabolized by CYP3A4 and effluxed by P-gp. Inducing "
        "both pathways accelerates cyclosporine clearance and produces clinically "
        "meaningful under-exposure — which after a transplant means rejection. "
        "Documented cyclosporine level drops of 25-62% within 3-4 weeks of SJW "
        "initiation."
    ),
    evidence_quality="high",
    populations=[
        "All organ transplant recipients on cyclosporine, tacrolimus, or sirolimus — contraindicated.",
        "Patients on other narrow-therapeutic-index CYP3A4 substrates — class-general concern.",
        "Patients tapering immunosuppression — even low-dose regimens are at risk; induction effect is disproportionate at low levels.",
    ],
    what_we_dont_know=(
        "Onset time of clinically relevant induction varies (days to weeks). "
        "Genetic variation in PXR/CYP3A4 likely modulates individual "
        "susceptibility but is not used clinically to stratify risk. Whether "
        "any low-hyperforin formulation is truly safe in transplant recipients "
        "has not been tested and would be unethical to test given documented harm."
    ),
    severity_rationale=(
        "DANGER. Transplant rejection is non-reversible and potentially "
        "life-threatening. Multiple published cases across heart, kidney, and "
        "pancreas transplants. Unanimous transplant-medicine contraindication."
    ),
)
```
