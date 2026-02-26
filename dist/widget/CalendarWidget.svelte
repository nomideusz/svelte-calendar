<!--
  CalendarWidget — self-contained calendar for embedding via <day-calendar> custom element.

  Accepts simple HTML attributes and wires up the full Calendar with sensible defaults.
  Designed for non-Svelte sites (plain HTML, WordPress, Squarespace, etc.).

  Usage as custom element:
    <day-calendar
      api="https://myschool.com/api/events"
      theme="neutral"
      view="week-grid"
      height="600"
      locale="en-US"
    ></day-calendar>
-->
<script lang="ts">
	import Calendar from '../calendar/Calendar.svelte';
	import type { CalendarView } from '../calendar/Calendar.svelte';
	import { DayGrid } from '../views/day/index.js';
	import { WeekGrid } from '../views/week/index.js';
	import { Agenda } from '../views/agenda/index.js';
	import { WeekHeatmap } from '../views/week/index.js';
	import { DayTimeline } from '../views/day/index.js';
	import { createRestAdapter } from '../adapters/rest.js';
	import { createMemoryAdapter } from '../adapters/memory.js';
	import { presets } from '../theme/presets.js';
	import type { PresetName } from '../theme/presets.js';
	import type { TimelineEvent } from '../core/types.js';

	interface Props {
		/** REST API base URL — if provided, fetches events from this endpoint */
		api?: string;
		/** JSON string of events for static/inline data (alternative to api) */
		events?: string;
		/** Theme preset name: midnight, parchment, indigo, neutral, bare */
		theme?: string;
		/** Default view ID */
		view?: string;
		/** Calendar height in pixels */
		height?: string;
		/** BCP 47 locale tag (e.g. 'en-US', 'pl-PL') */
		locale?: string;
		/** Text direction: ltr, rtl, auto */
		dir?: string;
		/** Start week on Monday (default: true) */
		mondaystart?: string;
		/** Custom HTTP headers as JSON string for REST adapter */
		headers?: string;
	}

	let {
		api,
		events,
		theme = 'neutral',
		view = 'week-grid',
		height = '600',
		locale,
		dir,
		mondaystart = 'true',
		headers,
	}: Props = $props();

	// ── Parse attributes ──
	const heightPx = $derived(parseInt(height, 10) || 600);
	const isMondayStart = $derived(mondaystart !== 'false');
	const themeStyle = $derived(
		(presets as Record<string, string>)[theme] ?? presets.neutral
	);
	const dirValue = $derived(
		(dir === 'rtl' || dir === 'ltr' || dir === 'auto') ? dir as 'ltr' | 'rtl' | 'auto' : undefined
	);

	// ── Parse static events from JSON attribute ──
	function parseEvents(json?: string): TimelineEvent[] {
		if (!json) return [];
		try {
			const raw = JSON.parse(json) as Array<Record<string, unknown>>;
			return raw.map((e) => ({
				id: String(e.id ?? crypto.randomUUID()),
				title: String(e.title ?? 'Untitled'),
				start: new Date(e.start as string),
				end: new Date(e.end as string),
				color: e.color ? String(e.color) : undefined,
			}));
		} catch {
			console.warn('[day-calendar] Failed to parse events JSON:', json);
			return [];
		}
	}

	// ── Create adapter ──
	const adapter = $derived.by(() => {
		if (api) {
			const parsedHeaders = headers ? JSON.parse(headers) as Record<string, string> : undefined;
			return createRestAdapter({
				baseUrl: api,
				headers: parsedHeaders,
				mapEvents: (data: unknown) => {
					const arr = Array.isArray(data) ? data : (data as Record<string, unknown>).events as unknown[] ?? [];
					return arr.map((e: unknown) => {
						const ev = e as Record<string, unknown>;
						return {
							id: String(ev.id ?? ''),
							title: String(ev.title ?? 'Untitled'),
							start: new Date(ev.start as string),
							end: new Date(ev.end as string),
							color: ev.color ? String(ev.color) : undefined,
						};
					});
				},
			});
		}
		return createMemoryAdapter(parseEvents(events));
	});

	// ── Default views ──
	const defaultViews: CalendarView[] = [
		{ id: 'day-grid',     label: 'Grid',     granularity: 'day',  component: DayGrid },
		{ id: 'week-grid',    label: 'Grid',     granularity: 'week', component: WeekGrid },
		{ id: 'day-timeline', label: 'Timeline', granularity: 'day',  component: DayTimeline },
		{ id: 'day-agenda',   label: 'Agenda',   granularity: 'day',  component: Agenda, props: { mode: 'day' } },
		{ id: 'week-agenda',  label: 'Agenda',   granularity: 'week', component: Agenda, props: { mode: 'week' } },
		{ id: 'week-heatmap', label: 'Heatmap',  granularity: 'week', component: WeekHeatmap },
	];
</script>

<Calendar
	{adapter}
	views={defaultViews}
	defaultView={view}
	theme={themeStyle}
	height={heightPx}
	mondayStart={isMondayStart}
	dir={dirValue}
	{locale}
/>
