/**
 * Locale-aware formatting utilities.
 *
 * All functions accept an optional `locale` string (BCP 47 tag, e.g. 'en-US',
 * 'pl-PL'). When omitted they fall back to `defaultLocale`.
 *
 * For date-fns locale integration later, this module can import from
 * `date-fns/locale/*` and pass to `format()`.
 */
/** Module-level default locale — consumers can override via setDefaultLocale() */
let defaultLocale = 'en-US';
/** Change the default locale for all formatting functions */
export function setDefaultLocale(tag) {
    defaultLocale = tag;
}
/** Get the current default locale */
export function getDefaultLocale() {
    return defaultLocale;
}
/** Format hour index (0-23) as compact 12h label: 12a, 1a … 12p, 1p … */
export function fmtH(h) {
    if (h === 0)
        return '12a';
    if (h === 12)
        return '12p';
    return h < 12 ? h + 'a' : h - 12 + 'p';
}
/** Short weekday name for a timestamp: "Mon", "Tue", etc. */
export function weekdayShort(ms, locale) {
    return new Date(ms).toLocaleDateString(locale ?? defaultLocale, { weekday: 'short' });
}
/** Long weekday name for a timestamp: "Monday", "Tuesday", etc. */
export function weekdayLong(ms, locale) {
    return new Date(ms).toLocaleDateString(locale ?? defaultLocale, { weekday: 'long' });
}
/** Short month name for a timestamp: "Jan", "Feb", etc. */
export function monthShort(ms, locale) {
    return new Date(ms).toLocaleDateString(locale ?? defaultLocale, { month: 'short' });
}
/** Long month name: "January", "February", etc. */
export function monthLong(ms, locale) {
    return new Date(ms).toLocaleDateString(locale ?? defaultLocale, { month: 'long' });
}
/** Short date: "Feb 21" */
export function dateShort(ms, locale) {
    return new Date(ms).toLocaleDateString(locale ?? defaultLocale, {
        month: 'short',
        day: 'numeric',
    });
}
/** Weekday + short date: "Mon, Feb 17" */
export function dateWithWeekday(ms, locale) {
    return new Date(ms).toLocaleDateString(locale ?? defaultLocale, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
}
import { DAY_MS } from './time.js';
/**
 * Format a timestamp as a smart day label:
 *   "Today · Feb 21", "Yesterday · Feb 20", "Mon, Feb 17", etc.
 */
export function fmtDay(ms, todayMs, opts, locale) {
    const loc = locale ?? defaultLocale;
    const short = new Date(ms).toLocaleDateString(loc, { month: 'short', day: 'numeric' });
    if (ms === todayMs)
        return opts?.short ? 'Today' : `Today · ${short}`;
    if (ms === todayMs - DAY_MS)
        return opts?.short ? 'Yesterday' : `Yesterday · ${short}`;
    if (ms === todayMs + DAY_MS)
        return opts?.short ? 'Tomorrow' : `Tomorrow · ${short}`;
    if (opts?.short) {
        return new Date(ms).toLocaleDateString(loc, { weekday: 'short', day: 'numeric' });
    }
    return new Date(ms).toLocaleDateString(loc, { weekday: 'short', month: 'short', day: 'numeric' });
}
/**
 * Format a week range label: "Feb 17 – 23, 2026" or "Jan 27 – Feb 2, 2026"
 */
export function fmtWeekRange(weekStartMs, locale) {
    const loc = locale ?? defaultLocale;
    const s = new Date(weekStartMs);
    const e = new Date(weekStartMs + 6 * DAY_MS);
    const sm = s.toLocaleDateString(loc, { month: 'short' });
    const em = e.toLocaleDateString(loc, { month: 'short' });
    const sy = s.getFullYear();
    const ey = e.getFullYear();
    if (sy !== ey) {
        return `${sm} ${s.getDate()}, ${sy} – ${em} ${e.getDate()}, ${ey}`;
    }
    if (sm !== em) {
        return `${sm} ${s.getDate()} – ${em} ${e.getDate()}, ${ey}`;
    }
    return `${sm} ${s.getDate()} – ${e.getDate()}, ${ey}`;
}
