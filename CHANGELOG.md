# Changelog

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
