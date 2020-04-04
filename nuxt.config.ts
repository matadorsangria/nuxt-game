import { Configuration } from 'webpack'

const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
  ** Define the project ENV variables
  */
  env: {
    FB_API_KEY: process.env.FB_API_KEY,
    FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN,
    FB_DATABASE_URL: process.env.FB_DATABASE_URL,
    FB_PROJECTID: process.env.FB_PROJECTID,
    FB_STORAGE_BUCKET: process.env.FB_STORAGE_BUCKET,
    FB_MESSAGING_SENDER_ID: process.env.FB_MESSAGING_SENDER_ID
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },    
      { name: 'robots', content: 'noindex , nofollow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/firebase'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/vuetify'
  ],

  /*
  ** Build configuration
  */
  build: {
    extend(config: Configuration) {
      // @ts-ignore
      config.performance.maxAssetSize = 1000000;
    }
  },

  buildModules: ['@nuxt/typescript-build'],

  extends: [
    '@nuxtjs/eslint-config-typescript'
  ]
}
