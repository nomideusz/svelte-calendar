<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>svelte-calendar – Docs</title>
</svelte:head>

<div class="doc-layout">
	{#if data.toc.length > 0}
		<aside class="doc-toc">
			<nav aria-label="Table of contents">
				<span class="doc-toc-title">On this page</span>
				{#each data.toc as item (item.id)}
					<a href={`#${item.id}`}>{item.label}</a>
				{/each}
			</nav>
		</aside>
	{/if}

	<main class="doc-content">
		{@html data.html}
	</main>
</div>

<style>
	/*
	 * The docs chrome uses the same --dt-* tokens the demo themes set on
	 * <html>, so it stays readable in all five themes (dark and light).
	 * Fallbacks match the slate defaults.
	 */
	.doc-layout {
		display: flex;
		align-items: flex-start;
		gap: 40px;
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 24px;
	}

	/* ─── TOC sidebar ────────────────────────────────── */
	.doc-toc {
		position: sticky;
		top: 24px;
		flex-shrink: 0;
		width: 190px;
		max-height: calc(100vh - 48px);
		overflow-y: auto;
		padding: 48px 0 24px;
		scrollbar-width: thin;
	}
	.doc-toc nav {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.doc-toc-title {
		font: 700 10px/1 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--dt-text-3, rgba(148, 163, 184, 0.5));
		margin-bottom: 10px;
	}
	.doc-toc a {
		font: 500 12.5px/1.4 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		color: var(--dt-text-2, rgba(148, 163, 184, 0.75));
		text-decoration: none;
		padding: 4px 8px;
		border-radius: 5px;
		border-left: 2px solid transparent;
		transition: color 120ms, background 120ms;
	}
	.doc-toc a:hover {
		color: var(--dt-text, rgba(226, 232, 240, 0.95));
		background: color-mix(in srgb, var(--dt-text-3, rgba(148, 163, 184, 0.4)) 12%, transparent);
	}

	@media (max-width: 900px) {
		.doc-toc {
			display: none;
		}
	}

	/* ─── Main content ───────────────────────────────── */
	.doc-content {
		flex: 1;
		min-width: 0;
		padding: 48px 0 96px;
		color: var(--dt-text, rgba(226, 232, 240, 0.82));
		line-height: 1.7;
	}
	.doc-content :global(h2) {
		scroll-margin-top: 24px;
	}

	/* ── Typography ── */
	.doc-content :global(h1) {
		font: 700 28px/1.2 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		color: var(--dt-text, rgba(226, 232, 240, 0.95));
		margin: 0 0 8px;
	}

	.doc-content :global(h2) {
		font: 600 20px/1.3 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		color: var(--dt-text, rgba(226, 232, 240, 0.92));
		margin: 48px 0 16px;
		padding-bottom: 8px;
		border-bottom: 1px solid var(--dt-border, rgba(148, 163, 184, 0.07));
	}

	.doc-content :global(h3) {
		font: 600 15px/1.3 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		color: var(--dt-text, rgba(226, 232, 240, 0.88));
		margin: 32px 0 12px;
	}

	.doc-content :global(p) {
		font-size: 14px;
		margin: 0 0 16px;
	}

	.doc-content :global(> p:first-of-type) {
		font-size: 15px;
		color: var(--dt-text-2, rgba(148, 163, 184, 0.7));
		margin-bottom: 32px;
	}

	.doc-content :global(blockquote) {
		margin: 0 0 16px;
		padding: 10px 16px;
		border-left: 3px solid color-mix(in srgb, var(--dt-accent, #ef4444) 40%, transparent);
		background: color-mix(in srgb, var(--dt-accent, #ef4444) 5%, transparent);
		border-radius: 0 6px 6px 0;
		font-size: 13px;
		color: var(--dt-text-2, rgba(226, 232, 240, 0.7));
	}
	.doc-content :global(blockquote p) {
		margin: 0;
	}

	/* ── Code blocks ── */
	.doc-content :global(pre) {
		background: var(--dt-surface, #0d1017);
		border: 1px solid var(--dt-border, rgba(148, 163, 184, 0.06));
		border-radius: 8px;
		padding: 16px 20px;
		overflow-x: auto;
		margin: 0 0 20px;
		font: 400 13px/1.55 var(--dt-mono, ui-monospace, 'Cascadia Code', 'Fira Code', monospace);
		color: var(--dt-text, rgba(226, 232, 240, 0.78));
		scrollbar-width: thin;
		scrollbar-color: var(--dt-scrollbar, rgba(148, 163, 184, 0.1)) transparent;
	}

	.doc-content :global(code) {
		font: 400 12.5px/1 var(--dt-mono, ui-monospace, 'Cascadia Code', 'Fira Code', monospace);
		background: color-mix(in srgb, var(--dt-text-3, rgba(148, 163, 184, 0.4)) 14%, transparent);
		padding: 2px 6px;
		border-radius: 4px;
		color: var(--dt-text, rgba(226, 232, 240, 0.85));
	}

	.doc-content :global(pre code) {
		background: none;
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
		font-size: 13px;
	}

	.doc-content :global(th) {
		text-align: left;
		padding: 8px 12px;
		font: 600 11px/1 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--dt-text-3, rgba(148, 163, 184, 0.5));
		border-bottom: 1px solid var(--dt-border-day, rgba(148, 163, 184, 0.1));
	}

	.doc-content :global(td) {
		padding: 7px 12px;
		border-bottom: 1px solid var(--dt-border, rgba(148, 163, 184, 0.05));
		color: var(--dt-text-2, rgba(226, 232, 240, 0.72));
		vertical-align: top;
	}

	.doc-content :global(td code) {
		font-size: 12px;
		color: var(--dt-accent, #ef4444);
		background: var(--dt-accent-dim, rgba(239, 68, 68, 0.08));
	}

	.doc-content :global(tr:hover td) {
		background: color-mix(in srgb, var(--dt-text-3, rgba(148, 163, 184, 0.4)) 6%, transparent);
	}

	/* ── Lists ── */
	.doc-content :global(ul),
	.doc-content :global(ol) {
		padding-left: 20px;
		margin: 0 0 16px;
	}

	.doc-content :global(li) {
		font-size: 14px;
		margin-bottom: 4px;
	}

	/* ── Links ── */
	.doc-content :global(a) {
		color: var(--dt-accent, #ef4444);
		text-decoration: none;
		border-bottom: 1px solid color-mix(in srgb, var(--dt-accent, #ef4444) 25%, transparent);
		transition: border-color 120ms;
	}
	.doc-content :global(a:hover) {
		border-color: var(--dt-accent, #ef4444);
	}

	/* ── Details ── */
	.doc-content :global(details) {
		margin: 0 0 20px;
		border: 1px solid var(--dt-border, rgba(148, 163, 184, 0.07));
		border-radius: 8px;
		overflow: hidden;
	}
	.doc-content :global(summary) {
		padding: 10px 16px;
		cursor: pointer;
		font: 500 13px/1 var(--dt-sans, 'Outfit', system-ui, sans-serif);
		color: var(--dt-text, rgba(226, 232, 240, 0.8));
		background: color-mix(in srgb, var(--dt-text-3, rgba(148, 163, 184, 0.4)) 6%, transparent);
	}
	.doc-content :global(details[open] summary) {
		border-bottom: 1px solid var(--dt-border, rgba(148, 163, 184, 0.07));
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
		border-top: 1px solid var(--dt-border, rgba(148, 163, 184, 0.07));
		margin: 32px 0;
	}

	/* ── Strong / em ── */
	.doc-content :global(strong) {
		font-weight: 600;
		color: var(--dt-text, rgba(226, 232, 240, 0.92));
	}

	/* ─── Responsive ─────────────────────────────────── */
	@media (max-width: 768px) {
		.doc-layout {
			padding: 0 16px;
		}
		.doc-content {
			padding: 24px 0 64px;
		}
		.doc-content :global(h1) {
			font-size: 22px;
		}
		.doc-content :global(h2) {
			font-size: 17px;
			margin-top: 32px;
		}
		.doc-content :global(pre) {
			padding: 12px 14px;
			font-size: 12px;
			border-radius: 6px;
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
