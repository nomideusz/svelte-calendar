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
export function toZonedTime(date, timezone) {
    return dfnsToZoned(date, timezone);
}
/**
 * Convert a "zoned" Date (whose local getters represent a specific timezone)
 * back to a true UTC Date. Use this before persisting to a backend.
 */
export function fromZonedTime(date, timezone) {
    return dfnsFromZoned(date, timezone);
}
/**
 * Get the current time as it appears in the given timezone.
 */
export function nowInZone(timezone) {
    return dfnsToZoned(new Date(), timezone);
}
/**
 * Format a Date in a specific timezone using Intl.DateTimeFormat.
 * Returns a locale-aware string.
 */
export function formatInTimeZone(date, timezone, options = {}, locale) {
    const d = typeof date === 'number' ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale ?? 'en-US', {
        ...options,
        timeZone: timezone,
    }).format(d);
}
export function wrapAdapterWithTimezone(adapter, timezone) {
    const zoneEvent = (ev) => ({
        ...ev,
        start: toZonedTime(ev.start, timezone),
        end: toZonedTime(ev.end, timezone),
    });
    const unzonePartial = (obj) => ({
        ...obj,
        ...(obj.start instanceof Date ? { start: fromZonedTime(obj.start, timezone) } : {}),
        ...(obj.end instanceof Date ? { end: fromZonedTime(obj.end, timezone) } : {}),
    });
    const wrapped = {
        async fetchEvents(range) {
            const events = await adapter.fetchEvents({
                start: fromZonedTime(range.start, timezone),
                end: fromZonedTime(range.end, timezone),
            });
            return events.map(zoneEvent);
        },
    };
    if (adapter.createEvent) {
        wrapped.createEvent = async (event) => zoneEvent(await adapter.createEvent(unzonePartial(event)));
    }
    if (adapter.updateEvent) {
        wrapped.updateEvent = async (id, patch) => zoneEvent(await adapter.updateEvent(id, unzonePartial(patch)));
    }
    if (adapter.deleteEvent) {
        wrapped.deleteEvent = (id) => adapter.deleteEvent(id);
    }
    return wrapped;
}
