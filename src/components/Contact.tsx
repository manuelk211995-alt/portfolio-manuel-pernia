"use client"

import Link from "next/link"
import { useState, FormEvent, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { useI18n } from "./LanguageProvider"
import { useReveal } from "@/lib/useReveal"

// Inputs editoriales: solo linea inferior. Estados sin color (B/N):
// el significado lo carga el texto, el peso y la regla, no el tono.
const fieldClassName =
  "w-full border-b border-input bg-transparent px-0 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"

export function Contact() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "mustAccept"
  >("idle")
  const [consent, setConsent] = useState(false)
  const { t } = useI18n()
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
    <section
      id="contact"
      className="field-rust relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-24 snap-start"
    >
      <span className="overprint absolute inset-x-0 top-0" aria-hidden="true" />
      <div
        ref={ref}
        className={`mx-auto w-full max-w-6xl reveal-scale ${isVisible ? "visible" : ""}`}
      >
        <div className="mb-10 border-b border-border pb-5">
          <h2 className="font-display text-4xl md:text-5xl">
            {t("contact.title")}
          </h2>
        </div>

        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-semibold">
              {t("contact.letsTalk")}
            </h3>
            <p className="mb-7 max-w-md text-muted-foreground">
              {t("contact.desc")}
            </p>
            <div className="mb-4 flex items-center gap-3 text-muted-foreground">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 shrink-0 text-foreground"
                aria-hidden="true"
              >
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span className="text-sm">manuelk211995@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 shrink-0 text-foreground"
                aria-hidden="true"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="text-sm">Granada, España</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="sr-only">
                {t("contact.namePlaceholder")}
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder={t("contact.namePlaceholder")}
                required
                className={fieldClassName}
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                {t("contact.emailPlaceholder")}
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder={t("contact.emailPlaceholder")}
                required
                className={fieldClassName}
              />
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                {t("contact.messagePlaceholder")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder={t("contact.messagePlaceholder")}
                required
                className={`${fieldClassName} resize-y`}
              />
            </div>

            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <input
                id="consent"
                type="checkbox"
                name="consent"
                checked={consent}
                onChange={handleConsentChange}
                aria-required="true"
                className="mt-1 size-4 shrink-0 cursor-pointer rounded-none border-input accent-[var(--pal-orange)]"
              />
              <label htmlFor="consent" className="leading-5">
                {t("contact.consent")}{" "}
                <Link
                  href="/privacidad"
                  className="underline underline-offset-4 hover:opacity-80"
                >
                  {t("contact.consentLink")}
                </Link>
              </label>
            </div>

            <div aria-live="polite" className="min-h-[1.25rem] text-sm">
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
                <p className="font-medium text-accent-ink">
                  {t("contact.sent")}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-6 text-sm font-semibold"
            >
              {status === "loading" ? t("contact.sending") : t("contact.send")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}