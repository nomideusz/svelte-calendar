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

/**
 * Represents a blocked/unavailable time slot on the calendar.
 * Used to mark times when events cannot be created (e.g. lunch break, maintenance).
 */
export interface BlockedSlot {
	/** ISO weekday (1=Mon … 7=Sun). If omitted, applies to all days. */
	day?: number;
	/** Start hour (0–24, decimals allowed: 12.5 = 12:30) */
	start: number;
	/** End hour (0–24, decimals allowed: 13.5 = 1:30 PM) */
	end: number;
	/** Optional label shown on the blocked region */
	label?: string;
}
