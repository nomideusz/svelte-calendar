<script lang="ts">
	/**
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
	import { getContext } from 'svelte';
	import { createClock } from '../../core/clock.svelte.js';
	import type { TimelineEvent } from '../../core/types.js';
	import { sod, DAY_MS } from '../../core/time.js';
	import { fmtTime as _fmtTime, fmtDuration } from '../../core/locale.js';
	import type { ViewState } from '../../engine/view-state.svelte.js';

	interface Props {
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
		locale,
		height,
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

	// ── Day derivations ─────────────────────────────────
	const dayMs = $derived(focusDate ? sod(focusDate.getTime()) : clock.today);
	const dayEnd = $derived(dayMs + DAY_MS);
	const isToday = $derived(dayMs === clock.today);
	const isPastDay = $derived(dayMs < clock.today);

	const dateLabel = $derived(
		new Date(dayMs).toLocaleDateString(locale ?? 'en-US', {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
		})
	);

	/** All events for this day, sorted chronologically */
	const allDayEvents = $derived.by((): TimelineEvent[] => {
		return events
			.filter((ev) => ev.start.getTime() < dayEnd && ev.end.getTime() > dayMs)
			.sort((a, b) => a.start.getTime() - b.start.getTime());
	});

	const dayCat = $derived.by(() => {
		const now = clock.tick;
		const past: TimelineEvent[] = [];
		const current: TimelineEvent[] = [];
		const upcoming: TimelineEvent[] = [];
		for (const ev of allDayEvents) {
			const s = ev.start.getTime();
			const e = ev.end.getTime();
			if (e <= now) past.push(ev);
			else if (s <= now && e > now) current.push(ev);
			else upcoming.push(ev);
		}
		return { past, current, upcomingSlots: groupIntoSlots(upcoming), totalUp: upcoming.length };
	});

	/** Flat list of next upcoming events (max 5) for the "Up next" column */
	const upcomingNext = $derived.by((): TimelineEvent[] => {
		const all: TimelineEvent[] = [];
		for (const slot of dayCat.upcomingSlots) {
			for (const ev of slot.events) {
				all.push(ev);
				if (all.length >= 5) return all;
			}
		}
		return all;
	});
</script>

<div
	class="ag ag--day"
	style={style || undefined}
	style:height={height ? `${height}px` : undefined}
>
	<div class="ag-body" role="list" aria-label="Today's lineup">
		{#if isToday}
			<!-- ─── Today: "The Queue" — upcoming is the hero ─── -->
			<div class="ag-q">
				<!-- NOW column: past events stacked above NOW strip -->
				<div class="ag-q-status">
					{#if dayCat.past.length > 0}
						<div class="ag-q-done-section">
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
						</div>
					{/if}

					<div class="ag-q-label">Now <span class="ag-q-clock">{clock.hm}</span></div>
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
								class="ag-card ag-card--q"
								class:ag-card--hero={i === 0}
								class:ag-card--selected={selectedEventId === ev.id}
								style:--ev-color={ev.color || 'var(--dt-accent)'}
								role="button"
								tabindex="0"
								aria-label="{ev.title}, {fmtTime(ev.start)}, {duration(ev)}"
								onclick={() => handleClick(ev)}
								onkeydown={(e) => handleKeydown(e, ev)}
							>
								<div class="ag-card-stripe"></div>
								<div class="ag-card-body">
									<div class="ag-card-top">
										<span class="ag-card-title">{ev.title}</span>
										<span class="ag-card-eta">{timeUntilMs(ev.start.getTime())}</span>
									</div>
									{#if ev.subtitle}
										<span class="ag-card-sub">{ev.subtitle}</span>
									{/if}
									<div class="ag-card-meta">
										{fmtTime(ev.start)} – {fmtTime(ev.end)}
										<span class="ag-card-dur">{duration(ev)}</span>
									</div>
									{#if ev.tags?.length}
										<div class="ag-card-tags">
											{#each ev.tags as tag}
												<span class="ag-card-tag">{tag}</span>
											{/each}
										</div>
									{/if}
								</div>
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
							class="ag-card ag-card--plan"
							class:ag-card--first={i === 0}
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
								<div class="ag-card-top">
									<span class="ag-card-order">{i + 1}</span>
									<span class="ag-card-title">{ev.title}</span>
								</div>
								{#if ev.subtitle}
									<span class="ag-card-sub">{ev.subtitle}</span>
								{/if}
								<div class="ag-card-meta">
									{fmtTime(ev.start)} – {fmtTime(ev.end)}
									<span class="ag-card-dur">{duration(ev)}</span>
								</div>
								{#if ev.tags?.length}
									<div class="ag-card-tags">
										{#each ev.tags as tag}
											<span class="ag-card-tag">{tag}</span>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					{/each}
				{/if}
			</div>
		{/if}
	</div>

	<div class="ag-date-label">{dateLabel}</div>

	<!-- ── Floating nav pills ── -->
	<nav class="ag-nav" aria-label="Day navigation">
		<button
			class="ag-nav-pill ag-nav-today"
			class:ag-nav-today--hidden={isToday}
			onclick={() => viewState?.goToday()}
			aria-label="Go to today"
			tabindex={isToday ? -1 : 0}
		>
			Today
		</button>
		<button
			class="ag-nav-pill"
			onclick={() => viewState?.prev()}
			aria-label="Previous day"
		>
			<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="12" height="12" aria-hidden="true"><path d="M10 3 5 8l5 5"/></svg>
		</button>
		<button
			class="ag-nav-pill"
			onclick={() => viewState?.next()}
			aria-label="Next day"
		>
			<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="12" height="12" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
		</button>
	</nav>
</div>

<style>
	/* ═══ Floating date label ═══ */
	.ag-date-label {
		position: absolute;
		top: 10px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 20;
		font: 600 11px/1 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--dt-text, rgba(226, 232, 240, 0.85));
		background: color-mix(in srgb, var(--dt-surface, #10141c) 85%, transparent);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		padding: 8px 16px;
		border-radius: 8px;
		border: 1px solid var(--dt-border, rgba(148, 163, 184, 0.07));
		pointer-events: none;
		white-space: nowrap;
	}

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
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		padding-top: 44px;
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
	.ag-card-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 8px;
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

	/* ── Queue card variant ── */
	.ag-card--q {
		margin-bottom: 6px;
		transition: border-color 150ms, transform 100ms;
	}
	.ag-card--q .ag-card-stripe {
		width: 3.5px;
	}
	.ag-card--q .ag-card-body {
		gap: 3px;
	}
	.ag-card--q .ag-card-tags {
		margin-top: 2px;
	}
	.ag-card-eta {
		font-size: 9px;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: var(--dt-accent, #ff6b4a);
		flex-shrink: 0;
		white-space: nowrap;
	}
	.ag-card--hero {
		background: color-mix(in srgb, var(--ev-color) 8%, var(--dt-surface, #191919));
		border-color: color-mix(in srgb, var(--ev-color) 25%, transparent);
	}
	.ag-card--hero .ag-card-title {
		font-size: 16px;
		font-weight: 700;
	}
	.ag-card--hero .ag-card-eta {
		font-size: 11px;
		background: color-mix(in srgb, var(--dt-accent, #ff6b4a) 18%, transparent);
		padding: 2px 7px;
		border-radius: 4px;
	}
	.ag-card--hero .ag-card-body {
		padding: 14px 16px;
	}

	/* ── Plan card variant ── */
	.ag-card--plan .ag-card-stripe {
		width: 3.5px;
	}
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
		color: var(--dt-text-3, rgba(255, 255, 255, 0.2));
		font-family: var(--dt-mono, monospace);
		flex-shrink: 0;
	}
	.ag-card--plan .ag-card-title {
		font-size: 14px;
	}
	.ag-card--first {
		background: color-mix(in srgb, var(--ev-color) 5%, var(--dt-surface, #191919));
		border-color: color-mix(in srgb, var(--ev-color) 15%, transparent);
	}
	.ag-card--first .ag-card-title {
		font-size: 16px;
		font-weight: 700;
	}
	.ag-card--plan .ag-card-sub {
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

	/* ── NOW column (includes Done above) ── */
	.ag-q-status {
		padding: 0 10px 0 14px;
		border-right: 1px solid var(--dt-border, rgba(255, 255, 255, 0.06));
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		scrollbar-width: none;
	}
	.ag-q-status::-webkit-scrollbar {
		display: none;
	}
	.ag-q-done-section {
		margin-bottom: 10px;
		padding-bottom: 8px;
		border-bottom: 1px solid var(--dt-border, rgba(255, 255, 255, 0.06));
	}
	.ag-q-clock {
		font-size: 10px;
		font-weight: 600;
		font-family: var(--dt-mono, monospace);
		color: var(--dt-accent, #ff6b4a);
		margin-left: 4px;
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

	/* ═══ Past Day: "The Log" ═══ */
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
