/**
 * Locale-aware formatting utilities.
 *
 * All functions accept an optional `locale` string (BCP 47 tag, e.g. 'en-US',
 * 'pl-PL'). When omitted they fall back to `defaultLocale`.
 *
 * For date-fns locale integration later, this module can import from
 * `date-fns/locale/*` and pass to `format()`.
 */
/** Change the default locale for all formatting functions */
export declare function setDefaultLocale(tag: string): void;
/** Get the current default locale */
export declare function getDefaultLocale(): string;
/** Format hour index (0-23) as compact 12h label: 12a, 1a … 12p, 1p … */
export declare function fmtH(h: number): string;
/** Short weekday name for a timestamp: "Mon", "Tue", etc. */
export declare function weekdayShort(ms: number, locale?: string): string;
/** Long weekday name for a timestamp: "Monday", "Tuesday", etc. */
export declare function weekdayLong(ms: number, locale?: string): string;
/** Short month name for a timestamp: "Jan", "Feb", etc. */
export declare function monthShort(ms: number, locale?: string): string;
/** Long month name: "January", "February", etc. */
export declare function monthLong(ms: number, locale?: string): string;
/** Short date: "Feb 21" */
export declare function dateShort(ms: number, locale?: string): string;
/** Weekday + short date: "Mon, Feb 17" */
export declare function dateWithWeekday(ms: number, locale?: string): string;
/**
 * Format a timestamp as a smart day label:
 *   "Today · Feb 21", "Yesterday · Feb 20", "Mon, Feb 17", etc.
 */
export declare function fmtDay(ms: number, todayMs: number, opts?: {
    short?: boolean;
}, locale?: string): string;
/**
 * Format a week range label: "Feb 17 – 23, 2026" or "Jan 27 – Feb 2, 2026"
 */
export declare function fmtWeekRange(weekStartMs: number, locale?: string): string;
