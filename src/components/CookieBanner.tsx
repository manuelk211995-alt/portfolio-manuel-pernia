"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useI18n } from "./LanguageProvider"

type ConsentState = "accepted" | "rejected" | null

const STORAGE_KEY = "cookieConsent"

export function CookieBanner() {
  const { t } = useI18n()
  const [consent, setConsent] = useState<ConsentState>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMounted(true)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const stored = localStorage.getItem(STORAGE_KEY)
    const next: ConsentState =
      stored === "accepted" || stored === "rejected" ? (stored as ConsentState) : null
    const timer = window.setTimeout(() => {
      setConsent(next)
    }, 0)
    return () => window.clearTimeout(timer)
  }, [mounted])

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted")
    } catch {
      /* ignore */
    }
    setConsent("accepted")
  }

  const handleReject = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "rejected")
    } catch {
      /* ignore */
    }
    setConsent("rejected")
  }

  if (!mounted || consent !== null) {
    return null
  }

  return (
    <div className="field-petrol fixed bottom-0 left-0 right-0 z-50 border-t border-border px-4 py-4 shadow-lg shadow-black/5">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">
          {t("cookies.banner.text")}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/cookies"
            className="rounded-[2px] px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {t("cookies.banner.policy")}
          </Link>
          <button
            type="button"
            onClick={handleReject}
            className="cursor-pointer rounded-[2px] border border-input bg-transparent px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {t("cookies.banner.reject")}
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="cursor-pointer rounded-[2px] bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
          >
            {t("cookies.banner.accept")}
          </button>
        </div>
      </div>
    </div>
  )
}