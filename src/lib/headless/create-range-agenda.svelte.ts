/**
 * createRangeAgenda() — headless multi-day agenda state.
 *
 * Returns reactive state for rendering a window of days (default: one week)
 * with events grouped per day — zero DOM, zero presentation opinions.
 * Sits between createAgenda (live single day) and createCalendar (full grid
 * engine): no clock, no drag, no selection — just "these days, these events",
 * plus paging. Built for read-only schedule surfaces: public timetables,
 * class listings, embeds.
 *
 * Must be called during component initialisation (Svelte 5 rune scope).
 *
 * @example
 * ```svelte
 * <script>
 *   import { createRangeAgenda, createMemoryAdapter } from '@nomideusz/svelte-calendar';
 *
 *   const adapter = createMemoryAdapter([...]);
 *   const agenda = createRangeAgenda({ adapter, days: 7 });
 * </script>
 *
 * <button onclick={agenda.prev}>←</button>
 * <button onclick={agenda.next}>→</button>
 *
 * {#each agenda.days.filter((d) => d.events.length > 0) as day}
 *   <h3>{day.date.toLocaleDateString()}</h3>
 *   {#each day.events as ev}
 *     <a href="/book?slot={ev.id}">{agenda.fmtTime(ev.start)} {ev.title}</a>
 *   {/each}
 * {/each}
 * ```
 */
import { untrack } from 'svelte';
import { createEventStore } from '../engine/event-store.svelte.js';
import { sod, DAY_MS } from '../core/time.js';
import { fmtTime as _fmtTime, fmtDuration } from '../core/locale.js';
import type { TimelineEvent } from '../core/types.js';
import type { CalendarAdapter } from '../adapters/types.js';

// ─── Options ────────────────────────────────────────────

export interface RangeAgendaOptions {
	/** Data source (required). Can be a getter for reactive adapters. */
	adapter: CalendarAdapter | (() => CalendarAdapter);
	/** Days per page — prev()/next() move by this many (default: 7) */
	days?: number;
	/**
	 * First visible day (default: today). Not auto-aligned: pass the Monday
	 * of the week yourself if you want calendar-week pages.
	 */
	initialDate?: Date;
	/** BCP 47 locale tag (e.g. 'en-US', 'pl-PL') for the format helpers */
	locale?: string;
}

// ─── Return types ───────────────────────────────────────

export interface RangeAgendaDay {
	/** Start-of-day timestamp (ms) */
	ms: number;
	/** Date object for this day */
	date: Date;
	/** ISO weekday (1=Mon … 7=Sun) */
	weekday: number;
	/** Is this today? (evaluated when the window derives — does not tick) */
	isToday: boolean;
	/** Is this day fully in the past? */
	isPast: boolean;
	/**
	 * Events overlapping this day, sorted by start. Multi-day events appear
	 * on every day they touch; all-day events sort first (00:00 start).
	 */
	events: TimelineEvent[];
}

export interface HeadlessRangeAgenda {
	// ── Reactive state ──

	/** Every day in the current window, in order, with events attached */
	readonly days: RangeAgendaDay[];
	/** The current window */
	readonly range: { start: Date; end: Date };
	/** Total event count in the window */
	readonly count: number;
	/** Whether the adapter is loading */
	readonly loading: boolean;
	/** Last adapter error, if any */
	readonly error: string | null;

	// ── Navigation ──

	/** Page back one window */
	prev(): void;
	/** Page forward one window */
	next(): void;
	/** Move the window start to today (not re-aligned; use setDate for aligned jumps) */
	goToday(): void;
	/** Set the window start to a specific date */
	setDate(date: Date): void;

	// ── Format helpers ──

	/** Format a Date to locale time string (e.g. "14:30") */
	fmtTime(date: Date): string;
	/** Format event duration (e.g. "1h 30m") */
	fmtDuration(event: TimelineEvent): string;
	/** Format time range (e.g. "14:00 – 15:30") */
	fmtRange(event: TimelineEvent): string;
}

// ─── Implementation ─────────────────────────────────────

export function createRangeAgenda(options: RangeAgendaOptions): HeadlessRangeAgenda {
	const { initialDate, locale, days: dayCount = 7 } = options;

	const resolveAdapter =
		typeof options.adapter === 'function'
			? (options.adapter as () => CalendarAdapter)
			: () => options.adapter as CalendarAdapter;

	const store = $derived(createEventStore(resolveAdapter()));

	// ── Window start (reactive, writable) ──
	let startMs = $state(sod(initialDate?.getTime() ?? Date.now()));
	const endMs = $derived(startMs + dayCount * DAY_MS);

	// ── Load events for the window (re-runs on paging / adapter swap) ──
	$effect(() => {
		store.load({ start: new Date(startMs), end: new Date(endMs) });
	});
	// Eager initial load
	untrack(() => {
		store.load({ start: new Date(startMs), end: new Date(endMs) });
	});

	// ── Day derivations ──
	const days = $derived.by((): RangeAgendaDay[] => {
		const todayMs = sod(Date.now());
		const events = store.events;
		return Array.from({ length: dayCount }, (_, i) => {
			const ms = startMs + i * DAY_MS;
			const dayEnd = ms + DAY_MS;
			const date = new Date(ms);
			// JS getDay(): 0=Sun … 6=Sat → ISO 1=Mon … 7=Sun
			const weekday = ((date.getDay() + 6) % 7) + 1;
			return {
				ms,
				date,
				weekday,
				isToday: ms === todayMs,
				isPast: dayEnd <= todayMs,
				events: events
					.filter((ev) => ev.start.getTime() < dayEnd && ev.end.getTime() > ms)
					.sort((a, b) => a.start.getTime() - b.start.getTime()),
			};
		});
	});

	const count = $derived(days.reduce((n, d) => n + d.events.length, 0));

	return {
		get days() {
			return days;
		},
		get range() {
			return { start: new Date(startMs), end: new Date(endMs) };
		},
		get count() {
			return count;
		},
		get loading() {
			return store.loading;
		},
		get error() {
			return store.error;
		},

		prev() {
			startMs -= dayCount * DAY_MS;
		},
		next() {
			startMs += dayCount * DAY_MS;
		},
		goToday() {
			startMs = sod(Date.now());
		},
		setDate(date: Date) {
			startMs = sod(date.getTime());
		},

		fmtTime: (d: Date) => _fmtTime(d, locale),
		fmtDuration: (ev: TimelineEvent) => fmtDuration(ev.start, ev.end),
		fmtRange: (ev: TimelineEvent) => `${_fmtTime(ev.start, locale)} – ${_fmtTime(ev.end, locale)}`,
	};
}
