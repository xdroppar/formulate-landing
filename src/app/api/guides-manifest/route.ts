import { NextResponse } from "next/server";
import { visibleGuides } from "@/lib/guides";

/**
 * Exposes the guide manifest as JSON for the newsletter cron job.
 * Uses the same data as guides.ts — single source of truth.
 */
export function GET() {
  return NextResponse.json({
    guides: visibleGuides.map((g) => ({
      slug: g.slug,
      title: g.title,
      description: g.description,
      category_label: g.categoryLabel,
      read_time: g.readTime,
      published_at: g.publishedAt,
    })),
  });
}
