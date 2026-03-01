<script lang="ts">
	/**
	 * AgendaWeek — rolling 7-day agenda view.
	 *
	 * "The Week Ahead":
	 *   Today + tomorrow expanded with time slots/countdowns.
	 *   Future days compact (dot + time + title).
	 *   Past days dimmed.
	 *
	 * Answers: "What's coming up and when do I need to be ready?"
	 */
	import { getContext } from 'svelte';
	import { createClock } from '../../core/clock.svelte.js';
	import type { TimelineEvent } from '../../core/types.js';
	import { sod, DAY_MS, startOfWeek, dayNum, isAllDay, isMultiDay } from '../../core/time.js';
	import { weekdayLong, weekdayShort, monthShort, fmtTime as _fmtTime, fmtDuration, getLabels } from '../../core/locale.js';
	import type { ViewState } from '../../engine/view-state.svelte.js';

	const L = $derived(getLabels());

	interface Props {
		mondayStart?: boolean;
		locale?: string;
		height?: number;
		events?: TimelineEvent[];
		style?: string;
		focusDate?: Date;
		oneventclick?: (event: TimelineEvent) => void;
		selectedEventId?: string | null;
		[key: string]: unknown;
	}

	let {
		mondayStart = true,
		locale,
		height = 520,
		events = [],
		style = '',
		focusDate,
		oneventclick,
		selectedEventId = null,
	}: Props = $props();

	const clock = createClock();
	const viewState = getContext<ViewState>('calendar:viewState') as ViewState | undefined;

	// ── Format helpers ──────────────────────────────────
	function fmtTime(d: Date): string {
		return _fmtTime(d, locale);
	}

	function duration(ev: TimelineEvent): string {
		return fmtDuration(ev.start, ev.end);
	}

	function timeUntilMs(ms: number): string {
		const diff = ms - clock.tick;
		if (diff <= 0) return L.now;
		const tMins = Math.floor(diff / 60000);
		if (tMins < 60) return `in ${tMins}m`;
		const hrs = Math.floor(tMins / 60);
		const rm = tMins % 60;
		if (hrs < 24) return rm > 0 ? `in ${hrs}h ${rm}m` : `in ${hrs}h`;
		const days = Math.floor(hrs / 24);
		return `in ${days}d`;
	}

	function progress(ev: TimelineEvent): number {
		const s = ev.start.getTime();
		const e = ev.end.getTime();
		return Math.min(1, Math.max(0, (clock.tick - s) / (e - s)));
	}

	// ── Overlap grouping ────────────────────────────────
	interface TimeSlot {
		startMs: number;
		endMs: number;
		events: TimelineEvent[];
	}

	function groupIntoSlots(evts: TimelineEvent[]): TimeSlot[] {
		const sorted = [...evts].sort((a, b) => a.start.getTime() - b.start.getTime());
		const slots: TimeSlot[] = [];
		for (const ev of sorted) {
			const last = slots[slots.length - 1];
			if (last && ev.start.getTime() < last.endMs) {
				last.events.push(ev);
				last.endMs = Math.max(last.endMs, ev.end.getTime());
			} else {
				slots.push({
					startMs: ev.start.getTime(),
					endMs: ev.end.getTime(),
					events: [ev],
				});
			}
		}
		return slots;
	}

	// ── Event handlers ──────────────────────────────────
	function handleClick(ev: TimelineEvent): void {
		oneventclick?.(ev);
	}

	function handleKeydown(e: KeyboardEvent, ev: TimelineEvent): void {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			oneventclick?.(ev);
		}
	}

	// ── Week derivations ────────────────────────────────
	type DayTier = 'today' | 'tomorrow' | 'upcoming' | 'past';

	interface DayGroup {
		ms: number;
		dayName: string;
		dateLabel: string;
		tier: DayTier;
		events: TimelineEvent[];
		allDayEvents: TimelineEvent[];
		timedEvents: TimelineEvent[];
		pastEvents: TimelineEvent[];
		currentEvents: TimelineEvent[];
		upcomingEvents: TimelineEvent[];
		totalHours: number;
	}

	const weekStartMs = $derived(
		focusDate
			? startOfWeek(sod(focusDate.getTime()), mondayStart)
			: startOfWeek(clock.today, mondayStart),
	);

	const isThisWeek = $derived(
		weekStartMs === startOfWeek(clock.today, mondayStart),
	);

	const weekDays = $derived.by((): DayGroup[] => {
		const now = clock.tick;
		const todayMs = clock.today;
		const tomorrowMs = todayMs + DAY_MS;
		const out: DayGroup[] = [];
		for (let i = 0; i < 7; i++) {
			const ms = weekStartMs + i * DAY_MS;
			const dEnd = ms + DAY_MS;
			const dayEvts = events
				.filter((ev) => ev.start.getTime() < dEnd && ev.end.getTime() > ms)
				.sort((a, b) => a.start.getTime() - b.start.getTime());
			const allDayEvts = dayEvts.filter((ev) => isAllDay(ev) || isMultiDay(ev));
			const timedEvts = dayEvts.filter((ev) => !isAllDay(ev) && !isMultiDay(ev));
			const totalMinutes = timedEvts.reduce((sum, ev) => {
				const s = Math.max(ev.start.getTime(), ms);
				const e = Math.min(ev.end.getTime(), dEnd);
				return sum + (e - s) / 60000;
			}, 0);
			const pastEvents: TimelineEvent[] = [];
			const currentEvents: TimelineEvent[] = [];
			const upcomingEvents: TimelineEvent[] = [];
			for (const ev of timedEvts) {
				if (ev.end.getTime() <= now) pastEvents.push(ev);
				else if (ev.start.getTime() <= now && ev.end.getTime() > now) currentEvents.push(ev);
				else upcomingEvents.push(ev);
			}
			let tier: DayTier;
			if (ms === todayMs) tier = 'today';
			else if (ms === tomorrowMs) tier = 'tomorrow';
			else if (ms < todayMs) tier = 'past';
			else tier = 'upcoming';

			out.push({
				ms,
				dayName: tier === 'today' || tier === 'tomorrow' ? weekdayLong(ms, locale) : weekdayShort(ms, locale),
				dateLabel: `${monthShort(ms, locale)} ${dayNum(ms)}`,
				tier,
				events: dayEvts,
				allDayEvents: allDayEvts,
				timedEvents: timedEvts,
				pastEvents,
				currentEvents,
				upcomingEvents,
				totalHours: Math.round((totalMinutes / 60) * 10) / 10,
			});
		}
		return out;
	});
</script>

<!-- ═══ Shared event card snippet ═══ -->
{#snippet eventCard(ev: TimelineEvent, isNow: boolean)}
	<div
		class="ag-card"
		class:ag-card--selected={selectedEventId === ev.id}
		style:--ev-color={ev.color || 'var(--dt-accent)'}
		role="button"
		tabindex="0"
		aria-label="{ev.title}, {fmtTime(ev.start)} to {fmtTime(ev.end)}, {duration(ev)}"
		onclick={() => handleClick(ev)}
		onkeydown={(e) => handleKeydown(e, ev)}
	>
		<div class="ag-card-stripe"></div>
		<div class="ag-card-body">
			<span class="ag-card-title">{ev.title}</span>
			{#if ev.subtitle}
				<span class="ag-card-sub">{ev.subtitle}</span>
			{/if}
			<span class="ag-card-meta">
				{#if isNow}
					{L.until} {fmtTime(ev.end)}
				{:else}
					{fmtTime(ev.start)} – {fmtTime(ev.end)}
				{/if}
				<span class="ag-card-dur">{duration(ev)}</span>
			</span>
			{#if ev.tags?.length}
				<div class="ag-card-tags">
					{#each ev.tags as tag}
						<span class="ag-card-tag">{tag}</span>
					{/each}
				</div>
			{/if}
			{#if isNow}
				<div class="ag-card-progress">
					<div class="ag-card-progress-fill" style:width="{progress(ev) * 100}%"></div>
				</div>
			{/if}
		</div>
	</div>
{/snippet}

<div
	class="ag ag--week"
	style={style || undefined}
>
	<div class="ag-body" role="list" aria-label={L.weekAhead}>
		{#each weekDays as day (day.ms)}
			{@const expanded = day.tier === 'today' || day.tier === 'tomorrow'}
			{#if day.tier === 'past'}
				<!-- Past day: single collapsed line -->
				<div class="ag-wday ag-wday--past" role="listitem">
					<div class="ag-wday-head">
						<div class="ag-wday-head-left">
							<span class="ag-wday-name">{day.dayName}</span>
							<span class="ag-wday-date">{day.dateLabel}</span>
							{#if day.events.length > 0}
								<span class="ag-wday-done">✓ {day.events.length}</span>
							{/if}
						</div>
					</div>
				</div>
			{:else}
			<div
				class="ag-wday"
				class:ag-wday--today={day.tier === 'today'}
				class:ag-wday--tomorrow={day.tier === 'tomorrow'}
				role="listitem"
			>
				<!-- Day header -->
				<div class="ag-wday-head">
					<div class="ag-wday-head-left">
						{#if day.tier === 'today'}
						<span class="ag-wday-badge">{L.today}</span>
					{:else if day.tier === 'tomorrow'}
						<span class="ag-wday-badge ag-wday-badge--muted">{L.tomorrow}</span>
						{/if}
						<span class="ag-wday-name">{day.dayName}</span>
						<span class="ag-wday-date">{day.dateLabel}</span>
					</div>
				</div>

				{#if day.allDayEvents.length > 0}
					<div class="ag-allday">
						{#each day.allDayEvents as ev (ev.id)}
							<div
								class="ag-allday-chip"
								class:ag-allday-chip--selected={selectedEventId === ev.id}
								style:--ev-color={ev.color || 'var(--dt-accent)'}
								role="button"
								tabindex="0"
								aria-label="{ev.title}, {L.allDay}"
								onclick={() => handleClick(ev)}
								onkeydown={(e) => handleKeydown(e, ev)}
							>
								<span class="ag-allday-dot"></span>
								<span class="ag-allday-title">{ev.title}</span>
							</div>
						{/each}
					</div>
				{/if}

				{#if day.events.length === 0}
					<div class="ag-wday-empty">{L.noEvents}</div>
				{:else if expanded}
					<!-- Expanded: today/tomorrow get full slot treatment -->
					<div class="ag-wday-expanded">
						{#if day.currentEvents.length > 0}
							{#each day.currentEvents as ev (ev.id)}
								<div class="ag-wslot">
									<div class="ag-wslot-header">
									<span class="ag-wslot-now">{L.now}</span>
									</div>
									{@render eventCard(ev, true)}
								</div>
							{/each}
						{/if}
						{#each groupIntoSlots(day.upcomingEvents) as slot (slot.startMs)}
							<div class="ag-wslot">
								<div class="ag-wslot-header">
									<span class="ag-wslot-time">{fmtTime(new Date(slot.startMs))}</span>
									{#if day.tier === 'today'}
										<span class="ag-wslot-eta">{timeUntilMs(slot.startMs)}</span>
									{/if}
								</div>
								<div class="ag-wslot-cards" class:ag-wslot-cards--multi={slot.events.length > 1}>
									{#each slot.events as ev (ev.id)}
										{@render eventCard(ev, false)}
									{/each}
								</div>
							</div>
						{/each}
						{#if day.pastEvents.length > 0}
							<div class="ag-wday-past-line">✓ {L.nCompleted(day.pastEvents.length)}</div>
						{/if}
					</div>
				{:else}
					<!-- Compact: future days get minimal rows -->
					<div class="ag-wday-compact">
						{#each day.events.slice(0, 3) as ev (ev.id)}
							<div
								class="ag-compact"
								class:ag-compact--selected={selectedEventId === ev.id}
								style:--ev-color={ev.color || 'var(--dt-accent)'}
								role="button"
								tabindex="0"
								aria-label="{ev.title}, {fmtTime(ev.start)}, {duration(ev)}"
								onclick={() => handleClick(ev)}
								onkeydown={(e) => handleKeydown(e, ev)}
							>
								<span class="ag-compact-dot"></span>
								<span class="ag-compact-time">{fmtTime(ev.start)}</span>
								<span class="ag-compact-title">{ev.title}</span>
								{#if ev.subtitle}
									<span class="ag-compact-sub">{ev.subtitle}</span>
								{/if}
								{#if ev.tags?.length}
									{#each ev.tags as tag}
										<span class="ag-compact-tag">{tag}</span>
									{/each}
								{/if}
								<span class="ag-compact-dur">{duration(ev)}</span>
							</div>
						{/each}
						{#if day.events.length > 3}
							<div class="ag-compact-more">{L.nMore(day.events.length - 3)}</div>
						{/if}
					</div>
				{/if}
			</div>
			{/if}
		{/each}
	</div>

	<!-- ── Floating nav pills ── -->
	<nav class="ag-nav" aria-label={L.weekNavigation}>
		<button
			class="ag-nav-pill ag-nav-today"
			class:ag-nav-today--hidden={isThisWeek}
			onclick={() => viewState?.goToday()}
			aria-label={L.goToToday}
			tabindex={isThisWeek ? -1 : 0}
		>
			{L.today}
		</button>
		<button
			class="ag-nav-pill"
			onclick={() => viewState?.prev()}
			aria-label={L.previousWeek}
		>
			<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="12" height="12" aria-hidden="true"><path d="M10 3 5 8l5 5"/></svg>
		</button>
		<button
			class="ag-nav-pill"
			onclick={() => viewState?.next()}
			aria-label={L.nextWeek}
		>
			<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="12" height="12" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
		</button>
	</nav>
</div>

<style>
	/* ═══ Floating nav pills ═══ */
	.ag-nav {
		position: absolute;
		top: 10px;
		right: 14px;
		z-index: 20;
		display: flex;
		gap: 2px;
		background: color-mix(in srgb, var(--dt-surface, #10141c) 85%, transparent);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		border-radius: 8px;
		padding: 2px;
		border: 1px solid var(--dt-border, rgba(148, 163, 184, 0.07));
	}
	.ag-nav-pill {
		border: none;
		background: transparent;
		color: var(--dt-text-2, rgba(148, 163, 184, 0.55));
		cursor: pointer;
		font: 600 11px / 1 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		padding: 6px 12px;
		border-radius: 6px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		transition: background 100ms, color 100ms;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
	.ag-nav-pill:hover {
		color: var(--dt-text, rgba(226, 232, 240, 0.85));
	}
	.ag-nav-today {
		max-width: 60px;
		overflow: hidden;
		white-space: nowrap;
		transition: max-width 250ms ease, padding 250ms ease, opacity 200ms ease;
	}
	.ag-nav-today--hidden {
		max-width: 0;
		padding-left: 0;
		padding-right: 0;
		opacity: 0;
		pointer-events: none;
	}
	.ag-nav-pill:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--dt-accent, #ef4444) 55%, transparent);
		outline-offset: 2px;
	}

	/* ═══ Container ═══ */
	.ag {
		position: relative;
		overflow: hidden;
		user-select: none;
		display: flex;
		flex-direction: column;
		height: 100%;
		color: var(--dt-text, rgba(255, 255, 255, 0.92));
		font-family: var(--dt-sans, system-ui, sans-serif);
	}

	/* ═══ Body ═══ */
	.ag-body {
		flex: 1;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: var(--dt-border) transparent;
	}
	.ag-body::-webkit-scrollbar {
		width: 4px;
	}
	.ag-body::-webkit-scrollbar-thumb {
		background: var(--dt-border);
		border-radius: 2px;
	}

	/* ═══ All-day chips ═══ */
	.ag-allday {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		padding: 4px 14px 6px;
	}
	.ag-allday-chip {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 2px 8px;
		border-radius: 5px;
		background: color-mix(in srgb, var(--ev-color) 12%, var(--dt-surface, #10141c));
		border: 1px solid color-mix(in srgb, var(--ev-color) 18%, transparent);
		cursor: pointer;
		transition: background 0.15s, border-color 0.15s;
	}
	.ag-allday-chip:hover {
		background: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, #10141c));
		border-color: color-mix(in srgb, var(--ev-color) 30%, transparent);
	}
	.ag-allday-chip:focus-visible {
		outline: 2px solid var(--dt-accent, #ff6b4a);
		outline-offset: 2px;
	}
	.ag-allday-chip--selected {
		border-color: var(--ev-color);
		background: color-mix(in srgb, var(--ev-color) 18%, var(--dt-surface, #10141c));
	}
	.ag-allday-dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--ev-color);
		flex-shrink: 0;
	}
	.ag-allday-title {
		font: 500 0.7rem/1.2 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(226, 232, 240, 0.85));
		white-space: nowrap;
	}

	/* ═══ Shared: event card ═══ */
	.ag-card {
		display: flex;
		align-items: stretch;
		border-radius: 10px;
		background: var(--dt-surface, #191919);
		border: 1px solid var(--dt-border, rgba(255, 255, 255, 0.06));
		overflow: hidden;
		cursor: pointer;
		transition: border-color 150ms;
	}
	.ag-card:hover {
		border-color: color-mix(in srgb, var(--ev-color) 40%, transparent);
	}
	.ag-card:focus-visible {
		outline: 2px solid var(--dt-accent, #ff6b4a);
		outline-offset: 2px;
	}
	.ag-card--selected {
		border-color: var(--ev-color);
		background: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, #191919));
	}
	.ag-card-stripe {
		width: 3px;
		background: var(--ev-color, var(--dt-accent));
		flex-shrink: 0;
	}
	.ag-card-body {
		padding: 10px 12px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
		flex: 1;
	}
	.ag-card-title {
		font-size: 13px;
		font-weight: 600;
		line-height: 1.2;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex: 1;
	}
	.ag-card-meta {
		font-size: 11px;
		color: var(--dt-text-2, rgba(255, 255, 255, 0.5));
		font-family: var(--dt-mono, monospace);
		line-height: 1;
	}
	.ag-card-dur {
		margin-left: 6px;
		color: var(--dt-text-3, rgba(255, 255, 255, 0.3));
	}
	.ag-card-sub {
		font-size: 11px;
		color: var(--dt-text-2, rgba(255, 255, 255, 0.45));
		line-height: 1;
	}
	.ag-card-tags {
		display: flex;
		gap: 4px;
		flex-wrap: wrap;
	}
	.ag-card-tag {
		font: 500 9px / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--ev-color, var(--dt-accent));
		background: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, transparent);
		padding: 2px 5px;
		border-radius: 3px;
		white-space: nowrap;
	}
	.ag-card-progress {
		height: 3px;
		background: var(--dt-border, rgba(255, 255, 255, 0.06));
		border-radius: 2px;
		overflow: hidden;
		margin-top: 2px;
	}
	.ag-card-progress-fill {
		height: 100%;
		background: var(--ev-color, var(--dt-accent));
		border-radius: 2px;
		transition: width 1s linear;
	}

	/* ═══ Week day groups ═══ */
	.ag-wday {
		border-bottom: 1px solid var(--dt-border, rgba(255, 255, 255, 0.06));
	}
	.ag-wday--today {
		background: color-mix(in srgb, var(--dt-accent, #ff6b4a) 4%, transparent);
	}
	.ag-wday--past {
		opacity: 0.35;
	}
	.ag-wday--past .ag-wday-head {
		padding: 6px 20px;
	}
	.ag-wday-done {
		font-size: 10px;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-success, rgba(120, 200, 140, 0.6));
	}
	.ag-wday-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 20px;
	}
	.ag-wday-head-left {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.ag-wday-badge {
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dt-accent, #ff6b4a);
		background: color-mix(in srgb, var(--dt-accent, #ff6b4a) 12%, transparent);
		padding: 2px 7px;
		border-radius: 3px;
	}
	.ag-wday-badge--muted {
		color: var(--dt-text-2, rgba(255, 255, 255, 0.5));
		background: color-mix(
			in srgb,
			var(--dt-text-2, rgba(255, 255, 255, 0.5)) 10%,
			transparent
		);
	}
	.ag-wday-name {
		font-size: 13px;
		font-weight: 600;
	}
	.ag-wday-date {
		font-size: 11px;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-text-3, rgba(255, 255, 255, 0.3));
	}
	.ag-wday-empty {
		padding: 4px 20px 10px;
		font-size: 12px;
		color: var(--dt-text-3, rgba(255, 255, 255, 0.3));
	}

	/* Expanded day */
	.ag-wday-expanded {
		padding: 0 20px 12px;
	}
	.ag-wslot {
		margin-bottom: 6px;
	}
	.ag-wslot-header {
		display: flex;
		align-items: baseline;
		gap: 8px;
		padding: 4px 0;
	}
	.ag-wslot-time {
		font-size: 12px;
		font-weight: 600;
		font-family: var(--dt-mono, monospace);
	}
	.ag-wslot-now {
		font-size: 9px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dt-accent, #ff6b4a);
	}
	.ag-wslot-eta {
		font-size: 11px;
		font-weight: 500;
		color: var(--dt-accent, #ff6b4a);
	}
	.ag-wslot-cards {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.ag-wslot-cards--multi {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 4px;
	}
	.ag-wday-past-line {
		font-size: 10px;
		color: var(--dt-text-3, rgba(255, 255, 255, 0.3));
		padding: 6px 0 0;
		opacity: 0.5;
	}

	/* Compact day events */
	.ag-wday-compact {
		padding: 0 20px 10px;
	}
	.ag-compact {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 4px 0;
		cursor: pointer;
	}
	.ag-compact:hover .ag-compact-title {
		color: var(--dt-text);
	}
	.ag-compact:focus-visible {
		outline: 2px solid var(--dt-accent, #ff6b4a);
		outline-offset: 2px;
	}
	.ag-compact-dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--ev-color, var(--dt-accent));
		flex-shrink: 0;
	}
	.ag-compact-time {
		font-size: 11px;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-text-2, rgba(255, 255, 255, 0.5));
		min-width: 64px;
		flex-shrink: 0;
	}
	.ag-compact-title {
		font-size: 12px;
		font-weight: 500;
		color: var(--dt-text-2, rgba(255, 255, 255, 0.5));
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: color 150ms;
	}
	.ag-compact-dur {
		font-size: 10px;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-text-3, rgba(255, 255, 255, 0.3));
		flex-shrink: 0;
	}
	.ag-compact-sub {
		font-size: 10px;
		color: var(--dt-text-3, rgba(255, 255, 255, 0.35));
		flex-shrink: 0;
	}
	.ag-compact-tag {
		font: 500 8px / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--ev-color, var(--dt-accent));
		background: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 12%, transparent);
		padding: 1px 4px;
		border-radius: 3px;
		white-space: nowrap;
		flex-shrink: 0;
	}
	.ag-compact-more {
		font-size: 11px;
		color: var(--dt-text-3);
		padding: 2px 0 0 13px;
	}
</style>
