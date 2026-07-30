import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		// *.test.svelte.ts files get rune compilation from the svelte plugin
		include: ['src/**/*.{test,spec}.{js,ts}', 'src/**/*.{test,spec}.svelte.{js,ts}'],
	},
	// Use the client-side svelte runtime in tests — the SSR build stubs out
	// $effect.root (its callback never runs), breaking rune-based tests.
	resolve: process.env.VITEST ? { conditions: ['browser'] } : undefined,
});
