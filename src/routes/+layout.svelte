<script lang="ts">
	import { page } from '$app/state';
	import favicon from '../assets/favicon.svg';
	import paperUrl from '../../assets/plates/paper.png';
	import { themeStore, demoThemes, demoThemeNames, STORAGE_KEY } from './theme.svelte.js';
	import type { DemoThemeName } from './theme.svelte.js';

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

	// Every property a host theme sets on <html>: its --dt-* tokens, --accent
	// for the calendar's auto-probe, the colour scheme, and the page ground
	// (--page-bg, read by body below). The paper host prints on engraving
	// paper: the plate tiles under the page and, through --dt-paper, under
	// every opaque calendar surface.
	function themeProps(name: DemoThemeName): Record<string, string> {
		const dt = demoThemes[name];
		const props: Record<string, string> = {};
		for (const decl of dt.vars.split(';')) {
			const i = decl.indexOf(':');
			if (i === -1) continue;
			const prop = decl.slice(0, i).trim();
			if (prop) props[prop] = decl.slice(i + 1).trim();
		}
		props['--accent'] = dt.accent;
		props['color-scheme'] = dt.dark ? 'dark' : 'light';
		if (dt.paper) props['--dt-paper'] = `url(${paperUrl})`;
		props['--page-bg'] = dt.paper ? `url(${paperUrl}) ${dt.stageBg}` : dt.stageBg;
		return props;
	}

	// Before first paint, the same choice themeStore makes on the client (a
	// ?host= link, the stored pick, else the OS scheme), so the server-rendered
	// page never shows one host and then switches to another on hydration.
	const THEMES = Object.fromEntries(
		demoThemeNames.map((n) => [n, { s: demoThemes[n].dark ? 'dark' : 'light', p: themeProps(n) }]),
	);
	const themeScript = `<script>(function(){try{var T=${JSON.stringify(THEMES)},d=document.documentElement,n=new URLSearchParams(location.search).get('host');if(!T.hasOwnProperty(n)){try{n=localStorage.getItem(${JSON.stringify(STORAGE_KEY)})}catch(e){}}if(!T.hasOwnProperty(n))n=matchMedia('(prefers-color-scheme: dark)').matches?'slate':'light';d.dataset.theme=n;d.dataset.scheme=T[n].s;for(var k in T[n].p)d.style.setProperty(k,T[n].p[k])}catch(e){}})()<\/script>`;

	// Properties we set on <html> last time, so a theme switch can remove
	// tokens the new theme doesn't define without clobbering unrelated
	// inline styles.
	let appliedProps: string[] = [];

	$effect(() => {
		const t = themeStore.current;
		const root = document.documentElement;
		root.dataset.theme = t;
		root.dataset.scheme = demoThemes[t].dark ? 'dark' : 'light';
		const next = themeProps(t);
		for (const prop of appliedProps) {
			if (!(prop in next)) root.style.removeProperty(prop);
		}
		for (const [prop, value] of Object.entries(next)) {
			root.style.setProperty(prop, value);
		}
		appliedProps = Object.keys(next);
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
	{@html themeScript}
	{#if path === '/'}
		{@html jsonLdTag}
	{/if}
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Encode+Sans:wdth,wght@75..125,100..900&family=JetBrains+Mono:wght@400;500&family=Newsreader:opsz,wght@6..72,400..600&family=Source+Sans+3:wght@400..600&display=swap" rel="stylesheet" />
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
		background: var(--page-bg, #efebe9);
		color: var(--dt-text, #0f0f0f);
		/* The host's face: Encode Sans, or the one a host theme sets on <html>.
		   No crossfade on the ground: `auto` probes the page as it switches. */
		font-family: var(--dt-sans);
		font-variant-numeric: tabular-nums;
		-webkit-font-smoothing: antialiased;
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
		scrollbar-color: var(--dt-scrollbar, rgba(15, 15, 15, 0.18)) transparent;
	}
	:global(:focus-visible) {
		outline-color: var(--dt-text, #111);
	}
</style>
