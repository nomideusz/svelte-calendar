<script lang="ts">
	import { onMount } from "svelte";
	import {
		Calendar,
		createMemoryAdapter,
		createRecurringAdapter,
		createCompositeAdapter,
		generatePalette,
		auto,
		neutral,
		presets,
	} from "$lib/index.js";
	import type { PresetName } from "$lib/index.js";
	import Settings from "./_components/Settings.svelte";
	import type { SettingsField } from "./_components/Settings.svelte";
	import type { CalendarView, TimelineEvent } from "$lib/index.js";
	import { themeStore, demoThemes } from "./theme.svelte.js";
	import { createDemoEvents, createDemoRecurring } from "./demo-events.js";

	type SettingValue = string | number | boolean;

	let isMobile = $state(false);

	onMount(() => {
		const mql = window.matchMedia("(max-width: 768px)");
		isMobile = mql.matches;
		function onChange(e: MediaQueryListEvent) {
			isMobile = e.matches;
		}
		mql.addEventListener("change", onChange);
		return () => mql.removeEventListener("change", onChange);
	});

	function createVisibleHours(
		enabled: boolean,
		startValue: SettingValue | undefined,
		endValue: SettingValue | undefined,
	): [number, number] | undefined {
		if (!enabled) return undefined;

		const startHour = Number(startValue ?? 6);
		const endHour = Math.max(startHour + 1, Number(endValue ?? 21));

		return [startHour, endHour];
	}

	function toMobileMode(value: SettingValue | undefined): "auto" | boolean {
		if (value === "force") return true;
		if (value === "desktop") return false;

		return "auto";
	}

	const calendarHeight = $derived(isMobile ? 500 : 700);
	const calendarRadius = $derived(isMobile ? 0 : 12);

	const DEFAULT_SETTINGS: Record<string, SettingValue> = {
		readOnly: false,
		mondayStart: true,
		showModePills: true,
		showNavigation: true,
		equalDays: false,
		activeView: "day-planner",
		locale: "en-US",
		showDates: true,
		calendarPreset: "auto",
		mobileMode: "auto",
		days: 7,
		visibleHoursEnabled: false,
		startHour: 6,
		endHour: 21,
		blockedSlotsEnabled: true,
		disabledDatesEnabled: true,
		compact: false,
		columns: false,
		rtl: false,
		phoneFrame: false,
	};

	let settingsValues = $state<Record<string, SettingValue>>({ ...DEFAULT_SETTINGS });

	// ── Recipes: one-click prop bundles showing common setups ──
	const recipes: { name: string; hint: string; values: Record<string, SettingValue> }[] = [
		{
			name: "Booking page",
			hint: "Editable week grid with business hours, blocked lunch slots, and disabled dates",
			values: {
				activeView: "week-planner", readOnly: false,
				visibleHoursEnabled: true, startHour: 8, endHour: 20,
				blockedSlotsEnabled: true, disabledDatesEnabled: true,
			},
		},
		{
			name: "Class timetable",
			hint: "Fixed weekly template: day names only, no past-day dimming, read-only",
			values: {
				activeView: "week-planner", readOnly: true,
				showDates: false, equalDays: true,
				visibleHoursEnabled: true, startHour: 7, endHour: 21,
				blockedSlotsEnabled: false, disabledDatesEnabled: false,
			},
		},
		{
			name: "Studio timetable",
			hint: "Week agenda as side-by-side day columns — classic class-schedule grid",
			values: {
				activeView: "week-agenda", readOnly: true, columns: true,
				showModePills: false, showNavigation: false,
				showDates: false, equalDays: true,
				blockedSlotsEnabled: false, disabledDatesEnabled: false,
			},
		},
		{
			name: "Embedded schedule",
			hint: "Chromeless compact agenda for dropping into an existing page",
			values: {
				activeView: "week-agenda", readOnly: true, compact: true,
				showModePills: false, showNavigation: false, equalDays: true,
				blockedSlotsEnabled: false, disabledDatesEnabled: false,
			},
		},
	];

	// Active recipe derived by comparison, so manual tweaks un-highlight it.
	const activeRecipe = $derived(
		recipes.find((r) =>
			Object.entries({ ...DEFAULT_SETTINGS, ...r.values }).every(
				([k, v]) => settingsValues[k] === v,
			),
		)?.name ?? "",
	);
	function applyRecipe(recipe: (typeof recipes)[number]) {
		settingsValues = { ...DEFAULT_SETTINGS, ...recipe.values };
	}
	function resetSettings() {
		settingsValues = { ...DEFAULT_SETTINGS };
	}

	const readOnly = $derived(Boolean(settingsValues.readOnly));
	const mondayStart = $derived(Boolean(settingsValues.mondayStart));
	const showModePills = $derived(
		Boolean(settingsValues.showModePills ?? true),
	);
	const showNavigation = $derived(
		Boolean(settingsValues.showNavigation ?? true),
	);
	const equalDays = $derived(Boolean(settingsValues.equalDays));
	const showDates = $derived(Boolean(settingsValues.showDates ?? true));
	const visibleHoursEnabled = $derived(Boolean(settingsValues.visibleHoursEnabled));
	const visibleHours = $derived<[number, number] | undefined>(
		createVisibleHours(
			visibleHoursEnabled,
			settingsValues.startHour,
			settingsValues.endHour,
		),
	);
	const mobileMode = $derived<"auto" | boolean>(toMobileMode(settingsValues.mobileMode));
	const days = $derived(Math.max(1, Math.min(14, Number(settingsValues.days ?? 7))));
	const compact = $derived(Boolean(settingsValues.compact));
	const columns = $derived(Boolean(settingsValues.columns));
	const blockedSlotsEnabled = $derived(Boolean(settingsValues.blockedSlotsEnabled));
	const disabledDatesEnabled = $derived(Boolean(settingsValues.disabledDatesEnabled));
	const activeView = $derived(
		(settingsValues.activeView as CalendarView["id"]) ?? "week-planner",
	);
	const locale = $derived((settingsValues.locale as string) ?? "en-US");
	const dir = $derived<"ltr" | "rtl">(settingsValues.rtl ? "rtl" : "ltr");
	const phoneFrame = $derived(Boolean(settingsValues.phoneFrame));

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	// ── Option applicability: which views actually read each option ──
	// Grounded in what each view pulls from context (grep ctx.* per view dir).
	// Inert controls disable with a reason instead of silently doing nothing.
	const inViews = (views: string[], reason: string) =>
		(v: Record<string, SettingValue>) => !views.includes(String(v.activeView)) && reason;
	const PLANNERS = ["week-planner", "day-planner"];
	const AGENDAS = ["week-agenda", "day-agenda"];
	const WEEKS = ["week-planner", "week-agenda"];

	const settingsFields: SettingsField[] = [
		{
			key: "activeView",
			hint: "Which built-in view renders: Planner is a time grid, Agenda is a list",
			label: "View",
			group: "",
			type: "select",
			options: [
				{ value: "week-planner", label: "Week Planner" },
				{ value: "day-planner", label: "Day Planner" },
				{ value: "week-agenda", label: "Week Agenda" },
				{ value: "day-agenda", label: "Day Agenda" },
				{ value: "month-grid", label: "Month Grid" },
			],
		},
		{
			key: "calendarPreset",
			hint: "auto probes your page and matches it; neutral/midnight are fixed presets",
			label: "Theme",
			group: "",
			type: "select",
			options: [
				{ value: "auto", label: "Auto (adapt to page)" },
				{ value: "neutral", label: "Neutral (light)" },
				{ value: "midnight", label: "Midnight (dark)" },
			],
		},
		{
			key: "locale",
			hint: "BCP 47 tag for date/time formatting (prop: locale)",
			label: "Locale",
			group: "",
			type: "select",
			options: [
				{ value: "en-US", label: "en-US" },
				{ value: "pl-PL", label: "pl-PL" },
				{ value: "de-DE", label: "de-DE" },
				{ value: "fr-FR", label: "fr-FR" },
				{ value: "ar-SA", label: "ar-SA" },
			],
		},
		{
			key: "mobileMode",
			hint: "Below 768px the calendar swaps to touch-first views (prop: mobile)",
			label: "Mobile",
			group: "",
			type: "select",
			options: [
				{ value: "auto", label: "Auto" },
				{ value: "force", label: "Force mobile" },
				{ value: "desktop", label: "Force desktop" },
			],
		},

		{
			key: "mondayStart",
			hint: "Start weeks on Monday instead of Sunday",
			label: "Monday Start",
			group: "",
			type: "toggle",
			disabledWhen: inViews([...WEEKS, "month-grid"], "Single-day view — no week start"),
		},
		{ key: "readOnly",
			hint: "Disables drag, resize, and click-to-create", label: "Read Only", group: "", type: "toggle",
			disabledWhen: inViews(PLANNERS, "No drag editing in this view") },
		{
			key: "showModePills",
			hint: "Day/Week switch in the header (prop: showModePills)",
			label: "Mode Pills",
			group: "",
			type: "toggle",
		},
		{
			key: "showNavigation",
			hint: "Prev/next arrows and Today button in the header",
			label: "Navigation",
			group: "",
			type: "toggle",
		},
		{ key: "equalDays",
			hint: "No past-day dimming — for template schedules", label: "Equal Days", group: "", type: "toggle",
			disabledWhen: inViews([...PLANNERS, ...AGENDAS], "Not used by Month Grid") },
		{ key: "showDates",
			hint: "Off: headers show day names only (Mon, Tue, …)", label: "Show Dates", group: "", type: "toggle",
			disabledWhen: inViews([...PLANNERS, ...AGENDAS], "Not used by Month Grid") },
		{ key: "rtl",
			hint: "Right-to-left text direction (prop: dir='rtl')", label: "RTL", group: "", type: "toggle" },
		{ key: "compact",
			hint: "Minimal dot + time + title rows in Agenda views (prop: compact)", label: "Compact Agenda", group: "", type: "toggle",
			disabledWhen: (v) =>
				(!AGENDAS.includes(String(v.activeView)) && "Agenda views only") ||
				(v.activeView === "week-agenda" && v.columns === true && "Overridden by Timetable Columns") },
		{ key: "columns",
			hint: "Week agenda days as side-by-side timetable columns on desktop; overrides Compact (prop: columns)", label: "Timetable Columns", group: "", type: "toggle",
			disabledWhen: inViews(["week-agenda"], "Week Agenda only") },
		{ key: "phoneFrame",
			hint: "Preview in a 390px frame — the container-based mobile mode kicks in", label: "Phone Frame", group: "", type: "toggle",
			disabledWhen: (v) => v.mobileMode === "force" && "Mobile views already forced" },
		{
			key: "blockedSlotsEnabled",
			hint: "Hatched unbookable ranges, e.g. lunch breaks (prop: blockedSlots)",
			label: "Blocked Slots",
			group: "Availability",
			type: "toggle",
			disabledWhen: inViews(PLANNERS, "Planner views only"),
		},
		{
			key: "disabledDatesEnabled",
			hint: "Dates that reject event creation and moves (prop: disabledDates)",
			label: "Disabled Dates",
			group: "Availability",
			type: "toggle",
		},
		{
			key: "visibleHoursEnabled",
			hint: "Crop the grid to a start/end hour (prop: visibleHours)",
			label: "Visible Hours",
			group: "Planner",
			type: "toggle",
			disabledWhen: inViews(PLANNERS, "Planner views only"),
		},
		{
			key: "startHour",
			hint: "First visible hour of the grid",
			label: "Start Hour",
			group: "Planner",
			type: "range",
			min: 0,
			max: 22,
			step: 1,
			enabledWhen: "visibleHoursEnabled",
			disabledWhen: inViews(PLANNERS, "Planner views only"),
		},
		{
			key: "endHour",
			hint: "Hour the grid ends at (exclusive)",
			label: "End Hour",
			group: "Planner",
			type: "range",
			min: 1,
			max: 24,
			step: 1,
			enabledWhen: "visibleHoursEnabled",
			disabledWhen: inViews(PLANNERS, "Planner views only"),
		},
		{
			key: "days",
			hint: "Days per week view — 5 = workweek, 3 = rolling window (prop: days)",
			label: "Week Days",
			group: "Planner",
			type: "range",
			min: 1,
			max: 14,
			step: 1,
			disabledWhen: inViews(WEEKS, "Week views only"),
		},
	];

	// ── Seed data (auto-generated relative to today) ──────
	const seed: TimelineEvent[] = createDemoEvents(today);
	const recurring = createDemoRecurring();

	// ── Adapter (palette adapts to demo theme accent) ─────────
	// Composite: one-off events (memory) + recurring schedule
	const accent = $derived(demoThemes[themeStore.current].accent);
	const palette = $derived(generatePalette(accent));
	const adapter = $derived(
		createCompositeAdapter([
			createMemoryAdapter(seed, { palette }),
			createRecurringAdapter(recurring, { palette }),
		]),
	);

	// ── Calendar preset theme (from Settings panel) ───────
	const selectedPreset = $derived(
		(settingsValues.calendarPreset as string) ?? "auto",
	);
	const calendarTheme = $derived(
		presets[selectedPreset as PresetName] ?? auto,
	);
	// Enable smart auto-probe only when the "auto" preset is selected.
	// For explicit presets (neutral, midnight), disable auto-probing.
	const autoThemeProp = $derived(selectedPreset === "auto" ? {} : false);

	// ── Callbacks ──────────────────────────────────────────
	let lastAction = $state("");
	function handleClick(ev: TimelineEvent) {
		lastAction = `Clicked: ${ev.title}`;
	}
	function handleCreate(range: { start: Date; end: Date }) {
		lastAction = `Create: ${range.start.toLocaleTimeString()} – ${range.end.toLocaleTimeString()}`;
	}
	function handleMove(event: TimelineEvent, start: Date, end: Date) {
		lastAction = `Moved: ${event.title} → ${start.toLocaleTimeString()} – ${end.toLocaleTimeString()}`;
	}
	function handleViewChange(viewId: CalendarView["id"]) {
		if (activeView !== viewId) {
			settingsValues = { ...settingsValues, activeView: viewId };
		}
	}
	// Month → day drill-down: clicking a month cell (or "+N more") jumps to
	// the day planner focused on that date, via the controlled currentDate prop.
	let focusedDate = $state<Date | undefined>(undefined);
	function handleDayClick(date: Date) {
		focusedDate = date;
		if (activeView !== "day-planner") {
			settingsValues = { ...settingsValues, activeView: "day-planner" };
		}
		lastAction = `Day: ${date.toLocaleDateString()}`;
	}

	const blockedSlots = $derived(
		blockedSlotsEnabled
			? [
					{ start: 12, end: 13, label: "Lunch" },
					{ day: 6, start: 0, end: 9, label: "Sat morning" },
					{ day: 7, start: 0, end: 9, label: "Sun morning" },
				]
			: undefined,
	);
	const disabledDates = $derived(
		disabledDatesEnabled
			? [
					new Date(today.getTime() + 2 * 86_400_000),
					new Date(today.getTime() + 4 * 86_400_000),
				]
			: undefined,
	);

	// ── Live code snippet: the <Calendar> markup for the current settings ──
	const codeSnippet = $derived.by(() => {
		const extraImports = selectedPreset !== "auto" ? `, ${selectedPreset}` : "";
		const script: string[] = [
			`  import { Calendar, createMemoryAdapter${extraImports} } from '@nomideusz/svelte-calendar';`,
			"",
			"  const adapter = createMemoryAdapter(events);",
		];
		if (blockedSlotsEnabled) {
			script.push(
				"  const blockedSlots = [",
				"    { start: 12, end: 13, label: 'Lunch' },        // every day 12–13",
				"    { day: 6, start: 0, end: 9, label: 'Sat morning' },",
				"    { day: 7, start: 0, end: 9, label: 'Sun morning' },",
				"  ];",
			);
		}
		if (disabledDatesEnabled) {
			script.push("  const disabledDates = [/* Date objects to grey out */];");
		}

		const props: string[] = ["{adapter}", `view="${activeView}"`];
		if (selectedPreset !== "auto") props.push(`theme={${selectedPreset}}`);
		if (locale !== "en-US") props.push(`locale="${locale}"`);
		if (dir === "rtl") props.push(`dir="rtl"`);
		if (readOnly) props.push("readOnly");
		if (!mondayStart) props.push("mondayStart={false}");
		if (!showModePills) props.push("showModePills={false}");
		if (!showNavigation) props.push("showNavigation={false}");
		if (equalDays) props.push("equalDays");
		if (!showDates) props.push("showDates={false}");
		if (compact) props.push("compact");
		if (columns) props.push("columns");
		if (days !== 7) props.push(`days={${days}}`);
		if (visibleHours) props.push(`visibleHours={[${visibleHours[0]}, ${visibleHours[1]}]}`);
		if (mobileMode !== "auto") props.push(`mobile={${mobileMode}}`);
		if (blockedSlotsEnabled) props.push("{blockedSlots}");
		if (disabledDatesEnabled) props.push("{disabledDates}");

		// '</' + 'script>' split so the Svelte compiler doesn't end this block early
		return `<script>\n${script.join("\n")}\n</` + `script>\n\n<Calendar\n${props.map((p) => `  ${p}`).join("\n")}\n/>`;
	});
</script>

<svelte:head>
	<title>svelte-calendar – Demo</title>
</svelte:head>

<main>
	<h1 class="page-title">
		svelte-calendar <span class="page-title-sub">— interactive demo</span>
	</h1>

	<div class="recipes" role="group" aria-label="Example setups">
		<span class="recipes-lbl">Examples</span>
		{#each recipes as r (r.name)}
			<button
				class="recipe"
				class:recipe--on={activeRecipe === r.name}
				title={r.hint}
				onclick={() => applyRecipe(r)}
			>
				{r.name}
			</button>
		{/each}
		<button class="recipe recipe--reset" onclick={resetSettings}>Reset</button>
	</div>

	<Settings fields={settingsFields} bind:values={settingsValues} />

	<div class="toolbar">
		<div class="action-area">
			{#if lastAction}
				<div class="action">
					<span class="dot"></span>
					{lastAction}
				</div>
			{/if}
		</div>
	</div>

	<div class="cal-stage" class:cal-stage--phone={phoneFrame}>
		<div class="cal-frame">
			<Calendar
				{adapter}
				view={activeView}
				theme={calendarTheme}
				autoTheme={autoThemeProp}
				height={phoneFrame ? 688 : calendarHeight}
				borderRadius={phoneFrame ? 0 : calendarRadius}
				currentDate={focusedDate}
				{readOnly}
				{mondayStart}
				{showModePills}
				{showNavigation}
				{equalDays}
				{showDates}
				{visibleHours}
				mobile={mobileMode}
				{days}
				{compact}
				{columns}
				{locale}
				{dir}
				blockedSlots={blockedSlots}
				disabledDates={disabledDates}
				onviewchange={handleViewChange}
				oneventclick={handleClick}
				oneventcreate={handleCreate}
				oneventmove={handleMove}
				ondayclick={handleDayClick}
			/>
		</div>
	</div>

	<details class="code-panel" open>
		<summary>Code for this setup</summary>
		<pre><code>{codeSnippet}</code></pre>
	</details>
</main>

<style>
	main {
		max-width: 1100px;
		margin: 0 auto;
		padding: 32px 24px 64px;
		background: var(--dt-stage-bg, #080a0f);
		transition:
			background 300ms ease,
			color 300ms ease;
	}

	@media (max-width: 600px) {
		main {
			padding: 16px 0 32px;
		}
	}

	.page-title {
		margin: 0 0 14px;
		padding: 0 10px;
		font: 600 18px/1.25 var(--dt-sans, "Outfit", system-ui, sans-serif);
		letter-spacing: -0.01em;
		color: var(--dt-text, rgba(226, 232, 240, 0.9));
	}
	.page-title-sub {
		font-weight: 400;
		font-size: 15px;
		color: var(--dt-text-2, rgba(148, 163, 184, 0.6));
	}

	.recipes {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		margin: 0 0 12px;
		padding: 0 10px;
	}
	.recipes-lbl {
		font: 700 10px/1 var(--dt-sans, "Outfit", system-ui, sans-serif);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dt-text-3, rgba(148, 163, 184, 0.52));
	}
	.recipe {
		font: 600 12px/1 var(--dt-sans, "Outfit", system-ui, sans-serif);
		padding: 6px 12px;
		border-radius: 999px;
		border: 1px solid color-mix(in srgb, var(--dt-text-2, rgba(148, 163, 184, 0.6)) 30%, transparent);
		background: color-mix(in srgb, var(--dt-text-3, rgba(148, 163, 184, 0.4)) 12%, transparent);
		color: var(--dt-text-2, rgba(226, 232, 240, 0.6));
		cursor: pointer;
		transition: all 150ms;
	}
	.recipe:hover {
		color: var(--dt-text, rgba(226, 232, 240, 0.9));
		border-color: color-mix(in srgb, var(--dt-text-2, rgba(148, 163, 184, 0.6)) 58%, transparent);
	}
	.recipe--on {
		background: color-mix(in srgb, var(--dt-accent, #6366f1) 22%, transparent);
		border-color: color-mix(in srgb, var(--dt-accent, #6366f1) 60%, transparent);
		color: var(--dt-text, rgba(226, 232, 240, 0.92));
	}
	.recipe--reset {
		margin-left: auto;
		border-style: dashed;
	}

	.cal-stage--phone {
		display: flex;
		justify-content: center;
		padding: 12px 0;
	}
	.cal-stage--phone .cal-frame {
		width: 390px;
		max-width: 100%;
		border: 8px solid color-mix(in srgb, var(--dt-text-3, rgba(148, 163, 184, 0.4)) 35%, var(--dt-surface, #10141c));
		border-radius: 30px;
		overflow: hidden;
		box-shadow: 0 18px 48px color-mix(in srgb, var(--dt-text, rgba(0, 0, 0, 0.8)) 12%, transparent);
	}

	.code-panel {
		margin-top: 16px;
		border: 1px solid var(--dt-border-day, rgba(148, 163, 184, 0.14));
		border-radius: 10px;
		overflow: hidden;
	}
	.code-panel summary {
		padding: 10px 14px;
		cursor: pointer;
		list-style: none;
		font: 700 10px/1 var(--dt-sans, "Outfit", system-ui, sans-serif);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dt-text-3, rgba(148, 163, 184, 0.55));
		background: color-mix(in srgb, var(--dt-text-3, rgba(148, 163, 184, 0.4)) 8%, transparent);
	}
	.code-panel summary::-webkit-details-marker {
		display: none;
	}
	.code-panel summary::after {
		content: " +";
	}
	.code-panel[open] summary::after {
		content: " –";
	}
	.code-panel pre {
		margin: 0;
		padding: 14px 16px;
		overflow-x: auto;
		font: 400 12.5px/1.55 var(--dt-mono, ui-monospace, "Cascadia Code", monospace);
		color: var(--dt-text-2, rgba(226, 232, 240, 0.72));
		background: var(--dt-surface, rgba(0, 0, 0, 0.18));
		scrollbar-width: thin;
	}

	.toolbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px;
		gap: 12px;
		margin: -4px 0 16px;
	}
	.action-area {
		flex: 1;
		min-width: 0;
		padding-top: 5px;
	}
	.action {
		font: 400 11px/1.2 var(--dt-sans, "Outfit", system-ui, sans-serif);
		color: var(--dt-text-2, rgba(226, 232, 240, 0.6));
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 0 10px;
	}
	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--dt-success, #34d399);
		flex-shrink: 0;
	}
	@media (max-width: 760px) {
		.toolbar {
			flex-direction: column;
			align-items: stretch;
			padding: 0 16px;
		}
	}
</style>
