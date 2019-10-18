const path = require("path");

const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const OfflinePlugin = require("offline-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./newsletter-template-builder"),
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
            include: path.resolve(__dirname, "./src"),
            use: {
              loader: "babel-loader",
              options: {
                envName: "prod",
              },
            },
          },
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
          {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({ IS_BROWSER: true }),
    new CopyPlugin([{ from: "public/*", flatten: true }]),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
    }),
    new OfflinePlugin({
      ServiceWorker: {
        appShell: "/",
        events: true,
        scope: "/newsletter-template-builder/",
        cacheName: "newsletter-template-builder",
      },
      AppCache: {
        events: true,
      },
    }),
  ],
};
