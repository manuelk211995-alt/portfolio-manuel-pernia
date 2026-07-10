"use client"

import { useEffect, useState } from "react"
import { useI18n } from "./LanguageProvider"
import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  const { language, toggleLanguage } = useI18n()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className="text-xs font-semibold"
    >
      {mounted ? (language === "es" ? "EN" : "ES") : "EN"}
    </Button>
  )
}
