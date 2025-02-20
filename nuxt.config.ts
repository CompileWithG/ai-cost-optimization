// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  plugins: [
    '~/plugins/pinia.js'
  ],
  pinia: {
    autoImports: [
      'defineStore',
      'acceptHMRUpdate'
    ],
  },
  imports: {
    autoImport: true
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  nitro: {
    externals: {
      inline: ['mongoose', 'mongodb']
    }
  },
})

