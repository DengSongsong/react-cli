const path = require('path')
const webpack = require('webpack')
const pkg = require('../package.json')
const config = require('../config')
console.log(config.build.assetsRoot)
module.exports = {
  mode: 'production',
  context: config.build.assetsRoot,
  entry: {
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].dll.js',
    library: '_dll_[name]'
  },
  resolve: {
    alias: {}
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: config.build.assetsRoot + '/manifest.json',
      context: process.cwd()
    })
  ]
}