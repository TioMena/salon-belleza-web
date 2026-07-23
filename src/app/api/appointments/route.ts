import { NextRequest, NextResponse } from "next/server"
import { addAppointment, getAppointments } from "@/lib/store"
import { Appointment } from "@/lib/types"

export async function GET() {
  const appointments = getAppointments()
  return NextResponse.json(appointments)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const { stylistId, serviceId, clientName, clientPhone, clientEmail, date, time } = body

  if (!stylistId || !serviceId || !clientName || !clientPhone || !clientEmail || !date || !time) {
    return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
  }

  const appointment: Appointment = {
    id: `apt-${Date.now()}`,
    stylistId,
    serviceId,
    clientName,
    clientPhone,
    clientEmail,
    date,
    time,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  }

  const saved = addAppointment(appointment)
  return NextResponse.json(saved, { status: 201 })
}
