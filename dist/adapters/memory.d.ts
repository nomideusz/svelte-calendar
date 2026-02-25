/**
 * In-memory adapter — the default for demos and testing.
 *
 * Events are stored in a plain array. No persistence across page loads.
 * Perfect for prototyping and unit tests.
 *
 * Usage:
 *   import { createMemoryAdapter } from './';
 *   const adapter = createMemoryAdapter(initialEvents);
 *   const store = createEventStore(adapter);
 */
import type { TimelineEvent } from '../core/types.js';
import type { CalendarAdapter } from './types.js';
export interface MemoryAdapterOptions {
    /** Map of category/title to color */
    colorMap?: Record<string, string>;
    /** Auto-assign colors to events by category or title */
    autoColor?: boolean;
}
export declare function createMemoryAdapter(initial?: TimelineEvent[], options?: MemoryAdapterOptions): CalendarAdapter;
