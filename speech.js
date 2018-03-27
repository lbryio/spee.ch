// const Components = require('./client/components');
// const Containers = require('./client/containers');
// const Pages = require('./client/pages');
const apiRoutes = require('./server/routes/apiRoutes.js');
const logger = require('./config/loggerConfig.js');
const mysql = require('./config/mysqlConfig');
const site = require('./config/siteConfig');
const slack = require('./config/slackConfig.js');
const passport = require('./server/passport/');

const exports = {
  // Components,
  // Containers,
  // Pages,
  apiRoutes,
  logger,
  mysql,
  site,
  slack,
  passport,
};

module.exports = exports;
