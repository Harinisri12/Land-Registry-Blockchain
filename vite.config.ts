import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		'process.env': process.env
	},
	esbuild: {
		target: 'esnext'
	}
});
