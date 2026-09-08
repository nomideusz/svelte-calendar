import { type PrepareOptions } from '@chenglou/pretext';
import type { Attachment } from 'svelte/attachments';
export declare function lineCount(text: string, font: string, width: number, options?: PrepareOptions): number;
export declare function fits(text: string, font: string, width: number, lines?: number): boolean;
/** Height the text will take at `width`, before it is in the DOM. */
export declare function textHeight(text: string, font: string, width: number, lineHeight: number): number;
/** Longest candidate (in given order) that fits in `lines`; the last one if none does. */
export declare function pickFit(candidates: readonly string[], font: string, width: number, lines?: number): string;
/** The element's computed font as a canvas font string. */
export declare function fontOf(el: Element): string;
/**
 * `{@attach fitLabel([title, short, initials])}` — keeps the element's text at
 * the longest candidate that fits its content box. The element needs a width
 * that does not come from its own text (block, or a flex item with min-width: 0).
 */
export declare function fitLabel(candidates: readonly string[], lines?: number): Attachment<HTMLElement>;
export declare function breakLines(text: string, font: string, width: number): string[];
/**
 * `<p {@attach typeset(text)}>` — sets the paragraph as justified Knuth-Plass
 * lines, one block span per line, re-done on resize and after webfonts load.
 * Progressive: the server-rendered text is what crawlers and no-JS get; if the
 * browser's own measure disagrees with ours (a line overflows), the plain
 * text goes back and the browser breaks it. Pass the text, not the DOM — the
 * span rebuild replaces the framework's text node.
 */
export declare function typeset(text: string): Attachment<HTMLElement>;
