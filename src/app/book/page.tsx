import BookingWizard from "@/components/booking/BookingWizard"

export default function BookPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary mb-4">Reserva tu Cita</h1>
          <p className="text-accent max-w-xl mx-auto">
            En 4 simples pasos agenda tu visita al salón.
          </p>
        </div>
        <BookingWizard />
      </div>
    </div>
  )
}
