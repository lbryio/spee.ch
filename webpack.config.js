const serverBaseConfig = require('./webpack.server.common.js');
const clientBaseConfig = require('./webpack.client.common.js');

module.exports = [
  serverBaseConfig,
  clientBaseConfig,
];
