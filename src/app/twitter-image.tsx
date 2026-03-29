import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Formulate — Every Supplement Scored Against Clinical Research";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#08080f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 80px",
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "32px",
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
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "56px",
              fontWeight: 900,
              color: "#f0f0f8",
              lineHeight: 1.1,
              letterSpacing: "-2px",
              marginBottom: "20px",
            }}
          >
            Every supplement scored
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 900,
              color: "#00e5a0",
              lineHeight: 1.1,
              letterSpacing: "-2px",
              marginBottom: "28px",
            }}
          >
            against clinical research.
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#7a7a9a",
              lineHeight: 1.5,
              maxWidth: "700px",
            }}
          >
            Score any supplement 50–100. Check dose safety. Compare brands. Build your stack.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "48px",
          }}
        >
          {[
            { score: 94, color: "#10B981" },
            { score: 88, color: "#3B82F6" },
            { score: 73, color: "#F59E0B" },
            { score: 61, color: "#F97316" },
            { score: 54, color: "#EF4444" },
          ].map((item) => (
            <div
              key={item.score}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: "24px",
                fontWeight: 900,
                color: item.color,
              }}
            >
              {item.score}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
