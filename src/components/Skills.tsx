"use client"

import { useI18n } from "./LanguageProvider"

const skills = [
  {
    nameKey: "skills.frontend.name",
    desc: "React, HTML5, CSS3, JavaScript, Bootstrap, Tailwind",
    icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
  },
  {
    nameKey: "skills.backend.name",
    desc: "Node.js, Express, Python, Flask, REST APIs",
    icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />,
  },
  {
    nameKey: "skills.databases.name",
    desc: "MySQL, PostgreSQL, MongoDB, SQLite",
    icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />,
  },
  {
    nameKey: "skills.tools.name",
    desc: "Git, GitHub, Docker, VS Code, Postman",
    icon: <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1115.6 12 3.611 3.611 0 0112 15.6z" />,
  },
]

export function Skills() {
  const { t } = useI18n()
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
          {t("skills.title")}
          <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-gradient-to-r from-[#6c63ff] to-[#e040a0]" />
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill) => (
            <div
              key={skill.nameKey}
              className="rounded-xl border border-border bg-card p-8 text-center transition-all hover:-translate-y-2 hover:border-primary hover:shadow-lg hover:shadow-primary/15"
            >
              <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-7">
                  {skill.icon}
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold">{t(skill.nameKey)}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
