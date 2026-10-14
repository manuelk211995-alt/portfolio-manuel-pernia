import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de Privacidad y Tratamiento de Datos Personales del portfolio de Manuel Pernia.",
  alternates: {
    canonical: "/privacidad",
  },
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold md:text-4xl">
          Política de Privacidad
        </h1>

        <section className="mb-8 space-y-4 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">
            1. Responsable del tratamiento
          </h2>
          <p>
            El responsable del tratamiento de los datos personales es Manuel
            Pernia, cuyo correo electrónico de contacto es{" "}
            <a
              href="mailto:manuelk211995@gmail.com"
              className="underline underline-offset-4 hover:opacity-80"
            >
              manuelk211995@gmail.com
            </a>
            .
          </p>
        </section>

        <section className="mb-8 space-y-4 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">
            2. Finalidad del tratamiento
          </h2>
          <p>
            Los datos personales que se recogen a través del formulario de
            contacto de este sitio web se tratarán exclusivamente para responder
            a la consulta o solicitud que nos hayas remitido.
          </p>
        </section>

        <section className="mb-8 space-y-4 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">
            3. Datos tratados
          </h2>
          <p>
            A través del formulario de contacto se recogen los siguientes datos
            obligatorios:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Nombre</li>
            <li>Correo electrónico</li>
            <li>Mensaje</li>
          </ul>
        </section>

        <section className="mb-8 space-y-4 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">
            4. Base jurídica
          </h2>
          <p>
            La base jurídica para el tratamiento de tus datos es tu
            consentimiento expreso, que prestas marcando la casilla de
            aceptación antes de enviar el formulario.
          </p>
        </section>

        <section className="mb-8 space-y-4 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">
            5. Destinatarios
          </h2>
          <p>
            Tus datos se enviarán a través del servicio de envío de correos
            electrónicos{" "}
            <a
              href="https://resend.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:opacity-80"
            >
              Resend
            </a>{" "}
            para poder gestionar y responder a tu mensaje. No se ceden tus datos
            a terceros para otras finalidades.
          </p>
        </section>

        <section className="mb-8 space-y-4 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">
            6. Conservación
          </h2>
          <p>
            Los datos personales se conservarán únicamente el tiempo necesario
            para atender y dar respuesta a tu solicitud. Pasado ese tiempo,
            serán eliminados o anonimizados cuando ya no resulten necesarios.
          </p>
        </section>

        <section className="mb-8 space-y-4 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">
            7. Derechos
          </h2>
          <p>
            En virtud de la normativa vigente en materia de protección de datos,
            puedes ejercitar los derechos de acceso, rectificación, supresión,
            oposición, limitación del tratamiento y portabilidad de tus datos
            personales.
          </p>
          <p>
            Para ejercitar estos derechos, puedes enviarnos un correo
            electrónico a{" "}
            <a
              href="mailto:manuelk211995@gmail.com"
              className="underline underline-offset-4 hover:opacity-80"
            >
              manuelk211995@gmail.com
            </a>{" "}
            indicando el derecho que deseas ejercitar.
          </p>
        </section>

        <section className="mb-8 space-y-4 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">
            8. Seguridad
          </h2>
          <p>
            Adoptamos las medidas técnicas y organizativas necesarias para
            proteger tus datos personales frente a su alteración, pérdida,
            tratamiento o acceso no autorizados.
          </p>
        </section>

        <section className="space-y-4 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">
            9. Modificaciones
          </h2>
          <p>
            Esta Política de Privacidad puede actualizarse en cualquier momento.
            Te recomendamos revisarla periódicamente. La fecha de la última
            actualización aparece en esta página.
          </p>
          <p>Última actualización: 9 de octubre de 2026</p>
        </section>
      </div>
    </div>
  )
}