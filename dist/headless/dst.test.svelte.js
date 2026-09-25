/**
 * Day stepping across a DST change. Europe/Warsaw falls back on 2026-10-25
 * (a 25 h day), so `ms + n * 24h` from before it lands at 23:00 the day
 * before — every day after the change shifts by one.
 *
 * @vitest-environment jsdom
 */
// @vitest-environment jsdom
process.env.TZ = 'Europe/Warsaw';
import { describe, it, expect } from 'vitest';
import { flushSync } from 'svelte';
import { createRangeAgenda } from './create-range-agenda.svelte.js';
import { createMemoryAdapter } from '../adapters/memory.js';
import { createRecurringAdapter } from '../adapters/recurring.js';
describe('DST (Europe/Warsaw, fall back 2026-10-25)', () => {
    it('range agenda next() from Mon Oct 19 starts on Mon Oct 26 at midnight', async () => {
        let agenda;
        const destroy = $effect.root(() => {
            agenda = createRangeAgenda({ adapter: createMemoryAdapter(), initialDate: new Date(2026, 9, 19) });
        });
        try {
            flushSync();
            agenda.next();
            flushSync();
            expect(agenda.days[0].ms).toBe(new Date(2026, 9, 26).getTime());
            expect(agenda.days.map((d) => d.date.getDate())).toEqual([26, 27, 28, 29, 30, 31, 1]);
        }
        finally {
            destroy();
        }
    });
    it('weekly Monday rule anchored in August projects November occurrences on Mondays', async () => {
        const adapter = createRecurringAdapter([
            { id: 'mon', title: 'Mon', dayOfWeek: 1, startTime: '07:00', endTime: '08:00', startDate: '2026-08-03' },
        ]);
        const events = await adapter.fetchEvents({ start: new Date(2026, 10, 1), end: new Date(2026, 11, 1) });
        expect(events.map((e) => e.start.getDate())).toEqual([2, 9, 16, 23, 30]);
        for (const e of events) {
            expect(e.start.getDay()).toBe(1);
            expect(e.start.getHours()).toBe(7);
        }
    });
});
