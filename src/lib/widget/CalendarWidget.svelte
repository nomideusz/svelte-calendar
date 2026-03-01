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
	import { Planner } from '../views/planner/index.js';
	import { Agenda } from '../views/agenda/index.js';
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
		/** Theme preset name: neutral, midnight, bare */
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
	function parseHeaders(json?: string): Record<string, string> | undefined {
		if (!json) return undefined;
		try {
			const parsed = JSON.parse(json) as Record<string, unknown>;
			const out: Record<string, string> = {};
			for (const [k, v] of Object.entries(parsed)) {
				out[k] = String(v);
			}
			return out;
		} catch {
			console.warn('[day-calendar] Failed to parse headers JSON:', json);
			return undefined;
		}
	}

	function toEvent(raw: Record<string, unknown>, fallbackId: string): TimelineEvent | null {
		const start = new Date(String(raw.start ?? ''));
		const end = new Date(String(raw.end ?? ''));
		if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
			return null;
		}
		return {
			id: String(raw.id ?? fallbackId),
			title: String(raw.title ?? 'Untitled'),
			start,
			end,
			color: raw.color ? String(raw.color) : undefined,
		};
	}

	function parseEvents(json?: string): TimelineEvent[] {
		if (!json) return [];
		try {
			const raw = JSON.parse(json) as Array<Record<string, unknown>>;
			const parsed = raw
				.map((e, idx) => toEvent(e, `inline-${idx}`))
				.filter((ev): ev is TimelineEvent => ev !== null);
			if (parsed.length !== raw.length) {
				console.warn(`[day-calendar] Ignored ${raw.length - parsed.length} invalid event(s) from events JSON.`);
			}
			return parsed;
		} catch {
			console.warn('[day-calendar] Failed to parse events JSON:', json);
			return [];
		}
	}

	// ── Create adapter ──
	const adapter = $derived.by(() => {
		if (api) {
			const parsedHeaders = parseHeaders(headers);
			return createRestAdapter({
				baseUrl: api,
				headers: parsedHeaders,
				mapEvents: (data: unknown) => {
					const arr = Array.isArray(data) ? data : (data as Record<string, unknown>).events as unknown[] ?? [];
					return arr
						.map((e: unknown, idx) => toEvent(e as Record<string, unknown>, `api-${idx}`))
						.filter((ev): ev is TimelineEvent => ev !== null);
				},
			});
		}
		return createMemoryAdapter(parseEvents(events));
	});

	// ── Default views ──
	const defaultViews: CalendarView[] = [
		{ id: 'day-grid',     label: 'Planner',  granularity: 'day',  component: Planner, props: { mode: 'day' } },
		{ id: 'week-grid',    label: 'Planner',  granularity: 'week', component: Planner, props: { mode: 'week' } },
		{ id: 'day-agenda',   label: 'Agenda',   granularity: 'day',  component: Agenda, props: { mode: 'day' } },
		{ id: 'week-agenda',  label: 'Agenda',   granularity: 'week', component: Agenda, props: { mode: 'week' } },
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
