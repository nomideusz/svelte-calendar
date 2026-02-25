// ─── Core barrel export ─────────────────────────────────
// Clock
export { createClock } from './clock.svelte.js';
// Time constants & math
export { DAY_MS, HOUR_MS, HOURS, sod, startOfWeek, addDaysMs, diffDays, pad, fractionalHour, fmtHM, fmtS, dayNum, dayOfWeek, } from './time.js';
// Locale-aware formatting
export { setDefaultLocale, getDefaultLocale, fmtH, weekdayShort, weekdayLong, monthShort, monthLong, dateShort, dateWithWeekday, fmtDay, fmtWeekRange, } from './locale.js';
export { timeToX } from './types.js';
