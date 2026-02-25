let counter = 0;
function uid() {
    return `mem-${Date.now()}-${++counter}`;
}
export function createMemoryAdapter(initial = []) {
    const events = [...initial];
    function overlaps(ev, range) {
        return ev.start < range.end && ev.end > range.start;
    }
    return {
        async fetchEvents(range) {
            return events.filter((ev) => overlaps(ev, range));
        },
        async createEvent(data) {
            const ev = { ...data, id: uid() };
            events.push(ev);
            return ev;
        },
        async updateEvent(id, patch) {
            const idx = events.findIndex((e) => e.id === id);
            if (idx < 0)
                throw new Error(`Event not found: ${id}`);
            events[idx] = { ...events[idx], ...patch, id };
            return events[idx];
        },
        async deleteEvent(id) {
            const idx = events.findIndex((e) => e.id === id);
            if (idx < 0)
                throw new Error(`Event not found: ${id}`);
            events.splice(idx, 1);
        },
    };
}
