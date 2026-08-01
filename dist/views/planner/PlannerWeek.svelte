<!--
  Planner time grid — vertical, Google-Calendar-style. Renders both planner
  modes: week (N columns from viewState.dayCount) and day (a single column),
  so the two share one geometry, one drag mapping, and one overlap engine.

  • Left time gutter with localized hour labels; N day columns (viewState.dayCount).
  • Sticky day-header row + sticky all-day strip; the grid scrolls vertically.
  • Timed events are absolutely positioned by start/end; overlaps share the
    column via union-find lanes.
  • Drag-to-move (vertical = time, horizontal = day), top/bottom resize
    handles, drag-to-create with ghost preview — all through ctx.drag /
    ctx.commitDrag so Calendar's validation (min/max duration, blocked,
    disabled) applies on drop.
  • Now-line across today's column only; auto-scrolls to the current time.
-->
<script lang="ts">import { untrack } from "svelte";
import { useCalendarContext } from "../shared/context.svelte.js";
import EventContent from "../shared/EventContent.svelte";
import { createClock } from "../../core/clock.svelte.js";
import { DAY_MS, HOUR_MS, sod, addDaysMs } from "../../core/time.js";
import { startOfWeek as sowFn, isAllDay, isMultiDay, segmentForDay } from "../../core/time.js";
import { fmtH, fmtTime, fmtDuration, weekdayShort, weekdayLong } from "../../core/locale.js";
let {
  mode = "week",
  mondayStart = true,
  locale,
  height = 520,
  events = [],
  style = "",
  focusDate,
  oneventclick,
  oneventcreate,
  selectedEventId = null,
  readOnly = false,
  visibleHours
} = $props();
const ctx = useCalendarContext();
const L = $derived(ctx.labels);
const clock = createClock(ctx.timezone);
const drag = $derived(ctx.drag);
const commitDragCtx = $derived(ctx.commitDrag);
const viewState = $derived(ctx.viewState);
const loadRangeCtx = $derived(ctx.loadRange);
const equalDays = $derived(ctx.equalDays);
const showDates = $derived(ctx.showDates);
const hideDays = $derived(ctx.hideDays);
const blockedSlots = $derived(ctx.blockedSlots);
const dayHeaderSnippet = $derived(ctx.dayHeaderSnippet);
const minDuration = $derived(ctx.minDuration);
const autoHeight = $derived(ctx.autoHeight);
const oneventhover = $derived(ctx.oneventhover);
const disabledSet = $derived(ctx.disabledSet);
const SNAP_MS = $derived(ctx.snapInterval * 6e4);
const HOUR_H = 48;
const GUTTER_W = 48;
const MIN_COL_W = 110;
const ALLDAY_MAX = 3;
const startHour = $derived(visibleHours?.[0] ?? 0);
const endHour = $derived(visibleHours?.[1] ?? 24);
const hourCount = $derived(Math.max(1, endHour - startHour));
const gridHeight = $derived(hourCount * HOUR_H);
let scrollEl;
let colsEl;
const todayMs = $derived(clock.today);
const singleDay = $derived(mode === "day" || viewState?.mode === "day");
const customDays = $derived(singleDay ? 1 : viewState?.dayCount ?? 7);
const hideDayHead = $derived(singleDay && showDates && !!viewState && !dayHeaderSnippet);
const weekStartMs = $derived.by(() => {
  const r = viewState?.range;
  if (r) return sod(r.start.getTime());
  const f = focusDate?.getTime() ?? todayMs;
  return customDays === 7 ? sowFn(f, mondayStart) : sod(f);
});
const weekEndMs = $derived(addDaysMs(weekStartMs, customDays));
const weekHasToday = $derived(todayMs >= weekStartMs && todayMs < weekEndMs);
const dayCols = $derived.by(() => {
  const cols = [];
  for (let d = 0; d < customDays; d++) {
    const ms = addDaysMs(weekStartMs, d);
    const date = new Date(ms);
    const dow = date.getDay();
    const isoDay = dow === 0 ? 7 : dow;
    if (hideDays?.includes(isoDay)) continue;
    cols.push({
      ms,
      isToday: ms === todayMs,
      isPast: equalDays ? false : ms < todayMs,
      isWeekend: dow === 0 || dow === 6,
      isDisabled: disabledSet.has(ms),
      isoDay,
      dayNum: date.getDate()
    });
  }
  return cols;
});
const innerMinWidth = $derived(GUTTER_W + dayCols.length * MIN_COL_W);
$effect(() => {
  if (!loadRangeCtx) return;
  const rangeStart = new Date(weekStartMs - 7 * DAY_MS);
  const rangeEnd = new Date(weekEndMs + 7 * DAY_MS);
  loadRangeCtx.set({ start: rangeStart, end: rangeEnd });
  return () => loadRangeCtx.set(null);
});
const allDayByDay = $derived.by(() => {
  const map = /* @__PURE__ */ new Map();
  for (const day of dayCols) {
    const segs = [];
    for (const ev of events) {
      if (!isAllDay(ev) && !isMultiDay(ev)) continue;
      const seg = segmentForDay(ev, day.ms);
      if (seg) segs.push(seg);
    }
    if (segs.length) map.set(day.ms, segs);
  }
  return map;
});
const hasAllDayRow = $derived(allDayByDay.size > 0);
let adExpanded = $state({});
const movingId = $derived(drag?.active && drag.mode === "move" ? drag.payload?.eventId ?? null : null);
const movingEvent = $derived(movingId ? events.find((e) => e.id === movingId) ?? null : null);
const layoutByDay = $derived.by(() => {
  const rsP = drag?.active && (drag.mode === "resize-start" || drag.mode === "resize-end") ? drag.payload : null;
  const map = /* @__PURE__ */ new Map();
  for (const day of dayCols) {
    let find = function(i) {
      while (par[i] !== i) {
        par[i] = par[par[i]];
        i = par[i];
      }
      return i;
    };
    const dayEnd = day.ms + DAY_MS;
    const bandStart = day.ms + startHour * HOUR_MS;
    const bandEnd = day.ms + endHour * HOUR_MS;
    const infos = [];
    for (const ev of events) {
      if (isAllDay(ev) || isMultiDay(ev)) continue;
      if (ev.id === movingId) continue;
      const isResizing = rsP?.eventId === ev.id;
      const s0 = isResizing ? rsP.start.getTime() : ev.start.getTime();
      const e0 = isResizing ? rsP.end.getTime() : ev.end.getTime();
      if (s0 >= dayEnd || e0 <= day.ms) continue;
      const sMs = Math.max(s0, bandStart);
      const eMs = Math.min(e0, bandEnd);
      if (eMs <= sMs) continue;
      infos.push({ ev, startMs: sMs, endMs: eMs, isResizing, col: 0, totalCols: 1 });
    }
    infos.sort((a, b) => a.startMs - b.startMs || b.endMs - a.endMs);
    const par = infos.map((_, i) => i);
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
      const lanes = [];
      for (const idx of indices) {
        const inf = infos[idx];
        let lane = 0;
        for (let r = 0; r < lanes.length; r++) {
          if (lanes[r] <= inf.startMs) {
            lane = r;
            lanes[r] = inf.endMs;
            break;
          }
          lane = r + 1;
        }
        if (lane >= lanes.length) lanes.push(inf.endMs);
        infos[idx].col = lane;
      }
      for (const idx of indices) infos[idx].totalCols = lanes.length;
    }
    map.set(
      day.ms,
      infos.map((inf) => ({
        ev: inf.ev,
        top: ((inf.startMs - day.ms) / HOUR_MS - startHour) * HOUR_H,
        height: Math.max(24, (inf.endMs - inf.startMs) / HOUR_MS * HOUR_H),
        col: inf.col,
        totalCols: inf.totalCols,
        isResizing: inf.isResizing
      }))
    );
  }
  return map;
});
const nowIds = $derived.by(() => {
  const now = clock.tick;
  const s = /* @__PURE__ */ new Set();
  for (const ev of events) {
    if (ev.start.getTime() <= now && ev.end.getTime() > now) s.add(ev.id);
  }
  return s;
});
const nowFracHour = $derived((clock.tick - clock.today) / HOUR_MS);
const nowY = $derived.by(() => {
  if (nowFracHour < startHour || nowFracHour > endHour) return null;
  return (nowFracHour - startHour) * HOUR_H;
});
const weekIsEmpty = $derived(
  !events.some((ev) => ev.start.getTime() < weekEndMs && ev.end.getTime() > weekStartMs)
);
$effect(() => {
  void weekStartMs;
  const el = scrollEl;
  if (!el) return;
  untrack(() => {
    let targetHour;
    if (weekHasToday) {
      const clamped = Math.min(Math.max(nowFracHour, startHour), endHour);
      targetHour = Math.max(startHour, clamped - 1);
    } else {
      targetHour = Math.max(startHour, Math.min(8, endHour - 1));
    }
    el.scrollTop = (targetHour - startHour) * HOUR_H;
  });
});
function colsRect() {
  return colsEl.getBoundingClientRect();
}
function pointerDayIndex(clientX) {
  const r = colsRect();
  const n = dayCols.length;
  if (n === 0) return 0;
  const w = r.width / n;
  return Math.max(0, Math.min(n - 1, Math.floor((clientX - r.left) / w)));
}
function pointerHour(clientY) {
  return startHour + (clientY - colsRect().top) / HOUR_H;
}
function pointerTimeMs(clientX, clientY) {
  const dayMs = dayCols[pointerDayIndex(clientX)]?.ms ?? weekStartMs;
  const hour = Math.min(Math.max(pointerHour(clientY), startHour), endHour);
  return dayMs + hour * HOUR_MS;
}
function clampToDayBand(ms, dayMs) {
  return Math.max(dayMs + startHour * HOUR_MS, Math.min(dayMs + endHour * HOUR_MS, ms));
}
function isBlockedAt(dayMs, hour) {
  if (!blockedSlots?.length) return false;
  const jsDay = new Date(dayMs).getDay();
  const isoDay = jsDay === 0 ? 7 : jsDay;
  return blockedSlots.some((slot) => {
    if (slot.day && slot.day !== isoDay) return false;
    return hour >= slot.start && hour < slot.end;
  });
}
function blockedRangeLabel(dayMs, slotStart, slotEnd) {
  return `${fmtTime(new Date(dayMs + slotStart * HOUR_MS), locale)} \u2013 ${fmtTime(new Date(dayMs + slotEnd * HOUR_MS), locale)}`;
}
function statusText(ev) {
  if (ev.status === "cancelled") return ` (${L.cancelled})`;
  if (ev.status === "tentative") return ` (${L.tentative})`;
  if (ev.status === "full") return ` (${L.full})`;
  if (ev.status === "limited") return ` (${L.limited})`;
  return "";
}
function ghostForDay(dayMs) {
  if (!drag?.active || !drag.payload) return null;
  const mode2 = drag.mode;
  if (mode2 !== "move" && mode2 !== "create") return null;
  const s = drag.payload.start.getTime();
  const e = drag.payload.end.getTime();
  const bandS = dayMs + startHour * HOUR_MS;
  const bandE = dayMs + endHour * HOUR_MS;
  const cs = Math.max(s, bandS);
  const ce = Math.min(e, bandE);
  if (ce <= cs) return null;
  return {
    top: ((cs - dayMs) / HOUR_MS - startHour) * HOUR_H,
    height: Math.max(12, (ce - cs) / HOUR_MS * HOUR_H),
    start: drag.payload.start,
    end: drag.payload.end,
    create: mode2 === "create",
    // Only the segment containing the start shows the readout
    showTime: cs === Math.max(s, dayMs)
  };
}
const CREATE_THRESHOLD = 4;
const LONG_PRESS_MS = 350;
const LONG_PRESS_TOLERANCE = 8;
let suppressColsClick = false;
let crStartX = 0;
let crStartY = 0;
let crAnchorMs = 0;
let crDayMs = 0;
let crStarted = false;
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
function startColsCreate() {
  if (!drag) return;
  crStarted = true;
  crAnchorMs = clampToDayBand(Math.floor(crAnchorMs / SNAP_MS) * SNAP_MS, crDayMs);
  drag.beginCreate(new Date(crAnchorMs), new Date(crAnchorMs + SNAP_MS));
  addTouchScrollBlock();
}
function onColsPointerDown(e) {
  if (e.button !== 0 || !drag || !oneventcreate || readOnly) return;
  if (e.target.closest(".tw-ev, .tw-ghost")) return;
  const day = dayCols[pointerDayIndex(e.clientX)];
  if (!day || day.isDisabled) return;
  if (isBlockedAt(day.ms, Math.min(Math.max(pointerHour(e.clientY), startHour), endHour))) return;
  crStartX = e.clientX;
  crStartY = e.clientY;
  crDayMs = day.ms;
  crAnchorMs = clampToDayBand(
    day.ms + Math.max(pointerHour(e.clientY), startHour) * HOUR_MS,
    day.ms
  );
  crStarted = false;
  if (e.pointerType === "touch") {
    longPressTimer = setTimeout(() => {
      longPressTimer = null;
      startColsCreate();
    }, LONG_PRESS_MS);
  }
  window.addEventListener("pointermove", onColsCreateMove);
  window.addEventListener("pointerup", onColsCreateUp, { once: true });
  window.addEventListener("pointercancel", onColsCreateCancel, { once: true });
}
function onColsCreateMove(e) {
  if (!drag) return;
  if (!crStarted) {
    if (longPressTimer !== null) {
      const moved = Math.hypot(e.clientX - crStartX, e.clientY - crStartY);
      if (moved > LONG_PRESS_TOLERANCE) cleanupColsCreate();
      return;
    }
    if (e.pointerType === "touch") return;
    if (Math.abs(e.clientY - crStartY) < CREATE_THRESHOLD) return;
    startColsCreate();
  }
  const raw = crDayMs + pointerHour(e.clientY) * HOUR_MS;
  const snapped = clampToDayBand(Math.round(raw / SNAP_MS) * SNAP_MS, crDayMs);
  drag.updatePointer(
    new Date(Math.min(crAnchorMs, snapped)),
    new Date(Math.max(crAnchorMs + SNAP_MS, snapped))
  );
}
function cleanupColsCreate() {
  clearLongPress();
  removeTouchScrollBlock();
  window.removeEventListener("pointermove", onColsCreateMove);
  window.removeEventListener("pointerup", onColsCreateUp);
  window.removeEventListener("pointercancel", onColsCreateCancel);
  crStarted = false;
}
function onColsCreateUp() {
  if (drag && crStarted) {
    suppressColsClick = true;
    commitDragCtx?.();
    setTimeout(() => {
      suppressColsClick = false;
    }, 0);
  }
  cleanupColsCreate();
}
function onColsCreateCancel() {
  if (drag && crStarted) drag.cancel();
  cleanupColsCreate();
}
function onColsContextMenu(e) {
  if (crStarted || longPressTimer !== null) e.preventDefault();
}
function handleColsClick(e) {
  if (suppressColsClick) {
    suppressColsClick = false;
    return;
  }
  if (!oneventcreate || readOnly) return;
  if (e.target.closest(".tw-ev, .tw-ghost")) return;
  const day = dayCols[pointerDayIndex(e.clientX)];
  if (!day || day.isDisabled) return;
  const hour = Math.min(Math.max(pointerHour(e.clientY), startHour), endHour);
  if (isBlockedAt(day.ms, hour)) return;
  const startMs = clampToDayBand(
    Math.floor((day.ms + hour * HOUR_MS) / SNAP_MS) * SNAP_MS,
    day.ms
  );
  const durMin = minDuration ?? 60;
  oneventcreate({ start: new Date(startMs), end: new Date(startMs + durMin * 6e4) });
}
const DRAG_THRESHOLD = 5;
let evDragStartX = 0;
let evDragStartY = 0;
let evGrabOffsetMs = 0;
let evDragStarted = false;
let evDragMovable = false;
let evDragEvent = null;
function onEventPointerDown(e, ev) {
  if (e.button !== 0) return;
  e.stopPropagation();
  evDragMovable = !!drag && !readOnly && !ev.data?.readOnly;
  evDragStartX = e.clientX;
  evDragStartY = e.clientY;
  evGrabOffsetMs = pointerTimeMs(e.clientX, e.clientY) - ev.start.getTime();
  evDragStarted = false;
  evDragEvent = ev;
  window.addEventListener("pointermove", onEvMove);
  window.addEventListener("pointerup", onEvUp, { once: true });
  window.addEventListener("pointercancel", onEvCancel, { once: true });
}
function onEvMove(e) {
  const ev = evDragEvent;
  if (!drag || !ev || !evDragMovable) return;
  if (!evDragStarted) {
    const moved = Math.abs(e.clientX - evDragStartX) + Math.abs(e.clientY - evDragStartY);
    if (moved < DRAG_THRESHOLD) return;
    evDragStarted = true;
    drag.beginMove(ev.id, ev.start, ev.end);
  }
  const duration = ev.end.getTime() - ev.start.getTime();
  const raw = pointerTimeMs(e.clientX, e.clientY) - evGrabOffsetMs;
  const snapped = Math.round(raw / SNAP_MS) * SNAP_MS;
  drag.updatePointer(new Date(snapped), new Date(snapped + duration));
}
function cleanupEvDrag() {
  window.removeEventListener("pointermove", onEvMove);
  window.removeEventListener("pointerup", onEvUp);
  window.removeEventListener("pointercancel", onEvCancel);
  evDragStarted = false;
  evDragMovable = false;
  evDragEvent = null;
}
function onEvUp() {
  if (!evDragStarted && evDragEvent) {
    oneventclick?.(evDragEvent);
  } else if (evDragStarted && drag) {
    suppressColsClick = true;
    commitDragCtx?.();
    setTimeout(() => {
      suppressColsClick = false;
    }, 0);
  }
  cleanupEvDrag();
}
function onEvCancel() {
  if (drag && evDragStarted) drag.cancel();
  cleanupEvDrag();
}
let rsStartY = 0;
let rsStarted = false;
let rsEdge = "end";
let rsEvent = null;
function onResizePointerDown(e, ev, edge) {
  if (e.button !== 0 || !drag || readOnly || ev.data?.readOnly) return;
  e.stopPropagation();
  rsStartY = e.clientY;
  rsStarted = false;
  rsEdge = edge;
  rsEvent = ev;
  window.addEventListener("pointermove", onResizeMove);
  window.addEventListener("pointerup", onResizeUp, { once: true });
  window.addEventListener("pointercancel", onResizeCancel, { once: true });
}
function onResizeMove(e) {
  const ev = rsEvent;
  if (!drag || !ev) return;
  if (!rsStarted) {
    if (Math.abs(e.clientY - rsStartY) < CREATE_THRESHOLD) return;
    rsStarted = true;
    drag.beginResize(ev.id, rsEdge, ev.start, ev.end);
    addTouchScrollBlock();
  }
  const evDayMs = sod(ev.start.getTime());
  const raw = evDayMs + pointerHour(e.clientY) * HOUR_MS;
  const snapped = clampToDayBand(Math.round(raw / SNAP_MS) * SNAP_MS, evDayMs);
  if (rsEdge === "end") {
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
  rsStarted = false;
  rsEvent = null;
}
function onResizeUp() {
  if (drag && rsStarted) {
    suppressColsClick = true;
    commitDragCtx?.();
    setTimeout(() => {
      suppressColsClick = false;
    }, 0);
  } else if (rsEvent && !rsStarted) {
    oneventclick?.(rsEvent);
  }
  cleanupResize();
}
function onResizeCancel() {
  if (drag && rsStarted) drag.cancel();
  cleanupResize();
}
function onWindowKeydown(e) {
  if (e.key !== "Escape" || !drag?.active) return;
  drag.cancel();
  cleanupColsCreate();
  cleanupEvDrag();
  cleanupResize();
  suppressColsClick = true;
  window.addEventListener(
    "pointerup",
    () => setTimeout(() => {
      suppressColsClick = false;
    }, 0),
    { once: true }
  );
}
</script>

{#snippet allDayChip(seg: DaySegment)}
	<button
		type="button"
		class="tw-ad"
		class:tw-ad--start={seg.isStart}
		class:tw-ad--end={seg.isEnd}
		class:tw-ad--mid={!seg.isStart && !seg.isEnd}
		class:tw-ad--selected={selectedEventId === seg.ev.id}
		class:tw-ad--cancelled={seg.ev.status === 'cancelled'}
		style:--ev-color={seg.ev.color ?? 'var(--dt-accent)'}
		aria-label="{seg.ev.title}{seg.totalDays > 1 ? `, ${L.dayNOfTotal(seg.dayIndex, seg.totalDays)}` : `, ${L.allDay}`}{statusText(seg.ev)}"
		onclick={() => oneventclick?.(seg.ev)}
		onpointerenter={() => oneventhover?.(seg.ev)}
	>
		{#if !seg.isStart}
			<span class="tw-ad-cont" aria-hidden="true">◂</span>
		{/if}
		<span class="tw-ad-title">{seg.ev.title}</span>
		{#if seg.totalDays > 1}
			<span class="tw-ad-span" aria-hidden="true">{seg.dayIndex}/{seg.totalDays}</span>
		{/if}
		{#if !seg.isEnd && seg.totalDays > 1}
			<span class="tw-ad-arrow" aria-hidden="true">▸</span>
		{/if}
	</button>
{/snippet}

<svelte:window onkeydown={onWindowKeydown} />

<div
	class="tw"
	class:tw--auto={autoHeight}
	style={style || undefined}
	style:height={autoHeight ? undefined : (height ? `${height}px` : '100%')}
	role="region"
	aria-label={L.weekAhead}
>
	<div class="tw-scroll" bind:this={scrollEl}>
		<div class="tw-inner" style:min-width="{innerMinWidth}px">
			<!-- Sticky top: day headers + all-day strip -->
			{#if !hideDayHead || hasAllDayRow}
			<div class="tw-top">
				{#if !hideDayHead}
				<div class="tw-head">
					<div class="tw-corner" style:width="{GUTTER_W}px" aria-hidden="true"></div>
					{#each dayCols as day (day.ms)}
						<div
							class="tw-hd"
							class:tw-hd--today={day.isToday}
							aria-current={day.isToday ? 'date' : undefined}
						>
							<span class="tw-hd-wd">{singleDay ? weekdayLong(day.ms, locale) : weekdayShort(day.ms, locale)}</span>
							{#if showDates}
								<span class="tw-hd-num" class:tw-hd-num--today={day.isToday}>{day.dayNum}</span>
							{/if}
							{#if dayHeaderSnippet}
								<div class="tw-hd-custom">
									{@render dayHeaderSnippet({ date: new Date(day.ms), isToday: day.isToday, dayName: weekdayShort(day.ms, locale) })}
								</div>
							{/if}
						</div>
					{/each}
				</div>
				{/if}

				{#if hasAllDayRow}
					<div class="tw-allday">
						<div class="tw-ad-gutter" style:width="{GUTTER_W}px">
							<span class="tw-ad-gutter-lb">{L.allDay}</span>
						</div>
						{#each dayCols as day (day.ms)}
							{@const segs = allDayByDay.get(day.ms) ?? []}
							{@const isExpanded = adExpanded[day.ms] ?? false}
							{@const shown = isExpanded ? segs : segs.slice(0, ALLDAY_MAX)}
							<div class="tw-ad-cell" class:tw-ad-cell--today={day.isToday}>
								{#each shown as seg (seg.ev.id)}
									{@render allDayChip(seg)}
								{/each}
								{#if segs.length > ALLDAY_MAX}
									<button
										type="button"
										class="tw-ad-more"
										aria-expanded={isExpanded}
										onclick={() => { adExpanded[day.ms] = !isExpanded; }}
									>{isExpanded ? L.showLess : L.nMore(segs.length - ALLDAY_MAX)}</button>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</div>
			{/if}

			<!-- Grid body -->
			<div class="tw-body" style:height="{gridHeight}px">
				<!-- Time gutter -->
				<div class="tw-gutter" style:width="{GUTTER_W}px" aria-hidden="true">
					{#each { length: hourCount } as _, i}
						{#if i > 0}
							<span class="tw-gutter-lb" style:top="{i * HOUR_H}px">{fmtH(startHour + i, locale)}</span>
						{/if}
					{/each}
					{#if nowY !== null && weekHasToday}
						<span class="tw-gutter-now" style:top="{nowY}px"></span>
					{/if}
				</div>

				<!-- Day columns -->
				<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
				<div
					class="tw-cols"
					bind:this={colsEl}
					onclick={handleColsClick}
					onpointerdown={onColsPointerDown}
					oncontextmenu={onColsContextMenu}
					role="presentation"
				>
					<!-- Hour / half-hour guide lines (shared layer behind columns) -->
					<div class="tw-lines" aria-hidden="true">
						{#each { length: hourCount } as _, i}
							<div class="tw-line" style:top="{i * HOUR_H}px"></div>
							<div class="tw-line tw-line--half" style:top="{i * HOUR_H + HOUR_H / 2}px"></div>
						{/each}
					</div>

					{#each dayCols as day (day.ms)}
						{@const positioned = layoutByDay.get(day.ms) ?? []}
						{@const ghost = ghostForDay(day.ms)}
						<div
							class="tw-col"
							class:tw-col--today={day.isToday}
							class:tw-col--past={day.isPast}
							class:tw-col--weekend={day.isWeekend}
							class:tw-col--disabled={day.isDisabled}
							data-day={day.ms}
						>
							<!-- Blocked slot overlays -->
							{#if blockedSlots?.length}
								{#each blockedSlots as slot}
									{#if !slot.day || slot.day === day.isoDay}
										{@const s = Math.max(slot.start, startHour)}
										{@const e = Math.min(slot.end, endHour)}
										{#if e > s}
											{@const range = blockedRangeLabel(day.ms, slot.start, slot.end)}
											<div
												class="tw-blocked"
												style:top="{(s - startHour) * HOUR_H}px"
												style:height="{(e - s) * HOUR_H}px"
												title="{slot.label ? `${slot.label}, ` : ''}{range}"
												aria-label="{slot.label || 'Unavailable'}, {range}"
											>
												{#if slot.label}
													<span class="tw-blocked-lb">{slot.label}</span>
												{/if}
											</div>
										{/if}
									{/if}
								{/each}
							{/if}

							<!-- Timed events -->
							{#each positioned as p (p.ev.id)}
								{@const isCurrent = nowIds.has(p.ev.id)}
								<div
									class="tw-ev"
									class:tw-ev--selected={selectedEventId === p.ev.id}
									class:tw-ev--current={isCurrent}
									class:tw-ev--resizing={p.isResizing}
									class:tw-ev--readonly={p.ev.data?.readOnly}
									class:tw-ev--cancelled={p.ev.status === 'cancelled'}
									class:tw-ev--tentative={p.ev.status === 'tentative'}
									class:tw-ev--full={p.ev.status === 'full'}
									class:tw-ev--limited={p.ev.status === 'limited'}
									class:tw-ev--short={p.height < 44}
									class:tw-ev--compact={p.height < 34}
									style:top="{p.top}px"
									style:height="{p.height}px"
									style:left="calc({(p.col / p.totalCols) * 100}% + 1px)"
									style:width="calc({100 / p.totalCols}% - {p.totalCols > 1 ? 3 : 8}px)"
									style:--ev-color={p.ev.color ?? 'var(--dt-accent)'}
									role="button"
									tabindex="0"
									title={p.ev.title}
									aria-label="{p.ev.title}, {fmtTime(p.ev.start, locale)} – {fmtTime(p.ev.end, locale)}, {fmtDuration(p.ev.start, p.ev.end)}{statusText(p.ev)}{isCurrent ? ` (${L.inProgress})` : ''}"
									onpointerdown={(e) => onEventPointerDown(e, p.ev)}
									onpointerenter={() => oneventhover?.(p.ev)}
									onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); oneventclick?.(p.ev); } }}
								>
									<div class="tw-ev-stripe" aria-hidden="true"></div>
									<div class="tw-ev-body">
										<EventContent event={p.ev}>
											<span class="tw-ev-time">{fmtTime(p.ev.start, locale)} – {fmtTime(p.ev.end, locale)}</span>
											<span class="tw-ev-title">{p.ev.title}</span>
											{#if p.ev.location && p.height > 56}
												<span class="tw-ev-loc">{p.ev.location}</span>
											{/if}
										</EventContent>
									</div>
									{#if isCurrent}
										<span class="tw-ev-live" aria-hidden="true"></span>
									{/if}
									{#if !readOnly && !p.ev.data?.readOnly}
										<span
											class="tw-ev-handle tw-ev-handle--start"
											aria-hidden="true"
											onpointerdown={(e) => onResizePointerDown(e, p.ev, 'start')}
										></span>
										<span
											class="tw-ev-handle tw-ev-handle--end"
											aria-hidden="true"
											onpointerdown={(e) => onResizePointerDown(e, p.ev, 'end')}
										></span>
									{/if}
								</div>
							{/each}

							<!-- Move / create ghost -->
							{#if ghost}
								<div
									class="tw-ghost"
									class:tw-ghost--create={ghost.create}
									style:top="{ghost.top}px"
									style:height="{ghost.height}px"
									style:--ev-color={ghost.create
										? 'var(--dt-accent, #2563eb)'
										: (movingEvent?.color ?? 'var(--dt-accent, #2563eb)')}
									aria-hidden="true"
								>
									{#if ghost.showTime}
										<span class="tw-ghost-time">
											{fmtTime(ghost.start, locale)} – {fmtTime(ghost.end, locale)}
										</span>
										{#if !ghost.create && movingEvent}
											<span class="tw-ghost-title">{movingEvent.title}</span>
										{/if}
									{/if}
								</div>
							{/if}

							<!-- Now line (today's column only) -->
							{#if day.isToday && nowY !== null}
								<div class="tw-now" style:top="{nowY}px" aria-label={L.currentTime}>
									<span class="tw-now-dot" aria-hidden="true"></span>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Empty-week hint — overlaid, pointer events pass through to the grid -->
	{#if weekIsEmpty && ctx.emptySnippet}
		<div class="tw-empty">
			{@render ctx.emptySnippet()}
		</div>
	{/if}
</div>

<style>
	/* ─── Container ──────────────────────────────────── */
	.tw {
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		user-select: none;
		font-variant-numeric: tabular-nums;
		background: var(--dt-bg, #ffffff);
		-webkit-tap-highlight-color: transparent;
	}
	.tw--auto { overflow: visible; }

	/* ─── Scroll container ───────────────────────────── */
	.tw-scroll {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		overflow-x: auto;
		overscroll-behavior: contain;
		scrollbar-width: thin;
		scrollbar-color: var(--dt-scrollbar, rgba(0, 0, 0, 0.1)) transparent;
	}
	.tw--auto .tw-scroll { overflow-y: visible; }
	.tw-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
	.tw-scroll::-webkit-scrollbar-thumb {
		background: var(--dt-scrollbar, rgba(0, 0, 0, 0.1));
		border-radius: 4px;
	}
	.tw-scroll::-webkit-scrollbar-track { background: transparent; }

	.tw-inner {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	/* ─── Sticky top (header + all-day) ──────────────── */
	.tw-top {
		position: sticky;
		top: 0;
		z-index: 30;
		background: var(--dt-bg, #ffffff);
		border-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
	}

	/* ─── Day header row ─────────────────────────────── */
	.tw-head {
		display: flex;
	}

	.tw-corner {
		flex-shrink: 0;
		position: sticky;
		left: 0;
		z-index: 2;
		background: var(--dt-bg, #ffffff);
	}

	.tw-hd {
		flex: 1 1 0;
		min-width: 110px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		padding: 8px 4px 6px;
		border-left: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
	}

	.tw-hd-wd {
		font: 500 10px/1 var(--dt-sans, system-ui, sans-serif);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
	}
	.tw-hd--today .tw-hd-wd {
		color: var(--dt-accent, #2563eb);
		font-weight: 600;
	}

	.tw-hd-num {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 26px;
		height: 26px;
		border-radius: 50%;
		font: 600 14px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
	}
	.tw-hd-num--today {
		background: var(--dt-accent, #2563eb);
		color: var(--dt-accent-fg, #ffffff);
		font-weight: 700;
	}

	.tw-hd-custom {
		max-width: 100%;
		overflow: hidden;
	}

	/* ─── All-day strip ──────────────────────────────── */
	.tw-allday {
		display: flex;
		border-top: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
	}

	.tw-ad-gutter {
		flex-shrink: 0;
		position: sticky;
		left: 0;
		z-index: 2;
		background: var(--dt-bg, #ffffff);
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;
		padding: 4px 6px 4px 0;
	}
	.tw-ad-gutter-lb {
		font: 500 10px/1.2 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		text-align: right;
	}

	.tw-ad-cell {
		flex: 1 1 0;
		min-width: 110px;
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 3px 3px 4px;
		border-left: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
	}
	.tw-ad-cell--today { background: var(--dt-today-bg, rgba(37, 99, 235, 0.04)); }

	.tw-ad {
		appearance: none;
		display: flex;
		align-items: center;
		gap: 3px;
		padding: 2px 6px;
		min-height: 18px;
		border: none;
		border-radius: 3px;
		background: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));
		border-left: 2.5px solid var(--ev-color);
		cursor: pointer;
		overflow: hidden;
		text-align: left;
		transition: background 0.12s;
		-webkit-tap-highlight-color: transparent;
	}
	.tw-ad:hover {
		background: color-mix(in srgb, var(--ev-color) 32%, var(--dt-surface, var(--dt-bg, #ffffff)));
	}
	.tw-ad--mid,
	.tw-ad--end:not(.tw-ad--start) {
		border-left: 1px dashed color-mix(in srgb, var(--ev-color) 40%, transparent);
		border-radius: 0 3px 3px 0;
	}
	.tw-ad--selected {
		box-shadow: 0 0 0 1.5px var(--ev-color);
	}
	.tw-ad--cancelled .tw-ad-title {
		text-decoration: line-through;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
	}
	.tw-ad:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
	}

	.tw-ad-title {
		font: 500 11px/1.2 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex: 1;
		min-width: 0;
	}
	.tw-ad-span {
		font: 400 10px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		flex-shrink: 0;
	}
	.tw-ad-cont,
	.tw-ad-arrow {
		font-size: 10px;
		color: var(--ev-color);
		flex-shrink: 0;
		line-height: 1;
	}
	.tw-ad-arrow { margin-left: auto; }

	.tw-ad-more {
		appearance: none;
		background: none;
		border: none;
		border-radius: 3px;
		text-align: left;
		align-self: flex-start;
		font: 500 10px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		padding: 2px 6px;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}
	.tw-ad-more:hover { color: var(--dt-text, rgba(0, 0, 0, 0.87)); }
	.tw-ad-more:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
	}

	/* ─── Grid body ──────────────────────────────────── */
	.tw-body {
		display: flex;
		position: relative;
	}

	/* ─── Time gutter ────────────────────────────────── */
	.tw-gutter {
		flex-shrink: 0;
		position: sticky;
		left: 0;
		z-index: 20;
		background: var(--dt-bg, #ffffff);
		border-right: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
	}

	.tw-gutter-lb {
		position: absolute;
		right: 6px;
		transform: translateY(-50%);
		font: 500 11px/1 var(--dt-mono, ui-monospace, monospace);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		white-space: nowrap;
	}

	.tw-gutter-now {
		position: absolute;
		right: -3px;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--dt-accent, #2563eb);
		transform: translateY(-50%);
		z-index: 2;
	}

	/* ─── Columns wrapper ────────────────────────────── */
	.tw-cols {
		flex: 1;
		display: flex;
		position: relative;
		min-width: 0;
	}

	/* ─── Guide lines ────────────────────────────────── */
	.tw-lines {
		position: absolute;
		inset: 0;
		pointer-events: none;
		/* Above the columns' background washes, below blocked/events/now */
		z-index: 1;
	}
	.tw-line {
		position: absolute;
		left: 0;
		right: 0;
		height: 1px;
		background: var(--dt-border, rgba(0, 0, 0, 0.08));
	}
	.tw-line--half { opacity: 0.4; }

	/* ─── Day column ─────────────────────────────────── */
	.tw-col {
		flex: 1 1 0;
		min-width: 110px;
		position: relative;
		border-left: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
		box-sizing: border-box;
	}
	/* The gutter's right border already bounds the first column */
	.tw-lines + .tw-col { border-left: none; }

	.tw-col--today { background: var(--dt-today-bg, rgba(37, 99, 235, 0.04)); }
	/* Dim past days with a wash, never a subtree opacity (event contrast) */
	.tw-col--past {
		background: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 2.5%, transparent);
	}
	.tw-col--weekend:not(.tw-col--today):not(.tw-col--past) {
		background: var(--dt-weekend-bg, rgba(0, 0, 0, 0.012));
	}
	.tw-col--disabled {
		background: repeating-linear-gradient(
			45deg,
			transparent,
			transparent 6px,
			var(--dt-border, rgba(0, 0, 0, 0.08)) 6px,
			var(--dt-border, rgba(0, 0, 0, 0.08)) 7px
		) !important;
	}

	/* ─── Blocked slot overlay ───────────────────────── */
	.tw-blocked {
		position: absolute;
		left: 0;
		right: 0;
		z-index: 2;
		background: repeating-linear-gradient(
			-45deg,
			color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent),
			color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent) 4px,
			transparent 4px,
			transparent 8px
		);
		pointer-events: none;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		overflow: hidden;
	}
	.tw-blocked-lb {
		font: 500 10px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		text-transform: uppercase;
		letter-spacing: 0.04em;
		white-space: nowrap;
		padding-top: 4px;
	}

	/* ─── Now line ───────────────────────────────────── */
	.tw-now {
		position: absolute;
		left: 0;
		right: 0;
		height: 2px;
		background: var(--dt-accent, #2563eb);
		box-shadow: 0 0 6px var(--dt-glow, rgba(37, 99, 235, 0.25));
		z-index: 12;
		pointer-events: none;
		transform: translateY(-1px);
	}
	.tw-now-dot {
		position: absolute;
		left: -4px;
		top: -3px;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--dt-accent, #2563eb);
	}

	/* ─── Events ─────────────────────────────────────── */
	.tw-ev {
		position: absolute;
		z-index: 6;
		border-radius: 5px;
		background: color-mix(in srgb, var(--ev-color) 14%, var(--dt-surface, var(--dt-bg, #ffffff)));
		display: flex;
		align-items: stretch;
		overflow: hidden;
		cursor: grab;
		/* Pointer drags move the event, never scroll the grid */
		touch-action: none;
		transition: box-shadow 120ms, background 120ms;
		box-sizing: border-box;
		min-height: 24px;
		-webkit-tap-highlight-color: transparent;
	}
	.tw-ev:hover {
		background: color-mix(in srgb, var(--ev-color) 24%, var(--dt-surface, var(--dt-bg, #ffffff)));
		z-index: 8;
	}
	/* Short blocks keep duration-proportional height, but get a 44px
	   transparent hit-slop so clicks/taps still land. */
	.tw-ev--short { overflow: visible; }
	.tw-ev--short::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		height: 44px;
	}
	.tw-ev--selected {
		box-shadow: 0 0 0 2px var(--ev-color),
			0 2px 12px color-mix(in srgb, var(--ev-color) 25%, transparent);
		z-index: 9;
	}
	.tw-ev--current {
		background: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));
	}
	.tw-ev--resizing {
		z-index: 50;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
		cursor: ns-resize;
	}
	/* Status treatments: token-level dims + a non-opacity signal
	   (strikethrough / border style) — consistent with the other views. */
	.tw-ev--cancelled {
		background: color-mix(in srgb, var(--ev-color) 5%, var(--dt-surface, var(--dt-bg, #ffffff)));
	}
	.tw-ev--cancelled .tw-ev-title {
		text-decoration: line-through;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
	}
	.tw-ev--cancelled .tw-ev-stripe { opacity: 0.45; /* decorative bar only */ }
	.tw-ev--tentative {
		background: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, var(--dt-bg, #ffffff)));
		border: 1px dashed color-mix(in srgb, var(--ev-color) 45%, transparent);
	}
	.tw-ev--full {
		background: color-mix(in srgb, var(--ev-color) 6%, var(--dt-surface, var(--dt-bg, #ffffff)));
		border: 1px solid color-mix(in srgb, var(--ev-color) 30%, transparent);
	}
	.tw-ev--full .tw-ev-title { color: var(--dt-text-2, rgba(0, 0, 0, 0.54)); }
	.tw-ev--limited {
		background: color-mix(in srgb, var(--ev-color) 8%, var(--dt-surface, var(--dt-bg, #ffffff)));
		border: 1px dashed color-mix(in srgb, var(--ev-color) 45%, transparent);
	}
	.tw-ev--readonly { cursor: default; }

	.tw-ev-stripe {
		width: 3px;
		background: var(--ev-color);
		flex-shrink: 0;
		border-radius: 5px 0 0 5px;
	}

	.tw-ev-body {
		flex: 1;
		min-width: 0;
		padding: 3px 6px;
		display: flex;
		flex-direction: column;
		gap: 1px;
		overflow: hidden;
	}
	/* Compact (< ~35min at default zoom): single inline line "9:00 Title" */
	.tw-ev--compact .tw-ev-body {
		flex-direction: row;
		align-items: center;
		gap: 4px;
		padding-top: 1px;
		padding-bottom: 1px;
	}

	.tw-ev-time {
		font: 400 11px/1.1 var(--dt-mono, ui-monospace, monospace);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		white-space: nowrap;
		flex-shrink: 0;
	}
	.tw-ev--compact .tw-ev-time { order: 0; }

	.tw-ev-title {
		font: 600 12px/1.2 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tw-ev-loc {
		font: 400 10px/1.2 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tw-ev-live {
		position: absolute;
		top: 4px;
		right: 4px;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--ev-color, var(--dt-accent));
		animation: tw-pulse 2s ease-in-out infinite;
	}
	@keyframes tw-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}

	/* ─── Resize handles ─────────────────────────────── */
	.tw-ev-handle {
		position: absolute;
		left: 0;
		right: 0;
		height: 8px;
		z-index: 2;
		cursor: ns-resize;
		touch-action: none;
	}
	.tw-ev-handle--start { top: 0; }
	.tw-ev-handle--end { bottom: 0; }
	/* Hit-slop: ≥20px effective, extending inward so overflow clipping
	   can't cut it off. */
	.tw-ev-handle::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		height: 20px;
	}
	.tw-ev-handle--start::before { top: 0; }
	.tw-ev-handle--end::before { bottom: 0; }
	/* Short events: shrink the slop so a move-grab area survives */
	.tw-ev--short .tw-ev-handle::before { height: 12px; }
	.tw-ev-handle::after {
		content: '';
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 20px;
		height: 3px;
		border-radius: 2px;
		background: var(--ev-color);
		opacity: 0;
		transition: opacity 120ms;
	}
	.tw-ev-handle--start::after { top: 1px; }
	.tw-ev-handle--end::after { bottom: 1px; }
	.tw-ev:hover .tw-ev-handle::after,
	.tw-ev:focus-within .tw-ev-handle::after,
	.tw-ev:focus-visible .tw-ev-handle::after,
	.tw-ev--resizing .tw-ev-handle::after,
	.tw-ev--selected .tw-ev-handle::after { opacity: 0.55; }
	/* Coarse pointers can't hover — show the grips persistently */
	@media (hover: none) {
		.tw-ev-handle::after { opacity: 0.55; }
	}

	/* ─── Move / create ghost ────────────────────────── */
	.tw-ghost {
		position: absolute;
		left: 1px;
		right: 3px;
		z-index: 40;
		border-radius: 5px;
		background: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));
		outline: 1px solid color-mix(in srgb, var(--ev-color) 45%, transparent);
		box-shadow: 0 6px 18px color-mix(in srgb, var(--ev-color) 24%, rgba(0, 0, 0, 0.22));
		display: flex;
		flex-direction: column;
		gap: 1px;
		padding: 3px 6px;
		overflow: hidden;
		pointer-events: none;
		cursor: grabbing;
		box-sizing: border-box;
	}
	.tw-ghost--create {
		background: color-mix(in srgb, var(--ev-color) 12%, transparent);
		outline: 1px dashed color-mix(in srgb, var(--ev-color) 60%, transparent);
		box-shadow: none;
	}
	.tw-ghost-time {
		font: 600 11px/1.1 var(--dt-mono, ui-monospace, monospace);
		color: var(--ev-color, var(--dt-accent, #2563eb));
		white-space: nowrap;
	}
	.tw-ghost-title {
		font: 600 12px/1.2 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* ─── Empty overlay ──────────────────────────────── */
	.tw-empty {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		z-index: 4;
	}

	/* ─── Focus-visible ──────────────────────────────── */
	/* box-shadow instead of outline: outlines get clipped by the
	   overflow: hidden scroll container. */
	.tw-ev:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
		z-index: 9;
	}

	/* ─── Reduced motion ─────────────────────────────── */
	@media (prefers-reduced-motion: reduce) {
		.tw-ev,
		.tw-ad,
		.tw-ev-handle::after {
			transition: none;
		}
		.tw-ev-live { animation: none; }
	}
</style>
