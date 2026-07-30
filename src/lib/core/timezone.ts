/**
 * Timezone utilities — convert between IANA timezones and local time.
 *
 * Uses date-fns-tz under the hood. All functions accept an IANA timezone
 * string (e.g. 'America/New_York', 'Europe/Warsaw', 'Asia/Tokyo').
 *
 * Usage:
 *   import { toZonedTime, fromZonedTime, nowInZone } from '@nomideusz/svelte-calendar';
 *
 *   // Convert a UTC date to display in a specific timezone
 *   const localDate = toZonedTime(utcDate, 'America/New_York');
 *
 *   // Convert a "display" date back to UTC for storage
 *   const utcDate = fromZonedTime(localDate, 'America/New_York');
 *
 *   // Get current time in a timezone
 *   const now = nowInZone('Asia/Tokyo');
 */
import { toZonedTime as dfnsToZoned, fromZonedTime as dfnsFromZoned } from 'date-fns-tz';

/**
 * Convert a Date (assumed UTC or local) to a Date representing
 * the same instant in the target timezone.
 *
 * The returned Date's local getters (getHours, getMinutes, etc.)
 * will return the values as they appear in the target timezone.
 */
export function toZonedTime(date: Date | number, timezone: string): Date {
	return dfnsToZoned(date, timezone);
}

/**
 * Convert a "zoned" Date (whose local getters represent a specific timezone)
 * back to a true UTC Date. Use this before persisting to a backend.
 */
export function fromZonedTime(date: Date | number, timezone: string): Date {
	return dfnsFromZoned(date, timezone);
}

/**
 * Get the current time as it appears in the given timezone.
 */
export function nowInZone(timezone: string): Date {
	return dfnsToZoned(new Date(), timezone);
}

/**
 * Format a Date in a specific timezone using Intl.DateTimeFormat.
 * Returns a locale-aware string.
 */
export function formatInTimeZone(
	date: Date | number,
	timezone: string,
	options: Intl.DateTimeFormatOptions = {},
	locale?: string,
): string {
	const d = typeof date === 'number' ? new Date(date) : date;
	return new Intl.DateTimeFormat(locale ?? 'en-US', {
		...options,
		timeZone: timezone,
	}).format(d);
}

/**
 * Wrap a CalendarAdapter so everything it emits is expressed as wall-clock
 * Dates in `timezone`, and everything written through it is converted back to
 * real instants. This is how the Calendar's `timezone` prop works: views keep
 * doing plain local-time math on an already-shifted plane.
 *
 * Known limit shared by every wall-clock calendar UI: during a DST fall-back
 * the repeated hour is ambiguous on the wall clock, so writes made inside it
 * resolve to one of the two instants (date-fns-tz picks the offset).
 */
import type { CalendarAdapter, DateRange } from '../adapters/types.js';
import type { TimelineEvent } from './types.js';

export function wrapAdapterWithTimezone(
	adapter: CalendarAdapter,
	timezone: string,
): CalendarAdapter {
	const zoneEvent = (ev: TimelineEvent): TimelineEvent => ({
		...ev,
		start: toZonedTime(ev.start, timezone),
		end: toZonedTime(ev.end, timezone),
	});
	const unzonePartial = <T extends Partial<Pick<TimelineEvent, 'start' | 'end'>>>(obj: T): T => ({
		...obj,
		...(obj.start instanceof Date ? { start: fromZonedTime(obj.start, timezone) } : {}),
		...(obj.end instanceof Date ? { end: fromZonedTime(obj.end, timezone) } : {}),
	});

	const wrapped: CalendarAdapter = {
		async fetchEvents(range: DateRange) {
			const events = await adapter.fetchEvents({
				start: fromZonedTime(range.start, timezone),
				end: fromZonedTime(range.end, timezone),
			});
			return events.map(zoneEvent);
		},
	};
	if (adapter.createEvent) {
		wrapped.createEvent = async (event) => zoneEvent(await adapter.createEvent!(unzonePartial(event)));
	}
	if (adapter.updateEvent) {
		wrapped.updateEvent = async (id, patch) => zoneEvent(await adapter.updateEvent!(id, unzonePartial(patch)));
	}
	if (adapter.deleteEvent) {
		wrapped.deleteEvent = (id) => adapter.deleteEvent!(id);
	}
	return wrapped;
}
