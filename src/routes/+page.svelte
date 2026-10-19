<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/state";
	import { replaceState } from "$app/navigation";
	import {
		Calendar,
		createMemoryAdapter,
		createRecurringAdapter,
		createCompositeAdapter,
		auto,
		neutral,
		presets,
		addDaysMs,
	} from "#lib/index.js";
	import type { PresetName, CalendarLabels } from "#lib/index.js";
	import Shell from "./_components/Shell.svelte";
	import Settings from "./_components/Settings.svelte";
	import type { SettingsField } from "./_components/Settings.svelte";
	import type { CalendarView, TimelineEvent } from "#lib/index.js";
	import { boardStore } from "./theme.svelte.js";
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

	// The calendar fills the main area between the bar and the code drawer:
	// always the frame's height (never less than 320), so an open drawer can
	// shrink it but never be painted over. Before the first measure, a guess.
	let frameH = $state(0);
	let frameW = $state(0);
	const calendarHeight = $derived(frameH ? Math.max(frameH, 320) : (isMobile ? 500 : 700));

	const DEFAULT_SETTINGS: Record<string, SettingValue> = {
		readOnly: false,
		mondayStart: true,
		showModePills: true,
		showNavigation: true,
		equalDays: false,
		activeView: "week-planner",
		locale: "en-US",
		timezone: "",
		showDates: true,
		calendarPreset: "auto",
		mobileMode: "auto",
		days: 7,
		visibleHoursEnabled: false,
		startHour: 6,
		endHour: 21,
		blockedSlotsEnabled: false,
		disabledDatesEnabled: false,
		compact: false,
		columns: false,
		rtl: false,
		phoneFrame: false,
	};

	// ── Recipes: one-click prop bundles showing common setups ──
	// The slug is the shareable `?setup=` value (the docs link to these).
	const recipes: { slug: string; name: string; hint: string; values: Record<string, SettingValue> }[] = [
		{ slug: "default", name: "Default", hint: "Just the component: its own header with Today, the arrows and the view pills", values: {} },
		{
			slug: "own-header", name: "Own header",
			hint: "Built-in header hidden; the page's own Today and arrows drive currentDate",
			values: { showModePills: false, showNavigation: false },
		},
		{
			slug: "booking-page", name: "Booking page",
			hint: "Editable week grid with business hours, blocked lunch slots, and disabled dates",
			values: {
				activeView: "week-planner", readOnly: false,
				visibleHoursEnabled: true, startHour: 8, endHour: 20,
				blockedSlotsEnabled: true, disabledDatesEnabled: true,
			},
		},
		{
			slug: "class-timetable", name: "Class timetable",
			hint: "Fixed weekly template: day names only, no past-day dimming, read-only",
			values: {
				activeView: "week-planner", readOnly: true,
				showModePills: false, showNavigation: false,
				showDates: false, equalDays: true,
				visibleHoursEnabled: true, startHour: 7, endHour: 21,
				blockedSlotsEnabled: false, disabledDatesEnabled: false,
			},
		},
		// Agenda views take no drag edits, so these leave readOnly alone
		// rather than show it on and disabled.
		{
			slug: "studio-timetable", name: "Studio timetable",
			hint: "Week agenda as side-by-side day columns — classic class-schedule grid",
			values: {
				activeView: "week-agenda", columns: true,
				showModePills: false, showNavigation: false,
				showDates: false, equalDays: true,
				blockedSlotsEnabled: false, disabledDatesEnabled: false,
			},
		},
		{
			slug: "embedded-schedule", name: "Embedded schedule",
			hint: "Chromeless compact agenda for dropping into an existing page",
			values: {
				activeView: "week-agenda", compact: true,
				showModePills: false, showNavigation: false, equalDays: true,
				blockedSlotsEnabled: false, disabledDatesEnabled: false,
			},
		},
	];
	const VIEWS = ["week-planner", "week-scroll", "day-planner", "week-agenda", "day-agenda", "month-grid"];

	// `?setup=<slug>&view=<id>` opens the page on that setup and view.
	function fromUrl(params: Pick<URLSearchParams, "get">): Record<string, SettingValue> {
		const recipe = recipes.find((r) => r.slug === params.get("setup"));
		const view = params.get("view");
		return {
			...DEFAULT_SETTINGS,
			...recipe?.values,
			...(view && VIEWS.includes(view) ? { activeView: view } : {}),
		};
	}
	let settingsValues = $state<Record<string, SettingValue>>(fromUrl(page.url.searchParams));

	// A recipe is on while every prop it sets still holds, so manual tweaks
	// un-highlight it. The view is its own axis: a setup stays on across views.
	const activeRecipe = $derived(
		recipes.find((r) =>
			Object.entries({ ...DEFAULT_SETTINGS, ...r.values }).every(
				([k, v]) => k === "activeView" || settingsValues[k] === v,
			),
		),
	);
	function applyRecipe(recipe: (typeof recipes)[number]) {
		settingsValues = { ...DEFAULT_SETTINGS, ...recipe.values };
	}

	// Write the setup and view back to the URL, without a history entry each.
	$effect(() => {
		const recipe = activeRecipe;
		const q = new URLSearchParams();
		if (recipe && recipe.slug !== "default") q.set("setup", recipe.slug);
		if (activeView !== (recipe?.values.activeView ?? DEFAULT_SETTINGS.activeView)) q.set("view", activeView);
		const search = q.size ? `?${q}` : "";
		if (search !== location.search) replaceState(`${location.pathname}${search}${location.hash}`, {});
	});

	const readOnly = $derived(Boolean(settingsValues.readOnly));
	const mondayStart = $derived(Boolean(settingsValues.mondayStart));
	const showModePills = $derived(Boolean(settingsValues.showModePills));
	const showNavigation = $derived(Boolean(settingsValues.showNavigation));
	// With neither, the calendar's own header is gone (an empty `header`
	// snippet) and the page owns Today and the arrows in the bar.
	const ownHeader = $derived(!showModePills && !showNavigation);
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
			options: VIEWS.map((v) => ({ value: v, label: v })),
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
			hint: "Start weeks on Monday instead of Sunday", more: true,
			disabledWhen: inViews([...WEEKS, "month-grid"], "Single-day view — no week start") },
		{ key: "readOnly", label: "readOnly", type: "toggle",
			hint: "Turns off drag, resize and drag-to-create",
			disabledWhen: inViews(TIMED, "No drag editing in this view") },
		{ key: "showModePills", label: "showModePills", type: "toggle",
			hint: "The view switch in the header" },
		{ key: "showNavigation", label: "showNavigation", type: "toggle",
			hint: "Previous/next arrows and the Today button" },
		{ key: "equalDays", label: "equalDays", type: "toggle",
			hint: "No past-day dimming — for template schedules", more: true,
			disabledWhen: inViews([...TIMED, ...AGENDAS], "Not used by month-grid") },
		{ key: "showDates", label: "showDates", type: "toggle",
			hint: "Off: headers show day names only (Mon, Tue, …)",
			disabledWhen: inViews([...TIMED, ...AGENDAS], "Not used by month-grid") },
		{ key: "rtl", label: 'dir="rtl"', type: "toggle",
			hint: "Right-to-left layout", more: true },
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
			hint: "Crop the grid to a start and end hour", more: true,
			disabledWhen: inViews(TIMED, "Planner and scroll views only") },
		{ key: "phoneFrame", label: "390px container", type: "toggle",
			hint: "Not a prop: a 390px-wide host — the container-based mobile mode kicks in", more: true,
			disabledWhen: (v) => v.mobileMode === "force" && "Mobile views already forced" },
		{ key: "startHour", label: "visibleHours[0]", type: "range", min: 0, max: 22, step: 1,
			hint: "First visible hour of the grid", more: true,
			enabledWhen: "visibleHoursEnabled",
			disabledWhen: inViews(TIMED, "Planner and scroll views only") },
		{ key: "endHour", label: "visibleHours[1]", type: "range", min: 1, max: 24, step: 1,
			hint: "Hour the grid ends at (exclusive)", more: true,
			enabledWhen: "visibleHoursEnabled",
			disabledWhen: inViews(TIMED, "Planner and scroll views only") },
		{ key: "days", label: "days", type: "range", min: 1, max: 14, step: 1,
			hint: "Days per week view — 5 is a workweek, 3 a rolling window", more: true,
			disabledWhen: inViews(["week-planner", "week-agenda"], "week-planner and week-agenda only") },
	];

	// Under 768px of container the calendar renders the planners and the
	// scroll as its touch list; the view select says so instead of naming a
	// grid that isn't on screen.
	const mobileOn = $derived(mobileMode === true || (mobileMode === "auto" && frameW > 0 && frameW < 768));
	const fields = $derived(
		settingsFields.map((f) =>
			f.key === "activeView" && f.type === "select" && mobileOn
				? {
						...f,
						options: f.options.map((o) =>
							TIMED.includes(o.value) ? { ...o, label: `${o.value} → mobile${mobileMode === "auto" ? " (auto)" : ""}` } : o,
						),
					}
				: f,
		),
	);

	// ── Seed data (auto-generated relative to today) ──────
	// Both are state: moving a recurring occurrence takes that date out of its
	// rule and files the result as a one-off, which is what a real host does.
	let seed = $state<TimelineEvent[]>(createDemoEvents(today));
	let recurring = $state(createDemoRecurring());

	// ── Adapter ────────────────────────────────────────────
	// Composite: one-off events (memory) + recurring schedule. One-colour
	// palette: every class is marked in ink (--dt-event); the all-day events
	// name the accent themselves, so it keeps its three jobs — band, now
	// line, today.
	const INK = ["var(--dt-event, var(--dt-accent))"];
	const adapter = $derived(
		createCompositeAdapter([
			createMemoryAdapter(seed, { palette: INK }),
			// movable: the demo handles the move itself (see handleMove)
			createRecurringAdapter(recurring, { palette: INK, movable: true }),
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
	let hint = $state("");
	const IDLE = "Drag an event to move it, drag its edge to resize, drag on empty time to create.";
	const IDLE_TOUCH = "Tap an event or a day: the calendar's callbacks report here.";
	/* Every message the line can show, stacked unseen in its one cell, so it is
	   always as tall as the longest and nothing around it moves on hover. */
	const messages = $derived(
		[...new Set([IDLE, IDLE_TOUCH, lastAction, ...recipes.map((r) => r.hint), ...settingsFields.flatMap((f) => [
			f.hint ?? "",
			f.disabledWhen?.(settingsValues) || "",
			f.enabledWhen ? `Needs ${f.enabledWhen}` : "",
		])])].filter(Boolean),
	);
	// Times in the info line read like the calendar: its locale and zone, no seconds.
	function when(start: Date, end?: Date) {
		const hm = { hour: "numeric", minute: "2-digit", timeZone: timezone } as const;
		const from = new Intl.DateTimeFormat(locale, { weekday: "short", ...hm }).format(start);
		return end ? `${from}–${new Intl.DateTimeFormat(locale, hm).format(end)}` : from;
	}
	function handleClick(ev: TimelineEvent) {
		lastAction = `Clicked ${ev.title}`;
	}

	// The demo is the host: what the calendar hands back is filed in `seed`, so
	// it survives the adapter being rebuilt, until Reset events.
	let edited = $state(false);
	function addEvent(title: string, start: Date, end: Date) {
		seed = [...seed, { id: `added-${start.getTime()}-${seed.length}`, title, start, end }];
		edited = true;
	}
	function resetEvents() {
		seed = createDemoEvents(today);
		recurring = createDemoRecurring();
		edited = false;
		lastAction = "";
	}

	// Drag the pill under the calendar onto a day: the view hands back the
	// dropped time and whatever the source put on the dataTransfer.
	const HOUR = 3_600_000;
	function handleExternalDrop(info: { start: Date; dataTransfer: DataTransfer }) {
		const title = info.dataTransfer.getData('text/plain') || 'Dropped class';
		addEvent(title, info.start, new Date(info.start.getTime() + HOUR));
		lastAction = `Added ${title} → ${when(info.start)}`;
	}
	// The pill's keyboard path: Enter or Space files it at the next full hour
	// today, the way a drop would, and brings today into view.
	function addFromKeyboard(e: KeyboardEvent) {
		if (e.key !== "Enter" && e.key !== " ") return;
		e.preventDefault();
		if (readOnly) {
			lastAction = "readOnly is on: the calendar takes no new events";
			return;
		}
		const start = new Date(Math.ceil(Date.now() / HOUR) * HOUR);
		addEvent("Vinyasa Flow", start, new Date(start.getTime() + HOUR));
		focusedDate = start;
		lastAction = `Added Vinyasa Flow → ${when(start)}`;
	}
	function handleCreate(range: { start: Date; end: Date }) {
		addEvent("New class", range.start, range.end);
		lastAction = `Created ${when(range.start, range.end)}`;
	}
	function handleMove(event: TimelineEvent, start: Date, end: Date) {
		const ruleId = event.data?.recurringId as string | undefined;
		edited = true;
		lastAction = `Moved ${event.title} → ${when(start)}`;
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
			return;
		}
		seed = seed.map((e) => (e.id === event.id ? { ...e, start, end } : e));
	}
	function handleViewChange(viewId: CalendarView["id"]) {
		if (activeView !== viewId) {
			settingsValues = { ...settingsValues, activeView: viewId };
		}
	}
	// Month → day drill-down: clicking a month cell (or "+N more") jumps to
	// the day planner focused on that date, via the controlled currentDate prop.
	let focusedDate = $state<Date | undefined>(undefined);
	// The bar's Today / ‹ › step the controlled date the way the calendar
	// would: a day, the visible days, or a month (anchored to the 1st).
	const stepMode = $derived(activeView.startsWith("day") ? "day" : activeView.startsWith("month") ? "month" : "week");
	// Outside the week, nothing else on the page names the month.
	const periodLabel = $derived.by(() => {
		if (stepMode === "week") return "";
		const d = focusedDate ?? new Date();
		return new Intl.DateTimeFormat(locale, stepMode === "month" ? { month: "long", year: "numeric" } : { weekday: "long", day: "numeric", month: "long" }).format(d);
	});
	function stepDate(dir: 1 | -1) {
		const d = focusedDate ?? new Date();
		focusedDate =
			stepMode === "month"
				? new Date(d.getFullYear(), d.getMonth() + dir, 1)
				: new Date(addDaysMs(d.getTime(), dir * (stepMode === "day" ? 1 : days)));
	}
	function handleDayClick(date: Date) {
		focusedDate = date;
		if (activeView !== "day-planner") {
			settingsValues = { ...settingsValues, activeView: "day-planner" };
		}
		lastAction = `Opened ${new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short", timeZone: timezone }).format(date)}`;
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

	let codeOpen = $state(false);
	let copyLabel = $state("Copy");
	async function copyCode() {
		try {
			await navigator.clipboard.writeText(codeSnippet);
			copyLabel = "Copied";
		} catch {
			// clipboard blocked: open the code so it can be selected by hand
			codeOpen = true;
			copyLabel = "Select it";
		}
		setTimeout(() => (copyLabel = "Copy"), 1600);
	}

	// ── Live code snippet: the <Calendar> markup for the current settings ──
	// A prop the current view ignores (its control is disabled) stays out of the code.
	const inert = (key: string) => Boolean(settingsFields.find((f) => f.key === key)?.disabledWhen?.(settingsValues));
	const codeSnippet = $derived.by(() => {
		const extraImports = selectedPreset !== "auto" ? `, ${selectedPreset}` : "";
		const script: string[] = [
			`  import { Calendar, createMemoryAdapter${extraImports} } from '@nomideusz/svelte-calendar';`,
			"",
			"  const today = new Date();",
			"  const at = (hour) => new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour);",
			"  const adapter = createMemoryAdapter([",
			"    { id: '1', title: 'Morning Flow', start: at(9), end: at(10) },",
			"    { id: '2', title: 'Lunch talk', start: at(12), end: at(13) },",
			"  ]);",
		];
		if (blockedSlotsEnabled && !inert("blockedSlotsEnabled")) {
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
		if (!showNavigation) script.push("", "  let date = $state(new Date()); // your own Today / ‹ › buttons set this");

		const props: string[] = ["{adapter}", `view="${activeView}"`];
		if (selectedPreset !== "auto") props.push(`theme={${selectedPreset}}`);
		if (locale !== "en-US") props.push(`locale="${locale}"`, "labels={{ today: '…', week: '…' /* your language */ }}");
		if (timezone) props.push(`timezone="${timezone}"`);
		if (dir === "rtl") props.push(`dir="rtl"`);
		if (readOnly && !inert("readOnly")) props.push("readOnly");
		if (!mondayStart && !inert("mondayStart")) props.push("mondayStart={false}");
		if (!showNavigation) props.push("currentDate={date}", "ondatechange={(d) => (date = d)}");
		// With neither, an empty header snippet replaces both flags.
		if (!ownHeader) {
			if (!showModePills) props.push("showModePills={false}");
			if (!showNavigation) props.push("showNavigation={false}");
		}
		if (equalDays && !inert("equalDays")) props.push("equalDays");
		if (!showDates && !inert("showDates")) props.push("showDates={false}");
		if (compact && !inert("compact")) props.push("compact");
		if (columns && !inert("columns")) props.push("columns");
		if (days !== 7 && !inert("days")) props.push(`days={${days}}`);
		if (visibleHours && !inert("visibleHoursEnabled")) props.push(`visibleHours={[${visibleHours[0]}, ${visibleHours[1]}]}`);
		if (mobileMode !== "auto") props.push(`mobile={${mobileMode}}`);
		if (blockedSlotsEnabled && !inert("blockedSlotsEnabled")) props.push("{blockedSlots}");
		if (disabledDatesEnabled) props.push("{disabledDates}");

		// '</' + 'script>' split so the Svelte compiler doesn't end this block early
		// Two props fit on one line: the default reads as it would be typed.
		const tag = props.length > 2 ? `<Calendar\n${props.map((p) => `  ${p}`).join("\n")}\n` : `<Calendar ${props.join(" ")} `;
		const body = ownHeader
			? `${tag}>\n  <!-- an empty header snippet: no built-in title, pills or arrows -->\n  {#snippet header()}{/snippet}\n</Calendar>`
			: `${tag}/>`;
		return `<script>\n${script.join("\n")}\n</` + `script>\n\n${body}`;
	});
	// The drawer's collapsed line: the <Calendar> tag on one line.
	const codeLine = $derived(codeSnippet.slice(codeSnippet.indexOf("<Calendar")).replace(/\s+/g, " "));
</script>

{#snippet blankHeader()}{/snippet}

<Shell>
	{#snippet bar()}
		{#if !showNavigation}
			<div class="pager" role="group" aria-label="Calendar date">
				{#if periodLabel}<span class="pager-label" role="status" aria-live="polite">{periodLabel}</span>{/if}
				<button class="pager-today" onclick={() => (focusedDate = new Date())}>Today</button>
				<button class="pager-btn" onclick={() => stepDate(-1)} aria-label={`Previous ${stepMode}`}>
					<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3 5 8l5 5" /></svg>
				</button>
				<button class="pager-btn" onclick={() => stepDate(1)} aria-label={`Next ${stepMode}`}>
					<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3l5 5-5 5" /></svg>
				</button>
			</div>
		{/if}
	{/snippet}
	{#snippet rail()}
		<div class="setups" role="group" aria-label="Setups">
			{#each recipes as r (r.name)}
				<button
					class="setup"
					aria-pressed={activeRecipe === r}
					onpointerenter={() => (hint = r.hint)}
					onpointerleave={() => (hint = "")}
					onfocus={() => (hint = r.hint)}
					onblur={() => (hint = "")}
					onclick={() => applyRecipe(r)}
				>{r.name}</button>
			{/each}
		</div>

		<Settings {fields} bind:values={settingsValues} bind:hint />
	{/snippet}

	<main id="content" tabindex="-1">
		<h1 class="sr-only">svelte-calendar — a Svelte 5 calendar component, live demo</h1>

		<div class="cal-stage" class:cal-stage--phone={phoneFrame}>
			<div class="cal-frame" bind:clientHeight={frameH} bind:clientWidth={frameW}>
				<!-- timezone is read when the calendar mounts; a new zone remounts it -->
				{#key timezone}
					<Calendar
						{adapter}
						view={activeView}
						theme={calendarTheme}
						autoTheme={autoThemeProp}
						height={phoneFrame ? 688 : calendarHeight}
						currentDate={focusedDate}
						ondatechange={(d) => (focusedDate = d)}
						header={ownHeader ? blankHeader : undefined}
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

		<!-- The info line sits under the week, where the eye already is: what the
		     hovered control does, else the last callback, else how to start. -->
		<div class="info">
			<div
				class="drag-source"
				draggable="true"
				ondragstart={(e) => e.dataTransfer?.setData("text/plain", "Vinyasa Flow")}
				onkeydown={addFromKeyboard}
				role="button"
				tabindex="0"
				aria-label="Vinyasa Flow: drag onto a day, or press Enter to add it at the next hour"
			><span class="drag-grip" aria-hidden="true"></span>Vinyasa Flow<span class="drag-hint">drag onto a day</span></div>
			<div class="msgs">
				<p class="msg" aria-live="polite">
					{#if hint}
						{hint}
					{:else if lastAction}
						<span class="live" aria-hidden="true"></span>{lastAction}
					{:else}
						<span class="idle-pointer">{IDLE}</span><span class="idle-touch">{IDLE_TOUCH}</span>
					{/if}
				</p>
				{#each messages as m (m)}
					<p class="msg msg--sizer" aria-hidden="true"><span class="live"></span>{m}</p>
				{/each}
			</div>
			{#if edited}<button class="reset" onclick={resetEvents}>Reset events</button>{/if}
		</div>

		<section class="code" class:code--open={codeOpen} aria-labelledby="code-title">
			<header class="code-hd">
				<button class="code-toggle" aria-expanded={codeOpen} aria-controls="code-body" onclick={() => (codeOpen = !codeOpen)}>
					<h2 id="code-title">This setup in code</h2>
					<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" /></svg>
				</button>
				<button class="code-copy" onclick={copyCode} aria-live="polite">{copyLabel}</button>
			</header>
			{#if codeOpen}
				<pre id="code-body"><code>{codeSnippet}</code></pre>
			{:else}
				<code class="code-line" id="code-body">{codeLine}</code>
			{/if}
		</section>
	</main>
</Shell>

<style>
	main:focus {
		outline: none;
	}
	main {
		flex: 1;
		min-height: 0;
		display: flex;
		flex-direction: column;
		padding: 0 calc(40 * var(--u)) calc(24 * var(--u)) calc(38 * var(--u));
		color: var(--dt-text, #111);
	}

	/* ── Bar pager: Today and the arrows, drawn by the page, not the calendar ── */
	.pager {
		display: flex;
		align-items: center;
		gap: calc(10 * var(--u));
	}
	.pager-label {
		margin-right: calc(18 * var(--u));
		font: 400 calc(24 * var(--u)) / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, #111);
		white-space: nowrap;
	}
	.pager-today,
	.pager-btn {
		height: calc(44 * var(--u));
		border: 2px solid var(--dt-text, #111);
		border-radius: calc(6 * var(--u));
		background: transparent;
		color: var(--dt-text, #111);
		cursor: pointer;
		transition: color 120ms, border-color 120ms;
	}
	.pager-today {
		padding: 0 calc(16 * var(--u));
		font: 400 calc(22 * var(--u)) / 1 var(--dt-sans, system-ui, sans-serif);
	}
	.pager-btn {
		display: grid;
		place-items: center;
		width: calc(44 * var(--u));
		padding: 0;
	}
	.pager-today:hover,
	.pager-btn:hover {
		color: var(--dt-accent, #111);
		border-color: var(--dt-accent, #111);
	}

	@media (max-width: 1360px) {
		main {
			padding: 0 20px 20px;
		}
		.cal-frame {
			min-height: 70vh;
		}
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	/* ── Setups: a wrapped list; the chosen one over an ink rule ── */
	.setups {
		display: flex;
		flex-wrap: wrap;
		gap: calc(18 * var(--u)) calc(30 * var(--u));
		padding-bottom: calc(22 * var(--u));
		margin-bottom: calc(30 * var(--u));
		border-bottom: 2px solid var(--dt-text, #111);
	}
	.setup {
		padding: 0 0 calc(6 * var(--u));
		border: none;
		border-radius: 0;
		background: transparent;
		font: 400 calc(24 * var(--u)) / 1 var(--dt-sans, inherit);
		color: var(--dt-text, #111);
		box-shadow: inset 0 -3px 0 transparent;
		cursor: pointer;
		transition: color 120ms, box-shadow 120ms;
	}
	.setup:hover {
		box-shadow: inset 0 -3px 0 var(--dt-border-day, rgba(0, 0, 0, 0.3));
	}
	.setup[aria-pressed='true'] {
		box-shadow: inset 0 -3px 0 var(--dt-accent, #1d4fd7);
	}
	.setup:focus-visible {
		outline: 2px solid var(--dt-text, #111);
		outline-offset: 2px;
	}

	/* ── Info line under the week: one message at a time ── */
	.info {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: calc(12 * var(--u)) calc(20 * var(--u));
		margin-top: calc(16 * var(--u));
	}
	/* Beside the drag source while there's room, under it on a narrow phone. */
	.msgs {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		flex: 1 1 14em;
		min-width: 0;
	}
	.msgs > .msg {
		grid-area: 1 / 1;
	}
	.msg--sizer {
		visibility: hidden;
	}
	.msg {
		margin: 0;
		display: flex;
		align-items: center;
		gap: 8px;
		font: 400 max(13px, calc(17 * var(--u))) / 1.4 var(--dt-sans, inherit);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.6));
	}
	.live {
		flex: none;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--dt-accent, #1d4fd7);
	}
	.idle-touch {
		display: none;
	}
	/* ── External drag source: a class waiting to be scheduled ── */
	.drag-source {
		flex: none;
		display: inline-flex;
		align-items: center;
		gap: calc(10 * var(--u));
		min-height: calc(36 * var(--u));
		padding: 0 calc(12 * var(--u)) 0 calc(8 * var(--u));
		border: 1px dashed var(--dt-text-3, rgba(0, 0, 0, 0.5));
		font: 500 calc(17 * var(--u)) / 1 var(--dt-sans, inherit);
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
		font-weight: 400;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.6));
	}

	.cal-stage {
		flex: 1;
		min-height: 0;
		display: flex;
		flex-direction: column;
	}
	.cal-frame {
		flex: 1;
		min-height: 0;
	}
	.cal-stage--phone {
		align-items: center;
		justify-content: center;
		padding: calc(12 * var(--u)) 0;
	}
	.cal-stage--phone .cal-frame {
		flex: none;
		width: 390px;
		max-width: 100%;
		border: 8px solid var(--dt-text, #111);
		border-radius: 28px;
		overflow: hidden;
	}

	/* ── Code: a drawer pinned under the week, hairline-ruled ── */
	.code {
		margin-top: calc(16 * var(--u));
		border: 2px solid var(--dt-text, #111);
	}
	.code-hd {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: calc(14 * var(--u)) calc(14 * var(--u)) calc(6 * var(--u)) calc(22 * var(--u));
	}
	.code-toggle {
		display: flex;
		align-items: center;
		gap: calc(12 * var(--u));
		padding: 0;
		border: none;
		background: none;
		color: inherit;
		cursor: pointer;
	}
	.code-toggle[aria-expanded='true'] svg {
		transform: rotate(180deg);
	}
	.code-toggle:focus-visible {
		outline: 2px solid var(--dt-text, #111);
		outline-offset: 4px;
	}
	.code-hd h2 {
		margin: 0;
		font: 400 calc(26 * var(--u)) / 1 var(--dt-sans, inherit);
		letter-spacing: -0.01em;
	}
	.code-copy,
	.reset {
		padding: calc(8 * var(--u)) calc(14 * var(--u));
		border: 1px solid var(--dt-border-day, rgba(0, 0, 0, 0.3));
		border-radius: 0;
		background: transparent;
		color: inherit;
		font: 500 calc(17 * var(--u)) / 1 var(--dt-sans, inherit);
		cursor: pointer;
	}
	.reset {
		flex: none;
	}
	.code-copy:hover,
	.reset:hover {
		border-color: var(--dt-text, #111);
	}
	.code-copy:focus-visible,
	.reset:focus-visible {
		outline: 2px solid var(--dt-text, #111);
		outline-offset: 2px;
	}
	.code-line {
		display: block;
		padding: 0 calc(22 * var(--u)) calc(16 * var(--u));
		overflow-x: auto;
		white-space: nowrap;
		font: 400 calc(17 * var(--u)) / 1.5 var(--dt-mono, ui-monospace, monospace);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.66));
		font-variant-ligatures: none;
		scrollbar-width: none;
	}
	.code pre {
		margin: 0;
		/* capped so the calendar above keeps ~420px on a 900px screen */
		max-height: 30vh;
		padding: calc(6 * var(--u)) calc(22 * var(--u)) calc(18 * var(--u));
		overflow: auto;
		font: 400 13px / 1.6 var(--dt-mono, ui-monospace, monospace);
		font-variant-ligatures: none;
		color: var(--dt-text, #111);
		scrollbar-color: var(--dt-scrollbar, rgba(0, 0, 0, 0.18)) transparent;
	}

	/* On a phone the 390px frame is the screen itself. */
	@media (max-width: 640px) {
		.cal-stage--phone .cal-frame {
			width: 100%;
			border-width: 0;
			border-radius: 0;
		}
	}

	/* No HTML5 drag on touch screens: the drag source and its instruction go. */
	@media (pointer: coarse) {
		.drag-source,
		.idle-pointer {
			display: none;
		}
		.idle-touch {
			display: inline;
		}
		.pager-today,
		.pager-btn,
		.code-toggle,
		.code-copy,
		.reset {
			min-height: 44px;
		}
		.pager-btn {
			min-width: 44px;
		}
		.setup {
			min-height: 44px;
			padding-bottom: 0;
		}
	}
</style>
