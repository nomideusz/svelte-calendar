<script lang="ts">
	import {
		Calendar,
		Planner,
		Agenda,
		createMemoryAdapter,
		presets,
	} from '$lib/index.js';
	import Settings from './_components/Settings.svelte';
	import type { SettingsField } from './_components/Settings.svelte';
	import type {
		CalendarView,
		TimelineEvent,
		PresetName,
	} from '$lib/index.js';

	let activeTheme = $state<PresetName>('midnight');
	let settingsValues = $state<Record<string, string | number | boolean>>({
		readOnly: false,
		mondayStart: true,
		activeView: 'week-planner',
		locale: 'en-US',
	});

	const readOnly = $derived(Boolean(settingsValues.readOnly));
	const mondayStart = $derived(Boolean(settingsValues.mondayStart));
	const defaultView = $derived((settingsValues.activeView as CalendarView['id']) ?? 'week-planner');
	const locale = $derived((settingsValues.locale as string) ?? 'en-US');
	const dir = $derived<'ltr' | 'rtl'>(settingsValues.rtl ? 'rtl' : 'ltr');
	const themeValue = $derived(presets[activeTheme]);

	const settingsFields: SettingsField[] = [
		{
			key: 'activeView',
			label: 'View',
			group: '',
			type: 'select',
			options: [
				{ value: 'week-planner', label: 'Week Planner' },
				{ value: 'day-planner', label: 'Day Planner' },
				{ value: 'week-agenda', label: 'Week Agenda' },
				{ value: 'day-agenda', label: 'Day Agenda' },
			],
		},
		{
			key: 'locale',
			label: 'Locale',
			group: '',
			type: 'select',
			options: [
				{ value: 'en-US', label: 'en-US' },
				{ value: 'pl-PL', label: 'pl-PL' },
				{ value: 'de-DE', label: 'de-DE' },
				{ value: 'fr-FR', label: 'fr-FR' },
				{ value: 'ar-SA', label: 'ar-SA' },
			],
		},
		{ key: 'rtl', label: 'RTL', group: '', type: 'toggle' },
		{ key: 'mondayStart', label: 'Monday Start', group: '', type: 'toggle' },
		{ key: 'readOnly', label: 'Read Only', group: '', type: 'toggle' },
	];

	// ── Seed data ──────────────────────────────────────────
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	function at(dayOffset: number, h: number, m = 0): Date {
		const d = new Date(today.getTime() + dayOffset * 86_400_000);
		d.setHours(h, m, 0, 0);
		return d;
	}

	const seed: TimelineEvent[] = [
		{ id: '1', title: 'Morning Flow', start: at(0, 7, 0), end: at(0, 8, 0), category: 'yoga', subtitle: 'With Anna' },
		{ id: '2', title: 'Breathwork', start: at(0, 9, 0), end: at(0, 9, 45), category: 'wellness' },
		{ id: '3', title: 'Power Vinyasa', start: at(0, 11, 0), end: at(0, 12, 15), category: 'yoga', tags: ['Advanced'] },
		{ id: '4', title: 'Yin Yoga', start: at(0, 16, 0), end: at(0, 17, 0), category: 'yoga' },
		{ id: '5', title: 'Sound Bath', start: at(0, 18, 30), end: at(0, 19, 30), category: 'wellness' },
		{ id: '6', title: 'Sunrise Salutation', start: at(1, 6, 30), end: at(1, 7, 30), category: 'yoga' },
		{ id: '7', title: 'Core Strength', start: at(1, 9, 0), end: at(1, 10, 0), category: 'yoga' },
		{ id: '8', title: 'Guided Nidra', start: at(1, 13, 0), end: at(1, 13, 45), category: 'wellness' },
		{ id: '9', title: 'Ashtanga', start: at(1, 17, 0), end: at(1, 18, 30), category: 'yoga', tags: ['Advanced'] },
		{ id: '10', title: 'Hatha Basics', start: at(2, 7, 0), end: at(2, 8, 0), category: 'yoga' },
		{ id: '11', title: 'Mobility Lab', start: at(2, 10, 30), end: at(2, 11, 30), category: 'wellness' },
		{ id: '12', title: 'Dynamic Flow', start: at(3, 8, 0), end: at(3, 9, 15), category: 'yoga' },
		{ id: '13', title: 'Pranayama', start: at(3, 11, 0), end: at(3, 12, 0), category: 'wellness' },
		{ id: '14', title: 'Rocket Yoga', start: at(4, 7, 30), end: at(4, 8, 45), category: 'yoga', tags: ['Advanced'] },
		{ id: '15', title: 'Stretch & Release', start: at(4, 12, 0), end: at(4, 12, 45), category: 'wellness' },
		{ id: '16', title: 'Weekend Flow', start: at(5, 9, 0), end: at(5, 10, 15), category: 'yoga' },
		{ id: '17', title: 'Meditation', start: at(5, 11, 0), end: at(5, 11, 45), category: 'wellness' },
		{ id: '18', title: 'Slow Flow', start: at(6, 10, 0), end: at(6, 11, 0), category: 'yoga' },
		{ id: '19', title: 'Gentle Morning', start: at(-1, 7, 0), end: at(-1, 8, 0), category: 'yoga' },
		// Multi-day / all-day events
		{ id: '20', title: 'Yoga Retreat', start: at(0, 0), end: at(3, 0), allDay: true, category: 'wellness', subtitle: 'Mountain Lodge' },
		{ id: '21', title: 'Teacher Training', start: at(4, 0), end: at(6, 0), allDay: true, category: 'yoga' },
		{ id: '22', title: 'Studio Closed', start: at(-2, 0), end: at(-1, 0), allDay: true, category: 'wellness' },
	];

	// ── Adapter with auto-coloring ─────────────────────────
	const accentMap: Partial<Record<PresetName, string>> = { midnight: '#ef4444' };
	const accent = $derived(accentMap[activeTheme] ?? '#2563eb');
	const adapter = $derived(createMemoryAdapter(seed, { autoColor: accent }));

	// ── Sync body background ───────────────────────────────
	const stageBgs: Record<PresetName, string> = {
		midnight: '#080a0f',
		neutral: '#ffffff',
	};
	$effect(() => {
		document.body.style.background = stageBgs[activeTheme] ?? '#080a0f';
		document.documentElement.dataset.theme = activeTheme;
	});

	// ── Views ──────────────────────────────────────────────
	const views: CalendarView[] = [
		{
			id: 'day-planner',
			label: 'Planner',
			granularity: 'day',
			component: Planner,
			props: { mode: 'day' },
		},
		{ id: 'week-planner', label: 'Planner', granularity: 'week', component: Planner, props: { mode: 'week' } },
		{ id: 'day-agenda', label: 'Agenda', granularity: 'day', component: Agenda, props: { mode: 'day' } },
		{ id: 'week-agenda', label: 'Agenda', granularity: 'week', component: Agenda, props: { mode: 'week' } },
	];

	// ── Callbacks ──────────────────────────────────────────
	let lastAction = $state('');
	function handleClick(ev: TimelineEvent) {
		lastAction = `Clicked: ${ev.title}`;
	}
	function handleCreate(range: { start: Date; end: Date }) {
		lastAction = `Create: ${range.start.toLocaleTimeString()} – ${range.end.toLocaleTimeString()}`;
	}
	function handleMove(event: TimelineEvent, start: Date, end: Date) {
		lastAction = `Moved: ${event.title} → ${start.toLocaleTimeString()} – ${end.toLocaleTimeString()}`;
	}
	function handleViewChange(viewId: CalendarView['id']) {
		if (defaultView !== viewId) {
			settingsValues = { ...settingsValues, activeView: viewId };
		}
	}
</script>

<svelte:head>
	<title>svelte-calendar – Demo</title>
</svelte:head>

<main style={themeValue}>
	<Settings fields={settingsFields} bind:values={settingsValues} bind:theme={activeTheme} />

	<div style="height: 28px;">
		{#if lastAction}
			<div class="action">
				<span class="dot"></span>
				{lastAction}
			</div>
		{/if}
	</div>

	<Calendar
		{adapter}
		{views}
		{defaultView}
		theme={themeValue}
		height={700}
		{readOnly}
		{mondayStart}
		{locale}
		{dir}
		onviewchange={handleViewChange}
		oneventclick={handleClick}
		oneventcreate={handleCreate}
		oneventmove={handleMove}
	/>
</main>

<style>
	main {
		max-width: 1100px;
		margin: 0 auto;
		padding: 48px 24px 64px;
		background: var(--dt-stage-bg, #080a0f);
		transition: background 300ms ease, color 300ms ease;
	}

	.action {
		font: 400 11px/1.2 var(--dt-sans, 'Outfit', system-ui, sans-serif);
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
</style>
