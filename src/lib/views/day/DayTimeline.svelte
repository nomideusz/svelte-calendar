<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { createClock } from '../../core/clock.svelte.js';
	import type { DayTimelineProps } from '../../core/types.js';
	import type { DragState } from '../../engine/drag.svelte.js';
	import { DAY_MS, HOUR_MS, HOURS, sod } from '../../core/time.js';
	import { fmtH, fmtDay } from '../../core/locale.js';

	let {
		pastDays = 1,
		futureDays = 30,
		hourWidth = 120,
		nowPosition = 0.25,
		events = [],
		style = '',
		focusDate,
		oneventclick,
		selectedEventId = null,
	}: DayTimelineProps = $props();

	// ── Drag support (available when inside Calendar) ──
	const drag = getContext<DragState>('calendar:drag') as DragState | undefined;
	const commitDragCtx = getContext<() => void>('calendar:commitDrag') as (() => void) | undefined;

	const clock = createClock();

	let following = $state(true);
	let dragging = $state(false);
	let rafId = 0;
	let dragStartX = 0;
	let dragScrollStart = 0;
	let el: HTMLDivElement;

	// ─── Derived ────────────────────────────────────────────
	const dayW = $derived(hourWidth * 24);
	const count = $derived(pastDays + 1 + futureDays);
	const totalW = $derived(count * dayW);
	/** When focusDate is set, centre the timeline on that date */
	const centerMs = $derived(focusDate ? sod(focusDate.getTime()) : clock.today);
	const origin = $derived(centerMs - pastDays * DAY_MS);
	const nowPx = $derived(((clock.tick - origin) / HOUR_MS) * hourWidth);

	const days = $derived.by(() => {
		const out: { ms: number; x: number; name: string; today: boolean }[] = [];
		for (let i = 0; i < count; i++) {
			const ms = origin + i * DAY_MS;
			out.push({
				ms,
				x: i * dayW,
				name: fmtDay(ms, clock.today),
				today: ms === clock.today
			});
		}
		return out;
	});

	// ─── Lifecycle ──────────────────────────────────────────
	onMount(() => {
		function frame() {
			if (following && el && !dragging) {
				const now = Date.now();
				const px = ((now - origin) / HOUR_MS) * hourWidth;
				el.scrollLeft = px - el.clientWidth * nowPosition;
			}
			rafId = requestAnimationFrame(frame);
		}
		rafId = requestAnimationFrame(frame);
		return () => cancelAnimationFrame(rafId);
	});

	// ─── Drag-to-scroll ────────────────────────────────────
	const SCROLL_THRESHOLD = 3;

	function onPointerDown(e: PointerEvent) {
		if (e.button !== 0) return;
		const target = e.target as HTMLElement;
		if (target.closest('.dt-event')) return;
		dragStartX = e.clientX;
		dragScrollStart = el.scrollLeft;

		window.addEventListener('pointermove', onScrollPointerMove);
		window.addEventListener('pointerup', onScrollPointerUp, { once: true });
		window.addEventListener('pointercancel', onScrollPointerUp, { once: true });
	}

	function onScrollPointerMove(e: PointerEvent) {
		const dx = e.clientX - dragStartX;
		if (!dragging && Math.abs(dx) >= SCROLL_THRESHOLD) {
			dragging = true;
			following = false;
		}
		if (dragging) {
			el.scrollLeft = dragScrollStart - dx;
		}
	}

	function onScrollPointerUp() {
		window.removeEventListener('pointermove', onScrollPointerMove);
		dragging = false;
	}

	function userInput() {
		if (!dragging) following = false;
	}

	function jumpNow() {
		following = true;
	}

	// ─── Event positioning (horizontal) ─────────────────────
	import type { TimelineEvent } from '../../core/types.js';

	interface PositionedEvent {
		ev: TimelineEvent;
		x: number;
		width: number;
		row: number;
		isDragged: boolean;
	}

	const positionedEvents = $derived.by(() => {
		const result: PositionedEvent[] = [];
		const dragP = drag?.active && drag.mode === 'move' ? drag.payload : null;

		const raw = events.map((ev) => {
			const isDragged = dragP?.eventId === ev.id;
			const startMs = isDragged ? dragP!.start.getTime() : ev.start.getTime();
			const endMs = isDragged ? dragP!.end.getTime() : ev.end.getTime();
			return { ev, startMs, endMs, isDragged };
		});
		raw.sort((a, b) => a.startMs - b.startMs);

		// Simple row-packing for overlap
		const rows: number[] = [];

		for (const { ev, startMs, endMs, isDragged } of raw) {
			const x = ((startMs - origin) / HOUR_MS) * hourWidth;
			const w = Math.max(((endMs - startMs) / HOUR_MS) * hourWidth, 20);

			let row = 0;
			for (let r = 0; r < rows.length; r++) {
				if (rows[r] <= startMs) {
					row = r;
					rows[r] = endMs;
					break;
				}
				row = r + 1;
			}
			if (row >= rows.length) rows.push(endMs);

			result.push({ ev, x, width: w, row, isDragged });
		}
		return result;
	});

	// ─── Event drag-to-move ───────────────────────────────────────
	const DRAG_THRESHOLD = 5;
	const SNAP_MS = 15 * 60_000;
	let evDragStartX = 0;
	let evDragStarted = false;
	let evDragging = $state(false);
	let evDragId = $state<string | null>(null);
	let evDragEvent: TimelineEvent | null = null;

	function onEventPointerDown(e: PointerEvent, ev: TimelineEvent) {
		if (e.button !== 0 || !drag) return;
		e.stopPropagation();
		evDragStartX = e.clientX;
		evDragStarted = false;
		evDragId = ev.id;
		evDragEvent = ev;

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

		const rawDeltaMs = (dx / hourWidth) * HOUR_MS;
		const snappedDelta = Math.round(rawDeltaMs / SNAP_MS) * SNAP_MS;
		drag.updatePointer(
			new Date(ev.start.getTime() + snappedDelta),
			new Date(ev.end.getTime() + snappedDelta),
		);
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

<div class="dt" style={style || undefined}>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="dt-scroll"
		class:dt-grabbing={dragging}
		bind:this={el}
		onwheel={userInput}
		onpointerdown={onPointerDown}
	>
		<div class="dt-track" style:width="{totalW}px">
			{#each days as d (d.ms)}
				<div class="dt-day" class:dt-today={d.today} style:left="{d.x}px" style:width="{dayW}px">
					<div class="dt-day-hd">
						<span class="dt-day-nm">{d.name}</span>
					</div>
				</div>

				{#each HOURS as h}
					{@const x = d.x + h * hourWidth}
					<div class="dt-tick" style:left="{x}px">
						<span class="dt-tick-lb">{fmtH(h)}</span>
					</div>
					<div class="dt-tick dt-tick--h" style:left="{x + hourWidth * 0.5}px"></div>
				{/each}
			{/each}

			<div class="dt-now" style:left="{nowPx}px">
				<span class="dt-now-tag">{clock.hm}<span class="dt-now-sec">{clock.s}</span></span>
				<div class="dt-now-line"></div>
			</div>

			<!-- Events -->
			{#each positionedEvents as p (p.ev.id)}
				<div
					class="dt-event"
					class:dt-event--selected={selectedEventId === p.ev.id}
					class:dt-event--dragging={p.isDragged}
					style:left="{p.x}px"
					style:width="{p.width}px"
					style:top="calc(38px + {p.row * 34}px)"
					style:--ev-color={p.ev.color ?? 'var(--dt-accent)'}
					role="button"
					tabindex="0"
					onpointerdown={(e) => onEventPointerDown(e, p.ev)}
					onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); oneventclick?.(p.ev); } }}
				>
					<span class="dt-ev-title">{p.ev.title}</span>
					{#if p.ev.subtitle}
						<span class="dt-ev-sub">{p.ev.subtitle}</span>
					{/if}
					{#if p.ev.tags?.length}
						{#each p.ev.tags as tag}
							<span class="dt-ev-tag">{tag}</span>
						{/each}
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<div class="dt-fog dt-fog--l"></div>
	<div class="dt-fog dt-fog--r"></div>

	{#if !following}
		<button class="dt-btn" onclick={jumpNow} transition:fly={{ y: 6, duration: 180 }}>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
				<circle cx="12" cy="12" r="10" />
				<circle cx="12" cy="12" r="3" fill="currentColor" />
			</svg>
			Now
		</button>
	{/if}
</div>

<style>
	.dt {
		--dt-bg: #0b0e14;
		--dt-surface: #10141c;
		--dt-border: rgba(148, 163, 184, 0.07);
		--dt-border-day: rgba(148, 163, 184, 0.14);
		--dt-text: rgba(226, 232, 240, 0.85);
		--dt-text-2: rgba(148, 163, 184, 0.55);
		--dt-text-3: rgba(100, 116, 139, 0.55);
		--dt-accent: #ef4444;
		--dt-accent-dim: rgba(239, 68, 68, 0.18);
		--dt-glow: rgba(239, 68, 68, 0.35);
		--dt-today-bg: rgba(239, 68, 68, 0.02);
		--dt-btn-text: #fff;
		--dt-scrollbar: rgba(148, 163, 184, 0.12);
		--dt-header: 34px;
		--dt-ruler: 16px;
		--dt-mono: 'SF Mono', 'Cascadia Code', 'Fira Code', Consolas, monospace;
		--dt-sans: system-ui, -apple-system, 'Segoe UI', sans-serif;

		position: relative;
		height: 160px;
		background: var(--dt-bg);
		border: 1px solid var(--dt-border);
		border-radius: 10px;
		overflow: hidden;
		user-select: none;
		font-variant-numeric: tabular-nums;
	}

	.dt-scroll {
		width: 100%;
		height: 100%;
		overflow-x: auto;
		overflow-y: hidden;
		touch-action: pan-x;
		cursor: grab;
		scrollbar-width: thin;
		scrollbar-color: var(--dt-scrollbar) transparent;
	}
	.dt-scroll::-webkit-scrollbar { height: 5px; }
	.dt-scroll::-webkit-scrollbar-thumb { background: var(--dt-scrollbar); border-radius: 4px; }
	.dt-scroll::-webkit-scrollbar-track { background: transparent; }
	.dt-grabbing { cursor: grabbing; }

	.dt-track { position: relative; height: 100%; }

	.dt-day {
		position: absolute;
		top: 0;
		height: 100%;
		border-left: 1px solid var(--dt-border-day);
		box-sizing: border-box;
	}
	.dt-day:first-of-type { border-left: none; }
	.dt-today { background: var(--dt-today-bg); }

	.dt-day-hd {
		display: flex;
		align-items: baseline;
		gap: 8px;
		padding: 9px 14px;
		height: var(--dt-header);
		box-sizing: border-box;
		border-bottom: 1px solid var(--dt-border);
	}
	.dt-day-nm {
		font: 600 11px / 1 var(--dt-sans);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--dt-text-2);
		white-space: nowrap;
	}
	.dt-today .dt-day-nm { color: var(--dt-accent); }

	.dt-tick {
		position: absolute;
		top: var(--dt-header);
		bottom: 0;
		width: 0;
	}
	.dt-tick::before {
		content: '';
		position: absolute;
		top: var(--dt-ruler);
		bottom: 0;
		width: 1px;
		background: var(--dt-border);
	}
	.dt-tick-lb {
		position: absolute;
		top: 1px;
		left: 5px;
		font: 500 9px / 1 var(--dt-mono);
		color: var(--dt-text-3);
		white-space: nowrap;
		pointer-events: none;
	}
	.dt-tick--h {
		bottom: auto;
		height: calc(var(--dt-ruler) + 8px);
	}
	.dt-tick--h::before {
		top: var(--dt-ruler);
		height: 6px;
		bottom: auto;
		opacity: 0.45;
	}

	.dt-now {
		position: absolute;
		top: 0;
		bottom: 0;
		z-index: 10;
		pointer-events: none;
		transform: translateX(-1px);
	}
	.dt-now-line {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		width: 2px;
		background: var(--dt-accent);
		box-shadow: 0 0 10px var(--dt-glow), 0 0 24px var(--dt-accent-dim);
		animation: now-pulse 3s ease-in-out infinite;
	}
	@keyframes now-pulse {
		0%, 100% { box-shadow: 0 0 10px var(--dt-glow), 0 0 24px var(--dt-accent-dim); }
		50% { box-shadow: 0 0 16px var(--dt-glow), 0 0 36px var(--dt-glow); }
	}
	.dt-now-tag {
		position: absolute;
		top: 7px;
		left: 8px;
		font: 700 10px / 1 var(--dt-mono);
		color: var(--dt-accent);
		background: var(--dt-bg);
		border: 1px solid var(--dt-accent-dim);
		padding: 3px 6px;
		border-radius: 4px;
		white-space: nowrap;
		z-index: 1;
	}
	.dt-now-sec { font-weight: 400; opacity: 0.5; font-size: 9px; }

	.dt-fog {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 48px;
		pointer-events: none;
		z-index: 5;
	}
	.dt-fog--l { left: 0; background: linear-gradient(to right, var(--dt-bg), transparent); }
	.dt-fog--r { right: 0; background: linear-gradient(to left, var(--dt-bg), transparent); }

	.dt-btn {
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
		transition: transform 120ms ease, box-shadow 120ms ease;
	}
	.dt-btn svg { width: 13px; height: 13px; }
	.dt-btn:hover { transform: scale(1.06); box-shadow: 0 4px 24px var(--dt-glow); }
	.dt-btn:active { transform: scale(0.96); }

	/* ─── Events ─────────────────────────────────────── */
	.dt-event {
		position: absolute;
		height: 28px;
		z-index: 6;
		border-radius: 5px;
		padding: 0 8px;
		display: flex;
		align-items: center;
		gap: 4px;
		cursor: pointer;
		background: color-mix(in srgb, var(--ev-color) 22%, transparent);
		border-left: 3px solid var(--ev-color);
		transition: box-shadow 120ms, transform 80ms;
	}
	.dt-event:hover {
		box-shadow: 0 2px 10px color-mix(in srgb, var(--ev-color) 30%, transparent);
		transform: translateY(-1px);
	}
	.dt-event--selected {
		box-shadow: 0 0 0 2px var(--ev-color), 0 2px 12px color-mix(in srgb, var(--ev-color) 40%, transparent);
	}
	.dt-event--dragging {
		opacity: 0.85;
		z-index: 50;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35);
		cursor: grabbing;
		transition: none;
	}
	.dt-ev-title {
		font: 600 10px / 1 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		color: var(--dt-text, #e2e8f0);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.dt-ev-sub {
		font: 400 9px / 1 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		color: var(--dt-text-2, rgba(148, 163, 184, 0.6));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.dt-ev-tag {
		font: 500 7px / 1 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		color: var(--ev-color, var(--dt-accent));
		background: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 20%, transparent);
		padding: 1px 3px;
		border-radius: 2px;
		white-space: nowrap;
		flex-shrink: 0;
	}
</style>
