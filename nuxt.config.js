module.exports = {
  plugins: [{ src: '~/plugins/vue-my-photos.js', ssr: false }],
  /*
   ** Headers of the page
   */
  head: {
    title: 'Alex Fallenstedt',
    script: [{ src: '/js/yall.min.js' }],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Alex Fallenstedt is a web developer who strives for test-driven development, translating business requirements into technical requirements, and an agile based development model. He considers these to be the primary elements for delivering quality and maintainable software with high-confidence.'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.7.1/css/brands.css',
        integrity:
          'sha384-BKw0P+CQz9xmby+uplDwp82Py8x1xtYPK3ORn/ZSoe6Dk3ETP59WCDnX+fI1XCKK',
        crossorigin: 'anonymous'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.7.1/css/fontawesome.css',
        integrity:
          'sha384-4aon80D8rXCGx9ayDt85LbyUHeMWd3UiBaWliBlJ53yzm9hqN21A+o1pqoyK04h+',
        crossorigin: 'anonymous'
      }
    ]
  },

  css: ['~/assets/css/skeleton.css', '~/assets/css/normalize.css'],

  /*
   ** Customize the progress bar color
   */
  loading: { color: '#fd3a08' },
  /*
   ** Modules
   */
  modules: ['nuxt-sass-resources-loader'],
  sassResources: ['@/assets/app.variables.scss'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  },
  generate: {
    routes: [
      '/photos/weddings',
      '/photos/nature',
      '/photos/world',
      '/photos/recent',
      '/photos/people'
    ]
  }
};
