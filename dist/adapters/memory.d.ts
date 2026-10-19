/**
 * In-memory adapter — the default for demos and testing.
 *
 * Events are stored in a plain array. No persistence across page loads.
 * Events without a `color` stay uncoloured and draw in `--dt-event` (ink).
 * Pass `palette` to auto-assign colours instead, grouped by `category` or
 * `title` so related events share one.
 *
 * Usage:
 *   import { createMemoryAdapter } from './';
 *   const adapter = createMemoryAdapter(initialEvents);
 *   const adapter = createMemoryAdapter(initialEvents, { palette: VIVID_PALETTE });
 */
import type { TimelineEvent } from '../core/types.js';
import type { CalendarAdapter } from './types.js';
export interface MemoryAdapterOptions {
    /**
     * Colour palette for auto-colouring events that have no `color`.
     * Off by default (events draw in `--dt-event`). Pass `VIVID_PALETTE`
     * for the pre-1.4 look, or `generatePalette(accent)` for theme-harmonious colours.
     */
    palette?: readonly string[];
}
export declare function createMemoryAdapter(initial?: TimelineEvent[], options?: MemoryAdapterOptions): CalendarAdapter;
