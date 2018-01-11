const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const _ = require('lodash');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { dependencies } = require('./package.json');

// const VENDOR = _.without(
//   _.keys(dependencies),
//   'faker',
//   'react-stars',
//   'react-hot-loader',
//   'graphql'
// );

const VENDOR = [
  'react',
  'react-dom',
  'react-localize-redux',
  'react-redux',
  'react-router-dom',
  'redux'
];

const env = process.env.NODE_ENV || 'development';
const __DEV__ = env === 'development';
const __TEST__ = env === 'test';
const __PROD__ = env === 'production';

const port = process.env.PORT || 3000;

const config = {
  entry: __PROD__
    ? {
        bundle: './src/index.js',
        vendor: VENDOR
      }
    : {
        bundle: [
          'react-hot-loader/patch',
          './src/index.js',
          'webpack/hot/only-dev-server'
        ],
        vendor: VENDOR,
        devServerClient: `webpack-dev-server/client?http://localhost:${port}`
      },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: __PROD__ ? '[name].[chunkhash].js' : '[name].js',
    publicPath: '/'
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
        test: /\.(scss|css)$/
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
      'process.env.BROWSER': true,
      __PROD__,
      __TEST__,
      __DEV__
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
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

if (__PROD__) {
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerPort: 3332
    })
  );
}

module.exports = config;
