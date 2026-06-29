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
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [
		svelte(),
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
