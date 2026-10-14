import type { MetadataRoute } from "next"
import {
  siteUrl,
  locales,
  localePath,
  type Locale,
} from "@/lib/site"

const routes: {
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
}[] = [
  { path: "/", priority: 1, changeFrequency: "monthly" },
  { path: "/privacidad", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
]

const absolute = (lang: Locale, path: string) =>
  new URL(localePath(lang, path), siteUrl).toString()

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return locales.flatMap((lang) =>
    routes.map((route) => ({
      url: absolute(lang, route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          en: absolute("en", route.path),
          es: absolute("es", route.path),
        },
      },
    }))
  )
}
