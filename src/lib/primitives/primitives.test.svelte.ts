// @vitest-environment jsdom
// Standalone primitives: relative day labels, a quiet now-marker, gutter
// offsets relative to the first hour, and status text from the labels.
import { describe, it, expect, afterEach } from 'vitest';
import { mount, unmount, flushSync, type Component } from 'svelte';
import DayHeader from './DayHeader.svelte';
import NowIndicator from './NowIndicator.svelte';
import TimeGutter from './TimeGutter.svelte';
import EventBlock from './EventBlock.svelte';
import EmptySlot from './EmptySlot.svelte';
import { sod, addDaysMs } from '../core/time.js';
import { setLabels, resetLabels } from '../core/locale.js';

const mounted: ReturnType<typeof mount>[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- one helper for five prop shapes
function render(C: Component<any>, props: Record<string, unknown>): HTMLElement {
	const target = document.createElement('div');
	document.body.appendChild(target);
	mounted.push(mount(C, { target, props }));
	flushSync();
	return target;
}
afterEach(() => {
	while (mounted.length) unmount(mounted.pop()!);
	document.body.innerHTML = '';
	resetLabels();
});

describe('DayHeader relative', () => {
	it('says Today / Yesterday / Tomorrow without a todayMs prop', () => {
		const today = sod(Date.now());
		expect(render(DayHeader, { dayMs: today, format: 'relative' }).textContent).toContain('Today');
		expect(render(DayHeader, { dayMs: addDaysMs(today, -1), format: 'relative' }).textContent).toContain('Yesterday');
		expect(render(DayHeader, { dayMs: addDaysMs(today, 1), format: 'relative' }).textContent).toContain('Tomorrow');
	});
	it('accepts a non-midnight todayMs', () => {
		const today = sod(Date.now());
		const el = render(DayHeader, { dayMs: today, todayMs: today + 13 * 3_600_000, format: 'relative' });
		expect(el.textContent).toContain('Today');
	});
});

describe('NowIndicator', () => {
	it.each(['line', 'dot', 'badge'] as const)('%s mode is not a live region', (mode) => {
		const el = render(NowIndicator, { mode, time: '14:30', seconds: ':05' });
		expect(el.querySelector('[role="status"]')).toBeNull();
		expect(el.querySelector('[aria-live]')).toBeNull();
	});
});

describe('TimeGutter', () => {
	it('places the first of a cropped hour range at 0', () => {
		const hours = [6, 7, 8, 9];
		const v = render(TimeGutter, { orientation: 'vertical', hourSize: 40, hours });
		const tops = [...v.querySelectorAll<HTMLElement>('.tg-row')].map((r) => r.style.top);
		expect(tops).toEqual(['0px', '40px', '80px', '120px']);
		const h = render(TimeGutter, { orientation: 'horizontal', hourSize: 100, hours, halfHour: false });
		const lefts = [...h.querySelectorAll<HTMLElement>('.tg-tick')].map((r) => r.style.left);
		expect(lefts).toEqual(['0px', '100px', '200px', '300px']);
	});
});

describe('EventBlock / EmptySlot text', () => {
	const ev = (status: 'tentative' | 'cancelled') => ({
		id: 'x',
		title: 'Flow',
		start: new Date(2026, 8, 30, 10),
		end: new Date(2026, 8, 30, 11),
		status,
	});

	it('uses the status labels in badges and aria, row variant included', () => {
		setLabels({ tentative: 'wstępnie', cancelled: 'odwołane' });
		for (const variant of ['card', 'row'] as const) {
			const el = render(EventBlock, { event: ev('tentative'), variant });
			expect(el.querySelector('.eb-tentative-badge')?.textContent).toBe('wstępnie');
			expect(el.querySelector('.eb')?.getAttribute('aria-label')).toContain('wstępnie');
			expect(el.querySelector('.eb')?.getAttribute('aria-label')).not.toMatch(/ to /);
		}
		const c = render(EventBlock, { event: ev('cancelled'), variant: 'row' });
		expect(c.querySelector('.eb-cancelled-badge')?.textContent).toBe('odwołane');
		expect(c.textContent).not.toMatch(/Cancelled/);
	});

	it('EmptySlot aria has no English "to"', () => {
		const el = render(EmptySlot, { start: new Date(2026, 8, 30, 10), end: new Date(2026, 8, 30, 11) });
		expect(el.querySelector('.es')?.getAttribute('aria-label')).not.toMatch(/ to /);
	});
});
