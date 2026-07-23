<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Framework

- **Next.js 16** — `params`/`searchParams` in page/layout props are Promises, use `await` or `use()`
- **Tailwind CSS v4** — no `tailwind.config.ts`. Config via `@theme inline` block in `src/app/globals.css`
- Custom color tokens: `bg-primary`, `text-primary-dark`, `text-accent`, `bg-surface`, `border-border`

## Commands

```bash
npm run dev      # dev server (Turbopack)
npm run build    # production build
npm run start    # start production server
npm run lint     # eslint — note: `next lint` was removed in v16
```

## Architecture

- **API routes are simulated** — store lives in `src/lib/store.ts` (in-memory Maps). All data resets on server restart.
- All pages are `"use client"` and fetch from `/api/*` endpoints
- Spanish locale (`lang="es"`, text in Spanish)
- Booking wizard: 4 steps (Stylist → Service → DateTime → Client Data) in `src/components/booking/BookingWizard.tsx`

## Data

- Prices in `src/data/services.ts` are `price: 0` — fill actual CLP values before going live
- Stylist photos and gallery images use Unsplash placeholders — replace with real images
- Services, stylists, and seed testimonials are hardcoded in `src/data/`
- Import alias: `@/*` maps to `src/*`

## ESLint

- Flat config (`eslint.config.mjs`), not legacy `.eslintrc.*`
