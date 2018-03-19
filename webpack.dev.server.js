const serverBaseConfig = require('./webpack.server.common.js');
const merge = require('webpack-merge');

const devBuildConfig = {
  watch  : true,
  devtool: 'inline-source-map',
};

module.exports = [
  merge(serverBaseConfig, devBuildConfig),
];
