# Changelog

## 0.11.0 — 2026-08-01

### Added
- Week agenda: "✓ N completed" lines are now disclosure buttons — tap to reveal a past day's finished events as dimmed, struck-through rows (works for collapsed past days and today's done section).
- Month grid: on mobile-width containers, events render as color dots with a compact "+N" overflow — text chips fit ~1 character in a phone-width cell and clipped vertically. The day cell stays the tap target (drill-down); dot chips keep full accessible labels.
- Mobile header: on containers narrower than 520px the date label moves to its own centered row instead of being truncated to a single letter by the mode pills and navigation.

### Fixed
- Mobile week list could pan horizontally on iOS — rows were `width: 100%` plus padding (content-box), overflowing the list by 24px and letting the date column clip off the left edge. Rows are border-box and the list clips horizontal overflow.
- Swipe navigation: when the browser took over a gesture mid-swipe (`touchcancel` — vertical scroll, edge swipe, system UI), mobile day/week views stayed stuck translated sideways.
- Compact agenda rows no longer crush the event title to zero width. On mobile, a long title takes the whole first line and location/subtitle/tags wrap below it at full width, with the color dot pinned to the title line.
- Mobile day view: 24-hour gutter labels no longer sit flush under event blocks (content-box sizing), and event blocks only render the detail lines their height can hold — a 1-hour block no longer clips text at both ends.
- Week agenda sticky day headers get their own compositor layer, removing the flash of card content above them during fast scrolling.
- Active mode pill stays readable on touch devices — the stuck `:hover` style out-ranked the active pill's text color (dark-on-accent).
- Selected agenda rows no longer shift their content sideways on tap; plan-card location and time align with the subtitle's indent under the title.

## 0.10.0 — 2026-08-01

### Changed (breaking-ish)
- **PlannerWeek is now a real time grid.** The week planner was a stacked list per day (no hour axis); it's now a Google-Calendar-style vertical grid: hour gutter, sticky day headers + all-day strip, overlap lanes, now-line, drag-to-move (vertical = time, horizontal = day), top/bottom resize, drag-to-create with ghost + snapping, long-press create on touch. Consequences for hosts: the multi-week infinite scroll is gone (use `month-grid` for overviews), scroll no longer writes back `focusDate`, timed events outside `visibleHours` aren't rendered, and empty-canvas clicks create at the clicked time (was fixed 09:00).
- **The `<day-calendar>` widget renders in shadow DOM.** Host-page CSS can no longer restyle the calendar's internals (previously a `* { all: unset }` reset would destroy it). Bundled CSS is injected per shadow root; the `auto` theme still probes the host page across the boundary. The widget now defaults to `theme="auto"` (was a light-theme lookup bug) and forwards `readonly`/`pills`/`nav`/`mobile`/`days`/`compact`/`timezone` attributes; `height="auto"` supported.

### Added
- `labels` prop on `Calendar`: per-instance, reactive UI label overrides (merged over global `setLabels()`) — SSR-correct localization and per-calendar languages on one page.
- Planner ↔ Agenda view-type switcher in the header when a mode has multiple registered view labels; Month → Week round-trips keep the chosen view type.
- Keyboard shortcuts scoped to the calendar: `t` today, `←`/`→` navigate; month grid gets arrow-key cell navigation with roving tabindex.
- Month grid: "+N more" is a real button (drills into a day view by default — no `ondayclick` wiring needed — or inline-expands headlessly); day cells carry full date `aria-label`s and `aria-current="date"`.
- New label keys: `month`-related navigation, statuses, ETA countdowns (`inMinutes`/`inHours`/`inDays`), `dayNOfTotal`, `percentComplete`, `showLess`, and more.

### Fixed
- Week-mode header now shows the week range (respecting 3/5-day views) instead of the month name.
- Month view weekend shading and hover feedback (the `--dt-weekend-bg`/`--dt-hover` tokens were consumed but never defined in any theme).
- Widget embeds were completely unstyled (CSS shipped as a separate file the docs never mentioned); CSS is now bundled into `widget.js`.
- Touch: drag-to-create/move now work on touch devices (long-press + scroll suppression), 44px effective hit targets, swipe navigation follows the finger, `overscroll-behavior` contained.
- Accessibility: valid ARIA grid structures, Escape cancels drags, event labels include time ranges, `aria-live` range announcements, focus rings that don't get clipped.
- Legibility: 10px type floor everywhere (15/12/11px mobile scale), opacity-stacking contrast failures replaced with token-based dims, `prefers-reduced-motion` guards on all loops.
- Performance: planner layout no longer recomputes every second; permanent 60fps rAF loop removed; week buffer cut from ±52 weeks to the visible week.
- Today button no longer mounts/unmounts (layout jump); mobile nav targets enlarged and grouped; desktop chrome no longer flashes on mobile first paint.

## 0.7.5 — 2026-07-06

### Changed
- Day planner "up next" event no longer uses a dashed border + dimmed background (it read as tentative/broken); emphasis is the UP NEXT badge plus a stronger solid border.
- Day planner titles may wrap to a second column (vertical writing mode) before truncating, so overlapping events keep readable names.

### Added
- Day planner event cards expose the full event name as a native hover tooltip (`title` attribute).

## 0.7.4 — 2026-07-06

### Changed
- Day planner event colors read vivid instead of muted: 3px solid color stripe at the start edge (matching the week view) and background tint raised 15% → 22% (hover 25% → 32%).

## 0.7.3 — 2026-07-06

### Changed
- Day planner event cards get a subtle 1px border in the event's color (40% mix), visually separating adjacent events.

## 0.7.2 — 2026-07-06

### Fixed
- **Day planner width runaway.** The day planner derives its hour width from its container and lays a px-sized track inside it; a host flex/grid column with `min-width: auto` grew with the track, feeding the width back into the calculation until the page hit the browser's layout cap. The planner root now declares `contain: inline-size`, so its intrinsic width can never be driven by its own track — no host layout can trigger the loop.
- **Auto-height day planner painted outside its box.** `height="auto"` mode set `overflow: visible` on the scroller, disabling horizontal containment and painting the full track (20k+ px) over the page. Horizontal scrolling is now preserved in auto mode.

## 0.7.1 — 2026-07-05

### Added
- **Drag animations.** Week planner: the drag ghost crossfades between day cells instead of teleporting, event lists animate with FLIP so neighbours make room smoothly, and on drop the ghost glides into the placed card (rejected drops fly back to the original slot). Multi-day previews animate per day segment. Day planner: the dragged card eases toward the snapped cursor position (80ms), and other cards animate their lane reflow on drop. All animations respect `prefers-reduced-motion`.

### Fixed
- Crash on drag drop (`Cannot read properties of null (reading 'id')`): transition params are evaluated lazily at unmount, after the drag payload is cleared — crossfade keys are now snapshotted at render time.

## 0.7.0 — 2026-07-05

### Changed
- **Header row replaces floating controls.** Desktop chrome is now a single flow-layout header — Today button + prev/next arrows, centered date label, Day/Week pills — instead of translucent pills absolutely positioned over the grid. Content is never covered, and the four per-view floating nav implementations (planner day/week, agenda day/week) are gone along with the top-padding hacks that reserved space for them.
- **Today button** only appears when the view is off today, and has a "Go to today" tooltip. It's styled as a bordered button so it no longer reads as a third view-mode pill.
- **Agenda views gain Day/Week pills on desktop.** Previously the mode switch was hidden for Agenda, leaving no in-UI way back to a Planner view.
- **Week planner tracks scroll.** Scrolling the multi-week list now syncs the focused week to the header label and surfaces the Today button when today leaves view.
- **Neutral fallback theme.** All `--dt-*` CSS fallbacks are normalized to the `neutral` light preset values. Previously the same token fell back to different colors per file (near-white text in some views, black in others) and midnight-red leaked into accent/glow/today defaults. No visual change when the auto-theme or a preset supplies tokens.
- Desktop controls drop the uppercase/letter-spacing styling for a more neutral, embeddable look. The `header` and `navigation` snippets still replace the built-in chrome for full customization.

### Added
- Demo: "Examples" recipes (Booking page, Class timetable, Embedded schedule), a live "Code for this setup" panel showing the exact `<Calendar>` markup for the current settings, and tooltip hints on every control naming the prop it drives.

### Docs
- The docs page now renders a sticky table-of-contents sidebar (heading ids are generated at render time; marked v17 stopped emitting them, which had silently broken the TOC).
- README covers the previously undocumented exports: custom view registration (`views` + `CalendarView`), rendering primitives, the JMAP adapter, engine factories, `probeHostTheme`/`observeHostTheme`, optional Pretext text fitting (`initTextMeasure`), locale/timezone/palette helpers, and a utilities reference table.

## 0.6.9 — 2026-06-29

### Security
- Bump vulnerable devDependencies to clear npm High CVE alerts: `vite` ^7.3.1 → ^7.3.5, `vitest` ^4.0.18 → ^4.1.0, `@sveltejs/kit` ^2.50.2 → ^2.60.1, `jsdom` ^28.1.0 → ^29.0.0 (resolves `undici` to 7.28.0), `@chenglou/pretext` ^0.0.4 → ^0.0.5.

### Changed
- Ship `widget/widget.js` unminified. The bundled IIFE (served via `cdn.jsdelivr.net/npm/@nomideusz/svelte-calendar/widget/widget.js`) was previously esbuild-minified, which triggered npm's Minified code / Obfuscated code / AI-detected anomaly alerts. The file is now readable JS (~380 KB, was 145 KB). CDN URL unchanged — no breaking change for embeds.

## 0.6.8 — 2026-06-17

### Changed
- Add `homepage` field pointing to the live demo (now shown as Homepage on npm).
- Add a live-demo link to the README.
- Ship the MIT `LICENSE` file in the published tarball (previously absent).

## 0.6.7 — 2026-06-05

### Fixed
- **Standalone install (pnpm 11+)** — sync now ships `pnpm-workspace.yaml` with `allowBuilds` for esbuild so `pnpm install` succeeds locally and in CI (republish; 0.6.6 did not reach npm).

## 0.6.6 — 2026-06-05

### Fixed
- **Day planner event labels** — restore vertical text in the day filmstrip view (`writing-mode: vertical-rl`) so titles read along the lane height; text fitting uses swapped width/height limits for vertical layout.

### Changed
- Demo site defaults to **Day Planner** view so the day filmstrip layout is shown first.

## 0.6.5 — 2026-04-25

### Added
- Demo controls for mobile mode, visible hours, custom week length, blocked slots, disabled dates, and compact agenda rendering.
- README/docs notes for drag previews, disabled-date behavior, mobile overlap layout, and professional package defaults.

### Changed
- Week planner drag-and-drop now renders a live ghost preview at the target day instead of only fading the original event.
- Planner day event cards use horizontal text by default for better scanability and localization.
- Disabled dates visually indicate unavailable days without blocking clicks on existing events.
- Floating controls reserve more layout space in planner/agenda views to avoid covering first-row content.
- Component fallback styles now lean on neutral system fonts and a blue accent instead of stronger demo-specific defaults.
- Demo favicon now uses a calendar-specific mark instead of the Svelte logo.

### Fixed
- Mobile day overlap positioning now uses valid CSS math so concurrent events render in stable columns.
- Mobile week no longer nests focusable event controls inside a day button.

## 0.6.4 — 2026-04-23

### Docs
- Documented new `TimelineEvent` fields: `location`, `status` (with 5 `EventStatus` values), `externalId`, `resourceId`.
- Added sections for `createMappedAdapter` (declarative field mapping + custom `mapEvent` transform) and `createCompositeAdapter` (merging adapters with `primaryIndex` routing).
- Added Headless API section covering `createCalendar()` and `createAgenda()` for BYO-UI scenarios.
- Documented `header` and `navigation` snippet overrides plus `height="auto"` + `compact` for agenda embeds.
- Expanded widget attribute reference (`events`, `view`, `locale`, `dir`, `mondaystart`, `headers`).
- Updated props table: `compact`, `header`, `navigation`, `height: 'auto'`, 6 built-in views.

## 0.6.3 — 2026-03-02

### Fixed
- **Mobile agenda day cutoff** — events at the bottom of the agenda day view were clipped on mobile; added `min-height: 0` to the scroll body and reduced excess top padding.

### Changed
- **CI: unified release workflow** — single workflow handles tag creation, GitHub Release, and npm publish via OIDC trusted publishing (Node 24).

## 0.6.1 — 2026-03-02

### Added
- **PlannerDay & MobileDay "Up next" badge** — the next upcoming event today now shows a dashed-border highlight and an "Up next" label, complementing the existing "NOW" live indicator for current events.

## 0.6.0 — 2026-03-02

### Added
- **Smart auto-theme engine** — the default `auto` theme now probes the host page at mount time (background color, accent/brand color, fonts, light/dark mode) and generates matching `--dt-*` CSS tokens automatically. Reactively watches for host theme changes (e.g. dark-mode toggle). Fine-tune with `autoTheme={{ mode, accent, font }}` or disable probing with `autoTheme={false}`.
- **Mobile views** — new `MobileDay` (vertical time grid with swipe navigation, all-day chips, tap-to-create) and `MobileWeek` (vertical day-list with relative date labels). Automatically activated on narrow screens (`<768px`) via `mobile="auto"` (default). Force with `mobile={true/false}`.
- **Centralized mobile header** — `Calendar.svelte` renders a unified mobile header with prev/next navigation, Day/Week mode pills, date label, and a "Today" pill (shown below the header to avoid layout shift).
- **`mobile` prop** on Calendar: `'auto'` (detect via matchMedia), `true` (always mobile), or `false` (always desktop).
- **`autoTheme` prop** on Calendar: `{ mode?, accent?, font? }` to override auto-detection, or `false` to disable.
- **`probeHostTheme()` / `observeHostTheme()` exports** — auto-theme utilities available for external use.
- **`generatePalette()` export** — generate theme-harmonious event color palettes from any accent color.

### Changed
- **Planner views** remapped to Mobile views on small screens — Planner Day/Week automatically switch to MobileDay/MobileWeek when `mobile` is active. Agenda views keep their list-based layout but hide desktop floating navigation.
- **AgendaWeek** — day headers now use full weekday and month names (e.g. "Monday, March 2" instead of "Mon, Mar 2"). Event counts removed from headers.
- **AgendaDay / AgendaWeek** — desktop floating nav pills (Today/←/→) and date labels hidden on mobile; the centralized Calendar header handles navigation.
- **Calendar "Today" button** — moved from the header row to a separate bar below, eliminating layout shift when it appears/disappears.
- **MobileDay gutter** — reduced from 52px to 40px for a tighter layout on small screens.
- **Demo page** — richer seed data, responsive layout improvements, theme picker updates.
- **Theme presets** — `auto` preset triggers the smart auto-theme engine instead of being a passive empty string.

### Fixed
- **MobileDay first hour cutoff** — added `padding-top` to the scroll container so the first hour label (offset by `top: -6px`) is no longer clipped.
- **Auto-theme race conditions** — background probe uses a hidden element to avoid flashing; surface hierarchy detection is robust across ancestor layers.
- **Text color contrast** — auto-theme validates detected text color against background luminance before applying.

## 0.5.1 — 2026-03-01

### Added
- **`CalendarLabels` i18n system** — all user-visible UI strings ("Today", "Day", "Week", "Now", "Free", "All day", "Up next", etc.) are now configurable via `setLabels()`. Override any subset of labels for full localisation — unset keys fall back to English defaults.
- **`CalendarLabels` interface** — typed interface covering 30+ static labels and 5 parameterised functions (`nMore`, `nEvents`, `nCompleted`, `dayNOfTotal`, `percentComplete`).
- **`setLabels(overrides)`** — merge partial label overrides at runtime.
- **`resetLabels()`** — restore all labels to English defaults.
- **`getLabels()`** — read current active labels.
- **`defaultLabels` export** — the full English label set, useful as a reference when building translations.
- 10 new tests covering label get/set/reset, dynamic functions, overrides, and integration with `fmtDay()`.

### Changed
- `fmtDay()` now uses `CalendarLabels` for "Today", "Yesterday", "Tomorrow" instead of hardcoded strings.
- All primitives (`NowIndicator`, `EventBlock`, `EmptySlot`) read labels via `getLabels()` for visible text and `aria-label` attributes.
- `Calendar.svelte` — Day/Week granularity pills and `aria-label` attributes use labels.
- `AgendaDay` / `AgendaWeek` — section headers (Done, Now, Free, Up next, No events), navigation buttons (Today, Previous/Next day/week), empty states, and all `aria-label` strings use labels.
- `PlannerDay` / `PlannerWeek` — navigation, all-day banners, overflow counts, in-progress markers, and `aria-label` strings use labels.
- `CalendarWidget` — default view registrations use `L.planner` / `L.agenda` labels.

## 0.5.0 — 2026-03-01

> **Active development** — this library is under active development. APIs may evolve between minor versions. Pin your version if you need stability.

### Added
- **Planner view** — new `Planner` component with `mode: 'day'` (horizontal filmstrip timeline) and `mode: 'week'` (multi-week vertical scroll). Replaces the previous DayGrid/WeekGrid approach with a cleaner, more focused design.
- **AgendaDay view** — dedicated single-day agenda with three-section layout: Done (past events + now indicator), Queue (upcoming today), and Plan (future days). Past events render above the NOW strip in a merged column.
- **AgendaWeek view** — rolling 7-day agenda with day grouping and relative date labels (Today, Tomorrow, Yesterday, etc.).
- **Floating pill navigation** — all views now use a consistent frosted-glass pill-nav pattern for Today/←/→ controls. Today pill smoothly hides when today is already in view and slides in when navigated away.
- **Scroll-tracking date label** — PlannerDay shows a floating date pill (full weekday + date) that updates as the user scrolls through the timeline. AgendaDay shows a matching date pill for the focused date.
- **`WeekSchedule` convenience component** — moved to `$lib/convenience/` as a standalone zero-config weekly schedule wrapper.
- **`fmtTime()` / `fmtDuration()` utilities** — new locale-aware time and duration formatting functions exported from core.
- **Shared site header** — layout now includes a persistent header with logo, Demo/Docs navigation (with active state), and GitHub link across all pages.
- **Documentation page** (`/docs`) — new server-rendered docs page with markdown content, syntax-highlighted code blocks, and full typography styles.
- **Demo settings panel** — extracted to `Settings.svelte` route component with horizontal multi-column grid layout, theme picker, and view/locale/RTL/mondayStart controls.

### Changed
- **View architecture overhaul** — removed `DayGrid`, `DayTimeline`, `WeekGrid`, `WeekHeatmap`, and `Settings` view components. The library now ships `Planner` and `Agenda` as the two primary view families.
- **Simplified exports** — library barrel export trimmed from 30+ symbols to a focused public API. Removed internal time helpers (`DAY_MS`, `HOUR_MS`, `pad`, `fractionalHour`, etc.) and view-specific types (`WeekTimelineProps`, `DayTimelineProps`, `ViewDateRange`).
- **Theme presets reduced** — removed `parchment` and `indigo` presets; library ships `midnight`, `neutral`, and `bare`.
- `Toolbar` redesigned — cleaner view-selector pills with simplified styling.
- `Calendar` shell passes view-label context to conditionally show/hide navigation elements per view type.
- `ViewState` engine updated with refined focus-date management and granularity handling.
- Demo page (`+page.svelte`) streamlined — inline header removed (moved to layout), reduced padding, cleaner seed data.
- Docs page sidebar removed — navigation now handled by shared site header.

### Removed
- `DayGrid` component and day grid view.
- `DayTimeline` component and day timeline view.
- `WeekGrid` component and week grid view.
- `WeekHeatmap` component and week heatmap view.
- `Settings` view component (replaced by route-level demo component).
- `WeekSchedule` from views barrel (moved to convenience).
- `parchment` and `indigo` theme presets.
- Docs sidebar TOC navigation (replaced by shared header nav).
- Multiple internal time utilities and types from public API.

## 0.4.0 — 2026-02-26

> **Active development** — this library is under active development. APIs may evolve between minor versions. Pin your version if you need stability.

### Added
- **Horizontal settings panel** — settings now render as a compact multi-column grid (`auto-fit` columns) instead of a narrow vertical list. The calendar stays visible while adjusting options.
- **`enabledWhen` on range fields** — range sliders can reference a toggle key; when the toggle is off the sliders are disabled and dimmed (e.g. Visible Hours → Start/End Hour).
- **GitHub stars link** on the demo page header.
- **Active development notice** in README and CHANGELOG.
- **GitHub stars badge** in README.

### Changed
- Settings field groups flow in responsive CSS grid columns (`repeat(auto-fit, minmax(170px, 1fr))`) — adapts from 1 to 5 columns depending on viewport.
- Theme picker and ungrouped fields (demo mode, color strategy) render in a horizontal top bar instead of stacked sections.
- Theme pills now use the same `.stg-pill` styling as all other segment controls (unified design).
- Range controls stack vertically (label + value above, full-width slider below) so slider width is consistent regardless of label length.
- Toggle and select rows use `justify-content: space-between` so controls align in columns.
- Segment rows (e.g. Direction) stack vertically — label on top, pills below.
- Section titles use consistent styling across theme bar and grouped sections.
- Settings root no longer has a `max-width` cap — fills the container naturally.
- Direction field changed from segment pills to select dropdown to match Locale control.
- All `font` shorthand declarations using `inherit` replaced with separate `font-weight`/`font-size`/`line-height` properties (invalid CSS fix).
- Font sizes increased across the settings panel for better readability in the wide layout.
- Removed colored theme dots — theme pills now match standard pill design.

### Fixed
- Labels were far from controls due to `justify-content: space-between` on all rows — now layout varies by field type.
- Slider widths varied based on label text width — fixed by stacking label above slider.
- Start/End Hour sliders stayed interactive when Visible Hours toggle was off.
- Empty space on the right side of settings grid (`auto-fill` → `auto-fit`).
- Invalid CSS: `font: 600 9px / 1 inherit` shorthand replaced with individual properties.

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
