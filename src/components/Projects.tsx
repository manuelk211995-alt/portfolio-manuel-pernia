"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useI18n } from "./LanguageProvider"
import { useReveal } from "@/lib/useReveal"

const projects = [
  {
    title: "Economos",
    descKey: "projects.economos.desc",
    tags: ["React", "Flask", "Python", "PostgreSQL", "Gemini AI"],
    codeUrl: "https://github.com/manuelk211995-alt/Proyecto-Final-4Geeks",
    image: "/economos-v2.png",
    demoUrl: "/economos-promo_2026-07-30_01-28-00_mp3audio.mp4",
  },
  {
    title: "CalcuVolt",
    descKey: "projects.calcuvolt.desc",
    tags: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker"],
    codeUrl: "https://github.com/manuelk211995-alt/CalcuVolt",
    image: "/calcuvolt-v2.png",
    demoUrl: "/calculovolt-promo_2026-07-30_00-28-57.mp4",
  },
  {
    title: "Portfolio",
    descKey: "projects.portfolio.desc",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    codeUrl: "https://github.com/manuelk211995-alt/portfolio-manuel-pernia",
    image: "/portfolio-chatgpt.png",
    demoUrl: "/portfolio-promo.mp4",
  },
  {
    title: "VolleyPlan",
    descKey: "projects.volleyplan.desc",
    tags: ["React", "Vite", "Tailwind CSS", "Express", "SQLite", "Konva"],
    images: ["/game-plan-voleibol-1.png", "/game-plan-voleibol-2.png"],
  },
]

function ProjectGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (images.length < 2) return
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), 3500)
    return () => clearInterval(id)
  }, [images.length])
  return (
    <div className="relative h-48 overflow-hidden">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${alt} ${i + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`${alt} ${i + 1}`}
              className={`size-2 rounded-full transition-colors ${i === active ? "bg-white" : "bg-white/50 hover:bg-white/80"}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function Projects() {
  const [demoVideo, setDemoVideo] = useState<string | null>(null)
  const { t } = useI18n()
  const { ref, isVisible } = useReveal()
  return (
    <section id="projects" className="flex min-h-screen flex-col justify-center px-6 py-24 bg-muted snap-start">
      <div ref={ref} className={`mx-auto max-w-6xl reveal-right ${isVisible ? "visible" : ""}`}>
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
              {(project.images ?? (project.image ? [project.image] : [])).length > 0 ? (
                <ProjectGallery
                  images={project.images ?? [project.image as string]}
                  alt={project.title}
                />
              ) : (
                <div className="flex h-48 items-center justify-center bg-muted">
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
    </section>
  )
}
