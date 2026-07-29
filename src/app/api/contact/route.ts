import { NextResponse } from "next/server"

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
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

    const { Resend } = await import("resend")
    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "manuelk211995@gmail.com",
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
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
