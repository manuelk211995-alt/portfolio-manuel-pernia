"use client"

import { Code2 } from "lucide-react"
import {
  SiReact,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiBootstrap,
  SiTailwindcss,
  SiNodedotjs,
  SiFastapi,
  SiPython,
  SiFlask,
  SiMysql,
  SiPostgresql,
  SiSqlite,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
} from "@icons-pack/react-simple-icons"
import { useI18n } from "./LanguageProvider"
import { useReveal } from "@/lib/useReveal"

// Listado editorial sin cards, sin kickers y sin color de marca:
// los iconos heredan currentColor (tema B/N).
const skills = [
  {
    nameKey: "skills.frontend.name",
    techs: [
      { Icon: SiReact, label: "React" },
      { Icon: SiHtml5, label: "HTML5" },
      { Icon: SiCss, label: "CSS3" },
      { Icon: SiJavascript, label: "JavaScript" },
      { Icon: SiBootstrap, label: "Bootstrap" },
      { Icon: SiTailwindcss, label: "Tailwind CSS" },
    ],
  },
  {
    nameKey: "skills.backend.name",
    techs: [
      { Icon: SiNodedotjs, label: "Node.js" },
      { Icon: SiFastapi, label: "FastAPI" },
      { Icon: SiPython, label: "Python" },
      { Icon: SiFlask, label: "Flask" },
    ],
  },
  {
    nameKey: "skills.databases.name",
    techs: [
      { Icon: SiMysql, label: "MySQL" },
      { Icon: SiPostgresql, label: "PostgreSQL" },
      { Icon: SiSqlite, label: "SQLite" },
    ],
  },
  {
    nameKey: "skills.tools.name",
    techs: [
      { Icon: SiGit, label: "Git" },
      { Icon: SiGithub, label: "GitHub" },
      { Icon: SiDocker, label: "Docker" },
      { Icon: Code2, label: "VS Code" },
      { Icon: SiPostman, label: "Postman" },
    ],
  },
]

export function About() {
  const { t } = useI18n()
  const { ref, isVisible } = useReveal()

  return (
    <section
      id="about"
      className="field-blue relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-24 snap-start"
    >
      <span className="overprint absolute inset-x-0 top-0" aria-hidden="true" />
      <div
        ref={ref}
        className={`relative mx-auto w-full max-w-6xl reveal-left ${isVisible ? "visible" : ""}`}
      >
        <div className="mb-10 border-b border-border pb-5">
          <h2 className="font-display text-4xl md:text-5xl">
            {t("about.title")}
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="text-left">
            <p className="mb-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("about.p1")}
            </p>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("about.p2")}
            </p>
          </div>

          <div id="skills">
            <h3 className="mb-2 border-b border-border pb-3 text-lg font-semibold">
              {t("skills.title")}
            </h3>
            <dl className="divide-y divide-border">
              {skills.map((skill) => (
                <div
                  key={skill.nameKey}
                  className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-4"
                >
                  <dt className="text-sm font-semibold">
                    {t(skill.nameKey)}
                  </dt>
                  <dd className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    {skill.techs.map((tech) => (
                      <span
                        key={tech.label}
                        className="inline-flex items-center gap-1.5"
                      >
                        <tech.Icon
                          className="size-3.5 shrink-0 text-foreground"
                          aria-hidden="true"
                        />
                        {tech.label}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}