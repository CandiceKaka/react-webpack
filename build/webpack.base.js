const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { webpack } = require('webpack')
const isDev = process.env.NODE_ENV === 'development'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')
module.exports = {
  entry: path.join(__dirname, '../src/main.js'),

  output: {
    // filename: '/static/js/[name].[chunkhash:8].js',   //  每个输出的js名称
    filename: '[name].js',   //  每个输出的js名称
    path: path.join(__dirname, '../dist'),
    // library: {
    //   type: 'commonjs-static'
    // },
    clean: true,
    publicPath: '/'
  },
  
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, '../src')],
        test: /.(jsx|js)$/,
        use:['babel-loader']
      },
      {
        test: /.css$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
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
        test: /.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8].[ext]'
        }
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8].[ext]'
        }
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
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
    extensions: ['.js', '.tsx', '.ts', '.jsx'],
    modules: [path.resolve(__dirname, '../node_modules')]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true
    })

  ],

  cache: {
    type: 'filesystem'
  }



}