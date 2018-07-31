// set up module aliasing
// const moduleAlias = require('module-alias');
// const createModuleAliases = require('./utils/createModuleAliases.js');
// const customAliases = createModuleAliases();
// moduleAlias.addAliases(customAliases);

// test configs
const checkForConfig = require('./utils/checkForConfig.js');
checkForConfig('siteConfig');
checkForConfig('mysqlConfig');
checkForConfig('slackConfig');
checkForConfig('loggerConfig');
checkForConfig('siteConfig');

// load modules
const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const http = require('http');
const logger = require('winston');
const Path = require('path');

// load local modules
const db = require('./models/index');
const requestLogger = require('./middleware/requestLogger.js');
const createDatabaseIfNotExists = require('./models/utils/createDatabaseIfNotExists.js');
const { getWalletBalance } = require('./lbrynet/index');
const configureLogging = require('./utils/configureLogging.js');
const configureSlack = require('./utils/configureSlack.js');
const speechPassport = require('./speechPassport/index');

const {
  details: { port: PORT },
  auth: { sessionKey },
  startup: {
    performChecks,
    performUpdates,
  },
} = require('@config/siteConfig');

function Server () {
  this.initialize = () => {
    // configure logging
    configureLogging();
    // configure slack logging
    configureSlack();
  };
  this.createApp = () => {
    /* create app */
    const app = express();

    // trust the proxy to get ip address for us
    app.enable('trust proxy');

    // set HTTP headers to protect against well-known web vulnerabilties
    app.use(helmet());

    // 'express.static' to serve static files from public directory
    const publicPath = Path.resolve(process.cwd(), 'public');
    app.use(express.static(publicPath));
    logger.info(`serving static files from default static path at ${publicPath}.`);

    // 'body parser' for parsing application/json
    app.use(bodyParser.json());

    // 'body parser' for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // add custom middleware (note: build out to accept dynamically use what is in server/middleware/
    app.use(requestLogger);

    // initialize passport
    app.use(cookieSession({
      name  : 'session',
      keys  : [sessionKey],
    }));
    app.use(speechPassport.initialize());
    app.use(speechPassport.session());

    // configure handlebars & register it with express app
    const viewsPath = Path.resolve(process.cwd(), 'node_modules/spee.ch/server/views');
    app.engine('handlebars', expressHandlebars({
      async: false,
      dataType: 'text',
      defaultLayout: 'embed',
      partialsDir: Path.join(viewsPath, '/partials'),
      layoutsDir: Path.join(viewsPath, '/layouts')
    }));
    app.set('views', viewsPath);
    app.set('view engine', 'handlebars');

    // set the routes on the app
    require('./routes/auth/index')(app);
    require('./routes/api/index')(app);
    require('./routes/pages/index')(app);
    require('./routes/assets/index')(app);
    require('./routes/fallback/index')(app);

    this.app = app;
  };
  this.createServer = () => {
    /* create server */
    this.server = http.Server(this.app);
  };
  this.startServerListening = () => {
    logger.info(`Starting server on ${PORT}...`);
    return new Promise((resolve, reject) => {
      this.server.listen(PORT, () => {
        logger.info(`Server is listening on PORT ${PORT}`);
        resolve();
      })
    });
  };
  this.syncDatabase = () => {
    logger.info(`Syncing database...`);
    return createDatabaseIfNotExists()
      .then(() => {
        db.sequelize.sync();
      })
  };
  this.performChecks = () => {
    if (!performChecks) {
      return;
    }
    logger.info(`Performing checks...`);
    return Promise.all([
      getWalletBalance(),
    ])
      .then(([walletBalance]) => {
        logger.info('Starting LBC balance:', walletBalance);
      })
  };
  this.performUpdates = () => {
    if (!performUpdates) {
      return;
    }
    logger.info(`Peforming updates...`);
    return Promise.all([
      db.Blocked.refreshTable(),
      db.Tor.refreshTable(),
    ])
      .then(([updatedBlockedList, updatedTorList]) => {
        logger.info('Blocked list updated, length:', updatedBlockedList.length);
        logger.info('Tor list updated, length:', updatedTorList.length);
      })
  };
  this.start = () => {
    this.initialize();
    this.createApp();
    this.createServer();
    this.syncDatabase()
      .then(() => {
        return this.startServerListening();
      })
      .then(() => {
        return Promise.all([
          this.performChecks(),
          this.performUpdates(),
        ])
      })
      .then(() => {
        logger.info('Spee.ch startup is complete');
      })
      .catch(error => {
        if (error.code === 'ECONNREFUSED') {
          return logger.error('Connection refused.  The daemon may not be running.')
        } else if (error.code === 'EADDRINUSE') {
          return logger.error('Server could not start listening.  The port is already in use.');
        } else if (error.message) {
          logger.error(error.message);
        }
        logger.error(error);
      });
  };
}

module.exports = Server;
