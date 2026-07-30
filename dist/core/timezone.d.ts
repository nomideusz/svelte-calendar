/**
 * Convert a Date (assumed UTC or local) to a Date representing
 * the same instant in the target timezone.
 *
 * The returned Date's local getters (getHours, getMinutes, etc.)
 * will return the values as they appear in the target timezone.
 */
export declare function toZonedTime(date: Date | number, timezone: string): Date;
/**
 * Convert a "zoned" Date (whose local getters represent a specific timezone)
 * back to a true UTC Date. Use this before persisting to a backend.
 */
export declare function fromZonedTime(date: Date | number, timezone: string): Date;
/**
 * Get the current time as it appears in the given timezone.
 */
export declare function nowInZone(timezone: string): Date;
/**
 * Format a Date in a specific timezone using Intl.DateTimeFormat.
 * Returns a locale-aware string.
 */
export declare function formatInTimeZone(date: Date | number, timezone: string, options?: Intl.DateTimeFormatOptions, locale?: string): string;
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
import type { CalendarAdapter } from '../adapters/types.js';
export declare function wrapAdapterWithTimezone(adapter: CalendarAdapter, timezone: string): CalendarAdapter;
