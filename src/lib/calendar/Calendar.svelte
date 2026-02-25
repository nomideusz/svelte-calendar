<!--
  Calendar — the unified orchestrator.

  Brings together: adapter → event store → view state + selection → toolbar + active view.
  Provides context so any descendant view can read the store/state via getContext().

  Usage:
    <Calendar
      adapter={myAdapter}
      views={[
        { id: 'week-terrain', label: 'Terrain', component: WeekTimelineV4 },
        { id: 'week-agenda',  label: 'Agenda',  component: WeekTimelineV5 },
        { id: 'day',          label: 'Day',     component: DayTimeline },
      ]}
      defaultView="week-terrain"
      theme={presets.midnight}
      height={600}
      oneventclick={handleClick}
      oneventcreate={handleCreate}
    />
-->
<script lang="ts">
	import { setContext, untrack, type Component } from 'svelte';
	import type { CalendarAdapter } from '../adapters/types.js';
	import type { CalendarViewId } from '../engine/view-state.svelte.js';
	import { createEventStore, type EventStore } from '../engine/event-store.svelte.js';
	import { createViewState, type ViewState } from '../engine/view-state.svelte.js';
	import { createSelection, type Selection } from '../engine/selection.svelte.js';
	import { createDragState, type DragState } from '../engine/drag.svelte.js';
	import type { TimelineEvent } from '../core/types.js';
	import Toolbar from './Toolbar.svelte';

	/** One view registration */
	export interface CalendarView {
		id: CalendarViewId;
		label: string;
		/** day or week */
		granularity: 'day' | 'week';
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
		/** Initial view */
		defaultView?: CalendarViewId;
		/** CSS theme string (--dt-* inline style) */
		theme?: string;
		/** Start week on Monday */
		mondayStart?: boolean;
		/** Total height */
		height?: number;
		/** Show toolbar */
		showToolbar?: boolean;
		/** Links to display in toolbar */
		links?: { href: string; label: string }[];
		/** Text direction: 'ltr' (default), 'rtl', or 'auto' */
		dir?: 'ltr' | 'rtl' | 'auto';
		/** BCP 47 locale tag (e.g. 'en-US', 'ar-SA') — sets lang and locale for formatting */
		locale?: string;

		// ── Callbacks ──
		oneventclick?: (event: TimelineEvent) => void;
		oneventcreate?: (range: { start: Date; end: Date }) => void;
		oneventmove?: (event: TimelineEvent, newStart: Date, newEnd: Date) => void;
	}

	let {
		adapter,
		views = [],
		defaultView = 'week-grid',
		theme = '',
		mondayStart = true,
		height = 600,
		showToolbar = true,
		links = [],
		dir,
		locale,
		oneventclick,
		oneventcreate,
		oneventmove,
	}: Props = $props();

	import { setDefaultLocale } from '../core/locale.js';

	// ── Set locale when provided ──
	$effect(() => {
		if (locale) setDefaultLocale(locale);
	});

	// ── Create reactive state ──
	const store: EventStore = $derived(createEventStore(adapter));
	const viewState: ViewState = createViewState(untrack(() => ({
		defaultView,
		mondayStart,
	})));
	const selection: Selection = createSelection();
	const drag: DragState = createDragState();

	// ── Drag commit handler ──
	// Views call this on pointer-up to process drag results.
	function commitDrag(): void {
		const mode = drag.mode;
		const payload = drag.commit();
		if (!payload) return;

		if ((mode === 'move' || mode === 'resize-start' || mode === 'resize-end') && payload.eventId) {
			store.move(payload.eventId, payload.start, payload.end);
			const ev = store.byId(payload.eventId);
			if (ev) oneventmove?.(ev, payload.start, payload.end);
		} else if (mode === 'create') {
			oneventcreate?.({ start: payload.start, end: payload.end });
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
		get oneventcreate() { return oneventcreate; },
		get oneventmove() { return oneventmove; },
	});

	// ── Load events when range changes ──
	$effect(() => {
		const { start, end } = viewState.range;
		store.load({ start, end });
	});

	// ── Resolve active view ──
	const activeView = $derived(views.find((v) => v.id === viewState.view) ?? views[0]);

	const toolbarViews = $derived(
		views.map((v) => ({ id: v.id, label: v.label, granularity: v.granularity })),
	);
</script>

<div
	class="cal"
	style="{theme}; --cal-h: {height}px"
	role="region"
	aria-label="Calendar"
	dir={dir}
	lang={locale}
>
	{#if showToolbar}
		<Toolbar {viewState} views={toolbarViews} {links} />
	{/if}

	<div class="cal-body">
		{#if activeView}
			{@const Comp = activeView.component}
			<Comp
				events={store.events}
				style={theme}
				height={height - (showToolbar ? 48 : 0)}
				mondayStart={viewState.mondayStart}
				focusDate={viewState.focusDate}
				oneventclick={oneventclick}
				oneventcreate={oneventcreate}
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
		overflow: hidden;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--dt-border, rgba(148, 163, 184, 0.07));
	}

	.cal-body {
		flex: 1;
		min-height: 0;
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
