import type { CalendarViewId, ViewState } from '../engine/view-state.svelte.js';
interface ViewOption {
    id: CalendarViewId;
    label: string;
    granularity: 'day' | 'week';
}
interface Props {
    viewState: ViewState;
    /** All registered views */
    views?: ViewOption[];
    /** Locale used for labels */
    locale?: string;
}
declare const Toolbar: import("svelte").Component<Props, {}, "">;
type Toolbar = ReturnType<typeof Toolbar>;
export default Toolbar;
