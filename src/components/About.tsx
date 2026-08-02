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
  SiReactHex,
  SiHtml5Hex,
  SiCssHex,
  SiJavascriptHex,
  SiBootstrapHex,
  SiTailwindcssHex,
  SiNodedotjsHex,
  SiFastapiHex,
  SiPythonHex,
  SiFlaskHex,
  SiMysqlHex,
  SiPostgresqlHex,
  SiSqliteHex,
  SiGitHex,
  SiGithubHex,
  SiDockerHex,
  SiPostmanHex,
} from "@icons-pack/react-simple-icons"
import { useI18n } from "./LanguageProvider"
import { useReveal } from "@/lib/useReveal"

const skills = [
  {
    nameKey: "skills.frontend.name",
    techs: [
      { Icon: SiReact, label: "React", color: SiReactHex },
      { Icon: SiHtml5, label: "HTML5", color: SiHtml5Hex },
      { Icon: SiCss, label: "CSS3", color: SiCssHex },
      { Icon: SiJavascript, label: "JavaScript", color: SiJavascriptHex },
      { Icon: SiBootstrap, label: "Bootstrap", color: SiBootstrapHex },
      { Icon: SiTailwindcss, label: "Tailwind CSS", color: SiTailwindcssHex },
    ],
  },
  {
    nameKey: "skills.backend.name",
    techs: [
      { Icon: SiNodedotjs, label: "Node.js", color: SiNodedotjsHex },
      { Icon: SiFastapi, label: "FastAPI", color: SiFastapiHex },
      { Icon: SiPython, label: "Python", color: SiPythonHex },
      { Icon: SiFlask, label: "Flask", color: SiFlaskHex },
    ],
  },
  {
    nameKey: "skills.databases.name",
    techs: [
      { Icon: SiMysql, label: "MySQL", color: SiMysqlHex },
      { Icon: SiPostgresql, label: "PostgreSQL", color: SiPostgresqlHex },
      { Icon: SiSqlite, label: "SQLite", color: SiSqliteHex },
    ],
  },
  {
    nameKey: "skills.tools.name",
    techs: [
      { Icon: SiGit, label: "Git", color: SiGitHex },
      { Icon: SiGithub, label: "GitHub", color: SiGithubHex },
      { Icon: SiDocker, label: "Docker", color: SiDockerHex },
      { Icon: Code2, label: "VS Code", color: "#007ACC" },
      { Icon: SiPostman, label: "Postman", color: SiPostmanHex },
    ],
  },
]

export function About() {
  const { t } = useI18n()
  const { ref, isVisible } = useReveal()
  return (
    <section id="about" className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-24 bg-muted snap-start">
      <div className="pointer-events-none absolute -top-1/2 -right-1/3 size-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.03)_0%,transparent_70%)]" />
      <div ref={ref} className={`relative mx-auto max-w-6xl reveal-left ${isVisible ? "visible" : ""}`}>
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          {t("about.title")}
          <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-foreground/20" />
        </h2>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="text-left">
            <p className="mb-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("about.p1")}
            </p>
            <p className="mb-10 text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("about.p2")}
            </p>
          </div>
          <div id="skills">
            <h3 className="mb-6 text-center text-lg font-bold md:text-xl">
              {t("skills.title")}
              <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-foreground/20" />
            </h3>
            <div className="grid auto-rows-fr gap-5 sm:grid-cols-2">
            {skills.map((skill) => (
              <div
                key={skill.nameKey}
                className="flex flex-col justify-center rounded-xl border border-border bg-card p-5 text-center shadow-sm transition-all hover:-translate-y-2 hover:border-foreground/20 hover:shadow-md hover:shadow-foreground/10"
              >
                <h4 className="mb-4 text-base font-semibold">{t(skill.nameKey)}</h4>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {skill.techs.map((tech) => (
                    <div key={tech.label} className="flex flex-col items-center gap-1">
                      <span
                        title={tech.label}
                        className="flex size-10 items-center justify-center rounded-lg shadow-sm transition-transform duration-300 hover:scale-110 hover:shadow-md"
                        style={{ backgroundColor: tech.color }}
                      >
                        <tech.Icon className="size-5" style={{ color: "#ffffff" }} />
                      </span>
                      <span className="text-[11px] text-muted-foreground">{tech.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
