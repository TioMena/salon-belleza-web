import Link from "next/link"
import { Scissors, Globe, MapPin, Phone, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-4">
              <Scissors className="w-6 h-6" />
              <span>Salón Belleza</span>
            </div>
            <p className="text-gray-400 text-sm">
              Tu salón de belleza de confianza. Estilo moderno, resultados profesionales.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Enlaces</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <Link href="/stylists" className="block hover:text-white transition-colors">Estilistas</Link>
              <Link href="/prices" className="block hover:text-white transition-colors">Precios</Link>
              <Link href="/gallery" className="block hover:text-white transition-colors">Galería</Link>
              <Link href="/book" className="block hover:text-white transition-colors">Reservar Cita</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Horarios</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Lun - Vie: 9:00 - 20:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Sáb: 9:00 - 18:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Dom: Cerrado</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Av. Providencia 1234, Santiago</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+56 9 1234 5678</span>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <a href="#" className="hover:text-white transition-colors" aria-label="Redes sociales">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Salón Belleza. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
