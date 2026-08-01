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
import { createRestAdapter } from "../adapters/rest.js";
import { createMemoryAdapter } from "../adapters/memory.js";
import { presets } from "../theme/presets.js";
let {
  api,
  events,
  theme = "auto",
  view = "week-planner",
  height = "600",
  locale,
  dir,
  mondaystart = "true",
  headers,
  readonly,
  pills,
  nav,
  mobile,
  days,
  compact,
  timezone
} = $props();
const heightValue = $derived.by(() => {
  const trimmed = height.trim();
  if (trimmed === "auto") return "auto";
  if (/^\d+(px)?$/.test(trimmed)) return parseInt(trimmed, 10);
  console.warn(`[day-calendar] Unsupported height "${height}" \u2014 use pixels or "auto". Falling back to 600.`);
  return 600;
});
const isMondayStart = $derived(mondaystart !== "false");
const themeStyle = $derived(
  theme in presets ? presets[theme] : presets.neutral
);
const dirValue = $derived(
  dir === "rtl" || dir === "ltr" || dir === "auto" ? dir : void 0
);
const mobileValue = $derived(
  mobile === "true" ? true : mobile === "false" ? false : "auto"
);
const daysValue = $derived.by(() => {
  if (!days) return void 0;
  const n = parseInt(days, 10);
  return Number.isNaN(n) || n < 1 || n > 7 ? void 0 : n;
});
function parseHeaders(json) {
  if (!json) return void 0;
  try {
    const parsed = JSON.parse(json);
    const out = {};
    for (const [k, v] of Object.entries(parsed)) {
      out[k] = String(v);
    }
    return out;
  } catch {
    console.warn("[day-calendar] Failed to parse headers JSON:", json);
    return void 0;
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
    color: raw.color ? String(raw.color) : void 0
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
const adapter = $derived.by(() => {
  if (api) {
    const parsedHeaders = parseHeaders(headers);
    return createRestAdapter({
      baseUrl: api,
      headers: parsedHeaders,
      mapEvents: (data) => {
        const arr = Array.isArray(data) ? data : data.events ?? [];
        return arr.map((e, idx) => toEvent(e, `api-${idx}`)).filter((ev) => ev !== null);
      }
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
