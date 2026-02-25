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
	/** All-day event (renders as a banner, not a timed block) */
	allDay?: boolean;
	/** Category for grouping (e.g. "wellness", "work", "life") */
	category?: string;
	/** Recurrence rule — iCalendar RRULE string (e.g. "FREQ=WEEKLY;BYDAY=MO") */
	recurrence?: string;
	/** Whether this event can be moved / resized by the user */
	editable?: boolean;
	/** Arbitrary payload from the source app (bookings, attendees, etc.) */
	data?: Record<string, unknown>;
}

/**
 * Shared props contract for all WeekTimeline variants.
 * Every variant MUST accept this exact interface so they can be
 * hot-swapped without changing bindings.
 */
export interface WeekTimelineProps {
	/** Week offset: 0 = this week, -1 = last, +1 = next (ignored when focusDate is set) */
	weekOffset?: number;
	/** Start on Monday (true) or Sunday (false) */
	mondayStart?: boolean;
	/** Pixel height of one hour row */
	hourHeight?: number;
	/** Pixel width of each day column (0 = equal flex) */
	dayWidth?: number;
	/** Where "now" sits vertically (0 = top edge, 1 = bottom edge) */
	nowPosition?: number;
	/** Total visible height of the component */
	height?: number;
	/** Events to render */
	events?: TimelineEvent[];
	/** Inline style for CSS variable overrides (theme) */
	style?: string;
	/** The date to centre this view on. Overrides weekOffset when set. */
	focusDate?: Date;
	/** Called when the user clicks an event */
	oneventclick?: (event: TimelineEvent) => void;
	/** Called when the user clicks an empty time slot */
	oneventcreate?: (range: { start: Date; end: Date }) => void;
	/** Currently selected event ID (for highlight) */
	selectedEventId?: string | null;
}

/**
 * Shared props contract for the DayTimeline component.
 */
export interface DayTimelineProps {
	/** Number of past days visible */
	pastDays?: number;
	/** Number of future days visible */
	futureDays?: number;
	/** Pixel width of one hour */
	hourWidth?: number;
	/** Where "now" sits in the viewport (0 = left edge, 1 = right edge) */
	nowPosition?: number;
	/** Events to render */
	events?: TimelineEvent[];
	/** Inline style for CSS custom property overrides */
	style?: string;
	/** The date to centre this view on */
	focusDate?: Date;
	/** Called when the user clicks an event */
	oneventclick?: (event: TimelineEvent) => void;
	/** Called when the user clicks an empty time slot */
	oneventcreate?: (range: { start: Date; end: Date }) => void;
	/** Currently selected event ID (for highlight) */
	selectedEventId?: string | null;
}



/**
 * Convert a Date (or timestamp) to a pixel offset on the timeline.
 * Useful for external apps that need to position overlays.
 */
export function timeToX(time: Date | number, rangeStartMs: number, hourWidth: number): number {
	const ms = typeof time === 'number' ? time : time.getTime();
	return ((ms - rangeStartMs) / 3_600_000) * hourWidth;
}
