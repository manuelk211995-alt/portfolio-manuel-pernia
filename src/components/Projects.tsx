"use client"

import Image from "next/image"
import { useI18n } from "./LanguageProvider"
import { useReveal } from "@/lib/useReveal"

const projects = [
  {
    title: "Economos",
    descKey: "projects.economos.desc",
    tags: ["React", "Flask", "Python", "PostgreSQL", "Gemini AI"],
    codeUrl: "https://github.com/manuelk211995-alt/Proyecto-Final-4Geeks",
    image: "/1781645432851.jpg",
  },
  {
    title: "CalcuVolt",
    descKey: "projects.calcuvolt.desc",
    tags: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker"],
    codeUrl: "https://github.com/manuelk211995-alt/CalcuVolt",
    image: "/calcuvolt.png",
  },
  {
    title: "Dashboard Analytics",
    descKey: "projects.dashboard.desc",
    tags: ["React", "D3.js", "Express"],
    status: "In Progress",
  },
]

export function Projects() {
  const { t } = useI18n()
  const { ref, isVisible } = useReveal()
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
              {project.image ? (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ) : (
                <div className="flex h-48 items-center justify-center bg-muted">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-12 opacity-40" aria-hidden="true">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    {project.status ? (
                      <span className="rounded-full border border-foreground/20 px-3 py-1 text-xs font-medium text-muted-foreground">
                        {project.status}
                      </span>
                    ) : (
                      <span className="text-sm">{project.title}</span>
                    )}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
