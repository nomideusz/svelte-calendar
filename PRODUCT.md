# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Svelte developers evaluating whether to install `@nomideusz/svelte-calendar`. On svelte-calendar.xyz they want to see the views, try the props against their own use case (booking page, class timetable, embedded schedule), check that the calendar adapts to their page's theme, and copy the markup for the setup they landed on.

## Product Purpose
A themeable Svelte 5 calendar component: day/week Planner time grids, a multi-week Scroll view, Agenda lists, a Month grid and touch-first Mobile layouts, with drag-and-drop, recurring events, timezones, localized labels, RTL, a headless API and a web-component widget. Success on the demo = a developer reaches "this fits my case" and leaves with working code.

## Positioning
The `auto` theme probes the host page (background, fonts, accent, light/dark) and generates matching `--dt-*` tokens, so the calendar looks native on any page without a theme file. Views are built for schedules people read (studios, classes, bookings), not only for meeting grids.

## Operating Context
- Demo site: `src/routes` (`/` interactive demo, `/docs` reference), deployed on Vercel at svelte-calendar.xyz.
- The library is consumed in production by `apps/yoga` (szkolyjogi.pl), `apps/thebest` and `packages/svelte-scheduler`; yoga sets its own `--dt-*` tokens.
- Published on npm (1.0.x), MIT.

## Capabilities and Constraints
- Every `--dt-*` token name and every prop must keep working: the redesign of the calendar's default look ships as a minor version, so hosts that set their own tokens keep their look.
- Presets shipped: `auto` (inherit/probe), `neutral` (light), `midnight` (dark). Demo-only host themes live in `src/routes/theme.svelte.ts` and are not package presets.
- Inside the package: tokens only, no Tailwind, no hardcoded colors outside preset definitions.
- Demo functions to keep: view switching, prop playground, example setups ("recipes"), host-theme simulation, external drag source, action log, live code snippet, phone-frame preview.

## Evidence on Hand
- Seeded demo events relative to today (`src/routes/demo-events.ts`); a yoga-studio flavoured schedule.
- No testimonials, download counts or user logos exist; do not fabricate any.

## Product Principles
1. The calendar is the hero; the demo's chrome serves trying it, never competes with it.
2. Every control maps to a real prop and says so; nothing in the playground is fake.
3. Adapting to the host page is the core claim — show it, don't assert it.
4. Readable schedules over dense meeting grids.
