<!--
  WeekSchedule — zero-config weekly schedule display.

  A convenience wrapper that pre-wires Calendar + WeekGrid + Agenda
  so consumers can render a read-only weekly schedule with a single import.

  Usage:
    <WeekSchedule
      events={events}
      theme={neutral}
      locale="pl-PL"
      height={560}
      readOnly
    />

  Or with a recurring adapter:
    <WeekSchedule
      schedule={weeklyClasses}
      theme={neutral}
      readOnly
    />
-->
<script lang="ts">
	import type { TimelineEvent } from '../../core/types.js';
	import type { RecurringEvent } from '../../adapters/recurring.js';
	import type { MemoryAdapterOptions } from '../../adapters/memory.js';
	import { createMemoryAdapter } from '../../adapters/memory.js';
	import { createRecurringAdapter, type RecurringAdapterOptions } from '../../adapters/recurring.js';
	import Calendar from '../../calendar/Calendar.svelte';
	import type { CalendarView } from '../../calendar/Calendar.svelte';
	import { WeekGrid } from '../week/index.js';
	import { Agenda } from '../agenda/index.js';

	interface Props {
		/** Concrete events (mutually exclusive with `schedule`) */
		events?: TimelineEvent[];
		/** Recurring weekly schedule (mutually exclusive with `events`) */
		schedule?: RecurringEvent[];
		/** CSS theme string */
		theme?: string;
		/** BCP 47 locale */
		locale?: string;
		/** Text direction */
		dir?: 'ltr' | 'rtl' | 'auto';
		/** Total height */
		height?: number;
		/** Start week on Monday */
		mondayStart?: boolean;
		/** Read-only mode (default: true for schedule display) */
		readOnly?: boolean;
		/** Visible hour range [startHour, endHour) */
		visibleHours?: [number, number];
		/** Show toolbar */
		showToolbar?: boolean;
		/** Show agenda view toggle */
		showAgenda?: boolean;
		/** Map of category/title to color */
		colorMap?: Record<string, string>;
		/** Auto-assign colors */
		autoColor?: boolean;
		/** Event click handler */
		oneventclick?: (event: TimelineEvent) => void;
		/** Event create handler (only works when readOnly is false) */
		oneventcreate?: (range: { start: Date; end: Date }) => void;
	}

	let {
		events,
		schedule,
		theme = '',
		locale,
		dir,
		height = 560,
		mondayStart = true,
		readOnly = true,
		visibleHours,
		showToolbar = true,
		showAgenda = true,
		colorMap,
		autoColor,
		oneventclick,
		oneventcreate,
	}: Props = $props();

	// Auto-create the adapter from events or schedule
	const adapter = $derived.by(() => {
		if (schedule) {
			return createRecurringAdapter(schedule, {
				mondayStart,
				colorMap,
				autoColor,
			} satisfies RecurringAdapterOptions);
		}
		return createMemoryAdapter(events ?? [], {
			colorMap,
			autoColor,
		} satisfies MemoryAdapterOptions);
	});

	// Pre-wired views
	const views = $derived.by((): CalendarView[] => {
		const v: CalendarView[] = [
			{
				id: 'week-grid',
				label: 'Week',
				granularity: 'week',
				component: WeekGrid,
			},
		];
		if (showAgenda) {
			v.push({
				id: 'agenda',
				label: 'Agenda',
				granularity: 'week',
				component: Agenda,
				props: { mode: 'week' },
			});
		}
		return v;
	});
</script>

<Calendar
	{adapter}
	{views}
	defaultView="week-grid"
	{theme}
	{locale}
	{dir}
	{height}
	{mondayStart}
	{readOnly}
	{visibleHours}
	{showToolbar}
	{oneventclick}
	oneventcreate={readOnly ? undefined : oneventcreate}
/>
