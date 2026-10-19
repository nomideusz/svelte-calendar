// @vitest-environment jsdom
// The built-in header names the period in view: the month and year, both
// months when a week straddles them, the date in a day view. The status line
// keeps announcing the exact range.
import { describe, it, expect, beforeAll } from 'vitest';
import { mount, unmount, flushSync } from 'svelte';
import { createMemoryAdapter } from '../adapters/memory.js';
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
describe('Calendar header title', () => {
    it.each([
        ['week-planner', '2026-10-14T12:00:00', 'October 2026', 'Oct 12 – 18, 2026'],
        ['week-planner', '2026-10-28T12:00:00', 'Oct – Nov 2026', 'Oct 26 – Nov 1, 2026'],
        ['week-planner', '2026-12-30T12:00:00', 'Dec 2026 – Jan 2027', 'Dec 28, 2026 – Jan 3, 2027'],
        ['month-grid', '2026-10-28T12:00:00', 'October 2026', 'October 2026'],
        ['day-planner', '2026-10-28T12:00:00', 'Wednesday, October 28, 2026', 'Wednesday, Oct 28'],
    ])('%s on %s reads "%s"', async (view, date, title, status) => {
        const Calendar = (await import('./Calendar.svelte')).default;
        const target = document.createElement('div');
        const cal = mount(Calendar, {
            target,
            props: { adapter: createMemoryAdapter([]), view, locale: 'en-US', currentDate: new Date(date) },
        });
        flushSync();
        expect(target.querySelector('.cal-hd-title')?.textContent).toBe(title);
        expect(target.querySelector('[role="status"]')?.textContent).toBe(status);
        unmount(cal);
    });
});
