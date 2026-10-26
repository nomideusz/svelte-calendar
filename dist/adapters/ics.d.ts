import type { TimelineEvent } from '../core/types.js';
import type { CalendarAdapter, DateRange } from './types.js';
export interface IcsCalendar {
    /** The calendar's name (X-WR-CALNAME / NAME), when the file has one */
    name?: string;
    /** The calendar's colour (X-APPLE-CALENDAR-COLOR / COLOR), when the file has one */
    color?: string;
    /** Every event overlapping `range`, recurrences expanded */
    events(range: DateRange): TimelineEvent[];
}
/**
 * Parse an iCalendar text (.ics, .ical, .ifb; a .vcs reads as far as its
 * events go). Recurring events are expanded per range by `events(range)`.
 * A malformed line or event is skipped, never thrown.
 */
export declare function parseIcs(input: string): IcsCalendar;
export type IcsSource = string | {
    /** An https:// or webcal:// feed URL (Google's "secret address in iCal format", Outlook's published ICS, an iCloud public calendar) */
    url: string;
    /** Your own fetch — e.g. one that adds headers or goes through your server */
    fetch?: typeof fetch;
    /** Refetch on the next load once the copy is older than this many ms (default: never) */
    refreshInterval?: number;
} | (() => Promise<string>);
export interface IcsAdapterOptions {
    /** Colour for events that name none (default: the calendar's own colour, else ink) */
    color?: string;
}
/**
 * A read-only CalendarAdapter over iCalendar data: a file's text, a feed URL,
 * or a function that loads the text. Each occurrence carries `data.readOnly`,
 * and a write throws CalendarReadOnlyError, so a composite hands a drag to
 * `oneventmove`.
 *
 * Feeds from Google, Outlook and iCloud send no CORS headers: in a browser,
 * fetch them through your own server route.
 */
export declare function createIcsAdapter(source: IcsSource, options?: IcsAdapterOptions): CalendarAdapter;
export interface ToIcsOptions {
    /** Calendar name (X-WR-CALNAME), shown by Google, Apple and Outlook */
    name?: string;
    /** PRODID (default: -//nomideusz//svelte-calendar//EN) */
    prodId?: string;
}
/**
 * Write events as an iCalendar file that Google Calendar, Apple Calendar and
 * Outlook import (or subscribe to, served from a URL). Times go out in UTC;
 * all-day events as dates. UID is `externalId ?? id`. A string
 * `data.description` / `data.url` becomes DESCRIPTION / URL.
 */
export declare function toIcs(events: TimelineEvent[], options?: ToIcsOptions): string;
/** An "add to Google Calendar" link for one event. */
export declare function googleCalendarUrl(ev: TimelineEvent): string;
/**
 * An "add to Outlook" link for one event: outlook.live.com (personal), or
 * `work: true` for outlook.office.com (Microsoft 365).
 */
export declare function outlookCalendarUrl(ev: TimelineEvent, options?: {
    work?: boolean;
}): string;
