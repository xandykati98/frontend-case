import { resolve } from 'path';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	modules: [
		'@nuxt/image',
		'@pinia/nuxt',
		'nuxt-icons',
		'nuxt-viewport',
		'@nuxtjs/google-fonts'
	],
	googleFonts: {
		families: {
			Inter: [400, 500],
		}
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "@/assets/scss/variables.scss";',
				},
			},
		},
		resolve: {
			alias: {
				'$emoji-png': resolve('./assets/emoji.png'),
			}
		}
	},
	image: {
		provider: 'defaultProvider',
		providers: {
			defaultProvider: {
				name: 'defaultProvider', // optional value to overrider provider name
				provider: '~/providers/default-provider.ts', // Path to custom provider
				options: {
					baseURL: "/images/"
				}
			}
		}
	},
	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			// title
			title: 'Jurisoft',
			meta: [
				// description
				{ hid: 'description', name: 'description', content: 'Jurisoft - Alexandre dos Santos Pereira' },
			],
			htmlAttrs: {
			  	lang: 'pt-BR'
			}
		},
	}
})
