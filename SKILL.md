---
name: context7-mcp
description: Esta habilidad debe usarse cuando el usuario pregunte sobre librerías, frameworks, referencias de API o necesite ejemplos de código. Se activa para preguntas de configuración, generación de código con librerías o menciones de frameworks específicos como React, Vue, Next.js, Prisma, Supabase, etc.
---

Cuando el usuario pregunte sobre librerías, frameworks o necesite ejemplos de código, usa Context7 para obtener documentación actualizada en lugar de depender de tus datos de entrenamiento.

## Cuándo Usar Esta Habilidad

Activa esta habilidad cuando el usuario:

- Haga preguntas de configuración o instalación ("¿Cómo configuro el middleware de Next.js?")
- Solicite código que involucre librerías ("Escribe una consulta de Prisma para...")
- Necesite referencias de API ("¿Cuáles son los métodos de autenticación de Supabase?")
- Mencione frameworks específicos (React, Vue, Svelte, Express, Tailwind, etc.)

## Cómo Obtener Documentación

### Paso 1: Resolver el ID de la Librería

Llama a `resolve-library-id` con:

- `libraryName`: El nombre de la librería extraído de la pregunta del usuario
- `query`: La pregunta completa del usuario (mejora la relevancia de los resultados)

### Paso 2: Seleccionar la Mejor Coincidencia

De los resultados de resolución, elige según:

- Coincidencia exacta o más cercana al nombre que el usuario preguntó
- Puntuaciones de referencia más altas indican mejor calidad de documentación
- Si el usuario mencionó una versión (ej. "React 19"), prefiere IDs específicos de versión

### Paso 3: Obtener la Documentación

Llama a `query-docs` con:

- `libraryId`: El ID de librería Context7 seleccionado (ej. `/vercel/next.js`)
- `query`: La pregunta específica del usuario

### Paso 4: Usar la Documentación

Incorpora la documentación obtenida en tu respuesta:

- Responde la pregunta del usuario usando información actual y precisa
- Incluye ejemplos de código relevantes de la documentación
- Cita la versión de la librería cuando sea relevante

## Directrices

- **Sé específico**: Pasa la pregunta completa del usuario como query para mejores resultados
- **Consciencia de versión**: Cuando los usuarios mencionen versiones ("Next.js 15", "React 19"), usa IDs de librería específicos de versión si están disponibles en el paso de resolución
- **Prefiere fuentes oficiales**: Cuando existan múltiples coincidencias, prefiere los paquetes oficiales/principales sobre forks comunitarios
