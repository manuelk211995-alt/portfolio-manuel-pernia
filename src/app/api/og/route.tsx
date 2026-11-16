import { renderOgImage } from "@/lib/og-image"
import { hasLocale } from "@/lib/site"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const lang = searchParams.get("lang") ?? "en"
  return renderOgImage(hasLocale(lang) ? lang : "en", origin)
}
