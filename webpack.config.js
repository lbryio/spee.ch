const packageBaseConfig = require('./webpack.package.common.js');
const clientBaseConfig = require('./webpack.client.common.js');

module.exports = [
  packageBaseConfig,
  clientBaseConfig,
];
