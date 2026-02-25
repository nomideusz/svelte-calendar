/**
 * In-memory adapter — the default for demos and testing.
 *
 * Events are stored in a plain array. No persistence across page loads.
 * Perfect for prototyping and unit tests.
 *
 * Usage:
 *   import { createMemoryAdapter } from '$lib/adapters';
 *   const adapter = createMemoryAdapter(initialEvents);
 *   const store = createEventStore(adapter);
 */
import type { TimelineEvent } from '../core/types.js';
import type { CalendarAdapter, DateRange } from './types.js';

let counter = 0;
function uid(): string {
	return `mem-${Date.now()}-${++counter}`;
}

export function createMemoryAdapter(
	initial: TimelineEvent[] = [],
): CalendarAdapter {
	const events: TimelineEvent[] = [...initial];

	function overlaps(ev: TimelineEvent, range: DateRange): boolean {
		return ev.start < range.end && ev.end > range.start;
	}

	return {
		async fetchEvents(range: DateRange): Promise<TimelineEvent[]> {
			return events.filter((ev) => overlaps(ev, range));
		},

		async createEvent(
			data: Omit<TimelineEvent, 'id'>,
		): Promise<TimelineEvent> {
			const ev: TimelineEvent = { ...data, id: uid() };
			events.push(ev);
			return ev;
		},

		async updateEvent(
			id: string,
			patch: Partial<TimelineEvent>,
		): Promise<TimelineEvent> {
			const idx = events.findIndex((e) => e.id === id);
			if (idx < 0) throw new Error(`Event not found: ${id}`);
			events[idx] = { ...events[idx], ...patch, id };
			return events[idx];
		},

		async deleteEvent(id: string): Promise<void> {
			const idx = events.findIndex((e) => e.id === id);
			if (idx < 0) throw new Error(`Event not found: ${id}`);
			events.splice(idx, 1);
		},
	};
}
