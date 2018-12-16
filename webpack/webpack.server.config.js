const Path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const createModuleAliases = require('../utils/createModuleAliases.js');

const SCSS_ROOT = Path.resolve(__dirname, '../client/scss/');
const CLIENT_ROOT = Path.resolve(__dirname, '../client/');
const CUSTOM_CLIENT_ROOT = Path.resolve(__dirname, '../site/custom/');

const customAliases = createModuleAliases();

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
    target: 'node',
    //watch: isDev,
    externals: [nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    })],

    // Set __dirname relative to current __dirname for node
    context: Path.resolve(__dirname, '../'),
    node: {
      __dirname: true,
    },

    entry : [
      ...(isDev ? ['webpack/hot/poll?1000'] : []),
      '@babel/polyfill',
      './server.js'
    ],
    output: {
      path      : Path.resolve(__dirname, '../server/bundle'),
      //publicPath: '/bundle/',
      filename  : 'server.js',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: ExtractCssChunks.loader,
            },
            'css-loader',
            'sass-loader',
          ]
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
      extensions: ['.js', '.jsx', '.scss', '.json'],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ]
  };
}
