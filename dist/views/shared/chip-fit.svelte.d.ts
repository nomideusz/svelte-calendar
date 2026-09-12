/**
 * The measuring half of chip labels: one ResizeObserver for a whole view, the
 * fonts read from a hidden probe so they are known before the first chip of a
 * kind renders, and a width cache cleared when webfonts settle.
 *
 * The deciding half is `fitParts` (pure, in text-fit.ts). A view owns the
 * ladder — which parts it could show, in which order it gives them up.
 */
import { type ChipPart } from '../../text-fit.js';
export interface ChipFitOptions {
    /** Selector for the box one chip gets; its content width is the budget. */
    slot: string;
    /** Font key → selector. Point these at a hidden probe, not at a live chip:
     *  a chip that is currently dropped cannot tell anyone what font it wanted. */
    fonts: Record<string, string>;
}
export interface ChipFit {
    /** Content width of one slot, px. 0 until measured (SSR, first paint). */
    readonly width: number;
    /** The probed fonts, as canvas font strings, by key. */
    readonly fonts: Record<string, string>;
    /** `{@attach fit.watch}` on the element whose resize resizes the chips. */
    watch(root: HTMLElement): () => void;
    /** Which parts fit; `reserve` is what the chip spends on itself (padding). */
    parts(list: readonly ChipPart[], reserve?: number): Record<string, boolean>;
}
export declare function createChipFit(options: ChipFitOptions): ChipFit;
