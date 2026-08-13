import type { Snippet } from 'svelte';
import type { TimelineEvent, BlockedSlot } from '../../core/types.js';
import { type CalendarLabels } from '../../core/locale.js';
import type { DragState } from '../../engine/drag.svelte.js';
import type { ViewState } from '../../engine/view-state.svelte.js';
export interface CalendarContext {
    readonly viewState: ViewState | undefined;
    readonly drag: DragState | undefined;
    readonly commitDrag: (() => void) | undefined;
    readonly snapInterval: number;
    readonly minColumnWidth: number;
    readonly equalDays: boolean;
    readonly showDates: boolean;
    readonly hideDays: number[] | undefined;
    readonly isMobile: boolean;
    readonly autoHeight: boolean;
    readonly compact: boolean;
    readonly columns: boolean;
    readonly readOnly: boolean;
    readonly blockedSlots: BlockedSlot[] | undefined;
    readonly dayHeaderSnippet: Snippet<[{
        date: Date;
        isToday: boolean;
        dayName: string;
    }]> | undefined;
    readonly minDuration: number | undefined;
    readonly maxDuration: number | undefined;
    readonly oneventhover: ((event: TimelineEvent) => void) | undefined;
    /** Move callback (already readOnly-gated and timezone-unzoning at the
     *  Calendar layer) — lets non-planner views offer coarser drags, e.g.
     *  AgendaWeek's day-to-day card drop. */
    readonly oneventmove: ((event: TimelineEvent, newStart: Date, newEnd: Date) => void) | undefined;
    readonly ondayclick: ((date: Date) => void) | undefined;
    readonly timezone: string | undefined;
    readonly disabledDates: Date[] | undefined;
    readonly disabledSet: Set<number>;
    readonly loadRange: {
        current: {
            start: Date;
            end: Date;
        } | null;
        set: (r: {
            start: Date;
            end: Date;
        } | null) => void;
    } | undefined;
    readonly eventSnippet: Snippet<[TimelineEvent]> | undefined;
    readonly emptySnippet: Snippet | undefined;
    /** Per-instance labels (Calendar's `labels` prop merged over globals); global labels when headless. */
    readonly labels: CalendarLabels;
}
/**
 * Read the calendar context.
 * Call at component init time (top-level script).
 * Returns an object with getters that delegate to the raw context.
 */
export declare function useCalendarContext(): CalendarContext;
