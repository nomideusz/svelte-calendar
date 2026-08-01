<!--
  MobileWeek — touch-first 7-day overview.

  Compact week grid with day columns. Each day shows a condensed
  list of events. Tap a day to drill into MobileDay. Swipe
  left/right to navigate weeks.
-->
<script lang="ts">
	import { useCalendarContext } from '../shared/context.svelte.js';
	import EventContent from '../shared/EventContent.svelte';
	import { createClock } from '../../core/clock.svelte.js';
	import type { TimelineEvent } from '../../core/types.js';
	import { DAY_MS, sod, isAllDay, isMultiDay } from '../../core/time.js';
	import { startOfWeek as sowFn } from '../../core/time.js';
	import { fmtTime as _fmtTime, weekdayShort } from '../../core/locale.js';
	import { createSwipe } from './swipe.js';


	interface Props {
		mondayStart?: boolean;
		locale?: string;
		height?: number | null;
		events?: TimelineEvent[];
		style?: string;
		focusDate?: Date;
		oneventclick?: (event: TimelineEvent) => void;
		oneventcreate?: (range: { start: Date; end: Date }) => void;
		selectedEventId?: string | null;
		readOnly?: boolean;
		[key: string]: unknown;
	}

	let {
		mondayStart = true,
		locale,
		height = null,
		events = [],
		style = '',
		focusDate,
		oneventclick,
		selectedEventId = null,
	}: Props = $props();

	// ── Context ────────────────────────────────────────
	const ctx = useCalendarContext();
	const L = $derived(ctx.labels);
	const viewState = $derived(ctx.viewState);
	const equalDays = $derived(ctx.equalDays);
	const showDates = $derived(ctx.showDates);
	const hideDays = $derived(ctx.hideDays);
	const autoHeight = $derived(ctx.autoHeight);
	const oneventhover = $derived(ctx.oneventhover);
	const disabledSet = $derived(ctx.disabledSet);
	const loadRangeCtx = $derived(ctx.loadRange);

	const clock = createClock(ctx.timezone);

	// ── Config ─────────────────────────────────────────
	const MAX_EVENTS = 3;
	const customDays = $derived(viewState?.dayCount ?? 7);

	// ── Derived week data ──────────────────────────────
	const todayMs = $derived(clock.today);
	const focusMs = $derived(focusDate ? sod(focusDate.getTime()) : todayMs);

	const weekStart = $derived(
		customDays === 7
			? sowFn(focusMs, mondayStart)
			: sod(focusMs)
	);

	// ── Load range ─────────────────────────────────────
	$effect(() => {
		if (!loadRangeCtx) return;
		const rangeStart = new Date(weekStart - 7 * DAY_MS);
		const rangeEnd = new Date(weekStart + (customDays + 7) * DAY_MS);
		loadRangeCtx.set({ start: rangeStart, end: rangeEnd });
		return () => loadRangeCtx.set(null);
	});

	// ── Day cells ──────────────────────────────────────
	interface DayCell {
		ms: number;
		dayNum: number;
		dayName: string;
		isToday: boolean;
		isPast: boolean;
		isDisabled: boolean;
		isWeekend: boolean;
		events: TimelineEvent[];
		allDayCount: number;
		totalCount: number;
	}

	const dayCells = $derived.by(() => {
		const result: DayCell[] = [];
		const hideSet = new Set(hideDays ?? []);

		for (let i = 0; i < customDays; i++) {
			const ms = weekStart + i * DAY_MS;
			const d = new Date(ms);
			const jsDay = d.getDay();
			const isoDay = jsDay === 0 ? 7 : jsDay;

			if (hideSet.has(isoDay)) continue;

			const isToday = ms === todayMs;
			const isPast = equalDays ? false : ms < todayMs;
			const isWeekend = jsDay === 0 || jsDay === 6;
			const isDisabled = disabledSet.has(ms);
			const dayEnd = ms + DAY_MS;

			const dayEvents = events
				.filter(ev => ev.start.getTime() < dayEnd && ev.end.getTime() > ms)
				.sort((a, b) => a.start.getTime() - b.start.getTime());

			const allDayCount = dayEvents.filter(ev => isAllDay(ev) || isMultiDay(ev)).length;

			result.push({
				ms,
				dayNum: d.getDate(),
				dayName: weekdayShort(ms, locale),
				isToday,
				isPast,
				isDisabled,
				isWeekend,
				events: dayEvents,
				allDayCount,
				totalCount: dayEvents.length,
			});
		}
		return result;
	});

	// ── Expanded rows ("+N more") ──────────────────────
	let expandedDays = $state<Set<number>>(new Set());
	function toggleExpand(ms: number) {
		const next = new Set(expandedDays);
		if (next.has(ms)) next.delete(ms);
		else next.add(ms);
		expandedDays = next;
	}

	// ── Format helpers ─────────────────────────────────
	function fmtTime(d: Date): string {
		return _fmtTime(d, locale);
	}

	function evTimeLabel(ev: TimelineEvent): string {
		if (isAllDay(ev) || isMultiDay(ev)) return L.allDay;
		return `${fmtTime(ev.start)} – ${fmtTime(ev.end)}`;
	}

	function statusText(ev: TimelineEvent): string {
		if (ev.status === 'cancelled') return ` (${L.cancelled})`;
		if (ev.status === 'tentative') return ` (${L.tentative})`;
		if (ev.status === 'full') return ` (${L.full})`;
		if (ev.status === 'limited') return ` (${L.limited})`;
		return '';
	}

	// ── Touch swipe ────────────────────────────────────
	let swipeOffset = $state(0);
	let swipeAnimate = $state(false);

	const swipe = createSwipe({
		onmove: (dx) => {
			swipeAnimate = false;
			swipeOffset = dx;
		},
		onend: (dir) => {
			if (dir !== 0) {
				// Committed — the week changes, so jump rather than slide new content.
				swipeAnimate = false;
				swipeOffset = 0;
				if (dir > 0) viewState?.prev();
				else viewState?.next();
			} else {
				// Snap back (CSS drops the transition under prefers-reduced-motion).
				swipeAnimate = true;
				swipeOffset = 0;
			}
		},
	});

	// ── Day tap → switch to day mode ───────────────────
	function handleDayTap(dayMs: number) {
		if (!viewState) return;
		viewState.setFocusDate(new Date(dayMs));
		// The registered view list isn't reachable from the view context, so we
		// can only map conventionally-named ids ("week-mobile" → "day-mobile",
		// "week-planner" → "day-planner", …). For custom ids that don't follow
		// the "week-*" segment convention, we keep the current view (the focus
		// date still moves) instead of switching to a possibly-unregistered id.
		const currentView = viewState.view;
		if (!currentView.split('-').includes('week')) return;
		const dayView = currentView
			.split('-')
			.map(seg => (seg === 'week' ? 'day' : seg))
			.join('-');
		if (dayView !== currentView) viewState.setView(dayView);
	}

	function handleDayKeydown(e: KeyboardEvent, dayMs: number) {
		if (e.key !== 'Enter' && e.key !== ' ') return;
		e.preventDefault();
		handleDayTap(dayMs);
	}
</script>

<div
	class="mw"
	class:mw--auto={autoHeight}
	style={style || undefined}
	style:height={autoHeight ? undefined : (height ? `${height}px` : '100%')}
	role="region"
	aria-label={L.weekAhead}
	ontouchstart={swipe.ontouchstart}
	ontouchmove={swipe.ontouchmove}
	ontouchend={swipe.ontouchend}
	ontouchcancel={swipe.ontouchcancel}
>
	<!-- Vertical day list -->
	<div
		class="mw-list"
		class:mw-list--animate={swipeAnimate}
		style:transform={swipeOffset !== 0 ? `translateX(${swipeOffset}px)` : undefined}
		role="list"
	>
		{#each dayCells as cell (cell.ms)}
			<div
				class="mw-row"
				class:mw-row--today={cell.isToday}
				class:mw-row--past={cell.isPast}
				class:mw-row--weekend={cell.isWeekend}
				class:mw-row--disabled={cell.isDisabled}
				role="listitem"
				aria-current={cell.isToday ? 'date' : undefined}
			>
				<button
					type="button"
					class="mw-row-target"
					disabled={cell.isDisabled}
					onclick={() => handleDayTap(cell.ms)}
					onkeydown={(e) => handleDayKeydown(e, cell.ms)}
					aria-label="{cell.dayName} {cell.dayNum}{cell.isToday ? `, ${L.today}` : ''}"
				></button>
				<!-- Date column -->
				<div class="mw-date">
					<span class="mw-day-name" class:mw-day-name--today={cell.isToday}>{cell.dayName}</span>
					{#if showDates}
						<span class="mw-day-num" class:mw-day-num--today={cell.isToday}>{cell.dayNum}</span>
					{/if}
				</div>

				<!-- Events column -->
				<div class="mw-events">
					{#if cell.events.length === 0}
						<span class="mw-empty">{L.noEvents}</span>
					{:else}
						{#each (expandedDays.has(cell.ms) ? cell.events : cell.events.slice(0, MAX_EVENTS)) as ev (ev.id)}
							<button
								type="button"
								class="mw-ev"
								class:mw-ev--selected={selectedEventId === ev.id}
								class:mw-ev--allday={isAllDay(ev) || isMultiDay(ev)}
								class:mw-ev--current={!isAllDay(ev) && !isMultiDay(ev) && ev.start.getTime() <= clock.tick && ev.end.getTime() > clock.tick}
								class:mw-ev--cancelled={ev.status === 'cancelled'}
								class:mw-ev--tentative={ev.status === 'tentative'}
								class:mw-ev--full={ev.status === 'full'}
								class:mw-ev--limited={ev.status === 'limited'}
								style:--ev-color={ev.color ?? 'var(--dt-accent)'}
								onclick={(e) => { e.stopPropagation(); oneventclick?.(ev); }}
								onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); oneventclick?.(ev); } }}
								onpointerenter={() => oneventhover?.(ev)}
								aria-label="{ev.title}{statusText(ev)}, {evTimeLabel(ev)}"
							>
								<span class="mw-ev-stripe"></span>
								<div class="mw-ev-body">
									<EventContent event={ev}>
									<span class="mw-ev-title">{ev.title}</span>
									{#if isAllDay(ev) || isMultiDay(ev)}
										<span class="mw-ev-time">{L.allDay}</span>
									{:else}
										<span class="mw-ev-time">{fmtTime(ev.start)}</span>
									{/if}
									</EventContent>
								</div>
							</button>
						{/each}
						{#if cell.totalCount > MAX_EVENTS}
							<button
								type="button"
								class="mw-ev-more"
								aria-expanded={expandedDays.has(cell.ms)}
								onclick={() => toggleExpand(cell.ms)}
							>
								{expandedDays.has(cell.ms) ? L.showLess : L.nMore(cell.totalCount - MAX_EVENTS)}
							</button>
						{/if}
					{/if}
				</div>

				<!-- Chevron -->
				<svg class="mw-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
			</div>
		{/each}
	</div>
</div>

<style>
	/* ─── Container ──────────────────────────────────── */
	.mw {
		position: relative;
		display: flex;
		flex-direction: column;
		user-select: none;
		font-variant-numeric: tabular-nums;
		overflow: hidden;
		background: var(--dt-bg, #fff);
		-webkit-tap-highlight-color: transparent;
		touch-action: pan-y;
	}
	.mw--auto { overflow: visible; }

	/* ─── Scrollable day list ────────────────────────── */
	.mw-list {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		overscroll-behavior: contain;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: thin;
		scrollbar-color: var(--dt-scrollbar, rgba(0, 0, 0, 0.1)) transparent;
	}
	.mw--auto .mw-list { overflow-y: visible; }
	.mw-list--animate {
		transition: transform 180ms ease;
	}
	@media (prefers-reduced-motion: reduce) {
		.mw-list--animate { transition: none; }
	}

	/* ─── Day row ────────────────────────────────────── */
	.mw-row {
		display: flex;
		align-items: center;
		gap: 12px;
		position: relative;
		/* border-box: width 100% + padding otherwise overflows the list by
		   24px, which iOS turns into a horizontal pan that clips the date
		   column off the left edge */
		box-sizing: border-box;
		padding: 10px 12px;
		background: transparent;
		transition: background 120ms;
		text-align: left;
		width: 100%;
		-webkit-tap-highlight-color: transparent;
		border-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
		min-height: 56px;
	}
	.mw-row:last-child {
		border-bottom: none;
	}
	.mw-row:has(.mw-row-target:active) {
		background: color-mix(in srgb, var(--dt-accent, #2563eb) 6%, transparent);
	}
	.mw-row--today {
		background: color-mix(in srgb, var(--dt-accent, #2563eb) 4%, transparent);
	}
	/* Token-based dim (not subtree opacity) so past rows stay legible/tappable */
	.mw-row--past {
		background: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 3%, transparent);
	}
	.mw-row--past :global(.mw-ev-title),
	.mw-row--past .mw-day-num {
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
	}
	.mw-row--disabled {
		background-image: repeating-linear-gradient(
			135deg,
			transparent,
			transparent 6px,
			color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent) 6px,
			color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent) 12px
		);
	}
	.mw-row-target {
		position: absolute;
		inset: 0;
		z-index: 0;
		border: none;
		background: transparent;
		cursor: pointer;
		padding: 0;
		-webkit-tap-highlight-color: transparent;
	}
	.mw-row-target:disabled {
		cursor: default;
	}
	.mw-row-target:focus-visible {
		outline: none;
		box-shadow: inset 0 0 0 2px var(--dt-accent, #2563eb);
	}

	/* ─── Date column ────────────────────────────────── */
	.mw-date {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 40px;
		flex-shrink: 0;
		gap: 2px;
		position: relative;
		z-index: 1;
		pointer-events: none;
	}

	.mw-day-name {
		font: 600 11px/1 var(--dt-sans, system-ui, sans-serif);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
	}
	.mw-day-name--today {
		color: var(--dt-accent, #2563eb);
	}

	.mw-day-num {
		font: 700 18px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
	}
	.mw-day-num--today {
		background: var(--dt-accent, #2563eb);
		color: var(--dt-btn-text, #fff);
		width: 30px;
		height: 30px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		font-size: 15px;
	}

	/* ─── Events column ──────────────────────────────── */
	/* pointer-events pass through to the full-row target underneath;
	   only the chips (and "+N more") re-capture them. */
	.mw-events {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
		position: relative;
		z-index: 2;
		pointer-events: none;
	}

	.mw-empty {
		font: 400 13px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
	}

	/* ─── Event chip ─────────────────────────────────── */
	.mw-ev {
		display: flex;
		align-items: center;
		gap: 0;
		min-height: 44px;
		border-radius: 6px;
		background: color-mix(in srgb, var(--ev-color) 10%, var(--dt-surface, #f9fafb));
		overflow: hidden;
		cursor: pointer;
		transition: background 120ms;
		-webkit-tap-highlight-color: transparent;
		border: none;
		text-align: left;
		padding: 0;
		pointer-events: auto;
	}
	.mw-ev:active {
		background: color-mix(in srgb, var(--ev-color) 20%, var(--dt-surface, #f9fafb));
	}
	.mw-ev--selected {
		box-shadow: 0 0 0 1.5px var(--ev-color);
	}
	.mw-ev--current {
		background: color-mix(in srgb, var(--ev-color) 16%, var(--dt-surface, #f9fafb));
	}
	.mw-ev--allday {
		background: color-mix(in srgb, var(--ev-color) 14%, var(--dt-surface, #f9fafb));
	}
	/* Status treatments: token-level dims + a non-opacity signal
	   (strikethrough / border style) — never a bare opacity on the chip. */
	.mw-ev--cancelled {
		background: color-mix(in srgb, var(--ev-color) 5%, var(--dt-surface, #f9fafb));
	}
	.mw-ev--cancelled .mw-ev-title {
		text-decoration: line-through;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
	}
	.mw-ev--cancelled .mw-ev-stripe {
		opacity: 0.45; /* decorative bar only */
	}
	.mw-ev--tentative {
		background: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, #f9fafb));
		border: 1px dashed color-mix(in srgb, var(--ev-color) 45%, transparent);
	}
	.mw-ev--full {
		background: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, #f9fafb));
		border: 1px solid color-mix(in srgb, var(--ev-color) 30%, transparent);
	}
	.mw-ev--full .mw-ev-title {
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
	}
	.mw-ev--limited {
		background: color-mix(in srgb, var(--ev-color) 8%, var(--dt-surface, #f9fafb));
		border: 1px dashed color-mix(in srgb, var(--ev-color) 45%, transparent);
	}

	.mw-ev-stripe {
		width: 3px;
		align-self: stretch;
		background: var(--ev-color, var(--dt-accent));
		flex-shrink: 0;
		border-radius: 6px 0 0 6px;
	}

	.mw-ev-body {
		flex: 1;
		min-width: 0;
		padding: 5px 8px;
		display: flex;
		align-items: baseline;
		gap: 6px;
	}

	.mw-ev-title {
		font: 500 15px/1.2 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex: 1;
		min-width: 0;
	}

	.mw-ev-time {
		font: 400 12px/1 var(--dt-mono, ui-monospace, monospace);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		white-space: nowrap;
		flex-shrink: 0;
	}

	.mw-ev-more {
		font: 500 12px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		padding: 2px 4px;
		min-height: 32px;
		border: none;
		background: transparent;
		cursor: pointer;
		text-align: left;
		align-self: flex-start;
		position: relative;
		pointer-events: auto;
		-webkit-tap-highlight-color: transparent;
	}
	/* Hit-slop: 44px effective touch target */
	.mw-ev-more::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		height: 44px;
	}
	.mw-ev-more:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
	}

	/* ─── Chevron ────────────────────────────────────── */
	.mw-chevron {
		flex-shrink: 0;
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		position: relative;
		z-index: 1;
		pointer-events: none;
	}

	/* ─── Focus ──────────────────────────────────────── */
	.mw-ev:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
	}
</style>
