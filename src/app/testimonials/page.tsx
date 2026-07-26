"use client"

import { useEffect, useState } from "react"
import { MessageSquare, Star } from "lucide-react"
import { Testimonial } from "@/lib/types"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import StarRating from "@/components/ui/StarRating"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ clientName: "", rating: 5, text: "" })
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => { setTestimonials(data); setLoading(false) })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.clientName || !form.text) { setError("Completa todos los campos"); return }
    setSubmitting(true)
    setError("")
    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setForm({ clientName: "", rating: 5, text: "" })
      setShowForm(false)
      fetch("/api/testimonials")
        .then((r) => r.json())
        .then((data) => setTestimonials(data))
    } else {
      setError("Error al enviar. Intenta de nuevo.")
    }
    setSubmitting(false)
  }

  if (loading) return <LoadingSpinner size="lg" />

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14">
          <p className="text-sm font-medium text-gold uppercase tracking-[0.2em] mb-3">Testimonios</p>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-primary">
            Lo que dicen de nosotros
          </h1>
          <p className="text-accent mt-3 max-w-lg">
            La opinión de nuestros clientes es lo más importante. ¿Quieres compartir tu experiencia?
          </p>
          <Button
            onClick={() => setShowForm(!showForm)}
            variant="outline"
            className="mt-6 border-gold text-primary hover:bg-gold hover:text-primary"
          >
            <MessageSquare className="w-4 h-4" />
            {showForm ? "Cancelar" : "Dejar un Testimonio"}
          </Button>
        </div>

        {showForm && (
          <div className="bg-surface rounded-2xl border border-border p-8 mb-12 max-w-lg mx-auto">
            <h3 className="font-serif font-semibold text-primary text-xl mb-6">Comparte tu experiencia</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Tu nombre"
                id="name"
                value={form.clientName}
                onChange={(e) => setForm({ ...form, clientName: e.target.value })}
              />
              <div className="space-y-1">
                <label className="block text-sm font-medium text-primary">Tu puntuación</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })}>
                      <Star className={`w-6 h-6 ${n <= form.rating ? "fill-gold text-gold" : "text-border"}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="text" className="block text-sm font-medium text-primary">Tu experiencia</label>
                <textarea
                  id="text"
                  rows={4}
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold resize-none transition-all"
                  placeholder="Cuéntanos cómo fue tu experiencia..."
                />
              </div>
              {error && <p className="text-error text-sm">{error}</p>}
              <Button type="submit" loading={submitting} className="bg-gold text-primary hover:bg-gold-light">
                Enviar Testimonio
              </Button>
            </form>
          </div>
        )}

        {testimonials.length === 0 ? (
          <p className="text-center text-accent py-16">No hay testimonios aún. ¡Sé el primero!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-surface rounded-2xl border border-border p-6 hover:border-gold/30 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center text-gold font-serif font-semibold text-base">
                    {t.clientName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-primary text-sm">{t.clientName}</p>
                    <StarRating rating={t.rating} />
                  </div>
                </div>
                <p className="text-sm text-primary/70 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <p className="text-xs text-accent/50 mt-3">{t.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
