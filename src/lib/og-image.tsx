import { ImageResponse } from "next/og"
import { siteName } from "./site"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"
export const ogAlt = `${siteName} — Full Stack Developer`

const palette = {
  petrol: "#17313C",
  paper: "#f4f1e8",
  muted: "#b7c5c7",
  orange: "#C35929",
}

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: palette.petrol,
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "12px",
            background:
              "linear-gradient(90deg,#254E72 0%,#206E82 35%,#A45230 70%,#C35929 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 700,
              color: palette.paper,
              letterSpacing: "-0.03em",
            }}
          >
            {siteName}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              color: palette.orange,
              marginTop: 12,
            }}
          >
            Full Stack Developer
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: palette.muted,
          }}
        >
          <div style={{ display: "flex" }}>manuelpernia.dev</div>
          <div style={{ display: "flex" }}>
            React · Next.js · Node.js · Python
          </div>
        </div>
      </div>
    ),
    { ...ogSize }
  )
}
