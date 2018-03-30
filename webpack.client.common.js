const Path = require('path');
const CLIENT_ROOT = Path.resolve(__dirname, 'client/');
const CONFIG_ROOT = Path.resolve(__dirname, 'config/');

module.exports = {
  target: 'web',
  entry : ['babel-polyfill', 'whatwg-fetch', './client/index.js'],
  output: {
    path      : Path.join(__dirname, 'exports/'),
    publicPath: 'exports/',
    filename  : 'clientBundle.js',
  },
  module: {
    loaders: [
      {
        test   : /.jsx?$/,
        loader : 'babel-loader',
        exclude: /node_modules/,
        query  : {
          presets: ['es2015', 'react', 'stage-2'],
        },
      },
    ],
  },
  resolve: {
    modules: [
      CLIENT_ROOT,
      CONFIG_ROOT,
      'node_modules',
      __dirname,
    ],
    extensions: ['.js', '.jsx', '.scss'],
  },
};
