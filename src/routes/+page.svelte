<script lang="ts">
	import {
		Calendar,
		DayGrid,
		DayTimeline,
		Agenda,
		WeekGrid,
		WeekHeatmap,
		createMemoryAdapter,
		presets,
	} from '$lib/index.js';
	import type { CalendarView, TimelineEvent } from '$lib/index.js';

	// ── Seed events: yoga & wellness classes ────────────
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	function at(dayOffset: number, h: number, m = 0): Date {
		const d = new Date(today.getTime() + dayOffset * 86_400_000);
		d.setHours(h, m, 0, 0);
		return d;
	}

	const seed: TimelineEvent[] = [
		// Today
		{ id: 's1',  title: 'Morning Flow',      start: at(0, 6, 30),  end: at(0, 7, 30),  color: '#818cf8', category: 'yoga' },
		{ id: 's2',  title: 'Breathwork',         start: at(0, 8, 0),   end: at(0, 8, 45),  color: '#34d399', category: 'wellness' },
		{ id: 's3',  title: 'Power Vinyasa',       start: at(0, 10, 0),  end: at(0, 11, 15), color: '#f472b6', category: 'yoga' },
		{ id: 's4',  title: 'Lunch Meditation',    start: at(0, 12, 30), end: at(0, 13, 0),  color: '#fbbf24', category: 'wellness' },
		{ id: 's5',  title: 'Yin Yoga',            start: at(0, 16, 0),  end: at(0, 17, 0),  color: '#a78bfa', category: 'yoga' },
		{ id: 's6',  title: 'Sound Bath',          start: at(0, 18, 30), end: at(0, 19, 30), color: '#2dd4bf', category: 'wellness' },
		// Tomorrow
		{ id: 's7',  title: 'Sunrise Salutation',  start: at(1, 6, 0),   end: at(1, 7, 0),   color: '#fb923c', category: 'yoga' },
		{ id: 's8',  title: 'Core Strength',        start: at(1, 9, 0),   end: at(1, 10, 0),  color: '#f472b6', category: 'yoga' },
		{ id: 's9',  title: 'Guided Nidra',         start: at(1, 13, 0),  end: at(1, 13, 45), color: '#818cf8', category: 'wellness' },
		{ id: 's10', title: 'Ashtanga Primary',     start: at(1, 17, 0),  end: at(1, 18, 30), color: '#ef4444', category: 'yoga' },
		// Day +2
		{ id: 's11', title: 'Hatha Basics',         start: at(2, 7, 0),   end: at(2, 8, 0),   color: '#818cf8', category: 'yoga' },
		{ id: 's12', title: 'Mobility Lab',          start: at(2, 10, 30), end: at(2, 11, 30), color: '#34d399', category: 'wellness' },
		{ id: 's13', title: 'Restorative',           start: at(2, 15, 0),  end: at(2, 16, 0),  color: '#a78bfa', category: 'yoga' },
		// Day +3
		{ id: 's14', title: 'Dynamic Flow',          start: at(3, 8, 0),   end: at(3, 9, 15),  color: '#f472b6', category: 'yoga' },
		{ id: 's15', title: 'Pranayama Workshop',     start: at(3, 11, 0),  end: at(3, 12, 0),  color: '#fbbf24', category: 'wellness' },
		{ id: 's16', title: 'Candlelight Yin',        start: at(3, 19, 0),  end: at(3, 20, 15), color: '#2dd4bf', category: 'yoga' },
		// Day +4
		{ id: 's17', title: 'Rocket Yoga',            start: at(4, 7, 30),  end: at(4, 8, 45),  color: '#ef4444', category: 'yoga' },
		{ id: 's18', title: 'Stretch & Release',       start: at(4, 12, 0),  end: at(4, 12, 45), color: '#34d399', category: 'wellness' },
		{ id: 's19', title: 'Kundalini',               start: at(4, 17, 0),  end: at(4, 18, 0),  color: '#fb923c', category: 'yoga' },
		// Day +5
		{ id: 's20', title: 'Weekend Flow',            start: at(5, 9, 0),   end: at(5, 10, 15), color: '#818cf8', category: 'yoga' },
		{ id: 's21', title: 'Meditation Circle',        start: at(5, 11, 0),  end: at(5, 11, 45), color: '#fbbf24', category: 'wellness' },
		// Day +6
		{ id: 's22', title: 'Sunday Slow Flow',         start: at(6, 10, 0),  end: at(6, 11, 0),  color: '#a78bfa', category: 'yoga' },
		{ id: 's23', title: 'Community Kirtan',          start: at(6, 17, 0),  end: at(6, 18, 30), color: '#2dd4bf', category: 'wellness' },
		// Yesterday
		{ id: 's24', title: 'Gentle Morning',           start: at(-1, 7, 0),  end: at(-1, 8, 0),  color: '#818cf8', category: 'yoga' },
		{ id: 's25', title: 'Deep Stretch',              start: at(-1, 16, 0), end: at(-1, 17, 0), color: '#34d399', category: 'wellness' },
	];

	const adapter = createMemoryAdapter(seed);

	// ── Register views: 2 day + 3 week (concept-paired) ───
	const views: CalendarView[] = [
		// Grid concept: elastic flow grid (day + week)
		{ id: 'day-grid',      label: 'Grid',    granularity: 'day',  component: DayGrid },
		{ id: 'week-grid',     label: 'Grid',    granularity: 'week', component: WeekGrid },
		// Agenda concept: unified timeline (day = rail, week = rolling)
		{ id: 'day-agenda',    label: 'Agenda',  granularity: 'day',  component: Agenda, props: { mode: 'day' } },
		{ id: 'week-agenda',   label: 'Agenda',  granularity: 'week', component: Agenda, props: { mode: 'week' } },
		// Heatmap concept: week-only density view
		{ id: 'week-heatmap',  label: 'Heatmap', granularity: 'week', component: WeekHeatmap },
	];

</script>

<svelte:head>
	<title>@svelte-calendar/core</title>
</svelte:head>

<main>
	<Calendar
		{adapter}
		{views}
		defaultView="week-grid"
		theme={presets.midnight}
		height={680}
	/>
</main>

<style>
	main {
		max-width: 1120px;
		margin: 0 auto;
		padding: 40px 28px 80px;
	}
</style>
