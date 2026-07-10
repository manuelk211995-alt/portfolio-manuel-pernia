"use client"

import { useI18n } from "./LanguageProvider"

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="border-t border-border px-6 py-7 text-center text-sm text-muted-foreground">
      <div className="mx-auto max-w-6xl">
        &copy; {new Date().getFullYear()} Manuel Pernia. {t("footer.rights")}
      </div>
    </footer>
  )
}
