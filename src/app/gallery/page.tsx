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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Galería de Trabajos</h1>
          <p className="text-accent max-w-xl mx-auto">
            Algunos de nuestros mejores trabajos. Cada corte, color y peinado es único.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-accent hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-accent py-12">No hay imágenes en esta categoría.</p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <div
                key={i}
                className="break-inside-avoid cursor-pointer rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all"
                onClick={() => setSelected(img)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-2 right-2 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70" onClick={() => setSelected(null)}>
              <X className="w-5 h-5" />
            </button>
            <img src={selected.src} alt={selected.alt} className="w-full h-auto rounded-xl" />
          </div>
        </div>
      )}
    </div>
  )
}
