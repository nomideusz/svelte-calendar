import { describe, it, expect } from 'vitest';
import { timeToX } from './types.js';
describe('timeToX', () => {
    const rangeStartMs = new Date(2025, 2, 1, 0, 0).getTime();
    const hourWidth = 120;
    it('returns 0 for the range start', () => {
        expect(timeToX(rangeStartMs, rangeStartMs, hourWidth)).toBe(0);
    });
    it('returns hourWidth for 1 hour after start', () => {
        const oneHourLater = rangeStartMs + 3_600_000;
        expect(timeToX(oneHourLater, rangeStartMs, hourWidth)).toBe(hourWidth);
    });
    it('returns half hourWidth for 30 min after start', () => {
        const halfHour = rangeStartMs + 1_800_000;
        expect(timeToX(halfHour, rangeStartMs, hourWidth)).toBe(hourWidth / 2);
    });
    it('works with Date objects', () => {
        const date = new Date(rangeStartMs + 2 * 3_600_000);
        expect(timeToX(date, rangeStartMs, hourWidth)).toBe(2 * hourWidth);
    });
    it('returns negative for times before range start', () => {
        const before = rangeStartMs - 3_600_000;
        expect(timeToX(before, rangeStartMs, hourWidth)).toBe(-hourWidth);
    });
});
