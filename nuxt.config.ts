export default defineNuxtConfig({
  modules: ['@pinia/nuxt', 'nuxt-windicss', 'nuxt-proxy'],
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    public: {
      apiAuthUrl: process.env.NUXT_API_AUTH_URL,
    },
  },
  proxy: {
    options: {
      target: process.env.NUXT_API_AUTH_URL,
      changeOrigin: true,
      pathRewrite: {
        '^/api/auth': '/auth',
      },
      pathFilter: '/api/auth/**',
    },
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})
