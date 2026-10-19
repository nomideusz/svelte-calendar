<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { Calendar, createMemoryAdapter, type TimelineEvent } from '#lib/index.js';
	import Shell from '../_components/Shell.svelte';

	let { data } = $props();

	// The Quick Start, running: the same code, two events today.
	const today = new Date();
	const at = (hour: number) => new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour);
	let events = $state<TimelineEvent[]>([
		{ id: '1', title: 'Team Sync', start: at(9), end: at(10) },
		{ id: '2', title: 'Lunch', start: at(12), end: at(13) },
	]);
	const adapter = $derived(createMemoryAdapter(events));
	function create({ start, end }: { start: Date; end: Date }) {
		events = [...events, { id: crypto.randomUUID(), title: 'New event', start, end }];
	}
	function move(event: TimelineEvent, start: Date, end: Date) {
		events = events.map((e) => (e.id === event.id ? { ...e, start, end } : e));
	}
	// The page is prerendered; "today" is the reader's, so the calendar mounts in the browser.
	let mounted = $state(false);
	onMount(() => (mounted = true));

	// The section being read: the last h2 above the top fifth of the screen.
	let active = $state('');
	function track() {
		let id = '';
		for (const h of document.querySelectorAll<HTMLElement>('.doc-content h2[id]')) {
			if (h.getBoundingClientRect().top > innerHeight / 5) break;
			id = h.id;
		}
		active = id;
		// Past the first screen, a Contents key (narrow screens: the rail list is hidden).
		jump = scrollY > innerHeight && scrollY + innerHeight < document.documentElement.scrollHeight - 64;
		up = scrollY < lastY;
		lastY = scrollY;
	}
	let jump = $state(false);
	let up = $state(false);
	let lastY = 0;
	let toc: HTMLDetailsElement;
	function openContents() {
		toc.open = true;
		toc.scrollIntoView();
		toc.querySelector('summary')?.focus({ preventScroll: true });
	}
	// Keep the current entry in view when the rail's list is taller than the screen.
	$effect(() => {
		if (active) document.querySelector(`.doc-toc a[href="#${active}"]`)?.scrollIntoView({ block: 'nearest' });
	});

	// All Props filter: hides the rows whose name and description miss the
	// query, and the groups left empty.
	let content: HTMLElement;
	let filter = $state('');
	let matches = $state(0);
	$effect(() => {
		const q = filter.trim().toLowerCase();
		let n = 0;
		for (const table of content.querySelectorAll<HTMLTableElement>('table:has(tr[id^="prop-"])')) {
			let shown = 0;
			for (const tr of table.querySelectorAll<HTMLTableRowElement>('tbody tr')) {
				const text = `${tr.cells[0]?.textContent} ${tr.cells[tr.cells.length - 1]?.textContent}`.toLowerCase();
				tr.hidden = !!q && !text.includes(q);
				if (!tr.hidden) shown++;
			}
			table.hidden = !shown;
			const h = table.previousElementSibling;
			if (h?.tagName === 'H3') (h as HTMLElement).hidden = !shown;
			n += shown;
		}
		matches = n;
	});
	// A link to a prop the filter hides clears the filter, then lands on the row.
	async function revealTarget() {
		const row = location.hash.startsWith('#prop-') && document.getElementById(location.hash.slice(1));
		if (!row || !row.hidden) return;
		filter = '';
		await tick();
		row.scrollIntoView();
	}

	// Copy keys on every code block (rendered into the markdown by the server).
	// Each key carries its own aria-label; the outcome is announced here.
	let copied = $state('');
	function copyKeys(node: HTMLElement) {
		async function onclick(e: MouseEvent) {
			const key = (e.target as HTMLElement).closest<HTMLButtonElement>('.doc-copy');
			if (!key) return;
			try {
				await navigator.clipboard.writeText(key.nextElementSibling?.textContent ?? '');
				key.textContent = 'Copied';
				copied = 'Copied';
			} catch {
				// No clipboard: select the code so Ctrl/Cmd+C (or the phone's menu) copies it.
				const range = document.createRange();
				range.selectNodeContents(key.nextElementSibling!);
				getSelection()?.removeAllRanges();
				getSelection()?.addRange(range);
				key.textContent = 'Selected';
				copied = 'Code selected. Press Ctrl+C or Cmd+C to copy.';
			}
			setTimeout(() => {
				key.textContent = 'Copy';
				copied = '';
			}, 1600);
		}
		node.addEventListener('click', onclick);
		return () => node.removeEventListener('click', onclick);
	}
</script>

<svelte:window onscroll={track} onhashchange={revealTarget} />

{#snippet contents()}
	{#each data.toc as g (g.title)}
		<div class="toc-group">
			{#if g.title}<span class="toc-group-title">{g.title}</span>{/if}
			{#each g.items as item (item.id)}
				<a href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined}>{item.label}</a>
			{/each}
		</div>
	{/each}
{/snippet}

<Shell long>
	{#snippet rail()}
		<nav class="doc-toc" aria-label="Table of contents">
			<span class="doc-toc-title">On this page</span>
			{@render contents()}
		</nav>
	{/snippet}

	<main class="doc-content" id="content" tabindex="-1" bind:this={content} {@attach copyKeys}>
		{@html data.head}
		<details class="doc-toc doc-toc--top" bind:this={toc}>
			<summary>On this page</summary>
			{@render contents()}
		</details>
		{@html data.body}
		<figure class="doc-live">
			<div class="doc-live-frame">
				{#if mounted}<Calendar {adapter} view="week-planner" oneventcreate={create} oneventmove={move} height={416} borderRadius={0} />{/if}
			</div>
			<figcaption>The code above, running: drag on empty time to add an event, drag one to move it. In a container under 768px wide it switches to the touch layout.</figcaption>
		</figure>
		{@html data.rest}
		{#if data.props}
			<div class="doc-filter">
				<label for="prop-filter">Filter props</label>
				<input
					id="prop-filter"
					type="search"
					autocomplete="off"
					spellcheck="false"
					bind:value={filter}
					onkeydown={(e) => {
						if (e.key === 'Escape') filter = '';
					}}
				/>
				<p class="doc-filter-none" role="status">{filter.trim() && !matches ? `No prop matches “${filter.trim()}”.` : ''}</p>
			</div>
			{@html data.props}
		{/if}
		<nav class="doc-end" aria-label="The demo">
			<h2><a href="/">Build your setup in the demo</a></h2>
			<p>
				Or start from one: <a href="/?setup=booking-page">Booking page</a>,
				<a href="/?setup=class-timetable">Class timetable</a>,
				<a href="/?setup=studio-timetable">Studio timetable</a>,
				<a href="/?setup=embedded-schedule">Embedded schedule</a> or
				<a href="/?setup=own-header">Own header</a>. The demo writes the markup for what you set.
			</p>
		</nav>
	</main>
	<p class="doc-sr" aria-live="polite">{copied}</p>
	<button type="button" class="doc-jump" class:doc-jump--on={jump} class:doc-jump--up={up} onclick={openContents}>Contents</button>
</Shell>

<style>
	/*
	 * The docs chrome uses the same --dt-* tokens the demo themes set on
	 * <html>, so it stays readable in all five themes (dark and light).
	 * Fallbacks match the slate defaults.
	 */

	/* ─── TOC sidebar ────────────────────────────────── */
	/* The contents list at the rail's measure: the setups' rule, then plain links. */
	.doc-toc {
		display: flex;
		flex-direction: column;
		gap: calc(4 * var(--u));
	}
	.doc-toc-title {
		font: 400 calc(24 * var(--u)) / 1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, #111);
		padding-bottom: calc(22 * var(--u));
		margin-bottom: calc(22 * var(--u));
		border-bottom: 2px solid var(--dt-text, #111);
	}
	.doc-toc a {
		font: 400 calc(21 * var(--u)) / 1.35 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text-2, rgba(0, 0, 0, 0.66));
		text-decoration: none;
		padding: calc(4 * var(--u)) 0;
		box-shadow: inset 0 -2px 0 transparent;
		transition: color 120ms, box-shadow 120ms;
		width: fit-content;
	}
	.doc-toc a:hover,
	.doc-toc a[aria-current] {
		color: var(--dt-text, #111);
		box-shadow: inset 0 -2px 0 var(--dt-accent, #111);
	}
	.toc-group {
		display: flex;
		flex-direction: column;
		gap: calc(4 * var(--u));
	}
	.toc-group + .toc-group {
		margin-top: calc(22 * var(--u));
	}
	.toc-group-title {
		margin-bottom: calc(6 * var(--u));
		font: 500 calc(17 * var(--u)) / 1 var(--dt-sans, system-ui, sans-serif);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.66));
	}

	/* The contents as a disclosure under the lede, for screens where the rail
	   folds under the page. */
	.doc-toc--top {
		display: none;
		margin: 0 0 32px;
		border: 2px solid var(--dt-text, #111);
	}
	.doc-toc--top .toc-group {
		padding: 16px 16px 0;
	}
	.doc-toc--top .toc-group:last-child {
		padding-bottom: 16px;
	}
	.doc-toc--top .toc-group + .toc-group {
		margin-top: 0;
	}
	.doc-toc--top a {
		font-size: 16px;
		padding: 6px 0;
	}
	.doc-toc--top .toc-group-title {
		font-size: 12px;
	}
	@media (max-width: 1360px) {
		.doc-toc:not(.doc-toc--top) {
			display: none;
		}
		.doc-toc--top {
			display: block;
		}
	}


	/* ─── Main content ───────────────────────────────── */
	.doc-content {
		min-width: 0;
		padding: calc(40 * var(--u)) calc(40 * var(--u)) 96px calc(38 * var(--u));
		color: var(--dt-text, #111);
		line-height: 1.55;
	}
	.doc-content:focus {
		outline: none;
	}
	/* One measure for prose, headings and code; only the tables (the props
	   reference) and the live calendar break out to the whole column. */
	.doc-content > :global(*) {
		max-width: 44rem;
	}
	.doc-content > :global(:is(table, details:has(table))) {
		max-width: 1120px;
	}
	/* The Quick Start code and the calendar running it share one wider measure. */
	.doc-content > :global(.doc-pre--live),
	.doc-content > .doc-live {
		max-width: 60rem;
	}
	.doc-content :global(:is(h2, h3, tr[id])) {
		scroll-margin-top: 24px;
	}
	.doc-content :global([hidden]) {
		display: none !important;
	}
	/* A prop reached by its link: an ink bar at its start and a wash that
	   settles after a moment. */
	.doc-content :global(tr:target td) {
		background: color-mix(in srgb, var(--dt-accent, #111) 10%, transparent);
		animation: doc-target 1.6s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.doc-content :global(tr:target td:first-child) {
		box-shadow: inset 3px 0 0 var(--dt-text, #111);
	}
	@media (prefers-reduced-motion: reduce) {
		.doc-content :global(tr:target td) {
			animation: none;
		}
	}
	@keyframes doc-target {
		from {
			background: color-mix(in srgb, var(--dt-accent, #111) 28%, transparent);
		}
	}
	/* Its group's column heads stay above it. */
	@media (min-width: 769px) {
		.doc-content :global(tr[id^='prop-']) {
			scroll-margin-top: 40px;
		}
		.doc-content :global(table:has(tr[id^='prop-']) th) {
			position: sticky;
			top: 0;
			z-index: 1;
			background: var(--dt-bg, #efebe9);
			border-bottom: none;
			box-shadow: inset 0 -2px 0 var(--dt-text, #111);
		}
	}

	/* The All Props filter. */
	.doc-filter {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px 12px;
		margin: 0 0 8px;
	}
	.doc-filter label {
		font: 500 12px / 1 var(--dt-sans, system-ui, sans-serif);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.66));
	}
	.doc-filter input {
		flex: 1 1 16rem;
		min-height: 44px;
		padding: 0 12px;
		border: 2px solid var(--dt-text, #111);
		border-radius: 0;
		background: transparent;
		color: var(--dt-text, #111);
		font: 400 16px / 1 var(--dt-sans, system-ui, sans-serif);
		caret-color: var(--dt-accent, #111);
	}
	.doc-filter input:focus-visible {
		outline: 2px solid var(--dt-text, #111);
		outline-offset: 2px;
	}
	.doc-content .doc-filter-none {
		flex-basis: 100%;
		margin: 0;
		font-size: 16px;
	}
	.doc-filter-none:empty {
		display: none;
	}
	.doc-content :global(.doc-nowrap) {
		white-space: nowrap;
	}
	.doc-sr {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	/* A # after each heading, shown on hover or focus; faint where nothing hovers. */
	.doc-content :global(.doc-anchor) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 24px;
		min-height: 24px;
		margin-left: 0.25em;
		vertical-align: middle;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.66));
		border: none;
		opacity: 0;
		transition: opacity 120ms;
	}
	.doc-content :global(:is(h2, h3):hover .doc-anchor),
	.doc-content :global(.doc-anchor:focus-visible) {
		opacity: 1;
	}
	.doc-content :global(.doc-anchor:focus-visible) {
		outline: 2px solid var(--dt-text, #111);
		outline-offset: 2px;
	}
	@media (hover: none) {
		.doc-content :global(.doc-anchor) {
			opacity: 0.45;
		}
	}
	@media (pointer: coarse) {
		.doc-content :global(.doc-anchor) {
			min-width: 44px;
			min-height: 44px;
			margin-block: -10px;
		}
	}

	/* The version this page documents, after the package name. */
	.doc-content :global(.doc-version) {
		font: 400 16px / 1 var(--dt-sans, system-ui, sans-serif);
		font-variant-numeric: tabular-nums;
		letter-spacing: 0;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.66));
		white-space: nowrap;
		vertical-align: middle;
	}
	.doc-content :global(.doc-anchor:hover) {
		color: var(--dt-text, #111);
	}

	/* The Quick Start, running. */
	.doc-live {
		margin: 0 0 28px;
	}
	.doc-live-frame {
		height: 416px;
		border: 2px solid var(--dt-text, #111);
	}
	.doc-live figcaption {
		margin-top: 8px;
		font-size: 13px;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.66));
	}

	/* Back to the contents, past the first screen, where the rail list is hidden. */
	.doc-jump {
		display: none;
	}
	@media (max-width: 1360px) {
		.doc-jump {
			display: block;
			position: fixed;
			right: 16px;
			bottom: calc(16px + env(safe-area-inset-bottom));
			min-height: 44px;
			padding: 0 16px;
			border: 2px solid var(--dt-text, #111);
			border-radius: calc(6 * var(--u));
			background: var(--dt-bg, #efebe9);
			color: var(--dt-text, #111);
			font: 500 16px / 1 var(--dt-sans, system-ui, sans-serif);
			cursor: pointer;
			visibility: hidden;
			opacity: 0;
			transition: opacity 160ms, visibility 160ms;
		}
		.doc-jump--on {
			visibility: visible;
			opacity: 1;
		}
		.doc-jump:focus-visible {
			outline: 2px solid var(--dt-text, #111);
			outline-offset: 2px;
		}
	}
	/* Where the text column has no margin beside it, the key is a bar across the
	   bottom edge instead of a box on the text (and hides at the page's end). */
	@media (max-width: 900px) {
		.doc-jump {
			left: 0;
			right: 0;
			bottom: 0;
			min-height: calc(48px + env(safe-area-inset-bottom));
			padding: 0 16px env(safe-area-inset-bottom);
			border: none;
			border-top: 2px solid var(--dt-text, #111);
			border-radius: 0;
			text-align: start;
		}
		.doc-jump:focus-visible {
			outline-offset: -4px;
		}
	}
	/* On a phone the bar comes back only when the reader scrolls up. */
	@media (max-width: 640px) {
		.doc-jump--on:not(.doc-jump--up) {
			visibility: hidden;
			opacity: 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.doc-jump,
		.doc-content :global(.doc-anchor),
		.doc-content :global(summary::after) {
			transition: none;
		}
	}

	/* ── Typography ── */
	.doc-content :global(h1) {
		font: 500 36px/1.15 var(--dt-sans, system-ui, sans-serif);
		letter-spacing: -0.015em;
		color: var(--dt-text, #111);
		margin: 0 0 10px;
	}

	.doc-content :global(h2) {
		font: 500 26px/1.25 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, #111);
		margin: 56px 0 18px;
		padding-bottom: 10px;
		border-bottom: 2px solid var(--dt-text, #111);
	}

	.doc-content :global(h3) {
		font: 500 19px/1.3 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, #111);
		margin: 36px 0 12px;
	}

	.doc-content :global(p) {
		font-size: 16px;
		line-height: 1.55;
		margin: 0 0 16px;
	}

	.doc-content :global(> p:first-of-type) {
		max-width: 36em;
		font-size: 19px;
		line-height: 1.45;
		color: var(--dt-text, #111);
		margin-bottom: 32px;
	}

	.doc-content :global(blockquote) {
		margin: 0 0 16px;
		padding: 10px 16px;
		border-left: 3px solid var(--dt-accent, #111);
		background: transparent;
		border-radius: 0;
		font-size: 15px;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.66));
	}
	.doc-content :global(blockquote p) {
		margin: 0;
	}

	/* ── Code blocks ── */
	.doc-content :global(pre) {
		background: transparent;
		border: 2px solid var(--dt-text, #111);
		border-radius: 0;
		padding: 16px 20px;
		overflow-x: auto;
		margin: 0 0 20px;
		font: 400 14px/1.55 var(--dt-mono, ui-monospace, monospace);
		color: var(--dt-text, #111);
		scrollbar-width: thin;
		scrollbar-color: var(--dt-scrollbar, rgba(148, 163, 184, 0.1)) transparent;
		font-variant-ligatures: none;
	}

	.doc-content :global(code) {
		font: 400 0.875em/1 var(--dt-mono, ui-monospace, monospace);
		background: color-mix(in srgb, var(--dt-text, #111) 7%, transparent);
		padding: 0.1em 0.3em;
		border-radius: 0;
		color: var(--dt-text, #111);
		font-variant-ligatures: none;
		/* A long call like $derived(createMemoryAdapter(events)) breaks instead of widening a phone page */
		overflow-wrap: anywhere;
		box-decoration-break: clone;
		-webkit-box-decoration-break: clone;
	}

	/* ── Copy key on each code block ── */
	.doc-content :global(.doc-pre) {
		position: relative;
	}
	/* Room for the key, so it never sits on the first line of code. */
	.doc-content :global(.doc-pre pre) {
		padding-right: 76px;
	}
	.doc-content :global(.doc-copy) {
		position: absolute;
		top: 8px;
		right: 8px;
		padding: 6px 10px;
		border: 1px solid var(--dt-border-day, rgba(0, 0, 0, 0.3));
		border-radius: 0;
		background: var(--dt-bg, #efebe9);
		color: var(--dt-text, #111);
		font: 500 13px / 1 var(--dt-sans, system-ui, sans-serif);
		cursor: pointer;
	}
	.doc-content :global(.doc-copy:hover) {
		border-color: var(--dt-text, #111);
	}
	.doc-content :global(.doc-copy:focus-visible) {
		outline: 2px solid var(--dt-text, #111);
		outline-offset: 2px;
	}
	/* Phones and touch: the key is a tab on the frame above the code, never on it. */
	@media (max-width: 640px), (pointer: coarse) {
		.doc-content :global(.doc-pre) {
			display: flex;
			flex-direction: column;
		}
		.doc-content :global(.doc-copy) {
			position: static;
			align-self: flex-end;
			min-height: 44px;
			min-width: 72px;
			border: 2px solid var(--dt-text, #111);
			border-bottom: none;
		}
		.doc-content :global(.doc-pre pre) {
			padding-right: 14px;
		}
	}

	.doc-content :global(pre code) {
		background: none;
		border: none;
		padding: 0;
		border-radius: 0;
		font-size: inherit;
		line-height: inherit;
	}

	/* ── Tables ── */
	.doc-content :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 0 0 20px;
		font-size: 15px;
	}

	.doc-content :global(th) {
		text-align: left;
		padding: 8px 12px;
		font: 500 12px/1 var(--dt-sans, system-ui, sans-serif);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.66));
		border-bottom: 2px solid var(--dt-text, #111);
	}

	.doc-content :global(td) {
		padding: 7px 12px;
		border-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.3));
		color: var(--dt-text, #111);
		vertical-align: top;
	}

	/* Names stay whole; types wrap at their spaces. */
	.doc-content :global(td code) {
		font-size: 13px;
	}
	.doc-content :global(td:first-child code) {
		white-space: nowrap;
	}

	/* The views table's quiet link to the demo. */
	.doc-content :global(a.doc-try) {
		display: block;
		width: fit-content;
		padding: 3px 0 2px;
		font-size: 13px;
		color: var(--dt-text-2, rgba(0, 0, 0, 0.66));
		border-bottom: 1px solid var(--dt-border-day, rgba(0, 0, 0, 0.6));
	}
	.doc-content :global(a.doc-try:hover) {
		color: var(--dt-text, #111);
		border-bottom-color: var(--dt-text, #111);
	}

	.doc-content :global(tr:hover td) {
		background: var(--dt-hover, rgba(0, 0, 0, 0.04));
	}
	/* The props reference's groups share one set of columns, and the
	   description keeps a reading measure (under ~60ch) at full width. */
	@media (min-width: 769px) {
		.doc-content :global(table:has(tr[id^='prop-'])) {
			table-layout: fixed;
		}
		.doc-content :global(table:has(tr[id^='prop-']) th:nth-child(1)) {
			width: 8.5rem;
		}
		.doc-content :global(table:has(tr[id^='prop-']) th:nth-child(2)) {
			width: 12rem;
		}
		.doc-content :global(table:has(tr[id^='prop-']) th:nth-child(3)) {
			width: 8rem;
		}
	}

	/* ── Lists ── */
	.doc-content :global(ul),
	.doc-content :global(ol) {
		padding-left: 20px;
		margin: 0 0 16px;
	}

	.doc-content :global(li) {
		font-size: 16px;
		line-height: 1.5;
		margin-bottom: 4px;
	}

	/* ── Links ── */
	.doc-content :global(a) {
		color: var(--dt-accent, #111);
		text-decoration: none;
		border-bottom: 1px solid var(--dt-accent, #111);
		transition: border-width 120ms;
	}
	.doc-content :global(a:hover) {
		border-bottom-width: 2px;
	}
	/* A prop named in the prose, linked to its row: ink, a quiet rule. */
	.doc-content :global(a.doc-prop) {
		color: inherit;
		border-bottom-color: var(--dt-border-day, rgba(0, 0, 0, 0.6));
	}
	.doc-content :global(a.doc-prop:hover) {
		border-bottom-color: var(--dt-accent, #111);
	}

	/* ── The way back to the demo, at the end ── */
	.doc-end {
		margin-top: 72px;
	}
	.doc-end h2 {
		margin-top: 0;
	}
	.doc-end h2 a {
		color: var(--dt-text, #111);
		border-bottom: none;
	}
	.doc-end h2 a:hover {
		color: var(--dt-accent, #111);
	}

	/* Touch: every link and key at least 44px tall. */
	@media (pointer: coarse) {
		.doc-toc a {
			display: flex;
			align-items: center;
			min-height: 44px;
			padding-block: 0;
		}
		.doc-toc a:hover,
		.doc-toc a[aria-current] {
			box-shadow: none;
			text-decoration: underline 2px var(--dt-accent, #111);
			text-underline-offset: 6px;
		}
		.doc-content :global(a.doc-try),
		.doc-content :global(td:first-child a.doc-try) {
			display: inline-flex;
			align-items: center;
			min-height: 44px;
			padding: 0;
			border-bottom: none;
			text-decoration: underline 1px var(--dt-border-day, rgba(0, 0, 0, 0.6));
			text-underline-offset: 4px;
		}
	}

	/* ── Details ── */
	.doc-content :global(details) {
		margin: 0 0 20px;
		border: 2px solid var(--dt-text, #111);
		border-radius: 0;
		overflow: hidden;
	}
	.doc-content :global(summary) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		min-height: 44px;
		padding: 0 16px;
		cursor: pointer;
		list-style: none;
		font: 500 16px/1.2 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, #111);
		background: transparent;
	}
	.doc-content :global(summary::-webkit-details-marker) {
		display: none;
	}
	/* The rail's chevron (Settings' More props), not the browser's triangle. */
	.doc-content :global(summary::after) {
		content: '';
		flex: none;
		width: 16px;
		height: 16px;
		background: currentColor;
		mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4' fill='none' stroke='black' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat;
		transition: transform 140ms;
	}
	.doc-content :global(details[open] > summary::after) {
		transform: rotate(180deg);
	}
	.doc-content :global(summary:focus-visible) {
		outline: 2px solid var(--dt-text, #111);
		outline-offset: -4px;
	}
	.doc-content :global(details[open] summary) {
		border-bottom: 1px solid var(--dt-border-day, rgba(0, 0, 0, 0.6));
	}
	.doc-content :global(details > :not(summary)) {
		padding: 0 16px;
	}
	.doc-content :global(details > table) {
		padding: 0;
		margin: 12px 16px;
		width: calc(100% - 32px);
	}

	/* ── Horizontal rule ── */
	.doc-content :global(hr) {
		border: none;
		border-top: 1px solid var(--dt-border, rgba(0, 0, 0, 0.3));
		margin: 32px 0;
	}

	/* ── Strong / em ── */
	.doc-content :global(strong) {
		font-weight: 500;
		color: var(--dt-text, #111);
	}

	/* ─── Responsive ─────────────────────────────────── */
	@media (max-width: 768px) {
		.doc-content {
			padding: 24px 16px 96px;
		}
		.doc-content :global(h2) {
			margin-top: 40px;
		}
		.doc-content :global(pre) {
			padding: 12px 14px;
			font-size: 13px;
		}
		.doc-content :global(details > table) {
			margin: 8px 12px;
			width: calc(100% - 24px);
		}
	}
	/* Phone and small tablet: each row stacks as a definition list, the column names on the left. */
	@media (max-width: 768px) {
		.doc-content :global(:is(table, tbody, tr)) {
			display: block;
		}
		.doc-content :global(thead) {
			position: absolute;
			width: 1px;
			height: 1px;
			overflow: hidden;
			clip-path: inset(50%);
		}
		.doc-content :global(tr) {
			padding: 10px 0;
			border-bottom: 1px solid var(--dt-border, rgba(0, 0, 0, 0.3));
		}
		.doc-content > :global(table tbody tr:first-child) {
			border-top: 2px solid var(--dt-text, #111);
		}
		.doc-content :global(td) {
			display: block;
			position: relative;
			padding: 2px 0 2px 112px;
			border: none;
			overflow-wrap: anywhere;
		}
		.doc-content :global(td::before) {
			content: attr(data-label);
			position: absolute;
			left: 0;
			top: 6px;
			width: 100px;
			font: 500 12px / 1.2 var(--dt-sans, system-ui, sans-serif);
			text-transform: uppercase;
			letter-spacing: 0.06em;
			color: var(--dt-text-2, rgba(0, 0, 0, 0.66));
		}
		.doc-content :global(tr:hover td) {
			background: none;
		}
		/* The row's name heads it, unlabelled. */
		.doc-content :global(td:first-child) {
			padding-left: 0;
		}
		.doc-content :global(td:first-child::before) {
			display: none;
		}
		.doc-content :global(td:first-child code) {
			white-space: normal;
			font-weight: 500;
		}
		.doc-content :global(td:first-child a.doc-try) {
			display: inline-block;
			margin-left: 12px;
		}
	}
</style>
