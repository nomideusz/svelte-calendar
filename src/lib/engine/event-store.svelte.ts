/**
 * Reactive event store — the CRUD brain of the calendar.
 *
 * Wraps a CalendarAdapter and exposes Svelte 5 rune-mode reactive state.
 * All mutations go through the adapter first, then update local state.
 *
 * Usage:
 *   const store = createEventStore(adapter);
 *   // store.events       — all loaded events (reactive)
 *   // store.forRange()   — query by date range
 *   // store.forDay()     — query single day
 *   // store.add()        — create event
 *   // store.update()     — patch event
 *   // store.remove()     — delete event
 *   // store.move()       — drag-move shorthand
 *   // store.load()       — fetch from adapter for a range
 */
import type { TimelineEvent } from '../core/types.js';
import type { CalendarAdapter, DateRange } from '../adapters/types.js';
import { sod, DAY_MS } from '../core/time.js';

export interface EventStore {
	/** All currently loaded events (reactive) */
	readonly events: TimelineEvent[];
	/** Whether a load/mutation is in-flight */
	readonly loading: boolean;
	/** Last error, if any */
	readonly error: string | null;

	/** Load events from the adapter for a date range */
	load(range: DateRange): Promise<void>;
	/** Get events overlapping a date range (client-side filter) */
	forRange(start: Date, end: Date): TimelineEvent[];
	/** Get events for a single day */
	forDay(date: Date): TimelineEvent[];
	/** Get a single event by ID */
	byId(id: string): TimelineEvent | undefined;

	/** Create a new event */
	add(event: Omit<TimelineEvent, 'id'>): Promise<TimelineEvent>;
	/** Patch an existing event */
	update(id: string, patch: Partial<TimelineEvent>): Promise<void>;
	/** Delete an event */
	remove(id: string): Promise<void>;
	/** Move an event to a new time range (drag shorthand) */
	move(id: string, newStart: Date, newEnd: Date): Promise<void>;
}

/**
 * Create a reactive event store backed by a CalendarAdapter.
 */
export function createEventStore(adapter: CalendarAdapter): EventStore {
	let events = $state<TimelineEvent[]>([]);
	let loading = $state(false);
	let error = $state<string | null>(null);

	// ── Internal helpers ──
	function overlaps(ev: TimelineEvent, start: Date, end: Date): boolean {
		return ev.start < end && ev.end > start;
	}

	function replaceEvent(id: string, updated: TimelineEvent): void {
		const idx = events.findIndex((e) => e.id === id);
		if (idx >= 0) {
			events[idx] = updated;
		}
	}

	function removeEvent(id: string): void {
		events = events.filter((e) => e.id !== id);
	}

	function upsertEvent(ev: TimelineEvent): void {
		const idx = events.findIndex((e) => e.id === ev.id);
		if (idx >= 0) {
			events[idx] = ev;
		} else {
			events.push(ev);
		}
	}

	// ── Public API ──
	return {
		get events() {
			return events;
		},
		get loading() {
			return loading;
		},
		get error() {
			return error;
		},

		async load(range: DateRange) {
			loading = true;
			error = null;
			try {
				const fetched = await adapter.fetchEvents(range);
				// Merge: upsert fetched, don't blow away events outside this range
				for (const ev of fetched) {
					upsertEvent(ev);
				}
			} catch (e) {
				error = e instanceof Error ? e.message : String(e);
			} finally {
				loading = false;
			}
		},

		forRange(start: Date, end: Date): TimelineEvent[] {
			return events.filter((ev) => overlaps(ev, start, end));
		},

		forDay(date: Date): TimelineEvent[] {
			const dayStart = new Date(sod(date.getTime()));
			const dayEnd = new Date(dayStart.getTime() + DAY_MS);
			return events.filter((ev) => overlaps(ev, dayStart, dayEnd));
		},

		byId(id: string): TimelineEvent | undefined {
			return events.find((e) => e.id === id);
		},

		async add(eventData: Omit<TimelineEvent, 'id'>): Promise<TimelineEvent> {
			loading = true;
			error = null;
			try {
				const created = await adapter.createEvent(eventData);
				events.push(created);
				return created;
			} catch (e) {
				error = e instanceof Error ? e.message : String(e);
				throw e;
			} finally {
				loading = false;
			}
		},

		async update(id: string, patch: Partial<TimelineEvent>): Promise<void> {
			loading = true;
			error = null;
			try {
				const updated = await adapter.updateEvent(id, patch);
				replaceEvent(id, updated);
			} catch (e) {
				error = e instanceof Error ? e.message : String(e);
				throw e;
			} finally {
				loading = false;
			}
		},

		async remove(id: string): Promise<void> {
			loading = true;
			error = null;
			try {
				await adapter.deleteEvent(id);
				removeEvent(id);
			} catch (e) {
				error = e instanceof Error ? e.message : String(e);
				throw e;
			} finally {
				loading = false;
			}
		},

		async move(id: string, newStart: Date, newEnd: Date): Promise<void> {
			return this.update(id, { start: newStart, end: newEnd });
		},
	};
}
