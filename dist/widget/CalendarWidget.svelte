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
<script lang="ts">import Calendar from "../calendar/Calendar.svelte";
import { createMemoryAdapter } from "../adapters/memory.js";
import { presets } from "../theme/presets.js";
let { api, events, theme = "auto", view = "week-planner", height = "600", locale, dir, mondaystart = "true", headers, readonly, pills, nav, mobile, days, compact, timezone } = $props();
// ── Parse attributes ──
const heightValue = $derived.by(() => {
	const trimmed = height.trim();
	if (trimmed === "auto") return "auto";
	if (/^\d+(px)?$/.test(trimmed)) return parseInt(trimmed, 10);
	// "100%" / "50vh" aren't supported — warn instead of rendering a 100px sliver
	console.warn(`[day-calendar] Unsupported height "${height}" — use pixels or "auto". Falling back to 600.`);
	return 600;
});
const isMondayStart = $derived(mondaystart !== "false");
const themeStyle = $derived(theme in presets ? presets[theme] : presets.neutral);
const dirValue = $derived(dir === "rtl" || dir === "ltr" || dir === "auto" ? dir : undefined);
const mobileValue = $derived(mobile === "true" ? true : mobile === "false" ? false : "auto");
const daysValue = $derived.by(() => {
	if (!days) return undefined;
	const n = parseInt(days, 10);
	return Number.isNaN(n) || n < 1 || n > 7 ? undefined : n;
});
// ── Parse static events from JSON attribute ──
function parseHeaders(json) {
	if (!json) return undefined;
	try {
		const parsed = JSON.parse(json);
		const out = {};
		for (const [k, v] of Object.entries(parsed)) {
			out[k] = String(v);
		}
		return out;
	} catch {
		console.warn("[day-calendar] Failed to parse headers JSON:", json);
		return undefined;
	}
}
function toEvent(raw, fallbackId) {
	const start = new Date(String(raw.start ?? ""));
	const end = new Date(String(raw.end ?? ""));
	if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
		return null;
	}
	return {
		id: String(raw.id ?? fallbackId),
		title: String(raw.title ?? "Untitled"),
		start,
		end,
		color: raw.color ? String(raw.color) : undefined,
		allDay: raw.allDay === true ? true : undefined,
		subtitle: typeof raw.subtitle === "string" ? raw.subtitle : undefined,
		location: typeof raw.location === "string" ? raw.location : undefined
	};
}
function parseEvents(json) {
	if (!json) return [];
	try {
		const raw = JSON.parse(json);
		const parsed = raw.map((e, idx) => toEvent(e, `inline-${idx}`)).filter((ev) => ev !== null);
		if (parsed.length !== raw.length) {
			console.warn(`[day-calendar] Ignored ${raw.length - parsed.length} invalid event(s) from events JSON.`);
		}
		return parsed;
	} catch {
		console.warn("[day-calendar] Failed to parse events JSON:", json);
		return [];
	}
}
/**
* The documented widget contract: `GET {api}?start=…&end=…`, answered by
* an array of events or `{ events: [...] }` with ISO date strings. Read
* only — there is no write endpoint to call. No Content-Type on the GET,
* so a cross-origin embed stays a simple request (no CORS preflight)
* unless the page adds its own `headers`.
*/
function createApiAdapter(url, extraHeaders) {
	return { async fetchEvents(range) {
		const params = new URLSearchParams({
			start: range.start.toISOString(),
			end: range.end.toISOString()
		});
		const res = await fetch(`${url}${url.includes("?") ? "&" : "?"}${params}`, { headers: {
			Accept: "application/json",
			...extraHeaders
		} });
		if (!res.ok) throw new Error(`[day-calendar] ${url} answered ${res.status} ${res.statusText}`);
		const data = await res.json();
		const arr = Array.isArray(data) ? data : data && typeof data === "object" && Array.isArray(data.events) ? data.events : [];
		return arr.map((e, idx) => e && typeof e === "object" ? toEvent(e, `api-${idx}`) : null).filter((ev) => ev !== null);
	} };
}
// ── Create adapter ──
const adapter = $derived.by(() => {
	if (api) return createApiAdapter(api, parseHeaders(headers));
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
	readOnly={readonly !== 'false'}
	showModePills={pills !== 'false'}
	showNavigation={nav !== 'false'}
	mobile={mobileValue}
	days={daysValue}
	compact={compact === 'true'}
	timezone={timezone || undefined}
/>
