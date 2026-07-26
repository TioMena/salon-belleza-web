"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"
import Link from "next/link"
import { Service } from "@/lib/types"
import Button from "@/components/ui/Button"
import LoadingSpinner from "@/components/ui/LoadingSpinner"

export default function PricesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => { setServices(data); setLoading(false) })
  }, [])

  if (loading) return <LoadingSpinner size="lg" />

  const categories = [...new Set(services.map((s) => s.category))] as Service["category"][]

  return (
    <div className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-14">
          <p className="text-sm font-medium text-gold uppercase tracking-[0.2em] mb-3">Precios</p>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-primary">
            Servicios y Precios
          </h1>
          <p className="text-accent mt-3 max-w-lg">
            Todos nuestros servicios con duración estimada. Los precios son referenciales — consúltanos para un presupuesto exacto.
          </p>
        </div>

        {categories.map((category) => {
          const catServices = services.filter((s) => s.category === category)
          return (
            <div key={category} id={category} className="mb-14">
              <h2 className="font-serif font-semibold text-2xl text-primary mb-6 flex items-center gap-3">
                <span className="w-6 h-px bg-gold/60" />
                {category}
              </h2>
              <div className="space-y-0 divide-y divide-border/60">
                {catServices.map((service) => (
                  <div
                    key={service.id}
                    className="py-4 flex items-start justify-between gap-4 group hover:bg-gold/[0.02] -mx-4 px-4 rounded-lg transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-primary text-sm sm:text-base">{service.name}</h3>
                      <p className="text-xs sm:text-sm text-accent/70 mt-0.5">{service.description}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-xs text-accent/50 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {service.duration} min
                      </span>
                      <span className="font-medium text-gold text-sm sm:text-base min-w-[70px] text-right">
                        {service.price === 0 ? "—" : `$${service.price.toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        <div className="text-center mt-12 pt-10 border-t border-border/60">
          <p className="text-sm text-accent mb-6">¿Lista para agendar?</p>
          <Link href="/book">
            <Button className="bg-gold text-primary hover:bg-gold-light px-8 py-3 text-base font-medium">
              Reservar una Cita
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
