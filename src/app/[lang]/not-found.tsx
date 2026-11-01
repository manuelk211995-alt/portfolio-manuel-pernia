import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-32 text-center">
      <p className="font-bold text-accent-ink">
        404
      </p>
      <h1 className="type-display mt-4 text-4xl md:text-6xl">
        Página no encontrada
      </h1>
      <p className="mt-3 text-muted-foreground">Page not found</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-[2px] border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
      >
        Inicio / Home
      </Link>
    </div>
  )
}
