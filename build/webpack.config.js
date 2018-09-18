//@ts-check
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const { TARGET_ARGV, ROOT_DIR } = require('./utils/utils')

//@ts-ignore
const tsconfigPath = new TsconfigPathsPlugin({
  configFile: path.resolve(ROOT_DIR, 'tsconfig.json')
})

//@ts-ignore
const sourcemap = new webpack.BannerPlugin({
  banner: 'require("source-map-support").install();',
  raw: true,
  entryOnly: false
})

/** @type webpack.Configuration */
const commonConfig = {
  target: 'node',

  entry: {
    main: path.resolve(ROOT_DIR, 'src/server.ts')
  },

  output: {
    path: path.resolve(ROOT_DIR, 'dist'),
    filename: '[name].server.js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  externals: [nodeExternals()],

  stats: 'minimal',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },

  plugins: [tsconfigPath, sourcemap]
}

if (TARGET_ARGV('dev')) {
  //@ts-ignore
  module.exports = merge(commonConfig, require('./webpack.dev.config'))
} else if (TARGET_ARGV('build')) {
  //@ts-ignore
  module.exports = merge(commonConfig, require('./webpack.prod.config'))
} else {
  throw new Error(
    'Either run `yarn run dev` [development] or `yarn run build` [production]'
  )
}
