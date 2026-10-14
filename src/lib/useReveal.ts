"use client"

import { useEffect, useRef, useState } from "react"

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"
const THRESHOLD = 0.15

/**
 * Muestra el contenido al entrar en pantalla (una sola vez).
 * Con prefers-reduced-motion no hay nada que animar: se marca visible en el
 * primer frame, sin observer. El setState va en un rAF a proposit, para no
 * encadenar un render sincrono dentro del effect (react-hooks/set-state-in-effect).
 */
export function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia(REDUCED_MOTION).matches
    ) {
      const id = requestAnimationFrame(() => setIsVisible(true))
      return () => cancelAnimationFrame(id)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: THRESHOLD }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}