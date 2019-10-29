const path = require("path");

const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

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
            test: /\.webmanifest$/,
            use: [
              {
                loader: "file-loader",
              },
            ],
          },
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
            use: ["style-loader", "css-loader", "sass-loader"],
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ IS_BROWSER: true }),
    new CopyPlugin([{ from: "public/*", flatten: true }]),
    new HtmlWebPackPlugin({ template: "./src/index.html" }),
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
};
