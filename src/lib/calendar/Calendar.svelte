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
	import type { TimelineEvent } from '../core/types.js';
	import { getLabels } from '../core/locale.js';
	import { neutral } from '../theme/presets.js';
	import Planner from '../views/planner/Planner.svelte';
	import Agenda from '../views/agenda/Agenda.svelte';

	/** One view registration */
	export interface CalendarView {
		id: CalendarViewId;
		label: string;
		/** day or week */
		mode: 'day' | 'week';
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
		/** Start week on Monday */
		mondayStart?: boolean;
		/** Total height */
		height?: number;
		/** Text direction: 'ltr' (default), 'rtl', or 'auto' */
		dir?: 'ltr' | 'rtl' | 'auto';
		/** BCP 47 locale tag (e.g. 'en-US', 'ar-SA') — sets lang and locale for formatting */
		locale?: string;
		/** Read-only mode: disables drag, resize, empty-slot creation */
		readOnly?: boolean;
		/** Visible hour range: [startHour, endHour). Crops the grid to these hours. */
		visibleHours?: [number, number];
		/** Initial date to focus on (defaults to today) */
		initialDate?: Date;
		/** Drag snap interval in minutes (default: 15) */
		snapInterval?: number;

		// ── Snippets ──
		/** Custom event rendering snippet */
		event?: Snippet<[TimelineEvent]>;
		/** Content to show when no events are loaded */
		empty?: Snippet;

		// ── Callbacks ──
		oneventclick?: (event: TimelineEvent) => void;
		oneventcreate?: (range: { start: Date; end: Date }) => void;
		oneventmove?: (event: TimelineEvent, newStart: Date, newEnd: Date) => void;
		onviewchange?: (viewId: CalendarViewId) => void;
	}

	// ── Built-in views (used when no custom views are provided) ──
	const DEFAULT_VIEWS: CalendarView[] = [
		{ id: 'day-planner',  label: 'Planner', mode: 'day',  component: Planner },
		{ id: 'week-planner', label: 'Planner', mode: 'week', component: Planner },
		{ id: 'day-agenda',   label: 'Agenda',  mode: 'day',  component: Agenda },
		{ id: 'week-agenda',  label: 'Agenda',  mode: 'week', component: Agenda },
	];

	let {
		adapter,
		views = DEFAULT_VIEWS,
		view: activeViewId,
		theme = neutral,
		mondayStart = true,
		height = 600,
		dir,
		locale,
		readOnly = false,
		visibleHours,
		initialDate,
		snapInterval = 15,
		event: eventSnippet,
		empty: emptySnippet,
		oneventclick,
		oneventcreate,
		oneventmove,
		onviewchange,
	}: Props = $props();

	// In readOnly mode, suppress mutation callbacks
	const effectiveCreate = $derived(readOnly ? undefined : oneventcreate);
	const effectiveMove = $derived(readOnly ? undefined : oneventmove);

	// ── Create reactive state ──
	const store: EventStore = $derived(createEventStore(adapter));
	const viewState: ViewState = createViewState(untrack(() => ({
		view: activeViewId ?? views[0]?.id,
		mondayStart,
		initialDate,
		modeForView: (viewId) => views.find((v) => v.id === viewId)?.mode,
	})));
	const selection: Selection = createSelection();
	const drag: DragState = createDragState();

	// ── Drag commit handler ──
	// Views call this on pointer-up to process drag results.
	function commitDrag(): void {
		if (readOnly) { drag.cancel(); return; }
		const mode = drag.mode;
		const payload = drag.commit();
		if (!payload) return;

		if ((mode === 'move' || mode === 'resize-start' || mode === 'resize-end') && payload.eventId) {
			store.move(payload.eventId, payload.start, payload.end);
			const ev = store.byId(payload.eventId);
			if (ev) effectiveMove?.(ev, payload.start, payload.end);
		} else if (mode === 'create') {
			effectiveCreate?.({ start: payload.start, end: payload.end });
		}
	}

	// Context is set once at mount; engine objects hold $state internally
	// so consumers reading from them stay reactive automatically.
	// Wrap store in a getter since it's $derived and may change when adapter changes.
	setContext('calendar:store', { get current() { return store; } });
	setContext('calendar:viewState', viewState);
	setContext('calendar:selection', selection);
	setContext('calendar:drag', drag);
	setContext('calendar:commitDrag', commitDrag);
	// Callbacks: provide a getter-based object so context consumers
	// always see the latest callback references.
	setContext('calendar:callbacks', {
		get oneventclick() { return oneventclick; },
		get oneventcreate() { return effectiveCreate; },
		get oneventmove() { return effectiveMove; },
	});
	setContext('calendar:readOnly', { get current() { return readOnly; } });
	setContext('calendar:visibleHours', { get current() { return visibleHours; } });
	setContext('calendar:snapInterval', { get current() { return snapInterval; } });
	setContext('calendar:eventSnippet', { get current() { return eventSnippet; } });
	setContext('calendar:emptySnippet', { get current() { return emptySnippet; } });

	// ── Load range signal ──
	// Views can write a wider range here to override the default viewState.range.
	// This lets infinite-scroll views (PlannerWeek, PlannerDay) declare their
	// buffer needs without directly calling store.load().
	let viewLoadRange = $state<{ start: Date; end: Date } | null>(null);
	setContext('calendar:loadRange', {
		get current() { return viewLoadRange; },
		set(range: { start: Date; end: Date } | null) { viewLoadRange = range; },
	});

	// ── Load events when effective range changes ──
	$effect(() => {
		const range = viewLoadRange ?? viewState.range;
		store.load({ start: range.start, end: range.end });
	});

	// Keep active view in sync when external view prop changes after mount.
	$effect(() => {
		if (activeViewId) viewState.setView(activeViewId);
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

	// ── Resolve active view ──
	const activeView = $derived(views.find((v) => v.id === viewState.view) ?? views[0]);

	// ── Date label (always visible, centered over views) ──
	const dateLabel = $derived.by(() => {
		if (viewState.mode === 'day') {
			return viewState.focusDate.toLocaleDateString(locale, {
				weekday: 'long',
				month: 'short',
				day: 'numeric',
			});
		}
		return viewState.focusDate.toLocaleDateString(locale, {
			month: 'long',
			year: 'numeric',
		});
	});

	// Which modes are available?
	const modes = $derived.by(() => {
		const g = new Set(views.map((v) => v.mode));
		return (['day', 'week'] as const).filter((key) => g.has(key));
	});

	const L = $derived(getLabels());
</script>

<div
	class="cal"
	style="{theme}; --cal-h: {height}px"
	role="region"
	aria-label={L.calendar}
	dir={dir}
	lang={locale}
>
	<!-- Floating mode pills (hidden for Agenda views) -->
	{#if modes.length > 1 && activeView?.label !== 'Agenda'}
		<div class="cal-pills" role="group" aria-label={L.viewMode}>
			{#each modes as g}
				<button
					class="cal-pill"
					class:cal-pill--active={viewState.mode === g}
					aria-pressed={viewState.mode === g}
					onclick={() => {
						const currentLabel = views.find((v) => v.id === viewState.view)?.label;
						const match = views.find((v) => v.mode === g && v.label === currentLabel);
						const fallback = views.find((v) => v.mode === g);
						const target = match ?? fallback;
						if (target) viewState.setView(target.id);
					}}
				>
					{g === 'day' ? L.day : L.week}
				</button>
			{/each}
		</div>
	{/if}

	<div class="cal-body">
		{#if activeView}
			{@const Comp = activeView.component}
			<Comp
				events={store.events}
				style={theme}
				height={null}
				mode={activeView.mode}
				mondayStart={viewState.mondayStart}
				{locale}
				focusDate={viewState.focusDate}
				oneventclick={oneventclick}
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
		height: var(--cal-h, 600px);
		background: var(--dt-bg, #0b0e14);
		border-radius: 12px;
		overflow: clip;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--dt-border, rgba(148, 163, 184, 0.07));
	}

	/* ── Floating pills ── */
	.cal-pills {
		position: absolute;
		top: 22px;
		bottom: auto;
		left: 10px;
		z-index: 20;
		display: flex;
		gap: 2px;
		background: color-mix(in srgb, var(--dt-surface, #10141c) 85%, transparent);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		border-radius: 8px;
		padding: 2px;
		border: 1px solid var(--dt-border, rgba(148, 163, 184, 0.07));
	}

	.cal-pill {
		border: none;
		background: transparent;
		color: var(--dt-text-2, rgba(148, 163, 184, 0.55));
		cursor: pointer;
		font: 600 11px / 1 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		padding: 6px 12px;
		border-radius: 6px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		transition: background 100ms, color 100ms;
	}

	.cal-pill:hover {
		color: var(--dt-text, rgba(226, 232, 240, 0.85));
	}

	.cal-pill--active {
		background: var(--dt-accent, #ef4444);
		color: var(--dt-btn-text, #fff);
	}

	.cal-pill:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--dt-accent, #ef4444) 55%, transparent);
		outline-offset: 2px;
	}

	.cal-body {
		flex: 1;
		min-height: 0;
		position: relative;
		overflow: hidden;
	}

	.cal-empty {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		font: 400 13px / 1 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		color: var(--dt-text-3, rgba(100, 116, 139, 0.55));
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
			var(--dt-accent, #ef4444) 50%,
			transparent 100%
		);
		animation: cal-slide 1.2s ease-in-out infinite;
	}

	@keyframes cal-slide {
		0% { transform: translateX(-100%); }
		100% { transform: translateX(100%); }
	}
</style>
