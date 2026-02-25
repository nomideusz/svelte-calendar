// ─── Core barrel export ─────────────────────────────────

// Clock
export { createClock } from './clock.svelte.js';
export type { Clock } from './clock.svelte.js';

// Time constants & math
export {
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
} from './time.js';

// Locale-aware formatting
export {
	setDefaultLocale,
	getDefaultLocale,
	is24HourLocale,
	fmtH,
	weekdayShort,
	weekdayLong,
	monthShort,
	monthLong,
	dateShort,
	dateWithWeekday,
	fmtDay,
	fmtWeekRange,
} from './locale.js';

// Timezone utilities
export {
	toZonedTime,
	fromZonedTime,
	nowInZone,
	formatInTimeZone,
} from './timezone.js';

// Types
export type {
	TimelineEvent,
	WeekTimelineProps,
	DayTimelineProps,
} from './types.js';
export { timeToX } from './types.js';
