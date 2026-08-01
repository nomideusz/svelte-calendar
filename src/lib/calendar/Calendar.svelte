<!--
  Calendar — the unified orchestrator.

  Brings together: adapter → event store → view state + selection → active view.
  Provides context so any descendant view can read the store/state via getContext().

  Usage (minimal):
    <Calendar adapter={myAdapter} theme={neutral} />

  Usage (full control):
    <Calendar
      adapter={myAdapter}
      view="week-planner"
      theme={midnight}
      height={600}
      oneventclick={handleClick}
      oneventcreate={handleCreate}
    />
-->
<script lang="ts">
	import { setContext, untrack, type Component, type Snippet } from 'svelte';
	import type { CalendarAdapter } from '../adapters/types.js';
	import type { CalendarViewId } from '../engine/view-state.svelte.js';
	import { createEventStore, type EventStore } from '../engine/event-store.svelte.js';
	import { createViewState, type ViewState } from '../engine/view-state.svelte.js';
	import { createSelection, type Selection } from '../engine/selection.svelte.js';
	import { createDragState, type DragState } from '../engine/drag.svelte.js';
	import { onMount } from 'svelte';
	import type { TimelineEvent, BlockedSlot } from '../core/types.js';
	import { getLabels, fmtWeekRange, type CalendarLabels } from '../core/locale.js';
	import { auto } from '../theme/presets.js';
	import { probeHostTheme, observeHostTheme } from '../theme/auto.js';
	import type { AutoThemeOptions } from '../theme/auto.js';
	import Planner from '../views/planner/Planner.svelte';
	import Agenda from '../views/agenda/Agenda.svelte';
	import Mobile from '../views/mobile/Mobile.svelte';
	import MonthGrid from '../views/month/MonthGrid.svelte';
	import { wrapAdapterWithTimezone, toZonedTime, fromZonedTime } from '../core/timezone.js';

	/** Breakpoint (px) at which auto-mobile activates */
	const MOBILE_BREAKPOINT = 768;

	/** One view registration */
	export interface CalendarView {
		id: CalendarViewId;
		label: string;
		/** day, week or month */
		mode: 'day' | 'week' | 'month';
		/** The Svelte component to render */
		component: Component<Record<string, unknown>>;
		/** Extra props to pass through (e.g. hourHeight, specialized settings) */
		props?: Record<string, unknown>;
	}

	interface Props {
		/** Data adapter (required) */
		adapter: CalendarAdapter;
		/** Registered views */
		views?: CalendarView[];
		/** Active view ID (defaults to first registered view) */
		view?: CalendarViewId;
		/** CSS theme string (--dt-* inline style) */
		theme?: string;
		/**
		 * Options for the smart auto-theme.
		 * When theme is `auto` (empty string), the calendar probes the host page
		 * and generates matching --dt-* vars automatically.
		 *
		 * Pass `{ mode, accent, font }` to override individual aspects.
		 * Set `autoTheme: false` to disable probing entirely.
		 */
		autoTheme?: AutoThemeOptions | false;
		/** Start week on Monday */
		mondayStart?: boolean;
		/** Total height. Use `'auto'` to let content determine height (ideal for Agenda views). */
		height?: number | 'auto';
		/** Border radius in px (default: 12). Set to 0 for no rounding. */
		borderRadius?: number;
		/** Text direction: 'ltr' (default), 'rtl', or 'auto' */
		dir?: 'ltr' | 'rtl' | 'auto';
		/** BCP 47 locale tag (e.g. 'en-US', 'ar-SA') — sets lang and locale for formatting */
		locale?: string;
		/**
		 * Per-instance UI label overrides (merged over the global `setLabels()` set).
		 * Reactive: changing the prop re-renders all label text, and two calendars
		 * on one page can carry different languages.
		 */
		labels?: Partial<CalendarLabels>;
		/** Read-only mode: disables drag, resize, empty-slot creation */
		readOnly?: boolean;
		/** Visible hour range: [startHour, endHour). Crops the grid to these hours. */
		visibleHours?: [number, number];
		/** Initial date to focus on (defaults to today) */
		initialDate?: Date;
		/** Drag snap interval in minutes (default: 15) */
		snapInterval?: number;
		/** Show the Day/Week mode pills (default: true) */
		showModePills?: boolean;
		/** Show prev/next/today navigation controls (default: true) */
		showNavigation?: boolean;
		/** Treat all days equally — no past-day dimming or collapsing (default: false) */
		equalDays?: boolean;
		/** Hide date numbers — headers show only day names (Mon, Tue, …). Useful for template/recurring schedules. */
		showDates?: boolean;
		/** ISO weekdays to hide (1=Mon … 7=Sun). E.g. [6, 7] hides weekends. */
		hideDays?: number[];
		/** Controlled current date — drives which date the calendar focuses on. */
		currentDate?: Date;
		/** Blocked/unavailable time slots — rendered as hatched regions, prevent event creation. */
		blockedSlots?: BlockedSlot[];
		/** Number of days shown in week mode (default: 7). E.g. 3 for a 3-day view, 5 for workweek. */
		days?: number;
		/** Minimum event duration in minutes (enforced during drag-create and click-to-create). */
		minDuration?: number;
		/** Maximum event duration in minutes (enforced during drag-create). */
		maxDuration?: number;
		/** Specific dates to disable (greyed-out, no event creation). */
		disabledDates?: Date[];
		/** Compact mode: use minimal text-row rendering in Agenda views (dot + time + title). */
		compact?: boolean;
		/**
		 * Timetable layout: week-agenda days render as side-by-side columns
		 * (classic class-schedule grid) instead of a vertical list. Desktop
		 * only — mobile keeps the stacked layout. Pairs well with `equalDays`
		 * for recurring/template schedules. Overrides `compact` while active
		 * (single-line rows truncate at column width).
		 */
		columns?: boolean;
		/**
		 * Mobile mode.
		 * - `'auto'` (default): detect via viewport width (< 768 px)
		 * - `true`: always use mobile views
		 * - `false`: never use mobile views
		 */
		mobile?: 'auto' | boolean;

		// ── Snippets ──
		/** Custom event rendering snippet */
		event?: Snippet<[TimelineEvent]>;
		/** Content to show when no events are loaded */
		empty?: Snippet;
		/** Custom day header snippet. Receives { date, isToday, dayName }. */
		dayHeader?: Snippet<[{ date: Date; isToday: boolean; dayName: string }]>;
		/**
		 * Replace the entire header chrome (date label + mode pills + nav arrows).
		 * Receives context: { dateLabel, mode, modes, switchMode, prev, next, goToday, isViewOnToday, focusDate }.
		 */
		header?: Snippet<[import('../headless/types.js').HeaderContext]>;
		/**
		 * Replace just the navigation controls (arrows + today button).
		 * Receives context: { prev, next, goToday, isViewOnToday, focusDate, mode }.
		 */
		navigation?: Snippet<[import('../headless/types.js').NavigationContext]>;

		// ── Callbacks ──
		oneventclick?: (event: TimelineEvent) => void;
		oneventcreate?: (range: { start: Date; end: Date }) => void;
		oneventmove?: (event: TimelineEvent, newStart: Date, newEnd: Date) => void;
		onviewchange?: (viewId: CalendarViewId) => void;
		/** Called when the focused date changes (navigation, drag-scroll, etc.) */
		ondatechange?: (date: Date) => void;
		/** Called when the pointer enters an event (hover). */
		oneventhover?: (event: TimelineEvent) => void;
		/** Called when a day cell is clicked (month grid; more views over time). */
		ondayclick?: (date: Date) => void;
		/** Surfaced instead of silent console output when loading or mutations fail. */
		onerror?: (error: Error) => void;
		/**
		 * Render the calendar in an IANA timezone (e.g. 'Europe/Warsaw').
		 * Events, "now" and day boundaries all shift; ranges passed to
		 * oneventcreate/oneventmove convert back to real instants.
		 * Default: the viewer's local time.
		 */
		timezone?: string;
	}

	// ── Built-in views (used when no custom views are provided) ──
	const DEFAULT_VIEWS: CalendarView[] = [
		{ id: 'day-planner',  label: 'Planner', mode: 'day',  component: Planner },
		{ id: 'week-planner', label: 'Planner', mode: 'week', component: Planner },
		{ id: 'day-agenda',   label: 'Agenda',  mode: 'day',  component: Agenda },
		{ id: 'week-agenda',  label: 'Agenda',  mode: 'week', component: Agenda },
		{ id: 'day-mobile',   label: 'Mobile',  mode: 'day',  component: Mobile },
		{ id: 'week-mobile',  label: 'Mobile',  mode: 'week', component: Mobile },
		{ id: 'month-grid',   label: 'Month',   mode: 'month', component: MonthGrid },
	];

	let {
		adapter,
		views = DEFAULT_VIEWS,
		view: activeViewId,
		theme = auto,
		autoTheme,
		mondayStart = true,
		height: heightProp = 600,
		borderRadius = 12,
		dir,
		locale,
		labels: labelsProp,
		readOnly = false,
		visibleHours,
		initialDate,
		snapInterval = 15,
		showModePills = true,
		showNavigation = true,
		equalDays = false,
		showDates = true,
		hideDays,
		currentDate,
		blockedSlots,
		days,
		minDuration,
		maxDuration,
		disabledDates,
		compact = false,
		columns = false,
		mobile: mobileProp = 'auto',
		event: eventSnippet,
		empty: emptySnippet,
		dayHeader: dayHeaderSnippet,
		header: headerSnippet,
		navigation: navigationSnippet,
		oneventclick,
		oneventcreate,
		oneventmove,
		onviewchange,
		ondatechange,
		oneventhover,
		ondayclick,
		onerror,
		timezone,
	}: Props = $props();

	// In readOnly mode, suppress mutation callbacks. With a timezone, the
	// drag plane is zoned wall-clock — hosts always receive real instants.
	const unzone = (d: Date) => (timezone ? fromZonedTime(d, timezone) : d);
	const effectiveCreate = $derived(
		readOnly || !oneventcreate
			? undefined
			: (range: { start: Date; end: Date }) =>
					oneventcreate({ start: unzone(range.start), end: unzone(range.end) }),
	);
	const effectiveMove = $derived(
		readOnly || !oneventmove
			? undefined
			: (ev: TimelineEvent, start: Date, end: Date) => oneventmove(ev, unzone(start), unzone(end)),
	);

	// Clicking an event selects it (highlight via selectedEventId) and then
	// notifies the host — selection used to be created but never driven.
	function handleEventClick(ev: TimelineEvent) {
		selection.select(ev.id);
		oneventclick?.(ev);
	}

	// ── Mobile detection (container-based, not viewport) ──
	// Seeded from viewport width so the first client paint doesn't flash the
	// desktop chrome on phones; the ResizeObserver measurement takes over on mount.
	let containerWidth = $state(
		typeof window !== 'undefined' &&
			window.matchMedia?.(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches
			? window.innerWidth
			: 0,
	);
	const isMobileContainer = $derived(containerWidth > 0 && containerWidth < MOBILE_BREAKPOINT);

	const useMobile = $derived(
		mobileProp === 'auto' ? isMobileContainer : Boolean(mobileProp)
	);

	// Below this container width the mobile header can't fit pills + nav + a
	// readable date label on one row, so the label moves to its own row.
	const HEADER_STACK_BREAKPOINT = 520;
	const stackHeader = $derived(
		useMobile && containerWidth > 0 && containerWidth < HEADER_STACK_BREAKPOINT,
	);

	// ── Smart auto-theme ──
	// When theme is empty (auto preset) and autoTheme is not false,
	// probe the host page on mount and reactively watch for host theme changes.
	let calEl: HTMLElement | undefined = $state();
	let probedTheme = $state('');
	// Only delay rendering when auto-probe is actually needed
	const needsProbe = $derived(theme === auto && autoTheme !== false);

	onMount(() => {
		if (!calEl) return;

		// Measure container width for mobile detection
		containerWidth = calEl.clientWidth;
		const ro = new ResizeObserver((entries) => {
			containerWidth = Math.round(entries[0].contentRect.width);
		});
		ro.observe(calEl);

		// Only probe theme when using the auto preset
		if (!needsProbe) return () => ro.disconnect();

		const opts: AutoThemeOptions = typeof autoTheme === 'object' ? autoTheme : {};
		const stopTheme = observeHostTheme(calEl, (vars) => {
			probedTheme = vars;
		}, opts);
		return () => { ro.disconnect(); stopTheme?.(); };
	});

	/** Effective theme: user-provided takes priority, otherwise probed auto. */
	const effectiveTheme = $derived(theme === auto && autoTheme !== false ? probedTheme : theme);

	// ── Create reactive state ──
	const effectiveAdapter = $derived(
		timezone ? wrapAdapterWithTimezone(adapter, timezone) : adapter,
	);
	const store: EventStore = $derived(createEventStore(effectiveAdapter));
	const viewState: ViewState = createViewState(untrack(() => ({
		view: activeViewId ?? views[0]?.id,
		mondayStart,
		// Focus lives on the zoned plane too — day boundaries follow the zone.
		initialDate: initialDate && timezone ? toZonedTime(initialDate, timezone) : initialDate,
		dayCount: days,
		timezone,
		modeForView: (viewId) => views.find((v) => v.id === viewId)?.mode,
	})));
	const selection: Selection = createSelection();
	const drag: DragState = createDragState();

	// ── Drag commit handler ──
	// Views call this on pointer-up to process drag results.
	async function commitDrag(): Promise<void> {
		if (readOnly) { drag.cancel(); return; }
		const mode = drag.mode;
		const payload = drag.commit();
		if (!payload) return;

		let { start, end } = payload;

		// Enforce min/max duration for create and resize
		if (mode === 'create' || mode === 'resize-start' || mode === 'resize-end') {
			// Defensive floor: never accept a zero/negative duration, even when
			// minDuration is unset (views clamp, but the engine must hold alone).
			if (end.getTime() <= start.getTime()) {
				const floorMs = Math.max(1, snapInterval) * 60_000;
				if (mode === 'resize-start') start = new Date(end.getTime() - floorMs);
				else end = new Date(start.getTime() + floorMs);
			}
			const durationMs = end.getTime() - start.getTime();
			const durationMin = durationMs / 60_000;
			if (minDuration && durationMin < minDuration) {
				if (mode === 'resize-start') {
					start = new Date(end.getTime() - minDuration * 60_000);
				} else {
					end = new Date(start.getTime() + minDuration * 60_000);
				}
			}
			if (maxDuration && durationMin > maxDuration) {
				if (mode === 'resize-start') {
					start = new Date(end.getTime() - maxDuration * 60_000);
				} else {
					end = new Date(start.getTime() + maxDuration * 60_000);
				}
			}
		}

		// Reject if target lands on a disabled date
		if (disabledDates?.length) {
			const startDay = new Date(start); startDay.setHours(0, 0, 0, 0);
			const endDay = new Date(end.getTime() - 1); endDay.setHours(0, 0, 0, 0);
			for (const dd of disabledDates) {
				const dt = new Date(dd); dt.setHours(0, 0, 0, 0);
				const ts = dt.getTime();
				if (ts >= startDay.getTime() && ts <= endDay.getTime()) return;
			}
		}

		// Reject if target overlaps a blocked slot
		if (blockedSlots?.length) {
			const startH = start.getHours() + start.getMinutes() / 60;
			const endH = end.getHours() + end.getMinutes() / 60 + (end.getDate() !== start.getDate() ? 24 : 0);
			const jsDay = start.getDay();
			const isoDay = jsDay === 0 ? 7 : jsDay;
			for (const slot of blockedSlots) {
				if (slot.day && slot.day !== isoDay) continue;
				if (startH < slot.end && endH > slot.start) return;
			}
		}

		if ((mode === 'move' || mode === 'resize-start' || mode === 'resize-end') && payload.eventId) {
			try {
				await store.move(payload.eventId, start, end);
				const ev = store.byId(payload.eventId);
				if (ev) effectiveMove?.(ev, start, end);
			} catch (e) {
				const msg = e instanceof Error ? e.message : '';
				// Read-only adapter: the store can't persist, but the HOST still
				// gets the callback — it owns persistence (e.g. scheduler RPC) and
				// refetches. Missing event stays silent; real failures surface.
				if (msg.includes('read-only')) {
					const ev = store.byId(payload.eventId);
					if (ev) effectiveMove?.(ev, start, end);
				} else if (!msg.includes('not found')) {
					if (onerror) onerror(e instanceof Error ? e : new Error(String(e)));
					else console.warn('[calendar] drag commit failed:', e);
				}
			}
		} else if (mode === 'create') {
			effectiveCreate?.({ start, end });
		}
	}

	// ── Load range signal ──
	// Views can write a wider range here to override the default viewState.range.
	// This lets infinite-scroll views (PlannerWeek) declare their
	// buffer needs without directly calling store.load().
	let viewLoadRange = $state<{ start: Date; end: Date } | null>(null);

	// ── Single context object ──
	// All view state is exposed through one context key with reactive getters.
	// Views read this via useCalendarContext() from views/shared/context.svelte.ts.
	setContext('calendar', {
		// Engine objects (hold $state internally)
		get store() { return store; },
		viewState,
		selection,
		drag,
		commitDrag,

		// Callbacks
		get oneventclick() { return handleEventClick; },
		get oneventcreate() { return effectiveCreate; },
		get oneventmove() { return effectiveMove; },
		get oneventhover() { return oneventhover; },
		get ondayclick() { return ondayclick ?? defaultDayClick; },
		get timezone() { return timezone; },

		// Config (reactive via getters)
		get readOnly() { return readOnly; },
		get visibleHours() { return visibleHours; },
		get snapInterval() { return snapInterval; },
		get eventSnippet() { return eventSnippet; },
		get emptySnippet() { return emptySnippet; },
		get equalDays() { return equalDays; },
		get showDates() { return showDates; },
		get hideDays() { return hideDays; },
		get blockedSlots() { return blockedSlots; },
		get dayHeaderSnippet() { return dayHeaderSnippet; },
		get minDuration() { return minDuration; },
		get maxDuration() { return maxDuration; },
		get disabledDates() { return disabledDates; },
		get mobile() { return useMobile; },
		get autoHeight() { return heightProp === 'auto'; },
		get compact() { return compact; },
		get columns() { return columns; },
		get labels() { return mergedLabels; },

		// Load range (read/write)
		get loadRange() { return viewLoadRange; },
		setLoadRange(range: { start: Date; end: Date } | null) { viewLoadRange = range; },
	});

	// ── Load events when effective range changes ──
	$effect(() => {
		const range = viewLoadRange ?? viewState.range;
		store.load({ start: range.start, end: range.end });
	});
	// Eager initial load — $effect runs after paint, but for sync adapters
	// (memory, recurring) this resolves in the same microtask.
	untrack(() => store.load({ start: viewState.range.start, end: viewState.range.end }));

	// Keep active view in sync when external view prop changes after mount.
	$effect(() => {
		if (activeViewId) viewState.setView(activeViewId);
	});

	// Sync controlled currentDate prop → viewState
	$effect(() => {
		if (currentDate) viewState.setFocusDate(currentDate);
	});

	// Sync days prop → viewState.dayCount
	$effect(() => {
		if (days !== undefined && viewState.dayCount !== days) viewState.setDayCount(days);
	});

	// Notify host when focusDate changes
	$effect(() => {
		const d = viewState.focusDate;
		ondatechange?.(d);
	});

	// Keep view state's week-start rule in sync with incoming prop changes.
	$effect(() => {
		if (viewState.mondayStart !== mondayStart) {
			viewState.setMondayStart(mondayStart);
		}
	});

	// Notify host when active view changes (e.g. via mode toggles).
	$effect(() => {
		onviewchange?.(viewState.view);
	});

	// Surface adapter failures — store.error was previously write-only.
	$effect(() => {
		if (store.error && onerror) onerror(new Error(store.error));
	});


	// ── Resolve active view ──
	// When mobile is active, Planner views get remapped to Mobile variants.
	// Agenda views stay as Agenda — they're already list-based and will adapt
	// via the 'calendar:mobile' context flag.
	const resolvedView = $derived.by(() => {
		const requested = views.find((v) => v.id === viewState.view) ?? views[0];
		if (!useMobile || !requested) return requested;
		// Already a mobile view? Keep it.
		if (requested.id.endsWith('-mobile')) return requested;
		// Agenda views: keep as-is (they adapt internally via mobile context).
		if (requested.label === 'Agenda') return requested;
		// Planner / other views: remap to mobile variant with the same mode.
		const mobileVariant = views.find(
			(v) => v.id === `${requested.mode}-mobile`
		);
		return mobileVariant ?? requested;
	});

	// Backward-compat alias used in the template.
	const activeView = $derived(resolvedView);

	// Non-mobile views for mode pills (exclude mobile entries).
	const desktopViews = $derived(views.filter((v) => !v.id.endsWith('-mobile')));

	// ── Date label (always visible, centered over views) ──
	const dateLabel = $derived.by(() => {
		if (!showDates) {
			return ''; // the host owns date display; views have their own day headers
		}
		if (viewState.mode === 'day') {
			return viewState.focusDate.toLocaleDateString(locale, {
				weekday: 'long',
				month: 'short',
				day: 'numeric',
			});
		}
		if (viewState.mode === 'week') {
			// The actual visible span — respects custom day counts (3/5-day views).
			return fmtWeekRange(
				viewState.range.start.getTime(),
				locale,
				viewState.range.end.getTime() - 1,
			);
		}
		return viewState.focusDate.toLocaleDateString(locale, {
			month: 'long',
			year: 'numeric',
		});
	});

	// Which modes are available?
	const modes = $derived.by(() => {
		const g = new Set(desktopViews.map((v) => v.mode));
		return (['day', 'week', 'month'] as const).filter((key) => g.has(key));
	});

	// Per-instance labels: prop overrides merged over the global set, memoized so
	// views reading ctx.labels per-render don't allocate a fresh object each access.
	const mergedLabels = $derived(
		labelsProp ? { ...getLabels(), ...labelsProp } : getLabels(),
	);
	const L = $derived(mergedLabels);

	// Remember the last non-month view label so Month → Week round-trips
	// restore the user's chosen view type (Agenda used to downgrade to Planner).
	let lastViewLabel = $state<string | undefined>(undefined);
	$effect(() => {
		const current = views.find((v) => v.id === viewState.view);
		if (current && current.mode !== 'month') lastViewLabel = current.label;
	});

	/** Switch to a different mode (day/week/month), preserving the current view label. */
	function switchMode(g: 'day' | 'week' | 'month') {
		const currentView = desktopViews.find((v) => v.id === viewState.view) ?? activeView;
		const preferredLabel =
			currentView?.mode === 'month' ? (lastViewLabel ?? currentView?.label) : currentView?.label;
		const match = desktopViews.find((v) => v.mode === g && v.label === preferredLabel);
		const fallback = desktopViews.find((v) => v.mode === g);
		const target = match ?? fallback;
		if (target) viewState.setView(target.id);
	}

	// ── View-type switcher (Planner ↔ Agenda) ──
	// Distinct labels registered for the current mode; when there's more than
	// one, the header shows a second pill group to switch between them.
	const labelsForMode = $derived.by(() => {
		const seen: string[] = [];
		for (const v of desktopViews) {
			if (v.mode === viewState.mode && !seen.includes(v.label)) seen.push(v.label);
		}
		return seen;
	});

	function switchLabel(label: string) {
		const target = desktopViews.find((v) => v.mode === viewState.mode && v.label === label);
		if (target) viewState.setView(target.id);
	}

	// Default month → day drill-down: when the host doesn't wire ondayclick,
	// clicking a month cell (or its "+N more") focuses that date in a day view,
	// so the month grid is usable out of the box.
	const defaultDayClick = $derived.by(() => {
		const target =
			desktopViews.find((v) => v.mode === 'day' && v.label === lastViewLabel) ??
			desktopViews.find((v) => v.mode === 'day');
		if (!target) return undefined;
		return (date: Date) => {
			viewState.setFocusDate(date);
			viewState.setView(target.id);
		};
	});

	/** True when the current view range already includes today. */
	const viewIncludesToday = $derived.by(() => {
		const now = new Date();
		if (viewState.mode === 'month') {
			// The month grid's range is week-aligned and includes adjacent-month
			// spill days — compare against the focused month instead.
			const f = viewState.focusDate;
			return f.getMonth() === now.getMonth() && f.getFullYear() === now.getFullYear();
		}
		const { start, end } = viewState.range;
		return now.getTime() >= start.getTime() && now.getTime() < end.getTime();
	});

	/** Text direction: explicit prop wins, otherwise derived from the locale. */
	const resolvedDir = $derived.by(() => {
		if (dir) return dir;
		if (!locale) return undefined;
		try {
			const info = new Intl.Locale(locale) as Intl.Locale & {
				textInfo?: { direction?: string };
				getTextInfo?: () => { direction?: string };
			};
			const direction = info.textInfo?.direction ?? info.getTextInfo?.().direction;
			return direction === 'rtl' ? 'rtl' : undefined;
		} catch {
			return undefined;
		}
	});

	// ── Keyboard shortcuts (scoped to focus-within-calendar, not global) ──
	// t → today, ←/→ → prev/next. Skips events already handled by views
	// (e.g. month-grid arrow navigation) and anything typed into a field.
	function handleShortcuts(e: KeyboardEvent) {
		if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
		const t = e.target as HTMLElement | null;
		if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
		if (e.key === 't' || e.key === 'T') {
			e.preventDefault();
			viewState.goToday();
		} else if (e.key === 'ArrowLeft') {
			e.preventDefault();
			viewState.prev();
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			viewState.next();
		}
	}

	/** Header context for custom header snippet */
	const headerCtx = $derived({
		dateLabel,
		mode: viewState.mode,
		modes,
		switchMode,
		prev: () => viewState.prev(),
		next: () => viewState.next(),
		goToday: () => viewState.goToday(),
		isViewOnToday: viewIncludesToday,
		focusDate: viewState.focusDate,
	});

	/** Navigation context for custom navigation snippet */
	const navCtx = $derived({
		prev: () => viewState.prev(),
		next: () => viewState.next(),
		goToday: () => viewState.goToday(),
		isViewOnToday: viewIncludesToday,
		focusDate: viewState.focusDate,
		mode: viewState.mode,
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -- shortcut keys (t/←/→) act on events bubbling from the calendar's focusable controls; the region itself is not a tab stop -->
<div
	class="cal"
	bind:this={calEl}
	style="{effectiveTheme}; {heightProp === 'auto' ? '' : `--cal-h: ${heightProp}px;`} --cal-r: {borderRadius}px"
	class:cal--auto={heightProp === 'auto'}
	role="region"
	aria-label={L.calendar}
	aria-busy={store.loading || undefined}
	dir={resolvedDir}
	lang={locale}
	onkeydown={handleShortcuts}
>
	<!-- ─── Custom header snippet (replaces all chrome) ─── -->
	{#if headerSnippet}
		{@render headerSnippet(headerCtx)}

	<!-- ─── Mobile header (flow layout, no absolute) ─── -->
	{:else if useMobile && (showNavigation || (showModePills && modes.length > 1) || dateLabel)}
		{@const titleBelow = stackHeader && !!dateLabel}
		<div class="cal-m-hd" class:cal-m-hd--stack={stackHeader} class:cal-m-hd--titled={titleBelow}>
			<div class="cal-m-left">
				{#if showModePills && modes.length > 1}
					<div class="cal-m-pills" role="radiogroup" aria-label={L.viewMode}>
						{#each modes as g (g)}
							<button
								type="button"
								class="cal-m-pill"
								class:cal-m-pill--active={viewState.mode === g}
								role="radio"
								aria-checked={viewState.mode === g}
								onclick={() => switchMode(g)}
							>
								{g === 'day' ? L.day : g === 'week' ? L.week : L.month}
							</button>
						{/each}
					</div>
				{/if}
			</div>

			{#if !titleBelow}
				<span class="cal-m-title" role="status" aria-live="polite" aria-atomic="true">{dateLabel}</span>
			{/if}

			<div class="cal-m-right">
				{#if navigationSnippet}
					{@render navigationSnippet(navCtx)}
				{:else if showNavigation}
					<!-- Always rendered (disabled on today) so navigating never shifts layout -->
					<button
						type="button"
						class="cal-m-today"
						onclick={() => viewState.goToday()}
						disabled={viewIncludesToday}
						title={L.goToToday}
					>
						{L.today}
					</button>
					<button type="button" class="cal-m-nav" onclick={() => viewState.prev()} aria-label={viewState.mode === 'day' ? L.previousDay : viewState.mode === 'month' ? L.previousMonth : L.previousWeek}>
						<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><path d="M10 3 5 8l5 5"/></svg>
					</button>
					<button type="button" class="cal-m-nav" onclick={() => viewState.next()} aria-label={viewState.mode === 'day' ? L.nextDay : viewState.mode === 'month' ? L.nextMonth : L.nextWeek}>
						<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
					</button>
				{/if}
			</div>
		</div>
		{#if titleBelow}
			<div class="cal-m-titlebar">
				<span class="cal-m-title" role="status" aria-live="polite" aria-atomic="true">{dateLabel}</span>
			</div>
		{/if}

	<!-- ─── Desktop header ─── -->
	{:else if showNavigation || (showModePills && modes.length > 1) || dateLabel}
		<div class="cal-hd">
			<div class="cal-hd-side">
				{#if navigationSnippet}
					{@render navigationSnippet(navCtx)}
				{:else if showNavigation}
					<!-- Always rendered (disabled on today) so navigating never shifts the centered title -->
					<button
						type="button"
						class="cal-hd-today"
						onclick={() => viewState.goToday()}
						disabled={viewIncludesToday}
						title={L.goToToday}
					>
						{L.today}
					</button>
					<button type="button" class="cal-hd-btn" onclick={() => viewState.prev()} aria-label={viewState.mode === 'day' ? L.previousDay : viewState.mode === 'month' ? L.previousMonth : L.previousWeek}>
						<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><path d="M10 3 5 8l5 5"/></svg>
					</button>
					<button type="button" class="cal-hd-btn" onclick={() => viewState.next()} aria-label={viewState.mode === 'day' ? L.nextDay : viewState.mode === 'month' ? L.nextMonth : L.nextWeek}>
						<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
					</button>
				{/if}
			</div>
			<span class="cal-hd-title" role="status" aria-live="polite" aria-atomic="true">{dateLabel}</span>
			<div class="cal-hd-side cal-hd-side--end">
				{#if showModePills && labelsForMode.length > 1}
					<!-- View-type switcher (e.g. Planner ↔ Agenda) for the current mode -->
					<div class="cal-pills cal-pills--labels" role="radiogroup" aria-label={L.viewMode}>
						{#each labelsForMode as label (label)}
							<button
								type="button"
								class="cal-pill"
								class:cal-pill--active={activeView?.label === label}
								role="radio"
								aria-checked={activeView?.label === label}
								onclick={() => switchLabel(label)}
							>
								{label}
							</button>
						{/each}
					</div>
				{/if}
				{#if showModePills && modes.length > 1}
					<div class="cal-pills" role="radiogroup" aria-label={L.viewMode}>
						{#each modes as g (g)}
							<button
								type="button"
								class="cal-pill"
								class:cal-pill--active={viewState.mode === g}
								role="radio"
								aria-checked={viewState.mode === g}
								onclick={() => switchMode(g)}
							>
								{g === 'day' ? L.day : g === 'week' ? L.week : L.month}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}

	<div class="cal-body">
		{#if activeView}
			{@const Comp = activeView.component}
			<Comp
				events={store.events}
				style={effectiveTheme}
				height={null}
				mode={activeView.mode}
				mondayStart={viewState.mondayStart}
				{locale}
				focusDate={viewState.focusDate}
				oneventclick={handleEventClick}
				oneventcreate={effectiveCreate}
				readOnly={readOnly}
				visibleHours={visibleHours}
				selectedEventId={selection.selectedId}
				{...activeView.props ?? {}}
			/>
		{:else}
			<div class="cal-empty">No views registered.</div>
		{/if}
	</div>

	{#if store.loading}
		<div class="cal-loading"></div>
	{/if}
</div>

<style>
	.cal {
		position: relative;
		width: 100%;
		min-width: 0;
		height: var(--cal-h, 600px);
		background: var(--dt-bg, inherit);
		border-radius: var(--cal-r, 12px);
		overflow: clip;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
		box-sizing: border-box;
	}
	.cal--auto {
		height: auto;
		overflow: visible;
	}


	/* ── Desktop header ── */
	.cal-hd {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		min-height: 48px;
		box-sizing: border-box;
		border-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
		flex-shrink: 0;
	}

	.cal-hd-side {
		display: flex;
		align-items: center;
		gap: 4px;
		flex: 1;
		min-width: 0;
	}

	.cal-hd-side--end {
		justify-content: flex-end;
	}

	.cal-hd-title {
		font: 600 14px/1.2 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.cal-hd-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border: none;
		background: transparent;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		border-radius: 6px;
		cursor: pointer;
		transition: background 120ms, color 120ms;
	}

	.cal-hd-btn:hover {
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		background: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 8%, transparent);
	}

	.cal-hd-btn:focus-visible,
	.cal-hd-today:focus-visible,
	.cal-pill:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--dt-accent, #2563eb) 55%, transparent);
		outline-offset: 2px;
	}

	.cal-hd-today {
		font: 500 12px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		background: transparent;
		border: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
		padding: 6px 10px;
		border-radius: 6px;
		cursor: pointer;
		white-space: nowrap;
		margin-right: 2px;
		transition: background 120ms, color 120ms, border-color 120ms;
	}

	.cal-hd-today:hover:not(:disabled) {
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		border-color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
	}
	.cal-hd-today:disabled {
		opacity: 0.45;
		cursor: default;
	}

	.cal-pills {
		display: flex;
		gap: 2px;
		background: color-mix(in srgb, var(--dt-surface, var(--dt-bg, #ffffff)) 85%, transparent);
		border-radius: 8px;
		padding: 2px;
		border: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
		flex-shrink: 0;
	}

	.cal-pill {
		border: none;
		background: transparent;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		cursor: pointer;
		font: 500 12px/1 var(--dt-sans, system-ui, sans-serif);
		padding: 5px 12px;
		border-radius: 6px;
		transition: background 100ms, color 100ms;
	}

	/* :not(--active) — the hover rule otherwise outranks the active color,
	   and iOS keeps :hover stuck after a tap (dark text on the accent). */
	.cal-pill:hover:not(.cal-pill--active) {
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
	}

	.cal-pill--active {
		background: var(--dt-accent, #2563eb);
		color: var(--dt-btn-text, #fff);
	}

	.cal-body {
		flex: 1;
		min-height: 0;
		position: relative;
		overflow: hidden;
	}
	.cal--auto .cal-body {
		overflow: visible;
	}

	.cal-empty {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		font: 400 13px / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-3, rgba(0, 0, 0, 0.38));
	}

	.cal-loading {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(
			90deg,
			transparent 0%,
			var(--dt-accent, #2563eb) 50%,
			transparent 100%
		);
		animation: cal-slide 1.2s ease-in-out infinite;
	}

	@keyframes cal-slide {
		0% { transform: translateX(-100%); }
		100% { transform: translateX(100%); }
	}

	@media (prefers-reduced-motion: reduce) {
		.cal-loading {
			animation: none;
			background: var(--dt-accent-dim, rgba(37, 99, 235, 0.12));
		}
	}

	/* ── Mobile header (flow layout) ── */
	.cal-m-hd {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 8px 8px 6px;
		border-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
		flex-shrink: 0;
		min-height: 44px;
	}

	/* Narrow containers: the date label moves to its own row (.cal-m-titlebar),
	   so the controls row spreads pills and nav to the edges. */
	.cal-m-hd--stack {
		justify-content: space-between;
	}
	.cal-m-hd--titled {
		border-bottom: none;
		padding-bottom: 2px;
	}
	.cal-m-titlebar {
		display: flex;
		justify-content: center;
		padding: 0 8px 8px;
		border-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
		flex-shrink: 0;
	}
	.cal-m-titlebar .cal-m-title {
		flex: 0 1 auto;
	}

	.cal-m-left,
	.cal-m-right {
		display: flex;
		align-items: center;
		gap: 2px;
		flex-shrink: 0;
	}

	.cal-m-right {
		justify-content: flex-end;
	}

	.cal-m-nav {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border: none;
		background: transparent;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		border-radius: 50%;
		cursor: pointer;
		transition: background 120ms, color 120ms;
		-webkit-tap-highlight-color: transparent;
		flex-shrink: 0;
	}
	.cal-m-nav:hover {
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		background: color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.87)) 8%, transparent);
	}
	.cal-m-nav:active {
		background: var(--dt-accent-dim, rgba(37, 99, 235, 0.12));
	}
	.cal-m-nav:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--dt-accent, #2563eb) 55%, transparent);
		outline-offset: 2px;
	}

	.cal-m-pills {
		display: flex;
		gap: 2px;
		background: color-mix(in srgb, var(--dt-surface, var(--dt-bg, #ffffff)) 85%, transparent);
		border-radius: 8px;
		padding: 2px;
		border: 1px solid var(--dt-border, rgba(0, 0, 0, 0.08));
		flex-shrink: 0;
	}
	.cal-m-pill {
		border: none;
		background: transparent;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.54));
		cursor: pointer;
		font: 600 12px / 1 var(--dt-sans, system-ui, sans-serif);
		padding: 9px 12px;
		border-radius: 6px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		transition: background 100ms, color 100ms;
		-webkit-tap-highlight-color: transparent;
	}
	.cal-m-pill:hover:not(.cal-m-pill--active) {
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
	}
	.cal-m-pill--active {
		background: var(--dt-accent, #2563eb);
		color: var(--dt-btn-text, #fff);
	}

	.cal-m-title {
		flex: 1;
		text-align: center;
		font: 600 14px / 1.2 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		min-width: 0;
	}

	.cal-m-today {
		font: 600 12px / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-accent, #2563eb);
		background: color-mix(in srgb, var(--dt-accent, #2563eb) 10%, transparent);
		border: none;
		min-height: 40px;
		padding: 5px 12px;
		border-radius: 6px;
		cursor: pointer;
		white-space: nowrap;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		transition: background 120ms, color 120ms;
		-webkit-tap-highlight-color: transparent;
		flex-shrink: 0;
	}
	.cal-m-today:hover:not(:disabled) {
		background: color-mix(in srgb, var(--dt-accent, #2563eb) 18%, transparent);
	}
	.cal-m-today:active:not(:disabled) {
		background: color-mix(in srgb, var(--dt-accent, #2563eb) 25%, transparent);
	}
	.cal-m-today:disabled {
		opacity: 0.45;
		cursor: default;
	}
	.cal-m-today:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--dt-accent, #2563eb) 55%, transparent);
		outline-offset: 2px;
	}
</style>
