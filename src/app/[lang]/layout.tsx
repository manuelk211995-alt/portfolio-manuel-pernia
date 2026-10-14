import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { Geist, Geist_Mono, Instrument_Serif, Instrument_Sans } from "next/font/google"
import { Providers } from "@/components/providers"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { CookieBanner } from "@/components/CookieBanner"
import {
  siteUrl,
  siteName,
  localeMeta,
  locales,
  defaultLocale,
  hasLocale,
  localePath,
  absoluteUrl,
  keywords,
  social,
  knowsAbout,
  ogSize,
  ogAlt,
  ogImageUrl,
  type Locale,
} from "@/lib/site"

import "../globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const editorialSerif = Instrument_Serif({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
})

const instrumentSans = Instrument_Sans({
  variable: "--font-sans-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
})

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#17313c" },
  ],
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export const dynamicParams = false

const languageAlternates = {
  en: localePath("en", "/"),
  es: localePath("es", "/"),
  "x-default": localePath(defaultLocale, "/"),
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale
  const meta = localeMeta[locale]
  const canonical = localePath(locale, "/")
  const ogImage = {
    url: ogImageUrl(locale),
    width: ogSize.width,
    height: ogSize.height,
    alt: ogAlt,
  }

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: meta.title,
      template: `%s | ${siteName}`,
    },
    description: meta.description,
    applicationName: siteName,
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    category: "technology",
    keywords,
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical,
      languages: languageAlternates,
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: meta.ogLocale,
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => localeMeta[l].ogLocale),
      url: absoluteUrl(canonical),
      siteName,
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImage.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  }
}

function buildJsonLd(locale: Locale) {
  const inLanguage = locale
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: localeMeta[locale].description,
        inLanguage,
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: absoluteUrl(localePath(locale, "/")),
        name: localeMeta[locale].title,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#person` },
        inLanguage,
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: siteName,
        url: siteUrl,
        image: absoluteUrl("/profile.jpeg"),
        jobTitle: locale === "es" ? "Desarrollador Full Stack" : "Full Stack Developer",
        knowsAbout,
        sameAs: [social.github, social.linkedin],
      },
    ],
  }
}

const skipLinkText: Record<Locale, string> = {
  en: "Skip to content",
  es: "Saltar al contenido",
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${editorialSerif.variable} ${instrumentSans.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-[2px] focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-foreground"
        >
          {skipLinkText[lang]}
        </a>
        <Providers lang={lang}>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CookieBanner />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildJsonLd(lang)).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  )
}
