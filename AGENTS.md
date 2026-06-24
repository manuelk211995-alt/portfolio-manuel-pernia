<!-- context7 -->
Usa Context7 MCP para obtener documentación actualizada siempre que el usuario pregunte sobre una librería, framework, SDK, API, herramienta CLI o servicio en la nube, incluso las conocidas como React, Next.js, Prisma, Express, Tailwind, Django o Spring Boot. Esto incluye sintaxis de API, configuración, migración de versiones, depuración específica de librerías, instrucciones de setup y uso de herramientas CLI. Úsalo incluso cuando creas saber la respuesta — tus datos de entrenamiento pueden no reflejar cambios recientes. Prefiere esto sobre búsqueda web para documentación de librerías.

No usar para: refactorización, escribir scripts desde cero, depurar lógica de negocio, revisión de código o conceptos generales de programación.

## Pasos

1. Empieza siempre con `resolve-library-id` usando el nombre de la librería y la pregunta del usuario, a menos que el usuario proporcione un ID exacto en formato `/org/project`
2. Elige la mejor coincidencia (formato ID: `/org/project`) por: coincidencia exacta de nombre, relevancia de descripción, cantidad de fragmentos de código, reputación de la fuente (High/Medium preferida) y puntuación de referencia (más alta es mejor). Si los resultados no parecen correctos, prueba nombres alternativos o reformula la pregunta. Usa IDs específicos de versión cuando el usuario mencione una versión
3. `query-docs` con el ID de librería seleccionado y la pregunta completa del usuario (no palabras sueltas)
4. Responde usando la documentación obtenida
<!-- context7 -->
