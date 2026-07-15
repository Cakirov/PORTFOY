import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const BG = "#142640";
const ACCENT = "#ff7a33";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: BG,
          border: `2px solid ${ACCENT}`,
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            color: ACCENT,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 0.5,
            fontFamily: "monospace",
          }}
        >
          CKR
        </span>
      </div>
    ),
    { ...size },
  );
}
