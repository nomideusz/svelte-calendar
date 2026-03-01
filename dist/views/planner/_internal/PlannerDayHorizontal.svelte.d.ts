import type { TimelineEvent } from '../../../core/types.js';
interface PlannerDayHorizontalProps {
    pastDays?: number;
    futureDays?: number;
    hourWidth?: number;
    nowPosition?: number;
    events?: TimelineEvent[];
    style?: string;
    locale?: string;
    focusDate?: Date;
    oneventclick?: (event: TimelineEvent) => void;
    selectedEventId?: string | null;
    [key: string]: unknown;
}
declare const PlannerDayHorizontal: import("svelte").Component<PlannerDayHorizontalProps, {}, "">;
type PlannerDayHorizontal = ReturnType<typeof PlannerDayHorizontal>;
export default PlannerDayHorizontal;
