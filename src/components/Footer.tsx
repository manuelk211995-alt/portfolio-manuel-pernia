"use client"

import { useI18n } from "./LanguageProvider"
import { localePath } from "@/lib/site"

export function Footer() {
  const { t, language } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="mx-auto max-w-[1360px] px-6 py-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Manuel Pernia. {t("footer.rights")}
          </p>

          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
              <li>
                <a
                  href={localePath(language, "/privacidad")}
                  className="inline-block py-2 underline-offset-4 hover:underline"
                >
                  {t("footer.privacy")}
                </a>
              </li>
              <li>
                <a
                  href={localePath(language, "/cookies")}
                  className="inline-block py-2 underline-offset-4 hover:underline"
                >
                  {t("footer.cookies")}
                </a>
              </li>
              <li>
                <a
                  href={`${localePath(language, "/")}#hero`}
                  className="inline-block py-2 underline-offset-4 hover:underline"
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