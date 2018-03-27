// const Server = require('./server/server.js');
// const Components = require('./client/components');
// const Containers = require('./client/containers');
// const Pages = require('./client/pages');
const apiRoutes = require('./server/routes/apiRoutes.js');
const logger = require('./config/loggerConfig.js');
const mysql = require('./config/mysqlConfig.js');
const slack = require('./config/slackConfig.js');
const database = require('./server/models');
const localLoginStrategy = require('./server/passport/local-login.js');
const localSignupStrategy = require('./server/passport/local-signup.js');

const exports = {
  // Server,
  // Components,
  // Containers,
  // Pages,
  apiRoutes,
  config: {
    logger,
    mysql,
    slack,
  },
  database,
  passport: {
    localLoginStrategy,
    localSignupStrategy,
  },
};

module.exports = exports;
