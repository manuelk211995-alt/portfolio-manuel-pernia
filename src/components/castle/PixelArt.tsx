import type { ProjectStatus } from "@/lib/projects"
import { rarityByStatus } from "@/lib/projects"

// Iconos de 12x12 píxeles, uno por proyecto, dibujados a mano.
const ICONS: Record<string, { fill: string; d: string }> = {
  "nivel-60": {
    fill: "#2a1500",
    d: "M11 0h1v1h-1zM10 1h2v1h-2zM9 2h2v1h-2zM8 3h2v1h-2zM7 4h2v1h-2zM6 5h2v1h-2zM5 6h2v1h-2zM3 4h1v1h-1zM4 5h1v1h-1zM4 7h1v1h-1zM6 7h1v1h-1zM3 8h1v1h-1zM7 8h1v1h-1zM2 9h1v1h-1zM1 10h1v1h-1zM0 11h1v1h-1z",
  },
  economos: {
    fill: "#f2c94c",
    d: "M4 0h4v1h-4zM2 1h2v1h-2zM8 1h2v1h-2zM1 2h1v2h-1zM10 2h1v2h-1zM0 4h1v4h-1zM11 4h1v4h-1zM1 8h1v2h-1zM10 8h1v2h-1zM2 10h2v1h-2zM8 10h2v1h-2zM4 11h4v1h-4zM4 3h4v1h-4zM3 4h1v1h-1zM4 5h3v1h-3zM7 6h1v1h-1zM3 7h1v1h-1zM4 8h4v1h-4zM5 2h2v1h-2zM5 9h2v1h-2z",
  },
  calcuvolt: {
    fill: "#7fd0ff",
    d: "M7 0h2v1h-2zM6 1h2v1h-2zM5 2h2v1h-2zM4 3h2v1h-2zM3 4h6v1h-6zM6 5h2v1h-2zM5 6h2v1h-2zM4 7h2v1h-2zM3 8h2v1h-2zM2 9h2v1h-2zM1 10h2v1h-2z",
  },
  volleyplan: {
    fill: "#f6f1e3",
    d: "M4 0h4v1h-4zM2 1h2v1h-2zM5 1h1v4h-1zM8 1h2v1h-2zM1 2h1v2h-1zM10 2h1v1h-1zM9 3h2v1h-2zM0 4h1v4h-1zM8 4h1v1h-1zM11 4h1v4h-1zM1 5h4v1h-4zM6 5h2v1h-2zM4 6h2v1h-2zM7 6h4v1h-4zM3 7h1v1h-1zM6 7h1v4h-1zM1 8h2v1h-2zM10 8h1v2h-1zM1 9h1v1h-1zM2 10h2v1h-2zM8 10h2v1h-2zM4 11h4v1h-4z",
  },
}

export const RARITY_COLOR = {
  legendary: { field: "#e0761c", rim: "#e3b341", text: "#ffa654" },
  epic: { field: "#8a3fd0", rim: "#c9c2d8", text: "#c79bff" },
  rare: { field: "#2f6fd6", rim: "#c9c2d8", text: "#8fb8ff" },
} as const

// Glifos pequeños en píxeles, en lugar de caracteres Unicode
export function PixelArrow({ className, up = false }: { className?: string; up?: boolean }) {
  return (
    <svg viewBox="0 0 5 7" shapeRendering="crispEdges" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        transform={up ? "rotate(-90 2.5 3.5)" : undefined}
        d="M0 0h1v7h-1zM1 1h1v5h-1zM2 2h1v3h-1zM3 3h1v1h-1z"
      />
    </svg>
  )
}

export function PixelDot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 3 3" shapeRendering="crispEdges" aria-hidden="true" className={className}>
      <path fill="currentColor" d="M1 0h1v1h-1zM0 1h3v1h-3zM1 2h1v1h-1z" />
    </svg>
  )
}

export function rarityOf(status: ProjectStatus) {
  return rarityByStatus[status]
}

// Escudo de 12x14 píxeles: contorno, borde y campo, con el icono del proyecto encima.
export function PixelShield({
  slug,
  status,
  className,
}: {
  slug: string
  status: ProjectStatus
  className?: string
}) {
  const color = RARITY_COLOR[rarityOf(status)]
  const icon = ICONS[slug]
  return (
    <svg
      viewBox="0 0 12 14"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="#08060b"
        d="M2 0h8v1h-8zM1 1h1v1h-1zM10 1h1v1h-1zM0 2h1v6h-1zM11 2h1v6h-1zM1 8h1v2h-1zM10 8h1v2h-1zM2 10h1v1h-1zM9 10h1v1h-1zM3 11h1v1h-1zM8 11h1v1h-1zM4 12h1v1h-1zM7 12h1v1h-1zM5 13h2v1h-2z"
      />
      <path
        fill={color.rim}
        d="M2 1h8v1h-8zM1 2h1v6h-1zM10 2h1v6h-1zM2 8h1v2h-1zM9 8h1v2h-1zM3 10h1v1h-1zM8 10h1v1h-1zM4 11h1v1h-1zM7 11h1v1h-1zM5 12h2v1h-2z"
      />
      <path fill={color.field} d="M2 2h8v6h-8zM3 8h6v2h-6zM4 10h4v1h-4zM5 11h2v1h-2z" />
      <path fill="#ffffff" opacity="0.18" d="M2 2h8v1h-8zM2 3h1v4h-1z" />
      {icon && (
        <path
          fill={icon.fill}
          transform="translate(2.6 2.2) scale(0.56)"
          d={icon.d}
        />
      )}
    </svg>
  )
}
