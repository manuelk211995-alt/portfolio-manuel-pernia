"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useI18n } from "./LanguageProvider"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function LanguageToggle() {
  const { language } = useI18n()
  const pathname = usePathname()
  const isEs = language === "es"

  const target = isEs
    ? pathname.replace(/^\/es(?=\/|$)/, "") || "/"
    : `/es${pathname === "/" ? "" : pathname}`

  return (
    <Link
      href={target}
      hrefLang={isEs ? "en" : "es"}
      aria-label={isEs ? "Switch to English" : "Cambiar a español"}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "text-xs font-semibold"
      )}
    >
      {isEs ? "EN" : "ES"}
    </Link>
  )
}
