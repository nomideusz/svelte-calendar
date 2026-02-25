<!--
  WeekGrid — Multi-week vertical scroll.

  Modelled after Hey Calendar's week view:
  • Weeks stack vertically. Scroll up = past, down = future.
  • Day headers in each week row: "MON 23", "TUE 24", with accent pill for today.
  • Month label in left gutter, vertical bottom-to-top.
  • Events are clean horizontal bars with colour fill, "9AM- 10AM Title" inline.
  • Generous whitespace, thin dividers, minimal chrome.
-->
<script lang="ts">
	import { getContext, onMount, tick } from 'svelte';
	import { createClock } from '../../core/clock.svelte.js';
	import type { TimelineEvent } from '../../core/types.js';
	import type { DragState } from '../../engine/drag.svelte.js';
	import { DAY_MS, sod } from '../../core/time.js';
	import { startOfWeek as sowFn, fractionalHour } from '../../core/time.js';
	import { weekdayShort, monthLong } from '../../core/locale.js';

	interface Props {
		weekOffset?: number;
		mondayStart?: boolean;
		hourHeight?: number;
		dayWidth?: number;
		nowPosition?: number;
		height?: number;
		events?: TimelineEvent[];
		style?: string;
		focusDate?: Date;
		oneventclick?: (event: TimelineEvent) => void;
		oneventcreate?: (range: { start: Date; end: Date }) => void;
		selectedEventId?: string | null;
	}

	let {
		mondayStart = true,
		height = 520,
		events = [],
		style = '',
		focusDate,
		oneventclick,
		oneventcreate,
		selectedEventId = null,
	}: Props = $props();

	// ── Drag support (available when inside Calendar) ──
	const drag = getContext<DragState>('calendar:drag') as DragState | undefined;
	const commitDragCtx = getContext<() => void>('calendar:commitDrag') as (() => void) | undefined;

	const clock = createClock();

	// ─── Config ─────────────────────────────────────────
	const PAST_WEEKS = 4;
	const FUTURE_WEEKS = 12;
	const MAX_EVENTS_SHOWN = 3;

	let el: HTMLDivElement;
	let scrolled = $state(false);

	// ─── Derived ────────────────────────────────────────
	const todayMs = $derived(clock.today);
	const focusMs = $derived(focusDate ? sod(focusDate.getTime()) : todayMs);
	const anchorWeekStart = $derived(sowFn(focusMs, mondayStart));

	// ─── Week data ──────────────────────────────────────
	interface WeekRow {
		weekStart: number;
		isCurrent: boolean;
		monthLabel: string | null;
		days: DayCell[];
	}

	interface DayCell {
		ms: number;
		dayNum: number;
		isToday: boolean;
		isPast: boolean;
		isWeekend: boolean;
		events: TimelineEvent[];
	}

	const weeks = $derived.by(() => {
		const result: WeekRow[] = [];
		const currentWeekStart = sowFn(todayMs, mondayStart);

		for (let w = -PAST_WEEKS; w <= FUTURE_WEEKS; w++) {
			const weekStart = anchorWeekStart + w * 7 * DAY_MS;
			const isCurrent = weekStart === currentWeekStart;
			const days: DayCell[] = [];

			const firstMonth = new Date(weekStart).getMonth();
			const lastMonth = new Date(weekStart + 6 * DAY_MS).getMonth();

			for (let d = 0; d < 7; d++) {
				const ms = weekStart + d * DAY_MS;
				const date = new Date(ms);
				const dayNum = date.getDate();
				const dow = date.getDay();
				const isWeekend = dow === 0 || dow === 6;
				const isToday = ms === todayMs;
				const isPast = ms < todayMs;

				const dayEnd = ms + DAY_MS;
				const dayEvents = events
					.filter((ev) => ev.start.getTime() < dayEnd && ev.end.getTime() > ms)
					.sort((a, b) => a.start.getTime() - b.start.getTime());

				days.push({ ms, dayNum, isToday, isPast, isWeekend, events: dayEvents });
			}

			// Month label: show when first day of week is day 1-7
			const startDate = new Date(weekStart);
			const showMonth = startDate.getDate() <= 7;
			const monthLabel = showMonth ? monthLong(weekStart).toUpperCase() : null;

			result.push({ weekStart, isCurrent, monthLabel, days });
		}

		return result;
	});

	// ─── Format helpers ─────────────────────────────────
	function fmtAmPm(d: Date): string {
		let h = d.getHours();
		const m = d.getMinutes();
		const ampm = h >= 12 ? 'PM' : 'AM';
		h = h % 12 || 12;
		return m > 0 ? `${h}:${m.toString().padStart(2, '0')}${ampm}` : `${h}${ampm}`;
	}

	function fmtNowTime(tick: number): string {
		const d = new Date(tick);
		let h = d.getHours();
		const m = d.getMinutes();
		const ampm = h >= 12 ? 'pm' : 'am';
		h = h % 12 || 12;
		return `${h}:${m.toString().padStart(2, '0')}${ampm}`;
	}

	// ─── Now indicator fraction ─────────────────────────
	const nowFrac = $derived(fractionalHour(clock.tick) / 24);

	// ─── Scroll to current week on mount ────────────────
	onMount(async () => {
		await tick();
		if (el) {
			const current = el.querySelector('.wg-week--current');
			if (current) current.scrollIntoView({ block: 'center' });
		}
	});

	function handleUserScroll() {
		scrolled = true;
	}

	function jumpToday() {
		const current = el?.querySelector('.wg-week--current');
		if (current) current.scrollIntoView({ block: 'center', behavior: 'smooth' });
		scrolled = false;
	}

	function handleDayCellClick(ms: number, e: Event) {
		const target = e.target as HTMLElement;
		if (target.closest('.wg-ev')) return;
		if (!oneventcreate) return;
		const start = new Date(ms + 9 * 3_600_000);
		const end = new Date(ms + 10 * 3_600_000);
		oneventcreate({ start, end });
	}

	// ─── Event drag-to-move ───────────────────────────────────────
	const DRAG_THRESHOLD = 8;
	let evDragStartX = 0;
	let evDragStarted = false;
	let evDragging = $state(false);
	let evDragId = $state<string | null>(null);
	let evDragEvent: TimelineEvent | null = null;

	function getCellWidth(): number {
		const cell = el?.querySelector('.wg-cell');
		return cell ? cell.getBoundingClientRect().width : 100;
	}

	function onEventPointerDown(e: PointerEvent, ev: TimelineEvent) {
		if (e.button !== 0 || !drag) return;
		e.stopPropagation();
		evDragStartX = e.clientX;
		evDragStarted = false;
		evDragId = ev.id;
		evDragEvent = ev;

		window.addEventListener('pointermove', onEvWindowPointerMove);
		window.addEventListener('pointerup', onEvWindowPointerUp, { once: true });
		window.addEventListener('pointercancel', onEvWindowPointerCancel, { once: true });
	}

	function onEvWindowPointerMove(e: PointerEvent) {
		const ev = evDragEvent;
		if (!drag || !ev || evDragId !== ev.id) return;
		const dx = e.clientX - evDragStartX;
		if (!evDragStarted && Math.abs(dx) < DRAG_THRESHOLD) return;

		if (!evDragStarted) {
			evDragStarted = true;
			evDragging = true;
			drag.beginMove(ev.id, ev.start, ev.end);
		}

		const cellW = getCellWidth();
		const dayOffset = Math.round(dx / cellW);
		const deltaMs = dayOffset * DAY_MS;
		drag.updatePointer(
			new Date(ev.start.getTime() + deltaMs),
			new Date(ev.end.getTime() + deltaMs),
		);
	}

	function cleanupEvDrag() {
		window.removeEventListener('pointermove', onEvWindowPointerMove);
		window.removeEventListener('pointerup', onEvWindowPointerUp);
		window.removeEventListener('pointercancel', onEvWindowPointerCancel);
		evDragStarted = false;
		evDragging = false;
		evDragId = null;
		evDragEvent = null;
	}

	function onEvWindowPointerUp() {
		if (!drag) { cleanupEvDrag(); return; }
		if (!evDragStarted) {
			if (evDragEvent) oneventclick?.(evDragEvent);
		} else {
			commitDragCtx?.();
		}
		cleanupEvDrag();
	}

	function onEvWindowPointerCancel() {
		if (drag && evDragStarted) drag.cancel();
		cleanupEvDrag();
	}
</script>

<div class="wg" style={style || undefined} style:height="{height}px">
	<div
		class="wg-body"
		bind:this={el}
		onscroll={handleUserScroll}
		role="grid"
		aria-label="Multi-week calendar grid"
	>
		{#each weeks as week (week.weekStart)}
			<div class="wg-week" class:wg-week--current={week.isCurrent}>
				<!-- Month gutter (left) -->
				<div class="wg-gutter">
					{#if week.monthLabel}
						<span class="wg-gutter-month">{week.monthLabel}</span>
					{/if}
				</div>

				<div class="wg-week-body">
					<!-- Day columns (header inside each cell) -->
					<div class="wg-days">
						{#each week.days as day (day.ms)}
							<div
								class="wg-cell"
								class:wg-cell--today={day.isToday}
								class:wg-cell--past={day.isPast}
								class:wg-cell--weekend={day.isWeekend}
								role="gridcell"
								tabindex="0"
								aria-label="{new Date(day.ms).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}{day.isToday ? ' (today)' : ''}, {day.events.length} events"
								onclick={(e) => handleDayCellClick(day.ms, e)}
								onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleDayCellClick(day.ms, e); } }}
							>
								<!-- Day label inside the cell -->
								<div class="wg-cell-hd" class:wg-cell-hd--today={day.isToday}>
									<span class="wg-day-wd">{weekdayShort(day.ms)}</span>
									<span class="wg-day-num" class:wg-day-num--today={day.isToday}>
										{day.dayNum}
									</span>
								</div>

								<!-- Events -->
								<div class="wg-cell-events">
									{#each day.events.slice(0, MAX_EVENTS_SHOWN) as ev (ev.id)}
										<div
											class="wg-ev"
											class:wg-ev--selected={selectedEventId === ev.id}
											class:wg-ev--current={ev.start.getTime() <= clock.tick && ev.end.getTime() > clock.tick}
											class:wg-ev--dragging={evDragging && evDragId === ev.id}
											style:--ev-color={ev.color ?? 'var(--dt-accent)'}
											role="button"
											tabindex="0"
											aria-label="{ev.title}{ev.start.getTime() <= clock.tick && ev.end.getTime() > clock.tick ? ' (in progress)' : ''}"
											onpointerdown={(e) => onEventPointerDown(e, ev)}

											onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); oneventclick?.(ev); } }}
										>
											<span class="wg-ev-time">{fmtAmPm(ev.start)}</span>
											<span class="wg-ev-title">{ev.title}</span>
										</div>
									{/each}
									{#if day.events.length > MAX_EVENTS_SHOWN}
										<div class="wg-ev-more">+{day.events.length - MAX_EVENTS_SHOWN} more</div>
									{/if}
								</div>

								<!-- Now indicator with time -->
								{#if day.isToday}
									<div class="wg-now" style:top="calc({nowFrac * 100}% + 28px)">
										<span class="wg-now-time">{fmtNowTime(clock.tick)}</span>
										<div class="wg-now-line"></div>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>

	{#if scrolled}
		<button class="wg-btn" onclick={jumpToday}>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
				<circle cx="12" cy="12" r="10" />
				<circle cx="12" cy="12" r="3" fill="currentColor"/>
			</svg>
			Today
		</button>
	{/if}
</div>

<style>
	/* ─── Container ──────────────────────────────────── */
	.wg {
		position: relative;
		background: var(--dt-bg, #fff);
		border: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
		border-radius: 10px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		user-select: none;
		font-variant-numeric: tabular-nums;
	}

	/* ─── Scrollable body ────────────────────────────── */
	.wg-body {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		scrollbar-width: thin;
		scrollbar-color: var(--dt-scrollbar, rgba(0, 0, 0, 0.08)) transparent;
	}

	.wg-body::-webkit-scrollbar { width: 4px; }
	.wg-body::-webkit-scrollbar-thumb {
		background: var(--dt-scrollbar, rgba(0, 0, 0, 0.1));
		border-radius: 4px;
	}
	.wg-body::-webkit-scrollbar-track { background: transparent; }

	/* ─── Week row ───────────────────────────────────── */
	.wg-week {
		display: flex;
		border-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
	}

	.wg-week--current {
		background: var(--dt-today-bg, rgba(239, 68, 68, 0.02));
	}

	/* ─── Left gutter (month label) ──────────────────── */
	.wg-gutter {
		flex-shrink: 0;
		width: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-right: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
	}

	.wg-gutter-month {
		font: 800 11px / 1 var(--dt-sans, system-ui, sans-serif);
		letter-spacing: 0.06em;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.45));
		writing-mode: vertical-rl;
		transform: rotate(180deg);
	}

	/* ─── Week body ──────────────────────────────────── */
	.wg-week-body {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
	}

	/* ─── Day columns ────────────────────────────────── */
	.wg-days {
		display: flex;
		flex: 1;
	}

	.wg-cell {
		flex: 1;
		position: relative;
		min-height: 130px;
		padding: 0 4px 8px;
		border-right: 1px solid var(--dt-border, rgba(0, 0, 0, 0.06));
		cursor: pointer;
		transition: background 0.15s;
	}

	.wg-cell:last-child { border-right: none; }
	.wg-cell:hover { background: var(--dt-hover, rgba(0, 0, 0, 0.015)); }

	.wg-cell--today { background: var(--dt-today-bg, rgba(239, 68, 68, 0.03)); }
	.wg-cell--today:hover { background: rgba(239, 68, 68, 0.05); }

	.wg-cell--past { opacity: 0.55; }
	.wg-cell--past:hover { opacity: 0.75; }

	.wg-cell--weekend { background: var(--dt-weekend-bg, rgba(0, 0, 0, 0.012)); }

	/* ─── Cell header (day label inside cell) ────────── */
	.wg-cell-hd {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		padding: 6px 0 6px;
		border-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.04));
		margin-bottom: 4px;
	}

	.wg-day-wd {
		font: 400 11px / 1 var(--dt-sans, system-ui, sans-serif);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--dt-text-3, rgba(0, 0, 0, 0.35));
	}

	.wg-cell-hd--today .wg-day-wd {
		color: var(--dt-accent, #ef4444);
		font-weight: 600;
	}

	.wg-day-num {
		font: 700 14px / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(0, 0, 0, 0.85));
	}

	.wg-day-num--today {
		background: var(--dt-accent, #ef4444);
		color: #fff;
		width: 26px;
		height: 26px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		font-size: 13px;
	}

	/* ─── Events ─────────────────────────────────────── */
	.wg-cell-events {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.wg-ev {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 3px 6px;
		border-radius: 4px;
		background: color-mix(in srgb, var(--ev-color) 12%, transparent);
		cursor: pointer;
		overflow: hidden;
		transition: background 0.12s;
	}

	.wg-ev:hover {
		background: color-mix(in srgb, var(--ev-color) 22%, transparent);
	}

	.wg-ev--selected {
		box-shadow: 0 0 0 1.5px var(--ev-color);
	}

	.wg-ev--current {
		background: color-mix(in srgb, var(--ev-color) 18%, transparent);
	}

	.wg-ev-time {
		font: 400 10px / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.4));
		flex-shrink: 0;
		white-space: nowrap;
	}

	.wg-ev-title {
		font: 500 12px / 1.1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(0, 0, 0, 0.85));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.wg-ev-more {
		font: 500 10px / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.35));
		padding: 2px 8px;
		cursor: pointer;
	}

	.wg-ev-more:hover {
		color: var(--dt-text-2, rgba(0, 0, 0, 0.55));
	}

	/* ─── Now indicator with time label ──────────────── */
	.wg-now {
		position: absolute;
		left: 0;
		right: 0;
		z-index: 4;
		pointer-events: none;
		display: flex;
		align-items: center;
		gap: 0;
	}

	.wg-now-time {
		flex-shrink: 0;
		font: 500 9px / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-accent, #ef4444);
		padding: 1px 4px;
		background: color-mix(in srgb, var(--dt-accent, #ef4444) 12%, var(--dt-bg, #fff));
		border-radius: 3px;
		margin-left: -2px;
	}

	.wg-now-line {
		flex: 1;
		height: 1px;
		background: var(--dt-accent, #ef4444);
		opacity: 0.35;
	}

	/* ─── Jump button ────────────────────────────────── */
	.wg-btn {
		position: absolute;
		bottom: 14px;
		right: 14px;
		z-index: 20;
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 5px 13px 5px 9px;
		font: 600 11px / 1 var(--dt-sans, system-ui, sans-serif);
		color: #fff;
		background: var(--dt-accent, #ef4444);
		border: none;
		border-radius: 100px;
		cursor: pointer;
		box-shadow: 0 2px 16px color-mix(in srgb, var(--dt-accent, #ef4444) 35%, transparent);
		transition: transform 120ms ease, box-shadow 120ms ease;
	}

	.wg-btn svg { width: 13px; height: 13px; }
	.wg-btn:hover { transform: scale(1.06); }
	.wg-btn:active { transform: scale(0.96); }

	/* ─── Focus-visible ──────────────────────────────── */
	.wg-cell:focus-visible {
		outline: 2px solid var(--dt-accent, #ef4444);
		outline-offset: -2px;
	}

	.wg-ev:focus-visible {
		outline: 2px solid var(--ev-color, var(--dt-accent, #ef4444));
		outline-offset: 1px;
	}

	.wg-ev--dragging {
		opacity: 0.6;
		cursor: grabbing;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}
</style>
