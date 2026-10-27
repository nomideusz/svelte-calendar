// @vitest-environment jsdom
// The <day-calendar> widget fetches exactly what the README documents:
// GET {api}?start=…&end=… — no /events suffix, no Content-Type (a simple
// cross-origin request, no preflight) — and accepts an array or { events }.
import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest';
import { mount, unmount, flushSync, tick } from 'svelte';
beforeAll(() => {
    window.matchMedia ??= ((query) => ({
        matches: false, media: query, onchange: null,
        addEventListener() { }, removeEventListener() { }, addListener() { }, removeListener() { },
        dispatchEvent: () => false,
    }));
    globalThis.CSS ??= { escape: (s) => s };
    globalThis.ResizeObserver ??= class {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
});
afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = '';
});
async function settle() {
    for (let i = 0; i < 5; i++) {
        flushSync();
        await tick();
        await new Promise((r) => setTimeout(r, 0));
    }
}
describe('CalendarWidget api', () => {
    it.each([
        ['https://school.test/api/classes', 'https://school.test/api/classes?start='],
        ['https://school.test/feed?school=7', 'https://school.test/feed?school=7&start='],
    ])('requests %s with start/end only', async (api, prefix) => {
        const calls = [];
        const s = new Date();
        s.setHours(10, 0, 0, 0);
        const e = new Date(s.getTime() + 3_600_000);
        vi.stubGlobal('fetch', async (url, init) => {
            calls.push({ url: String(url), init });
            return new Response(JSON.stringify({ events: [{ id: '1', title: 'Hatha', start: s.toISOString(), end: e.toISOString() }] }), {
                status: 200,
                headers: { 'content-type': 'application/json' },
            });
        });
        const { default: CalendarWidget } = await import('./CalendarWidget.svelte');
        const target = document.createElement('div');
        document.body.appendChild(target);
        const w = mount(CalendarWidget, { target, props: { api, view: 'day-agenda', height: '600' } });
        await settle();
        expect(calls.length).toBeGreaterThan(0);
        const { url, init } = calls[0];
        expect(url.startsWith(prefix)).toBe(true);
        expect(url).not.toContain('/events?');
        const q = new URL(url).searchParams;
        expect(Number.isNaN(Date.parse(q.get('start')))).toBe(false);
        expect(Number.isNaN(Date.parse(q.get('end')))).toBe(false);
        const headers = new Headers(init?.headers);
        expect(headers.has('content-type')).toBe(false);
        expect(init?.method ?? 'GET').toBe('GET');
        // ISO strings became Dates and the event rendered
        expect(target.textContent).toContain('Hatha');
        unmount(w);
    });
});
describe('CalendarWidget mincolumnwidth', () => {
    it.each([
        [undefined, '110px'],
        ['96', '96px'],
        ['wide', '110px'],
    ])('mincolumnwidth=%s sets the week grid column minimum to %s', async (mincolumnwidth, expected) => {
        const { default: CalendarWidget } = await import('./CalendarWidget.svelte');
        const target = document.createElement('div');
        document.body.appendChild(target);
        const w = mount(CalendarWidget, {
            target,
            props: { events: '[]', view: 'week-planner', mobile: 'false', mincolumnwidth },
        });
        await settle();
        const grid = target.querySelector('[style*="--tw-col-min"]');
        expect(grid?.style.getPropertyValue('--tw-col-min')).toBe(expected);
        await unmount(w);
    });
});
describe('CalendarWidget hours and labels', () => {
    async function render(props) {
        const { default: CalendarWidget } = await import('./CalendarWidget.svelte');
        const target = document.createElement('div');
        document.body.appendChild(target);
        const w = mount(CalendarWidget, {
            target,
            props: { events: '[]', view: 'week-planner', mobile: 'false', ...props },
        });
        await settle();
        return { target, w };
    }
    it.each([
        [undefined, 24],
        ['6-22', 16],
        ['22-6', 24],
        ['morning', 24],
    ])('hours=%s draws %i hour rows', async (hours, rows) => {
        const { target, w } = await render(hours ? { hours } : {});
        expect(target.querySelectorAll('.tw-gutter-lb')).toHaveLength(rows);
        await unmount(w);
    });
    it('labels replace the words they name and keep the rest', async () => {
        const { target, w } = await render({ labels: '{"today":"Dziś"}' });
        const today = target.querySelector('.cal-hd-today');
        expect(today?.textContent?.trim()).toBe('Dziś');
        expect(today?.getAttribute('title')).toBe('Go to today');
        await unmount(w);
    });
    it('bad labels JSON leaves the defaults', async () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => { });
        const { target, w } = await render({ labels: '{oops' });
        expect(target.querySelector('.cal-hd-today')?.textContent?.trim()).toBe('Today');
        expect(warn).toHaveBeenCalled();
        warn.mockRestore();
        await unmount(w);
    });
});
describe('CalendarWidget emit', () => {
    it('hands a click and a committed move to emit, which the element fires as DOM events', async () => {
        const { default: CalendarWidget } = await import('./CalendarWidget.svelte');
        const target = document.body.appendChild(document.createElement('div'));
        const s = new Date();
        s.setHours(10, 0, 0, 0);
        const events = JSON.stringify([{ id: 'a', title: 'Hatha', start: s, end: new Date(+s + 3_600_000) }]);
        const emit = vi.fn();
        const w = mount(CalendarWidget, { target, props: { events, view: 'week-planner', mobile: 'false', readonly: 'false', emit } });
        await settle();
        const ev = () => target.querySelector('.tw-ev[data-event-id="a"]');
        ev().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        expect(emit).toHaveBeenCalledWith('eventclick', expect.objectContaining({ event: expect.objectContaining({ id: 'a' }) }));
        ev().dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', altKey: true, bubbles: true }));
        await settle();
        expect(emit).toHaveBeenLastCalledWith('eventmove', {
            event: expect.objectContaining({ id: 'a' }),
            start: new Date(+s - 15 * 60_000),
            end: new Date(+s + 45 * 60_000),
        });
        await unmount(w);
    });
});
