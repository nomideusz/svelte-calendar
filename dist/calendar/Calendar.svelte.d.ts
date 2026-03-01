import { type Component, type Snippet } from 'svelte';
import type { CalendarAdapter } from '../adapters/types.js';
import type { CalendarViewId } from '../engine/view-state.svelte.js';
import type { TimelineEvent } from '../core/types.js';
/** One view registration */
export interface CalendarView {
    id: CalendarViewId;
    label: string;
    /** day or week */
    granularity: 'day' | 'week';
    /** The Svelte component to render */
    component: Component<Record<string, unknown>>;
    /** Extra props to pass through (e.g. hourHeight, specialized settings) */
    props?: Record<string, unknown>;
}
interface Props {
    /** Data adapter (required) */
    adapter: CalendarAdapter;
    /** Registered views */
    views?: CalendarView[];
    /** Initial view */
    defaultView?: CalendarViewId;
    /** CSS theme string (--dt-* inline style) */
    theme?: string;
    /** Start week on Monday */
    mondayStart?: boolean;
    /** Total height */
    height?: number;
    /** Show toolbar */
    showToolbar?: boolean;
    /** Text direction: 'ltr' (default), 'rtl', or 'auto' */
    dir?: 'ltr' | 'rtl' | 'auto';
    /** BCP 47 locale tag (e.g. 'en-US', 'ar-SA') — sets lang and locale for formatting */
    locale?: string;
    /** Read-only mode: disables drag, resize, empty-slot creation */
    readOnly?: boolean;
    /** Visible hour range: [startHour, endHour). Crops the grid to these hours. */
    visibleHours?: [number, number];
    /** Initial date to focus on (defaults to today) */
    initialDate?: Date;
    /** Drag snap interval in minutes (default: 15) */
    snapInterval?: number;
    /** Custom event rendering snippet */
    event?: Snippet<[TimelineEvent]>;
    /** Content to show when no events are loaded */
    empty?: Snippet;
    oneventclick?: (event: TimelineEvent) => void;
    oneventcreate?: (range: {
        start: Date;
        end: Date;
    }) => void;
    oneventmove?: (event: TimelineEvent, newStart: Date, newEnd: Date) => void;
    onviewchange?: (viewId: CalendarViewId) => void;
}
declare const Calendar: Component<Props, {}, "">;
type Calendar = ReturnType<typeof Calendar>;
export default Calendar;
