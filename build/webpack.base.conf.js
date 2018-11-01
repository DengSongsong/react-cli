const path = require('path')
const chalk = require('chalk')
const os = require('os')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const utils = require('./utils')
const config = require('../config')
const isProd = process.env.NODE_ENV === 'production' ? true : false
const manifest = require(path.resolve(__dirname, '../dist/manifest.json'))

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, ''),
  entry: {
    app: path.resolve('src/index.js')
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.jsx', 'json'],
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          !isProd 
            ? { loader: 'style-loader', options: { sourceMap: true } }
            : MiniCssExtractPlugin.loader, 
            // 'css-loader', 'postcss-loader'
          'happypack/loader?id=css'
        ],
        exclude: /node_modules/,
        include: resolve('src')
      },
      {
        test: /\.less$/,
        use: [
          'css-hot-loader',
          !isProd 
            ? { loader: 'style-loader', options: { sourceMap: true } }
            : MiniCssExtractPlugin.loader, 
          // 'css-loader', 'postcss-loader', 'less-loader'
          'happypack/loader?id=less'
        ],
        exclude: /node_modules/,
        include: resolve('src')
      },
      {
        test: /\.jsx?$/,
        loader: 'happypack/loader?id=happy-babel-js',
        // loader: 'babel-loader',
        exclude: /node_modules/,
        include: resolve('src')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "async", // 控制webpack选择哪些代码块用于分割（其他类型代码块按默认方式打包）。有3个可选的值：initial、async和all。
      minSize: 30000, // 形成一个新代码块最小的体积
      maxSize: 0,
      minChunks: 1, // 在分割之前，这个代码块最小应该被引用的次数（默认配置的策略是不需要多次引用也可以被分割）
      maxAsyncRequests: 5, // 按需加载的代码块，最大数量应该小于或者等于5
      maxInitialRequests: 3, // 初始加载的代码块，最大数量应该小于或等于3
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true
        },
        vendors: {
          // 将所有来自node_modules的模块分配到一个叫vendors的缓存组
          test: /[\\/]node_modules[\\/]/,
          priority: -10 // 缓存组的优先级(priotity)是负数，因此所有自定义缓存组都可以有比它更高优先级
        },
        default: {
          minChunks: 2, // 所有重复引用至少两次的代码，会被分配到default的缓存组。
          priority: -20, // 一个模块可以被分配到多个缓存组，优化策略会将模块分配至跟高优先级别（priority）的缓存组
          reuseExistingChunk: true // 允许复用已经存在的代码块，而不是新建一个新的，需要在精确匹配到对应模块时候才会生效。
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: !isProd ? '[name].css' : 'static/css/[name].[hash:7].css'
    }),
    new webpack.DllReferencePlugin({
      manifest: manifest
    }),
    new HappyPack({
      id: 'css',
      threadPool: happyThreadPool,
      use: ['css-loader', 'postcss-loader']
    }),
    new HappyPack({
      id: 'less',
      threadPool: happyThreadPool,
      use: ['css-loader', 'postcss-loader', 'less-loader']
    }),
    new HappyPack({
      id: 'happy-babel-js',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    }),
    new ProgressBarPlugin({
      format:
        'build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    })
  ],
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}