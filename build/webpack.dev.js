const path = require('path')
const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.base.js')


const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
module.exports = merge(baseConfig, {
  mode: 'development', // 开发模式，打包更加速度，省了优化代码步骤
  devtool: 'eval-cheap-module-source-map',  //源码调试
  devServer: {
    port: 3001,
    compress: false,    //  gzip压缩，开发环境不开启，提升热更新
    hot: true,  //内置 热更新
    historyApiFallback: true, //  解决history路由404问题
    static: {
      // 托管静态资源public文件夹
      directory: path.join(__dirname, '../public')
    },
    open: true
  },
  plugins: [
    // 该插件依赖于：react-refresh
    // 不需要刷新浏览器的前提下 模块热更新
    new ReactRefreshWebpackPlugin()
  ]
})
