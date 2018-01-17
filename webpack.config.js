const Path = require('path');

const REACT_ROOT = Path.resolve(__dirname, 'react/');

module.exports = {
  entry : './react/index.js',
  output: {
    path    : Path.join(__dirname, '/public/bundle/'),
    filename: 'bundle.js',
  },
  watch : true,
  module: {
    loaders: [
      {
        test   : /.jsx?$/,
        loader : 'babel-loader',
        exclude: /node_modules/,
        query  : {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  resolve: {
    modules: [
      REACT_ROOT,
      'node_modules',
      __dirname,
    ],
    extensions: ['.js', '.jsx', '.scss'],
  },
};
