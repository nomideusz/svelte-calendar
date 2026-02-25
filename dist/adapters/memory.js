let counter = 0;
function uid() {
    return `mem-${Date.now()}-${++counter}`;
}
/** Default palette for auto-coloring */
const AUTO_COLORS = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6',
    '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#f43f5e',
    '#06b6d4', '#84cc16', '#d946ef', '#0ea5e9', '#10b981',
];
export function createMemoryAdapter(initial = [], options = {}) {
    const { colorMap, autoColor } = options;
    const events = [...initial];
    // Build auto-color assignments
    const colorAssignments = new Map();
    let colorIndex = 0;
    function resolveColor(ev) {
        if (ev.color)
            return ev.color;
        if (!colorMap && !autoColor)
            return undefined;
        const key = ev.category ?? ev.title;
        if (colorMap?.[key])
            return colorMap[key];
        if (autoColor) {
            if (!colorAssignments.has(key)) {
                colorAssignments.set(key, AUTO_COLORS[colorIndex % AUTO_COLORS.length]);
                colorIndex++;
            }
            return colorAssignments.get(key);
        }
        return undefined;
    }
    function withColor(ev) {
        const color = resolveColor(ev);
        return color ? { ...ev, color } : ev;
    }
    function overlaps(ev, range) {
        return ev.start < range.end && ev.end > range.start;
    }
    return {
        async fetchEvents(range) {
            return events.filter((ev) => overlaps(ev, range)).map(withColor);
        },
        async createEvent(data) {
            const ev = { ...data, id: uid() };
            events.push(ev);
            return withColor(ev);
        },
        async updateEvent(id, patch) {
            const idx = events.findIndex((e) => e.id === id);
            if (idx < 0)
                throw new Error(`Event not found: ${id}`);
            events[idx] = { ...events[idx], ...patch, id };
            return withColor(events[idx]);
        },
        async deleteEvent(id) {
            const idx = events.findIndex((e) => e.id === id);
            if (idx < 0)
                throw new Error(`Event not found: ${id}`);
            events.splice(idx, 1);
        },
    };
}
