export interface Stylist {
  id: string
  name: string
  photo: string
  specialty: string
  bio: string
  yearsExperience: number
}

export interface Service {
  id: string
  name: string
  description: string
  duration: number
  price: number
  category: "Corte y Peinado" | "Coloración" | "Tratamientos" | "Depilación" | "Complementarios"
}

export interface Appointment {
  id: string
  stylistId: string
  serviceId: string
  clientName: string
  clientPhone: string
  clientEmail: string
  date: string
  time: string
  status: "confirmed" | "cancelled" | "completed"
  createdAt: string
}

export interface Testimonial {
  id: string
  clientName: string
  clientPhoto?: string
  rating: number
  text: string
  date: string
}

export type BookingStep = 1 | 2 | 3 | 4

export interface BookingData {
  stylistId: string
  serviceId: string
  date: string
  time: string
  clientName: string
  clientPhone: string
  clientEmail: string
}
