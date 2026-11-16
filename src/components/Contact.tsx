"use client"

import Link from "next/link"
import { useState, FormEvent, ChangeEvent } from "react"
import { useI18n } from "./LanguageProvider"
import { localePath, social } from "@/lib/site"

// Campos del tablón: hueco oscuro con marco de hierro; el foco lo enciende en rojo.
const labelClassName = "font-label mb-2 block text-xs text-[#cfc7dd]"
const fieldClassName =
  "pixel-field w-full rounded-none p-3 text-[#efe6d4] outline-none"

export function Contact() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "mustAccept"
  >("idle")
  const [consent, setConsent] = useState(false)
  const { t, language } = useI18n()

  function handleConsentChange(e: ChangeEvent<HTMLInputElement>) {
    setConsent(e.target.checked)
    if (status === "mustAccept") {
      setStatus("idle")
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!consent) {
      setStatus("mustAccept")
      return
    }

    setStatus("loading")

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      consent: true,
      hp_token: (form.elements.namedItem("hp_token") as HTMLInputElement).value,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Failed to send")

      setStatus("success")
      form.reset()
      setConsent(false)
      setTimeout(() => setStatus("idle"), 4000)
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 4000)
    }
  }

  return (
    <section id="contact" className="stone-wall px-6 py-24">
      <div
        className="wood-board relative mx-auto flex w-full max-w-[1200px] flex-wrap gap-x-16 gap-y-10 p-8 md:p-12"
      >
        <div className="max-w-[520px] flex-[1_1_380px]">
          <h2 className="castle-title font-pixel text-[clamp(2.5rem,4.5vw,4rem)] leading-none">
            {t("contact.letsTalk")}
          </h2>
          <p className="font-label mt-5 inline-block bg-[#2a0d0b] px-3 py-1.5 text-xs text-[#ff8a72] shadow-[inset_0_0_0_2px_#b3261e]">
            {t("contact.role")}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-[#d9cfbf]">{t("contact.desc")}</p>
          <a
            href="mailto:manuelk211995@gmail.com"
            className="mt-6 inline-block py-2 font-semibold text-[#efe6d4] underline decoration-[#e0543f] decoration-2 underline-offset-4 hover:text-[#ffb347]"
          >
            manuelk211995@gmail.com
          </a>
          <p className="text-[#d9c8ad]">Granada, España</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a href={social.github} target="_blank" rel="noopener noreferrer" className="plate plate-ghost">
              GitHub
            </a>
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="plate plate-ghost">
              LinkedIn
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-[1_1_380px] flex-col gap-5">
          <div>
            <label htmlFor="name" className={labelClassName}>
              {t("contact.namePlaceholder")}
            </label>
            <input
              id="name"
              type="text"
              name="name"
              maxLength={100}
              required
              className={fieldClassName}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClassName}>
              {t("contact.emailPlaceholder")}
            </label>
            <input
              id="email"
              type="email"
              name="email"
              maxLength={254}
              required
              className={fieldClassName}
            />
          </div>

          <div>
            <label htmlFor="message" className={labelClassName}>
              {t("contact.messagePlaceholder")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              maxLength={5000}
              required
              className={`${fieldClassName} resize-y`}
            />
          </div>

          {/* Campo trampa para bots: fuera de la vista y del orden de tabulacion.
              Nombre sin significado para que el navegador no lo autocomplete. */}
          <div aria-hidden="true" className="absolute -left-[9999px]">
            <label htmlFor="hp_token">Leave empty</label>
            <input
              id="hp_token"
              type="text"
              name="hp_token"
              tabIndex={-1}
              autoComplete="off"
              data-lpignore="true"
              data-1p-ignore
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              id="consent"
              type="checkbox"
              name="consent"
              checked={consent}
              onChange={handleConsentChange}
              aria-required="true"
              className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-none accent-[#b3261e]"
            />
            <label htmlFor="consent" className="text-[#cfc5b4]">
              {t("contact.consent")}{" "}
              <Link
                href={localePath(language, "/privacidad")}
                className="underline underline-offset-4 hover:opacity-80"
              >
                {t("contact.consentLink")}
              </Link>
            </label>
          </div>

          <div aria-live="polite" className="min-h-[1.25rem]">
            {status === "mustAccept" && (
              <p className="font-semibold text-[#ff8a72]">
                {t("contact.mustAccept")}
              </p>
            )}
            {status === "error" && (
              <p className="font-semibold text-[#ff8a72]">
                {t("contact.error")}
              </p>
            )}
            {status === "success" && (
              <p className="font-semibold text-[#7be38a]">
                {t("contact.sent")}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="plate plate-primary self-start"
          >
            {status === "loading" ? t("contact.sending") : t("contact.send")}
          </button>
        </form>
      </div>
    </section>
  )
}