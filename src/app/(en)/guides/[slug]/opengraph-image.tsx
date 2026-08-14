import { ImageResponse } from "next/og";
import { getGuideBySlug } from "@/lib/guides";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const categoryColor: Record<string, string> = {
  roundup: "#00e5a0",
  protocol: "#7c6dfa",
  review: "#f59e0b",
  guide: "#00e5a0",
};

export const alt = "Formulate guide";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  const title = guide?.title ?? "Formulate Guide";
  const categoryLabel = guide?.categoryLabel ?? "Guide";
  const readTime = guide?.readTime ?? "";
  const accent = categoryColor[guide?.category ?? "guide"] ?? "#00e5a0";

  const updatedLabel = guide
    ? new Date(guide.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#08080f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #00e5a0 0%, #7c6dfa 100%)",
          }}
        />

        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "56px",
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
              fontSize: "18px",
              fontWeight: 700,
              color: accent,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            {categoryLabel}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? "52px" : "62px",
            fontWeight: 900,
            color: "#f0f0f8",
            lineHeight: 1.1,
            letterSpacing: "-2px",
            flex: 1,
          }}
        >
          {title}
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "20px",
            color: "#7a7a9a",
            marginTop: "40px",
          }}
        >
          {updatedLabel && <div style={{ display: "flex" }}>Updated {updatedLabel}</div>}
          {updatedLabel && readTime && <div style={{ display: "flex" }}>·</div>}
          {readTime && <div style={{ display: "flex" }}>{readTime}</div>}
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              color: "#f0f0f8",
              fontWeight: 600,
            }}
          >
            formulate-health.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
