"use client"

import { useState } from "react"
import { X } from "lucide-react"

const categories = ["Todos", "Cortes", "Coloración", "Peinados", "Barba"]

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=800&fit=crop", category: "Cortes", alt: "Corte moderno" },
  { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop", category: "Coloración", alt: "Balayage" },
  { src: "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=600&h=800&fit=crop", category: "Peinados", alt: "Peinado de salón" },
  { src: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&h=600&fit=crop", category: "Cortes", alt: "Corte degradado" },
  { src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=800&fit=crop", category: "Coloración", alt: "Mechas" },
  { src: "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=600&h=600&fit=crop", category: "Peinados", alt: "Recogido" },
  { src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&h=800&fit=crop", category: "Barba", alt: "Arreglo de barba" },
  { src: "https://images.unsplash.com/photo-1634302089678-8d61f8ee99fa?w=600&h=600&fit=crop", category: "Cortes", alt: "Corte tijera" },
  { src: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&h=800&fit=crop", category: "Coloración", alt: "Tinte global" },
]

export default function GalleryPage() {
  const [filter, setFilter] = useState("Todos")
  const [selected, setSelected] = useState<{ src: string; alt: string } | null>(null)

  const filtered = filter === "Todos" ? galleryImages : galleryImages.filter((img) => img.category === filter)

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="text-sm font-medium text-gold uppercase tracking-[0.2em] mb-3">Galería</p>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-primary">
            Nuestros trabajos
          </h1>
          <p className="text-accent mt-3 max-w-lg">
            Cada corte, color y peinado es único. Aquí algunos de los momentos que hemos creado.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-start mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === cat
                  ? "bg-gold text-primary"
                  : "border border-border text-accent hover:border-gold hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-accent py-16">No hay imágenes en esta categoría.</p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filtered.map((img, i) => (
              <div
                key={i}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setSelected(img)}
              >
                <div className="relative p-[3px] bg-gradient-to-br from-gold to-gold-light/60 rounded-sm">
                  <div className="relative overflow-hidden bg-bg">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-auto object-cover block"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_ease-in-out] transition-opacity duration-300 pointer-events-none" />
                  </div>
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold pointer-events-none" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-3 -right-3 z-10 bg-gold text-primary rounded-full p-2 hover:bg-gold-light transition-colors shadow-lg"
              onClick={() => setSelected(null)}
            >
              <X className="w-4 h-4" />
            </button>
            <div className="p-[3px] bg-gradient-to-br from-gold to-gold-light/60 rounded-sm">
              <img src={selected.src} alt={selected.alt} className="w-full h-auto block" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
