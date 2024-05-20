// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['assets/css/tailwind.css'],

  app: {
    head: {
      title: 'Reborn - Atomic Student Manager'
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.BACKEND_BASE_URL || 'https://asmre.api.xycode.club/'
    }
  },

  nitro: {
    routeRules: {
      '/**': {
        ssr: true
      },
      '/contents/**': {
        isr: true,
        prerender: true,
        static: true
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

  build: {
    analyze: true
  },

  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxt/content"]
})