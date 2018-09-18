//@ts-check
const webpack = require('webpack')

/** @type webpack.Configuration */
const prodConfig = {
  mode: 'production',

  devtool: 'source-map'
}

module.exports = prodConfig
