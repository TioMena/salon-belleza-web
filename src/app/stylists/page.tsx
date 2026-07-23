"use client"

import { useEffect, useState } from "react"
import { X, Calendar, Star } from "lucide-react"
import { Stylist } from "@/lib/types"
import Card from "@/components/ui/Card"
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Nuestros Estilistas</h1>
          <p className="text-accent max-w-xl mx-auto">
            Conoce al equipo de profesionales que harán brillar tu estilo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stylists.map((stylist) => (
            <Card
              key={stylist.id}
              className="p-6 text-center cursor-pointer"
              onClick={() => setSelected(stylist)}
            >
              <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 bg-gray-100 ring-2 ring-border">
                <img
                  src={stylist.photo}
                  alt={stylist.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="font-semibold text-primary text-lg">{stylist.name}</h3>
              <p className="text-sm text-accent mb-3">{stylist.specialty}</p>
              <div className="flex items-center justify-center gap-1 text-sm text-accent">
                <Star className="w-4 h-4" />
                <span>{stylist.yearsExperience} años exp.</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-accent hover:text-primary" onClick={() => setSelected(null)}>
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-100 ring-4 ring-primary/10">
                <img
                  src={selected.photo}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-1">{selected.name}</h2>
              <p className="text-accent mb-4">{selected.specialty}</p>
              <p className="text-sm text-primary/80 mb-6 leading-relaxed">{selected.bio}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-accent mb-6">
                <Star className="w-4 h-4" />
                <span>{selected.yearsExperience} años de experiencia</span>
              </div>
              <a
                href={`/book?stylist=${selected.id}`}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
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
