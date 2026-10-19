<script lang="ts">/**
* AgendaDay — single-day agenda view.
*
* Today ("The Queue"):
*   3-column layout: Done | Now | Up next (hero).
*   Answers: "What's coming up next?"
*
* Past day ("The Log"):
*   Quiet chronological record of completed events.
*
* Future day ("The Plan"):
*   Clean numbered schedule list.
*/
import { createClock } from "../../core/clock.svelte.js";
import { sod, addDaysMs, isAllDay } from "../../core/time.js";
import { weekdayLong, monthLong, fmtDayNum } from "../../core/locale.js";
import { useCalendarContext } from "../shared/context.svelte.js";
import EventContent from "../shared/EventContent.svelte";
import { fmtTime, duration, timeUntilMs, progress, groupIntoSlots } from "../shared/format.js";
import { createSwipe } from "../mobile/swipe.js";
const ctx = useCalendarContext();
const L = $derived(ctx.labels);
const emptySnippet = $derived(ctx.emptySnippet);
let { locale, height, events = [], style = "", focusDate, oneventclick, selectedEventId = null } = $props();
const clock = createClock(ctx.timezone);
const viewState = $derived(ctx.viewState);
const equalDays = $derived(ctx.equalDays);
const showDates = $derived(ctx.showDates);
// Calendar's chrome date label renders exactly when showDates is on and
// already names this day — drop the in-view header so the date never
// appears twice. Chromeless (showDates=false) hosts keep it as the only
// label for swipe navigation.
const hideDayHead = $derived(showDates && !!viewState);
const isMobile = $derived(ctx.isMobile);
const autoHeight = $derived(ctx.autoHeight);
const compact = $derived(ctx.compact);
const oneventhover = $derived(ctx.oneventhover);
const disabledSet = $derived(ctx.disabledSet);
// ── Swipe navigation (mobile, touch only) ──────────
// Touch events, not pointer events: once the browser claims a touch for
// panning it sends pointercancel and the pointerup never arrives.
const swipe = createSwipe({
	disabled: () => !isMobile,
	onmove: () => {},
	onend: (dir) => {
		if (dir > 0) viewState?.prev();
		else if (dir < 0) viewState?.next();
	}
});
// ── Status suffix (aria) ────────────────────────────
function statusText(ev) {
	if (ev.status === "cancelled") return ` (${L.cancelled})`;
	if (ev.status === "tentative") return ` (${L.tentative})`;
	if (ev.status === "full") return ` (${L.full})`;
	if (ev.status === "limited") return ` (${L.limited})`;
	return "";
}
/** All-day events and timed ones at least a (wall-clock) day long go to
*  the all-day strip; a shorter overnight event is listed with its time. */
function inAllDayStrip(ev) {
	return isAllDay(ev) || ev.end.getTime() >= addDaysMs(ev.start.getTime(), 1);
}
// ── Format helpers (delegated to shared/format.ts) ──
const fmt = (d) => fmtTime(d, locale);
const eta = (ms) => timeUntilMs(ms, clock.tick, L);
const prog = (ev) => progress(ev, clock.tick);
// ── Event handlers ──────────────────────────────────
function handleClick(ev) {
	oneventclick?.(ev);
}
// ── Day derivations ─────────────────────────────────
const dayMs = $derived(focusDate ? sod(focusDate.getTime()) : clock.today);
const dayEnd = $derived(addDaysMs(dayMs, 1));
const isToday = $derived(dayMs === clock.today);
const isTomorrow = $derived(dayMs === addDaysMs(clock.today, 1));
const isPastDay = $derived(equalDays ? false : dayMs < clock.today);
/** All events for this day, sorted chronologically */
const dayEvents = $derived.by(() => {
	return events.filter((ev) => ev.start.getTime() < dayEnd && ev.end.getTime() > dayMs).sort((a, b) => a.start.getTime() - b.start.getTime());
});
/** All-day / multi-day events shown in a separate strip */
const allDayBanner = $derived(dayEvents.filter(inAllDayStrip));
/** Timed events (non-all-day) for normal slot rendering */
const timedDayEvents = $derived(dayEvents.filter((ev) => !inAllDayStrip(ev)));
const dayCat = $derived.by(() => {
	const now = clock.tick;
	const past = [];
	const current = [];
	const upcoming = [];
	for (const ev of timedDayEvents) {
		const s = ev.start.getTime();
		const e = ev.end.getTime();
		if (e <= now) past.push(ev);
		else if (s <= now && e > now) current.push(ev);
		else upcoming.push(ev);
	}
	return {
		past,
		current,
		upcomingSlots: groupIntoSlots(upcoming),
		totalUp: upcoming.length
	};
});
/** Flat list of ALL upcoming events for the "Up next" column. The first
*  few get card treatment; the rest render as compact rows — busy days
*  (a city-wide feed) would otherwise drown the queue. */
const upcomingNext = $derived.by(() => {
	const all = [];
	for (const slot of dayCat.upcomingSlots) {
		for (const ev of slot.events) all.push(ev);
	}
	return all;
});
const UPCOMING_CARDS = 4;
/** Done list collapses past this many items (most recent stay visible). */
const DONE_VISIBLE = 3;
let showAllDone = $state(false);
const visibleDone = $derived(showAllDone ? dayCat.past : dayCat.past.slice(-DONE_VISIBLE));
const hiddenDoneCount = $derived(showAllDone ? 0 : Math.max(0, dayCat.past.length - DONE_VISIBLE));
</script>

<!-- svelte-ignore a11y_no_static_element_interactions (touch swipe only; no pointer/keyboard role) -->
<div
	class="ag ag--day"
	class:ag--disabled={disabledSet.has(dayMs)}
	class:ag--mobile={isMobile}
	class:ag--auto={autoHeight}
	style={style || undefined}
	style:height={height ? `${height}px` : undefined}
	ontouchstart={swipe.ontouchstart}
	ontouchmove={swipe.ontouchmove}
	ontouchend={swipe.ontouchend}
	ontouchcancel={swipe.ontouchcancel}
>
	<div class="ag-body" role="group" aria-label={L.todaysLineup}>
		<!-- ─── In-view date header (only when the chrome doesn't label the day) ─── -->
		{#if !hideDayHead}
		<div class="ag-day-head" class:ag-day-head--today={!equalDays && isToday}>
			<span class="ag-day-head-num">{fmtDayNum(dayMs, locale)}</span>
			{#if !equalDays && isToday}
				<span class="ag-day-head-badge">{L.today}</span>
			{:else if !equalDays && isTomorrow}
				<span class="ag-day-head-badge ag-day-head-badge--muted">{L.tomorrow}</span>
			{/if}
			<span class="ag-day-head-name">{weekdayLong(dayMs, locale)}</span>
			<span class="ag-day-head-date">{monthLong(dayMs, locale)}</span>
		</div>
		{/if}
		{#if allDayBanner.length > 0}
			<!-- ─── All-day / multi-day events ─── -->
			<div class="ag-allday">
				<div class="ag-allday-label">{L.allDay}</div>
				<div class="ag-allday-items">
					{#each allDayBanner as ev (ev.id)}
						<button
							type="button"
							class="ag-allday-chip"
							class:ag-allday-chip--selected={selectedEventId === ev.id}
							style:--ev-color={ev.color || 'var(--dt-accent)'}
							aria-label="{ev.title}{statusText(ev)}, {L.allDay}"
							onclick={() => handleClick(ev)}
							onpointerenter={() => oneventhover?.(ev)}
						>
							<span class="ag-allday-dot"></span>
							<span class="ag-allday-title">{ev.title}</span>
						</button>
					{/each}
				</div>
			</div>
		{/if}

		{#if compact}
			<!-- ─── Compact: minimal text rows ─── -->
			<div class="ag-compact-list">
				{#if timedDayEvents.length === 0 && allDayBanner.length === 0}
					<div class="ag-q-empty">
						{#if emptySnippet}{@render emptySnippet()}{:else}{L.nothingScheduledYet}{/if}
					</div>
				{:else}
					{#each timedDayEvents as ev (ev.id)}
						<button
							type="button"
							class="ag-compact-row"
							class:ag-compact-row--selected={selectedEventId === ev.id}
							class:ag-compact-row--cancelled={ev.status === 'cancelled'}
							class:ag-compact-row--tentative={ev.status === 'tentative'}
							style:--ev-color={ev.color || 'var(--dt-event, var(--dt-accent))'}
							aria-label="{ev.title}{statusText(ev)}, {fmt(ev.start)}, {duration(ev)}"
							onclick={() => handleClick(ev)}
							onpointerenter={() => oneventhover?.(ev)}
						>
							<EventContent event={ev}>
							<span class="ag-compact-row-time">{fmt(ev.start)}</span>
							<div class="ag-compact-row-main">
								<span class="ag-compact-row-title">{ev.title}</span>
								{#if ev.subtitle}
									<span class="ag-compact-row-sub">{ev.subtitle}</span>
								{/if}
								{#if ev.tags?.length}
									{#each ev.tags as tag}
										<span class="ag-compact-row-tag">{tag}</span>
									{/each}
								{/if}
							</div>
							<span class="ag-compact-row-dur">{duration(ev)}</span>
							</EventContent>
						</button>
					{/each}
				{/if}
			</div>

		{:else if isToday}
			<!-- ─── Today: "The Queue" — upcoming is the hero ─── -->
			<div class="ag-q">
				<!-- NOW column: the live strip first, completed collapsed below -->
				<div class="ag-q-status">
					<div class="ag-q-label">{L.now} <span class="ag-q-clock">{clock.hm}</span></div>
					{#if dayCat.current.length > 0}
						{#each dayCat.current as ev (ev.id)}
							<button
								type="button"
								class="ag-q-now"
								class:ag-q-now--selected={selectedEventId === ev.id}
								style:--ev-color={ev.color || 'var(--dt-event, var(--dt-accent))'}
								aria-label="{ev.title}, {L.happeningNow}, {L.percentComplete(Math.round(prog(ev) * 100))}"
								onclick={() => handleClick(ev)}
								onpointerenter={() => oneventhover?.(ev)}
							>
								<div class="ag-q-now-dot"></div>
								<div class="ag-q-now-title">{ev.title}</div>
								{#if ev.subtitle}<div class="ag-q-now-sub">{ev.subtitle}</div>{/if}
								<div class="ag-q-now-time">{L.until} {fmt(ev.end)}</div>
								<div class="ag-q-now-track">
									<div class="ag-q-now-fill" style:transform="scaleX({prog(ev)})"></div>
								</div>
							</button>
						{/each}
					{:else}
						<div class="ag-q-free">
							<div class="ag-q-free-label">{L.free}</div>
						</div>
					{/if}

					{#if dayCat.past.length > 0}
						<div class="ag-q-done-section">
							<div class="ag-q-label">{L.done}</div>
							{#each visibleDone as ev (ev.id)}
								<button
									type="button"
									class="ag-q-done-item"
									class:ag-q-done-item--selected={selectedEventId === ev.id}
									aria-label="{ev.title}, {L.completed}, {fmt(ev.start)}"
									onclick={() => handleClick(ev)}
								>
									<span class="ag-q-done-check" aria-hidden="true">✓</span>
									<span class="ag-q-done-title">{ev.title}</span>
								</button>
							{/each}
							{#if hiddenDoneCount > 0}
								<button type="button" class="ag-q-done-toggle" onclick={() => (showAllDone = !showAllDone)}>
									{showAllDone ? L.showLess : L.nCompleted(hiddenDoneCount)}
								</button>
							{/if}
						</div>
					{/if}
				</div>

				<!-- NEXT: the hero center column -->
				<div class="ag-q-queue">
					<div class="ag-q-label">{L.upNext}</div>
					{#if upcomingNext.length === 0}
						<div class="ag-q-empty">
							{#if emptySnippet}{@render emptySnippet()}{:else}{dayCat.past.length > 0 ? L.allDoneForToday : L.nothingScheduled}{/if}
						</div>
					{:else}
						{#each upcomingNext as ev, i (ev.id)}
							{#if i >= UPCOMING_CARDS}
								<button
									type="button"
									class="ag-compact-row ag-compact-row--queue"
									class:ag-compact-row--selected={selectedEventId === ev.id}
									style:--ev-color={ev.color || 'var(--dt-event, var(--dt-accent))'}
									aria-label="{ev.title}{statusText(ev)}, {fmt(ev.start)}, {duration(ev)}"
									onclick={() => handleClick(ev)}
									onpointerenter={() => oneventhover?.(ev)}
								>
									<EventContent event={ev}>
									<span class="ag-compact-row-time">{fmt(ev.start)}</span>
									<div class="ag-compact-row-main">
										<span class="ag-compact-row-title">{ev.title}</span>
										{#if ev.subtitle}
											<span class="ag-compact-row-sub">{ev.subtitle}</span>
										{/if}
									</div>
									</EventContent>
								</button>
							{:else}
							<button
								type="button"
								class="ag-card ag-card--q"
								class:ag-card--hero={i === 0}
								class:ag-card--selected={selectedEventId === ev.id}
								style:--ev-color={ev.color || 'var(--dt-event, var(--dt-accent))'}
								aria-label="{ev.title}{statusText(ev)}, {fmt(ev.start)}, {duration(ev)}"
								onclick={() => handleClick(ev)}
								onpointerenter={() => oneventhover?.(ev)}
							>
								<div class="ag-card-body">
									<EventContent event={ev}>
									<div class="ag-card-top">
										<span class="ag-card-title">{ev.title}</span>
										<span class="ag-card-eta">{eta(ev.start.getTime())}</span>
									</div>
									<div class="ag-card-meta">
										{fmt(ev.start)} – {fmt(ev.end)}
										<span class="ag-card-dur">{duration(ev)}</span>
									</div>
									{#if ev.subtitle}
										<span class="ag-card-sub">{ev.subtitle}</span>
									{/if}
									{#if ev.tags?.length}
										<div class="ag-card-tags">
											{#each ev.tags as tag}
												<span class="ag-card-tag">{tag}</span>
											{/each}
										</div>
									{/if}
									</EventContent>
								</div>
							</button>
							{/if}
						{/each}
					{/if}
				</div>
			</div>

		{:else if isPastDay}
			<!-- ─── Past day: "The Log" — everything happened ─── -->
			<div class="ag-log">
				{#if timedDayEvents.length === 0 && allDayBanner.length === 0}
					<div class="ag-q-empty">
						{#if emptySnippet}{@render emptySnippet()}{:else}{L.nothingWasScheduled}{/if}
					</div>
				{:else}
					{#each timedDayEvents as ev (ev.id)}
						<button
							type="button"
							class="ag-log-row"
							class:ag-log-row--selected={selectedEventId === ev.id}
							class:ag-log-row--cancelled={ev.status === 'cancelled'}
							style:--ev-color={ev.color || 'var(--dt-event, var(--dt-accent))'}
							aria-label="{ev.title}{statusText(ev)}, {fmt(ev.start)} – {fmt(ev.end)}"
							onclick={() => handleClick(ev)}
							onpointerenter={() => oneventhover?.(ev)}
						>
							<span class="ag-log-check" aria-hidden="true">✓</span>
							<span class="ag-log-time">{fmt(ev.start)}</span>
							<span class="ag-log-dot" style:background={ev.color || 'var(--dt-event, var(--dt-accent))'}></span>
							<span class="ag-log-title">{ev.title}</span>
							<span class="ag-log-dur">{duration(ev)}</span>
						</button>
					{/each}
				{/if}
			</div>

		{:else}
			<!-- ─── Future day: "The Plan" — everything is ahead ─── -->
			<div class="ag-plan">
				{#if timedDayEvents.length === 0 && allDayBanner.length === 0}
					<div class="ag-q-empty">
						{#if emptySnippet}{@render emptySnippet()}{:else}{L.nothingScheduledYet}{/if}
					</div>
				{:else}
					{#each timedDayEvents as ev, i (ev.id)}
						<button
							type="button"
							class="ag-card ag-card--plan"
							class:ag-card--first={i === 0}
							class:ag-card--selected={selectedEventId === ev.id}
							class:ag-card--cancelled={ev.status === 'cancelled'}
							class:ag-card--tentative={ev.status === 'tentative'}
							class:ag-card--full={ev.status === 'full'}
							class:ag-card--limited={ev.status === 'limited'}
							style:--ev-color={ev.color || 'var(--dt-event, var(--dt-accent))'}
							aria-label="{ev.title}{statusText(ev)}, {fmt(ev.start)} – {fmt(ev.end)}, {duration(ev)}"
							onclick={() => handleClick(ev)}
							onpointerenter={() => oneventhover?.(ev)}
						>
							<div class="ag-card-body">
								<EventContent event={ev}>
								<div class="ag-card-top">
									<span class="ag-card-order">{i + 1}</span>
									<span class="ag-card-title">{ev.title}</span>
								</div>
								<div class="ag-card-meta">
									{fmt(ev.start)} – {fmt(ev.end)}
									<span class="ag-card-dur">{duration(ev)}</span>
								</div>
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
							</div>
						</button>
					{/each}
				{/if}
			</div>
		{/if}
	</div>

</div>

<style>
	/* ═══ Container ═══ */
	.ag {
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		min-width: 0;
		box-sizing: border-box;
		color: var(--dt-text, rgba(15, 15, 15, 0.87));
		font-family: var(--dt-sans, system-ui, sans-serif);
	}

	.ag--auto { height: auto; overflow: visible; }

	/* Button UA reset for interactive cards/rows (real <button>s for a11y).
	   Placed first so later component rules override it.
	   user-select is scoped here (not on .ag) so event text stays copyable. */
	.ag-card,
	.ag-allday-chip,
	.ag-compact-row,
	.ag-q-now,
	.ag-q-done-item,
	.ag-log-row,
	.ag-q-done-toggle {
		font: inherit;
		color: inherit;
		text-align: left;
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		user-select: none;
	}

	.ag--disabled {
		background-image: repeating-linear-gradient(
			135deg,
			transparent,
			transparent 6px,
			color-mix(in srgb, var(--dt-text, rgba(15, 15, 15, 0.87)) 4%, transparent) 6px,
			color-mix(in srgb, var(--dt-text, rgba(15, 15, 15, 0.87)) 4%, transparent) 12px
		);
	}

	/* ═══ Body ═══ */
	.ag-body {
		flex: 1;
		min-height: 0;
		min-width: 0;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		overflow-x: hidden;
		overscroll-behavior: contain;
		padding-top: 8px;
		scrollbar-width: thin;
		scrollbar-color: var(--dt-border) transparent;
	}

	/* ═══ In-view date header ═══ */
	.ag-day-head {
		display: flex;
		align-items: baseline;
		gap: 8px;
		padding: 0 16px 6px;
		flex-shrink: 0;
	}
	/* The planner's header type: the day number is the typography (40/400,
	   narrowed), the weekday a tracked 12/500 label; today takes the accent. */
	.ag-day-head-num {
		font: 400 40px/1 var(--dt-sans, system-ui, sans-serif);
		font-stretch: 90%;
		letter-spacing: -0.02em;
		font-variant-numeric: tabular-nums;
		color: var(--dt-text, rgba(15, 15, 15, 0.87));
		margin-inline-end: 4px;
	}
	.ag-day-head-badge,
	.ag-day-head-name {
		font: 500 12px/1 var(--dt-sans, system-ui, sans-serif);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
	}
	.ag-day-head--today .ag-day-head-num,
	.ag-day-head--today .ag-day-head-name,
	.ag-day-head-badge {
		color: var(--dt-accent, #1d4fd7);
	}
	.ag-day-head .ag-day-head-badge--muted {
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
	}
	.ag-day-head-date {
		font: 400 12.5px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
	}
	.ag--auto .ag-body { overflow-y: visible; min-height: auto; }
	.ag-body::-webkit-scrollbar {
		width: 4px;
	}
	.ag-body::-webkit-scrollbar-thumb {
		background: var(--dt-border);
		border-radius: 0;
	}

	/* ═══ All-day strip ═══ */
	.ag-allday {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 16px;
		border-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));
	}
	.ag-allday-label {
		font: 500 12px/1 var(--dt-sans, system-ui, sans-serif);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
		white-space: nowrap;
		flex-shrink: 0;
	}
	.ag-allday-items {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	/* An all-day event is a solid band in its colour — no tint, no dot, no pill. */
	.ag-allday-chip {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 4px 10px;
		border-radius: 0;
		border: none;
		background: var(--ev-color);
		color: var(--dt-btn-text, #fff);
		cursor: pointer;
	}
	@media (pointer: coarse) {
		.ag-allday-chip {
			min-height: 44px;
		}
		.ag-q-done-item {
			min-height: 44px;
			align-items: center;
		}
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

	/* ═══ Shared: event card ═══ */
	/* Paper, not a tinted card: a 3px start bar in the event colour, a
	   hairline rule beneath, ink text. Hover is a wash, selection a ring. */
	.ag-card {
		position: relative;
		display: flex;
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
		padding: 10px 12px 10px 15px;
		display: flex;
		flex-direction: column;
		gap: 3px;
		min-width: 0;
		max-width: 44rem;
		flex: 1;
	}
	.ag-card-top {
		display: flex;
		align-items: baseline;
		gap: 12px;
		min-width: 0;
	}
	.ag-card-title {
		font: 500 15px/1.25 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(15, 15, 15, 0.87));
		word-break: break-word;
		min-width: 0;
	}
	.ag-card-meta {
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
	.ag-card-dur {
		margin-left: 8px;
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

	/* ── Queue card variant ── */
	.ag-card--q {
		transition: background 150ms, box-shadow 150ms;
	}
	.ag-compact-row--queue {
		margin: 0;
	}
	.ag-card-eta {
		flex-shrink: 0;
		white-space: nowrap;
		font-variant-numeric: tabular-nums;
	}
	/* The next one up: its countdown in ink. Size stays on the scale — the
	   happening-now item is the largest thing in the queue. */
	.ag-card--hero .ag-card-eta {
		color: var(--dt-text, rgba(15, 15, 15, 0.87));
	}

	/* ── Plan card variant ── */

	.ag-card--plan .ag-card-body {
		padding: 12px 14px;
	}
	.ag-card-order {
		font: 400 14px/1.25 var(--dt-sans, system-ui, sans-serif);
		font-variant-numeric: tabular-nums;
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
		min-width: 18px;
		flex-shrink: 0;
	}
	.ag-card--plan .ag-card-top {
		gap: 10px;
	}
	/* Everything under the title aligns past the order number — the
	   subtitle, location, time and tags share one left edge. */
	.ag-card--plan .ag-card-sub,
	.ag-card--plan .ag-card-loc,
	.ag-card--plan .ag-card-meta,
	.ag-card--plan .ag-card-tags {
		padding-left: 28px;
	}

	/* ═══ The Queue: 2-column grid ═══ */
	.ag-q {
		display: grid;
		grid-template-columns: 1fr 1.8fr;
		gap: 0;
		flex: 1;
		padding: 8px 0 10px;
		min-height: 0;
	}
	/* Mobile: one column in reading order — what's happening now first, then
	   "Up next", then the finished ones. The status column dissolves
	   (display: contents) so its Now and Done parts can sit either side of
	   the queue. */
	/* Horizontal swipes are ours (day navigation); the browser keeps
	   vertical scrolling and pinch-zoom. */
	.ag--mobile,
	.ag--mobile .ag-body {
		touch-action: pan-y pinch-zoom;
	}
	.ag--mobile .ag-q {
		grid-template-columns: 1fr;
		min-height: auto;
		padding-inline: 16px;
	}
	.ag--mobile .ag-q-status {
		display: contents;
	}
	.ag--mobile .ag-q-queue {
		order: 2;
		overflow-y: visible;
		padding: 12px 0 16px;
	}
	.ag--mobile .ag-q-done-section {
		order: 3;
	}
	/* Mobile: larger touch targets; type is already on the planner scale. */
	.ag--mobile .ag-card-body {
		padding: 14px 16px;
	}
	.ag--mobile .ag-log-row {
		padding: 12px 0;
	}
	.ag--mobile .ag-q-done-item {
		padding: 8px 0;
	}
	/* Section labels set like the planner's weekday: 12/500, tracked, ink-2. */
	.ag-q-label {
		font: 500 12px/1.2 var(--dt-sans, system-ui, sans-serif);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
		margin-bottom: 8px;
		padding: 0 12px;
	}
	.ag-q-empty {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		font-size: 14px;
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
	}

	/* ── NOW column (includes Done above) ── */
	.ag-q-status {
		padding: 0 10px 0 14px;
		border-right: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		scrollbar-width: none;
	}
	.ag-q-status::-webkit-scrollbar {
		display: none;
	}
	.ag-q-done-toggle {
		align-self: flex-start;
		margin-top: 2px;
		padding: 3px 8px;
		border: 1px solid var(--dt-border);
		border-radius: 0;
		background: none;
		font-family: var(--dt-sans, system-ui, sans-serif);
		font-variant-numeric: tabular-nums;
		font-size: 12.5px;
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
		cursor: pointer;
	}
	.ag-q-done-toggle:hover,
	.ag-q-done-toggle:active {
		color: var(--dt-text, rgba(15, 15, 15, 0.87));
		border-color: var(--dt-border-day, rgba(15, 15, 15, 0.6));
	}
	.ag-q-done-toggle:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-text, #0f0f0f);
	}
	.ag-q-now-sub {
		font: 400 12.5px/1.2 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
		margin-bottom: 4px;
	}
	.ag-q-done-section {
		margin-top: 12px;
		padding-top: 10px;
		border-top: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));
	}
	.ag-q-clock {
		font: 500 12px/1.2 var(--dt-sans, system-ui, sans-serif);
		letter-spacing: 0;
		font-variant-numeric: tabular-nums;
		color: var(--dt-accent, #1d4fd7);
		margin-left: 4px;
	}
	/* The one happening now is the most prominent thing on the day: the
	   largest title in the view and the 12% accent wash the system reserves
	   for the current event. */
	.ag-q-now {
		position: relative;
		display: block;
		width: 100%;
		padding: 12px 12px 12px 15px;
		margin-bottom: 8px;
		border-radius: 0;
		background: var(--dt-accent-dim, color-mix(in srgb, var(--dt-accent, #1d4fd7) 12%, transparent));
		border: none;
		border-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.3));
		cursor: pointer;
		transition: background 150ms, box-shadow 150ms;
	}
	.ag-q-now::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 3px;
		background: var(--ev-color, var(--dt-accent));
	}
	.ag-q-now:hover,
	.ag-q-now:active {
		background:
			linear-gradient(var(--dt-hover, rgba(15, 15, 15, 0.04)), var(--dt-hover, rgba(15, 15, 15, 0.04))),
			var(--dt-accent-dim, color-mix(in srgb, var(--dt-accent, #1d4fd7) 12%, transparent));
	}
	.ag-q-now:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);
	}
	.ag-q-now--selected {
		box-shadow: inset 0 0 0 1px var(--ev-color, var(--dt-accent));
	}
	.ag-q-now-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--ev-color, var(--dt-accent, #1d4fd7));
		margin-bottom: 8px;
	}
	@media (prefers-reduced-motion: reduce) {
		.ag-q-now-fill {
			transition: none;
		}
	}
	.ag-q-now-title {
		font: 500 20px/1.2 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(15, 15, 15, 0.87));
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		overflow: hidden;
		word-break: break-word;
		margin-bottom: 4px;
	}
	.ag-q-now-time {
		font: 400 14px/1.2 var(--dt-sans, system-ui, sans-serif);
		font-variant-numeric: tabular-nums;
		color: var(--dt-text, rgba(15, 15, 15, 0.87));
		margin-bottom: 10px;
	}
	.ag-q-now-track {
		height: 2px;
		background: var(--dt-border, rgba(15, 15, 15, 0.08));
		border-radius: 0;
		overflow: hidden;
	}
	.ag-q-now-fill {
		height: 100%;
		width: 100%;
		background: var(--ev-color, var(--dt-accent, #1d4fd7));
		border-radius: 0;
		transform-origin: left;
		transition: transform 1s linear;
	}
	.ag-q-free {
		padding: 8px 10px;
		margin-right: 10px;
	}
	.ag-q-free-label {
		font: 400 15px/1.25 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
		margin-bottom: 2px;
	}

	/* ── NEXT: hero center column ── */
	.ag-q-queue {
		padding: 0 16px;
		overflow-y: auto;
		scrollbar-width: none;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.ag-q-queue::-webkit-scrollbar {
		display: none;
	}


	.ag-q-done-item {
		display: flex;
		align-items: baseline;
		gap: 8px;
		padding: 4px 0;
		width: 100%;
		cursor: pointer;
	}
	.ag-q-done-item:hover .ag-q-done-title,
	.ag-q-done-item:active .ag-q-done-title,
	.ag-q-done-item--selected .ag-q-done-title {
		color: var(--dt-text, rgba(15, 15, 15, 0.87));
	}
	.ag-q-done-item:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);
		border-radius: 0;
	}
	.ag-q-done-check {
		font-size: 12.5px;
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
		flex-shrink: 0;
	}
	/* Finished: quieter ink, no strike (strikethrough means cancelled). */
	.ag-q-done-title {
		font: 500 15px/1.25 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: color 150ms;
	}

	/* ═══ Past Day: "The Log" ═══
	   Dim comes from text tokens only (single layer) — no subtree opacity. */
	.ag-log {
		flex: 1;
		padding: 8px 20px 12px;
		overflow-y: auto;
		scrollbar-width: none;
	}
	.ag-log::-webkit-scrollbar {
		display: none;
	}
	.ag-log-row {
		display: flex;
		align-items: baseline;
		gap: 10px;
		padding: 8px 0;
		width: 100%;
		border-bottom: 1px solid var(--dt-border, rgba(15, 15, 15, 0.08));
		cursor: pointer;
	}
	.ag-log-row:last-child {
		border-bottom: none;
	}
	.ag-log-row:hover .ag-log-title,
	.ag-log-row:active .ag-log-title,
	.ag-log-row--selected .ag-log-title {
		color: var(--dt-text, rgba(15, 15, 15, 0.87));
	}
	.ag-log-row:hover,
	.ag-log-row:active {
		background: var(--dt-hover, rgba(15, 15, 15, 0.04));
	}
	.ag-log-row:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);
		border-radius: 0;
	}
	.ag-log-row--selected {
		box-shadow: inset 0 0 0 1px var(--ev-color);
		border-radius: 0;
	}
	.ag-log-check {
		font-size: 12.5px;
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
		flex-shrink: 0;
	}
	.ag-log-time {
		font: 400 14px/1.25 var(--dt-sans, system-ui, sans-serif);
		font-variant-numeric: tabular-nums;
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
		min-width: 4.6em;
		flex-shrink: 0;
	}
	/* The colour dot of a past row becomes its 3px start bar (dimmed: it is over). */
	.ag-log-dot {
		align-self: stretch;
		width: 3px;
		border-radius: 0;
		flex-shrink: 0;
		opacity: 0.45;
	}
	/* A past day is over, not struck out: quieter ink, sized like the planner.
	   Strikethrough is kept for cancelled events only. */
	.ag-log-title {
		font: 500 15px/1.25 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
		flex: 0 1 auto;
		min-width: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: color 150ms;
		text-align: left;
	}
	.ag-log-row--cancelled .ag-log-title {
		text-decoration: line-through;
	}
	.ag-log-dur {
		font: 400 12.5px/1.25 var(--dt-sans, system-ui, sans-serif);
		font-variant-numeric: tabular-nums;
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
		flex-shrink: 0;
	}

	/* ═══ Compact Day ═══ */
	.ag-compact-list {
		flex: 1;
		padding: 8px 20px 12px;
		overflow-y: auto;
		scrollbar-width: none;
	}
	.ag-compact-list::-webkit-scrollbar { display: none; }
	/* A compact row: 3px start bar, hairline beneath, ink text. */
	.ag-compact-row {
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
	.ag-compact-row::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 3px;
		background: var(--ev-color, var(--dt-accent));
	}
	.ag-compact-row--selected {
		box-shadow: inset 0 0 0 1px var(--ev-color);
	}
	.ag-compact-row:hover .ag-compact-row-title,
	.ag-compact-row:active .ag-compact-row-title { color: var(--dt-text); }
	.ag-compact-row:hover,
	.ag-compact-row:active {
		background: var(--dt-hover, rgba(15, 15, 15, 0.04));
	}
	.ag-compact-row:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #1d4fd7);
	}
	.ag-compact-row-time {
		font: 400 14px/1.3 var(--dt-sans, system-ui, sans-serif);
		font-variant-numeric: tabular-nums;
		color: var(--dt-text, rgba(15, 15, 15, 0.87));
		min-width: 4.6em;
		flex-shrink: 0;
		white-space: nowrap;
	}
	/* Title + subtitle + tags cluster, sized to its content so the meta and
	   duration sit beside the title instead of across a wide row. One line
	   while it fits; on mobile the metadata wraps to a second line under the
	   title instead of crushing it. */
	.ag-compact-row-main {
		display: flex;
		align-items: baseline;
		gap: 10px;
		flex: 0 1 auto;
		min-width: 0;
	}
	.ag--mobile .ag-compact-row-main {
		flex: 1;
		flex-wrap: wrap;
		row-gap: 2px;
	}
	/* Mobile: size the title by its content when deciding line breaks — a long
	   title claims the first line whole (ellipsizing only against the full row)
	   and pushes subtitle/tags down instead of truncating at 35%. */
	.ag--mobile .ag-compact-row-title {
		flex-basis: auto;
	}
	/* On its own wrapped line the subtitle gets the full width */
	.ag--mobile .ag-compact-row-sub {
		max-width: 100%;
	}
	.ag-compact-row-title {
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
		text-align: left;
	}
	.ag-compact-row-dur,
	.ag-compact-row-sub,
	.ag-compact-row-tag {
		font: 400 12.5px/1.3 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
		white-space: nowrap;
	}
	.ag-compact-row-dur {
		font-variant-numeric: tabular-nums;
		flex-shrink: 0;
	}
	.ag-compact-row-sub {
		flex-shrink: 3;
		min-width: 0;
		max-width: 45%;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.ag-compact-row-tag {
		flex-shrink: 1;
		min-width: 2.5em;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.ag-compact-row--cancelled .ag-compact-row-title {
		text-decoration: line-through;
		color: var(--dt-text-2, rgba(15, 15, 15, 0.54));
	}
	.ag-compact-row--cancelled::before { opacity: 0.45; }
	.ag-compact-row--tentative .ag-compact-row-title { color: var(--dt-text-2, rgba(15, 15, 15, 0.54)); }
	.ag-compact-row--tentative::before {
		background: repeating-linear-gradient(180deg, var(--ev-color) 0 4px, transparent 4px 7px);
	}
	/* Mobile: larger touch targets for compact rows */
	.ag--mobile .ag-compact-row { padding: 8px 0 8px 11px; }
	.ag--mobile .ag-day-head { padding: 0 16px 8px; }

	/* ═══ Future Day: "The Plan" ═══ */
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
</style>
