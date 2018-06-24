let webpack = require('webpack');
let HtmlwebpackPlugin  = require('html-webpack-plugin');
let ExtractTextPlugin  = require('extract-text-webpack-plugin');
let merge = require('webpack-merge');
let webpackBaseConfig = require('./webpack.config');

webpackBaseConfig.plugins = [];

module.exports = merge(webpackBaseConfig,{
  output:{
    publicPath: '/dist/',
    //将入口文件重命名为带有20位hash值的唯一文件
    filename: '[name].[hash].js'
  },
  plugins: [
    new ExtractTextPlugin({
      //提取css,并重命名为带有20位hash值得唯一文件
      filename: '[name].[hash].css',
      allChunks: true
    }),
    //定义当前node环境为生产环境
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new HtmlwebpackPlugin({
      filename: '../index_prod.html',
      template: './index.ejs',
      inject: false
    })
  ]
})