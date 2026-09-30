/**
 * createAgenda() — headless single-day agenda state.
 *
 * Returns reactive state for rendering a day's events with zero DOM.
 * Lighter than createCalendar: no view-state, drag, or selection engines.
 * Manages its own focus date, loads events from the adapter, and categorises
 * them into past / current / upcoming buckets that update every second.
 *
 * Must be called during component initialisation (Svelte 5 rune scope).
 *
 * @example
 * ```svelte
 * <script>
 *   import { createAgenda, createMemoryAdapter } from '@nomideusz/svelte-calendar';
 *
 *   const adapter = createMemoryAdapter([...]);
 *   const agenda = createAgenda({ adapter });
 * </script>
 *
 * <h2>{agenda.dateLabel}</h2>
 * <button onclick={agenda.prev}>←</button>
 * <button onclick={agenda.next}>→</button>
 *
 * {#each agenda.upcoming as ev}
 *   <div>
 *     <span>{agenda.fmtTime(ev.start)}</span>
 *     <span>{ev.title}</span>
 *     <span>{agenda.eta(ev)}</span>
 *   </div>
 * {/each}
 * ```
 */
import { untrack } from 'svelte';
import { createEventStore } from '../engine/event-store.svelte.js';
import { createClock } from '../core/clock.svelte.js';
import { sod, addDaysMs, isAllDay, isMultiDay, overlapsRange } from '../core/time.js';
import { toZonedTime, wrapAdapterWithTimezone } from '../core/timezone.js';
import { fmtTime as _fmtTime, fmtDuration } from '../core/locale.js';
import { timeUntilMs, progress as _progress, groupIntoSlots } from '../views/shared/format.js';
// ─── Implementation ─────────────────────────────────────
export function createAgenda(options) {
    const { initialDate, locale, lookahead = 7, timezone, } = options;
    const rawAdapter = typeof options.adapter === 'function'
        ? options.adapter
        : () => options.adapter;
    const resolveAdapter = timezone
        ? () => wrapAdapterWithTimezone(rawAdapter(), timezone)
        : rawAdapter;
    /** An instant on the plane the day is drawn on (zoned wall-clock with `timezone`). */
    const plane = (ms) => (timezone ? toZonedTime(ms, timezone).getTime() : ms);
    // One store for the agenda's life: a getter adapter that changes identity
    // reloads it instead of rebuilding it empty (every row blinking out).
    const store = createEventStore(resolveAdapter);
    const clock = createClock(timezone);
    // ── Focus date (reactive, writable) ──
    let focusDayMs = $state(sod(initialDate ? plane(initialDate.getTime()) : clock.tick));
    // ── Load events for focus date range ──
    // Eager initial load for synchronous adapters (the server render holds
    // the rows); the effect's first run then has nothing new to fetch — a
    // seeded adapter would otherwise refetch the seed at once.
    let eagerKey = untrack(() => {
        if (!resolveAdapter().fetchEventsSync)
            return '';
        store.load({ start: new Date(focusDayMs), end: new Date(addDaysMs(focusDayMs, lookahead)) });
        return `${focusDayMs}`;
    });
    $effect(() => {
        rawAdapter(); // a new adapter reloads
        const start = new Date(focusDayMs);
        const end = new Date(addDaysMs(focusDayMs, lookahead));
        const key = `${focusDayMs}`;
        if (key === eagerKey) {
            eagerKey = '';
            return;
        }
        eagerKey = '';
        store.load({ start, end });
    });
    // ── Day derivations ──
    const dayEnd = $derived(addDaysMs(focusDayMs, 1));
    const isToday = $derived(focusDayMs === clock.today);
    const isPast = $derived(focusDayMs < clock.today);
    const isFuture = $derived(focusDayMs > clock.today);
    const dateLabel = $derived(new Date(focusDayMs).toLocaleDateString(locale ?? undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    }));
    const dayEvents = $derived.by(() => {
        return store.events
            .filter((ev) => overlapsRange(ev, new Date(focusDayMs), new Date(dayEnd)))
            .sort((a, b) => a.start.getTime() - b.start.getTime());
    });
    const allDay = $derived(dayEvents.filter((ev) => isAllDay(ev) || isMultiDay(ev)));
    const timed = $derived(dayEvents.filter((ev) => !isAllDay(ev) && !isMultiDay(ev)));
    const categorised = $derived.by(() => {
        const now = clock.tick;
        const past = [];
        const current = [];
        const upcoming = [];
        for (const ev of timed) {
            const s = ev.start.getTime();
            const e = ev.end.getTime();
            if (e <= now)
                past.push(ev);
            else if (s <= now && e > now)
                current.push(ev);
            else
                upcoming.push(ev);
        }
        return { past, current, upcoming, upcomingSlots: groupIntoSlots(upcoming) };
    });
    // ── Navigation ──
    function prev() { focusDayMs = addDaysMs(focusDayMs, -1); }
    function next() { focusDayMs = addDaysMs(focusDayMs, 1); }
    function goToday() { focusDayMs = clock.today; }
    function setDate(date) { focusDayMs = sod(plane(date.getTime())); }
    // ── Format helpers ──
    const fmtTime = (d) => _fmtTime(d, locale);
    const fmtDur = (ev) => fmtDuration(ev.start, ev.end);
    const fmtRange = (ev) => `${_fmtTime(ev.start, locale)} – ${_fmtTime(ev.end, locale)}`;
    const eta = (ev) => timeUntilMs(ev.start.getTime(), clock.tick);
    const progress = (ev) => _progress(ev, clock.tick);
    return {
        // State
        get focusDate() { return new Date(focusDayMs); },
        get focusDayMs() { return focusDayMs; },
        get isToday() { return isToday; },
        get isPast() { return isPast; },
        get isFuture() { return isFuture; },
        get dateLabel() { return dateLabel; },
        get loading() { return store.loading; },
        // Events
        get dayEvents() { return dayEvents; },
        get allDay() { return allDay; },
        get past() { return categorised.past; },
        get current() { return categorised.current; },
        get upcoming() { return categorised.upcoming; },
        get upcomingSlots() { return categorised.upcomingSlots; },
        get count() { return dayEvents.length; },
        // Format helpers
        fmtTime,
        fmtDuration: fmtDur,
        fmtRange,
        eta,
        progress,
        // Navigation
        prev,
        next,
        goToday,
        setDate,
        // Clock
        get now() { return clock.tick; },
        get timeLabel() { return clock.hm; },
        get todayMs() { return clock.today; },
    };
}
