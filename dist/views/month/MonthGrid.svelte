<!--
	MonthGrid — classic month overview.

	Week-aligned grid (4–6 rows, driven by the view-state 'month' range).
	Each cell lists up to MAX_CHIPS events plus a "+N more" overflow; clicking
	an event fires oneventclick, clicking a day (or the overflow) fires
	ondayclick — the natural month → day drill-down.
-->
<script lang="ts">import { useCalendarContext } from "../shared/context.svelte.js";
import { createClock } from "../../core/clock.svelte.js";
import { DAY_MS, sod, addDaysMs, isAllDay } from "../../core/time.js";
import { fmtTime, weekdayShort } from "../../core/locale.js";
let { events = [], style = "", height = null, locale, focusDate, oneventclick, selectedEventId = null } = $props();
const ctx = useCalendarContext();
const L = $derived(ctx.labels);
const viewState = $derived(ctx.viewState);
const autoHeight = $derived(ctx.autoHeight);
const isMobile = $derived(ctx.isMobile);
const disabledSet = $derived(ctx.disabledSet);
const oneventhover = $derived(ctx.oneventhover);
const ondayclick = $derived(ctx.ondayclick);
const eventSnippet = $derived(ctx.eventSnippet);
const loadRangeCtx = $derived(ctx.loadRange);
const clock = createClock(ctx.timezone);
const todayMs = $derived(clock.today);
// Mobile cells are too narrow for text chips (a 55px cell fits ~1 character)
// and too short for stacked rows — render color dots instead, and let the
// cell tap (day drill-down) carry the interaction.
const dotsMode = $derived(isMobile);
const MAX_CHIPS = 3;
// How many chips a cell has room for, measured, never more than MAX_CHIPS.
// A cell that overflows must also show its "+N more", so it gets one row
// fewer when that row would not fit beside its chips: a hidden event is
// always counted, never clipped away. Auto height and dots grow instead.
let fitAll = $state(MAX_CHIPS);
let fitMore = $state(MAX_CHIPS);
function measureFit() {
	const cell = bodyEl?.querySelector(".mg-cell");
	const chip = bodyEl?.querySelector(".mg-chip");
	if (!cell || !chip) return;
	const num = cell.querySelector(".mg-daynum");
	const chips = cell.querySelector(".mg-chips");
	const cs = getComputedStyle(cell);
	const gap = chips ? parseFloat(getComputedStyle(chips).rowGap) || 0 : 0;
	const room = cell.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - (num?.offsetHeight ?? 0) - (parseFloat(cs.rowGap) || 0);
	const chipH = chip.offsetHeight;
	const moreH = bodyEl?.querySelector(".mg-more")?.offsetHeight ?? chipH;
	if (!chipH) return;
	fitAll = Math.min(MAX_CHIPS, Math.floor((room + gap) / (chipH + gap)));
	fitMore = Math.max(0, Math.min(MAX_CHIPS, Math.floor((room - moreH) / (chipH + gap))));
}
$effect(() => {
	if (!bodyEl || autoHeight || dotsMode) {
		fitAll = fitMore = MAX_CHIPS;
		return;
	}
	void events;
	measureFit();
	const ro = new ResizeObserver(measureFit);
	ro.observe(bodyEl);
	document.fonts?.ready.then(measureFit);
	return () => ro.disconnect();
});
const range = $derived(viewState?.range);
const focusMonth = $derived((focusDate ?? new Date()).getMonth());
$effect(() => {
	if (!loadRangeCtx || !range) return;
	loadRangeCtx.set({
		start: new Date(range.start.getTime() - 7 * DAY_MS),
		end: new Date(range.end.getTime() + 7 * DAY_MS)
	});
	return () => loadRangeCtx.set(null);
});
/** Day (ms) whose cell is inline-expanded to show all events (no-ondayclick fallback). */
let expandedMs = $state(null);
/** Roving-tabindex anchor: the one cell reachable via Tab. */
let focusMs = $state(null);
let bodyEl = $state(null);
const cellsInteractive = $derived(!!ondayclick);
/** A cell takes focus when it can act: drill down, or open its overflow. */
function isFocusable(cell) {
	return !cell.isDisabled && (cellsInteractive || cell.overflow > 0);
}
/** Focusable cells by day, in grid order. */
const focusable = $derived.by(() => {
	const map = new Map();
	for (const row of weeks) for (const cell of row) if (isFocusable(cell)) map.set(cell.ms, cell);
	return map;
});
// The roving anchor always lands on a focusable cell, so the grid keeps
// its one Tab stop even when the remembered day or today is disabled.
const rovingMs = $derived.by(() => {
	if (focusMs !== null && focusable.has(focusMs)) return focusMs;
	if (focusable.has(todayMs)) return todayMs;
	const first = focusable.keys().next();
	return first.done ? null : first.value;
});
function moveFocus(fromMs, deltaDays) {
	if (!range) return;
	const lo = sod(range.start.getTime());
	const hi = range.end.getTime();
	// Skip days that can't take focus, continuing in the same direction.
	let target = addDaysMs(fromMs, deltaDays);
	while (target >= lo && target < hi && !focusable.has(target)) target = addDaysMs(target, deltaDays);
	if (target < lo || target >= hi) return;
	focusMs = target;
	const el = bodyEl?.querySelector(`[data-ms="${target}"]`);
	el?.focus();
}
function cellKeydown(e, cell) {
	// Enter/Space on an event chip or "+N more" belong to that button (a
	// chip opens its event, not the day); arrows still move between days.
	const onCell = e.target === e.currentTarget;
	if (!onCell && (e.key === "Enter" || e.key === " ")) return;
	switch (e.key) {
		case "ArrowRight":
			e.preventDefault();
			moveFocus(cell.ms, 1);
			break;
		case "ArrowLeft":
			e.preventDefault();
			moveFocus(cell.ms, -1);
			break;
		case "ArrowDown":
			e.preventDefault();
			moveFocus(cell.ms, 7);
			break;
		case "ArrowUp":
			e.preventDefault();
			moveFocus(cell.ms, -7);
			break;
		case "Escape":
			if (expandedMs !== null) {
				e.preventDefault();
				expandedMs = null;
			}
			break;
		case "Enter":
		case " ":
			if (!cell.isDisabled) {
				e.preventDefault();
				activateCell(cell);
			}
			break;
	}
}
/** The cell's own action: drill into the day; on phones (dots, no
*  ondayclick) the whole cell opens its overflow instead of a tiny "+N". */
function activateCell(cell) {
	if (cell.isDisabled) return;
	if (ondayclick) ondayclick(cell.date);
	else if (dotsMode && cell.overflow > 0) expandedMs = expandedMs === cell.ms ? null : cell.ms;
}
function overflowClick(e, cell) {
	e.stopPropagation();
	if (ondayclick) ondayclick(cell.date);
	else expandedMs = expandedMs === cell.ms ? null : cell.ms;
}
function cellLabel(cell) {
	const date = cell.date.toLocaleDateString(locale, {
		weekday: "long",
		day: "numeric",
		month: "long"
	});
	return `${date}, ${L.nEvents(cell.all.length)}`;
}
function eventsForDay(ms) {
	const dayStart = ms;
	const dayEnd = addDaysMs(ms, 1);
	return events.filter((e) => e.start.getTime() < dayEnd && e.end.getTime() > dayStart).sort((a, b) => {
		const aAll = isAllDay(a) ? 0 : 1;
		const bAll = isAllDay(b) ? 0 : 1;
		return aAll - bAll || a.start.getTime() - b.start.getTime();
	});
}
const weeks = $derived.by(() => {
	if (!range) return [];
	const rows = [];
	for (let ms = sod(range.start.getTime()); ms < range.end.getTime(); ms = addDaysMs(ms, 7)) {
		const row = [];
		for (let i = 0; i < 7; i++) {
			const cellMs = addDaysMs(ms, i);
			const date = new Date(cellMs);
			const jsDay = date.getDay();
			const dayEvents = eventsForDay(cellMs);
			const shown = dayEvents.length <= fitAll ? dayEvents.length : fitMore;
			row.push({
				ms: cellMs,
				date,
				dayNum: date.getDate(),
				inMonth: date.getMonth() === focusMonth,
				isToday: cellMs === todayMs,
				isWeekend: jsDay === 0 || jsDay === 6,
				isDisabled: disabledSet.has(cellMs),
				chips: dayEvents.slice(0, shown),
				all: dayEvents,
				overflow: dayEvents.length - shown
			});
		}
		rows.push(row);
	}
	return rows;
});
const weekdayLabels = $derived.by(() => {
	const first = weeks[0];
	if (!first) return [];
	return first.map((c) => weekdayShort(c.ms, locale));
});
function chipTime(e) {
	return isAllDay(e) ? "" : fmtTime(e.start, locale);
}
</script>

<div
	class="mg"
	class:mg--auto={autoHeight}
	class:mg--dots={dotsMode}
	style={style || undefined}
	style:height={autoHeight ? undefined : height ? `${height}px` : '100%'}
	role="grid"
	aria-label={L.month}
>
	<div class="mg-head" role="row">
		{#each weekdayLabels as name, i (i)}
			<div class="mg-head-cell" role="columnheader">{name}</div>
		{/each}
	</div>

	<div class="mg-body" style:--mg-rows={weeks.length} role="rowgroup" bind:this={bodyEl}>
		{#each weeks as row, ri (ri)}
			<div class="mg-row" role="row">
				{#each row as cell (cell.ms)}
				<div
					class="mg-cell"
					class:mg-cell--out={!cell.inMonth}
					class:mg-cell--today={cell.isToday}
					class:mg-cell--weekend={cell.isWeekend}
					class:mg-cell--disabled={cell.isDisabled}
					class:mg-cell--clickable={cellsInteractive && !cell.isDisabled}
					class:mg-cell--expanded={expandedMs === cell.ms}
					role="gridcell"
					aria-label={cellLabel(cell)}
					aria-current={cell.isToday ? 'date' : undefined}
					data-ms={cell.ms}
					tabindex={isFocusable(cell) ? (cell.ms === rovingMs ? 0 : -1) : undefined}
					onclick={() => activateCell(cell)}
					onfocusin={() => (focusMs = cell.ms)}
					onkeydown={(e) => cellKeydown(e, cell)}
				>
					<span class="mg-daynum" class:mg-daynum--today={cell.isToday}>
						{cell.dayNum}
					</span>
					<!-- Phones: dots are a picture of the day; the cell (its label counts
					     the events) is the one tap and tab target. -->
					<div class="mg-chips" aria-hidden={dotsMode || undefined}>
						{#each expandedMs === cell.ms ? cell.all : cell.chips as ev (ev.id + cell.ms)}
							{#if dotsMode}
								<span
									class="mg-chip"
									class:mg-chip--selected={ev.id === selectedEventId}
									class:mg-chip--cancelled={ev.status === 'cancelled'}
									style:--mg-chip-color={ev.color ?? (isAllDay(ev) ? 'var(--dt-accent)' : 'var(--dt-event, var(--dt-accent))')}
								><span class="mg-chip-dot"></span></span>
							{:else if eventSnippet}
								<button
									type="button"
									class="mg-chip mg-chip--custom"
									class:mg-chip--selected={ev.id === selectedEventId}
									onclick={(e) => {
										e.stopPropagation();
										oneventclick?.(ev, e.currentTarget.getBoundingClientRect());
									}}
									onmouseenter={() => oneventhover?.(ev)}
								>
									{@render eventSnippet(ev)}
								</button>
							{:else}
								<button
									type="button"
									class="mg-chip"
									class:mg-chip--selected={ev.id === selectedEventId}
									class:mg-chip--cancelled={ev.status === 'cancelled'}
									style:--mg-chip-color={ev.color ?? (isAllDay(ev) ? 'var(--dt-accent)' : 'var(--dt-event, var(--dt-accent))')}
									title={ev.title}
									aria-label="{ev.title}{chipTime(ev) ? `, ${chipTime(ev)}` : ''}"
									onclick={(e) => {
										e.stopPropagation();
										oneventclick?.(ev, e.currentTarget.getBoundingClientRect());
									}}
									onmouseenter={() => oneventhover?.(ev)}
								>
									<span class="mg-chip-dot" aria-hidden="true"></span>
									{#if chipTime(ev)}<span class="mg-chip-time">{chipTime(ev)}</span>{/if}
									<span class="mg-chip-title">{ev.title}</span>
								</button>
							{/if}
						{/each}
						{#if dotsMode}
							{#if cell.overflow > 0 && expandedMs !== cell.ms}
								<span class="mg-more">+{cell.overflow}</span>
							{/if}
						{:else if cell.overflow > 0 && expandedMs !== cell.ms}
							<button
								type="button"
								class="mg-more"
								aria-expanded={ondayclick ? undefined : false}
								aria-label={L.nMore(cell.overflow)}
								onclick={(e) => overflowClick(e, cell)}
							>
								{L.nMore(cell.overflow)}
							</button>
						{:else if expandedMs === cell.ms}
							<button
								type="button"
								class="mg-more"
								aria-expanded="true"
								onclick={(e) => {
									e.stopPropagation();
									expandedMs = null;
								}}
							>
								{L.showLess}
							</button>
						{/if}
					</div>
				</div>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.mg {
		display: flex;
		flex-direction: column;
		background: var(--dt-bg);
		color: var(--dt-text);
		font-family: var(--dt-sans);
		overflow: hidden;
		container-type: inline-size;
	}
	.mg--auto {
		height: auto;
	}

	.mg-head {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		border-bottom: 1px solid var(--dt-border);
		flex: none;
	}
	.mg-head-cell {
		padding: 6px 8px;
		font: 500 12px/1.2 var(--dt-sans, system-ui, sans-serif);
		font-variant-numeric: tabular-nums;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
	}

	.mg-body {
		flex: 1;
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		/* 56px floor + scroll backstop: a 6-row month compresses instead of clipping its last week */
		grid-template-rows: repeat(var(--mg-rows, 5), minmax(56px, 1fr));
		min-height: 0;
		overflow-y: auto;
	}
	.mg--auto .mg-body {
		grid-template-rows: repeat(var(--mg-rows, 5), minmax(88px, auto));
	}
	.mg-row {
		display: contents;
	}

	.mg-cell {
		display: flex;
		flex-direction: column;
		gap: 3px;
		padding: 6px;
		border-right: 1px solid var(--dt-border-day);
		border-bottom: 1px solid var(--dt-border-day);
		min-width: 0;
		overflow: hidden;
		text-align: left;
	}
	.mg-cell:nth-child(7n) {
		border-right: none;
	}
	.mg-cell--weekend {
		background: var(--dt-weekend-bg, rgba(15, 15, 15, 0.02));
	}
	/* Dim only the day number for adjacent-month cells — their events stay
	   legible. text-2, not text-3: a 22px numeral still needs 4.5:1. */
	.mg-cell--out {
		background: var(--dt-surface, transparent);
	}
	.mg-cell--out .mg-daynum {
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
	}
	.mg-cell--today {
		background: var(--dt-today-bg);
	}
	.mg-cell--expanded .mg-chips {
		overflow-y: auto;
	}
	.mg-cell--disabled {
		opacity: 0.35;
		pointer-events: none;
	}
	.mg-cell--clickable {
		cursor: pointer;
	}
	.mg-cell--clickable:hover {
		background: var(--dt-hover, rgba(15, 15, 15, 0.04));
	}
	.mg-cell:focus-visible {
		outline: 2px solid var(--dt-accent, #1d4fd7);
		outline-offset: -2px;
	}

	/* Starts where the weekday name above it starts (6px cell + 2px = the
	   header's 8px), and is only as wide as its digits, so today's rule is too. */
	.mg-daynum {
		flex: none;
		align-self: flex-start;
		padding: 0 2px;
		font-family: var(--dt-sans, system-ui, sans-serif);
		font-size: 22px;
		font-weight: 400;
		font-variant-numeric: tabular-nums;
		color: var(--dt-text);
		height: 26px;
		display: inline-flex;
		align-items: center;
	}
	/* Today: accent numeral on a 2px rule — the same mark in every view. */
	.mg-daynum--today {
		color: var(--dt-accent);
		box-shadow: inset 0 -2px 0 var(--dt-accent);
	}

	.mg-chips {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-height: 0;
		overflow: hidden;
	}
	.mg-chip {
		display: flex;
		align-items: center;
		gap: 5px;
		border: none;
		background: none;
		padding: 2px 4px;
		border-radius: 0;
		font: 400 12.5px/1.3 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text);
		cursor: pointer;
		min-width: 0;
		text-align: left;
	}
	.mg-chip:hover {
		background: var(--dt-hover, rgba(15, 15, 15, 0.04));
	}
	.mg-chip:focus-visible {
		box-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);
		outline: none;
	}
	.mg-chip--selected {
		background: var(--dt-accent-dim);
	}
	.mg-chip--cancelled {
		text-decoration: line-through;
	}
	.mg-chip--cancelled .mg-chip-title {
		color: var(--dt-text-2);
	}
	.mg-chip--cancelled .mg-chip-dot {
		opacity: 0.5;
	}
	.mg-chip-dot {
		flex: none;
		align-self: stretch;
		width: 3px;
		border-radius: 0;
		background: var(--mg-chip-color);
	}
	.mg-chip-time {
		flex: none;
		font-variant-numeric: tabular-nums;
		color: var(--dt-text-2);
	}
	.mg-chip-title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.mg-more {
		align-self: flex-start;
		border: none;
		background: none;
		padding: 1px 4px;
		border-radius: 0;
		font: 400 12.5px/1.3 var(--dt-sans, system-ui, sans-serif);
		font-variant-numeric: tabular-nums;
		color: var(--dt-text-2);
		cursor: pointer;
	}
	.mg-more:hover {
		background: var(--dt-hover, rgba(15, 15, 15, 0.04));
		color: var(--dt-text);
	}
	.mg-more:focus-visible {
		box-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);
		outline: none;
	}

	/* Container-based (the calendar adapts to its box, not the viewport) */
	@container (max-width: 640px) {
		.mg-chip-time {
			display: none;
		}
	}

	@media (hover: none) {
		.mg-chip,
		.mg-more {
			min-height: 30px;
		}
	}

	/* ── Dots mode (mobile) ─────────────────────────────
	   Cells are too narrow for text chips, so events render as colored
	   dots in a wrapping row. The cell itself stays the tap target
	   (day drill-down) and its label counts the events; dots are aria-hidden. */
	.mg--dots .mg-chips {
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		gap: 3px;
	}
	/* The cell is the target: at least a 44px tap, dots never take the hit. */
	.mg--dots .mg-cell {
		min-height: 44px;
	}
	.mg--dots .mg-chips {
		pointer-events: none;
	}
	.mg--dots .mg-chip {
		padding: 3px;
		min-height: 0;
	}
	.mg--dots .mg-chip-title,
	.mg--dots .mg-chip-time {
		display: none;
	}
	/* Marks are circles, like every dot in the calendar */
	.mg--dots .mg-chip-dot {
		align-self: center;
		width: 7px;
		height: 7px;
		border-radius: 50%;
	}
	.mg--dots .mg-more {
		padding: 0 3px;
		min-height: 0;
		align-self: center;
		font-size: 11px;
	}
</style>
