<!--
  DayGrid — Hey-inspired horizontal filmstrip.

  Time flows left → right. Past on the left, future on the right.
  The now-line is always visible. Drag to scroll through your life.

  Night blocks (22:00 – 06:00) are collapsed into a compact strip.
  Click to expand and see the full night hours.

  Events are positioned as horizontal cards with full-width lanes.
-->
<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { createClock } from '../../core/clock.svelte.js';
	import type { TimelineEvent } from '../../core/types.js';
	import type { DragState } from '../../engine/drag.svelte.js';
	import { DAY_MS, HOUR_MS, HOURS, sod } from '../../core/time.js';
	import { fmtH, fmtDay } from '../../core/locale.js';

	interface Props {
		/** Number of past days visible */
		pastDays?: number;
		/** Number of future days visible */
		futureDays?: number;
		/** Pixel width of one hour */
		hourWidth?: number;
		/** Where "now" sits in the viewport (0 = left, 1 = right) */
		nowPosition?: number;
		/** Total height */
		height?: number;
		/** Events to render */
		events?: TimelineEvent[];
		/** Inline style for CSS variable overrides (theme) */
		style?: string;
		/** The date to centre this view on */
		focusDate?: Date;
		/** Called when the user clicks an event */
		oneventclick?: (event: TimelineEvent) => void;
		/** Called when the user clicks an empty time slot */
		oneventcreate?: (range: { start: Date; end: Date }) => void;
		/** Currently selected event ID (for highlight) */
		selectedEventId?: string | null;
		/** Start weeks on Monday */
		mondayStart?: boolean;
	}

	let {
		pastDays = 2,
		futureDays = 14,
		hourWidth = 110,
		nowPosition = 0.25,
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

	// ─── State ──────────────────────────────────────────────
	let following = $state(true);
	let dragging = $state(false);
	let rafId = 0;
	let dragStartX = 0;
	let dragScrollStart = 0;
	let el: HTMLDivElement;

	/** Night blocks: track which days have expanded nights */
	let nightExpanded = $state<Set<number>>(new Set());

	// ─── Night block constants ──────────────────────────────
	/** Night = 22:00 → 06:00 (8 hours). Collapsed width = small strip. */
	const NIGHT_START = 22; // 22:00
	const NIGHT_END = 6;   // 06:00
	const NIGHT_HOURS = 8; // 22→06
	const NIGHT_COLLAPSED_W = 48; // px when collapsed

	// ─── Derived ────────────────────────────────────────────
	const count = $derived(pastDays + 1 + futureDays);
	const centerMs = $derived(focusDate ? sod(focusDate.getTime()) : clock.today);
	const origin = $derived(centerMs - pastDays * DAY_MS);

	// Each day has: daytime hours (06:00–22:00 = 16h) at full width
	// + a night block that is either collapsed or expanded.
	// Night blocks sit between days (end of day → start of next day).

	const dayW_day = $derived(16 * hourWidth); // 06:00–22:00
	const nightW_expanded = $derived(NIGHT_HOURS * hourWidth);

	interface DayLayout {
		ms: number;
		name: string;
		today: boolean;
		past: boolean;
		/** X offset of the 06:00 mark (daytime start) */
		dayX: number;
		/** Width of the daytime portion */
		dayWidth: number;
		/** X offset of the night block (22:00) AFTER this day */
		nightX: number;
		/** Width of the night block */
		nightW: number;
		/** Is the night block expanded? */
		nightOpen: boolean;
	}

	const dayLayouts = $derived.by(() => {
		const layouts: DayLayout[] = [];
		let x = 0;

		for (let i = 0; i < count; i++) {
			const ms = origin + i * DAY_MS;
			const isToday = ms === clock.today;
			const isPast = ms < clock.today;
			const nightOpen = nightExpanded.has(i);
			const nightW = nightOpen ? nightW_expanded : NIGHT_COLLAPSED_W;

			layouts.push({
				ms,
				name: fmtDay(ms, clock.today, { short: true }),
				today: isToday,
				past: isPast,
				dayX: x,
				dayWidth: dayW_day,
				nightX: x + dayW_day,
				nightW,
				nightOpen,
			});

			x += dayW_day + nightW;
		}

		return layouts;
	});

	const totalW = $derived(() => {
		const last = dayLayouts[dayLayouts.length - 1];
		return last ? last.nightX + last.nightW : 0;
	});

	/** Convert an absolute timestamp to a pixel X position */
	function timeToPx(ms: number): number {
		for (let i = 0; i < dayLayouts.length; i++) {
			const d = dayLayouts[i];
			const dayStart = d.ms;
			const dayEnd = dayStart + DAY_MS;

			if (ms < dayStart || ms >= dayEnd) continue;

			const hourOfDay = (ms - dayStart) / HOUR_MS;

			if (hourOfDay < NIGHT_END) {
				// Before 6am — we're in the previous day's night block
				// This is handled by the previous day's layout, so skip
				// Actually: this IS this day's early morning
				// Early morning (00:00–06:00) is part of prev day's night block
				if (i > 0) {
					const prev = dayLayouts[i - 1];
					if (prev.nightOpen) {
						// Position within the expanded night block
						// Night block covers 22:00 prev → 06:00 this
						// hourOfDay is 0–6, which is 2–8 hours into the night
						const nightFrac = (hourOfDay + (24 - NIGHT_START)) / NIGHT_HOURS;
						return prev.nightX + nightFrac * prev.nightW;
					} else {
						// Collapsed — map into the tiny strip
						const nightFrac = (hourOfDay + (24 - NIGHT_START)) / NIGHT_HOURS;
						return prev.nightX + nightFrac * prev.nightW;
					}
				}
				// First day: treat as start
				return d.dayX;
			}

			if (hourOfDay >= NIGHT_START) {
				// 22:00+ — in this day's night block
				if (d.nightOpen) {
					const nightFrac = (hourOfDay - NIGHT_START) / NIGHT_HOURS;
					return d.nightX + nightFrac * d.nightW;
				} else {
					const nightFrac = (hourOfDay - NIGHT_START) / NIGHT_HOURS;
					return d.nightX + nightFrac * d.nightW;
				}
			}

			// Daytime (06:00–22:00)
			const dayFrac = (hourOfDay - NIGHT_END) / 16;
			return d.dayX + dayFrac * d.dayWidth;
		}
		// Fallback: beyond range
		const last = dayLayouts[dayLayouts.length - 1];
		return last ? last.nightX + last.nightW : 0;
	}

	/** Convert a pixel X position back to a timestamp (inverse of timeToPx) */
	function pxToTime(px: number): number {
		// Before the first day
		if (dayLayouts.length > 0 && px < dayLayouts[0].dayX) {
			const d = dayLayouts[0];
			const before = d.dayX - px;
			return d.ms + NIGHT_END * HOUR_MS - (before / hourWidth) * HOUR_MS;
		}

		for (let i = 0; i < dayLayouts.length; i++) {
			const d = dayLayouts[i];

			// Daytime region (06:00–22:00)
			if (px >= d.dayX && px < d.dayX + d.dayWidth) {
				const frac = (px - d.dayX) / d.dayWidth;
				const hourOfDay = NIGHT_END + frac * 16;
				return d.ms + hourOfDay * HOUR_MS;
			}

			// Night region (22:00 this day → 06:00 next day)
			if (px >= d.nightX && px < d.nightX + d.nightW) {
				const frac = (px - d.nightX) / d.nightW;
				const hoursIntoNight = frac * NIGHT_HOURS;
				return d.ms + (NIGHT_START + hoursIntoNight) * HOUR_MS;
			}
		}

		// Beyond range — extrapolate from the last layout
		const last = dayLayouts[dayLayouts.length - 1];
		if (last) {
			const past = px - (last.nightX + last.nightW);
			return last.ms + DAY_MS + NIGHT_END * HOUR_MS + (past / hourWidth) * HOUR_MS;
		}
		return origin;
	}

	/** Now-line X position */
	const nowPx = $derived(timeToPx(clock.tick));

	// ─── Event positioning ──────────────────────────────────
	// ─── Layout constants ────────────────────────────────
	const CONTENT_TOP = 56; // below header(38) + tick labels(18)
	const EVENT_GAP = 5;    // px gap between event rows
	const MIN_EVENT_H = 32;

	function fmtDuration(ev: TimelineEvent): string {
		const mins = Math.round((ev.end.getTime() - ev.start.getTime()) / 60000);
		if (mins < 60) return `${mins}min`;
		const h = Math.floor(mins / 60);
		const m = mins % 60;
		return m > 0 ? `${h}h ${m}m` : `${h}h`;
	}

	interface PositionedEvent {
		ev: TimelineEvent;
		x: number;
		width: number;
		row: number;
		groupMaxRow: number;
		topPx: number;
		heightPx: number;
		isCurrent: boolean;
		isDragged: boolean;
	}

	const positionedEvents = $derived.by(() => {
		const now = clock.tick;
		const dragP = drag?.active && drag.mode === 'move' ? drag.payload : null;

		// Separate dragged event from static events
		const staticEvents: typeof events = [];
		let draggedEv: TimelineEvent | null = null;
		for (const ev of events) {
			if (dragP?.eventId === ev.id) draggedEv = ev;
			else staticEvents.push(ev);
		}

		// Build static (non-dragged) layout — stable during drag
		const sorted = [...staticEvents].sort(
			(a, b) => a.start.getTime() - b.start.getTime(),
		);

		const infos = sorted.map((ev) => {
			const startMs = ev.start.getTime();
			const endMs = ev.end.getTime();
			const x = timeToPx(startMs);
			const xEnd = timeToPx(endMs);
			return {
				ev,
				x,
				width: Math.max(xEnd - x, 28),
				row: 0,
				groupMaxRow: 1,
				isCurrent: startMs <= now && endMs > now,
				isDragged: false,
				startMs,
				endMs,
			};
		});

		// Build overlap groups using union-find
		const par = infos.map((_, i) => i);
		function find(i: number): number {
			while (par[i] !== i) { par[i] = par[par[i]]; i = par[i]; }
			return i;
		}

		for (let i = 0; i < infos.length; i++) {
			for (let j = i + 1; j < infos.length; j++) {
				if (infos[j].startMs < infos[i].endMs) {
					par[find(i)] = find(j);
				} else {
					break; // sorted by start; no further overlaps
				}
			}
		}

		// Group events by root
		const groups = new Map<number, number[]>();
		for (let i = 0; i < infos.length; i++) {
			const root = find(i);
			if (!groups.has(root)) groups.set(root, []);
			groups.get(root)!.push(i);
		}

		// Assign rows per overlap group (greedy interval packing)
		for (const [, indices] of groups) {
			const rows: number[] = [];
			for (const idx of indices) {
				const inf = infos[idx];
				let row = 0;
				for (let r = 0; r < rows.length; r++) {
					if (rows[r] <= inf.startMs) {
						row = r;
						rows[r] = inf.endMs;
						break;
					}
					row = r + 1;
				}
				if (row >= rows.length) rows.push(inf.endMs);
				infos[idx].row = row;
			}
			const maxR = rows.length;
			for (const idx of indices) {
				infos[idx].groupMaxRow = maxR;
			}
		}

		// Calculate pixel sizes — events stretch to fill available height
		const availH = height - CONTENT_TOP - 8;
		const result: PositionedEvent[] = infos.map(({ startMs: _s, endMs: _e, ...info }) => {
			const laneH = Math.max(MIN_EVENT_H, availH / info.groupMaxRow - EVENT_GAP);
			const topPx = CONTENT_TOP + info.row * (availH / info.groupMaxRow);
			return { ...info, topPx, heightPx: laneH };
		});

		// Append dragged event as floating overlay (not in layout)
		if (draggedEv && dragP) {
			const dStartMs = dragP.start.getTime();
			const dEndMs = dragP.end.getTime();
			const x = timeToPx(dStartMs);
			const xEnd = timeToPx(dEndMs);
			result.push({
				ev: draggedEv,
				x,
				width: Math.max(xEnd - x, 28),
				row: 0,
				groupMaxRow: 1,
				topPx: CONTENT_TOP,
				heightPx: Math.max(MIN_EVENT_H, availH - EVENT_GAP),
				isCurrent: draggedEv.start.getTime() <= now && draggedEv.end.getTime() > now,
				isDragged: true,
			});
		}

		return result;
	});

	// ─── Night toggle ───────────────────────────────────────
	function toggleNight(dayIndex: number) {
		const next = new Set(nightExpanded);
		if (next.has(dayIndex)) next.delete(dayIndex);
		else next.add(dayIndex);
		nightExpanded = next;
	}

	// ─── Lifecycle ──────────────────────────────────────────
	onMount(() => {
		function frame() {
			if (following && el && !dragging) {
				el.scrollLeft = nowPx - el.clientWidth * nowPosition;
			}
			rafId = requestAnimationFrame(frame);
		}
		rafId = requestAnimationFrame(frame);
		return () => cancelAnimationFrame(rafId);
	});

	// ─── Drag-to-scroll ─────────────────────────────────────
	const SCROLL_THRESHOLD = 3;
	let scrollDragPending = false;

	function onPointerDown(e: PointerEvent) {
		if (e.button !== 0) return;
		const target = e.target as HTMLElement;
		if (target.closest('.fs-event')) return;
		// Collapsed night blocks handle their own click (expand)
		const night = target.closest('.fs-night');
		if (night && !night.classList.contains('fs-night--open')) return;
		// Collapse button inside expanded nights
		if (target.closest('.fs-night-toggle')) return;

		dragStartX = e.clientX;
		dragScrollStart = el.scrollLeft;
		scrollDragPending = true;

		// Use window-level listeners so clicks on children aren't blocked
		window.addEventListener('pointermove', onWindowPointerMove);
		window.addEventListener('pointerup', onWindowPointerUp, { once: true });
		window.addEventListener('pointercancel', onWindowPointerUp, { once: true });
	}

	function onWindowPointerMove(e: PointerEvent) {
		const dx = e.clientX - dragStartX;

		if (!dragging && Math.abs(dx) >= SCROLL_THRESHOLD) {
			dragging = true;
			following = false;
		}

		if (dragging) {
			el.scrollLeft = dragScrollStart - dx;
		}
	}

	function onWindowPointerUp() {
		window.removeEventListener('pointermove', onWindowPointerMove);
		scrollDragPending = false;
		dragging = false;
	}

	function userInput() {
		if (!dragging) following = false;
	}

	function jumpNow() {
		following = true;
	}

	// ─── Click-to-create ────────────────────────────────────
	function handleTrackClick(e: MouseEvent) {
		if (!oneventcreate) return;
		// Don't create events when clicking on night blocks or events
		const target = e.target as HTMLElement;
		if (target.closest('.fs-night') || target.closest('.fs-event')) return;

		const track = e.currentTarget as HTMLElement;
		const rect = track.getBoundingClientRect();
		const clickX = e.clientX - rect.left + el.scrollLeft;

		// Find which day this X falls in
		for (const d of dayLayouts) {
			if (clickX >= d.dayX && clickX < d.dayX + d.dayWidth) {
				const frac = (clickX - d.dayX) / d.dayWidth;
				const hour = Math.floor(NIGHT_END + frac * 16);
				const start = new Date(d.ms + hour * 3_600_000);
				const end = new Date(d.ms + (hour + 1) * 3_600_000);
				oneventcreate({ start, end });
				return;
			}
		}
	}

	// ─── Event drag-to-move ───────────────────────────────────────
	const DRAG_THRESHOLD = 5;
	const SNAP_MS = 15 * 60_000; // 15-minute snap
	let evDragStartX = 0;
	let evDragOriginPx = 0;
	let evDragStarted = false;
	let evDragging = $state(false);
	let evDragId = $state<string | null>(null);
	let evDragEvent: TimelineEvent | null = null;

	function onEventPointerDown(e: PointerEvent, ev: TimelineEvent) {
		if (e.button !== 0 || !drag) return;
		e.stopPropagation();
		evDragStartX = e.clientX;
		evDragOriginPx = timeToPx(ev.start.getTime());
		evDragStarted = false;
		evDragId = ev.id;
		evDragEvent = ev;

		// Window-level listeners so pointerup always fires, even outside component
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

		const duration = ev.end.getTime() - ev.start.getTime();
		const rawNewStartMs = pxToTime(evDragOriginPx + dx);
		const snappedStart = Math.round(rawNewStartMs / SNAP_MS) * SNAP_MS;
		drag.updatePointer(new Date(snappedStart), new Date(snappedStart + duration));
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

<div class="fs" style={style || undefined} style:height="{height}px" role="region" aria-label="Day timeline">
	<div
		class="fs-scroll"
		class:fs-grabbing={dragging}
		bind:this={el}
		onwheel={userInput}
		onpointerdown={onPointerDown}
		role="application"
		aria-label="Scrollable day timeline — drag to scroll"
	>
		<div class="fs-track" style:width="{totalW()}px" onclick={handleTrackClick} role="none">
			<!-- Day blocks -->
			{#each dayLayouts as d, i (d.ms)}
				<!-- Daytime block (06:00 – 22:00) -->
				<div
					class="fs-day"
					class:fs-today={d.today}
					class:fs-past={d.past}
					style:left="{d.dayX}px"
					style:width="{d.dayWidth}px"
				>
					<!-- Day header -->
					<div class="fs-day-hd">
						<span class="fs-day-name">{d.name}</span>
					</div>

					<!-- Hour ticks (06:00 – 21:00) -->
					{#each { length: 16 } as _, h}
						{@const hour = NIGHT_END + h}
						{@const x = h * hourWidth}
						<div class="fs-tick" style:left="{x}px">
							<span class="fs-tick-lb">{fmtH(hour)}</span>
						</div>
						<div class="fs-tick fs-tick--half" style:left="{x + hourWidth * 0.5}px"></div>
					{/each}
				</div>

				<!-- Night block (22:00 – 06:00 next day) -->
				{#if i < count - 1}
					<div
						class="fs-night"
						class:fs-night--open={d.nightOpen}
						style:left="{d.nightX}px"
						style:width="{d.nightW}px"
						role="button"
						tabindex="0"
						aria-label={d.nightOpen ? 'Collapse night hours' : 'Expand night hours, 10pm to 6am'}
						aria-expanded={d.nightOpen}
						onclick={(e) => { e.stopPropagation(); toggleNight(i); }}
						onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); toggleNight(i); } }}
					>
						{#if d.nightOpen}
							<!-- Expanded night: show hour ticks -->
							{#each { length: NIGHT_HOURS } as _, h}
								{@const hour = (NIGHT_START + h) % 24}
								{@const x = h * hourWidth}
								<div class="fs-tick fs-tick--night" style:left="{x}px">
									<span class="fs-tick-lb">{fmtH(hour)}</span>
								</div>
							{/each}
							<button class="fs-night-toggle" onclick={(e) => { e.stopPropagation(); toggleNight(i); }}>
								Collapse night
							</button>
						{:else}
							<!-- Collapsed night: simple dark band -->
							<div class="fs-night-band">
								<span class="fs-night-label">10pm – 6am</span>
								<span class="fs-night-chevron" aria-hidden="true">‹ expand ›</span>
							</div>
						{/if}
					</div>
				{/if}
			{/each}

			<!-- Now line -->
			<div class="fs-now" style:left="{nowPx}px">
				<span class="fs-now-tag">{clock.hm}<span class="fs-now-sec">{clock.s}</span></span>
				<div class="fs-now-line"></div>
			</div>

			<!-- Events (stretched vertically to fill available height) -->
			{#each positionedEvents as p (p.ev.id)}
				<div
					class="fs-event"
					class:fs-event--selected={selectedEventId === p.ev.id}
					class:fs-event--current={p.isCurrent}
					class:fs-event--dragging={p.isDragged}
					style:left="{p.x}px"
					style:width="{p.width}px"
					style:top="{p.topPx}px"
					style:height="{p.heightPx}px"
					style:--ev-color={p.ev.color ?? 'var(--dt-accent)'}
					role="button"
					tabindex="0"
					aria-label="{p.ev.title}{p.isCurrent ? ' (in progress)' : ''}"
					onpointerdown={(e) => onEventPointerDown(e, p.ev)}
					onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); oneventclick?.(p.ev); } }}
				>
					<div class="fs-ev-inner">
						{#if p.isCurrent}
							<span class="fs-ev-live" aria-hidden="true"></span>
						{/if}
						{#if p.heightPx > 64}
							<span class="fs-ev-time">
								{p.ev.start.getHours().toString().padStart(2, '0')}:{p.ev.start.getMinutes().toString().padStart(2, '0')}{p.ev.start.getHours() < 12 ? 'AM' : 'PM'} – {p.ev.end.getHours().toString().padStart(2, '0')}:{p.ev.end.getMinutes().toString().padStart(2, '0')}{p.ev.end.getHours() < 12 ? 'AM' : 'PM'}
							</span>
						{/if}
						<span class="fs-ev-title">{p.ev.title}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Jump to now -->
	{#if !following}
		<button class="fs-btn" onclick={jumpNow} transition:fly={{ y: 6, duration: 180 }}>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
			>
				<circle cx="12" cy="12" r="10" />
				<circle cx="12" cy="12" r="3" fill="currentColor" />
			</svg>
			Now
		</button>
	{/if}
</div>

<style>
	/* ─── Container ──────────────────────────────────── */
	.fs {
		--dt-bg: #0b0e14;
		--dt-surface: #10141c;
		--dt-border: rgba(148, 163, 184, 0.07);
		--dt-border-day: rgba(148, 163, 184, 0.14);
		--dt-text: rgba(226, 232, 240, 0.92);
		--dt-text-2: rgba(148, 163, 184, 0.72);
		--dt-text-3: rgba(100, 116, 139, 0.7);
		--dt-accent: #ef4444;
		--dt-accent-dim: rgba(239, 68, 68, 0.18);
		--dt-glow: rgba(239, 68, 68, 0.35);
		--dt-today-bg: rgba(239, 68, 68, 0.025);
		--dt-btn-text: #fff;
		--dt-scrollbar: rgba(148, 163, 184, 0.12);
		--dt-night: #06080d;
		--dt-mono: 'SF Mono', 'Cascadia Code', 'Fira Code', Consolas, monospace;
		--dt-sans: system-ui, -apple-system, 'Segoe UI', sans-serif;

		position: relative;
		background: var(--dt-bg);
		border: 1px solid var(--dt-border);
		border-radius: 10px;
		overflow: hidden;
		user-select: none;
		font-variant-numeric: tabular-nums;
	}

	/* ─── Horizontal scroll ──────────────────────────── */
	.fs-scroll {
		width: 100%;
		height: 100%;
		overflow-x: auto;
		overflow-y: hidden;
		touch-action: pan-x;
		cursor: grab;
		scrollbar-width: thin;
		scrollbar-color: var(--dt-scrollbar) transparent;
	}

	.fs-scroll::-webkit-scrollbar {
		height: 5px;
	}

	.fs-scroll::-webkit-scrollbar-thumb {
		background: var(--dt-scrollbar);
		border-radius: 4px;
	}

	.fs-scroll::-webkit-scrollbar-track {
		background: transparent;
	}

	.fs-grabbing {
		cursor: grabbing;
	}

	.fs-track {
		position: relative;
		height: 100%;
	}

	/* ─── Day block ──────────────────────────────────── */
	.fs-day {
		position: absolute;
		top: 0;
		height: 100%;
		border-left: 1px solid var(--dt-border-day);
		box-sizing: border-box;
		transition: background 0.2s;
	}

	.fs-day:first-of-type {
		border-left: none;
	}

	.fs-today {
		background: var(--dt-today-bg);
	}

	.fs-past {
		opacity: 0.7;
	}

	/* Day header */
	.fs-day-hd {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		height: 38px;
		box-sizing: border-box;
		border-bottom: 1px solid var(--dt-border);
	}

	.fs-day-name {
		font: 600 12px / 1 var(--dt-sans);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--dt-text-2);
		white-space: nowrap;
	}

	.fs-today .fs-day-name {
		color: var(--dt-accent);
	}

	/* ─── Hour ticks ─────────────────────────────────── */
	.fs-tick {
		position: absolute;
		top: 38px;
		bottom: 0;
		width: 0;
	}

	.fs-tick::before {
		content: '';
		position: absolute;
		top: 18px;
		bottom: 0;
		width: 1px;
		background: var(--dt-border);
	}

	.fs-tick-lb {
		position: absolute;
		top: 2px;
		left: 5px;
		font: 500 10px / 1 var(--dt-mono);
		color: var(--dt-text-3);
		white-space: nowrap;
		pointer-events: none;
	}

	.fs-tick--half {
		bottom: auto;
		height: calc(18px + 8px);
	}

	.fs-tick--half::before {
		top: 18px;
		height: 6px;
		bottom: auto;
		opacity: 0.4;
	}

	.fs-tick--night::before {
		opacity: 0.3;
	}

	.fs-tick--night .fs-tick-lb {
		opacity: 0.5;
	}

	/* ─── Night block ────────────────────────────────── */
	.fs-night {
		position: absolute;
		top: 0;
		height: 100%;
		background: var(--dt-night);
		cursor: pointer;
		transition: width 0.3s ease;
		overflow: hidden;
		border-left: 1px solid rgba(148, 163, 184, 0.04);
		border-right: 1px solid rgba(148, 163, 184, 0.04);
	}

	.fs-night--open {
		cursor: default;
		background: color-mix(in srgb, var(--dt-night) 90%, var(--dt-bg));
	}

	/* Collapsed night: simple dark band */
	.fs-night-band {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		gap: 4px;
		writing-mode: vertical-rl;
		text-orientation: mixed;
		transform: rotate(180deg);
	}

	.fs-night-label {
		font: 500 10px / 1 var(--dt-sans);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--dt-text-3);
		white-space: nowrap;
	}

	.fs-night-chevron {
		font: 400 9px / 1 var(--dt-sans);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--dt-text-3);
		opacity: 0.5;
	}

	.fs-night-toggle {
		position: absolute;
		top: 8px;
		right: 8px;
		z-index: 2;
		font: 500 10px / 1 var(--dt-sans);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--dt-text-3);
		background: rgba(148, 163, 184, 0.06);
		border: 1px solid rgba(148, 163, 184, 0.08);
		padding: 4px 10px;
		border-radius: 4px;
		cursor: pointer;
		transition: color 0.15s;
	}

	.fs-night-toggle:hover {
		color: var(--dt-text-2);
	}

	/* ─── Now-line ────────────────────────────────────── */
	.fs-now {
		position: absolute;
		top: 0;
		bottom: 0;
		z-index: 10;
		pointer-events: none;
		transform: translateX(-1px);
	}

	.fs-now-line {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 2px;
		background: var(--dt-accent);
		box-shadow: 0 0 8px var(--dt-glow);
	}

	.fs-now-tag {
		position: absolute;
		top: 8px;
		left: 8px;
		font: 700 11px / 1 var(--dt-mono);
		color: var(--dt-accent);
		background: color-mix(in srgb, var(--dt-bg) 92%, var(--dt-accent));
		border: 1px solid var(--dt-accent-dim);
		padding: 3px 6px;
		border-radius: 4px;
		white-space: nowrap;
		z-index: 1;
	}

	.fs-now-sec {
		font-weight: 400;
		opacity: 0.5;
		font-size: 10px;
	}

	/* ─── Jump button ────────────────────────────────── */
	.fs-btn {
		position: absolute;
		bottom: 14px;
		right: 14px;
		z-index: 20;
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 5px 13px 5px 9px;
		font: 600 11px / 1 var(--dt-sans);
		color: var(--dt-btn-text);
		background: var(--dt-accent);
		border: none;
		border-radius: 100px;
		cursor: pointer;
		box-shadow: 0 2px 16px var(--dt-glow);
		transition:
			transform 120ms ease,
			box-shadow 120ms ease;
	}

	.fs-btn svg {
		width: 13px;
		height: 13px;
	}

	.fs-btn:hover {
		transform: scale(1.06);
		box-shadow: 0 4px 24px var(--dt-glow);
	}

	.fs-btn:active {
		transform: scale(0.96);
	}

	/* ─── Events ─────────────────────────────────────── */
	.fs-event {
		position: absolute;
		z-index: 6;
		border-radius: 6px;
		cursor: pointer;
		background: color-mix(in srgb, var(--ev-color) 15%, transparent);
		border-top: 3px solid var(--ev-color);
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			box-shadow 120ms,
			background 120ms;
	}

	.fs-event:hover {
		background: color-mix(in srgb, var(--ev-color) 28%, transparent);
		box-shadow: 0 2px 12px color-mix(in srgb, var(--ev-color) 25%, transparent);
	}

	.fs-event--selected {
		box-shadow:
			0 0 0 2px var(--ev-color),
			0 2px 14px color-mix(in srgb, var(--ev-color) 35%, transparent);
	}

	.fs-event--current {
		background: color-mix(in srgb, var(--ev-color) 22%, transparent);
		box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--ev-color) 20%, transparent);
	}

	.fs-event--dragging {
		opacity: 0.85;
		z-index: 50;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
		cursor: grabbing;
		transition: none;
	}

	/* Inner wrapper: rotated 180° vertical-rl = bottom-to-top reading */
	.fs-ev-inner {
		writing-mode: vertical-rl;
		transform: rotate(180deg);
		display: flex;
		align-items: center;
		gap: 6px;
		max-height: 100%;
		overflow: hidden;
		padding: 8px 4px;
	}

	.fs-ev-live {
		flex-shrink: 0;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--ev-color);
	}

	.fs-ev-title {
		font: 600 13px / 1.15 var(--dt-sans);
		color: var(--dt-text);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.fs-ev-time {
		font: 400 10px / 1 var(--dt-mono);
		color: var(--dt-text-2);
		opacity: 0.7;
		white-space: nowrap;
	}

	/* ─── Focus-visible (accessibility) ──────────── */
	.fs-event:focus-visible,
	.fs-night:focus-visible {
		outline: 2px solid var(--dt-accent);
		outline-offset: 2px;
	}

	.fs-night:hover {
		background: color-mix(in srgb, var(--dt-night) 85%, var(--dt-text-3));
	}
</style>
