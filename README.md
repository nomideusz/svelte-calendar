# @svelte-calendar/core

A themeable, pluggable **Svelte 5** calendar component library with **Day** and **Week** views  ready for yoga studios, tour bookings, concerts, language schools, and more.

## Views — Concept-Paired

Views are organised into **concepts** that span both Day and Week granularity.
Switching between Day and Week preserves the active concept.

| Concept | Day View | Week View | Description |
|---------|----------|-----------|-------------|
| **Grid** | DayTimeline (horizontal) | WeekGrid (vertical) | The primary planner — time blocks on a scrollable grid. |
| **Agenda** | DayAgenda | WeekAgenda | List / feed — Done, Now, Next (day) or grouped-by-day scroll (week). |
| **Heatmap** | — | WeekHeatmap | Density view — 24 cells per day showing busy/free intensity. Week-only. |

## Installation

```bash
npm install @svelte-calendar/core
```

> **Peer dependency:** Svelte 5 (`^5.0.0`)

## Quick Start

```svelte
<script lang="ts">
  import {
    Calendar,
    DayTimeline,
    DayAgenda,
    WeekGrid,
    WeekAgenda,
    WeekHeatmap,
    createMemoryAdapter,
    midnight,
  } from '@svelte-calendar/core';
  import type { CalendarView, TimelineEvent } from '@svelte-calendar/core';

  const events: TimelineEvent[] = [
    { id: '1', title: 'Yoga Flow', start: new Date('2025-03-01T09:00'), end: new Date('2025-03-01T10:00'), color: '#818cf8' },
    { id: '2', title: 'Meditation', start: new Date('2025-03-01T12:00'), end: new Date('2025-03-01T12:45'), color: '#34d399' },
  ];

  // Adapters provide the data layer (in-memory, REST, etc.)
  const adapter = createMemoryAdapter(events);

  // Concepts are paired by label — switching Day↔Week preserves the concept
  const views: CalendarView[] = [
    { id: 'day-grid',     label: 'Grid',    granularity: 'day',  component: DayTimeline },
    { id: 'week-grid',    label: 'Grid',    granularity: 'week', component: WeekGrid },
    { id: 'day-agenda',   label: 'Agenda',  granularity: 'day',  component: DayAgenda },
    { id: 'week-agenda',  label: 'Agenda',  granularity: 'week', component: WeekAgenda },
    { id: 'week-heatmap', label: 'Heatmap', granularity: 'week', component: WeekHeatmap },
  ];
</script>

<Calendar
  {views}
  {adapter}
  defaultView="week-grid"
  theme={midnight}
  height={600}
  oneventclick={(ev) => console.log('clicked', ev.id)}
  oneventcreate={(range) => console.log('create', range.start, range.end)}
/>
```

## Themes

Three built-in presets  each view reads from the same `--dt-*` CSS custom property contract:

| Preset | Tone |
|--------|------|
| `midnight` | Dark (deep navy/slate) |
| `parchment` | Warm light (cream, amber accents) |
| `indigo` | Cool light (white surface, indigo accents) |

```svelte
<script>
  import { midnight, parchment, indigo, presets } from '@svelte-calendar/core';
</script>

<!-- Apply directly -->
<WeekGrid style={midnight} events={events} />

<!-- Or use the presets map -->
<WeekGrid style={presets['parchment']} events={events} />
```

### Custom Themes

Pass any string of `--dt-*` custom property declarations:

```ts
const custom = `
  --dt-bg: #0a0a0a;
  --dt-surface: #111;
  --dt-border: rgba(255,255,255,0.06);
  --dt-text: #e0e0e0;
  --dt-accent: #10b981;
  /* ...see presets.ts for the full token list */
`;
```

## Architecture

```
src/lib/
+-- core/          # Clock, time utils, locale, types
+-- engine/        # Reactive state: event-store, view-state, selection, drag
+-- adapters/      # Data layer: memory adapter, REST adapter
+-- primitives/    # Low-level UI atoms: NowIndicator, EventBlock, TimeGutter...
+-- calendar/      # Calendar shell, Toolbar
+-- views/         # The 6 view components (day/ + week/)
+-- theme/         # Preset themes and token definitions
```

## Engine

```ts
import {
  createEventStore,
  createViewState,
  createSelection,
  createDragState,
} from '@svelte-calendar/core';
```

- **`createEventStore(adapter)`**  reactive event list with fetch/add/update/remove
- **`createViewState(options)`**  current view, date range, navigation (prev/next/today)
- **`createSelection()`**  selected event tracking
- **`createDragState()`**  drag-to-create and drag-to-move state machine

## Adapters

| Adapter | Use |
|---------|-----|
| `createMemoryAdapter(events)` | In-memory  great for demos and prototyping |
| `createRestAdapter(options)` | Fetch from a REST API with configurable endpoints |

## Standalone Views

Each view works independently without the Calendar shell:

```svelte
<!-- Horizontal day timeline -->
<DayTimeline style={midnight} events={events} />

<!-- Vertical day grid with elastic night compression -->
<DayGrid style={midnight} events={events} height={600} elastic />

<!-- Week density heatmap -->
<WeekHeatmap style={parchment} events={events} height={320} />
```

## Development

```bash
npm install
npm run dev          # SvelteKit dev server (demo app)
npm run check        # Type check
npm run package      # Build the library into dist/
```

## License

MIT
