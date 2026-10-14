import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { defaultLocale, hasLocale } from "@/lib/site"

/**
 * Enrutado por idioma con la URL canonica:
 *  - "/" y rutas sin prefijo  -> locale por defecto (inglés)
 *  - "/es..."                 -> español (pasa tal cual)
 *  - "/en..."                 -> redirige a la versión sin prefijo
 *
 * La reescritura sirve internamente la ruta "/[lang]" sin cambiar la URL.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const firstSegment = pathname.split("/")[1]

  if (firstSegment && firstSegment !== defaultLocale && hasLocale(firstSegment)) {
    return NextResponse.next()
  }

  if (firstSegment === defaultLocale) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/en(?=\/|$)/, "") || "/"
    return NextResponse.redirect(url)
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    "/((?!api|_next|icon|apple-icon|opengraph-image|twitter-image|.*\\..*).*)",
  ],
}
