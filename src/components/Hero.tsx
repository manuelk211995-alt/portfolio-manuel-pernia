"use client"

import { useI18n } from "./LanguageProvider"
import { social } from "@/lib/site"

// Hero 100% tipografico: el nombre manda. La firma de motion vive en
// globals.css (hero-mask / hero-fade, keyframes editorial-*).
export function Hero() {
  const { t } = useI18n()

  return (
    <section id="hero" className="px-6 pt-36 pb-22">
      <div className="mx-auto w-full max-w-[1360px]">
        <h1 className="type-display text-[clamp(3.5rem,11.4vw,11rem)] leading-[0.92] tracking-[-0.03em] text-foreground">
          <span className="hero-mask">
            <span className="hero-line" style={{ animationDelay: "0.05s" }}>
              Manuel Pernia
            </span>
          </span>
        </h1>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
          <div
            className="hero-fade max-w-[680px] flex-[1_1_480px]"
            style={{ animationDelay: "0.35s" }}
          >
            <p className="mb-3 text-[1.625rem] leading-tight font-bold text-accent-ink">
              {t("hero.role")}
            </p>
            <p className="text-xl leading-relaxed">{t("hero.desc")}</p>
          </div>

          <div
            className="hero-fade flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{ animationDelay: "0.5s" }}
          >
            <a
              href="#projects"
              className="btn-lift inline-block rounded-[2px] bg-primary px-7 py-4 font-bold text-primary-foreground hover:bg-primary/85"
            >
              {t("hero.viewProjects")}
            </a>
            <a href="#contact" className="inline-block py-4 font-bold">
              <span className="link-draw">{t("hero.getInTouch")}</span>
            </a>
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-4"
            >
              <span className="link-draw">GitHub</span>
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-4"
            >
              <span className="link-draw">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
