<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Calendar,
		DayGrid,
		DayTimeline,
		Agenda,
		WeekGrid,
		WeekHeatmap,
		WeekSchedule,
		Settings,
		createMemoryAdapter,
		createRecurringAdapter,
		presets,
	} from '$lib/index.js';
	import type {
		CalendarView,
		TimelineEvent,
		RecurringEvent,
		SettingsField,
		PresetName,
	} from '$lib/index.js';

	const localeOptions = ['en-US', 'pl-PL', 'de-DE', 'fr-FR', 'ar-SA'] as const;
	const dirOptions = ['auto', 'ltr', 'rtl'] as const;
	const demoOptions = ['full', 'recurring', 'schedule', 'colormap', 'widget'] as const;
	type DemoMode = (typeof demoOptions)[number];
	type ColorMode = 'map' | 'auto' | 'themed';

	const viewOptions: CalendarView['id'][] = [
		'week-grid',
		'day-grid',
		'day-timeline',
		'day-agenda',
		'week-agenda',
		'week-heatmap',
	];

	let activeTheme = $state<PresetName>('midnight');
	let settingsValues = $state<Record<string, string | number | boolean>>({
		demo: 'full',
		readOnly: false,
		mondayStart: true,
		showToolbar: true,
		activeView: 'week-grid',
		locale: 'en-US',
		dir: 'auto',
		visibleHoursEnabled: false,
		startHour: 6,
		endHour: 21,
		colorMode: 'themed',
		hourWidth: 110,
		dayPast: 2,
		dayFuture: 14,
		timelinePast: 1,
		timelineFuture: 30,
	});

	const activeDemo = $derived((settingsValues.demo as DemoMode) ?? 'full');
	const readOnly = $derived(Boolean(settingsValues.readOnly));
	const mondayStart = $derived(Boolean(settingsValues.mondayStart));
	const showToolbar = $derived(Boolean(settingsValues.showToolbar));
	const defaultView = $derived((settingsValues.activeView as CalendarView['id']) ?? 'week-grid');
	const locale = $derived((settingsValues.locale as (typeof localeOptions)[number]) ?? 'en-US');
	const dir = $derived((settingsValues.dir as (typeof dirOptions)[number]) ?? 'auto');
	const visibleHoursEnabled = $derived(Boolean(settingsValues.visibleHoursEnabled));
	const startHour = $derived(Number(settingsValues.startHour));
	const endHour = $derived(Number(settingsValues.endHour));
	const colorMode = $derived((settingsValues.colorMode as ColorMode) ?? 'themed');

	$effect(() => {
		if (!demoOptions.includes(activeDemo)) {
			settingsValues = { ...settingsValues, demo: 'full' };
		}
	});

	$effect(() => {
		if (!localeOptions.includes(locale)) {
			settingsValues = { ...settingsValues, locale: 'en-US' };
		}
	});

	$effect(() => {
		if (!dirOptions.includes(dir)) {
			settingsValues = { ...settingsValues, dir: 'auto' };
		}
	});

	$effect(() => {
		if (!viewOptions.includes(defaultView)) {
			settingsValues = { ...settingsValues, activeView: 'week-grid' };
		}
	});

	$effect(() => {
		const normalizedEndHour = startHour >= endHour ? Math.min(24, startHour + 1) : endHour;
		if (Number(settingsValues.endHour) !== normalizedEndHour) {
			settingsValues = { ...settingsValues, endHour: normalizedEndHour };
		}
	});

	$effect(() => {
		if (visibleHoursEnabled && activeDemo === 'full' && defaultView === 'week-grid') {
			settingsValues = { ...settingsValues, activeView: 'week-heatmap' };
		}
	});

	const visibleHours = $derived<[number, number] | undefined>(
		visibleHoursEnabled ? [startHour, endHour] : undefined,
	);

	const themeValue = $derived(presets[activeTheme]);

	const settingsFields = $derived.by((): SettingsField[] => {
		const fields: SettingsField[] = [
			{
				key: 'demo',
				label: '',
				group: '',
				type: 'segment',
				options: [
					{ value: 'full', label: 'Calendar' },
					{ value: 'recurring', label: 'Recurring' },
					{ value: 'schedule', label: 'Schedule' },
					{ value: 'colormap', label: 'Colors' },
					{ value: 'widget', label: 'Widget' },
				],
			},
		];

		if (activeDemo === 'colormap') {
			fields.push({
				key: 'colorMode',
				label: 'Color Strategy',
				group: '',
				type: 'segment',
				options: [
					{ value: 'themed', label: 'Themed' },
					{ value: 'auto', label: 'Vivid' },
					{ value: 'map', label: 'Color Map' },
				],
			});
		}

		fields.push(
			{ key: 'readOnly', label: 'Read Only', group: 'Behavior', type: 'toggle' },
			{ key: 'showToolbar', label: 'Toolbar', group: 'Behavior', type: 'toggle' },
			{ key: 'mondayStart', label: 'Monday Start', group: 'Behavior', type: 'toggle' },
			{
				key: 'locale',
				label: 'Locale',
				group: 'Localization',
				type: 'select',
				options: localeOptions.map((l) => ({ value: l, label: l })),
			},
			{
				key: 'dir',
				label: 'Direction',
				group: 'Localization',
				type: 'select',
				options: dirOptions.map((d) => ({ value: d, label: d })),
			},
			{ key: 'visibleHoursEnabled', label: 'Visible Hours', group: 'Time Range', type: 'toggle' },
			{ key: 'startHour', label: 'Start Hour', group: 'Time Range', type: 'range', min: 0, max: 23, step: 1, enabledWhen: 'visibleHoursEnabled' },
			{ key: 'endHour', label: 'End Hour', group: 'Time Range', type: 'range', min: 1, max: 24, step: 1, enabledWhen: 'visibleHoursEnabled' },
			{ key: 'hourWidth', label: 'Hour Width', group: 'Layout', type: 'range', min: 80, max: 180, step: 10 },
			{ key: 'dayPast', label: 'Past Days', group: 'Layout', type: 'range', min: 0, max: 4, step: 1 },
			{ key: 'dayFuture', label: 'Future Days', group: 'Layout', type: 'range', min: 3, max: 30, step: 1 },
			{ key: 'timelinePast', label: 'Timeline Past', group: 'Layout', type: 'range', min: 0, max: 4, step: 1 },
			{ key: 'timelineFuture', label: 'Timeline Future', group: 'Layout', type: 'range', min: 7, max: 45, step: 1 },
		);

		return fields;
	});

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	function at(dayOffset: number, h: number, m = 0): Date {
		const d = new Date(today.getTime() + dayOffset * 86_400_000);
		d.setHours(h, m, 0, 0);
		return d;
	}

	const seed: TimelineEvent[] = [
		{ id: 's1', title: 'Morning Flow', start: at(0, 6, 30), end: at(0, 7, 30), color: '#818cf8', category: 'yoga', subtitle: 'With Anna', tags: ['Beginner'] },
		{ id: 's2', title: 'Breathwork', start: at(0, 8, 0), end: at(0, 8, 45), color: '#34d399', category: 'wellness', subtitle: 'Studio B' },
		{ id: 's3', title: 'Power Vinyasa', start: at(0, 10, 0), end: at(0, 11, 15), color: '#f472b6', category: 'yoga', subtitle: 'With Marco', tags: ['Advanced', 'Hot'] },
		{ id: 's4', title: 'Lunch Meditation', start: at(0, 12, 30), end: at(0, 13, 0), color: '#fbbf24', category: 'wellness' },
		{ id: 's5', title: 'Yin Yoga', start: at(0, 16, 0), end: at(0, 17, 0), color: '#a78bfa', category: 'yoga', tags: ['Beginner', 'Relaxing'] },
		{ id: 's6', title: 'Sound Bath', start: at(0, 18, 30), end: at(0, 19, 30), color: '#2dd4bf', category: 'wellness', subtitle: 'Crystal bowls' },
		{ id: 's7', title: 'Sunrise Salutation', start: at(1, 6, 0), end: at(1, 7, 0), color: '#fb923c', category: 'yoga', subtitle: 'Rooftop' },
		{ id: 's8', title: 'Core Strength', start: at(1, 9, 0), end: at(1, 10, 0), color: '#f472b6', category: 'yoga', tags: ['Intermediate'] },
		{ id: 's9', title: 'Guided Nidra', start: at(1, 13, 0), end: at(1, 13, 45), color: '#818cf8', category: 'wellness' },
		{ id: 's10', title: 'Ashtanga Primary', start: at(1, 17, 0), end: at(1, 18, 30), color: '#ef4444', category: 'yoga', subtitle: 'With Pattabhi', tags: ['Advanced'] },
		{ id: 's11', title: 'Hatha Basics', start: at(2, 7, 0), end: at(2, 8, 0), color: '#818cf8', category: 'yoga', tags: ['Beginner'] },
		{ id: 's12', title: 'Mobility Lab', start: at(2, 10, 30), end: at(2, 11, 30), color: '#34d399', category: 'wellness', subtitle: 'Foam rollers provided' },
		{ id: 's13', title: 'Restorative', start: at(2, 15, 0), end: at(2, 16, 0), color: '#a78bfa', category: 'yoga' },
		{ id: 's14', title: 'Dynamic Flow', start: at(3, 8, 0), end: at(3, 9, 15), color: '#f472b6', category: 'yoga', tags: ['Intermediate'] },
		{ id: 's15', title: 'Pranayama Workshop', start: at(3, 11, 0), end: at(3, 12, 0), color: '#fbbf24', category: 'wellness' },
		{ id: 's16', title: 'Candlelight Yin', start: at(3, 19, 0), end: at(3, 20, 15), color: '#2dd4bf', category: 'yoga', subtitle: 'Bring a blanket' },
		{ id: 's17', title: 'Rocket Yoga', start: at(4, 7, 30), end: at(4, 8, 45), color: '#ef4444', category: 'yoga', tags: ['Advanced'] },
		{ id: 's18', title: 'Stretch & Release', start: at(4, 12, 0), end: at(4, 12, 45), color: '#34d399', category: 'wellness' },
		{ id: 's19', title: 'Kundalini', start: at(4, 17, 0), end: at(4, 18, 0), color: '#fb923c', category: 'yoga', subtitle: 'With Guru Dev' },
		{ id: 's20', title: 'Weekend Flow', start: at(5, 9, 0), end: at(5, 10, 15), color: '#818cf8', category: 'yoga' },
		{ id: 's21', title: 'Meditation Circle', start: at(5, 11, 0), end: at(5, 11, 45), color: '#fbbf24', category: 'wellness', tags: ['All levels'] },
		{ id: 's22', title: 'Sunday Slow Flow', start: at(6, 10, 0), end: at(6, 11, 0), color: '#a78bfa', category: 'yoga', subtitle: 'With Anna', tags: ['Beginner'] },
		{ id: 's23', title: 'Community Kirtan', start: at(6, 17, 0), end: at(6, 18, 30), color: '#2dd4bf', category: 'wellness' },
		{ id: 's24', title: 'Gentle Morning', start: at(-1, 7, 0), end: at(-1, 8, 0), color: '#818cf8', category: 'yoga' },
		{ id: 's25', title: 'Deep Stretch', start: at(-1, 16, 0), end: at(-1, 17, 0), color: '#34d399', category: 'wellness' },
	];

	const weeklySchedule: RecurringEvent[] = [
		{ id: 'r1', title: 'Morning Flow', dayOfWeek: 1, startTime: '07:00', endTime: '08:30', color: '#818cf8', subtitle: 'With Anna', tags: ['Beginner'] },
		{ id: 'r2', title: 'Power Vinyasa', dayOfWeek: 1, startTime: '10:00', endTime: '11:15', color: '#f472b6', subtitle: 'With Marco', tags: ['Advanced', 'Hot'] },
		{ id: 'r3', title: 'Breathwork', dayOfWeek: 2, startTime: '08:00', endTime: '08:45', color: '#34d399', subtitle: 'Studio B' },
		{ id: 'r4', title: 'Yin Yoga', dayOfWeek: 2, startTime: '16:00', endTime: '17:00', color: '#a78bfa', tags: ['Beginner', 'Relaxing'] },
		{ id: 'r5', title: 'Core Strength', dayOfWeek: 3, startTime: '09:00', endTime: '10:00', color: '#f472b6', tags: ['Intermediate'] },
		{ id: 'r6', title: 'Sound Bath', dayOfWeek: 3, startTime: '18:30', endTime: '19:30', color: '#2dd4bf', subtitle: 'Crystal bowls' },
		{ id: 'r7', title: 'Ashtanga Primary', dayOfWeek: 4, startTime: '07:00', endTime: '08:30', color: '#ef4444', subtitle: 'With Pattabhi', tags: ['Advanced'] },
		{ id: 'r8', title: 'Pranayama', dayOfWeek: 4, startTime: '11:00', endTime: '12:00', color: '#fbbf24' },
		{ id: 'r9', title: 'Rocket Yoga', dayOfWeek: 5, startTime: '07:30', endTime: '08:45', color: '#ef4444', tags: ['Advanced'] },
		{ id: 'r10', title: 'Candlelight Yin', dayOfWeek: 5, startTime: '19:00', endTime: '20:15', color: '#2dd4bf', subtitle: 'Bring a blanket' },
		{ id: 'r11', title: 'Weekend Flow', dayOfWeek: 6, startTime: '09:00', endTime: '10:15', color: '#818cf8' },
		{ id: 'r12', title: 'Slow Flow', dayOfWeek: 7, startTime: '10:00', endTime: '11:00', color: '#a78bfa', subtitle: 'With Anna', tags: ['Beginner'] },
	];

	const adapter = createMemoryAdapter(seed);
	const recurringAdapter = createRecurringAdapter(weeklySchedule);

	const noColorSeed: TimelineEvent[] = seed.map(({ color, ...ev }) => ev);
	const colorMapAdapter = createMemoryAdapter(noColorSeed, {
		colorMap: { yoga: '#818cf8', wellness: '#34d399' },
	});
	const vividAutoAdapter = createMemoryAdapter(noColorSeed, { autoColor: true });
	const themeAccents: Record<PresetName, string> = {
		midnight: '#ef4444',
		parchment: '#b85c2f',
		indigo: '#6366f1',
		neutral: '#2563eb',
		bare: '#94a3b8',
	};
	const currentAccent = $derived(themeAccents[activeTheme] ?? '#ef4444');
	const themeAutoAdapter = $derived(createMemoryAdapter(noColorSeed, { autoColor: currentAccent }));

	const activeColorAdapter = $derived(
		colorMode === 'map' ? colorMapAdapter : colorMode === 'themed' ? themeAutoAdapter : vividAutoAdapter,
	);

	const views = $derived<CalendarView[]>([
		{
			id: 'day-grid',
			label: 'Grid',
			granularity: 'day',
			component: DayGrid,
			props: {
				hourWidth: Number(settingsValues.hourWidth),
				pastDays: Number(settingsValues.dayPast),
				futureDays: Number(settingsValues.dayFuture),
			},
		},
		{
			id: 'day-timeline',
			label: 'Timeline',
			granularity: 'day',
			component: DayTimeline,
			props: {
				hourWidth: Number(settingsValues.hourWidth),
				pastDays: Number(settingsValues.timelinePast),
				futureDays: Number(settingsValues.timelineFuture),
			},
		},
		{ id: 'week-grid', label: 'Grid', granularity: 'week', component: WeekGrid },
		{ id: 'day-agenda', label: 'Agenda', granularity: 'day', component: Agenda, props: { mode: 'day' } },
		{ id: 'week-agenda', label: 'Agenda', granularity: 'week', component: Agenda, props: { mode: 'week' } },
		{ id: 'week-heatmap', label: 'Heatmap', granularity: 'week', component: WeekHeatmap },
	]);

	let lastAction = $state('');
	function handleClick(ev: TimelineEvent) {
		const parts = [`Clicked: ${ev.title}`];
		if (ev.subtitle) parts.push(`(${ev.subtitle})`);
		if (ev.tags?.length) parts.push(`[${ev.tags.join(', ')}]`);
		lastAction = parts.join(' ');
	}
	function handleCreate(range: { start: Date; end: Date }) {
		lastAction = `Create: ${range.start.toLocaleTimeString()} – ${range.end.toLocaleTimeString()}`;
	}
	function handleMove(event: TimelineEvent, start: Date, end: Date) {
		lastAction = `Move: ${event.title} → ${start.toLocaleTimeString()} – ${end.toLocaleTimeString()}`;
	}

	function handleViewChange(viewId: CalendarView['id']) {
		if (defaultView !== viewId) {
			settingsValues = { ...settingsValues, activeView: viewId };
		}
	}

	let widgetReady = $state(false);
	onMount(async () => {
		await import('$lib/widget/widget');
		widgetReady = true;
	});

	const widgetEventsJson = $derived(
		JSON.stringify(
			seed.slice(0, 6).map((ev) => ({
				id: ev.id,
				title: ev.title,
				start: ev.start.toISOString(),
				end: ev.end.toISOString(),
				color: ev.color,
			})),
		),
	);
</script>

<svelte:head>
	<title>@nomideusz/svelte-calendar — Full Demo</title>
</svelte:head>

<main>
	<header class="demo-header">
		<h1>@nomideusz/svelte-calendar</h1>
		<p class="demo-sub">Complete feature demo — all public features wired and interactive.</p>
		<a class="gh-link" href="https://github.com/nomideusz/svelte-calendar" target="_blank" rel="noopener">
			<svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.62 7.62 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
			Star on GitHub
		</a>
	</header>

	<section class="settings-shell">
		<Settings fields={settingsFields} bind:values={settingsValues} bind:theme={activeTheme} />
		{#if visibleHoursEnabled}
			<p class="settings-note">Visible hours are active: {startHour}:00 → {endHour}:00</p>
		{/if}
		{#if lastAction}
			<div class="action-bar">
				<span class="action-dot"></span>
				{lastAction}
			</div>
		{/if}
	</section>

	<section class="demo-calendar">
		{#if activeDemo === 'full'}
			<h2 class="demo-title">Full Calendar <span class="demo-tag">all views • callbacks • locale/dir</span></h2>
			<Calendar
				{adapter}
				views={views}
				{defaultView}
				theme={themeValue}
				height={700}
				{readOnly}
				{mondayStart}
				{visibleHours}
				{showToolbar}
				{locale}
				{dir}
				onviewchange={handleViewChange}
				oneventclick={handleClick}
				oneventcreate={handleCreate}
				oneventmove={handleMove}
			/>

		{:else if activeDemo === 'recurring'}
			<h2 class="demo-title">Recurring Adapter <span class="demo-tag">createRecurringAdapter</span></h2>
			<p class="demo-desc">Weekly schedule definitions are projected into concrete events for each viewed week.</p>
			<Calendar
				adapter={recurringAdapter}
				views={views}
				{defaultView}
				theme={themeValue}
				height={700}
				{readOnly}
				{mondayStart}
				{visibleHours}
				{showToolbar}
				{locale}
				{dir}
				onviewchange={handleViewChange}
				oneventclick={handleClick}
			/>

		{:else if activeDemo === 'schedule'}
			<h2 class="demo-title">WeekSchedule <span class="demo-tag">single component convenience API</span></h2>
			<p class="demo-desc">Pre-wired schedule view with recurring data support and built-in toolbar/views.</p>
			<WeekSchedule
				schedule={weeklySchedule}
				theme={themeValue}
				height={620}
				{readOnly}
				{mondayStart}
				{visibleHours}
				{showToolbar}
				{locale}
				{dir}
				oneventclick={handleClick}
			/>

		{:else if activeDemo === 'colormap'}
			<h2 class="demo-title">Color Strategies <span class="demo-tag">colorMap • autoColor • theme-aware palette</span></h2>
			<p class="demo-desc">
				{#if colorMode === 'themed'}
					Using <code>autoColor: '{currentAccent}'</code> from active theme accent.
				{:else if colorMode === 'auto'}
					Using <code>autoColor: true</code> (fixed vivid palette).
				{:else}
					Using explicit <code>colorMap</code> assignment by category.
				{/if}
			</p>
			<Calendar
				adapter={activeColorAdapter}
				views={views}
				{defaultView}
				theme={themeValue}
				height={700}
				{readOnly}
				{mondayStart}
				{visibleHours}
				{showToolbar}
				{locale}
				{dir}
				onviewchange={handleViewChange}
				oneventclick={handleClick}
				oneventcreate={handleCreate}
				oneventmove={handleMove}
			/>

		{:else if activeDemo === 'widget'}
			<h2 class="demo-title">Embeddable Widget <span class="demo-tag">day-calendar custom element</span></h2>
			<p class="demo-desc">Live custom element registered at runtime. Attribute changes update the widget immediately.</p>
			{#if widgetReady}
				<div class="widget-wrap">
					<day-calendar
						theme={activeTheme}
						view={defaultView}
						height="580"
						locale={locale}
						dir={dir}
						mondaystart={mondayStart ? 'true' : 'false'}
						events={widgetEventsJson}
					></day-calendar>
				</div>
			{:else}
				<p class="demo-desc">Loading widget runtime…</p>
			{/if}
		{/if}
	</section>

	<section class="features">
		<h2>Feature Coverage</h2>
		<div class="feature-grid">
			<div class="feature"><h3>Views</h3><p>DayGrid, DayTimeline, WeekGrid, WeekHeatmap, Agenda (day/week) in one Calendar.</p></div>
			<div class="feature"><h3>Adapters</h3><p>Memory, recurring weekly projection, and color strategies (map / vivid / themed).</p></div>
			<div class="feature"><h3>Interaction</h3><p>Click/create/move callbacks with live feedback, plus read-only mode behavior.</p></div>
			<div class="feature"><h3>Display Controls</h3><p>Theme, locale, direction, mondayStart, visibleHours, toolbar toggle.</p></div>
			<div class="feature"><h3>Convenience APIs</h3><p><code>WeekSchedule</code> and <code>Settings</code> are both demonstrated with live bindings.</p></div>
			<div class="feature"><h3>Widget</h3><p>Client-side custom element <code>&lt;day-calendar&gt;</code> rendered with inline JSON events.</p></div>
		</div>
	</section>
</main>

<style>
	main {
		max-width: 1180px;
		margin: 0 auto;
		padding: 40px 28px 80px;
	}

	.demo-header {
		margin-bottom: 28px;
	}
	.demo-header h1 {
		font: 700 28px/1.2 'Outfit', system-ui, sans-serif;
		color: rgba(226, 232, 240, 0.95);
		margin: 0 0 6px;
	}
	.demo-sub {
		font: 400 14px/1.4 'Outfit', system-ui, sans-serif;
		color: rgba(148, 163, 184, 0.58);
		margin: 0;
	}

	.gh-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-top: 10px;
		padding: 5px 12px 5px 10px;
		border-radius: 6px;
		border: 1px solid rgba(148, 163, 184, 0.12);
		background: rgba(148, 163, 184, 0.06);
		font: 500 12px/1 'Outfit', system-ui, sans-serif;
		color: rgba(226, 232, 240, 0.72);
		text-decoration: none;
		transition: color 120ms, border-color 120ms, background 120ms;
	}
	.gh-link:hover {
		color: rgba(226, 232, 240, 0.95);
		border-color: rgba(148, 163, 184, 0.22);
		background: rgba(148, 163, 184, 0.10);
	}
	.gh-link svg {
		opacity: 0.7;
	}

	.settings-shell {
		margin-bottom: 22px;
	}

	.settings-note {
		margin: 8px 0 0;
		font: 400 11px/1.4 'Outfit', system-ui, sans-serif;
		color: rgba(148, 163, 184, 0.6);
	}

	.action-bar {
		font: 400 11px/1.2 'Outfit', system-ui, sans-serif;
		color: rgba(226, 232, 240, 0.63);
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 0 0;
		border-top: 1px solid rgba(148, 163, 184, 0.05);
	}
	.action-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #34d399;
		flex-shrink: 0;
	}

	.demo-calendar {
		margin-bottom: 46px;
	}
	.demo-title {
		font: 600 18px/1 'Outfit', system-ui, sans-serif;
		color: rgba(226, 232, 240, 0.9);
		margin: 0 0 8px;
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}
	.demo-tag {
		font: 400 10px/1 'Outfit', system-ui, sans-serif;
		color: rgba(148, 163, 184, 0.52);
		background: rgba(148, 163, 184, 0.06);
		padding: 3px 8px;
		border-radius: 4px;
	}
	.demo-desc {
		font: 400 13px/1.5 'Outfit', system-ui, sans-serif;
		color: rgba(148, 163, 184, 0.62);
		margin: 0 0 14px;
	}
	.demo-desc code {
		font: 400 12px/1 'SF Mono', ui-monospace, monospace;
		color: rgba(226, 232, 240, 0.7);
		background: rgba(148, 163, 184, 0.08);
		padding: 1px 5px;
		border-radius: 3px;
	}

	.widget-wrap {
		border: 1px solid rgba(148, 163, 184, 0.08);
		border-radius: 10px;
		overflow: hidden;
		background: rgba(8, 12, 18, 0.5);
	}

	.features {
		padding-top: 24px;
		border-top: 1px solid rgba(148, 163, 184, 0.06);
	}
	.features h2 {
		font: 600 16px/1 'Outfit', system-ui, sans-serif;
		color: rgba(226, 232, 240, 0.82);
		margin: 0 0 16px;
	}
	.feature-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 12px;
	}
	.feature {
		background: rgba(16, 20, 28, 0.5);
		border: 1px solid rgba(148, 163, 184, 0.06);
		border-radius: 8px;
		padding: 14px 16px;
	}
	.feature h3 {
		font: 600 13px/1 'Outfit', system-ui, sans-serif;
		color: rgba(226, 232, 240, 0.85);
		margin: 0 0 6px;
	}
	.feature p {
		font: 400 12px/1.5 'Outfit', system-ui, sans-serif;
		color: rgba(148, 163, 184, 0.56);
		margin: 0;
	}
	.feature code {
		font: 400 11px/1 'SF Mono', ui-monospace, monospace;
		color: rgba(226, 232, 240, 0.67);
		background: rgba(148, 163, 184, 0.08);
		padding: 1px 4px;
		border-radius: 3px;
	}

</style>
