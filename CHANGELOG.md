# Changelog

## 0.1.0 — 2025-07-10

### Added
- **6 calendar views:** DayGrid, DayTimeline, DayAgenda, WeekGrid, WeekAgenda, WeekHeatmap.
- **Calendar orchestrator** — unified shell with toolbar, view switching, and navigation.
- **Engine modules** — `createEventStore`, `createViewState`, `createSelection`, `createDragState`.
- **Adapter pattern** — `createMemoryAdapter` (in-memory) and `createRestAdapter` (HTTP).
- **3 theme presets** — `midnight`, `parchment`, `indigo` via `--dt-*` CSS custom properties.
- **focusDate** prop wired from Calendar → all views for navigation.
- **oneventclick** callback on all 6 views.
- **oneventcreate** click-to-create on DayGrid and WeekGrid empty slots.
- **Selection highlighting** (`selectedEventId`) on all views.
- **Overlap layout** — column-packing algorithm for overlapping events in DayGrid and WeekGrid.
- **Event rendering** in WeekGrid and DayTimeline (previously grid-only).
- Comprehensive TypeScript types and re-exports from `@svelte-calendar/core`.
