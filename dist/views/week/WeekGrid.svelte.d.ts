import type { TimelineEvent } from '../../core/types.js';
interface Props {
    weekOffset?: number;
    mondayStart?: boolean;
    hourHeight?: number;
    dayWidth?: number;
    nowPosition?: number;
    height?: number;
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
    visibleHours?: [number, number];
    [key: string]: unknown;
}
declare const WeekGrid: import("svelte").Component<Props, {}, "">;
type WeekGrid = ReturnType<typeof WeekGrid>;
export default WeekGrid;
