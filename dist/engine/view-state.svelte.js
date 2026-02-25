/**
 * Reactive view state — tracks which view is active, the current date range,
 * and navigation (prev/next/today).
 *
 * Usage:
 *   const vs = createViewState({ defaultView: 'week-terrain' });
 *   vs.view        — current view id
 *   vs.focusDate   — the center date
 *   vs.range       — { start, end } for the current view window
 *   vs.next()      — advance one period (day/week depending on view)
 *   vs.prev()      — go back one period
 *   vs.goToday()   — jump to today
 */
import { startOfWeek as calcStartOfWeek, addDaysMs, DAY_MS } from '../core/time.js';
function granularityFor(view) {
    if (view.startsWith('day'))
        return 'day';
    return 'week';
}
function computeRange(focus, granularity, mondayStart) {
    if (granularity === 'day') {
        const start = new Date(focus);
        start.setHours(0, 0, 0, 0);
        const end = new Date(start.getTime() + DAY_MS);
        return { start, end };
    }
    // week
    const ws = calcStartOfWeek(focus.getTime(), mondayStart);
    return {
        start: new Date(ws),
        end: new Date(addDaysMs(ws, 7)),
    };
}
export function createViewState(options = {}) {
    let view = $state(options.defaultView ?? 'week-grid');
    let focusDate = $state(new Date());
    let mondayStart = $state(options.mondayStart ?? true);
    const granularity = $derived(granularityFor(view));
    const range = $derived(computeRange(focusDate, granularity, mondayStart));
    return {
        get view() {
            return view;
        },
        get focusDate() {
            return focusDate;
        },
        get range() {
            return range;
        },
        get granularity() {
            return granularity;
        },
        get mondayStart() {
            return mondayStart;
        },
        setView(id) {
            view = id;
        },
        setFocusDate(date) {
            focusDate = date;
        },
        next() {
            const days = granularity === 'day' ? 1 : 7;
            focusDate = new Date(addDaysMs(focusDate.getTime(), days));
        },
        prev() {
            const days = granularity === 'day' ? -1 : -7;
            focusDate = new Date(addDaysMs(focusDate.getTime(), days));
        },
        goToday() {
            focusDate = new Date();
        },
    };
}
