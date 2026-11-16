export const siteUrl = "https://www.manuelpernia.dev"
export const siteName = "Manuel Pernia"

export const locales = ["en", "es"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"
export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value)

export const localeMeta: Record<
  Locale,
  { title: string; description: string; ogLocale: string }
> = {
  en: {
    title: "Manuel Pernia | Full Stack Developer",
    description:
      "Full Stack Developer in Granada. I build tools for real trades: electrical calculations, volleyball game plans and web apps with React, Python and Node.js.",
    ogLocale: "en_US",
  },
  es: {
    title: "Manuel Pernia | Desarrollador Full Stack",
    description:
      "Desarrollador Full Stack en Granada. Creo herramientas para oficios reales: cálculos eléctricos, planes de voleibol y apps web con React, Python y Node.js.",
    ogLocale: "es_ES",
  },
}

export const siteDescription = localeMeta.en.description

export const keywords = [
  "Manuel Pernia",
  "Full Stack Developer",
  "Desarrollador Full Stack",
  "React developer",
  "desarrollador web",
  "Next.js",
  "Node.js",
  "Python",
  "Flask",
  "TypeScript",
  "web developer portfolio",
  "desarrollador web Granada",
  "Full Stack Developer Granada",
  "electrical calculation app",
  "app cálculos eléctricos REBT",
  "volleyball game plan app",
  "app voleibol entrenadores",
]

export const social = {
  github: "https://github.com/manuelk211995-alt",
  linkedin: "https://www.linkedin.com/in/manuelpernia/",
}

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"
export const ogAlt = `${siteName} — Full Stack Developer / Desarrollador Full Stack`

export const ogImageUrl = (lang: Locale) => `/api/og?lang=${lang}`

export const knowsAbout = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Flask",
  "FastAPI",
  "TypeScript",
  "SQL",
  "Docker",
  "Electrical engineering",
  "REBT",
  "NEC",
  "Volleyball coaching",
]

export function localePath(lang: Locale, path: string): string {
  const clean = path.replace(/^\/+/, "").replace(/\/+$/, "")
  if (lang === defaultLocale) return clean ? `/${clean}` : "/"
  return clean ? `/${lang}/${clean}` : `/${lang}`
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString()
}
