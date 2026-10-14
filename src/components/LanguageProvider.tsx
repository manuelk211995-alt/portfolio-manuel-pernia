"use client"

import { createContext, useContext, type ReactNode } from "react"
import { translations, type Lang } from "@/lib/i18n"

type LanguageContextValue = {
  language: Lang
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang
  children: ReactNode
}) {
  const t = (key: string) => translations[lang][key] ?? key

  return (
    <LanguageContext.Provider value={{ language: lang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useI18n must be used within a LanguageProvider")
  return ctx
}
