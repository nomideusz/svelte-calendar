<!--
  Toolbar — navigation + granularity toggle + concept switcher.

  Layout: [← →]  date-label  [Day | Week]  [concept pills]  [links]
-->
<script lang="ts">
	import type { CalendarViewId, ViewState } from '../engine/view-state.svelte.js';
	import { fmtWeekRange } from '../core/locale.js';

	interface ViewOption {
		id: CalendarViewId;
		label: string;
		granularity: 'day' | 'week';
	}

	interface Props {
		viewState: ViewState;
		/** All registered views */
		views?: ViewOption[];
		/** Show concept switch pills (Planner/Agenda) */
		showConceptSwitch?: boolean;
		/** Links to show in the toolbar */
		links?: { href: string; label: string }[];
		/** Locale used for labels */
		locale?: string;
	}

	let {
		viewState,
		views = [],
		showConceptSwitch = true,
		links = [],
		locale,
	}: Props = $props();

	const dateLabel = $derived.by(() => {
		if (viewState.granularity === 'day') {
			return viewState.focusDate.toLocaleDateString(locale, {
				weekday: 'long',
				month: 'short',
				day: 'numeric',
			});
		}
		const ws = viewState.range.start.getTime();
		return fmtWeekRange(ws, locale);
	});

	// Which granularities are available?
	const granularities = $derived.by(() => {
		const g = new Set(views.map((v) => v.granularity));
		return (['day', 'week'] as const).filter((key) => g.has(key));
	});

	// Concepts available for current granularity
	const concepts = $derived.by(() =>
		views.filter((v) => v.granularity === viewState.granularity),
	);
	const previousLabel = $derived(
		viewState.granularity === 'day' ? 'Previous day' : 'Previous week',
	);
	const nextLabel = $derived(
		viewState.granularity === 'day' ? 'Next day' : 'Next week',
	);
</script>

<nav class="tb" aria-label="Calendar navigation">
	<!-- Nav: ← → -->
	<div class="tb-nav">
		<button class="tb-btn" onclick={() => viewState.prev()} aria-label={previousLabel}>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
				<path d="M10 3L5 8L10 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
		<button class="tb-btn" onclick={() => viewState.next()} aria-label={nextLabel}>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
				<path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
	</div>

	<!-- Date label -->
	<span class="tb-label">{dateLabel}</span>

	<!-- Granularity toggle: Day / Week -->
	{#if granularities.length > 1}
		<div class="tb-group" role="group" aria-label="Granularity">
			{#each granularities as g}
				<button
					class="tb-seg"
					class:tb-seg-active={viewState.granularity === g}
					aria-pressed={viewState.granularity === g}
					onclick={() => {
						// Preserve concept: find the view in target granularity with same label
						const currentLabel = views.find((v) => v.id === viewState.view)?.label;
						const match = views.find((v) => v.granularity === g && v.label === currentLabel);
						const fallback = views.find((v) => v.granularity === g);
						const target = match ?? fallback;
						if (target) viewState.setView(target.id);
					}}
				>
					{g === 'day' ? 'Day' : 'Week'}
				</button>
			{/each}
		</div>
	{/if}

	<!-- Concept pills -->
	{#if showConceptSwitch && concepts.length > 1}
		<div class="tb-concepts" role="group" aria-label="View concept">
			{#each concepts as c}
				<button
					class="tb-pill"
					class:tb-pill-active={viewState.view === c.id}
					aria-pressed={viewState.view === c.id}
					onclick={() => viewState.setView(c.id)}
				>
					{c.label}
				</button>
			{/each}
		</div>
	{/if}

	<!-- Links -->
	{#if links.length > 0}
		<div class="tb-links">
			{#each links as link}
				<a class="tb-link" href={link.href}>{link.label}</a>
			{/each}
		</div>
	{/if}
</nav>

<style>
	.tb {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 12px;
		background: var(--dt-surface, #10141c);
		border-bottom: 1px solid var(--dt-border, rgba(148, 163, 184, 0.07));
		border-radius: 10px 10px 0 0;
		flex-wrap: wrap;
	}

	.tb-nav {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.tb-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background: transparent;
		color: var(--dt-text-2, rgba(148, 163, 184, 0.55));
		cursor: pointer;
		padding: 8px 10px;
		min-height: 40px;
		border-radius: 6px;
		font: 500 11px / 1 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		transition: background 100ms, color 100ms;
	}
	.tb-btn:hover {
		background: var(--dt-accent-dim, rgba(239, 68, 68, 0.18));
		color: var(--dt-text, rgba(226, 232, 240, 0.85));
	}

	.tb-label {
		font: 500 13px / 1 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		color: var(--dt-text, rgba(226, 232, 240, 0.85));
		letter-spacing: 0.01em;
		flex: 1;
		min-width: 0;
	}

	/* ── Links ── */
	.tb-links {
		display: flex;
		gap: 6px;
	}
	.tb-link {
		font: 400 12px / 1 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		color: var(--dt-text-2, rgba(148, 163, 184, 0.55));
		border: 1px solid var(--dt-border, rgba(148, 163, 184, 0.07));
		padding: 8px 10px;
		min-height: 40px;
		border-radius: 5px;
		text-decoration: none;
		transition: color 100ms, border-color 100ms;
		display: inline-flex;
		align-items: center;
	}
	.tb-link:hover {
		color: var(--dt-text, rgba(226, 232, 240, 0.85));
		border-color: var(--dt-text-2, rgba(148, 163, 184, 0.25));
	}

	/* ── Granularity toggle ── */
	.tb-group {
		display: flex;
		gap: 2px;
		background: var(--dt-bg, #0b0e14);
		border-radius: 6px;
		padding: 2px;
	}

	.tb-seg {
		border: none;
		background: transparent;
		color: var(--dt-text-2, rgba(148, 163, 184, 0.55));
		cursor: pointer;
		font: 600 12px / 1 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		padding: 8px 12px;
		min-height: 36px;
		border-radius: 4px;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		transition: background 100ms, color 100ms;
	}
	.tb-seg:hover {
		color: var(--dt-text, rgba(226, 232, 240, 0.85));
	}
	.tb-seg-active {
		background: var(--dt-accent, #ef4444);
		color: var(--dt-btn-text, #fff);
	}

	/* ── Concept pills ── */
	.tb-concepts {
		display: flex;
		gap: 3px;
		background: var(--dt-bg, #0b0e14);
		border-radius: 6px;
		padding: 2px;
	}

	.tb-pill {
		border: none;
		background: transparent;
		color: var(--dt-text-2, rgba(148, 163, 184, 0.55));
		cursor: pointer;
		font: 400 12px / 1 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		padding: 8px 10px;
		min-height: 36px;
		border-radius: 4px;
		letter-spacing: 0.02em;
		transition: background 100ms, color 100ms;
		white-space: nowrap;
	}
	.tb-pill:hover {
		color: var(--dt-text, rgba(226, 232, 240, 0.85));
	}
	.tb-pill-active {
		background: var(--dt-surface, #10141c);
		color: var(--dt-text, rgba(226, 232, 240, 0.85));
	}

	.tb-btn:focus-visible,
	.tb-seg:focus-visible,
	.tb-pill:focus-visible,
	.tb-link:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--dt-accent, #ef4444) 55%, transparent);
		outline-offset: 2px;
	}
</style>
