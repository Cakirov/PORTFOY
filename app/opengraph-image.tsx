import { ImageResponse } from "next/og";
import { siteContent } from "@/data/siteContent";
import { PERSON_NAME } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0e1b2e";
const ACCENT = "#ff7a33";
const TEXT_PRIMARY = "#e7eef7";
const BORDER_STRONG = "rgba(214, 225, 240, 0.3)";

// Turkish uppercasing is locale-sensitive (dotted i → İ), which plain CSS
// `text-transform: uppercase` doesn't apply — uppercase in JS instead.
const EYEBROW = siteContent.hero.eyebrow.toLocaleUpperCase("tr");
const NAME = PERSON_NAME.toLocaleUpperCase("tr");

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: BG,
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 4,
            color: ACCENT,
            borderBottom: `1px solid ${BORDER_STRONG}`,
            paddingBottom: 24,
          }}
        >
          <span>FIG. 01 — PROFILE</span>
          <span style={{ color: TEXT_PRIMARY }}>SHEET 1 / 1</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 26,
              letterSpacing: 6,
              color: ACCENT,
              marginBottom: 20,
            }}
          >
            {EYEBROW}
          </span>
          <span
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: -1,
              color: TEXT_PRIMARY,
              lineHeight: 1.05,
            }}
          >
            {NAME}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 2,
            color: TEXT_PRIMARY,
            borderTop: `1px solid ${BORDER_STRONG}`,
            paddingTop: 24,
          }}
        >
          CAKIROV.COM
        </div>
      </div>
    ),
    { ...size },
  );
}
