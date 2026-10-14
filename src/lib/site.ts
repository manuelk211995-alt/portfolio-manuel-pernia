export const siteUrl = "https://manuelpernia.dev"
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
      "Manuel Pernia — Full Stack Developer building modern, scalable web apps with React, Next.js, Node.js, Python and Flask. Projects, skills and contact.",
    ogLocale: "en_US",
  },
  es: {
    title: "Manuel Pernia | Desarrollador Full Stack",
    description:
      "Manuel Pernia — Desarrollador Full Stack. Construyo aplicaciones web modernas y escalables con React, Next.js, Node.js, Python y Flask. Proyectos, habilidades y contacto.",
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
]

export function localePath(lang: Locale, path: string): string {
  const clean = path.replace(/^\/+/, "").replace(/\/+$/, "")
  if (lang === defaultLocale) return clean ? `/${clean}` : "/"
  return clean ? `/${lang}/${clean}` : `/${lang}`
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString()
}
