/**
 * Shared TypeScript types for the timeline design system.
 */
/**
 * Represents an event on the timeline / scheduler.
 * Core interface for all views, adapters, and the event store.
 */
export interface TimelineEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    color?: string;
    /** True for all-day events (no specific start/end time) */
    allDay?: boolean;
    /** Category for grouping (e.g. "wellness", "work", "life") */
    category?: string;
    /** Subtitle displayed below the title (e.g. instructor name, level) */
    subtitle?: string;
    /** Tags displayed as small pills (e.g. ["Beginner", "Yoga"]) */
    tags?: string[];
    /** Arbitrary payload from the source app (bookings, attendees, etc.) */
    data?: Record<string, unknown>;
}
