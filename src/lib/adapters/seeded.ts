import type { CalendarAdapter, DateRange } from './types.js';
import type { TimelineEvent } from '../core/types.js';

/**
 * An adapter that answers its first load synchronously with events the
 * server already had — so the server render carries the rows and the client
 * hydrates the same ones — and every later load, including a refresh(), goes
 * to the real adapter. The seed is meant for the range the page opens on.
 */
export function withInitialEvents(adapter: CalendarAdapter, events: TimelineEvent[]): CalendarAdapter {
	let seed: TimelineEvent[] | undefined = events;
	return {
		...adapter,
		fetchEventsSync(range: DateRange) {
			const s = seed;
			seed = undefined;
			return s ?? adapter.fetchEventsSync?.(range);
		},
	};
}
