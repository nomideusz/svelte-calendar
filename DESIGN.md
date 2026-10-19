---
name: svelte-calendar
description: Stendig on paper — a wall calendar printed on engraving paper; dates and hours are the typography, events are ink on a rule, the host's accent is the only colour.
colors:
  paper: "#efebe9"
  paper-surface: "#f4f1ee"
  ink: "#0f0f0f"
  ink-2: "rgba(15, 15, 15, 0.66)"
  ink-3: "rgba(15, 15, 15, 0.54)"
  rule: "rgba(15, 15, 15, 0.3)"
  rule-day: "rgba(15, 15, 15, 0.6)"
  weekend-wash: "rgba(15, 15, 15, 0.035)"
  hover-wash: "rgba(15, 15, 15, 0.05)"
  accent: "#1d4fd7"
  accent-text: "#ffffff"
  midnight-bg: "#0b0e14"
  midnight-surface: "#10141c"
  midnight-ink: "rgba(226, 232, 240, 0.85)"
  midnight-rule: "rgba(148, 163, 184, 0.07)"
  midnight-rule-day: "rgba(148, 163, 184, 0.14)"
  midnight-accent: "#ef4444"
typography:
  wordmark:
    fontFamily: "Encode Sans, system-ui, sans-serif"
    fontSize: "calc(54 * var(--u))"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 92"
  day-number:
    fontFamily: "var(--dt-sans, system-ui, sans-serif)"
    fontSize: "40px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 90"
  gutter-hour:
    fontFamily: "var(--dt-sans, system-ui, sans-serif)"
    fontSize: "26px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "'tnum'"
    fontVariation: "'wdth' 85"
  gutter-suffix:
    fontFamily: "var(--dt-sans, system-ui, sans-serif)"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1
  weekday:
    fontFamily: "var(--dt-sans, system-ui, sans-serif)"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.08em"
  control:
    fontFamily: "var(--dt-sans, system-ui, sans-serif)"
    fontSize: "calc(24 * var(--u))"
    fontWeight: 400
    lineHeight: 1
  control-sm:
    fontFamily: "var(--dt-sans, system-ui, sans-serif)"
    fontSize: "calc(22 * var(--u))"
    fontWeight: 400
    lineHeight: 1.2
  clock:
    fontFamily: "var(--dt-sans, system-ui, sans-serif)"
    fontSize: "calc(28 * var(--u))"
    fontWeight: 400
    lineHeight: 1
    fontFeature: "'tnum'"
  event-title:
    fontFamily: "var(--dt-sans, system-ui, sans-serif)"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.25
  event-time:
    fontFamily: "var(--dt-sans, system-ui, sans-serif)"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.2
    fontFeature: "'tnum'"
  event-meta:
    fontFamily: "var(--dt-sans, system-ui, sans-serif)"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.2
  allday:
    fontFamily: "var(--dt-sans, system-ui, sans-serif)"
    fontSize: "13.5px"
    fontWeight: 500
    lineHeight: 1.2
  now-plate:
    fontFamily: "var(--dt-sans, system-ui, sans-serif)"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.2
    fontFeature: "'tnum'"
  code:
    fontFamily: "var(--dt-mono, ui-monospace, monospace)"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
  docs-h2:
    fontFamily: "var(--dt-sans, system-ui, sans-serif)"
    fontSize: "26px"
    fontWeight: 500
    lineHeight: 1.25
  docs-body:
    fontFamily: "var(--dt-sans, system-ui, sans-serif)"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  none: "0"
  control: "calc(6 * var(--u))"
  swatch: "calc(5 * var(--u))"
  install: "calc(8 * var(--u))"
  switch: "calc(22 * var(--u))"
  phone: "28px"
spacing:
  u: "clamp(0.7px, calc(100vw / 1872), 1px)"
  rail-w: "calc(562 * var(--u))"
  bar-h: "calc(74 * var(--u))"
  rail-pad: "calc(34 * var(--u)) calc(40 * var(--u)) calc(32 * var(--u))"
  main-pad: "0 calc(40 * var(--u)) calc(24 * var(--u)) calc(38 * var(--u))"
  select-gap: "calc(22 * var(--u))"
  toggle-gap: "calc(10 * var(--u)) calc(20 * var(--u))"
  gutter-w: "60px"
  hour-h: "64px"
components:
  button-frame:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "calc(44 * var(--u))"
    padding: "0 calc(16 * var(--u))"
    typography: "{typography.control-sm}"
  button-frame-hover:
    textColor: "{colors.accent}"
  select:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "calc(50 * var(--u))"
    padding: "0 calc(40 * var(--u)) 0 calc(16 * var(--u))"
    typography: "{typography.control-sm}"
  switch:
    textColor: "{colors.ink}"
    rounded: "{rounded.switch}"
    height: "calc(40 * var(--u))"
    padding: "0 calc(8 * var(--u)) 0 calc(16 * var(--u))"
  switch-on:
    textColor: "{colors.accent}"
    rounded: "{rounded.switch}"
  setup:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 0 calc(6 * var(--u))"
    typography: "{typography.control}"
  host-swatch:
    rounded: "{rounded.swatch}"
    width: "calc(62 * var(--u))"
    height: "calc(74 * var(--u))"
  install:
    textColor: "{colors.ink}"
    rounded: "{rounded.install}"
    height: "calc(52 * var(--u))"
    padding: "0 calc(6 * var(--u)) 0 calc(14 * var(--u))"
  code-drawer:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    typography: "{typography.code}"
  event:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "3px 7px"
    typography: "{typography.event-title}"
  allday-band:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-text}"
    rounded: "{rounded.none}"
    height: "36px"
    padding: "0 10px"
    typography: "{typography.allday}"
  now-plate:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-text}"
    rounded: "{rounded.none}"
    padding: "2px 4px"
    typography: "{typography.now-plate}"
---

# Design System: svelte-calendar

## Overview

**Creative North Star: "Stendig on paper"**

A wall calendar printed on good paper. Lineage: Vignelli's Stendig calendar (the numerals are the design) crossed with engraved score paper (ruled lines, one coloured beam). The date numbers in the headers and the hour numerals in the gutter are the typography of the page; events are text set on a rule with a short bar at their start; the host page's accent is the only colour and it does three jobs. Everything else is black ink and one mid grey on warm white engraving paper with a visible grain, a raster plate (`assets/plates/paper.png`) and never CSS noise.

The system has two layers. The **calendar** (`src/lib/**`) is themed only through the `--dt-*` contract; its `neutral` preset is this paper, its `midnight` preset is the same drawing in light ink on charcoal, and `auto` derives the same ratios from the host page. The **demo chrome** (`src/routes/**`) sits on the same paper: a left rail of controls drawn in 2px ink frames, a thin bar, and a code drawer. The chrome has no colour of its own; when a host swatch changes the page, the band, the now line and today take the host's colour and the paper stays.

Stendig's discipline without its shout: one grotesque at regular weight, no black weights, no poster sizes, nothing reversed except the all-day band and the now plate.

**Key Characteristics:**
- Black ink (#0f0f0f) and one mid grey on warm paper (#efebe9) with a raster grain under every opaque calendar surface.
- Encode Sans at 400 for everything, 500 for titles, narrowed for numerals; tabular figures for every time.
- Big numerals: day numbers 40px, gutter hours 26px, about three times the text.
- Events are ink text on a hairline with a 3px start bar; no fills, no cards, no shadows.
- One accent, three jobs: the all-day band, the now line, today's number.
- Rules are drawn, not hinted: 2px ink frames in the chrome, visible hairlines in the grid.

## Colors

Monochrome ink on paper, one host accent; the dark presets keep the same roles in light ink on charcoal.

### Primary
- **Host Accent** (accent): the all-day band fill, the 2px now line with its dot and reversed clock plate, today's weekday and number, and in the chrome the ON state of a switch, the underline of the chosen setup, the pressed host swatch's border and the hover colour of Today ‹ ›. `neutral` reads it from `--asini-accent`, else blue; `auto` probes the host page and raises saturation to at least 0.5 for legibility.
- **Accent Text** (accent-text): the only text on an accent fill (band title, now plate). `auto` keeps white while it holds 4.5:1 on the accent, else switches to ink `#0f0f0f`; demo hosts set whichever holds: ink on Slate and Forest, white on Ocean, Rose and Paper. Host accents are stored at the value `auto` would raise them to, so swatch, page controls and calendar show one colour, and every accent holds 4.5:1 as text on its ground.

### Neutral
- **Paper** (paper): the page and every opaque calendar surface, with the grain plate over it via `--dt-paper` on the Paper host.
- **Paper Surface** (paper-surface): `--dt-surface`, the drag-time plate behind the gutter's time readout.
- **Ink** (ink): all text, the 2px frames, 2px section rules, the wordmark, focus outlines, event titles and times, and the default event bar (`--dt-event: var(--dt-text)`).
- **Ink 2** (ink-2): nav links at rest, the clock zone, the info line, tentative and full event titles, the gutter suffix, the switch's border when off.
- **Ink 3** (ink-3): the all-day gutter label and the dashed border of the drag source.
- **Rule** (rule): hour lines, column separators and the header's bottom rule (`--dt-border`). Half-hour lines are the same rule at 0.4 opacity.
- **Rule Day** (rule-day): the rail's right hairline, the bar's bottom hairline, select-value hairlines and the gutter tick (`--dt-border-day`).
- **Weekend Wash / Hover Wash** (weekend-wash, hover-wash): the weekend column tint and the event hover ground; past days take a 4% ink wash.
- **Midnight** (midnight-bg, midnight-surface, midnight-ink, midnight-rule, midnight-rule-day, midnight-accent): the package's dark preset; charcoal, light ink, red accent.

### Named Rules
**The Three Jobs Rule.** `--dt-accent` marks the all-day band, the now line and today's number. Selection, hover and rank never use it; in the chrome it may also say ON and underline the chosen setup, nothing more.

**The Ink Event Rule.** An event's colour key is its 3px start bar; the text is ink. Per-event colours tint only the bar (and the all-day band). No fill behind a timed event, except the 12% accent wash that marks the one happening now.

**The Token Contract Rule.** `--dt-*` names are public API. Never rename or remove one; a new look ships as new values only.

## Typography

**Display/Body Font:** Encode Sans (variable, wdth 75–125, wght 100–900, from Google Fonts), with system-ui as the fallback; the calendar reads it as `--dt-sans`, so a host that sets `--dt-sans` or is probed by `auto` swaps the face. The page body sets `--dt-sans`, so the demo hosts show it: Ocean is Source Sans 3, Rose is Newsreader, the rest Encode Sans. A host font is always a real stack, never `inherit` (invalid inside the `font:` shorthand).
**Mono Font:** JetBrains Mono (400, 500), `--dt-mono`; only for the install command, the markup line and code blocks.

**Character:** One grotesque at regular weight, narrowed where it becomes a numeral. Rank comes from size and ink, not from weight: the biggest figures on the page are the dates and hours at 400.

### Hierarchy
- **Wordmark** (600, 54u, stretch 92%, −0.025em): `svelte-calendar` at the top of the rail; the one semibold on the page.
- **Day number** (400, 40px, stretch 90%, −0.02em): the date in every planner header; today's is accent, the rest ink. Above it the **weekday** (500, 12px, 0.08em, uppercase, ink-2).
- **Gutter hour** (400, 26px, stretch 85%, tabular): the hour numeral, with a raised **suffix** (500, 10px, ink-2) of `am`/`pm` or `00`, then a 1px tick in rule-day to the first day line. A numeral the now plate would cover is hidden.
- **Control** (400, 24u / 22u): nav links, setups, the pager label and Today, select names and values, the clock zone. The **clock** is 28u tabular.
- **Event title** (500, 15px/1.25), **event time** (400, 14px/1.2, tabular), **event meta** (400, 12.5px): title first, time under it, location third; one family, ranked by weight only.
- **All-day title** (500, 13.5px) on the band; **now plate** (500, 11px, tabular) reversed on the accent.
- **Code** (mono 400, 13px/1.6 in blocks; 17–18u on the install and markup lines).
- **Period title** (400, 32px; 22px compact): the calendar header's "October 2026", "Oct – Nov 2026" or the full date in day view.
- **Labels** (500, 12px, ink-2): month weekday heads and the all-day gutter label; out-of-month day numbers are ink-2; month chips 12.5px; a blocked-slot label 11px.
- **Docs** (h1 500 36px, h2 500 26px over a 2px ink rule, body 16px/1.55, prose capped at 60ch inside the 44rem column (code and tables keep the full width), lede 19px/1.45, table heads 500 12px uppercase; every size on this scale).

### Named Rules
**The Tabular Rule.** Every time and date figure sets tabular numerals in the sans; the calendar never uses mono for times.

**The Regular Weight Rule.** Text is 400; a title or a label that must stand out is 500; nothing above 600, and 600 only on the wordmark.

## Layout

The page is drawn at a 1872px comp and scales with one unit: `--u = clamp(0.7px, 100vw / 1872, 1px)`. Every chrome measure is `N * var(--u)`; the calendar's own measures stay in px (gutter 60px, hour row 64px, column minimum 110px) because hosts embed it at their own size.

Desktop (above 1360px; below that the 562u rail leaves the week too narrow, Sunday clipped or the container under 768px): a two-column grid, a sticky 562u rail on the left with the paper and one rule-day hairline on its right, the main column beside it. The rail is padded 34u/40u/32u and stacks: wordmark (36u below it), the page's controls (setups over a 2px ink rule, then selects at 12u gaps, toggles 18u below them in two columns at 10u×20u, then a "More props" disclosure over a hairline holding the rarer switches and the ranges), then a foot over a 2px ink rule with the five host swatches spaced across a 2px-ruled row and the install line. The main column opens with a 74u bar (nav left at 44u gaps; Today ‹ › and the clock right at 40u gaps) under a rule-day hairline, then the page padded 40u/38u. The calendar fills the remaining height; the info line (the hovered control's hint, else the last callback, else how to start, beside the external drag source; always as tall as its longest message) sits 16u under it and the code drawer 16u under that, pinned to the bottom edge. On the docs the rail is a sticky column one viewport tall instead: its contents list (grouped, marking the section in view) scrolls inside it above a static foot, so the foot never covers an entry; at or below 1360px that list moves into an "On this page" disclosure under the lede.

At or below 1360px the calendar comes first: the bar carries the wordmark (40px, on its own row) and wraps at 10px/20px, the rail folds under the page behind a 2px ink rule (static, 24px/20px padding, its own wordmark hidden), its controls run in columns (selects and ranges at 280px minimum, switches at 190px) and its foot becomes a wrapping row. The setups row moves above the calendar at this width, so a tap changes what is on screen; at or below 640px it is one row that scrolls sideways and snaps, its last button cut at the edge, and the quick row holds the view and theme selects side by side over the host swatches (44×44), so the calendar starts under 300px on a 390×844 phone. At or below 640px the bar's wordmark drops to 32px, the controls return to the rail's own stack, swatches to 44×52px, and the install line fills the width. The 390px phone preview is an 8px ink bezel with 28px corners on desktop and the screen itself on a phone.

## Elevation & Depth

Flat. The page is one sheet of paper; depth is drawn as rules and reversal, never as shadow. There is no shadow at rest anywhere in the chrome or the calendar. A pressed host swatch adds a 1px accent ring (`0 0 0 1px` box-shadow) outside its 2px border, which is an outline, not a lift. The only lifts are transient: an event being resized (`0 4px 20px rgba(0,0,0,0.25)`) and the move ghost, which vanish on release.

### Named Rules
**The Drawn Rule Rule.** Structure is a visible line: 2px ink for frames and section rules in the chrome, 1px rule (0.3 ink) for the grid, 1px rule-day (0.6 ink) for the rail, bar and gutter ticks. Nothing is implied by a background shift alone.

## Shapes

The calendar is square-cut: 0 radius on events, the all-day band, the now plate, headers and the ghost. The one exception is the calendar header's controls: Today and ‹ › take `--cal-ctl-r`, half the host's `--cal-r` clamped to 4–8px, so they sit in the host's own shape. Demo controls keep small, consistent corners: 6u on framed buttons and selects, 5u on host swatches, 8u on the install line, and the switch is a 22u pill with a 13u track and a round 20u knob. Circles exist only as dots: the now dot (8px), the live dot (7px), the month chip dot (7px) and the switch knob. Frames are 2px ink; the drag source is a 1px dashed ink-3 box; the tentative bar is a dashed 4/3 pattern of the event colour.

## Components

### Calendar header
One row: the period title on the left, the view pills, then Today and ‹ › on the right; `--stack` puts the title on its own row, `--mobile` compacts it to 22px. Pills are ink-2 text with a 2px ink underline on the active one, no fill. Today and ‹ › are 2px ink frames with `--cal-ctl-r` corners, 36/40/44px tall (compact/default/coarse pointer); Today is disabled while today is in view. A visually hidden status line keeps announcing the range to screen readers.

### Button frame (bar Today, ‹ ›)
Only rendered when the calendar's own navigation is off (the Own header setup).
- **Shape:** 2px ink border, 6u corners, 44u tall; the arrows are 44u squares.
- **Default:** transparent, ink text at 22u.
- **Hover / Focus:** text and border turn accent (120ms); focus is a 2px ink outline offset 2px.

### Install line and Copy
A 2px ink frame with 8u corners, 52u tall, mono command at 18u on the left and a nested 2px ink key (6u corners, 500 17u) reading Copy, then Copied for 1.6s.

### Setups
A wrapped list of plain 24u labels over a 2px ink rule. Hover draws a 3px rule-day underline inset; the chosen one carries a 3px accent underline. No fill, no pill.

### Selects (prop playground)
The prop name (400 22u, ink) on a 108u column, the value in a 2px ink frame with 6u corners, 50u tall, 16u left padding, a 24u chevron SVG at the right. Hover keeps the ink border; focus is a 2px ink outline offset 2px. Disabled drops to 0.4 opacity.

### Switches (prop toggles)
A 22u pill, 40u tall, bordered 2px ink-2 with the prop name at 19u and a 44×26u track on the right (18% ink), knob in paper. ON: border, label and track turn accent and the knob (white) slides 18u (140ms). Two columns in the rail.

### Host swatches
Five 62×74u pages with 5u corners and a 2px ink border: the host's ground, a short bar of its accent as the all-day band and ruled lines in half-ink. Pressed: accent border plus a 1px accent ring. Hover lifts 1px (120ms). The swatches also sit compact in the docs rail foot and, on a phone, in the quick row above the calendar. Over them a "Host page" heading with the pressed host's name; no swatch is pressed until hydration (a pre-paint script applies the stored host first).

### Code drawer
A 2px ink frame under the calendar: title (400 26u) with a chevron that rotates 180° when open, Copy as a 1px rule-day box with 0 radius, the markup as one scrolling mono line (17u, ink-2) and, when expanded, the drawer lifts over the calendar (which keeps its size and scroll) with the full code at mono 13px/1.6, a line count beside Copy, Close and Esc; with `auto` it says nothing needs configuring. On a phone it opens in place within 70svh. Ligatures are off so `=>` and `!=` read as typed.

### Info line and setups state
The info line's times use the grid's own format (`fmtTime`, e.g. "Mon 10:00a"); its idle line is per view, and the drag source shows only where a drop works (planners and scroll, not read-only, not touch). Creates, moves and drops really change the demo's events; a Reset events key undoes them. The setup plus every control that differs from it live in the URL under their prop names (`?setup=booking-page&view=month-grid&locale=pl-PL&host=slate`), so a link reproduces what is on screen; tweaking a control keeps the setup chosen.

### Event block (calendar)
Adapters assign no colour unless given a `palette`, so an event without its own `color` is ink by default, exactly what the demo shows.
- **Shape:** 0 radius, transparent, a 3px start bar in `--ev-color` (the event's colour, else `--dt-event`, else the accent), body padded 3px 7px, min height 24px; a narrow overlap column drops the end time; a short block gets a 44px hit-slop.
- **Normal:** title 500 15px, time 400 14px tabular, location 12.5px, all ink.
- **Past:** 0.78 opacity; the day column behind it takes a 4% ink wash.
- **Cancelled:** title struck through in ink-2, bar at 0.45; the block stays on the grid.
- **Tentative / limited:** title in ink-2, bar dashed (4px on, 3px off).
- **Full:** title in ink-2, bar at 0.45.
- **Current:** `--dt-accent-dim` wash (12% accent); the now line runs under it, not across the text.
- **Compact:** a block too short for two lines reads "Title time" on one line and the title wins the width.
- **Tall:** a block with room for two title lines and the time (about 61px) wraps the title to two lines; the location drops out whole before the title is cut. Titles set `unicode-bidi: plaintext`, so a Latin title in an RTL calendar is cut at its end, not its start.
- **Hover:** hover-wash ground; the resize grips appear at 0.55.
- **Selected:** a 1px inset ring in the event colour.
- **Focus:** a 2px accent box-shadow ring (outline would be clipped). Every other calendar focus (day columns, cells, "+more", empty slots, toggles) is a square 2px ink outline. The header's view pills are a radio group: one tab stop per group, arrows (RTL-aware), Home and End move and select.
- **Moving:** origin at 0.3; the ghost is a 12% event-colour tint with a 1px outline.

### All-day band (calendar)
Solid `--ev-color` (the accent by default) with accent-text, 36px tall, 0 radius, title 500 13.5px; a span is one continuous band across its days. Selected is a 2px inset ring in accent-text; cancelled fades the fill 55% into the paper and strikes the title; hover brightens 8%.

### Now and today (calendar)
Now is a 2px accent line across the grid with an 8px dot at the gutter edge and the HH:MM on a reversed accent plate (500 11px, 0 radius) in the gutter. Today is the weekday and the day number in accent, with a 4% accent wash down its column. The same marks serve every view; the month grid underlines today's number in 2px accent. With `showDates` off (a weekly template) no column is today: the today marks are dropped and only the now line stays.

### Month on a phone (calendar)
The day number is 22px; the events are 7px ink dots and a "+N", both decoration. The whole cell (≥44px) is the one target and names the day and its count ("Monday, October 19, 7 events").

### Grid (calendar)
Hour lines in rule, half-hours at 0.4 opacity, columns split by rule, the sticky header and gutter paint paper (with the grain plate when `--dt-paper` is set) so they cover what scrolls under. Weekend columns take the weekend wash, disabled days a 45° hatch of rule, blocked slots a −45° hatch of 4% ink with a 500 10px uppercase label in ink-2 (ink-3 fails contrast at 10px).

### Hosts
A dark host keeps every rule: light ink at 0.85 on charcoal, rules at 0.07/0.14, the accent doing the band, the now line and today, event text in ink. The paper plate is the Paper host's only; other hosts set `--dt-paper: none`. `auto` derives border alphas 0.3/0.6 (light) or 0.16/0.32 (dark), text-2 at 0.66/0.62, and keeps the accent legible against the probed ground. Every host and preset holds text-2 at 4.5:1 or better on both its stage and its calendar ground.

### Motion
The bar clock flips its minute: the new HH:MM flies in from 8px above over 260ms. Switches slide their knob in 140ms, frames recolour in 120ms, a host change swaps the ground at once (a crossfade made `auto` probe the old colours; the library also re-probes on `transitionend` for hosts that do fade), the live dot pulses 2s. Every transition and the pulse are off under `prefers-reduced-motion`, and the clock flip runs at 0ms.

## Do's and Don'ts

### Do:
- **Do** set every event as ink text on the paper with a 3px start bar; tint the bar, never the ground.
- **Do** give `--dt-accent` exactly three jobs in the calendar: the all-day band, the now line, today's number.
- **Do** draw structure as rules: 2px ink frames and section rules in the chrome, 1px rule and rule-day in the grid.
- **Do** keep the calendar square-cut (0 radius) and the demo controls at 6u, with the switch as the only pill (22u).
- **Do** set numerals large and regular: day numbers 40px, gutter hours 26px, both narrowed, both tabular.
- **Do** paint the paper plate (`--dt-paper`) under every opaque calendar surface on the Paper host, and size the chrome in `--u`.
- **Do** let the calendar's own header carry the period, the views and Today ‹ ›; the page bar repeats them only when built-in navigation is off.

### Don't:
- **Don't** fill a timed event with colour or draw it as a card; no tinted backgrounds, no card corners.
- **Don't** add shadows at rest, to the chrome or the calendar; the only lifts are the in-flight resize and move ghost.
- **Don't** add a second accent or a second header to the demo; the accent is the host's and the header is the calendar's.
- **Don't** reverse a day, a header or a selected event; only the all-day band and the now plate sit on a fill.
- **Don't** mark today with a disc or a pill; today is the accent numeral.
- **Don't** use weights above 500 in text, or 600 anywhere but the wordmark.
- **Don't** replace the raster paper plate with CSS noise, or let it show on hosts that did not ask for it.
- **Don't** rename or remove a `--dt-*` token or a prop.
