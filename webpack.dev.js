const path = require("path");

const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index-dev.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.worker\.js$/,
            use: { loader: "worker-loader" },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            },
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.scss$/,
            use: [
              "style-loader",
              "css-loader",
              {
                loader: "sass-loader",
                options: {
                  implementation: require("sass"),
                  fiber: require("fibers"),
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ IS_BROWSER: true }),
    new HtmlWebPackPlugin({ template: "./src/index.html" }),
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
};
