import { describe, expect, it } from 'vitest';
import { openingTop } from './opening-top.js';

const H = 64;
const ev = (from: number, to: number) => ({ top: from * H, height: (to - from) * H });
const visible = (top: number, viewH: number, b: { top: number; height: number }) =>
	b.top >= top && b.top + b.height <= top + viewH;

describe('openingTop', () => {
	it('clears the label room on an empty grid', () => {
		expect(openingTop([], 10 * H, H, 18, 11 * H, 400)).toBe(10 * H - 18);
	});

	it('moves up to an event ending in the label room (Quick Start at 11:16)', () => {
		const sync = ev(9, 10);
		const lunch = ev(12, 13);
		const top = openingTop([sync, lunch], 10 * H, H, 18, 11.27 * H, 330);
		expect(top).toBe(9 * H - 18);
		expect(visible(top, 330, sync) && visible(top, 330, lunch)).toBe(true);
	});

	it('aligns to an event crossing the look-back limit (planner at 11:00)', () => {
		const blocks = [ev(7, 8.25), ev(7, 8), ev(7.5, 8.5), ev(8.5, 9.5), ev(9.5, 10.5)];
		const top = openingTop(blocks, 10 * H, H, 18, 11 * H, 600);
		expect(top).toBe(7 * H - 18);
		for (const b of blocks) expect(b.top + b.height <= top || b.top >= top).toBe(true);
	});

	it('goes below a crossing event when its start would lose the now line', () => {
		const blocks = [ev(5, 8.25), ev(8.5, 9.5), ev(9.5, 10.5)];
		expect(openingTop(blocks, 10 * H, H, 18, 11 * H, 300)).toBe(8.5 * H);
	});

	it('cuts a block too long for any placement', () => {
		expect(openingTop([ev(0, 23)], 10 * H, H, 18, 11 * H, 400)).toBe(10 * H);
	});
});
