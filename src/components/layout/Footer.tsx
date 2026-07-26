import Link from "next/link"
import { MapPin, Phone, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-1.5 mb-4">
              <span className="text-xl font-serif font-semibold tracking-tight">Salón Belleza</span>
              <span className="text-gold text-lg leading-none">✦</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              En el corazón de Providencia, un espacio dedicado al cuidado personal y la belleza con alma de oficio.
            </p>
          </div>

          <div>
            <h3 className="text-gold font-medium mb-5 text-sm uppercase tracking-widest">Enlaces</h3>
            <div className="space-y-3 text-sm text-white/60">
              <Link href="/stylists" className="block hover:text-gold transition-colors">Estilistas</Link>
              <Link href="/prices" className="block hover:text-gold transition-colors">Precios</Link>
              <Link href="/gallery" className="block hover:text-gold transition-colors">Galería</Link>
              <Link href="/book" className="block hover:text-gold transition-colors">Reservar Cita</Link>
            </div>
          </div>

          <div>
            <h3 className="text-gold font-medium mb-5 text-sm uppercase tracking-widest">Horarios</h3>
            <div className="space-y-3 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold/60" />
                <span>Lun - Vie: 9:00 - 20:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold/60" />
                <span>Sáb: 9:00 - 18:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold/60" />
                <span>Dom: Cerrado</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-gold font-medium mb-5 text-sm uppercase tracking-widest">Contacto</h3>
            <div className="space-y-3 text-sm text-white/60">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold/60 shrink-0 mt-0.5" />
                <span>Av. Providencia 1234, Santiago</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold/60" />
                <span>+56 9 1234 5678</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/30">
          &copy; {new Date().getFullYear()} Salón Belleza
        </div>
      </div>
    </footer>
  )
}
