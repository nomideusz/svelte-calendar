import type { TimelineEvent } from '../../core/types.js';
interface Props {
    mondayStart?: boolean;
    locale?: string;
    height?: number | null;
    events?: TimelineEvent[];
    style?: string;
    focusDate?: Date;
    /** `anchor` is the chip's viewport rect — a host positions a panel beside it. */
    oneventclick?: (event: TimelineEvent, anchor?: DOMRect) => void;
    oneventcreate?: (range: {
        start: Date;
        end: Date;
    }) => void;
    /** An HTML5 drag from outside the calendar dropped on a day. */
    onexternaldrop?: (info: {
        start: Date;
        dataTransfer: DataTransfer;
    }) => void;
    selectedEventId?: string | null;
    readOnly?: boolean;
    /** Visible hour range [startHour, endHour) — start hour seeds empty-cell creation */
    visibleHours?: [number, number];
    [key: string]: unknown;
}
declare const PlannerScroll: import("svelte").Component<Props, {}, "">;
type PlannerScroll = ReturnType<typeof PlannerScroll>;
export default PlannerScroll;
