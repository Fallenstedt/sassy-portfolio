const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["./app/main.ts"],
  watch: true,
  mode: "production",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "static/js")
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
    new MiniCssExtractPlugin({
      //Writes all styles to a single style.css file.

      filename: "static/css/[name].css"
    })
  ]
};

// {
//   test: /\.css$/,
//   use: [
//     {
//       loader: MiniCssExtractPlugin.loader,
//     },
//     'css-loader',
//   ],
// },
// {
//   test: [/.css$|.scss$/],
//   use: [
//     {
//       loader: "file-loader",
//       options: {
//         name: "[name].css",
//         outputPath: "../css/"
//       }
//     },
//     {
//       loader: "sass-loader",
//       options: {
//         outputStyle: "compressed"
//       }
//     }
//   ]
// }
