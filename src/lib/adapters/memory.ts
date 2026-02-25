/**
 * In-memory adapter — the default for demos and testing.
 *
 * Events are stored in a plain array. No persistence across page loads.
 * Perfect for prototyping and unit tests.
 *
 * Usage:
 *   import { createMemoryAdapter } from '$lib/adapters';
 *   const adapter = createMemoryAdapter(initialEvents);
 *   const store = createEventStore(adapter);
 */
import type { TimelineEvent } from '../core/types.js';
import type { CalendarAdapter, DateRange } from './types.js';

let counter = 0;
function uid(): string {
	return `mem-${Date.now()}-${++counter}`;
}

/** Default palette for auto-coloring */
const AUTO_COLORS = [
	'#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6',
	'#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#f43f5e',
	'#06b6d4', '#84cc16', '#d946ef', '#0ea5e9', '#10b981',
];

export interface MemoryAdapterOptions {
	/** Map of category/title to color */
	colorMap?: Record<string, string>;
	/** Auto-assign colors to events by category or title */
	autoColor?: boolean;
}

export function createMemoryAdapter(
	initial: TimelineEvent[] = [],
	options: MemoryAdapterOptions = {},
): CalendarAdapter {
	const { colorMap, autoColor } = options;
	const events: TimelineEvent[] = [...initial];

	// Build auto-color assignments
	const colorAssignments = new Map<string, string>();
	let colorIndex = 0;

	function resolveColor(ev: TimelineEvent): string | undefined {
		if (ev.color) return ev.color;
		if (!colorMap && !autoColor) return undefined;
		const key = ev.category ?? ev.title;
		if (colorMap?.[key]) return colorMap[key];
		if (autoColor) {
			if (!colorAssignments.has(key)) {
				colorAssignments.set(key, AUTO_COLORS[colorIndex % AUTO_COLORS.length]);
				colorIndex++;
			}
			return colorAssignments.get(key);
		}
		return undefined;
	}

	function withColor(ev: TimelineEvent): TimelineEvent {
		const color = resolveColor(ev);
		return color ? { ...ev, color } : ev;
	}

	function overlaps(ev: TimelineEvent, range: DateRange): boolean {
		return ev.start < range.end && ev.end > range.start;
	}

	return {
		async fetchEvents(range: DateRange): Promise<TimelineEvent[]> {
			return events.filter((ev) => overlaps(ev, range)).map(withColor);
		},

		async createEvent(
			data: Omit<TimelineEvent, 'id'>,
		): Promise<TimelineEvent> {
			const ev: TimelineEvent = { ...data, id: uid() };
			events.push(ev);
			return withColor(ev);
		},

		async updateEvent(
			id: string,
			patch: Partial<TimelineEvent>,
		): Promise<TimelineEvent> {
			const idx = events.findIndex((e) => e.id === id);
			if (idx < 0) throw new Error(`Event not found: ${id}`);
			events[idx] = { ...events[idx], ...patch, id };
			return withColor(events[idx]);
		},

		async deleteEvent(id: string): Promise<void> {
			const idx = events.findIndex((e) => e.id === id);
			if (idx < 0) throw new Error(`Event not found: ${id}`);
			events.splice(idx, 1);
		},
	};
}
