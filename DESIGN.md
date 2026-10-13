---
name: svelte-calendar
description: Fahrplan — a Swiss railway timetable for the demo board and the calendar's default look.
colors:
  board: "#111111"
  board-ink: "#f5f5f3"
  board-dim: "rgba(245, 245, 243, 0.64)"
  board-rule: "rgba(245, 245, 243, 0.16)"
  signal: "#eb0000"
  page-white: "#ffffff"
  neutral-text: "rgba(0, 0, 0, 0.87)"
  neutral-text-2: "rgba(0, 0, 0, 0.54)"
  neutral-text-3: "rgba(0, 0, 0, 0.38)"
  neutral-border: "rgba(0, 0, 0, 0.08)"
  neutral-border-day: "rgba(0, 0, 0, 0.14)"
  neutral-accent: "#2563eb"
typography:
  board-mark:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 88"
  board-clock:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontFeature: "'tnum'"
    fontVariation: "'wdth' 88"
  gutter-hour:
    fontFamily: "var(--dt-sans, system-ui, sans-serif)"
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "'tnum'"
    fontVariation: "'wdth' 90"
  gutter-suffix:
    fontFamily: "var(--dt-sans, system-ui, sans-serif)"
    fontSize: "10px"
    fontWeight: 600
    lineHeight: 1
  day-number:
    fontFamily: "var(--dt-sans, system-ui, sans-serif)"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "'tnum'"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1
    fontFeature: "'tnum'"
  event-time:
    fontFamily: "var(--dt-sans, system-ui, sans-serif)"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.15
    fontFeature: "'tnum'"
  prop-name:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11.5px"
    fontWeight: 500
    lineHeight: 1
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  key: "2px"
  event: "3px"
  plate: "4px"
  phone: "28px"
spacing:
  hair: "2px"
  xs: "8px"
  sm: "12px"
  md: "18px"
  lg: "24px"
  xl: "32px"
components:
  board-bar:
    backgroundColor: "{colors.board}"
    textColor: "{colors.board-ink}"
    height: "64px"
    padding: "0 24px"
  board-key:
    backgroundColor: "{colors.board-ink}"
    textColor: "{colors.board}"
    rounded: "{rounded.key}"
    padding: "7px 10px"
  setup-tab:
    textColor: "{colors.neutral-text-2}"
    rounded: "{rounded.plate}"
    padding: "8px 12px"
    typography: "{typography.body}"
  setup-tab-selected:
    backgroundColor: "{colors.neutral-text}"
    textColor: "{colors.page-white}"
    rounded: "{rounded.plate}"
  prop-chip:
    rounded: "{rounded.plate}"
    height: "28px"
    padding: "0 10px 0 8px"
  prop-chip-on:
    backgroundColor: "{colors.neutral-text}"
    textColor: "{colors.page-white}"
    rounded: "{rounded.plate}"
  view-pill-active:
    backgroundColor: "{colors.neutral-text}"
    textColor: "{colors.page-white}"
    rounded: "{rounded.plate}"
    padding: "6px 12px"
  now-plate:
    backgroundColor: "{colors.neutral-accent}"
    textColor: "{colors.page-white}"
    rounded: "{rounded.event}"
    padding: "2px 4px"
  code-panel:
    backgroundColor: "{colors.board}"
    textColor: "{colors.board-ink}"
    rounded: "{rounded.plate}"
    typography: "{typography.code}"
---

# Design System: svelte-calendar

## Overview

**Creative North Star: "Fahrplan"**

A Swiss railway timetable and departure board. The demo site is a black enamel board over a stage that belongs to someone else: the board carries the wordmark, navigation, install line and a live clock; everything below it is the simulated host page, coloured only through `--dt-*` tokens from `src/routes/theme.svelte.ts`. The demo has no stage colour of its own.

The system has two layers, recorded separately. **Demo layer** (`src/routes/+layout.svelte`, `+page.svelte`, `_components/Settings.svelte`): board tokens, Archivo, JetBrains Mono for prop names and code. **Calendar layer** (`src/lib/**`): themed only through the `--dt-*` contract; its defaults read like a timetable: bold hour numerals in the gutter, a reversed plate for now, an accent underline for today.

Rank comes from weight and reversal, never from colour. Selection is always an ink plate, meaning the text colour becomes the fill and the background colour becomes the text.

**Key Characteristics:**
- Black enamel board (#111) with white type; signal red only for the live clock dot, the info line's live dot and the active nav underline.
- Archivo grotesque in two widths (variable wdth 62–125, used at 88–90% for the wordmark, clock and gutter numerals), with tabular numerals everywhere.
- Hairline rules and 3–4px corners; flat, with no shadows.
- Selected state = ink plate, the same in the props strip, setups, view pills and toggle chips.
- The calendar's accent is reserved for now and today.

## Colors

The board is monochrome enamel with one signal red. The calendar has no fixed palette: every colour arrives through `--dt-*`, and the `neutral` preset values below are only its light fallback.

### Primary
- **Enamel Black** (board): the board bar, the code panel and the phone-frame bezel.
- **Board White** (board-ink): all type on the board, and the fill of board keys (copy buttons).

### Secondary
- **Signal Red** (signal): the live clock dot, the props strip's live dot and the 2px underline under the current nav item. Nothing else.

### Neutral
- **Board Dim** (board-dim): inactive nav links, the host label and the timezone line on the board.
- **Board Rule** (board-rule): hairlines and outlines on the board.
- **Calendar defaults** (neutral-text, neutral-text-2/3, neutral-border, neutral-border-day, neutral-accent): the `neutral` preset in `src/lib/theme/presets.ts`. Hosts override them with `--dt-bg`, `--dt-surface`, `--dt-text`, `--dt-text-2`, `--dt-text-3`, `--dt-border`, `--dt-border-day`, `--dt-accent`, `--dt-btn-text` and the rest of the contract.

### Named Rules
**The One Signal Rule.** On the board, red marks only what is live or current: the clock dot, the live dot and the active nav underline. Red is never used for decoration, a button or a heading.

**The Borrowed Stage Rule.** Below the board, every colour is a `--dt-*` token. The demo never paints the stage itself, because adapting to the host is the claim it has to show.

**The Reserved Accent Rule.** In the calendar, `--dt-accent` marks now (the reversed clock plate and its 2px line) and today (an accent numeral on a 2px underline). Selection uses the ink plate and never the accent.

**The Token Contract Rule.** `--dt-*` names are public API. Never rename or remove one. A new default look ships as new values only.

## Typography

**Display/Body Font:** Archivo (variable, wdth 62–125, wght 400–800), with system-ui as the fallback. The calendar uses `--dt-sans`.
**Mono Font:** JetBrains Mono, for prop names, the install command and the code panel only.

**Character:** A railway grotesque at heavy weights for figures you read from across a platform, and a monospace that appears only where the text is literally code.

### Hierarchy
- **Board mark / clock** (800, 22px / 26px, condensed to 88%): the wordmark and the live HH:MM.
- **Gutter hour** (700, 17px, condensed to 90%, tabular): the hour numeral, with a raised suffix (600, 10px, `--dt-text-2`) of `00` in 24h locales and `am`/`pm` in 12h locales, from `fmtHParts`. On mobile the numeral is 15px and the suffix 9px.
- **Day number** (700, 18px): the date in planner headers.
- **Title** (700, 15px): select values in the props strip and the code panel heading.
- **Body / control** (600, 14px): nav links and setup tabs.
- **Event** (12px; time at 500, title at 700): time and title share one size, and weight alone ranks them.
- **Prop name** (mono 500, 11.5–12px): the label over each select and the text on toggle chips.

### Named Rules
**The Tabular Rule.** Every time and date figure uses tabular numerals in the sans face. The calendar uses no mono for times.

**The Code-Only Mono Rule.** JetBrains Mono appears only where the text is a prop name, a command or markup.

## Layout

The site is a 1280px column (`--site-w`) with 24px gutters (16px under 700px). The board bar is 64px tall and spans the full width, with its contents held in that column. Under it runs a ruled props strip: a 2px `--dt-text` top rule, 1px `--dt-border-day` row rules, and selects split by vertical hairlines like timetable columns, then a row of toggle chips and a one-line info row. The calendar sits at full content width; under 700px it bleeds to the screen edges, and the props collapse behind a 44px toggle. The code panel sits 32px below the calendar. Spacing steps are 2/8/12/18/24/32px; gaps of 2px separate the tabs within a row.

## Elevation & Depth

Flat. Depth comes from reversal (board on page, ink plate on ground) and from hairline rules, never from shadow. The only `box-shadow` in the new defaults is an inset 2px line under today's numeral, which works as an underline and not as elevation.

## Shapes

Corners are small and square-cut: 4px for plates, chips, pills and the code panel; 3px for event blocks, the now plate and swatches; 2px for board keys and focus corners. Circles appear only in the live dots. The phone-preview bezel is the one round form (28px, with an 8px board border).

## Components

### Board bar
Enamel bar 64px tall. Nav links are 600 14px in board-dim; the current one turns board-ink with a 2px signal underline. Host swatches are 24px squares split diagonally into the host ground and a corner flag of its accent; the pressed one gets a 2px board-ink outline. The install button is a hairline box with mono text and a board key. The clock is right-aligned, with the zone line and red dot below it.

### Ink plate (selected state)
`--dt-text` fill with `--dt-bg` text. Setup tabs, toggle chips with a filled 9px box, the calendar's active view pill and the mobile view pill all use it. Hover darkens the text or the border and never adds a fill. Focus is a 2px `--dt-text` outline offset by 2px.

### Props strip
Selects show the prop name in mono over its value in bold sans, with a chevron data-SVG and no box. Ranges and chips use 1px rule boxes at 28px height (36px on mobile). Disabled controls drop to 0.38 opacity.

### Timetable gutter (calendar)
Bold hour numerals with a raised small suffix. An hour label that the now plate would half-cover is hidden. The gutter is 52px wide.

### Now and today (calendar)
Now is the HH:MM on a reversed plate (`--dt-accent` fill, `--dt-btn-text` text, 700 10px) on a solid 2px accent line. Today is the accent numeral on a 2px underline. Every view uses that one mark; there are no discs or pills.

### Event block (calendar)
Event blocks have 3px corners, a fill of 14% `--ev-color` mixed into the surface, and a 3px left stripe of `--ev-color` as the colour key. Tentative events are dashed and cancelled ones fade. In narrow overlap columns a container query drops the end time.

### Code panel
Board enamel with 4px corners, a hairline under the 700 15px heading, a board key for copy, and mono 13px/1.6 for the code. It goes edge to edge on mobile.

## Do's and Don'ts

### Do:
- **Do** mark every selected state with the ink plate (`--dt-text` fill, `--dt-bg` text).
- **Do** set every time and date figure in the sans face with tabular numerals.
- **Do** keep `--dt-accent` for now and today only.
- **Do** colour everything below the board through `--dt-*` tokens, with hex values only in preset and demo-theme definitions.
- **Do** keep the event stripe as the event's colour key.

### Don't:
- **Don't** use signal red for anything except the live dots and the active nav underline.
- **Don't** mark today with a disc, pill or filled circle; use the accent numeral on a 2px underline.
- **Don't** use mono for times inside the calendar.
- **Don't** add shadows to show elevation, or corners above 4px on plates and controls.
- **Don't** rename or remove a `--dt-*` token or a prop.
