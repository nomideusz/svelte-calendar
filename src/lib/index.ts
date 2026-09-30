// ─── Primitives ─────────────────────────────────────────
export {
	NowIndicator,
	EventBlock,
	TimeGutter,
	DayHeader,
	EmptySlot,
	FloatingPanel,
} from './primitives/index.js';
export type { FloatingPanelAnchor, FloatingPanelProps } from './primitives/index.js';


// ─── Calendar shell ─────────────────────────────────────
export { Calendar, defaultViews } from './calendar/index.js';
export type { CalendarView, CalendarViewProps, CalendarProps } from './calendar/index.js';
// Raw view components — register them under your own ids, or compose your
// own shell around the engine. They read the Calendar's context.
export { Planner, PlannerScroll, Agenda, Mobile, MonthGrid } from './views/index.js';
// For custom views: the running Calendar's engines, config and labels.
export { useCalendarContext } from './views/shared/context.svelte.js';
export type { CalendarContext } from './views/shared/context.svelte.js';

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
	// Renamed export: the bare name `Selection` shadows the DOM global.
	Selection as CalendarSelection,
	DragState,
	DragMode,
	DragPayload,
} from './engine/index.js';

// ─── Adapters ───────────────────────────────────────────
export { createMemoryAdapter, createRestAdapter, createRecurringAdapter, createMappedAdapter, createCompositeAdapter, createJmapAdapter, withInitialEvents } from './adapters/index.js';
export { CalendarReadOnlyError, EventNotFoundError, isReadOnlyError, isNotFoundError } from './adapters/index.js';
export type {
	CalendarAdapter,
	WritableCalendarAdapter,
	DateRange,
	MemoryAdapterOptions,
	RestAdapterOptions,
	RecurringEvent,
	RecurringAdapterOptions,
	FieldMapping,
	MappedAdapterOptions,
	MutationHandler,
	CompositeAdapterOptions,
	JmapClient,
	JmapCalendarAdapterOptions,
} from './adapters/index.js';

// ─── Core: clock, time, locale, types ───────────────────
export {
	createClock,
	sod,
	startOfWeek,
	addDaysMs,
	diffDays,
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
	extractAccent,
	VIVID_PALETTE,
	isMultiDay,
	isAllDay,
	segmentForDay,
} from './core/index.js';
export type {
	Clock,
	TimelineEvent,
	BlockedSlot,
	DaySegment,
	CalendarLabels,
	EventStatus,
} from './core/index.js';

// ─── Themes ─────────────────────────────────────────────
export { auto, neutral, midnight, presets } from './theme/index.js';
export { probeHostTheme, observeHostTheme } from './theme/index.js';
export { wrapAdapterWithTimezone } from './core/timezone.js';
export type { PresetName, AutoThemeOptions } from './theme/index.js';

// ─── Headless API ───────────────────────────────────────
export { createCalendar, createAgenda, createRangeAgenda } from './headless/index.js';
export type {
	HeadlessCalendarOptions,
	HeadlessCalendar,
	HeadlessDay,
	HeadlessWeek,
	TodayQueue,
	HeaderContext,
	NavigationContext,
	AgendaOptions,
	HeadlessAgenda,
	RangeAgendaOptions,
	RangeAgendaDay,
	HeadlessRangeAgenda,
	TimeSlot,
} from './headless/index.js';

// ─── Text fitting (pretext) ─────────────────────────────
export { fits, lineCount, textHeight, textWidth, pickFit, fontOf, fitLabel, fitParts, breakLines, typeset } from './text-fit.js';
export type { ChipPart, TextLayoutOptions } from './text-fit.js';
