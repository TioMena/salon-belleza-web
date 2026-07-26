"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

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
          <Link href="/" className="flex items-center gap-1.5 text-primary no-underline">
            <span className="text-xl sm:text-2xl font-serif font-semibold tracking-tight">Salón Belleza</span>
            <span className="text-gold text-lg leading-none">✦</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm text-accent hover:text-primary transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-4/5 hover:after:left-[10%]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="bg-gold text-primary px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gold-light transition-all duration-200"
            >
              Reservar Cita
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-primary hover:text-gold transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-primary">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-white/80 hover:text-gold transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book"
              className="block text-center bg-gold text-primary px-5 py-2.5 rounded-lg text-sm font-medium mt-4"
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
