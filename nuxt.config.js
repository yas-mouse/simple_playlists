import colors from 'vuetify/es5/util/colors'

const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/nuxt_pwa/'
        }
      }
    : {}
export default {
  ...routerBase,
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/localStorage.js', ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.devtool = 'inline-cheap-module-source-map'
      }
    }
  },
  manifest: {
    name: 'Simple Playlists',
    short_name: 'SP lists',
    title: 'Simple Playlists',
    description: 'シンプルなプレイリスト',
    lang: 'ja',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    scope: '/',
    icons: [
      {
        src: 'images/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: 'images/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: 'images/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png'
      },
      {
        src: 'images/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png'
      },
      {
        src: 'images/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png'
      },
      {
        src: 'images/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'images/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: 'images/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}
