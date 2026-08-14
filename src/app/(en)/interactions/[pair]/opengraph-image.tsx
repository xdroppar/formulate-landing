import { ImageResponse } from "next/og";
import {
  checkPair,
  substanceFromSlug,
  SEVERITY_META,
  type Severity,
} from "@/lib/interactions";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Formulate supplement interaction";

// Edge-runtime-safe severity color palette.
const SEVERITY_COLORS: Record<Severity, { primary: string; bg: string }> = {
  danger: { primary: "#F87171", bg: "rgba(248, 113, 113, 0.12)" },
  warning: { primary: "#FB923C", bg: "rgba(251, 146, 60, 0.12)" },
  caution: { primary: "#FBBF24", bg: "rgba(251, 191, 36, 0.12)" },
  info: { primary: "#60A5FA", bg: "rgba(96, 165, 250, 0.12)" },
  synergy: { primary: "#34D399", bg: "rgba(52, 211, 153, 0.12)" },
};

function parsePair(slug: string) {
  const parts = slug.split("-and-");
  if (parts.length !== 2) return null;
  const a = substanceFromSlug(parts[0]);
  const b = substanceFromSlug(parts[1]);
  if (!a || !b) return null;
  return { a, b };
}

export default async function Image({
  params,
}: {
  params: Promise<{ pair: string }>;
}) {
  const { pair } = await params;
  const parsed = parsePair(pair);

  const aName = parsed?.a.display ?? "Substance A";
  const bName = parsed?.b.display ?? "Substance B";
  const found = parsed
    ? checkPair(parsed.a.canonical, parsed.b.canonical)
    : null;
  const severity: Severity = found?.severity ?? "info";
  const severityLabel = SEVERITY_META[severity].label;
  const colors = SEVERITY_COLORS[severity];
  const summary = found?.summary ?? "Check interactions between these supplements.";

  // Adjust font size when the names are long.
  const longest = Math.max(aName.length, bName.length);
  const pairFont = longest > 16 ? 64 : longest > 12 ? 76 : 92;

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
        {/* Severity-colored top stripe */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: colors.primary,
          }}
        />

        {/* Header row: Formulate wordmark + category label */}
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
            Interaction Check
          </div>
        </div>

        {/* Severity badge */}
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            alignItems: "center",
            gap: "14px",
            padding: "14px 28px",
            borderRadius: "999px",
            background: colors.bg,
            border: `2px solid ${colors.primary}`,
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: colors.primary,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              fontWeight: 800,
              color: colors.primary,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            {severityLabel}
          </div>
        </div>

        {/* The pair: A + B */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            marginBottom: "32px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: `${pairFont}px`,
              fontWeight: 900,
              color: "#f0f0f8",
              letterSpacing: "-2.5px",
              lineHeight: 1,
            }}
          >
            {aName}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "56px",
              fontWeight: 300,
              color: colors.primary,
              lineHeight: 1,
            }}
          >
            +
          </div>
          <div
            style={{
              display: "flex",
              fontSize: `${pairFont}px`,
              fontWeight: 900,
              color: "#f0f0f8",
              letterSpacing: "-2.5px",
              lineHeight: 1,
            }}
          >
            {bName}
          </div>
        </div>

        {/* One-line summary */}
        <div
          style={{
            display: "flex",
            fontSize: "26px",
            color: "#c4c4d4",
            lineHeight: 1.4,
            flex: 1,
            fontWeight: 500,
          }}
        >
          {summary.length > 140 ? `${summary.slice(0, 140)}…` : summary}
        </div>

        {/* Footer */}
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
            Free supplement interaction checker · 100+ curated pairs
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              color: "#f0f0f8",
              fontWeight: 600,
            }}
          >
            formulate-health.app/interactions
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
