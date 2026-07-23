import { NextRequest, NextResponse } from "next/server"
import { addContactMessage } from "@/lib/store"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, email, message } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Nombre, email y mensaje son requeridos" }, { status: 400 })
  }

  addContactMessage({
    name,
    email,
    message,
    date: new Date().toISOString(),
  })

  return NextResponse.json({ success: true, message: "Mensaje recibido correctamente" }, { status: 201 })
}
