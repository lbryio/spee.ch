const apiRoutes = require('./server/routes/apiRoutes/');
const logger = require('./config/loggerConfig.js');
const mysql = require('./config/mysqlConfig');
const site = require('./config/siteConfig');
const slack = require('./config/slackConfig.js');
const passport = require('./server/passport/');
const models = require('./server/models/');
// const Components = require('./client/components');

const exports = {
  apiRoutes,
  logger,
  mysql,
  site,
  slack,
  passport,
  models,
  // Components,
};

module.exports = exports;
