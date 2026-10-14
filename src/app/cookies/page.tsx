import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Política de Cookies del portfolio de Manuel Pernia.",
  alternates: {
    canonical: "/cookies",
  },
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold md:text-4xl">
          Política de Cookies
        </h1>

        <section className="mb-8 space-y-4 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">
            1. ¿Qué son las cookies?
          </h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en tu
            dispositivo cuando visitas un sitio web. Sirven para recordar
            información sobre tu visita, como tus preferencias, para mejorar tu
            experiencia de navegación.
          </p>
        </section>

        <section className="mb-8 space-y-4 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">
            2. Uso de cookies en este sitio web
          </h2>
          <p>
            En la actualidad, este sitio web no utiliza cookies de seguimiento,
            analítica o publicidad de terceros. Solo se pueden utilizar cookies
            técnicas estrictamente necesarias para el correcto funcionamiento
            del sitio.
          </p>
          <p>
            En caso de que se añadan cookies en el futuro, se actualizará esta
            política para informarte de forma transparente sobre su uso.
          </p>
        </section>

        <section className="mb-8 space-y-4 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">
            3. Tipos de cookies
          </h2>
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
        </section>

        <section className="mb-8 space-y-4 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">
            4. ¿Cómo desactivar las cookies?
          </h2>
          <p>
            Puedes configurar tu navegador para bloquear o eliminar las cookies
            en cualquier momento. A continuación, encontrarás enlaces a las
            instrucciones de los navegadores más utilizados:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:opacity-80"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/es/kb/borrar-cookies-eliminar-informacion-sitios-web"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:opacity-80"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:opacity-80"
              >
                Microsoft Edge
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/es-es/HT201265"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:opacity-80"
              >
                Safari
              </a>
            </li>
          </ul>
        </section>

        <section className="space-y-4 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground">
            5. Modificaciones
          </h2>
          <p>
            Esta Política de Cookies puede modificarse cuando sea necesario para
            adaptarse a cambios legislativos o técnicos. Te recomendamos
            revisarla periódicamente.
          </p>
          <p>Última actualización: 9 de octubre de 2026</p>
        </section>
      </div>
    </div>
  )
}