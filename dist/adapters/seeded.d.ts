import type { CalendarAdapter } from './types.js';
import type { TimelineEvent } from '../core/types.js';
/**
 * An adapter that answers its first load synchronously with events the
 * server already had — so the server render carries the rows and the client
 * hydrates the same ones — and every later load, including a refresh(), goes
 * to the real adapter. The seed is meant for the range the page opens on.
 */
export declare function withInitialEvents(adapter: CalendarAdapter, events: TimelineEvent[]): CalendarAdapter;
