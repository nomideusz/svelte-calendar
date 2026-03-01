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
  import { Calendar, createMemoryAdapter } from '@nomideusz/svelte-calendar';
  import type { TimelineEvent } from '@nomideusz/svelte-calendar';

  const events: TimelineEvent[] = [
    { id: '1', title: 'Yoga Flow', start: new Date('2025-03-01T09:00'), end: new Date('2025-03-01T10:00') },
    { id: '2', title: 'Meditation', start: new Date('2025-03-01T12:00'), end: new Date('2025-03-01T12:45') },
  ];

  const adapter = createMemoryAdapter(events);
</script>

<Calendar {adapter} height={600} />
```

That's it — built-in views (Day/Week Planner + Agenda), auto-coloring, and the `neutral` theme are all defaults.

## Calendar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `adapter` | `CalendarAdapter` | *required* | Data layer (memory, recurring, REST) |
| `views` | `CalendarView[]` | all 4 built-in | Registered view components |
| `view` | `string` | first view | Active view ID |
| `theme` | `string` | `neutral` | CSS theme string (`--dt-*` custom properties) |
| `height` | `number` | `600` | Total height in pixels |
| `locale` | `string` | `'en-US'` | BCP 47 locale tag |
| `dir` | `'ltr' \| 'rtl' \| 'auto'` | — | Text direction |
| `mondayStart` | `boolean` | `true` | Start week on Monday |
| `readOnly` | `boolean` | `false` | Disable drag, resize, and click-to-create |
| `visibleHours` | `[number, number]` | — | Crop grid to `[startHour, endHour)` |
| `initialDate` | `Date` | today | Date to focus on at mount |
| `snapInterval` | `number` | `15` | Drag snap in minutes |
| `oneventclick` | `(event) => void` | — | Event clicked |
| `oneventcreate` | `(range) => void` | — | New time range selected |
| `oneventmove` | `(event, start, end) => void` | — | Event dragged to new time |
| `onviewchange` | `(viewId) => void` | — | Active view changed |
| `event` | `Snippet<[TimelineEvent]>` | — | Custom event rendering |
| `empty` | `Snippet` | — | Empty state content |

## Built-in Views

Calendar ships with 4 views out of the box. Use the Day/Week pills to switch between modes:

| View | Day | Week | Description |
|------|-----|------|-------------|
| **Planner** | ✓ | ✓ | Time blocks on a scrollable grid |
| **Agenda** | ✓ | ✓ | List view — Done, Now, Next (day) or grouped-by-day (week) |

Switch views programmatically:

```svelte
<Calendar {adapter} view="day-agenda" />
```

Built-in view IDs: `day-planner`, `week-planner`, `day-agenda`, `week-agenda`.

## TimelineEvent

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier |
| `title` | `string` | Event title |
| `start` / `end` | `Date` | Time range |
| `color` | `string?` | Accent color (auto-assigned if omitted) |
| `category` | `string?` | For grouping — events with the same category share a color |
| `subtitle` | `string?` | Secondary text |
| `tags` | `string[]?` | Small accent-colored pills |
| `allDay` | `boolean?` | Render as an all-day event |
| `data` | `Record?` | Arbitrary payload |

## Auto-Coloring

Events without an explicit `color` are automatically assigned one from a vivid palette, grouped by `category` (or `title` if no category). No configuration needed — just omit `color`:

```ts
const events = [
  { id: '1', title: 'Yoga', category: 'wellness', start: ..., end: ... },
  { id: '2', title: 'Pilates', category: 'wellness', start: ..., end: ... },  // same color as Yoga
  { id: '3', title: 'Team Sync', start: ..., end: ... },                      // different color
];

const adapter = createMemoryAdapter(events);
```

Events with explicit `color` always take priority.

## Multi-day & All-day Events

Events that span multiple days or are flagged `allDay: true` are rendered in a
dedicated strip above timed events in every view:

```ts
const events: TimelineEvent[] = [
  // Explicit all-day flag
  { id: '1', title: 'Conference', start: new Date('2025-03-15'), end: new Date('2025-03-18'), allDay: true },
  // Auto-detected: starts at midnight and spans ≥ 24 h
  { id: '2', title: 'Sprint', start: new Date('2025-03-15T00:00'), end: new Date('2025-03-17T00:00') },
  // Overnight timed event — also renders in the all-day strip
  { id: '3', title: 'Hackathon', start: new Date('2025-03-15T18:00'), end: new Date('2025-03-16T06:00') },
];
```

Utility helpers are exported for custom views:

```ts
import { isAllDay, isMultiDay, segmentForDay } from '@nomideusz/svelte-calendar';

segmentForDay(event, dayTimestamp);
// → { ev, start, end, isStart, isEnd, dayIndex, totalDays, allDay } | null
```

## Recurring Schedules

```svelte
<script lang="ts">
  import { Calendar, createRecurringAdapter } from '@nomideusz/svelte-calendar';
  import type { RecurringEvent } from '@nomideusz/svelte-calendar';

  const schedule: RecurringEvent[] = [
    // Every Monday
    { id: '1', title: 'Morning Yoga', dayOfWeek: 1, startTime: '07:00', endTime: '08:30' },
    // Mon/Wed/Fri during semester
    { id: '2', title: 'Math', dayOfWeek: [1, 3, 5], startTime: '09:00', endTime: '10:00',
      startDate: '2025-09-01', until: '2025-12-15' },
    // Biweekly team sync
    { id: '3', title: 'Sync', frequency: 'weekly', interval: 2, dayOfWeek: 2,
      startTime: '14:00', endTime: '15:00', startDate: '2025-03-01' },
    // Daily standup, March only
    { id: '4', title: 'Standup', frequency: 'daily', startTime: '09:00', endTime: '09:15',
      startDate: '2025-03-01', until: '2025-03-31' },
    // Workshop — 8 Saturday sessions
    { id: '5', title: 'Workshop', dayOfWeek: 6, startTime: '10:00', endTime: '12:00',
      startDate: '2025-03-01', count: 8 },
    // Monthly review on the 15th
    { id: '6', title: 'Review', frequency: 'monthly', dayOfMonth: 15,
      startTime: '10:00', endTime: '11:00' },
  ];

  const adapter = createRecurringAdapter(schedule);
</script>

<Calendar {adapter} readOnly />
```

### RecurringEvent

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | `string` | *required* | Unique identifier |
| `title` | `string` | *required* | Event title |
| `startTime` | `string` | *required* | Start time `"HH:MM"` |
| `endTime` | `string` | *required* | End time `"HH:MM"` |
| `frequency` | `'daily' \| 'weekly' \| 'monthly'` | `'weekly'` | Recurrence frequency |
| `interval` | `number` | `1` | Repeat every N periods (e.g. `2` = biweekly) |
| `dayOfWeek` | `number \| number[]` | — | ISO weekday 1=Mon…7=Sun. Required for weekly. |
| `dayOfMonth` | `number` | `1` | Day of month (1–31). For monthly. |
| `startDate` | `string` | — | First occurrence `"YYYY-MM-DD"` |
| `until` | `string` | — | Last occurrence `"YYYY-MM-DD"` |
| `count` | `number` | — | Max occurrences from `startDate` |
| `color` | `string?` | — | Accent color (auto-assigned if omitted) |

## Localization (i18n)

All UI strings are configurable via the labels system:

```ts
import { setLabels, resetLabels, getLabels } from '@nomideusz/svelte-calendar';
import type { CalendarLabels } from '@nomideusz/svelte-calendar';

// Override any subset — unset keys stay English
setLabels({
  today: 'Heute',
  yesterday: 'Gestern',
  tomorrow: 'Morgen',
  day: 'Tag',
  week: 'Woche',
  now: 'jetzt',
  free: 'frei',
  allDay: 'Ganztägig',
  done: 'Erledigt',
  upNext: 'Als Nächstes',
  noEvents: 'Keine Termine',
  goToToday: 'Heute anzeigen',
  nMore: (n) => `+${n} weitere`,
  nEvents: (n) => `${n} Termin${n === 1 ? '' : 'e'}`,
});

// Reset to English
resetLabels();

// Read current labels
const labels = getLabels();
```

<details>
<summary><strong>Full label keys</strong></summary>

| Key | Default | Description |
|-----|---------|-------------|
| `today` | `'Today'` | Relative day label / nav button |
| `yesterday` | `'Yesterday'` | Relative day label |
| `tomorrow` | `'Tomorrow'` | Relative day label |
| `day` | `'Day'` | Mode pill |
| `week` | `'Week'` | Mode pill |
| `planner` | `'Planner'` | View label |
| `agenda` | `'Agenda'` | View label |
| `now` | `'now'` | Live indicator badge |
| `free` | `'free'` | Empty slot hint |
| `allDay` | `'All day'` | All-day event label |
| `done` | `'Done'` | Past section header |
| `upNext` | `'Up next'` | Upcoming section header |
| `until` | `'until'` | Time-until prefix |
| `noEvents` | `'No events'` | Empty day |
| `nothingScheduled` | `'Nothing scheduled'` | Empty state |
| `allDoneForToday` | `'All done for today'` | Completed state |
| `goToToday` | `'Go to today'` | Nav button aria |
| `previousDay` / `nextDay` | `'Previous day'` / `'Next day'` | Nav aria |
| `previousWeek` / `nextWeek` | `'Previous week'` / `'Next week'` | Nav aria |
| `calendar` | `'Calendar'` | Root region aria |
| `nMore(n)` | `` `+${n} more` `` | Overflow count |
| `nEvents(n)` | `` `${n} event(s)` `` | Event count aria |
| `nCompleted(n)` | `` `${n} completed` `` | Completed count |
| `dayNOfTotal(i, t)` | `` `day ${i} of ${t}` `` | Multi-day segment |
| `percentComplete(p)` | `` `${p}% complete` `` | Progress aria |

</details>

## Themes

| Preset | Description |
|--------|-------------|
| `neutral` | White/gray, blue accent, inherits fonts — **default** |
| `midnight` | Dark navy/slate, red accent |

```svelte
<Calendar {adapter} />              <!-- neutral (default) -->
<Calendar {adapter} theme={midnight} />  <!-- dark mode -->
```

Customize any token:

```ts
import { neutral } from '@nomideusz/svelte-calendar';

const myTheme = `
  ${neutral}
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

Drop into any HTML page — no build tools needed:

```html
<script src="https://cdn.jsdelivr.net/npm/@nomideusz/svelte-calendar/widget/widget.js"></script>

<day-calendar
  api="https://myschool.com/api/events"
  theme="neutral"
  height="600"
></day-calendar>
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
