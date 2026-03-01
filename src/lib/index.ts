// ─── Primitives ─────────────────────────────────────────
export {
	NowIndicator,
	EventBlock,
	TimeGutter,
	DayHeader,
	EmptySlot,
} from './primitives/index.js';

// ─── Calendar shell ─────────────────────────────────────
export { Calendar } from './calendar/index.js';
export type { CalendarView } from './calendar/index.js';

// ─── Engine (reactive state) ────────────────────────────
export {
	createEventStore,
	createViewState,
	createSelection,
	createDragState,
} from './engine/index.js';
export type {
	EventStore,
	ViewState,
	ViewStateOptions,
	CalendarViewId,
	BuiltInViewId,
	ViewMode,
	Selection,
	DragState,
	DragMode,
	DragPayload,
} from './engine/index.js';

// ─── Adapters ───────────────────────────────────────────
export { createMemoryAdapter, createRestAdapter, createRecurringAdapter } from './adapters/index.js';
export type {
	CalendarAdapter,
	DateRange,
	RestAdapterOptions,
	RecurringEvent,
	RecurringAdapterOptions,
} from './adapters/index.js';

// ─── Core: clock, time, locale, types ───────────────────
export {
	createClock,
	startOfWeek,
	fmtH,
	fmtTime,
	fmtDuration,
	weekdayShort,
	weekdayLong,
	monthShort,
	monthLong,
	dateShort,
	dateWithWeekday,
	fmtDay,
	fmtWeekRange,
	setDefaultLocale,
	getDefaultLocale,
	is24HourLocale,
	defaultLabels,
	setLabels,
	resetLabels,
	getLabels,
	toZonedTime,
	fromZonedTime,
	nowInZone,
	formatInTimeZone,
	generatePalette,
	VIVID_PALETTE,
	isMultiDay,
	isAllDay,
	segmentForDay,
} from './core/index.js';
export type {
	Clock,
	TimelineEvent,
	DaySegment,
	CalendarLabels,
} from './core/index.js';

// ─── Themes ─────────────────────────────────────────────
export { midnight, neutral, presets } from './theme/index.js';
export type { PresetName } from './theme/index.js';
