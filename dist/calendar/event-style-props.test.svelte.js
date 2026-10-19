// @vitest-environment jsdom
// eventFill / eventBar are sugar over --dt-ev-fill / --dt-ev-bar on the root;
// unset, they leave the views' own defaults (transparent, a 3px bar) alone.
import { it, expect, beforeAll } from 'vitest';
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
it.each([
    [{}, '', ''],
    [{ eventFill: 0.15, eventBar: 0 }, '15%', '0px'],
])('%o sets fill %j, bar %j', async (props, fill, bar) => {
    const Calendar = (await import('./Calendar.svelte')).default;
    const target = document.createElement('div');
    const cal = mount(Calendar, { target, props: { adapter: createMemoryAdapter([]), ...props } });
    flushSync();
    const root = target.querySelector('.cal');
    expect(root.style.getPropertyValue('--dt-ev-fill')).toBe(fill);
    expect(root.style.getPropertyValue('--dt-ev-bar')).toBe(bar);
    unmount(cal);
});
