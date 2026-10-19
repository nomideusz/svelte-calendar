import { readFileSync } from 'fs';
import { resolve } from 'path';
import { marked } from 'marked';

export const prerender = true;

/** GitHub-style slug for heading anchors (marked v5+ no longer emits ids). */
function slugify(inner: string): string {
	return inner
		.replace(/<[^>]+>/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
}

/** The h2 that opens each group of the contents list. */
const GROUPS: Record<string, string> = {
	installation: 'Getting started',
	events: 'Events and data',
	'localization-i18n': 'Reference',
};

export async function load() {
	const md = readFileSync(resolve('README.md'), 'utf-8');
	let html = await marked(md, { gfm: true });

	// The README also serves npm and GitHub: its badges and the link back to
	// this site mean nothing here.
	html = html
		.replace(/<p><a href="https:\/\/www\.npmjs\.com[\s\S]*?<\/p>\n?/, '')
		.replace(/<p><strong><a href="https:\/\/svelte-calendar\.xyz\/?">[\s\S]*?<\/p>\n?/, '');

	// Add ids to h2/h3 so the TOC and deep links work
	html = html.replace(
		/<(h[23])>([\s\S]*?)<\/\1>/gi,
		(_m, tag: string, inner: string) => `<${tag} id="${slugify(inner)}">${inner}</${tag}>`,
	);

	// The props reference is what readers come for: open, not folded.
	html = html.replace(/(<h2 id="all-props">[\s\S]*?)<details>/, '$1<details open>');

	// The package name breaks after its scope on a phone instead of overflowing.
	html = html.replace('<h1>@nomideusz/', '<h1>@nomideusz/<wbr>');

	// Each view in the views table links to the demo showing it.
	html = html.replace(/(<h2 id="views">[\s\S]*?)(?=<h2 )/, (section) =>
		section.replace(
			/<td><code>(week-planner|week-scroll|day-planner|week-agenda|day-agenda|month-grid)<\/code><\/td>/g,
			'<td><code>$1</code><a class="doc-try" href="/?view=$1">Try in demo</a></td>',
		),
	);

	// Every cell carries its column's name, so a phone can stack the rows.
	html = html.replace(/<table>([\s\S]*?)<\/table>/g, (_m, inner: string) => {
		const heads = [...inner.matchAll(/<th(?:\s[^>]*)?>([\s\S]*?)<\/th>/g)].map((m) => m[1].replace(/<[^>]+>/g, ''));
		const rows = inner.replace(/<tr>([\s\S]*?)<\/tr>/g, (_r, row: string) => {
			let i = 0;
			return `<tr>${row.replace(/<td(\s[^>]*)?>/g, (_t, attrs = '') => `<td${attrs} data-label="${heads[i++] ?? ''}">`)}</tr>`;
		});
		return `<table>${rows}</table>`;
	});

	// Every code block gets a Copy key (the page wires the clicks).
	html = html.replace(/<pre>/g, '<div class="doc-pre"><button type="button" class="doc-copy">Copy</button><pre>').replace(/<\/pre>/g, '</pre></div>');

	// Extract TOC from h2 headings, grouped
	const toc: { title: string; items: { id: string; label: string }[] }[] = [];
	const h2Re = /<h2[^>]*id="([^"]*)"[^>]*>(.*?)<\/h2>/gi;
	let match;
	while ((match = h2Re.exec(html)) !== null) {
		const id = match[1];
		if (GROUPS[id] || !toc.length) toc.push({ title: GROUPS[id] ?? '', items: [] });
		toc[toc.length - 1].items.push({ id, label: match[2].replace(/<[^>]+>/g, '') });
	}

	// A visible # link on every h2/h3, after the contents list has read the labels.
	html = html.replace(
		/<(h[23]) id="([^"]*)">([\s\S]*?)<\/\1>/g,
		(_m, tag: string, id: string, inner: string) =>
			`<${tag} id="${id}">${inner}<a class="doc-anchor" href="#${id}" aria-label="Link to ${inner.replace(/<[^>]+>/g, '')}">#</a></${tag}>`,
	);

	// Title and lede first, then the contents list on narrow screens, then the
	// rest, cut after the Quick Start code so the page can run it live there.
	const split = html.indexOf('</p>', html.indexOf('</h1>')) + 4;
	const q = html.indexOf('id="quick-start"');
	const qs = q < 0 ? -1 : html.indexOf('</pre></div>', q);
	const cut = qs > split ? qs + '</pre></div>'.length : html.length;
	return { head: html.slice(0, split), body: html.slice(split, cut), rest: html.slice(cut), toc };
}
