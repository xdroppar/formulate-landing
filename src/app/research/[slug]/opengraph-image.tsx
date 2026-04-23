import { ImageResponse } from "next/og";
import { researchBySlug } from "@/lib/research";

// nodejs runtime: research.ts imports node:fs at module scope for the
// guide-reverse-index scan. Edge runtime would fail on the fs import
// even though the OG image itself only calls researchBySlug.
export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Cited research on Formulate";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = researchBySlug(slug);

  const title = study?.title ?? "Cited research";
  const authors = study?.authors ?? "Primary source";
  const year = study?.year ?? "";
  const journal = study?.journal ?? "";
  const summary = study?.summary ?? "";

  const titleFont = title.length > 110 ? 42 : title.length > 80 ? 52 : 60;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#08080f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#00e5a0",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "28px",
              fontWeight: 800,
              color: "#f0f0f8",
              letterSpacing: "-0.5px",
            }}
          >
            Formulate
            <span style={{ color: "#00e5a0" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "18px",
              fontWeight: 700,
              color: "#a0a0b8",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Cited Research
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            alignItems: "center",
            gap: "14px",
            padding: "12px 24px",
            borderRadius: "999px",
            background: "rgba(0, 229, 160, 0.12)",
            border: "2px solid #00e5a0",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              fontWeight: 800,
              color: "#00e5a0",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Primary research · {year}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: `${titleFont}px`,
            fontWeight: 900,
            color: "#f0f0f8",
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            marginBottom: "28px",
          }}
        >
          {title.length > 160 ? `${title.slice(0, 158)}…` : title}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "24px",
            color: "#c4c4d4",
            marginBottom: "16px",
            lineHeight: 1.3,
          }}
        >
          <span style={{ fontWeight: 700, color: "#f0f0f8" }}>{authors}</span>
          <span style={{ margin: "0 12px", color: "#7a7a9a" }}>·</span>
          <span style={{ fontStyle: "italic" }}>{journal}</span>
        </div>

        {summary && (
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              color: "#a0a0b8",
              lineHeight: 1.45,
              flex: 1,
              fontWeight: 400,
            }}
          >
            {summary.length > 220 ? `${summary.slice(0, 218)}…` : summary}
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "24px",
            paddingTop: "24px",
            borderTop: "1px solid #2a2a3a",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              color: "#7a7a9a",
            }}
          >
            Registry of studies cited across Formulate guides
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              color: "#f0f0f8",
              fontWeight: 600,
            }}
          >
            formulate-health.app/research
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
