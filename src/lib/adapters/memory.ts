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
import { generatePalette, VIVID_PALETTE } from '../core/palette.js';

let counter = 0;
function uid(): string {
	return `mem-${Date.now()}-${++counter}`;
}

/** Default palette for auto-coloring */
const AUTO_COLORS = VIVID_PALETTE;

export interface MemoryAdapterOptions {
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

export function createMemoryAdapter(
	initial: TimelineEvent[] = [],
	options: MemoryAdapterOptions = {},
): CalendarAdapter {
	const { colorMap, autoColor } = options;
	const events: TimelineEvent[] = [...initial];

	// Resolve palette: vivid default or theme-aware
	const palette = autoColor
		? typeof autoColor === 'string'
			? generatePalette(autoColor)
			: AUTO_COLORS
		: AUTO_COLORS;

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
				colorAssignments.set(key, palette[colorIndex % palette.length]);
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
