import { type PrepareOptions } from '@chenglou/pretext';
import type { Attachment } from 'svelte/attachments';
export declare function lineCount(text: string, font: string, width: number, options?: PrepareOptions): number;
export declare function fits(text: string, font: string, width: number, lines?: number): boolean;
/** Height the text will take at `width`, before it is in the DOM. */
export declare function textHeight(text: string, font: string, width: number, lineHeight: number): number;
/** Natural (unwrapped) width of `text` in `font`, px. */
export declare function textWidth(text: string, font: string): number;
/** Longest candidate (in given order) that fits in `lines`; the last one if none does. */
export declare function pickFit(candidates: readonly string[], font: string, width: number, lines?: number): string;
/** One part of a chip. Give `text` + `font` to measure it, or `size` to state its cost. */
export interface ChipPart {
    /** Names this part in the result. */
    key: string;
    /** The text exactly as it will render. Empty or absent ⇒ the part never shows. */
    text?: string;
    /** Canvas font string for `text` — `fontOf(el)`. */
    font?: string;
    /** A stated cost instead of a measured one: a line's height, an icon's width. */
    size?: number;
    /** Dropped before lower numbers; `0` is an anchor and never drops. Default 1. */
    priority?: number;
    /** What this part costs beside its own size: a gap, a dot, a separator. */
    extra?: number;
}
/**
 * Which parts of a chip fit in `budget` px along one axis — width for a row
 * of parts, height for a stack of them.
 *
 * Anchors (`priority: 0`) always show; they are what earns an ellipsis when
 * even they overflow. The rest are added in priority order and the first one
 * that does not fit ends it: a chip reads in one direction, so keeping a later
 * part after dropping an earlier one reads as arbitrary.
 *
 * A budget of 0 — server-rendered, or before the first measurement — leaves
 * the anchors, so the first paint is the important part and nothing else.
 */
export declare function fitParts(parts: readonly ChipPart[], budget: number, measure?: (text: string, font: string) => number): Record<string, boolean>;
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
