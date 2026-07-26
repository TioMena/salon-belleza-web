"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { setError("Completa todos los campos"); return }
    setSubmitting(true)
    setError("")
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setSent(true)
      setForm({ name: "", email: "", message: "" })
    } else {
      setError("Error al enviar. Intenta de nuevo.")
    }
    setSubmitting(false)
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <p className="text-sm font-medium text-gold uppercase tracking-[0.2em] mb-3">Contacto</p>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-primary">
            Estamos aquí para ti
          </h1>
          <p className="text-accent mt-3 max-w-lg">
            Escríbenos, llámanos o ven a conocernos. Te esperamos en Providencia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="bg-surface rounded-2xl border border-border p-8">
              <h3 className="font-serif font-semibold text-primary text-xl mb-6">Información</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-primary text-sm">Dirección</p>
                    <p className="text-sm text-accent">Av. Providencia 1234, Santiago, Chile</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-primary text-sm">Teléfono</p>
                    <p className="text-sm text-accent">+56 9 1234 5678</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-primary text-sm">Email</p>
                    <p className="text-sm text-accent">contacto@salonbelleza.cl</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-primary text-sm">Horarios</p>
                    <p className="text-sm text-accent">Lun - Vie: 9:00 - 20:00</p>
                    <p className="text-sm text-accent">Sáb: 9:00 - 18:00</p>
                    <p className="text-sm text-accent">Dom: Cerrado</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border h-64 bg-gold/5 flex items-center justify-center text-accent text-sm">
              <div className="text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-gold/30" />
                <p>Mapa interactivo aquí</p>
                <p className="text-xs text-accent/50">(Google Maps o Leaflet)</p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-surface rounded-2xl border border-border p-8">
              <h3 className="font-serif font-semibold text-primary text-xl mb-6">Envíanos un mensaje</h3>
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-gold" />
                  </div>
                  <h4 className="font-serif font-semibold text-primary text-lg mb-2">Mensaje enviado</h4>
                  <p className="text-sm text-accent">Gracias por contactarnos. Te responderemos pronto.</p>
                  <Button className="mt-6 bg-gold text-primary hover:bg-gold-light" onClick={() => setSent(false)}>Enviar otro</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input label="Nombre" id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <Input label="Email" id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  <div className="space-y-1">
                    <label htmlFor="message" className="block text-sm font-medium text-primary">Mensaje</label>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-primary text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold resize-none transition-all"
                      placeholder="Cuéntanos en qué podemos ayudarte..."
                    />
                  </div>
                  {error && <p className="text-error text-sm">{error}</p>}
                  <Button type="submit" loading={submitting} className="bg-gold text-primary hover:bg-gold-light">
                    <Send className="w-4 h-4" />
                    Enviar Mensaje
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
