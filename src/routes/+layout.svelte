<script lang="ts">
	import { page } from '$app/state';
	import favicon from '../assets/favicon.svg';
	import paperUrl from '../../assets/plates/paper.png';
	import { themeStore, demoThemes } from './theme.svelte.js';

	let { children } = $props();

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
	// inline styles.
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
		// The paper host prints on engraving paper: the plate tiles under the
		// page and, through --dt-paper, under every opaque calendar surface.
		if (dt.paper) next.set('--dt-paper', `url(${paperUrl})`);
		for (const prop of appliedProps) {
			if (!next.has(prop)) root.style.removeProperty(prop);
		}
		for (const [prop, value] of next) {
			root.style.setProperty(prop, value);
		}
		appliedProps = [...next.keys()];
		document.body.style.background = dt.paper ? `url(${paperUrl}) ${dt.stageBg}` : dt.stageBg;
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
	<link href="https://fonts.googleapis.com/css2?family=Encode+Sans:wdth,wght@75..125,100..900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
</svelte:head>

{@render children()}

<style>
	:global(:root) {
		/* One unit = 1px at the 1872px comp width, shrinking with the viewport. */
		--u: clamp(0.7px, calc(100vw / 1872), 1px);
		--dt-sans: 'Encode Sans', system-ui, sans-serif;
		--dt-mono: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;
	}

	:global(body) {
		margin: 0;
		background: #efebe9;
		color: var(--dt-text, #0f0f0f);
		font-family: 'Encode Sans', system-ui, sans-serif;
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
		color: var(--dt-bg, #efebe9);
	}
	:global(html) {
		scrollbar-color: var(--dt-scrollbar, rgba(0, 0, 0, 0.2)) transparent;
	}
	:global(:focus-visible) {
		outline-color: var(--dt-text, #111);
	}
</style>
