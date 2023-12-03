const { sources } = require('webpack')
const path = require('path')
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// const globAll = require('glob-all')
// const PurgeCSSPlugin = require('purgecss-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(baseConfig, {
  mode: 'production', //  生产模式，会开启tree-shaking和压缩代码以及其他优化
  plugins: [
    //  复制文件插件
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),   // 复制public下文件
          to: path.resolve(__dirname, '../dist'),   // 复制到dist目录中
          filter: source => {
            return !source.includes('index.html')   // 忽略index.html
          }
        }
      ]
    }),
    //  css单独抽离出来,方便配置缓存策略
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css'
    }),

    // new PurgeCSSPlugin({
    //   paths: globAll.sync([
    //     `${path.join(__dirname, '../src')}/**/*.jsx`,
    //     path.join(__dirname, '../public/index.html')
    //   ])
    // })

  ],
  optimization: {
    // minimizer: [
    //   // new CssMinimizerPlugin()
    // ],
    // splitChunks: {
    //   cacheGroups: {
    //     vendors: {
    //       test: /node_modules/,
    //       name: 'vendors',
    //       minChunks: 1,
    //       chunks: 'initial',
    //       minSize: 0,
    //       priority: 1
    //     },
    //     commons: {
    //       name: 'commons',
    //       minChunks: 2,
    //       chunks: 'initial',
    //       minSize: 0
    //     }
    //   }
    // }
  },

})