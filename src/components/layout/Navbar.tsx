"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Scissors } from "lucide-react"

const links = [
  { href: "/", label: "Inicio" },
  { href: "/stylists", label: "Estilistas" },
  { href: "/prices", label: "Precios" },
  { href: "/gallery", label: "Galería" },
  { href: "/testimonials", label: "Testimonios" },
  { href: "/contact", label: "Contacto" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-primary font-bold text-lg">
            <Scissors className="w-6 h-6" />
            <span>Salón Belleza</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-accent hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Reservar Cita
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-accent hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="block text-center bg-primary text-white px-5 py-2 rounded-lg text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              Reservar Cita
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
