<script lang="ts">
	import Shell from '../_components/Shell.svelte';

	let { data } = $props();

	// The section being read: the last h2 above the top fifth of the screen.
	let active = $state('');
	function track() {
		let id = '';
		for (const h of document.querySelectorAll<HTMLElement>('.doc-content h2[id]')) {
			if (h.getBoundingClientRect().top > innerHeight / 5) break;
			id = h.id;
		}
		active = id;
	}
	// Keep the current entry in view when the rail's list is taller than the screen.
	$effect(() => {
		if (active) document.querySelector(`.doc-toc a[href="#${active}"]`)?.scrollIntoView({ block: 'nearest' });
	});

	// Copy keys on every code block (rendered into the markdown by the server).
	function copyKeys(node: HTMLElement) {
		async function onclick(e: MouseEvent) {
			const key = (e.target as HTMLElement).closest<HTMLButtonElement>('.doc-copy');
			if (!key) return;
			try {
				await navigator.clipboard.writeText(key.nextElementSibling?.textContent ?? '');
				key.textContent = 'Copied';
			} catch {
				key.textContent = 'Select it';
			}
			setTimeout(() => (key.textContent = 'Copy'), 1600);
		}
		node.addEventListener('click', onclick);
		return () => node.removeEventListener('click', onclick);
	}
</script>

<svelte:window onscroll={track} />

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

	<main class="doc-content" id="content" tabindex="-1" {@attach copyKeys}>
		{@html data.head}
		<details class="doc-toc doc-toc--top">
			<summary>On this page</summary>
			{@render contents()}
		</details>
		{@html data.body}
	</main>
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
	.doc-toc--top summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 44px;
		padding: 0 16px;
		font: 500 16px / 1 var(--dt-sans, system-ui, sans-serif);
		cursor: pointer;
		list-style: none;
	}
	.doc-toc--top summary::-webkit-details-marker {
		display: none;
	}
	.doc-toc--top summary::after {
		content: '';
		width: 16px;
		height: 16px;
		background: currentColor;
		mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4' fill='none' stroke='black' stroke-width='1.4' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat;
		transition: transform 140ms;
	}
	.doc-toc--top[open] summary::after {
		transform: rotate(180deg);
	}
	.doc-toc--top[open] summary {
		border-bottom: 1px solid var(--dt-border-day, rgba(0, 0, 0, 0.3));
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
		max-width: 76ch;
		padding: calc(40 * var(--u)) calc(40 * var(--u)) 96px calc(38 * var(--u));
		color: var(--dt-text, #111);
		line-height: 1.55;
	}
	.doc-content:focus {
		outline: none;
	}
	/* Prose at a reading measure; code and tables keep the column's width. */
	.doc-content :global(:is(p, ul, ol, blockquote)) {
		max-width: 35em;
	}
	.doc-content :global(h2) {
		scroll-margin-top: 24px;
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
	}

	.doc-content :global(code) {
		font: 400 0.875em/1 var(--dt-mono, ui-monospace, monospace);
		background: color-mix(in srgb, var(--dt-text, #111) 7%, transparent);
		padding: 0.1em 0.3em;
		border-radius: 2px;
		color: var(--dt-text, #111);
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
	@media (pointer: coarse) {
		.doc-content :global(.doc-copy) {
			min-height: 44px;
			min-width: 44px;
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

	.doc-content :global(td code) {
		font-size: 13px;
		white-space: nowrap;
	}

	.doc-content :global(tr:hover td) {
		background: var(--dt-hover, rgba(0, 0, 0, 0.04));
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

	/* ── Details ── */
	.doc-content :global(details) {
		margin: 0 0 20px;
		border: 2px solid var(--dt-text, #111);
		border-radius: 0;
		overflow: hidden;
	}
	.doc-content :global(summary) {
		padding: 10px 16px;
		cursor: pointer;
		font: 500 15px/1 var(--dt-sans, system-ui, sans-serif);
		color: var(--dt-text, #111);
		background: transparent;
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
			padding: 24px 16px 64px;
		}
		.doc-content :global(h1) {
			font-size: 28px;
		}
		.doc-content :global(h2) {
			font-size: 22px;
			margin-top: 32px;
		}
		.doc-content :global(pre) {
			padding: 12px 14px;
			font-size: 13px;
		}
		/* Prevent tables from breaking layout */
		.doc-content :global(table) {
			display: block;
			overflow-x: auto;
			-webkit-overflow-scrolling: touch;
		}
		.doc-content :global(th),
		.doc-content :global(td) {
			padding: 6px 8px;
			white-space: nowrap;
		}
		.doc-content :global(details > table) {
			margin: 8px 12px;
			width: calc(100% - 24px);
		}
	}
</style>
