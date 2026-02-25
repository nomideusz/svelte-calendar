/**
 * Built-in view IDs. Custom view IDs are also supported — CalendarViewId
 * is typed as `string` so consumers can register any ID.
 */
export type BuiltInViewId = 'day-grid' | 'day-agenda' | 'week-grid' | 'week-agenda' | 'week-heatmap';
/**
 * Any view identifier. Use built-in strings like 'day-grid' or your own
 * custom IDs like 'day-kanban', 'week-resource', etc.
 */
export type CalendarViewId = string;
export type ViewGranularity = 'day' | 'week';
export interface ViewStateOptions {
    defaultView?: CalendarViewId;
    mondayStart?: boolean;
    /** IANA timezone string (e.g. 'America/New_York'). Defaults to local timezone. */
    timezone?: string;
}
export interface DateRange {
    start: Date;
    end: Date;
}
export interface ViewState {
    readonly view: CalendarViewId;
    readonly focusDate: Date;
    readonly range: DateRange;
    readonly granularity: ViewGranularity;
    readonly mondayStart: boolean;
    /** IANA timezone, or undefined for local */
    readonly timezone: string | undefined;
    setView(id: CalendarViewId): void;
    setFocusDate(date: Date): void;
    next(): void;
    prev(): void;
    goToday(): void;
}
export declare function createViewState(options?: ViewStateOptions): ViewState;
