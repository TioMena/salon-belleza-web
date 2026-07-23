"use client"

import { useEffect, useState, useMemo } from "react"
import { Check, ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react"
import { Stylist, Service, BookingStep } from "@/lib/types"
import { stylists } from "@/data/stylists"
import { services } from "@/data/services"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { format, addDays, isBefore, startOfToday, parseISO } from "date-fns"
import { es } from "date-fns/locale"

const steps: { step: BookingStep; title: string }[] = [
  { step: 1, title: "Estilista" },
  { step: 2, title: "Servicio" },
  { step: 3, title: "Fecha y Hora" },
  { step: 4, title: "Tus Datos" },
]

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30",
]

export default function BookingWizard() {
  const [step, setStep] = useState<BookingStep>(1)
  const [stylistId, setStylistId] = useState("")
  const [serviceId, setServiceId] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [clientName, setClientName] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [appointments, setAppointments] = useState<{ date: string; time: string; stylistId: string }[]>([])
  const [confirmed, setConfirmed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/appointments")
      .then((r) => r.json())
      .then((data) => setAppointments(data))
  }, [])

  const selectedStylist = stylists.find((s) => s.id === stylistId)
  const selectedService = services.find((s) => s.id === serviceId)

  const nextDisabled = () => {
    if (step === 1) return !stylistId
    if (step === 2) return !serviceId
    if (step === 3) return !date || !time
    return false
  }

  const handleNext = () => {
    if (step < 4) setStep((step + 1) as BookingStep)
  }

  const handleBack = () => {
    if (step > 1) setStep((step - 1) as BookingStep)
  }

  const handleConfirm = async () => {
    if (!clientName || !clientPhone || !clientEmail) {
      setError("Completa todos los campos")
      return
    }
    setError("")
    setSubmitting(true)
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stylistId,
        serviceId,
        clientName,
        clientPhone,
        clientEmail,
        date,
        time,
      }),
    })
    if (res.ok) {
      setConfirmed(true)
    } else {
      setError("Error al reservar. Intenta de nuevo.")
    }
    setSubmitting(false)
  }

  const availableSlots = useMemo(() => {
    if (!date || !stylistId || !selectedService) return []
    const busy = appointments.filter(
      (a) => a.date === date && a.stylistId === stylistId
    )
    const busyTimes = busy.map((b) => b.time)
    const duration = selectedService.duration
    const slotsNeeded = Math.ceil(duration / 30)
    return TIME_SLOTS.filter((slot, i) => {
      if (busyTimes.includes(slot)) return false
      for (let j = 1; j < slotsNeeded; j++) {
        if (busyTimes.includes(TIME_SLOTS[i + j])) return false
      }
      return true
    })
  }, [date, stylistId, selectedService, appointments])

  const today = startOfToday()
  const next30Days = Array.from({ length: 30 }, (_, i) => addDays(today, i))

  if (confirmed) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-primary mb-3">Cita Confirmada</h2>
        <p className="text-accent mb-2">Tu reserva se ha realizado correctamente.</p>
        <div className="max-w-sm mx-auto bg-gray-50 rounded-xl p-5 mt-6 text-left space-y-2 text-sm">
          {selectedStylist && (
            <p><strong>Estilista:</strong> {selectedStylist.name}</p>
          )}
          {selectedService && (
            <p><strong>Servicio:</strong> {selectedService.name}</p>
          )}
          <p><strong>Fecha:</strong> {date ? format(parseISO(date), "EEEE d 'de' MMMM, yyyy", { locale: es }) : ""}</p>
          <p><strong>Hora:</strong> {time} hrs</p>
          <p><strong>Cliente:</strong> {clientName}</p>
        </div>
        <Button className="mt-8" onClick={() => { setStep(1); setStylistId(""); setServiceId(""); setDate(""); setTime(""); setClientName(""); setClientPhone(""); setClientEmail(""); setConfirmed(false) }}>
          Nueva Reserva
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        {steps.map((s, i) => (
          <div key={s.step} className="flex items-center flex-1">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step > s.step
                    ? "bg-primary text-white"
                    : step === s.step
                    ? "bg-primary text-white ring-4 ring-primary/20"
                    : "bg-gray-100 text-accent"
                }`}
              >
                {step > s.step ? <Check className="w-4 h-4" /> : s.step}
              </div>
              <span
                className={`text-sm hidden sm:inline ${
                  step === s.step ? "font-medium text-primary" : "text-accent"
                }`}
              >
                {s.title}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-px mx-3 ${
                  step > s.step ? "bg-primary" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Elige tu Estilista</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stylists.map((s) => (
              <Card
                key={s.id}
                className={`p-4 cursor-pointer ${
                  stylistId === s.id ? "ring-2 ring-primary border-primary" : ""
                }`}
                onClick={() => setStylistId(s.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 shrink-0">
                    <img src={s.photo} alt={s.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">{s.name}</p>
                    <p className="text-sm text-accent">{s.specialty}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Elige tu Servicio</h2>
          <div className="space-y-3">
            {services.map((s) => (
              <Card
                key={s.id}
                className={`p-4 cursor-pointer ${
                  serviceId === s.id ? "ring-2 ring-primary border-primary" : ""
                }`}
                onClick={() => setServiceId(s.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primary">{s.name}</p>
                    <p className="text-sm text-accent">{s.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-accent flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {s.duration} min
                    </p>
                    <p className="font-semibold text-primary">
                      {s.price === 0 ? "Consultar" : `$${s.price.toLocaleString()}`}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">Elige Fecha y Hora</h2>
          <p className="text-accent text-sm mb-6">
            {selectedService && `Duración estimada: ${selectedService.duration} minutos`}
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-primary mb-3">Fecha</label>
            <div className="flex flex-wrap gap-2">
              {next30Days.map((d) => {
                const dateStr = format(d, "yyyy-MM-dd")
                const dayName = format(d, "EEE", { locale: es })
                const dayNum = format(d, "d")
                const isWeekend = dayName === "sáb" || dayName === "dom"
                return (
                  <button
                    key={dateStr}
                    disabled={isWeekend}
                    onClick={() => { setDate(dateStr); setTime("") }}
                    className={`w-14 py-2 rounded-lg text-center text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                      date === dateStr
                        ? "bg-primary text-white"
                        : "bg-gray-50 text-primary hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-xs block text-accent">{dayName}</span>
                    <span className="font-medium">{dayNum}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {date && (
            <div>
              <label className="block text-sm font-medium text-primary mb-3">
                <Clock className="w-4 h-4 inline mr-1" />
                Horario
              </label>
              {availableSlots.length === 0 ? (
                <p className="text-sm text-accent">No hay horarios disponibles para esta fecha.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setTime(slot)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        time === slot
                          ? "bg-primary text-white"
                          : "bg-gray-50 text-primary hover:bg-gray-100 border border-border"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Tus Datos</h2>

          <div className="bg-gray-50 rounded-xl p-5 mb-6 space-y-1 text-sm">
            <p><strong>Estilista:</strong> {selectedStylist?.name}</p>
            <p><strong>Servicio:</strong> {selectedService?.name} ({selectedService?.duration} min)</p>
            <p><strong>Fecha:</strong> {date ? format(parseISO(date), "EEEE d 'de' MMMM, yyyy", { locale: es }) : ""}</p>
            <p><strong>Hora:</strong> {time} hrs</p>
          </div>

          <div className="space-y-4">
            <Input
              label="Nombre completo"
              id="name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <Input
              label="Teléfono"
              id="phone"
              type="tel"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
            />
            <Input
              label="Email"
              id="email"
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>
      )}

      <div className="flex items-center justify-between mt-8">
        <Button variant="ghost" onClick={handleBack} disabled={step === 1}>
          <ChevronLeft className="w-4 h-4" />
          Atrás
        </Button>

        {step < 4 ? (
          <Button onClick={handleNext} disabled={nextDisabled()}>
            Siguiente
            <ChevronRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleConfirm} loading={submitting}>
            Confirmar Reserva
            <Check className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
