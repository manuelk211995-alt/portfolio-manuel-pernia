"use client"

import { useI18n } from "./LanguageProvider"

export function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="field-petrol border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            © {year} Manuel Pernia — {t("footer.rights")}
          </p>

          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
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
              <li>
                <a
                  href="#hero"
                  className="transition-colors hover:text-foreground"
                >
                  ↑ {t("nav.home")}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}