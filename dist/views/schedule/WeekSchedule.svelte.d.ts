import type { TimelineEvent } from '../../core/types.js';
import type { RecurringEvent } from '../../adapters/recurring.js';
interface Props {
    /** Concrete events (mutually exclusive with `schedule`) */
    events?: TimelineEvent[];
    /** Recurring weekly schedule (mutually exclusive with `events`) */
    schedule?: RecurringEvent[];
    /** CSS theme string */
    theme?: string;
    /** BCP 47 locale */
    locale?: string;
    /** Total height */
    height?: number;
    /** Start week on Monday */
    mondayStart?: boolean;
    /** Read-only mode (default: true for schedule display) */
    readOnly?: boolean;
    /** Visible hour range [startHour, endHour) */
    visibleHours?: [number, number];
    /** Show toolbar */
    showToolbar?: boolean;
    /** Show agenda view toggle */
    showAgenda?: boolean;
    /** Map of category/title to color */
    colorMap?: Record<string, string>;
    /** Auto-assign colors */
    autoColor?: boolean;
    /** Event click handler */
    oneventclick?: (event: TimelineEvent) => void;
    /** Event create handler (only works when readOnly is false) */
    oneventcreate?: (range: {
        start: Date;
        end: Date;
    }) => void;
}
declare const WeekSchedule: import("svelte").Component<Props, {}, "">;
type WeekSchedule = ReturnType<typeof WeekSchedule>;
export default WeekSchedule;
