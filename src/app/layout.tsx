import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Salón Belleza — Estilo y Elegancia",
  description: "Tu salón de belleza de confianza. Cortes, coloración, tratamientos y más. Reserva tu cita online.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col pt-16`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
