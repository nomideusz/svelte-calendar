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
import { SvelteMap } from 'svelte/reactivity';
import { untrack } from 'svelte';
import type { TimelineEvent } from '../core/types.js';
import type { CalendarAdapter, DateRange } from '../adapters/types.js';
import { sod, addDaysMs, overlapsRange } from '../core/time.js';
import { CalendarReadOnlyError, isReadOnlyError, isNotFoundError } from '../adapters/errors.js';

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
 *
 * Pass a getter instead of an adapter when the adapter identity can change
 * (a `$derived` adapter, a host that rebuilds it to force a refetch): the
 * store then stays alive across the swap and reloads, instead of being torn
 * down and rebuilt with an empty event map — which reads as every event
 * blinking out and reappearing.
 */
export function createEventStore(adapter: CalendarAdapter | (() => CalendarAdapter)): EventStore {
	const getAdapter = typeof adapter === 'function' ? adapter : () => adapter;
	let eventMap = new SvelteMap<string, TimelineEvent>();
	/** The latest load is async and has not resolved yet */
	let loadPending = $state(false);
	/** Mutations in flight — a counter, since several can overlap */
	let mutationsPending = $state(0);
	const loading = $derived(loadPending || mutationsPending > 0);
	let error = $state<string | null>(null);
	/** Guards against an older in-flight load pruning a newer one's result */
	let loadSeq = 0;
	/**
	 * Mutation clock. A load that was already in flight when an event was
	 * added, moved or removed must not undo that write when it lands — its
	 * snapshot predates it. Each mutation stamps its id; a load skips ids
	 * stamped after it started.
	 */
	let epoch = 0;
	const touched = new Map<string, number>();
	function touch(id: string): void {
		touched.set(id, ++epoch);
	}

	// Derived array view of the map — consumers read this.
	const eventArray = $derived([...eventMap.values()]);

	// ── Internal helpers ──
	function overlaps(ev: TimelineEvent, start: Date, end: Date): boolean {
		return overlapsRange(ev, start, end);
	}

	function removeEvent(id: string): void {
		eventMap.delete(id);
	}

	function upsertEvent(ev: TimelineEvent): void {
		eventMap.set(ev.id, ev);
	}

	// Merge: upsert fetched, don't blow away events outside this range.
	// Inside the range the adapter is authoritative — drop what it no
	// longer returns, or deleted/moved events linger until remount.
	// `since` is the mutation clock when the fetch started: ids written after
	// that are newer than the adapter's answer and are left as they are.
	function merge(fetched: TimelineEvent[], range: DateRange, since = epoch): void {
		const stale = (id: string) => (touched.get(id) ?? 0) > since;
		const keep = new Set(fetched.map((ev) => ev.id));
		for (const ev of [...eventMap.values()]) {
			if (!keep.has(ev.id) && !stale(ev.id) && overlaps(ev, range.start, range.end)) removeEvent(ev.id);
		}
		for (const ev of fetched) if (!stale(ev.id)) upsertEvent(ev);
		// Stamps no in-flight load can predate are no longer needed.
		for (const [id, at] of touched) if (at <= since) touched.delete(id);
	}

	async function mutate<T>(run: () => Promise<T>): Promise<T> {
		mutationsPending++;
		error = null;
		try {
			return await run();
		} catch (e) {
			// A refusal (read-only) or "not mine" is an answer the caller acts
			// on — the Calendar hands the move to the host — not a failure.
			if (!isReadOnlyError(e) && !isNotFoundError(e)) error = e instanceof Error ? e.message : String(e);
			throw e;
		} finally {
			mutationsPending--;
		}
	}

	// ── Public API ──
	return {
		get events() {
			return eventArray;
		},
		get loading() {
			return loading;
		},
		get error() {
			return error;
		},

		async load(range: DateRange) {
			const seq = ++loadSeq;
			const since = epoch;
			const adapter = getAdapter();
			// In-memory adapters answer at once: no loading state, and a server
			// render already holds the events.
			let sync: TimelineEvent[] | undefined;
			try {
				sync = adapter.fetchEventsSync?.(range);
			} catch (e) {
				// Callers fire load() and forget it (and on the server): a throw
				// here must land in `error`, never as an unhandled rejection.
				loadPending = false;
				error = e instanceof Error ? e.message : String(e);
				return;
			}
			if (sync) {
				error = null;
				// This load supersedes any async one still in flight, whose
				// finally will no longer clear the flag.
				loadPending = false;
				// Callers load from an effect; reading the map here would make that
				// effect depend on what it writes.
				untrack(() => merge(sync, range, since));
				return;
			}
			loadPending = true;
			error = null;
			try {
				const fetched = await adapter.fetchEvents(range);
				if (seq !== loadSeq) return; // superseded by a newer load
				merge(fetched, range, since);
			} catch (e) {
				if (seq === loadSeq) error = e instanceof Error ? e.message : String(e);
			} finally {
				if (seq === loadSeq) loadPending = false;
			}
		},

		forRange(start: Date, end: Date): TimelineEvent[] {
			return eventArray.filter((ev) => overlaps(ev, start, end));
		},

		forDay(date: Date): TimelineEvent[] {
			const dayStart = new Date(sod(date.getTime()));
			const dayEnd = new Date(addDaysMs(dayStart.getTime(), 1));
			return eventArray.filter((ev) => overlaps(ev, dayStart, dayEnd));
		},

		byId(id: string): TimelineEvent | undefined {
			return eventMap.get(id);
		},

		async add(eventData: Omit<TimelineEvent, 'id'>): Promise<TimelineEvent> {
			const adapter = getAdapter();
			if (!adapter.createEvent) throw new CalendarReadOnlyError('Adapter is read-only: createEvent not implemented');
			return mutate(async () => {
				const created = await adapter.createEvent!(eventData);
				upsertEvent(created);
				touch(created.id);
				return created;
			});
		},

		async update(id: string, patch: Partial<TimelineEvent>): Promise<void> {
			const adapter = getAdapter();
			if (!adapter.updateEvent) throw new CalendarReadOnlyError('Adapter is read-only: updateEvent not implemented');
			await mutate(async () => {
				const updated = await adapter.updateEvent!(id, patch);
				upsertEvent(updated);
				touch(id);
			});
		},

		async remove(id: string): Promise<void> {
			const adapter = getAdapter();
			if (!adapter.deleteEvent) throw new CalendarReadOnlyError('Adapter is read-only: deleteEvent not implemented');
			await mutate(async () => {
				await adapter.deleteEvent!(id);
				removeEvent(id);
				touch(id);
			});
		},

		async move(id: string, newStart: Date, newEnd: Date): Promise<void> {
			// Optimistic update: apply locally first so the UI doesn't flash
			// back to the old position between drag.commit() and adapter response.
			const existing = eventMap.get(id);
			if (existing) {
				upsertEvent({ ...existing, start: newStart, end: newEnd });
				touch(id);
			}
			try {
				await this.update(id, { start: newStart, end: newEnd });
			} catch (e) {
				// Revert optimistic update on failure — except for a read-only
				// adapter, where the HOST owns persistence (Calendar forwards to
				// oneventmove). Reverting there snaps the block back to its old
				// slot for the length of the host's round-trip.
				if (existing && !isReadOnlyError(e)) {
					upsertEvent(existing);
					touch(id);
				}
				throw e;
			}
		},
	};
}
