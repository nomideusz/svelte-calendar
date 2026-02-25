/**
 * Recurring event adapter — projects weekly recurring schedules
 * onto concrete dates for whatever week range the calendar is viewing.
 *
 * Eliminates the need for consumers to manually fabricate Date objects
 * from simple "07:00-08:30 on Monday" schedule definitions.
 *
 * Usage:
 *   import { createRecurringAdapter } from '@nomideusz/svelte-calendar';
 *
 *   const adapter = createRecurringAdapter([
 *     { id: '1', title: 'Yoga', dayOfWeek: 1, startTime: '07:00', endTime: '08:30', color: '#34d399' },
 *     { id: '2', title: 'Pilates', dayOfWeek: 3, startTime: '18:00', endTime: '19:00' },
 *   ]);
 */
import type { TimelineEvent } from '../core/types.js';
import type { CalendarAdapter, DateRange } from './types.js';
import { startOfWeek } from '../core/time.js';
import { DAY_MS } from '../core/time.js';

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

/** Parse "HH:MM" into [hours, minutes] */
function parseTime(time: string): [number, number] {
	const [h, m] = time.split(':').map(Number);
	return [h, m ?? 0];
}

/**
 * Convert ISO weekday (1=Mon…7=Sun) to JS Date weekday offset from Monday.
 * Monday = 0, Tuesday = 1, … Sunday = 6
 */
function isoWeekdayToOffset(dayOfWeek: number): number {
	return dayOfWeek - 1; // 1→0, 2→1, …, 7→6
}

/**
 * Project a recurring event onto a specific week, returning a concrete TimelineEvent.
 */
function projectToWeek(
	rec: RecurringEvent,
	weekStartMs: number,
	weekIndex: number,
): TimelineEvent {
	const dayOffset = isoWeekdayToOffset(rec.dayOfWeek);
	const dayMs = weekStartMs + dayOffset * DAY_MS;
	const dayDate = new Date(dayMs);

	const [sh, sm] = parseTime(rec.startTime);
	const [eh, em] = parseTime(rec.endTime);

	const start = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate(), sh, sm);
	const end = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate(), eh, em);

	return {
		id: `${rec.id}--w${weekIndex}--d${rec.dayOfWeek}`,
		title: rec.title,
		start,
		end,
		color: rec.color,
		category: rec.category,
		data: {
			...rec.data,
			recurringId: rec.id,
			...(rec.subtitle ? { subtitle: rec.subtitle } : {}),
			...(rec.tags ? { tags: rec.tags } : {}),
		},
	};
}

/**
 * Find all weeks that overlap a given date range.
 * Returns an array of { weekStartMs, weekIndex } objects.
 */
function getOverlappingWeeks(range: DateRange, mondayStart: boolean): { weekStartMs: number; weekIndex: number }[] {
	const weeks: { weekStartMs: number; weekIndex: number }[] = [];
	let cursor = startOfWeek(range.start.getTime(), mondayStart);
	let index = 0;

	while (cursor < range.end.getTime()) {
		weeks.push({ weekStartMs: cursor, weekIndex: index });
		cursor += 7 * DAY_MS;
		index++;
	}

	return weeks;
}

export interface RecurringAdapterOptions {
	/** Start weeks on Monday (default: true) */
	mondayStart?: boolean;
	/** Map of category/title to color */
	colorMap?: Record<string, string>;
	/** Auto-assign colors to events by category or title */
	autoColor?: boolean;
}

/** Default palette for auto-coloring */
const AUTO_COLORS = [
	'#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6',
	'#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#f43f5e',
	'#06b6d4', '#84cc16', '#d946ef', '#0ea5e9', '#10b981',
];

/**
 * Create a CalendarAdapter that projects recurring weekly events
 * onto concrete dates for whatever range the calendar requests.
 *
 * Read-only by default — create/update/delete throw unless custom handlers are provided.
 */
export function createRecurringAdapter(
	schedule: RecurringEvent[],
	options: RecurringAdapterOptions = {},
): CalendarAdapter {
	const { mondayStart = true, colorMap, autoColor } = options;

	// Build auto-color assignments
	const colorAssignments = new Map<string, string>();
	if (autoColor || colorMap) {
		let colorIndex = 0;
		for (const rec of schedule) {
			const key = rec.category ?? rec.title;
			if (colorMap?.[key]) {
				colorAssignments.set(key, colorMap[key]);
			} else if (autoColor && !colorAssignments.has(key)) {
				colorAssignments.set(key, AUTO_COLORS[colorIndex % AUTO_COLORS.length]);
				colorIndex++;
			}
		}
	}

	function resolveColor(rec: RecurringEvent): string | undefined {
		if (rec.color) return rec.color;
		const key = rec.category ?? rec.title;
		return colorAssignments.get(key);
	}

	return {
		async fetchEvents(range: DateRange): Promise<TimelineEvent[]> {
			const weeks = getOverlappingWeeks(range, mondayStart);
			const events: TimelineEvent[] = [];

			for (const { weekStartMs, weekIndex } of weeks) {
				for (const rec of schedule) {
					const coloredRec = { ...rec, color: resolveColor(rec) };
					const ev = projectToWeek(coloredRec, weekStartMs, weekIndex);
					// Only include if the event overlaps the requested range
					if (ev.start < range.end && ev.end > range.start) {
						events.push(ev);
					}
				}
			}

			return events;
		},

		async createEvent(): Promise<TimelineEvent> {
			throw new Error('createRecurringAdapter is read-only. Use a memory or REST adapter for mutations.');
		},

		async updateEvent(): Promise<TimelineEvent> {
			throw new Error('createRecurringAdapter is read-only. Use a memory or REST adapter for mutations.');
		},

		async deleteEvent(): Promise<void> {
			throw new Error('createRecurringAdapter is read-only. Use a memory or REST adapter for mutations.');
		},
	};
}
