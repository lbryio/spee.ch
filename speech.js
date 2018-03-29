const api = require('./server/routes/api/');
const asset = require('./server/routes/asset/');
const auth = require('./server/routes/auth/');
const fallback = require('./server/routes/fallback');
const logger = require('./config/loggerConfig.js');
const mysql = require('./config/mysqlConfig');
const site = require('./config/siteConfig');
const slack = require('./config/slackConfig.js');
const passport = require('./server/passport/');
const models = require('./server/models/');
// const Components = require('./client/components');

const exports = {
  logger,
  models,
  mysql,
  passport,
  site,
  slack,
  routes: {
    api,
    asset,
    auth,
    fallback,
  },
  // Components,
};

module.exports = exports;
