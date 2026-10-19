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

	// The package name breaks after its scope on a phone, and only there.
	html = html.replace('<h1>@nomideusz/svelte-calendar</h1>', '<h1>@nomideusz/<wbr><span class="doc-nowrap">svelte-calendar</span></h1>');

	// Each row of the props reference is a link target (#prop-name), and a prop
	// named in the prose of the component's own sections links to its row.
	const props = new Set<string>();
	html = html.replace(/(<h2 id="all-props">[\s\S]*?)(?=<h2 |$)/, (section) =>
		section.replace(/<tr>\n<td><code>(\w+)<\/code><\/td>/g, (_m, name: string) => {
			props.add(name);
			return `<tr id="prop-${name}">\n<td><code>${name}</code></td>`;
		}),
	);
	html = html.replace(/(<h2 id="(?:quick-start|views|mobile|callbacks|themes|events|localization-i18n|timezone-support)">[\s\S]*?)(?=<h2 )/g, (section) =>
		// Tables, code, links and headings stay as they are.
		section.replace(/<(table|pre|a|h[1-6])\b[\s\S]*?<\/\1>|<code>(\w+)<\/code>/g, (m, tag?: string, name?: string) =>
			!tag && name && props.has(name) ? `<a class="doc-prop" href="#prop-${name}"><code>${name}</code></a>` : m,
		),
	);

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

	// Every code block gets a Copy key named after its first meaningful line
	// (the page wires the clicks).
	html = html.replace(/<pre>([\s\S]*?)<\/pre>/g, (_m, code: string) => {
		const text = code
			.replace(/<[^>]+>/g, '')
			.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
		const skip = /^(<\/?script\b.*>|\/\/.*|<!--.*-->|#.*)$/;
		// A short opening line (`<Calendar`) takes the next ones with it; an import drops its source.
		let line = '';
		for (const l of text.split('\n').map((l) => l.trim().replace(/\s+/g, ' ').replace(/^(import\b.*?) from .*$/, '$1'))) {
			if (line.length >= 24) break;
			if (l && !skip.test(l)) line = line ? `${line} ${l}` : l;
		}
		if (line.length > 60) line = `${line.slice(0, 59)}…`;
		const label = `Copy code: ${line}`.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
		return `<div class="doc-pre"><button type="button" class="doc-copy" aria-label="${label}">Copy</button><pre>${code}</pre></div>`;
	});

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
