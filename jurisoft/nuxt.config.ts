// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		'@nuxt/image',
		'@pinia/nuxt',
		'nuxt-icons',
		'nuxt-viewport'
	],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "@/assets/scss/variables.scss";',
				},
			},
		},
	},
	image: {
		dir: 'assets/images'
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
