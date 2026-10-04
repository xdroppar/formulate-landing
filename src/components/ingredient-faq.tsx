import type { Ingredient } from "@/lib/encyclopedia";
import type { Product } from "@/lib/products";

/**
 * The questions an ingredient page is actually asked, answered from the
 * encyclopedia rather than written.
 *
 * WHY. All four sites that outrank us on these queries close with an FAQ
 * block, and we had none — measured, zero occurrences on the rendered page.
 * It is also the one section eligible for FAQPage rich results, so it earns
 * its place twice.
 *
 * Every answer is derived. Nothing here is editorial: dose, timing, form and
 * safety come straight off the ingredient record (all 968 carry dosage,
 * safety and forms), and the product answer is whatever currently scores
 * highest in the catalog. That means these cannot drift away from the data
 * the rest of the page shows, which is the failure mode a hand-written FAQ
 * would have.
 *
 * A question whose source field is empty is dropped rather than answered
 * vaguely, and the JSON-LD is built from the questions that actually
 * rendered — emitting schema for an answer the page does not show is the
 * kind of thing that earns a manual action.
 */
export function IngredientFaq({
  ing,
  topProduct,
}: {
  ing: Ingredient;
  topProduct: Product | null;
}) {
  const d = ing.dosage;
  const s = ing.safety;
  const qa: { q: string; a: string }[] = [];

  if (d?.typical_range) {
    qa.push({
      q: `How much ${ing.name} should I take?`,
      a: [`The typical range is ${d.typical_range}.`, d.duration_notes]
        .filter(Boolean)
        .join(" "),
    });
  }

  if (d?.timing) {
    qa.push({
      q: `When should I take ${ing.name}?`,
      a: [d.timing, d.with_food].filter(Boolean).join(". ") + ".",
    });
  }

  const bestForm = ing.forms?.[0];
  if (bestForm?.form) {
    qa.push({
      q: `Which form of ${ing.name} is best?`,
      a:
        `${bestForm.form}${bestForm.notes ? ` — ${bestForm.notes}` : ""}.` +
        (ing.forms.length > 1
          ? ` Other forms in the catalog: ${ing.forms
              .slice(1)
              .map((f) => f.form)
              .join(", ")}.`
          : ""),
    });
  }

  if (s) {
    // SafetyInfo declares `serious_risks` and carries an index signature for
    // everything else, but the data has `serious_warnings` (547/968) and
    // `liver_kidney_notes` (556/968) and NO `serious_risks` at all — so these
    // are read through narrowing helpers rather than trusting the type.
    const strArr = (v: unknown): string[] =>
      Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
    const str = (v: unknown): string => (typeof v === "string" ? v : "");

    const sideEffects = strArr(s.common_side_effects);
    const warnings = [...strArr(s.serious_warnings), ...strArr(s.serious_risks)];
    const bits = [
      sideEffects.length ? `Commonly reported: ${sideEffects.join(", ")}.` : "",
      warnings.length ? `Serious warnings: ${warnings.join(", ")}.` : "",
      str(s.liver_kidney_notes),
    ].filter(Boolean);
    if (bits.length) {
      qa.push({ q: `Is ${ing.name} safe?`, a: bits.join(" ") });
    }
  }

  if (topProduct?.score != null) {
    qa.push({
      q: `Which ${ing.name} supplement scores highest?`,
      a: `${topProduct.brand} ${topProduct.name}, at ${topProduct.score}/100. Scored on dose accuracy, form, label transparency and third-party testing — no brand pays to be listed or ranked.`,
    });
  }

  if (qa.length < 2) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };

  return (
    <section className="mb-10">
      <h2 className="text-sm font-bold uppercase tracking-wider text-accent mb-3">
        Common questions
      </h2>
      <div className="rounded-xl border border-border divide-y divide-border/60">
        {qa.map((x) => (
          <div key={x.q} className="p-4">
            <h3 className="text-sm font-semibold text-text mb-1.5">{x.q}</h3>
            <p className="text-sm text-muted leading-relaxed">{x.a}</p>
          </div>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
