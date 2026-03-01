import type { CalendarAdapter } from './types.js';
/**
 * A recurring event definition.
 *
 * Backward-compatible: the only required fields are `id`, `title`,
 * `startTime`, `endTime`, and `dayOfWeek` (for weekly, the default).
 */
export interface RecurringEvent {
    id: string;
    title: string;
    /** Start time in "HH:MM" 24-hour format */
    startTime: string;
    /** End time in "HH:MM" 24-hour format */
    endTime: string;
    /** Recurrence frequency (default: `'weekly'`) */
    frequency?: 'daily' | 'weekly' | 'monthly';
    /**
     * Repeat every N periods — e.g. `2` with `weekly` = biweekly.
     * Requires `startDate` when > 1 so the adapter knows the anchor.
     * @default 1
     */
    interval?: number;
    /**
     * ISO weekday(s): 1 = Monday … 7 = Sunday.
     * Required for `weekly` frequency. Pass an array for multiple days
     * (e.g. `[1, 3, 5]` for Mon/Wed/Fri).
     */
    dayOfWeek?: number | number[];
    /**
     * Day of month (1–31). Required for `monthly` frequency.
     * Clamped to the last day of shorter months (e.g. 31 → 28 in Feb).
     * @default 1
     */
    dayOfMonth?: number;
    /**
     * First possible occurrence in `"YYYY-MM-DD"` format.
     * Events before this date are excluded. Required when using
     * `interval > 1` or `count`.
     */
    startDate?: string;
    /**
     * Last possible occurrence in `"YYYY-MM-DD"` format.
     * No events are generated after this date.
     */
    until?: string;
    /**
     * Maximum number of occurrences, counted from `startDate`.
     * Alternative to `until` — if both are set the stricter bound wins.
     * Requires `startDate`.
     */
    count?: number;
    /** Accent color */
    color?: string;
    /** Optional subtitle displayed below the title */
    subtitle?: string;
    /** Optional tags displayed as small pills */
    tags?: string[];
    /** Category for grouping */
    category?: string;
    /** Arbitrary payload */
    data?: Record<string, unknown>;
}
export interface RecurringAdapterOptions {
    /** Start weeks on Monday (default: true) */
    mondayStart?: boolean;
    /** Map of category/title to color */
    colorMap?: Record<string, string>;
    /**
     * Auto-assign colors to events by category or title.
     *   true    → use the default vivid palette
     *   string  → hex accent color to generate a harmonious palette
     */
    autoColor?: boolean | string;
}
/**
 * Create a CalendarAdapter that projects recurring events onto concrete
 * dates for whatever range the calendar requests.
 *
 * Read-only by default — create/update/delete throw.
 */
export declare function createRecurringAdapter(schedule: RecurringEvent[], options?: RecurringAdapterOptions): CalendarAdapter;
