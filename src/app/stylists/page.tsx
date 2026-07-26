"use client"

import { useEffect, useState } from "react"
import { X, Calendar } from "lucide-react"
import { Stylist } from "@/lib/types"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

export default function StylistsPage() {
  const [stylists, setStylists] = useState<Stylist[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Stylist | null>(null)

  useEffect(() => {
    fetch("/api/stylists")
      .then((r) => r.json())
      .then((data) => { setStylists(data); setLoading(false) })
  }, [])

  if (loading) return <LoadingSpinner size="lg" />

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="text-sm font-medium text-gold uppercase tracking-[0.2em] mb-3">Equipo</p>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-primary">
            Nuestros Estilistas
          </h1>
          <p className="text-accent mt-3 max-w-lg">
            Las manos y la mirada detrás de cada transformación.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stylists.map((stylist) => (
            <div
              key={stylist.id}
              className="group bg-surface rounded-2xl border border-border p-8 text-center cursor-pointer hover:border-gold/30 transition-all duration-300"
              onClick={() => setSelected(stylist)}
            >
              <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-5 ring-2 ring-gold/20 group-hover:ring-gold/60 transition-all duration-300">
                <img
                  src={stylist.photo}
                  alt={stylist.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif font-semibold text-primary text-lg">{stylist.name}</h3>
              <p className="text-sm text-accent mt-1 mb-4">{stylist.specialty}</p>
              <p className="text-xs text-accent/50">{stylist.yearsExperience} años de experiencia</p>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-surface rounded-3xl max-w-md w-full p-10 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-4 right-4 text-accent hover:text-primary transition-colors"
              onClick={() => setSelected(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-5 ring-4 ring-gold/20">
                <img
                  src={selected.photo}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-serif font-semibold text-primary mb-1">{selected.name}</h2>
              <p className="text-sm text-gold font-medium mb-5">{selected.specialty}</p>
              <p className="text-sm text-accent leading-relaxed mb-6">{selected.bio}</p>
              <p className="text-xs text-accent/50 mb-8">{selected.yearsExperience} años de experiencia</p>
              <a
                href={`/book?stylist=${selected.id}`}
                className="inline-flex items-center justify-center gap-2 bg-gold text-primary px-6 py-3 rounded-xl text-sm font-medium hover:bg-gold-light transition-all duration-200 w-full"
              >
                <Calendar className="w-4 h-4" />
                Reservar con {selected.name.split(" ")[0]}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
