// @vitest-environment jsdom
// A host that feeds ondatechange back into currentDate — the controlled
// pattern — must get a fixed point, in any zone pair. With `timezone` the
// callback used to hand out a wall-clock Date that currentDate then read as an
// instant: every round shifted the focus by the zone offset.
import { describe, it, expect, beforeAll } from 'vitest';
import { mount, unmount, flushSync } from 'svelte';
import { createMemoryAdapter } from '../adapters/memory.js';

// jsdom has neither; the views read both.
beforeAll(() => {
	window.matchMedia ??= ((query: string) => ({
		matches: false, media: query, onchange: null,
		addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {},
		dispatchEvent: () => false,
	})) as typeof window.matchMedia;
	globalThis.ResizeObserver ??= class { observe() {} unobserve() {} disconnect() {} } as unknown as typeof ResizeObserver;
});
const load = () => import('./Calendar.svelte').then((m) => m.default);

describe('Calendar currentDate ⇄ ondatechange', () => {
	it.each(['Europe/Warsaw', 'America/New_York', 'Pacific/Kiritimati', undefined])(
		'settles with timezone %s',
		async (timezone) => {
			const Calendar = await load();
			const seen: number[] = [];
			const props = $state({
				adapter: createMemoryAdapter([]),
				view: 'day-planner',
				timezone,
				currentDate: new Date('2026-10-24T12:00:00Z') as Date | undefined,
				ondatechange: (d: Date) => {
					seen.push(d.getTime());
					props.currentDate = d;
				},
			});
			const target = document.createElement('div');
			const cal = mount(Calendar, { target, props });
			for (let i = 0; i < 5; i++) flushSync();
			expect(seen.length).toBeLessThanOrEqual(2);
			expect(new Set(seen).size).toBe(1);
			unmount(cal);
		},
	);
});
