"use client"

import { ThemeProvider } from "next-themes"
import { LanguageProvider } from "./LanguageProvider"
import type { Lang } from "@/lib/i18n"

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalError = console.error
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag while rendering React component")
    ) {
      return
    }
    originalError.apply(console, args)
  }
}

export function Providers({
  children,
  lang,
}: {
  children: React.ReactNode
  lang: Lang
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <LanguageProvider lang={lang}>{children}</LanguageProvider>
    </ThemeProvider>
  )
}
