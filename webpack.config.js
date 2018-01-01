const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const __DEV__ = env === 'development';
const __TEST__ = env === 'test';
const __PROD__ = env === 'production';

const port = process.env.PORT || 3000;

const config = {
  entry: __PROD__
    ? {
        bundle: './src/index.js'
      }
    : {
        bundle: [
          'react-hot-loader/patch',
          './src/index.js',
          'webpack/hot/only-dev-server'
        ],
        devServerClient: `webpack-dev-server/client?http://localhost:${port}`
      },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: __PROD__ ? '[name].[chunkhash].js' : '[name].js'
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    port,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader', 'sass-loader'],
        test: /\.scss$/
      },
      {
        loader: 'url-loader?limit=100000',
        test: /\.(png|woff|woff2|eot|ttf|svg)$/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      __PROD__,
      __TEST__,
      __DEV__
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['manifest']
    }),
    new CopyWebpackPlugin([
      // relative path is from src
      { from: './src/favicon.ico' } // <- your path to favicon
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      minify: {
        removeScriptTypeAttributes: true,
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
};

if (__DEV__) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
