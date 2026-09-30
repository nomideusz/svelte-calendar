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
