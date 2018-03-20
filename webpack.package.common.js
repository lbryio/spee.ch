const Path = require('path');
const nodeExternals = require('webpack-node-externals');
const CLIENT_ROOT = Path.resolve(__dirname, 'client/');
const SERVER_ROOT = Path.resolve(__dirname, 'server/');

module.exports = {
  target: 'node',
  node  : {
    __dirname: false,
  },
  externals: [nodeExternals()],
  entry    : ['babel-polyfill', 'whatwg-fetch', './speech.js'],
  output   : {
    path         : Path.join(__dirname, '/'),
    publicPath   : '/',
    filename     : 'index.js',
    library      : '',
    libraryTarget: 'commonjs-module',
  },
  module: {
    rules: [
      {
        test   : /.jsx?$/,
        exclude: /node_modules/,
        loader : 'babel-loader',
        options: {
          presets: ['es2015',  'react', 'stage-2'],
        },
      },
      {
        test  : /.css$/,
        loader: 'css-loader',
      },
    ],
  },
  resolve: {
    modules: [
      CLIENT_ROOT,
      SERVER_ROOT,
      'node_modules',
      __dirname,
    ],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
};
