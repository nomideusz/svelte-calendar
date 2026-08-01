<script lang="ts">import { createClock } from "../../core/clock.svelte.js";
import { sod, DAY_MS, dayNum, isAllDay, isMultiDay } from "../../core/time.js";
import { weekdayLong, monthLong } from "../../core/locale.js";
import { useCalendarContext } from "../shared/context.svelte.js";
import EventContent from "../shared/EventContent.svelte";
import { fmtTime, duration, timeUntilMs, progress, groupIntoSlots } from "../shared/format.js";
const ctx = useCalendarContext();
const L = $derived(ctx.labels);
const emptySnippet = $derived(ctx.emptySnippet);
let {
  locale,
  height,
  events = [],
  style = "",
  focusDate,
  oneventclick,
  selectedEventId = null
} = $props();
const clock = createClock(ctx.timezone);
const viewState = $derived(ctx.viewState);
const equalDays = $derived(ctx.equalDays);
const isMobile = $derived(ctx.isMobile);
const autoHeight = $derived(ctx.autoHeight);
const compact = $derived(ctx.compact);
const oneventhover = $derived(ctx.oneventhover);
const disabledSet = $derived(ctx.disabledSet);
let swipeStartX = 0;
let swipeStartY = 0;
let swipeActive = false;
const SWIPE_THRESHOLD = 50;
function onPointerDown(e) {
  if (!isMobile || e.pointerType !== "touch") return;
  swipeActive = true;
  swipeStartX = e.clientX;
  swipeStartY = e.clientY;
}
function onPointerUp(e) {
  if (!swipeActive || e.pointerType !== "touch") return;
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
const fmt = (d) => fmtTime(d, locale);
const eta = (ms) => timeUntilMs(ms, clock.tick, L);
const prog = (ev) => progress(ev, clock.tick);
function handleClick(ev) {
  oneventclick?.(ev);
}
const dayMs = $derived(focusDate ? sod(focusDate.getTime()) : clock.today);
const dayEnd = $derived(dayMs + DAY_MS);
const isToday = $derived(dayMs === clock.today);
const isTomorrow = $derived(dayMs === clock.today + DAY_MS);
const isPastDay = $derived(equalDays ? false : dayMs < clock.today);
const dayEvents = $derived.by(() => {
  return events.filter((ev) => ev.start.getTime() < dayEnd && ev.end.getTime() > dayMs).sort((a, b) => a.start.getTime() - b.start.getTime());
});
const allDayBanner = $derived(dayEvents.filter((ev) => isAllDay(ev) || isMultiDay(ev)));
const timedDayEvents = $derived(dayEvents.filter((ev) => !isAllDay(ev) && !isMultiDay(ev)));
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
  return { past, current, upcomingSlots: groupIntoSlots(upcoming), totalUp: upcoming.length };
});
const upcomingNext = $derived.by(() => {
  const all = [];
  for (const slot of dayCat.upcomingSlots) {
    for (const ev of slot.events) all.push(ev);
  }
  return all;
});
const UPCOMING_CARDS = 4;
const DONE_VISIBLE = 3;
let showAllDone = $state(false);
const visibleDone = $derived(
  showAllDone ? dayCat.past : dayCat.past.slice(-DONE_VISIBLE)
);
const hiddenDoneCount = $derived(showAllDone ? 0 : Math.max(0, dayCat.past.length - DONE_VISIBLE));
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="ag ag--day"
	class:ag--disabled={disabledSet.has(dayMs)}
	class:ag--mobile={isMobile}
	class:ag--auto={autoHeight}
	style={style || undefined}
	style:height={height ? `${height}px` : undefined}
	onpointerdown={onPointerDown}
	onpointerup={onPointerUp}
	onpointercancel={onPointerCancel}
>
	<div class="ag-body" role="group" aria-label={L.todaysLineup}>
		<!-- ─── In-view date header (swipe nav is otherwise unlabelled) ─── -->
		<div class="ag-day-head">
			{#if !equalDays && isToday}
				<span class="ag-day-head-badge">{L.today}</span>
			{:else if !equalDays && isTomorrow}
				<span class="ag-day-head-badge ag-day-head-badge--muted">{L.tomorrow}</span>
			{/if}
			<span class="ag-day-head-name">{weekdayLong(dayMs, locale)}</span>
			<span class="ag-day-head-date">{monthLong(dayMs, locale)} {dayNum(dayMs)}</span>
		</div>
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
							aria-label="{ev.title}, {L.allDay}"
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
							style:--ev-color={ev.color || 'var(--dt-accent)'}
							aria-label="{ev.title}, {fmt(ev.start)}, {duration(ev)}"
							onclick={() => handleClick(ev)}
							onpointerenter={() => oneventhover?.(ev)}
						>
							<EventContent event={ev}>
							<span class="ag-compact-row-dot"></span>
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
								style:--ev-color={ev.color || 'var(--dt-accent)'}
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
									<span class="ag-q-done-check">✓</span>
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
									style:--ev-color={ev.color || 'var(--dt-accent)'}
									aria-label="{ev.title}, {fmt(ev.start)}, {duration(ev)}"
									onclick={() => handleClick(ev)}
									onpointerenter={() => oneventhover?.(ev)}
								>
									<EventContent event={ev}>
									<span class="ag-compact-row-dot"></span>
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
								style:--ev-color={ev.color || 'var(--dt-accent)'}
								aria-label="{ev.title}, {fmt(ev.start)}, {duration(ev)}"
								onclick={() => handleClick(ev)}
								onpointerenter={() => oneventhover?.(ev)}
							>
								<div class="ag-card-body">
									<EventContent event={ev}>
									<div class="ag-card-top">
										<span class="ag-card-title">{ev.title}</span>
										<span class="ag-card-eta">{eta(ev.start.getTime())}</span>
									</div>
									{#if ev.subtitle}
										<span class="ag-card-sub">{ev.subtitle}</span>
									{/if}
									<div class="ag-card-meta">
										{fmt(ev.start)} – {fmt(ev.end)}
										<span class="ag-card-dur">{duration(ev)}</span>
									</div>
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
							style:--ev-color={ev.color || 'var(--dt-accent)'}
							aria-label="{ev.title}, {fmt(ev.start)} to {fmt(ev.end)}"
							onclick={() => handleClick(ev)}
							onpointerenter={() => oneventhover?.(ev)}
						>
							<span class="ag-log-check">✓</span>
							<span class="ag-log-time">{fmt(ev.start)}</span>
							<span class="ag-log-dot" style:background={ev.color || 'var(--dt-accent)'}></span>
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
							style:--ev-color={ev.color || 'var(--dt-accent)'}
							aria-label="{ev.title}{ev.status === 'cancelled' ? ' (cancelled)' : ''}{ev.status === 'tentative' ? ' (tentative)' : ''}{ev.status === 'full' ? ' (full)' : ''}{ev.status === 'limited' ? ' (limited)' : ''}, {fmt(ev.start)} to {fmt(ev.end)}, {duration(ev)}"
							onclick={() => handleClick(ev)}
							onpointerenter={() => oneventhover?.(ev)}
						>
							<div class="ag-card-body">
								<EventContent event={ev}>
								<div class="ag-card-top">
									<span class="ag-card-order">{i + 1}</span>
									<span class="ag-card-title">{ev.title}</span>
								</div>
								{#if ev.subtitle}
									<span class="ag-card-sub">{ev.subtitle}</span>
								{/if}
								{#if ev.location}
									<span class="ag-card-loc">{ev.location}</span>
								{/if}
								<div class="ag-card-meta">
									{fmt(ev.start)} – {fmt(ev.end)}
									<span class="ag-card-dur">{duration(ev)}</span>
								</div>
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
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
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
			color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent) 6px,
			color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent) 12px
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
	.ag-day-head-badge {
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dt-accent, #2563eb);
		background: color-mix(in srgb, var(--dt-accent, #2563eb) 12%, transparent);
		padding: 2px 7px;
		border-radius: 3px;
	}
	.ag-day-head-badge--muted {
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		background: color-mix(in srgb, var(--dt-text-2, rgba(0, 0, 0, 0.54)) 10%, transparent);
	}
	.ag-day-head-name {
		font-size: 13px;
		font-weight: 600;
		line-height: 1.2;
	}
	.ag-day-head-date {
		font-size: 11px;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		line-height: 1.2;
	}
	.ag--auto .ag-body { overflow-y: visible; min-height: auto; }
	.ag-body::-webkit-scrollbar {
		width: 4px;
	}
	.ag-body::-webkit-scrollbar-thumb {
		background: var(--dt-border);
		border-radius: 2px;
	}

	/* ═══ All-day strip ═══ */
	.ag-allday {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 16px;
		border-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
	}
	.ag-allday-label {
		font: 600 10px/1 var(--dt-sans, system-ui, sans-serif);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		white-space: nowrap;
		flex-shrink: 0;
	}
	.ag-allday-items {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.ag-allday-chip {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 3px 10px;
		border-radius: 6px;
		background: color-mix(in srgb, var(--ev-color) 12%, var(--dt-surface, var(--dt-bg, #ffffff)));
		border: 1px solid color-mix(in srgb, var(--ev-color) 20%, transparent);
		cursor: pointer;
		transition: background 0.15s, border-color 0.15s;
	}
	.ag-allday-chip:hover,
	.ag-allday-chip:active {
		background: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));
		border-color: color-mix(in srgb, var(--ev-color) 35%, transparent);
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
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--ev-color);
		flex-shrink: 0;
	}
	.ag-allday-title {
		font: 500 0.75rem/1.2 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		white-space: nowrap;
	}

	/* ═══ Shared: event card ═══ */
	.ag-card {
		display: flex;
		align-items: stretch;
		border-radius: 10px;
		background: color-mix(in srgb, var(--ev-color) 15%, var(--dt-surface, var(--dt-bg, #ffffff)));
		border: 1px solid color-mix(in srgb, var(--ev-color) 10%, var(--dt-border, rgba(0, 0, 0, 0.08)));
		overflow: hidden;
		cursor: pointer;
		transition: background 150ms, border-color 150ms;
	}
	.ag-card:hover,
	.ag-card:active {
		background: color-mix(in srgb, var(--ev-color) 25%, var(--dt-surface, var(--dt-bg, #ffffff)));
		border-color: color-mix(in srgb, var(--ev-color) 40%, transparent);
	}
	.ag-card:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
	}
	.ag-card--selected {
		border-color: var(--ev-color);
		background: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));
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
		padding: 10px 12px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
		flex: 1;
	}
	.ag-card-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 8px;
		min-width: 0;
	}
	.ag-card-title {
		font-size: 13px;
		font-weight: 600;
		line-height: 1.3;
		word-break: break-word;
		flex: 1;
		min-width: 0;
	}
	.ag-card-meta {
		font-size: 11px;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		font-family: var(--dt-mono, monospace);
		line-height: 1;
	}
	.ag-card-dur {
		margin-left: 6px;
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
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

	/* ── Queue card variant ── */
	.ag-card--q {
		transition: border-color 150ms, transform 100ms;
	}
	.ag-compact-row--queue {
		margin: 0;
	}

	.ag-card--q .ag-card-body {
		gap: 3px;
	}
	.ag-card--q .ag-card-tags {
		margin-top: 2px;
	}
	.ag-card-eta {
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: var(--dt-accent, #2563eb);
		flex-shrink: 0;
		white-space: nowrap;
	}
	.ag-card--hero {
		background: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));
		border-color: color-mix(in srgb, var(--ev-color) 30%, transparent);
	}
	.ag-card--hero .ag-card-title {
		font-size: 16px;
		font-weight: 700;
	}
	.ag-card--hero .ag-card-eta {
		font-size: 11px;
		background: color-mix(in srgb, var(--dt-accent, #2563eb) 18%, transparent);
		padding: 2px 7px;
		border-radius: 4px;
	}
	.ag-card--hero .ag-card-body {
		padding: 14px 16px;
	}

	/* ── Plan card variant ── */

	.ag-card--plan .ag-card-body {
		padding: 12px 14px;
		gap: 3px;
	}
	.ag-card--plan .ag-card-top {
		align-items: baseline;
	}
	.ag-card-order {
		font-size: 10px;
		font-weight: 700;
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		font-family: var(--dt-mono, monospace);
		flex-shrink: 0;
	}
	.ag-card--plan .ag-card-title {
		font-size: 14px;
	}
	.ag-card--first {
		background: color-mix(in srgb, var(--ev-color) 20%, var(--dt-surface, var(--dt-bg, #ffffff)));
		border-color: color-mix(in srgb, var(--ev-color) 25%, transparent);
	}
	.ag-card--first .ag-card-title {
		font-size: 16px;
		font-weight: 700;
	}
	/* Everything under the title aligns past the order number — the
	   subtitle, location, time and tags share one left edge. */
	.ag-card--plan .ag-card-sub,
	.ag-card--plan .ag-card-loc,
	.ag-card--plan .ag-card-meta {
		padding-left: 22px;
	}
	.ag-card--plan .ag-card-tags {
		padding-left: 22px;
		margin-top: 2px;
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
	/* Mobile: stack queue columns vertically — "Up next" (hero) first,
	   Now/Done status column second */
	.ag--mobile .ag-q {
		grid-template-columns: 1fr;
		min-height: auto;
	}
	.ag--mobile .ag-q-status {
		order: 2;
		border-right: none;
		border-top: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
		padding-top: 10px;
		margin-top: 8px;
		overflow-y: visible;
	}
	.ag--mobile .ag-q-queue {
		order: 1;
		overflow-y: visible;
		padding-bottom: 16px;
	}
	.ag--mobile .ag-card-meta {
		line-height: 1.3;
		padding-bottom: 1px;
	}
	/* Mobile: larger touch targets */
	.ag--mobile .ag-card-body {
		padding: 14px 16px;
	}
	.ag--mobile .ag-card-title {
		font-size: 15px;
	}
	.ag--mobile .ag-card--hero .ag-card-title {
		font-size: 18px;
	}
	.ag--mobile .ag-card--hero .ag-card-body {
		padding: 16px 18px;
	}
	.ag--mobile .ag-log-row {
		padding: 12px 0;
	}
	.ag--mobile .ag-card--plan .ag-card-body {
		padding: 14px 16px;
	}
	.ag--mobile .ag-card--plan .ag-card-title {
		font-size: 15px;
	}
	/* Mobile: Now/Done status subtree type scale */
	.ag--mobile .ag-q-label {
		font-size: 11px;
	}
	.ag--mobile .ag-q-clock {
		font-size: 12px;
	}
	.ag--mobile .ag-q-now-title {
		font-size: 16px;
	}
	.ag--mobile .ag-q-now-sub {
		font-size: 13px;
	}
	.ag--mobile .ag-q-now-time {
		font-size: 12px;
	}
	.ag--mobile .ag-q-free-label {
		font-size: 13px;
	}
	.ag--mobile .ag-q-done-title {
		font-size: 13px;
	}
	.ag--mobile .ag-q-done-check {
		font-size: 12px;
	}
	.ag--mobile .ag-card-eta {
		font-size: 12px;
	}
	.ag--mobile .ag-card-sub {
		font-size: 12px;
	}
	.ag--mobile .ag-card-loc {
		font-size: 12px;
	}
	.ag--mobile .ag-card-tag {
		font-size: 11px;
	}
	.ag--mobile .ag-log-time,
	.ag--mobile .ag-log-dur {
		font-size: 12px;
	}
	.ag--mobile .ag-log-title {
		font-size: 15px;
	}
	.ag-q-label {
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
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
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
	}

	/* ── NOW column (includes Done above) ── */
	.ag-q-status {
		padding: 0 10px 0 14px;
		border-right: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
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
		border-radius: 999px;
		background: none;
		font-family: var(--dt-mono);
		font-size: 11px;
		color: var(--dt-text-3);
		cursor: pointer;
	}
	.ag-q-done-toggle:hover,
	.ag-q-done-toggle:active {
		color: var(--dt-text);
		border-color: var(--dt-text-3);
	}
	.ag-q-done-toggle:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
	}
	.ag-q-now-sub {
		font-size: 12px;
		color: var(--dt-text-2);
		margin-top: 1px;
	}
	.ag-q-done-section {
		margin-top: 12px;
		padding-top: 10px;
		border-top: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
	}
	.ag-q-clock {
		font-size: 11px;
		font-weight: 600;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-accent, #2563eb);
		margin-left: 4px;
	}
	.ag-q-now {
		display: block;
		width: 100%;
		padding: 8px 10px;
		margin-bottom: 8px;
		border-radius: 8px;
		background: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, var(--dt-surface, var(--dt-bg, #ffffff)));
		border: 1px solid color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, transparent);
		cursor: pointer;
		transition: background 150ms, border-color 150ms;
	}
	.ag-q-now:hover,
	.ag-q-now:active {
		background: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 25%, var(--dt-surface, var(--dt-bg, #ffffff)));
		border-color: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 35%, transparent);
	}
	.ag-q-now:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
	}
	.ag-q-now--selected {
		border-color: var(--ev-color, var(--dt-accent));
	}
	.ag-q-now-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--ev-color, var(--dt-accent, #2563eb));
		margin-bottom: 6px;
		animation: ag-pulse 2.5s ease-in-out infinite;
	}
	@keyframes ag-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}
	@media (prefers-reduced-motion: reduce) {
		.ag-q-now-dot {
			animation: none;
		}
		.ag-q-now-fill {
			transition: none;
		}
	}
	.ag-q-now-title {
		font-size: 12px;
		font-weight: 600;
		line-height: 1.25;
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		overflow: hidden;
		word-break: break-word;
		margin-bottom: 3px;
	}
	.ag-q-now-time {
		font-size: 11px;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		margin-bottom: 6px;
	}
	.ag-q-now-track {
		height: 2px;
		background: var(--dt-border, rgba(0, 0, 0, 0.08));
		border-radius: 1px;
		overflow: hidden;
	}
	.ag-q-now-fill {
		height: 100%;
		width: 100%;
		background: var(--ev-color, var(--dt-accent, #2563eb));
		border-radius: 1px;
		transform-origin: left;
		transition: transform 1s linear;
	}
	.ag-q-free {
		padding: 8px 10px;
		margin-right: 10px;
	}
	.ag-q-free-label {
		font-size: 12px;
		font-weight: 300;
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
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
		align-items: center;
		gap: 5px;
		padding: 3px 0;
		width: 100%;
		cursor: pointer;
	}
	.ag-q-done-item:hover .ag-q-done-title,
	.ag-q-done-item:active .ag-q-done-title,
	.ag-q-done-item--selected .ag-q-done-title {
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
	}
	.ag-q-done-item:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
		border-radius: 4px;
	}
	.ag-q-done-check {
		font-size: 11px;
		color: var(--dt-success, rgba(22, 163, 74, 0.7));
		flex-shrink: 0;
	}
	.ag-q-done-title {
		font-size: 12px;
		line-height: 1.2;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-decoration: line-through;
		text-decoration-color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
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
		align-items: center;
		gap: 10px;
		padding: 8px 0;
		width: 100%;
		border-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
		cursor: pointer;
	}
	.ag-log-row:last-child {
		border-bottom: none;
	}
	.ag-log-row:hover .ag-log-title,
	.ag-log-row:active .ag-log-title,
	.ag-log-row--selected .ag-log-title {
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
	}
	.ag-log-row:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
		border-radius: 6px;
	}
	.ag-log-row--selected {
		background: color-mix(in srgb, var(--ev-color) 6%, transparent);
		border-radius: 6px;
		padding-left: 8px;
		padding-right: 8px;
		margin-left: -8px;
		margin-right: -8px;
		width: calc(100% + 16px);
	}
	.ag-log-check {
		font-size: 10px;
		color: var(--dt-success, rgba(22, 163, 74, 0.7));
		flex-shrink: 0;
	}
	.ag-log-time {
		font-size: 11px;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
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
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-decoration: line-through;
		text-decoration-color: var(--dt-border, rgba(0, 0, 0, 0.08));
		transition: color 150ms;
		text-align: left;
	}
	.ag-log-dur {
		font-size: 11px;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
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
	.ag-compact-row {
		display: flex;
		align-items: baseline;
		gap: 8px;
		padding: 4px 0;
		cursor: pointer;
		min-width: 0;
		width: 100%;
	}
	.ag-compact-row--selected {
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
	.ag-compact-row:hover .ag-compact-row-title,
	.ag-compact-row:active .ag-compact-row-title { color: var(--dt-text); }
	.ag-compact-row:active {
		background: color-mix(in srgb, var(--ev-color) 8%, transparent);
		border-radius: 4px;
	}
	.ag-compact-row:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
		border-radius: 4px;
	}
	.ag-compact-row-dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--ev-color, var(--dt-accent));
		flex-shrink: 0;
		align-self: center;
	}
	.ag-compact-row-time {
		font-size: 11px;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		min-width: 64px;
		flex-shrink: 0;
		line-height: 1.4;
	}
	/* Title + subtitle + tags cluster. One line while it fits; on mobile the
	   metadata wraps to a second line under the title instead of crushing it. */
	.ag-compact-row-main {
		display: flex;
		align-items: baseline;
		gap: 8px;
		flex: 1;
		min-width: 0;
	}
	.ag--mobile .ag-compact-row-main {
		flex-wrap: wrap;
		row-gap: 2px;
	}
	.ag-compact-row-title {
		font-size: 12px;
		font-weight: 500;
		color: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 82%, transparent);
		flex: 1;
		/* The title is the row's identity — never let subtitle/tags/duration
		   squeeze it out on narrow screens (flex: 1 alone resolves to 0px). */
		min-width: 35%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: color 150ms;
		line-height: 1.4;
		text-align: left;
	}
	.ag-compact-row-dur {
		font-size: 10px;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		flex-shrink: 0;
		line-height: 1.4;
	}
	.ag-compact-row-sub {
		font-size: 10px;
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		flex-shrink: 3;
		min-width: 0;
		max-width: 45%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		line-height: 1.4;
	}
	.ag-compact-row-tag {
		font: 500 10px / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--ev-color, var(--dt-accent));
		background: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 12%, transparent);
		padding: 1px 4px;
		border-radius: 3px;
		white-space: nowrap;
		flex-shrink: 1;
		min-width: 2.5em;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.ag-compact-row--cancelled { opacity: 0.5; }
	.ag-compact-row--cancelled .ag-compact-row-title { text-decoration: line-through; }
	.ag-compact-row--tentative { opacity: 0.65; }
	/* Mobile: larger touch targets for compact rows */
	.ag--mobile .ag-compact-row { padding: 8px 0; }
	.ag--mobile .ag-compact-row-title { font-size: 15px; }
	.ag--mobile .ag-compact-row-time { font-size: 12px; }
	.ag--mobile .ag-compact-row-dur { font-size: 12px; }
	.ag--mobile .ag-compact-row-sub { font-size: 12px; }
	.ag--mobile .ag-compact-row-tag { font-size: 11px; }
	.ag--mobile .ag-day-head { padding: 0 16px 8px; }
	.ag--mobile .ag-day-head-name { font-size: 15px; }
	.ag--mobile .ag-day-head-date { font-size: 12px; }
	.ag--mobile .ag-day-head-badge { font-size: 11px; }
	.ag--mobile .ag-allday-title { font-size: 0.85rem; }
	.ag--mobile .ag-allday-label { font-size: 11px; }

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
