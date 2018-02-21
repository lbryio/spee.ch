const Path = require('path');
const nodeExternals = require('webpack-node-externals');
const REACT_ROOT = Path.resolve(__dirname, 'react/');

console.log('REACT_ROOT:', REACT_ROOT);

module.exports = [
  {
    target: 'web',
    entry : ['babel-polyfill', 'whatwg-fetch', './react/client.js'],
    output: {
      path      : Path.join(__dirname, 'public/bundle/'),
      publicPath: 'public/bundle/',
      filename  : 'bundle.js',
    },
    watch : true,
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
        REACT_ROOT,
        'node_modules',
        __dirname,
      ],
      extensions: ['.js', '.jsx', '.scss'],
    },
  },
  {
    target: 'node',
    node  : {
      __dirname: true,
    },
    externals: nodeExternals(),
    entry    : ['./index.js'],
    output   : {
      path    : Path.join(__dirname, 'build/'),
      filename: 'server.js',
    },
    watch : true,
    module: {
      rules: [
        {
          test   : /.jsx?$/,
          exclude: /node_modules/,
          loader : 'babel-loader',
          options: {
            presets: ['es2015'],
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
        'node_modules',
        __dirname,
      ],
      extensions: ['.js', '.json', '.jsx', '.css'],
    },
  },
];
