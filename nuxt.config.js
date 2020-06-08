const { generateRoutes } = require('./utils/router')

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
    { src: '~/plugins/global-mixin.js' },
    { src: "~/plugins/vue-i18n.js",  injectAs: 'i18n' },
    { src: '~/plugins/local-storage.client.js' },
    { src: '~/plugins/encrypted-storage.client.js' },
    { src: '~/plugins/devcash/devcashBounty.client.js' }
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
    "@nuxtjs/axios"
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
    extend(config, ctx) {},
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
    middleware: ['i18n'],
    extendRoutes (routes) {
      const newRoutes = generateRoutes(routes)
      routes.splice(0, routes.length)
      routes.unshift(...newRoutes)
    }
  },
};
