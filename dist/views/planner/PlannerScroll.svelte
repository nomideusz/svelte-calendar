<!--
  week-scroll — the multi-week vertical scroller (Hey Calendar style).

  This is the PlannerWeek that 97f7f492 (2026-08-01) replaced with the
  vertical time grid, restored as an optional view beside 'week-planner'.

  Modelled after Hey Calendar's week view:
  • Weeks stack vertically. Scroll up = past, down = future.
  • Day headers in each week row: "MON 23", "TUE 24", with accent pill for today.
  • Month label in left gutter, vertical bottom-to-top.
  • Events are clean horizontal bars with colour fill, "9AM- 10AM Title" inline.
  • Generous whitespace, thin dividers, minimal chrome.
-->
<script lang="ts">import { onMount, tick, untrack } from "svelte";
import { flip } from "svelte/animate";
import { crossfade } from "svelte/transition";
import { prefersReducedMotion } from "svelte/motion";
import { useCalendarContext } from "../shared/context.svelte.js";
import EventContent from "../shared/EventContent.svelte";
import { createClock } from "../../core/clock.svelte.js";
import { DAY_MS, HOUR_MS, sod } from "../../core/time.js";
import { startOfWeek as sowFn, isAllDay, isMultiDay, segmentForDay } from "../../core/time.js";
import { weekdayShort, monthLong, fmtTime as _fmtTime, getLabels } from "../../core/locale.js";
import { createChipFit } from "../shared/chip-fit.svelte.js";
const L = $derived(getLabels());
let { mondayStart = true, locale, height = 520, events = [], style = "", focusDate, oneventclick, oneventcreate, onexternaldrop, selectedEventId = null, readOnly = false, visibleHours } = $props();
const ctx = useCalendarContext();
const clock = createClock(ctx.timezone);
// Drag ghost flies between day cells instead of teleporting.
// No fallback: without a counterpart (drag start/end) it appears/disappears instantly.
const [previewSend, previewReceive] = crossfade({ duration: () => prefersReducedMotion.current ? 0 : 160 });
const drag = $derived(ctx.drag);
// Cards flip only while a drag is live: a data load must never animate
// every chip into place (that read as the whole grid jittering).
const ANIM = $derived(prefersReducedMotion.current || !drag?.active ? 0 : 180);
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
// ─── Buffer config ─────────────────────────────
const INITIAL_BUFFER = 8;
const EXTEND_BY = 8;
const EDGE_PX = 200;
let bufferBefore = $state(INITIAL_BUFFER);
let bufferAfter = $state(INITIAL_BUFFER);
const MAX_EVENTS_SHOWN = 5;
// ─── Geometry ───────────────────────────────────
// A row is as tall as its busiest day: a week with seven classes on Monday
// is worth the height. It was briefly a constant, which made the scroll
// arithmetic exact and clipped exactly the days you most need to read.
// Nothing needs equal rows now — the prepend is compensated by row
// identity, a drag maps by hit-testing the row under the pointer, and the
// mount re-centres once the events have landed.
const CHIP_H = 22;
const CHIP_GAP = 3;
const ROW_MIN = 120;
const ROW_MARGIN = 12;
/** Distance between two rows' tops; only a fallback now. */
function rowPitch() {
	const rows = el?.querySelectorAll("[data-week]");
	return rows && rows.length > 1 ? rows[1].offsetTop - rows[0].offsetTop : ROW_MIN + ROW_MARGIN;
}
const _initMs = untrack(() => sod(focusDate?.getTime() ?? Date.now()));
let internalFocusMs = $state(_initMs);
let lastExternalMs = _initMs;
let el;
function scrollWeekIntoContainer(targetMs, behavior = "auto") {
	if (!el) return;
	let target = null;
	if (targetMs !== undefined) {
		// Find the week row containing this date
		const rows = el.querySelectorAll("[data-week]");
		for (const row of rows) {
			const weekMs = Number(row.dataset.week);
			if (weekMs <= targetMs && targetMs < weekMs + customDays * DAY_MS) {
				target = row;
				break;
			}
		}
	}
	// Fall back to current week
	if (!target) target = el.querySelector(".wg-week--current");
	if (!target) return;
	const targetTop = target.offsetTop - (el.clientHeight - target.offsetHeight) / 2;
	el.scrollTo({
		top: Math.max(0, targetTop),
		behavior
	});
}
// ─── Derived ────────────────────────────────────────
const todayMs = $derived(clock.today);
const customDays = $derived(viewState?.dayCount ?? 7);
const anchorPeriodStart = $derived(customDays === 7 ? sowFn(internalFocusMs, mondayStart) : sod(internalFocusMs));
// ─── Declare load range for entire visible buffer ────────
// Instead of calling store.load() directly, we tell Calendar
// what range we need. Calendar's single $effect handles loading.
$effect(() => {
	if (!loadRangeCtx) return;
	const rangeStart = new Date(anchorPeriodStart - bufferBefore * customDays * DAY_MS);
	const rangeEnd = new Date(anchorPeriodStart + (bufferAfter + 1) * customDays * DAY_MS);
	loadRangeCtx.set({
		start: rangeStart,
		end: rangeEnd
	});
	return () => loadRangeCtx.set(null);
});
const weeks = $derived.by(() => {
	const result = [];
	for (let w = -bufferBefore; w <= bufferAfter; w++) {
		const periodStart = anchorPeriodStart + w * customDays * DAY_MS;
		const isCurrent = todayMs >= periodStart && todayMs < periodStart + customDays * DAY_MS;
		const days = [];
		for (let d = 0; d < customDays; d++) {
			const ms = periodStart + d * DAY_MS;
			const date = new Date(ms);
			const dayNum = date.getDate();
			const dow = date.getDay();
			const isWeekend = dow === 0 || dow === 6;
			const isToday = ms === todayMs;
			const isPast = equalDays ? false : ms < todayMs;
			const isFirstOfMonth = dayNum === 1;
			const monthLabel = d === 0 || isFirstOfMonth ? monthLong(ms, locale).toUpperCase() : null;
			const dayEnd = ms + DAY_MS;
			const dayEventsAll = events.filter((ev) => ev.start.getTime() < dayEnd && ev.end.getTime() > ms).sort((a, b) => a.start.getTime() - b.start.getTime());
			// Separate all-day / multi-day from timed events
			const timedEvents = [];
			const allDaySegments = [];
			for (const ev of dayEventsAll) {
				if (isAllDay(ev) || isMultiDay(ev)) {
					const seg = segmentForDay(ev, ms);
					if (seg) allDaySegments.push(seg);
				} else {
					timedEvents.push(ev);
				}
			}
			days.push({
				ms,
				dayNum,
				isToday,
				isPast,
				isWeekend,
				isFirstOfMonth,
				monthLabel,
				events: timedEvents,
				allDaySegments
			});
		}
		// Month label: show when first day of period is day 1-7 (for 7-day), or first day of period (for custom)
		const startDate = new Date(periodStart);
		const showMonth = customDays === 7 ? startDate.getDate() <= 7 : startDate.getDate() <= customDays;
		const monthLabel = showMonth ? monthLong(periodStart, locale).toUpperCase() : null;
		result.push({
			weekStart: periodStart,
			isCurrent,
			monthLabel,
			days
		});
	}
	// Filter hidden days if hideDays is set
	if (hideDays?.length) {
		for (const row of result) {
			row.days = row.days.filter((d) => {
				const isoDay = new Date(d.ms).getDay();
				// Convert JS day (0=Sun) to ISO (7=Sun)
				const iso = isoDay === 0 ? 7 : isoDay;
				return !hideDays.includes(iso);
			});
		}
	}
	return result;
});
// ─── Format helpers ─────────────────────────────────
function fmtAmPm(d) {
	return _fmtTime(d, locale);
}
// ─── Scroll to current week on mount ────────────────
onMount(() => {
	tick().then(() => scrollWeekIntoContainer());
	return () => cancelAnimationFrame(syncRaf);
});
// Rows grow when their events arrive, which moves every row below them —
// including the one we centred on an empty grid. Centre once more when the
// first events land, and never again, so this can't fight a reader who has
// already taken hold of the scroller.
let settled = $state(false);
$effect(() => {
	if (settled || !events.length) return;
	settled = true;
	tick().then(() => {
		if (!touched) scrollWeekIntoContainer(internalFocusMs);
	});
});
/** A real reader gesture (wheel or press), as opposed to a scroll we caused
*  ourselves. Keyboard is not watched: the re-centre happens milliseconds
*  after mount, before anyone has reached for a key, and a keydown handler
*  on the grid element would need a tabindex it should not have. */
let touched = false;
/** Attached, not bound in markup: a handler on the `role="grid"` element
*  would demand a tabindex the scroller should not carry. */
function watchTouch(root) {
	const on = () => {
		touched = true;
	};
	root.addEventListener("wheel", on, { passive: true });
	root.addEventListener("pointerdown", on);
	return () => {
		root.removeEventListener("wheel", on);
		root.removeEventListener("pointerdown", on);
	};
}
// ─── External navigation (arrows, goToday) ──────────
// Only a focus that lands in ANOTHER period than the one the scroll
// already reported re-anchors the buffer. The scroll sync below writes
// the centre week back through viewState, and that value comes back
// here as `focusDate` — compared by day it could differ by hours (zoned
// dates) and the view re-anchored on itself: the whole buffer rebuilt
// around the centre week and scrolled to it. That was the big jump.
const periodOf = (ms) => customDays === 7 ? sowFn(ms, mondayStart) : sod(ms);
$effect(() => {
	const ext = focusDate ? sod(focusDate.getTime()) : clock.today;
	if (periodOf(ext) !== periodOf(lastExternalMs)) {
		lastExternalMs = ext;
		internalFocusMs = ext;
		bufferBefore = INITIAL_BUFFER;
		bufferAfter = INITIAL_BUFFER;
		tick().then(() => scrollWeekIntoContainer(ext));
	}
});
/** Push the week at the viewport centre to viewState (drives the header label + Today button). */
function syncFocusFromScroll() {
	if (!el || !viewState) return;
	const centerY = el.scrollTop + el.clientHeight / 2;
	const rows = el.querySelectorAll("[data-week]");
	for (const row of rows) {
		if (row.offsetTop + row.offsetHeight >= centerY) {
			const ms = Number(row.dataset.week);
			if (Number.isFinite(ms) && ms !== lastExternalMs) {
				lastExternalMs = ms;
				viewState.setFocusDate(new Date(ms));
			}
			return;
		}
	}
}
let extending = false;
let syncRaf = 0;
function handleUserScroll() {
	// syncFocusFromScroll does querySelectorAll + offsetTop reads —
	// rAF-throttle it so scroll ticks stay cheap.
	if (!syncRaf) {
		syncRaf = requestAnimationFrame(() => {
			syncRaf = 0;
			if (!extending) syncFocusFromScroll();
		});
	}
	if (!el || extending) return;
	// Extend buffer when user scrolls near the edge
	if (el.scrollTop < EDGE_PX) {
		extending = true;
		// Anchor on the first rendered row: after the prepend the same row
		// must sit at the same offset from the viewport top. (The browser's
		// own scroll anchoring is off on .wg-body — two compensations for
		// one insertion was the jump.)
		const first = el.querySelector("[data-week]");
		const key = first?.dataset.week;
		const offset = first ? first.offsetTop - el.scrollTop : 0;
		bufferBefore += EXTEND_BY;
		tick().then(() => {
			const row = key ? el.querySelector(`[data-week="${key}"]`) : null;
			el.scrollTop = row ? row.offsetTop - offset : el.scrollTop + EXTEND_BY * rowPitch();
			extending = false;
		});
	} else {
		const bottomRemaining = el.scrollHeight - el.clientHeight - el.scrollTop;
		if (bottomRemaining < EDGE_PX) {
			bufferAfter += EXTEND_BY;
		}
	}
}
/** Where a new thing lands on this day, or null when the day refuses it.
*  A cell is a whole day here — there is no time axis to drop onto — so
*  everything starts at the first visible hour. One rule, so an empty-cell
*  click and a drop from outside can never disagree about a day. */
function dayDropStart(ms) {
	if (disabledSet.has(ms)) return null;
	const startHour = visibleHours?.[0] ?? 9;
	if (blockedSlots?.length) {
		const jsDay = new Date(ms).getDay();
		const isoDay = jsDay === 0 ? 7 : jsDay;
		const blocked = blockedSlots.some((slot) => {
			if (slot.day && slot.day !== isoDay) return false;
			return startHour >= slot.start && startHour < slot.end;
		});
		if (blocked) return null;
	}
	return new Date(ms + startHour * HOUR_MS);
}
function handleDayCellClick(ms, e) {
	const target = e.target;
	if (target.closest(".wg-ev, .wg-ad, .wg-ev-more")) return;
	if (readOnly || !oneventcreate) return;
	const start = dayDropStart(ms);
	if (!start) return;
	const durMin = minDuration ? Math.max(60, minDuration) : 60;
	oneventcreate({
		start,
		end: new Date(start.getTime() + durMin * 6e4)
	});
}
// ─── External drop (HTML5 DnD) ──────────────────────
// A class chip dragged in from outside the calendar; the cell it is over
// lights up so the day it would land on is never in doubt.
let dropDayMs = $state(null);
function onCellDragOver(e, ms) {
	if (!onexternaldrop || readOnly || !dayDropStart(ms)) return;
	e.preventDefault();
	if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
	dropDayMs = ms;
}
function onCellDragLeave(ms) {
	if (dropDayMs === ms) dropDayMs = null;
}
function onCellDrop(e, ms) {
	dropDayMs = null;
	if (!onexternaldrop || readOnly || !e.dataTransfer) return;
	const start = dayDropStart(ms);
	if (!start) return;
	e.preventDefault();
	onexternaldrop({
		start,
		dataTransfer: e.dataTransfer
	});
}
// ─── Event drag-to-move ───────────────────────────────────────
const DRAG_THRESHOLD = 8;
let evDragStartX = 0;
let evDragStartY = 0;
let evDragStarted = false;
let evDragging = $state(false);
let evDragId = $state(null);
let evDragEvent = null;
/** The pressed chip's rect, caught before any re-render can move it. */
let evAnchor;
/** Whether THIS press may become a move (see onEventPointerDown). */
let evDragMovable = false;
let evLastX = 0;
let evLastY = 0;
// Frozen at drag start: columns do not reflow mid-drag.
let evCellW = 100;
/** The week the press started in — rows differ in height, so the vertical
*  step is the row under the pointer, found by hit-test, not by division.
*  Held as a timestamp: an extension can renumber rows mid-drag. */
let evStartWeekMs = 0;
const dragPreviewEvent = $derived.by(() => {
	const payload = drag?.active && drag.mode === "move" ? drag.payload : null;
	if (!payload?.eventId) return null;
	const ev = events.find((event) => event.id === payload.eventId);
	if (!ev) return null;
	return {
		...ev,
		start: payload.start,
		end: payload.end
	};
});
function isDraggedEvent(eventId) {
	return dragPreviewEvent?.id === eventId;
}
function timedEventsForDay(day) {
	if (!dragPreviewEvent) return day.events;
	return day.events.filter((ev) => ev.id !== dragPreviewEvent.id);
}
// Crossfade keys for the previews, snapshotted at render time. Transition
// params are evaluated lazily at unmount — after the drag payload is
// already null — so they must never read the reactive preview directly.
// Plain Map (not $state): written during render, read only by transitions.
const previewKeySnapshot = new Map();
function dragPreviewTimedForDay(dayMs) {
	const ev = dragPreviewEvent;
	if (!ev || isAllDay(ev) || isMultiDay(ev)) return null;
	const dayEnd = dayMs + DAY_MS;
	const hit = ev.start.getTime() < dayEnd && ev.end.getTime() > dayMs;
	if (hit) previewKeySnapshot.set("timed", ev.id);
	return hit ? ev : null;
}
function dragPreviewSegmentForDay(dayMs) {
	const ev = dragPreviewEvent;
	if (!ev || !isAllDay(ev) && !isMultiDay(ev)) return null;
	const seg = segmentForDay(ev, dayMs);
	if (seg) previewKeySnapshot.set(dayMs, `${ev.id}:${seg.dayIndex}`);
	return seg;
}
// ─── Chip labels ────────────────────────────────
// A chip is one line and holds more than fits: it gives up the room, and
// only the room. The time stays whatever happens — this is a schedule, and
// "18:00 Hatha dla p…" answers more than an untruncated title does. (The
// time was briefly droppable, to buy the title room to fit whole. It
// usually bought nothing: a title long enough to push the time out was
// long enough to be cut anyway, so the chip lost its time for no gain.)
// createChipFit measures, fitParts decides.
const CHIP_PAD_X = 12;
const CHIP_GAP_X = 5;
const fit = createChipFit({
	slot: ".wg-cell",
	fonts: {
		title: ".wg-probe .wg-ev-title",
		time: ".wg-probe .wg-ev-time",
		room: ".wg-probe .wg-ev-loc"
	}
});
function chipParts(ev) {
	return fit.parts([
		{
			key: "time",
			text: fmtAmPm(ev.start),
			font: fit.fonts.time,
			priority: 0,
			extra: CHIP_GAP_X
		},
		{
			key: "title",
			text: ev.title,
			font: fit.fonts.title,
			priority: 0
		},
		{
			key: "room",
			text: ev.location ?? "",
			font: fit.fonts.room,
			priority: 1,
			extra: CHIP_GAP_X
		}
	], CHIP_PAD_X);
}
function getCellWidth() {
	const cell = el?.querySelector(".wg-cell");
	return cell ? cell.getBoundingClientRect().width : 100;
}
/** The week row under this viewport Y, as its start timestamp. */
function weekMsAtY(clientY) {
	const rows = el?.querySelectorAll("[data-week]");
	if (!rows?.length) return 0;
	for (const row of rows) {
		if (clientY < row.getBoundingClientRect().bottom) return Number(row.dataset.week);
	}
	return Number(rows[rows.length - 1].dataset.week);
}
function onEventPointerDown(e, ev) {
	if (e.button !== 0) return;
	e.stopPropagation();
	evAnchor = e.currentTarget.getBoundingClientRect();
	// Even an event that cannot move — a read-only view, a read-only event,
	// and most of a schedule is read-only occurrences — still goes through
	// the pointerup path, so a plain click opens it. Refusing the press
	// outright made three quarters of the chips dead to the mouse.
	evDragMovable = !!drag && !readOnly && !ev.data?.readOnly;
	evDragStartX = e.clientX;
	evDragStartY = e.clientY;
	evLastX = e.clientX;
	evLastY = e.clientY;
	evDragStarted = false;
	evDragId = ev.id;
	evDragEvent = ev;
	window.addEventListener("pointermove", onEvWindowPointerMove);
	window.addEventListener("pointerup", onEvWindowPointerUp, { once: true });
	window.addEventListener("pointercancel", onEvWindowPointerCancel, { once: true });
}
/** Where the dragged event sits for the pointer's current offset. */
function updateDragFromPointer() {
	const ev = evDragEvent;
	if (!drag || !ev) return;
	const dayOffset = Math.round((evLastX - evDragStartX) / evCellW);
	const nowWeekMs = weekMsAtY(evLastY);
	// A vertical row step spans one period (customDays), not always 7 days
	const weekOffset = evStartWeekMs && nowWeekMs ? Math.round((nowWeekMs - evStartWeekMs) / (customDays * DAY_MS)) : 0;
	const deltaMs = (dayOffset + weekOffset * customDays) * DAY_MS;
	drag.updatePointer(new Date(ev.start.getTime() + deltaMs), new Date(ev.end.getTime() + deltaMs));
}
// ─── Auto-scroll under a drag ───────────────────────
// Weeks the target is in may be off-screen — without this, moving an event
// a month out means dropping it, scrolling, and dragging again. The week
// is re-read from whatever row is under the pointer after each step, so
// the scroll moves the target without any origin bookkeeping.
const AUTO_EDGE = 56;
const AUTO_STEP = 14;
let autoDir = 0;
let autoRaf = 0;
function autoScrollTick() {
	autoRaf = 0;
	if (!autoDir || !el) return;
	const before = el.scrollTop;
	el.scrollTop += autoDir * AUTO_STEP;
	if (el.scrollTop !== before) updateDragFromPointer();
	autoRaf = requestAnimationFrame(autoScrollTick);
}
function setAutoScroll(clientY) {
	if (!el) return;
	const r = el.getBoundingClientRect();
	const dir = clientY < r.top + AUTO_EDGE ? -1 : clientY > r.bottom - AUTO_EDGE ? 1 : 0;
	if (dir === autoDir) return;
	autoDir = dir;
	if (dir && !autoRaf) autoRaf = requestAnimationFrame(autoScrollTick);
}
function stopAutoScroll() {
	autoDir = 0;
	if (autoRaf) cancelAnimationFrame(autoRaf);
	autoRaf = 0;
}
function onEvWindowPointerMove(e) {
	const ev = evDragEvent;
	if (!evDragMovable || !drag || !ev || evDragId !== ev.id) return;
	evLastX = e.clientX;
	evLastY = e.clientY;
	const dx = e.clientX - evDragStartX;
	const dy = e.clientY - evDragStartY;
	if (!evDragStarted && Math.abs(dx) + Math.abs(dy) < DRAG_THRESHOLD) return;
	if (!evDragStarted) {
		evDragStarted = true;
		evDragging = true;
		evCellW = getCellWidth();
		evStartWeekMs = weekMsAtY(evDragStartY);
		drag.beginMove(ev.id, ev.start, ev.end);
	}
	setAutoScroll(e.clientY);
	updateDragFromPointer();
}
function cleanupEvDrag() {
	window.removeEventListener("pointermove", onEvWindowPointerMove);
	window.removeEventListener("pointerup", onEvWindowPointerUp);
	window.removeEventListener("pointercancel", onEvWindowPointerCancel);
	stopAutoScroll();
	evDragStarted = false;
	evDragging = false;
	evDragId = null;
	evDragEvent = null;
	evAnchor = undefined;
	evDragMovable = false;
	evStartWeekMs = 0;
}
function onEvWindowPointerUp() {
	if (!evDragStarted) {
		// A click, not a drag: hand the host the chip's rect so a panel can
		// open beside it rather than in the middle of the screen.
		if (evDragEvent) oneventclick?.(evDragEvent, evAnchor);
	} else if (drag) {
		commitDragCtx?.();
	}
	cleanupEvDrag();
}
function onEvWindowPointerCancel() {
	if (drag && evDragStarted) drag.cancel();
	cleanupEvDrag();
}
// ─── Escape cancels an in-flight drag ───────────────
function onWindowKeydown(e) {
	if (e.key !== "Escape" || !drag?.active) return;
	drag.cancel();
	cleanupEvDrag();
}
// ─── "+N more" per-cell expansion ───────────────────
let expandedCells = $state({});
// ─── Roving tabindex for grid cells ─────────────────
// One tabbable cell (last focused, else today); arrows move focus.
let focusedCellMs = $state(null);
const tabbableCellMs = $derived(focusedCellMs ?? todayMs);
function onCellKeydown(e, ms) {
	if (e.key === "Enter" || e.key === " ") {
		e.preventDefault();
		handleDayCellClick(ms, e);
		return;
	}
	let step = 0;
	if (e.key === "ArrowRight") step = DAY_MS;
	else if (e.key === "ArrowLeft") step = -DAY_MS;
	else if (e.key === "ArrowDown") step = customDays * DAY_MS;
	else if (e.key === "ArrowUp") step = -customDays * DAY_MS;
	if (step === 0) return;
	e.preventDefault();
	// Walk in the step direction until a rendered cell is found
	// (skips hidden days; bails at the buffer edge).
	let target = ms + step;
	for (let i = 0; i < 7; i++) {
		const cell = el?.querySelector(`[data-day="${target}"]`);
		if (cell) {
			focusedCellMs = target;
			cell.focus();
			cell.scrollIntoView({ block: "nearest" });
			return;
		}
		target += step < 0 ? -DAY_MS : DAY_MS;
	}
}
</script>

{#snippet allDaySegmentContent(seg: DaySegment)}
	{#if seg.isStart}
		<span class="wg-ad-title">{seg.ev.title}</span>
	{:else}
		<span class="wg-ad-cont" aria-hidden="true">◂</span>
		<span class="wg-ad-title">{seg.ev.title}</span>
	{/if}
	{#if !seg.isEnd && seg.totalDays > 1}
		<span class="wg-ad-arrow" aria-hidden="true">▸</span>
	{/if}
{/snippet}

{#snippet timedEventContent(ev: TimelineEvent)}
	{@const parts = chipParts(ev)}
	<EventContent event={ev}>
		{#if parts.time}<span class="wg-ev-time">{fmtAmPm(ev.start)}</span>{/if}
		<span class="wg-ev-title">{ev.title}</span>
		{#if parts.room}
			<span class="wg-ev-loc">{ev.location}</span>
		{/if}
	</EventContent>
{/snippet}

<svelte:window onkeydown={onWindowKeydown} />

<div class="wg" class:wg--auto={autoHeight} style={style || undefined} style:height={autoHeight ? undefined : (height ? `${height}px` : '100%')} style:--wg-row-min="{ROW_MIN}px" style:--wg-chip-h="{CHIP_H}px" style:--wg-chip-gap="{CHIP_GAP}px" style:--wg-row-margin="{ROW_MARGIN}px">
	<div
		class="wg-body"
		bind:this={el}
		{@attach fit.watch}
		{@attach watchTouch}
		onscroll={handleUserScroll}
		role="grid"
		aria-label={L.multiWeekGrid}
	>
		<!-- Font probe: a dropped part cannot report the font it wanted, so the
		     three chip fonts are read from here instead of from a live chip. -->
		<div class="wg-probe" aria-hidden="true">
			<span class="wg-ev-time"></span><span class="wg-ev-title"></span><span class="wg-ev-loc"></span>
		</div>
		{#each weeks as week (week.weekStart)}
			<div class="wg-week" class:wg-week--current={week.isCurrent} data-week={week.weekStart} role="presentation">
				<div class="wg-week-body" role="presentation">
					<!-- Day columns (header inside each cell) -->
					<div class="wg-days" role="row">
						{#each week.days as day (day.ms)}
							{@const visibleAllDaySegments = day.allDaySegments.filter((seg) => !isDraggedEvent(seg.ev.id))}
							{@const visibleTimedEvents = timedEventsForDay(day)}
							{@const isExpanded = expandedCells[day.ms] ?? false}
							{@const timedCap = Math.max(0, MAX_EVENTS_SHOWN - visibleAllDaySegments.length)}
							{@const hiddenCount = Math.max(0, visibleTimedEvents.length - timedCap)}
							{@const previewTimedEvent = dragPreviewTimedForDay(day.ms)}
							{@const previewSegment = dragPreviewSegmentForDay(day.ms)}
							<div
								class="wg-cell"
								class:wg-cell--today={day.isToday}
								class:wg-cell--past={day.isPast}
								class:wg-cell--weekend={day.isWeekend}
								class:wg-cell--disabled={disabledSet.has(day.ms)}
								class:wg-cell--expanded={isExpanded}
								class:wg-cell--drop={dropDayMs === day.ms}
								role="gridcell"
								data-day={day.ms}
								tabindex={day.ms === tabbableCellMs ? 0 : -1}
								aria-label="{new Date(day.ms).toLocaleDateString(locale ?? 'en-US', { weekday: 'long', month: 'short', day: 'numeric' })}{day.isToday ? ` (${L.today.toLowerCase()})` : ''}, {L.nEvents(day.events.length + day.allDaySegments.length)}"
								onclick={(e) => handleDayCellClick(day.ms, e)}
								ondragover={(e) => onCellDragOver(e, day.ms)}
								ondragleave={() => onCellDragLeave(day.ms)}
								ondrop={(e) => onCellDrop(e, day.ms)}
								onfocus={() => { focusedCellMs = day.ms; }}
								onkeydown={(e) => onCellKeydown(e, day.ms)}
							>
								<!-- Day label in top-right corner -->
								<div class="wg-cell-hd" class:wg-cell-hd--today={day.isToday}>
									{#if showDates}
										<span class="wg-day-num" class:wg-day-num--today={day.isToday}>
											{day.dayNum}
										</span>
									{/if}
									<span class="wg-day-wd">{weekdayShort(day.ms, locale)}</span>
								</div>

								<!-- Custom day header snippet -->
								{#if dayHeaderSnippet}
									<div class="wg-cell-custom-header">
										{@render dayHeaderSnippet({ date: new Date(day.ms), isToday: day.isToday, dayName: weekdayShort(day.ms, locale) })}
									</div>
								{/if}

								<!-- Blocked slots indicator -->
								{#if blockedSlots?.length}
									{@const jsDay = new Date(day.ms).getDay()}
									{@const isoDay = jsDay === 0 ? 7 : jsDay}
									{#each blockedSlots as slot, i (i)}
										{#if !slot.day || slot.day === isoDay}
											{@const slotRange = `${_fmtTime(new Date(day.ms + slot.start * HOUR_MS), locale)} – ${_fmtTime(new Date(day.ms + slot.end * HOUR_MS), locale)}`}
											<div
												class="wg-blocked"
												title="{slot.label ? `${slot.label}, ` : ''}{slotRange}"
												aria-label="{slot.label || 'Unavailable'}, {slotRange}"
											>
												{#if slot.label}
													<span class="wg-blocked-label">{slot.label}</span>
												{/if}
											</div>
										{/if}
									{/each}
								{/if}

								<!-- All-day / multi-day events -->
								{#if visibleAllDaySegments.length > 0 || previewSegment}
									<div class="wg-allday">
										{#each visibleAllDaySegments as seg (seg.ev.id)}
											<div
												animate:flip={{ duration: ANIM }}
												in:previewReceive={{ key: `${seg.ev.id}:${seg.dayIndex}` }}
												out:previewSend={{ key: `${seg.ev.id}:${seg.dayIndex}` }}
												class="wg-ad"
												class:wg-ad--start={seg.isStart}
												class:wg-ad--end={seg.isEnd}
												class:wg-ad--mid={!seg.isStart && !seg.isEnd}
												class:wg-ad--selected={selectedEventId === seg.ev.id}
												style:--ev-color={seg.ev.color ?? 'var(--dt-accent)'}
												role="button"
												tabindex="0"
												aria-label="{seg.ev.title}{seg.totalDays > 1 ? `, ${L.dayNOfTotal(seg.dayIndex, seg.totalDays)}` : `, ${L.allDay}`}"
												onpointerdown={(e) => onEventPointerDown(e, seg.ev)}
												onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); oneventclick?.(seg.ev, e.currentTarget.getBoundingClientRect()); } }}
											>
												{@render allDaySegmentContent(seg)}
											</div>
										{/each}
										{#if previewSegment}
											<!-- key by event id + dayIndex: multi-day previews render one segment
											     per cell, and each pairs with its own real-card counterpart -->
											<div
												class="wg-ad wg-ad--drag-preview"
												class:wg-ad--start={previewSegment.isStart}
												class:wg-ad--end={previewSegment.isEnd}
												class:wg-ad--mid={!previewSegment.isStart && !previewSegment.isEnd}
												style:--ev-color={previewSegment.ev.color ?? 'var(--dt-accent)'}
												aria-hidden="true"
												in:previewReceive={{ key: previewKeySnapshot.get(day.ms) ?? '' }}
												out:previewSend={{ key: previewKeySnapshot.get(day.ms) ?? '' }}
											>
												{@render allDaySegmentContent(previewSegment)}
											</div>
										{/if}
									</div>
								{/if}

								<!-- Timed events -->
								<div class="wg-cell-events">
									{#each visibleTimedEvents.slice(0, isExpanded ? visibleTimedEvents.length : timedCap) as ev (ev.id)}
										<!-- send/receive keyed by event id pair the card with the drag ghost:
										     drag start morphs card → ghost, drop morphs ghost → placed card -->
										<div
											animate:flip={{ duration: ANIM }}
											in:previewReceive={{ key: ev.id }}
											out:previewSend={{ key: ev.id }}
											class="wg-ev"
											class:wg-ev--selected={selectedEventId === ev.id}
											class:wg-ev--current={ev.start.getTime() <= clock.tick && ev.end.getTime() > clock.tick}
											class:wg-ev--dragging={evDragging && evDragId === ev.id}
											class:wg-ev--readonly={ev.data?.readOnly}
											class:wg-ev--cancelled={ev.status === 'cancelled'}
											class:wg-ev--tentative={ev.status === 'tentative'}
											class:wg-ev--full={ev.status === 'full'}
											class:wg-ev--limited={ev.status === 'limited'}
											style:--ev-color={ev.color ?? 'var(--dt-accent)'}
											role="button"
											tabindex="0"
											aria-label="{ev.title}, {fmtAmPm(ev.start)} – {fmtAmPm(ev.end)}{ev.status === 'cancelled' ? ` (cancelled)` : ''}{ev.status === 'tentative' ? ` (tentative)` : ''}{ev.status === 'full' ? ` (full)` : ''}{ev.status === 'limited' ? ` (limited)` : ''}{ev.start.getTime() <= clock.tick && ev.end.getTime() > clock.tick ? ` (${L.inProgress})` : ''}"
											onpointerdown={(e) => onEventPointerDown(e, ev)}
											onpointerenter={() => oneventhover?.(ev)}
											onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); oneventclick?.(ev, e.currentTarget.getBoundingClientRect()); } }}
										>
											{@render timedEventContent(ev)}
										</div>
									{/each}
									{#if previewTimedEvent}
										<div
											class="wg-ev wg-ev--drag-preview"
											style:--ev-color={previewTimedEvent.color ?? 'var(--dt-accent)'}
											aria-hidden="true"
											in:previewReceive={{ key: previewKeySnapshot.get('timed') ?? '' }}
											out:previewSend={{ key: previewKeySnapshot.get('timed') ?? '' }}
										>
											{@render timedEventContent(previewTimedEvent)}
										</div>
									{/if}
								</div>
								{#if hiddenCount > 0}
									<button
										type="button"
										class="wg-ev-more"
										aria-expanded={isExpanded}
										onclick={(e) => { e.stopPropagation(); expandedCells[day.ms] = !isExpanded; }}
									>{isExpanded ? L.showLess : L.nMore(hiddenCount)}</button>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>

</div>

<style>
	/* ─── Container ──────────────────────────────────── */
	.wg {
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		user-select: none;
		font-variant-numeric: tabular-nums;
	}
	.wg--auto { overflow: visible; }

	/* ─── Scrollable body ────────────────────────────── */
	.wg-body {
		flex: 1;
		overflow-y: auto;
		/* The prepend is compensated by hand (handleUserScroll); the browser's
		   anchoring on top of it moved the content twice. */
		overflow-anchor: none;
		/* Seven columns scroll horizontally at narrow widths instead of squishing */
		overflow-x: auto;
		box-sizing: border-box;
		scrollbar-width: thin;
		scrollbar-color: var(--dt-scrollbar, rgba(0, 0, 0, 0.1)) transparent;
	}
	.wg--auto .wg-body { overflow-y: visible; }

	.wg-body::-webkit-scrollbar { width: 4px; }
	.wg-body::-webkit-scrollbar-thumb {
		background: var(--dt-scrollbar, rgba(0, 0, 0, 0.1));
		border-radius: 4px;
	}
	.wg-body::-webkit-scrollbar-track { background: transparent; }

	.wg-probe {
		position: absolute;
		visibility: hidden;
		height: 0;
		overflow: hidden;
		pointer-events: none;
	}

	/* ─── Week row ───────────────────────────────────── */
	.wg-week {
		display: flex;
		border-radius: 10px;
		margin: var(--wg-row-margin, 12px) 8px;
		border: 1.5px solid var(--dt-border, rgba(0, 0, 0, 0.08));
		overflow: hidden;
	}

	.wg-week--current {
		background: var(--dt-today-bg, rgba(37, 99, 235, 0.04));
		/* Border width stays constant (no layout shift); emphasis via box-shadow */
		border-color: var(--dt-accent, #2563eb);
		box-shadow: 0 0 0 1.5px color-mix(in srgb, var(--dt-accent, #2563eb) 55%, transparent);
	}

	/* ─── Week body ──────────────────────────────────── */
	.wg-week-body {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
	}

	/* ─── Day columns ────────────────────────────────── */
	.wg-days {
		display: flex;
		flex: 1;
	}

	.wg-cell {
		flex: 1;
		position: relative;
		display: flex;
		flex-direction: column;
		min-width: 90px;
		min-height: var(--wg-row-min, 170px);
		box-sizing: border-box;
		padding: 4px 4px 8px;
		border-right: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
		cursor: pointer;
		transition: background 0.15s;
	}

	.wg-cell:last-child { border-right: none; }
	.wg-cell:hover { background: var(--dt-hover, rgba(0, 0, 0, 0.015)); }

	.wg-cell--today { background: var(--dt-today-bg, rgba(37, 99, 235, 0.04)); }
	.wg-cell--drop {
		background: color-mix(in srgb, var(--dt-accent, #2563eb) 12%, transparent) !important;
		box-shadow: inset 0 0 0 2px var(--dt-accent, #2563eb);
	}
	.wg-cell--today:hover { background: color-mix(in srgb, var(--dt-accent, #2563eb) 6%, transparent); }

	/* Dim non-current weeks with a subtle wash + softer header text instead of
	   a subtree opacity, so event content keeps full contrast everywhere. */
	.wg-week:not(.wg-week--current) .wg-cell {
		background: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 2.5%, transparent);
	}
	.wg-week:not(.wg-week--current) .wg-day-num {
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
	}
	.wg-week--current .wg-cell--past {
		background: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 2.5%, transparent);
	}

	/* equalDays: when no cells are marked past, all are full brightness */

	.wg-cell--weekend { background: var(--dt-weekend-bg, rgba(0, 0, 0, 0.012)); }

	/* ─── Disabled cell ──────────────────────────────── */
	.wg-cell--disabled {
		background: repeating-linear-gradient(
			45deg,
			transparent,
			transparent 6px,
			var(--dt-border, rgba(0, 0, 0, 0.08)) 6px,
			var(--dt-border, rgba(0, 0, 0, 0.08)) 7px
		) !important;
	}

	/* ─── Blocked slot indicator ─────────────────────── */
	.wg-blocked {
		display: flex;
		align-items: center;
		gap: 3px;
		padding: 2px 4px;
		border-radius: 3px;
		background: repeating-linear-gradient(
			-45deg,
			color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent),
			color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 4%, transparent) 3px,
			transparent 3px,
			transparent 6px
		);
		margin-bottom: 2px;
		min-height: 14px;
	}

	.wg-blocked-label {
		font: 500 10px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		text-transform: uppercase;
		letter-spacing: 0.04em;
		white-space: nowrap;
	}

	/* ─── Custom day header ──────────────────────────── */
	.wg-cell-custom-header {
		padding: 0 4px 2px;
	}

	/* ─── Cell header (day label top-right) ──────────── */
	.wg-cell-hd {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 4px;
		padding: 4px 5px 2px 0;
		margin-bottom: 2px;
	}

	.wg-day-wd {
		font: 400 10px / 1 var(--dt-sans, system-ui, sans-serif);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
	}

	.wg-week--current .wg-day-wd {
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
	}

	.wg-cell-hd--today .wg-day-wd {
		color: var(--dt-accent, #2563eb);
		font-weight: 600;
	}

	.wg-day-num {
		font: 700 14px / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
	}

	.wg-week--current .wg-day-num {
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
	}

	.wg-day-num--today {
		color: var(--dt-accent, #2563eb);
		font-weight: 900;
	}

	/* ─── All-day / multi-day events ─────────────────── */
	.wg-allday {
		display: flex;
		flex-direction: column;
		gap: var(--wg-chip-gap, 3px);
		margin-bottom: var(--wg-chip-gap, 3px);
		flex-shrink: 0;
	}

	.wg-ad {
		display: flex;
		align-items: center;
		gap: 3px;
		padding: 0 5px;
		height: var(--wg-chip-h, 22px);
		box-sizing: border-box;
		flex-shrink: 0;
		border-radius: 3px;
		background: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));
		cursor: pointer;
		overflow: hidden;
		transition: background 0.12s;
		min-height: 18px;
	}

	.wg-ad--drag-preview {
		position: relative;
		z-index: 8;
		opacity: 0.95;
		pointer-events: none;
		box-shadow: 0 6px 18px color-mix(in srgb, var(--ev-color) 26%, rgba(0, 0, 0, 0.22));
		outline: 1px solid color-mix(in srgb, var(--ev-color) 42%, transparent);
		cursor: grabbing;
	}

	.wg-ad:hover {
		background: color-mix(in srgb, var(--ev-color) 32%, var(--dt-surface, var(--dt-bg, #ffffff)));
	}

	.wg-ad--start {
		border-left: 2.5px solid var(--ev-color);
	}

	.wg-ad--mid {
		border-radius: 0;
		border-left: 1px dashed color-mix(in srgb, var(--ev-color) 40%, transparent);
	}

	.wg-ad--end:not(.wg-ad--start) {
		border-radius: 0 3px 3px 0;
		border-left: 1px dashed color-mix(in srgb, var(--ev-color) 40%, transparent);
	}

	.wg-ad--selected {
		box-shadow: 0 0 0 1.5px var(--ev-color);
	}

	.wg-ad-title {
		font: 500 10px / 1.1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex: 1;
	}

	.wg-ad-cont {
		font-size: 10px;
		color: var(--ev-color);
		flex-shrink: 0;
		line-height: 1;
	}

	.wg-ad-arrow {
		font-size: 10px;
		color: var(--ev-color);
		flex-shrink: 0;
		margin-left: auto;
		line-height: 1;
	}

	/* ─── Events ─────────────────────────────────────── */
	.wg-cell-events {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--wg-chip-gap, 3px);
	}

	.wg-ev {
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		gap: 0 5px;
		height: var(--wg-chip-h, 22px);
		box-sizing: border-box;
		flex-shrink: 0;
		padding: 0 6px;
		border-radius: 4px;
		background: color-mix(in srgb, var(--ev-color) 15%, var(--dt-surface, var(--dt-bg, #ffffff)));
		cursor: pointer;
		overflow: hidden;
		transition: background 0.12s;
	}

	.wg-ev:hover {
		background: color-mix(in srgb, var(--ev-color) 25%, var(--dt-surface, var(--dt-bg, #ffffff)));
	}

	.wg-ev--drag-preview {
		position: relative;
		z-index: 8;
		opacity: 0.95;
		pointer-events: none;
		background: color-mix(in srgb, var(--ev-color) 28%, var(--dt-surface, var(--dt-bg, #ffffff)));
		box-shadow: 0 6px 18px color-mix(in srgb, var(--ev-color) 24%, rgba(0, 0, 0, 0.22));
		outline: 1px solid color-mix(in srgb, var(--ev-color) 42%, transparent);
		cursor: grabbing;
	}

	.wg-ev--selected {
		box-shadow: 0 0 0 1.5px var(--ev-color);
	}

	.wg-ev--current {
		background: color-mix(in srgb, var(--ev-color) 22%, var(--dt-surface, var(--dt-bg, #ffffff)));
	}

	.wg-ev--cancelled {
		opacity: 0.5;
	}
	.wg-ev--cancelled .wg-ev-title {
		text-decoration: line-through;
	}
	.wg-ev--tentative {
		opacity: 0.65;
		border: 1px dashed color-mix(in srgb, var(--ev-color) 40%, transparent);
	}
	.wg-ev--full {
		opacity: 0.55;
	}
	.wg-ev--limited {
		opacity: 0.65;
		border: 1px dashed color-mix(in srgb, var(--ev-color) 40%, transparent);
	}
	.wg-ev--readonly {
		cursor: default;
	}

	.wg-ev-time {
		font: 400 10px / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		flex-shrink: 0;
		white-space: nowrap;
	}

	.wg-ev-title {
		font: 500 12px / 1.1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		min-width: 0;
		flex: 1 1 auto;
	}

	.wg-ev-loc {
		font: 400 10px / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
		white-space: nowrap;
		flex-shrink: 0; /* shown only when measured to fit — never squeezed */
	}

	.wg-ev-more {
		/* Real button — reset chrome, keep the quiet-link look */
		appearance: none;
		background: none;
		border: none;
		border-radius: 3px;
		text-align: left;
		align-self: flex-start;
		font: 500 10px / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		padding: 2px 8px;
		cursor: pointer;
		flex-shrink: 0;
		margin-top: 2px;
	}

	.wg-ev-more:hover {
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
	}

	.wg-ev-more:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px var(--dt-accent, #2563eb);
	}

	/* ─── Focus-visible ──────────────────────────────── */
	.wg-cell:focus-visible {
		outline: 2px solid var(--dt-accent, #2563eb);
		outline-offset: -2px;
	}

	.wg-ev:focus-visible {
		outline: 2px solid var(--ev-color, var(--dt-accent, #2563eb));
		outline-offset: 1px;
	}

	.wg-ev--dragging {
		cursor: grabbing;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}
</style>

