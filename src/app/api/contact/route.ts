import { NextResponse } from "next/server"

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

const MAX_NAME = 100
const MAX_EMAIL = 254
const MAX_MESSAGE = 5000
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const clean = (value: unknown) => (typeof value === "string" ? value.trim() : "")

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { consent, hp_token: honeypot } = body as {
      consent?: unknown
      hp_token?: unknown
    }

    // Campo trampa: solo un bot lo rellena. Se responde exito sin enviar nada,
    // para que no sepa que fue detectado. Se registra para poder diagnosticar
    // un mensaje legitimo descartado.
    if (honeypot) {
      console.warn("Contact form: honeypot filled — message discarded")
      return NextResponse.json({ success: true })
    }

    // Los saltos de linea del nombre se quitan porque va en el asunto del correo.
    const name = clean(body.name).replace(/[\r\n]+/g, " ")
    const email = clean(body.email)
    const message = clean(body.message)

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    if (
      name.length > MAX_NAME ||
      email.length > MAX_EMAIL ||
      message.length > MAX_MESSAGE ||
      !EMAIL_PATTERN.test(email)
    ) {
      return NextResponse.json({ error: "Invalid fields" }, { status: 400 })
    }

    if (consent !== true) {
      return NextResponse.json(
        {
          error:
            "You must accept the Privacy Policy and the processing of your personal data",
        },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY

    if (!apiKey) {
      console.warn("RESEND_API_KEY not configured — contact form disabled")
      return NextResponse.json(
        { error: "Contact form is not configured yet" },
        { status: 501 }
      )
    }

    // Una clave de prueba no envia nada: en local simula el exito para poder
    // probar el formulario, pero en produccion debe verse como un error.
    if (apiKey.startsWith("re_test_")) {
      if (process.env.NODE_ENV !== "production") {
        return NextResponse.json({ success: true })
      }
      console.error("RESEND_API_KEY is a test key — no email was sent")
      return NextResponse.json(
        { error: "Contact form is not configured yet" },
        { status: 501 }
      )
    }

    const { Resend } = await import("resend")
    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <contacto@manuelpernia.dev>",
      to: "manuelk211995@gmail.com",
      replyTo: email,
      subject: `Portfolio Contact — ${escapeHtml(name)}`,
      html: `
        <h2>New message from portfolio</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message)}</p>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: "Error sending email" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
