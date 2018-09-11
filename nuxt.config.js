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
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.2.0/css/brands.css",
        integrity:
          "sha384-nT8r1Kzllf71iZl81CdFzObMsaLOhqBU1JD2+XoAALbdtWaXDOlWOZTR4v1ktjPE",
        crossorigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.2.0/css/fontawesome.css",
        integrity:
          "sha384-HbmWTHay9psM8qyzEKPc8odH4DsOuzdejtnr+OFtDmOcIVnhgReQ4GZBH7uwcjf6",
        crossorigin: "anonymous"
      }
    ]
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
