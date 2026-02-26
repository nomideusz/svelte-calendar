# Changelog

## 0.3.1 — 2026-02-26

### Added
- **Theme-aware `autoColor`** — pass a hex accent string (e.g. `autoColor: '#6366f1'`) to `createMemoryAdapter` or `createRecurringAdapter` and the palette is generated via golden-angle hue rotation from that accent, with lightness adapted for dark/light themes. `autoColor: true` retains the original 15-color vivid palette.
- **`generatePalette(accent?, count?)` utility** — exported from core. Generates perceptually distinct, theme-harmonious hex colors from any accent. Falls back to the vivid palette when no accent is provided.
- **`VIVID_PALETTE` constant** — the original 15-color palette, now exported for direct use.
- **Subtitle & tags in all views** — `subtitle` and `tags` now render in WeekGrid, DayGrid, DayTimeline, and Agenda (all variants: eventCard, queue cards, plan cards, compact rows), not just EventBlock.
- **DayTimeline view** added to the demo's registered views.
- **`mondayStart` toggle** in the demo control panel, wired to all Calendar and WeekSchedule instances.
- Palette generator test suite (7 tests).

### Changed
- WeekGrid event blocks wrap to show subtitle (dimmed) and tag pills inline.
- DayGrid shows subtitle when block height > 48px, tags when > 72px.
- DayTimeline shows subtitle and tags inline with gap.
- Agenda eventCard, queue cards, plan cards, and compact rows all render subtitle and tags with matching CSS.
- Demo ColorMap tab now has three modes: **themed** (adapts to current theme accent), **vivid** (original fixed palette), and **colorMap** (manual mapping).
- Demo action bar shows tags in click feedback: `Clicked: Title (subtitle) [tag1, tag2]`.

## 0.3.0 — 2026-02-26

### Added
- **Recurring adapter** — `createRecurringAdapter(schedule)` auto-projects weekly `RecurringEvent` definitions onto concrete dates. Eliminates manual date fabrication for schedule-based apps.
- **`RecurringEvent` type** — `dayOfWeek` (1=Mon…7=Sun) + `startTime`/`endTime` strings, with `subtitle`, `tags`, `category`, `color`, and `data` fields.
- **`readOnly` prop** on `Calendar` — disables drag, resize, empty-slot creation, and mutation callbacks. `oneventclick` still fires.
- **`visibleHours` prop** on `Calendar` — `[startHour, endHour)` tuple to crop grids to relevant hours (e.g. `[6, 21]` for a yoga studio).
- **`subtitle` and `tags` on `TimelineEvent`** — `EventBlock` renders subtitle as secondary text and tags as accent-colored pills (card and row variants).
- **`colorMap` / `autoColor` on adapters** — `createMemoryAdapter` and `createRecurringAdapter` accept `{ colorMap, autoColor }` options. `colorMap` maps category/title → color; `autoColor` cycles a 15-color palette.
- **`WeekSchedule` convenience component** — single-import, zero-config weekly schedule display. Accepts `events` or `schedule` prop, pre-wires adapter + views + toolbar.
- **`MemoryAdapterOptions` type** exported from adapters.
- Comprehensive tests for recurring adapter (8 test cases).

### Changed
- `Calendar` shell now passes `readOnly` and `visibleHours` through to child view components.
- `WeekGrid` respects `readOnly` — disables cell-click creation and event drag.
- `WeekHeatmap` respects `visibleHours` — renders only specified hour range.
- Demo page (`+page.svelte`) rewritten as interactive feature showcase with theme/readOnly/visibleHours/colorMap toggles and 4 demo modes.

## 0.2.0 — 2026-02-25

### Added
- **Accessibility:** `role`, `aria-label`, `aria-current`, `tabindex`, keyboard Enter/Space on `EventBlock`, `EmptySlot`, `NowIndicator`.
- **Focus styles:** `:focus-visible` outlines on all interactive primitives.
- **Calendar `dir` prop** — `'ltr'` | `'rtl'` | `'auto'` for RTL layout support.
- **Calendar `locale` prop** — BCP 47 tag; auto-sets `lang` attribute and default locale for all formatting.
- **24-hour detection** — `fmtH()` now auto-detects 12h/24h based on locale via `Intl.DateTimeFormat`.
- **`is24HourLocale()` utility** exported from core for locale-aware hour formatting.
- **Time zone support** — new `timezone` option in `ViewStateOptions` and `CalendarAdapter` context; `toZonedTime()` / `fromZonedTime()` / `nowInZone()` utilities using `date-fns-tz`.
- **Extensible `CalendarViewId`** — changed from closed union to `string` type; any custom view ID now works without modifying the library.

### Changed
- Renamed package from `@svelte-calendar/core` to `@nomideusz/svelte-calendar`.
- `Calendar` shell `<div>` now renders `role="region"` and `aria-label="Calendar"`.
- `Toolbar` `<nav>` now has `aria-label="Calendar navigation"`.
- `NowIndicator` all modes now have `role="status"` and `aria-live="polite"`.
- Switched from npm to pnpm.

### Fixed
- README: removed fictional `DayAgenda`/`WeekAgenda` exports — the correct API is `Agenda` with `mode="day"|"week"`.
- README: added missing `Settings` component documentation.
- README: corrected all import paths to `@nomideusz/svelte-calendar`.
- CHANGELOG: corrected view names to match actual exports.

## 0.1.1 — 2026-02-25

### Fixed
- Corrected README view names and package references.
- Added `Settings` panel documentation to README.

## 0.1.0 — 2025-07-10

### Added
- **5 calendar views:** DayGrid, DayTimeline, WeekGrid, WeekHeatmap, Agenda (with `mode="day"|"week"`).
- **Settings panel** — `Settings` component with theme picker and dynamic range/toggle fields.
- **Calendar orchestrator** — unified shell with toolbar, concept-paired view switching, and navigation.
- **Engine modules** — `createEventStore`, `createViewState`, `createSelection`, `createDragState`.
- **Adapter pattern** — `createMemoryAdapter` (in-memory) and `createRestAdapter` (HTTP skeleton).
- **3 theme presets** — `midnight`, `parchment`, `indigo` via `--dt-*` CSS custom properties.
- **Shared primitives** — `EventBlock`, `EmptySlot`, `TimeGutter`, `DayHeader`, `NowIndicator`.
- **focusDate** prop wired from Calendar → all views for navigation.
- **oneventclick** / **oneventcreate** callbacks on views.
- **Selection highlighting** (`selectedEventId`) on all views.
- **Overlap layout** — column-packing algorithm for overlapping events in DayGrid and WeekGrid.
- Comprehensive TypeScript types and barrel re-exports.
