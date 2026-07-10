"use client"

import Image from "next/image"
import { useI18n } from "./LanguageProvider"

const projects = [
  {
    title: "Economos",
    descKey: "projects.economos.desc",
    tags: ["React", "Flask", "Python", "PostgreSQL", "Gemini AI"],
    codeUrl: "https://github.com/manuelk211995-alt/Proyecto-Final-4Geeks",
    demoUrl: "#",
    image: "/1781645432851.jpg",
  },
  {
    title: "CalcuVolt",
    descKey: "projects.calcuvolt.desc",
    tags: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker"],
    codeUrl: "https://github.com/manuelk211995-alt/CalcuVolt",
    demoUrl: "#",
    image: "/calcuvolt.png",
  },
  {
    title: "Dashboard Analytics",
    descKey: "projects.dashboard.desc",
    tags: ["React", "D3.js", "Express"],
    codeUrl: "#",
    demoUrl: "#",
  },
]

export function Projects() {
  const { t } = useI18n()
  return (
    <section id="projects" className="flex min-h-screen flex-col justify-center px-6 py-24 bg-muted/50 scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
          {t("projects.title")}
          <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-gradient-to-r from-[#6c63ff] to-[#e040a0]" />
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-2 hover:border-primary hover:shadow-lg hover:shadow-primary/15"
            >
              {project.image ? (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ) : (
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#2a1a3e] dark:from-[#1a1a2e] dark:to-[#2a1a3e]">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-12 opacity-40">
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
                    <span key={tag} className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={project.codeUrl}
                    target={project.codeUrl !== "#" ? "_blank" : undefined}
                    rel={project.codeUrl !== "#" ? "noopener" : undefined}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#6c63ff] to-[#e040a0] px-4 py-2 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/30"
                  >
                    {t("projects.code")}
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target={project.demoUrl !== "#" ? "_blank" : undefined}
                      rel={project.demoUrl !== "#" ? "noopener" : undefined}
                      className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary/15 hover:-translate-y-0.5"
                    >
                      {t("projects.demo")}
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
