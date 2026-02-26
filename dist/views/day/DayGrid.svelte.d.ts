import type { TimelineEvent } from '../../core/types.js';
interface Props {
    /** Number of past days visible */
    pastDays?: number;
    /** Number of future days visible */
    futureDays?: number;
    /** Pixel width of one hour */
    hourWidth?: number;
    /** Where "now" sits in the viewport (0 = left, 1 = right) */
    nowPosition?: number;
    /** Total height */
    height?: number;
    /** Events to render */
    events?: TimelineEvent[];
    /** Inline style for CSS variable overrides (theme) */
    style?: string;
    /** The date to centre this view on */
    focusDate?: Date;
    /** Locale for labels */
    locale?: string;
    /** Called when the user clicks an event */
    oneventclick?: (event: TimelineEvent) => void;
    /** Called when the user clicks an empty time slot */
    oneventcreate?: (range: {
        start: Date;
        end: Date;
    }) => void;
    /** Currently selected event ID (for highlight) */
    selectedEventId?: string | null;
    /** Start weeks on Monday */
    mondayStart?: boolean;
    /** Read-only mode */
    readOnly?: boolean;
    /** Visible hour range [startHour, endHour) — adjusts night collapse */
    visibleHours?: [number, number];
    [key: string]: unknown;
}
declare const DayGrid: import("svelte").Component<Props, {}, "">;
type DayGrid = ReturnType<typeof DayGrid>;
export default DayGrid;
