// app dependencies
const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const helmet = require('helmet');
const passport = require('passport');
const { populateLocalsDotUser, serializeSpeechUser, deserializeSpeechUser } = require('./helpers/authHelpers.js');
const cookieSession = require('cookie-session');
const http = require('http');
// logging dependencies
const logger = require('winston');

function SpeechServer ({ mysqlConfig, siteConfig, slackConfig }) {
  this.start = () => {
    this.configureConfigFiles();
    this.configureLogging();
    this.configureApp();
    this.configureServer();
    this.startServer();
  };
  this.configureConfigFiles = () => {
    const mysqlAppConfig = require('./config/mysqlConfig.js');
    mysqlAppConfig.configure(mysqlConfig);
    const siteAppConfig = require('./config/siteConfig.js');
    siteAppConfig.configure(siteConfig);
    this.PORT = siteAppConfig.details.port;
    const slackAppConfig = require('./config/slackConfig.js');
    slackAppConfig.configure(slackConfig);
  };
  this.configureLogging = () => {
    require('./helpers/configureLogger.js')(logger);
    require('./helpers/configureSlack.js')(logger);
  };
  this.configureApp = () => {
    const app = express(); // create an Express application

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
      keys  : [siteConfig.auth.sessionKey],
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

    // middleware to pass user info back to client (for handlebars access), if user is logged in
    app.use(populateLocalsDotUser);  // note: I don't think I need this any more?

    // set the routes on the app
    require('./routes/auth-routes.js')(app);
    require('./routes/api-routes.js')(app);
    require('./routes/page-routes.js')(app);
    require('./routes/serve-routes.js')(app);
    require('./routes/fallback-routes.js')(app);

    this.app = app;
  };
  this.configureServer = () => {
    this.server = http.Server(this.app);
  };
  this.startServer = () => {
    const db = require('./models');
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

module.exports = SpeechServer;
