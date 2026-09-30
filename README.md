# @nomideusz/svelte-calendar

[![npm](https://badgen.net/npm/v/@nomideusz/svelte-calendar)](https://www.npmjs.com/package/@nomideusz/svelte-calendar) [![license](https://badgen.net/badge/license/MIT/blue)](https://github.com/nomideusz/svelte-calendar/blob/main/LICENSE)

A themeable **Svelte 5** calendar: day and week **Planner** time grids, a multi-week **Scroll** view, **Agenda** lists, a **Month** grid and touch-first **Mobile** layouts — with drag-and-drop, timezones, a headless API, an embeddable web component, and a smart auto-theme that adapts to any page.

**[Live demo → svelte-calendar.xyz](https://svelte-calendar.xyz/)**

## Installation

```bash
pnpm add @nomideusz/svelte-calendar
```

Requirements:

- **Svelte `^5.29.0`** (peer dependency — the package uses attachments, `{@attach}`).
- Runtime dependencies (installed for you): `date-fns`, `date-fns-tz`, `@chenglou/pretext`.
- Node ≥ 22 is only needed to develop the package itself, not to use it.

## Quick Start

```svelte
<script>
  import { Calendar, createMemoryAdapter } from '@nomideusz/svelte-calendar';

  const adapter = createMemoryAdapter([
    { id: '1', title: 'Team Sync', start: new Date('2026-03-01T09:00'), end: new Date('2026-03-01T10:00') },
    { id: '2', title: 'Lunch',     start: new Date('2026-03-01T12:00'), end: new Date('2026-03-01T13:00') },
  ]);
</script>

<Calendar {adapter} />
```

That's it — 8 built-in views, auto-coloring, drag-and-drop with live previews, all out of the box. The default `auto` theme probes your page's background, accent color and fonts, so the calendar adapts to any design.

## Views

The default registry (`defaultViews`) holds eight views:

| View ID | Mode | What it is |
|---------|------|------------|
| `day-planner` | day | Vertical time grid, one column. **The default view** (first registered). |
| `week-planner` | week | The same time grid, one column per day (`days`, default 7). |
| `week-scroll` | week | Weeks stacked in one infinite vertical scroller (Hey-Calendar style): each chip sits at the height of its start time, month names run down the side. Drag to move, drop onto a day; it scrolls under a drag. |
| `day-agenda` | day | Live list for one day: now / up next / done. |
| `week-agenda` | week | List of the week's days (`columns` turns it into a timetable grid). |
| `day-mobile` | day | Touch-first time grid with swipe navigation. |
| `week-mobile` | week | Touch-first list of the week's days. |
| `month-grid` | month | Week-aligned month grid, chips per day with a "+N more" overflow. |

```svelte
<Calendar {adapter} view="week-planner" />
<Calendar {adapter} view="week-scroll" />
<Calendar {adapter} view="month-grid" />
```

Users switch with the built-in pills: **Day / Week / Month** for the mode, plus view-type pills (**Planner / Scroll / Agenda**) when a mode has more than one view. Hide them when your app controls the view (`view` stays reactive after mount):

```svelte
<Calendar {adapter} view="day-planner" showModePills={false} />
```

Planner views are designed for direct manipulation:

- **Move** — drag an event to another day or time; a ghost previews the target before the move commits.
- **Resize** — drag an event's top/bottom grip to change its duration; `minDuration`/`maxDuration` clamp the result.
- **Create** — press on empty canvas and sweep to draw a range, or click for a default-length slot. Both go through the same validation (blocked slots, disabled dates, `minDuration`/`maxDuration`) and then fire `oneventcreate`.
- **External drop** — an HTML5 drag from outside the calendar (a class chip, a template) dropped on the planner or `week-scroll` fires `onexternaldrop({ start, dataTransfer })`.

`week-scroll` supports move, click-to-create and external drops. In `week-agenda` with `columns` and an `oneventmove` handler, a card can be dragged to another day (it keeps its time of day); that move goes straight to `oneventmove` without writing the adapter.

The month grid shows up to three chips per day. Clicking a day or its "+N more" fires `ondayclick(date)`; without `ondayclick` it opens that date in a day view (the day view of the type you last used).

### Keyboard

When focus is inside the calendar:

- `t` — go to today.
- `←` / `→` — previous / next period (mirrored in RTL). Ignored while typing in a field or inside a pill group, where arrows move between pills.
- In `month-grid`: arrow keys move between days, `Enter` / `Space` opens the focused day (`ondayclick`).

### Custom Views

The `views` prop replaces the registry. Spread `defaultViews` to add your own view and keep the built-ins:

```svelte
<script lang="ts">
  import { Calendar, defaultViews, type CalendarView } from '@nomideusz/svelte-calendar';
  import KanbanDay from './KanbanDay.svelte';

  const views: CalendarView[] = [
    ...defaultViews,
    { id: 'day-kanban', label: 'Kanban', mode: 'day', component: KanbanDay, props: { columns: 3 } },
  ];
</script>

<Calendar {adapter} {views} view="day-kanban" />
```

A `CalendarView` is `{ id, label, mode: 'day' | 'week' | 'month', component, props? }`. `label` names the view-type pill; views sharing a label across modes are what the Day/Week/Month pills switch between.

The component receives `CalendarViewProps` (plus your `props`) — declare only the ones it uses:

| Prop | Type | Notes |
|------|------|-------|
| `events` | `TimelineEvent[]` | Everything loaded for the current range |
| `style` | `string` | The active `--dt-*` theme string |
| `height` | `number \| null` | Currently always `null` — size to the container |
| `mode` | `'day' \| 'week' \| 'month'` | |
| `mondayStart` | `boolean` | |
| `locale` | `string \| undefined` | |
| `focusDate` | `Date` | |
| `oneventclick` | `(event, anchor?: DOMRect) => void` | Selects the event and calls the host |
| `oneventcreate` | `((range) => void) \| undefined` | Already validated; `undefined` when `readOnly` or no host handler |
| `onexternaldrop` | `((info) => void) \| undefined` | |
| `readOnly` | `boolean` | |
| `visibleHours` | `[number, number] \| undefined` | |
| `selectedEventId` | `string \| null` | |

```svelte
<!-- KanbanDay.svelte -->
<script lang="ts">
  import { useCalendarContext, type CalendarViewProps } from '@nomideusz/svelte-calendar';

  let { events, oneventclick, columns = 3 }:
    Pick<CalendarViewProps, 'events' | 'oneventclick'> & { columns?: number } = $props();

  const ctx = useCalendarContext(); // viewState, drag, labels, config…
</script>

<h3>{ctx.labels.today}</h3>
{#each events as ev (ev.id)}
  <button onclick={() => oneventclick(ev)}>{ev.title}</button>
{/each}
```

`useCalendarContext()` (type `CalendarContext`) gives a view the running Calendar's engines and config: `viewState`, `drag`, `commitDrag`, `labels`, `readOnly`, `snapInterval`, `minColumnWidth`, `blockedSlots`, `disabledDates` / `disabledSet`, `minDuration` / `maxDuration`, `hideDays`, `equalDays`, `showDates`, `compact`, `columns`, `isMobile`, `autoHeight`, `timezone`, `oneventmove`, `oneventhover`, `ondayclick`, `eventSnippet`, `emptySnippet`, `dayHeaderSnippet` and `loadRange` (a view can widen the range the store loads). Call it at component init, inside a `<Calendar>`.

The raw view components — `Planner`, `PlannerScroll`, `Agenda`, `Mobile`, `MonthGrid` — are exported so you can register them under your own ids. Building blocks for custom views are exported as primitives: `EventBlock` (an event card), `TimeGutter` (hour labels), `DayHeader`, `NowIndicator`, `EmptySlot` (click-to-create target) and `FloatingPanel` (see [Event details panel](#event-details-panel)).

## Mobile

When the calendar's **container** is narrower than 768px, it swaps to touch-first Mobile views with swipe navigation and a compact header:

```svelte
<!-- Auto-detect (default) — switches at a 768px container width -->
<Calendar {adapter} />

<!-- Force mobile layout -->
<Calendar {adapter} mobile={true} />

<!-- Force desktop layout -->
<Calendar {adapter} mobile={false} />
```

- **MobileDay** — vertical time grid with hour labels, swipe left/right to change days, all-day chips at the top, tap-to-create, stable columns for overlapping events.
- **MobileWeek** — vertical day list with relative labels (Today, Tomorrow, …) and accessible event buttons in each row.

In mobile mode every view except `*-agenda` and `*-mobile` is swapped for the `{mode}-mobile` entry of the same mode when one is registered — this includes custom views. Agenda views keep their list layout; `month-grid` has no mobile entry and stays. The mobile header shows only the Day/Week/Month pills.

With `'auto'`, the first render (and the server render) is the desktop layout; the container is measured on mount, so SSR hydrates cleanly.

## Callbacks

```svelte
<Calendar
  {adapter}
  oneventclick={(event, anchor) => console.log('Clicked', event.title, anchor)}
  oneventcreate={(range) => console.log('New slot', range.start, range.end)}
  oneventmove={(event, start, end) => console.log('Moved', event.title, start, end)}
  onexternaldrop={({ start, dataTransfer }) => console.log('Dropped', start, dataTransfer.getData('text/plain'))}
  onviewchange={(viewId) => console.log('View', viewId)}
  ondatechange={(date) => console.log('Date', date)}
  ondayclick={(date) => console.log('Day', date)}
  onerror={(error) => console.error('Calendar', error)}
/>
```

| Callback | When it fires |
|----------|---------------|
| `oneventclick(event, anchor?)` | An event is clicked. The event is also selected (highlighted across views). `anchor` is the clicked block's viewport rect where the view has one (planner, `week-scroll`, `month-grid`) — for positioning a `FloatingPanel`. |
| `oneventcreate({ start, end })` | A drag-create or click-to-create passed validation. The calendar does **not** store anything: add the event to your data and hand the Calendar the updated adapter. |
| `oneventmove(event, start, end)` | A drag or resize committed — **after** the adapter stored it, or when the adapter refused with a read-only error (the host owns persistence then; the block stays where it was dropped). Other adapter failures revert the block and go to `onerror`. (The `week-agenda` columns day-drag is the exception: it only calls `oneventmove`.) |
| `onexternaldrop({ start, dataTransfer })` | An outside HTML5 drag was dropped on the grid; `start` is the pointer's time, snapped. |
| `onviewchange(viewId)` | Once on mount, then on every view change. |
| `ondatechange(date)` | Once on mount, then whenever the focused date changes (navigation, scrolling, a tapped day). |
| `ondayclick(date)` | A month-grid or agenda day is clicked (an instant, like `ondatechange`). Default: open it in a day view. |
| `oneventhover(event)` | The pointer enters an event (tooltips, previews). |
| `onerror(error)` | Adapter load failures and failed drag commits that would otherwise only reach the console. |

`oneventcreate`, `oneventmove` and `onexternaldrop` receive real instants, also with [`timezone`](#timezone-support). None of the write callbacks fire when `readOnly` is set.

To show a newly created or moved event, update your data and give the Calendar a new adapter — the store reloads on a new adapter identity without blanking the grid:

```svelte
<script lang="ts">
  import { Calendar, createMemoryAdapter, type TimelineEvent } from '@nomideusz/svelte-calendar';

  let events = $state<TimelineEvent[]>([]);
  const adapter = $derived(createMemoryAdapter(events));
</script>

<Calendar
  {adapter}
  oneventcreate={({ start, end }) => (events = [...events, { id: crypto.randomUUID(), title: 'New', start, end }])}
/>
```

### Read-only

Set `readOnly` to disable drag, resize, click-to-create and external drops:

```svelte
<Calendar {adapter} readOnly />
```

To lock single events, set `data.readOnly: true` on them: views refuse to move or resize those events, which can still be clicked. The recurring adapter uses this for its projected occurrences.

### Event details panel

`FloatingPanel` is a non-modal panel that opens beside the clicked block's rect (to its right, or left near the viewport edge), can be dragged by its header, and becomes a bottom sheet below a 640px viewport. Escape, its close button or a click outside closes it; the outside click is spent on closing, so it doesn't also open the event under it.

```svelte
<script lang="ts">
  import { Calendar, FloatingPanel, type TimelineEvent } from '@nomideusz/svelte-calendar';

  let open = $state<{ ev: TimelineEvent; anchor?: DOMRect } | null>(null);
</script>

<Calendar {adapter} oneventclick={(ev, anchor) => (open = { ev, anchor })} />

{#if open}
  <FloatingPanel title={open.ev.title} anchor={open.anchor} onclose={() => (open = null)}>
    <p>{open.ev.location}</p>
  </FloatingPanel>
{/if}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `''` | Header text and dialog label |
| `anchor` | `FloatingPanelAnchor` | `{ x: 24, y: 24 }` | `{ x, y, width?, height? }` — a `DOMRect` works as is |
| `width` | `number` | `440` | Panel width in px |
| `theme` | `string` | `''` | A `--dt-*` theme string, as the Calendar takes |
| `closeLabel` | `string` | `'Close'` | Close button label |
| `closeOnOutside` | `boolean` | `true` | Close on a pointerdown outside |
| `onclose` | `() => void` | — | Called on Escape, the close button, or an outside click |
| `children` | `Snippet` | *required* | Panel body |

### More options

Hide nav controls (prev/next/today) and treat all days equally (no past-day dimming):

```svelte
<!-- Fixed weekly schedule, no browsing, all days equal -->
<Calendar
  {adapter}
  view="week-agenda"
  readOnly
  showNavigation={false}
  showDates={false}
  equalDays
/>
```

Hide weekends for a workweek view:

```svelte
<Calendar {adapter} view="week-planner" hideDays={[6, 7]} />
```

Control which date the calendar shows from your app:

```svelte
<script>
  let date = $state(new Date());
</script>

<Calendar
  {adapter}
  currentDate={date}
  ondatechange={(d) => date = d}
/>
```

Show a rolling 3-day view (week views other than 7 days start at the focused date):

```svelte
<Calendar {adapter} view="week-planner" days={3} />
```

Block lunch hours and enforce 30–120 min events:

```svelte
<script>
  import type { BlockedSlot } from '@nomideusz/svelte-calendar';

  const blocked: BlockedSlot[] = [
    { start: 12, end: 13, label: 'Lunch' },           // every day 12–1 PM
    { day: 6, start: 0, end: 24, label: 'Saturday' }, // block all Saturday (ISO weekday)
  ];
</script>

<Calendar {adapter} blockedSlots={blocked} minDuration={30} maxDuration={120} />
```

Disable specific dates:

```svelte
<Calendar
  {adapter}
  disabledDates={[new Date('2026-03-25'), new Date('2026-04-01')]}
/>
```

Disabled dates refuse creating or moving events into those days. Existing events stay visible and clickable — useful for holidays or fully booked days.

Custom day headers and hover previews:

```svelte
<Calendar {adapter} oneventhover={(ev) => showTooltip(ev)}>
  {#snippet dayHeader({ date, isToday, dayName })}
    <span style:font-weight={isToday ? 'bold' : 'normal'}>{dayName}</span>
  {/snippet}
</Calendar>
```

Replace the built-in navigation or the entire header chrome with your own controls:

```svelte
<Calendar {adapter}>
  {#snippet navigation({ prev, next, goToday, isViewOnToday, mode })}
    <button onclick={prev}>‹</button>
    {#if !isViewOnToday}<button onclick={goToday}>Today</button>{/if}
    <button onclick={next}>›</button>
  {/snippet}
</Calendar>

<Calendar {adapter}>
  {#snippet header({ dateLabel, mode, modes, switchMode, prev, next, goToday })}
    <nav class="my-toolbar">
      <h2>{dateLabel}</h2>
      {#each modes as m}
        <button class:active={mode === m} onclick={() => switchMode(m)}>{m}</button>
      {/each}
      <button onclick={prev}>←</button>
      <button onclick={goToday}>Today</button>
      <button onclick={next}>→</button>
    </nav>
  {/snippet}
</Calendar>
```

Let agenda content determine height instead of forcing a fixed box — useful inside a scrolling page:

```svelte
<Calendar {adapter} view="week-agenda" height="auto" compact />
```

## Themes

Three built-in presets:

| Preset | Description |
|--------|-------------|
| `auto` | **Default.** Probes the host page at mount — background, accent color, fonts, light/dark mode — and writes matching `--dt-*` tokens. Re-probes when the host theme changes. |
| `neutral` | Explicit light theme. White bg, blue accent. Use when embedding standalone. |
| `midnight` | Explicit dark theme. Charcoal bg, red accent. |

```svelte
<script>
  import { Calendar, neutral, midnight } from '@nomideusz/svelte-calendar';
</script>

<Calendar {adapter} />                     <!-- auto: adapts to host page -->
<Calendar {adapter} theme={neutral} />     <!-- explicit light mode -->
<Calendar {adapter} theme={midnight} />    <!-- explicit dark mode -->
```

`presets` maps the names to the strings (`presets.neutral`); the type `PresetName` is `'auto' | 'neutral' | 'midnight'`.

### Smart Auto Theme

The default `auto` preset probes the page around the calendar and generates a theme that blends in. It detects:

- **Background color** — from common CSS variables on `:root` (`--bg`, `--background`, `--color-bg`, `--bs-body-bg`, …), inline styles, or computed styles
- **Light/dark mode** — from background luminance
- **Accent/brand color** — from common CSS variables (`--accent`, `--primary`, `--brand`, `--bs-primary`, …), link colors, or button colors
- **Text color** — validated for contrast against the background
- **Fonts** — the host's computed font stack; the mono stack from `--font-mono` and similar variables

It watches for changes (a dark-mode toggle on `<html>`/`<body>`, the system color scheme) and updates automatically.

The probing engine is exported for standalone use: `probeHostTheme(element, options?)` returns a `--dt-*` CSS string for the page around `element`; `observeHostTheme(element, callback, options?)` re-probes on theme changes and returns a stop function.

Fine-tune auto-detection with the `autoTheme` prop (`AutoThemeOptions`):

```svelte
<!-- Force dark mode even if the page background is light -->
<Calendar {adapter} autoTheme={{ mode: 'dark' }} />

<!-- Override the accent color (skip probing) -->
<Calendar {adapter} autoTheme={{ accent: '#e11d48' }} />

<!-- Override the font stack -->
<Calendar {adapter} autoTheme={{ font: '"Poppins", sans-serif' }} />

<!-- Disable probing entirely: inherit --dt-* from ancestors -->
<Calendar {adapter} autoTheme={false} />
```

### Your own tokens

The calendar writes its theme inline on its own root element, so it **wins over** `--dt-*` values set on an ancestor or `:root`. With the default `auto` theme it writes a full probed set. To use your own values:

- **Change a few tokens** — append them to a preset (later declarations win):

  ```ts
  import { neutral } from '@nomideusz/svelte-calendar';

  const custom = `${neutral}; --dt-accent: #e11d48;`;
  ```

  ```svelte
  <Calendar {adapter} theme={custom} />
  ```

- **Write your own theme string** — any `--dt-*` declarations; tokens you leave out are inherited from ancestors or fall back to neutral defaults.
- **Inherit from the page** — pass `autoTheme={false}` (keeping the default `auto` theme). The calendar then writes no tokens and reads whatever `--dt-*` its ancestors define:

  ```svelte
  <div style="--dt-accent: #e11d48; --dt-bg: #1a1a2e; --dt-text: rgba(255,255,255,0.87);">
    <Calendar {adapter} autoTheme={false} />
  </div>
  ```

Component fallbacks use system fonts and a neutral blue accent, so the package stays clean in apps that set no tokens.

<details>
<summary>All design tokens</summary>

| Token | Purpose |
|-------|---------|
| `--dt-bg` | Calendar background |
| `--dt-surface` | Elevated surface (headers, alternating rows, chips) |
| `--dt-border` | Default border |
| `--dt-border-day` | Day-column / day-cell dividers |
| `--dt-text` | Primary text |
| `--dt-text-2` | Secondary text |
| `--dt-text-3` | Tertiary text |
| `--dt-accent` | Accent color |
| `--dt-accent-dim` | Accent at ~12% opacity (selection, highlights) |
| `--dt-accent-fg` | Text on the planner's today-number badge (default `#fff`; not set by the presets) |
| `--dt-btn-text` | Text on accent-filled buttons and badges |
| `--dt-glow` | Accent glow / focus ring |
| `--dt-today-bg` | Today column highlight |
| `--dt-weekend-bg` | Weekend cell tint |
| `--dt-hover` | Hover background |
| `--dt-scrollbar` | Scrollbar thumb |
| `--dt-success` | Completed indicator |
| `--dt-sans` / `--dt-mono` | Font stacks |
| `--dt-radius` | `FloatingPanel` corner radius (the calendar's own radius is the `borderRadius` prop) |
| `--dt-shadow` | `FloatingPanel` shadow |
| `--dt-stage-bg` | The page background around the calendar. Set by the presets and the auto theme for your page to use; the components don't read it. |

</details>

## Events

### TimelineEvent

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier |
| `title` | `string` | Event title |
| `start` / `end` | `Date` | Time range |
| `color` | `string?` | Accent color (auto-assigned if omitted) |
| `category` | `string?` | Grouping key — events with the same category share a color |
| `subtitle` | `string?` | Secondary text below the title |
| `tags` | `string[]?` | Small accent-colored pills |
| `allDay` | `boolean?` | Render as an all-day event |
| `location` | `string?` | Room, venue, or address |
| `status` | `EventStatus?` | `'confirmed'` (default), `'cancelled'`, `'tentative'`, `'full'`, `'limited'` |
| `externalId` | `string?` | ID from an upstream system (booking platform, CRM, LMS) |
| `resourceId` | `string?` | Resource this event belongs to (room, instructor, court) |
| `data` | `Record<string, unknown>?` | Arbitrary payload for your app. `data.readOnly: true` locks the event against drags. |

Cancelled events render with a strikethrough but stay visible, so the slot isn't mistaken for free time.

### Auto-Coloring

Omit `color` and the built-in adapters assign a vivid palette color, grouped by `category` (or `title`):

```ts
const events = [
  { id: '1', title: 'Yoga',    category: 'wellness', start, end },
  { id: '2', title: 'Pilates', category: 'wellness', start, end },  // same color
  { id: '3', title: 'Standup', start, end },                        // different color
];
```

Generate a theme-harmonious palette from any accent color:

```ts
import { createMemoryAdapter, generatePalette } from '@nomideusz/svelte-calendar';

const palette = generatePalette('#e11d48'); // (accent?, count = 15)
const adapter = createMemoryAdapter(events, { palette });
```

Related exports: `VIVID_PALETTE` (the default palette) and `extractAccent(themeString)` (the accent color of a `--dt-*` theme string).

### Multi-day & All-day

Events spanning multiple days or flagged `allDay: true` render in a strip above timed events:

```ts
const events = [
  { id: '1', title: 'Conference', start: new Date('2026-03-15'), end: new Date('2026-03-18'), allDay: true },
  { id: '2', title: 'Sprint',     start: new Date('2026-03-15T00:00'), end: new Date('2026-03-17T00:00') },
];
```

### Custom Event Rendering

The `event` snippet replaces the event *content* in every view (the interactive shell — click, keyboard, drag, selection — stays intact). The `empty` snippet replaces the empty state of the day agenda, the day on mobile, and an empty planner week:

```svelte
<Calendar {adapter}>
  {#snippet event(ev)}
    <div style="padding: 4px 8px;">
      <strong>{ev.title}</strong>
      {#if ev.subtitle}<small>{ev.subtitle}</small>{/if}
    </div>
  {/snippet}
  {#snippet empty()}
    <p>Nothing booked — drag on the grid to add a class.</p>
  {/snippet}
</Calendar>
```

## Recurring Schedules

For fixed repeating events (class timetables, office hours):

```svelte
<script>
  import { Calendar, createRecurringAdapter } from '@nomideusz/svelte-calendar';

  const adapter = createRecurringAdapter([
    { id: '1', title: 'Yoga',    dayOfWeek: 1, startTime: '07:00', endTime: '08:30' },
    { id: '2', title: 'Standup', frequency: 'daily', startTime: '09:00', endTime: '09:15',
      startDate: '2026-03-01', until: '2026-03-31' },
    { id: '3', title: 'Review',  frequency: 'monthly', dayOfMonth: 15,
      startTime: '10:00', endTime: '11:00' },
    { id: '4', title: 'Night shift', dayOfWeek: [5, 6], startTime: '22:00', endTime: '02:00' },
  ]);
</script>

<Calendar {adapter} />
```

<details>
<summary>RecurringEvent fields</summary>

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | `string` | *required* | Rule identifier |
| `title` | `string` | *required* | Event title |
| `startTime` | `string` | *required* | Start time `"HH:MM"`, 24-hour |
| `endTime` | `string` | *required* | End time `"HH:MM"`. Earlier than `startTime` → ends the next day (overnight). |
| `frequency` | `'daily' \| 'weekly' \| 'monthly'` | `'weekly'` | Recurrence frequency |
| `interval` | `number` | `1` | Every N periods (`2` + weekly = biweekly). Needs `startDate` when > 1. |
| `dayOfWeek` | `number \| number[]` | — | ISO weekday 1=Mon…7=Sun. Required for weekly. |
| `dayOfMonth` | `number` | `1` | Day of month (1–31) for monthly; clamped to shorter months. |
| `startDate` | `string` | — | First possible occurrence `"YYYY-MM-DD"` |
| `until` | `string` | — | Last possible occurrence `"YYYY-MM-DD"` |
| `count` | `number` | — | Max occurrences from `startDate` (requires it). With `until`, the stricter wins. |
| `excludeDates` | `string[]` | — | `"YYYY-MM-DD"` dates this rule skips |
| `color` | `string` | auto | Accent color |
| `subtitle` / `tags` / `category` / `location` / `resourceId` | | — | Copied to every occurrence |
| `data` | `Record<string, unknown>` | — | Copied to every occurrence, plus `recurringId` |

</details>

Options (`RecurringAdapterOptions`): `mondayStart` (default `true`), `palette`, `movable` (default `false`).

Occurrences get the id `` `${rule.id}--YYYYMMDD` `` and `data.recurringId`. The adapter projects and stores nothing, so by default every occurrence carries `data.readOnly` and can't be dragged (it can still be clicked). With `movable: true` the views allow the drag and the adapter refuses the write with a read-only error, so `oneventmove` fires and the host stores the move: add the date to the rule's `excludeDates` and keep the moved occurrence with your one-off events (for example the memory side of a [composite adapter](#composite-adapter)).

## REST Adapter

Connect to any REST API:

```ts
import { createRestAdapter } from '@nomideusz/svelte-calendar';

type ApiItem = { id: string; name: string; startAt: string; endAt: string };

const adapter = createRestAdapter({
  baseUrl: 'https://api.example.com/v1',
  headers: { Authorization: 'Bearer TOKEN' },
  // Optional: map your API's list shape to TimelineEvent[]
  mapEvents: (data) =>
    (data as { items: ApiItem[] }).items.map((item) => ({
      id: item.id,
      title: item.name,
      start: new Date(item.startAt),
      end: new Date(item.endAt),
    })),
});
```

The adapter calls `GET {baseUrl}/events?start=…&end=…` (ISO strings), `POST /events`, `PATCH /events/:id` and `DELETE /events/:id`, sending JSON with your `headers`. By default a list response must be an array of events and a single response one event; `start`/`end` are parsed into `Date`s. Override with `mapEvents(data)` for lists and `mapEvent(data)` for single events. A non-2xx response or invalid JSON throws.

## JMAP Adapter

Read events from a [JMAP Calendars](https://jmap.io/) server (Fastmail, Stalwart, Cyrus):

```ts
import { createJmapAdapter, type JmapClient } from '@nomideusz/svelte-calendar';

const client: JmapClient = {
  request: (calls) =>
    fetch('https://api.example.com/jmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ using: ['urn:ietf:params:jmap:calendars'], methodCalls: calls }),
    }).then((r) => r.json()),
};

const adapter = createJmapAdapter(client, {
  getAccountId: () => accountId,
  calendarId: 'primary',          // optional: restrict to one calendar
  timeZone: 'Europe/Warsaw',      // optional: default Etc/UTC
});
```

Read-only. Expands recurrences server-side and handles all-day events, ISO-duration ends and per-calendar colors (pass `calendars: [{ id, name, color }]`, or a function returning them).

## Mapped Adapter

Wrap any static array of external records (class schedules, appointments, timetables) without writing a custom adapter. Supply a declarative field mapping — or a `mapEvent` function for full control — and the adapter handles parsing, colors, tags and status:

```ts
import { createMappedAdapter } from '@nomideusz/svelte-calendar';

const adapter = createMappedAdapter(rawClasses, {
  fields: {
    title: 'class_name',
    start: 'starts_at_iso',
    end: 'ends_at_iso',
    subtitle: 'teacher',
    location: 'room',
    externalId: 'reference_id',
    status: 'is_cancelled',           // boolean → 'cancelled' / 'confirmed'
    tags: ['is_free', 'is_bookable_online'],
  },
});
```

- Works without options too: it looks for common keys (`id`, `title`/`name`, `start`/`end`, `starts_at_iso`/`ends_at_iso`, `date` + `start_time`/`end_time`, `room`/`location`, `is_cancelled`). A missing end defaults to one hour after the start.
- `start`/`end` accept ISO strings, `Date`s or millisecond timestamps. When records split date and time (`date: "2026-03-03"`, `startTime: "07:00"`), map `date` + `startTime` / `endTime`; times may be `7:00`, `07:00` or `07:00:00`.
- `autoColor` defaults to **`true`**: source colors are ignored and events are colored from `palette` by category/title. Pass `autoColor: false` to keep the colors from your data.
- `includeData` (default `'*'`) copies unmapped source fields into `event.data`; pass a list of keys to limit it.

For full control, pass `mapEvent(raw, index)` and skip `fields`:

```ts
const adapter = createMappedAdapter(rawData, {
  mapEvent: (raw) => ({
    id: raw.uid,
    title: raw.procedure_name,
    start: new Date(raw.scheduled_at),
    end: new Date(raw.scheduled_end),
    location: raw.office,
    resourceId: raw.doctor_id,
  }),
});
```

Mapped adapters are read-only by default (writes throw a read-only error, so drags reach `oneventmove`). Set `readOnly: false` to allow writes; supply `onMutate: { onCreate, onUpdate, onDelete }` to persist them (each returns the stored source record, which is mapped again), or omit it to keep changes in memory.

## Composite Adapter

Merge several adapters into one — e.g. a recurring weekly schedule plus one-off events:

```ts
import { createMemoryAdapter, createRecurringAdapter, createCompositeAdapter } from '@nomideusz/svelte-calendar';

const memory    = createMemoryAdapter(oneOffEvents);
const recurring = createRecurringAdapter(weeklySchedule);

const adapter = createCompositeAdapter([memory, recurring]);
```

- **Reads** query every child in parallel and merge the results (the first event with a given id wins).
- **Creates** go to the primary child — the first by default, or `primaryIndex`.
- **Updates and deletes** go to the child that returned the event. If that child can't write, the composite refuses with a read-only error (so `oneventmove` reaches the host). An id no fetch returned is offered to each writable child in turn.
- **`onFetchError(error, adapterIndex)`** — with it, a failing child is reported to you and the others still load; without it, one failing child fails the whole load (surfacing through `onerror`).

```ts
const adapter = createCompositeAdapter([recurring, memory], {
  primaryIndex: 1,
  onFetchError: (error, i) => console.warn(`source ${i} failed`, error),
});
```

## Custom Adapter

Implement the `CalendarAdapter` interface to connect any data source. Only `fetchEvents` is required:

```ts
import type { CalendarAdapter, DateRange, TimelineEvent } from '@nomideusz/svelte-calendar';

const adapter: CalendarAdapter = {
  // Required: events overlapping the range
  fetchEvents: async (range: DateRange) => { /* return TimelineEvent[] */ },
  // Optional: the same answer synchronously, when the data is already in memory
  fetchEventsSync: (range) => { /* return TimelineEvent[], or undefined to go async */ },
  // Optional writes — omit them for a read-only source
  createEvent: async (event) => { /* return the created TimelineEvent with its id */ },
  updateEvent: async (id, patch) => { /* return the updated TimelineEvent */ },
  deleteEvent: async (id) => { /* void */ },
};
```

`WritableCalendarAdapter` is the same interface with all three write methods required.

**`fetchEventsSync`** lets the first render — including the server render — hold the events instead of a loading state. The memory, recurring and seeded adapters implement it. To seed an async adapter with events you already loaded on the server, wrap it:

```ts
import { createRestAdapter, withInitialEvents } from '@nomideusz/svelte-calendar';

// data.events: TimelineEvent[] for the range the page opens on
const adapter = withInitialEvents(createRestAdapter({ baseUrl: '/api' }), data.events);
```

The first load is answered synchronously from the seed; every later load (navigation, refresh) goes to the wrapped adapter.

### Refusing a write

The Calendar tells two refusals apart when `updateEvent` throws:

| Throw | Meaning | What happens |
|-------|---------|--------------|
| `new CalendarReadOnlyError(message?)` | "I hold this event but can't store the change." | The block stays where it was dropped and `oneventmove` fires — the host stores the move and refreshes. |
| `new EventNotFoundError(id)` | "Not my event." | A composite asks its next child; a drag ends quietly. |
| any other error | A real failure | The block reverts and the error goes to `onerror` (or `console.warn`). |

An adapter without `updateEvent` counts as read-only. Plain `Error`s whose message contains `read-only` (lower case) or `not found` (any case) are read the same way, so older adapters keep working. `isReadOnlyError(e)` and `isNotFoundError(e)` test both forms.

## Headless API

For full control over rendering, skip `<Calendar>` and drive everything from reactive state. `createCalendar()` returns computed layouts, navigation actions, drag helpers and the raw engines — zero DOM, bring your own UI. Call it during component initialisation.

```svelte
<script lang="ts">
  import { createCalendar, createMemoryAdapter } from '@nomideusz/svelte-calendar';

  const adapter = createMemoryAdapter([/* ... */]);
  const cal = createCalendar({ adapter, view: 'week-planner' });
</script>

<header>
  <button onclick={cal.prev}>←</button>
  <span>{cal.headerContext.dateLabel}</span>
  <button onclick={cal.next}>→</button>
  <button onclick={cal.goToday}>Today</button>
</header>

{#each cal.weeks as week}
  <div class="week-row">
    {#each week.days as day}
      <div class:today={day.isToday} class:past={day.isPast}>
        <h3>{day.dayNum}</h3>
        {#each day.events as ev}
          <div style:background={ev.color}>{ev.title}</div>
        {/each}
      </div>
    {/each}
  </div>
{/each}
```

Options (`HeadlessCalendarOptions`) mirror the Calendar props: `adapter`, `view` (default `'week-planner'`), `mondayStart`, `initialDate`, `timezone`, `locale`, `visibleHours`, `snapInterval`, `equalDays`, `hideDays`, `blockedSlots`, `disabledDates`, `days`, `readOnly`, `minDuration`, `maxDuration`, and the callbacks `oneventclick`, `oneventcreate`, `oneventmove`.

`cal.days` gives flat `HeadlessDay[]` with events attached; `cal.weeks` groups them into periods (`HeadlessWeek`). `cal.todayQueue` returns `{ past, current, upcoming }` for today (`TodayQueue`), updated every second. `cal.hours` yields the visible hour numbers. Drag is fully wired: `beginDragMove`, `beginDragCreate`, `updateDrag`, `commitDrag` (validates like the Calendar), `cancelDrag`, plus `isDragging` / `dragPayload` / `dragMode`. `headerContext` / `navigationContext` match the Calendar's `header` / `navigation` snippet contexts. Raw engines (`store`, `viewState`, `selection`, `dragState`, `clock`) are exposed for advanced cases.

The engine factories are exported individually — `createEventStore(adapter)`, `createViewState(options)`, `createSelection()`, `createDragState()`, `createClock(timezone?)` — if you want to compose your own calendar loop (types: `EventStore`, `ViewState`, `ViewStateOptions`, `CalendarSelection`, `DragState`, `DragMode`, `DragPayload`, `CalendarViewId`, `BuiltInViewId`, `ViewMode`).

### createAgenda

A live single-day list: `createAgenda({ adapter, initialDate?, locale?, lookahead?, timezone? })`.

```svelte
<script lang="ts">
  import { createAgenda, createMemoryAdapter } from '@nomideusz/svelte-calendar';

  const adapter = createMemoryAdapter([/* ... */]);
  const agenda = createAgenda({ adapter });
</script>

<h2>{agenda.dateLabel}</h2>
{#each agenda.upcoming as ev}
  <div>
    <time>{agenda.fmtTime(ev.start)}</time>
    <span>{ev.title}</span>
    <small>{agenda.eta(ev)}</small>
  </div>
{/each}
```

It returns `dayEvents`, `allDay`, `past`, `current`, `upcoming`, `upcomingSlots` (`TimeSlot[]`: overlapping events grouped as `{ startMs, endMs, events }`), `count`, `eta(ev)`, `progress(ev)`, `fmtTime` / `fmtDuration` / `fmtRange`, and `prev` / `next` / `goToday` / `setDate`.

### createRangeAgenda

A window of days with events grouped per day — no clock, drag or selection. Built for read-only schedule surfaces (public timetables, embeds):

```svelte
<script lang="ts">
  import { createRangeAgenda } from '@nomideusz/svelte-calendar';

  const agenda = createRangeAgenda({ adapter, days: 7, locale: 'pl-PL', timezone: 'Europe/Warsaw' });
</script>

<button onclick={agenda.prev}>←</button>
<button onclick={agenda.next}>→</button>

{#each agenda.days.filter((d) => d.events.length > 0) as day (day.ms)}
  <h3>{day.date.toLocaleDateString()}</h3>
  {#each day.events as ev (ev.id)}
    <p>{agenda.fmtRange(ev)} {ev.title}</p>
  {/each}
{/each}
```

Options (`RangeAgendaOptions`): `adapter` (or a getter), `days` (default 7), `initialDate` (the first day, not aligned to a week start), `locale`, `timezone`. It returns `days` (`RangeAgendaDay[]`: `ms`, `date`, `weekday`, `isToday`, `isPast`, `events`), `range`, `count`, `loading`, `error`, `prev()`, `next()`, `goToday()`, `setDate(date)`, `refresh()`, `fmtTime(date)`, `fmtDuration(ev)`, `fmtRange(ev)`.

## Localization (i18n)

The `locale` prop controls date/time formatting (BCP 47). Without it, the global default locale is used — `'en-US'` unless you call `setDefaultLocale()`:

```svelte
<Calendar {adapter} locale="de-DE" />
```

`setDefaultLocale('de-DE')` sets it for every calendar and formatter; `getDefaultLocale()` reads it back; `is24HourLocale(tag?)` tells you how times will format. An RTL locale (`ar-SA`, `he-IL`, …) sets `dir="rtl"` where the browser reports the locale's text direction (`Intl.Locale` text info); pass `dir` to be explicit.

Override UI labels per calendar with the `labels` prop — it's reactive (swap it to switch language live) and instance-scoped (two calendars on one page can carry different languages):

```svelte
<Calendar {adapter} locale="de-DE" labels={{
  today: 'Heute', day: 'Tag', week: 'Woche', month: 'Monat',
  noEvents: 'Keine Termine',
  nMore: (n) => `+${n} weitere`,
}} />
```

Or set labels globally before mount:

```ts
import { setLabels } from '@nomideusz/svelte-calendar';

setLabels({ today: 'Heute', day: 'Tag', week: 'Woche' });
```

Both take a `Partial<CalendarLabels>` — that is the supported input: pass the keys you translate, and keys added in later minor releases fall back to English. The `labels` prop merges over the global set. `resetLabels()` restores English (`defaultLabels` exports it; `getLabels()` reads the active set). Global `setLabels()` calls after mount don't re-render mounted calendars — use the `labels` prop to switch language live. Standalone primitives (`DayHeader`, `EventBlock`, …) and the format helpers read the global set.

<details>
<summary>All label keys</summary>

| Key | Default |
|-----|---------|
| `today` / `yesterday` / `tomorrow` | `'Today'` / `'Yesterday'` / `'Tomorrow'` |
| `day` / `week` / `month` | `'Day'` / `'Week'` / `'Month'` (mode pills) |
| `planner` / `agenda` / `scroll` | `'Planner'` / `'Agenda'` / `'Scroll'` (view-type pills) |
| `now` / `free` / `allDay` | `'now'` / `'free'` / `'All day'` |
| `done` / `upNext` / `until` | `'Done'` / `'Up next'` / `'until'` |
| `noEvents` | `'No events'` |
| `nothingScheduled` / `nothingScheduledYet` / `nothingWasScheduled` | `'Nothing scheduled'` / `'Nothing scheduled yet'` / `'Nothing was scheduled'` |
| `allDoneForToday` | `'All done for today'` |
| `goToToday` | `'Go to today'` |
| `previousDay` / `nextDay` | `'Previous day'` / `'Next day'` |
| `previousWeek` / `nextWeek` | `'Previous week'` / `'Next week'` |
| `previousMonth` / `nextMonth` | `'Previous month'` / `'Next month'` |
| `calendar` / `viewMode` | `'Calendar'` / `'View mode'` (aria) |
| `cancelled` / `tentative` / `full` / `limited` | `'cancelled'` / `'tentative'` / `'full'` / `'limited'` (event status) |
| `unavailable` | `'Unavailable'` (a blocked slot without its own label) |
| `noViews` | `'No views registered.'` |
| `dayNavigation` / `weekNavigation` | `'Day navigation'` / `'Week navigation'` (aria) |
| `dayPlanner` / `scrollableDayPlanner` | `'Day planner'` / `'Scrollable day planner'` (aria) |
| `todaysLineup` / `weekAhead` / `multiWeekGrid` | `"Today's lineup"` / `'Week ahead'` / `'Multi-week calendar grid'` (aria) |
| `currentTime` / `createEvent` | `'Current time'` / `'Create event'` (aria) |
| `happeningNow` / `past` / `completed` / `inProgress` | `'happening now'` / `'past'` / `'completed'` / `'in progress'` |
| `showLess` | `'Show less'` |
| `nMore(n)` | `+3 more` |
| `nEvents(n)` | `1 event`, `5 events` |
| `nCompleted(n)` | `3 completed` |
| `dayNOfTotal(current, total)` | `day 2 of 4` |
| `percentComplete(pct)` | `75% complete` |
| `inMinutes(mins)` / `inHours(hours, mins)` / `inDays(days)` | `in 45m` / `in 2h 15m` or `in 2h` / `in 3d` |

</details>

## Timezone Support

Render the whole calendar in any IANA timezone — events, the now-indicator and day boundaries all shift:

```svelte
<Calendar {adapter} timezone="Europe/Warsaw" />
```

- `initialDate` and `currentDate` are instants, read in that zone.
- `oneventcreate`, `oneventmove` and `onexternaldrop` receive real instants.
- `ondatechange` and `ondayclick` receive instants too — the start of that day in the zone — so feeding one back is stable: `currentDate={date} ondatechange={(d) => (date = d)}`. To read the date, format it in the zone:

  ```ts
  import { formatInTimeZone } from '@nomideusz/svelte-calendar';
  formatInTimeZone(d, 'Europe/Warsaw', { year: 'numeric', month: '2-digit', day: '2-digit' }, 'en-CA'); // "2026-10-24"
  ```
- Events handed to `oneventclick` / `oneventmove` / snippets are shifted the same way: their local fields show the zone's wall-clock time.
- `timezone` is read when the Calendar mounts. To change zones at runtime, remount it:

  ```svelte
  {#key timezone}
    <Calendar {adapter} {timezone} />
  {/key}
  ```

Under the hood the adapter is wrapped with `wrapAdapterWithTimezone(adapter, zone)` (also exported), so views do plain local-time math on a zoned wall-clock plane. Known limit shared by every wall-clock calendar: the repeated hour of a DST fall-back is ambiguous, and writes inside it resolve to one of the two instants.

The headless helpers take the same option: `createCalendar({ timezone })`, `createAgenda({ timezone })`, `createRangeAgenda({ timezone })`, plus `createClock(timezone)` and `createViewState({ timezone })`.

Convert dates manually with the built-in helpers:

```ts
import { toZonedTime, fromZonedTime, nowInZone, formatInTimeZone } from '@nomideusz/svelte-calendar';

// A Date whose local fields show the instant's wall-clock time in New York
const local = toZonedTime(utcDate, 'America/New_York');

// Back to the real instant before saving
const utc = fromZonedTime(local, 'America/New_York');

// Current time in a timezone (wall-clock Date)
const now = nowInZone('Asia/Tokyo');

// Format an instant directly in a timezone: (date, zone, Intl options?, locale?)
formatInTimeZone(utcDate, 'America/New_York', { hour: '2-digit', minute: '2-digit' });
```

## Utilities

Small helpers used by the built-in views, exported for custom rendering. Formatters take an optional `locale` (default: the global default locale); day helpers work on millisecond timestamps.

| Export | Purpose |
|--------|---------|
| `fmtTime(date, locale?)` / `fmtH(hour, locale?)` | Compact time / hour labels: `9:00a` / `9a` in 12-hour locales, `9:00` / `9` in 24-hour ones |
| `fmtDuration(start, end)` | `"45m"`, `"1h"`, `"1h 30m"` |
| `fmtDay(ms, todayMs, opts?, locale?)` | `"Today · Feb 21"`, `"Mon, Feb 17"`; `{ short: true }` for the short form |
| `fmtWeekRange(startMs, locale?, endMs?)` | A date range in the locale's own order: `"Sep 21 – 27, 2026"`, `"21–27 wrz 2026"`. `endMs` is the last day shown (default: six days on). |
| `dateShort` / `dateWithWeekday` | `"Feb 21"` / `"Mon, Feb 17"` |
| `weekdayShort` / `weekdayLong` / `monthShort` / `monthLong` | Name parts of a timestamp |
| `sod(ms)` | Start of that day (local midnight) |
| `startOfWeek(ms, mondayStart = true)` | Start-of-week timestamp |
| `addDaysMs(ms, n)` / `diffDays(a, b)` | Add / count **calendar** days — DST-safe (a DST day is 23 or 25 hours, so don't add `n * 86_400_000`) |
| `isAllDay(ev)` / `isMultiDay(ev)` | Event classification |
| `segmentForDay(ev, dayMs)` | The slice of a multi-day event on one day (`DaySegment`), or `null` |
| `createClock(timezone?)` | Reactive clock: `tick` (ms, every second), `today`, `hm`, `s`, `fractionalHour`, `destroy()` |
| `textWidth(text, font)` / `textHeight(text, font, width, lineHeight)` / `lineCount(text, font, width, options?)` / `fits(text, font, width, lines = 1)` | Text measurement via [pretext](https://github.com/chenglou/pretext) — before render, no layout thrash. `options` is `TextLayoutOptions` (`whiteSpace`, `wordBreak`, `letterSpacing`). Browser-only. |
| `pickFit(candidates, font, width, lines = 1)` | The longest candidate that fits |
| `fitLabel(candidates, lines = 1)` | Attachment: `<span {@attach fitLabel([ev.title, ev.short])}>` keeps the longest label that fits its box, re-fitting on resize |
| `fontOf(el)` | An element's computed font as a canvas font string |
| `fitParts(parts, budget, measure?)` | Which parts of a dense chip fit, along either axis → `Record<key, boolean>`. Each `ChipPart` is `{ key, text, font }` to measure or `{ key, size }` to state its cost, plus `priority` (`0` is an anchor and never drops; higher numbers drop first) and `extra` (a gap or icon). The first optional part that doesn't fit ends the list, so a chip never keeps a later detail after dropping an earlier one. A budget of `0` (server-rendered, not yet measured) leaves only the anchors. |
| `typeset(text)` / `breakLines(text, font, width)` | Knuth-Plass paragraph breaking over the text's own spaces and soft hyphens. `<p {@attach typeset(text)}>` sets justified lines, re-done on resize; if the browser disagrees with the measure, the plain text goes back. Progressive — SSR text stays. |

## Embeddable Widget

Drop into any HTML page — no build tools needed. Registers a `<day-calendar>` custom element:

```html
<script src="https://cdn.jsdelivr.net/npm/@nomideusz/svelte-calendar/widget/widget.js"></script>

<day-calendar
  api="https://myschool.com/api/events"
  theme="neutral"
  view="week-planner"
  height="600"
  locale="en-US"
></day-calendar>
```

In a bundler, `import '@nomideusz/svelte-calendar/widget'` registers the same element.

The widget renders inside shadow DOM: host-page CSS cannot affect the calendar and calendar styles never leak out, while the `auto` theme still probes the host page's colors and fonts across the shadow boundary.

| Attribute | Default | Description |
|-----------|---------|-------------|
| `api` | — | Events endpoint, fetched as `GET {api}?start=…&end=…` (ISO instants; appended with `&` if `api` already has a query). It must answer JSON: an array of events, or `{ "events": [...] }`. |
| `events` | — | Inline JSON array of events, used when there is no `api` |
| `headers` | — | JSON object of extra request headers for `api`. Without it the GET is a simple CORS request (no preflight). |
| `readonly` | read-only | The widget is read-only unless `readonly="false"`. There is no write endpoint: with `api`, drags are only visual; with `events`, they are kept in memory. |
| `view` | `week-planner` | Initial view ID (`week-planner`, `day-agenda`, `month-grid`, …) |
| `theme` | `auto` | `auto`, `neutral` or `midnight` (unknown names fall back to `neutral`) |
| `height` | `600` | Height in px (`"600"` or `"600px"`), or `auto` |
| `locale` | `en-US` | BCP 47 locale tag |
| `dir` | from `locale` | `ltr`, `rtl` or `auto` |
| `mondaystart` | `true` | `"false"` starts weeks on Sunday |
| `pills` | `true` | `"false"` hides the view pills |
| `nav` | `true` | `"false"` hides prev/next/today |
| `mobile` | `auto` | `auto`, `true` or `false` |
| `days` | `7` | Days in week views, `1`–`7` |
| `compact` | `false` | `"true"` for compact agenda rows |
| `timezone` | viewer's zone | IANA zone, e.g. `Europe/Warsaw` (read when the element mounts) |

Each event in `api` responses and `events` needs `start` and `end` as date strings (ISO 8601) and may carry `id`, `title`, `color`, `allDay`, `subtitle` and `location`; other fields are ignored, as are events with an invalid or empty range. Changing an attribute updates the calendar in place.

## All Props

<details>
<summary>Full Calendar props reference (<code>CalendarProps</code>)</summary>

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `adapter` | `CalendarAdapter` | *required* | Data source (memory, recurring, mapped, composite, REST, JMAP, or custom) |
| `views` | `readonly CalendarView[]` | `defaultViews` | View registry (the 8 built-ins). Spread `defaultViews` to add your own. |
| `view` | `CalendarViewId` | first registered (`'day-planner'`) | Active view ID. Reactive. |
| `theme` | `string` | `auto` | CSS theme string of `--dt-*` properties. `auto` probes the host page. |
| `autoTheme` | `AutoThemeOptions \| false` | `undefined` (probe) | Fine-tune auto-detection: `{ mode, accent, font }`. `false` disables probing. |
| `mobile` | `'auto' \| boolean` | `'auto'` | `'auto'` switches to mobile views below a 768px container width |
| `height` | `number \| 'auto'` | `600` | Height in px, or `'auto'` to grow with content (ideal for Agenda views) |
| `borderRadius` | `number` | `12` | Border radius in px. `0` for none. |
| `locale` | `string` | global default (`'en-US'`) | BCP 47 locale tag; see `setDefaultLocale` |
| `labels` | `Partial<CalendarLabels>` | — | Per-instance UI labels, merged over the global set. Reactive. |
| `dir` | `'ltr' \| 'rtl' \| 'auto'` | from `locale` | Text direction |
| `mondayStart` | `boolean` | `true` | Start weeks on Monday |
| `readOnly` | `boolean` | `false` | Disable drag, resize, click-to-create and external drops |
| `visibleHours` | `[number, number]` | — | Crop the grid to `[startHour, endHour)` |
| `initialDate` | `Date` | today | Date to focus at mount (an instant; read in `timezone`) |
| `currentDate` | `Date` | — | Controlled focus date (an instant; read in `timezone`) |
| `timezone` | `string` | viewer's zone | IANA zone to render in. Read at mount. |
| `snapInterval` | `number` | `15` | Drag snap in minutes |
| `minColumnWidth` | `number` | `110` | Minimum day-column width (px) in planner views; below the total the grid scrolls horizontally |
| `days` | `number` | `7` | Days shown in week mode (e.g. `3` for a rolling 3-day view) |
| `hideDays` | `number[]` | — | ISO weekdays to hide (1=Mon … 7=Sun), e.g. `[6, 7]` |
| `showModePills` | `boolean` | `true` | Show the Day/Week/Month pills and the view-type pills |
| `showNavigation` | `boolean` | `true` | Show prev/next/today |
| `showDates` | `boolean` | `true` | Show date numbers and the date label. `false` = day names only (templates, recurring schedules) |
| `equalDays` | `boolean` | `false` | Treat all days equally (no past-day dimming/collapsing) |
| `blockedSlots` | `BlockedSlot[]` | — | `{ day?, start, end, label? }` hour ranges that can't be booked (hatched in planner views) |
| `disabledDates` | `Date[]` | — | Dates that refuse creates/moves; existing events stay visible and clickable |
| `minDuration` | `number` | — | Minimum duration in minutes; clamps creates and resizes |
| `maxDuration` | `number` | — | Maximum duration in minutes; clamps creates and resizes |
| `compact` | `boolean` | `false` | Minimal text rows in Agenda views (dot + time + title) |
| `columns` | `boolean` | `false` | Timetable layout: `week-agenda` days side by side on desktop. Pairs with `equalDays`; overrides `compact` |
| `event` | `Snippet<[TimelineEvent]>` | — | Custom event content |
| `empty` | `Snippet` | — | Empty state for the day agenda, mobile day and an empty planner week |
| `dayHeader` | `Snippet<[{ date, isToday, dayName }]>` | — | Custom day header |
| `header` | `Snippet<[HeaderContext]>` | — | Replace the whole header (`dateLabel`, `mode`, `modes`, `switchMode`, `prev`, `next`, `goToday`, `isViewOnToday`, `focusDate`) |
| `navigation` | `Snippet<[NavigationContext]>` | — | Replace prev/next/today (`prev`, `next`, `goToday`, `isViewOnToday`, `focusDate`, `mode`) |
| `oneventclick` | `(event, anchor?: DOMRect) => void` | — | Event clicked (and selected) |
| `oneventcreate` | `(range: { start, end }) => void` | — | A validated new range (real instants) |
| `oneventmove` | `(event, start, end) => void` | — | Drag/resize stored, or refused read-only (real instants) |
| `onexternaldrop` | `(info: { start, dataTransfer }) => void` | — | Outside HTML5 drag dropped on the grid |
| `onviewchange` | `(viewId) => void` | — | Once on mount, then on every view change |
| `ondatechange` | `(date) => void` | — | Once on mount, then on every focus-date change |
| `ondayclick` | `(date) => void` | open a day view | A month-grid day clicked |
| `oneventhover` | `(event) => void` | — | Pointer enters an event |
| `onerror` | `(error: Error) => void` | — | Load and commit failures |

</details>

## Versioning

The package follows [semver](https://semver.org/) from 1.0:

- The public API is exactly what the `.` and `./widget` entry points export. Deep imports into `dist/` are not supported.
- `TimelineEvent`, `CalendarAdapter` and `DateRange` are stable shapes: fields may be added in minor releases, never renamed, removed or given new meaning outside a major.
- The `--dt-*` theme tokens are part of the contract, as are the `<day-calendar>` attributes.
- `CalendarLabels` gains keys in minor releases — pass a `Partial` (see [Localization](#localization-i18n)).

## Development

```bash
pnpm install
pnpm dev              # demo site
pnpm check            # svelte-check
pnpm test             # vitest
pnpm run package      # build the library into dist/
pnpm run build:widget # build widget/widget.js
```

## License

MIT
