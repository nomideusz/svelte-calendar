import { describe, expect, it, vi } from 'vitest';
import { wrapAdapterWithTimezone, toZonedTime, fromZonedTime } from './timezone.js';
import { createMemoryAdapter } from '../adapters/memory.js';

const WARSAW = 'Europe/Warsaw';

describe('wrapAdapterWithTimezone', () => {
	it('shifts fetched events to the zone and queries with real instants', async () => {
		// 23:30 UTC on Jun 1 = 01:30 Jun 2 in Warsaw (CEST, +2)
		const base = createMemoryAdapter([
			{
				id: 'e1',
				title: 'Late',
				start: new Date('2030-06-01T23:30:00Z'),
				end: new Date('2030-06-02T00:30:00Z'),
			},
		]);
		const spy = vi.spyOn(base, 'fetchEvents');
		const wrapped = wrapAdapterWithTimezone(base, WARSAW);

		// Ask for "Jun 2, Warsaw wall clock" — zoned midnight to midnight
		const zonedStart = new Date(2030, 5, 2, 0, 0, 0);
		const zonedEnd = new Date(2030, 5, 3, 0, 0, 0);
		const events = await wrapped.fetchEvents({ start: zonedStart, end: zonedEnd });

		// Underlying adapter received real instants (Jun 1 22:00 UTC)
		expect(spy.mock.calls[0][0].start.toISOString()).toBe(
			fromZonedTime(zonedStart, WARSAW).toISOString(),
		);
		// The late-UTC event lands on Jun 2 in the zoned plane
		expect(events).toHaveLength(1);
		expect(events[0].start.getDate()).toBe(2);
		expect(events[0].start.getHours()).toBe(1);
		expect(events[0].start.getMinutes()).toBe(30);
	});

	it('converts mutation payloads back to real instants', async () => {
		const base = createMemoryAdapter([]);
		const wrapped = wrapAdapterWithTimezone(base, WARSAW);
		const created = await wrapped.createEvent!({
			title: 'X',
			start: new Date(2030, 5, 2, 10, 0), // 10:00 Warsaw wall clock
			end: new Date(2030, 5, 2, 11, 0),
		});
		// Round-trips back to the zoned plane for the caller…
		expect(created.start.getHours()).toBe(10);
		// …while the stored instant is 08:00 UTC (CEST)
		const [stored] = await base.fetchEvents({
			start: new Date('2030-06-01T00:00:00Z'),
			end: new Date('2030-06-03T00:00:00Z'),
		});
		expect(stored.start.toISOString()).toBe('2030-06-02T08:00:00.000Z');
	});

	it('zoned round-trip is lossless outside the DST fall-back hour', () => {
		// Poland DST ends 2030-10-27 03:00 CEST → 02:00 CET. Wall clocks between
		// 02:00–03:00 happen twice that night; a wall-clock representation cannot
		// distinguish the two instants, so fromZonedTime picks one offset. That
		// single repeated hour per year is inherently ambiguous — everywhere else
		// the round-trip must be exact.
		for (const iso of [
			'2030-10-26T23:59:00Z', // 01:59 CEST — before the repeat
			'2030-10-27T02:01:00Z', // 03:01 CET — after the repeat
			'2030-03-31T05:00:00Z', // spring-forward day, after the gap
			'2030-07-01T12:00:00Z',
		]) {
			const real = new Date(iso);
			expect(fromZonedTime(toZonedTime(real, WARSAW), WARSAW).toISOString()).toBe(real.toISOString());
		}
	});
});
