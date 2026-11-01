import type { Metadata } from "next"
import type { ReactNode } from "react"
import { defaultLocale, hasLocale, localePath, type Locale } from "@/lib/site"

const titleByLocale: Record<Locale, string> = {
  en: "Cookie Policy",
  es: "Política de Cookies",
}

const descriptionByLocale: Record<Locale, string> = {
  en: "Cookie Policy of Manuel Pernia's portfolio.",
  es: "Política de Cookies del portfolio de Manuel Pernia.",
}

const browserLinksByLocale: Record<Locale, { name: string; href: string }[]> = {
  en: [
    {
      name: "Google Chrome",
      href: "https://support.google.com/chrome/answer/95647?hl=en",
    },
    {
      name: "Mozilla Firefox",
      href: "https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox",
    },
    {
      name: "Microsoft Edge",
      href: "https://support.microsoft.com/en-us/edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use",
    },
    { name: "Safari", href: "https://support.apple.com/en-us/105082" },
  ],
  es: [
    {
      name: "Google Chrome",
      href: "https://support.google.com/chrome/answer/95647",
    },
    {
      name: "Mozilla Firefox",
      href: "https://support.mozilla.org/es/kb/borrar-cookies-eliminar-informacion-sitios-web",
    },
    {
      name: "Microsoft Edge",
      href: "https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
    },
    { name: "Safari", href: "https://support.apple.com/es-es/HT201265" },
  ],
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale
  return {
    title: titleByLocale[locale],
    description: descriptionByLocale[locale],
    alternates: {
      canonical: localePath(locale, "/cookies"),
      languages: {
        en: localePath("en", "/cookies"),
        es: localePath("es", "/cookies"),
        "x-default": localePath("en", "/cookies"),
      },
    },
  }
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4 text-muted-foreground">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  )
}

function BrowserLinks({ locale }: { locale: Locale }) {
  return (
    <ul className="list-disc space-y-2 pl-6">
      {browserLinksByLocale[locale].map(({ name, href }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:opacity-80"
          >
            {name}
          </a>
        </li>
      ))}
    </ul>
  )
}

function CookiesEs() {
  return (
    <>
      <Section title="1. ¿Qué son las cookies?">
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en tu
          dispositivo cuando visitas un sitio web. Sirven para recordar
          información sobre tu visita, como tus preferencias, para mejorar tu
          experiencia de navegación.
        </p>
      </Section>

      <Section title="2. Uso de cookies en este sitio web">
        <p>
          En la actualidad, este sitio web no utiliza cookies de seguimiento,
          analítica o publicidad de terceros. Solo se pueden utilizar cookies
          técnicas estrictamente necesarias para el correcto funcionamiento del
          sitio.
        </p>
        <p>
          En caso de que se añadan cookies en el futuro, se actualizará esta
          política para informarte de forma transparente sobre su uso.
        </p>
      </Section>

      <Section title="3. Tipos de cookies">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="text-foreground">Técnicas:</strong> necesarias
            para el funcionamiento básico del sitio web.
          </li>
          <li>
            <strong className="text-foreground">Preferencias:</strong> permiten
            recordar configuraciones como el tema claro/oscuro o el idioma.
          </li>
          <li>
            <strong className="text-foreground">Analíticas:</strong> recogen
            información anónima sobre el uso del sitio para mejorar su
            rendimiento.
          </li>
          <li>
            <strong className="text-foreground">Publicitarias:</strong>{" "}
            utilizadas para mostrar anuncios personalizados.
          </li>
        </ul>
      </Section>

      <Section title="4. ¿Cómo desactivar las cookies?">
        <p>
          Puedes configurar tu navegador para bloquear o eliminar las cookies
          en cualquier momento. A continuación, encontrarás enlaces a las
          instrucciones de los navegadores más utilizados:
        </p>
        <BrowserLinks locale="es" />
      </Section>

      <Section title="5. Modificaciones">
        <p>
          Esta Política de Cookies puede modificarse cuando sea necesario para
          adaptarse a cambios legislativos o técnicos. Te recomendamos
          revisarla periódicamente.
        </p>
        <p>Última actualización: 9 de octubre de 2026</p>
      </Section>
    </>
  )
}

function CookiesEn() {
  return (
    <>
      <Section title="1. What are cookies?">
        <p>
          Cookies are small text files stored on your device when you visit a
          website. They remember information about your visit, such as your
          preferences, to improve your browsing experience.
        </p>
      </Section>

      <Section title="2. Use of cookies on this website">
        <p>
          This website does not currently use third-party tracking, analytics
          or advertising cookies. Only technical cookies strictly necessary for
          the site to work properly may be used.
        </p>
        <p>
          If cookies are added in the future, this policy will be updated to
          inform you transparently about their use.
        </p>
      </Section>

      <Section title="3. Types of cookies">
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="text-foreground">Technical:</strong> required for
            the basic operation of the website.
          </li>
          <li>
            <strong className="text-foreground">Preferences:</strong> remember
            settings such as light/dark theme or language.
          </li>
          <li>
            <strong className="text-foreground">Analytics:</strong> collect
            anonymous information about how the site is used to improve its
            performance.
          </li>
          <li>
            <strong className="text-foreground">Advertising:</strong> used to
            show personalized ads.
          </li>
        </ul>
      </Section>

      <Section title="4. How to disable cookies">
        <p>
          You can set your browser to block or delete cookies at any time.
          Below are links to the instructions for the most widely used
          browsers:
        </p>
        <BrowserLinks locale="en" />
      </Section>

      <Section title="5. Changes">
        <p>
          This Cookie Policy may be changed when necessary to reflect legal or
          technical changes. We recommend that you review it periodically.
        </p>
        <p>Last updated: October 9, 2026</p>
      </Section>
    </>
  )
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale: Locale = hasLocale(lang) ? lang : defaultLocale
  return (
    <div className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold md:text-4xl">
          {titleByLocale[locale]}
        </h1>
        <div className="space-y-8">
          {locale === "es" ? <CookiesEs /> : <CookiesEn />}
        </div>
      </div>
    </div>
  )
}
