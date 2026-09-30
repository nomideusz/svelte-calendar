// @vitest-environment jsdom
// MobileDay on DST days (Europe/Warsaw: 25 h on 2026-10-25, 23 h on
// 2026-03-29) places a 10:00 event on the 10:00 row, and an overnight timed
// event shorter than a day stays timed — in the grid and in the week list.
process.env.TZ = 'Europe/Warsaw';
import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { mount, unmount, flushSync, tick } from 'svelte';
import { createMemoryAdapter } from '../../adapters/memory.js';
beforeAll(() => {
    window.matchMedia ??= ((query) => ({
        matches: false, media: query, onchange: null,
        addEventListener() { }, removeEventListener() { }, addListener() { }, removeListener() { },
        dispatchEvent: () => false,
    }));
    globalThis.ResizeObserver ??= class {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
});
const live = [];
afterEach(() => {
    while (live.length)
        unmount(live.pop());
    document.body.innerHTML = '';
});
async function render(view, date, events) {
    const { default: Calendar } = await import('../../calendar/Calendar.svelte');
    const target = document.createElement('div');
    document.body.appendChild(target);
    live.push(mount(Calendar, {
        target,
        props: { adapter: createMemoryAdapter(events), view, mobile: true, currentDate: date, height: 700 },
    }));
    for (let i = 0; i < 4; i++) {
        flushSync();
        await tick();
        await new Promise((r) => setTimeout(r, 0));
    }
    return target;
}
const HOUR_H = 64;
describe('MobileDay wall-clock rows', () => {
    it.each([
        ['fall back', new Date(2026, 9, 25)],
        ['spring forward', new Date(2026, 2, 29)],
        ['plain day', new Date(2026, 9, 24)],
    ])('%s: 10:00 sits on row 10', async (_n, day) => {
        const start = new Date(day);
        start.setHours(10);
        const end = new Date(day);
        end.setHours(11);
        const el = await render('day-planner', new Date(day.getTime() + 12 * 3_600_000), [
            { id: 'a', title: 'Ten', start, end },
        ]);
        const block = el.querySelector('.mb-event');
        expect(block?.style.top).toBe(`${10 * HOUR_H}px`);
        expect(block?.style.height).toBe(`${HOUR_H}px`);
    });
    it('overnight 23:00–01:00 is a clipped timed block on both days, not all-day', async () => {
        const ev = { id: 'n', title: 'Night', start: new Date(2026, 9, 20, 23), end: new Date(2026, 9, 21, 1) };
        const d1 = await render('day-planner', new Date(2026, 9, 20, 12), [ev]);
        expect(d1.querySelector('.mb-allday')).toBeNull();
        expect(d1.querySelector('.mb-event')?.style.top).toBe(`${23 * HOUR_H}px`);
        expect(d1.querySelector('.mb-event')?.style.height).toBe(`${HOUR_H}px`);
        const d2 = await render('day-planner', new Date(2026, 9, 21, 12), [ev]);
        expect(d2.querySelector('.mb-allday')).toBeNull();
        expect(d2.querySelector('.mb-event')?.style.top).toBe('0px');
    });
    it('a timed event of 24 h or more goes to the all-day strip', async () => {
        const ev = { id: 'l', title: 'Retreat', start: new Date(2026, 9, 20, 15), end: new Date(2026, 9, 22, 11) };
        const el = await render('day-planner', new Date(2026, 9, 21, 12), [ev]);
        expect(el.querySelector('.mb-allday')?.textContent).toContain('Retreat');
        expect(el.querySelector('.mb-event')).toBeNull();
    });
});
describe('MobileWeek overnight', () => {
    it('shows an overnight event with its time, not "All day"', async () => {
        const ev = { id: 'n', title: 'Night', start: new Date(2026, 9, 20, 23), end: new Date(2026, 9, 21, 1) };
        const el = await render('week-planner', new Date(2026, 9, 20, 12), [ev]);
        const rows = [...el.querySelectorAll('.mw-ev')];
        expect(rows.length).toBe(2);
        for (const r of rows) {
            expect(r.classList.contains('mw-ev--allday')).toBe(false);
            expect(r.getAttribute('aria-label')).not.toContain('All day');
        }
        expect(rows[1].querySelector('.mw-ev-time')?.textContent).toMatch(/^until /);
    });
});
