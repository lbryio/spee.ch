// app dependencies
const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const http = require('http');
const logger = require('winston');
const requestLogger = require('middleware/requestLogger.js');
const Path = require('path');
const loggerConfig = require('loggerConfig.js');
const mysqlConfig = require('mysqlConfig.js');
const siteConfig = require('siteConfig.js');
const slackConfig = require('slackConfig.js');

function Server () {
  this.configureLogger = (userConfig) => {
    loggerConfig.update(userConfig);
  };
  this.configureMysql = (userConfig) => {
    mysqlConfig.update(userConfig);
  };
  this.configureSiteDetails = (userConfig) => {
    siteConfig.update(userConfig);
  };
  this.configureSlack = (userConfig) => {
    slackConfig.update(userConfig);
  };
  this.configureClientBundle = () => {
    logger.debug('configure the client here by passing in the bundle and configuring it, or better yet: taking in the components to use dynamically from here.');
  };
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
      app.use('/static', express.static(publicFolder));
      logger.info('serving static files from custom path:', publicFolder);
    } else {
      const publicPath = Path.resolve(__dirname, 'public');
      app.use('/static', express.static(publicPath));
      logger.info('serving static files from default path:', publicPath);
    };
    // 'body parser' for parsing application/json
    app.use(bodyParser.json());
    // 'body parser' for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // add custom middleware (note: build out to accept dynamically use what is in server/middleware/
    app.use(requestLogger);

    // configure passport
    const speechPassport = require('speechPassport');
    // initialize passport
    const sessionKey = siteConfig.auth.sessionKey;
    app.use(cookieSession({
      name  : 'session',
      keys  : [sessionKey],
      maxAge: 24 * 60 * 60 * 1000, // i.e. 24 hours
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
    require('./routes/auth/')(app);
    require('./routes/api/')(app);
    require('./routes/pages/')(app);
    require('./routes/assets/')(app);
    require('./routes/fallback/')(app);

    this.app = app;
  };
  this.initialize = () => {
    this.createApp();
    this.server = http.Server(this.app);
  };
  this.start = () => {
    const db = require('models');
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
