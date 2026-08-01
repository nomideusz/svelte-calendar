<!--
  MobileDay — touch-first single-day view.

  Vertical time grid (hours top → bottom). Scrolls vertically.
  Large touch targets, swipe left/right to change day.
  Events positioned absolutely within hour lanes.
-->
<script lang="ts">import { untrack } from "svelte";
import { useCalendarContext } from "../shared/context.svelte.js";
import EventContent from "../shared/EventContent.svelte";
import { createClock } from "../../core/clock.svelte.js";
import { DAY_MS, HOUR_MS, sod, isAllDay, isMultiDay, segmentForDay } from "../../core/time.js";
import { fmtH, fmtTime } from "../../core/locale.js";
import { createSwipe } from "./swipe.js";
let {
  height = null,
  events = [],
  style = "",
  locale,
  focusDate,
  oneventclick,
  oneventcreate,
  selectedEventId = null,
  readOnly = false,
  visibleHours
} = $props();
const ctx = useCalendarContext();
const L = $derived(ctx.labels);
const viewState = $derived(ctx.viewState);
const autoHeight = $derived(ctx.autoHeight);
const oneventhover = $derived(ctx.oneventhover);
const disabledSet = $derived(ctx.disabledSet);
const loadRangeCtx = $derived(ctx.loadRange);
const minDuration = $derived(ctx.minDuration);
const blockedSlots = $derived(ctx.blockedSlots);
const drag = $derived(ctx.drag);
const commitDragCtx = $derived(ctx.commitDrag);
const SNAP_MS = $derived(ctx.snapInterval * 6e4);
const clock = createClock(ctx.timezone);
const HOUR_HEIGHT = 64;
const GUTTER_W = 40;
const startHour = $derived(visibleHours?.[0] ?? 0);
const endHour = $derived(visibleHours?.[1] ?? 24);
const hourCount = $derived(Math.max(1, endHour - startHour));
const gridHeight = $derived(hourCount * HOUR_HEIGHT);
const dayMs = $derived(focusDate ? sod(focusDate.getTime()) : clock.today);
const dayEnd = $derived(dayMs + DAY_MS);
const isToday = $derived(dayMs === clock.today);
const isDisabled = $derived(disabledSet.has(dayMs));
$effect(() => {
  if (!loadRangeCtx) return;
  const rangeStart = new Date(dayMs - 2 * DAY_MS);
  const rangeEnd = new Date(dayMs + 3 * DAY_MS);
  loadRangeCtx.set({ start: rangeStart, end: rangeEnd });
  return () => loadRangeCtx.set(null);
});
const timedEvents = $derived(
  events.filter((ev) => !isAllDay(ev) && !isMultiDay(ev) && ev.start.getTime() < dayEnd && ev.end.getTime() > dayMs).sort((a, b) => a.start.getTime() - b.start.getTime())
);
const allDayEvents = $derived.by(() => {
  const segs = [];
  for (const ev of events) {
    if (!isAllDay(ev) && !isMultiDay(ev)) continue;
    const seg = segmentForDay(ev, dayMs);
    if (seg) segs.push(seg);
  }
  return segs;
});
const isEmpty = $derived(timedEvents.length === 0 && allDayEvents.length === 0);
const ALLDAY_MAX = 3;
let allDayExpanded = $state(false);
const visibleAllDay = $derived(allDayExpanded ? allDayEvents : allDayEvents.slice(0, ALLDAY_MAX));
const positionedEvents = $derived.by(() => {
  const now = clock.tick;
  const sorted = [...timedEvents];
  const rsP = drag?.active && (drag.mode === "resize-start" || drag.mode === "resize-end") ? drag.payload : null;
  let nextEventId = null;
  if (isToday) {
    for (const ev of [...sorted].sort((a, b) => a.start.getTime() - b.start.getTime())) {
      const s = ev.start.getTime();
      if (s > now) {
        nextEventId = ev.id;
        break;
      }
    }
  }
  const infos = sorted.map((ev) => {
    const resizing = rsP?.eventId === ev.id;
    const evStart = resizing ? rsP.start : ev.start;
    const evEnd = resizing ? rsP.end : ev.end;
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
      totalCols: 1
    };
  });
  const par = infos.map((_, i) => i);
  function find(i) {
    while (par[i] !== i) {
      par[i] = par[par[i]];
      i = par[i];
    }
    return i;
  }
  for (let i = 0; i < infos.length; i++) {
    for (let j = i + 1; j < infos.length; j++) {
      if (infos[j].startMs < infos[i].endMs) par[find(i)] = find(j);
      else break;
    }
  }
  const groups = /* @__PURE__ */ new Map();
  for (let i = 0; i < infos.length; i++) {
    const root = find(i);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(i);
  }
  for (const [, indices] of groups) {
    const rows = [];
    for (const idx of indices) {
      let row = 0;
      for (let r = 0; r < rows.length; r++) {
        if (rows[r] <= infos[idx].startMs) {
          row = r;
          rows[r] = infos[idx].endMs;
          break;
        }
        row = r + 1;
      }
      if (row >= rows.length) rows.push(infos[idx].endMs);
      infos[idx].col = row;
    }
    for (const idx of indices) infos[idx].totalCols = rows.length;
  }
  return infos.map((info) => ({
    ev: info.ev,
    top: info.top,
    height: info.height,
    left: `calc(${GUTTER_W}px + ${info.col / info.totalCols * 100}% - ${GUTTER_W * info.col / info.totalCols}px)`,
    width: `calc(${100 / info.totalCols}% - ${GUTTER_W / info.totalCols + 2}px)`,
    isCurrent: info.isCurrent,
    isNext: info.isNext,
    isResizing: info.isResizing,
    col: info.col,
    totalCols: info.totalCols
  }));
});
const nowOffset = $derived.by(() => {
  if (!isToday) return -1;
  const h = (clock.tick - dayMs) / HOUR_MS - startHour;
  if (h < 0 || h > hourCount) return -1;
  return h * HOUR_HEIGHT;
});
function isBlockedAt(hour) {
  if (!blockedSlots?.length) return false;
  const jsDay = new Date(dayMs).getDay();
  const isoDay = jsDay === 0 ? 7 : jsDay;
  return blockedSlots.some((slot) => {
    if (slot.day && slot.day !== isoDay) return false;
    return hour >= slot.start && hour < slot.end;
  });
}
function statusText(ev) {
  if (ev.status === "cancelled") return ` (${L.cancelled})`;
  if (ev.status === "tentative") return ` (${L.tentative})`;
  if (ev.status === "full") return ` (${L.full})`;
  if (ev.status === "limited") return ` (${L.limited})`;
  return "";
}
let swipeOffset = $state(0);
let swipeAnimate = $state(false);
const swipe = createSwipe({
  disabled: () => !!drag?.active || mbCreateStarted || mbRsStarted || longPressTimer !== null,
  onmove: (dx) => {
    swipeAnimate = false;
    swipeOffset = dx;
  },
  onend: (dir) => {
    if (dir !== 0) {
      swipeAnimate = false;
      swipeOffset = 0;
      if (dir > 0) viewState?.prev();
      else viewState?.next();
    } else {
      swipeAnimate = true;
      swipeOffset = 0;
    }
  }
});
function handleGridClick(e) {
  if (suppressGridClick) {
    suppressGridClick = false;
    return;
  }
  if (!oneventcreate || readOnly || isDisabled) return;
  if (e.target.closest(".mb-event")) return;
  const tMs = gridTimeMs(e.clientY);
  if (isBlockedAt((tMs - dayMs) / HOUR_MS)) return;
  const startMs = clampToDay(Math.floor(tMs / SNAP_MS) * SNAP_MS);
  const durMin = minDuration ?? 60;
  oneventcreate({ start: new Date(startMs), end: new Date(startMs + durMin * 6e4) });
}
function onGridKeydown(e) {
  if (e.key !== "Enter" && e.key !== " ") return;
  if (!oneventcreate || readOnly || isDisabled) return;
  e.preventDefault();
  const raw = isToday ? clock.tick : dayMs + startHour * HOUR_MS;
  const startMs = clampToDay(Math.ceil(raw / SNAP_MS) * SNAP_MS);
  if (isBlockedAt((startMs - dayMs) / HOUR_MS)) return;
  const durMin = minDuration ?? 60;
  oneventcreate({ start: new Date(startMs), end: new Date(startMs + durMin * 6e4) });
}
const CREATE_THRESHOLD = 4;
const LONG_PRESS_MS = 350;
const LONG_PRESS_TOLERANCE = 8;
let suppressGridClick = false;
let mbCreateStartX = 0;
let mbCreateStartY = 0;
let mbCreateAnchorMs = 0;
let mbCreateStarted = false;
let longPressTimer = null;
function blockTouchScroll(e) {
  e.preventDefault();
}
function addTouchScrollBlock() {
  window.addEventListener("touchmove", blockTouchScroll, { passive: false });
}
function removeTouchScrollBlock() {
  window.removeEventListener("touchmove", blockTouchScroll);
}
function clearLongPress() {
  if (longPressTimer !== null) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
}
function gridTimeMs(clientY) {
  const rect = gridEl.getBoundingClientRect();
  const y = clientY - rect.top + gridEl.scrollTop;
  return dayMs + (startHour + y / HOUR_HEIGHT) * HOUR_MS;
}
function clampToDay(ms) {
  return Math.max(dayMs + startHour * HOUR_MS, Math.min(dayMs + endHour * HOUR_MS, ms));
}
function startGridCreate() {
  if (!drag) return;
  mbCreateStarted = true;
  mbCreateAnchorMs = clampToDay(Math.floor(mbCreateAnchorMs / SNAP_MS) * SNAP_MS);
  drag.beginCreate(new Date(mbCreateAnchorMs), new Date(mbCreateAnchorMs + SNAP_MS));
  addTouchScrollBlock();
}
function onGridPointerDown(e) {
  if (e.button !== 0 || !drag || !oneventcreate || readOnly || isDisabled) return;
  if (e.target.closest(".mb-event")) return;
  mbCreateStartX = e.clientX;
  mbCreateStartY = e.clientY;
  mbCreateAnchorMs = gridTimeMs(e.clientY);
  mbCreateStarted = false;
  if (e.pointerType === "touch") {
    longPressTimer = setTimeout(() => {
      longPressTimer = null;
      startGridCreate();
    }, LONG_PRESS_MS);
  }
  window.addEventListener("pointermove", onGridCreateMove);
  window.addEventListener("pointerup", onGridCreateUp, { once: true });
  window.addEventListener("pointercancel", onGridCreateCancel, { once: true });
}
function onGridCreateMove(e) {
  if (!drag) return;
  if (!mbCreateStarted) {
    if (longPressTimer !== null) {
      const moved = Math.hypot(e.clientX - mbCreateStartX, e.clientY - mbCreateStartY);
      if (moved > LONG_PRESS_TOLERANCE) cleanupGridCreate();
      return;
    }
    if (e.pointerType === "touch") return;
    if (Math.abs(e.clientY - mbCreateStartY) < CREATE_THRESHOLD) return;
    startGridCreate();
  }
  const snapped = clampToDay(Math.round(gridTimeMs(e.clientY) / SNAP_MS) * SNAP_MS);
  drag.updatePointer(
    new Date(Math.min(mbCreateAnchorMs, snapped)),
    new Date(Math.max(mbCreateAnchorMs + SNAP_MS, snapped))
  );
}
function cleanupGridCreate() {
  clearLongPress();
  removeTouchScrollBlock();
  window.removeEventListener("pointermove", onGridCreateMove);
  window.removeEventListener("pointerup", onGridCreateUp);
  window.removeEventListener("pointercancel", onGridCreateCancel);
  mbCreateStarted = false;
}
function onGridCreateUp() {
  if (drag && mbCreateStarted) {
    suppressGridClick = true;
    commitDragCtx?.();
    setTimeout(() => {
      suppressGridClick = false;
    }, 0);
  }
  cleanupGridCreate();
}
function onGridCreateCancel() {
  if (drag && mbCreateStarted) drag.cancel();
  cleanupGridCreate();
}
function onGridContextMenu(e) {
  if (mbCreateStarted || longPressTimer !== null) e.preventDefault();
}
let suppressEventClick = false;
let mbRsStartY = 0;
let mbRsStarted = false;
let mbRsEdge = "end";
let mbRsEvent = null;
function onResizePointerDown(e, ev, edge) {
  if (e.button !== 0 || !drag || readOnly || ev.data?.readOnly) return;
  e.stopPropagation();
  mbRsStartY = e.clientY;
  mbRsStarted = false;
  mbRsEdge = edge;
  mbRsEvent = ev;
  window.addEventListener("pointermove", onResizeMove);
  window.addEventListener("pointerup", onResizeUp, { once: true });
  window.addEventListener("pointercancel", onResizeCancel, { once: true });
}
function onResizeMove(e) {
  const ev = mbRsEvent;
  if (!drag || !ev) return;
  if (!mbRsStarted) {
    if (Math.abs(e.clientY - mbRsStartY) < CREATE_THRESHOLD) return;
    mbRsStarted = true;
    drag.beginResize(ev.id, mbRsEdge, ev.start, ev.end);
    addTouchScrollBlock();
  }
  const snapped = clampToDay(Math.round(gridTimeMs(e.clientY) / SNAP_MS) * SNAP_MS);
  if (mbRsEdge === "end") {
    const end = Math.max(snapped, ev.start.getTime() + SNAP_MS);
    drag.updatePointer(ev.start, new Date(end));
  } else {
    const start = Math.min(snapped, ev.end.getTime() - SNAP_MS);
    drag.updatePointer(new Date(start), ev.end);
  }
}
function cleanupResize() {
  removeTouchScrollBlock();
  window.removeEventListener("pointermove", onResizeMove);
  window.removeEventListener("pointerup", onResizeUp);
  window.removeEventListener("pointercancel", onResizeCancel);
  mbRsStarted = false;
  mbRsEvent = null;
}
function onResizeUp() {
  if (drag && mbRsStarted) {
    suppressEventClick = true;
    suppressGridClick = true;
    commitDragCtx?.();
    setTimeout(() => {
      suppressEventClick = false;
      suppressGridClick = false;
    }, 0);
  }
  cleanupResize();
}
function onResizeCancel() {
  if (drag && mbRsStarted) drag.cancel();
  cleanupResize();
}
let gridEl;
$effect(() => {
  void dayMs;
  const el = gridEl;
  if (!el) return;
  untrack(() => {
    if (nowOffset >= 0) el.scrollTop = Math.max(0, nowOffset - 120);
  });
});
</script>

<div
	class="mb"
	class:mb--auto={autoHeight}
	style={style || undefined}
	style:height={autoHeight ? undefined : (height ? `${height}px` : '100%')}
	role="region"
	aria-label={L.dayPlanner}
	ontouchstart={swipe.ontouchstart}
	ontouchmove={swipe.ontouchmove}
	ontouchend={swipe.ontouchend}
	ontouchcancel={swipe.ontouchcancel}
>
	<div
		class="mb-swipe"
		class:mb-swipe--animate={swipeAnimate}
		style:transform={swipeOffset !== 0 ? `translateX(${swipeOffset}px)` : undefined}
	>
		<!-- All-day events bar -->
		{#if allDayEvents.length > 0}
			<div class="mb-allday" class:mb-allday--expanded={allDayExpanded}>
				{#each visibleAllDay as seg (seg.ev.id)}
					<button
						type="button"
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
				{#if allDayEvents.length > ALLDAY_MAX}
					<button
						type="button"
						class="mb-allday-more"
						aria-expanded={allDayExpanded}
						onclick={() => { allDayExpanded = !allDayExpanded; }}
					>
						{allDayExpanded ? L.showLess : L.nMore(allDayEvents.length - ALLDAY_MAX)}
					</button>
				{/if}
			</div>
		{/if}

		<!-- Scrollable time grid -->
		<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
		<div
			class="mb-grid"
			bind:this={gridEl}
			onclick={handleGridClick}
			onpointerdown={onGridPointerDown}
			onkeydown={onGridKeydown}
			oncontextmenu={onGridContextMenu}
			role="region"
			aria-label={L.scrollableDayPlanner}
			tabindex="0"
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
						type="button"
						class="mb-event"
						class:mb-event--selected={selectedEventId === p.ev.id}
						class:mb-event--current={p.isCurrent}
						class:mb-event--next={p.isNext}
						class:mb-event--cancelled={p.ev.status === 'cancelled'}
						class:mb-event--tentative={p.ev.status === 'tentative'}
						class:mb-event--full={p.ev.status === 'full'}
						class:mb-event--limited={p.ev.status === 'limited'}
						class:mb-event--resizing={p.isResizing}
						class:mb-event--short={p.height < 44}
						style:top="{p.top}px"
						style:height="{p.height}px"
						style:left={p.left}
						style:width={p.width}
						style:--ev-color={p.ev.color ?? 'var(--dt-accent)'}
						onclick={(e) => { e.stopPropagation(); if (suppressEventClick) { suppressEventClick = false; return; } oneventclick?.(p.ev); }}
						onpointerenter={() => oneventhover?.(p.ev)}
						aria-label="{p.ev.title}{statusText(p.ev)}, {fmtTime(p.ev.start, locale)} – {fmtTime(p.ev.end, locale)}{p.isCurrent ? `, ${L.inProgress}` : ''}{p.isNext ? `, ${L.upNext}` : ''}"
					>
						<div class="mb-ev-stripe"></div>
						<div class="mb-ev-body">
							<EventContent event={p.ev}>
							<!-- Line thresholds must track real content height (title 18 +
							     time 13 + sub 14 + loc 12 + tags 19 + padding 8) — showing
							     a line the block can't hold clips text at both ends. -->
							<span class="mb-ev-title">{p.ev.title}</span>
							{#if p.height > 32}
								<span class="mb-ev-time">{fmtTime(p.ev.start, locale)} – {fmtTime(p.ev.end, locale)}</span>
							{/if}
							{#if p.ev.subtitle && p.height > 56}
								<span class="mb-ev-sub">{p.ev.subtitle}</span>
							{/if}
							{#if p.ev.location && p.height > 72}
								<span class="mb-ev-loc">{p.ev.location}</span>
							{/if}
							{#if p.ev.tags?.length && p.height > 88}
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

		<!-- Empty state — overlaid, taps pass through to the grid -->
		{#if isEmpty}
			<div class="mb-empty">
				{#if ctx.emptySnippet}
					{@render ctx.emptySnippet()}
				{:else}
					<span class="mb-empty-text">{L.nothingScheduled}</span>
				{/if}
			</div>
		{/if}
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
		touch-action: pan-y;
	}
	.mb--auto { overflow: visible; }

	/* ─── Swipe wrapper (follows the finger) ─────────── */
	.mb-swipe {
		flex: 1;
		min-height: 0;
		display: flex;
		flex-direction: column;
		position: relative;
	}
	.mb-swipe--animate {
		transition: transform 180ms ease;
	}
	@media (prefers-reduced-motion: reduce) {
		.mb-swipe--animate { transition: none; }
	}

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
	.mb-allday--expanded {
		flex-wrap: wrap;
		overflow-x: visible;
	}

	.mb-allday-chip {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 4px 8px;
		min-height: 32px;
		border-radius: 5px;
		background: color-mix(in srgb, var(--ev-color) 12%, var(--dt-surface, #f9fafb));
		border: none;
		cursor: pointer;
		flex-shrink: 0;
		transition: background 120ms;
		-webkit-tap-highlight-color: transparent;
		max-width: 160px;
		position: relative;
	}
	/* Hit-slop: 44px effective touch target */
	.mb-allday-chip::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		height: 44px;
	}
	.mb-allday-chip:active {
		background: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, #f9fafb));
	}
	.mb-allday-chip--selected {
		box-shadow: 0 0 0 1.5px var(--ev-color);
	}
	.mb-allday-chip:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
	}

	.mb-allday-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--ev-color);
		flex-shrink: 0;
	}

	.mb-allday-title {
		font: 500 12px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		white-space: nowrap;
		max-width: 100px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mb-allday-span {
		font: 400 11px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
	}

	.mb-allday-more {
		font: 500 12px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		white-space: nowrap;
		flex-shrink: 0;
		padding: 0 6px;
		min-height: 32px;
		border: none;
		background: transparent;
		cursor: pointer;
		position: relative;
		-webkit-tap-highlight-color: transparent;
	}
	.mb-allday-more::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		height: 44px;
	}
	.mb-allday-more:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
	}

	/* ─── Grid ───────────────────────────────────────── */
	.mb-grid {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		overscroll-behavior: contain;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: thin;
		scrollbar-color: var(--dt-scrollbar, rgba(0, 0, 0, 0.1)) transparent;
		position: relative;
		padding-top: 8px;
	}
	.mb--auto .mb-grid { overflow-y: visible; }
	.mb-grid:focus-visible {
		outline: none;
		box-shadow: inset 0 0 0 2px var(--dt-accent, #2563eb);
	}

	.mb-grid-inner {
		position: relative;
		min-width: 100%;
	}

	/* ─── Empty state ────────────────────────────────── */
	.mb-empty {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		z-index: 4;
	}
	.mb-empty-text {
		font: 500 13px/1.4 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
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
		/* border-box keeps the label inside the 40px gutter that events
		   start at — content-box pushed digits flush under the event edge */
		box-sizing: border-box;
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
		font: 500 10px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
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
		box-sizing: border-box;
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
	/* Short blocks keep their duration-proportional height, but get a 44px
	   transparent hit-slop so taps still land. */
	.mb-event--short {
		overflow: visible;
	}
	.mb-event--short::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		height: 44px;
	}
	.mb-event--short .mb-ev-body {
		padding-top: 2px;
		padding-bottom: 2px;
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
	/* Status treatments: token-level dims + a non-opacity signal
	   (strikethrough / border style) — never a bare opacity on the block. */
	.mb-event--cancelled {
		background: color-mix(in srgb, var(--ev-color) 5%, var(--dt-surface, #f9fafb));
	}
	.mb-event--cancelled .mb-ev-title {
		text-decoration: line-through;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
	}
	.mb-event--cancelled .mb-ev-stripe {
		opacity: 0.45; /* decorative bar only */
	}
	.mb-event--tentative {
		background: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, #f9fafb));
		border: 1px dashed color-mix(in srgb, var(--ev-color) 45%, transparent);
	}
	.mb-event--full {
		background: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, #f9fafb));
		border: 1px solid color-mix(in srgb, var(--ev-color) 30%, transparent);
	}
	.mb-event--full .mb-ev-title {
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
	}
	.mb-event--limited {
		background: color-mix(in srgb, var(--ev-color) 8%, var(--dt-surface, #f9fafb));
		border: 1px dashed color-mix(in srgb, var(--ev-color) 45%, transparent);
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
	/* Hit-slop: ≥24px effective, extending inward so the block's
	   overflow clipping can't cut it off. */
	.mb-ev-handle::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		height: 24px;
	}
	.mb-ev-handle--start::before { top: 0; }
	.mb-ev-handle--end::before { bottom: 0; }
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
	.mb-event:focus-within .mb-ev-handle::after,
	.mb-event--resizing .mb-ev-handle::after,
	.mb-event--selected .mb-ev-handle::after { opacity: 0.55; }
	/* Touch devices have no hover — show the handles persistently. */
	@media (hover: none) {
		.mb-ev-handle::after { opacity: 0.55; }
	}

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
		font: 600 11px/1 var(--dt-mono, ui-monospace, monospace);
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
		font: 600 15px/1.2 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mb-ev-time {
		font: 400 12px/1 var(--dt-mono, ui-monospace, monospace);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
	}

	.mb-ev-sub {
		font: 400 12px/1.1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mb-ev-loc {
		font: 400 11px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
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
		font: 500 11px/1 var(--dt-sans, system-ui, sans-serif);
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
	@media (prefers-reduced-motion: reduce) {
		.mb-ev-live { animation: none; }
	}
	.mb-ev-next-badge {
		position: absolute;
		top: 4px;
		right: 4px;
		font: 600 10px/1 var(--dt-sans, system-ui, sans-serif);
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
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
	}
</style>
