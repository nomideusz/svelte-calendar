import { describe, expect, it } from 'vitest';
import { createViewState } from './view-state.svelte.js';
describe('view-state month mode', () => {
    it('infers month mode from month-* ids', () => {
        const vs = createViewState({ view: 'month-grid' });
        expect(vs.mode).toBe('month');
    });
    it('computes a week-aligned grid covering the focus month', () => {
        // June 2030: Sun 1st … Sun 30th. Monday-start grid: May 27 → Jul 1 (5 rows... verify)
        const vs = createViewState({ view: 'month-grid', initialDate: new Date(2030, 5, 15) });
        const { start, end } = vs.range;
        expect(start.getDay()).toBe(1); // Monday
        expect(start.getTime()).toBeLessThanOrEqual(new Date(2030, 5, 1).getTime());
        expect(end.getTime()).toBeGreaterThan(new Date(2030, 5, 30).getTime());
        const days = Math.round((end.getTime() - start.getTime()) / 86_400_000);
        expect(days % 7).toBe(0);
        expect(days).toBeGreaterThanOrEqual(28);
        expect(days).toBeLessThanOrEqual(42);
    });
    it('February of a non-leap year starting on Monday fits exactly 4 rows', () => {
        // Feb 2027: starts Mon Feb 1, ends Sun Feb 28.
        const vs = createViewState({ view: 'month-grid', initialDate: new Date(2027, 1, 10) });
        const days = Math.round((vs.range.end.getTime() - vs.range.start.getTime()) / 86_400_000);
        expect(days).toBe(28);
    });
    it('next/prev step whole months and survive the Jan-31 anchor', () => {
        const vs = createViewState({ view: 'month-grid', initialDate: new Date(2030, 0, 31) });
        vs.next();
        expect(vs.focusDate.getMonth()).toBe(1); // February, not March
        vs.prev();
        vs.prev();
        expect(vs.focusDate.getMonth()).toBe(11); // December previous year
        expect(vs.focusDate.getFullYear()).toBe(2029);
    });
    it('week modes are untouched: next() advances by dayCount', () => {
        const vs = createViewState({ view: 'week-planner', initialDate: new Date(2030, 5, 3) });
        const before = vs.focusDate.getTime();
        vs.next();
        expect(vs.focusDate.getTime() - before).toBe(7 * 86_400_000);
    });
});
