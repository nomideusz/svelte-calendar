import type { TimelineEvent } from '../../core/types.js';
interface Props {
    /** 'day' renders a single-day column; 'week' the multi-day grid. */
    mode?: 'day' | 'week';
    mondayStart?: boolean;
    locale?: string;
    height?: number | null;
    events?: TimelineEvent[];
    style?: string;
    focusDate?: Date;
    oneventclick?: (event: TimelineEvent) => void;
    oneventcreate?: (range: {
        start: Date;
        end: Date;
    }) => void;
    selectedEventId?: string | null;
    readOnly?: boolean;
    /** Visible hour range [startHour, endHour) */
    visibleHours?: [number, number];
    [key: string]: unknown;
}
declare const PlannerWeek: import("svelte").Component<Props, {}, "">;
type PlannerWeek = ReturnType<typeof PlannerWeek>;
export default PlannerWeek;
