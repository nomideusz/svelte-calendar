import { CalendarReadOnlyError, EventNotFoundError, isNotFoundError } from './errors.js';
import { overlapsRange } from '../core/time.js';
/**
 * Create a CalendarAdapter that merges events from multiple child adapters.
 *
 * Updates and deletes go to the child that returned the event. An event from
 * a child that cannot write it is refused with a `read-only` error — the
 * calendar then hands the move to the host (`oneventmove`) instead of
 * dropping it.
 *
 * @param adapters  Array of child adapters to merge.
 * @param options   Optional configuration.
 */
export function createCompositeAdapter(adapters, options = {}) {
    if (adapters.length === 0) {
        throw new Error('createCompositeAdapter requires at least one adapter');
    }
    const { primaryIndex = 0, onFetchError } = options;
    if (primaryIndex < 0 || primaryIndex >= adapters.length) {
        throw new Error(`primaryIndex ${primaryIndex} is out of range [0, ${adapters.length - 1}]`);
    }
    const primary = adapters[primaryIndex];
    /** Each child's last successful fetch, shown while it is failing. */
    const lastGood = [];
    /** Which child returned each event id — where its writes go. */
    const owner = new Map();
    // Flatten and deduplicate by id (first occurrence wins)
    function mergeBatches(results) {
        const seen = new Set();
        const merged = [];
        results.forEach((batch, i) => {
            for (const ev of batch ?? []) {
                if (seen.has(ev.id))
                    continue;
                seen.add(ev.id);
                owner.set(ev.id, adapters[i]);
                merged.push(ev);
            }
        });
        return merged;
    }
    /**
     * Run a write on the child that owns `id`. An id no fetch has returned
     * (created elsewhere, or a host calling the adapter directly) is offered
     * to each writable child in turn; only a "not found" moves on.
     */
    async function routeWrite(id, op, run) {
        const known = owner.get(id);
        if (known) {
            if (!known[op])
                throw new CalendarReadOnlyError(`read-only: the adapter that holds ${id} cannot write it`);
            return run(known);
        }
        let readOnlyChild = false;
        for (const adapter of adapters) {
            if (!adapter[op]) {
                readOnlyChild = true;
                continue;
            }
            try {
                return await run(adapter);
            }
            catch (e) {
                // A refusal or a real failure is an answer; only "not mine" asks on.
                if (!isNotFoundError(e))
                    throw e;
            }
        }
        if (readOnlyChild)
            throw new CalendarReadOnlyError(`read-only: no writable adapter holds ${id}`);
        throw new EventNotFoundError(id);
    }
    const canUpdate = adapters.some((a) => a.updateEvent);
    const canDelete = adapters.some((a) => a.deleteEvent);
    const allSync = adapters.every((a) => a.fetchEventsSync);
    return {
        async fetchEvents(range) {
            if (!onFetchError) {
                return mergeBatches(await Promise.all(adapters.map((a) => a.fetchEvents(range))));
            }
            const settled = await Promise.allSettled(adapters.map((a) => a.fetchEvents(range)));
            return mergeBatches(settled.map((r, i) => {
                if (r.status === 'fulfilled') {
                    lastGood[i] = r.value;
                    return r.value;
                }
                onFetchError(r.reason, i);
                // The store treats a load as the whole truth for its range: keep
                // what this child last gave, or its events would vanish.
                return (lastGood[i] ?? []).filter((ev) => overlapsRange(ev, range.start, range.end));
            }));
        },
        // Answers at once only when every child does; otherwise the async path.
        ...(allSync
            ? {
                fetchEventsSync(range) {
                    const results = [];
                    for (const a of adapters) {
                        const r = a.fetchEventsSync(range);
                        if (!r)
                            return undefined;
                        results.push(r);
                    }
                    return mergeBatches(results);
                },
            }
            : {}),
        // Create always goes to primary
        ...(primary.createEvent
            ? {
                async createEvent(event) {
                    const created = await primary.createEvent(event);
                    owner.set(created.id, primary);
                    return created;
                },
            }
            : {}),
        ...(canUpdate
            ? {
                updateEvent: (id, patch) => routeWrite(id, 'updateEvent', (a) => a.updateEvent(id, patch)),
            }
            : {}),
        ...(canDelete
            ? {
                async deleteEvent(id) {
                    await routeWrite(id, 'deleteEvent', (a) => a.deleteEvent(id));
                    owner.delete(id);
                },
            }
            : {}),
    };
}
