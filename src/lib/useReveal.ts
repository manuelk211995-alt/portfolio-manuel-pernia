"use client"

import { useEffect, useRef, useState } from "react"

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"
const FALLBACK_MS = 5000

/**
 * Muestra el contenido al entrar en pantalla (una sola vez).
 * Con prefers-reduced-motion no hay nada que animar: se marca visible en el
 * primer frame, sin observer. El setState va en un rAF a proposit, para no
 * encadenar un render sincrono dentro del effect (react-hooks/set-state-in-effect).
 * Sin threshold para que funcione con bloques de cualquier altura; el margen
 * inferior hace que la entrada ocurra con el bloque ya a la vista. El observer
 * siempre avisa una vez al empezar: si ese aviso no llega es que no funciona, y
 * solo entonces el temporizador muestra el contenido.
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

    const fallback = setTimeout(() => setIsVisible(true), FALLBACK_MS)
    const observer = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(fallback)
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -20% 0px" }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      clearTimeout(fallback)
    }
  }, [])

  return { ref, isVisible }
}