import { startOfWeek } from '../core/time.js';
import { DAY_MS } from '../core/time.js';
import { generatePalette, VIVID_PALETTE } from '../core/palette.js';
/** Parse "HH:MM" into [hours, minutes] */
function parseTime(time) {
    const [h, m] = time.split(':').map(Number);
    return [h, m ?? 0];
}
/**
 * Convert ISO weekday (1=Mon…7=Sun) to JS Date weekday offset from Monday.
 * Monday = 0, Tuesday = 1, … Sunday = 6
 */
function isoWeekdayToOffset(dayOfWeek) {
    return dayOfWeek - 1; // 1→0, 2→1, …, 7→6
}
/**
 * Project a recurring event onto a specific week, returning a concrete TimelineEvent.
 */
function projectToWeek(rec, weekStartMs, weekIndex) {
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
function getOverlappingWeeks(range, mondayStart) {
    const weeks = [];
    let cursor = startOfWeek(range.start.getTime(), mondayStart);
    let index = 0;
    while (cursor < range.end.getTime()) {
        weeks.push({ weekStartMs: cursor, weekIndex: index });
        cursor += 7 * DAY_MS;
        index++;
    }
    return weeks;
}
/** Default palette for auto-coloring */
const AUTO_COLORS = VIVID_PALETTE;
/**
 * Create a CalendarAdapter that projects recurring weekly events
 * onto concrete dates for whatever range the calendar requests.
 *
 * Read-only by default — create/update/delete throw unless custom handlers are provided.
 */
export function createRecurringAdapter(schedule, options = {}) {
    const { mondayStart = true, colorMap, autoColor } = options;
    // Resolve palette: vivid default or theme-aware
    const palette = autoColor
        ? typeof autoColor === 'string'
            ? generatePalette(autoColor)
            : AUTO_COLORS
        : AUTO_COLORS;
    // Build auto-color assignments
    const colorAssignments = new Map();
    if (autoColor || colorMap) {
        let colorIndex = 0;
        for (const rec of schedule) {
            const key = rec.category ?? rec.title;
            if (colorMap?.[key]) {
                colorAssignments.set(key, colorMap[key]);
            }
            else if (autoColor && !colorAssignments.has(key)) {
                colorAssignments.set(key, palette[colorIndex % palette.length]);
                colorIndex++;
            }
        }
    }
    function resolveColor(rec) {
        if (rec.color)
            return rec.color;
        const key = rec.category ?? rec.title;
        return colorAssignments.get(key);
    }
    return {
        async fetchEvents(range) {
            const weeks = getOverlappingWeeks(range, mondayStart);
            const events = [];
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
        async createEvent() {
            throw new Error('createRecurringAdapter is read-only. Use a memory or REST adapter for mutations.');
        },
        async updateEvent() {
            throw new Error('createRecurringAdapter is read-only. Use a memory or REST adapter for mutations.');
        },
        async deleteEvent() {
            throw new Error('createRecurringAdapter is read-only. Use a memory or REST adapter for mutations.');
        },
    };
}
