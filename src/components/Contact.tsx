"use client"

import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { useI18n } from "./LanguageProvider"

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const { t } = useI18n()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
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
      setTimeout(() => setStatus("idle"), 4000)
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 4000)
    }
  }

  return (
    <section id="contact" className="flex min-h-screen flex-col justify-center px-6 py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-3xl font-bold md:text-4xl">
            {t("contact.title")}
            <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-gradient-to-r from-[#6c63ff] to-[#e040a0]" />
          </h2>
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold">{t("contact.letsTalk")}</h3>
              <p className="mb-7 text-muted-foreground">
                {t("contact.desc")}
              </p>
            <div className="mb-4 flex items-center gap-3 text-muted-foreground">
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0 text-primary">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span className="text-sm">manuelk211995@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0 text-primary">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="text-sm">Granada, España</span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder={t("contact.namePlaceholder")}
              required
              className="w-full rounded-lg border border-input bg-card px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/20"
            />
            <input
              type="email"
              name="email"
              placeholder={t("contact.emailPlaceholder")}
              required
              className="w-full rounded-lg border border-input bg-card px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/20"
            />
            <textarea
              name="message"
              rows={5}
              placeholder={t("contact.messagePlaceholder")}
              required
              className="w-full rounded-lg border border-input bg-card px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/20"
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-gradient-to-r from-[#6c63ff] to-[#e040a0] py-6 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary/30 disabled:opacity-60"
            >
              {status === "loading" ? t("contact.sending") : status === "success" ? t("contact.sent") : status === "error" ? t("contact.error") : t("contact.send")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
