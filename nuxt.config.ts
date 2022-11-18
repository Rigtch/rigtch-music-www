export default defineNuxtConfig({
  modules: ['@pinia/nuxt', 'nuxt-windicss'],
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})
