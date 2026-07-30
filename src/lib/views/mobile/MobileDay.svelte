<!--
  MobileDay — touch-first single-day view.

  Vertical time grid (hours top → bottom). Scrolls vertically.
  Large touch targets, swipe left/right to change day.
  Events positioned absolutely within hour lanes.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { useCalendarContext } from '../shared/context.svelte.js';
	import EventContent from '../shared/EventContent.svelte';
	import { createClock } from '../../core/clock.svelte.js';
	import type { TimelineEvent, BlockedSlot } from '../../core/types.js';
	import { DAY_MS, HOUR_MS, sod, isAllDay, isMultiDay, segmentForDay } from '../../core/time.js';
	import type { DaySegment } from '../../core/time.js';
	import { fmtH, fmtTime, getLabels } from '../../core/locale.js';

	const L = $derived(getLabels());

	interface Props {
		height?: number | null;
		events?: TimelineEvent[];
		style?: string;
		focusDate?: Date;
		locale?: string;
		oneventclick?: (event: TimelineEvent) => void;
		oneventcreate?: (range: { start: Date; end: Date }) => void;
		selectedEventId?: string | null;
		readOnly?: boolean;
		visibleHours?: [number, number];
		[key: string]: unknown;
	}

	let {
		height = null,
		events = [],
		style = '',
		locale,
		focusDate,
		oneventclick,
		oneventcreate,
		selectedEventId = null,
		readOnly = false,
		visibleHours,
	}: Props = $props();

	// ── Context ────────────────────────────────────────
	const ctx = useCalendarContext();
	const viewState = $derived(ctx.viewState);
	const autoHeight = $derived(ctx.autoHeight);
	const oneventhover = $derived(ctx.oneventhover);
	const disabledSet = $derived(ctx.disabledSet);
	const loadRangeCtx = $derived(ctx.loadRange);
	const minDuration = $derived(ctx.minDuration);
	const blockedSlots = $derived(ctx.blockedSlots);
	const drag = $derived(ctx.drag);
	const commitDragCtx = $derived(ctx.commitDrag);
	const SNAP_MS = $derived(ctx.snapInterval * 60_000);

	const clock = createClock();

	// ── Config ─────────────────────────────────────────
	const HOUR_HEIGHT = 64;
	const GUTTER_W = 40;
	const startHour = $derived(visibleHours?.[0] ?? 0);
	const endHour = $derived(visibleHours?.[1] ?? 24);
	const hourCount = $derived(Math.max(1, endHour - startHour));
	const gridHeight = $derived(hourCount * HOUR_HEIGHT);

	// ── Day state ──────────────────────────────────────
	const dayMs = $derived(focusDate ? sod(focusDate.getTime()) : clock.today);
	const dayEnd = $derived(dayMs + DAY_MS);
	const isToday = $derived(dayMs === clock.today);
	const isPast = $derived(dayMs < clock.today);
	const isDisabled = $derived(disabledSet.has(dayMs));

	// ── Load range ─────────────────────────────────────
	$effect(() => {
		if (!loadRangeCtx) return;
		const rangeStart = new Date(dayMs - 2 * DAY_MS);
		const rangeEnd = new Date(dayMs + 3 * DAY_MS);
		loadRangeCtx.set({ start: rangeStart, end: rangeEnd });
		return () => loadRangeCtx.set(null);
	});

	// ── Events partition ───────────────────────────────
	const timedEvents = $derived(
		events
			.filter(ev => !isAllDay(ev) && !isMultiDay(ev) && ev.start.getTime() < dayEnd && ev.end.getTime() > dayMs)
			.sort((a, b) => a.start.getTime() - b.start.getTime())
	);

	const allDayEvents = $derived.by(() => {
		const segs: DaySegment[] = [];
		for (const ev of events) {
			if (!isAllDay(ev) && !isMultiDay(ev)) continue;
			const seg = segmentForDay(ev, dayMs);
			if (seg) segs.push(seg);
		}
		return segs;
	});

	// ── Positioned events ──────────────────────────────
	interface PosEvent {
		ev: TimelineEvent;
		top: number;
		height: number;
		left: string;
		width: string;
		isCurrent: boolean;
		isNext: boolean;
		isResizing: boolean;
		col: number;
		totalCols: number;
	}

	const positionedEvents = $derived.by(() => {
		const now = clock.tick;
		const sorted = [...timedEvents];
		const rsP = drag?.active && (drag.mode === 'resize-start' || drag.mode === 'resize-end')
			? drag.payload
			: null;

		// Find the next upcoming event today
		let nextEventId: string | null = null;
		if (isToday) {
			for (const ev of [...sorted].sort((a, b) => a.start.getTime() - b.start.getTime())) {
				const s = ev.start.getTime();
				if (s > now) { nextEventId = ev.id; break; }
			}
		}

		// Overlap grouping
		const infos = sorted.map(ev => {
			// While resizing, this event tracks the tentative drag payload
			const resizing = rsP?.eventId === ev.id;
			const evStart = resizing ? rsP!.start : ev.start;
			const evEnd = resizing ? rsP!.end : ev.end;
			const sMs = Math.max(evStart.getTime(), dayMs + startHour * HOUR_MS);
			const eMs = Math.min(evEnd.getTime(), dayMs + endHour * HOUR_MS);
			const topH = (sMs - dayMs) / HOUR_MS - startHour;
			const botH = (eMs - dayMs) / HOUR_MS - startHour;
			return {
				ev,
				top: topH * HOUR_HEIGHT,
				height: Math.max(24, (botH - topH) * HOUR_HEIGHT),
				isCurrent: ev.start.getTime() <= now && ev.end.getTime() > now,
				isNext: ev.id === nextEventId,
				isResizing: resizing,
				startMs: sMs,
				endMs: eMs,
				col: 0,
				totalCols: 1,
			};
		});

		// Assign columns for overlapping events
		const par = infos.map((_, i) => i);
		function find(i: number): number {
			while (par[i] !== i) { par[i] = par[par[i]]; i = par[i]; }
			return i;
		}
		for (let i = 0; i < infos.length; i++) {
			for (let j = i + 1; j < infos.length; j++) {
				if (infos[j].startMs < infos[i].endMs) par[find(i)] = find(j);
				else break;
			}
		}

		const groups = new Map<number, number[]>();
		for (let i = 0; i < infos.length; i++) {
			const root = find(i);
			if (!groups.has(root)) groups.set(root, []);
			groups.get(root)!.push(i);
		}

		for (const [, indices] of groups) {
			const rows: number[] = [];
			for (const idx of indices) {
				let row = 0;
				for (let r = 0; r < rows.length; r++) {
					if (rows[r] <= infos[idx].startMs) { row = r; rows[r] = infos[idx].endMs; break; }
					row = r + 1;
				}
				if (row >= rows.length) rows.push(infos[idx].endMs);
				infos[idx].col = row;
			}
			for (const idx of indices) infos[idx].totalCols = rows.length;
		}

		return infos.map(info => ({
			ev: info.ev,
			top: info.top,
			height: info.height,
			left: `calc(${GUTTER_W}px + ${(info.col / info.totalCols) * 100}% - ${(GUTTER_W * info.col) / info.totalCols}px)`,
			width: `calc(${100 / info.totalCols}% - ${GUTTER_W / info.totalCols + 2}px)`,
			isCurrent: info.isCurrent,
			isNext: info.isNext,
			isResizing: info.isResizing,
			col: info.col,
			totalCols: info.totalCols,
		})) as PosEvent[];
	});

	// ── Now indicator ──────────────────────────────────
	const nowOffset = $derived.by(() => {
		if (!isToday) return -1;
		const h = (clock.tick - dayMs) / HOUR_MS - startHour;
		if (h < 0 || h > hourCount) return -1;
		return h * HOUR_HEIGHT;
	});

	// ── Blocked slot check ─────────────────────────────
	function isBlockedAt(hour: number): boolean {
		if (!blockedSlots?.length) return false;
		const jsDay = new Date(dayMs).getDay();
		const isoDay = jsDay === 0 ? 7 : jsDay;
		return blockedSlots.some(slot => {
			if (slot.day && slot.day !== isoDay) return false;
			return hour >= slot.start && hour < slot.end;
		});
	}

	// ── Touch swipe navigation ─────────────────────────
	let el: HTMLDivElement;
	let touchStartX = 0;
	let touchStartY = 0;
	let swiping = false;
	let swipeOffset = $state(0);
	const SWIPE_THRESHOLD = 50;

	function onTouchStart(e: TouchEvent) {
		const t = e.touches[0];
		touchStartX = t.clientX;
		touchStartY = t.clientY;
		swiping = true;
		swipeOffset = 0;
	}

	function onTouchMove(e: TouchEvent) {
		if (!swiping) return;
		const t = e.touches[0];
		const dx = t.clientX - touchStartX;
		const dy = t.clientY - touchStartY;
		// Only swipe if horizontal movement dominates
		if (Math.abs(dy) > Math.abs(dx) * 0.8) { swiping = false; return; }
		swipeOffset = dx;
	}

	function onTouchEnd() {
		if (!swiping) { swipeOffset = 0; return; }
		if (Math.abs(swipeOffset) > SWIPE_THRESHOLD) {
			if (swipeOffset > 0) {
				viewState?.prev();
			} else {
				viewState?.next();
			}
		}
		swipeOffset = 0;
		swiping = false;
	}

	// ── Click-to-create ────────────────────────────────
	function handleGridClick(e: MouseEvent) {
		if (suppressGridClick) { suppressGridClick = false; return; }
		if (!oneventcreate || readOnly || isDisabled) return;
		if ((e.target as HTMLElement).closest('.mb-event')) return;
		const grid = (e.currentTarget as HTMLElement);
		const rect = grid.getBoundingClientRect();
		const y = e.clientY - rect.top + grid.scrollTop;
		const hour = startHour + y / HOUR_HEIGHT;
		if (isBlockedAt(hour)) return;
		const snapHour = Math.floor(hour);
		const durMin = minDuration ? Math.max(60, minDuration) : 60;
		const start = new Date(dayMs + snapHour * HOUR_MS);
		const end = new Date(start.getTime() + durMin * 60_000);
		oneventcreate({ start, end });
	}

	// ── Drag-to-create (vertical sweep on empty grid) ──
	// Movement below CREATE_THRESHOLD stays a plain tap (handleGridClick).
	const CREATE_THRESHOLD = 4;
	let suppressGridClick = false;
	let mbCreateStartY = 0;
	let mbCreateAnchorMs = 0;
	let mbCreateStarted = false;

	/** Pointer Y → epoch ms within the day grid (accounts for scroll). */
	function gridTimeMs(clientY: number): number {
		const rect = gridEl.getBoundingClientRect();
		const y = clientY - rect.top + gridEl.scrollTop;
		return dayMs + (startHour + y / HOUR_HEIGHT) * HOUR_MS;
	}

	/** Clamp a timestamp into the visible hour range of this day. */
	function clampToDay(ms: number): number {
		return Math.max(dayMs + startHour * HOUR_MS, Math.min(dayMs + endHour * HOUR_MS, ms));
	}

	function onGridPointerDown(e: PointerEvent) {
		if (e.button !== 0 || !drag || !oneventcreate || readOnly || isDisabled) return;
		if ((e.target as HTMLElement).closest('.mb-event')) return;
		mbCreateStartY = e.clientY;
		mbCreateAnchorMs = gridTimeMs(e.clientY);
		mbCreateStarted = false;
		window.addEventListener('pointermove', onGridCreateMove);
		window.addEventListener('pointerup', onGridCreateUp, { once: true });
		window.addEventListener('pointercancel', onGridCreateCancel, { once: true });
	}

	function onGridCreateMove(e: PointerEvent) {
		if (!drag) return;
		if (!mbCreateStarted) {
			if (Math.abs(e.clientY - mbCreateStartY) < CREATE_THRESHOLD) return;
			mbCreateStarted = true;
			mbCreateAnchorMs = clampToDay(Math.floor(mbCreateAnchorMs / SNAP_MS) * SNAP_MS);
			drag.beginCreate(new Date(mbCreateAnchorMs), new Date(mbCreateAnchorMs + SNAP_MS));
		}
		const snapped = clampToDay(Math.round(gridTimeMs(e.clientY) / SNAP_MS) * SNAP_MS);
		drag.updatePointer(
			new Date(Math.min(mbCreateAnchorMs, snapped)),
			new Date(Math.max(mbCreateAnchorMs + SNAP_MS, snapped)),
		);
	}

	function cleanupGridCreate() {
		window.removeEventListener('pointermove', onGridCreateMove);
		window.removeEventListener('pointerup', onGridCreateUp);
		window.removeEventListener('pointercancel', onGridCreateCancel);
		mbCreateStarted = false;
	}

	function onGridCreateUp() {
		if (drag && mbCreateStarted) {
			// The click event (if any) fires synchronously after pointerup
			suppressGridClick = true;
			commitDragCtx?.();
			setTimeout(() => { suppressGridClick = false; }, 0);
		}
		cleanupGridCreate();
	}

	function onGridCreateCancel() {
		// Touch scroll took over — abandon the tentative create
		if (drag && mbCreateStarted) drag.cancel();
		cleanupGridCreate();
	}

	// ── Event resize (top/bottom edge handles) ─────────
	let suppressEventClick = false;
	let mbRsStartY = 0;
	let mbRsStarted = false;
	let mbRsEdge: 'start' | 'end' = 'end';
	let mbRsEvent: TimelineEvent | null = null;

	function onResizePointerDown(e: PointerEvent, ev: TimelineEvent, edge: 'start' | 'end') {
		if (e.button !== 0 || !drag || readOnly || ev.data?.readOnly) return;
		e.stopPropagation();
		mbRsStartY = e.clientY;
		mbRsStarted = false;
		mbRsEdge = edge;
		mbRsEvent = ev;
		window.addEventListener('pointermove', onResizeMove);
		window.addEventListener('pointerup', onResizeUp, { once: true });
		window.addEventListener('pointercancel', onResizeCancel, { once: true });
	}

	function onResizeMove(e: PointerEvent) {
		const ev = mbRsEvent;
		if (!drag || !ev) return;
		if (!mbRsStarted) {
			if (Math.abs(e.clientY - mbRsStartY) < CREATE_THRESHOLD) return;
			mbRsStarted = true;
			drag.beginResize(ev.id, mbRsEdge, ev.start, ev.end);
		}
		const snapped = clampToDay(Math.round(gridTimeMs(e.clientY) / SNAP_MS) * SNAP_MS);
		if (mbRsEdge === 'end') {
			const end = Math.max(snapped, ev.start.getTime() + SNAP_MS);
			drag.updatePointer(ev.start, new Date(end));
		} else {
			const start = Math.min(snapped, ev.end.getTime() - SNAP_MS);
			drag.updatePointer(new Date(start), ev.end);
		}
	}

	function cleanupResize() {
		window.removeEventListener('pointermove', onResizeMove);
		window.removeEventListener('pointerup', onResizeUp);
		window.removeEventListener('pointercancel', onResizeCancel);
		mbRsStarted = false;
		mbRsEvent = null;
	}

	function onResizeUp() {
		if (drag && mbRsStarted) {
			// The synthesized click can land on the button OR (if the pointer
			// ended off the block) on the grid — suppress both paths.
			suppressEventClick = true;
			suppressGridClick = true;
			commitDragCtx?.();
			setTimeout(() => { suppressEventClick = false; suppressGridClick = false; }, 0);
		}
		cleanupResize();
	}

	function onResizeCancel() {
		if (drag && mbRsStarted) drag.cancel();
		cleanupResize();
	}

	// ── Auto-scroll to now ─────────────────────────────
	let gridEl: HTMLDivElement;
	onMount(() => {
		if (nowOffset > 0 && gridEl) {
			const scrollTarget = Math.max(0, nowOffset - 120);
			gridEl.scrollTop = scrollTarget;
		}
	});
</script>

<div
	class="mb"
	class:mb--auto={autoHeight}
	style={style || undefined}
	style:height={autoHeight ? undefined : (height ? `${height}px` : '100%')}
	role="region"
	aria-label={L.dayPlanner}
	ontouchstart={onTouchStart}
	ontouchmove={onTouchMove}
	ontouchend={onTouchEnd}
>
	<!-- All-day events bar -->
	{#if allDayEvents.length > 0}
		<div class="mb-allday">
			{#each allDayEvents.slice(0, 3) as seg (seg.ev.id)}
				<button
					class="mb-allday-chip"
					class:mb-allday-chip--selected={selectedEventId === seg.ev.id}
					style:--ev-color={seg.ev.color ?? 'var(--dt-accent)'}
					onclick={() => oneventclick?.(seg.ev)}
				>
					<span class="mb-allday-dot"></span>
					<span class="mb-allday-title">{seg.ev.title}</span>
					{#if seg.totalDays > 1}
						<span class="mb-allday-span">{seg.dayIndex}/{seg.totalDays}</span>
					{/if}
				</button>
			{/each}
			{#if allDayEvents.length > 3}
				<span class="mb-allday-more">{L.nMore(allDayEvents.length - 3)}</span>
			{/if}
		</div>
	{/if}

	<!-- Scrollable time grid -->
	<div
		class="mb-grid"
		bind:this={gridEl}
		onclick={handleGridClick}
		onpointerdown={onGridPointerDown}
		onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleGridClick(e as unknown as MouseEvent); }}
		role="grid"
		tabindex="-1"
	>
		<div class="mb-grid-inner" style:height="{gridHeight}px">
			<!-- Hour lanes -->
			{#each { length: hourCount } as _, h}
				{@const hour = startHour + h}
				{@const blocked = isBlockedAt(hour)}
				<div
					class="mb-hour"
					class:mb-hour--blocked={blocked}
					style:top="{h * HOUR_HEIGHT}px"
					style:height="{HOUR_HEIGHT}px"
				>
					<div class="mb-hour-label">{fmtH(hour, locale)}</div>
					<div class="mb-hour-line"></div>
					{#if blocked && blockedSlots}
						{@const slot = blockedSlots.find(s => (!s.day || s.day === (new Date(dayMs).getDay() === 0 ? 7 : new Date(dayMs).getDay())) && hour >= s.start && hour < s.end)}
						{#if slot?.label}
							<span class="mb-blocked-label">{slot.label}</span>
						{/if}
					{/if}
				</div>
			{/each}

			<!-- Now line -->
			{#if nowOffset >= 0}
				<div class="mb-now" style:top="{nowOffset}px">
					<span class="mb-now-label">{clock.hm}</span>
					<div class="mb-now-line"></div>
				</div>
			{/if}

			<!-- Events -->
			{#each positionedEvents as p (p.ev.id)}
				<button
					class="mb-event"
					class:mb-event--selected={selectedEventId === p.ev.id}
					class:mb-event--current={p.isCurrent}
					class:mb-event--next={p.isNext}
					class:mb-event--cancelled={p.ev.status === 'cancelled'}
					class:mb-event--tentative={p.ev.status === 'tentative'}
					class:mb-event--full={p.ev.status === 'full'}
					class:mb-event--limited={p.ev.status === 'limited'}
					class:mb-event--resizing={p.isResizing}
					style:top="{p.top}px"
					style:height="{p.height}px"
					style:left={p.left}
					style:width={p.width}
					style:--ev-color={p.ev.color ?? 'var(--dt-accent)'}
					onclick={(e) => { e.stopPropagation(); if (suppressEventClick) { suppressEventClick = false; return; } oneventclick?.(p.ev); }}
					onpointerenter={() => oneventhover?.(p.ev)}
					aria-label="{p.ev.title}{p.ev.status === 'cancelled' ? ' (cancelled)' : ''}{p.ev.status === 'tentative' ? ' (tentative)' : ''}{p.ev.status === 'full' ? ' (full)' : ''}{p.ev.status === 'limited' ? ' (limited)' : ''}{p.isCurrent ? `, ${L.inProgress}` : ''}{p.isNext ? `, ${L.upNext}` : ''}"
				>
					<div class="mb-ev-stripe"></div>
					<div class="mb-ev-body">
						<EventContent event={p.ev}>
						<span class="mb-ev-title">{p.ev.title}</span>
						{#if p.height > 32}
							<span class="mb-ev-time">{fmtTime(p.ev.start, locale)} – {fmtTime(p.ev.end, locale)}</span>
						{/if}
						{#if p.ev.subtitle && p.height > 48}
							<span class="mb-ev-sub">{p.ev.subtitle}</span>
						{/if}
						{#if p.ev.location && p.height > 56}
							<span class="mb-ev-loc">{p.ev.location}</span>
						{/if}
						{#if p.ev.tags?.length && p.height > 56}
							<div class="mb-ev-tags">
								{#each p.ev.tags as tag}
									<span class="mb-ev-tag">{tag}</span>
								{/each}
							</div>
						{/if}
						</EventContent>
					</div>
					{#if p.isCurrent}
						<span class="mb-ev-live"></span>
					{:else if p.isNext}
						<span class="mb-ev-next-badge">{L.upNext}</span>
					{/if}
					{#if !readOnly && !p.ev.data?.readOnly}
						<span
							class="mb-ev-handle mb-ev-handle--start"
							aria-hidden="true"
							onpointerdown={(e) => onResizePointerDown(e, p.ev, 'start')}
						></span>
						<span
							class="mb-ev-handle mb-ev-handle--end"
							aria-hidden="true"
							onpointerdown={(e) => onResizePointerDown(e, p.ev, 'end')}
						></span>
					{/if}
				</button>
			{/each}

			<!-- Drag-to-create ghost -->
			{#if !readOnly && drag?.active && drag.mode === 'create' && drag.payload}
				{@const gTop = ((drag.payload.start.getTime() - dayMs) / HOUR_MS - startHour) * HOUR_HEIGHT}
				{@const gH = Math.max(12, ((drag.payload.end.getTime() - drag.payload.start.getTime()) / HOUR_MS) * HOUR_HEIGHT)}
				<div class="mb-create-ghost" style:top="{gTop}px" style:height="{gH}px" aria-hidden="true">
					<span class="mb-create-ghost-time">
						{fmtTime(drag.payload.start, locale)} – {fmtTime(drag.payload.end, locale)}
					</span>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	/* ─── Container ──────────────────────────────────── */
	.mb {
		position: relative;
		display: flex;
		flex-direction: column;
		user-select: none;
		font-variant-numeric: tabular-nums;
		overflow: hidden;
		background: var(--dt-bg, #fff);
		-webkit-tap-highlight-color: transparent;
	}
	.mb--auto { overflow: visible; }

	/* ─── All-day bar ────────────────────────────────── */
	.mb-allday {
		display: flex;
		gap: 4px;
		padding: 4px 8px;
		overflow-x: auto;
		scrollbar-width: none;
		border-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
		flex-shrink: 0;
		align-items: center;
	}
	.mb-allday::-webkit-scrollbar { display: none; }

	.mb-allday-chip {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 4px 8px;
		border-radius: 5px;
		background: color-mix(in srgb, var(--ev-color) 12%, var(--dt-surface, #f9fafb));
		border: none;
		cursor: pointer;
		flex-shrink: 0;
		transition: background 120ms;
		-webkit-tap-highlight-color: transparent;
		max-width: 160px;
	}
	.mb-allday-chip:active {
		background: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, #f9fafb));
	}
	.mb-allday-chip--selected {
		box-shadow: 0 0 0 1.5px var(--ev-color);
	}

	.mb-allday-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--ev-color);
		flex-shrink: 0;
	}

	.mb-allday-title {
		font: 500 11px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		white-space: nowrap;
		max-width: 100px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mb-allday-span {
		font: 400 10px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
	}

	.mb-allday-more {
		font: 500 11px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		white-space: nowrap;
		flex-shrink: 0;
		padding: 0 4px;
	}

	/* ─── Grid ───────────────────────────────────────── */
	.mb-grid {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: thin;
		scrollbar-color: var(--dt-scrollbar, rgba(0, 0, 0, 0.1)) transparent;
		position: relative;
		padding-top: 8px;
	}
	.mb--auto .mb-grid { overflow-y: visible; }

	.mb-grid-inner {
		position: relative;
		min-width: 100%;
	}

	/* ─── Hour row ───────────────────────────────────── */
	.mb-hour {
		position: absolute;
		left: 0;
		right: 0;
		display: flex;
		align-items: flex-start;
	}

	.mb-hour-label {
		width: 40px;
		flex-shrink: 0;
		font: 500 11px/1 var(--dt-mono, ui-monospace, monospace);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		text-align: right;
		padding-right: 8px;
		padding-top: 0;
		position: relative;
		top: -6px;
	}

	.mb-hour-line {
		flex: 1;
		height: 1px;
		background: var(--dt-border, rgba(0, 0, 0, 0.08));
	}

	.mb-hour--blocked {
		background: repeating-linear-gradient(
			-45deg,
			color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 3%, transparent),
			color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 3%, transparent) 4px,
			transparent 4px,
			transparent 8px
		);
	}

	.mb-blocked-label {
		position: absolute;
		left: 44px;
		top: 50%;
		transform: translateY(-50%);
		font: 500 9px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	/* ─── Now line ───────────────────────────────────── */
	.mb-now {
		position: absolute;
		left: 0;
		right: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		pointer-events: none;
	}

	.mb-now-label {
		width: 40px;
		flex-shrink: 0;
		text-align: right;
		padding-right: 6px;
		font: 700 10px/1 var(--dt-mono, ui-monospace, monospace);
		color: var(--dt-accent, #2563eb);
	}

	.mb-now-line {
		flex: 1;
		height: 2px;
		background: var(--dt-accent, #2563eb);
		box-shadow: 0 0 6px var(--dt-glow, rgba(37, 99, 235, 0.25));
		position: relative;
	}

	.mb-now-line::before {
		content: '';
		position: absolute;
		left: -4px;
		top: -4px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--dt-accent, #2563eb);
	}

	/* ─── Events ─────────────────────────────────────── */
	.mb-event {
		position: absolute;
		z-index: 5;
		border-radius: 8px;
		cursor: pointer;
		background: color-mix(in srgb, var(--ev-color) 12%, var(--dt-surface, #f9fafb));
		border: none;
		display: flex;
		align-items: stretch;
		overflow: hidden;
		transition: box-shadow 120ms, background 120ms;
		text-align: left;
		padding: 0;
		-webkit-tap-highlight-color: transparent;
		min-height: 24px;
	}
	.mb-event:active {
		background: color-mix(in srgb, var(--ev-color) 20%, var(--dt-surface, #f9fafb));
	}
	.mb-event--selected {
		box-shadow: 0 0 0 2px var(--ev-color),
			0 2px 12px color-mix(in srgb, var(--ev-color) 25%, transparent);
	}
	.mb-event--current {
		background: color-mix(in srgb, var(--ev-color) 18%, var(--dt-surface, #f9fafb));
	}
	.mb-event--next {
		background: color-mix(in srgb, var(--ev-color) 8%, var(--dt-surface, #f9fafb));
		border: 1px dashed color-mix(in srgb, var(--ev-color) 35%, transparent);
	}
	.mb-event--cancelled {
		opacity: 0.5;
	}
	.mb-event--cancelled .mb-ev-title {
		text-decoration: line-through;
	}
	.mb-event--tentative {
		opacity: 0.65;
		border: 1px dashed color-mix(in srgb, var(--ev-color) 35%, transparent);
	}
	.mb-event--full {
		opacity: 0.55;
	}
	.mb-event--limited {
		opacity: 0.65;
		border: 1px dashed color-mix(in srgb, var(--ev-color) 35%, transparent);
	}
	.mb-event--resizing {
		z-index: 50;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
		cursor: ns-resize;
	}

	/* ─── Resize handles ─────────────────────────────── */
	.mb-ev-handle {
		position: absolute;
		left: 0;
		right: 0;
		height: 10px;
		z-index: 2;
		cursor: ns-resize;
		touch-action: none;
	}
	.mb-ev-handle--start { top: 0; }
	.mb-ev-handle--end { bottom: 0; }
	.mb-ev-handle::after {
		content: '';
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 24px;
		height: 3px;
		border-radius: 2px;
		background: var(--ev-color);
		opacity: 0;
		transition: opacity 120ms;
	}
	.mb-ev-handle--start::after { top: 2px; }
	.mb-ev-handle--end::after { bottom: 2px; }
	.mb-event:hover .mb-ev-handle::after,
	.mb-event--resizing .mb-ev-handle::after,
	.mb-event--selected .mb-ev-handle::after { opacity: 0.55; }

	/* ─── Drag-to-create ghost ───────────────────────── */
	.mb-create-ghost {
		position: absolute;
		left: 40px;
		right: 4px;
		z-index: 40;
		border-radius: 8px;
		background: color-mix(in srgb, var(--dt-accent, #2563eb) 12%, transparent);
		border: 1px dashed color-mix(in srgb, var(--dt-accent, #2563eb) 55%, transparent);
		display: flex;
		align-items: flex-start;
		overflow: hidden;
		pointer-events: none;
	}
	.mb-create-ghost-time {
		font: 600 10px/1 var(--dt-mono, ui-monospace, monospace);
		color: var(--dt-accent, #2563eb);
		padding: 4px 8px;
		white-space: nowrap;
	}

	.mb-ev-stripe {
		width: 4px;
		background: var(--ev-color);
		flex-shrink: 0;
		border-radius: 8px 0 0 8px;
	}

	.mb-ev-body {
		flex: 1;
		min-width: 0;
		padding: 4px 8px;
		display: flex;
		flex-direction: column;
		gap: 1px;
		justify-content: center;
	}

	.mb-ev-title {
		font: 600 13px/1.2 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mb-ev-time {
		font: 400 11px/1 var(--dt-mono, ui-monospace, monospace);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
	}

	.mb-ev-sub {
		font: 400 11px/1.1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mb-ev-loc {
		font: 400 10px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mb-ev-tags {
		display: flex;
		gap: 4px;
		margin-top: 2px;
	}

	.mb-ev-tag {
		font: 500 9px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--ev-color, var(--dt-accent));
		background: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, transparent);
		padding: 2px 5px;
		border-radius: 3px;
		white-space: nowrap;
	}

	.mb-ev-live {
		position: absolute;
		top: 6px;
		right: 6px;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--ev-color, var(--dt-accent));
		animation: mb-pulse 2s ease-in-out infinite;
	}
	.mb-ev-next-badge {
		position: absolute;
		top: 4px;
		right: 4px;
		font: 600 8px/1 var(--dt-sans, system-ui, sans-serif);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--ev-color, var(--dt-accent));
		background: color-mix(in srgb, var(--ev-color, var(--dt-accent)) 15%, transparent);
		padding: 2px 5px;
		border-radius: 3px;
		white-space: nowrap;
	}

	@keyframes mb-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}

	/* ─── Focus ──────────────────────────────────────── */
	.mb-event:focus-visible {
		outline: 2px solid var(--dt-accent, #2563eb);
		outline-offset: 2px;
	}
</style>
