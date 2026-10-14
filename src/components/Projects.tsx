"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useI18n } from "./LanguageProvider"
import { useReveal } from "@/lib/useReveal"

type Project = {
  title: string
  descKey: string
  tags: string[]
  codeUrl?: string
  image?: string
  demoUrl?: string
  images?: string[]
}

const projects: Project[] = [
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

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function ProjectGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), 3500)
    return () => clearInterval(id)
  }, [images.length])

  return (
    <div className="relative h-56 overflow-hidden border border-border bg-muted md:h-64">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${alt} ${i + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          className={`object-cover transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${alt} ${i + 1}`}
              aria-pressed={i === active}
              className={`size-2 cursor-pointer rounded-[1px] transition-colors ${
                i === active ? "bg-foreground" : "bg-foreground/30 hover:bg-foreground/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Modal de detalle del proyecto.
 * Accesible: role=dialog + aria-modal, aria-labelledby/describedby, focus trap,
 * Escape cierra, scroll bloqueado y el foco vuelve al disparador al cerrar.
 */
function ProjectDialog({
  project,
  index,
  onClose,
}: {
  project: Project
  index: number
  onClose: () => void
}) {
  const { t } = useI18n()
  const dialogRef = useRef<HTMLDivElement>(null)
  const media = project.images ?? (project.image ? [project.image] : [])

  useEffect(() => {
    const trigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const raf = requestAnimationFrame(() => dialogRef.current?.focus())

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== "Tab") return

      const root = dialogRef.current
      if (!root) return

      const items = Array.from(
        root.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => el.getClientRects().length > 0)
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (!active || !root.contains(active)) {
        e.preventDefault()
        first.focus()
        return
      }
      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
      cancelAnimationFrame(raf)
      trigger?.focus()
    }
  }, [onClose])

  return (
    <div
      className="scrim fixed inset-0 z-50 flex items-end justify-center overflow-y-auto p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        aria-describedby="project-dialog-desc"
        tabIndex={-1}
        className="field-paper w-full max-w-3xl border border-border bg-background shadow-2xl shadow-black/20 outline-none"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 md:px-7">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </p>
            <h3
              id="project-dialog-title"
              className="mt-1 font-display text-3xl leading-tight md:text-4xl"
            >
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("ui.close")}
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-[2px] border border-border text-muted-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-4"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-5 py-5 md:px-7">
          <p
            id="project-dialog-desc"
            className="text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            {t(project.descKey)}
          </p>

          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            {project.tags.join(" · ")}
          </p>

          {(media.length > 0 || project.demoUrl) && (
            <div className="mt-5 flex flex-col gap-4">
              {media.length > 0 && (
                <ProjectGallery images={media} alt={project.title} />
              )}
              {project.demoUrl && (
                <div>
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {t("projects.demo")}
                  </p>
                  <video
                    src={project.demoUrl}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full border border-border bg-foreground"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {project.codeUrl && (
          <div className="flex justify-end border-t border-border px-5 py-4 md:px-7">
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[2px] border border-primary bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
            >
              {t("projects.code")}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export function Projects() {
  const [active, setActive] = useState<{ project: Project; index: number } | null>(
    null
  )
  const { t } = useI18n()
  const { ref, isVisible } = useReveal()

  const closeDialog = useCallback(() => setActive(null), [])

  return (
    <section
      id="projects"
      className="field-teal relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-24 snap-start"
    >
      <span className="overprint absolute inset-x-0 top-0" aria-hidden="true" />
      <div
        ref={ref}
        className={`mx-auto w-full max-w-6xl reveal-right ${isVisible ? "visible" : ""}`}
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
          <h2 className="font-display text-4xl md:text-5xl">
            {t("projects.title")}
          </h2>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {String(projects.length).padStart(2, "0")} —{" "}
            {t("projects.indexLabel")}
          </p>
        </div>

        <ol className="border-t border-border">
          {projects.map((project, i) => (
            <li key={project.title} className="border-b border-border">
              <button
                type="button"
                onClick={() => setActive({ project, index: i })}
                aria-label={`${t("projects.view")} ${project.title}`}
                className="group grid w-full cursor-pointer grid-cols-[2.5rem_1fr] items-start gap-x-4 px-2 py-6 text-left transition-colors hover:bg-foreground/[0.04] focus-visible:bg-foreground/[0.04] focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-[-2px] md:grid-cols-[3.5rem_1fr_auto] md:items-center md:px-4"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0">
                  <span className="block font-display text-3xl leading-tight transition-transform duration-300 group-hover:translate-x-1 md:text-5xl">
                    {project.title}
                  </span>
                  <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {t(project.descKey)}
                  </span>
                  <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                    {project.tags.join(" · ")}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className="hidden size-9 shrink-0 items-center justify-center rounded-[2px] border border-border text-muted-foreground transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-background md:flex"
                >
                  →
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {active && (
        <ProjectDialog
          project={active.project}
          index={active.index}
          onClose={closeDialog}
        />
      )}
    </section>
  )
}