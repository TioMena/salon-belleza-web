"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Button from "@/components/ui/Button"
import StarRating from "@/components/ui/StarRating"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { Stylist, Service, Testimonial } from "@/lib/types"

export default function HomePage() {
  const [stylists, setStylists] = useState<Stylist[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/stylists").then((r) => r.json()),
      fetch("/api/services").then((r) => r.json()),
      fetch("/api/testimonials").then((r) => r.json()),
    ]).then(([s, sv, t]) => {
      setStylists(s)
      setServices(sv)
      setTestimonials(t)
      setLoading(false)
    })
  }, [])

  if (loading) return <LoadingSpinner size="lg" />

  const featuredServices = services.slice(0, 6)
  const categories = [...new Set(services.map((s) => s.category))]

  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[90vh] flex items-center px-4 pt-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-0 w-[40vw] h-[40vw] rounded-full bg-gold/5 blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-[30vw] h-[30vw] rounded-full bg-rose/5 blur-3xl" />
        </div>
        <div className="relative w-full max-w-6xl mx-auto">
          <div className="border-2 border-dashed border-gold/25 rounded-3xl p-8 sm:p-12 lg:p-16">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-3">
                <p className="text-sm font-medium text-gold uppercase tracking-[0.2em] mb-6">
                  Salón Boutique en Providencia
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-semibold text-primary leading-[1.08] tracking-tight">
                  Donde tu estilo
                  <br />
                  <span className="italic text-primary/60">cobra vida</span>
                </h1>
                <div className="flex items-center gap-3 my-8">
                  <span className="h-px w-12 bg-gold/60" />
                  <span className="text-gold text-lg">✦</span>
                  <span className="h-px w-12 bg-gold/60" />
                </div>
                <p className="text-accent text-base sm:text-lg max-w-md leading-relaxed">
                  Cortes, coloración, tratamientos y más. Un espacio para el cuidado personal en el corazón de Santiago.
                </p>
                <div className="flex items-center gap-4 flex-wrap mt-8">
                  <Link href="/book">
                    <Button className="bg-gold text-primary hover:bg-gold-light px-8 py-3 text-base font-medium">
                      Reservar Cita
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/prices">
                    <Button variant="outline" className="border-gold text-primary hover:bg-gold hover:text-primary px-8 py-3 text-base">
                      Ver Servicios
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
                <div className="relative">
                  <div className="w-48 h-48 rounded-full border-2 border-gold/30 flex items-center justify-center">
                    <span className="text-7xl font-serif font-light text-primary/10">✦</span>
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gold/10" />
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border border-gold/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Servicios ─── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-sm font-medium text-gold uppercase tracking-[0.2em] mb-3">Servicios</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-primary">
              Hechos a tu medida
            </h2>
            <p className="text-accent mt-3 max-w-lg">
              Desde un corte rápido hasta un tratamiento completo. Cada servicio con el tiempo y la atención que mereces.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-start mb-10">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/prices#${cat}`}
                className="px-4 py-1.5 rounded-full border border-border text-sm text-accent hover:border-gold hover:text-primary transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="group bg-surface rounded-2xl border border-border p-6 hover:border-gold/40 transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center mb-4 group-hover:border-gold/60 transition-colors">
                  <span className="text-gold text-xs">✦</span>
                </div>
                <h3 className="font-serif font-semibold text-primary text-lg mb-2">{service.name}</h3>
                <p className="text-sm text-accent leading-relaxed mb-4">{service.description}</p>
                <div className="flex items-center justify-between text-sm pt-3 border-t border-border/60">
                  <span className="text-accent/70">{service.duration} min</span>
                  <span className="font-medium text-gold">{service.price === 0 ? "Consultar" : `$${service.price.toLocaleString()}`}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/prices">
              <Button variant="outline" className="border-gold text-primary hover:bg-gold hover:text-primary">
                Ver Todos los Servicios
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Equipo ─── */}
      <section className="py-24 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-sm font-medium text-gold uppercase tracking-[0.2em] mb-3">Equipo</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-primary">
              Detrás de cada look
            </h2>
            <p className="text-accent mt-3 max-w-lg">
              Cuatro profesionales, cada uno con una especialidad. Todos con una obsesión compartida: que te vayas feliz.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stylists.map((stylist) => (
              <div key={stylist.id} className="group text-center">
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-5 ring-2 ring-gold/20 group-hover:ring-gold/60 transition-all duration-300">
                  <img
                    src={stylist.photo}
                    alt={stylist.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-serif font-semibold text-primary text-lg">{stylist.name}</h3>
                <p className="text-sm text-accent mt-1">{stylist.specialty}</p>
                <p className="text-xs text-accent/50 mt-2">{stylist.yearsExperience} años de experiencia</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/stylists">
              <Button variant="outline" className="border-gold text-primary hover:bg-gold hover:text-primary">
                Conocer al Equipo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Testimonios ─── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-sm font-medium text-gold uppercase tracking-[0.2em] mb-3">Testimonios</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-primary">
              Lo que dicen de nosotros
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-surface rounded-2xl border border-border p-6 flex flex-col">
                <div className="text-gold/30 text-4xl font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-sm text-primary/80 leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-4 pt-4 border-t border-border/60">
                  <StarRating rating={t.rating} />
                  <p className="font-medium text-sm text-primary mt-2">{t.clientName}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/testimonials">
              <Button variant="outline" className="border-gold text-primary hover:bg-gold hover:text-primary">
                Ver Todos los Testimonios
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
