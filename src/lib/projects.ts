export type ProjectStatus = "live" | "demo" | "private"

export type Project = {
  slug: string
  title: string
  descKey: string
  kindKey: string
  tags: string[]
  images: string[]
  status: ProjectStatus
  liveUrl?: string
  // La imagen es una maqueta, no una captura real del producto
  illustrative?: boolean
  demoUrl?: string
  codeUrl?: string
}

// El estado real del proyecto decide su rareza (y su color) en la armería.
export const rarityByStatus = {
  live: "legendary",
  demo: "epic",
  private: "rare",
} as const

export const projects: Project[] = [
  {
    slug: "nivel-60",
    title: "Nivel 60",
    descKey: "projects.nivel60.desc",
    kindKey: "projects.nivel60.kind",
    tags: ["Astro", "MDX", "JavaScript", "Pagefind", "Blizzard API", "Vercel"],
    images: ["/nivel60-portada.jpg", "/nivel60-clase.jpg", "/nivel60-calculadora.jpg"],
    status: "live",
    liveUrl: "https://nivel60.com",
  },
  {
    slug: "economos",
    title: "Economos",
    descKey: "projects.economos.desc",
    kindKey: "projects.economos.kind",
    tags: ["React", "Flask", "Python", "PostgreSQL", "Gemini AI"],
    images: ["/economos-portada.jpg", "/economos-mercados.jpg"],
    status: "demo",
    demoUrl: "/economos-promo_2026-07-30_01-28-00_mp3audio.mp4",
    codeUrl: "https://github.com/manuelk211995-alt/Proyecto-Final-4Geeks",
  },
  {
    slug: "calcuvolt",
    title: "CalcuVolt",
    descKey: "projects.calcuvolt.desc",
    kindKey: "projects.calcuvolt.kind",
    tags: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Docker"],
    images: ["/calcuvolt-v2.png"],
    illustrative: true,
    status: "demo",
    demoUrl: "/calculovolt-promo_2026-07-30_00-28-57.mp4",
    codeUrl: "https://github.com/manuelk211995-alt/CalcuVolt",
  },
  {
    slug: "volleyplan",
    title: "VolleyPlan",
    descKey: "projects.volleyplan.desc",
    kindKey: "projects.volleyplan.kind",
    tags: ["React", "Vite", "Tailwind CSS", "Express", "SQLite", "Konva"],
    images: ["/game-plan-voleibol-2.png", "/game-plan-voleibol-1.png"],
    status: "private",
  },
]
