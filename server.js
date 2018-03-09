// load dependencies
const express = require('express');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const { populateLocalsDotUser, serializeSpeechUser, deserializeSpeechUser } = require('./helpers/authHelpers.js');
const { logging: { logLevel } } = require('./config/speechConfig.js');
const logger = require('winston');
const helmet = require('helmet');
const PORT = 3000; // set port
const app = express(); // create an Express application
const passport = require('passport');
const cookieSession = require('cookie-session');

// configure logging
require('./config/loggerConfig.js')(logger, logLevel);
require('./config/slackConfig.js')(logger);

module.exports = {
  speak (something) {
    console.log(something);
  },
  start (config) {
    // parse config parameter
    const { mysqlConfig, siteConfig, lbrynetConfig } = config;

    // get models
    const db = require('./models')(mysqlConfig);

    // check for global config variables
    require('./helpers/configVarCheck.js')(config);

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
    const localSignupStrategy = require('./passport/local-signup.js')(db);
    const localLoginStrategy = require('./passport/local-login.js')(db);
    passport.use('local-signup', localSignupStrategy);
    passport.use('local-login', localLoginStrategy);
    // initialize passport
    app.use(cookieSession({
      name  : 'session',
      keys  : [siteConfig.session.sessionKey],
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

    // start the server
    module.exports.startServer(db, app, siteConfig, lbrynetConfig);
  },
  startServer (db, app, siteConfig, lbrynetConfig) {
    db.sequelize
    // sync sequelize
      .sync()
      // require routes
      .then(() => {
        require('./routes/auth-routes.js')(app, siteConfig, lbrynetConfig);
        require('./routes/api-routes.js')(app, siteConfig, lbrynetConfig);
        require('./routes/page-routes.js')(app, siteConfig, lbrynetConfig);
        require('./routes/serve-routes.js')(app, siteConfig, lbrynetConfig);
        require('./routes/fallback-routes.js')(app, siteConfig, lbrynetConfig);
        const http = require('http');
        return http.Server(app);
      })
      // start the server
      .then(server => {
        server.listen(PORT, () => {
          logger.info('Trusting proxy?', app.get('trust proxy'));
          logger.info(`Server is listening on PORT ${PORT}`);
        });
      })
      .catch((error) => {
        logger.error(`Startup Error:`, error);
      });
  },
};
