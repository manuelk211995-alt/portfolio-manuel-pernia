"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useI18n } from "./LanguageProvider"
import { buttonVariants } from "@/components/ui/button"
import { localePath } from "@/lib/site"
import { cn } from "@/lib/utils"

export function LanguageToggle() {
  const { language } = useI18n()
  const pathname = usePathname()
  const isEs = language === "es"

  // Al prerenderizar, usePathname devuelve la ruta interna reescrita por el
  // proxy ("/en/..."), asi que se quita el prefijo de cualquier locale.
  const bare = pathname.replace(/^\/(en|es)(?=\/|$)/, "") || "/"
  const target = localePath(isEs ? "en" : "es", bare)

  return (
    <Link
      href={target}
      hrefLang={isEs ? "en" : "es"}
      aria-label={isEs ? "Switch to English" : "Cambiar a español"}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "size-11 text-xs font-semibold"
      )}
    >
      {isEs ? "EN" : "ES"}
    </Link>
  )
}
