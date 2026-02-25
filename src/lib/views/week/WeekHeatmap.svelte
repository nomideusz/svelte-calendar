<script lang="ts">
	/**
	 * WeekTimelineV6 — "Heatmap"
	 *
	 * No hour ruler. No event blocks. Just intensity.
	 * Each day gets a row of 24 tiny cells (one per hour).
	 * Color saturation tells you: busy or free?
	 * Click to reveal — events appear in a detail pane.
	 *
	 * At a glance: the SHAPE of your week's density.
	 * GitHub contribution graph, but for your calendar.
	 *
	 * Aesthetic: Dark void with hot accent for busy. Cool blue
	 * for empty. Dense but legible. Data-viz meets calendar.
	 */
	import { createClock } from '../../core/clock.svelte.js';
	import type { WeekTimelineProps, TimelineEvent } from '../../core/types.js';
	import { DAY_MS, sod, startOfWeek, dayNum } from '../../core/time.js';
	import { weekdayShort, monthShort, fmtWeekRange, fmtH } from '../../core/locale.js';

	let {
		weekOffset = 0,
		mondayStart = true,
		height = 400,
		events = [],
		style = '',
		focusDate,
		oneventclick,
		selectedEventId = null,
	}: WeekTimelineProps = $props();

	const clock = createClock();

	const weekStartMs = $derived(
		focusDate
			? startOfWeek(sod(focusDate.getTime()), mondayStart)
			: startOfWeek(clock.today, mondayStart) + weekOffset * 7 * DAY_MS,
	);
	const currentWeekVisible = $derived(clock.today >= weekStartMs && clock.today < weekStartMs + 7 * DAY_MS);
	const weekLabel = $derived(fmtWeekRange(weekStartMs));

	let selectedCell = $state<{ day: number; hour: number } | null>(null);

	interface HeatDay {
		ms: number;
		label: string;
		num: number;
		today: boolean;
		past: boolean;
		cells: HeatCell[];
	}

	interface HeatCell {
		hour: number;
		events: TimelineEvent[];
		intensity: number; // 0–1: fraction of hour covered
		isNow: boolean;
	}

	const heatDays = $derived.by(() => {
		const out: HeatDay[] = [];
		const currentHour = new Date(clock.tick).getHours();

		for (let i = 0; i < 7; i++) {
			const ms = weekStartMs + i * DAY_MS;
			const isToday = ms === clock.today;

			const cells: HeatCell[] = [];
			for (let h = 0; h < 24; h++) {
				const cellStart = ms + h * 3600000;
				const cellEnd = cellStart + 3600000;
				const overlaps = events.filter((ev) => ev.start.getTime() < cellEnd && ev.end.getTime() > cellStart);

				// Calculate coverage: what fraction of this hour is booked?
				let coveredMs = 0;
				for (const ev of overlaps) {
					const s = Math.max(ev.start.getTime(), cellStart);
					const e = Math.min(ev.end.getTime(), cellEnd);
					coveredMs += e - s;
				}
				const intensity = Math.min(coveredMs / 3600000, 1);

				cells.push({
					hour: h,
					events: overlaps,
					intensity,
					isNow: isToday && h === currentHour,
				});
			}

			out.push({
				ms,
				label: weekdayShort(ms),
				num: dayNum(ms),
				today: isToday,
				past: ms < clock.today,
				cells,
			});
		}
		return out;
	});

	// Selected cell detail
	const selectedEvents = $derived.by(() => {
		if (!selectedCell) return [];
		const day = heatDays[selectedCell.day];
		if (!day) return [];
		return day.cells[selectedCell.hour]?.events ?? [];
	});

	const selectedLabel = $derived.by(() => {
		if (!selectedCell) return '';
		const day = heatDays[selectedCell.day];
		if (!day) return '';
		return `${day.label} ${day.num}, ${fmtH(selectedCell.hour)}`;
	});

	function fmtTime(d: Date): string {
		return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
	}

	function duration(ev: TimelineEvent): string {
		const mins = Math.round((ev.end.getTime() - ev.start.getTime()) / 60000);
		if (mins < 60) return `${mins}m`;
		const h = Math.floor(mins / 60);
		const m = mins % 60;
		return m > 0 ? `${h}h${m}m` : `${h}h`;
	}

	// Intensity → color (cold blue → neutral → hot orange/red)
	function heatColor(intensity: number): string {
		if (intensity === 0) return 'var(--dt-hm-empty)';
		if (intensity < 0.3) return 'var(--dt-hm-low)';
		if (intensity < 0.6) return 'var(--dt-hm-mid)';
		if (intensity < 0.9) return 'var(--dt-hm-high)';
		return 'var(--dt-hm-max)';
	}

	// Weekly totals
	const busiestDay = $derived.by(() => {
		let max = 0;
		let label = '';
		for (const d of heatDays) {
			const total = d.cells.reduce((s, c) => s + c.intensity, 0);
			if (total > max) {
				max = total;
				label = d.label;
			}
		}
		return label;
	});

	const totalBusy = $derived(
		Math.round(heatDays.reduce((s, d) => s + d.cells.reduce((cs, c) => cs + c.intensity, 0), 0) * 10) / 10
	);

	function selectCell(day: number, hour: number) {
		if (selectedCell?.day === day && selectedCell?.hour === hour) {
			selectedCell = null;
		} else {
			selectedCell = { day, hour };
		}
	}
</script>

<div class="hm" style={style || undefined} style:height="{height}px">
	<!-- Header -->
	<div class="hm-head">
		<div class="hm-head-left">
			<span class="hm-week">{weekLabel}</span>
			<span class="hm-clock">{clock.hm}</span>
		</div>
		<div class="hm-head-right">
			<span class="hm-stat">{totalBusy}h booked</span>
			<span class="hm-stat">busiest: {busiestDay}</span>
		</div>
	</div>

	<!-- Hour labels row -->
	<div class="hm-hours-row">
		<div class="hm-row-label"></div>
		{#each Array(24) as _, h}
			{#if h % 3 === 0}
				<span class="hm-hour-mark" style:left="calc({h} * (100% / 24))">{fmtH(h)}</span>
			{/if}
		{/each}
	</div>

	<!-- Heatmap grid -->
	<div class="hm-grid">
		{#each heatDays as day, di (day.ms)}
			<div class="hm-row" class:hm-row--today={day.today} class:hm-row--past={day.past && !day.today}>
				<div class="hm-row-label">
					<span class="hm-row-day">{day.label}</span>
					<span class="hm-row-num">{day.num}</span>
				</div>
				<div class="hm-cells">
					{#each day.cells as cell, hi}
						<button
							class="hm-cell"
							class:hm-cell--now={cell.isNow}
							class:hm-cell--selected={selectedCell?.day === di && selectedCell?.hour === hi}
							style:background={heatColor(cell.intensity)}
							onclick={() => selectCell(di, hi)}
							title="{fmtH(cell.hour)}: {cell.events.length > 0 ? cell.events.map(e => e.title).join(', ') : 'free'}"
						>
							{#if cell.isNow}
								<span class="hm-cell-now"></span>
							{/if}
						</button>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<!-- Detail pane -->
	{#if selectedCell && selectedEvents.length > 0}
		<div class="hm-detail">
			<div class="hm-detail-head">
				<span class="hm-detail-label">{selectedLabel}</span>
				<button class="hm-detail-close" onclick={() => (selectedCell = null)}>✕</button>
			</div>
			{#each selectedEvents as ev (ev.id)}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="hm-detail-event"
					class:hm-detail-event--selected={selectedEventId === ev.id}
					style:--ev-color={ev.color || 'var(--dt-accent)'}
					onclick={() => oneventclick?.(ev)}
				>
					<span class="hm-detail-title">{ev.title}</span>
					<span class="hm-detail-time">{fmtTime(ev.start)} — {fmtTime(ev.end)} · {duration(ev)}</span>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.hm {
		/* Heatmap-specific tokens (fallback defaults) */
		--dt-hm-empty: rgba(80, 80, 120, 0.06);
		--dt-hm-low: rgba(255, 167, 38, 0.18);
		--dt-hm-mid: rgba(255, 120, 50, 0.35);
		--dt-hm-high: rgba(255, 80, 30, 0.55);
		--dt-hm-max: rgba(255, 50, 20, 0.72);
		--dt-glow: rgba(255, 107, 53, 0.6);

		position: relative;
		background: var(--dt-bg, #0e0e12);
		border: 1px solid var(--dt-border, rgba(200, 200, 240, 0.06));
		border-radius: 12px;
		overflow: hidden;
		user-select: none;
		display: flex;
		flex-direction: column;
	}

	.hm-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 14px 20px 6px;
		flex-shrink: 0;
	}
	.hm-head-left {
		display: flex;
		align-items: baseline;
		gap: 12px;
	}
	.hm-week {
		font: 500 13px / 1 var(--dt-sans);
		color: var(--dt-text);
	}
	.hm-clock {
		font: 600 11px / 1 var(--dt-mono);
		color: var(--dt-accent);
	}
	.hm-head-right {
		display: flex;
		gap: 14px;
	}
	.hm-stat {
		font: 400 10px / 1 var(--dt-mono);
		color: var(--dt-text-3);
	}

	/* Hour markers */
	.hm-hours-row {
		position: relative;
		height: 16px;
		margin: 0 20px 0 76px;
		flex-shrink: 0;
	}
	.hm-hour-mark {
		position: absolute;
		top: 0;
		font: 400 8px / 1 var(--dt-mono);
		color: var(--dt-text-3);
		transform: translateX(-50%);
	}

	/* Grid */
	.hm-grid {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 3px;
		padding: 0 20px 14px;
		min-height: 0;
	}

	.hm-row {
		display: flex;
		align-items: stretch;
		gap: 8px;
		flex: 1;
		min-height: 24px;
	}
	.hm-row--past {
		opacity: 0.45;
	}
	.hm-row--today {
		background: var(--dt-today-bg);
	}

	.hm-row-label {
		width: 48px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		align-self: center;
		gap: 4px;
	}
	.hm-row-day {
		font: 500 10px / 1 var(--dt-sans);
		color: var(--dt-text-2);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.hm-row-num {
		font: 400 10px / 1 var(--dt-mono);
		color: var(--dt-text-3);
	}
	.hm-row--today .hm-row-day {
		color: var(--dt-accent);
		font-weight: 600;
	}

	.hm-cells {
		display: flex;
		gap: 2px;
		flex: 1;
		align-items: stretch;
	}

	.hm-cell {
		flex: 1;
		border: none;
		border-radius: 3px;
		cursor: pointer;
		padding: 0;
		position: relative;
		transition: background 200ms, transform 100ms;
	}
	.hm-cell:hover {
		transform: scaleY(1.3);
		z-index: 2;
	}
	.hm-cell--now {
		outline: 1.5px solid var(--dt-glow);
		outline-offset: 1px;
		z-index: 3;
	}
	.hm-cell--selected {
		outline: 1.5px solid var(--dt-accent);
		outline-offset: 1px;
		z-index: 4;
	}
	.hm-cell-now {
		position: absolute;
		inset: 0;
		border-radius: 3px;
		animation: hm-pulse 2.5s ease-in-out infinite;
		background: var(--dt-accent);
		opacity: 0.15;
	}
	@keyframes hm-pulse {
		0%, 100% { opacity: 0.15; }
		50% { opacity: 0.35; }
	}

	/* Detail pane */
	.hm-detail {
		position: absolute;
		bottom: 14px;
		right: 20px;
		width: 240px;
		background: var(--dt-surface);
		border: 1px solid var(--dt-border);
		border-radius: 10px;
		padding: 10px 12px;
		z-index: 20;
		box-shadow: 0 8px 32px color-mix(in srgb, var(--dt-bg) 80%, transparent);
	}
	.hm-detail-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 8px;
	}
	.hm-detail-label {
		font: 500 11px / 1 var(--dt-sans);
		color: var(--dt-text);
	}
	.hm-detail-close {
		background: none;
		border: none;
		color: var(--dt-text-3);
		cursor: pointer;
		font-size: 12px;
		padding: 2px 4px;
	}
	.hm-detail-close:hover {
		color: var(--dt-text);
	}
	.hm-detail-event {
		padding: 6px 0;
		border-top: 1px solid var(--dt-border);
		border-left: 3px solid var(--ev-color, var(--dt-accent));
		padding-left: 8px;
		cursor: pointer;
		transition: background 120ms;
	}
	.hm-detail-event:hover {
		background: color-mix(in srgb, var(--ev-color) 10%, transparent);
	}
	.hm-detail-event--selected {
		background: color-mix(in srgb, var(--ev-color) 15%, transparent);
	}
	.hm-detail-title {
		display: block;
		font: 500 11px / 1.2 var(--dt-sans);
		color: var(--dt-text);
		margin-bottom: 2px;
	}
	.hm-detail-time {
		font: 400 9px / 1 var(--dt-mono);
		color: var(--dt-text-2);
	}
</style>
