import type { TimelineEvent } from '../../core/types.js';
interface Props {
    /** 'day' = single-day timeline rail, 'week' = rolling 7-day view */
    mode?: 'day' | 'week';
    mondayStart?: boolean;
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
    [key: string]: unknown;
}
declare const Agenda: import("svelte").Component<Props, {}, "">;
type Agenda = ReturnType<typeof Agenda>;
export default Agenda;
