import App from 'app';
import Reducer from 'reducers';
import rootSaga  from 'sagas';
import GAListener from 'components/GAListener';

const api = require('./server/routes/api/');
const asset = require('./server/routes/asset/');
const auth = require('./server/routes/auth/');
const logger = require('./config/loggerConfig.js');
const mysql = require('./config/mysqlConfig');
const site = require('./config/siteConfig');
const slack = require('./config/slackConfig.js');
const passport = require('./server/passport/');
const models = require('./server/models/');

const exports = {
  App,
  Reducer,
  rootSaga,
  GAListener,
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
  },
};

module.exports = exports;
