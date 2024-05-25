import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from "@vite-pwa/sveltekit";
import { defineConfig } from 'vite';

const generateSW = process.env.GENERATE_SW === 'true'

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA(
			{
				srcDir: './src',
				mode: 'development',
				// you don't need to do this if you're using generateSW strategy in your app
				strategies: generateSW ? 'generateSW' : 'injectManifest',
				// you don't need to do this if you're using generateSW strategy in your app
				filename: generateSW ? undefined : 'prompt-sw.ts',
				scope: '/',
				base: '/',
				selfDestroying: process.env.SELF_DESTROYING_SW === 'true',
				manifest: {
					short_name: 'Car Stats',
					name: 'Car Stats',
					start_url: '/',
					scope: '/',
					display: 'standalone',
					theme_color: "#ffffff",
					background_color: "#ffffff",
					icons: [
						{
							src: '/pwa-192x192.png',
							sizes: '192x192',
							type: 'image/png',
						},
						{
							src: '/pwa-512x512.png',
							sizes: '512x512',
							type: 'image/png',
						},
						{
							src: '/pwa-512x512.png',
							sizes: '512x512',
							type: 'image/png',
							purpose: 'any maskable',
						},
					],
				},
				injectManifest: {
					globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
				},
				workbox: {
					globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
				},
				devOptions: {
					enabled: true,
					suppressWarnings: process.env.SUPPRESS_WARNING === 'true',
					type: 'module',
					navigateFallback: '/',
				},
				// if you have shared info in svelte config file put in a separate module and use it also here
				kit: {
					includeVersionFile: true,
				}
			}
		)
	]
});
