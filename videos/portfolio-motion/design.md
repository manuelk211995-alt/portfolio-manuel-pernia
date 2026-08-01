---
instrucciones: |
  LEE ESTE DOCUMENTO COMPLETO antes de crear, modificar o renderizar cualquier
  vídeo de este proyecto. Este archivo es la fuente de verdad sobre la identidad
  visual, paleta, tipografía, estructura del portfolio y datos del proyecto.
  NO improvises colores, fuentes ni contenido. Todo debe extraerse de aquí.
---

# Design System — Manuel Pernia

## Identidad

| Campo        | Valor                                      |
| ------------ | ------------------------------------------ |
| Nombre       | Manuel Pernia                              |
| Rol          | Full Stack Developer                       |
| URL          | https://manuelpernia.dev                   |
| GitHub       | manuelk211995-alt                          |
| LinkedIn     | manuelpernia                               |
| Email        | manuelk211995@gmail.com                    |
| Ubicación    | Granada, España                            |

## Tagline

> I build modern, scalable web applications with cutting-edge technologies.
> Passionate about clean code, user experience, and problem solving.

---

## Paleta — Color Hunt (fuente: https://colorhunt.co/palette/0000002222221dcd9f169976)

| Hex       | Rol                        |
| --------- | -------------------------- |
| `#000000` | Negro principal (bg)       |
| `#222222` | Gris oscuro (card/muted)   |
| `#1DCD9F` | Verde menta (acento/CTA)   |
| `#169976` | Verde oscuro (acento var)  |

## Paleta — Dark Mode (usada en vídeo)

| Token               | Hex       | Descripción               |
| ------------------- | --------- | ------------------------- |
| `--background`      | `#000000` | Fondo principal           |
| `--foreground`      | `#e8e8e8` | Texto principal           |
| `--card`            | `#222222` | Superficie de tarjeta     |
| `--card-foreground` | `#e8e8e8` | Texto sobre card          |
| `--muted`           | `#222222` | Fondo secundario          |
| `--muted-foreground`| `#8a8f94` | Texto secundario          |
| `--border`          | `#333333` | Bordes                    |
| `--accent`          | `#1dcd9f` | Acento                    |
| `--ring`            | `#1dcd9f` | Focus ring                |
| `--primary`         | `#1dcd9f` | Primario (CTA, botones)   |
| `--primary-foreground`| `#000000`| Texto sobre primario      |

## Paleta — Light Mode

| Token               | Hex       | Descripción               |
| ------------------- | --------- | ------------------------- |
| `--background`      | `#f5f5f5` | Fondo principal           |
| `--foreground`      | `#000000` | Texto principal           |
| `--card`            | `#ffffff` | Superficie de tarjeta     |
| `--card-foreground` | `#000000` | Texto sobre card          |
| `--muted`           | `#e5e5e5` | Fondo secundario          |
| `--muted-foreground`| `#555555` | Texto secundario          |
| `--border`          | `#d4d4d4` | Bordes                    |
| `--accent`          | `#169976` | Acento                    |
| `--primary`         | `#1dcd9f` | Primario                  |
| `--primary-foreground`| `#000000`| Texto sobre primario      |

---

## Tipografía

| Rol       | Fuente              | Fallback           | Pesos      |
| --------- | ------------------- | ------------------ | ---------- |
| Sans      | Geist (variable)    | Inter, system-ui   | 400, 600, 800 |
| Mono      | Geist Mono          | JetBrains Mono     | 400, 500  |

- Tamaños headline: 64px-96px (vídeo), 36px-48px (mobile)
- Tamaños body: 14px-20px
- Letter-spacing headlines: -2px (tight)
- Letter-spacing subtítulos: 4px (uppercase)

---

## Radios

| Token         | Valor  |
| ------------- | ------ |
| `--radius-sm` | 0.3rem |
| `--radius-md` | 0.4rem |
| `--radius-lg` | 0.5rem |
| `--radius-xl` | 0.7rem |
| `--radius-2xl`| 0.9rem |
| `--radius-3xl`| 1.1rem |
| `--radius-4xl`| 1.3rem |

---

## Colores de Tecnologías

### Frontend

| Tecnología    | Hex       | Icono                           |
| ------------- | --------- | ------------------------------- |
| React         | `#61DAFB` | Atom icon                       |
| HTML5         | `#E34F26` | Shield/5                        |
| CSS3          | `#1572B6` | Shield/3                        |
| JavaScript    | `#F7DF1E` | JS cube                         |
| Bootstrap     | `#7952B3` | B icon                          |
| Tailwind CSS  | `#06B6D4` | Wind/feather icon               |

### Backend

| Tecnología | Hex       | Icono                    |
| ---------- | --------- | ------------------------ |
| Node.js    | `#5FA04E` | Node hexagon             |
| FastAPI    | `#009688` | Lightning bolt           |
| Python     | `#3776AB` | Python logo (blue+yellow)|
| Flask      | `#000000` | Flask silhouette         |

### Bases de Datos

| Tecnología  | Hex       | Icono              |
| ----------- | --------- | ------------------ |
| MySQL       | `#4479A1` | Database cylinder  |
| PostgreSQL  | `#4169E1` | Elephant head      |
| SQLite      | `#003B57` | Database chip      |

### Herramientas

| Tecnología | Hex       | Icono                |
| ---------- | --------- | -------------------- |
| Git        | `#F05032` | Git branch           |
| GitHub     | `#181717` | GitHub octocat       |
| Docker     | `#2496ED` | Docker whale         |
| VS Code    | `#007ACC` | Code bracket         |
| Postman    | `#FF6C37` | Postman eye          |

---

## Proyectos

| Proyecto           | Descripción                                                                    | Tags                                                | Código                                                          |
| ------------------ | ------------------------------------------------------------------------------ | --------------------------------------------------- | --------------------------------------------------------------- |
| **Economos**       | Panel de control financiero con tracking de activos, señales de trading, IA    | React, Flask, Python, PostgreSQL, Gemini AI         | https://github.com/manuelk211995-alt/Proyecto-Final-4Geeks      |
| **CalcuVolt**      | App de cálculo eléctrico profesional, PWA, modo oscuro, JWT, PDF por correo   | Python, FastAPI, React, TypeScript, PostgreSQL, Docker | https://github.com/manuelk211995-alt/CalcuVolt              |
| **Dashboard Analytics** | Dashboard interactivo con gráficos tiempo real y exportación             | React, D3.js, Express                               | —                                                              |

---

## Secciones del Portfolio

1. **Hero** — Nombre + rol + tagline + foto + GitHub/LinkedIn + CTAs
2. **About** — Párrafo profesional + Skills (4 categorías, 18 tecnologías)
3. **Projects** — 3 tarjetas de proyecto con imagen, descripción, tags, enlace
4. **Contact** — Email + ubicación + formulario de contacto (Resend API)
5. **Footer** — Copyright

---

## Animaciones del Portfolio Original

| Nombre        | Propósito                    | Keyframes/Duración                  |
| ------------- | ---------------------------- | ----------------------------------- |
| `reveal`      | Scroll-trigger fade-in-up    | opacity 0→1, translateY 30px→0, 0.7s |
| `float`       | Flotación suave de foto      | translateY 0→-12px→0, 6s e-in-out   |
| `pulse-ring`  | Anillo pulsante tras foto    | scale 1→1.08, opacity 0.2→0.1, 3s   |

---

## Estructura del Vídeo Promocional

- **Duración:** 10 segundos (5 escenas × 2s)
- **Formato:** 1920×1080, 30fps (o 60fps si se especifica)
- **Estilo:** SaaS moderno, fondo oscuro, tipografía limpia, animaciones fluidas
- **Narración:** Sin narración — motion-only

| # | Escena         | Tiempo | Contenido Visual                                                               |
| - | -------------- | ------ | ------------------------------------------------------------------------------ |
| 1 | **Hero**       | 0s-2s  | "Manuel Pernia" + "Full Stack Developer" + glow radial + línea acento           |
| 2 | **About**      | 2s-4s  | "About Me" texto + 6 tarjetas Frontend con iconos coloreados                   |
| 3 | **Skills**     | 4s-6s  | Backend (4) + Databases (3) con iconos y colores reales                        |
| 4 | **Projects**   | 6s-8s  | 3 project cards (Economos, CalcuVolt, Dashboard) con tags                      |
| 5 | **CTA**        | 8s-10s | "Manuel Pernia" + manuelpernia.dev + GitHub/LinkedIn + "Get in Touch"          |

---

## Reglas para Agentes IA

1. **Leer este documento completo** antes de tocar cualquier archivo de vídeo
2. **No improvisar colores** — usar exclusivamente los hex de esta paleta
3. **No improvisar contenido** — nombres, descripciones, tags y URLs exactas del portfolio
4. **Usar dark mode** para el vídeo (bg: #0a0a0a, fg: #f5f5f5)
5. **5 escenas de 2s cada una** = 10s total. No cambiar duraciones ni número de escenas
6. **Datos reales del proyecto** — no inventar tecnologías ni descripciones
7. **Iconos SVG inline** con los colores hex exactos de cada tecnología
