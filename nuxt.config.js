module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: "alex-fallenstedt-portfolio",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Alex Fallenstedt&apos;s portfolio website"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  css: ["~/assets/css/skeleton.css", "~/assets/css/normalize.css"],

  /*
  ** Customize the progress bar color
  */
  loading: { color: "#c1533d" },
  /*
  ** Modules
  */
  modules: ["nuxt-sass-resources-loader"],
  sassResources: ["@/assets/app.variables.scss"],
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
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
