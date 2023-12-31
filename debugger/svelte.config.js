import adapter from 'svelte-adapter-bun';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$everyware: '../everyware'
		}
	}
};

export default config;
