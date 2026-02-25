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

/** All registered view IDs. Add new ones here as variants are created. */
export type CalendarViewId =
	| 'day-grid'
	| 'day-agenda'
	| 'week-grid'
	| 'week-agenda'
	| 'week-heatmap';

export type ViewGranularity = 'day' | 'week';

export interface ViewStateOptions {
	defaultView?: CalendarViewId;
	mondayStart?: boolean;
}

export interface DateRange {
	start: Date;
	end: Date;
}

export interface ViewState {
	readonly view: CalendarViewId;
	readonly focusDate: Date;
	readonly range: DateRange;
	readonly granularity: ViewGranularity;
	readonly mondayStart: boolean;

	setView(id: CalendarViewId): void;
	setFocusDate(date: Date): void;
	next(): void;
	prev(): void;
	goToday(): void;
}

function granularityFor(view: CalendarViewId): ViewGranularity {
	if (view.startsWith('day')) return 'day';
	return 'week';
}

function computeRange(
	focus: Date,
	granularity: ViewGranularity,
	mondayStart: boolean,
): DateRange {
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

export function createViewState(options: ViewStateOptions = {}): ViewState {
	let view = $state<CalendarViewId>(options.defaultView ?? 'week-grid');
	let focusDate = $state<Date>(new Date());
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

		setView(id: CalendarViewId) {
			view = id;
		},

		setFocusDate(date: Date) {
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
