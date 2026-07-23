"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Scissors, Sparkles, Star, ArrowRight, Quote } from "lucide-react"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
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
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Estilo moderno, resultados profesionales</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Donde tu estilo
            <br />
            <span className="text-white/80">cobra vida</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-xl mx-auto">
            Cortes, coloración, tratamientos y más. Tu momento de belleza comienza aquí.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/book">
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-base">
                Reserva tu Cita
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/prices">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-base">
                Ver Servicios
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Nuestros Servicios</h2>
            <p className="text-accent max-w-xl mx-auto">
              Ofrecemos una amplia gama de servicios para el cuidado de tu cabello y belleza.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/prices#${cat}`}
                className="px-4 py-2 rounded-full border border-border text-sm text-accent hover:border-primary hover:text-primary transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <Card key={service.id} className="p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
                  <Scissors className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-primary mb-2">{service.name}</h3>
                <p className="text-sm text-accent mb-3">{service.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-accent">{service.duration} min</span>
                  <span className="font-semibold text-primary">{service.price === 0 ? "Consultar" : `$${service.price.toLocaleString()}`}</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/prices">
              <Button variant="outline">
                Ver Todos los Servicios
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Conoce a Nuestro Equipo</h2>
            <p className="text-accent max-w-xl mx-auto">
              Profesionales apasionados por hacer lucir tu mejor versión.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stylists.map((stylist) => (
              <Card key={stylist.id} className="p-6 text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 bg-gray-100">
                  <img
                    src={stylist.photo}
                    alt={stylist.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-semibold text-primary">{stylist.name}</h3>
                <p className="text-sm text-accent mb-2">{stylist.specialty}</p>
                <p className="text-xs text-accent/70">{stylist.yearsExperience} años de experiencia</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/stylists">
              <Button variant="outline">
                Conocer Más
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Lo Que Dicen Nuestros Clientes</h2>
            <p className="text-accent max-w-xl mx-auto">
              La satisfacción de nuestros clientes es nuestra mejor carta de presentación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <Card key={t.id} className="p-6" hover={false}>
                <Quote className="w-8 h-8 text-primary/20 mb-3" />
                <p className="text-sm text-primary mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={t.rating} />
                </div>
                <p className="font-medium text-sm text-primary">{t.clientName}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/testimonials">
              <Button variant="outline">
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
