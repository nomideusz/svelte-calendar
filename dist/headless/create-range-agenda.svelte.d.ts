import type { TimelineEvent } from '../core/types.js';
import type { CalendarAdapter } from '../adapters/types.js';
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
    /** Every day in the current window, in order, with events attached */
    readonly days: RangeAgendaDay[];
    /** The current window */
    readonly range: {
        start: Date;
        end: Date;
    };
    /** Total event count in the window */
    readonly count: number;
    /** Whether the adapter is loading */
    readonly loading: boolean;
    /** Last adapter error, if any */
    readonly error: string | null;
    /** Page back one window */
    prev(): void;
    /** Page forward one window */
    next(): void;
    /** Move the window start to today (not re-aligned; use setDate for aligned jumps) */
    goToday(): void;
    /** Set the window start to a specific date */
    setDate(date: Date): void;
    /** Format a Date to locale time string (e.g. "14:30") */
    fmtTime(date: Date): string;
    /** Format event duration (e.g. "1h 30m") */
    fmtDuration(event: TimelineEvent): string;
    /** Format time range (e.g. "14:00 – 15:30") */
    fmtRange(event: TimelineEvent): string;
}
export declare function createRangeAgenda(options: RangeAgendaOptions): HeadlessRangeAgenda;
