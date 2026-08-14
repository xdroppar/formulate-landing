import { ImageResponse } from "next/og";
import { productBySlug } from "@/lib/products";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Formulate supplement review";

function gradeColor(grade: string | null): string {
  if (!grade) return "#9ca3af";
  if (grade.startsWith("A")) return "#10B981";
  if (grade.startsWith("B")) return "#3B82F6";
  if (grade.startsWith("C")) return "#F59E0B";
  return "#EF4444";
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug(slug);

  const brand = product?.brand ?? "Formulate";
  const name = product?.name ?? "Supplement Review";
  const score = product?.score ?? null;
  const grade = product?.grade ?? null;
  const category = product?.category ?? "";
  const gColor = gradeColor(grade);

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
            height: "4px",
            background: "linear-gradient(90deg, #00e5a0 0%, #7c6dfa 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              fontWeight: 700,
              color: "#a0a0b8",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            {brand}
          </div>
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
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "48px",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: name.length > 30 ? "66px" : "80px",
                fontWeight: 900,
                color: "#f0f0f8",
                lineHeight: 1.05,
                letterSpacing: "-2.5px",
                marginBottom: "20px",
              }}
            >
              {name}
            </div>
            {category && (
              <div
                style={{
                  display: "flex",
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "#00e5a0",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                {category}
              </div>
            )}
          </div>

          {score !== null && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                background: `${gColor}1a`,
                border: `6px solid ${gColor}`,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "120px",
                  fontWeight: 900,
                  color: gColor,
                  lineHeight: 1,
                  letterSpacing: "-4px",
                }}
              >
                {score}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#f0f0f8",
                  marginTop: "6px",
                  letterSpacing: "2px",
                }}
              >
                / 100
              </div>
              {grade && (
                <div
                  style={{
                    display: "flex",
                    fontSize: "22px",
                    fontWeight: 800,
                    color: gColor,
                    marginTop: "8px",
                    letterSpacing: "1px",
                  }}
                >
                  GRADE {grade}
                </div>
              )}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "32px",
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
            Ingredient-level review · dose, form, bioavailability, testing
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              color: "#f0f0f8",
              fontWeight: 600,
            }}
          >
            formulate-health.app/supplements
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
