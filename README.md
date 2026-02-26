# @nomideusz/svelte-calendar

A themeable, pluggable **Svelte 5** calendar component library with **Day** and **Week** views — ready for yoga studios, tour bookings, concerts, language schools, and more.

## Views — Concept-Paired

Views are organised into **concepts** that span both Day and Week granularity.
Switching between Day and Week preserves the active concept.

| Concept | Day View | Week View | Description |
|---------|----------|-----------|-------------|
| **Grid** | DayGrid | WeekGrid | The primary planner — time blocks on a scrollable grid. |
| **Timeline** | DayTimeline | — | Horizontal day timeline. Day-only. |
| **Agenda** | Agenda `mode="day"` | Agenda `mode="week"` | List / feed — Done, Now, Next (day) or grouped-by-day scroll (week). |
| **Heatmap** | — | WeekHeatmap | Density view — 24 cells per day showing busy/free intensity. Week-only. |
| **Schedule** | — | WeekSchedule | Zero-config weekly schedule display. Single import convenience wrapper. |

## Installation

```bash
pnpm add @nomideusz/svelte-calendar
```

> **Peer dependency:** Svelte 5 (`^5.0.0`)

## Quick Start

```svelte
<script lang="ts">
  import {
    Calendar,
    DayGrid,
    DayTimeline,
    Agenda,
    WeekGrid,
    WeekHeatmap,
    createMemoryAdapter,
    midnight,
  } from '@nomideusz/svelte-calendar';
  import type { CalendarView, TimelineEvent } from '@nomideusz/svelte-calendar';

  const events: TimelineEvent[] = [
    {
      id: '1', title: 'Yoga Flow',
      start: new Date('2025-03-01T09:00'), end: new Date('2025-03-01T10:00'),
      color: '#818cf8', subtitle: 'With Anna', tags: ['Beginner'],
    },
    {
      id: '2', title: 'Meditation',
      start: new Date('2025-03-01T12:00'), end: new Date('2025-03-01T12:45'),
      color: '#34d399',
    },
  ];

  // Adapters provide the data layer (in-memory, REST, etc.)
  const adapter = createMemoryAdapter(events);

  // Concepts are paired by label — switching Day↔Week preserves the concept
  const views: CalendarView[] = [
    { id: 'day-grid',     label: 'Grid',    granularity: 'day',  component: DayGrid },
    { id: 'week-grid',    label: 'Grid',    granularity: 'week', component: WeekGrid },
    { id: 'day-agenda',   label: 'Agenda',  granularity: 'day',  component: Agenda, props: { mode: 'day' } },
    { id: 'week-agenda',  label: 'Agenda',  granularity: 'week', component: Agenda, props: { mode: 'week' } },
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

## Recurring Weekly Schedules

Define a weekly schedule once — the adapter auto-projects it onto whatever week the calendar is viewing. No manual date math needed.

```svelte
<script lang="ts">
  import { Calendar, WeekGrid, createRecurringAdapter, neutral } from '@nomideusz/svelte-calendar';
  import type { CalendarView, RecurringEvent } from '@nomideusz/svelte-calendar';

  const schedule: RecurringEvent[] = [
    { id: '1', title: 'Morning Yoga',  dayOfWeek: 1, startTime: '07:00', endTime: '08:30', color: '#818cf8' },
    { id: '2', title: 'Pilates',       dayOfWeek: 3, startTime: '18:00', endTime: '19:00', color: '#f472b6' },
    { id: '3', title: 'Sound Bath',    dayOfWeek: 5, startTime: '19:00', endTime: '20:00', color: '#2dd4bf', subtitle: 'Crystal bowls', tags: ['Relaxing'] },
  ];

  const adapter = createRecurringAdapter(schedule);
  const views: CalendarView[] = [
    { id: 'week-grid', label: 'Grid', granularity: 'week', component: WeekGrid },
  ];
</script>

<Calendar {views} {adapter} defaultView="week-grid" theme={neutral} readOnly />
```

### RecurringEvent

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier |
| `title` | `string` | Event title |
| `dayOfWeek` | `1–7` | ISO weekday (1 = Monday … 7 = Sunday) |
| `startTime` | `string` | Start time in `"HH:MM"` format |
| `endTime` | `string` | End time in `"HH:MM"` format |
| `color` | `string?` | Accent color |
| `subtitle` | `string?` | Subtitle (rendered below title) |
| `tags` | `string[]?` | Tag pills |
| `category` | `string?` | Category for grouping / colorMap |
| `data` | `Record?` | Arbitrary payload |

## WeekSchedule — Zero-Config Convenience

One import, one component. Pre-wires adapter, views, and toolbar internally:

```svelte
<script>
  import { WeekSchedule } from '@nomideusz/svelte-calendar';
  import { neutral } from '@nomideusz/svelte-calendar';

  const schedule = [
    { id: '1', title: 'Yoga', dayOfWeek: 1, startTime: '07:00', endTime: '08:30', color: '#818cf8' },
    { id: '2', title: 'Pilates', dayOfWeek: 3, startTime: '18:00', endTime: '19:00', color: '#f472b6' },
  ];
</script>

<WeekSchedule {schedule} theme={neutral} locale="pl-PL" height={560} readOnly />
```

Works with concrete events too:

```svelte
<WeekSchedule events={myEvents} theme={neutral} height={560} />
```

## Read-Only Mode

Pass `readOnly` to disable drag, resize, and click-to-create interactions:

```svelte
<Calendar {views} {adapter} readOnly />
```

In read-only mode:
- Drag handles and resize affordances are disabled
- Empty-slot creation clicks are suppressed
- `oneventcreate` and `oneventmove` callbacks are not fired
- `oneventclick` still works for navigation/display purposes

## Visible Hours

Crop the grid to relevant hours — no more scrolling past empty early morning / late night rows:

```svelte
<!-- Only show 6 AM to 9 PM -->
<Calendar {views} {adapter} visibleHours={[6, 21]} />

<!-- Works on WeekSchedule too -->
<WeekSchedule {schedule} visibleHours={[7, 20]} />
```

The `visibleHours` prop is a `[startHour, endHour)` tuple. It applies to the WeekHeatmap grid cells and is passed through to all views.

## Subtitle & Tags on Events

`TimelineEvent` supports `subtitle` and `tags` fields — rendered automatically in **all views**:

```ts
const events: TimelineEvent[] = [
  {
    id: '1',
    title: 'Power Vinyasa',
    start: new Date('2025-03-01T10:00'),
    end: new Date('2025-03-01T11:15'),
    color: '#f472b6',
    subtitle: 'With Marco',           // shown below the title
    tags: ['Advanced', 'Hot'],         // rendered as small color pills
  },
];
```

- **subtitle** — secondary text below the title (all views: WeekGrid, DayGrid, DayTimeline, Agenda, EventBlock)
- **tags** — accent-colored pills after the title (all views)
- In space-constrained views (DayGrid, DayTimeline), subtitle/tags appear only when the event block is tall/wide enough

## Color Map & Auto-Coloring

Instead of setting `color` on every event, let the adapter assign colors by category or title:

```ts
// Explicit mapping
const adapter = createMemoryAdapter(events, {
  colorMap: {
    yoga: '#818cf8',
    wellness: '#34d399',
  },
});

// Auto-assign from a built-in 15-color vivid palette
const adapter = createMemoryAdapter(events, { autoColor: true });
```

### Theme-Aware Auto-Coloring

Pass the theme's accent hex to `autoColor` and the palette is generated to harmonize with your theme — colors rotate via golden-angle hue spacing from the accent, with lightness adjusted for dark/light backgrounds:

```ts
// Harmonious palette seeded from indigo accent
const adapter = createMemoryAdapter(events, { autoColor: '#6366f1' });

// Works with the recurring adapter too
const adapter = createRecurringAdapter(schedule, { autoColor: '#ef4444' });
```

| `autoColor` value | Behaviour |
|---|---|
| `true` | Original 15-color vivid palette (fixed, theme-independent) |
| `'#ef4444'` | Golden-angle hue rotation from that accent; lightness adapted to dark/light |

You can also use the palette generator directly:

```ts
import { generatePalette } from '@nomideusz/svelte-calendar';

generatePalette('#6366f1', 8);  // 8 theme-harmonious hex colors
generatePalette();               // default vivid 15-color palette
```

Both `createMemoryAdapter` and `createRecurringAdapter` accept `colorMap` and `autoColor` options. Events with an explicit `color` field always take priority.

## Settings Panel

The `Settings` component provides a theme picker and dynamic fields for controlling view parameters:

```svelte
<script lang="ts">
  import { Settings } from '@nomideusz/svelte-calendar';
  import type { SettingsField, PresetName } from '@nomideusz/svelte-calendar';

  let theme: PresetName = $state('midnight');
  let values = $state({ hourHeight: 60, elastic: true });

  const fields: SettingsField[] = [
    { key: 'hourHeight', label: 'Hour Height', type: 'range', min: 40, max: 120, step: 5 },
    { key: 'elastic', label: 'Elastic Compression', type: 'toggle' },
  ];
</script>

<Settings {fields} bind:values bind:theme />
```

## Themes

Five built-in presets — each view reads from the same `--dt-*` CSS custom property contract:

| Preset | Tone |
|--------|------|
| `midnight` | Dark (deep navy/slate, red accent) |
| `parchment` | Warm light (cream, burnt sienna accents) |
| `indigo` | Cool light (white surface, indigo accents) |
| `neutral` | **Site-friendly** — white/gray, blue accent, `inherit` fonts so it matches your site |
| `bare` | **Unstyled skeleton** — all `transparent`/`inherit`/`currentColor`, absorbs host styles entirely |

```svelte
<script>
  import { midnight, parchment, indigo, neutral, bare, presets } from '@nomideusz/svelte-calendar';
</script>

<!-- Blends into your site with no extra work -->
<Calendar {views} {adapter} theme={neutral} />

<!-- Or use the presets map -->
<WeekGrid style={presets['parchment']} events={events} />
```

### Matching Your Site

The `neutral` preset inherits font families from your page (`--dt-sans: inherit; --dt-serif: inherit`) and uses a standard blue accent. For most sites this is all you need.

If you need full control, start from `bare` — it sets everything to `transparent`/`inherit`/`currentColor` — then override only the tokens you care about:

```ts
import { bare } from '@nomideusz/svelte-calendar';

const myTheme = `
  ${bare}
  --dt-accent: #e11d48;
  --dt-bg: var(--my-app-surface);
  --dt-text: var(--my-app-text);
  --dt-border: var(--my-app-border);
`;
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

<details>
<summary><strong>Full token reference</strong></summary>

| Token | Purpose |
|-------|----------|
| `--dt-bg` | Main background |
| `--dt-surface` | Elevated surface (cards, popovers) |
| `--dt-border` | Default border |
| `--dt-border-day` | Day-column dividers |
| `--dt-text` | Primary text |
| `--dt-text-2` | Secondary text |
| `--dt-text-3` | Tertiary / muted text |
| `--dt-accent` | Accent color (buttons, now-indicator, highlights) |
| `--dt-accent-dim` | Accent at ~12% opacity |
| `--dt-glow` | Accent glow / focus ring |
| `--dt-today-bg` | Today column highlight |
| `--dt-btn-text` | Button label color |
| `--dt-scrollbar` | Scrollbar thumb |
| `--dt-success` | Success / completed indicator |
| `--dt-serif` | Serif font stack |
| `--dt-sans` | Sans-serif font stack |
| `--dt-mono` | Monospace font stack |
| `--dt-hm-empty` | Heatmap: empty cell |
| `--dt-hm-low` | Heatmap: low density |
| `--dt-hm-mid` | Heatmap: medium density |
| `--dt-hm-high` | Heatmap: high density |
| `--dt-hm-max` | Heatmap: maximum density |

</details>

## Accessibility

All interactive elements include proper ARIA attributes and keyboard support:

- **EventBlock** — `role="button"`, `aria-label` (title + time + duration + status), `tabindex="0"`, Enter/Space activates
- **EmptySlot** — `role="button"`, `aria-label` (time range + duration), keyboard-accessible for event creation
- **NowIndicator** — `role="status"`, `aria-live="polite"` announces the current time
- **Calendar** — `role="region"`, `aria-label="Calendar"`
- **Toolbar** — `aria-label="Calendar navigation"`
- Focus-visible outlines on all interactive primitives

## Locale & i18n

The calendar uses `Intl.DateTimeFormat` for all date/time formatting. Pass a BCP 47 locale tag to the `Calendar` shell:

```svelte
<Calendar {views} {adapter} locale="pl-PL" dir="rtl" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `locale` | `string` | `'en-US'` | BCP 47 tag — controls weekday names, month names, date formats |
| `dir` | `'ltr' \| 'rtl' \| 'auto'` | — | Text direction (for Arabic, Hebrew, etc.) |

The `locale` prop automatically switches between 12-hour and 24-hour time display based on the locale's hour cycle.

### Programmatic locale control

```ts
import { setDefaultLocale, getDefaultLocale, is24HourLocale } from '@nomideusz/svelte-calendar';

setDefaultLocale('de-DE');       // All formatting functions now use German
is24HourLocale('en-US');         // false (12h)
is24HourLocale('de-DE');         // true  (24h)
```

All formatting functions (`weekdayShort`, `monthLong`, `fmtDay`, `fmtWeekRange`, etc.) accept an optional `locale` parameter to override per-call.

## Timezones

Timezone utilities are included via `date-fns-tz`:

```ts
import {
  toZonedTime,
  fromZonedTime,
  nowInZone,
  formatInTimeZone,
} from '@nomideusz/svelte-calendar';

// Display a UTC date in a specific timezone
const nyTime = toZonedTime(utcDate, 'America/New_York');

// Convert back to UTC for storage
const utc = fromZonedTime(displayDate, 'America/New_York');

// Current time in Tokyo
const tokyoNow = nowInZone('Asia/Tokyo');

// Locale-aware formatting in a timezone
formatInTimeZone(date, 'Europe/Warsaw', { hour: 'numeric', minute: '2-digit' }, 'pl-PL');
// → "14:30"
```

The engine's `createViewState` also accepts a `timezone` option:

```ts
const viewState = createViewState({
  defaultView: 'week-grid',
  timezone: 'America/New_York',  // stored on viewState.timezone
});
```

## Architecture

```
src/lib/
├── core/          # Clock, time utils, locale, types
├── engine/        # Reactive state: event-store, view-state, selection, drag
├── adapters/      # Data layer: memory, recurring, REST adapters
├── primitives/    # Low-level UI atoms: NowIndicator, EventBlock, TimeGutter...
├── calendar/      # Calendar shell, Toolbar
├── views/         # View components (day/, week/, agenda/, schedule/, settings/)
└── theme/         # Preset themes and token definitions
```

## Engine

```ts
import {
  createEventStore,
  createViewState,
  createSelection,
  createDragState,
} from '@nomideusz/svelte-calendar';
```

- **`createEventStore(adapter)`** — reactive event list with fetch/add/update/remove
- **`createViewState(options)`** — current view, date range, navigation (prev/next/today)
- **`createSelection()`** — selected event tracking
- **`createDragState()`** — drag-to-create and drag-to-move state machine

## Adapters

| Adapter | Use |
|---------|-----|
| `createMemoryAdapter(events, options?)` | In-memory — great for demos and prototyping. Supports `colorMap` and `autoColor` (including theme-aware). |
| `createRecurringAdapter(schedule, options?)` | Weekly recurring schedules — auto-projects onto viewed weeks. Read-only. Supports `colorMap` and `autoColor`. |
| `createRestAdapter(options)` | Fetch from a REST API with configurable endpoints. |

## Standalone Views

Each view works independently without the Calendar shell:

```svelte
<!-- Horizontal day timeline -->
<DayTimeline style={midnight} events={events} />

<!-- Vertical day grid with elastic night compression -->
<DayGrid style={midnight} events={events} height={600} elastic />

<!-- Agenda in day mode -->
<Agenda mode="day" events={events} height={520} />

<!-- Week density heatmap -->
<WeekHeatmap style={parchment} events={events} height={320} />
```

## Embeddable Widget

Drop a single `<script>` tag into **any** HTML page — no Svelte, no build tools, no npm needed.

### From CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@nomideusz/svelte-calendar/widget/widget.js"></script>

<day-calendar
  api="https://myschool.com/api/events"
  theme="neutral"
  height="600"
></day-calendar>
```

That's it. Two lines.

### With inline events (no API)

```html
<script src="https://cdn.jsdelivr.net/npm/@nomideusz/svelte-calendar/widget/widget.js"></script>

<day-calendar
  theme="midnight"
  height="500"
  events='[
    { "id": "1", "title": "Yoga Flow", "start": "2025-03-01T09:00", "end": "2025-03-01T10:00", "color": "#818cf8" },
    { "id": "2", "title": "Meditation", "start": "2025-03-01T12:00", "end": "2025-03-01T12:45", "color": "#34d399" }
  ]'
></day-calendar>
```

### Widget attributes

| Attribute | Default | Description |
|-----------|---------|-------------|
| `api` | — | REST API base URL — fetches from `{api}/events?start=...&end=...` |
| `events` | — | JSON string of events (alternative to `api`) |
| `theme` | `neutral` | Preset: `midnight`, `parchment`, `indigo`, `neutral`, `bare` |
| `view` | `week-grid` | Default view: `day-grid`, `week-grid`, `day-timeline`, `day-agenda`, `week-agenda`, `week-heatmap` |
| `height` | `600` | Height in pixels |
| `locale` | — | BCP 47 locale (`en-US`, `pl-PL`, `ar-SA`, etc.) |
| `dir` | — | Text direction: `ltr`, `rtl`, `auto` |
| `mondaystart` | `true` | Start week on Monday (`true`/`false`) |
| `headers` | — | JSON string of HTTP headers for the REST adapter |

### REST API contract

When using the `api` attribute, the widget expects your endpoint to accept:

```
GET {api}/events?start={ISO}&end={ISO}
```

And return either:
- `[{ id, title, start, end, color? }, ...]`
- `{ events: [{ id, title, start, end, color? }, ...] }`

## Development

```bash
pnpm install
pnpm dev             # SvelteKit dev server (demo app)
pnpm check           # Type check
pnpm run package     # Build the library into dist/
pnpm run build:widget # Build standalone widget.js
```

## License

MIT
