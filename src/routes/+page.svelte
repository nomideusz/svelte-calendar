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
		fmtTime,
		weekdayShort,
		toZonedTime,
	} from "#lib/index.js";
	import type { PresetName, CalendarLabels } from "#lib/index.js";
	import Shell from "./_components/Shell.svelte";
	import Settings from "./_components/Settings.svelte";
	import Hosts from "./_components/Hosts.svelte";
	import type { SettingsField } from "./_components/Settings.svelte";
	import type { CalendarView, TimelineEvent, HeaderContext } from "#lib/index.js";
	import { boardStore, themeStore } from "./theme.svelte.js";
	import { createDemoEvents, createDemoRecurring, closedDates } from "./demo-events.js";

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
			key: "activeView", label: "view", type: "select", quick: true,
			hint: "Which built-in view renders: planners are time grids, agendas are lists",
			options: VIEWS.map((v) => ({ value: v, label: v })),
		},
		{
			key: "calendarPreset", label: "theme", type: "select", quick: true,
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

	// ── URL state: a link reproduces the screen ──
	// `?setup=<slug>` picks a setup; every control that differs from it rides
	// along under its prop name (`view`, `theme`, `locale`, `readOnly`, …),
	// so `?setup=booking-page&view=month-grid&locale=pl-PL` reopens as is.
	const PARAM: Record<string, string> = { activeView: "view", calendarPreset: "theme" };
	const param = (key: string) => PARAM[key] ?? key.replace(/Enabled$/, "");
	function fromUrl(params: Pick<URLSearchParams, "get">): Record<string, SettingValue> {
		const recipe = recipes.find((r) => r.slug === params.get("setup"));
		const out = { ...DEFAULT_SETTINGS, ...recipe?.values };
		for (const f of settingsFields) {
			const raw = params.get(param(f.key));
			if (raw === null) continue;
			if (f.type === "toggle") {
				if (raw === "true" || raw === "false") out[f.key] = raw === "true";
			} else if (f.type === "range") {
				const n = Number(raw);
				if (Number.isInteger(n) && n >= f.min && n <= f.max) out[f.key] = n;
			} else if (f.options.some((o) => o.value === raw)) {
				out[f.key] = raw;
			}
		}
		return out;
	}
	let settingsValues = $state<Record<string, SettingValue>>(fromUrl(page.url.searchParams));

	// Page-wide choices no setup defines: a setup stays chosen across them.
	const AMBIENT = ["activeView", "calendarPreset", "locale", "timezone", "mobileMode", "phoneFrame", "rtl"];
	// A recipe is on while every prop it sets (and every other prop it leaves
	// at its default) still holds, so manual tweaks to those un-highlight it.
	const activeRecipe = $derived(
		recipes.find((r) =>
			Object.entries({ ...DEFAULT_SETTINGS, ...r.values }).every(
				([k, v]) => AMBIENT.includes(k) || settingsValues[k] === v,
			),
		),
	);
	// Bumped on every setup pick: the calendar remounts, so a new setup opens
	// at its own first hour instead of the last one's scroll position.
	let setupRun = $state(0);
	function applyRecipe(recipe: (typeof recipes)[number]) {
		const ambient = Object.fromEntries(AMBIENT.filter((k) => k !== "activeView").map((k) => [k, settingsValues[k]]));
		settingsValues = { ...DEFAULT_SETTINGS, ...ambient, ...recipe.values };
		setupRun++;
	}

	// Write the state back to the URL, without a history entry each.
	$effect(() => {
		const recipe = activeRecipe;
		const base: Record<string, SettingValue> = { ...DEFAULT_SETTINGS, ...recipe?.values };
		const q = new URLSearchParams();
		if (recipe && recipe.slug !== "default") q.set("setup", recipe.slug);
		for (const f of settingsFields) {
			if (settingsValues[f.key] !== base[f.key]) q.set(param(f.key), String(settingsValues[f.key]));
		}
		// The host page only once the visitor picked one; else theirs follows the OS.
		if (themeStore.chosen) q.set("host", themeStore.current);
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
	// Only an explicit rtl: left unset, the calendar reads the direction from
	// the locale itself (ar-SA lays out right to left on its own).
	const dir = $derived<"rtl" | undefined>(settingsValues.rtl ? "rtl" : undefined);
	const phoneFrame = $derived(Boolean(settingsValues.phoneFrame));

	const today = new Date();
	today.setHours(0, 0, 0, 0);

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
	// Composite: one-off events (memory) + recurring schedule. No colours:
	// events without `color` are ink (--dt-event), as in the code drawer; the
	// all-day events name the accent themselves. Nothing is hidden for
	// disabledDates: the seed has no classes on the closed Sundays, and an event
	// dragged onto one stays visible, as the library draws it.
	const adapter = $derived(
		createCompositeAdapter([
			createMemoryAdapter(seed),
			// movable: the demo handles the move itself (see handleMove)
			createRecurringAdapter(recurring, { movable: true }),
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
	// Only the week planner, day planner and scroll take drags and drops, and
	// not as the touch layouts they turn into in a narrow container.
	const canEdit = $derived(TIMED.includes(activeView) && !mobileOn && !readOnly);
	// The idle line says what this view does with a pointer (or a finger).
	function idleFor(touch: boolean): string {
		const tap = touch ? "Tap" : "Click";
		if (TIMED.includes(activeView) && mobileOn) {
			if (activeView !== "day-planner") return `${tap} a day to open it; swipe for the next week.`;
			return readOnly
				? `readOnly is on: nothing moves. ${tap} an event and its callback reports here.`
				: `${tap} empty time to add a class, drag an event to move it, swipe for the next day.`;
		}
		if (TIMED.includes(activeView)) {
			if (readOnly) return `readOnly is on: nothing moves. ${tap} an event and its callback reports here.`;
			if (activeView === "week-scroll") return `Drag an event to another day or time; ${tap.toLowerCase()} empty space to add a class.`;
			return touch
				? "Drag an event to move it; long-press empty time to create one."
				: "Drag an event to move it, drag its edge to resize, drag on empty time to create.";
		}
		if (activeView === "month-grid") return `${tap} a day to open it in day-planner, or an event to report it here.`;
		if (activeView === "week-agenda" && columns && !mobileOn)
			return `Drag a class to another day to move it; ${tap.toLowerCase()} a day's name to open it.`;
		if (activeView === "week-agenda") return `${tap} a day's name to open it in day-planner, or an event to report it here.`;
		return `${tap} an event and the calendar's oneventclick reports here.`;
	}
	const idle = $derived(idleFor(false));
	const idleTouch = $derived(idleFor(true));
	/* Every message the line can show, stacked unseen in its one cell, so it is
	   always as tall as the longest and nothing around it moves on hover. */
	const messages = $derived(
		[...new Set([idle, idleTouch, lastAction, ...recipes.map((r) => r.hint), ...settingsFields.flatMap((f) => [
			f.hint ?? "",
			f.disabledWhen?.(settingsValues) || "",
			f.enabledWhen ? `Needs ${settingsFields.find((g) => g.key === f.enabledWhen)?.label}` : "",
		])])].filter(Boolean),
	);
	// Times in the info line read like the grid: the library's own formatter
	// ("9:00a" in en-US, "9:00" in pl-PL), in the calendar's zone.
	function when(start: Date, end?: Date) {
		const zoned = (d: Date) => (timezone ? toZonedTime(d, timezone) : d);
		const from = `${weekdayShort(zoned(start).getTime(), locale)} ${fmtTime(zoned(start), locale)}`;
		return end ? `${from}–${fmtTime(zoned(end), locale)}` : from;
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
		lastAction = "Events reset to the sample week";
		// The button goes with the edits: focus the page so Tab carries on from it.
		document.getElementById("content")?.focus();
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
	// The bar's Today is off while today is in view, as the calendar's own is:
	// the empty header snippet still gets the calendar's context and reports it.
	let todayInView = $state(true);
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
	// The studio's closed Sundays: the seed books nothing on them.
	const disabledDates = $derived(disabledDatesEnabled ? closedDates(today) : undefined);

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

	// ── Live code snippet: runnable code for the current settings ──
	// A prop the current view ignores (its control is disabled) stays out of
	// the code. Editable setups keep their events in state and hand the
	// Calendar a new adapter on each create and move, as the README shows.
	const inert = (key: string) => Boolean(settingsFields.find((f) => f.key === key)?.disabledWhen?.(settingsValues));
	const quote = (v: string) => `'${v.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
	// nMore is a function: called with the text "${n}", it hands back its own
	// template, which goes out as one.
	const labelsCode = (l: Partial<CalendarLabels>) =>
		Object.entries(l).map(([k, v]) =>
			typeof v === "function"
				? `    ${k}: (n) => \`${(v as (n: unknown) => string)("${n}")}\`,`
				: `    ${k}: ${quote(String(v))},`,
		);
	const codeSnippet = $derived.by(() => {
		// The planners and the scroll take creates and moves; the week-agenda
		// columns only a day-drag; the other views no edits at all.
		const creates = !readOnly && TIMED.includes(activeView);
		const moves = creates || (!readOnly && activeView === "week-agenda" && columns);
		const editable = creates || moves;
		const extraImports = selectedPreset !== "auto" ? `, ${selectedPreset}` : "";
		const script: string[] = [
			`  import { Calendar, createMemoryAdapter${extraImports} } from '@nomideusz/svelte-calendar';`,
			"",
			"  // Today at a given hour, so the events land in the week the calendar opens on",
			"  const today = new Date();",
			"  const at = (hour) => new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour);",
			"",
		];
		// The README's Quick Start, line for line.
		const sample = [
			"    { id: '1', title: 'Team Sync', start: at(9),  end: at(10) },",
			"    { id: '2', title: 'Lunch',     start: at(12), end: at(13) },",
		];
		if (editable) {
			script.push(
				"  let events = $state([",
				...sample,
				"  ]);",
				"  // A new adapter whenever the events change; the calendar reloads without blanking",
				"  const adapter = $derived(createMemoryAdapter(events));",
			);
			if (creates) {
				script.push(
					"",
					"  // Drag on empty time (or press Enter on a day column) to create",
					"  function create({ start, end }) {",
					"    events = [...events, { id: crypto.randomUUID(), title: 'New event', start, end }];",
					"  }",
				);
			}
			script.push(
				"",
				activeView === "week-agenda" ? "  // Drag a class to another day to move it" : "  // Drag an event to move it, or its edge to resize it",
				"  function move(event, start, end) {",
				"    events = events.map((e) => (e.id === event.id ? { ...e, start, end } : e));",
				"  }",
			);
		} else {
			script.push("  const adapter = createMemoryAdapter([", ...sample, "  ]);");
		}
		if (blockedSlotsEnabled && !inert("blockedSlotsEnabled")) {
			script.push(
				"",
				"  const blockedSlots = [",
				"    { start: 12, end: 13, label: 'Lunch' }, // every day 12–13",
				"    { day: 6, start: 0, end: 9, label: 'Sat morning' },",
				"    { day: 7, start: 0, end: 9, label: 'Sun morning' },",
				"  ];",
			);
		}
		if (disabledDatesEnabled) {
			script.push(
				"",
				"  // Closed on Sundays: last week's, this week's and next week's",
				"  const sunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + ((7 - today.getDay()) % 7));",
				"  const disabledDates = [-7, 0, 7].map((n) => new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + n));",
			);
		}
		if (labels) script.push("", "  const labels = {", ...labelsCode(labels), "  };");
		if (!showNavigation) script.push("", "  let date = $state(new Date()); // your own Today / ‹ › buttons set this");

		const props: string[] = ["{adapter}", `view="${activeView}"`];
		if (selectedPreset !== "auto") props.push(`theme={${selectedPreset}}`);
		if (locale !== "en-US") props.push(`locale="${locale}"`);
		if (labels) props.push("{labels}");
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
		if (creates) props.push("oneventcreate={create}");
		if (moves) props.push("oneventmove={move}");

		// '</' + 'script>' split so the Svelte compiler doesn't end this block early
		// A short tag stays on one line, as it would be typed (the default is
		// the README's); a longer one takes a prop per line.
		const oneLine = `<Calendar ${props.join(" ")} `;
		const tag = oneLine.length <= 90 ? oneLine : `<Calendar\n${props.map((p) => `  ${p}`).join("\n")}\n`;
		const body = ownHeader
			? `${tag}>\n  <!-- an empty header snippet: no built-in title, pills or arrows -->\n  {#snippet header()}{/snippet}\n</Calendar>`
			: `${tag}/>`;
		return `<script>\n${script.join("\n")}\n</` + `script>\n\n${body}`;
	});
	// The drawer's collapsed line: the <Calendar> tag on one line.
	const codeLine = $derived(codeSnippet.slice(codeSnippet.indexOf("<Calendar")).replace(/\s+/g, " "));
</script>

{#snippet blankHeader(ctx: HeaderContext)}<span hidden {@attach () => { todayInView = ctx.isViewOnToday; }}></span>{/snippet}

<!-- In the rail on desktop; at or below 1360px above the calendar instead,
     since the rail folds under the page there. One is display:none at a time. -->
{#snippet setups(where: string)}
	<div class="setups setups--{where}" role="group" aria-label="Setups">
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
{/snippet}

<Shell>
	{#snippet bar()}
		{#if !showNavigation}
			<div class="pager" role="group" aria-label="Calendar date">
				{#if periodLabel}<span class="pager-label" role="status" aria-live="polite">{periodLabel}</span>{/if}
				<button class="pager-today" disabled={todayInView} onclick={() => (focusedDate = new Date())}>Today</button>
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
		{@render setups("rail")}

		<Settings {fields} bind:values={settingsValues} bind:hint />
	{/snippet}

	<main id="content" tabindex="-1">
		<h1 class="sr-only">svelte-calendar — a Svelte 5 calendar component, live demo</h1>
		{@render setups("top")}
		<!-- On a phone the rail is far below: what changes the screen most
		     (the view, the theme, the host page) sits with the setups. -->
		<div class="quick">
			{#each fields.filter((f) => f.quick) as f (f.key)}
				{#if f.type === "select"}
					<label class="quick-sel">
						<span>{f.label}</span>
						<select
							value={String(settingsValues[f.key])}
							onchange={(e) => (settingsValues = { ...settingsValues, [f.key]: e.currentTarget.value })}
						>
							{#each f.options as o (o.value)}<option value={o.value}>{o.label}</option>{/each}
						</select>
					</label>
				{/if}
			{/each}
			<Hosts compact />
		</div>

		<div class="cal-stage" class:cal-stage--phone={phoneFrame}>
			<div class="cal-frame" bind:clientHeight={frameH} bind:clientWidth={frameW}>
				<!-- timezone is read when the calendar mounts: a new zone remounts it,
				     and so does a new setup, to open at its own first hour -->
				{#key `${timezone}|${setupRun}`}
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
			{#if canEdit}<div
				class="drag-source"
				draggable="true"
				ondragstart={(e) => e.dataTransfer?.setData("text/plain", "Vinyasa Flow")}
				onkeydown={addFromKeyboard}
				role="button"
				tabindex="0"
				aria-label="Vinyasa Flow: drag onto a day, or press Enter to add it at the next hour"
			><span class="drag-grip" aria-hidden="true"></span>Vinyasa Flow<span class="drag-hint">drag onto a day</span></div>{/if}
			<div class="msgs">
				<p class="msg" aria-live="polite">
					{#if hint}
						{hint}
					{:else if lastAction}
						<span class="live" aria-hidden="true"></span>{lastAction}
					{:else}
						<span class="idle-pointer">{idle}</span><span class="idle-touch">{idleTouch}</span>
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
	.pager-today:disabled {
		opacity: 0.4;
		cursor: default;
	}
	.pager-today:hover:not(:disabled),
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
		min-height: 24px;
		padding: 0 0 calc(6 * var(--u));
		border: none;
		border-radius: 0;
		background: transparent;
		font: 400 calc(24 * var(--u)) / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, #111);
		box-shadow: inset 0 -3px 0 transparent;
		cursor: pointer;
		transition: color 120ms, box-shadow 120ms;
	}
	.setup:hover {
		box-shadow: inset 0 -3px 0 var(--dt-border-day, rgba(15, 15, 15, 0.6));
	}
	.setup[aria-pressed='true'] {
		box-shadow: inset 0 -3px 0 var(--dt-accent, #1d4fd7);
	}
	.setup:focus-visible {
		outline: 2px solid var(--dt-text, #111);
		outline-offset: 2px;
	}
	.setups--top {
		display: none;
	}
	@media (max-width: 1360px) {
		.setups--rail {
			display: none;
		}
		.setups--top {
			display: flex;
			gap: 6px 22px;
			padding: 14px 0 10px;
			margin-bottom: 16px;
		}
	}

	/* ── Phone: view, theme and host above the calendar ── */
	.quick {
		display: none;
	}
	@media (max-width: 640px) {
		.quick {
			display: flex;
			flex-direction: column;
			gap: 10px;
			margin-bottom: 16px;
		}
		.quick-sel {
			position: relative;
			display: grid;
			grid-template-columns: 3em minmax(0, 1fr);
			align-items: center;
			gap: 8px;
			font: 400 15px / 1 var(--dt-sans, system-ui, sans-serif);
		}
		.quick-sel select {
			appearance: none;
			width: 100%;
			min-height: 44px;
			padding: 0 32px 0 10px;
			border: 2px solid var(--dt-text, #111);
			border-radius: 4px;
			background: transparent;
			font: 400 15px / 1.2 var(--dt-sans, system-ui, sans-serif);
			color: inherit;
			text-overflow: ellipsis;
		}
		.quick-sel select option {
			color: initial;
			background: initial;
		}
		.quick-sel select:focus-visible {
			outline: 2px solid var(--dt-text, #111);
			outline-offset: 2px;
		}
		/* The rail's chevron: a mask over currentColor, so it reads on dark hosts. */
		.quick-sel::after {
			content: "";
			position: absolute;
			right: 10px;
			top: 50%;
			width: 18px;
			height: 18px;
			translate: 0 -50%;
			background: currentColor;
			mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4' fill='none' stroke='black' stroke-width='1.4'/%3E%3C/svg%3E") center / contain no-repeat;
			pointer-events: none;
		}
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
		font: 400 max(13px, calc(17 * var(--u))) / 1.4 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
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
		border: 1px dashed var(--dt-text-3, rgba(15, 15, 15, 0.54));
		font: 500 calc(17 * var(--u)) / 1 var(--dt-sans, system-ui, sans-serif);
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
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
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
		min-height: 24px;
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
		font: 400 calc(26 * var(--u)) / 1 var(--dt-sans, system-ui, sans-serif);
		letter-spacing: -0.01em;
	}
	.code-copy,
	.reset {
		padding: calc(8 * var(--u)) calc(14 * var(--u));
		border: 1px solid var(--dt-border-day, rgba(15, 15, 15, 0.6));
		border-radius: 0;
		background: transparent;
		color: inherit;
		font: 500 calc(17 * var(--u)) / 1 var(--dt-sans, system-ui, sans-serif);
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
	/* The markup on one line; where it runs past the frame, its end fades
	   until it is scrolled to (scroll-driven, so only when it overflows). */
	@property --line-fade {
		syntax: "<length>";
		inherits: false;
		initial-value: 0px;
	}
	@keyframes line-fade {
		from {
			--line-fade: 4em;
		}
		to {
			--line-fade: 0px;
		}
	}
	.code-line {
		mask-image: linear-gradient(to right, #000 calc(100% - var(--line-fade)), transparent);
		animation: line-fade linear both;
		animation-timeline: scroll(self inline);
		display: block;
		padding: 0 calc(22 * var(--u)) calc(16 * var(--u));
		overflow-x: auto;
		white-space: nowrap;
		font: 400 calc(17 * var(--u)) / 1.5 var(--dt-mono, ui-monospace, monospace);
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
		font-variant-ligatures: none;
		scrollbar-width: none;
	}
	.code pre {
		margin: 0;
		/* capped so the week above keeps six hours in view on a 900px screen:
		   what the screen has past ~780px, at least 7.5rem, at most 30vh */
		max-height: clamp(7.5rem, 100vh - 780px, 30vh);
		padding: calc(6 * var(--u)) calc(22 * var(--u)) calc(18 * var(--u));
		overflow: auto;
		font: 400 13px / 1.6 var(--dt-mono, ui-monospace, monospace);
		font-variant-ligatures: none;
		color: var(--dt-text, #111);
		scrollbar-color: var(--dt-scrollbar, rgba(15, 15, 15, 0.18)) transparent;
	}

	/* On a phone the 390px frame is the screen itself, and the calendar keeps
	   to 60% of the screen: its own scroll never takes the whole page. */
	@media (max-width: 640px) {
		.cal-stage {
			flex: none;
		}
		.cal-frame {
			flex: none;
			height: 60vh;
			height: 60svh;
			min-height: 320px;
		}
		.cal-stage--phone .cal-frame {
			height: auto;
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
