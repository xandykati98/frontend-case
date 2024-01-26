// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		'@nuxt/image',
		'@nuxtjs/svg-sprite',
		'@pinia/nuxt',
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
	}
})
