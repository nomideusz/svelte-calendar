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
		addDaysMs,
	} from "#lib/index.js";
	import type { PresetName, CalendarLabels } from "#lib/index.js";
	import Settings from "./_components/Settings.svelte";
	import type { SettingsField } from "./_components/Settings.svelte";
	import type { CalendarView, TimelineEvent } from "#lib/index.js";
	import { themeStore, demoThemes, boardStore } from "./theme.svelte.js";
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
	const calendarRadius = $derived(isMobile ? 0 : 4);

	const DEFAULT_SETTINGS: Record<string, SettingValue> = {
		readOnly: false,
		mondayStart: true,
		showModePills: true,
		showNavigation: true,
		equalDays: false,
		activeView: "day-planner",
		locale: "en-US",
		timezone: "",
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
		{ name: "Default", hint: "Every prop at its default — day planner, editable", values: {} },
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
	const timezone = $derived((settingsValues.timezone as string) || undefined);
	// The board clock in the header shows the zone the calendar shows.
	$effect(() => {
		boardStore.timezone = timezone ?? "";
	});

	// The calendar formats dates in `locale` by itself; its UI words come from
	// `labels` — a partial set is merged over the English defaults.
	const LABELS: Record<string, Partial<CalendarLabels>> = {
		"pl-PL": {
			today: "Dziś", day: "Dzień", week: "Tydzień", month: "Miesiąc",
			planner: "Plan", agenda: "Lista", scroll: "Tygodnie", allDay: "Cały dzień",
			noEvents: "Brak wydarzeń", nothingScheduled: "Nic nie zaplanowano",
			goToToday: "Przejdź do dziś", unavailable: "Niedostępne",
			cancelled: "odwołane", full: "brak miejsc", nMore: (n) => `+${n} więcej`,
		},
		"de-DE": {
			today: "Heute", day: "Tag", week: "Woche", month: "Monat",
			planner: "Planer", agenda: "Liste", scroll: "Wochen", allDay: "Ganztägig",
			noEvents: "Keine Termine", nothingScheduled: "Nichts geplant",
			goToToday: "Zu heute", unavailable: "Nicht verfügbar",
			cancelled: "abgesagt", full: "ausgebucht", nMore: (n) => `+${n} weitere`,
		},
		"fr-FR": {
			today: "Aujourd’hui", day: "Jour", week: "Semaine", month: "Mois",
			planner: "Planning", agenda: "Liste", scroll: "Semaines", allDay: "Toute la journée",
			noEvents: "Aucun événement", nothingScheduled: "Rien de prévu",
			goToToday: "Aller à aujourd’hui", unavailable: "Indisponible",
			cancelled: "annulé", full: "complet", nMore: (n) => `+${n} de plus`,
		},
	};
	const labels = $derived(LABELS[locale]);
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
	const WEEKS = ["week-planner", "week-scroll", "week-agenda"];
	// Views with a time axis: the planners' grid, week-scroll's chip heights.
	const TIMED = [...PLANNERS, "week-scroll"];

	// Every control is named for the prop it drives; options read as values.
	const settingsFields: SettingsField[] = [
		{
			key: "activeView", label: "view", type: "select",
			hint: "Which built-in view renders: planners are time grids, agendas are lists",
			options: ["week-planner", "week-scroll", "day-planner", "week-agenda", "day-agenda", "month-grid"]
				.map((v) => ({ value: v, label: v })),
		},
		{
			key: "calendarPreset", label: "theme", type: "select",
			hint: "auto reads the host page's colours and type; neutral and midnight are fixed presets",
			options: [
				{ value: "auto", label: "auto" },
				{ value: "neutral", label: "neutral" },
				{ value: "midnight", label: "midnight" },
			],
		},
		{
			key: "locale", label: "locale", type: "select",
			hint: "BCP 47 tag for dates, weekdays and the 12/24-hour clock",
			options: ["en-US", "pl-PL", "de-DE", "fr-FR", "ar-SA"].map((v) => ({ value: v, label: v })),
		},
		{
			key: "timezone", label: "timezone", type: "select",
			hint: "Show events and the now line in an IANA zone instead of the visitor's own",
			options: [
				{ value: "", label: "visitor's own" },
				...["Europe/Warsaw", "America/New_York", "Asia/Tokyo"].map((v) => ({ value: v, label: v })),
			],
		},
		{
			key: "mobileMode", label: "mobile", type: "select",
			hint: "Below 768px of container width the calendar swaps to touch-first views",
			options: [
				{ value: "auto", label: "'auto'" },
				{ value: "force", label: "true" },
				{ value: "desktop", label: "false" },
			],
		},

		{ key: "mondayStart", label: "mondayStart", type: "toggle",
			hint: "Start weeks on Monday instead of Sunday",
			disabledWhen: inViews([...WEEKS, "month-grid"], "Single-day view — no week start") },
		{ key: "readOnly", label: "readOnly", type: "toggle",
			hint: "Turns off drag, resize and drag-to-create",
			disabledWhen: inViews(TIMED, "No drag editing in this view") },
		{ key: "showModePills", label: "showModePills", type: "toggle",
			hint: "The view switch in the header" },
		{ key: "showNavigation", label: "showNavigation", type: "toggle",
			hint: "Previous/next arrows and the Today button" },
		{ key: "equalDays", label: "equalDays", type: "toggle",
			hint: "No past-day dimming — for template schedules",
			disabledWhen: inViews([...TIMED, ...AGENDAS], "Not used by month-grid") },
		{ key: "showDates", label: "showDates", type: "toggle",
			hint: "Off: headers show day names only (Mon, Tue, …)",
			disabledWhen: inViews([...TIMED, ...AGENDAS], "Not used by month-grid") },
		{ key: "rtl", label: 'dir="rtl"', type: "toggle",
			hint: "Right-to-left layout" },
		{ key: "compact", label: "compact", type: "toggle",
			hint: "Minimal dot, time and title rows in agenda views",
			disabledWhen: (v) =>
				(!AGENDAS.includes(String(v.activeView)) && "Agenda views only") ||
				(v.activeView === "week-agenda" && v.columns === true && "Overridden by columns") },
		{ key: "columns", label: "columns", type: "toggle",
			hint: "Week agenda days as side-by-side timetable columns on desktop; overrides compact",
			disabledWhen: inViews(["week-agenda"], "week-agenda only") },
		{ key: "blockedSlotsEnabled", label: "blockedSlots", type: "toggle",
			hint: "Hatched unbookable ranges, like a lunch break",
			disabledWhen: inViews(TIMED, "Planner and scroll views only") },
		{ key: "disabledDatesEnabled", label: "disabledDates", type: "toggle",
			hint: "Dates that refuse new events and moves" },
		{ key: "visibleHoursEnabled", label: "visibleHours", type: "toggle",
			hint: "Crop the grid to a start and end hour",
			disabledWhen: inViews(TIMED, "Planner and scroll views only") },
		{ key: "phoneFrame", label: "390px container", type: "toggle",
			hint: "Not a prop: a 390px-wide host — the container-based mobile mode kicks in",
			disabledWhen: (v) => v.mobileMode === "force" && "Mobile views already forced" },
		{ key: "startHour", label: "visibleHours[0]", type: "range", min: 0, max: 22, step: 1,
			hint: "First visible hour of the grid",
			enabledWhen: "visibleHoursEnabled",
			disabledWhen: inViews(TIMED, "Planner and scroll views only") },
		{ key: "endHour", label: "visibleHours[1]", type: "range", min: 1, max: 24, step: 1,
			hint: "Hour the grid ends at (exclusive)",
			enabledWhen: "visibleHoursEnabled",
			disabledWhen: inViews(TIMED, "Planner and scroll views only") },
		{ key: "days", label: "days", type: "range", min: 1, max: 14, step: 1,
			hint: "Days per week view — 5 is a workweek, 3 a rolling window",
			disabledWhen: inViews(["week-planner", "week-agenda"], "week-planner and week-agenda only") },
	];

	// ── Seed data (auto-generated relative to today) ──────
	// Both are state: moving a recurring occurrence takes that date out of its
	// rule and files the result as a one-off, which is what a real host does.
	let seed = $state<TimelineEvent[]>(createDemoEvents(today));
	let recurring = $state(createDemoRecurring());

	// ── Adapter (palette adapts to demo theme accent) ─────────
	// Composite: one-off events (memory) + recurring schedule
	const accent = $derived(demoThemes[themeStore.current].accent);
	const palette = $derived(generatePalette(accent));
	const adapter = $derived(
		createCompositeAdapter([
			createMemoryAdapter(seed, { palette }),
			// movable: the demo handles the move itself (see handleMove)
			createRecurringAdapter(recurring, { palette, movable: true }),
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
	function handleClick(ev: TimelineEvent, anchor?: DOMRect) {
		lastAction = anchor
			? `Clicked: ${ev.title} (at ${Math.round(anchor.left)}, ${Math.round(anchor.top)})`
			: `Clicked: ${ev.title}`;
	}

	// Drag the pill above the calendar onto a day: the view hands back the
	// dropped time and whatever the source put on the dataTransfer.
	function handleExternalDrop(info: { start: Date; dataTransfer: DataTransfer }) {
		const title = info.dataTransfer.getData('text/plain') || 'Dropped class';
		lastAction = `Dropped ${title} on ${info.start.toLocaleString()}`;
	}
	function handleCreate(range: { start: Date; end: Date }) {
		lastAction = `Create: ${range.start.toLocaleTimeString()} – ${range.end.toLocaleTimeString()}`;
	}
	function handleMove(event: TimelineEvent, start: Date, end: Date) {
		const ruleId = event.data?.recurringId as string | undefined;
		if (ruleId) {
			// A projected occurrence has no row of its own. Take this date out
			// of the rule and keep the moved copy as a one-off — the pattern a
			// host follows when someone drags one class out of its schedule.
			const key = event.id.split('--')[1] ?? '';
			const date = `${key.slice(0, 4)}-${key.slice(4, 6)}-${key.slice(6, 8)}`;
			recurring = recurring.map((r) =>
				r.id === ruleId ? { ...r, excludeDates: [...(r.excludeDates ?? []), date] } : r,
			);
			seed = [
				...seed,
				{ ...event, id: `${event.id}--moved`, start, end, data: { ...event.data, recurringId: undefined } },
			];
			lastAction = `Moved ${event.title} out of its schedule → ${start.toLocaleString()}`;
			return;
		}
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
					new Date(addDaysMs(today.getTime(), 2)),
					new Date(addDaysMs(today.getTime(), 4)),
				]
			: undefined,
	);

	let codeCopied = $state(false);
	async function copyCode() {
		try {
			await navigator.clipboard.writeText(codeSnippet);
			codeCopied = true;
			setTimeout(() => (codeCopied = false), 1600);
		} catch {
			/* clipboard blocked — the code stays selectable */
		}
	}

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
		if (locale !== "en-US") props.push(`locale="${locale}"`, "labels={{ today: '…', week: '…' /* your language */ }}");
		if (timezone) props.push(`timezone="${timezone}"`);
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

<main>
	<h1 class="sr-only">svelte-calendar — a Svelte 5 calendar component, live demo</h1>

	<div class="setups" role="group" aria-label="Setups">
		{#each recipes as r (r.name)}
			<button
				class="setup"
				aria-pressed={activeRecipe === r.name}
				title={r.hint}
				onclick={() => applyRecipe(r)}
			>{r.name}</button>
		{/each}
	</div>

	<Settings fields={settingsFields} bind:values={settingsValues} status={lastAction}>
		{#snippet lead()}
			<div
				class="drag-source"
				draggable="true"
				ondragstart={(e) => e.dataTransfer?.setData("text/plain", "Vinyasa Flow")}
				role="button"
				tabindex="0"
				aria-label="Vinyasa Flow: drag onto a day in the calendar"
			><span class="drag-grip" aria-hidden="true"></span>Vinyasa Flow<span class="drag-hint">drag onto a day</span></div>
		{/snippet}
	</Settings>

	<div class="cal-stage" class:cal-stage--phone={phoneFrame}>
		<div class="cal-frame">
			<!-- timezone is read when the calendar mounts; a new zone remounts it -->
			{#key timezone}
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
					{labels}
					{timezone}
					{dir}
					{blockedSlots}
					{disabledDates}
					onviewchange={handleViewChange}
					oneventclick={handleClick}
					onexternaldrop={handleExternalDrop}
					oneventcreate={handleCreate}
					oneventmove={handleMove}
					ondayclick={handleDayClick}
				/>
			{/key}
		</div>
	</div>

	<section class="code" aria-labelledby="code-title">
		<header class="code-hd">
			<h2 id="code-title">This setup in code</h2>
			<button class="code-copy" onclick={copyCode} aria-live="polite">{codeCopied ? "Copied" : "Copy"}</button>
		</header>
		<pre><code>{codeSnippet}</code></pre>
	</section>
</main>

<style>
	main {
		max-width: var(--site-w, 1280px);
		margin: 0 auto;
		padding: 0 24px 72px;
		color: var(--dt-text, #111);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	/* ── Setups: a row of departure tabs; the chosen one is the ink plate ── */
	.setups {
		display: flex;
		gap: 2px;
		padding: 8px 0 6px;
		overflow-x: auto;
		scrollbar-width: none;
	}
	.setup {
		flex: none;
		padding: 8px 12px;
		border: none;
		border-radius: 4px;
		background: transparent;
		font: 600 14px/1 var(--dt-sans, inherit);
		letter-spacing: -0.005em;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.6));
		cursor: pointer;
		transition: color 120ms, background 120ms;
	}
	.setup:hover {
		color: var(--dt-text, #111);
	}
	.setup[aria-pressed='true'] {
		background: var(--dt-text, #111);
		color: var(--dt-bg, #fff);
	}
	.setup:focus-visible {
		outline: 2px solid var(--dt-text, #111);
		outline-offset: 2px;
	}

	/* ── External drag source: a class card waiting to be scheduled ── */
	.drag-source {
		flex: none;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		height: 30px;
		padding: 0 10px 0 6px;
		border: 1px dashed var(--dt-text-3, rgba(0, 0, 0, 0.4));
		border-radius: 3px;
		font: 700 12.5px/1 var(--dt-sans, inherit);
		color: var(--dt-text, #111);
		cursor: grab;
		user-select: none;
	}
	.drag-source:active {
		cursor: grabbing;
	}
	.drag-source:focus-visible {
		outline: 2px solid var(--dt-text, #111);
		outline-offset: 2px;
	}
	.drag-grip {
		width: 6px;
		height: 14px;
		background: radial-gradient(circle, currentColor 1px, transparent 1.4px) 0 0 / 3px 3.5px;
		opacity: 0.6;
	}
	.drag-hint {
		font-weight: 500;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.6));
	}

	.cal-stage {
		margin-top: 12px;
	}
	.cal-stage--phone {
		display: flex;
		justify-content: center;
		padding: 12px 0;
	}
	.cal-stage--phone .cal-frame {
		width: 390px;
		max-width: 100%;
		border: 8px solid var(--board, #111);
		border-radius: 28px;
		overflow: hidden;
	}

	/* ── Code: printed on the board, the same enamel as the header ── */
	.code {
		margin-top: 32px;
		border-radius: 4px;
		background: var(--board, #111);
		color: var(--board-ink, #f5f5f3);
		overflow: hidden;
	}
	.code-hd {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 12px 12px 12px 18px;
		border-bottom: 1px solid var(--board-rule, rgba(255, 255, 255, 0.16));
	}
	.code-hd h2 {
		margin: 0;
		font: 700 15px/1 var(--dt-sans, inherit);
		letter-spacing: -0.01em;
	}
	.code-copy {
		min-width: 64px;
		padding: 7px 10px;
		border: none;
		border-radius: 2px;
		background: var(--board-ink, #f5f5f3);
		color: var(--board, #111);
		font: 700 11px/1 var(--dt-sans, inherit);
		cursor: pointer;
	}
	.code-copy:focus-visible {
		outline: 2px solid var(--board-ink, #f5f5f3);
		outline-offset: 2px;
	}
	.code pre {
		margin: 0;
		padding: 16px 18px 20px;
		overflow-x: auto;
		font: 400 13px/1.6 var(--dt-mono, ui-monospace, monospace);
		color: var(--board-ink, #f5f5f3);
		scrollbar-color: var(--board-rule, rgba(255, 255, 255, 0.16)) transparent;
	}
	.code pre::selection,
	.code pre :global(*::selection) {
		background: var(--board-ink, #f5f5f3);
		color: var(--board, #111);
	}

	@media (max-width: 700px) {
		main {
			padding: 0 16px 48px;
		}
		.cal-stage:not(.cal-stage--phone) {
			margin-inline: -16px;
		}
		.drag-hint {
			display: none;
		}
		.code {
			margin-inline: -16px;
			border-radius: 0;
		}
	}
</style>
