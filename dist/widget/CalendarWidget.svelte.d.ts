interface Props {
    /** REST API base URL — if provided, fetches events from this endpoint */
    api?: string;
    /** JSON string of events for static/inline data (alternative to api) */
    events?: string;
    /** Theme preset name: auto (default — adapts to the host page), neutral, midnight */
    theme?: string;
    /** Default view ID */
    view?: string;
    /** Calendar height: pixels (e.g. "600") or "auto" */
    height?: string;
    /** BCP 47 locale tag (e.g. 'en-US', 'pl-PL') */
    locale?: string;
    /** Text direction: ltr, rtl, auto */
    dir?: string;
    /** Start week on Monday (default: true) */
    mondaystart?: string;
    /** Custom HTTP headers as JSON string for REST adapter */
    headers?: string;
    /** Read-only mode: "true" disables drag/resize/create */
    readonly?: string;
    /** Show the Day/Week/Month pills (default: true) */
    pills?: string;
    /** Show prev/next/today navigation (default: true) */
    nav?: string;
    /** Mobile mode: "auto" (default), "true", "false" */
    mobile?: string;
    /** Days shown in week mode, e.g. "3" or "5" */
    days?: string;
    /** Compact agenda rendering: "true" */
    compact?: string;
    /** IANA timezone, e.g. "Europe/Warsaw" */
    timezone?: string;
}
declare const CalendarWidget: import("svelte").Component<Props, {}, "">;
type CalendarWidget = ReturnType<typeof CalendarWidget>;
export default CalendarWidget;
