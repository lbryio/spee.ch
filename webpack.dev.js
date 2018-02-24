const serverBaseConfig = require('./webpack.server.common.js');
const clientBaseConfig = require('./webpack.client.common.js');
const merge = require('webpack-merge');

const devBuildConfig = {
  watch  : true,
  devtool: 'inline-source-map',
};

module.exports = [
  merge(serverBaseConfig, devBuildConfig),
  merge(clientBaseConfig, devBuildConfig),
];
