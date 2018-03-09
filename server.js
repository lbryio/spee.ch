// app dependencies
const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const helmet = require('helmet');
const passport = require('passport');
const { populateLocalsDotUser, serializeSpeechUser, deserializeSpeechUser } = require('./helpers/authHelpers.js');
const cookieSession = require('cookie-session');
// logging dependencies
const logger = require('winston');

function SpeechServer ({mysqlConfig, siteConfig, slackConfig, lbrynetConfig}) {
  this.mysqlConfig = mysqlConfig;
  this.siteConfig = siteConfig;
  this.slackConfig = slackConfig;
  this.lbrynetConfig = lbrynetConfig;
  this.db = require('./models')(mysqlConfig);
  this.PORT = 3000;
  this.speak = (something) => {
    console.log(something);
  };
  this.start = () => {
    this.configureLogging();
    this.configureApp();
    this.configureServer();
    this.startServer();
  };
  this.configureLogging = () => {
    require('./helpers/configureLogger.js')(logger);
    require('./helpers/configureSlack.js')(logger, this.slackConfig);
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
    const localSignupStrategy = require('./passport/local-signup.js')(this.db);
    const localLoginStrategy = require('./passport/local-login.js')(this.db);
    passport.use('local-signup', localSignupStrategy);
    passport.use('local-login', localLoginStrategy);
    // initialize passport
    app.use(cookieSession({
      name  : 'session',
      keys  : [this.siteConfig.session.sessionKey],
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
    const http = require('http');
    this.server = http.Server(this.app);
  };
  this.startServer = () => {
    // print config variables
    require('./helpers/configVarCheck.js')(this.config);
    this.db.sequelize
    // sync sequelize
      .sync()
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
