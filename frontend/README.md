# Atlas EV — Intelligent EV Charging Assistant

**Frontend v1** — Landing, Login, Signup. No backend yet; forms are wired
with local state and simulated submit handlers so the flow is fully
navigable and demo-ready.

## Stack

- React 19
- Vite 6
- Tailwind CSS 3 (custom design tokens — see `tailwind.config.js`)
- React Router DOM 6
- Framer Motion 11 (page/section transitions, scroll reveals, signature route animation)
- Lucide React (icon set)

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build to /dist
npm run preview    # preview the production build
```

## Folder structure

```
src/
├── assets/               # static images/illustrations (currently none — all visuals are code-drawn)
├── components/
│   ├── common/            # Logo, GlowBackground, PasswordInput, Stepper, ScrollToTop
│   ├── layout/             # Navbar, Footer, MainLayout, AuthLayout, AuthVisualPanel
│   └── landing/            # Hero, Features, HowItWorks, Statistics, Testimonials, CTABand
├── pages/                 # Landing.jsx, Login.jsx, Signup.jsx
├── routes/                # AppRoutes.jsx — route table
├── styles/                # index.css — Tailwind layers + reusable component classes
├── hooks/                 # reserved for v2 (data fetching, auth state)
├── utils/                 # reserved for v2
├── App.jsx
└── main.jsx
```

## Design system

Design tokens live in `tailwind.config.js` under `theme.extend` — the
"Charged Night" palette (deep navy/charcoal base + electric green accent),
Space Grotesk for display type, Inter for body, JetBrains Mono for data
numerals (scores, prices, ETAs). Reusable component classes (`.btn-primary`,
`.card`, `.input-field`, etc.) live in `src/styles/index.css` under
`@layer components`, so every page pulls from the same primitives instead
of one-off utility soup.

## What's intentionally deferred to v2

- Dashboard, Find Chargers, Station Details, Recommendation, Profile, Admin
  Dashboard — routed as design-only placeholders in the full spec, not
  built here per the v1 scope.
- Auth is client-side only (no API calls). `Login`/`Signup` simulate a
  network request with a timeout so the loading/disabled states are real.
- Google Maps integration, live data, and the recommendation engine are
  backend-dependent and out of scope for this pass.
