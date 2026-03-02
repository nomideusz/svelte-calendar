import adapterAuto from '@sveltejs/adapter-auto';
import adapterStatic from '@sveltejs/adapter-static';

const isGithubPages = process.env.DEPLOY_TARGET === 'github-pages';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: isGithubPages
			? adapterStatic({ fallback: '404.html' })
			: adapterAuto(),
		paths: {
			base: isGithubPages ? '/svelte-calendar' : ''
		}
	}
};

export default config;
