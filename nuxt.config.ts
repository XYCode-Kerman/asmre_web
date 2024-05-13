
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['assets/css/tailwind.css'],

  app: {
    head: {
      title: 'Reborn - Atomic Student Manager',
      script: [
        {
          src: '//instant.page/5.2.0',
          type: 'module',
          integrity: 'sha384-jnZyxPjiipYXnSU0ygqeac2q7CVYMbh84q0uHVRRxEtvFPiQYbXWUorga2aqZJ0z'
        }
      ]
    }
  },

  nitro: {
    routeRules: {
      '/**': {
        ssr: true,
        prerender: true
      },
      '/api/**': {
        proxy: 'http://asmre.api.xycode.club:32357/**',
        // proxy: 'http://127.0.0.1:8000/**',
        cors: true
      }
    },

    storage: {
      redis: {
        driver: 'redis',
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
      }
    }
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"]
})