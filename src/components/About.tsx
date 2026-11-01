"use client"

import { useI18n } from "./LanguageProvider"
import { useReveal } from "@/lib/useReveal"

const skills = [
  {
    nameKey: "skills.frontend.name",
    techs: ["React", "HTML5", "CSS3", "JavaScript", "Bootstrap", "Tailwind CSS"],
  },
  {
    nameKey: "skills.backend.name",
    techs: ["Node.js", "FastAPI", "Python", "Flask"],
  },
  {
    nameKey: "skills.databases.name",
    techs: ["MySQL", "PostgreSQL", "SQLite"],
  },
  {
    nameKey: "skills.tools.name",
    techs: ["Git", "GitHub", "Docker", "VS Code", "Postman"],
  },
]

export function About() {
  const { t } = useI18n()
  const { ref, isVisible } = useReveal()

  return (
    <section id="about" className="px-6">
      <div
        ref={ref}
        className={`reveal mx-auto w-full max-w-[1360px] py-26 ${isVisible ? "visible" : ""}`}
      >
        <h2 className="type-display mb-14 text-[clamp(2.75rem,6vw,5.5rem)]">
          {t("about.title")}
        </h2>

        <div className="flex flex-wrap gap-x-24 gap-y-12">
          <div className="max-w-[600px] flex-[1_1_420px] text-xl leading-relaxed">
            <p className="mb-5">{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </div>

          <div id="skills" className="flex-[1_1_420px]">
            <h3 className="mb-2 text-[1.375rem] font-bold text-accent-ink">
              {t("skills.title")}
            </h3>
            <dl>
              {skills.map((skill) => (
                <div
                  key={skill.nameKey}
                  className="flex flex-wrap gap-x-6 gap-y-1 border-t border-border py-4"
                >
                  <dt className="flex-[0_0_10rem] font-bold">
                    {t(skill.nameKey)}
                  </dt>
                  <dd className="flex-[1_1_16rem]">{skill.techs.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
