export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    'nuxt-windicss',
    'nuxt-proxy',
    'nuxt-graphql-client',
  ],
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
      apiStatisticsUrl: process.env.NUXT_API_STATISTICS_URL,
    },
  },
  proxy: {
    options: [
      {
        target: process.env.NUXT_API_AUTH_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/api/auth': '/auth',
          '^/graphql/auth': '/graphql',
        },
        pathFilter: ['/api/auth/**', '/graphql/auth/**'],
      },
      {
        target: process.env.NUXT_API_STATISTICS_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/graphql/statistics': '/graphql',
        },
        pathFilter: ['/graphql/statistics/**'],
      },
    ],
  },
  'graphql-client': {
    clients: {
      auth: {
        introspectionHost: `${process.env.NUXT_API_AUTH_URL}/graphql`,
        host: `/graphql/auth`,
      },
      statistics: {
        introspectionHost: `${process.env.NUXT_API_STATISTICS_URL}/graphql`,
        host: `/graphql/statistics`,
      },
    },
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})
