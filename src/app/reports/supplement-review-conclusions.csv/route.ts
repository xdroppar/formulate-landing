import { allIngredientEvidence, evidenceSource } from "@/lib/ingredient-evidence";

/**
 * The review-conclusions dataset as a CSV, so a reader can check or reuse every
 * number the report states. Built at deploy from the same data the pages read.
 */
export const dynamic = "force-static";

function cell(v: string | number | boolean | undefined): string {
  const s = v === undefined ? "" : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function GET() {
  const header = [
    "ingredient",
    "name_in_review_data",
    "outcome",
    "direction",
    "special_population",
    "quote_pmid",
    "all_pmids",
    "quote",
  ];
  const lines = [header.join(",")];
  for (const i of allIngredientEvidence) {
    for (const f of i.findings) {
      lines.push(
        [
          i.name,
          f.as ?? i.name,
          f.outcome,
          f.direction,
          f.special ? "yes" : "no",
          f.quote_pmid,
          f.pmids.join(" "),
          f.quote,
        ]
          .map(cell)
          .join(","),
      );
    }
  }
  lines.push("");
  lines.push(`# Formulate, "Supplement systematic-review conclusions", source ${evidenceSource.commit.slice(0, 7)}, ${evidenceSource.generated_at}`);
  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'inline; filename="formulate-supplement-review-conclusions.csv"',
    },
  });
}
