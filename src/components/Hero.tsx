"use client"

import Image from "next/image"
import { useI18n } from "./LanguageProvider"
import { useReveal } from "@/lib/useReveal"

export function Hero() {
  const { t } = useI18n()
  const { ref, isVisible } = useReveal()
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 snap-start">
      <div className="pointer-events-none absolute -top-1/2 -right-1/3 size-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.03)_0%,transparent_70%)]" />
      <div ref={ref} className={`mx-auto grid max-w-7xl w-full items-center gap-20 reveal md:grid-cols-2 ${isVisible ? "visible" : ""}`}>
        <div>
          <h1 className="mb-3 text-6xl font-extrabold leading-tight text-foreground md:text-8xl">
            Manuel Pernia
          </h1>
          <h2 className="mb-7 text-2xl text-muted-foreground md:text-3xl">{t("hero.role")}</h2>
          <p className="mb-10 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("hero.desc")}
          </p>
          <div className="mb-10 flex flex-wrap gap-4">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-foreground/15">
              {t("hero.viewProjects")}
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-8 py-4 text-base font-semibold text-primary transition-all hover:bg-primary/15 hover:-translate-y-0.5">
              {t("hero.getInTouch")}
            </a>
          </div>
          <div className="flex gap-5">
            <a href="https://github.com/manuelk211995-alt" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex size-12 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:bg-primary/15 hover:text-primary hover:-translate-y-1">
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-6"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/manuelpernia/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex size-12 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:bg-primary/15 hover:text-primary hover:-translate-y-1">
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-6"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative flex size-[340px] items-center justify-center md:size-[460px]">
            <div className="absolute inset-0 rounded-full bg-foreground/10" style={{ animation: "pulse-ring 3s ease-in-out infinite" }} />
            <div className="relative size-[300px] overflow-hidden rounded-full border border-border p-1 md:size-[420px]" style={{ animation: "float 6s ease-in-out infinite" }}>
              <div className="size-full overflow-hidden rounded-full">
                <Image
                  src="/profile.jpeg"
                  alt="Manuel Pernia"
                  width={420}
                  height={420}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="size-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
