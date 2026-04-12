import { NextResponse } from "next/server";
import { guides } from "@/lib/guides";

const API_URL = process.env.API_URL || "https://formulate-api.onrender.com";
const CRON_SECRET = process.env.CRON_SECRET || "";

/**
 * Weekly Vercel Cron trigger. Reads the guides manifest and POSTs it
 * to formulate-api, which decides whether there are new guides since
 * the last digest and sends batch emails if so.
 *
 * Vercel Cron calls GET with an auth header it sets automatically
 * (`Authorization: Bearer ${CRON_SECRET}` — we validate it here).
 * We forward the list to the API using a separate cron secret header.
 */
export async function GET(request: Request) {
  // Vercel Cron sends `Authorization: Bearer ${CRON_SECRET}`
  const auth = request.headers.get("authorization");
  if (CRON_SECRET && auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = {
    guides: guides.map((g) => ({
      slug: g.slug,
      title: g.title,
      description: g.description,
      category_label: g.categoryLabel,
      read_time: g.readTime,
      published_at: g.publishedAt,
    })),
  };

  try {
    const res = await fetch(`${API_URL}/api/v1/newsletter/send-digest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Cron-Secret": CRON_SECRET,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, status: res.status, error: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, ...data });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
