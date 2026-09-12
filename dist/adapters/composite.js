/**
 * Create a CalendarAdapter that merges events from multiple child adapters.
 *
 * @param adapters  Array of child adapters to merge.
 * @param options   Optional configuration.
 */
export function createCompositeAdapter(adapters, options = {}) {
    if (adapters.length === 0) {
        throw new Error('createCompositeAdapter requires at least one adapter');
    }
    const { primaryIndex = 0 } = options;
    if (primaryIndex < 0 || primaryIndex >= adapters.length) {
        throw new Error(`primaryIndex ${primaryIndex} is out of range [0, ${adapters.length - 1}]`);
    }
    const primary = adapters[primaryIndex];
    return {
        async fetchEvents(range) {
            const results = await Promise.all(adapters.map((a) => a.fetchEvents(range)));
            // Flatten and deduplicate by id (first occurrence wins)
            const seen = new Set();
            const merged = [];
            for (const batch of results) {
                for (const ev of batch) {
                    if (!seen.has(ev.id)) {
                        seen.add(ev.id);
                        merged.push(ev);
                    }
                }
            }
            return merged;
        },
        // Create always goes to primary
        ...(primary.createEvent ? { createEvent: (event) => primary.createEvent(event) } : {}),
        // Update/delete: try each adapter that supports the operation.
        // This handles the case where a recurring adapter generates events
        // that the primary (memory) adapter doesn't know about.
        async updateEvent(id, patch) {
            for (const adapter of adapters) {
                if (!adapter.updateEvent)
                    continue;
                try {
                    return await adapter.updateEvent(id, patch);
                }
                catch (e) {
                    // A refusal is an answer: the adapter that owns this event
                    // cannot write it, and asking the others would turn that
                    // into a meaningless "not found" the host cannot act on.
                    if (e instanceof Error && e.message.includes('read-only'))
                        throw e;
                    // Otherwise: not this adapter's event, try the next.
                }
            }
            throw new Error(`Event not found in any adapter: ${id}`);
        },
        async deleteEvent(id) {
            for (const adapter of adapters) {
                if (!adapter.deleteEvent)
                    continue;
                try {
                    await adapter.deleteEvent(id);
                    return;
                }
                catch {
                    // Event not in this adapter, try next
                }
            }
            throw new Error(`Event not found in any adapter: ${id}`);
        },
    };
}
