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

	// Title and lede first, then the contents list on narrow screens, then the rest.
	const split = html.indexOf('</p>', html.indexOf('</h1>')) + 4;
	return { head: html.slice(0, split), body: html.slice(split), toc };
}
