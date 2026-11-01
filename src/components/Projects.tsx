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
  images: string[]
  demoUrl?: string
}

const projects: Project[] = [
  {
    title: "Economos",
    descKey: "projects.economos.desc",
    tags: ["React", "Flask", "Python", "PostgreSQL", "Gemini AI"],
    codeUrl: "https://github.com/manuelk211995-alt/Proyecto-Final-4Geeks",
    images: ["/economos-portada.jpg", "/economos-mercados.jpg"],
    demoUrl: "/economos-promo_2026-07-30_01-28-00_mp3audio.mp4",
  },
  {
    title: "CalcuVolt",
    descKey: "projects.calcuvolt.desc",
    tags: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker"],
    codeUrl: "https://github.com/manuelk211995-alt/CalcuVolt",
    images: ["/calcuvolt-v2.png"],
    demoUrl: "/calculovolt-promo_2026-07-30_00-28-57.mp4",
  },
  {
    title: "VolleyPlan",
    descKey: "projects.volleyplan.desc",
    tags: ["React", "Vite", "Tailwind CSS", "Express", "SQLite", "Konva"],
    images: ["/game-plan-voleibol-2.png", "/game-plan-voleibol-1.png"],
  },
]

const FOCUSABLE =
  'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])'

function ProjectGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), 3500)
    return () => clearInterval(id)
  }, [images.length])

  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={images.length > 1 ? `${alt} ${i + 1}` : alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1360px) 50vw, 432px"
          className={`object-cover object-top transition-[opacity,scale] duration-700 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100 ${i === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {images.length > 1 && (
        <div className="scrim absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${alt} ${i + 1}`}
              aria-pressed={i === active}
              className="flex size-11 cursor-pointer items-center justify-center"
            >
              <span
                className={`size-2 rounded-[1px] transition-colors ${
                  i === active ? "bg-white" : "bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Modal con el video de demo.
 * Accesible: role=dialog + aria-modal, aria-labelledby, focus trap, Escape
 * cierra, scroll bloqueado y el foco vuelve al disparador al cerrar.
 */
function DemoDialog({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  const { t } = useI18n()
  const dialogRef = useRef<HTMLDivElement>(null)

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
        aria-labelledby="demo-dialog-title"
        tabIndex={-1}
        className="field-paper w-full max-w-4xl border border-border shadow-2xl shadow-black/20 outline-none"
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3 md:px-7">
          <h3 id="demo-dialog-title" className="type-display text-2xl md:text-3xl">
            {project.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("ui.close")}
            className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-[2px] border border-border transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
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
        <video
          src={project.demoUrl}
          controls
          autoPlay
          playsInline
          preload="metadata"
          className="block max-h-[75vh] w-full bg-black"
        />
      </div>
    </div>
  )
}

function ProjectRow({
  project,
  index,
  onDemo,
}: {
  project: Project
  index: number
  onDemo: (project: Project) => void
}) {
  const { t } = useI18n()
  const { ref, isVisible } = useReveal()

  return (
    <li>
      {/* Entrada escalonada: las columnas de una misma fila aparecen en orden. */}
      <div
        ref={ref}
        style={{ transitionDelay: `${index * 100}ms` }}
        className={`reveal h-full ${isVisible ? "visible" : ""}`}
      >
        <article className="group flex h-full min-w-0 flex-col">
          <ProjectGallery images={project.images} alt={project.title} />

          <p className="mt-6 mb-1 font-bold text-accent-ink">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="type-display mb-4 text-[2.75rem]">{project.title}</h3>
          <p className="mb-4 text-lg leading-relaxed">{t(project.descKey)}</p>
          <p className="mb-4 font-semibold">{project.tags.join(" · ")}</p>

          {(project.demoUrl || project.codeUrl) && (
            <div className="mt-auto flex flex-wrap gap-x-6 gap-y-1 font-bold">
              {project.demoUrl && (
                <button
                  type="button"
                  onClick={() => onDemo(project)}
                  className="cursor-pointer py-3 font-bold"
                >
                  <span className="link-draw">{t("projects.demo")}</span>
                </button>
              )}
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3"
                >
                  <span className="link-draw">{t("projects.code")}</span>
                </a>
              )}
            </div>
          )}
        </article>
      </div>
    </li>
  )
}

export function Projects() {
  const [demo, setDemo] = useState<Project | null>(null)
  const { t } = useI18n()

  const closeDialog = useCallback(() => setDemo(null), [])

  return (
    <section id="projects" className="field-teal px-6">
      <div className="mx-auto max-w-[1360px] py-24">
        <h2 className="type-display mb-14 text-[clamp(2.75rem,6vw,5.5rem)]">
          {t("projects.title")}
        </h2>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,21.25rem),1fr))] gap-x-8 gap-y-14">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.title}
              project={project}
              index={i}
              onDemo={setDemo}
            />
          ))}
        </ol>
      </div>

      {demo && <DemoDialog project={demo} onClose={closeDialog} />}
    </section>
  )
}
