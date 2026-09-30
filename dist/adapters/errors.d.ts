/**
 * The two refusals the calendar tells apart when a write fails.
 *
 * Throw `CalendarReadOnlyError` from an adapter that holds an event but
 * cannot store a change to it: the Calendar keeps the dragged block where it
 * was dropped and hands the move to the host (`oneventmove`), which owns the
 * write. Throw `EventNotFoundError` when an id is not yours: a composite
 * adapter then asks its next child, and a drag of it ends quietly.
 *
 * Plain `Error`s whose message contains "read-only" / "not found" are read
 * the same way, so adapters written before these classes keep working.
 */
export declare class CalendarReadOnlyError extends Error {
    constructor(message?: string);
}
export declare class EventNotFoundError extends Error {
    constructor(id: string);
}
/** Whether an adapter refused a write it could not store. */
export declare function isReadOnlyError(e: unknown): boolean;
/** Whether an adapter answered "not my event". */
export declare function isNotFoundError(e: unknown): boolean;
