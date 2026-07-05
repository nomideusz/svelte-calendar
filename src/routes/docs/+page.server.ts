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

export async function load() {
	const md = readFileSync(resolve('README.md'), 'utf-8');
	let html = await marked(md, { gfm: true });

	// Add ids to h2/h3 so the TOC and deep links work
	html = html.replace(
		/<(h[23])>([\s\S]*?)<\/\1>/gi,
		(_m, tag: string, inner: string) => `<${tag} id="${slugify(inner)}">${inner}</${tag}>`,
	);

	// Extract TOC from h2 headings
	const toc: { id: string; label: string }[] = [];
	const h2Re = /<h2[^>]*id="([^"]*)"[^>]*>(.*?)<\/h2>/gi;
	let match;
	while ((match = h2Re.exec(html)) !== null) {
		toc.push({ id: match[1], label: match[2].replace(/<[^>]+>/g, '') });
	}

	return { html, toc };
}
