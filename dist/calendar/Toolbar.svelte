<!--
  Toolbar — navigation arrows + granularity toggle.

  Layout: [← →]  [spacer]  [Day | Week]
-->
<script lang="ts">
	import type { CalendarViewId, ViewState } from '../engine/view-state.svelte.js';

	interface ViewOption {
		id: CalendarViewId;
		label: string;
		granularity: 'day' | 'week';
	}

	interface Props {
		viewState: ViewState;
		/** All registered views */
		views?: ViewOption[];
		/** Locale used for labels */
		locale?: string;
	}

	let {
		viewState,
		views = [],
		locale,
	}: Props = $props();

	// Which granularities are available?
	const granularities = $derived.by(() => {
		const g = new Set(views.map((v) => v.granularity));
		return (['day', 'week'] as const).filter((key) => g.has(key));
	});

	const previousLabel = $derived(
		viewState.granularity === 'day' ? 'Previous day' : 'Previous week',
	);
	const nextLabel = $derived(
		viewState.granularity === 'day' ? 'Next day' : 'Next week',
	);
</script>

<nav class="tb" aria-label="Calendar navigation">
	<div class="tb-spacer"></div>

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

	.tb-spacer {
		flex: 1;
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

	.tb-seg:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--dt-accent, #ef4444) 55%, transparent);
		outline-offset: 2px;
	}
</style>
