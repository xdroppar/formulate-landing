/**
 * The homepage FAQ — the visible copy and the structured data, from one list.
 *
 * Google rejects FAQPage schema that does not match copy a reader can see, so
 * these must stay unified. They were unified inside the old homepage
 * component; they live here now because the homepage is the console landing
 * and the FAQ has to survive that change. It is the one part of the old page
 * with a technical dependency rather than a stylistic one: drop the visible
 * questions and the rich result goes with them, and worse, keeping the schema
 * without the copy is the violation.
 */
export type T = (key: string, vars?: Record<string, string | number>) => string;

export function homeFaqs(t: T): { q: string; a: string }[] {
  return [
    { q: t("home.isFormulateReallyFree"), a: t("home.yesTheWebAppIs") },
    { q: t("home.isThisJustForSupplements"), a: t("home.noFormulateStartedWithSupplement") },
    { q: t("home.howDoYouScoreSupplements"), a: t("home.supplementsAreEvaluatedAcrossIngredient") },
    { q: t("home.isThisMedicalAdvice"), a: t("home.noFormulateIsAnInformational") },
    { q: t("home.canBrandsPayToChange"), a: t("home.noWeDoNotAccept") },
    { q: t("home.doINeedAnAccount"), a: t("home.noYouCanBrowseThe") },
  ];
}

/** FAQPage structured data, localised alongside the visible copy so the
 *  rich-result text can never disagree with what the page actually says. */
export function homeFaqLd(t: T) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs(t).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
