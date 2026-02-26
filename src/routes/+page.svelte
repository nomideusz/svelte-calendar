<script lang="ts">
	import {
		Calendar,
		DayGrid,
		DayTimeline,
		Agenda,
		WeekGrid,
		WeekHeatmap,
		WeekSchedule,
		createMemoryAdapter,
		createRecurringAdapter,
		presets,
	} from '$lib/index.js';
	import type { CalendarView, TimelineEvent, RecurringEvent } from '$lib/index.js';

	// ── Theme switcher state ────────────────────────────
	const themeNames = ['midnight', 'parchment', 'indigo', 'neutral'] as const;
	let activeTheme = $state<(typeof themeNames)[number]>('midnight');
	const themeValue = $derived(presets[activeTheme]);

	// ── Toggle states for features ──────────────────────
	let readOnly = $state(false);
	let mondayStart = $state(true);
	let visibleHoursEnabled = $state(false);
	let startHour = $state(6);
	let endHour = $state(21);
	const visibleHours = $derived<[number, number] | undefined>(
		visibleHoursEnabled ? [startHour, endHour] : undefined,
	);

	// ── Demo section toggle ─────────────────────────────
	let activeDemo = $state<'full' | 'recurring' | 'schedule' | 'colormap'>('full');

	// ── Seed events: yoga & wellness with subtitle + tags ──
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	function at(dayOffset: number, h: number, m = 0): Date {
		const d = new Date(today.getTime() + dayOffset * 86_400_000);
		d.setHours(h, m, 0, 0);
		return d;
	}

	const seed: TimelineEvent[] = [
		// Today
		{ id: 's1',  title: 'Morning Flow',      start: at(0, 6, 30),  end: at(0, 7, 30),  color: '#818cf8', category: 'yoga',     subtitle: 'With Anna',     tags: ['Beginner'] },
		{ id: 's2',  title: 'Breathwork',         start: at(0, 8, 0),   end: at(0, 8, 45),  color: '#34d399', category: 'wellness', subtitle: 'Studio B' },
		{ id: 's3',  title: 'Power Vinyasa',      start: at(0, 10, 0),  end: at(0, 11, 15), color: '#f472b6', category: 'yoga',     subtitle: 'With Marco',    tags: ['Advanced', 'Hot'] },
		{ id: 's4',  title: 'Lunch Meditation',   start: at(0, 12, 30), end: at(0, 13, 0),  color: '#fbbf24', category: 'wellness' },
		{ id: 's5',  title: 'Yin Yoga',           start: at(0, 16, 0),  end: at(0, 17, 0),  color: '#a78bfa', category: 'yoga',     tags: ['Beginner', 'Relaxing'] },
		{ id: 's6',  title: 'Sound Bath',         start: at(0, 18, 30), end: at(0, 19, 30), color: '#2dd4bf', category: 'wellness', subtitle: 'Crystal bowls' },
		// Tomorrow
		{ id: 's7',  title: 'Sunrise Salutation', start: at(1, 6, 0),   end: at(1, 7, 0),   color: '#fb923c', category: 'yoga',     subtitle: 'Rooftop' },
		{ id: 's8',  title: 'Core Strength',      start: at(1, 9, 0),   end: at(1, 10, 0),  color: '#f472b6', category: 'yoga',     tags: ['Intermediate'] },
		{ id: 's9',  title: 'Guided Nidra',       start: at(1, 13, 0),  end: at(1, 13, 45), color: '#818cf8', category: 'wellness' },
		{ id: 's10', title: 'Ashtanga Primary',   start: at(1, 17, 0),  end: at(1, 18, 30), color: '#ef4444', category: 'yoga',     subtitle: 'With Pattabhi', tags: ['Advanced'] },
		// Day +2
		{ id: 's11', title: 'Hatha Basics',       start: at(2, 7, 0),   end: at(2, 8, 0),   color: '#818cf8', category: 'yoga',     tags: ['Beginner'] },
		{ id: 's12', title: 'Mobility Lab',       start: at(2, 10, 30), end: at(2, 11, 30), color: '#34d399', category: 'wellness', subtitle: 'Foam rollers provided' },
		{ id: 's13', title: 'Restorative',        start: at(2, 15, 0),  end: at(2, 16, 0),  color: '#a78bfa', category: 'yoga' },
		// Day +3
		{ id: 's14', title: 'Dynamic Flow',       start: at(3, 8, 0),   end: at(3, 9, 15),  color: '#f472b6', category: 'yoga',     tags: ['Intermediate'] },
		{ id: 's15', title: 'Pranayama Workshop',  start: at(3, 11, 0),  end: at(3, 12, 0),  color: '#fbbf24', category: 'wellness' },
		{ id: 's16', title: 'Candlelight Yin',    start: at(3, 19, 0),  end: at(3, 20, 15), color: '#2dd4bf', category: 'yoga',     subtitle: 'Bring a blanket' },
		// Day +4
		{ id: 's17', title: 'Rocket Yoga',        start: at(4, 7, 30),  end: at(4, 8, 45),  color: '#ef4444', category: 'yoga',     tags: ['Advanced'] },
		{ id: 's18', title: 'Stretch & Release',  start: at(4, 12, 0),  end: at(4, 12, 45), color: '#34d399', category: 'wellness' },
		{ id: 's19', title: 'Kundalini',          start: at(4, 17, 0),  end: at(4, 18, 0),  color: '#fb923c', category: 'yoga',     subtitle: 'With Guru Dev' },
		// Day +5
		{ id: 's20', title: 'Weekend Flow',       start: at(5, 9, 0),   end: at(5, 10, 15), color: '#818cf8', category: 'yoga' },
		{ id: 's21', title: 'Meditation Circle',   start: at(5, 11, 0),  end: at(5, 11, 45), color: '#fbbf24', category: 'wellness', tags: ['All levels'] },
		// Day +6
		{ id: 's22', title: 'Sunday Slow Flow',   start: at(6, 10, 0),  end: at(6, 11, 0),  color: '#a78bfa', category: 'yoga',     subtitle: 'With Anna',     tags: ['Beginner'] },
		{ id: 's23', title: 'Community Kirtan',    start: at(6, 17, 0),  end: at(6, 18, 30), color: '#2dd4bf', category: 'wellness' },
		// Yesterday
		{ id: 's24', title: 'Gentle Morning',     start: at(-1, 7, 0),  end: at(-1, 8, 0),  color: '#818cf8', category: 'yoga' },
		{ id: 's25', title: 'Deep Stretch',       start: at(-1, 16, 0), end: at(-1, 17, 0), color: '#34d399', category: 'wellness' },
	];

	const adapter = createMemoryAdapter(seed);

	// ── Recurring schedule (for recurring demo) ─────────
	const weeklySchedule: RecurringEvent[] = [
		{ id: 'r1', title: 'Morning Flow',    dayOfWeek: 1, startTime: '07:00', endTime: '08:30', color: '#818cf8', subtitle: 'With Anna',   tags: ['Beginner'] },
		{ id: 'r2', title: 'Power Vinyasa',   dayOfWeek: 1, startTime: '10:00', endTime: '11:15', color: '#f472b6', subtitle: 'With Marco',  tags: ['Advanced', 'Hot'] },
		{ id: 'r3', title: 'Breathwork',       dayOfWeek: 2, startTime: '08:00', endTime: '08:45', color: '#34d399', subtitle: 'Studio B' },
		{ id: 'r4', title: 'Yin Yoga',        dayOfWeek: 2, startTime: '16:00', endTime: '17:00', color: '#a78bfa', tags: ['Beginner', 'Relaxing'] },
		{ id: 'r5', title: 'Core Strength',   dayOfWeek: 3, startTime: '09:00', endTime: '10:00', color: '#f472b6', tags: ['Intermediate'] },
		{ id: 'r6', title: 'Sound Bath',      dayOfWeek: 3, startTime: '18:30', endTime: '19:30', color: '#2dd4bf', subtitle: 'Crystal bowls' },
		{ id: 'r7', title: 'Ashtanga Primary', dayOfWeek: 4, startTime: '07:00', endTime: '08:30', color: '#ef4444', subtitle: 'With Pattabhi', tags: ['Advanced'] },
		{ id: 'r8', title: 'Pranayama',       dayOfWeek: 4, startTime: '11:00', endTime: '12:00', color: '#fbbf24' },
		{ id: 'r9', title: 'Rocket Yoga',     dayOfWeek: 5, startTime: '07:30', endTime: '08:45', color: '#ef4444', tags: ['Advanced'] },
		{ id: 'r10', title: 'Candlelight Yin', dayOfWeek: 5, startTime: '19:00', endTime: '20:15', color: '#2dd4bf', subtitle: 'Bring a blanket' },
		{ id: 'r11', title: 'Weekend Flow',   dayOfWeek: 6, startTime: '09:00', endTime: '10:15', color: '#818cf8' },
		{ id: 'r12', title: 'Slow Flow',      dayOfWeek: 7, startTime: '10:00', endTime: '11:00', color: '#a78bfa', subtitle: 'With Anna', tags: ['Beginner'] },
	];

	const recurringAdapter = createRecurringAdapter(weeklySchedule);

	// ── Theme accent extraction (for smart autoColor) ──────
	const themeAccents: Record<string, string> = {
		midnight: '#ef4444',
		parchment: '#b85c2f',
		indigo: '#6366f1',
		neutral: '#2563eb',
	};
	const currentAccent = $derived(themeAccents[activeTheme] ?? '#ef4444');

	// ── colorMap demo adapter (no explicit colors — uses autoColor) ──
	const noColorSeed: TimelineEvent[] = seed.map(({ color, ...ev }) => ev);
	const colorMapAdapter = createMemoryAdapter(noColorSeed, {
		colorMap: {
			yoga: '#818cf8',
			wellness: '#34d399',
		},
	});

	// Vivid palette (theme-unaware, original behavior)
	const vividAutoAdapter = createMemoryAdapter(noColorSeed, { autoColor: true });

	// Theme-aware adapter — recreated when the accent changes
	const themeAutoAdapter = $derived(
		createMemoryAdapter(noColorSeed, { autoColor: currentAccent }),
	);

	let colorMode = $state<'map' | 'auto' | 'themed'>('themed');
	const activeColorAdapter = $derived(
		colorMode === 'map'
			? colorMapAdapter
			: colorMode === 'themed'
				? themeAutoAdapter
				: vividAutoAdapter,
	);

	// ── Register views ──────────────────────────────────
	const views: CalendarView[] = [
		{ id: 'day-grid',     label: 'Grid',     granularity: 'day',  component: DayGrid },
		{ id: 'day-timeline', label: 'Timeline', granularity: 'day',  component: DayTimeline },
		{ id: 'week-grid',    label: 'Grid',     granularity: 'week', component: WeekGrid },
		{ id: 'day-agenda',   label: 'Agenda',   granularity: 'day',  component: Agenda, props: { mode: 'day' } },
		{ id: 'week-agenda',  label: 'Agenda',   granularity: 'week', component: Agenda, props: { mode: 'week' } },
		{ id: 'week-heatmap', label: 'Heatmap',  granularity: 'week', component: WeekHeatmap },
	];

	// ── Event handlers ──────────────────────────────────
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
</script>

<svelte:head>
	<title>@nomideusz/svelte-calendar — Demo</title>
</svelte:head>

<main>
	<!-- ─── Header ──────────────────────────────────── -->
	<header class="demo-header">
		<h1>@nomideusz/svelte-calendar</h1>
		<p class="demo-sub">Interactive demo — test all features below</p>
	</header>

	<!-- ─── Controls panel ──────────────────────────── -->
	<section class="panel">
		<div class="panel-row">
			<div class="control-group">
				<span class="label">Demo</span>
				<div class="btn-group">
					<button class="btn" class:active={activeDemo === 'full'} onclick={() => activeDemo = 'full'}>Full Calendar</button>
					<button class="btn" class:active={activeDemo === 'recurring'} onclick={() => activeDemo = 'recurring'}>Recurring</button>
					<button class="btn" class:active={activeDemo === 'schedule'} onclick={() => activeDemo = 'schedule'}>WeekSchedule</button>
					<button class="btn" class:active={activeDemo === 'colormap'} onclick={() => activeDemo = 'colormap'}>ColorMap</button>
				</div>
			</div>

			<div class="control-group">
				<span class="label">Theme</span>
				<div class="btn-group">
					{#each themeNames as t}
						<button class="btn" class:active={activeTheme === t} onclick={() => activeTheme = t}>{t}</button>
					{/each}
				</div>
			</div>
		</div>

		<div class="panel-row">
			<div class="control-group">
				<label class="label">
					<input type="checkbox" bind:checked={readOnly} />
					readOnly
				</label>
			</div>

			<div class="control-group">
				<label class="label">
					<input type="checkbox" bind:checked={mondayStart} />
					mondayStart
				</label>
			</div>

			<div class="control-group">
				<label class="label">
					<input type="checkbox" bind:checked={visibleHoursEnabled} />
					visibleHours
				</label>
				{#if visibleHoursEnabled}
					<div class="range-row">
						<label class="range-label">
							{startHour}:00
							<input type="range" min="0" max="23" bind:value={startHour} />
						</label>
						<span class="range-sep">→</span>
						<label class="range-label">
							{endHour}:00
							<input type="range" min="1" max="24" bind:value={endHour} />
						</label>
					</div>
				{/if}
			</div>

			{#if activeDemo === 'colormap'}
				<div class="control-group">
					<span class="label">Color mode</span>
					<div class="btn-group">
						<button class="btn" class:active={colorMode === 'themed'} onclick={() => colorMode = 'themed'}>themed</button>
						<button class="btn" class:active={colorMode === 'auto'} onclick={() => colorMode = 'auto'}>vivid</button>
						<button class="btn" class:active={colorMode === 'map'} onclick={() => colorMode = 'map'}>colorMap</button>
					</div>
				</div>
			{/if}
		</div>

		{#if lastAction}
			<div class="action-bar">
				<span class="action-dot"></span>
				{lastAction}
			</div>
		{/if}
	</section>

	<!-- ─── Calendar demos ──────────────────────────── -->
	<section class="demo-calendar">
		{#if activeDemo === 'full'}
			<h2 class="demo-title">Full Calendar <span class="demo-tag">all views • subtitle • tags</span></h2>
			<Calendar
				{adapter}
				{views}
				defaultView="week-grid"
				theme={themeValue}
				height={680}
				{readOnly}
				{mondayStart}
				{visibleHours}
				oneventclick={handleClick}
				oneventcreate={handleCreate}
			/>

		{:else if activeDemo === 'recurring'}
			<h2 class="demo-title">Recurring Adapter <span class="demo-tag">createRecurringAdapter • weekly schedule</span></h2>
			<p class="demo-desc">
				Events defined as simple <code>dayOfWeek + startTime + endTime</code> — auto-projected onto each week.
				No manual date fabrication needed.
			</p>
			<Calendar
				adapter={recurringAdapter}
				{views}
				defaultView="week-grid"
				theme={themeValue}
				height={680}
				{readOnly}
				{mondayStart}
				{visibleHours}
				oneventclick={handleClick}
			/>

		{:else if activeDemo === 'schedule'}
			<h2 class="demo-title">WeekSchedule <span class="demo-tag">single import • zero config</span></h2>
			<p class="demo-desc">
				One component, one import. Pre-wires adapter, views, and toolbar automatically.
				Uses <code>schedule</code> prop for recurring events.
			</p>
			<WeekSchedule
				schedule={weeklySchedule}
				theme={themeValue}
				height={600}
				readOnly={readOnly}
				{mondayStart}
				{visibleHours}
				oneventclick={handleClick}
			/>

		{:else if activeDemo === 'colormap'}
			<h2 class="demo-title">Color Map / Auto-Color <span class="demo-tag">theme-aware • no manual colors</span></h2>
			<p class="demo-desc">
				{#if colorMode === 'themed'}
					Using <code>autoColor: '{currentAccent}'</code> — palette generated via golden-angle hue rotation from the theme's accent. Switch themes to see colors adapt!
				{:else if colorMode === 'auto'}
					Using <code>autoColor: true</code> — original vivid palette (15 fixed colors, theme-independent).
				{:else}
					Using <code>colorMap</code>: yoga → <span style="color: #818cf8">#818cf8</span>, wellness → <span style="color: #34d399">#34d399</span>
				{/if}
			</p>
			<Calendar
				adapter={activeColorAdapter}
				{views}
				defaultView="week-grid"
				theme={themeValue}
				height={680}
				{readOnly}
				{mondayStart}
				{visibleHours}
				oneventclick={handleClick}
				oneventcreate={handleCreate}
			/>
		{/if}
	</section>

	<!-- ─── Feature summary ─────────────────────────── -->
	<section class="features">
		<h2>New features in this build</h2>
		<div class="feature-grid">
			<div class="feature">
				<h3>🔄 Recurring Adapter</h3>
				<p>Define weekly schedules with <code>dayOfWeek</code> + time strings. No date math needed.</p>
			</div>
			<div class="feature">
				<h3>🔒 Read-Only Mode</h3>
				<p>Pass <code>readOnly</code> to disable drag, resize, and click-to-create.</p>
			</div>
			<div class="feature">
				<h3>⏰ Visible Hours</h3>
				<p><code>visibleHours={'{[6, 21]}'}</code> crops the grid to relevant hours.</p>
			</div>
			<div class="feature">
				<h3>🏷️ Subtitle & Tags</h3>
				<p><code>subtitle</code> and <code>tags</code> on events render in EventBlock automatically.</p>
			</div>
			<div class="feature">
				<h3>🎨 Color Map</h3>
				<p><code>colorMap</code> or <code>autoColor</code> on adapters — no manual color assignment.</p>
			</div>
			<div class="feature">
				<h3>📦 WeekSchedule</h3>
				<p>One import, one component. Pre-wires everything for read-only weekly display.</p>
			</div>
		</div>
	</section>
</main>

<style>
	main {
		max-width: 1120px;
		margin: 0 auto;
		padding: 40px 28px 80px;
	}

	/* Header */
	.demo-header {
		margin-bottom: 32px;
	}
	.demo-header h1 {
		font: 700 28px/1.2 'Outfit', system-ui, sans-serif;
		color: rgba(226, 232, 240, 0.95);
		margin: 0 0 6px;
	}
	.demo-sub {
		font: 400 14px/1 'Outfit', system-ui, sans-serif;
		color: rgba(148, 163, 184, 0.55);
		margin: 0;
	}

	/* Panel */
	.panel {
		background: rgba(16, 20, 28, 0.7);
		border: 1px solid rgba(148, 163, 184, 0.07);
		border-radius: 10px;
		padding: 16px 20px;
		margin-bottom: 24px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.panel-row {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		gap: 24px;
	}
	.control-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.label {
		font: 500 11px/1 'Outfit', system-ui, sans-serif;
		color: rgba(148, 163, 184, 0.6);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		display: flex;
		align-items: center;
		gap: 6px;
		cursor: pointer;
	}
	.label input[type="checkbox"] {
		accent-color: #ef4444;
	}
	.btn-group {
		display: flex;
		gap: 4px;
	}
	.btn {
		font: 500 11px/1 'Outfit', system-ui, sans-serif;
		padding: 5px 12px;
		border-radius: 6px;
		border: 1px solid rgba(148, 163, 184, 0.1);
		background: rgba(148, 163, 184, 0.04);
		color: rgba(226, 232, 240, 0.65);
		cursor: pointer;
		transition: all 0.15s;
	}
	.btn:hover {
		background: rgba(148, 163, 184, 0.08);
		color: rgba(226, 232, 240, 0.85);
	}
	.btn.active {
		background: rgba(239, 68, 68, 0.15);
		border-color: rgba(239, 68, 68, 0.3);
		color: #ef4444;
	}

	/* Range inputs */
	.range-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.range-label {
		display: flex;
		align-items: center;
		gap: 6px;
		font: 400 11px/1 'Outfit', system-ui, sans-serif;
		color: rgba(226, 232, 240, 0.7);
	}
	.range-label input[type="range"] {
		width: 90px;
		accent-color: #ef4444;
	}
	.range-sep {
		color: rgba(148, 163, 184, 0.4);
		font-size: 12px;
	}

	/* Action bar */
	.action-bar {
		font: 400 11px/1 'Outfit', system-ui, sans-serif;
		color: rgba(226, 232, 240, 0.6);
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

	/* Demo section */
	.demo-calendar {
		margin-bottom: 48px;
	}
	.demo-title {
		font: 600 18px/1 'Outfit', system-ui, sans-serif;
		color: rgba(226, 232, 240, 0.9);
		margin: 0 0 8px;
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.demo-tag {
		font: 400 10px/1 'Outfit', system-ui, sans-serif;
		color: rgba(148, 163, 184, 0.5);
		background: rgba(148, 163, 184, 0.06);
		padding: 3px 8px;
		border-radius: 4px;
	}
	.demo-desc {
		font: 400 13px/1.5 'Outfit', system-ui, sans-serif;
		color: rgba(148, 163, 184, 0.6);
		margin: 0 0 16px;
	}
	.demo-desc code {
		font: 400 12px/1 'SF Mono', ui-monospace, monospace;
		color: rgba(226, 232, 240, 0.7);
		background: rgba(148, 163, 184, 0.08);
		padding: 1px 5px;
		border-radius: 3px;
	}

	/* Features grid */
	.features {
		padding-top: 24px;
		border-top: 1px solid rgba(148, 163, 184, 0.06);
	}
	.features h2 {
		font: 600 16px/1 'Outfit', system-ui, sans-serif;
		color: rgba(226, 232, 240, 0.8);
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
		color: rgba(148, 163, 184, 0.55);
		margin: 0;
	}
	.feature code {
		font: 400 11px/1 'SF Mono', ui-monospace, monospace;
		color: rgba(226, 232, 240, 0.65);
		background: rgba(148, 163, 184, 0.08);
		padding: 1px 4px;
		border-radius: 3px;
	}
</style>
