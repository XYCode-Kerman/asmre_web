
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
      '/api/**': {
        proxy: process.env.BACKEND_URL,
        cors: true,
      }
    }
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"]
})