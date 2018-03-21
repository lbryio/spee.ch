// app dependencies
const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const helmet = require('helmet');
const passport = require('passport');
const { serializeSpeechUser, deserializeSpeechUser } = require('./helpers/authHelpers.js');
const cookieSession = require('cookie-session');
const http = require('http');
// logging dependencies
const logger = require('winston');

function Server () {
  this.configureMysql = (mysqlConfig) => {
    require('../config/mysqlConfig.js').configure(mysqlConfig);
  };
  this.configureSite = (siteConfig) => {
    require('../config/siteConfig.js').configure(siteConfig);
    console.log(require('../config/siteConfig.js'));
    this.sessionKey = siteConfig.auth.sessionKey;
    this.PORT = siteConfig.details.port;
  };
  this.configureSlack = (slackConfig) => {
    require('../config/slackConfig.js').configure(slackConfig);
  };
  this.createApp = () => {
    // create an Express application
    const app = express();

    // trust the proxy to get ip address for us
    app.enable('trust proxy');

    // add middleware
    app.use(helmet()); // set HTTP headers to protect against well-known web vulnerabilties
    app.use(express.static(`${__dirname}/public`)); // 'express.static' to serve static files from public directory
    app.use(bodyParser.json()); // 'body parser' for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // 'body parser' for parsing application/x-www-form-urlencoded
    app.use((req, res, next) => {  // custom logging middleware to log all incoming http requests
      logger.verbose(`Request on ${req.originalUrl} from ${req.ip}`);
      next();
    });

    // configure passport
    passport.serializeUser(serializeSpeechUser);
    passport.deserializeUser(deserializeSpeechUser);
    const localSignupStrategy = require('./passport/local-signup.js');
    const localLoginStrategy = require('./passport/local-login.js');
    passport.use('local-signup', localSignupStrategy);
    passport.use('local-login', localLoginStrategy);
    // initialize passport
    app.use(cookieSession({
      name  : 'session',
      keys  : [this.sessionKey],
      maxAge: 24 * 60 * 60 * 1000, // i.e. 24 hours
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // configure handlebars & register it with express app
    const hbs = expressHandlebars.create({
      defaultLayout: 'embed',
      handlebars   : Handlebars,
    });
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');

    // set the routes on the app
    require('./routes/auth-routes.js')(app);
    require('./routes/api-routes.js')(app);
    require('./routes/page-routes.js')(app);
    require('./routes/asset-routes.js')(app);
    require('./routes/fallback-routes.js')(app);

    this.app = app;
  };
  this.initialize = () => {
    require('./helpers/configureLogger.js')(logger);
    require('./helpers/configureSlack.js')(logger);
    this.createApp();
    this.server = http.Server(this.app);
  };
  this.start = () => {
    const db = require('./models/index');
    // sync sequelize
    db.sequelize.sync()
      // start the server
      .then(() => {
        this.server.listen(this.PORT, () => {
          logger.info(`Server is listening on PORT ${this.PORT}`);
        });
      })
      .catch((error) => {
        logger.error(`Startup Error:`, error);
      });
  };
};

module.exports = Server;
