import { Appointment, Testimonial } from "./types"

const appointments = new Map<string, Appointment>()
const testimonials = new Map<string, Testimonial>()
let contactMessages: { name: string; email: string; message: string; date: string }[] = []

export function addAppointment(a: Appointment): Appointment {
  appointments.set(a.id, a)
  return a
}

export function getAppointments(): Appointment[] {
  return Array.from(appointments.values())
}

export function getAppointmentsByDate(date: string): Appointment[] {
  return Array.from(appointments.values()).filter((a) => a.date === date)
}

export function addTestimonial(t: Testimonial): Testimonial {
  testimonials.set(t.id, t)
  return t
}

export function getTestimonials(): Testimonial[] {
  return Array.from(testimonials.values())
}

export function addContactMessage(msg: { name: string; email: string; message: string; date: string }): void {
  contactMessages.push(msg)
}

export function getContactMessages() {
  return contactMessages
}
