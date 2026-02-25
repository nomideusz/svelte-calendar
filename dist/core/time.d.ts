/** Milliseconds in one day */
export declare const DAY_MS = 86400000;
/** Milliseconds in one hour */
export declare const HOUR_MS = 3600000;
/** Array [0..23] for iterating over hour slots */
export declare const HOURS: readonly number[];
/** Start-of-day timestamp (midnight, local time) */
export declare function sod(ms: number): number;
/**
 * Start-of-week timestamp.
 * @param ms       Any timestamp within the target week
 * @param mondayStart  true → weeks begin Monday; false → Sunday
 */
export declare function startOfWeek(ms: number, mondayStart?: boolean): number;
/** Add `n` days to a timestamp and return the new timestamp */
export declare function addDaysMs(ms: number, n: number): number;
/** Calendar-day difference between two timestamps */
export declare function diffDays(a: number, b: number): number;
/** Zero-pad a number to 2 digits */
export declare function pad(n: number): string;
/**
 * Fractional hours elapsed since midnight for a given timestamp.
 * e.g. 14:30:00 → 14.5
 */
export declare function fractionalHour(ms: number): number;
/**
 * Format hours + minutes from a timestamp: "14:30"
 */
export declare function fmtHM(ms: number): string;
/**
 * Format seconds from a timestamp: ":05"
 */
export declare function fmtS(ms: number): string;
/** Day-of-month number for a timestamp */
export declare function dayNum(ms: number): number;
/** Day-of-week index (0 = Sun … 6 = Sat) */
export declare function dayOfWeek(ms: number): number;
