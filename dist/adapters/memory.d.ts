/**
 * In-memory adapter — the default for demos and testing.
 *
 * Events are stored in a plain array. No persistence across page loads.
 * Perfect for prototyping and unit tests.
 *
 * Usage:
 *   import { createMemoryAdapter } from './';
 *   const adapter = createMemoryAdapter(initialEvents);
 *   const store = createEventStore(adapter);
 */
import type { TimelineEvent } from '../core/types.js';
import type { CalendarAdapter } from './types.js';
export declare function createMemoryAdapter(initial?: TimelineEvent[]): CalendarAdapter;
