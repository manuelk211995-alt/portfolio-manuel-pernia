"use client"

import { useI18n } from "./LanguageProvider"

// Cada habilidad es una ranura del árbol; la abreviatura hace de icono.
const branches = [
  {
    nameKey: "skills.frontend.name",
    techs: [["React", "Re"], ["HTML5", "H5"], ["CSS3", "C3"], ["JavaScript", "JS"], ["Bootstrap", "Bs"], ["Tailwind CSS", "Tw"]],
  },
  {
    nameKey: "skills.backend.name",
    techs: [["Node.js", "Nd"], ["FastAPI", "FA"], ["Python", "Py"], ["Flask", "Fl"]],
  },
  {
    nameKey: "skills.databases.name",
    techs: [["MySQL", "My"], ["PostgreSQL", "Pg"], ["SQLite", "Sq"]],
  },
  {
    nameKey: "skills.tools.name",
    techs: [["Git", "Gt"], ["GitHub", "Gh"], ["Docker", "Dk"], ["VS Code", "VS"], ["Postman", "Pm"]],
  },
]

export function About() {
  const { t } = useI18n()

  return (
    <section id="about" className="stone-wall relative px-6 py-24">
      <div className="mx-auto max-w-[1360px]">
        <h2 className="castle-title font-pixel text-[clamp(2.75rem,5vw,4.5rem)] leading-none">
          {t("about.title")}
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] lg:items-start">
          <div className="parchment p-6 md:p-8">
            <h3 className="font-label text-sm text-[#7a1a12]">{t("about.story")}</h3>
            <p className="mt-4 text-lg leading-relaxed">{t("about.p1")}</p>
            <p className="mt-4 text-lg leading-relaxed">{t("about.p2")}</p>
          </div>

          <div id="skills">
            <h3 className="font-pixel text-3xl leading-none text-[#efe6d4]">{t("skills.title")}</h3>
            <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(9.5rem,1fr))] gap-x-4 gap-y-10">
              {branches.map((branch) => (
                <div key={branch.nameKey}>
                  <h4 className="font-label text-xs text-[#f0cf7a]">{t(branch.nameKey)}</h4>
                  <ol className="talent-tree mt-5">
                    {branch.techs.map(([name, code]) => (
                      <li key={name} className="talent-row">
                        <span aria-hidden="true" className="talent-slot font-label">
                          {code}
                        </span>
                        <span className="min-w-0 break-words text-[#e6dccb]">{name}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
