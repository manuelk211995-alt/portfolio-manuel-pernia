# Log del proyecto — leer SIEMPRE

Este archivo es el historial vivo del portfolio. **Léelo al inicio de cada tarea/sesión** para conocer el contexto, y **actualízalo cada vez que pase algo**: un bug, un error, un contratiempo, una actualización, una decisión, un cambio de código, etc.

## Cómo mantenerlo

- Agrega cada incidente con: síntoma → causa → solución.
- Al resolver algo nuevo, añade una nueva sección (no borres las anteriores).
- Si una solución cambia, anótalo como "Intento fallido" + "Solución correcta".

## Historial

### 1. Imagen de un proyecto no se muestra (ruta `/public/...`)

**Síntoma:** La imagen de la card (ej. Economos) no carga / se rompe.

**Causa:** En Next.js los archivos de `public/` se sirven desde la raíz del sitio (`/archivo.png`), NO con el prefijo `/public/`. Una ruta como `/public/economos.png` devuelve 404 y rompe la card.

**Solución:** Usar rutas sin el prefijo `public/`:
- ❌ `image: "/public/economos.png"`
- ✅ `image: "/economos.png"`

**Archivo afectado:** `src/components/Projects.tsx` (campo `image` de cada proyecto).

---

## 6. Actualización de imagen CalcuVolt (recurrencia del error `/public/`)

**Síntoma:** Al actualizar la imagen de CalcuVolt, el usuario borró `calcuvolt.png`, subió una nueva como `calcuvolt-nuevo.png.png` y el mismo error de imagen rota se repitió.

**Causa:** Misma causa que el incidente 1: la ruta se escribió con el prefijo inválido `/public/...`. Además el archivo quedó con **doble extensión** (`.png.png`), lo que complica el nombre.

**Solución:**
```powershell
Rename-Item -LiteralPath "public/calcuvolt-nuevo.png.png" -NewName "calcuvolt-v2.png"
```
- ✅ `image: "/calcuvolt-v2.png"` (en `src/components/Projects.tsx`)

**Regla para el usuario:** al subir una imagen desde Windows, revisar que el nombre no tenga espacios, ni `/public/` en la ruta, ni doble extensión. El agente se encarga de renombrar si hace falta.

---

## 7. Rediseño de la sección About (texto a la izquierda, skills a la derecha)

**Tipo:** actualización / cambio de diseño.

**Cambio:** En `src/components/About.tsx` se reorganizó la sección About:
- Antes: título, párrafo y skills apilados verticalmente a todo el ancho.
- Ahora: el título "About" queda arriba centrado; debajo, un `grid gap-10 lg:grid-cols-2` con el **texto a la izquierda** (`text-left`) y las **skills a la derecha**.
- Las cards de skills pasaron de `sm:grid-cols-2 lg:grid-cols-4` a `sm:grid-cols-2` (grilla 2×2, porque 4 en fila no cabían en la mitad derecha).
- El grid usa `lg:items-center` para centrar verticalmente el texto respecto a la columna de skills.
- En móvil (< `lg`) se apilan: texto arriba, skills abajo.
- Se conservan `id="skills"` (ancla del header), `useReveal` y los estilos de las cards.

---

## 8. Mejoras visuales en la sección About

**Tipo:** actualización / cambio de diseño.

**Cambios aplicados (A, B, C, E del plan):**
- **A — Fondo decorativo:** degradado radial sutil (`size-[600px]` en la esquina superior derecha), igual al de la sección Hero, para dar profundidad.
- **B — Etiquetas visibles en skills:** cada icono de tecnología ahora muestra su **nombre debajo** (`<span className="text-xs">`), ya no solo tooltip. Las cards de skills bajaron su padding de `p-8` a `p-6` y el `h4` de `text-lg` a `text-base` para equilibrar.
- **C — Barra de stats con contador:** bajo el texto About (columna izquierda) una grilla de 3 cifras con animación de conteo (`useCountUp` con easing cubic, disparada por `useReveal`). Valores: **2+ años**, **3+ proyectos**, **18+ tecnologías** (18 = total de techs listados en `skills`).
- **E — Texto reescrito:** `about.p1`/`about.p2` ahora en primera persona (EN y ES) en `src/lib/i18n.ts`. Se agregaron claves `about.stats.*`.

**PENDIENTE DE CONFIRMAR con el usuario:** los valores de las stats (2 años, 3 proyectos) son placeholders razonables. Ajustar en el array `stats` de `src/components/About.tsx` si no son correctos.

**No aplicadas (opcionales):** D (botón descargar CV) y F (iconos flotantes).

---

## 9. Ajustes About tras revisión del usuario

**Tipo:** cambio de diseño / reversión parcial.

**Cambios:**
- **Cards de skills del mismo tamaño:** la grilla pasó a `grid auto-rows-fr gap-6 sm:grid-cols-2` (todas las filas con la misma altura) y las cards usan `flex flex-col justify-center` para centrar el contenido verticalmente en las de menor contenido. La card más alta (Frontend, 6 techs) define la altura de las 4.
- **Se quitó la barra de stats** (2+ años / 3+ proyectos / 18+ tecnologías): se eliminaron `stats`, `useCountUp`, `StatItem`, el grid de stats en la columna izquierda y las claves `about.stats.*` de `src/lib/i18n.ts` (EN y ES). También se removió el import de `useEffect`/`useState` que ya no se usaba.

---

## 10. Cards de skills demasiado grandes (no cabían en pantalla)

**Síntoma:** Tras el incidente 9, las 4 cards de skills quedaron muy altas: la card Frontend (6 techs con etiquetas) define la altura de todas (`auto-rows-fr`) y la sección About excedía el alto de la pantalla.

**Causa:** `auto-rows-fr` iguala la altura de TODAS las filas a la más alta. Con iconos `size-12`, etiquetas `text-xs`, `gap-4` y `p-8`, la card Frontend era enorme y arrastraba a las demás.

**Solución:** Compactar el contenido de las cards manteniendo el tamaño igual:
- Iconos: `size-12` → `size-10` (icono interno `size-5`).
- Etiquetas: `text-xs` → `text-[11px]`, gap interno `gap-2` → `gap-1`.
- Card: `p-8` → `p-5`; título `mb-5 text-lg` → `mb-4 text-base`.
- Grilla: `gap-6` → `gap-5`; título de sección `mb-8` → `mb-6`.
- Se mantuvo `auto-rows-fr` y `flex flex-col justify-center` (cards iguales y centradas).

**Regla general:** con `auto-rows-fr`, controlar bien el tamaño del contenido (iconos/etiquetas/paddings) porque la card más alta define la altura de todas.

---

## 11. Fondo plano → blobs de color + acento de marca

**Síntoma / petición:** el diseño se veía muy plano y sencillo (fondos sólidos monocromos, sin color de acento).

**Solución (plan A + C, color elegido: violeta/índigo):**
- **`src/app/globals.css`**:
  - Tokens `--brand` (claro `#6d5bd0` / oscuro `#9d8cff`) y `--brand-warm` (claro `#d97706` / oscuro `#fbbf24`), registrados en `@theme inline` como `--color-brand` y `--color-brand-warm`.
  - Clases `.blob-brand` y `.blob-warm`: gradientes radiales con `color-mix` (15% y 10% de opacidad) sobre los tokens.
  - Keyframe `drift` (flotación lenta con desplazamiento y escala), además del `float` existente.
- **Secciones (Hero, About, Projects, Contact):** se añadieron 1–2 blobs absolutos `pointer-events-none` en esquinas con `animation: drift` de duraciones escalonadas (18–25s, algunos en `reverse`). Projects y Contact recibieron `overflow-hidden` (no lo tenían) y los contenedores de contenido pasaron a `relative` para quedar sobre los blobs.
- **Acento de marca:** los subrayados de los títulos (`bg-foreground/20`) pasaron a `bg-brand/60` en las 4 secciones. Botones/links primarios se mantienen monocromos.

**Causa del plano original:** paleta 100% monocroma y el blob del Hero era `rgba(0,0,0,0.03)` (prácticamente invisible).

**Para cambiar el color de marca:** editar `--brand` / `--brand-warm` en `:root` y `.dark` de `globals.css`.

---

## 12. Reversión del incidente 11 (blobs + marca) — no gustó al usuario

**Síntoma / petición:** el usuario no quedó conforme con el fondo de blobs de color y el acento de marca; pidió deshacerlo.

**Solución:** se revirtió por completo el incidente 11 en `globals.css`, `Hero.tsx`, `About.tsx`, `Projects.tsx` y `Contact.tsx`:
- Eliminados tokens `--brand`/`--brand-warm`, `--color-brand`/`--color-brand-warm`, clases `.blob-brand`/`.blob-warm` y keyframe `drift`.
- Secciones vuelven a su estado original (sin `overflow-hidden` extra en Projects/Contact, contenidos sin `relative` donde no lo tenían, blob monocromo `rgba(0,0,0,0.03)` en Hero/About).
- Subrayados de títulos vuelven a `bg-foreground/20`.

**Causa:** decisión estética del usuario. Lección: en este proyecto el fondo monocromo sobrio es el estilo preferido; antes de introducir color de marca, consultar/validar con el usuario.

**Estado final:** lint OK, HTTP 200. El diseño queda como al final del incidente 10.

---

## 13. Limpieza pre-push: código muerto y repo optimizado

**Tipo:** limpieza / mantenimiento / release.

**Cambios aplicados:**
- **`src/lib/i18n.ts`:** eliminada la clave sin usar `projects.dashboard.desc` (EN y ES); quedó el módulo en formato `Record<string, string>`.
- **`public/economos.png`:** eliminado (duplicado byte-idéntico de `economos-v2.png`, no referenciado; ~1 MB liberado).
- **`.agents/skills/` (714 archivos, 6.2 MB) y `videos/portfolio-motion/` (0.7 MB):** sacados de git con `git rm -r --cached` (los archivos **se conservan en disco**) y añadidos a `.gitignore` — no forman parte del portfolio.
- **`.gitignore`:** añadidos `.agents/`, `videos/` y `dev-server.log`.
- **`document.md`:** eliminado encabezado duplicado `## 1.`.
- **`About.tsx`:** limpieza de formato (línea en blanco y `>` suelto en la card de skills).

**Verificación (todo OK):**
- `npm run lint` → exit 0.
- `npm run build` → compilación + TypeScript OK (rutas: `/` estática, `/api/contact` dinámica).
- HTTP 200 en `/` y en los 7 assets referenciados (economos-v2.png, calcuvolt-v2.png, portfolio-chatgpt.png, profile.jpeg, 3 mp4 de demo).
- `POST /api/contact` con body vacío → 400 `{"error":"All fields are required"}` (validación correcta, sin envío de correo).
- Log del dev server sin errores.

**Decisión de release:** push a la rama `develop` (pendiente de la última prueba visual del usuario).

---

## 14. Proyecto nuevo "VolleyPlan" (Plan Game Voleibol) sin código enlazado

**Tipo:** nueva funcionalidad.

**Petición:** añadir el proyecto "Plan Game Voleibol" al apartado Proyectos, pero sin botón de código, ya que será publicado por el usuario (no es código abierto).

**Investigación:** el repo privado `manuelk211995-alt/volley-game-plan` (se clonó a temp para analizarlo; su README era la plantilla Vite por defecto). El nombre real del producto es **VolleyPlan** (extraído de `PRODUCT.md`): herramienta web para entrenadores de voleibol que condensa el plan de juego en una hoja A4 imprimible con pizarra táctica (Konva), notas de rival/equipo y exportación a PDF. Stack: React 19 + Vite + Tailwind v3.4 + Express/SQLite/JWT.

**Cambios:**
- `src/components/Projects.tsx`: nuevo objeto en el array `projects` con solo `title`, `descKey` y `tags` (sin `codeUrl`, sin `demoUrl`, sin `image`). El componente ya soporta campos opcionales: sin `image` muestra el placeholder SVG con el nombre, y los botones Código/Demo no se renderizan.
- `src/lib/i18n.ts`: claves `projects.volleyplan.desc` en EN y ES.

**Verificación:** `npm run lint` OK, `npx tsc --noEmit` OK, dev server responde 200 y "VolleyPlan" visible en el HTML.

**Pendiente:** cuando el usuario publique la app, añadir opcionalmente `image` (captura en `public/`, sin espacios ni `/public/` en la ruta) y un enlace externo (habría que ampliar el botón Demo para soportar URL externa además de vídeo local).

---

## 15. Galería de 2 imágenes en la tarjeta de VolleyPlan

**Tipo:** mejora de UI / recursos.

**Petición:** usar las 2 capturas `game-plan-voleibol` (landing + editor) en la tarjeta del proyecto.

**Síntoma/riesgo inicial:** el archivo venía como `game-plan-voleibol.png.png` (**doble extensión**, ver incidente 6). Se renombraron a nombres limpios:
```powershell
Rename-Item -LiteralPath "public/game-plan-voleibol.png.png" -NewName "game-plan-voleibol-1.png"
Rename-Item -LiteralPath "public/game-plan-voleibol1.png"      -NewName "game-plan-voleibol-2.png"
```

**Cambio en el código (`src/components/Projects.tsx`):**
- El campo `image` (una sola) sigue existiendo para los demás proyectos. Se añadió un campo opcional `images: string[]` (VolleyPlan usa las 2 nuevas rutas).
- Nuevo sub-componente `ProjectGallery({ images, alt })`: imágenes apiladas con fundido (`opacity`, 700ms) que rotan cada **3.5 s**, más puntos indicadores clicables (`.size-2 rounded-full`).
- El render de la card pasa a: `{(project.images ?? (project.image ? [project.image] : [])).length > 0 ? <ProjectGallery .../> : <placeholder/>}`. Así los proyectos con una sola imagen siguen funcionando igual.

**Regla para imágenes múltiples:** usar `images: [...]` con rutas limpias (sin espacios, sin `/public/`, sin doble extensión). Next.js normaliza el campo a opcional en arrays con formas distintas, así que `project.images`/`project.image` compilan sin problemas.

**Verificación:** `npm run lint` OK, `npx tsc --noEmit` OK, HTTP 200 y ambas rutas de imagen devuelven 200.

---

## 2. La imagen que se muestra no es la correcta (capturas borradas en git)

**Síntoma:** La imagen del proyecto no corresponde a la real (ej. se mostró una imagen generada en vez de la captura del panel).

**Causa:** Las capturas originales (`economos-1.jpg` a `economos-4.jpg`) se borraron en el commit `f736102` ("Limpiar código muerto, actualizar imágenes..."). Solo quedaba un archivo suelto con contenido equivocado.

**Solución:** Recuperar las capturas desde git:
```powershell
git restore --source=f736102~1 -- public/economos-1.jpg public/economos-2.jpg public/economos-3.jpg public/economos-4.jpg
```

⚠️ **IMPORTANTE:** NO recuperar binarios con `git show <commit>:<archivo> > salida.png` en PowerShell: la redirección `>` escribe en UTF-16 y corrompe la imagen. Usar siempre `git restore --source=<commit> -- <ruta>`.

---

## 3. Archivo con espacios en el nombre rompe la imagen

**Síntoma:** Se copió una imagen con nombre tipo `Generated Image August 02, 2026 - 10_04AM.png` y no carga.

**Causa:** Espacios y caracteres especiales en el nombre del archivo no son seguros para URL, y de nuevo se usó la ruta inválida `/public/...`.

**Solución:** Renombrar el archivo a un nombre limpio (sin espacios) y apuntar a la ruta raíz:
```powershell
Rename-Item -LiteralPath "public/Generated Image August 02, 2026 - 10_04AM.png" -NewName "economos.png"
```
- ✅ `image: "/economos.png"`

---

## 4. Caché del navegador muestra una imagen vieja → 500 con `?v=2`

**Síntoma:** Al reemplazar el contenido de una imagen con el mismo nombre, el navegador sigue mostrando la versión vieja (caché).

**Intento fallido:** Agregar query string para romper caché:
- ❌ `image: "/economos.png?v=2"`

**Causa del fallo:** Next.js 16 valida los query strings en `next.config.ts` → `images.localPatterns`. Si no está configurado, el server responde **500**: `Image with src "..." is using a query string which is not configured in images.localPatterns`.

**Solución correcta:** Renombrar el archivo a un nombre NUEVO (URL nueva = caché nuevo) sin query string:
```powershell
Copy-Item -LiteralPath "public/economos.png" -Destination "public/economos-v2.png"
```
- ✅ `image: "/economos-v2.png"`

---

## 5. Error React 19: "Encountered a script tag while rendering React component"

**Síntoma:** En consola/dev-overlay aparece (apunta a `<Providers>` / layout):
```
Encountered a script tag while rendering React component. Scripts inside React components are never executed when rendering on the client.
```

**Causa:** `next-themes` inyecta un `<script>` inline dentro de un Client Component para evitar el parpadeo del tema (FOUC). React 19 lo marca como error. **Es un falso positivo:** el script sí se ejecuta correctamente durante SSR. Solo aparece en desarrollo; en producción no existe el warning.

**NOTA:** El `<script type="application/ld+json">` de `src/app/layout.tsx` (JSON-LD) NO es la causa: React lo trata como "data block" y no lo marca.

**Sin fix upstream:** `next-themes@0.4.6` está sin mantenimiento y la beta `1.0.0-beta.0` tampoco lo arregla (sigue sin `type` en el script).

**Solución (workaround oficial de shadcn):** Filtrar el `console.error` específico en el wrapper del provider, `src/components/providers.tsx`:
```tsx
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalError = console.error
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag while rendering React component")
    ) {
      return
    }
    originalError.apply(console, args)
  }
}
```

**Alternativas si se quiere eliminar de raíz:** reemplazar `next-themes` por un fork mantenido (`@wrksz/themes` o `@teispace/next-themes`) o por un provider propio con Zustand + `useServerInsertedHTML` (inyecta el script fuera del árbol de React).

---

## 16. BUG REAL: botones/CTAs invisibles en tema claro (tokens `--primary`, `--secondary`, `--popover` ausentes en `:root`)

**Síntoma:** Con el tema **claro** activo, los elementos que usan `bg-primary` / `text-primary-foreground` / `bg-secondary` / `bg-popover` se veían **transparentes o con texto del mismo color** (el CTA principal del Hero prácticamente desaparecía). En **oscuro** se veían bien.

**Causa:** En `src/app/globals.css` el bloque `:root` (tema claro) definía solo **parte** de los tokens estilo shadcn: existían `--background`, `--foreground`, `--card`, `--muted`, `--accent`, `--border`, `--input`, `--ring`… pero **faltaban** `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--popover` y `--popover-foreground`. Solo el bloque `.dark` los declaraba, así que en claro esas utilidades caían a valores vacíos y el color se heredaba/transparentaba.

**Solución:** Completar la paleta B/N en `:root` y terminar de completar `.dark`, así **ambos temas definen exactamente los mismos tokens**:

```css
:root {
  --primary: #0a0a0a;
  --primary-foreground: #fafafa;
  --secondary: #f5f5f5;
  --secondary-foreground: #171717;
  --popover: #ffffff;
  --popover-foreground: #0a0a0a;
}

.dark {
  --primary: #fafafa;
  --primary-foreground: #0a0a0a;
  --secondary: #171717;
  --secondary-foreground: #fafafa;
  --popover: #0a0a0a;
  --popover-foreground: #fafafa;
  --muted-foreground: #a3a3a3;
  --border: #262626;
}
```

**Regla para el futuro:** cualquier token nuevo debe declararse en `:root` **y** en `.dark`. Si un color "desaparece" solo en un tema, revisar primero si el token existe en ese bloque.

**Archivo afectado:** `src/app/globals.css`. Verificado en el CSS ya compilado que sirve `/_next/static/chunks/...css`.

---

## 17. Rediseño "Editorial Index" del portfolio (inspiración monde.com) — actualización global

**Tipo:** actualización / cambio de diseño + decisión.

**Cambio:** Rediseño integral con dirección **editorial, 100% tipográfica**, paleta **blanco/negro**, radios **0–2px** y soporte de tema **claro + oscuro**. Sin imagen de perfil en el Hero.

**Archivos modificados:**
- `src/app/globals.css`: tokens B/N completos (ver sección 16), radios `--radius-sm: 0px`, `--radius-md: 1px`, `--radius-lg|xl|2xl|3xl: 2px`, `--radius: 0.125rem`; token `--font-display: var(--font-editorial)`; keyframes autorales `editorial-rise | editorial-rule | editorial-fade` con las clases `.hero-mask / .hero-line / .hero-rule / .hero-fade`; reveals retocados (16px / 24px / scale 0.98, `cubic-bezier(0.16,1,0.3,1)`); bloque `@media (prefers-reduced-motion: reduce)` que apaga animaciones/transiciones y fuerza los reveals visibles.
- `src/app/layout.tsx`: fuente display `Instrument_Serif` vía `next/font/google` (weight 400, normal + italic) expuesta como `--font-editorial`; skip-link con `rounded-[2px]`.
- `src/components/Hero.tsx`: **sin retrato** ni blob; nombre en dos líneas (`hero-mask > hero-line`, delays 0.05s / 0.18s), regla `hero-rule` (0.45s) y el rol como "dateline" serif en itálica; descripción, CTAs y socials con entrada escalonada e inversión B/N en hover.
- `src/components/About.tsx`: sin cards decorativas, sin "kicker" en mayúsculas y sin colores de marca; skills como `<dl>` con `divide-y divide-border` e iconos monocromos (`text-foreground`).
- `src/components/Projects.tsx`: **índice editorial** (`<ol>` con numeración `01..`, título en `font-display`, tags separados por `·`) + `ProjectDialog` accesible (`role="dialog"`, `aria-modal`, `aria-labelledby`, `aria-describedby`, focus trap, Escape, scroll lock, restauración de foco al disparador, backdrop con `onMouseDown` target-check); galería con dots `rounded-[1px]`.
- `src/components/Contact.tsx`: inputs solo con línea inferior (`border-b` + `focus:border-foreground`), checkbox `rounded-none accent-foreground`, estados en B/N, un único `aria-live="polite"`.
- `src/components/Header.tsx`: `id="mobile-menu"` + `aria-controls` + `aria-label` i18n, focus trap, Escape (devuelve el foco al hamburger), menú móvil con `invisible/visible` (evita que los links sean tabulables fuera de pantalla), `aria-current="page"` en el link activo.
- `src/components/Footer.tsx`, `src/components/CookieBanner.tsx`: radios 2px, microtype mono.
- `src/components/ui/button.tsx`: todos los radios → `rounded-[2px]`.
- `src/lib/useReveal.ts`: simplificado (sin parámetro, umbral 0.15) + caso `prefers-reduced-motion` (ver sección 18).
- `src/lib/i18n.ts`: nuevas claves `nav.main`, `ui.close`, `projects.indexLabel`, `projects.view` (EN/ES).

**Decisión:** **no** se ejecutó `npm run build` mientras el dev server estaba activo, porque `next build` y `next dev` comparten el directorio `.next` y puede corromperse el estado del dev server en marcha.

**Verificación:** `npm run lint` ✅ · `npx tsc --noEmit` ✅ · `GET http://localhost:3000` → **200** · CSS compilado contiene `var(--font-editorial)`, `.font-display{font-family:var(--font-editorial)}`, `.rounded-lg{border-radius:2px}` y el bloque `prefers-reduced-motion`.

---

## 18. `npm run lint` fallaba: `react-hooks/set-state-in-effect` en `useReveal` (+ warning de variable sin usar)

**Síntoma:**
```
src/lib/useReveal.ts
  25:7  error  Calling setState synchronously within an effect can trigger cascading renders
src/components/Projects.tsx
  300:27  warning  'e' is defined but never used
```

**Causa:** El hook `useReveal` hacía `setIsVisible(true)` **sincrónicamente dentro del `useEffect`** (early-return para el caso sin `IntersectionObserver` o con movimiento reducido). La regla de React desaconseja setState directo en el cuerpo de un effect. En `Projects.tsx`, el handler `onClick={(e) => setActive(...)}` declaraba un parámetro que no se usaba.

**Intento fallido:** Dejar el caso de movimiento reducido **sin** marcar visible y confiar solo en el CSS (`prefers-reduced-motion` fuerza opacidad 1). Funciona visualmente, pero el estado del hook queda en `false` y la regla de lint seguiría apareciendo al reintroducir cualquier setState sincrónico.

**Solución correcta:** Posponer el setState **un frame** (rAF), que es el patrón que la regla acepta (setState en callback, no en el cuerpo del effect) y con cleanup:

```ts
if (typeof IntersectionObserver === "undefined" || window.matchMedia(REDUCED_MOTION).matches) {
  const id = requestAnimationFrame(() => setIsVisible(true))
  return () => cancelAnimationFrame(id)
}
```
Más `onClick={() => setActive({ project, index: i })}` en `Projects.tsx` (el disparador del modal no necesita el evento: el diálogo lee `document.activeElement` para restaurar el foco).

**Archivos afectados:** `src/lib/useReveal.ts`, `src/components/Projects.tsx`. Resultado: `npm run lint` sin errores ni warnings.

---

## 19. Impeccable: instalación y hallazgos (incluido un anti-patrón eliminado del Hero)

**Tipo:** decisión + actualización de diseño.

**Cambio:** `impeccable` (v4.5.2, detector de anti-patrones de UI, https://impeccable.style) **no estaba instalado**; se instaló localmente:
```powershell
npm i -D impeccable      # instala también el binario nativo @impeccable/cli-windows-x64
npx impeccable --version # 4.5.2
```

**Cómo se usa:**
```powershell
npx impeccable detect src/                    # escaneo estático del código
npx impeccable detect http://localhost:3000   # escaneo del DOM renderizado (Edge/Chrome)
```
Salidas: **exit 0 = sin hallazgos**, **2 = hay hallazgos**, **1 = no se pudo escanear**.

**Verificación de que el detector funciona:** se escaneó un archivo canario de prueba (gradiente violeta/cyan, `bg-clip-text`, `rounded-full`, `transition-all`) y devolvió 3 anti-patrones (exit 2). Luego se borró el canario.

**Hallazgo 1 — `hero-eyebrow-chip` (RESUELTO):**
- Síntoma: "tracked-caps label sitting immediately above an oversized hero headline" → el patrón de hero SaaS por defecto (etiqueta mono en MAYÚSCULAS con tracking sobre el h1).
- Causa: el Hero tenía un kicker con `font-mono text-xs uppercase tracking-[0.2em]` encima de `Manuel / Pernia`.
- Solución: se eliminó ese eyebrow. El rol (`hero.role`) ahora es una línea en **serif itálica** (`font-display italic`) situada **junto a la regla** `hero-rule`, como dateline de masthead editorial. Se mantiene la dirección tipográfica del brief sin el telling del "hero chip".

**Hallazgo 2 — `overused-font` (PENDIENTE DE DECISIÓN):**
- Síntoma: "Primary font: geist (73% of text)"; Geist está en la lista de fuentes sobreusadas (junto a Inter, Roboto, Fraunces…).
- Causa: la sans del body sigue siendo Geist (la del proyecto original); `Instrument_Serif` solo cubre el display (h1 y rol).
- Solución propuesta (NO aplicada todavía): cambiar la sans del body por una con más personalidad — p. ej. **Instrument Sans** (misma familia que la serif ya usada, disponible en `next/font/google`) — y reservar Geist Mono para microtype. **Requiere confirmación del usuario**, porque afecta la tipografía de todo el sitio (incluidas las páginas legales, fuera del alcance de este brief).

**Estado final del escaneo:** `npx impeccable detect src/` → **0 hallazgos**. `npx impeccable detect http://localhost:3000` → **1 hallazgo** (`overused-font`).

---

## 20. Warning de hidratación del botón de tema (pre-existente, no causado por el rediseño)

**Síntoma:** En el log del dev server aparecen avisos de hidratación con el botón de tema y `aria-label` distinto entre servidor y cliente:
```
+ aria-label="Switch to light mode"
- aria-label="Switch to dark mode"
  at emitPendingHydrationWarnings (react-dom ...)
```

**Causa:** `src/components/ThemeToggle.tsx` calcula `aria-label={theme === "dark" ? ... }`. En SSR `theme` es el `defaultTheme="dark"` del provider, mientras que en la hidratación `next-themes` resuelve el tema guardado en `localStorage` (claro) → el atributo no coincide. El guard `mounted` **solo** se aplica al icono, no al `aria-label`. El componente no se tocó en este rediseño: el aviso es **pre-existente**.

**Solución (opcional, fuera del alcance de este brief):** aplicar el mismo guard `mounted` al `aria-label`, p. ej. `aria-label={!mounted ? "Toggle theme" : (theme === "dark" ? "Switch to light mode" : "Switch to dark mode")}`.

**Archivo afectado:** `src/components/ThemeToggle.tsx`.

---

## 21. Colorización "RISO PRESS" del rediseño Editorial Index (se rompe el B/N)

**Tipo:** actualización de diseño + decisión (cambio de sistema de color).

**Síntoma / petición:** El rediseño anterior quedó 100% blanco y negro ("se ve muy sencillo"); se pidió sorprender con la paleta usando la skill **Impeccable** (`colorize`).

**Decisión (ruta A, avalada por la skill):** `colorize` es un comando de *refinamiento* (no exige `PRODUCT.md` ni el flujo `init`/`concept-seed`, que sí lo exigen — `concept-seed` responde `NO_PRODUCT_MD`). Se preserva la estructura Editorial Index y solo se cambia el mundo de color. Paleta elegida: **RISO PRESS** (risografía), estrategia "fullescreen fields" (el color posee regiones enteras), **3 tintas spot + papel + tinta**.

**Temperatura/escena que fuerza claro-oscuro:** un recruiter/colega leyendo el trabajo de un dev-diseñador en un portátil, de día y de noche → claro = papel, oscuro = tinta cálida; **compuestos por separado** (no inversión mecánica).

**Primitivas (OKLCH-compatibles, en `:root` y `.dark`):**
| token | claro | oscuro |
|---|---|---|
| `--riso-paper` | `#f4f1e8` | (texto) `#f4f1e8` |
| `--riso-ink` | `#16130f` | `#0e0c0a` |
| `--riso-blue` (spot-a) | `#2f4b7c` | `#2b4a86` |
| `--riso-pink` (spot-b) | `#ff4a8d` | `#a03a6f` |
| `--riso-yellow` (spot-c) | `#ffd21e` | `#ffd21e` |
| `--riso-violet` (sobreimpresión) | `#6a2f8f` | `#5a2a86` |

**Roles y sistema (por qué no hay que reescribir cada componente):** se añadió el bloque `.field-blue / .field-paper / .field-pink / .field-ink / .field-violet`, que **remapea los roles semánticos** (`--background`, `--foreground`, `--muted-foreground`, `--border`, `--input`, `--ring`, `--accent`…) dentro de su alcance. Así los hijos existentes (`text-foreground`, `text-muted-foreground`, `border-border`, `bg-muted`, `text-primary`…) se adaptan solos por herencia de custom properties. El texto secundario se deriva del **tono del campo** (`color-mix(in oklch, fg 88%, bg)`), no de un gris lavado. La **acción** (`--primary`) se lleva la tinta **amarilla** para ser localizable en cualquier campo.

**Campos por sección:**
| sección | claro | oscuro (compuesto) |
|---|---|---|
| Hero | azul (`field-blue`) | azul `#2b4a86` |
| About | papel (`field-paper`) | índigo-violeta `#3a2f70` |
| Projects | rosa (`field-pink`) | magenta `#a03a6f` |
| Contact | violeta (`field-violet`) | violeta `#5a2a86` |
| Footer / CookieBanner | violeta (`field-violet`) | violeta |
| lienzo + Navbar (`--background`) | papel `#f4f1e8` | índigo `#171334` |

**Ajustes tras feedback del usuario (2 rondas):**
1. *"El negro de las 2 secciones no encaja con los otros 2 colores"* → la primera versión usaba `field-ink` (casi negro) en Contact/Footer/CookieBanner; se sustituyó por **`field-violet`** (`#6a2f8f`), la tinta de sobreimpresión entre azul y rosa.
2. *"Aún queda una sección en negro, igual que el navbar; la paleta debe estar en armonía"* → el tema **oscuro** rebajaba a casi-negro el `--background` (navbar/lienzo `#0e0c0a`) y el campo papel de About (`#1b1712`). Se **rebasó el tema oscuro sobre un índigo** (`--background: #171334`) y se dio a About un **índigo-violeta** (`#3a2f70`); las tintas spot subieron luminosidad para leerse sobre el fondo. Resultado: **ningún negro**; toda la página vive en la familia análoga azul → índigo → violeta → magenta. La clase `field-ink` se conserva en el sistema por si se quiere un cierre en tinta.

**Firma RISO:** clase `.riso-overprint` — banda de 3px con gradiente `azul → violeta → rosa` (la "tercera tinta" que nace al solaparse dos), en el borde superior de About/Projects/Contact. `::selection` en amarillo/`--riso-ink`, `caret-color`, `accent-color` del checkbox y el scrim del modal (`.scrim`, neutro, no hereda el campo) también derivan de la paleta.

**Archivos modificados:** `src/app/globals.css` (primitivas, roles, `.field-blue|paper|pink|ink|violet`, `.riso-overprint`, `.scrim`, `::selection`, caret, scrollbar) y `src/components/{Hero,About,Projects,Contact,Footer,CookieBanner}.tsx` (clases de campo, banda de sobreimpresión, rol del Hero en `text-primary`, scrim + `field-paper` en el diálogo de proyecto, checkbox en `accent-[var(--riso-yellow)]`). Las páginas legales (`/privacidad`, `/cookies`) **no** se tocaron: usan tokens y se adaptan solas.

**Contraste (WCAG AA, calculado, ambos temas):** todos los pares texto/fondo pasan. Oscuro (paper `#f4f1e8`): sobre navbar `#171334` **15.8:1**, hero `#2b4a86` **7.7:1**, about `#3a2f70` **10.2:1**, rosa `#a03a6f` **5.6:1**, violeta `#5a2a86` **8.8:1**; `muted` derivado en rosa **4.7:1**. Claro: papel/azul **7.7:1**, tinta/rosa **5.8:1**, etc. El único "<4.5" es el filete decorativo de 26% (separador, no texto ni control). Foco usa `--ring: var(--f-fg)` (contraste pleno).

**Verificación:** `npm run lint` ✅ (0/0) · `npx tsc --noEmit` ✅ · `GET http://localhost:3000` → **200** · CSS compilado contiene `.field-*`, `.riso-overprint`, `.scrim`, `::selection`, `caret-color`, `accent-color` y `color-mix` · `npx impeccable detect src` → **exit 0** · `npx impeccable detect http://localhost:3000` → **exit 2 con 1 hallazgo** (solo el `overused-font` de Instrument Sans, ya conocido y aceptado).

**Decisión:** el tema por defecto del sitio es **oscuro** (`defaultTheme="dark"` en `providers.tsx`), así que el detector midió el tema oscuro; el claro se verificó por cálculo de contraste.

---

## 22. Cambio de paleta: de "RISO PRESS" a "Petróleo y óxido" (paleta fija del usuario)

**Síntoma / petición:** el usuario dio una paleta exacta de 5 colores y pidió usarla: `#17313C` (petróleo), `#254E72` (azul), `#206E82` (teal), `#A45230` (óxido/rust), `#C35929` (naranja). Sustituye a la paleta RISO de la sección 21 (que queda como historial; el prefijo `--riso-*`, la clase `riso-overprint` y las clases `field-ink|pink|violet` **ya no existen**).

**Decisiones tomadas con el usuario (2 preguntas):**
1. **Ámbito = ambos temas.** El tema claro usa **tintes pálidos** de los mismos tonos; el oscuro usa los tonos profundos.
2. **Naranja = acento/CTA** (no campo de texto): como texto no pasa AA (3.89:1 sobre crema, 3.10:1 sobre petróleo). Se reserva para rellenos/bordes: botones `bg-primary`, borde del CTA secundario, firma `.overprint`, `::selection`, foco (`--ring`), checkbox.

**Tokens (`--pal-*` en `:root` y `.dark`):**

| token claro | valor | token oscuro | valor |
|---|---|---|---|
| `--pal-paper` | `#f4f1e8` | `--pal-paper` | `#f4f1e8` |
| `--pal-ink` | `#17313c` | `--pal-ink` | `#0a0a0a` |
| `--pal-ink-strong` | `#0a0a0a` | `--pal-ink-strong` | `#0a0a0a` |
| `--pal-petrol` | `#17313c` | `--pal-petrol` | `#17313c` |
| `--pal-blue` | `#254e72` | `--pal-blue` | `#254e72` |
| `--pal-teal` | `#206e82` | `--pal-teal` | `#1a5c6e` |
| `--pal-rust` | `#a45230` | `--pal-rust` | `#8a4326` |
| `--pal-orange` | `#c35929` | `--pal-orange` | `#c35929` |
| `--accent-ink` | `#8a4326` | `--accent-ink` | `#f0cba8` |

**Campos por sección:** Hero = `field-petrol`; About = `field-blue`; Projects = `field-teal`; Contact = `field-rust`; Footer / CookieBanner = `field-petrol`; diálogo de proyecto = `field-paper` (superficie tarjeta). Lienzo + Navbar (`--background`) = petróleo `#17313c` (oscuro) / papel `#f4f1e8` (claro). Progresión frío→cálido: petróleo → azul → teal → óxido.

**Clases renombradas:** `.field-blue|paper|pink|ink|violet` → `.field-petrol|blue|teal|rust|paper`; `.riso-overprint` → `.overprint` (gradiente `azul → teal → rust → naranja`). Componentes tocados: `Hero`, `About`, `Projects`, `Contact`, `Footer`, `CookieBanner`, `ui/button.tsx` (`link` usa `text-accent-ink`).

**Por qué se añadió `--accent-ink`:** `text-primary` (naranja) como texto falla AA. Donde el diseño quería **texto de acento** (rol del Hero, CTA secundario delineado, línea destacada de Contact) se usa `--accent-ink`: oscuro `#8a4326` en tema claro, claro `#f0cba8` en oscuro. Verificado ≥4.5:1 en los 6 campos y ambos temas.

**Por qué teal/rust se profundizan en oscuro:** con los tonos exactos, el texto **secundario** (`muted`, mix 88% del fg) daba 4.38:1 (teal) y 4.15:1 (rust) — bajo AA. Se oscurecen levemente a `#1a5c6e` / `#8a4326`, subiendo a **5.55:1** / **5.34:1** manteniendo el tono. El naranja, el petróleo y el azul se usan exactos.

**Contraste (WCAG AA, calculado):** oscuro — papel sobre petróleo 12.1, azul 7.7, teal 6.6, óxido 6.4, tarjeta 10.5; `muted` 9.7 / 6.4 / 5.6 / 5.3; navbar `muted` 7.7. Claro — tintes pálidos con texto petróleo 8.6–10.5; `muted` 6.5–7.6. Botón naranja con `--primary-foreground` `#0a0a0a` = 4.5:1. Foco `--ring` = naranja (≥3:1 sobre petróleo).

**Verificación:** `npm run lint` ✅ (0/0) · `npx tsc --noEmit` ✅ · `GET http://localhost:3000` → **200** · CSS compilado contiene `.field-petrol`, `.field-rust`, `.overprint`, `--pal-orange`, `--accent-ink` · `npx impeccable detect src` → **exit 0** · `npx impeccable detect http://localhost:3000` → **exit 2 con 1 hallazgo** (solo `overused-font` de Instrument Sans, conocido y aceptado). Durante la implementación el detector detectó primero un `low-contrast 3.1:1 — texto #c35929 sobre #17313c` (el rol del Hero en `text-primary`); se corrigió introduciendo `--accent-ink`.

---

## Comandos útiles

```powershell
npm run dev        # levantar el dev server (puerto 3000)
npm run lint       # verificar lint
npx tsc --noEmit   # verificar tipos (TypeScript)
```

Verificar que el server responde (status 200 = OK):
```powershell
Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 30
```
Si responde 500, leer el body con:
```powershell
try { $r = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing; $r.Content } catch { $_.ErrorDetails.Message }
```
El mensaje de error real viene en `<template data-next-error-message="...">` del HTML.

Si el puerto 3000 ya está ocupado por el dev server, no hace falta levantarlo de nuevo; recarga la página (Ctrl+F5 si hay caché).

Escanear anti-patrones de diseño con Impeccable (no imprime nada = sin hallazgos):
```powershell
npx impeccable detect src/                   # escaneo estatico del codigo
npx impeccable detect http://localhost:3000  # escaneo del DOM renderizado (usa Edge/Chrome)
```
Codigos de salida: 0 = sin hallazgos, 2 = hay hallazgos, 1 = no se pudo escanear.
