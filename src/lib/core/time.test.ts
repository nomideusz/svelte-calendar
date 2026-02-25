import { describe, it, expect } from 'vitest';
import {
	DAY_MS,
	HOUR_MS,
	HOURS,
	sod,
	startOfWeek,
	addDaysMs,
	diffDays,
	pad,
	fractionalHour,
	fmtHM,
	fmtS,
	dayNum,
	dayOfWeek,
} from './time.js';

// ─── Constants ──────────────────────────────────────────

describe('constants', () => {
	it('DAY_MS is 86 400 000', () => {
		expect(DAY_MS).toBe(86_400_000);
	});

	it('HOUR_MS is 3 600 000', () => {
		expect(HOUR_MS).toBe(3_600_000);
	});

	it('HOURS is [0..23]', () => {
		expect(HOURS).toHaveLength(24);
		expect(HOURS[0]).toBe(0);
		expect(HOURS[23]).toBe(23);
	});
});

// ─── sod (start of day) ────────────────────────────────

describe('sod', () => {
	it('returns midnight timestamp for a given timestamp', () => {
		const d = new Date(2025, 2, 15, 14, 30, 0); // Mar 15 2025, 14:30
		const result = sod(d.getTime());
		const expected = new Date(2025, 2, 15, 0, 0, 0, 0).getTime();
		expect(result).toBe(expected);
	});

	it('midnight stays midnight', () => {
		const d = new Date(2025, 0, 1, 0, 0, 0, 0);
		expect(sod(d.getTime())).toBe(d.getTime());
	});
});

// ─── startOfWeek ────────────────────────────────────────

describe('startOfWeek', () => {
	it('returns Monday for mondayStart=true', () => {
		// Wed Mar 19 2025
		const wed = new Date(2025, 2, 19, 10, 0).getTime();
		const result = startOfWeek(wed, true);
		const monday = new Date(2025, 2, 17, 0, 0, 0, 0).getTime();
		expect(result).toBe(monday);
	});

	it('returns Sunday for mondayStart=false', () => {
		// Wed Mar 19 2025
		const wed = new Date(2025, 2, 19, 10, 0).getTime();
		const result = startOfWeek(wed, false);
		const sunday = new Date(2025, 2, 16, 0, 0, 0, 0).getTime();
		expect(result).toBe(sunday);
	});

	it('already on start-of-week day returns same day midnight', () => {
		const monday = new Date(2025, 2, 17, 8, 0).getTime();
		const result = startOfWeek(monday, true);
		expect(result).toBe(new Date(2025, 2, 17, 0, 0, 0, 0).getTime());
	});
});

// ─── addDaysMs ──────────────────────────────────────────

describe('addDaysMs', () => {
	it('adds positive days', () => {
		const base = new Date(2025, 0, 1).getTime();
		const result = addDaysMs(base, 10);
		expect(new Date(result).getDate()).toBe(11);
	});

	it('subtracts negative days', () => {
		const base = new Date(2025, 0, 15).getTime();
		const result = addDaysMs(base, -5);
		expect(new Date(result).getDate()).toBe(10);
	});
});

// ─── diffDays ───────────────────────────────────────────

describe('diffDays', () => {
	it('same day returns 0', () => {
		const d = new Date(2025, 5, 1).getTime();
		expect(diffDays(d, d)).toBe(0);
	});

	it('returns positive for later - earlier', () => {
		const a = new Date(2025, 5, 10).getTime();
		const b = new Date(2025, 5, 1).getTime();
		expect(diffDays(a, b)).toBe(9);
	});

	it('returns negative for earlier - later', () => {
		const a = new Date(2025, 5, 1).getTime();
		const b = new Date(2025, 5, 10).getTime();
		expect(diffDays(a, b)).toBe(-9);
	});
});

// ─── pad ────────────────────────────────────────────────

describe('pad', () => {
	it('pads single digit', () => {
		expect(pad(0)).toBe('00');
		expect(pad(5)).toBe('05');
		expect(pad(9)).toBe('09');
	});

	it('does not pad double digits', () => {
		expect(pad(10)).toBe('10');
		expect(pad(23)).toBe('23');
	});
});

// ─── fractionalHour ─────────────────────────────────────

describe('fractionalHour', () => {
	it('midnight → 0', () => {
		const d = new Date(2025, 0, 1, 0, 0, 0).getTime();
		expect(fractionalHour(d)).toBe(0);
	});

	it('14:30 → 14.5', () => {
		const d = new Date(2025, 0, 1, 14, 30, 0).getTime();
		expect(fractionalHour(d)).toBe(14.5);
	});

	it('6:15:30 → ~6.258', () => {
		const d = new Date(2025, 0, 1, 6, 15, 30).getTime();
		expect(fractionalHour(d)).toBeCloseTo(6 + 15 / 60 + 30 / 3600, 4);
	});
});

// ─── fmtHM ──────────────────────────────────────────────

describe('fmtHM', () => {
	it('formats midnight as 00:00', () => {
		expect(fmtHM(new Date(2025, 0, 1, 0, 0).getTime())).toBe('00:00');
	});

	it('formats 9:05 as 09:05', () => {
		expect(fmtHM(new Date(2025, 0, 1, 9, 5).getTime())).toBe('09:05');
	});

	it('formats 23:59 as 23:59', () => {
		expect(fmtHM(new Date(2025, 0, 1, 23, 59).getTime())).toBe('23:59');
	});
});

// ─── fmtS ───────────────────────────────────────────────

describe('fmtS', () => {
	it('formats 0 seconds as :00', () => {
		expect(fmtS(new Date(2025, 0, 1, 0, 0, 0).getTime())).toBe(':00');
	});

	it('formats 45 seconds as :45', () => {
		expect(fmtS(new Date(2025, 0, 1, 0, 0, 45).getTime())).toBe(':45');
	});
});

// ─── dayNum ─────────────────────────────────────────────

describe('dayNum', () => {
	it('returns day of month', () => {
		expect(dayNum(new Date(2025, 2, 15).getTime())).toBe(15);
		expect(dayNum(new Date(2025, 0, 1).getTime())).toBe(1);
		expect(dayNum(new Date(2025, 0, 31).getTime())).toBe(31);
	});
});

// ─── dayOfWeek ──────────────────────────────────────────

describe('dayOfWeek', () => {
	it('returns 0 for Sunday', () => {
		// Jan 5 2025 is a Sunday
		expect(dayOfWeek(new Date(2025, 0, 5).getTime())).toBe(0);
	});

	it('returns 1 for Monday', () => {
		// Jan 6 2025 is a Monday
		expect(dayOfWeek(new Date(2025, 0, 6).getTime())).toBe(1);
	});

	it('returns 6 for Saturday', () => {
		// Jan 4 2025 is a Saturday
		expect(dayOfWeek(new Date(2025, 0, 4).getTime())).toBe(6);
	});
});
