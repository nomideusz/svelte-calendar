import type { TimelineEvent } from '../../core/types.js';
interface Props {
    events?: TimelineEvent[];
    style?: string;
    height?: number | null;
    locale?: string;
    focusDate?: Date;
    oneventclick?: (event: TimelineEvent) => void;
    selectedEventId?: string | null;
    readOnly?: boolean;
    [key: string]: unknown;
}
declare const MonthGrid: import("svelte").Component<Props, {}, "">;
type MonthGrid = ReturnType<typeof MonthGrid>;
export default MonthGrid;
