"use client"

import { useEffect, useState } from "react"
import { useI18n } from "./LanguageProvider"
import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  const { language, toggleLanguage } = useI18n()
  const [mounted, setMounted] = useState(false)

  // Hydration guard: mounted must be set once after mount to avoid SSR mismatch.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true) }, [])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      aria-label={language === "en" ? "Switch to Spanish" : "Switch to English"}
      className="text-xs font-semibold"
    >
      {mounted ? (language === "es" ? "EN" : "ES") : "EN"}
    </Button>
  )
}
