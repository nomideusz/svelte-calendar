import { describe, it, expect, beforeEach } from 'vitest';
import {
	fmtH,
	weekdayShort,
	monthShort,
	monthLong,
	dateShort,
	fmtDay,
	fmtWeekRange,
	setDefaultLocale,
	getDefaultLocale,
} from './locale.js';
import { sod, DAY_MS } from './time.js';

beforeEach(() => {
	setDefaultLocale('en-US');
});

// ─── fmtH ───────────────────────────────────────────────

describe('fmtH', () => {
	it('formats 0 as 12a', () => expect(fmtH(0)).toBe('12a'));
	it('formats 1 as 1a', () => expect(fmtH(1)).toBe('1a'));
	it('formats 11 as 11a', () => expect(fmtH(11)).toBe('11a'));
	it('formats 12 as 12p', () => expect(fmtH(12)).toBe('12p'));
	it('formats 13 as 1p', () => expect(fmtH(13)).toBe('1p'));
	it('formats 23 as 11p', () => expect(fmtH(23)).toBe('11p'));
});

// ─── weekdayShort ───────────────────────────────────────

describe('weekdayShort', () => {
	it('returns short weekday name', () => {
		// Mon Jan 6 2025
		const mon = new Date(2025, 0, 6).getTime();
		expect(weekdayShort(mon)).toBe('Mon');
	});
});

// ─── monthShort / monthLong ─────────────────────────────

describe('monthShort', () => {
	it('returns abbreviated month', () => {
		const jan = new Date(2025, 0, 15).getTime();
		expect(monthShort(jan)).toBe('Jan');
	});
});

describe('monthLong', () => {
	it('returns full month name', () => {
		const feb = new Date(2025, 1, 1).getTime();
		expect(monthLong(feb)).toBe('February');
	});
});

// ─── dateShort ──────────────────────────────────────────

describe('dateShort', () => {
	it('returns "Month Day" format', () => {
		const ms = new Date(2025, 1, 21).getTime();
		const result = dateShort(ms);
		expect(result).toContain('Feb');
		expect(result).toContain('21');
	});
});

// ─── fmtDay ─────────────────────────────────────────────

describe('fmtDay', () => {
	const todayMs = sod(new Date(2025, 2, 15).getTime());

	it('shows "Today" for today', () => {
		const result = fmtDay(todayMs, todayMs);
		expect(result).toContain('Today');
	});

	it('shows "Yesterday" for yesterday', () => {
		const result = fmtDay(todayMs - DAY_MS, todayMs);
		expect(result).toContain('Yesterday');
	});

	it('shows "Tomorrow" for tomorrow', () => {
		const result = fmtDay(todayMs + DAY_MS, todayMs);
		expect(result).toContain('Tomorrow');
	});

	it('shows weekday for other days', () => {
		const result = fmtDay(todayMs + 3 * DAY_MS, todayMs);
		// Should contain a weekday name, not "Today"/"Yesterday"/"Tomorrow"
		expect(result).not.toContain('Today');
		expect(result).not.toContain('Yesterday');
		expect(result).not.toContain('Tomorrow');
	});

	it('respects short option', () => {
		const result = fmtDay(todayMs, todayMs, { short: true });
		expect(result).toBe('Today');
	});
});

// ─── fmtWeekRange ───────────────────────────────────────

describe('fmtWeekRange', () => {
	it('same month: "Mon D – D, YYYY"', () => {
		// Week of Feb 17-23, 2025 (Mon start)
		const ws = new Date(2025, 1, 17).getTime();
		const result = fmtWeekRange(ws);
		expect(result).toContain('Feb');
		expect(result).toContain('17');
		expect(result).toContain('23');
		expect(result).toContain('2025');
	});

	it('cross-month: "Mon D – Mon D, YYYY"', () => {
		// Week of Jan 27 – Feb 2, 2025
		const ws = new Date(2025, 0, 27).getTime();
		const result = fmtWeekRange(ws);
		expect(result).toContain('Jan');
		expect(result).toContain('Feb');
	});

	it('cross-year: includes both years', () => {
		// Week of Dec 29, 2025 – Jan 4, 2026
		const ws = new Date(2025, 11, 29).getTime();
		const result = fmtWeekRange(ws);
		expect(result).toContain('2025');
		expect(result).toContain('2026');
	});
});

// ─── default locale ─────────────────────────────────────

describe('locale management', () => {
	it('getDefaultLocale returns en-US by default', () => {
		expect(getDefaultLocale()).toBe('en-US');
	});

	it('setDefaultLocale changes the locale', () => {
		setDefaultLocale('pl-PL');
		expect(getDefaultLocale()).toBe('pl-PL');
	});
});
