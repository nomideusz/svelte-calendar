<script lang="ts">
	/**
	 * Agenda — unified view for day and week granularity.
	 *
	 * Day mode ("The Queue"):
	 *   Upcoming events are THE hero — big, center, detailed.
	 *   NOW is just a slim status strip on the left (context, not focus).
	 *   Past is a faded gutter on the right.
	 *   Answers: "What's coming up next?"
	 *
	 * Week mode ("The Week Ahead"):
	 *   Rolling 7-day view with proximity-based detail.
	 *   Today + tomorrow expanded with slots/countdowns.
	 *   Future days compact (dot + time + title).
	 *   Past days dimmed.
	 *
	 * Answers: "What's coming up and when do I need to be ready?"
	 */
	import { createClock } from '../../core/clock.svelte.js';
	import type { TimelineEvent } from '../../core/types.js';
	import { sod, DAY_MS, startOfWeek, dayNum } from '../../core/time.js';
	import { fmtDay, weekdayLong, weekdayShort, monthShort, fmtWeekRange } from '../../core/locale.js';

	interface Props {
		/** 'day' = single-day timeline rail, 'week' = rolling 7-day view */
		mode?: 'day' | 'week';
		mondayStart?: boolean;
		height?: number;
		events?: TimelineEvent[];
		style?: string;
		focusDate?: Date;
		oneventclick?: (event: TimelineEvent) => void;
		oneventcreate?: (range: { start: Date; end: Date }) => void;
		selectedEventId?: string | null;
		[key: string]: unknown;
	}

	let {
		mode = 'day',
		mondayStart = true,
		height = 520,
		events = [],
		style = '',
		focusDate,
		oneventclick,
		selectedEventId = null,
	}: Props = $props();

	const clock = createClock();

	// ── Format helpers ──────────────────────────────────
	function fmtTime(d: Date): string {
		return d
			.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
			.toLowerCase();
	}

	function duration(ev: TimelineEvent): string {
		const mins = Math.round((ev.end.getTime() - ev.start.getTime()) / 60000);
		if (mins < 60) return `${mins}min`;
		const h = Math.floor(mins / 60);
		const m = mins % 60;
		return m > 0 ? `${h}h ${m}m` : `${h}h`;
	}

	function timeUntilMs(ms: number): string {
		const diff = ms - clock.tick;
		if (diff <= 0) return 'now';
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

	// ═════════════════════════════════════════════════════
	// DAY MODE
	// ═════════════════════════════════════════════════════
	const dayMs = $derived(focusDate ? sod(focusDate.getTime()) : clock.today);
	const dayEnd = $derived(dayMs + DAY_MS);
	const isToday = $derived(dayMs === clock.today);
	const isPastDay = $derived(dayMs < clock.today);
	const isFutureDay = $derived(dayMs > clock.today);

	const dayProgress = $derived((() => {
		if (!isToday) return 0;
		const d = new Date(clock.tick);
		return (d.getHours() * 60 + d.getMinutes()) / 1440;
	})());

	/** All events for this day, sorted chronologically — used for past/future day views */
	const allDayEvents = $derived.by((): TimelineEvent[] => {
		if (mode !== 'day') return [];
		return events
			.filter((ev) => ev.start.getTime() < dayEnd && ev.end.getTime() > dayMs)
			.sort((a, b) => a.start.getTime() - b.start.getTime());
	});

	/** Total hours booked for the day */
	const dayHours = $derived((() => {
		const mins = allDayEvents.reduce((sum, ev) => {
			const s = Math.max(ev.start.getTime(), dayMs);
			const e = Math.min(ev.end.getTime(), dayEnd);
			return sum + (e - s) / 60000;
		}, 0);
		return Math.round((mins / 60) * 10) / 10;
	})());

	const dayCat = $derived.by(() => {
		if (mode !== 'day') return { past: [] as TimelineEvent[], current: [] as TimelineEvent[], upcomingSlots: [] as TimeSlot[], totalUp: 0 };
		const now = clock.tick;
		const past: TimelineEvent[] = [];
		const current: TimelineEvent[] = [];
		const upcoming: TimelineEvent[] = [];
		const dayEvents = events.filter(
			(ev) => ev.start.getTime() < dayEnd && ev.end.getTime() > dayMs,
		);
		const sorted = [...dayEvents].sort((a, b) => a.start.getTime() - b.start.getTime());
		for (const ev of sorted) {
			const s = ev.start.getTime();
			const e = ev.end.getTime();
			if (e <= now) past.push(ev);
			else if (s <= now && e > now) current.push(ev);
			else upcoming.push(ev);
		}
		return { past, current, upcomingSlots: groupIntoSlots(upcoming), totalUp: upcoming.length };
	});

	const dayTotal = $derived(dayCat.past.length + dayCat.current.length + dayCat.totalUp);

	/** Flat list of next upcoming events (max 5) for the "Up next" column */
	const upcomingNext = $derived.by((): TimelineEvent[] => {
		if (mode !== 'day') return [];
		const all: TimelineEvent[] = [];
		for (const slot of dayCat.upcomingSlots) {
			for (const ev of slot.events) {
				all.push(ev);
				if (all.length >= 5) return all;
			}
		}
		return all;
	});

	/** Time until a specific event */
	function timeUntilEv(ev: TimelineEvent): string {
		const diff = ev.start.getTime() - clock.tick;
		if (diff <= 0) return 'now';
		const mins = Math.floor(diff / 60000);
		if (mins < 60) return `in ${mins}m`;
		const hrs = Math.floor(mins / 60);
		const rm = mins % 60;
		return rm > 0 ? `in ${hrs}h ${rm}m` : `in ${hrs}h`;
	}

	// ═════════════════════════════════════════════════════
	// WEEK MODE
	// ═════════════════════════════════════════════════════
	type DayTier = 'today' | 'tomorrow' | 'upcoming' | 'past';

	interface DayGroup {
		ms: number;
		dayName: string;
		dateLabel: string;
		tier: DayTier;
		events: TimelineEvent[];
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
	const weekLabel = $derived(fmtWeekRange(weekStartMs));

	const weekDays = $derived.by((): DayGroup[] => {
		if (mode !== 'week') return [];
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
			const totalMinutes = dayEvts.reduce((sum, ev) => {
				const s = Math.max(ev.start.getTime(), ms);
				const e = Math.min(ev.end.getTime(), dEnd);
				return sum + (e - s) / 60000;
			}, 0);
			const pastEvents: TimelineEvent[] = [];
			const currentEvents: TimelineEvent[] = [];
			const upcomingEvents: TimelineEvent[] = [];
			for (const ev of dayEvts) {
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
				dayName: tier === 'today' || tier === 'tomorrow' ? weekdayLong(ms) : weekdayShort(ms),
				dateLabel: `${monthShort(ms)} ${dayNum(ms)}`,
				tier,
				events: dayEvts,
				pastEvents,
				currentEvents,
				upcomingEvents,
				totalHours: Math.round((totalMinutes / 60) * 10) / 10,
			});
		}
		return out;
	});

	const weekTotal = $derived(weekDays.reduce((s, d) => s + d.events.length, 0));
	const weekHours = $derived(Math.round(weekDays.reduce((s, d) => s + d.totalHours, 0) * 10) / 10);
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
			<span class="ag-card-meta">
				{#if isNow}
					until {fmtTime(ev.end)}
				{:else}
					{fmtTime(ev.start)} – {fmtTime(ev.end)}
				{/if}
				<span class="ag-card-dur">{duration(ev)}</span>
			</span>
			{#if isNow}
				<div class="ag-card-progress">
					<div class="ag-card-progress-fill" style:width="{progress(ev) * 100}%"></div>
				</div>
			{/if}
		</div>
	</div>
{/snippet}

<div
	class="ag"
	class:ag--day={mode === 'day'}
	class:ag--week={mode === 'week'}
	style={style || undefined}
	style:height={mode === 'week' ? `${height}px` : undefined}
>
	<!-- ═══ Header ═══ -->
	<header class="ag-header">
		{#if mode === 'day'}
			<div class="ag-header-left">
				<span class="ag-title">{fmtDay(dayMs, clock.today, { short: false })}</span>
				{#if isToday}
					<span class="ag-clock">{clock.hm}</span>
				{:else if isPastDay}
					<span class="ag-badge ag-badge--past">past</span>
				{:else}
					<span class="ag-badge ag-badge--future">ahead</span>
				{/if}
			</div>
			<div class="ag-header-right">
				<span class="ag-stat">{allDayEvents.length} event{allDayEvents.length !== 1 ? 's' : ''}</span>
				{#if isToday}
					<div class="ag-progress-track">
						<div class="ag-progress-fill" style:width="{dayProgress * 100}%"></div>
					</div>
				{:else if dayHours > 0}
					<span class="ag-stat-sep">·</span>
					<span class="ag-stat">{dayHours}h</span>
				{/if}
			</div>
		{:else}
			<div class="ag-header-left">
				<span class="ag-title">This Week</span>
				<span class="ag-subtitle">{weekLabel}</span>
			</div>
			<div class="ag-header-right">
				<span class="ag-stat">{weekTotal} events</span>
				<span class="ag-stat-sep">·</span>
				<span class="ag-stat">{weekHours}h booked</span>
			</div>
		{/if}
	</header>

	<!-- ═══ Body ═══ -->
	<div class="ag-body" role="list" aria-label={mode === 'day' ? "Today's lineup" : 'Week ahead'}>
		{#if mode === 'day'}

			{#if isToday}
				<!-- ─── Today: "The Queue" — upcoming is the hero ─── -->
				<div class="ag-q">
					<!-- NOW: slim status strip -->
					<div class="ag-q-status">
						<div class="ag-q-label">Now</div>
						{#if dayCat.current.length > 0}
							{#each dayCat.current as ev (ev.id)}
								<div
									class="ag-q-now"
									class:ag-q-now--selected={selectedEventId === ev.id}
									style:--ev-color={ev.color || 'var(--dt-accent)'}
									role="button"
									tabindex="0"
									aria-label="{ev.title}, happening now, {Math.round(progress(ev) * 100)}% complete"
									onclick={() => handleClick(ev)}
									onkeydown={(e) => handleKeydown(e, ev)}
								>
									<div class="ag-q-now-dot"></div>
									<div class="ag-q-now-title">{ev.title}</div>
									<div class="ag-q-now-time">until {fmtTime(ev.end)}</div>
									<div class="ag-q-now-track">
										<div class="ag-q-now-fill" style:width="{progress(ev) * 100}%"></div>
									</div>
								</div>
							{/each}
						{:else}
							<div class="ag-q-free">
								<div class="ag-q-free-label">Free</div>
							</div>
						{/if}
					</div>

					<!-- NEXT: the hero center column -->
					<div class="ag-q-queue">
						<div class="ag-q-label">Up next</div>
						{#if upcomingNext.length === 0}
							<div class="ag-q-empty">
								{dayCat.past.length > 0 ? 'All done for today' : 'Nothing scheduled'}
							</div>
						{:else}
							{#each upcomingNext as ev, i (ev.id)}
								<div
									class="ag-q-card"
									class:ag-q-card--hero={i === 0}
									class:ag-q-card--selected={selectedEventId === ev.id}
									style:--ev-color={ev.color || 'var(--dt-accent)'}
									role="button"
									tabindex="0"
									aria-label="{ev.title}, {fmtTime(ev.start)}, {duration(ev)}"
									onclick={() => handleClick(ev)}
									onkeydown={(e) => handleKeydown(e, ev)}
								>
									<div class="ag-q-card-stripe"></div>
									<div class="ag-q-card-body">
										<div class="ag-q-card-top">
											<span class="ag-q-card-title">{ev.title}</span>
											<span class="ag-q-card-eta">{timeUntilEv(ev)}</span>
										</div>
										<div class="ag-q-card-meta">
											{fmtTime(ev.start)} – {fmtTime(ev.end)}
											<span class="ag-q-card-dur">{duration(ev)}</span>
										</div>
									</div>
								</div>
							{/each}
						{/if}
					</div>

					<!-- DONE: minimal right gutter -->
					<div class="ag-q-done">
						{#if dayCat.past.length > 0}
							<div class="ag-q-label">Done</div>
							{#each dayCat.past as ev (ev.id)}
								<div
									class="ag-q-done-item"
									class:ag-q-done-item--selected={selectedEventId === ev.id}
									role="button"
									tabindex="0"
									aria-label="{ev.title}, completed, {fmtTime(ev.start)}"
									onclick={() => handleClick(ev)}
									onkeydown={(e) => handleKeydown(e, ev)}
								>
									<span class="ag-q-done-check">✓</span>
									<span class="ag-q-done-title">{ev.title}</span>
								</div>
							{/each}
						{/if}
					</div>
				</div>

			{:else if isPastDay}
				<!-- ─── Past day: "The Log" — everything happened ─── -->
				<div class="ag-log">
					{#if allDayEvents.length === 0}
						<div class="ag-q-empty">Nothing was scheduled</div>
					{:else}
						{#each allDayEvents as ev (ev.id)}
							<div
								class="ag-log-row"
								class:ag-log-row--selected={selectedEventId === ev.id}
								style:--ev-color={ev.color || 'var(--dt-accent)'}
								role="button"
								tabindex="0"
								aria-label="{ev.title}, {fmtTime(ev.start)} to {fmtTime(ev.end)}"
								onclick={() => handleClick(ev)}
								onkeydown={(e) => handleKeydown(e, ev)}
							>
								<span class="ag-log-check">✓</span>
								<span class="ag-log-time">{fmtTime(ev.start)}</span>
								<span class="ag-log-dot" style:background={ev.color || 'var(--dt-accent)'}></span>
								<span class="ag-log-title">{ev.title}</span>
								<span class="ag-log-dur">{duration(ev)}</span>
							</div>
						{/each}
					{/if}
				</div>

			{:else}
				<!-- ─── Future day: "The Plan" — everything is ahead ─── -->
				<div class="ag-plan">
					{#if allDayEvents.length === 0}
						<div class="ag-q-empty">Nothing scheduled yet</div>
					{:else}
						{#each allDayEvents as ev, i (ev.id)}
							<div
								class="ag-plan-card"
								class:ag-plan-card--first={i === 0}
								class:ag-plan-card--selected={selectedEventId === ev.id}
								style:--ev-color={ev.color || 'var(--dt-accent)'}
								role="button"
								tabindex="0"
								aria-label="{ev.title}, {fmtTime(ev.start)} to {fmtTime(ev.end)}, {duration(ev)}"
								onclick={() => handleClick(ev)}
								onkeydown={(e) => handleKeydown(e, ev)}
							>
								<div class="ag-plan-stripe"></div>
								<div class="ag-plan-body">
									<div class="ag-plan-top">
										<span class="ag-plan-order">{i + 1}</span>
										<span class="ag-plan-title">{ev.title}</span>
									</div>
									<div class="ag-plan-meta">
										{fmtTime(ev.start)} – {fmtTime(ev.end)}
										<span class="ag-plan-dur">{duration(ev)}</span>
									</div>
								</div>
							</div>
						{/each}
					{/if}
				</div>
			{/if}

		{:else}
			<!-- ─── Week: rolling day groups ─── -->
			{#each weekDays as day (day.ms)}
				{@const expanded = day.tier === 'today' || day.tier === 'tomorrow'}
				<div
					class="ag-wday"
					class:ag-wday--today={day.tier === 'today'}
					class:ag-wday--tomorrow={day.tier === 'tomorrow'}
					class:ag-wday--past={day.tier === 'past'}
					role="listitem"
				>
					<!-- Day header -->
					<div class="ag-wday-head">
						<div class="ag-wday-head-left">
							{#if day.tier === 'today'}
								<span class="ag-wday-badge">Today</span>
							{:else if day.tier === 'tomorrow'}
								<span class="ag-wday-badge ag-wday-badge--muted">Tomorrow</span>
							{/if}
							<span class="ag-wday-name">{day.dayName}</span>
							<span class="ag-wday-date">{day.dateLabel}</span>
						</div>
						{#if day.events.length > 0}
							<span class="ag-wday-count">{day.events.length}</span>
						{/if}
					</div>

					{#if day.events.length === 0}
						<div class="ag-wday-empty">No events</div>
					{:else if expanded}
						<!-- Expanded: today/tomorrow get full slot treatment -->
						<div class="ag-wday-expanded">
							{#if day.currentEvents.length > 0}
								{#each day.currentEvents as ev (ev.id)}
									<div class="ag-wslot">
										<div class="ag-wslot-header">
											<span class="ag-wslot-now">now</span>
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
								<div class="ag-wday-past-line">✓ {day.pastEvents.length} completed</div>
							{/if}
						</div>
					{:else}
						<!-- Compact: future/past days get minimal rows -->
						<div class="ag-wday-compact">
							{#each day.events.slice(0, 3) as ev (ev.id)}
								<div
									class="ag-compact"
									class:ag-compact--past={ev.end.getTime() < clock.tick}
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
									<span class="ag-compact-dur">{duration(ev)}</span>
								</div>
							{/each}
							{#if day.events.length > 3}
								<div class="ag-compact-more">+{day.events.length - 3} more</div>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	/* ═══ Container ═══ */
	.ag {
		position: relative;
		background: var(--dt-bg, #111);
		border: 1px solid var(--dt-border, rgba(255, 255, 255, 0.06));
		border-radius: 10px;
		overflow: hidden;
		user-select: none;
		display: flex;
		flex-direction: column;
		color: var(--dt-text, rgba(255, 255, 255, 0.92));
		font-family: var(--dt-sans, system-ui, sans-serif);
	}

	/* ═══ Header ═══ */
	.ag-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 14px 20px 10px;
		border-bottom: 1px solid var(--dt-border, rgba(255, 255, 255, 0.06));
		flex-shrink: 0;
	}
	.ag-header-left {
		display: flex;
		align-items: baseline;
		gap: 10px;
	}
	.ag-title {
		font-size: 14px;
		font-weight: 600;
		line-height: 1;
	}
	.ag-subtitle {
		font-size: 12px;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-text-2, rgba(255, 255, 255, 0.5));
	}
	.ag-clock {
		font-size: 13px;
		font-weight: 600;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-accent, #ff6b4a);
	}
	.ag-header-right {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.ag-stat {
		font-size: 11px;
		color: var(--dt-text-3, rgba(255, 255, 255, 0.3));
		font-family: var(--dt-mono, monospace);
	}
	.ag-stat-sep {
		font-size: 11px;
		color: var(--dt-text-3, rgba(255, 255, 255, 0.3));
	}
	.ag-progress-track {
		width: 52px;
		height: 3px;
		background: var(--dt-border, rgba(255, 255, 255, 0.06));
		border-radius: 2px;
		overflow: hidden;
	}
	.ag-progress-fill {
		height: 100%;
		background: var(--dt-accent, #ff6b4a);
		border-radius: 2px;
		opacity: 0.5;
		transition: width 1s linear;
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

	/* ═══ Shared: event card ═══ */
	.ag-card {
		display: flex;
		align-items: stretch;
		border-radius: 8px;
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

	.ag-empty {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40px 20px;
		font-size: 13px;
		color: var(--dt-text-3, rgba(255, 255, 255, 0.3));
	}

	/* ═══════════════════════════════════════════════════
	   DAY MODE: "The Queue" — upcoming events are the hero
	   ═══════════════════════════════════════════════════ */

	/* 3-column grid: slim NOW | hero NEXT | minimal PAST */
	.ag-q {
		display: grid;
		grid-template-columns: 0.65fr 1.8fr 0.55fr;
		gap: 0;
		flex: 1;
		padding: 8px 0 10px;
		min-height: 0;
	}

	/* Shared column label */
	.ag-q-label {
		font-size: 8px;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--dt-text-3, rgba(255, 255, 255, 0.25));
		margin-bottom: 8px;
		padding: 0 12px;
		font-family: var(--dt-sans, system-ui, sans-serif);
	}

	.ag-q-empty {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		font-size: 13px;
		font-weight: 300;
		color: var(--dt-text-3, rgba(255, 255, 255, 0.25));
	}

	/* ── NOW: slim status strip (left) ── */
	.ag-q-status {
		padding: 0 0 0 14px;
		border-right: 1px solid var(--dt-border, rgba(255, 255, 255, 0.06));
		display: flex;
		flex-direction: column;
	}

	.ag-q-now {
		padding: 8px 10px;
		border-radius: 8px;
		background: var(--dt-surface, #191919);
		border: 1px solid color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, transparent);
		cursor: pointer;
		transition: border-color 150ms;
		margin-right: 10px;
	}
	.ag-q-now:hover {
		border-color: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 35%, transparent);
	}
	.ag-q-now:focus-visible {
		outline: 2px solid var(--dt-accent, #ff6b4a);
		outline-offset: 2px;
	}
	.ag-q-now--selected {
		border-color: var(--ev-color, var(--dt-accent));
	}

	.ag-q-now-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--ev-color, var(--dt-accent, #ff6b4a));
		margin-bottom: 6px;
		animation: ag-pulse 2.5s ease-in-out infinite;
	}
	@keyframes ag-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}

	.ag-q-now-title {
		font-size: 11px;
		font-weight: 600;
		line-height: 1.2;
		color: var(--dt-text, rgba(255, 255, 255, 0.92));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 3px;
	}
	.ag-q-now-time {
		font-size: 9px;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-text-3, rgba(255, 255, 255, 0.35));
		margin-bottom: 6px;
	}
	.ag-q-now-track {
		height: 2px;
		background: var(--dt-border, rgba(255, 255, 255, 0.06));
		border-radius: 1px;
		overflow: hidden;
	}
	.ag-q-now-fill {
		height: 100%;
		background: var(--ev-color, var(--dt-accent, #ff6b4a));
		border-radius: 1px;
		transition: width 1s linear;
	}

	/* Free state */
	.ag-q-free {
		padding: 8px 10px;
		margin-right: 10px;
	}
	.ag-q-free-label {
		font-size: 12px;
		font-weight: 300;
		color: var(--dt-text-3, rgba(255, 255, 255, 0.25));
		margin-bottom: 2px;
	}
	.ag-q-free-next {
		font-size: 10px;
		font-weight: 500;
		line-height: 1.2;
		color: var(--dt-text-2, rgba(255, 255, 255, 0.5));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 2px;
	}
	.ag-q-free-until {
		font-size: 9px;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-accent, #ff6b4a);
		opacity: 0.6;
	}

	/* ── NEXT: hero center column ── */
	.ag-q-queue {
		padding: 0 16px;
		overflow-y: auto;
		scrollbar-width: none;
		display: flex;
		flex-direction: column;
	}
	.ag-q-queue::-webkit-scrollbar {
		display: none;
	}

	/* Event card — the star of the show */
	.ag-q-card {
		display: flex;
		align-items: stretch;
		border-radius: 10px;
		background: var(--dt-surface, #191919);
		border: 1px solid var(--dt-border, rgba(255, 255, 255, 0.06));
		overflow: hidden;
		cursor: pointer;
		margin-bottom: 6px;
		transition: border-color 150ms, transform 100ms;
	}
	.ag-q-card:hover {
		border-color: color-mix(in srgb, var(--ev-color) 40%, transparent);
	}
	.ag-q-card:focus-visible {
		outline: 2px solid var(--dt-accent, #ff6b4a);
		outline-offset: 2px;
	}
	.ag-q-card--selected {
		border-color: var(--ev-color);
		background: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, #191919));
	}

	/* Hero card — first in queue, the imminent event */
	.ag-q-card--hero {
		background: color-mix(in srgb, var(--ev-color) 8%, var(--dt-surface, #191919));
		border-color: color-mix(in srgb, var(--ev-color) 25%, transparent);
	}
	.ag-q-card--hero .ag-q-card-title {
		font-size: 16px;
		font-weight: 700;
	}
	.ag-q-card--hero .ag-q-card-eta {
		font-size: 11px;
		background: color-mix(in srgb, var(--dt-accent, #ff6b4a) 18%, transparent);
		padding: 2px 7px;
		border-radius: 4px;
	}
	.ag-q-card--hero .ag-q-card-body {
		padding: 14px 16px;
	}

	.ag-q-card-stripe {
		width: 3.5px;
		background: var(--ev-color, var(--dt-accent));
		flex-shrink: 0;
	}
	.ag-q-card-body {
		padding: 10px 12px;
		display: flex;
		flex-direction: column;
		gap: 3px;
		min-width: 0;
		flex: 1;
	}
	.ag-q-card-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 8px;
	}
	.ag-q-card-title {
		font-size: 13px;
		font-weight: 600;
		line-height: 1.2;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex: 1;
	}
	.ag-q-card-eta {
		font-size: 9px;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: var(--dt-accent, #ff6b4a);
		flex-shrink: 0;
		white-space: nowrap;
	}
	.ag-q-card-meta {
		font-size: 11px;
		color: var(--dt-text-2, rgba(255, 255, 255, 0.5));
		font-family: var(--dt-mono, monospace);
		line-height: 1;
	}
	.ag-q-card-dur {
		margin-left: 6px;
		color: var(--dt-text-3, rgba(255, 255, 255, 0.3));
	}

	/* ── PAST: minimal right gutter ── */
	.ag-q-done {
		padding: 0 14px 0 0;
		border-left: 1px solid var(--dt-border, rgba(255, 255, 255, 0.06));
		overflow-y: auto;
		scrollbar-width: none;
		padding-left: 10px;
	}
	.ag-q-done::-webkit-scrollbar {
		display: none;
	}

	.ag-q-done-item {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 3px 0;
		opacity: 0.35;
		cursor: pointer;
	}
	.ag-q-done-item:hover {
		opacity: 0.6;
	}
	.ag-q-done-item:focus-visible {
		outline: 2px solid var(--dt-accent, #ff6b4a);
		outline-offset: 2px;
		opacity: 0.6;
	}
	.ag-q-done-item--selected {
		opacity: 0.7;
	}
	.ag-q-done-check {
		font-size: 9px;
		color: var(--dt-success, rgba(120, 200, 140, 0.7));
		flex-shrink: 0;
	}
	.ag-q-done-title {
		font-size: 10px;
		line-height: 1.2;
		color: var(--dt-text-3, rgba(255, 255, 255, 0.35));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-decoration: line-through;
		text-decoration-color: var(--dt-text-3, rgba(255, 255, 255, 0.15));
	}

	/* ═══════════════════════════════════════════════════
	   PAST DAY: "The Log" — quiet chronological record
	   ═══════════════════════════════════════════════════ */
	.ag-log {
		flex: 1;
		padding: 8px 20px 12px;
		overflow-y: auto;
		scrollbar-width: none;
		opacity: 0.7;
	}
	.ag-log::-webkit-scrollbar {
		display: none;
	}

	.ag-log-row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 0;
		border-bottom: 1px solid var(--dt-border, rgba(255, 255, 255, 0.04));
		cursor: pointer;
		transition: opacity 150ms;
	}
	.ag-log-row:last-child {
		border-bottom: none;
	}
	.ag-log-row:hover {
		opacity: 1;
	}
	.ag-log-row:focus-visible {
		outline: 2px solid var(--dt-accent, #ff6b4a);
		outline-offset: 2px;
	}
	.ag-log-row--selected {
		opacity: 1;
		background: color-mix(in srgb, var(--ev-color) 6%, transparent);
		border-radius: 6px;
		padding-left: 8px;
		padding-right: 8px;
	}

	.ag-log-check {
		font-size: 10px;
		color: var(--dt-success, rgba(120, 200, 140, 0.5));
		flex-shrink: 0;
	}
	.ag-log-time {
		font-size: 11px;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-text-3, rgba(255, 255, 255, 0.3));
		width: 64px;
		flex-shrink: 0;
	}
	.ag-log-dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		flex-shrink: 0;
		opacity: 0.6;
	}
	.ag-log-title {
		font-size: 13px;
		font-weight: 500;
		line-height: 1.2;
		color: var(--dt-text-2, rgba(255, 255, 255, 0.55));
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-decoration: line-through;
		text-decoration-color: var(--dt-border, rgba(255, 255, 255, 0.08));
	}
	.ag-log-dur {
		font-size: 10px;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-text-3, rgba(255, 255, 255, 0.2));
		flex-shrink: 0;
	}

	/* ═══════════════════════════════════════════════════
	   FUTURE DAY: "The Plan" — clean schedule list
	   ═══════════════════════════════════════════════════ */
	.ag-plan {
		flex: 1;
		padding: 8px 20px 12px;
		overflow-y: auto;
		scrollbar-width: none;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.ag-plan::-webkit-scrollbar {
		display: none;
	}

	.ag-plan-card {
		display: flex;
		align-items: stretch;
		border-radius: 10px;
		background: var(--dt-surface, #191919);
		border: 1px solid var(--dt-border, rgba(255, 255, 255, 0.06));
		overflow: hidden;
		cursor: pointer;
		transition: border-color 150ms;
	}
	.ag-plan-card:hover {
		border-color: color-mix(in srgb, var(--ev-color) 35%, transparent);
	}
	.ag-plan-card:focus-visible {
		outline: 2px solid var(--dt-accent, #ff6b4a);
		outline-offset: 2px;
	}
	.ag-plan-card--selected {
		border-color: var(--ev-color);
		background: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, #191919));
	}
	.ag-plan-card--first {
		background: color-mix(in srgb, var(--ev-color) 5%, var(--dt-surface, #191919));
		border-color: color-mix(in srgb, var(--ev-color) 15%, transparent);
	}

	.ag-plan-stripe {
		width: 3.5px;
		background: var(--ev-color, var(--dt-accent));
		flex-shrink: 0;
	}
	.ag-plan-body {
		padding: 12px 14px;
		display: flex;
		flex-direction: column;
		gap: 3px;
		min-width: 0;
		flex: 1;
	}
	.ag-plan-top {
		display: flex;
		align-items: baseline;
		gap: 8px;
	}
	.ag-plan-order {
		font-size: 10px;
		font-weight: 700;
		color: var(--dt-text-3, rgba(255, 255, 255, 0.2));
		font-family: var(--dt-mono, monospace);
		flex-shrink: 0;
	}
	.ag-plan-title {
		font-size: 14px;
		font-weight: 600;
		line-height: 1.2;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.ag-plan-card--first .ag-plan-title {
		font-size: 16px;
		font-weight: 700;
	}
	.ag-plan-meta {
		font-size: 11px;
		color: var(--dt-text-2, rgba(255, 255, 255, 0.5));
		font-family: var(--dt-mono, monospace);
		line-height: 1;
	}
	.ag-plan-dur {
		margin-left: 6px;
		color: var(--dt-text-3, rgba(255, 255, 255, 0.3));
	}

	/* Header badges for past/future days */
	.ag-badge {
		font-size: 9px;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 2px 6px;
		border-radius: 3px;
	}
	.ag-badge--past {
		color: var(--dt-text-3, rgba(255, 255, 255, 0.3));
		background: var(--dt-border, rgba(255, 255, 255, 0.06));
	}
	.ag-badge--future {
		color: var(--dt-accent, #ff6b4a);
		background: color-mix(in srgb, var(--dt-accent, #ff6b4a) 12%, transparent);
	}

	/* ═══════════════════════════════════════════════════
	   WEEK MODE: Rolling day groups
	   ═══════════════════════════════════════════════════ */
	.ag-wday {
		border-bottom: 1px solid var(--dt-border, rgba(255, 255, 255, 0.06));
	}
	.ag-wday--today {
		background: color-mix(in srgb, var(--dt-accent, #ff6b4a) 4%, transparent);
	}
	.ag-wday--past {
		opacity: 0.4;
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
	.ag-wday-count {
		font-size: 11px;
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
	.ag-compact--past {
		opacity: 0.4;
	}
	.ag-compact--past .ag-compact-title {
		text-decoration: line-through;
		text-decoration-color: var(--dt-text-3);
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
	.ag-compact-more {
		font-size: 11px;
		color: var(--dt-text-3);
		padding: 2px 0 0 13px;
	}
</style>
