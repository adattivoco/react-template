const webpack = require('webpack'),
      merge = require('webpack-merge'),
      common = require('./webpack.common.config.js'),
      OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = merge(common, {
  mode: 'development',
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: [ MiniCssExtractPlugin.loader,
               { loader: 'css-loader', options: { sourceMap: true } },
               { loader: 'postcss-loader', options: { sourceMap: true, plugins: () => {return [require('autoprefixer')]} } },
               { loader: 'sass-loader', options: { sourceMap: true } } ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new MinifyPlugin({removeConsole: false, removeDebugger: false}, {comments: false}),
      new OptimizeCssAssetsPlugin({})
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({filename: "css/app/[name].[hash].min.css"})
  ]
});
