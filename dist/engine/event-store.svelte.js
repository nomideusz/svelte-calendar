import { sod } from '../core/time.js';
/**
 * Create a reactive event store backed by a CalendarAdapter.
 */
export function createEventStore(adapter) {
    let events = $state([]);
    let loading = $state(false);
    let error = $state(null);
    // ── Internal helpers ──
    function overlaps(ev, start, end) {
        return ev.start < end && ev.end > start;
    }
    function replaceEvent(id, updated) {
        const idx = events.findIndex((e) => e.id === id);
        if (idx >= 0) {
            events[idx] = updated;
        }
    }
    function removeEvent(id) {
        events = events.filter((e) => e.id !== id);
    }
    function upsertEvent(ev) {
        const idx = events.findIndex((e) => e.id === ev.id);
        if (idx >= 0) {
            events[idx] = ev;
        }
        else {
            events.push(ev);
        }
    }
    // ── Public API ──
    return {
        get events() {
            return events;
        },
        get loading() {
            return loading;
        },
        get error() {
            return error;
        },
        async load(range) {
            loading = true;
            error = null;
            try {
                const fetched = await adapter.fetchEvents(range);
                // Merge: upsert fetched, don't blow away events outside this range
                for (const ev of fetched) {
                    upsertEvent(ev);
                }
            }
            catch (e) {
                error = e instanceof Error ? e.message : String(e);
            }
            finally {
                loading = false;
            }
        },
        forRange(start, end) {
            return events.filter((ev) => overlaps(ev, start, end));
        },
        forDay(date) {
            const dayStart = new Date(sod(date.getTime()));
            const dayEnd = new Date(dayStart.getTime() + 86_400_000);
            return events.filter((ev) => overlaps(ev, dayStart, dayEnd));
        },
        byId(id) {
            return events.find((e) => e.id === id);
        },
        async add(eventData) {
            loading = true;
            error = null;
            try {
                const created = await adapter.createEvent(eventData);
                events.push(created);
                return created;
            }
            catch (e) {
                error = e instanceof Error ? e.message : String(e);
                throw e;
            }
            finally {
                loading = false;
            }
        },
        async update(id, patch) {
            loading = true;
            error = null;
            try {
                const updated = await adapter.updateEvent(id, patch);
                replaceEvent(id, updated);
            }
            catch (e) {
                error = e instanceof Error ? e.message : String(e);
                throw e;
            }
            finally {
                loading = false;
            }
        },
        async remove(id) {
            loading = true;
            error = null;
            try {
                await adapter.deleteEvent(id);
                removeEvent(id);
            }
            catch (e) {
                error = e instanceof Error ? e.message : String(e);
                throw e;
            }
            finally {
                loading = false;
            }
        },
        async move(id, newStart, newEnd) {
            return this.update(id, { start: newStart, end: newEnd });
        },
    };
}
