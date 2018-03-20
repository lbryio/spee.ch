const server = require('server/server.js');
const components = require('client/components');
// const containers = require('client/containers');
// const pages = require('client/pages');

const exports = {
  SpeechServer: server,
  Components  : components,
  // containers,
  // pages,
};

module.exports = exports;
