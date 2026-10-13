<script lang="ts">
	import { page } from '$app/state';
	import favicon from '../assets/favicon.svg';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { themeStore, setTheme, demoThemes, demoThemeNames, boardStore } from './theme.svelte.js';

	let { children } = $props();

	const INSTALL = 'pnpm add @nomideusz/svelte-calendar';
	let copied = $state(false);
	async function copyInstall() {
		try {
			await navigator.clipboard.writeText(INSTALL);
			copied = true;
			setTimeout(() => (copied = false), 1600);
		} catch {
			/* clipboard blocked — the command stays selectable */
		}
	}

	// Board clock: the zone the calendar is showing, ticking once a second.
	let now = $state<Date | null>(null);
	onMount(() => {
		now = new Date();
		const id = setInterval(() => (now = new Date()), 1000);
		return () => clearInterval(id);
	});
	const clock = $derived.by(() => {
		if (!now) return null;
		const tz = boardStore.timezone || undefined;
		try {
			const hm = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: tz });
			return { hm, zone: tz ? tz.split('/').pop()!.replace('_', ' ') : 'Local time' };
		} catch {
			return null;
		}
	});

	const path = $derived(page.url.pathname);

	// One place for every page's search/social metadata — there are two pages.
	const SITE = 'https://svelte-calendar.xyz';
	const DESCRIPTION =
		'A themeable Svelte 5 calendar component: week and day planners, a scrolling week, agenda and month views, drag-and-drop, recurring events and a drop-in web component.';
	const META: Record<string, { title: string; description: string }> = {
		'/': { title: 'svelte-calendar — Svelte 5 calendar component, live demo', description: DESCRIPTION },
		'/docs': {
			title: 'svelte-calendar docs — install, props, adapters, theming',
			description:
				'Reference for @nomideusz/svelte-calendar: installation, views, props, data adapters, recurring events, theming and the web-component widget.',
		},
	};
	const meta = $derived(META[path]);
	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'SoftwareSourceCode',
		name: 'svelte-calendar',
		description: DESCRIPTION,
		url: `${SITE}/`,
		codeRepository: 'https://github.com/nomideusz/svelte-calendar',
		programmingLanguage: ['Svelte', 'TypeScript'],
		runtimePlatform: 'Svelte 5',
		license: 'https://opensource.org/licenses/MIT',
	});
	const jsonLdTag = `<script type="application/ld+json">${jsonLd}<\/script>`;

	// Properties we set on <html> last time, so a theme switch can remove
	// tokens the new theme doesn't define without clobbering unrelated
	// inline styles (which the old cssText assignment did).
	let appliedProps: string[] = [];

	$effect(() => {
		const t = themeStore.current;
		const dt = demoThemes[t];
		const scheme = dt.dark ? 'dark' : 'light';
		const root = document.documentElement;
		root.dataset.theme = t;
		root.dataset.scheme = scheme;
		// Set --dt-* vars on <html> to simulate the host page's design system.
		// Also expose --accent so Calendar's auto-probe can discover the brand color.
		const next = new Map<string, string>();
		for (const decl of dt.vars.split(';')) {
			const i = decl.indexOf(':');
			if (i === -1) continue;
			const prop = decl.slice(0, i).trim();
			const value = decl.slice(i + 1).trim();
			if (prop) next.set(prop, value);
		}
		next.set('--accent', dt.accent);
		next.set('color-scheme', scheme);
		for (const prop of appliedProps) {
			if (!next.has(prop)) root.style.removeProperty(prop);
		}
		for (const [prop, value] of next) {
			root.style.setProperty(prop, value);
		}
		appliedProps = [...next.keys()];
		document.body.style.background = dt.stageBg;
	});
</script>

<svelte:head>
	{#if meta}
		<title>{meta.title}</title>
		<meta name="description" content={meta.description} />
		<link rel="canonical" href={SITE + path} />
		<meta property="og:title" content={meta.title} />
		<meta property="og:description" content={meta.description} />
		<meta property="og:url" content={SITE + path} />
	{/if}
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="svelte-calendar" />
	<meta property="og:image" content="{SITE}/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	{#if path === '/'}
		{@html jsonLdTag}
	{/if}
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

<header class="board">
	<div class="board-row">
		<a class="board-mark" href="/">svelte-calendar</a>

		<nav class="board-nav" aria-label="Site">
			<a href="/" aria-current={path === '/' ? 'page' : undefined}>Demo</a>
			<a href="/docs" aria-current={path === '/docs' ? 'page' : undefined}>Docs</a>
			<a href="https://github.com/nomideusz/svelte-calendar" target="_blank" rel="noopener">GitHub</a>
		</nav>

		<div class="board-host" role="group" aria-label="Host page">
			<span class="board-host-name">Host: {demoThemes[themeStore.current].label}</span>
			{#each demoThemeNames as name (name)}
				{@const dt = demoThemes[name]}
				<button
					class="board-swatch"
					title={dt.label}
					aria-label={'Host page: ' + dt.label}
					aria-pressed={themeStore.current === name}
					style:--sw-bg={dt.stageBg}
					style:--sw-ac={dt.accent}
					onclick={() => setTheme(name)}
				></button>
			{/each}
		</div>

		<button class="board-install" onclick={copyInstall} aria-label="Copy install command">
			<code>{INSTALL}</code>
			<span class="board-install-act" aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
		</button>

		<div class="board-clock" aria-label="Time shown by the calendar">
			{#if clock}
				<span class="board-clock-hm">
					{#key clock.hm}
						<span in:fly={{ y: -10, duration: 260 }}>{clock.hm}</span>
					{/key}
				</span>
				<span class="board-clock-zone"><span class="board-clock-dot" aria-hidden="true"></span>{clock.zone}</span>
			{/if}
		</div>
	</div>
</header>

{@render children()}

<style>
	:global(:root) {
		--board: #111111;
		--board-ink: #f5f5f3;
		--board-dim: rgba(245, 245, 243, 0.64);
		--board-rule: rgba(245, 245, 243, 0.16);
		--signal: #eb0000;
		--site-w: 1280px;
		--dt-sans: 'Archivo', system-ui, sans-serif;
		--dt-mono: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;
	}

	:global(body) {
		margin: 0;
		background: #ffffff;
		color: var(--dt-text, rgba(0, 0, 0, 0.87));
		font-family: 'Archivo', system-ui, sans-serif;
		font-variant-numeric: tabular-nums;
		-webkit-font-smoothing: antialiased;
		transition: background 300ms ease;
	}
	:global(a) {
		color: inherit;
		text-decoration: none;
	}
	:global(::selection) {
		background: var(--dt-text, #111);
		color: var(--dt-bg, #fff);
	}
	:global(html) {
		scrollbar-color: var(--dt-scrollbar, rgba(0, 0, 0, 0.2)) transparent;
	}

	/* ─── The board: black enamel, white type, red only for the live clock ─── */
	.board {
		background: var(--board);
		color: var(--board-ink);
	}
	.board-row {
		display: flex;
		align-items: center;
		gap: 28px;
		max-width: var(--site-w);
		margin: 0 auto;
		padding: 0 24px;
		min-height: 64px;
	}

	.board-mark {
		font: 800 22px/1 'Archivo', system-ui, sans-serif;
		font-stretch: 88%;
		letter-spacing: -0.02em;
		color: var(--board-ink);
	}

	.board-nav {
		display: flex;
		gap: 2px;
		margin-right: auto;
	}
	.board-nav a {
		position: relative;
		padding: 10px 10px;
		font: 600 14px/1 'Archivo', system-ui, sans-serif;
		color: var(--board-dim);
		transition: color 120ms;
	}
	.board-nav a:hover,
	.board-nav a[aria-current='page'] {
		color: var(--board-ink);
	}
	.board-nav a[aria-current='page']::after {
		content: '';
		position: absolute;
		left: 10px;
		right: 10px;
		bottom: 2px;
		height: 2px;
		background: var(--signal);
	}

	.board-host {
		display: flex;
		align-items: center;
		gap: 4px;
	}
	.board-host-name {
		margin-right: 6px;
		font: 500 12px/1 'Archivo', system-ui, sans-serif;
		color: var(--board-dim);
		white-space: nowrap;
	}
	/* A swatch is the host's ground with its accent as a corner flag. */
	.board-swatch {
		position: relative;
		width: 24px;
		height: 24px;
		padding: 0;
		border: 1px solid var(--board-rule);
		border-radius: 3px;
		background: linear-gradient(135deg, var(--sw-bg) 0 58%, var(--sw-ac) 58%);
		cursor: pointer;
		transition: transform 120ms;
	}
	.board-swatch:hover {
		transform: translateY(-1px);
	}
	.board-swatch[aria-pressed='true'] {
		outline: 2px solid var(--board-ink);
		outline-offset: 2px;
	}
	.board-swatch:focus-visible {
		outline: 2px solid var(--board-ink);
		outline-offset: 2px;
	}

	.board-install {
		display: flex;
		align-items: center;
		gap: 10px;
		height: 36px;
		padding: 0 4px 0 12px;
		border: 1px solid var(--board-rule);
		border-radius: 4px;
		background: transparent;
		color: var(--board-ink);
		cursor: pointer;
		transition: border-color 120ms;
	}
	.board-install:hover {
		border-color: var(--board-dim);
	}
	.board-install:focus-visible {
		outline: 2px solid var(--board-ink);
		outline-offset: 2px;
	}
	.board-install code {
		font: 400 12.5px/1 'JetBrains Mono', ui-monospace, monospace;
	}
	.board-install-act {
		min-width: 52px;
		padding: 6px 8px;
		border-radius: 2px;
		background: var(--board-ink);
		color: var(--board);
		font: 700 11px/1 'Archivo', system-ui, sans-serif;
		text-align: center;
	}

	.board-clock {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 3px;
		min-width: 88px;
	}
	.board-clock-hm {
		display: block;
		overflow: hidden;
		font: 800 26px/1 'Archivo', system-ui, sans-serif;
		font-stretch: 88%;
		font-variant-numeric: tabular-nums;
		letter-spacing: -0.01em;
	}
	.board-clock-hm span {
		display: block;
	}
	.board-clock-zone {
		display: flex;
		align-items: center;
		gap: 5px;
		font: 500 11px/1 'Archivo', system-ui, sans-serif;
		color: var(--board-dim);
		white-space: nowrap;
	}
	.board-clock-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--signal);
	}

	@media (max-width: 1100px) {
		.board-host-name {
			display: none;
		}
		.board-install code {
			display: none;
		}
		.board-install {
			padding: 0 4px;
		}
		.board-install-act::before {
			content: 'pnpm add · ';
		}
	}

	@media (max-width: 700px) {
		.board-row {
			flex-wrap: wrap;
			gap: 0 12px;
			padding: 10px 16px 6px;
		}
		.board-mark {
			font-size: 19px;
			margin-right: auto;
		}
		.board-clock {
			min-width: 0;
		}
		.board-clock-hm {
			font-size: 22px;
		}
		.board-nav {
			order: 3;
			margin-left: -10px;
		}
		.board-host {
			order: 4;
			margin-left: auto;
		}
		.board-install {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.board-swatch {
			transition: none;
		}
	}
</style>
