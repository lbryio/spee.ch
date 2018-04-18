// app dependencies
const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const http = require('http');
const logger = require('winston');
const requestLogger = require('./server/middleware/requestLogger.js');
const Path = require('path');
const loggerConfig = require('./config/loggerConfig.js');
const mysqlConfig = require('./config/mysqlConfig.js');
const siteConfig = require('./config/siteConfig.js');
const slackConfig = require('./config/slackConfig.js');

function Server () {
  this.configureLogger = loggerConfig.update;
  this.configureMysql = mysqlConfig.update;
  this.configureSite = siteConfig.update;
  this.configureSlack = slackConfig.update;
  this.configureModels = () => {
    logger.debug('here is where you could add/overwrite the default models')
  };
  this.configureRoutes = () => {
    logger.debug('here is where you could add/overwrite the default routes')
  };
  this.createApp = () => {
    // create an Express application
    const app = express();

    // trust the proxy to get ip address for us
    app.enable('trust proxy');

    /* add middleware */
    // set HTTP headers to protect against well-known web vulnerabilties
    app.use(helmet());
    // 'express.static' to serve static files from public directory
    if (siteConfig.routes.publicFolder) {
      // take in a different public folder, so it can serve it's own bundle if needed
      const publicFolder = Path.resolve(process.cwd(), siteConfig.routes.publicFolder);
      app.use(express.static(publicFolder));
      logger.info('serving static files from custom path:', publicFolder);
    } else {
      const publicPath = Path.resolve(process.cwd(), 'public');
      app.use(express.static(publicPath));
      logger.warn(`serving static files from default static path at ${publicPath}.  Please specify a path in your config/siteConfig.js file`);
    };
    // 'body parser' for parsing application/json
    app.use(bodyParser.json());
    // 'body parser' for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // add custom middleware (note: build out to accept dynamically use what is in server/middleware/
    app.use(requestLogger);

    // configure passport
    const speechPassport = require('./server/speechPassport/index');
    // initialize passport
    const sessionKey = siteConfig.auth.sessionKey;
    app.use(cookieSession({
      name  : 'session',
      keys  : [sessionKey],
    }));
    app.use(speechPassport.initialize());
    app.use(speechPassport.session());

    // configure handlebars & register it with express app
    const hbs = expressHandlebars.create({
      defaultLayout: 'embed',
      handlebars   : Handlebars,
    });
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');

    // set the routes on the app
    require('./server/routes/auth')(app);
    require('./server/routes/api')(app);
    require('./server/routes/pages')(app);
    require('./server/routes/assets')(app);
    require('./server/routes/fallback')(app);

    this.app = app;
  };
  this.initialize = () => {
    this.createApp();
    this.server = http.Server(this.app);
  };
  this.start = () => {
    const db = require('./server/models');
    const PORT = siteConfig.details.port;
    // sync sequelize
    db.sequelize.sync()
    // start the server
      .then(() => {
        this.server.listen(PORT, () => {
          logger.info(`Server is listening on PORT ${PORT}`);
        });
      })
      .catch((error) => {
        logger.error(`Startup Error:`, error);
      });
  };
};

module.exports = Server;
