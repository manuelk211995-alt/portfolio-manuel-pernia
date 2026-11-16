---
version: 1
slug: "src-app-lang-page-tsx"
primary_target: "src/app/[lang]/page.tsx"
related_targets: []
---

# Home (`/` and `/es`)

Mode: Experience. Audience: hiring teams and freelance clients, equally (see PRODUCT.md). Job: understand within seconds what Manuel builds, see the real projects, reach him.

## Direction contract

THESIS: The portfolio is a night-time pixel-art fortress from an MMORPG: projects hang as heraldic banners on the castle wall and live in the armory as shields. It refuses the dark developer template (centered name, button, row of cards) and the "panel floating over a backdrop" layout: the whole page is the world.

OWN-WORLD: 4px pixel grid rendered crisp (image-rendering: pixelated). Ground #06050a night sky in dithered bands, blood-red moon #b3261e, black stone #24222d with mortar #16151d and moon-lit edges #3d2a35, roofs #3d1016, torchlight #ff8a2a. Rarity colours carry project status: legendary orange #ff8a1e (live), epic violet #9b45e0 (demo), rare blue #2f6fd6 (private). Pixelify Sans for headings and buttons, Silkscreen for labels and status, Schibsted Grotesk for every paragraph. Buttons are forged plates: inset bevel, 4px bottom lip, no rounded corners.

STORY: The visitor sees a castle, reads who Manuel is and his two trades (Full Stack, FIVB coach), sees four banners = four real projects, opens one in the armory to read its item card (status, stack, description, links), then finds the party board to contact him.

FIRST VIEWPORT: Full-bleed scene. Left column: name in Pixelify 96px with black outline and red glow, role line in Silkscreen red, one sentence, two plates (Enter the armory primary red, Find party secondary). Below the plates, the black knight in the foreground grass fights a slime every 6 s (wind-up, thin slash, pixel burst). Right two thirds: the castle with four clickable banners and their labels, nothing overlapping them.

FORM: User-pinned direction (MMORPG, pixel art, knights, dark and imposing), refined from the rolled hand's split-flap board the user liked. seed: 0b2403009015a10e. The user then pinned the world in their own words: "MMORPG, pixel art, caballeros, espadas, escudos", "colores oscuros, tenebrosidad, imponente, efectos pixel art", "el fondo todo sea la página web".

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Constraints

- Real content only: four projects, their descriptions, stacks, links and statuses; no invented stats.
- Projects must be readable at a glance and never covered by animation.
- Bilingual EN/ES with equal content. prefers-reduced-motion shows a still scene.
- Contact form keeps its validation, honeypot and Resend sending.
