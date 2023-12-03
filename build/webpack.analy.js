const prodConfig = require('./webpack.prod.js') // 引入打包配置
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin') // 引入webpack打包速度分析插件
const smp = new SpeedMeasurePlugin()  // 实例化分析插件
const {merge} = require('webpack-merge')  // 引入合并webpack配置方法

// 引入分析打包结果插件
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

// 使用smp.wrap方法,把生产环境配置传进去,由于后面可能会加分析配置,所以先留出合并空位
module.exports = smp.wrap(merge(prodConfig, {
  plugins: [
    // 配置好后,执行npm run build:analy命令,打包完成后浏览器会自动打开窗口,可以看到打包文件的分析结果页面,可以看到各个文件所占的资源大小。
    new BundleAnalyzerPlugin() // 配置分析打包结果插件
  ]
}))