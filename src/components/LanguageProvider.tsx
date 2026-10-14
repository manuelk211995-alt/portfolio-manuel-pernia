"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { translations, type Lang } from "@/lib/i18n"

type LanguageContextValue = {
  language: Lang
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Lang>("en")

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null
    if (stored === "en" || stored === "es") {
      const id = requestAnimationFrame(() => setLanguageState(stored))
      return () => cancelAnimationFrame(id)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    localStorage.setItem("lang", language)
  }, [language])

  const toggleLanguage = () => setLanguageState((prev) => (prev === "en" ? "es" : "en"))
  const t = (key: string) => translations[language][key] ?? key

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useI18n must be used within a LanguageProvider")
  return ctx
}
