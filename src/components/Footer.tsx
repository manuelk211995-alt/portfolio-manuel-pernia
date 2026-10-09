"use client"

import { useI18n } from "./LanguageProvider"

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-muted-foreground">
          © {year} Manuel Pernia. {t("footer.rights")}
        </div>
        <nav aria-label="Legal">
          <ul className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <li>
              <a
                href="/privacidad"
                className="transition-colors hover:text-foreground"
              >
                {t("footer.privacy")}
              </a>
            </li>
            <li>
              <a
                href="/cookies"
                className="transition-colors hover:text-foreground"
              >
                {t("footer.cookies")}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}