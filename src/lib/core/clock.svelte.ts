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

export interface Clock {
	/** Current epoch ms, updated every second */
	readonly tick: number;
	/** Start-of-day epoch ms for today */
	readonly today: number;
	/** Formatted hours:minutes — "14:30" */
	readonly hm: string;
	/** Formatted seconds — ":05" */
	readonly s: string;
	/** Fractional hours since midnight — 14.5 */
	readonly fractionalHour: number;
	/** Stop the clock (called automatically on component unmount) */
	destroy: () => void;
}

/**
 * Create a shared reactive clock.
 *
 * Must be called during component initialisation (before first await).
 * Automatically cleans up on unmount via onMount return.
 */
export function createClock(timezone?: string): Clock {
	// With a timezone, ticks are "zoned wall-clock" epoch ms — the same plane
	// the wrapped adapter shifts event Dates into. Views stay zone-agnostic.
	const now = () => (timezone ? toZonedTime(Date.now(), timezone).getTime() : Date.now());
	let tick = $state(now());
	let today = $state(sod(tick));
	let intervalId: ReturnType<typeof setInterval> | null = null;

	function start() {
		intervalId = setInterval(() => {
			tick = now();
			const sd = sod(tick);
			if (sd !== today) today = sd;
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
	} catch {
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
