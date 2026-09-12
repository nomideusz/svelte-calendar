import { describe, expect, it, vi } from 'vitest';
// 6px per character, no canvas needed
vi.mock('@chenglou/pretext', () => ({
    prepare: (text) => ({ text }),
    prepareWithSegments: (text) => ({ text }),
    measureNaturalWidth: (p) => p.text.length * 6,
    layout: (p, width, lineHeight) => {
        const lineCount = Math.max(1, Math.ceil((p.text.length * 6) / width));
        return { lineCount, height: lineCount * lineHeight };
    },
}));
const { fits, pickFit, textHeight, breakLines, fitParts } = await import('./text-fit.js');
describe('fitParts', () => {
    // 6px per character (the mock above); `f` is any font.
    const title = { key: 'title', text: 'Morning Flow', font: 'f', priority: 0 }; // 72px
    const time = { key: 'time', text: '7:00a', font: 'f', priority: 1 }; // 30px
    const room = { key: 'room', text: 'Studio B', font: 'f', priority: 2 }; // 48px
    it('keeps everything when it all fits', () => {
        expect(fitParts([title, time, room], 200)).toEqual({ title: true, time: true, room: true });
    });
    it('gives up the lowest priority first', () => {
        expect(fitParts([title, time, room], 140)).toEqual({ title: true, time: true, room: false });
    });
    it('stops at the first part that does not fit, rather than skipping to a smaller one', () => {
        const wide = { key: 'time', text: 'a'.repeat(20), font: 'f', priority: 1 }; // 120px
        const narrow = { key: 'room', text: 'B', font: 'f', priority: 2 }; // 6px
        expect(fitParts([title, wide, narrow], 100)).toEqual({ title: true, time: false, room: false });
    });
    it('keeps an anchor that overflows on its own — it is what gets the ellipsis', () => {
        expect(fitParts([title, time, room], 10)).toEqual({ title: true, time: false, room: false });
    });
    it('leaves only the anchors before the first measurement', () => {
        expect(fitParts([title, time, room], 0)).toEqual({ title: true, time: false, room: false });
    });
    it('never shows a part with no text', () => {
        const empty = { ...room, text: '' };
        expect(fitParts([title, time, empty], 500)).toEqual({ title: true, time: true, room: false });
    });
    it('charges `extra` beside the text', () => {
        expect(fitParts([title, { ...time, extra: 0 }], 102)).toEqual({ title: true, time: true });
        expect(fitParts([title, { ...time, extra: 1 }], 102)).toEqual({ title: true, time: false });
    });
    it('measures nothing when a part states its size — the height axis', () => {
        const parts = [
            { key: 'time', size: 12.1, priority: 0 },
            { key: 'title', size: 15.4, priority: 0 },
            { key: 'room', text: 'Studio B', size: 22, priority: 1 },
        ];
        expect(fitParts(parts, 50)).toEqual({ time: true, title: true, room: true });
        expect(fitParts(parts, 49)).toEqual({ time: true, title: true, room: false });
    });
});
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
    it('treats a stored line break as a space, and keeps a no-break space glued', () => {
        expect(breakLines('aaa\nbbb ccc', 'f', 42)).toEqual(['aaa bbb', 'ccc']);
        expect(breakLines('aaa\u00a0bbb ccc', 'f', 42)).toEqual(['aaa\u00a0bbb', 'ccc']);
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
