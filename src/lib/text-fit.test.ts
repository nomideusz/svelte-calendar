import { describe, expect, it, vi } from 'vitest';

// 6px per character, no canvas needed
vi.mock('@chenglou/pretext', () => ({
	prepare: (text: string) => ({ text }),
	prepareWithSegments: (text: string) => ({ text }),
	measureNaturalWidth: (p: { text: string }) => p.text.length * 6,
	layout: (p: { text: string }, width: number, lineHeight: number) => {
		const lineCount = Math.max(1, Math.ceil((p.text.length * 6) / width));
		return { lineCount, height: lineCount * lineHeight };
	},
}));

const { fits, pickFit, textHeight, breakLines } = await import('./text-fit.js');

describe('text-fit', () => {
	it('picks the longest candidate that fits, else the last', () => {
		const c = ['Vinyasa Flow z Kasią', 'Vinyasa', 'VF'];
		expect(pickFit(c, 'f', 200)).toBe('Vinyasa Flow z Kasią');
		expect(pickFit(c, 'f', 60)).toBe('Vinyasa');
		expect(pickFit(c, 'f', 5)).toBe('VF');
		expect(pickFit([], 'f', 100)).toBe('');
	});
	it('honours the line budget', () => {
		expect(fits('abcdefghij', 'f', 30)).toBe(false);
		expect(fits('abcdefghij', 'f', 30, 2)).toBe(true);
		expect(textHeight('abcdefghij', 'f', 30, 16)).toBe(32);
	});

	it('breaks a paragraph into lines no wider than the column, evenly', () => {
		// 10 chars per line at 6px/char
		const lines = breakLines('aaa bbb ccc ddd eee fff', 'f', 60);
		expect(lines.every((l) => l.length <= 10)).toBe(true);
		expect(lines.join(' ')).toBe('aaa bbb ccc ddd eee fff');
		// greedy would give "aaa bbb" / "ccc ddd" / "eee fff" too — an even case
		expect(lines).toEqual(['aaa bbb', 'ccc ddd', 'eee fff']);
	});
	it('breaks inside a word only at a soft hyphen, and shows the hyphen', () => {
		const lines = breakLines('aaaa\u00ADbbbb cc', 'f', 30);
		expect(lines).toEqual(['aaaa-', 'bbbb', 'cc']);
		expect(breakLines('aaaa\u00ADbbbb', 'f', 60)).toEqual(['aaaabbbb']);
	});
	it('prefers even lines over a greedy fill', () => {
		// greedy: "aaaaaaa b" (9) / "cccccccc" (8) / "d" — KP: "aaaaaaa" / "b cccccccc" is not allowed (10 > 9)…
		const lines = breakLines('aaaaaa bb ccccc ddddddd', 'f', 54); // 9 chars
		expect(lines.every((l) => l.length <= 9)).toBe(true);
		expect(lines.join(' ')).toBe('aaaaaa bb ccccc ddddddd');
	});
});
