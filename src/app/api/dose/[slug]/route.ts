import { NextResponse } from "next/server";
import { ingredients } from "@/lib/encyclopedia";

/**
 * One ingredient's dose detail for /tools/dose-calculator, prebuilt per slug.
 *
 * The calculator used to receive summary, dosage and forms for all 968
 * ingredients as props, which Next serialises into the page: 779 KB of the
 * page's 797 KB of HTML was that payload, 91% of it detail that is only ever
 * shown for the one ingredient picked. The page now ships the searchable list
 * (slug, name, category, grade) and fetches this on selection — a few hundred
 * bytes, static, cached by the CDN.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return ingredients.map((i) => ({ slug: i.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = ingredients.find((x) => x.slug === slug);
  if (!i) return NextResponse.json({ error: "unknown ingredient" }, { status: 404 });
  return NextResponse.json(
    {
      summary: i.summary,
      dosage: i.dosage,
      forms: i.forms.map((f) => ({ form: f.form, score: f.score ?? null })),
    },
    { headers: { "cache-control": "public, max-age=3600, s-maxage=86400" } },
  );
}
