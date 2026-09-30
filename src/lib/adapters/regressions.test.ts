/**
 * Regressions found in the 1.0 audit — one test per defect, named for the
 * behaviour that was wrong. Run under any TZ; the DST cases pin their own.
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { createRecurringAdapter } from './recurring.js';
import { createMemoryAdapter } from './memory.js';
import { createCompositeAdapter } from './composite.js';
import { createRestAdapter } from './rest.js';
import { createMappedAdapter } from './mapped.js';
import { createJmapAdapter, type JmapClient } from './jmap.js';
import { withInitialEvents } from './seeded.js';
import { wrapAdapterWithTimezone } from '../core/timezone.js';
import type { CalendarAdapter } from './types.js';

const jmap = (event: Record<string, unknown>): JmapClient => ({
	request: async () => ({
		methodResponses: [
			['CalendarEvent/query', { ids: ['1'] }, 'ceq'],
			['CalendarEvent/get', { list: [{ id: '1', title: 'x', calendarIds: {}, ...event }] }, 'ceg'],
		],
	}),
});

describe('recurring adapter', () => {
	it('lands weekly rules on their weekday in a Sunday-start week', async () => {
		const a = createRecurringAdapter(
			[
				{ id: 'mon', title: 'Mon', dayOfWeek: 1, startTime: '07:00', endTime: '08:00' },
				{ id: 'sun', title: 'Sun', dayOfWeek: 7, startTime: '07:00', endTime: '08:00' },
			],
			{ mondayStart: false },
		);
		const evs = await a.fetchEvents({ start: new Date(2026, 8, 6), end: new Date(2026, 8, 13) });
		expect(evs.find((e) => e.title === 'Mon')!.start.getDay()).toBe(1);
		expect(evs.find((e) => e.title === 'Sun')!.start.getDay()).toBe(0);
	});

	it('counts Sunday first in a Sunday-start week', async () => {
		const a = createRecurringAdapter(
			[{ id: 'r', title: 'r', dayOfWeek: [6, 7], startDate: '2026-09-06', count: 2, startTime: '07:00', endTime: '08:00' }],
			{ mondayStart: false },
		);
		const evs = await a.fetchEvents({ start: new Date(2026, 8, 1), end: new Date(2026, 9, 1) });
		expect(evs.map((e) => e.start.getDate())).toEqual([6, 12]);
	});

	it('gives a monthly rule its full count when startDate is past the day of month', async () => {
		const a = createRecurringAdapter([
			{ id: 'm', title: 'M', frequency: 'monthly', dayOfMonth: 15, startDate: '2026-01-20', count: 3, startTime: '10:00', endTime: '11:00' },
		]);
		const evs = await a.fetchEvents({ start: new Date(2026, 0, 1), end: new Date(2027, 0, 1) });
		expect(evs.map((e) => e.start.getMonth())).toEqual([1, 2, 3]);
	});

	it('runs an overnight rule past midnight, and shows it from the day before', async () => {
		const a = createRecurringAdapter([
			{ id: 'n', title: 'N', frequency: 'daily', startTime: '22:00', endTime: '02:00', startDate: '2026-09-01' },
		]);
		const evs = await a.fetchEvents({ start: new Date(2026, 8, 7), end: new Date(2026, 8, 8) });
		// 6th 22:00 → 7th 02:00, and 7th 22:00 → 8th 02:00
		expect(evs).toHaveLength(2);
		for (const e of evs) expect(e.end.getTime() - e.start.getTime()).toBe(4 * 3600_000);
	});

	it('finds a monthly occurrence when the range starts mid-day', async () => {
		const a = createRecurringAdapter([
			{ id: 'm', title: 'M', frequency: 'monthly', dayOfMonth: 15, startTime: '14:00', endTime: '15:00' },
		]);
		const evs = await a.fetchEvents({ start: new Date(2026, 8, 15, 10), end: new Date(2026, 8, 16) });
		expect(evs).toHaveLength(1);
	});
});

describe('composite adapter', () => {
	it('re-throws a real write failure instead of calling it "not found"', async () => {
		const c = createCompositeAdapter([
			{ fetchEvents: async () => [], updateEvent: async () => { throw new Error('HTTP 500'); } },
		]);
		await expect(c.updateEvent!('x', {})).rejects.toThrow('HTTP 500');
	});

	it('has no write methods when no child can write', () => {
		const c = createCompositeAdapter([{ fetchEvents: async () => [] }]);
		expect(c.updateEvent).toBeUndefined();
		expect(c.deleteEvent).toBeUndefined();
	});

	it('refuses a write to an event held by a read-only child as read-only', async () => {
		const ev = { id: 'ro', title: 'r', start: new Date(2026, 8, 1, 9), end: new Date(2026, 8, 1, 10) };
		const c = createCompositeAdapter([createMemoryAdapter(), { fetchEvents: async () => [ev] }]);
		await c.fetchEvents({ start: new Date(2026, 8, 1), end: new Date(2026, 8, 2) });
		await expect(c.updateEvent!('ro', {})).rejects.toThrow('read-only');
	});

	it('routes a write to the child that returned the event', async () => {
		const a = createMemoryAdapter([{ id: 'a', title: 'a', start: new Date(2026, 8, 1, 9), end: new Date(2026, 8, 1, 10) }]);
		const b = createMemoryAdapter([{ id: 'b', title: 'b', start: new Date(2026, 8, 1, 11), end: new Date(2026, 8, 1, 12) }]);
		const c = createCompositeAdapter([a, b]);
		await c.fetchEvents({ start: new Date(2026, 8, 1), end: new Date(2026, 8, 2) });
		const moved = await c.updateEvent!('b', { title: 'B' });
		expect(moved.title).toBe('B');
		const [inB] = await b.fetchEvents({ start: new Date(2026, 8, 1), end: new Date(2026, 8, 2) });
		expect(inB.title).toBe('B');
	});

	it('answers synchronously when every child does', () => {
		const c = createCompositeAdapter([createMemoryAdapter(), createRecurringAdapter([])]);
		expect(c.fetchEventsSync?.({ start: new Date(2026, 8, 1), end: new Date(2026, 8, 2) })).toEqual([]);
		const mixed = createCompositeAdapter([createMemoryAdapter(), { fetchEvents: async () => [] }]);
		expect(mixed.fetchEventsSync).toBeUndefined();
	});

	it('keeps the other children when one fails and onFetchError is given', async () => {
		const good = createMemoryAdapter([{ id: '1', title: 'a', start: new Date(2026, 8, 1, 9), end: new Date(2026, 8, 1, 10) }]);
		const bad: CalendarAdapter = { fetchEvents: async () => { throw new Error('boom'); } };
		const range = { start: new Date(2026, 8, 1), end: new Date(2026, 8, 2) };
		await expect(createCompositeAdapter([good, bad]).fetchEvents(range)).rejects.toThrow('boom');
		const errors: number[] = [];
		const tolerant = createCompositeAdapter([good, bad], { onFetchError: (_, i) => errors.push(i) });
		expect(await tolerant.fetchEvents(range)).toHaveLength(1);
		expect(errors).toEqual([1]);
	});
});

describe('REST adapter', () => {
	afterEach(() => vi.unstubAllGlobals());

	it('parses dates by default and encodes ids in the URL', async () => {
		const calls: string[] = [];
		vi.stubGlobal('fetch', vi.fn(async (url: string) => {
			calls.push(url);
			const body = { id: '1', title: 't', start: '2026-09-01T10:00:00Z', end: '2026-09-01T11:00:00Z' };
			return new Response(JSON.stringify(url.includes('?') ? [body] : body), { status: 200 });
		}));
		const r = createRestAdapter({ baseUrl: 'https://x.test' });
		const [ev] = await r.fetchEvents({ start: new Date(), end: new Date() });
		expect(ev.start).toBeInstanceOf(Date);
		expect(ev.start.toISOString()).toBe('2026-09-01T10:00:00.000Z');
		await r.updateEvent!('a/b?c#d', {});
		expect(calls[1]).toBe('https://x.test/events/a%2Fb%3Fc%23d');
	});
});

describe('mapped adapter', () => {
	const range = { start: new Date(2026, 7, 1), end: new Date(2026, 9, 1) };

	it('works without options', async () => {
		const m = createMappedAdapter([{ id: 'a', title: 't', start: '2026-09-01T10:00:00Z' }]);
		expect(await m.fetchEvents(range)).toHaveLength(1);
	});

	it.each(['07:00', '7:00', '07:00:00'])('reads a date + start time of "%s"', async (time) => {
		const m = createMappedAdapter([{ id: 'a', title: 't', date: '2026-09-01', start_time: time, end_time: '08:00' }]);
		const [ev] = await m.fetchEvents(range);
		expect(ev.start.getHours()).toBe(7);
	});

	it('falls back to a generated id when the mapped id field is missing', async () => {
		const m = createMappedAdapter(
			[{ title: 'x', start: '2026-09-01T10:00:00Z' }, { title: 'y', start: '2026-09-01T11:00:00Z' }],
			{ fields: { id: 'uid' } },
		);
		const ids = (await m.fetchEvents(range)).map((e) => e.id);
		expect(new Set(ids).size).toBe(2);
		expect(ids).not.toContain('');
	});
});

describe('memory adapter', () => {
	it('includes a zero-length event at the start of the range', () => {
		const t = new Date(2026, 8, 1);
		const m = createMemoryAdapter([{ id: 'z', title: 'z', start: t, end: t }]);
		expect(m.fetchEventsSync!({ start: t, end: new Date(2026, 8, 2) })).toHaveLength(1);
	});
});

describe('JMAP adapter', () => {
	const range = { start: new Date(2026, 8, 1), end: new Date(2026, 11, 1) };

	it('reads week durations', async () => {
		const a = createJmapAdapter(jmap({ start: '2026-09-01T10:00:00', duration: 'P1W' }), { getAccountId: () => 'a' });
		const [ev] = await a.fetchEvents(range);
		expect(ev.end.getDate()).toBe(8);
		expect(ev.end.getHours()).toBe(10);
	});

	it('keeps an all-day event on its date even when the server sends utcStart', async () => {
		const a = createJmapAdapter(
			jmap({ start: '2026-10-25T00:00:00', duration: 'P1D', showWithoutTime: true, utcStart: '2026-10-25T00:00:00Z', utcEnd: '2026-10-26T00:00:00Z' }),
			{ getAccountId: () => 'a' },
		);
		const [ev] = await a.fetchEvents(range);
		expect(ev.start.getTime()).toBe(new Date(2026, 9, 25).getTime());
		expect(ev.end.getTime()).toBe(new Date(2026, 9, 26).getTime());
	});
});

describe('timezone wrapper', () => {
	it('keeps the synchronous path of the adapter it wraps', () => {
		const seed = [{ id: 's', title: 's', start: new Date('2026-09-01T10:00:00Z'), end: new Date('2026-09-01T11:00:00Z') }];
		const w = wrapAdapterWithTimezone(withInitialEvents(createMemoryAdapter(), seed), 'Europe/Warsaw');
		const got = w.fetchEventsSync?.({ start: new Date(2026, 7, 1), end: new Date(2026, 9, 1) });
		expect(got).toHaveLength(1);
	});
});
