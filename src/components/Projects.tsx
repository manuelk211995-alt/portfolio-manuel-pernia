"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useI18n } from "./LanguageProvider"
import { projects, type Project } from "@/lib/projects"
import { PixelDot, PixelShield, RARITY_COLOR, rarityOf } from "./castle/PixelArt"

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
    <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#0d0b14] shadow-[0_0_0_3px_#08060b]">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={images.length > 1 ? `${alt} (${i + 1}/${images.length})` : alt}
          fill
          sizes="(max-width: 1024px) 100vw, 640px"
          className={`object-cover object-top transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 bg-[#08060b]/85">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${alt} (${i + 1}/${images.length})`}
              aria-pressed={i === active}
              className="flex size-11 cursor-pointer items-center justify-center"
            >
              <span className={`size-2 ${i === active ? "bg-[#efe6d4]" : "bg-[#efe6d4]/35"}`} />
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
function DemoDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useI18n()
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
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
      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0
      )
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
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-[#030205]/80 p-0 sm:items-center sm:p-6"
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
        className="item-card w-full max-w-4xl outline-none"
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3 md:px-7">
          <h3 id="demo-dialog-title" translate="no" className="font-pixel text-2xl md:text-3xl">
            {project.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("ui.close")}
            className="plate plate-ghost flex size-11 items-center justify-center !p-0"
          >
            <svg viewBox="0 0 8 8" shapeRendering="crispEdges" className="size-4" aria-hidden="true">
              <path fill="currentColor" d="M0 0h2v2h-2zM6 0h2v2h-2zM2 2h2v2h-2zM4 2h2v2h-2zM2 4h2v2h-2zM4 4h2v2h-2zM0 6h2v2h-2zM6 6h2v2h-2z" />
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

function ItemCard({ project, onDemo }: { project: Project; onDemo: (p: Project) => void }) {
  const { t } = useI18n()
  const rarity = rarityOf(project.status)
  const color = RARITY_COLOR[rarity]

  return (
    <article
      aria-live="polite"
      className="item-card p-5 md:p-7"
      style={{ ["--rarity" as string]: color.field }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 translate="no" className="font-pixel text-4xl md:text-5xl" style={{ color: color.text }}>
          {project.title}
        </h3>
        <span className={`font-label text-sm status-${project.status}`}>
          <PixelDot className="mr-1.5 inline-block size-[0.6em] align-[0.05em]" />
          {t(`projects.status.${project.status}`)}
        </span>
      </div>
      <p className="mt-1 text-[#efe6d4]">
        {t(`projects.rarity.${rarity}`)} · {t(project.kindKey)}
      </p>

      <div className="mt-4">
        <ProjectGallery images={project.images} alt={`${project.title}: ${t(project.kindKey)}`} />
        {project.illustrative && (
          <p className="mt-2 text-sm text-[#b9b0c8]">{t("projects.illustrative")}</p>
        )}
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
        {project.tags.map((tag) => (
          <li key={tag} className="text-[#efe6d4]">
            <span aria-hidden="true" className="text-[#57d36a]">+ </span>
            {tag}
          </li>
        ))}
      </ul>

      <p className="mt-4 max-w-[65ch] leading-relaxed text-[#cfc5b4]">{t(project.descKey)}</p>

      {(project.liveUrl || project.demoUrl || project.codeUrl) && (
        <div className="mt-6 flex flex-wrap gap-4">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="plate plate-primary">
              {t("projects.live")}
            </a>
          )}
          {project.demoUrl && (
            <button
              type="button"
              onClick={() => onDemo(project)}
              className={`plate ${project.liveUrl ? "plate-ghost" : "plate-primary"}`}
            >
              {t("projects.demo")}
            </button>
          )}
          {project.codeUrl && (
            <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="plate plate-ghost">
              {t("projects.code")}
            </a>
          )}
        </div>
      )}
    </article>
  )
}

export function Projects() {
  const { t } = useI18n()
  const [activeSlug, setActiveSlug] = useState(projects[0].slug)
  const [demo, setDemo] = useState<Project | null>(null)
  const closeDialog = useCallback(() => setDemo(null), [])
  const active = projects.find((p) => p.slug === activeSlug) ?? projects[0]

  // Los estandartes del castillo enlazan a #armory-<slug>: ese escudo queda elegido.
  useEffect(() => {
    const fromHash = () => {
      const slug = window.location.hash.replace("#armory-", "")
      if (projects.some((p) => p.slug === slug)) setActiveSlug(slug)
    }
    const raf = requestAnimationFrame(fromHash)
    window.addEventListener("hashchange", fromHash)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("hashchange", fromHash)
    }
  }, [])

  return (
    <section id="projects" className="stone-wall relative px-6 py-24">
      <div className="mx-auto max-w-[1360px]">
        <h2 className="castle-title font-pixel text-[clamp(2.75rem,5vw,4.5rem)] leading-none">
          {t("projects.title")}
        </h2>
        <p className="font-label mt-3 text-sm text-[#cfc7dd]">{t("projects.subtitle")}</p>

        <div className="mt-12 grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
          <div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-2">
              {projects.map((project) => {
                const rarity = rarityOf(project.status)
                const selected = project.slug === active.slug
                return (
                  <li key={project.slug}>
                    <button
                      id={`armory-${project.slug}`}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setActiveSlug(project.slug)}
                      className={`shield-btn group flex w-full cursor-pointer flex-col items-center gap-2 ${selected ? "is-selected" : ""}`}
                      style={{ ["--rarity" as string]: RARITY_COLOR[rarity].field }}
                    >
                      <PixelShield slug={project.slug} status={project.status} className="shield-svg w-[min(9rem,70%)]" />
                      <span translate="no" className="font-label text-sm text-[#efe6d4]">
                        {project.title}
                      </span>
                      <span className="font-label text-xs" style={{ color: RARITY_COLOR[rarity].text }}>
                        {t(`projects.rarity.${rarity}`)}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <p className="mt-8 max-w-[44ch] text-sm leading-relaxed text-[#b9b0c8]">{t("projects.legend")}</p>
          </div>

          <ItemCard key={active.slug} project={active} onDemo={setDemo} />
        </div>
      </div>

      {demo && <DemoDialog project={demo} onClose={closeDialog} />}
    </section>
  )
}
