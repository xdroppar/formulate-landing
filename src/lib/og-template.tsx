import { ImageResponse } from "next/og";

/**
 * Shared OG image template for Formulate's dynamic routes. Takes a
 * topic tag + title + subtitle and renders a consistent branded card
 * at 1200×630 (Twitter + FB + LinkedIn standard).
 *
 * Uses Node runtime (default) — caller routes that import heavy data
 * (encyclopedia, catalog) must NOT set runtime = "edge" or they'll
 * blow the 1MB edge bundle limit.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function renderOgImage(opts: {
  topic: string;
  title: string;
  subtitle?: string;
  accentColor?: string;
}): ImageResponse {
  const accent = opts.accentColor ?? "#00ffb3";
  const titleFont =
    opts.title.length > 50 ? 56 : opts.title.length > 30 ? 72 : 88;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#08080f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "system-ui, sans-serif",
          color: "white",
        }}
      >
        {/* Top: brand + topic */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                letterSpacing: "-0.02em",
              }}
            >
              Formulate
              <span style={{ color: accent }}>.</span>
            </div>
          </div>
          <div
            style={{
              background: `${accent}1a`,
              color: accent,
              padding: "8px 20px",
              borderRadius: "999px",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {opts.topic}
          </div>
        </div>

        {/* Middle: title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "1000px" }}>
          <div
            style={{
              fontSize: titleFont,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "white",
            }}
          >
            {opts.title}
          </div>
          {opts.subtitle && (
            <div
              style={{
                fontSize: 28,
                fontWeight: 500,
                lineHeight: 1.3,
                color: "rgba(255, 255, 255, 0.65)",
              }}
            >
              {opts.subtitle}
            </div>
          )}
        </div>

        {/* Bottom: tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: "rgba(255, 255, 255, 0.55)",
            }}
          >
            Evidence-graded supplement intelligence
          </div>
          <div
            style={{
              fontSize: 20,
              color: "rgba(255, 255, 255, 0.55)",
            }}
          >
            formulate-health.app
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
