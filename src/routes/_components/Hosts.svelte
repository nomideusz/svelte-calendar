<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore, setTheme, demoThemes, demoThemeNames } from '../theme.svelte.js';

	interface Props {
		/** One row, the heading beside the swatches: the docs' rail foot and the phone's top row */
		compact?: boolean;
	}
	let { compact = false }: Props = $props();

	const id = $props.id();
	// The server can't know the visitor's host page: no swatch reads pressed
	// until the client knows which one the head script applied.
	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});
</script>

<!-- A host swatch is a small page: its ground, and its accent as the all-day band. -->
<div class="hosts-set" class:hosts-set--compact={compact}>
	<p class="hosts-hd"><span id="{id}-hd">Host page</span>{#if mounted}<span class="hosts-now" aria-hidden="true">{demoThemes[themeStore.current].label}</span>{/if}</p>
	<div class="hosts" role="group" aria-labelledby="{id}-hd">
		{#each demoThemeNames as name (name)}
			{@const dt = demoThemes[name]}
			<button
				class="host"
				title={dt.label}
				aria-label={dt.label}
				aria-pressed={mounted && themeStore.current === name}
				style:--sw-bg={dt.stageBg}
				style:--sw-ac={dt.accent}
				style:--sw-ink={dt.dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
				onclick={() => setTheme(name)}
			></button>
		{/each}
	</div>
</div>

<style>
	.hosts-hd {
		display: flex;
		justify-content: space-between;
		gap: calc(12 * var(--u));
		margin: 0 0 calc(16 * var(--u));
		font: 400 calc(22 * var(--u)) / 1.2 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, #111);
	}
	.hosts-now {
		color: var(--dt-text-2, rgba(15, 15, 15, 0.66));
	}
	.hosts {
		display: flex;
		justify-content: space-between;
		padding: 0 calc(4 * var(--u)) calc(28 * var(--u));
		border-bottom: 2px solid var(--dt-text, #111);
	}
	.host {
		width: calc(62 * var(--u));
		height: calc(74 * var(--u));
		padding: 0;
		border: 2px solid var(--dt-text, #111);
		border-radius: calc(5 * var(--u));
		background:
			linear-gradient(var(--sw-ac), var(--sw-ac)) 50% 22% / 80% 9% no-repeat,
			repeating-linear-gradient(0deg, transparent 0 14%, var(--sw-ink) 14% calc(14% + 1px)) 50% 100% / 80% 62% no-repeat,
			var(--sw-bg);
		cursor: pointer;
		transition: transform 120ms;
	}
	.host:hover {
		transform: translateY(-1px);
	}
	.host[aria-pressed='true'] {
		border-color: var(--dt-accent, #1d4fd7);
		box-shadow: 0 0 0 1px var(--dt-accent, #1d4fd7);
	}
	.host:focus-visible {
		outline: 2px solid var(--dt-text, #111);
		outline-offset: 2px;
	}

	/* Compact: the heading beside the swatches, no rule under them. */
	.hosts-set--compact {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 8px 16px;
	}
	.hosts-set--compact .hosts-hd {
		flex-direction: column;
		margin: 0;
		font-size: max(14px, calc(19 * var(--u)));
	}
	.hosts-set--compact .hosts {
		gap: 8px;
		padding: 0;
		border-bottom: none;
	}
	.hosts-set--compact .host {
		width: 30px;
		height: 36px;
	}

	@media (max-width: 1360px) {
		.hosts {
			padding: 0;
			border-bottom: none;
			gap: 10px;
		}
		.hosts-hd {
			justify-content: flex-start;
			margin-bottom: 10px;
			font-size: 16px;
		}
	}
	@media (max-width: 640px) {
		.host,
		.hosts-set--compact .host {
			width: 44px;
			height: 52px;
		}
	}
	@media (pointer: coarse) {
		.host,
		.hosts-set--compact .host {
			min-width: 44px;
			min-height: 52px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.host {
			transition: none;
		}
	}
</style>
