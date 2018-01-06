const path = require('path');

module.exports = {
  entry : './react/PublishTool.js',
  output: {
    path    : path.join(__dirname, '/public/bundle/'),
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
};
