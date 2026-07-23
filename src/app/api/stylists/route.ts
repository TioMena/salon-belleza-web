import { NextResponse } from "next/server"
import { stylists } from "@/data/stylists"

export async function GET() {
  await new Promise((r) => setTimeout(r, 300))
  return NextResponse.json(stylists)
}
