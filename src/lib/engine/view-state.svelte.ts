/**
 * Reactive view state — tracks which view is active, the current date range,
 * and navigation (prev/next/today).
 *
 * Usage:
 *   const vs = createViewState({ view: 'week-terrain' });
 *   vs.view        — current view id
 *   vs.focusDate   — the center date
 *   vs.range       — { start, end } for the current view window
 *   vs.next()      — advance one period (day/week depending on view)
 *   vs.prev()      — go back one period
 *   vs.goToday()   — jump to today
 */
import { startOfWeek as calcStartOfWeek, addDaysMs, DAY_MS } from '../core/time.js';
import type { DateRange } from '../adapters/types.js';
export type { DateRange };

/**
 * Built-in view IDs. Custom view IDs are also supported — CalendarViewId
 * is typed as `string` so consumers can register any ID.
 */
export type BuiltInViewId =
	| 'day-planner'
	| 'day-agenda'
	| 'week-planner'
	| 'week-agenda';

/**
 * Any view identifier. Use built-in strings like 'day-planner' or your own
 * custom IDs like 'day-kanban', 'week-resource', etc.
 */
export type CalendarViewId = string;

export type ViewMode = 'day' | 'week';

export interface ViewStateOptions {
	view?: CalendarViewId;
	mondayStart?: boolean;
	/** IANA timezone string (e.g. 'America/New_York'). Defaults to local timezone. */
	timezone?: string;
	/** Initial date to focus on (defaults to today). */
	initialDate?: Date;
	/**
	 * Optional resolver for view mode.
	 * Useful for custom IDs that don't follow "day-*" / "week-*" naming.
	 */
	modeForView?: (viewId: CalendarViewId) => ViewMode | undefined;
}


export interface ViewState {
	readonly view: CalendarViewId;
	readonly focusDate: Date;
	readonly range: DateRange;
	readonly mode: ViewMode;
	readonly mondayStart: boolean;
	/** IANA timezone, or undefined for local */
	readonly timezone: string | undefined;

	setView(id: CalendarViewId): void;
	setMondayStart(value: boolean): void;
	setFocusDate(date: Date): void;
	next(): void;
	prev(): void;
	goToday(): void;
}

function inferMode(view: CalendarViewId): ViewMode {
	if (view.startsWith('day')) return 'day';
	return 'week';
}

function computeRange(
	focus: Date,
	mode: ViewMode,
	mondayStart: boolean,
): DateRange {
	if (mode === 'day') {
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
	let view = $state<CalendarViewId>(options.view ?? 'week-planner');
	let focusDate = $state<Date>(options.initialDate ?? new Date());
	let mondayStart = $state(options.mondayStart ?? true);
	const timezone = options.timezone;
	const modeResolver = options.modeForView;

	const mode = $derived(modeResolver?.(view) ?? inferMode(view));
	const range = $derived(computeRange(focusDate, mode, mondayStart));

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
		get mode() {
			return mode;
		},
		get mondayStart() {
			return mondayStart;
		},
		get timezone() {
			return timezone;
		},

		setView(id: CalendarViewId) {
			view = id;
		},

		setMondayStart(value: boolean) {
			mondayStart = value;
		},

		setFocusDate(date: Date) {
			focusDate = date;
		},

		next() {
			const days = mode === 'day' ? 1 : 7;
			focusDate = new Date(addDaysMs(focusDate.getTime(), days));
		},

		prev() {
			const days = mode === 'day' ? -1 : -7;
			focusDate = new Date(addDaysMs(focusDate.getTime(), days));
		},

		goToday() {
			focusDate = new Date();
		},
	};
}
