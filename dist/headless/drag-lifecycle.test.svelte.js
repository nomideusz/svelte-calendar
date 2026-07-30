/**
 * Full drag lifecycle tests — create / move / resize — exercised through the
 * headless API (createCalendar), no DOM involved.
 *
 * Rune-compiled (`.test.svelte.ts`) so we can host createCalendar's internal
 * $effect in an $effect.root. Views drive the same state machine through
 * pointer events; here we drive it directly the way the views do:
 * begin → updatePointer (snapped values) → commitDrag.
 *
 * @vitest-environment jsdom — jsdom selects vitest's web transform mode, which
 * (with resolve.conditions ['browser']) compiles runes against the client
 * runtime; the SSR runtime stubs $effect.root without running its callback.
 */
// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { flushSync } from 'svelte';
import { createCalendar } from './create-calendar.svelte.js';
import { createMemoryAdapter } from '../adapters/memory.js';
// Monday 2025-03-03 — fixed so ISO weekday assertions are stable
const DAY = (h, m = 0) => new Date(2025, 2, 3, h, m);
function makeEvent(id, startH, endH) {
    return {
        id,
        title: `Event ${id}`,
        start: DAY(startH),
        end: DAY(endH),
    };
}
async function withCalendar(options, fn) {
    let cal;
    const destroy = $effect.root(() => {
        cal = createCalendar({
            adapter: options.adapter ?? createMemoryAdapter(),
            initialDate: DAY(0),
            ...options,
        });
    });
    try {
        flushSync();
        // Let the (async) initial adapter load settle
        await new Promise((r) => setTimeout(r, 0));
        await fn(cal);
    }
    finally {
        destroy();
    }
}
describe('drag-to-create lifecycle', () => {
    it('commits the dragged range and fires oneventcreate', async () => {
        const oncreate = vi.fn();
        await withCalendar({ oneventcreate: oncreate }, async (cal) => {
            cal.beginDragCreate(DAY(10), DAY(10, 15));
            expect(cal.isDragging).toBe(true);
            expect(cal.dragMode).toBe('create');
            // The view passes already-snapped values while the pointer sweeps
            cal.updateDrag(DAY(10), DAY(11, 30));
            expect(cal.dragPayload).toEqual({ start: DAY(10), end: DAY(11, 30) });
            const result = await cal.commitDrag();
            expect(result).toEqual({ start: DAY(10), end: DAY(11, 30) });
            expect(oncreate).toHaveBeenCalledExactlyOnceWith({ start: DAY(10), end: DAY(11, 30) });
            expect(cal.isDragging).toBe(false);
            expect(cal.dragMode).toBeNull();
        });
    });
    it('clamps a created range up to minDuration', async () => {
        const oncreate = vi.fn();
        await withCalendar({ oneventcreate: oncreate, minDuration: 60 }, async (cal) => {
            cal.beginDragCreate(DAY(10), DAY(10, 15));
            const result = await cal.commitDrag();
            expect(result).toEqual({ start: DAY(10), end: DAY(11) });
            expect(oncreate).toHaveBeenCalledExactlyOnceWith({ start: DAY(10), end: DAY(11) });
        });
    });
    it('clamps a created range down to maxDuration', async () => {
        const oncreate = vi.fn();
        await withCalendar({ oneventcreate: oncreate, maxDuration: 120 }, async (cal) => {
            cal.beginDragCreate(DAY(10), DAY(10, 15));
            cal.updateDrag(DAY(10), DAY(16));
            const result = await cal.commitDrag();
            expect(result).toEqual({ start: DAY(10), end: DAY(12) });
        });
    });
    it('rejects a create overlapping a blocked slot', async () => {
        const oncreate = vi.fn();
        await withCalendar({ oneventcreate: oncreate, blockedSlots: [{ day: 1, start: 12, end: 14 }] }, async (cal) => {
            cal.beginDragCreate(DAY(11), DAY(11, 15));
            cal.updateDrag(DAY(11), DAY(13)); // sweeps into the 12–14 block
            const result = await cal.commitDrag();
            expect(result).toBeNull();
            expect(oncreate).not.toHaveBeenCalled();
            expect(cal.isDragging).toBe(false);
        });
    });
    it('rejects a create on a disabled date', async () => {
        const oncreate = vi.fn();
        await withCalendar({ oneventcreate: oncreate, disabledDates: [DAY(0)] }, async (cal) => {
            cal.beginDragCreate(DAY(10), DAY(11));
            const result = await cal.commitDrag();
            expect(result).toBeNull();
            expect(oncreate).not.toHaveBeenCalled();
        });
    });
    it('cancelDrag abandons the create without firing', async () => {
        const oncreate = vi.fn();
        await withCalendar({ oneventcreate: oncreate }, async (cal) => {
            cal.beginDragCreate(DAY(10), DAY(10, 15));
            cal.cancelDrag();
            expect(cal.isDragging).toBe(false);
            const result = await cal.commitDrag();
            expect(result).toBeNull();
            expect(oncreate).not.toHaveBeenCalled();
        });
    });
});
describe('resize lifecycle', () => {
    it('resize-end commits the new end through the store and fires oneventmove', async () => {
        const onmove = vi.fn();
        const adapter = createMemoryAdapter([makeEvent('1', 9, 10)]);
        await withCalendar({ adapter, oneventmove: onmove }, async (cal) => {
            const ev = cal.eventById('1');
            expect(ev).toBeDefined();
            cal.dragState.beginResize('1', 'end', ev.start, ev.end);
            expect(cal.dragMode).toBe('resize-end');
            cal.updateDrag(DAY(9), DAY(11));
            const result = await cal.commitDrag();
            expect(result).toEqual({ start: DAY(9), end: DAY(11), eventId: '1' });
            expect(cal.eventById('1')?.end).toEqual(DAY(11));
            expect(cal.eventById('1')?.start).toEqual(DAY(9));
            expect(onmove).toHaveBeenCalledExactlyOnceWith(cal.eventById('1'), DAY(9), DAY(11));
        });
    });
    it('resize-start commits the new start', async () => {
        const adapter = createMemoryAdapter([makeEvent('1', 9, 10)]);
        await withCalendar({ adapter }, async (cal) => {
            cal.dragState.beginResize('1', 'start', DAY(9), DAY(10));
            expect(cal.dragMode).toBe('resize-start');
            cal.updateDrag(DAY(8), DAY(10));
            const result = await cal.commitDrag();
            expect(result).toEqual({ start: DAY(8), end: DAY(10), eventId: '1' });
            expect(cal.eventById('1')?.start).toEqual(DAY(8));
        });
    });
    it('resize-end clamps up to minDuration', async () => {
        const adapter = createMemoryAdapter([makeEvent('1', 9, 10)]);
        await withCalendar({ adapter, minDuration: 30 }, async (cal) => {
            cal.dragState.beginResize('1', 'end', DAY(9), DAY(10));
            cal.updateDrag(DAY(9), DAY(9)); // end dragged onto the start
            const result = await cal.commitDrag();
            expect(result).toEqual({ start: DAY(9), end: DAY(9, 30), eventId: '1' });
            expect(cal.eventById('1')?.end).toEqual(DAY(9, 30));
        });
    });
    it('resize-end dragged before the start is clamped to a valid range', async () => {
        const adapter = createMemoryAdapter([makeEvent('1', 9, 10)]);
        await withCalendar({ adapter, minDuration: 30 }, async (cal) => {
            cal.dragState.beginResize('1', 'end', DAY(9), DAY(10));
            cal.updateDrag(DAY(9), DAY(8)); // end before start
            const result = await cal.commitDrag();
            expect(result).toEqual({ start: DAY(9), end: DAY(9, 30), eventId: '1' });
            expect(cal.eventById('1')?.end).toEqual(DAY(9, 30));
        });
    });
    it('resize-start clamps down to maxDuration', async () => {
        const adapter = createMemoryAdapter([makeEvent('1', 9, 10)]);
        await withCalendar({ adapter, maxDuration: 120 }, async (cal) => {
            cal.dragState.beginResize('1', 'start', DAY(9), DAY(10));
            cal.updateDrag(DAY(5), DAY(10)); // would be 5h long
            const result = await cal.commitDrag();
            expect(result).toEqual({ start: DAY(8), end: DAY(10), eventId: '1' });
            expect(cal.eventById('1')?.start).toEqual(DAY(8));
        });
    });
    it('rejects a resize landing on a blocked slot and leaves the event untouched', async () => {
        const onmove = vi.fn();
        const adapter = createMemoryAdapter([makeEvent('1', 9, 10)]);
        await withCalendar({ adapter, oneventmove: onmove, blockedSlots: [{ day: 1, start: 12, end: 14 }] }, async (cal) => {
            cal.dragState.beginResize('1', 'end', DAY(9), DAY(10));
            cal.updateDrag(DAY(9), DAY(13)); // overlaps the 12–14 block
            const result = await cal.commitDrag();
            expect(result).toBeNull();
            expect(onmove).not.toHaveBeenCalled();
            expect(cal.eventById('1')?.end).toEqual(DAY(10));
        });
    });
    it('readOnly cancels the resize commit', async () => {
        const onmove = vi.fn();
        const adapter = createMemoryAdapter([makeEvent('1', 9, 10)]);
        await withCalendar({ adapter, oneventmove: onmove, readOnly: true }, async (cal) => {
            cal.dragState.beginResize('1', 'end', DAY(9), DAY(10));
            cal.updateDrag(DAY(9), DAY(11));
            const result = await cal.commitDrag();
            expect(result).toBeNull();
            expect(cal.isDragging).toBe(false);
            expect(onmove).not.toHaveBeenCalled();
            expect(cal.eventById('1')?.end).toEqual(DAY(10));
        });
    });
});
describe('move lifecycle', () => {
    it('commits a moved event through the store', async () => {
        const onmove = vi.fn();
        const adapter = createMemoryAdapter([makeEvent('1', 9, 10)]);
        await withCalendar({ adapter, oneventmove: onmove }, async (cal) => {
            cal.beginDragMove('1', DAY(9), DAY(10));
            expect(cal.dragMode).toBe('move');
            cal.updateDrag(DAY(14), DAY(15));
            const result = await cal.commitDrag();
            expect(result).toEqual({ start: DAY(14), end: DAY(15), eventId: '1' });
            expect(cal.eventById('1')?.start).toEqual(DAY(14));
            expect(cal.eventById('1')?.end).toEqual(DAY(15));
            expect(onmove).toHaveBeenCalledOnce();
        });
    });
});
describe('read-only adapter move', () => {
    it('still fires oneventmove — the host owns persistence', async () => {
        const onmove = vi.fn();
        const base = createMemoryAdapter([makeEvent('1', 10, 11)]);
        const readOnlyAdapter = { fetchEvents: base.fetchEvents.bind(base) };
        await withCalendar({ adapter: readOnlyAdapter, oneventmove: onmove }, async (cal) => {
            const ev = cal.eventById('1');
            expect(ev).toBeDefined();
            cal.dragState.beginMove('1', ev.start, ev.end);
            cal.updateDrag(DAY(12), DAY(13));
            await cal.commitDrag();
            // The store couldn't persist (read-only), but the host was told.
            expect(onmove).toHaveBeenCalledOnce();
            expect(onmove.mock.calls[0][1]).toEqual(DAY(12));
        });
    });
});
