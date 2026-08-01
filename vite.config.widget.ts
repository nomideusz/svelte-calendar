/**
 * Vite config for building the standalone widget bundle.
 *
 * Produces a single IIFE file (widget.js) that registers <day-calendar>
 * as a custom element. No framework dependencies needed on the host page.
 *
 * Minification is intentionally disabled: this file ships inside the npm
 * tarball so jsDelivr can serve it via cdn.jsdelivr.net/npm/@nomideusz/svelte-calendar/widget/widget.js.
 * Shipping a minified IIFE triggers npm package alerts (Minified code,
 * Obfuscated code, AI-detected anomaly). Keeping it readable clears those
 * alerts and lets consumers audit what they embed.
 *
 * Usage: pnpm run build:widget
 */
import { defineConfig, type Plugin } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

/**
 * Inline the emitted CSS into widget.js.
 * Without this, the documented single-<script> embed renders unstyled —
 * lib mode always emits CSS as a separate asset the README never mentioned.
 *
 * The CSS string is assigned to `globalThis.__DAY_CALENDAR_CSS__` at the top
 * of the bundle; widget.ts reads it and injects it into each <day-calendar>
 * shadow root (adoptedStyleSheets with a <style> fallback). `:host` provides
 * the block display that a light-DOM `day-calendar{}` rule used to.
 */
function inlineCss(): Plugin {
	return {
		name: 'widget-inline-css',
		apply: 'build',
		enforce: 'post',
		generateBundle(_options, bundle) {
			let css = ':host{display:block}';
			for (const key of Object.keys(bundle)) {
				const asset = bundle[key];
				if (asset.type === 'asset' && key.endsWith('.css')) {
					css += String(asset.source);
					delete bundle[key];
				}
			}
			const entry = Object.values(bundle).find(
				(c) => c.type === 'chunk' && c.isEntry,
			);
			if (entry && entry.type === 'chunk') {
				entry.code =
					`globalThis.__DAY_CALENDAR_CSS__ = ${JSON.stringify(css)};\n` +
					entry.code;
			}
		},
	};
}

export default defineConfig({
	plugins: [
		svelte(),
		inlineCss(),
	],
	build: {
		lib: {
			entry: 'src/lib/widget/widget.ts',
			name: 'DayCalendar',
			formats: ['iife'],
			fileName: () => 'widget.js',
		},
		outDir: 'widget',
		emptyOutDir: true,
		minify: false,
		rollupOptions: {
			output: {
				inlineDynamicImports: true,
			},
		},
	},
});
