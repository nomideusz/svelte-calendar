// ─── Views ──────────────────────────────────────────────
export {
	DayGrid,
	DayTimeline,
	WeekGrid,
	WeekHeatmap,
	Agenda,
	Settings,
} from './views/index.js';
export type { SettingsField } from './views/index.js';

// ─── Primitives ─────────────────────────────────────────
export {
	NowIndicator,
	EventBlock,
	TimeGutter,
	DayHeader,
	EmptySlot,
} from './primitives/index.js';

// ─── Calendar shell ─────────────────────────────────────
export { Calendar, Toolbar } from './calendar/index.js';
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
	ViewGranularity,
	ViewDateRange,
	Selection,
	DragState,
	DragMode,
	DragPayload,
} from './engine/index.js';

// ─── Adapters ───────────────────────────────────────────
export { createMemoryAdapter, createRestAdapter } from './adapters/index.js';
export type { CalendarAdapter, DateRange, RestAdapterOptions } from './adapters/index.js';

// ─── Core: clock, time, locale, types ───────────────────
export {
	createClock,
	DAY_MS,
	HOUR_MS,
	HOURS,
	sod,
	startOfWeek,
	addDaysMs,
	diffDays,
	pad,
	fractionalHour,
	fmtHM,
	fmtS,
	dayNum,
	dayOfWeek,
	fmtH,
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
	timeToX,
	toZonedTime,
	fromZonedTime,
	nowInZone,
	formatInTimeZone,
} from './core/index.js';
export type {
	Clock,
	TimelineEvent,
	WeekTimelineProps,
	DayTimelineProps,
} from './core/index.js';

// ─── Themes ─────────────────────────────────────────────
export { midnight, parchment, indigo, neutral, bare, presets, stageBg } from './theme/index.js';
export type { PresetName } from './theme/index.js';
