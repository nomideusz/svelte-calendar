/**
 * createRangeAgenda() behavioral tests — window shape, per-day grouping,
 * paging, and adapter loading, exercised with zero DOM.
 *
 * Rune-compiled (`.test.svelte.ts`) so the factory's internal $effect can
 * live in an $effect.root — same technique as drag-lifecycle tests.
 *
 * @vitest-environment jsdom
 */
// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { flushSync } from 'svelte';
import { createRangeAgenda } from './create-range-agenda.svelte.js';
import { createMemoryAdapter } from '../adapters/memory.js';
// Monday 2025-03-03 — fixed so weekday assertions are stable
const MON = new Date(2025, 2, 3);
const at = (day, h, m = 0) => new Date(2025, 2, 3 + day, h, m);
function ev(id, day, startH, endH) {
    return { id, title: `Event ${id}`, start: at(day, startH), end: at(day, endH) };
}
async function withAgenda(options, fn) {
    let agenda;
    const destroy = $effect.root(() => {
        agenda = createRangeAgenda({
            adapter: options.adapter ?? createMemoryAdapter(),
            initialDate: MON,
            ...options,
        });
    });
    try {
        flushSync();
        await new Promise((r) => setTimeout(r, 0));
        await fn(agenda);
    }
    finally {
        destroy();
    }
}
describe('createRangeAgenda', () => {
    it('exposes one entry per day for the whole window, ISO weekdays, Monday start', async () => {
        await withAgenda({}, (agenda) => {
            expect(agenda.days).toHaveLength(7);
            expect(agenda.days[0].weekday).toBe(1); // Monday
            expect(agenda.days[6].weekday).toBe(7); // Sunday
            expect(agenda.days[0].ms).toBe(MON.getTime());
            expect(agenda.range.start.getTime()).toBe(MON.getTime());
            expect(agenda.range.end.getTime()).toBe(MON.getTime() + 7 * 24 * 60 * 60 * 1000);
        });
    });
    it('groups events onto their day, sorted by start', async () => {
        const adapter = createMemoryAdapter([
            ev('b', 1, 18, 19),
            ev('a', 1, 7, 8),
            ev('c', 3, 9, 10),
        ]);
        await withAgenda({ adapter }, (agenda) => {
            expect(agenda.count).toBe(3);
            expect(agenda.days[1].events.map((e) => e.id)).toEqual(['a', 'b']);
            expect(agenda.days[3].events.map((e) => e.id)).toEqual(['c']);
            expect(agenda.days[0].events).toEqual([]);
        });
    });
    it('shows a multi-day event on every day it touches', async () => {
        const adapter = createMemoryAdapter([
            { id: 'retreat', title: 'Retreat', start: at(4, 10), end: at(6, 16) },
        ]);
        await withAgenda({ adapter }, (agenda) => {
            expect(agenda.days[4].events.map((e) => e.id)).toEqual(['retreat']);
            expect(agenda.days[5].events.map((e) => e.id)).toEqual(['retreat']);
            expect(agenda.days[6].events.map((e) => e.id)).toEqual(['retreat']);
            expect(agenda.days[3].events).toEqual([]);
        });
    });
    it('pages by the window size and loads the new range', async () => {
        const adapter = createMemoryAdapter([
            ev('this-week', 0, 9, 10),
            ev('next-week', 7, 9, 10),
        ]);
        await withAgenda({ adapter }, async (agenda) => {
            expect(agenda.days[0].events.map((e) => e.id)).toEqual(['this-week']);
            agenda.next();
            flushSync();
            await new Promise((r) => setTimeout(r, 0));
            expect(agenda.range.start.getTime()).toBe(MON.getTime() + 7 * 24 * 60 * 60 * 1000);
            expect(agenda.days[0].events.map((e) => e.id)).toEqual(['next-week']);
            agenda.prev();
            flushSync();
            await new Promise((r) => setTimeout(r, 0));
            expect(agenda.days[0].events.map((e) => e.id)).toEqual(['this-week']);
        });
    });
    it('respects a custom window size', async () => {
        await withAgenda({ days: 3 }, (agenda) => {
            expect(agenda.days).toHaveLength(3);
            agenda.next();
            flushSync();
            expect(agenda.range.start.getTime()).toBe(MON.getTime() + 3 * 24 * 60 * 60 * 1000);
        });
    });
    it('setDate moves the window start; goToday returns to the current day', async () => {
        await withAgenda({}, (agenda) => {
            agenda.setDate(at(14, 15)); // mid-afternoon two weeks out → snaps to start of day
            flushSync();
            expect(agenda.range.start.getTime()).toBe(at(14, 0).getTime());
            agenda.goToday();
            flushSync();
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            expect(agenda.range.start.getTime()).toBe(today.getTime());
        });
    });
    it('formats time and duration with the given locale', async () => {
        const adapter = createMemoryAdapter([ev('a', 0, 14, 16)]);
        await withAgenda({ adapter, locale: 'pl-PL' }, (agenda) => {
            const e = agenda.days[0].events[0];
            expect(agenda.fmtTime(e.start)).toBe('14:00');
            expect(agenda.fmtRange(e)).toContain('–');
        });
    });
    it('surfaces adapter errors without throwing', async () => {
        const adapter = {
            fetchEvents: () => Promise.reject(new Error('boom')),
        };
        await withAgenda({ adapter }, (agenda) => {
            expect(agenda.error).toBe('boom');
            expect(agenda.days).toHaveLength(7);
            expect(agenda.count).toBe(0);
        });
    });
});
