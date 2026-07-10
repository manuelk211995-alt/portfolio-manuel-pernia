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

import { useI18n } from "./LanguageProvider"

export function About() {
  const { t } = useI18n()
  return (
    <section id="about" className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-24 bg-muted/50 scroll-mt-24">
      <div className="pointer-events-none absolute -top-40 -left-40 size-96 rounded-full bg-[radial-gradient(circle,rgba(108,99,255,0.06)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 size-96 rounded-full bg-[radial-gradient(circle,rgba(224,64,160,0.05)_0%,transparent_70%)]" />
      <div className="mx-auto max-w-6xl relative">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          {t("about.title")}
          <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-gradient-to-r from-[#6c63ff] to-[#e040a0]" />
        </h2>
        <p className="mx-auto mb-16 max-w-3xl text-center text-base leading-relaxed text-muted-foreground md:text-lg">
          {t("about.p1")} {t("about.p2a")}
        </p>
        <div id="skills" className="scroll-mt-24">
          <h3 className="mb-8 text-center text-lg font-bold md:text-xl">
            {t("skills.title")}
            <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-gradient-to-r from-[#6c63ff] to-[#e040a0]" />
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill) => (
              <div
                key={skill.nameKey}
                className="rounded-xl border border-border bg-card p-8 text-center transition-all hover:-translate-y-2 hover:border-primary hover:shadow-lg hover:shadow-primary/15"
              >
                <h4 className="mb-5 text-lg font-semibold">{t(skill.nameKey)}</h4>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {skill.techs.map((tech) => (
                    <span
                      key={tech.label}
                      title={tech.label}
                      className="flex size-12 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 hover:scale-110 hover:shadow-md"
                      style={{ backgroundColor: tech.color }}
                    >
                      <tech.Icon className="size-7" style={{ color: "#ffffff" }} />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
