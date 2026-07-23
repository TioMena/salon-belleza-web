"use client"

import { useEffect, useState } from "react"
import { MessageSquare, Star } from "lucide-react"
import { Testimonial } from "@/lib/types"
import Card from "@/components/ui/Card"
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

  const load = () => {
    setLoading(true)
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => { setTestimonials(data); setLoading(false) })
  }

  useEffect(() => { load() }, [])

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
      load()
    } else {
      setError("Error al enviar. Intenta de nuevo.")
    }
    setSubmitting(false)
  }

  if (loading) return <LoadingSpinner size="lg" />

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Testimonios</h1>
          <p className="text-accent max-w-xl mx-auto mb-8">
            La opinión de nuestros clientes es lo más importante.
          </p>
          <Button onClick={() => setShowForm(!showForm)} variant="outline">
            <MessageSquare className="w-4 h-4" />
            {showForm ? "Cancelar" : "Dejar un Testimonio"}
          </Button>
        </div>

        {showForm && (
          <Card className="p-6 mb-10 max-w-lg mx-auto" hover={false}>
            <h3 className="font-semibold text-primary mb-4">Comparte tu experiencia</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                      <Star className={`w-6 h-6 ${n <= form.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
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
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Cuéntanos cómo fue tu experiencia..."
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" loading={submitting}>Enviar Testimonio</Button>
            </form>
          </Card>
        )}

        {testimonials.length === 0 ? (
          <p className="text-center text-accent py-12">No hay testimonios aún. ¡Sé el primero!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <Card key={t.id} className="p-6" hover={false}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-lg">
                    {t.clientName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-primary">{t.clientName}</p>
                    <StarRating rating={t.rating} />
                  </div>
                </div>
                <p className="text-sm text-primary/80 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <p className="text-xs text-accent mt-3">{t.date}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
