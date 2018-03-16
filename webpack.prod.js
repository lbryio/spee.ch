const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const serverBaseConfig = require('./webpack.server.common.js');
const clientBaseConfig = require('./webpack.client.common.js');

const productionBuildConfig = {
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};

module.exports = [
  merge(serverBaseConfig, productionBuildConfig),
  merge(clientBaseConfig, productionBuildConfig),
];
