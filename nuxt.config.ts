import { Configuration } from '@nuxt/types';

const nuxtConfig: Configuration = {
  mode: 'spa',
  env: {
    FB_API_KEY: process.env.FB_API_KEY!,
    FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN!,
    FB_DATABASE_URL: process.env.FB_DATABASE_URL!,
    FB_PROJECTID: process.env.FB_PROJECTID!,
    FB_STORAGE_BUCKET: process.env.FB_STORAGE_BUCKET!,
    FB_MESSAGING_SENDER_ID: process.env.FB_MESSAGING_SENDER_ID!,
  },
  head: {
    title: process.env.npm_package_name,
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'robots', content: 'noindex, nofollow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: `${process.env.npm_package_description}`,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  loading: { color: '#FFFFFF' },
  css: ['~/assets/css/main.scss'],
  plugins: ['~/plugins/firebase'],
  modules: ['@nuxtjs/dotenv', '@nuxtjs/vuetify'],
  build: {
    extend(config, { isDev, isClient }) {
      if (!config.performance) return;
      config.performance.maxAssetSize = 1200000;
      config.performance.maxEntrypointSize = 1500000;
      if (isDev && isClient) {
        if (config.module) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(ts|js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/,
          });
        }
      }
    },
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 },
            },
          ],
        ];
      },
    },
  },
  buildModules: ['@nuxt/typescript-build'],
};

module.exports = nuxtConfig;
