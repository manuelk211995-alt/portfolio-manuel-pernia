"use client"

import { useEffect, useState, useCallback } from "react"
import { ThemeToggle } from "./ThemeToggle"
import { LanguageToggle } from "./LanguageToggle"
import { useI18n } from "./LanguageProvider"

const navLinks = [
  { href: "#hero", key: "nav.home" },
  { href: "#about", key: "nav.about" },
  { href: "#projects", key: "nav.projects" },
  { href: "#contact", key: "nav.contact" },
]

const sectionIds = navLinks.map((l) => l.href.slice(1))

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const { t } = useI18n()

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (!el) continue
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: "-40% 0px -55% 0px" }
      )
      observer.observe(el)
      observers.push(observer)
    }
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [menuOpen, closeMenu])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/85 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-black/5" : ""}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-6 py-4">
        <nav
          className={`fixed top-0 right-0 z-40 flex h-screen w-64 flex-col border-l border-border bg-background p-8 pt-24 transition-transform duration-300 md:static md:h-auto md:w-auto md:flex-row md:border-none md:bg-transparent md:p-0 md:pt-0 md:translate-x-0 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
          aria-label={t("nav.home")}
        >
          <ul className="flex flex-col gap-6 md:flex-row md:gap-8">
            {navLinks.map((link) => {
              const sectionId = link.href.slice(1)
              const isActive = activeSection === sectionId
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-foreground after:transition-all ${
                      isActive
                        ? "text-foreground font-semibold after:w-full"
                        : "text-muted-foreground hover:text-foreground after:w-0 hover:after:w-full"
                    }`}
                  >
                    {t(link.key)}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
        <button
          type="button"
          className="flex flex-col gap-1.5 p-1 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t("menu.toggle")}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block h-0.5 w-6 bg-foreground transition-all ${menuOpen ? "translate-y-[8px] rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-foreground transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-foreground transition-all ${menuOpen ? "-translate-y-[8px] -rotate-45" : ""}`} />
        </button>
      </div>
      {menuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={closeMenu}
          aria-label="Close menu"
          tabIndex={-1}
        />
      )}
    </header>
  )
}
