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
<script module lang="ts">
	import type { Component, Snippet } from 'svelte';
	import type { CalendarAdapter } from '../adapters/types.js';
	import type { CalendarViewId } from '../engine/view-state.svelte.js';
	import type { TimelineEvent, BlockedSlot } from '../core/types.js';
	import type { CalendarLabels } from '../core/locale.js';
	import type { AutoThemeOptions } from '../theme/auto.js';
	import type { HeaderContext, NavigationContext } from '../headless/types.js';
	import Planner from '../views/planner/Planner.svelte';
	import PlannerScroll from '../views/planner/PlannerScroll.svelte';
	import Agenda from '../views/agenda/Agenda.svelte';
	import Mobile from '../views/mobile/Mobile.svelte';
	import MonthGrid from '../views/month/MonthGrid.svelte';

	/**
	 * What the Calendar passes to the active view's component. Engines (store,
	 * view state, drag, labels…) are read from context — `useCalendarContext()`.
	 */
	export interface CalendarViewProps {
		events: TimelineEvent[];
		/** The active `--dt-*` theme string */
		style: string;
		height: number | null;
		mode: 'day' | 'week' | 'month';
		mondayStart: boolean;
		locale: string | undefined;
		focusDate: Date;
		oneventclick: (event: TimelineEvent, anchor?: DOMRect) => void;
		/** Already gated by `readOnly` and validated; undefined when creating is off */
		oneventcreate: ((range: { start: Date; end: Date }) => void) | undefined;
		onexternaldrop: ((info: { start: Date; dataTransfer: DataTransfer }) => void) | undefined;
		readOnly: boolean;
		visibleHours: [number, number] | undefined;
		selectedEventId: string | null;
	}

	/** One view registration */
	export interface CalendarView {
		id: CalendarViewId;
		/** The view-type name shown in the header pills when a mode has several views */
		label: string;
		/** day, week or month */
		mode: 'day' | 'week' | 'month';
		/**
		 * The Svelte component to render. It receives `CalendarViewProps` plus
		 * `props`; declare only the ones it uses.
		 */
		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- any component props shape is accepted
		component: Component<any>;
		/** Extra props passed through to the component */
		props?: Record<string, unknown>;
	}

	export interface CalendarProps {
		/** Data adapter (required) */
		adapter: CalendarAdapter;
		/** Registered views (default: `defaultViews`) */
		views?: readonly CalendarView[];
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
		/**
		 * Minimum width (px) of a day column in planner views (default: 110).
		 * Below the resulting total the grid scrolls horizontally. Lower it when
		 * the calendar shares its row with a sidebar and the whole week must stay
		 * visible without scrolling.
		 */
		minColumnWidth?: number;
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
		/**
		 * Controlled current date — drives which date the calendar focuses on.
		 * An instant, like `initialDate`: with `timezone` it is read in that zone.
		 */
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
		header?: Snippet<[HeaderContext]>;
		/**
		 * Replace just the navigation controls (arrows + today button).
		 * Receives context: { prev, next, goToday, isViewOnToday, focusDate, mode }.
		 */
		navigation?: Snippet<[NavigationContext]>;

		// ── Callbacks ──
		/** `anchor` is the clicked block's viewport rect where a view has one (planner) — for positioning a FloatingPanel. */
		oneventclick?: (event: TimelineEvent, anchor?: DOMRect) => void;

		oneventcreate?: (range: { start: Date; end: Date }) => void;
		/** An HTML5 drag from outside the calendar dropped on the planner grid
		 *  (a class chip, a template): the pointer's time, snapped, as a real
		 *  instant — plus the drag's dataTransfer for whatever the source put in. */
		onexternaldrop?: (info: { start: Date; dataTransfer: DataTransfer }) => void;
		/**
		 * An event was dragged or resized. `newStart`/`newEnd` are real instants.
		 * Fires after the adapter stored the move, or — when the adapter refuses
		 * with a `read-only` error — so the host can store it itself.
		 */
		oneventmove?: (event: TimelineEvent, newStart: Date, newEnd: Date) => void;
		/** Called with the active view id — once on mount, then on every change. */
		onviewchange?: (viewId: CalendarViewId) => void;
		/**
		 * Called with the focused date — once on mount, then whenever it changes
		 * (navigation, scrolling, a tapped day). An instant on the focused day,
		 * like `currentDate` takes, so feeding it back is stable. With `timezone`
		 * read its date in that zone — `formatInTimeZone(d, timezone, …)` or
		 * `toZonedTime(d, timezone)`.
		 */
		ondatechange?: (date: Date) => void;
		/** Called when the pointer enters an event (hover). */
		oneventhover?: (event: TimelineEvent) => void;
		/** Called when a day cell is clicked (month grid, agenda day heads). An instant, like `ondatechange`. Default: open that day in a day view. */
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

	/**
	 * The built-in views — the registry a Calendar uses without a `views` prop.
	 * Spread it to add your own view and keep these:
	 * `views={[...defaultViews, { id: 'day-kanban', ... }]}`.
	 * On phones (`mobile: 'auto'`), every view except `*-agenda` and `*-mobile`
	 * swaps to the registered `{mode}-mobile` view, when there is one.
	 */
	export const defaultViews: readonly CalendarView[] = [
		{ id: 'day-planner',  label: 'Planner', mode: 'day',  component: Planner },
		{ id: 'week-planner', label: 'Planner', mode: 'week', component: Planner },
		{ id: 'week-scroll',  label: 'Scroll',  mode: 'week', component: PlannerScroll },
		{ id: 'day-agenda',   label: 'Agenda',  mode: 'day',  component: Agenda },
		{ id: 'week-agenda',  label: 'Agenda',  mode: 'week', component: Agenda },
		{ id: 'day-mobile',   label: 'Mobile',  mode: 'day',  component: Mobile },
		{ id: 'week-mobile',  label: 'Mobile',  mode: 'week', component: Mobile },
		{ id: 'month-grid',   label: 'Month',   mode: 'month', component: MonthGrid },
	];
</script>

<script lang="ts">
	import { setContext, untrack } from 'svelte';
	import { createEventStore, type EventStore } from '../engine/event-store.svelte.js';
	import { createViewState, type ViewState } from '../engine/view-state.svelte.js';
	import { createSelection, type Selection } from '../engine/selection.svelte.js';
	import { createDragState, type DragState } from '../engine/drag.svelte.js';
	import { onMount } from 'svelte';
	import { getLabels, getDefaultLocale, fmtWeekRange } from '../core/locale.js';
	import { createClock } from '../core/clock.svelte.js';
	import { auto } from '../theme/presets.js';
	import { observeHostTheme } from '../theme/auto.js';
	import { wrapAdapterWithTimezone, toZonedTime, fromZonedTime } from '../core/timezone.js';
	import { isReadOnlyError, isNotFoundError } from '../adapters/errors.js';

	/** Breakpoint (px) at which auto-mobile activates */
	const MOBILE_BREAKPOINT = 768;

	let {
		adapter,
		views = defaultViews,
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
		minColumnWidth = 110,
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
		onexternaldrop,
		oneventmove,
		onviewchange,
		ondatechange,
		oneventhover,
		ondayclick,
		onerror,
		timezone,
	}: CalendarProps = $props();

	// In readOnly mode, suppress mutation callbacks. With a timezone, the
	// drag plane is zoned wall-clock — hosts always receive real instants.
	const unzone = (d: Date) => (timezone ? fromZonedTime(d, timezone) : d);
	// Dates handed IN (initialDate, currentDate) are instants; the views work on
	// the zoned wall-clock plane.
	const zoneIn = (d: Date | undefined) => (d && timezone ? toZonedTime(d, timezone) : d);
	const effectiveCreate = $derived(
		readOnly || !oneventcreate
			? undefined
			: (range: { start: Date; end: Date }) =>
					oneventcreate({ start: unzone(range.start), end: unzone(range.end) }),
	);
	const effectiveExternalDrop = $derived(
		readOnly || !onexternaldrop
			? undefined
			: (info: { start: Date; dataTransfer: DataTransfer }) =>
					onexternaldrop({ start: unzone(info.start), dataTransfer: info.dataTransfer }),
	);
	const effectiveMove = $derived(
		readOnly || !oneventmove
			? undefined
			: (ev: TimelineEvent, start: Date, end: Date) => oneventmove(ev, unzone(start), unzone(end)),
	);

	// Clicking an event selects it (highlight via selectedEventId) and then
	// notifies the host — selection used to be created but never driven.
	function handleEventClick(ev: TimelineEvent, anchor?: DOMRect) {
		selection.select(ev.id);
		oneventclick?.(ev, anchor);
	}


	// ── Mobile detection (container-based, not viewport) ──
	// Starts unmeasured on server AND client: the first client render must be
	// the markup the server sent, or hydration fails (a phone reload of an SSR
	// page used to throw in the mobile branch). onMount measures before the
	// next paint; a page without SSR renders the right layout at once.
	let containerWidth = $state(0);
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
	// The store is created ONCE and reads the adapter through a getter. A
	// `$derived` store would be rebuilt — empty — whenever the host handed over a
	// new adapter identity (a common "force a refetch" idiom), blanking the grid
	// until the refetch landed. The load effect below re-runs on adapter change
	// because store.load() reads effectiveAdapter inside it.
	const store: EventStore = createEventStore(() => effectiveAdapter);
	const viewState: ViewState = createViewState(untrack(() => ({
		view: activeViewId ?? views[0]?.id,
		mondayStart,
		// Focus lives on the zoned plane too — day boundaries follow the zone.
		// A controlled currentDate wins, so the server renders the right period.
		initialDate: zoneIn(currentDate ?? initialDate),
		dayCount: days,
		timezone,
		modeForView: (viewId) => views.find((v) => v.id === viewId)?.mode,
	})));
	const selection: Selection = createSelection();
	const drag: DragState = createDragState();

	// ── Range validation ──
	// One rule for every write a view proposes — a drag, a resize, a click on
	// an empty slot: clamp to min/max duration, refuse disabled dates and
	// blocked slots. Returns the range to use, or null to refuse.
	type RangeMode = 'create' | 'move' | 'resize-start' | 'resize-end';
	function validateRange(mode: RangeMode, start: Date, end: Date): { start: Date; end: Date } | null {
		// Enforce min/max duration for create and resize
		if (mode === 'create' || mode === 'resize-start' || mode === 'resize-end') {
			// Defensive floor: never accept a zero/negative duration, even when
			// minDuration is unset (views clamp, but the engine must hold alone).
			if (end.getTime() <= start.getTime()) {
				const floorMs = Math.max(1, snapInterval) * 60_000;
				if (mode === 'resize-start') start = new Date(end.getTime() - floorMs);
				else end = new Date(start.getTime() + floorMs);
			}
			const durationMin = (end.getTime() - start.getTime()) / 60_000;
			const clampTo = minDuration && durationMin < minDuration
				? minDuration
				: maxDuration && durationMin > maxDuration
					? maxDuration
					: null;
			if (clampTo !== null) {
				if (mode === 'resize-start') start = new Date(end.getTime() - clampTo * 60_000);
				else end = new Date(start.getTime() + clampTo * 60_000);
			}
		}

		// Reject if the range touches a disabled date
		if (disabledDates?.length) {
			const startDay = new Date(start); startDay.setHours(0, 0, 0, 0);
			const endDay = new Date(end.getTime() - 1); endDay.setHours(0, 0, 0, 0);
			for (const dd of disabledDates) {
				const dt = new Date(dd); dt.setHours(0, 0, 0, 0);
				const ts = dt.getTime();
				if (ts >= startDay.getTime() && ts <= endDay.getTime()) return null;
			}
		}

		// Reject if the range overlaps a blocked slot
		if (blockedSlots?.length) {
			const startH = start.getHours() + start.getMinutes() / 60;
			const endH = end.getHours() + end.getMinutes() / 60 + (end.getDate() !== start.getDate() ? 24 : 0);
			const jsDay = start.getDay();
			const isoDay = jsDay === 0 ? 7 : jsDay;
			for (const slot of blockedSlots) {
				if (slot.day && slot.day !== isoDay) continue;
				if (startH < slot.end && endH > slot.start) return null;
			}
		}
		return { start, end };
	}

	// What views call for a click-to-create: the same checks a drag gets.
	const checkedCreate = $derived.by(() => {
		const create = effectiveCreate;
		if (!create) return undefined;
		return (range: { start: Date; end: Date }) => {
			const ok = validateRange('create', range.start, range.end);
			if (ok) create(ok);
		};
	});

	// ── Drag commit handler ──
	// Views call this on pointer-up to process drag results.
	async function commitDrag(): Promise<void> {
		if (readOnly) { drag.cancel(); return; }
		const mode = drag.mode;
		const payload = drag.commit();
		if (!payload || mode === 'none') return;

		const checked = validateRange(mode, payload.start, payload.end);
		if (!checked) return;
		const { start, end } = checked;

		if ((mode === 'move' || mode === 'resize-start' || mode === 'resize-end') && payload.eventId) {
			try {
				await store.move(payload.eventId, start, end);
				const ev = store.byId(payload.eventId);
				if (ev) effectiveMove?.(ev, start, end);
			} catch (e) {
				// Read-only adapter: the store can't persist, but the HOST still
				// gets the callback — it owns persistence (e.g. scheduler RPC) and
				// refetches. Missing event stays silent; real failures surface.
				if (isReadOnlyError(e)) {
					const ev = store.byId(payload.eventId);
					if (ev) effectiveMove?.(ev, start, end);
				} else if (!isNotFoundError(e) && !onerror) {
					// With onerror, the store.error effect below reports it — once.
					console.warn('[calendar] drag commit failed:', e);
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

	// Per-instance labels: prop overrides merged over the global set, memoized so
	// views reading ctx.labels per-render don't allocate a fresh object each access.
	//
	// MUST stay above setContext: the context exposes this through a getter, and
	// a view reading ctx.labels while the binding is still uninitialised got the
	// English globals instead — silently, because the fallback in
	// useCalendarContext is `?? getLabels()`. Every localized calendar rendered
	// its empty states in English.
	const mergedLabels = $derived(
		labelsProp ? { ...getLabels(), ...labelsProp } : getLabels(),
	);
	const L = $derived(mergedLabels);

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
		get oneventcreate() { return checkedCreate; },
		get oneventmove() { return effectiveMove; },
		get oneventhover() { return oneventhover; },
		get ondayclick() { return ondayclick ? (d: Date) => ondayclick(unzone(d)) : defaultDayClick; },
		get timezone() { return timezone; },

		// Config (reactive via getters)
		get readOnly() { return readOnly; },
		get visibleHours() { return visibleHours; },
		get snapInterval() { return snapInterval; },
		get minColumnWidth() { return minColumnWidth; },
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
	// Eager initial load for adapters that answer synchronously (memory,
	// recurring, seeded): the server render and the first paint hold the
	// events. An async adapter waits for the effect — by then the view has
	// declared its wider load range, so it is fetched once, not twice.
	untrack(() => {
		if (effectiveAdapter.fetchEventsSync) store.load({ start: viewState.range.start, end: viewState.range.end });
	});

	// Keep active view in sync when external view prop changes after mount.
	$effect(() => {
		if (activeViewId) viewState.setView(activeViewId);
	});

	// Sync controlled currentDate prop → viewState
	$effect(() => {
		const d = zoneIn(currentDate);
		// Compared by time: the host often hands back what ondatechange gave it.
		if (d && untrack(() => viewState.focusDate.getTime()) !== d.getTime()) {
			untrack(() => viewState.setFocusDate(d));
		}
	});

	// Sync days prop → viewState.dayCount
	$effect(() => {
		if (days !== undefined && viewState.dayCount !== days) viewState.setDayCount(days);
	});

	// Notify host when focusDate changes
	$effect(() => {
		// An instant, like currentDate takes — so a host that feeds it back
		// (currentDate={d} ondatechange={(x) => d = x}) gets the same day back.
		const d = unzone(viewState.focusDate);
		untrack(() => ondatechange?.(d));
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
		if (requested.component === Agenda || requested.id.endsWith('-agenda')) return requested;
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
			return viewState.focusDate.toLocaleDateString(locale ?? getDefaultLocale(), {
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
		return viewState.focusDate.toLocaleDateString(locale ?? getDefaultLocale(), {
			month: 'long',
			year: 'numeric',
		});
	});

	// Which modes are available?
	const modes = $derived.by(() => {
		const g = new Set(desktopViews.map((v) => v.mode));
		return (['day', 'week', 'month'] as const).filter((key) => g.has(key));
	});


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

	/** Built-in view-type names are shown in the calendar's language. */
	function viewLabel(label: string): string {
		if (label === 'Planner') return L.planner;
		if (label === 'Agenda') return L.agenda;
		if (label === 'Scroll') return L.scroll;
		return label;
	}

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
	// Ticks on the zoned plane, so "today" is today in `timezone` and the
	// Today button re-enables when the day rolls over.
	const clock = createClock(untrack(() => timezone));
	const viewIncludesToday = $derived.by(() => {
		const now = new Date(clock.tick);
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
		// Arrows inside a radio group move between its options, not the period.
		const inRadio = t?.getAttribute('role') === 'radio';
		// Arrows follow the reading direction: in RTL, ← is "later".
		const rtl = !!calEl && getComputedStyle(calEl).direction === 'rtl';
		if (e.key === 't' || e.key === 'T') {
			e.preventDefault();
			viewState.goToday();
		} else if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !inRadio) {
			e.preventDefault();
			if ((e.key === 'ArrowRight') !== rtl) viewState.next();
			else viewState.prev();
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
								{viewLabel(label)}
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
				oneventcreate={checkedCreate}
				onexternaldrop={effectiveExternalDrop}
				readOnly={readOnly}
				visibleHours={visibleHours}
				selectedEventId={selection.selectedId}
				{...activeView.props ?? {}}
			/>
		{:else}
			<div class="cal-empty">{L.noViews}</div>
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
