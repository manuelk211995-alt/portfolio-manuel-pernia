import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Instrument_Serif, Instrument_Sans } from "next/font/google"
import { Providers } from "@/components/providers"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { CookieBanner } from "@/components/CookieBanner"
import {
  siteUrl,
  siteName,
  siteTitle,
  siteDescription,
  siteLocale,
  siteLocaleAlt,
  keywords,
  social,
  knowsAbout,
} from "@/lib/site"

import "./globals.css"

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  keywords,
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: siteLocale,
    alternateLocale: siteLocaleAlt,
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
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

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#17313c" },
  ],
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: siteTitle,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: siteName,
      url: siteUrl,
      image: `${siteUrl}/profile.jpeg`,
      jobTitle: "Full Stack Developer",
      knowsAbout,
      sameAs: [social.github, social.linkedin],
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${editorialSerif.variable} ${instrumentSans.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-[2px] focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-foreground"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CookieBanner />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  )
}
