"use client"

import { useI18n } from "./LanguageProvider"
import { projects } from "@/lib/projects"
import { PixelArrow, RARITY_COLOR, rarityOf } from "./castle/PixelArt"

// Posición de cada estandarte en la escena (rejilla de 360x225 píxeles).
const BANNER_X: Record<string, number> = {
  "nivel-60": 184,
  economos: 208,
  calcuvolt: 286,
  volleyplan: 310,
}
const pct = (v: number, total: number) => `${(v / total) * 100}%`

export function Hero() {
  const { t } = useI18n()

  return (
    <section id="hero" className="castle-sides relative overflow-hidden">
      {/* En escritorio la escena se limita a la altura de la ventana (8:5 → 160svh de ancho
          como máximo) para verse entera; los textos se miden en cqw, relativos a ella. */}
      <div className="@container relative mx-auto lg:w-[min(100%,160svh)]">
      <div className="relative z-10 px-6 pt-28 pb-10 lg:absolute lg:top-[11.5%] lg:left-[4.4%] lg:w-[40%] lg:p-0">
        <h1 className="castle-title font-pixel text-[3.25rem] leading-[0.9] uppercase lg:text-[6.6cqw]">
          Manuel
          <br />
          Pernia
        </h1>
        <p className="font-label mt-5 text-xs text-[#e0543f] lg:mt-[1.4cqw] lg:text-[max(0.7rem,1.05cqw)]">
          {t("hero.tagline")}
        </p>
        <p className="mt-2 max-w-[34rem] text-base leading-relaxed text-[#d9cfbf] lg:mt-[0.6cqw] lg:text-[max(0.9rem,1.3cqw)]">
          {t("hero.desc")}
        </p>
        <div className="hero-plates mt-6 flex flex-wrap gap-4 lg:mt-[1.7cqw] lg:flex-nowrap lg:gap-[1.1cqw]">
          <a href="#projects" className="plate plate-primary">
            {t("hero.viewProjects")}
          </a>
          <a href="#contact" className="plate plate-ghost">
            {t("hero.getInTouch")}
          </a>
        </div>
      </div>

      {/* Laterales en pixel art: el mismo paisaje continúa a ambos lados de la escena */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/castle/side-left.svg"
        alt=""
        width={240}
        height={225}
        className="pointer-events-none absolute top-0 right-full hidden h-full w-auto max-w-none lg:block"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/castle/side-right.svg"
        alt=""
        width={240}
        height={225}
        className="pointer-events-none absolute top-0 left-full hidden h-full w-auto max-w-none lg:block"
      />

      <div className="castle-frame relative aspect-[8/5] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/castle/scene.png"
          alt=""
          width={360}
          height={225}
          className="pixelated absolute inset-0 h-full w-full"
        />
        <picture>
          <source media="(prefers-reduced-motion: reduce)" srcSet="/castle/actors-still.svg" />
          <img
            src="/castle/actors.svg"
            alt=""
            width={360}
            height={225}
            className="absolute inset-0 h-full w-full"
          />
        </picture>
        <div aria-hidden="true" className="castle-bolt pointer-events-none absolute inset-0" />

        <ul className="absolute inset-0">
          {projects.map((project, i) => {
            const x = BANNER_X[project.slug]
            // Los estandartes van por parejas muy juntas: la etiqueta del primero crece
            // hacia la izquierda y la del segundo hacia la derecha, así nunca se pisan.
            const labelSide =
              i % 2 === 0 ? { right: pct(360 - (x + 20), 360) } : { left: pct(x, 360) }
            const color = RARITY_COLOR[rarityOf(project.status)]
            return (
              <li key={project.slug}>
                <a
                  href={`#armory-${project.slug}`}
                  aria-label={`${t("projects.view")} ${project.title}`}
                  className="banner-hit absolute"
                  style={{
                    left: pct(x - 2, 360),
                    top: pct(113, 225),
                    width: pct(24, 360),
                    height: pct(38, 225),
                    ["--glow" as string]: color.field,
                  }}
                />
                <span
                  translate="no"
                  aria-hidden="true"
                  className="font-label banner-label absolute hidden md:block"
                  style={{
                    ...labelSide,
                    top: pct(152, 225),
                    color: project.status === "live" ? color.text : undefined,
                    borderColor: project.status === "live" ? color.field : undefined,
                  }}
                >
                  {project.title}
                </span>
              </li>
            )
          })}
        </ul>
        <p
          className="font-label absolute hidden text-[clamp(0.6rem,0.85cqw,0.8rem)] text-[#b9b0c8] md:block"
          style={{ left: pct(182, 360), top: pct(163, 225) }}
        >
          <PixelArrow className="mr-[0.6em] inline-block h-[0.9em] align-[-0.05em]" />
          {t("hero.hint")}
        </p>
      </div>

      {/* En móvil los estandartes son pequeños: sus nombres van en una fila bajo la escena */}
      <ul className="flex flex-wrap justify-center gap-2 px-6 pt-5 pb-8 md:hidden">
        {projects.map((project) => {
          const color = RARITY_COLOR[rarityOf(project.status)]
          return (
            <li key={project.slug}>
              <a
                href={`#armory-${project.slug}`}
                translate="no"
                className="font-label flex min-h-11 items-center gap-2 bg-[#0a0812] px-3 text-xs text-[#efe6d4]"
                style={{ boxShadow: `inset 0 0 0 2px ${color.field}` }}
              >
                <span aria-hidden="true" className="size-2" style={{ background: color.field }} />
                {project.title}
              </a>
            </li>
          )
        })}
      </ul>
      </div>
    </section>
  )
}
