// load modules
const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const http = require('http');
const logger = require('winston');
const Path = require('path');
const httpContext = require('express-http-context');

// load local modules
const db = require('./models');
const requestLogger = require('./middleware/requestLogger');
const createDatabaseIfNotExists = require('./models/utils/createDatabaseIfNotExists');
const { getAccountBalance } = require('./lbrynet/index');
const configureLogging = require('./utils/configureLogging');
const configureSlack = require('./utils/configureSlack');
const { setupBlockList } = require('./utils/blockList');
const speechPassport = require('./speechPassport');
const processTrending = require('./utils/processTrending');

const { setRouteDataInContextMiddleware } = require('./middleware/httpContextMiddleware');

const {
  details: { port: PORT, blockListEndpoint },
  startup: { performChecks, performUpdates },
} = require('@config/siteConfig');

const { sessionKey } = require('@private/authConfig.json');

// configure.js doesn't handle new keys in config.json files yet. Make sure it doens't break.
let finalBlockListEndpoint;

function Server() {
  this.initialize = () => {
    // configure logging
    configureLogging();
    // configure slack logging
    configureSlack();
  };
  this.createApp = () => {
    /* create app */
    const app = express();

    if (process.env.NODE_ENV === 'development') {
      const webpack = require('webpack');
      const webpackDevMiddleware = require('webpack-dev-middleware');

      const webpackClientConfig = require('../webpack/webpack.client.config')(null, {
        mode: 'development',
      });
      const clientCompiler = webpack(webpackClientConfig);

      app.use(
        webpackDevMiddleware(clientCompiler, {
          publicPath: webpackClientConfig.output.publicPath,
        })
      );

      app.use(require('webpack-hot-middleware')(clientCompiler));
    }

    // trust the proxy to get ip address for us
    app.enable('trust proxy');

    app.use((req, res, next) => {
      if (
        req.get('User-Agent') ===
        'Mozilla/5.0 (Windows NT 5.1; rv:14.0) Gecko/20120405 Firefox/14.0a1'
      ) {
        res
          .status(403)
          .send(
            '<h1>Forbidden</h1>If you are seeing this by mistake, please contact us using <a href="https://chat.lbry.com/">https://chat.lbry.com/</a>'
          );
        res.end();
      } else {
        next();
      }
    });

    // set HTTP headers to protect against well-known web vulnerabilties
    app.use(helmet());

    // Support per-request http-context
    app.use(httpContext.middleware);

    // 'express.static' to serve static files from site/public directory
    const sitePublicPath = Path.resolve(process.cwd(), 'site/public');
    app.use(express.static(sitePublicPath));
    logger.info(`serving static files from site static path at ${sitePublicPath}.`);

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
    app.use(
      cookieSession({
        name: 'session',
        keys: [sessionKey],
      })
    );
    app.use(speechPassport.initialize());
    app.use(speechPassport.session());

    // configure handlebars & register it with express app
    const viewsPath = Path.resolve(process.cwd(), 'server/views');
    app.engine(
      'handlebars',
      expressHandlebars({
        async: false,
        dataType: 'text',
        defaultLayout: 'embed',
        partialsDir: Path.join(viewsPath, '/partials'),
        layoutsDir: Path.join(viewsPath, '/layouts'),
      })
    );
    app.set('views', viewsPath);
    app.set('view engine', 'handlebars');

    // set the routes on the app
    const routes = require('./routes');

    Object.keys(routes).map(routePath => {
      let routeData = routes[routePath];
      let routeMethod = routeData.hasOwnProperty('method') ? routeData.method : 'get';
      let controllers = Array.isArray(routeData.controller)
        ? routeData.controller
        : [routeData.controller];

      app[routeMethod](
        routePath,
        // logMetricsMiddleware,
        setRouteDataInContextMiddleware(routePath, routeData),
        ...controllers
      );
    });

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
      });
    });
  };
  this.syncDatabase = () => {
    logger.info(`Syncing database...`);
    return createDatabaseIfNotExists().then(() => {
      db.sequelize.sync();
    });
  };
  this.performChecks = () => {
    if (!performChecks) {
      return;
    }
    logger.info(`Performing checks...`);
    return Promise.all([getAccountBalance()]).then(([accountBalance]) => {
      logger.info('Starting LBC balance:', accountBalance);
    });
  };

  this.performUpdates = () => {
    if (!performUpdates) {
      return;
    }
    if (blockListEndpoint) {
      finalBlockListEndpoint = blockListEndpoint;
    } else if (!blockListEndpoint) {
      if (typeof blockListEndpoint !== 'string') {
        logger.warn(
          'blockListEndpoint is null due to outdated siteConfig file. \n' +
            'Continuing with default LBRY blocklist api endpoint. \n ' +
            '(Specify /"blockListEndpoint" : ""/ to disable.'
        );
        finalBlockListEndpoint = 'https://api.lbry.com/file/list_blocked';
      }
    }
    logger.info(`Peforming updates...`);
    if (!finalBlockListEndpoint) {
      logger.info('Configured for no Block List');
      db.Tor.refreshTable().then(updatedTorList => {
        logger.info('Tor list updated, length:', updatedTorList.length);
      });
    } else {
      return Promise.all([
        db.Blocked.refreshTable(finalBlockListEndpoint),
        db.Tor.refreshTable(),
      ]).then(([updatedBlockedList, updatedTorList]) => {
        logger.info('Blocked list updated, length:', updatedBlockedList.length);
        logger.info('Tor list updated, length:', updatedTorList.length);
      });
    }
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
        return Promise.all([this.performChecks(), this.performUpdates()]);
      })
      .then(() => {
        return setupBlockList();
      })
      .then(() => {
        logger.info('Spee.ch startup is complete');

        setInterval(processTrending, 30 * 60000); // 30 minutes
      })
      .catch(error => {
        if (error.code === 'ECONNREFUSED') {
          return logger.error('Connection refused.  The daemon may not be running.');
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
