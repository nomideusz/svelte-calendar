<script lang="ts">
	import Shell from '../_components/Shell.svelte';

	let { data } = $props();
</script>

<Shell>
	{#snippet rail()}
		{#if data.toc.length > 0}
			<nav class="doc-toc" aria-label="Table of contents">
				<span class="doc-toc-title">On this page</span>
				{#each data.toc as item (item.id)}
					<a href={`#${item.id}`}>{item.label}</a>
				{/each}
			</nav>
		{/if}
	{/snippet}

	<main class="doc-content">
		{@html data.html}
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
	.doc-toc a:hover {
		color: var(--dt-text, #111);
		box-shadow: inset 0 -2px 0 var(--dt-accent, #111);
	}


	/* ─── Main content ───────────────────────────────── */
	.doc-content {
		min-width: 0;
		max-width: 76ch;
		padding: calc(40 * var(--u)) calc(40 * var(--u)) 96px calc(38 * var(--u));
		color: var(--dt-text, #111);
		line-height: 1.7;
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
		font: 400 14px/1 var(--dt-mono, ui-monospace, monospace);
		background: transparent;
		border: 1px solid var(--dt-border-day, rgba(0, 0, 0, 0.6));
		padding: 2px 5px;
		border-radius: 0;
		color: var(--dt-text, #111);
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
		font-weight: 600;
		color: var(--dt-text, #111);
	}

	/* ─── Responsive ─────────────────────────────────── */
	@media (max-width: 768px) {
		.doc-content {
			padding: 24px 0 64px;
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
