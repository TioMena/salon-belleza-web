# Salón Belleza Web

Sitio web para salón de belleza con reserva de citas online. Creado con Next.js 16, TypeScript, Tailwind CSS v4.

## Funcionalidades

- **Home** — Hero, servicios destacados, equipo, testimonios
- **Estilistas** — Perfiles con foto, especialidad, bio y modal de detalle
- **Servicios y Precios** — Listado completo agrupado por categoría con duración estimada
- **Galería** — Grid masonry con filtro por categoría
- **Reserva de Citas** — Wizard 4 pasos (Estilista → Servicio → Fecha/Hora → Datos del cliente), cálculo de horarios disponibles
- **Testimonios** — Grid de reseñas + formulario para agregar nuevas
- **Contacto** — Formulario de contacto e información del salón

## Arquitectura

- **Next.js 16** (App Router), páginas client-side (`"use client"`)
- **API routes simuladas** — datos en memoria (`src/lib/store.ts`), se pierden al reiniciar el servidor
- **Estilos:** Tailwind CSS v4 con tokens personalizados: `bg-primary`, `text-accent`, `bg-surface`, `border-border`
- **Iconos:** lucide-react
- **Fechas:** date-fns con locale español

## Comandos

```bash
npm run dev       # desarrollo (Turbopack)
npm run build     # build producción
npm run start     # servidor producción
npm run lint      # ESLint (next lint removido en v16)
```

## Estructura

```
src/
├── app/
│   ├── page.tsx            # Home
│   ├── layout.tsx          # Layout global (Navbar + Footer)
│   ├── book/               # Reserva
│   ├── stylists/           # Estilistas
│   ├── prices/             # Precios
│   ├── gallery/            # Galería
│   ├── testimonials/       # Testimonios
│   ├── contact/            # Contacto
│   └── api/                # API routes (stylists, services, appointments, testimonials, contact)
├── components/
│   ├── ui/                 # Button, Card, Input, StarRating, LoadingSpinner
│   ├── layout/             # Navbar, Footer
│   └── booking/            # BookingWizard (4 pasos)
├── lib/
│   ├── types.ts            # Interfaces TypeScript
│   └── store.ts            # Store en memoria
└── data/                   # Seed data (stylists, services, testimonials)
```

## Pendientes

- [ ] Agregar precios reales en CLP (`src/data/services.ts`, campo `price`)
- [ ] Fotos reales de estilistas y trabajos (reemplazar Unsplash placeholders)
- [ ] Logo del salón
- [ ] Migrar store a base de datos persistente (ej: Supabase, SQLite)

## Deploy

Requiere hosting con Node runtime:

| Plataforma | Comando / Config |
|---|---|
| **Vercel** | Conectar repo → deploy automático |
| **Railway** | Build: `npm run build`, Start: `npm start` |
| **Render** | Build: `npm run build`, Start: `npm start` |

No funciona en hostings estáticos (GitHub Pages, Netlify sin serverless).

## Repositorio

https://github.com/TioMena/salon-belleza-web
