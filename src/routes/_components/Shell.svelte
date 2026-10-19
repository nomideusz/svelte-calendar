<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import { themeStore, setTheme, demoThemes, demoThemeNames, boardStore } from '../theme.svelte.js';

	interface Props {
		/** Page controls that live in the rail, between the wordmark and the host swatches */
		rail?: Snippet;
		/** Page controls in the top bar, before the clock (the demo's Today / ‹ ›) */
		bar?: Snippet;
		children: Snippet;
		/** A long page (the docs): the page scrolls and the rail stays put, instead
		    of the main column holding still beside a scrolling rail. */
		long?: boolean;
	}
	let { rail, bar, children, long = false }: Props = $props();

	const INSTALL = 'pnpm add @nomideusz/svelte-calendar';
	let copied = $state<'' | 'Copied' | 'Selected'>('');
	let command: HTMLElement;
	async function copyInstall() {
		try {
			await navigator.clipboard.writeText(INSTALL);
			copied = 'Copied';
		} catch {
			// No clipboard: select the command so Ctrl/Cmd+C (or the phone's menu) copies it.
			const range = document.createRange();
			range.selectNodeContents(command);
			getSelection()?.removeAllRanges();
			getSelection()?.addRange(range);
			copied = 'Selected';
		}
		setTimeout(() => (copied = ''), 1600);
	}

	// Live clock in the zone the calendar is showing, ticking once a second.
	let now = $state<Date | null>(null);
	// The server can't know the visitor's host page: no swatch reads pressed
	// until the client knows which one the head script applied.
	let mounted = $state(false);
	onMount(() => {
		mounted = true;
		now = new Date();
		const id = setInterval(() => (now = new Date()), 1000);
		return () => clearInterval(id);
	});
	const clock = $derived.by(() => {
		if (!now) return null;
		const tz = boardStore.timezone || undefined;
		try {
			const hm = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: tz });
			const zone = tz ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
			return { hm, zone: zone.replace('_', ' ') };
		} catch {
			return null;
		}
	});

	const path = $derived(page.url.pathname);
</script>

<a class="skip" href="#content">Skip to content</a>
<div class="shell" class:shell--long={long}>
	<aside class="rail">
		<a class="mark" href="/">svelte-calendar</a>

		<div class="rail-body">
			{@render rail?.()}
		</div>

		<div class="rail-foot">
			<!-- The host pages are the demo's business; the docs keep the install line. -->
			{#if !long}
			<div class="hosts-set">
				<p class="hosts-hd"><span id="hosts-hd">Host page</span>{#if mounted}<span class="hosts-now" aria-hidden="true">{demoThemes[themeStore.current].label}</span>{/if}</p>
				<div class="hosts" role="group" aria-labelledby="hosts-hd">
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
			{/if}

			<button class="install" onclick={copyInstall} aria-label="Copy install command">
				<code bind:this={command}>{INSTALL}</code>
				<span class="install-act" aria-live="polite">{copied || 'Copy'}</span>
			</button>
		</div>
	</aside>

	<div class="main">
		<header class="bar">
			<a class="mark mark--bar" href="/">svelte-calendar</a>
			<nav class="nav" aria-label="Site">
				<a href="/" aria-current={path === '/' ? 'page' : undefined}>Demo</a>
				<a href="/docs" aria-current={path === '/docs' ? 'page' : undefined}>Docs</a>
				<a href="https://github.com/nomideusz/svelte-calendar" target="_blank" rel="noopener">GitHub</a>
			</nav>
			<div class="bar-end">
			{@render bar?.()}
			{#if !long}
			<div class="clock" aria-label="Time shown by the calendar">
				{#if clock}
					<span class="clock-hm">
						{#key clock.hm}
							<span in:fly={{ y: -8, duration: prefersReducedMotion.current ? 0 : 260 }}>{clock.hm}</span>
						{/key}
					</span>
					<span class="clock-zone">{clock.zone}</span>
				{/if}
			</div>
			{/if}
			</div>
		</header>

		{@render children()}
	</div>
</div>

<style>
	.shell {
		display: grid;
		grid-template-columns: calc(562 * var(--u)) minmax(0, 1fr);
		min-height: 100vh;
	}

	/* ── The rail: every control on the paper, one hairline on its right ── */
	.rail {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		padding: calc(34 * var(--u)) calc(40 * var(--u)) calc(32 * var(--u));
		border-right: 1px solid var(--dt-border-day, rgba(0, 0, 0, 0.3));
		box-sizing: border-box;
	}
	.mark {
		font: 600 calc(54 * var(--u)) / 1 var(--dt-sans, system-ui, sans-serif);
		font-stretch: 92%;
		letter-spacing: -0.025em;
		color: var(--dt-text, #111);
		margin-bottom: calc(36 * var(--u));
	}
	.mark--bar {
		display: none;
	}
	/* The rail is as tall as its controls: when they run past the fold the page
	   scrolls, and the calendar column stays put (sticky, one viewport tall). */
	.rail-body {
		flex: 1;
	}
	.rail-foot {
		padding-top: calc(28 * var(--u));
		margin-top: calc(28 * var(--u));
		border-top: 2px solid var(--dt-text, #111);
		display: flex;
		flex-direction: column;
		gap: calc(26 * var(--u));
	}

	/* A host swatch is a small page: its ground, and its accent as the all-day band. */
	.hosts-hd {
		display: flex;
		justify-content: space-between;
		gap: calc(12 * var(--u));
		margin: 0 0 calc(16 * var(--u));
		font: 400 calc(22 * var(--u)) / 1.2 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, #111);
	}
	.hosts-now {
		color: var(--dt-text-2, rgba(0, 0, 0, 0.6));
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

	.install {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: calc(12 * var(--u));
		min-height: calc(52 * var(--u));
		padding: 0 calc(6 * var(--u)) 0 calc(14 * var(--u));
		border: 2px solid var(--dt-text, #111);
		border-radius: calc(8 * var(--u));
		background: transparent;
		color: var(--dt-text, #111);
		cursor: pointer;
		transition: border-color 120ms;
	}
	.install:hover {
		border-color: var(--dt-text, #111);
	}
	.install:focus-visible {
		outline: 2px solid var(--dt-text, #111);
		outline-offset: 2px;
	}
	.install code {
		font: 400 calc(18 * var(--u)) / 1 var(--dt-mono, ui-monospace, monospace);
		white-space: nowrap;
	}
	.install-act {
		padding: calc(8 * var(--u)) calc(12 * var(--u));
		border: 2px solid var(--dt-text, #111);
		border-radius: calc(6 * var(--u));
		font: 500 calc(17 * var(--u)) / 1 var(--dt-sans, system-ui, sans-serif);
		text-align: center;
	}

	/* ── Main: a one-line bar, then the page ── */
	.main {
		display: flex;
		flex-direction: column;
		min-width: 0;
		height: 100vh;
		position: sticky;
		top: 0;
		align-self: start;
	}
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: calc(74 * var(--u));
		padding: 0 calc(40 * var(--u)) 0 calc(38 * var(--u));
		border-bottom: 1px solid var(--dt-border-day, rgba(0, 0, 0, 0.3));
	}
	.nav {
		display: flex;
		gap: calc(44 * var(--u));
	}
	.nav a {
		position: relative;
		padding: calc(10 * var(--u)) 0;
		font: 400 calc(24 * var(--u)) / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.6));
		transition: color 120ms;
	}
	.nav a:hover,
	.nav a[aria-current='page'] {
		color: var(--dt-text, #111);
	}
	.nav a[aria-current='page']::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 2px;
		background: var(--dt-text, #111);
	}
	.bar-end {
		display: flex;
		align-items: center;
		gap: calc(40 * var(--u));
	}
	.clock {
		display: flex;
		align-items: baseline;
		gap: calc(28 * var(--u));
	}
	.clock-hm {
		display: block;
		overflow: hidden;
		font: 400 calc(28 * var(--u)) / 1 var(--dt-sans, system-ui, sans-serif);
		font-variant-numeric: tabular-nums;
		color: var(--dt-text, #111);
	}
	.clock-hm span {
		display: block;
	}
	.clock-zone {
		font: 400 calc(24 * var(--u)) / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.6));
		white-space: nowrap;
	}

	/* Long page: the rail is the sticky column, the main column grows. */
	.shell--long .rail {
		position: sticky;
		top: 0;
		height: 100vh;
		min-height: 0;
		overflow-y: auto;
		scrollbar-width: thin;
	}
	.shell--long .main {
		position: static;
		height: auto;
	}

	.skip {
		position: absolute;
		left: 12px;
		top: -100px;
		z-index: 10;
		padding: 10px 14px;
		background: var(--dt-text, #111);
		color: var(--dt-bg, #efebe9);
		font: 500 16px / 1 var(--dt-sans, system-ui, sans-serif);
	}
	.skip:focus {
		top: 12px;
	}

	/* ── Narrow: the calendar comes first, the rail folds under it, and the
	   bar carries the wordmark so the brand is at the top of the page once. ── */
	@media (max-width: 1360px) {
		.shell {
			grid-template-columns: minmax(0, 1fr);
		}
		.rail {
			min-height: 0;
			padding: 24px 20px 20px;
			border-right: none;
			border-top: 2px solid var(--dt-text, #111);
		}
		.rail > .mark {
			display: none;
		}
		.rail-foot {
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			gap: 16px 24px;
		}
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
		.main {
			order: -1;
			position: static;
			height: auto;
		}
		.shell--long .rail {
			position: static;
			height: auto;
		}
		/* The docs' rail holds only the install line here: one rule above it, not two. */
		.shell--long .rail-foot {
			margin-top: 0;
			padding-top: 0;
			border-top: none;
		}
		.bar {
			flex-wrap: wrap;
			gap: 8px 24px;
			padding: 10px 20px;
		}
		.bar-end {
			flex-wrap: wrap;
			gap: 8px 24px;
		}
		.mark--bar {
			display: block;
			flex-basis: 100%;
			font-size: 40px;
			margin: 6px 0 2px;
		}
	}
	@media (max-width: 640px) {
		.main {
			min-height: 100vh;
		}
		.mark--bar {
			font-size: 32px;
		}
		/* Today ‹ › and the time share one row; the zone is the calendar's business here. */
		.clock-zone {
			display: none;
		}
		.host {
			width: 44px;
			height: 52px;
		}
		.install {
			width: 100%;
			box-sizing: border-box;
		}
		/* The key stays inside the frame: the command shrinks, and only on the
		   narrowest phones breaks onto a second line. */
		.install code {
			min-width: 0;
			font-size: 12px;
			line-height: 1.3;
			white-space: normal;
			overflow-wrap: anywhere;
			text-align: left;
		}
		.install-act {
			flex: none;
		}
	}

	@media (pointer: coarse) {
		.host {
			min-width: 44px;
			min-height: 52px;
		}
		.nav a,
		.install {
			min-height: 44px;
			box-sizing: border-box;
		}
		.nav a {
			display: inline-flex;
			align-items: center;
		}
		.install-act {
			padding: 10px 14px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.host {
			transition: none;
		}
	}
</style>
