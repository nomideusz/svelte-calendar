# @nomideusz/svelte-calendar

A themeable **Svelte 5** calendar with **Day/Week Planner & Agenda** views.

## Installation

```bash
pnpm add @nomideusz/svelte-calendar
```

> Requires Svelte 5 (`^5.0.0`)

## Quick Start

```svelte
<script lang="ts">
  import {
    Calendar, Planner, Agenda,
    createMemoryAdapter, neutral,
  } from '@nomideusz/svelte-calendar';
  import type { CalendarView, TimelineEvent } from '@nomideusz/svelte-calendar';

  const events: TimelineEvent[] = [
    { id: '1', title: 'Yoga Flow', start: new Date('2025-03-01T09:00'), end: new Date('2025-03-01T10:00'), color: '#818cf8' },
    { id: '2', title: 'Meditation', start: new Date('2025-03-01T12:00'), end: new Date('2025-03-01T12:45'), color: '#34d399' },
  ];

  const adapter = createMemoryAdapter(events);

  const views: CalendarView[] = [
    { id: 'day-grid',   label: 'Planner', granularity: 'day',  component: Planner, props: { mode: 'day' } },
    { id: 'week-grid',  label: 'Planner', granularity: 'week', component: Planner, props: { mode: 'week' } },
    { id: 'day-agenda', label: 'Agenda',  granularity: 'day',  component: Agenda,  props: { mode: 'day' } },
    { id: 'week-agenda',label: 'Agenda',  granularity: 'week', component: Agenda,  props: { mode: 'week' } },
  ];
</script>

<Calendar
  {views}
  {adapter}
  defaultView="week-grid"
  theme={neutral}
  height={600}
  oneventclick={(ev) => console.log('clicked', ev.id)}
  oneventcreate={(range) => console.log('create', range)}
/>
```

## Calendar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `adapter` | `CalendarAdapter` | *required* | Data layer (memory, recurring, REST) |
| `views` | `CalendarView[]` | `[]` | Registered view components |
| `defaultView` | `string` | `'week-grid'` | Initial view ID |
| `theme` | `string` | `''` | CSS theme string (`--dt-*` custom properties) |
| `height` | `number` | `600` | Total height in pixels |
| `locale` | `string` | `'en-US'` | BCP 47 locale tag |
| `dir` | `'ltr' \| 'rtl' \| 'auto'` | - | Text direction |
| `mondayStart` | `boolean` | `true` | Start week on Monday |
| `readOnly` | `boolean` | `false` | Disable drag, resize, and click-to-create |
| `visibleHours` | `[number, number]` | - | Crop grid to `[startHour, endHour)` |
| `initialDate` | `Date` | today | Date to focus on at mount |
| `snapInterval` | `number` | `15` | Drag snap in minutes |
| `oneventclick` | `(event) => void` | - | Event clicked |
| `oneventcreate` | `(range) => void` | - | New time range selected |
| `oneventmove` | `(event, start, end) => void` | - | Event dragged to new time |
| `onviewchange` | `(viewId) => void` | - | Active view changed |
| `event` | `Snippet<[TimelineEvent]>` | - | Custom event rendering |
| `empty` | `Snippet` | - | Empty state content |

## TimelineEvent

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier |
| `title` | `string` | Event title |
| `start` / `end` | `Date` | Time range |
| `color` | `string?` | Accent color |
| `category` | `string?` | For grouping / colorMap |
| `subtitle` | `string?` | Secondary text |
| `tags` | `string[]?` | Small accent-colored pills |
| `data` | `Record?` | Arbitrary payload |

## Views

| Concept | Day | Week | Description |
|---------|-----|------|-------------|
| **Planner** | `mode="day"` | `mode="week"` | Time blocks on a scrollable grid |
| **Agenda** | `mode="day"` | `mode="week"` | List view - Done, Now, Next (day) or grouped-by-day (week) |
| **Schedule** | - | `WeekSchedule` | Zero-config weekly schedule display |

## Recurring Schedules

```svelte
<script lang="ts">
  import { Calendar, Planner, createRecurringAdapter, neutral } from '@nomideusz/svelte-calendar';
  import type { CalendarView, RecurringEvent } from '@nomideusz/svelte-calendar';

  const schedule: RecurringEvent[] = [
    { id: '1', title: 'Morning Yoga', dayOfWeek: 1, startTime: '07:00', endTime: '08:30', color: '#818cf8' },
    { id: '2', title: 'Pilates',      dayOfWeek: 3, startTime: '18:00', endTime: '19:00', color: '#f472b6' },
  ];

  const adapter = createRecurringAdapter(schedule);
  const views: CalendarView[] = [
    { id: 'week-grid', label: 'Planner', granularity: 'week', component: Planner, props: { mode: 'week' } },
  ];
</script>

<Calendar {views} {adapter} defaultView="week-grid" theme={neutral} readOnly />
```

## WeekSchedule - Zero Config

```svelte
<script>
  import { WeekSchedule, neutral } from '@nomideusz/svelte-calendar';

  const schedule = [
    { id: '1', title: 'Yoga', dayOfWeek: 1, startTime: '07:00', endTime: '08:30', color: '#818cf8' },
  ];
</script>

<WeekSchedule {schedule} theme={neutral} height={560} readOnly />
```

Also works with concrete events: `<WeekSchedule events={myEvents} theme={neutral} />`.

## Color Map & Auto-Coloring

```ts
// Explicit mapping
const adapter = createMemoryAdapter(events, { colorMap: { yoga: '#818cf8', wellness: '#34d399' } });

// Auto-assign from accent color
const adapter = createMemoryAdapter(events, { autoColor: '#6366f1' });

// Fixed vivid palette
const adapter = createMemoryAdapter(events, { autoColor: true });
```

Events with explicit `color` always take priority.

## Themes

| Preset | Description |
|--------|-------------|
| `neutral` | White/gray, blue accent, inherits fonts - **recommended** |
| `midnight` | Dark navy/slate, red accent |
| `bare` | Transparent/inherit - absorbs host styles |

```svelte
<Calendar {views} {adapter} theme={neutral} />
```

Override from `bare`:

```ts
const myTheme = `
  ${bare}
  --dt-accent: #e11d48;
  --dt-bg: var(--my-app-surface);
  --dt-text: var(--my-app-text);
`;
```

<details>
<summary><strong>Full token reference</strong></summary>

| Token | Purpose |
|-------|---------|
| `--dt-bg` | Main background |
| `--dt-surface` | Elevated surface |
| `--dt-border` | Default border |
| `--dt-border-day` | Day-column dividers |
| `--dt-text` | Primary text |
| `--dt-text-2` | Secondary text |
| `--dt-text-3` | Tertiary text |
| `--dt-accent` | Accent color |
| `--dt-accent-dim` | Accent at ~12% opacity |
| `--dt-glow` | Accent glow / focus ring |
| `--dt-today-bg` | Today column highlight |
| `--dt-btn-text` | Button label color |
| `--dt-scrollbar` | Scrollbar thumb |
| `--dt-success` | Completed indicator |
| `--dt-serif` / `--dt-sans` / `--dt-mono` | Font stacks |

</details>

## Embeddable Widget

Drop into any HTML page - no build tools needed:

```html
<script src="https://cdn.jsdelivr.net/npm/@nomideusz/svelte-calendar/widget/widget.js"></script>

<day-calendar
  api="https://myschool.com/api/events"
  theme="neutral"
  height="600"
></day-calendar>
```

## Standalone Views

```svelte
<Planner style={midnight} mode="day" events={events} height={600} />
<Agenda mode="day" events={events} height={520} />
```

## Development

```bash
pnpm install
pnpm dev             # SvelteKit dev server
pnpm check           # Type check
pnpm run package     # Build library
pnpm run build:widget # Build widget.js
```

## License

MIT
