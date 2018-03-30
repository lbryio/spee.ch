const packageBaseConfig = require('./webpack.speech.common.js');
// const clientBaseConfig = require('./webpack.client.common.js');
const merge = require('webpack-merge');

const devBuildConfig = {
  watch  : true,
  devtool: 'inline-source-map',
};

module.exports = [
  merge(packageBaseConfig, devBuildConfig),
  // merge(clientBaseConfig, devBuildConfig),
];
