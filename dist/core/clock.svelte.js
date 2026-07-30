/**
 * Reactive clock state factory for Svelte 5 rune-mode.
 *
 * Usage inside a component:
 *   const clock = createClock();
 *   // clock.tick   — current timestamp, updates every second
 *   // clock.today  — start-of-day timestamp, rolls over at midnight
 *   // clock.hm     — "14:30"
 *   // clock.s      — ":05"
 *   // clock.fractionalHour — 14.5
 *
 * Call clock.destroy() in onMount's cleanup (or it auto-cleans via $effect).
 */
import { onMount } from 'svelte';
import { sod, fmtHM, fmtS, fractionalHour } from './time.js';
import { toZonedTime } from './timezone.js';
/**
 * Create a shared reactive clock.
 *
 * Must be called during component initialisation (before first await).
 * Automatically cleans up on unmount via onMount return.
 */
export function createClock(timezone) {
    // With a timezone, ticks are "zoned wall-clock" epoch ms — the same plane
    // the wrapped adapter shifts event Dates into. Views stay zone-agnostic.
    const now = () => (timezone ? toZonedTime(Date.now(), timezone).getTime() : Date.now());
    let tick = $state(now());
    let today = $state(sod(tick));
    let intervalId = null;
    function start() {
        intervalId = setInterval(() => {
            tick = now();
            const sd = sod(tick);
            if (sd !== today)
                today = sd;
        }, 1000);
    }
    function destroy() {
        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
    // Auto-start and auto-cleanup.
    // Outside component initialisation (headless usage, tests) onMount throws —
    // fall back to a static clock; callers may still call destroy().
    try {
        onMount(() => {
            start();
            return destroy;
        });
    }
    catch {
        // lifecycle_outside_component — no interval, clock stays at creation time
    }
    return {
        get tick() { return tick; },
        get today() { return today; },
        get hm() { return fmtHM(tick); },
        get s() { return fmtS(tick); },
        get fractionalHour() { return fractionalHour(tick); },
        destroy,
    };
}
