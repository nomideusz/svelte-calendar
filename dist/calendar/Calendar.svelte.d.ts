import type { Component, Snippet } from 'svelte';
import type { CalendarAdapter } from '../adapters/types.js';
import type { CalendarViewId } from '../engine/view-state.svelte.js';
import type { TimelineEvent, BlockedSlot } from '../core/types.js';
import type { CalendarLabels } from '../core/locale.js';
import type { AutoThemeOptions } from '../theme/auto.js';
import type { HeaderContext, NavigationContext } from '../headless/types.js';
/**
 * What the Calendar passes to the active view's component. Engines (store,
 * view state, drag, labels…) are read from context — `useCalendarContext()`.
 */
export interface CalendarViewProps {
    events: TimelineEvent[];
    /** The active `--dt-*` theme string */
    style: string;
    height: number | null;
    mode: 'day' | 'week' | 'month';
    mondayStart: boolean;
    locale: string | undefined;
    focusDate: Date;
    oneventclick: (event: TimelineEvent, anchor?: DOMRect) => void;
    /** Already gated by `readOnly` and validated; undefined when creating is off */
    oneventcreate: ((range: {
        start: Date;
        end: Date;
    }) => void) | undefined;
    onexternaldrop: ((info: {
        start: Date;
        dataTransfer: DataTransfer;
    }) => void) | undefined;
    readOnly: boolean;
    visibleHours: [number, number] | undefined;
    selectedEventId: string | null;
}
/** One view registration */
export interface CalendarView {
    id: CalendarViewId;
    /** The view-type name shown in the header pills when a mode has several views */
    label: string;
    /** day, week or month */
    mode: 'day' | 'week' | 'month';
    /**
     * The Svelte component to render. It receives `CalendarViewProps` plus
     * `props`; declare only the ones it uses.
     */
    component: Component<any>;
    /** Extra props passed through to the component */
    props?: Record<string, unknown>;
}
export interface CalendarProps {
    /** Data adapter (required) */
    adapter: CalendarAdapter;
    /** Registered views (default: `defaultViews`) */
    views?: readonly CalendarView[];
    /** Active view ID (defaults to first registered view) */
    view?: CalendarViewId;
    /** CSS theme string (--dt-* inline style) */
    theme?: string;
    /**
     * Options for the smart auto-theme.
     * When theme is `auto` (empty string), the calendar probes the host page
     * and generates matching --dt-* vars automatically.
     *
     * Pass `{ mode, accent, font }` to override individual aspects.
     * Set `autoTheme: false` to disable probing entirely.
     */
    autoTheme?: AutoThemeOptions | false;
    /** Start week on Monday */
    mondayStart?: boolean;
    /** Total height. Use `'auto'` to let content determine height (ideal for Agenda views). */
    height?: number | 'auto';
    /** Border radius in px (default: 12). Set to 0 for no rounding. */
    borderRadius?: number;
    /** Text direction: 'ltr' (default), 'rtl', or 'auto' */
    dir?: 'ltr' | 'rtl' | 'auto';
    /** BCP 47 locale tag (e.g. 'en-US', 'ar-SA') — sets lang and locale for formatting */
    locale?: string;
    /**
     * Per-instance UI label overrides (merged over the global `setLabels()` set).
     * Reactive: changing the prop re-renders all label text, and two calendars
     * on one page can carry different languages.
     */
    labels?: Partial<CalendarLabels>;
    /** Read-only mode: disables drag, resize, empty-slot creation */
    readOnly?: boolean;
    /** Visible hour range: [startHour, endHour). Crops the grid to these hours. */
    visibleHours?: [number, number];
    /** Initial date to focus on (defaults to today) */
    initialDate?: Date;
    /** Drag snap interval in minutes (default: 15) */
    snapInterval?: number;
    /**
     * Minimum width (px) of a day column in planner views (default: 110).
     * Below the resulting total the grid scrolls horizontally. Lower it when
     * the calendar shares its row with a sidebar and the whole week must stay
     * visible without scrolling.
     */
    minColumnWidth?: number;
    /** Show the Day/Week mode pills (default: true) */
    showModePills?: boolean;
    /** Show prev/next/today navigation controls (default: true) */
    showNavigation?: boolean;
    /** Treat all days equally — no past-day dimming or collapsing (default: false) */
    equalDays?: boolean;
    /** Hide date numbers — headers show only day names (Mon, Tue, …). Useful for template/recurring schedules. */
    showDates?: boolean;
    /** ISO weekdays to hide (1=Mon … 7=Sun). E.g. [6, 7] hides weekends. */
    hideDays?: number[];
    /**
     * Controlled current date — drives which date the calendar focuses on.
     * An instant, like `initialDate`: with `timezone` it is read in that zone.
     */
    currentDate?: Date;
    /** Blocked/unavailable time slots — rendered as hatched regions, prevent event creation. */
    blockedSlots?: BlockedSlot[];
    /** Number of days shown in week mode (default: 7). E.g. 3 for a 3-day view, 5 for workweek. */
    days?: number;
    /** Minimum event duration in minutes (enforced during drag-create and click-to-create). */
    minDuration?: number;
    /** Maximum event duration in minutes (enforced during drag-create). */
    maxDuration?: number;
    /** Specific dates to disable (greyed-out, no event creation). */
    disabledDates?: Date[];
    /** Compact mode: use minimal text-row rendering in Agenda views (dot + time + title). */
    compact?: boolean;
    /**
     * Timetable layout: week-agenda days render as side-by-side columns
     * (classic class-schedule grid) instead of a vertical list. Desktop
     * only — mobile keeps the stacked layout. Pairs well with `equalDays`
     * for recurring/template schedules. Overrides `compact` while active
     * (single-line rows truncate at column width).
     */
    columns?: boolean;
    /**
     * Mobile mode.
     * - `'auto'` (default): detect via viewport width (< 768 px)
     * - `true`: always use mobile views
     * - `false`: never use mobile views
     */
    mobile?: 'auto' | boolean;
    /** Custom event rendering snippet */
    event?: Snippet<[TimelineEvent]>;
    /** Content to show when no events are loaded */
    empty?: Snippet;
    /** Custom day header snippet. Receives { date, isToday, dayName }. */
    dayHeader?: Snippet<[{
        date: Date;
        isToday: boolean;
        dayName: string;
    }]>;
    /**
     * Replace the entire header chrome (date label + mode pills + nav arrows).
     * Receives context: { dateLabel, mode, modes, switchMode, prev, next, goToday, isViewOnToday, focusDate }.
     */
    header?: Snippet<[HeaderContext]>;
    /**
     * Replace just the navigation controls (arrows + today button).
     * Receives context: { prev, next, goToday, isViewOnToday, focusDate, mode }.
     */
    navigation?: Snippet<[NavigationContext]>;
    /** `anchor` is the clicked block's viewport rect where a view has one (planner) — for positioning a FloatingPanel. */
    oneventclick?: (event: TimelineEvent, anchor?: DOMRect) => void;
    oneventcreate?: (range: {
        start: Date;
        end: Date;
    }) => void;
    /** An HTML5 drag from outside the calendar dropped on the planner grid
     *  (a class chip, a template): the pointer's time, snapped, as a real
     *  instant — plus the drag's dataTransfer for whatever the source put in. */
    onexternaldrop?: (info: {
        start: Date;
        dataTransfer: DataTransfer;
    }) => void;
    /**
     * An event was dragged or resized. `newStart`/`newEnd` are real instants.
     * Fires after the adapter stored the move, or — when the adapter refuses
     * with a `read-only` error — so the host can store it itself.
     */
    oneventmove?: (event: TimelineEvent, newStart: Date, newEnd: Date) => void;
    /** Called with the active view id — once on mount, then on every change. */
    onviewchange?: (viewId: CalendarViewId) => void;
    /**
     * Called with the focused date — once on mount, then whenever it changes
     * (navigation, scrolling, a tapped day). An instant on the focused day,
     * like `currentDate` takes, so feeding it back is stable. With `timezone`
     * read its date in that zone — `formatInTimeZone(d, timezone, …)` or
     * `toZonedTime(d, timezone)`.
     */
    ondatechange?: (date: Date) => void;
    /** Called when the pointer enters an event (hover). */
    oneventhover?: (event: TimelineEvent) => void;
    /** Called when a day cell is clicked (month grid, agenda day heads). An instant, like `ondatechange`. Default: open that day in a day view. */
    ondayclick?: (date: Date) => void;
    /** Surfaced instead of silent console output when loading or mutations fail. */
    onerror?: (error: Error) => void;
    /**
     * Render the calendar in an IANA timezone (e.g. 'Europe/Warsaw').
     * Events, "now" and day boundaries all shift; ranges passed to
     * oneventcreate/oneventmove convert back to real instants.
     * Default: the viewer's local time.
     */
    timezone?: string;
}
/**
 * The built-in views — the registry a Calendar uses without a `views` prop.
 * Spread it to add your own view and keep these:
 * `views={[...defaultViews, { id: 'day-kanban', ... }]}`.
 * On phones (`mobile: 'auto'`), every view except `*-agenda` and `*-mobile`
 * swaps to the registered `{mode}-mobile` view, when there is one.
 */
export declare const defaultViews: readonly CalendarView[];
declare const Calendar: Component<CalendarProps, {}, "">;
type Calendar = ReturnType<typeof Calendar>;
export default Calendar;
