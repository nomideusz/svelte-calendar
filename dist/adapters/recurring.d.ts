import type { CalendarAdapter } from './types.js';
/**
 * A weekly recurring event definition.
 */
export interface RecurringEvent {
    id: string;
    title: string;
    /** ISO weekday: 1 = Monday … 7 = Sunday */
    dayOfWeek: number;
    /** Start time in "HH:MM" 24-hour format */
    startTime: string;
    /** End time in "HH:MM" 24-hour format */
    endTime: string;
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
     *   string  → hex accent color (e.g. '#6366f1') to generate a
     *             theme-harmonious palette via golden-angle hue rotation
     */
    autoColor?: boolean | string;
}
/**
 * Create a CalendarAdapter that projects recurring weekly events
 * onto concrete dates for whatever range the calendar requests.
 *
 * Read-only by default — create/update/delete throw unless custom handlers are provided.
 */
export declare function createRecurringAdapter(schedule: RecurringEvent[], options?: RecurringAdapterOptions): CalendarAdapter;
