const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { webpack } = require('webpack')
const isDev = process.env.NODE_ENV === 'development'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')
module.exports = {
  entry: path.join(__dirname, '../src/main.tsx'),

  output: {
    // filename: '/static/js/[name].[chunkhash:8].js',   //  每个输出的js名称
    filename: '[name].js',   //  每个输出的js名称
    path: path.join(__dirname, '../dist'),
    // library: {
    //   type: 'commonjs-static'
    // },
    clean: true,    //  webpack4需要配置clean-webpack-plugin删除dist文件， webpack5内置了
    publicPath: '/' //  打包后文件的公共前缀路径
  },
  
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, '../src')], //只解析该选项配置的模块
        test: /.(jsx|js|ts|tsx)$/,
        // 配置项options在babel.config.js中
        use:['babel-loader']
      },
      // css和less分开处理：精确的使用loader，避免使用无用的loader
      {
        test: /.css$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'  //  给css3加浏览器前缀
        ]
      },
      {
        test: /.less$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        // webpack4采用file-loader和url-loader处理图片，
        // webpack5采用自带的asset-module处理
        test: /.(png|jpg|jpeg|gif|svg)$/, //  处理图片文件
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024  //小于10kb转base64
          }
        },
        generator: {
          // 文件输出目录和命名
          filename: 'static/images/[name].[contenthash:8].[ext]'
        }
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, //匹配字体图标文件
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024  //小于10kb转base64
          }
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8].[ext]'
        }
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/,  //  匹配媒体文件
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8].[ext]'
        }
      }
    ]
  },

  resolve: {
    alias: {
      '@': path.join(__dirname, '../src')
    },
    // 引入模块不带文件后缀的时候，会在该配置数组中依次添加后缀查找文件
    //  仅配置常用高频 其他引入文件都需要带后缀，可以提升构建速度
    extensions: ['.js', '.tsx', '.ts', '.jsx'],

    // 如果用的是pnpm 就暂时不要配置这个，会有幽灵依赖的问题，访问不到很多模块
    modules: [path.resolve(__dirname, '../node_modules')] // 查找第三方模块只在本项目的node_modules中查找
  },

  plugins: [
    // webpack需要把最终构建好的静态资源都引入到一个html文件中
    new HtmlWebpackPlugin({
      // 模板为定义root节点的模板
      template: path.resolve(__dirname, '../public/index.html'),
      // 自动注入静态资源
      inject: true
    })

  ],

  cache: {
    type: 'filesystem'  // webpack5持久化存储缓存 使用文件缓存
  }



}