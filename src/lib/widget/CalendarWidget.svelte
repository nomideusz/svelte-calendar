<!--
  CalendarWidget — self-contained calendar for embedding via <day-calendar> custom element.

  Accepts simple HTML attributes and wires up the full Calendar with sensible defaults.
  Designed for non-Svelte sites (plain HTML, WordPress, Squarespace, etc.).

  Usage as custom element:
    <day-calendar
      api="https://myschool.com/api/events"
      theme="neutral"
      view="week-planner"
      height="600"
      locale="en-US"
    ></day-calendar>
-->
<script lang="ts">
	import Calendar from '../calendar/Calendar.svelte';
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
		/** Theme preset name: auto (default — adapts to the host page), neutral, midnight */
		theme?: string;
		/** Default view ID */
		view?: string;
		/** Calendar height: pixels (e.g. "600") or "auto" */
		height?: string;
		/** BCP 47 locale tag (e.g. 'en-US', 'pl-PL') */
		locale?: string;
		/** Text direction: ltr, rtl, auto */
		dir?: string;
		/** Start week on Monday (default: true) */
		mondaystart?: string;
		/** Custom HTTP headers as JSON string for REST adapter */
		headers?: string;
		/** Read-only mode: "true" disables drag/resize/create */
		readonly?: string;
		/** Show the Day/Week/Month pills (default: true) */
		pills?: string;
		/** Show prev/next/today navigation (default: true) */
		nav?: string;
		/** Mobile mode: "auto" (default), "true", "false" */
		mobile?: string;
		/** Days shown in week mode, e.g. "3" or "5" */
		days?: string;
		/** Compact agenda rendering: "true" */
		compact?: string;
		/** IANA timezone, e.g. "Europe/Warsaw" */
		timezone?: string;
	}

	let {
		api,
		events,
		theme = 'auto',
		view = 'week-planner',
		height = '600',
		locale,
		dir,
		mondaystart = 'true',
		headers,
		readonly,
		pills,
		nav,
		mobile,
		days,
		compact,
		timezone,
	}: Props = $props();

	// ── Parse attributes ──
	const heightValue = $derived.by((): number | 'auto' => {
		const trimmed = height.trim();
		if (trimmed === 'auto') return 'auto';
		if (/^\d+(px)?$/.test(trimmed)) return parseInt(trimmed, 10);
		// "100%" / "50vh" aren't supported — warn instead of rendering a 100px sliver
		console.warn(`[day-calendar] Unsupported height "${height}" — use pixels or "auto". Falling back to 600.`);
		return 600;
	});
	const isMondayStart = $derived(mondaystart !== 'false');
	const themeStyle = $derived(
		theme in presets ? presets[theme as PresetName] : presets.neutral
	);
	const dirValue = $derived(
		(dir === 'rtl' || dir === 'ltr' || dir === 'auto') ? dir as 'ltr' | 'rtl' | 'auto' : undefined
	);
	const mobileValue = $derived(
		mobile === 'true' ? true : mobile === 'false' ? false : ('auto' as const)
	);
	const daysValue = $derived.by(() => {
		if (!days) return undefined;
		const n = parseInt(days, 10);
		return Number.isNaN(n) || n < 1 || n > 7 ? undefined : n;
	});

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
</script>

<Calendar
	{adapter}
	{view}
	theme={themeStyle}
	height={heightValue}
	mondayStart={isMondayStart}
	dir={dirValue}
	{locale}
	readOnly={readonly === 'true'}
	showModePills={pills !== 'false'}
	showNavigation={nav !== 'false'}
	mobile={mobileValue}
	days={daysValue}
	compact={compact === 'true'}
	timezone={timezone || undefined}
/>
