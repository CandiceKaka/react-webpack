const path = require('path')
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 3001,
    compress: false,    //  gzip压缩，开发环境不开启，提升热更新
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, '../public')
    },
    open: true
  },
  plugins: [
    new ReactRefreshWebpackPlugin()
  ]
})
