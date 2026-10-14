import type { Metadata } from "next"
import { Geist, Geist_Mono, Instrument_Serif, Instrument_Sans } from "next/font/google"
import { Providers } from "@/components/providers"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { CookieBanner } from "@/components/CookieBanner"

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

const siteUrl = "https://manuelpernia.dev"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Manuel Pernia | Full Stack Developer",
  description:
    "Full Stack Developer building modern web applications with React, Node.js, Python and more. Portfolio showcasing projects and skills.",
  openGraph: {
    title: "Manuel Pernia | Full Stack Developer",
    description:
      "Full Stack Developer building modern web applications with React, Node.js, Python and more.",
    url: siteUrl,
    siteName: "Manuel Pernia",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Manuel Pernia | Full Stack Developer",
    description:
      "Full Stack Developer building modern web applications with React, Node.js, Python and more.",
  },
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Manuel Pernia",
              url: siteUrl,
              jobTitle: "Full Stack Developer",
              sameAs: [
                "https://github.com/manuelk211995-alt",
                "https://www.linkedin.com/in/manuelpernia/",
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
