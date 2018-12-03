const Path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const createModuleAliases = require('./utils/createModuleAliases.js');
const SCSS_ROOT = Path.join(__dirname, 'client/scss/');
const CLIENT_ROOT = Path.join(__dirname, 'client/');
const CUSTOM_CLIENT_ROOT = Path.join(__dirname, 'site/custom/');

const customAliases = createModuleAliases();

module.exports = {
  target: 'web',
  entry : ['@babel/polyfill', 'whatwg-fetch', './client/build/index.js'],
  output: {
    path      : Path.join(__dirname, 'public/bundle'),
    publicPath: '/bundle/',
    filename  : 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use     : ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(png|jpg|gif|otf|ttf|svg)$/,
        use : [
          {
            loader : 'url-loader',
            options: {
              limit: 8192,
              name : '[name]-[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [
      CUSTOM_CLIENT_ROOT,
      CLIENT_ROOT,
      SCSS_ROOT,
      'node_modules',
      __dirname,
    ],
    alias     : customAliases,
    extensions: ['.js', '.jsx', '.scss'],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
  ],
};
