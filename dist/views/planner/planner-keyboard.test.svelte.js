// @vitest-environment jsdom
// The week planner without a pointer: a day column creates on Enter, and a
// focused event moves / resizes on Alt(+Shift)+arrows through the drag commit.
process.env.TZ = 'Europe/Warsaw';
import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest';
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
    globalThis.CSS ??= { escape: (s) => s };
});
const live = [];
afterEach(() => {
    while (live.length)
        unmount(live.pop());
    document.body.innerHTML = '';
});
const settle = async () => {
    for (let i = 0; i < 4; i++) {
        flushSync();
        await tick();
        await new Promise((r) => setTimeout(r, 0));
    }
};
const key = (el, k, o = {}) => el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true, ...o }));
describe('week-planner keyboard', () => {
    it('creates on Enter and moves / resizes on Alt+arrows', async () => {
        const { default: Calendar } = await import('../../calendar/Calendar.svelte');
        const oneventcreate = vi.fn();
        const oneventmove = vi.fn();
        const target = document.body.appendChild(document.createElement('div'));
        live.push(mount(Calendar, {
            target,
            props: {
                adapter: createMemoryAdapter([
                    { id: 'a', title: 'Ten', start: new Date(2026, 9, 21, 10), end: new Date(2026, 9, 21, 11) },
                ]),
                view: 'week-planner', mobile: false, currentDate: new Date(2026, 9, 21, 12), height: 700,
                oneventcreate, oneventmove,
            },
        }));
        await settle();
        const cols = [...target.querySelectorAll('.tw-col')];
        expect(cols.filter((c) => c.tabIndex === 0)).toHaveLength(1);
        // A screen reader hears the month, not just "Wednesday 21".
        expect(cols[2].getAttribute('aria-label')).toMatch(/October/);
        key(cols[2], 'Enter');
        expect(oneventcreate).toHaveBeenCalledWith({ start: new Date(2026, 9, 21, 9), end: new Date(2026, 9, 21, 10) });
        const ev = () => target.querySelector('.tw-ev[data-event-id="a"]');
        key(ev(), 'ArrowUp', { altKey: true });
        await settle();
        expect(oneventmove).toHaveBeenLastCalledWith(expect.anything(), new Date(2026, 9, 21, 9, 45), new Date(2026, 9, 21, 10, 45));
        key(ev(), 'ArrowRight', { altKey: true });
        await settle();
        expect(oneventmove).toHaveBeenLastCalledWith(expect.anything(), new Date(2026, 9, 22, 9, 45), new Date(2026, 9, 22, 10, 45));
        key(ev(), 'ArrowDown', { altKey: true, shiftKey: true });
        await settle();
        expect(oneventmove).toHaveBeenLastCalledWith(expect.anything(), new Date(2026, 9, 22, 9, 45), new Date(2026, 9, 22, 11));
    });
});
