<script lang="ts">
	/**
	 * AgendaWeek — rolling N-day agenda view.
	 *
	 * "The Week Ahead":
	 *   Today + tomorrow expanded with time slots/countdowns.
	 *   Future days compact (dot + time + title).
	 *   Past days dimmed.
	 *
	 * Answers: "What's coming up and when do I need to be ready?"
	 */
	import { createClock } from '../../core/clock.svelte.js';
	import type { TimelineEvent } from '../../core/types.js';
	import { sod, DAY_MS, startOfWeek, dayNum, isAllDay, isMultiDay, segmentForDay } from '../../core/time.js';
	import { weekdayLong, monthLong } from '../../core/locale.js';
	import { useCalendarContext } from '../shared/context.svelte.js';
	import EventContent from '../shared/EventContent.svelte';
	import { fmtTime, duration, timeUntilMs, progress, groupIntoSlots } from '../shared/format.js';

	const ctx = useCalendarContext();
	const L = $derived(ctx.labels);

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
		height,
		events = [],
		style = '',
		focusDate,
		oneventclick,
		selectedEventId = null,
	}: Props = $props();

	const clock = createClock(ctx.timezone);
	const viewState = $derived(ctx.viewState);
	const equalDays = $derived(ctx.equalDays);
	const showDates = $derived(ctx.showDates);
	const hideDays = $derived(ctx.hideDays);
	const isMobile = $derived(ctx.isMobile);
	const autoHeight = $derived(ctx.autoHeight);
	const compact = $derived(ctx.compact);
	const dayHeaderSnippet = $derived(ctx.dayHeaderSnippet);
	const oneventhover = $derived(ctx.oneventhover);
	const disabledSet = $derived(ctx.disabledSet);

	// ── Swipe navigation (mobile, touch only) ──────────
	let swipeStartX = 0;
	let swipeStartY = 0;
	let swipeActive = false;
	const SWIPE_THRESHOLD = 50;

	function onPointerDown(e: PointerEvent) {
		if (!isMobile || e.pointerType !== 'touch') return;
		swipeActive = true;
		swipeStartX = e.clientX;
		swipeStartY = e.clientY;
	}

	function onPointerUp(e: PointerEvent) {
		if (!swipeActive || e.pointerType !== 'touch') return;
		swipeActive = false;
		const dx = e.clientX - swipeStartX;
		const dy = e.clientY - swipeStartY;
		if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.4) {
			if (dx > 0) viewState?.prev();
			else viewState?.next();
		}
	}

	function onPointerCancel() {
		swipeActive = false;
	}

	// ── Compact-day disclosure ("+N more" → expand) ─────
	let expandedDays = $state<number[]>([]);
	function toggleDayExpand(ms: number): void {
		expandedDays = expandedDays.includes(ms)
			? expandedDays.filter((m) => m !== ms)
			: [...expandedDays, ms];
	}

	// ── Completed-events disclosure ("✓ N completed" → expand) ─────
	let expandedPast = $state<number[]>([]);
	function togglePastExpand(ms: number): void {
		expandedPast = expandedPast.includes(ms)
			? expandedPast.filter((m) => m !== ms)
			: [...expandedPast, ms];
	}

	// ── Format helpers (delegated to shared/format.ts) ──
	// fmtTime, duration, groupIntoSlots imported at top
	// Thin wrappers that bind locale / clock.tick:
	const fmt = (d: Date) => fmtTime(d, locale);
	const eta = (ms: number) => timeUntilMs(ms, clock.tick, L);
	const prog = (ev: TimelineEvent) => progress(ev, clock.tick);

	// ── Event handlers ──────────────────────────────────
	function handleClick(ev: TimelineEvent): void {
		oneventclick?.(ev);
	}

	// ── Week derivations ────────────────────────────────
	type DayTier = 'today' | 'tomorrow' | 'upcoming' | 'past';

	interface DayGroup {
		ms: number;
		dayName: string;
		dateLabel: string;
		tier: DayTier;
		/** True calendar-today, independent of tier (equalDays forces tier 'upcoming') */
		isToday: boolean;
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
			? (viewState?.dayCount === 7
				? startOfWeek(sod(focusDate.getTime()), mondayStart)
				: sod(focusDate.getTime()))
			: (viewState?.dayCount === 7
				? startOfWeek(clock.today, mondayStart)
				: clock.today),
	);

	const customDays = $derived(viewState?.dayCount ?? 7);

	const weekDays = $derived.by((): DayGroup[] => {
		const now = clock.tick;
		const todayMs = clock.today;
		const tomorrowMs = todayMs + DAY_MS;
		const out: DayGroup[] = [];
		for (let i = 0; i < customDays; i++) {
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
			if (equalDays) {
				tier = 'upcoming';
			} else if (ms === todayMs) {
				tier = 'today';
			} else if (ms === tomorrowMs) {
				tier = 'tomorrow';
			} else if (ms < todayMs) {
				tier = 'past';
			} else {
				tier = 'upcoming';
			}

			out.push({
				ms,
				dayName: weekdayLong(ms, locale),
				dateLabel: `${monthLong(ms, locale)} ${dayNum(ms)}`,
				tier,
				isToday: ms === todayMs,
				events: dayEvts,
				allDayEvents: allDayEvts,
				timedEvents: timedEvts,
				pastEvents,
				currentEvents,
				upcomingEvents,
				totalHours: Math.round((totalMinutes / 60) * 10) / 10,
			});
		}

		// Filter hidden days if hideDays is set
		if (hideDays?.length) {
			return out.filter((d) => {
				const jsDay = new Date(d.ms).getDay();
				const iso = jsDay === 0 ? 7 : jsDay;
				return !hideDays.includes(iso);
			});
		}

		return out;
	});
</script>

<!-- ═══ Shared event card snippet ═══ -->
{#snippet eventCard(ev: TimelineEvent, isNow: boolean, eta?: string)}
	<button
		type="button"
		class="ag-card"
		class:ag-card--selected={selectedEventId === ev.id}
		class:ag-card--cancelled={ev.status === 'cancelled'}
		class:ag-card--tentative={ev.status === 'tentative'}
		class:ag-card--full={ev.status === 'full'}
		class:ag-card--limited={ev.status === 'limited'}
		style:--ev-color={ev.color || 'var(--dt-accent)'}
		aria-label="{ev.title}{ev.status === 'cancelled' ? ' (cancelled)' : ''}{ev.status === 'tentative' ? ' (tentative)' : ''}{ev.status === 'full' ? ' (full)' : ''}{ev.status === 'limited' ? ' (limited)' : ''}, {fmt(ev.start)} to {fmt(ev.end)}, {duration(ev)}"
		onclick={() => handleClick(ev)}
		onpointerenter={() => oneventhover?.(ev)}
	>
		<div class="ag-card-body">
			<EventContent event={ev}>
			<span class="ag-card-title">{ev.title}</span>
			{#if ev.subtitle}
				<span class="ag-card-sub">{ev.subtitle}</span>
			{/if}
			{#if ev.location}
				<span class="ag-card-loc">{ev.location}</span>
			{/if}
			<span class="ag-card-meta">
				{#if isNow}
					{L.until} {fmt(ev.end)}
				{:else}
					{fmt(ev.start)} – {fmt(ev.end)}
				{/if}
				<span class="ag-card-dur">{duration(ev)}</span>
				{#if eta}
					<span class="ag-card-eta">{eta}</span>
				{/if}
			</span>
			{#if ev.tags?.length}
				<div class="ag-card-tags">
					{#each ev.tags as tag}
						<span class="ag-card-tag">{tag}</span>
					{/each}
				</div>
			{/if}
			</EventContent>
			{#if isNow}
				<div class="ag-card-progress">
					<div class="ag-card-progress-fill" style:transform="scaleX({prog(ev)})"></div>
				</div>
			{/if}
		</div>
	</button>
{/snippet}

<!-- ═══ Shared compact row snippet ═══ -->
{#snippet compactRow(ev: TimelineEvent, showLoc: boolean, done: boolean)}
	<button
		type="button"
		class="ag-compact"
		class:ag-compact--selected={selectedEventId === ev.id}
		class:ag-compact--done={done}
		class:ag-compact--cancelled={ev.status === 'cancelled'}
		class:ag-compact--tentative={ev.status === 'tentative'}
		class:ag-compact--full={ev.status === 'full'}
		class:ag-compact--limited={ev.status === 'limited'}
		style:--ev-color={ev.color || 'var(--dt-accent)'}
		aria-label="{ev.title}{done ? `, ${L.completed}` : ''}, {fmt(ev.start)}, {duration(ev)}"
		onclick={() => handleClick(ev)}
		onpointerenter={() => oneventhover?.(ev)}
	>
		<EventContent event={ev}>
		<span class="ag-compact-dot"></span>
		<span class="ag-compact-time">{fmt(ev.start)}</span>
		<div class="ag-compact-main">
			<span class="ag-compact-title">{ev.title}</span>
			{#if showLoc && ev.location}
				<span class="ag-compact-loc">{ev.location}</span>
			{/if}
			{#if ev.subtitle}
				<span class="ag-compact-sub">{ev.subtitle}</span>
			{/if}
			{#if ev.tags?.length}
				{#each ev.tags as tag}
					<span class="ag-compact-tag">{tag}</span>
				{/each}
			{/if}
		</div>
		<span class="ag-compact-dur">{duration(ev)}</span>
		</EventContent>
	</button>
{/snippet}

<!-- ═══ "✓ N completed" disclosure toggle ═══ -->
{#snippet pastToggle(ms: number, count: number, summary: boolean)}
	{@const open = expandedPast.includes(ms)}
	<button
		type="button"
		class="ag-wday-past-line ag-past-toggle"
		class:ag-wday-past-line--summary={summary}
		aria-expanded={open}
		onclick={() => togglePastExpand(ms)}
	>
		✓ {L.nCompleted(count)}
		<svg class="ag-past-chevron" class:ag-past-chevron--open={open} viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="12" height="12" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>
	</button>
{/snippet}

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="ag ag--week"
	class:ag--mobile={isMobile}
	class:ag--auto={autoHeight}
	style={style || undefined}
	style:height={height ? `${height}px` : undefined}
	onpointerdown={onPointerDown}
	onpointerup={onPointerUp}
	onpointercancel={onPointerCancel}
>
	<div class="ag-body" role="list" aria-label={L.weekAhead}>
		{#each weekDays as day (day.ms)}
			{@const expanded = day.tier === 'today' || day.tier === 'tomorrow'}
			{#if day.tier === 'past'}
				<!-- Past day: single collapsed line -->
				<div class="ag-wday ag-wday--past" class:ag-wday--disabled={disabledSet.has(day.ms)} role="listitem">
					<div class="ag-wday-head">
						<div class="ag-wday-head-left">
							<span class="ag-wday-name">{day.dayName}</span>
							{#if showDates}<span class="ag-wday-date">{day.dateLabel}</span>{/if}
						</div>
						{#if dayHeaderSnippet}
							<div class="ag-wday-custom-header">
								{@render dayHeaderSnippet({ date: new Date(day.ms), isToday: false, dayName: day.dayName })}
							</div>
						{/if}
					</div>
					{#if day.timedEvents.length > 0}
						{@render pastToggle(day.ms, day.timedEvents.length, true)}
						{#if expandedPast.includes(day.ms)}
							<div class="ag-wday-compact">
								{#each day.timedEvents as ev (ev.id)}
									{@render compactRow(ev, false, true)}
								{/each}
							</div>
						{/if}
					{:else if day.events.length === 0}
						<div class="ag-wday-past-line ag-wday-past-line--summary">{L.noEvents}</div>
					{/if}
				</div>
			{:else}
			<div
				class="ag-wday"
				class:ag-wday--today={day.tier === 'today'}
				class:ag-wday--tomorrow={day.tier === 'tomorrow'}
				class:ag-wday--equal={equalDays}
				class:ag-wday--disabled={disabledSet.has(day.ms)}
				role="listitem"
			>
				<!-- Day header -->
				<div class="ag-wday-head">
					<div class="ag-wday-head-left">
						{#if day.isToday}
						<span class="ag-wday-badge">{L.today}</span>
					{:else if day.tier === 'tomorrow'}
						<span class="ag-wday-badge ag-wday-badge--muted">{L.tomorrow}</span>
						{/if}
						<span class="ag-wday-name">{day.dayName}</span>
						{#if showDates}<span class="ag-wday-date">{day.dateLabel}</span>{/if}
					</div>
					{#if dayHeaderSnippet}
						<div class="ag-wday-custom-header">
							{@render dayHeaderSnippet({ date: new Date(day.ms), isToday: day.tier === 'today', dayName: day.dayName })}
						</div>
					{/if}
				</div>

				{#if day.allDayEvents.length > 0}
					<div class="ag-allday">
						{#each day.allDayEvents as ev (ev.id)}
							{@const seg = segmentForDay(ev, day.ms)}
							{@const isCont = seg !== null && seg.totalDays > 1}
							<button
								type="button"
								class="ag-allday-chip"
								class:ag-allday-chip--selected={selectedEventId === ev.id}
								style:--ev-color={ev.color || 'var(--dt-accent)'}
								aria-label="{ev.title}, {isCont && seg ? L.dayNOfTotal(seg.dayIndex, seg.totalDays) : L.allDay}"
								onclick={() => handleClick(ev)}
								onpointerenter={() => oneventhover?.(ev)}
							>
								<span class="ag-allday-dot"></span>
								<span class="ag-allday-title">{ev.title}</span>
								{#if isCont && seg}
									<span class="ag-allday-span">{seg.dayIndex}/{seg.totalDays}</span>
								{/if}
							</button>
						{/each}
					</div>
				{/if}

				{#if day.events.length === 0}
					<div class="ag-wday-empty">{L.noEvents}</div>
				{:else if compact}
					<!-- Compact: minimal dot + time + title rows for all days -->
					<div class="ag-wday-compact">
						{#each day.timedEvents as ev (ev.id)}
							{@render compactRow(ev, false, false)}
						{/each}
					</div>
				{:else if equalDays}
					<!-- Equal days: card layout for all days, no time-relative badges -->
					<div class="ag-wday-expanded">
						{#each groupIntoSlots(day.timedEvents) as slot (slot.startMs)}
							<div class="ag-wslot">

								<div class="ag-wslot-cards" class:ag-wslot-cards--multi={slot.events.length > 1}>
									{#each slot.events as ev (ev.id)}
										{@render eventCard(ev, false)}
									{/each}
								</div>
							</div>
						{/each}
					</div>
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

								<div class="ag-wslot-cards" class:ag-wslot-cards--multi={slot.events.length > 1}>
									{#each slot.events as ev (ev.id)}
										{@render eventCard(ev, false, day.tier === 'today' ? eta(ev.start.getTime()) : undefined)}
									{/each}
								</div>
							</div>
						{/each}
						{#if day.pastEvents.length > 0}
							{@render pastToggle(day.ms, day.pastEvents.length, false)}
							{#if expandedPast.includes(day.ms)}
								{#each day.pastEvents as ev (ev.id)}
									{@render compactRow(ev, false, true)}
								{/each}
							{/if}
						{/if}
					</div>
				{:else}
					<!-- Compact: future days get minimal rows -->
					{@const dayExpanded = expandedDays.includes(day.ms)}
					<div class="ag-wday-compact">
						{#each (dayExpanded ? day.timedEvents : day.timedEvents.slice(0, 4)) as ev (ev.id)}
							{@render compactRow(ev, true, false)}
						{/each}
						{#if day.timedEvents.length > 4}
							<button
								type="button"
								class="ag-compact-more"
								aria-expanded={dayExpanded}
								onclick={() => toggleDayExpand(day.ms)}
							>
								{dayExpanded ? L.showLess : L.nMore(day.timedEvents.length - 4)}
							</button>
						{/if}
					</div>
				{/if}
			</div>
			{/if}
		{/each}
	</div>

</div>

<style>
	/* ═══ Container ═══ */
	.ag {
		position: relative;
		overflow: hidden;
		user-select: none;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		min-width: 0;
		box-sizing: border-box;
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		font-family: var(--dt-sans, system-ui, sans-serif);
	}
	.ag--auto {
		height: auto;
		overflow: visible;
	}

	/* Button UA reset for interactive cards/rows (real <button>s for a11y).
	   Placed first so later component rules override it. */
	.ag-card,
	.ag-allday-chip,
	.ag-compact,
	.ag-compact-more,
	.ag-past-toggle {
		font: inherit;
		color: inherit;
		text-align: left;
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}

	/* ═══ Body ═══ */
	.ag-body {
		flex: 1;
		min-width: 0;
		overflow-y: auto;
		overflow-x: hidden;
		box-sizing: border-box;
		/* No padding-top here: the sticky day headers pin at the scrollport
		   edge, and container padding would leave a see-through band above
		   them where scrolled cards bleed out. */
		scrollbar-width: thin;
		scrollbar-color: var(--dt-border) transparent;
	}
	.ag-wday:first-child .ag-wday-head {
		padding-top: 12px;
	}
	.ag--auto .ag-body {
		overflow-y: visible;
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
		background: color-mix(in srgb, var(--ev-color) 12%, var(--dt-surface, var(--dt-bg, #ffffff)));
		border: 1px solid color-mix(in srgb, var(--ev-color) 18%, transparent);
		cursor: pointer;
		transition: background 0.15s, border-color 0.15s;
	}
	.ag-allday-chip:hover,
	.ag-allday-chip:active {
		background: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));
		border-color: color-mix(in srgb, var(--ev-color) 30%, transparent);
	}
	.ag-allday-chip:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
	}
	.ag-allday-chip--selected {
		border-color: var(--ev-color);
		background: color-mix(in srgb, var(--ev-color) 18%, var(--dt-surface, var(--dt-bg, #ffffff)));
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
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		white-space: nowrap;
	}
	.ag-allday-span {
		font: 500 10px/1.2 var(--dt-mono, monospace);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		white-space: nowrap;
	}

	/* ═══ Shared: event card ═══ */
	.ag-card {
		display: flex;
		align-items: stretch;
		border-radius: 6px;
		background: color-mix(in srgb, var(--ev-color) 12%, var(--dt-surface, var(--dt-bg, #ffffff)));
		border: 1px solid color-mix(in srgb, var(--ev-color) 8%, var(--dt-border, rgba(0, 0, 0, 0.08)));
		overflow: hidden;
		cursor: pointer;
		transition: background 150ms, border-color 150ms;
	}
	.ag-card:hover,
	.ag-card:active {
		background: color-mix(in srgb, var(--ev-color) 20%, var(--dt-surface, var(--dt-bg, #ffffff)));
		border-color: color-mix(in srgb, var(--ev-color) 30%, transparent);
	}
	.ag-card:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
	}
	.ag-card--selected {
		border-color: var(--ev-color);
		background: color-mix(in srgb, var(--ev-color) 20%, var(--dt-surface, var(--dt-bg, #ffffff)));
	}
	.ag-card--cancelled {
		opacity: 0.5;
	}
	.ag-card--cancelled .ag-card-title {
		text-decoration: line-through;
	}
	.ag-card--tentative {
		opacity: 0.65;
		border-style: dashed;
	}
	.ag-card--full {
		opacity: 0.55;
	}
	.ag-card--limited {
		opacity: 0.65;
		border-style: dashed;
	}
	.ag-card-body {
		padding: 7px 10px;
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
		flex: 1;
	}
	.ag-card-title {
		font-size: 13px;
		font-weight: 600;
		line-height: 1.3;
		word-break: break-word;
		flex: 1;
		min-width: 0;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		overflow: hidden;
	}
	.ag-card-meta {
		display: flex;
		align-items: center;
		font-size: 11px;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		font-family: var(--dt-mono, monospace);
		line-height: 1;
	}
	.ag-card-dur {
		margin-left: 6px;
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
	}
	.ag-card-eta {
		margin-left: auto;
		font-size: 11px;
		font-weight: 600;
		color: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 60%, var(--ev-color));
		letter-spacing: 0.02em;
	}
	.ag-card-sub {
		font-size: 11px;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		line-height: 1;
	}
	.ag-card-loc {
		font-size: 10px;
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		line-height: 1;
	}
	.ag-card-tags {
		display: flex;
		gap: 4px;
		flex-wrap: wrap;
	}
	.ag-card-tag {
		font: 500 10px / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--ev-color, var(--dt-accent));
		background: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, transparent);
		padding: 2px 5px;
		border-radius: 3px;
		white-space: nowrap;
	}
	.ag-card-progress {
		height: 3px;
		background: var(--dt-border, rgba(0, 0, 0, 0.08));
		border-radius: 2px;
		overflow: hidden;
		margin-top: 2px;
	}
	.ag-card-progress-fill {
		height: 100%;
		width: 100%;
		background: var(--ev-color, var(--dt-accent));
		border-radius: 2px;
		transform-origin: left;
		transition: transform 1s linear;
	}
	@media (prefers-reduced-motion: reduce) {
		.ag-card-progress-fill {
			transition: none;
		}
	}

	/* ═══ Week day groups ═══ */
	.ag-wday {
		border-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
	}
	.ag-wday:last-child {
		border-bottom: none;
	}
	.ag-wday--today {
		background: color-mix(in srgb, var(--dt-accent, #2563eb) 2%, transparent);
	}
	.ag-wday--tomorrow .ag-card {
		opacity: 0.82;
	}
	/* Past days: token-based text dim instead of subtree opacity (readability) */
	.ag-wday--past .ag-wday-name {
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		font-weight: 500;
	}
	.ag-wday--past .ag-wday-head {
		padding: 8px 20px 2px;
	}
	.ag-wday--disabled {
		position: relative;
	}
	.ag-wday--disabled::after {
		content: '';
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			135deg,
			transparent,
			transparent 4px,
			color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 8%, transparent) 4px,
			color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 8%, transparent) 8px
		);
		pointer-events: none;
	}
	.ag-wday-custom-header {
		padding: 2px 0 4px;
	}

	.ag-wday-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 20px;
		position: sticky;
		top: 0;
		background: var(--dt-bg, #fff);
		z-index: 1;
		/* Own compositor layer: without it, fast (async) scrolling repaints
		   the pinned header a frame late and a gap flashes above it. */
		transform: translateZ(0);
		will-change: transform;
	}
	.ag-wday-head-left {
		display: flex;
		align-items: baseline;
		gap: 8px;
	}
	.ag-wday-badge {
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dt-accent, #2563eb);
		background: color-mix(in srgb, var(--dt-accent, #2563eb) 12%, transparent);
		padding: 2px 7px;
		border-radius: 3px;
	}
	.ag-wday-badge--muted {
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		background: color-mix(
			in srgb,
			var(--dt-text-2, rgba(0, 0, 0, 0.54)) 10%,
			transparent
		);
	}
	.ag-wday-name {
		font-size: 13px;
		font-weight: 600;
		line-height: 1.2;
	}
	.ag-wday-date {
		font-size: 11px;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		line-height: 1.2;
	}

	.ag-wday-empty {
		padding: 2px 20px 6px;
		font-size: 11px;
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		font-style: italic;
	}

	/* Expanded day */
	.ag-wday-expanded {
		padding: 0 20px 10px;
	}
	.ag-wslot {
		margin-bottom: 4px;
	}
	.ag-wslot-header {
		display: flex;
		align-items: baseline;
		gap: 8px;
		padding: 2px 0;
	}
	.ag-wslot-now {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dt-accent, #2563eb);
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
		font-size: 11px;
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		padding: 6px 0 0;
	}
	.ag-wday-past-line--summary {
		padding: 0 20px 8px;
	}
	/* "✓ N completed" is a disclosure — tap to reveal the finished events */
	.ag-past-toggle {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		cursor: pointer;
		min-height: 32px;
		transition: color 150ms;
		-webkit-tap-highlight-color: transparent;
	}
	.ag-past-toggle:hover,
	.ag-past-toggle:active {
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
	}
	.ag-past-toggle:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
		border-radius: 4px;
	}
	.ag-past-chevron {
		transition: transform 120ms;
	}
	.ag-past-chevron--open {
		transform: rotate(180deg);
	}
	@media (prefers-reduced-motion: reduce) {
		.ag-past-chevron { transition: none; }
	}
	/* Revealed completed events: dim + strike, single token layer */
	.ag-compact--done .ag-compact-title {
		text-decoration: line-through;
		text-decoration-color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
	}
	.ag-compact--done .ag-compact-dot {
		opacity: 0.5;
	}

	/* Compact day events */
	.ag-wday-compact {
		padding: 0 20px 8px;
	}
	.ag-compact {
		display: flex;
		align-items: baseline;
		gap: 6px;
		padding: 3px 0;
		cursor: pointer;
		min-width: 0;
		width: 100%;
	}
	.ag-compact--selected {
		background: color-mix(in srgb, var(--ev-color) 10%, transparent);
		border-radius: 4px;
		/* Highlight gutter comes from negative margins so the row's content
		   stays aligned with its unselected siblings (no tap-shift). */
		padding-left: 6px;
		padding-right: 6px;
		margin-left: -6px;
		margin-right: -6px;
		width: calc(100% + 12px);
	}
	.ag-compact:hover .ag-compact-title,
	.ag-compact:active .ag-compact-title {
		color: var(--dt-text);
	}
	.ag-compact:active {
		background: color-mix(in srgb, var(--ev-color) 8%, transparent);
		border-radius: 4px;
	}
	.ag-compact:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
		border-radius: 4px;
	}
	.ag-compact-dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--ev-color, var(--dt-accent));
		flex-shrink: 0;
		align-self: center;
	}
	.ag-compact-time {
		font-size: 11px;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		min-width: 40px;
		flex-shrink: 0;
		white-space: nowrap;
		line-height: 1.4;
	}
	/* Title + location + subtitle + tags cluster. One line while it fits; on
	   mobile the metadata wraps to a second line instead of crushing the title. */
	.ag-compact-main {
		display: flex;
		align-items: baseline;
		gap: 6px;
		flex: 1;
		min-width: 0;
	}
	.ag--mobile .ag-compact-main {
		flex-wrap: wrap;
		row-gap: 2px;
	}
	.ag-compact-title {
		font-size: 12px;
		font-weight: 500;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		flex: 1;
		/* The title is the row's identity — never let subtitle/tags/duration
		   squeeze it out on narrow screens (min-width: 0 resolves to 0px). */
		min-width: 35%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: color 150ms;
		line-height: 1.4;
	}
	.ag-compact-dur {
		font-size: 10px;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		flex-shrink: 0;
		white-space: nowrap;
		line-height: 1.4;
	}
	.ag-compact-sub {
		font-size: 10px;
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		flex-shrink: 3;
		min-width: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 120px;
		line-height: 1.4;
	}
	.ag-compact-loc {
		font-size: 10px;
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		flex-shrink: 3;
		min-width: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100px;
	}
	.ag-compact--cancelled {
		opacity: 0.5;
	}
	.ag-compact--cancelled .ag-compact-title {
		text-decoration: line-through;
	}
	.ag-compact--tentative {
		opacity: 0.65;
	}
	.ag-compact--full {
		opacity: 0.55;
	}
	.ag-compact--limited {
		opacity: 0.65;
	}
	.ag-compact-tag {
		font: 500 10px / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--ev-color, var(--dt-accent));
		background: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 12%, transparent);
		padding: 1px 4px;
		border-radius: 3px;
		white-space: nowrap;
		flex-shrink: 1;
		min-width: 2.5em;
		max-width: 80px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.ag-compact-more {
		font-size: 11px;
		color: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 72%, transparent);
		padding: 2px 0 0 13px;
		cursor: pointer;
		display: block;
	}
	.ag-compact-more:hover,
	.ag-compact-more:active {
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
	}
	.ag-compact-more:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
		border-radius: 4px;
	}

	/* ═══ Mobile adaptations ═══ */
	.ag--mobile .ag-wday-head {
		padding: 12px 16px;
	}
	.ag--mobile .ag-wday-expanded {
		padding: 0 16px 12px;
	}
	.ag--mobile .ag-wday-compact {
		padding: 0 16px 12px;
	}
	.ag--mobile .ag-card-body {
		padding: 12px 14px;
	}
	.ag--mobile .ag-card-title {
		font-size: 15px;
	}
	.ag--mobile .ag-card-meta {
		font-size: 12px;
	}
	.ag--mobile .ag-card-sub {
		font-size: 12px;
	}
	.ag--mobile .ag-card-loc {
		font-size: 12px;
	}
	.ag--mobile .ag-card-eta {
		font-size: 12px;
	}
	.ag--mobile .ag-card-tag {
		font-size: 11px;
	}
	.ag--mobile .ag-compact {
		padding: 8px 0;
	}
	.ag--mobile .ag-compact-title {
		font-size: 15px;
	}
	.ag--mobile .ag-compact-time {
		font-size: 12px;
	}
	.ag--mobile .ag-compact-dur {
		font-size: 12px;
	}
	.ag--mobile .ag-compact-sub {
		font-size: 12px;
	}
	.ag--mobile .ag-compact-loc {
		font-size: 11px;
	}
	.ag--mobile .ag-compact-tag {
		font-size: 11px;
	}
	.ag--mobile .ag-compact-more {
		font-size: 12px;
		padding-top: 6px;
	}
	.ag--mobile .ag-allday-span {
		font-size: 11px;
	}
	.ag--mobile .ag-wday-badge {
		font-size: 11px;
	}
	.ag--mobile .ag-wslot-now {
		font-size: 11px;
	}
	.ag--mobile .ag-wday-empty {
		font-size: 12px;
	}
	.ag--mobile .ag-wday-past-line {
		font-size: 12px;
	}
	.ag--mobile .ag-wslot-cards--multi {
		grid-template-columns: 1fr;
	}
</style>
