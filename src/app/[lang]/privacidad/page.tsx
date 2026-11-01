import type { Metadata } from "next"
import type { ReactNode } from "react"
import { defaultLocale, hasLocale, localePath, type Locale } from "@/lib/site"

const titleByLocale: Record<Locale, string> = {
  en: "Privacy Policy",
  es: "Política de Privacidad",
}

const descriptionByLocale: Record<Locale, string> = {
  en: "Privacy Policy and Personal Data Processing of Manuel Pernia's portfolio.",
  es: "Política de Privacidad y Tratamiento de Datos Personales del portfolio de Manuel Pernia.",
}

const linkClass = "underline underline-offset-4 hover:opacity-80"

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
      canonical: localePath(locale, "/privacidad"),
      languages: {
        en: localePath("en", "/privacidad"),
        es: localePath("es", "/privacidad"),
        "x-default": localePath("en", "/privacidad"),
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

function ContactEmail() {
  return (
    <a href="mailto:manuelk211995@gmail.com" className={linkClass}>
      manuelk211995@gmail.com
    </a>
  )
}

function ResendLink() {
  return (
    <a
      href="https://resend.com/"
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
    >
      Resend
    </a>
  )
}

function PrivacyEs() {
  return (
    <>
      <Section title="1. Responsable del tratamiento">
        <p>
          El responsable del tratamiento de los datos personales es Manuel
          Pernia, cuyo correo electrónico de contacto es <ContactEmail />.
        </p>
      </Section>

      <Section title="2. Finalidad del tratamiento">
        <p>
          Los datos personales que se recogen a través del formulario de
          contacto de este sitio web se tratarán exclusivamente para responder
          a la consulta o solicitud que nos hayas remitido.
        </p>
      </Section>

      <Section title="3. Datos tratados">
        <p>
          A través del formulario de contacto se recogen los siguientes datos
          obligatorios:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Nombre</li>
          <li>Correo electrónico</li>
          <li>Mensaje</li>
        </ul>
      </Section>

      <Section title="4. Base jurídica">
        <p>
          La base jurídica para el tratamiento de tus datos es tu
          consentimiento expreso, que prestas marcando la casilla de aceptación
          antes de enviar el formulario.
        </p>
      </Section>

      <Section title="5. Destinatarios">
        <p>
          Tus datos se enviarán a través del servicio de envío de correos
          electrónicos <ResendLink /> para poder gestionar y responder a tu
          mensaje. No se ceden tus datos a terceros para otras finalidades.
        </p>
      </Section>

      <Section title="6. Conservación">
        <p>
          Los datos personales se conservarán únicamente el tiempo necesario
          para atender y dar respuesta a tu solicitud. Pasado ese tiempo, serán
          eliminados o anonimizados cuando ya no resulten necesarios.
        </p>
      </Section>

      <Section title="7. Derechos">
        <p>
          En virtud de la normativa vigente en materia de protección de datos,
          puedes ejercitar los derechos de acceso, rectificación, supresión,
          oposición, limitación del tratamiento y portabilidad de tus datos
          personales.
        </p>
        <p>
          Para ejercitar estos derechos, puedes enviarnos un correo electrónico
          a <ContactEmail /> indicando el derecho que deseas ejercitar.
        </p>
      </Section>

      <Section title="8. Seguridad">
        <p>
          Adoptamos las medidas técnicas y organizativas necesarias para
          proteger tus datos personales frente a su alteración, pérdida,
          tratamiento o acceso no autorizados.
        </p>
      </Section>

      <Section title="9. Modificaciones">
        <p>
          Esta Política de Privacidad puede actualizarse en cualquier momento.
          Te recomendamos revisarla periódicamente. La fecha de la última
          actualización aparece en esta página.
        </p>
        <p>Última actualización: 9 de octubre de 2026</p>
      </Section>
    </>
  )
}

function PrivacyEn() {
  return (
    <>
      <Section title="1. Data controller">
        <p>
          The controller of your personal data is Manuel Pernia, who can be
          contacted by email at <ContactEmail />.
        </p>
      </Section>

      <Section title="2. Purpose of processing">
        <p>
          The personal data collected through this website&apos;s contact form
          will be processed solely to respond to the inquiry or request you
          have sent us.
        </p>
      </Section>

      <Section title="3. Data processed">
        <p>The contact form collects the following required data:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Name</li>
          <li>Email address</li>
          <li>Message</li>
        </ul>
      </Section>

      <Section title="4. Legal basis">
        <p>
          The legal basis for processing your data is your express consent,
          which you give by ticking the acceptance box before submitting the
          form.
        </p>
      </Section>

      <Section title="5. Recipients">
        <p>
          Your data will be sent through the email delivery service{" "}
          <ResendLink /> so that your message can be handled and answered. Your
          data is not shared with third parties for any other purpose.
        </p>
      </Section>

      <Section title="6. Retention">
        <p>
          Personal data will be kept only for as long as necessary to handle
          and respond to your request. After that, it will be deleted or
          anonymized once it is no longer needed.
        </p>
      </Section>

      <Section title="7. Your rights">
        <p>
          Under applicable data protection law, you may exercise your rights of
          access, rectification, erasure, objection, restriction of processing
          and portability of your personal data.
        </p>
        <p>
          To exercise these rights, you can email us at <ContactEmail />,
          stating which right you wish to exercise.
        </p>
      </Section>

      <Section title="8. Security">
        <p>
          We take the technical and organizational measures necessary to
          protect your personal data against unauthorized alteration, loss,
          processing or access.
        </p>
      </Section>

      <Section title="9. Changes">
        <p>
          This Privacy Policy may be updated at any time. We recommend that you
          review it periodically. The date of the latest update appears on this
          page.
        </p>
        <p>Last updated: October 9, 2026</p>
      </Section>
    </>
  )
}

export default async function PrivacidadPage({
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
          {locale === "es" ? <PrivacyEs /> : <PrivacyEn />}
        </div>
      </div>
    </div>
  )
}
