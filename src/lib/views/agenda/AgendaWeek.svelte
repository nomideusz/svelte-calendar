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
	import { sod, addDaysMs, startOfWeek, isAllDay, isMultiDay, segmentForDay } from '../../core/time.js';
	import { weekdayLong, monthLong, fmtDayNum } from '../../core/locale.js';
	import { useCalendarContext } from '../shared/context.svelte.js';
	import EventContent from '../shared/EventContent.svelte';
	import { fmtTime, duration, timeUntilMs, progress, groupIntoSlots } from '../shared/format.js';
	import { createSwipe } from '../mobile/swipe.js';

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
	// Timetable layout is a desktop affordance — stacked list stays on mobile.
	const cols = $derived(ctx.columns && !isMobile);
	const dayHeaderSnippet = $derived(ctx.dayHeaderSnippet);
	const oneventhover = $derived(ctx.oneventhover);
	const ondayclick = $derived(ctx.ondayclick);
	const disabledSet = $derived(ctx.disabledSet);

	function clickDay(ms: number) {
		ondayclick?.(new Date(ms));
	}
	/** Keyboard activation for the day header / empty-day row (role="button").
	 *  Keys aimed at a control inside a custom dayHeader snippet stay its own. */
	function dayKeydown(e: KeyboardEvent, ms: number) {
		if (e.target !== e.currentTarget) return;
		if (e.key !== 'Enter' && e.key !== ' ') return;
		e.preventDefault();
		clickDay(ms);
	}

	// ── Status suffix (aria) ────────────────────────────
	function statusText(ev: TimelineEvent): string {
		if (ev.status === 'cancelled') return ` (${L.cancelled})`;
		if (ev.status === 'tentative') return ` (${L.tentative})`;
		if (ev.status === 'full') return ` (${L.full})`;
		if (ev.status === 'limited') return ` (${L.limited})`;
		return '';
	}

	/** All-day events and timed ones at least a (wall-clock) day long go to
	 *  the all-day chips; a shorter overnight event is listed with its time on
	 *  each day it touches. */
	function inAllDayStrip(ev: TimelineEvent): boolean {
		return isAllDay(ev) || ev.end.getTime() >= addDaysMs(ev.start.getTime(), 1);
	}

	// ── Day-to-day card drag (timetable columns) ────────
	// This view has no hour axis, so a drag can only choose a DAY: the card
	// keeps its time of day. Wired through the same oneventmove the planner
	// uses (readOnly-gated and timezone-unzoned at the Calendar layer);
	// per-event data.readOnly opts out — same convention as PlannerWeek.
	const oneventmove = $derived(ctx.oneventmove);
	let dragId = $state<string | null>(null);
	let dropDay = $state<number | null>(null);

	const canDrag = (ev: TimelineEvent) =>
		cols && !!oneventmove && !ev.data?.readOnly && !isAllDay(ev) && !isMultiDay(ev);

	/** Valid drop day for the card in flight: not past, not closed. */
	const isDropDay = (day: { tier: string; ms: number }) =>
		dragId !== null && day.tier !== 'past' && !disabledSet.has(day.ms);

	function onCardDragStart(e: DragEvent, ev: TimelineEvent) {
		dragId = String(ev.id);
		if (e.dataTransfer) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text/plain', String(ev.id));
		}
	}

	function onDayDrop(e: DragEvent, day: { tier: string; ms: number }) {
		if (!isDropDay(day)) return;
		e.preventDefault();
		e.stopPropagation(); // the host may keep its own drop net for external drags
		const ev = events.find((x) => String(x.id) === dragId);
		dragId = null;
		dropDay = null;
		if (!ev) return;
		// Same-day drop is a no-op, not a zero-minute "move" for the host to reject.
		if (sod(ev.start.getTime()) === day.ms) return;
		// Same wall-clock time on the target day (a fixed ms offset from
		// midnight is an hour off when a DST change lies between the two).
		const s = ev.start;
		const start = new Date(new Date(day.ms).setHours(s.getHours(), s.getMinutes(), s.getSeconds(), s.getMilliseconds()));
		const end = new Date(start.getTime() + (ev.end.getTime() - ev.start.getTime()));
		oneventmove?.(ev, start, end);
	}

	// ── Swipe navigation (mobile, touch only) ──────────
	// Touch events, not pointer events: once the browser claims a touch for
	// panning it sends pointercancel and the pointerup never arrives.
	const swipe = createSwipe({
		disabled: () => !isMobile,
		onmove: () => {},
		onend: (dir) => {
			if (dir > 0) viewState?.prev();
			else if (dir < 0) viewState?.next();
		},
	});

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
		month: string;
		num: string;
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
		const tomorrowMs = addDaysMs(todayMs, 1);
		const out: DayGroup[] = [];
		for (let i = 0; i < customDays; i++) {
			const ms = addDaysMs(weekStartMs, i);
			const dEnd = addDaysMs(ms, 1);
			const dayEvts = events
				.filter((ev) => ev.start.getTime() < dEnd && ev.end.getTime() > ms)
				.sort((a, b) => a.start.getTime() - b.start.getTime());
			const allDayEvts = dayEvts.filter(inAllDayStrip);
			const timedEvts = dayEvts.filter((ev) => !inAllDayStrip(ev));
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
				month: monthLong(ms, locale),
				num: fmtDayNum(ms, locale),
				tier,
				// A dateless weekly template (showDates=false) has no today to mark.
				isToday: showDates && ms === todayMs,
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
		style:--ev-color={ev.color || 'var(--dt-event, var(--dt-accent))'}
		aria-label="{ev.title}{statusText(ev)}, {fmt(ev.start)} – {fmt(ev.end)}, {duration(ev)}"
		class:ag-card--drag={dragId === String(ev.id)}
		draggable={canDrag(ev)}
		ondragstart={(e) => onCardDragStart(e, ev)}
		ondragend={() => ((dragId = null), (dropDay = null))}
		onclick={() => handleClick(ev)}
		onpointerenter={() => oneventhover?.(ev)}
	>
		<div class="ag-card-body">
			<EventContent event={ev}>
			<span class="ag-card-title">{ev.title}</span>
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
			{#if ev.subtitle}
				<span class="ag-card-sub">{ev.subtitle}</span>
			{/if}
			{#if ev.location}
				<span class="ag-card-loc">{ev.location}</span>
			{/if}
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
		style:--ev-color={ev.color || 'var(--dt-event, var(--dt-accent))'}
		aria-label="{ev.title}{statusText(ev)}{done ? `, ${L.completed}` : ''}, {fmt(ev.start)}, {duration(ev)}"
		onclick={() => handleClick(ev)}
		onpointerenter={() => oneventhover?.(ev)}
	>
		<EventContent event={ev}>
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

<!-- svelte-ignore a11y_no_static_element_interactions (touch swipe only; no pointer/keyboard role) -->
<div
	class="ag ag--week"
	class:ag--mobile={isMobile}
	class:ag--auto={autoHeight}
	class:ag--cols={cols}
	style={style || undefined}
	style:height={height ? `${height}px` : undefined}
	ontouchstart={swipe.ontouchstart}
	ontouchmove={swipe.ontouchmove}
	ontouchend={swipe.ontouchend}
	ontouchcancel={swipe.ontouchcancel}
>
	<div class="ag-body" role="list" aria-label={L.weekAhead} style:--ag-cols={weekDays.length}>
		{#each weekDays as day (day.ms)}
			{@const expanded = day.tier === 'today' || day.tier === 'tomorrow'}
			{#if day.tier === 'past'}
				<!-- Past day: single collapsed line -->
				<div class="ag-wday ag-wday--past" class:ag-wday--disabled={disabledSet.has(day.ms)} data-day={day.ms} role="listitem">
					<!-- role="button" exactly when ondayclick is set (Calendar always sets it) -->
					<!-- svelte-ignore a11y_no_static_element_interactions, a11y_no_noninteractive_tabindex -->
					<div
						class="ag-wday-head"
						class:ag-wday-head--click={!!ondayclick}
						role={ondayclick ? 'button' : undefined}
						tabindex={ondayclick ? 0 : undefined}
						onclick={ondayclick ? () => clickDay(day.ms) : undefined}
						onkeydown={ondayclick ? (e) => dayKeydown(e, day.ms) : undefined}
					>
						<div class="ag-wday-head-left">
							{#if showDates}<span class="ag-wday-num">{day.num}</span>{/if}
							<span class="ag-wday-name">{day.dayName}</span>
							{#if showDates}<span class="ag-wday-date">{day.month}</span>{/if}
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
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<div
				class="ag-wday"
				class:ag-wday--today={day.tier === 'today'}
				class:ag-wday--tomorrow={day.tier === 'tomorrow'}
				class:ag-wday--equal={equalDays}
				class:ag-wday--disabled={disabledSet.has(day.ms)}
				class:ag-wday--drop={dropDay === day.ms && isDropDay(day)}
				data-day={day.ms}
				role="listitem"
				ondragover={(e) => {
					if (!isDropDay(day)) return;
					e.preventDefault();
					dropDay = day.ms;
					if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
				}}
				ondragleave={() => {
					if (dropDay === day.ms) dropDay = null;
				}}
				ondrop={(e) => onDayDrop(e, day)}
			>
				<!-- Day header -->
				<!-- role="button" exactly when ondayclick is set (Calendar always sets it) -->
				<!-- svelte-ignore a11y_no_static_element_interactions, a11y_no_noninteractive_tabindex -->
				<div
					class="ag-wday-head"
					class:ag-wday-head--click={!!ondayclick}
					role={ondayclick ? 'button' : undefined}
					tabindex={ondayclick ? 0 : undefined}
					onclick={ondayclick ? () => clickDay(day.ms) : undefined}
					onkeydown={ondayclick ? (e) => dayKeydown(e, day.ms) : undefined}
				>
					<div class="ag-wday-head-left">
						{#if showDates}<span class="ag-wday-num">{day.num}</span>{/if}
						{#if day.isToday}
							<span class="ag-wday-badge">{L.today}</span>
						{:else if showDates && day.tier === 'tomorrow'}
							<span class="ag-wday-badge ag-wday-badge--muted">{L.tomorrow}</span>
						{/if}
						<span class="ag-wday-name">{day.dayName}</span>
						{#if showDates}<span class="ag-wday-date">{day.month}</span>{/if}
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
					<!-- svelte-ignore a11y_no_static_element_interactions, a11y_no_noninteractive_tabindex -->
					<div
						class="ag-wday-empty"
						class:ag-wday-empty--click={!!ondayclick}
						role={ondayclick ? 'button' : undefined}
						tabindex={ondayclick ? 0 : undefined}
						onclick={ondayclick ? () => clickDay(day.ms) : undefined}
						onkeydown={ondayclick ? (e) => dayKeydown(e, day.ms) : undefined}
					>{L.noEvents}</div>
				{:else if compact && !cols}
					<!-- Compact: minimal dot + time + title rows for all days.
					     Ignored in columns mode — single-line rows truncate to
					     nothing at column width; cards wrap instead. -->
					<div class="ag-wday-compact">
						{#each day.timedEvents as ev (ev.id)}
							{@render compactRow(ev, false, false)}
						{/each}
					</div>
				{:else if equalDays || (cols && !expanded)}
					<!-- Equal days (or timetable columns): card layout, no time-relative
					     badges. In columns, today/tomorrow still fall through to the
					     expanded branch below for now/ETA treatment. -->
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
		color: var(--dt-text, rgba(15, 15, 15, 0.87));
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
	/* An all-day event is a solid band in its colour — no tint, no dot, no pill. */
	.ag-allday-chip {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 4px 10px;
		border-radius: 0;
		border: none;
		background: var(--ev-color);
		color: var(--dt-btn-text, #fff);
		cursor: pointer;
	}
	.ag-allday-chip:hover,
	.ag-allday-chip:active {
		filter: brightness(1.08);
	}
	.ag-allday-chip:focus-visible {
		outline: none;
		box-shadow: inset 0 0 0 2px var(--dt-btn-text, #fff), 0 0 0 2px var(--dt-accent, #1d4fd7);
	}
	.ag-allday-chip--selected {
		box-shadow: inset 0 0 0 2px var(--dt-btn-text, #fff);
	}
	.ag-allday-dot {
		display: none;
	}
	.ag-allday-title {
		font: 500 13.5px/1.2 var(--dt-sans, system-ui, sans-serif);
		color: inherit;
		white-space: nowrap;
	}
	.ag-allday-span {
		font: 400 12.5px/1.2 var(--dt-sans, system-ui, sans-serif);
		font-variant-numeric: tabular-nums;
		color: inherit;
		white-space: nowrap;
	}

	/* ═══ Shared: event card ═══ */
	/* Paper, not a tinted card: a 3px start bar in the event colour, a
	   hairline rule beneath, ink text. Hover is a wash, selection a ring. */
	.ag-card {
		position: relative;
		display: flex;
		/* A <button> shrinks to its content; the NOW card sits outside the
		   stretching slot column, so it claims the row explicitly. */
		width: 100%;
		align-items: stretch;
		border-radius: 0;
		background: transparent;
		border: none;
		border-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.3));
		overflow: hidden;
		cursor: pointer;
		transition: background 150ms, box-shadow 150ms;
	}
	.ag-card::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 3px;
		background: var(--ev-color);
	}
	.ag-card:hover,
	.ag-card:active {
		background: var(--dt-hover, rgba(15, 15, 15, 0.04));
	}
	.ag-card:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);
	}
	.ag-card--selected {
		box-shadow: inset 0 0 0 1px var(--ev-color);
	}
	.ag-card--cancelled .ag-card-title {
		text-decoration: line-through;
		color: var(--dt-text-2, rgba(15, 15, 15, 0.54));
	}
	.ag-card--cancelled::before,
	.ag-card--full::before {
		opacity: 0.45;
	}
	.ag-card--tentative .ag-card-title,
	.ag-card--limited .ag-card-title,
	.ag-card--full .ag-card-title {
		color: var(--dt-text-2, rgba(15, 15, 15, 0.54));
	}
	.ag-card--tentative::before,
	.ag-card--limited::before {
		background: repeating-linear-gradient(180deg, var(--ev-color) 0 4px, transparent 4px 7px);
	}
	/* Planner scale: title 15/500, time 14 tabular in ink, meta 12.5 in ink-2.
	   The body keeps a reading measure so meta never drifts across a wide row. */
	.ag-card-body {
		padding: 8px 10px 8px 13px;
		display: flex;
		flex-direction: column;
		gap: 3px;
		min-width: 0;
		max-width: 44rem;
		flex: 1;
	}
	.ag-card-title {
		font: 500 15px/1.25 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(15, 15, 15, 0.87));
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
		align-items: baseline;
		flex-wrap: wrap;
		column-gap: 8px;
		row-gap: 2px;
		font: 400 14px/1.2 var(--dt-sans, system-ui, sans-serif);
		font-variant-numeric: tabular-nums;
		color: var(--dt-text, rgba(15, 15, 15, 0.87));
	}
	.ag-card-dur,
	.ag-card-eta,
	.ag-card-sub,
	.ag-card-loc,
	.ag-card-tag {
		font: 400 12.5px/1.2 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
	}
	.ag-card-tags {
		display: flex;
		column-gap: 10px;
		row-gap: 2px;
		flex-wrap: wrap;
	}
	.ag-card-tag {
		white-space: nowrap;
	}
	.ag-card-progress {
		height: 3px;
		background: var(--dt-border, rgba(15, 15, 15, 0.08));
		border-radius: 0;
		overflow: hidden;
		margin-top: 2px;
	}
	.ag-card-progress-fill {
		height: 100%;
		width: 100%;
		background: var(--ev-color, var(--dt-accent));
		border-radius: 0;
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
		border-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));
	}
	.ag-wday:last-child {
		border-bottom: none;
	}
	.ag-wday--today {
		background: color-mix(in srgb, var(--dt-accent, #1d4fd7) 2%, transparent);
	}
	/* Past days: quieter ink from the text tokens, no subtree opacity */
	.ag-wday--past .ag-wday-num {
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
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
			color-mix(in srgb, var(--dt-text, rgba(15, 15, 15, 0.87)) 8%, transparent) 4px,
			color-mix(in srgb, var(--dt-text, rgba(15, 15, 15, 0.87)) 8%, transparent) 8px
		);
		pointer-events: none;
	}
	.ag-wday-custom-header {
		padding: 2px 0 4px;
	}

	.ag-wday-head--click,
	.ag-wday-empty--click {
		cursor: pointer;
	}
	.ag-wday-head--click:focus-visible,
	.ag-wday-empty--click:focus-visible {
		outline: 2px solid var(--dt-text, #0f0f0f);
		outline-offset: -2px;
		border-radius: 0;
	}
	.ag-wday-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 20px;
		position: sticky;
		top: 0;
		background: var(--dt-bg, #efebe9);
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
	/* The planner's header type: the day number is the typography (40/400,
	   narrowed), the weekday a tracked 12/500 label; today takes the accent. */
	.ag-wday-num {
		font: 400 40px/1 var(--dt-sans, system-ui, sans-serif);
		font-stretch: 90%;
		letter-spacing: -0.02em;
		font-variant-numeric: tabular-nums;
		color: var(--dt-text, rgba(15, 15, 15, 0.87));
		margin-inline-end: 4px;
	}
	.ag-wday-badge,
	.ag-wday-name {
		font: 500 12px/1 var(--dt-sans, system-ui, sans-serif);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
	}
	.ag-wday--today .ag-wday-num,
	.ag-wday--today .ag-wday-name,
	.ag-wday-badge {
		color: var(--dt-accent, #1d4fd7);
	}
	.ag-wday .ag-wday-badge--muted {
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
	}
	/* Set like the weekday beside it, so the heading reads in one case */
	.ag-wday-date {
		font: 400 12px/1 var(--dt-sans, system-ui, sans-serif);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
	}

	.ag-wday-empty {
		padding: 2px 20px 8px;
		font-size: 12.5px;
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
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
		font: 500 12px/1.2 var(--dt-sans, system-ui, sans-serif);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dt-accent, #1d4fd7);
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
		font-size: 12.5px;
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
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
		color: var(--dt-text, rgba(15, 15, 15, 0.87));
	}
	.ag-past-toggle:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-text, #0f0f0f);
		border-radius: 0;
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
	/* Revealed completed events: quieter ink (single token layer). Strikethrough
	   is kept for cancelled only, so "done" and "called off" never read alike. */
	.ag-compact--done .ag-compact-title,
	.ag-compact--done .ag-compact-time {
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
	}
	.ag-compact--done::before {
		opacity: 0.45;
	}

	/* Compact day events */
	.ag-wday-compact {
		padding: 0 20px 8px;
	}
	/* A compact row: 3px start bar, hairline beneath, ink text. */
	.ag-compact {
		position: relative;
		display: flex;
		align-items: baseline;
		gap: 10px;
		padding: 5px 0 5px 11px;
		border-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.3));
		cursor: pointer;
		min-width: 0;
		width: 100%;
	}
	.ag-compact::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 3px;
		background: var(--ev-color, var(--dt-accent));
	}
	.ag-compact--selected {
		box-shadow: inset 0 0 0 1px var(--ev-color);
	}
	.ag-compact:hover .ag-compact-title,
	.ag-compact:active .ag-compact-title {
		color: var(--dt-text);
	}
	.ag-compact:hover,
	.ag-compact:active {
		background: var(--dt-hover, rgba(15, 15, 15, 0.04));
	}
	.ag-compact:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);
	}
	.ag-compact-time {
		font: 400 14px/1.3 var(--dt-sans, system-ui, sans-serif);
		font-variant-numeric: tabular-nums;
		color: var(--dt-text, rgba(15, 15, 15, 0.87));
		min-width: 4.4em;
		flex-shrink: 0;
		white-space: nowrap;
	}
	/* Title + location + subtitle + tags cluster, sized to its content so the
	   meta and duration sit beside the title instead of across a wide row.
	   One line while it fits; on mobile the metadata wraps to a second line
	   instead of crushing the title. */
	.ag-compact-main {
		display: flex;
		align-items: baseline;
		gap: 10px;
		flex: 0 1 auto;
		min-width: 0;
	}
	.ag--mobile .ag-compact-main {
		flex: 1;
		flex-wrap: wrap;
		row-gap: 2px;
	}
	/* Mobile: size the title by its content when deciding line breaks — a long
	   title claims the first line whole (ellipsizing only against the full row)
	   and pushes location/subtitle/tags down instead of truncating at 35%. */
	.ag--mobile .ag-compact-title {
		flex-basis: auto;
	}
	/* On their own wrapped line the metadata gets the full width — the tight
	   desktop caps would truncate it beside empty space. */
	.ag--mobile .ag-compact-loc,
	.ag--mobile .ag-compact-sub {
		max-width: 100%;
	}
	.ag-compact-title {
		font: 500 15px/1.3 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(15, 15, 15, 0.87));
		flex: 0 1 auto;
		/* The title is the row's identity — never let subtitle/tags/duration
		   squeeze it out on narrow screens (min-width: 0 resolves to 0px). */
		min-width: 6em;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: color 150ms;
	}
	.ag-compact-dur,
	.ag-compact-sub,
	.ag-compact-loc,
	.ag-compact-tag {
		font: 400 12.5px/1.3 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
		white-space: nowrap;
	}
	.ag-compact-dur {
		font-variant-numeric: tabular-nums;
		flex-shrink: 0;
	}
	.ag-compact-sub {
		flex-shrink: 3;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 160px;
	}
	.ag-compact-loc {
		flex-shrink: 3;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 140px;
	}
	.ag-compact--cancelled .ag-compact-title {
		text-decoration: line-through;
		color: var(--dt-text-2, rgba(15, 15, 15, 0.54));
	}
	.ag-compact--cancelled::before,
	.ag-compact--full::before {
		opacity: 0.45;
	}
	.ag-compact--tentative .ag-compact-title,
	.ag-compact--limited .ag-compact-title,
	.ag-compact--full .ag-compact-title {
		color: var(--dt-text-2, rgba(15, 15, 15, 0.54));
	}
	.ag-compact--tentative::before,
	.ag-compact--limited::before {
		background: repeating-linear-gradient(180deg, var(--ev-color) 0 4px, transparent 4px 7px);
	}
	.ag-compact-tag {
		flex-shrink: 1;
		min-width: 2.5em;
		max-width: 120px;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.ag-compact-more {
		font-size: 12.5px;
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
		padding: 4px 0 0 11px;
		cursor: pointer;
		display: block;
	}
	.ag-compact-more:hover,
	.ag-compact-more:active {
		color: var(--dt-text, rgba(15, 15, 15, 0.87));
	}
	.ag-compact-more:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-text, #0f0f0f);
		border-radius: 0;
	}

	/* ═══ Day-drop drag ═══ */
	.ag-card--drag {
		opacity: 0.4;
	}
	.ag-wday--drop {
		background: var(--dt-hover, rgba(15, 15, 15, 0.04));
		box-shadow: inset 0 0 0 1px var(--dt-accent, #1d4fd7);
	}

	/* ═══ Timetable columns (desktop) ═══ */
	.ag--cols .ag-body {
		display: grid;
		grid-template-columns: repeat(var(--ag-cols, 7), minmax(0, 1fr));
	}
	/* Columns stretch to the tallest day, so the separator runs full height */
	.ag--cols .ag-wday {
		border-bottom: none;
		border-inline-start: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));
		min-width: 0;
	}
	.ag--cols .ag-wday:first-child {
		border-inline-start: none;
	}
	/* Uniform head padding — the :first-child top bump would misalign columns.
	   Also overrides the past-day head variant (extra class = higher specificity). */
	.ag--cols .ag-wday .ag-wday-head {
		padding: 12px 10px 8px;
	}
	/* Badge + name + date won't fit one line in a ~160px column */
	.ag--cols .ag-wday-head-left {
		flex-wrap: wrap;
		row-gap: 2px;
	}
	.ag--cols .ag-wday-expanded,
	.ag--cols .ag-wday-compact,
	.ag--cols .ag-wday-empty,
	.ag--cols .ag-wday-past-line--summary {
		padding-left: 10px;
		padding-right: 10px;
	}
	.ag--cols .ag-allday {
		padding-left: 10px;
		padding-right: 10px;
	}
	/* Narrow cards: long titles get a third line, meta wraps instead of clipping */
	.ag--cols .ag-card-title {
		-webkit-line-clamp: 3;
		line-clamp: 3;
	}
	.ag--cols .ag-card-meta {
		flex-wrap: wrap;
		row-gap: 3px;
	}

	/* ═══ Mobile adaptations ═══ */
	/* Horizontal swipes are ours (week navigation); the browser keeps
	   vertical scrolling and pinch-zoom. */
	.ag--mobile,
	.ag--mobile .ag-body {
		touch-action: pan-y pinch-zoom;
	}
	.ag--mobile .ag-wday-head {
		padding: 12px 16px;
	}
	.ag--mobile .ag-wday-expanded {
		padding: 0 16px 12px;
	}
	.ag--mobile .ag-wday-compact {
		padding: 0 16px 12px;
	}
	/* Type is already on the planner scale; phones only get bigger targets. */
	.ag--mobile .ag-card-body {
		padding: 12px 14px;
	}
	.ag--mobile .ag-compact {
		padding: 8px 0 8px 11px;
	}
	.ag--mobile .ag-compact-more {
		padding-top: 6px;
	}
	.ag--mobile .ag-wslot-cards--multi {
		grid-template-columns: 1fr;
	}
</style>
