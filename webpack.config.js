const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: ["./node_modules/regenerator-runtime/runtime.js", "./app/main.ts"],
  watch: true,
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "js/[name].[hash].js",
    path: path.resolve(__dirname, "static", "bundle")
  },
  module: {
    rules: [
      {
        // Transform es6+ js & ts into es5 js.
        test: [/.js$|.ts$/],
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/typescript"]
          }
        }
      },
      {
        // Transform scss to css, minify it, apply autoprefixer via postcss
        test: [/.css$|.scss$/],
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      //Writes all styles to a single style.css file.

      filename: "css/[name].[hash].css"
    }),
    new ManifestPlugin({
      fileName: "../../data/manifest.json",
      publicPath: "bundle/"
    })
  ]
};
