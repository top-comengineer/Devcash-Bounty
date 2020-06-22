module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#675CFF" },
  /*
   ** Global CSS
   */
  css: ["@/assets/css/main.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/vue-qr.js', ssr: false },
    { src: '~/plugins/devcash/devcashBounty.client.js', ssr: false },
    { src: '~/plugins/crontab.js', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    "@nuxtjs/tailwindcss"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    [
      'nuxt-i18n',
      {
        strategy: "prefix_and_default",
        baseUrl: (c) => {
          if (process.server) {
            const { req } = c
            return req.protocol + '://' + req.get('host')
          }
          return window.location.protocol + "//" + window.location.host;
        },
        seo: false,
        locales: [
          {
            code: "en",
            iso: "en",
            name: "English",
            file: 'en.json'
          },
          {
            code: "zhHans",
            iso: "zh-Hans",
            name: "简化字",
            file: 'zh-Hans.json'
          }
        ],
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          alwaysRedirect: true,
          fallbackLocale: 'en'
        },
        lazy: true,
        defaultLocale: 'en',
        langDir: 'locales/',
        vueI18n: { fallbackLocale: 'en' }
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { },
    filenames: {
      app: ({ isDev }) => (isDev ? "[name].js" : "[name].[chunkhash].js"),
      chunk: ({ isDev }) => (isDev ? "[name].js" : "[name].[chunkhash].js"),
      css: ({ isDev }) => (isDev ? "[name].css" : "[name].[contenthash].css"),
      img: ({ isDev }) =>
        isDev ? "[path][name].[ext]" : "img/[name].[hash:7].[ext]",
      font: ({ isDev }) =>
        isDev ? "[path][name].[ext]" : "fonts/[name].[hash:7].[ext]",
      video: ({ isDev }) =>
        isDev ? "[path][name].[ext]" : "videos/[name].[hash:7].[ext]"
    }
  },
  router: {
    middleware: ['theme', 'devcash', 'baseurl']
  }
};
