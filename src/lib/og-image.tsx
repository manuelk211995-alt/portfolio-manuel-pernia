import { ImageResponse } from "next/og"
import { siteName, ogSize, type Locale } from "./site"

const copy: Record<Locale, { role: string; tagline: string }> = {
  en: { role: "Full Stack Developer", tagline: "Tools for real trades" },
  es: { role: "Desarrollador Full Stack", tagline: "Herramientas para oficios reales" },
}

// Sombra en escalón de píxel, igual que los títulos del castillo
const pixelShadow = "4px 4px 0 #050407, 8px 8px 0 #3a0f0c"

// La escena del castillo (ya escalada sin suavizado) ocupa todo el fondo;
// el texto vive en el cielo de la izquierda, como en el héroe de la web.
export async function renderOgImage(lang: Locale = "en", origin: string) {
  const scene = await fetch(new URL("/castle/og-scene.png", origin))
    .then((r) => r.arrayBuffer())
    .then((buf) => `data:image/png;base64,${Buffer.from(buf).toString("base64")}`)
  const t = copy[lang]

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#06050a",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={scene}
          width={1200}
          height={750}
          alt=""
          style={{ position: "absolute", left: 0, top: -90 }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 720,
            height: 630,
            display: "flex",
            background: "linear-gradient(90deg, rgba(6,5,10,0.85) 0%, rgba(6,5,10,0.55) 70%, rgba(6,5,10,0) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 64,
            top: 72,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 0.95,
              textTransform: "uppercase",
              color: "#efe6d4",
              textShadow: pixelShadow,
              flexDirection: "column",
            }}
          >
            {siteName.split(" ").map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              alignSelf: "flex-start",
              padding: "8px 16px",
              fontSize: 30,
              fontWeight: 700,
              color: "#ff8a72",
              background: "#2a0d0b",
              border: "3px solid #b3261e",
            }}
          >
            {t.role}
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 34, color: "#f0cf7a" }}>
            {t.tagline}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 64,
            bottom: 40,
            display: "flex",
            fontSize: 26,
            color: "#cfc7dd",
          }}
        >
          manuelpernia.dev
        </div>
      </div>
    ),
    { ...ogSize, headers: { "cache-control": "public, max-age=86400" } }
  )
}
