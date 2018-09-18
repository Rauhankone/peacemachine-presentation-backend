//@ts-check
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const NodemonPlugin = require('nodemon-webpack-plugin')

const webpackBar = new WebpackBar()
const nodemon = new NodemonPlugin()

/** @type webpack.Configuration */
const devConfig = {
  mode: 'development',

  devtool: 'cheap-source-map',

  //@ts-ignore
  plugins: [webpackBar, nodemon]
}

module.exports = devConfig
