# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:

- **Hiring teams:** recruiters and technical leads evaluating Manuel for a developer role.
- **Freelance clients:** people or businesses in a specific trade looking for someone to build them a working tool.

Both arrive with little time and decide from the first screens whether the work is real and relevant to them.

## Product Purpose

Personal portfolio of Manuel Pernia, Full Stack Developer based in Granada, Spain. It shows shipped projects and turns interest into contact (form to his inbox, GitHub, LinkedIn). Success means a visitor understands within seconds what kind of problems he solves and has a clear path to reach him.

## Positioning

Manuel builds tools for trades he has practised himself. He is an FIVB volleyball coach (VolleyPlan, a game-plan tool for coaches) and has an electrical background: Técnico Superior Universitario en Electricidad, reached the final year of Electrical Engineering (CalcuVolt, electrical calculations under NEC and REBT). His focus going forward is sector tools: apps that solve a concrete problem of a real trade (sport, technical work, finance). A generic full-stack portfolio cannot truthfully claim this first-hand domain knowledge.

## Operating Context

- Bilingual site with real locale routes: English at `/`, Spanish at `/es`. Legal pages (`/privacidad`, `/cookies`) in both languages.
- GitHub and LinkedIn are shown on the contact board.
- Contact form sends to `manuelk211995@gmail.com` through Resend from the verified domain `manuelpernia.dev`, with consent checkbox, validation and honeypot.
- Dark theme only (forced): the site is a night scene.

## Capabilities and Constraints

- Stack: Next.js 16 (App Router, `src/app/[lang]`), React 19, Tailwind v4, deployed on Vercel. See `AGENTS.md` and `document.md` (project log, must be read before work and updated after every change).
- Projects (in this order today): Nivel 60 (WoW Forever fan guide, live at nivel60.com), Economos (personal finance panel), CalcuVolt (electrical calculations), VolleyPlan (volleyball game plan; not open source, no public link yet).
- Projects render as banners on the castle and shields in the armory; the item card shows one project at a time, so more can be added without breaking the layout.
- SEO in place: sitemap, robots, hreflang, per-locale metadata, JSON-LD, OG image route.
- Undecided: CV download (no file provided yet).

## Brand Commitments

- Name: Manuel Pernia. Role line: "Full Stack Developer" / "Desarrollador Full Stack".
- Domain: manuelpernia.dev.

## Evidence on Hand

- Real screenshots: Nivel 60 (`public/nivel60-*.jpg`), Economos (`public/economos-portada.jpg`, `public/economos-mercados.jpg`), VolleyPlan (`public/game-plan-voleibol-1.png`, `-2.png`).
- CalcuVolt still uses an AI-generated mockup (`public/calcuvolt-v2.png`); real screenshots are pending.
- Demo videos for Economos and CalcuVolt in `public/`.
- No testimonials, client names, metrics, years of experience or certifications beyond what is stated here. Do not invent any.

## Product Principles

1. Lead with real, shipped work; every claim must be backed by a project or a fact the user confirmed.
2. Make the trade knowledge visible: the projects come from domains he has worked in, not from tutorials.
3. Serve both audiences in the first screens: what he builds, proof it works, how to contact him.
4. Keep both languages equal in quality and content.
