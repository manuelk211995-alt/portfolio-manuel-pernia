"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { useI18n } from "./LanguageProvider"
import { useReveal } from "@/lib/useReveal"

const projects = [
  {
    title: "Economos",
    descKey: "projects.economos.desc",
    tags: ["React", "Flask", "Python", "PostgreSQL", "Gemini AI"],
    codeUrl: "https://github.com/manuelk211995-alt/Proyecto-Final-4Geeks",
    images: ["/economos-1.jpg", "/economos-2.jpg", "/economos-3.jpg", "/economos-4.jpg"],
    demoUrl: "/economos-promo_2026-07-30_01-28-00_mp3audio.mp4",
  },
  {
    title: "CalcuVolt",
    descKey: "projects.calcuvolt.desc",
    tags: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker"],
    codeUrl: "https://github.com/manuelk211995-alt/CalcuVolt",
    images: ["/calcuvolt-1.png", "/calcuvolt-2.png", "/calcuvolt-3.png", "/calcuvolt-4.png"],
    demoUrl: "/calculovolt-promo_2026-07-30_00-28-57.mp4",
  },
  {
    title: "Portfolio",
    descKey: "projects.portfolio.desc",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    codeUrl: "https://github.com/manuelk211995-alt/portfolio-manuel-pernia",
    images: ["/portfolio-1.png", "/portfolio-2.png", "/portfolio-3.png", "/portfolio-4.png"],
    demoUrl: "/portfolio-promo.mp4",
  },
]

export function Projects() {
  const [demoVideo, setDemoVideo] = useState<string | null>(null)
  const [lightbox, setLightbox] = useState<{
    images: string[]
    current: number
    title: string
  } | null>(null)
  const { t } = useI18n()
  const { ref, isVisible } = useReveal()

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!lightbox) return
      if (e.key === "Escape") setLightbox(null)
      if (e.key === "ArrowLeft")
        setLightbox((prev) =>
          prev ? { ...prev, current: (prev.current - 1 + prev.images.length) % prev.images.length } : null,
        )
      if (e.key === "ArrowRight")
        setLightbox((prev) => (prev ? { ...prev, current: (prev.current + 1) % prev.images.length } : null))
    },
    [lightbox],
  )

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onKeyDown])
  return (
    <section id="projects" className="flex min-h-screen flex-col justify-center px-6 py-24 bg-muted snap-start">
      <div ref={ref} className={`mx-auto max-w-6xl reveal ${isVisible ? "visible" : ""}`}>
        <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
          {t("projects.title")}
          <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-foreground/20" />
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-2 hover:border-foreground/20 hover:shadow-md hover:shadow-foreground/10"
            >
              {project.images ? (
                <div
                  className={`grid h-64 overflow-hidden gap-1 ${project.images.length === 4 ? "grid-cols-2" : "grid-cols-3"}`}
                >
                  {project.images.map((src, i) => (
                    <div
                      key={i}
                      className="relative overflow-hidden ring-1 ring-black/5 cursor-pointer"
                      onClick={() => setLightbox({ images: project.images!, current: i, title: project.title })}
                    >
                      <Image
                        src={src}
                        alt={`${project.title} ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 16vw"
                        className="object-cover transition-all duration-500 hover:scale-105 hover:brightness-110"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center bg-muted">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-12 opacity-40" aria-hidden="true">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span className="text-sm">{project.title}</span>
                  </div>
                </div>
              )}
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold">{project.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{t(project.descKey)}</p>
                <div className="mb-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-foreground/15"
                    >
                      {t("projects.code")}
                    </a>
                  )}
                  {project.demoUrl && (
                    <button
                      onClick={() => setDemoVideo(project.demoUrl!)}
                      className="inline-flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary/15 hover:-translate-y-0.5"
                    >
                      {t("projects.demo")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {demoVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-12"
          onClick={() => setDemoVideo(null)}
        >
          <div
            className="relative w-full max-w-5xl rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDemoVideo(null)}
              className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-black/60 text-white text-lg hover:bg-black/80 transition-colors"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <video
              src={demoVideo}
              controls
              autoPlay
              className="w-full max-h-[80vh] bg-black"
            />
          </div>
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative flex items-center gap-2 md:gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((prev) =>
                  prev
                    ? { ...prev, current: (prev.current - 1 + prev.images.length) % prev.images.length }
                    : null,
                )
              }}
              className="z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              aria-label="Previous"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div
              className="relative flex max-h-[85vh] max-w-[80vw] items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.images[lightbox.current]}
                alt={`${lightbox.title} ${lightbox.current + 1}`}
                className="max-h-[85vh] max-w-[80vw] rounded-lg object-contain"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1 text-sm text-white select-none">
                {lightbox.current + 1} / {lightbox.images.length}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((prev) =>
                  prev ? { ...prev, current: (prev.current + 1) % prev.images.length } : null,
                )
              }}
              className="z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              aria-label="Next"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 z-10 flex size-10 items-center justify-center rounded-full bg-black/60 text-white text-lg hover:bg-black/80 transition-colors"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
