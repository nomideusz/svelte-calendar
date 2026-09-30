// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { flushSync } from 'svelte';
import { createCalendar } from './create-calendar.svelte.js';
import { createRangeAgenda } from './create-range-agenda.svelte.js';
import { createMemoryAdapter } from '../adapters/memory.js';
import { createCompositeAdapter } from '../adapters/composite.js';
import { withInitialEvents } from '../adapters/seeded.js';
import type { CalendarAdapter } from '../adapters/types.js';
import type { TimelineEvent } from '../core/types.js';

const at = (id: string, h: number): TimelineEvent => ({
	id,
	title: id,
	start: new Date(2026, 8, 2, h),
	end: new Date(2026, 8, 2, h + 1),
});

afterEach(() => vi.useRealTimers());

describe('createCalendar', () => {
	it('gives month-grid a month range', () => {
		let cal!: ReturnType<typeof createCalendar>;
		const destroy = $effect.root(() => {
			cal = createCalendar({ adapter: createMemoryAdapter(), view: 'month-grid', initialDate: new Date(2026, 8, 15) });
		});
		flushSync();
		expect(cal.mode).toBe('month');
		expect(cal.range.start.getTime()).toBe(new Date(2026, 7, 31).getTime());
		destroy();
	});

	it('switches out of month to a real view id', () => {
		let cal!: ReturnType<typeof createCalendar>;
		const destroy = $effect.root(() => {
			cal = createCalendar({ adapter: createMemoryAdapter(), view: 'month-grid' });
		});
		flushSync();
		cal.headerContext.switchMode('day');
		expect(cal.view).toBe('day-planner');
		cal.headerContext.switchMode('month');
		expect(cal.view).toBe('month-grid');
		destroy();
	});

	it('focuses today in its timezone, not the device zone', () => {
		vi.useFakeTimers({ toFake: ['Date'] });
		// 23:30 UTC on the 29th is already the 30th in UTC+14 — and still the
		// 29th on any device from UTC-12 to UTC+0.
		vi.setSystemTime(new Date('2026-09-29T23:30:00Z'));
		let cal!: ReturnType<typeof createCalendar>;
		const destroy = $effect.root(() => {
			cal = createCalendar({ adapter: createMemoryAdapter(), view: 'day-planner', timezone: 'Pacific/Kiritimati' });
		});
		flushSync();
		expect(cal.focusDate.getDate()).toBe(30);
		expect(cal.headerContext.isViewOnToday).toBe(true);
		destroy();
	});

	it('hands a move refused by a read-only composite to the host', async () => {
		const ro: CalendarAdapter = { fetchEvents: async () => [at('a', 9)], fetchEventsSync: () => [at('a', 9)] };
		let moved = 0;
		let cal!: ReturnType<typeof createCalendar>;
		const destroy = $effect.root(() => {
			cal = createCalendar({
				adapter: createCompositeAdapter([ro]),
				initialDate: new Date(2026, 8, 2),
				oneventmove: () => { moved++; },
			});
		});
		flushSync();
		cal.beginDragMove('a', new Date(2026, 8, 2, 12), new Date(2026, 8, 2, 13));
		await cal.commitDrag();
		expect(moved).toBe(1);
		destroy();
	});
});

describe('createRangeAgenda', () => {
	it('does not refetch the seed it was just given', () => {
		let fetches = 0;
		const base: CalendarAdapter = { fetchEvents: async () => { fetches++; return [at('a', 9)]; } };
		let ag!: ReturnType<typeof createRangeAgenda>;
		const destroy = $effect.root(() => {
			ag = createRangeAgenda({ adapter: withInitialEvents(base, [at('a', 9)]), initialDate: new Date(2026, 8, 1) });
		});
		flushSync();
		expect(fetches).toBe(0);
		expect(ag.loading).toBe(false);
		expect(ag.count).toBe(1);
		ag.next();
		flushSync();
		expect(fetches).toBe(1);
		destroy();
	});

	it('draws days in its timezone', () => {
		// 23:00 UTC on Sep 1 is Sep 2 01:00 in Warsaw
		const ev = { id: 'x', title: 'x', start: new Date('2026-09-01T23:00:00Z'), end: new Date('2026-09-01T23:30:00Z') };
		let ag!: ReturnType<typeof createRangeAgenda>;
		const destroy = $effect.root(() => {
			ag = createRangeAgenda({
				adapter: createMemoryAdapter([ev]),
				initialDate: new Date('2026-08-31T12:00:00Z'),
				timezone: 'Europe/Warsaw',
			});
		});
		flushSync();
		const day = ag.days.find((d) => d.events.length)!;
		expect(day.date.getDate()).toBe(2);
		expect(day.events[0].start.getHours()).toBe(1);
		destroy();
	});
});
