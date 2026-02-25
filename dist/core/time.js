/**
 * Core time constants and pure date-math utilities.
 *
 * Uses date-fns for reliable calendar operations (DST-safe, tree-shakeable).
 * Re-exports commonly used date-fns functions so consumers have a single import.
 */
import { startOfDay, startOfWeek as dfnsStartOfWeek, addDays, differenceInCalendarDays, getDay, getDate, getHours, getMinutes, getSeconds, } from 'date-fns';
// ─── Constants ──────────────────────────────────────────
/** Milliseconds in one day */
export const DAY_MS = 86_400_000;
/** Milliseconds in one hour */
export const HOUR_MS = 3_600_000;
/** Array [0..23] for iterating over hour slots */
export const HOURS = Array.from({ length: 24 }, (_, i) => i);
// ─── Pure date helpers ──────────────────────────────────
/** Start-of-day timestamp (midnight, local time) */
export function sod(ms) {
    return startOfDay(ms).getTime();
}
/**
 * Start-of-week timestamp.
 * @param ms       Any timestamp within the target week
 * @param mondayStart  true → weeks begin Monday; false → Sunday
 */
export function startOfWeek(ms, mondayStart = true) {
    return dfnsStartOfWeek(ms, { weekStartsOn: mondayStart ? 1 : 0 }).getTime();
}
/** Add `n` days to a timestamp and return the new timestamp */
export function addDaysMs(ms, n) {
    return addDays(ms, n).getTime();
}
/** Calendar-day difference between two timestamps */
export function diffDays(a, b) {
    return differenceInCalendarDays(a, b);
}
/** Zero-pad a number to 2 digits */
export function pad(n) {
    return n < 10 ? '0' + n : '' + n;
}
/**
 * Fractional hours elapsed since midnight for a given timestamp.
 * e.g. 14:30:00 → 14.5
 */
export function fractionalHour(ms) {
    const d = new Date(ms);
    return getHours(d) + getMinutes(d) / 60 + getSeconds(d) / 3600;
}
/**
 * Format hours + minutes from a timestamp: "14:30"
 */
export function fmtHM(ms) {
    const d = new Date(ms);
    return pad(getHours(d)) + ':' + pad(getMinutes(d));
}
/**
 * Format seconds from a timestamp: ":05"
 */
export function fmtS(ms) {
    return ':' + pad(getSeconds(new Date(ms)));
}
/** Day-of-month number for a timestamp */
export function dayNum(ms) {
    return getDate(new Date(ms));
}
/** Day-of-week index (0 = Sun … 6 = Sat) */
export function dayOfWeek(ms) {
    return getDay(new Date(ms));
}
