import { NextRequest, NextResponse } from "next/server"
import { addTestimonial, getTestimonials } from "@/lib/store"
import { seedTestimonials } from "@/data/testimonials"
import { Testimonial } from "@/lib/types"

// Seed data on first call
let seeded = false

export async function GET() {
  if (!seeded) {
    seedTestimonials.forEach((t) => addTestimonial(t))
    seeded = true
  }
  const testimonials = getTestimonials()
  return NextResponse.json(testimonials)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { clientName, rating, text } = body

  if (!clientName || !rating || !text) {
    return NextResponse.json({ error: "Nombre, rating y texto son requeridos" }, { status: 400 })
  }

  const testimonial: Testimonial = {
    id: `test-${Date.now()}`,
    clientName,
    rating: Number(rating),
    text,
    date: new Date().toISOString().split("T")[0],
  }

  const saved = addTestimonial(testimonial)
  return NextResponse.json(saved, { status: 201 })
}
