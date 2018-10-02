// module imports
const moduleAlias = require('module-alias');
require('@babel/polyfill');

// local imports
const createModuleAliases = require('./utils/createModuleAliases.js');
const checkForLocalConfig = require('./utils/checkForLocalConfig.js');

const customAliases = createModuleAliases();
moduleAlias.addAliases(customAliases);

try {
  checkForLocalConfig('lbryConfig');
  checkForLocalConfig('loggerConfig');
  checkForLocalConfig('slackConfig');
  checkForLocalConfig('mysqlConfig');
  checkForLocalConfig('siteConfig');
} catch (error) {
  console.log(error);
  process.exit(1);
}

try {
  const Server = require('./server/index.js');
  const speech = new Server();
  speech.start();
} catch (error) {
  console.log('server startup error:', error);
  process.exit(1);
}
