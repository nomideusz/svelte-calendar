// @vitest-environment jsdom
// The built-in header names the period in view: the month and year, both
// months when a week straddles them, the date in a day view. The status line
// keeps announcing the exact range.
import { describe, it, expect, beforeAll } from 'vitest';
import { mount, unmount, flushSync } from 'svelte';
import { createMemoryAdapter } from '../adapters/memory.js';

beforeAll(() => {
	window.matchMedia ??= ((query: string) => ({
		matches: false, media: query, onchange: null,
		addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {},
		dispatchEvent: () => false,
	})) as typeof window.matchMedia;
	globalThis.ResizeObserver ??= class { observe() {} unobserve() {} disconnect() {} } as unknown as typeof ResizeObserver;
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

describe('Calendar header view pills', () => {
	async function mountCal(props: Record<string, unknown> = {}) {
		const Calendar = (await import('./Calendar.svelte')).default;
		const target = document.createElement('div');
		document.body.appendChild(target);
		const cal = mount(Calendar, {
			target,
			props: { adapter: createMemoryAdapter([]), view: 'week-planner', locale: 'en-US', ...props },
		});
		flushSync();
		const groups = [...target.querySelectorAll<HTMLElement>('[role="radiogroup"]')];
		const radios = (g: HTMLElement) => [...g.querySelectorAll<HTMLElement>('[role="radio"]')];
		const key = (el: HTMLElement, k: string) => {
			el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));
			flushSync();
		};
		return { groups, radios, key, done: () => { unmount(cal); target.remove(); } };
	}

	it('makes each group one tab stop: the checked radio', async () => {
		const { groups, radios, done } = await mountCal();
		expect(groups.length).toBe(2);
		for (const g of groups) {
			const stops = radios(g).filter((r) => r.tabIndex === 0);
			expect(stops.length).toBe(1);
			expect(stops[0].getAttribute('aria-checked')).toBe('true');
		}
		done();
	});

	it('moves selection and focus with arrows, Home and End', async () => {
		const { groups, radios, key, done } = await mountCal();
		const modes = groups[1];
		const [day, week, month] = radios(modes);
		expect(week.getAttribute('aria-checked')).toBe('true');

		week.focus();
		key(week, 'ArrowRight');
		expect(month.getAttribute('aria-checked')).toBe('true');
		expect(document.activeElement).toBe(month);
		expect(month.tabIndex).toBe(0);
		expect(week.tabIndex).toBe(-1);

		key(month, 'ArrowRight'); // wraps
		expect(day.getAttribute('aria-checked')).toBe('true');
		key(day, 'End');
		expect(month.getAttribute('aria-checked')).toBe('true');
		key(month, 'Home');
		expect(day.getAttribute('aria-checked')).toBe('true');
		expect(document.activeElement).toBe(day);
		done();
	});

	it('follows the reading direction in RTL', async () => {
		const { groups, radios, key, done } = await mountCal({ dir: 'rtl' });
		const [, week, month] = radios(groups[1]);
		week.focus();
		key(week, 'ArrowLeft');
		expect(month.getAttribute('aria-checked')).toBe('true');
		done();
	});
});
