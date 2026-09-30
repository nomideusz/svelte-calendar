import type { CalendarAdapter } from './types.js';
export interface CompositeAdapterOptions {
    /**
     * Index of the adapter that handles `createEvent`.
     * Defaults to `0` (the first adapter).
     */
    primaryIndex?: number;
    /**
     * Called when one child's `fetchEvents` fails. With it, the others'
     * events still load and the failure is yours to show; without it, one
     * failing child fails the whole load (the calendar's `onerror`).
     */
    onFetchError?: (error: unknown, adapterIndex: number) => void;
}
/**
 * Create a CalendarAdapter that merges events from multiple child adapters.
 *
 * Updates and deletes go to the child that returned the event. An event from
 * a child that cannot write it is refused with a `read-only` error — the
 * calendar then hands the move to the host (`oneventmove`) instead of
 * dropping it.
 *
 * @param adapters  Array of child adapters to merge.
 * @param options   Optional configuration.
 */
export declare function createCompositeAdapter(adapters: CalendarAdapter[], options?: CompositeAdapterOptions): CalendarAdapter;
