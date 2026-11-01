"use client"

import Link from "next/link"
import { useState, FormEvent, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { useI18n } from "./LanguageProvider"
import { useReveal } from "@/lib/useReveal"
import { localePath } from "@/lib/site"

// Campos con etiqueta visible. Fondo y texto fijos: el campo blanco se lee igual
// sobre papel o petroleo, segun el tema.
const labelClassName = "mb-1.5 block font-semibold"
const fieldClassName =
  "w-full rounded-none border border-foreground bg-white p-3 text-[#17313c] caret-[#17313c] outline-none transition-shadow focus:ring-2 focus:ring-[var(--pal-orange)]"

export function Contact() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "mustAccept"
  >("idle")
  const [consent, setConsent] = useState(false)
  const { t, language } = useI18n()
  const { ref, isVisible } = useReveal()

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
    <section id="contact" className="field-contrast px-6">
      <div
        ref={ref}
        className={`reveal mx-auto flex w-full max-w-[1360px] flex-wrap gap-x-24 gap-y-12 py-26 ${isVisible ? "visible" : ""}`}
      >
        <div className="max-w-[600px] flex-[1_1_420px]">
          <h2 className="type-display mb-6 text-[clamp(2.75rem,6vw,5.5rem)]">
            {t("contact.letsTalk")}
          </h2>
          <p className="mb-8 text-xl leading-relaxed">{t("contact.desc")}</p>
          <a
            href="mailto:manuelk211995@gmail.com"
            className="mb-1 inline-block py-2 font-semibold underline underline-offset-4 hover:opacity-80"
          >
            manuelk211995@gmail.com
          </a>
          <p>Granada, España</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-[1_1_420px] flex-col gap-5">
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
              className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-none accent-[var(--pal-orange)]"
            />
            <label htmlFor="consent">
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
              <p className="font-semibold text-foreground">
                {t("contact.mustAccept")}
              </p>
            )}
            {status === "error" && (
              <p className="font-semibold text-foreground">
                {t("contact.error")}
              </p>
            )}
            {status === "success" && (
              <p className="font-semibold text-accent-ink">
                {t("contact.sent")}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={status === "loading"}
            className="btn-lift h-auto self-start px-7 py-4 text-base font-bold"
          >
            {status === "loading" ? t("contact.sending") : t("contact.send")}
          </Button>
        </form>
      </div>
    </section>
  )
}