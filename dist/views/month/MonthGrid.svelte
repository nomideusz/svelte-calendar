<!--
	MonthGrid — classic month overview.

	Week-aligned grid (4–6 rows, driven by the view-state 'month' range).
	Each cell lists up to MAX_CHIPS events plus a "+N more" overflow; clicking
	an event fires oneventclick, clicking a day (or the overflow) fires
	ondayclick — the natural month → day drill-down.
-->
<script lang="ts">import { useCalendarContext } from "../shared/context.svelte.js";
import { createClock } from "../../core/clock.svelte.js";
import { DAY_MS, sod, isAllDay } from "../../core/time.js";
import { fmtTime, weekdayShort, getLabels } from "../../core/locale.js";
const L = $derived(getLabels());
let {
  events = [],
  style = "",
  height = null,
  locale,
  focusDate,
  oneventclick,
  selectedEventId = null
} = $props();
const ctx = useCalendarContext();
const viewState = $derived(ctx.viewState);
const autoHeight = $derived(ctx.autoHeight);
const isMobile = $derived(ctx.isMobile);
const disabledSet = $derived(ctx.disabledSet);
const oneventhover = $derived(ctx.oneventhover);
const ondayclick = $derived(ctx.ondayclick);
const eventSnippet = $derived(ctx.eventSnippet);
const loadRangeCtx = $derived(ctx.loadRange);
const clock = createClock(ctx.timezone);
const todayMs = $derived(clock.today);
const MAX_CHIPS = $derived(isMobile ? 2 : 3);
const range = $derived(viewState?.range);
const focusMonth = $derived((focusDate ?? /* @__PURE__ */ new Date()).getMonth());
$effect(() => {
  if (!loadRangeCtx || !range) return;
  loadRangeCtx.set({
    start: new Date(range.start.getTime() - 7 * DAY_MS),
    end: new Date(range.end.getTime() + 7 * DAY_MS)
  });
  return () => loadRangeCtx.set(null);
});
function eventsForDay(ms) {
  const dayStart = ms;
  const dayEnd = ms + DAY_MS;
  return events.filter((e) => e.start.getTime() < dayEnd && e.end.getTime() > dayStart).sort((a, b) => {
    const aAll = isAllDay(a) ? 0 : 1;
    const bAll = isAllDay(b) ? 0 : 1;
    return aAll - bAll || a.start.getTime() - b.start.getTime();
  });
}
const weeks = $derived.by(() => {
  if (!range) return [];
  const rows = [];
  for (let ms = sod(range.start.getTime()); ms < range.end.getTime(); ms += 7 * DAY_MS) {
    const row = [];
    for (let i = 0; i < 7; i++) {
      const cellMs = ms + i * DAY_MS;
      const date = new Date(cellMs);
      const jsDay = date.getDay();
      const dayEvents = eventsForDay(cellMs);
      row.push({
        ms: cellMs,
        date,
        dayNum: date.getDate(),
        inMonth: date.getMonth() === focusMonth,
        isToday: cellMs === todayMs,
        isWeekend: jsDay === 0 || jsDay === 6,
        isDisabled: disabledSet.has(cellMs),
        chips: dayEvents.slice(0, MAX_CHIPS),
        overflow: Math.max(0, dayEvents.length - MAX_CHIPS)
      });
    }
    rows.push(row);
  }
  return rows;
});
const weekdayLabels = $derived.by(() => {
  const first = weeks[0];
  if (!first) return [];
  return first.map((c) => weekdayShort(c.ms, locale));
});
function chipTime(e) {
  return isAllDay(e) ? "" : fmtTime(e.start, locale);
}
</script>

<div
	class="mg"
	class:mg--auto={autoHeight}
	style={style || undefined}
	style:height={autoHeight ? undefined : height ? `${height}px` : '100%'}
	role="grid"
	aria-label={L.month}
>
	<div class="mg-head" role="row">
		{#each weekdayLabels as name (name)}
			<div class="mg-head-cell" role="columnheader">{name}</div>
		{/each}
	</div>

	<div class="mg-body" style:--mg-rows={weeks.length}>
		{#each weeks as row, ri (ri)}
			{#each row as cell (cell.ms)}
				<div
					class="mg-cell"
					class:mg-cell--out={!cell.inMonth}
					class:mg-cell--today={cell.isToday}
					class:mg-cell--weekend={cell.isWeekend}
					class:mg-cell--disabled={cell.isDisabled}
					class:mg-cell--clickable={!!ondayclick && !cell.isDisabled}
					role="gridcell"
					tabindex={ondayclick && !cell.isDisabled ? 0 : undefined}
					onclick={() => {
						if (!cell.isDisabled) ondayclick?.(cell.date);
					}}
					onkeydown={(e) => {
						if ((e.key === 'Enter' || e.key === ' ') && !cell.isDisabled) {
							e.preventDefault();
							ondayclick?.(cell.date);
						}
					}}
				>
					<span class="mg-daynum" class:mg-daynum--today={cell.isToday}>
						{cell.dayNum}
					</span>
					<div class="mg-chips">
						{#each cell.chips as ev (ev.id + cell.ms)}
							{#if eventSnippet}
								<button
									class="mg-chip mg-chip--custom"
									class:mg-chip--selected={ev.id === selectedEventId}
									onclick={(e) => {
										e.stopPropagation();
										oneventclick?.(ev);
									}}
									onmouseenter={() => oneventhover?.(ev)}
								>
									{@render eventSnippet(ev)}
								</button>
							{:else}
								<button
									class="mg-chip"
									class:mg-chip--selected={ev.id === selectedEventId}
									class:mg-chip--cancelled={ev.status === 'cancelled'}
									style:--mg-chip-color={ev.color ?? 'var(--dt-accent)'}
									title={ev.title}
									onclick={(e) => {
										e.stopPropagation();
										oneventclick?.(ev);
									}}
									onmouseenter={() => oneventhover?.(ev)}
								>
									<span class="mg-chip-dot" aria-hidden="true"></span>
									{#if chipTime(ev)}<span class="mg-chip-time">{chipTime(ev)}</span>{/if}
									<span class="mg-chip-title">{ev.title}</span>
								</button>
							{/if}
						{/each}
						{#if cell.overflow > 0}
							<span class="mg-more">{L.nMore(cell.overflow)}</span>
						{/if}
					</div>
				</div>
			{/each}
		{/each}
	</div>
</div>

<style>
	.mg {
		display: flex;
		flex-direction: column;
		background: var(--dt-bg);
		color: var(--dt-text);
		font-family: var(--dt-sans);
		overflow: hidden;
	}
	.mg--auto {
		height: auto;
	}

	.mg-head {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		border-bottom: 1px solid var(--dt-border);
		flex: none;
	}
	.mg-head-cell {
		padding: 6px 8px;
		font-family: var(--dt-mono);
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt-text-3);
	}

	.mg-body {
		flex: 1;
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		grid-template-rows: repeat(var(--mg-rows, 5), minmax(88px, 1fr));
		min-height: 0;
	}
	.mg--auto .mg-body {
		grid-template-rows: repeat(var(--mg-rows, 5), minmax(88px, auto));
	}

	.mg-cell {
		display: flex;
		flex-direction: column;
		gap: 3px;
		padding: 6px;
		border-right: 1px solid var(--dt-border-day);
		border-bottom: 1px solid var(--dt-border-day);
		min-width: 0;
		overflow: hidden;
		text-align: left;
	}
	.mg-cell:nth-child(7n) {
		border-right: none;
	}
	.mg-cell--weekend {
		background: var(--dt-weekend-bg);
	}
	.mg-cell--out {
		opacity: 0.45;
	}
	.mg-cell--today {
		background: var(--dt-today-bg);
	}
	.mg-cell--disabled {
		opacity: 0.35;
		pointer-events: none;
	}
	.mg-cell--clickable {
		cursor: pointer;
	}
	.mg-cell--clickable:hover {
		background: var(--dt-hover);
	}
	.mg-cell--clickable:focus-visible {
		outline: 2px solid var(--dt-accent);
		outline-offset: -2px;
	}

	.mg-daynum {
		flex: none;
		font-family: var(--dt-mono);
		font-size: 12px;
		font-weight: 600;
		color: var(--dt-text-2);
		width: 22px;
		height: 22px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
	}
	.mg-daynum--today {
		background: var(--dt-accent);
		color: var(--dt-btn-text);
	}

	.mg-chips {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-height: 0;
		overflow: hidden;
	}
	.mg-chip {
		display: flex;
		align-items: center;
		gap: 5px;
		border: none;
		background: none;
		padding: 2px 4px;
		border-radius: 5px;
		font-family: var(--dt-sans);
		font-size: 12px;
		line-height: 1.3;
		color: var(--dt-text);
		cursor: pointer;
		min-width: 0;
		text-align: left;
	}
	.mg-chip:hover {
		background: var(--dt-hover);
	}
	.mg-chip--selected {
		background: var(--dt-accent-dim);
	}
	.mg-chip--cancelled {
		text-decoration: line-through;
		opacity: 0.55;
	}
	.mg-chip-dot {
		flex: none;
		width: 7px;
		height: 7px;
		border-radius: 999px;
		background: var(--mg-chip-color);
	}
	.mg-chip-time {
		flex: none;
		font-family: var(--dt-mono);
		font-size: 11px;
		color: var(--dt-text-2);
	}
	.mg-chip-title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.mg-more {
		padding: 1px 4px;
		font-family: var(--dt-mono);
		font-size: 11px;
		color: var(--dt-text-3);
	}

	@media (max-width: 640px) {
		.mg-body {
			grid-template-rows: repeat(var(--mg-rows, 5), minmax(64px, 1fr));
		}
		.mg-chip-time {
			display: none;
		}
	}
</style>
