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

## Comandos útiles

```powershell
npm run dev        # levantar el dev server (puerto 3000)
npm run lint       # verificar lint
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
