/** All registered view IDs. Add new ones here as variants are created. */
export type CalendarViewId = 'day-grid' | 'day-agenda' | 'week-grid' | 'week-agenda' | 'week-heatmap';
export type ViewGranularity = 'day' | 'week';
export interface ViewStateOptions {
    defaultView?: CalendarViewId;
    mondayStart?: boolean;
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
    setView(id: CalendarViewId): void;
    setFocusDate(date: Date): void;
    next(): void;
    prev(): void;
    goToday(): void;
}
export declare function createViewState(options?: ViewStateOptions): ViewState;
