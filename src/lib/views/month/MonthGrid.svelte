<!--
	MonthGrid — classic month overview.

	Week-aligned grid (4–6 rows, driven by the view-state 'month' range).
	Each cell lists up to MAX_CHIPS events plus a "+N more" overflow; clicking
	an event fires oneventclick, clicking a day (or the overflow) fires
	ondayclick — the natural month → day drill-down.
-->
<script lang="ts">
	import { useCalendarContext } from '../shared/context.svelte.js';
	import { createClock } from '../../core/clock.svelte.js';
	import type { TimelineEvent } from '../../core/types.js';
	import { DAY_MS, sod, isAllDay } from '../../core/time.js';
	import { fmtTime, weekdayShort } from '../../core/locale.js';


	interface Props {
		events?: TimelineEvent[];
		style?: string;
		height?: number | null;
		locale?: string;
		focusDate?: Date;
		oneventclick?: (event: TimelineEvent) => void;
		selectedEventId?: string | null;
		readOnly?: boolean;
		[key: string]: unknown;
	}

	let {
		events = [],
		style = '',
		height = null,
		locale,
		focusDate,
		oneventclick,
		selectedEventId = null,
	}: Props = $props();

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

	const range = $derived(viewState?.range);
	const focusMonth = $derived((focusDate ?? new Date()).getMonth());

	$effect(() => {
		if (!loadRangeCtx || !range) return;
		loadRangeCtx.set({
			start: new Date(range.start.getTime() - 7 * DAY_MS),
			end: new Date(range.end.getTime() + 7 * DAY_MS),
		});
		return () => loadRangeCtx.set(null);
	});

	interface MonthCell {
		ms: number;
		date: Date;
		dayNum: number;
		inMonth: boolean;
		isToday: boolean;
		isWeekend: boolean;
		isDisabled: boolean;
		chips: TimelineEvent[];
		all: TimelineEvent[];
		overflow: number;
	}

	/** Day (ms) whose cell is inline-expanded to show all events (no-ondayclick fallback). */
	let expandedMs = $state<number | null>(null);
	/** Roving-tabindex anchor: the one cell reachable via Tab. */
	let focusMs = $state<number | null>(null);
	let bodyEl = $state<HTMLElement | null>(null);

	const cellsInteractive = $derived(!!ondayclick);

	const rovingMs = $derived.by(() => {
		if (!range) return null;
		const start = sod(range.start.getTime());
		const end = range.end.getTime();
		if (focusMs !== null && focusMs >= start && focusMs < end) return focusMs;
		if (todayMs >= start && todayMs < end) return todayMs;
		return start;
	});

	function moveFocus(fromMs: number, deltaDays: number) {
		if (!range) return;
		const target = fromMs + deltaDays * DAY_MS;
		if (target < sod(range.start.getTime()) || target >= range.end.getTime()) return;
		focusMs = target;
		const el = bodyEl?.querySelector<HTMLElement>(`[data-ms="${target}"]`);
		el?.focus();
	}

	function cellKeydown(e: KeyboardEvent, cell: MonthCell) {
		switch (e.key) {
			case 'ArrowRight': e.preventDefault(); moveFocus(cell.ms, 1); break;
			case 'ArrowLeft': e.preventDefault(); moveFocus(cell.ms, -1); break;
			case 'ArrowDown': e.preventDefault(); moveFocus(cell.ms, 7); break;
			case 'ArrowUp': e.preventDefault(); moveFocus(cell.ms, -7); break;
			case 'Escape':
				if (expandedMs !== null) { e.preventDefault(); expandedMs = null; }
				break;
			case 'Enter':
			case ' ':
				if (!cell.isDisabled) {
					e.preventDefault();
					ondayclick?.(cell.date);
				}
				break;
		}
	}

	function overflowClick(e: MouseEvent, cell: MonthCell) {
		e.stopPropagation();
		if (ondayclick) ondayclick(cell.date);
		else expandedMs = expandedMs === cell.ms ? null : cell.ms;
	}

	function cellLabel(cell: MonthCell): string {
		const date = cell.date.toLocaleDateString(locale, {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
		});
		return `${date}, ${L.nEvents(cell.all.length)}`;
	}

	function eventsForDay(ms: number): TimelineEvent[] {
		const dayStart = ms;
		const dayEnd = ms + DAY_MS;
		return events
			.filter((e) => e.start.getTime() < dayEnd && e.end.getTime() > dayStart)
			.sort((a, b) => {
				const aAll = isAllDay(a) ? 0 : 1;
				const bAll = isAllDay(b) ? 0 : 1;
				return aAll - bAll || a.start.getTime() - b.start.getTime();
			});
	}

	const weeks = $derived.by(() => {
		if (!range) return [];
		const rows: MonthCell[][] = [];
		for (let ms = sod(range.start.getTime()); ms < range.end.getTime(); ms += 7 * DAY_MS) {
			const row: MonthCell[] = [];
			for (let i = 0; i < 7; i++) {
				const cellMs = ms + i * DAY_MS;
				const date = new Date(cellMs);
				const jsDay = date.getDay();
				const dayEvents = eventsForDay(cellMs);
				row.push({
					ms: cellMs,
					date,
					dayNum: date.getDate(),
					inMonth: date.getMonth() === focusMonth,
					isToday: cellMs === todayMs,
					isWeekend: jsDay === 0 || jsDay === 6,
					isDisabled: disabledSet.has(cellMs),
					chips: dayEvents.slice(0, MAX_CHIPS),
					all: dayEvents,
					overflow: Math.max(0, dayEvents.length - MAX_CHIPS),
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

	function chipTime(e: TimelineEvent): string {
		return isAllDay(e) ? '' : fmtTime(e.start, locale);
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
					tabindex={cell.isDisabled
						? undefined
						: cellsInteractive || cell.overflow > 0
							? cell.ms === rovingMs
								? 0
								: -1
							: undefined}
					onclick={() => {
						if (!cell.isDisabled) ondayclick?.(cell.date);
					}}
					onfocusin={() => (focusMs = cell.ms)}
					onkeydown={(e) => cellKeydown(e, cell)}
				>
					<span class="mg-daynum" class:mg-daynum--today={cell.isToday}>
						{cell.dayNum}
					</span>
					<div class="mg-chips">
						{#each expandedMs === cell.ms ? cell.all : cell.chips as ev (ev.id + cell.ms)}
							{#if eventSnippet}
								<button
									type="button"
									class="mg-chip mg-chip--custom"
									class:mg-chip--selected={ev.id === selectedEventId}
									onclick={(e) => {
										e.stopPropagation();
										oneventclick?.(ev);
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
									style:--mg-chip-color={ev.color ?? 'var(--dt-accent)'}
									title={ev.title}
									aria-label="{ev.title}{chipTime(ev) ? `, ${chipTime(ev)}` : ''}"
									onclick={(e) => {
										e.stopPropagation();
										oneventclick?.(ev);
									}}
									onmouseenter={() => oneventhover?.(ev)}
								>
									<span class="mg-chip-dot" aria-hidden="true"></span>
									{#if chipTime(ev)}<span class="mg-chip-time">{chipTime(ev)}</span>{/if}
									<span class="mg-chip-title">{ev.title}</span>
								</button>
							{/if}
						{/each}
						{#if cell.overflow > 0 && expandedMs !== cell.ms}
							<button
								type="button"
								class="mg-more"
								aria-expanded={ondayclick ? undefined : false}
								aria-label={L.nMore(cell.overflow)}
								onclick={(e) => overflowClick(e, cell)}
							>
								{dotsMode ? `+${cell.overflow}` : L.nMore(cell.overflow)}
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
		font-family: var(--dt-mono);
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt-text-3);
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
		background: var(--dt-weekend-bg, rgba(0, 0, 0, 0.02));
	}
	/* Dim only the day number for adjacent-month cells — their events stay legible */
	.mg-cell--out {
		background: var(--dt-surface, transparent);
	}
	.mg-cell--out .mg-daynum {
		color: var(--dt-text-3);
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
		background: var(--dt-hover, rgba(0, 0, 0, 0.04));
	}
	.mg-cell:focus-visible {
		outline: 2px solid var(--dt-accent, #2563eb);
		outline-offset: -2px;
	}

	.mg-daynum {
		flex: none;
		font-family: var(--dt-mono);
		font-size: 12px;
		font-weight: 600;
		color: var(--dt-text-2);
		width: 22px;
		height: 22px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
	}
	.mg-daynum--today {
		background: var(--dt-accent);
		color: var(--dt-btn-text);
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
		border-radius: 5px;
		font-family: var(--dt-sans);
		font-size: 12px;
		line-height: 1.3;
		color: var(--dt-text);
		cursor: pointer;
		min-width: 0;
		text-align: left;
	}
	.mg-chip:hover {
		background: var(--dt-hover, rgba(0, 0, 0, 0.04));
	}
	.mg-chip:focus-visible {
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
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
		width: 7px;
		height: 7px;
		border-radius: 999px;
		background: var(--mg-chip-color);
	}
	.mg-chip-time {
		flex: none;
		font-family: var(--dt-mono);
		font-size: 11px;
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
		border-radius: 5px;
		font-family: var(--dt-mono);
		font-size: 11px;
		color: var(--dt-text-2);
		cursor: pointer;
	}
	.mg-more:hover {
		background: var(--dt-hover, rgba(0, 0, 0, 0.04));
		color: var(--dt-text);
	}
	.mg-more:focus-visible {
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
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
	   (day drill-down); dots keep their title/aria-label for a11y. */
	.mg--dots .mg-chips {
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		gap: 3px;
	}
	.mg--dots .mg-chip {
		padding: 3px;
		min-height: 0;
	}
	.mg--dots .mg-chip-title,
	.mg--dots .mg-chip-time {
		display: none;
	}
	.mg--dots .mg-chip-dot {
		width: 8px;
		height: 8px;
	}
	.mg--dots .mg-more {
		padding: 0 3px;
		min-height: 0;
		align-self: center;
		font-size: 10px;
	}
</style>
