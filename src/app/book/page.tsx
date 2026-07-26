import BookingWizard from "@/components/booking/BookingWizard"

export default function BookPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-sm font-medium text-gold uppercase tracking-[0.2em] mb-3">Reserva</p>
          <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-primary">
            Agenda tu visita
          </h1>
          <p className="text-accent mt-3 max-w-lg">
            Elige estilista, servicio, fecha y hora en 4 pasos. Fácil y sin registro.
          </p>
        </div>
        <BookingWizard />
      </div>
    </div>
  )
}
