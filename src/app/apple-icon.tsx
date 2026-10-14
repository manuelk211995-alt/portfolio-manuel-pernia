import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#17313C",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: 14,
            background: "#C35929",
          }}
        />
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            color: "#f4f1e8",
            fontSize: 84,
            fontWeight: 700,
          }}
        >
          MP
        </div>
      </div>
    ),
    { ...size }
  )
}
