"use client"

import { useEffect, useState } from "react"
import { Clock, Scissors } from "lucide-react"
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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Servicios y Precios</h1>
          <p className="text-accent max-w-xl mx-auto">
            Todos nuestros servicios con su duración estimada. Consulta precios directamente con el salón.
          </p>
        </div>

        {categories.map((category) => {
          const catServices = services.filter((s) => s.category === category)
          return (
            <div key={category} id={category} className="mb-12">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                  <Scissors className="w-4 h-4 text-primary" />
                </span>
                {category}
              </h2>
              <div className="space-y-3">
                {catServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-surface rounded-xl border border-border p-5 flex items-center justify-between gap-4 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-primary">{service.name}</h3>
                      <p className="text-sm text-accent mt-0.5">{service.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-accent shrink-0">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration} min</span>
                    </div>
                    <div className="text-right shrink-0 min-w-[80px]">
                      <span className="font-semibold text-primary">
                        {service.price === 0 ? "—" : `$${service.price.toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        <div className="text-center mt-8">
          <Link href="/book">
            <Button className="px-8 py-3 text-base">
              Reservar una Cita
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
