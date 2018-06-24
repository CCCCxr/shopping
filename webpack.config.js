let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = {
  entry: {
    main: './main'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test:/\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css:ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test:/\.css$/,
        use:ExtractTextPlugin.extract({
          use:'css-loader',
          fallback:'style-loader'
        })
      },
      {
        test:/\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=1024'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('main.css')
  ],
  output: {
    path: path.join(__dirname,'./dist'),
    publicPath: '/dist/',
    filename: 'main.js'
  }
}

module.exports = config;