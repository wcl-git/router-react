const path = require('path')
const webpack = require('webpack')
const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const WebpackDevServer = require('webpack-dev-server')
const Dashboard = require('webpack-dashboard')
const DashboardPlugin = require('webpack-dashboard/plugin')
const dashboard = new Dashboard()
const ExtractTextPlugin = require('extract-text-webpack-plugin') // css单独打包
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成html

const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.resolve(ROOT_PATH, 'src') // __dirname 中的src目录，以此类推
const APP_FILE = path.resolve(APP_PATH, 'app') // 根目录文件app.jsx地址
const BUILD_PATH = path.resolve(ROOT_PATH, '/pxq/dist') // 发布文件所存放的目录

let config = {
  devtool: 'cheap-module-eval-source-map', //
  entry: {
    app: APP_FILE
  },
  output: {
    publicPath: '/', // 编译好的文件，在服务器的路径,这是静态资源引用路径
    path: BUILD_PATH, // 编译到当前目录
    filename: '[name].js', // 编译后的文件名字
    chunkFilename: '[name].[chunkhash:5].min.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /^node_modules$/,
      loader: 'babel',
      include: [APP_PATH]
    }, {
      test: /\.css$/,
      exclude: /^node_modules$/,
      loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer']),
      include: [APP_PATH]
    }, {
      test: /\.less$/,
      exclude: /^node_modules$/,
      loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer', 'less']),
      include: [APP_PATH]
    }, {
      test: /\.scss$/,
      exclude: /^node_modules$/,
      loader: ExtractTextPlugin.extract('style', ['css', 'autoprefixer', 'sass']),
      include: [APP_PATH]
    }, {
      test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
      exclude: /^node_modules$/,
      loader: 'file-loader?name=[name].[ext]',
      include: [APP_PATH]
    }, {
      test: /\.(png|jpg)$/,
      exclude: /^node_modules$/,
      loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
            // 注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
      include: [APP_PATH]
    }, {
      test: /\.jsx$/,
      exclude: /^node_modules$/,
      loaders: ['jsx', 'babel'],
      include: [APP_PATH]
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development') // 定义编译环境
      }
    }),
    new HtmlWebpackPlugin({// 根据模板插入css/js等生成最终HTML
      filename: 'index.html', // 生成的html存放路径，相对于 path
      template: './src/template/index.html', // html模板路径
      hash: false
    }),
    new ExtractTextPlugin('[name].css'),
    new DashboardPlugin(dashboard.setData)
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.less', '.scss', '.css'] // 后缀名自动补全
  }
}

// webpack默认server
let server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  progress: true,
  historyApiFallback: true,
  stats: {
    colors: true
  },
  quiet: true
  // proxy
})

server.listen(5000, function () {
  console.log('正常打开5000端口')
})

// 中间件
// const app = express()
// const configObj = webpack(config)

// app.use(webpackDevMiddleware(configObj, {
//   publicPath: config.output.publicPath,
//   stats: {
//     colors: true
//   },
//   // progress: true,
//   quiet: true
// }))
// app.listen(5000, function () {
//   console.log('Listening on port 5000!')
// })

