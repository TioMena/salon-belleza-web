import { NextResponse } from "next/server"
import { services } from "@/data/services"

export async function GET() {
  await new Promise((r) => setTimeout(r, 300))
  return NextResponse.json(services)
}
