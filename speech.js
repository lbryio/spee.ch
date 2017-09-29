// load dependencies
const express = require('express');
const bodyParser = require('body-parser');
const siofu = require('socketio-file-upload');
const expressHandlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const handlebarsHelpers = require('./helpers/handlebarsHelpers.js');
const config = require('config');
const logger = require('winston');
const { getDownloadDirectory } = require('./helpers/lbryApi');
const helmet = require('helmet');
const PORT = 3000; // set port
const app = express(); // create an Express application
const db = require('./models'); // require our models for syncing
const passport = require('passport');
const session = require('express-session');

// configure logging
const logLevel = config.get('Logging.LogLevel');
require('./config/loggerConfig.js')(logger, logLevel);
require('./config/slackLoggerConfig.js')(logger);

// check for global config variables
require('./helpers/configVarCheck.js')();

// trust the proxy to get ip address for us
app.enable('trust proxy');

// add middleware
app.use(helmet()); // set HTTP headers to protect against well-known web vulnerabilties
app.use(express.static(`${__dirname}/public`)); // 'express.static' to serve static files from public directory
app.use(bodyParser.json()); // 'body parser' for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // 'body parser' for parsing application/x-www-form-urlencoded
app.use(siofu.router); // 'socketio-file-upload' router for uploading with socket.io
app.use((req, res, next) => {  // custom logging middleware to log all incoming http requests
  logger.verbose(`Request on ${req.originalUrl} from ${req.ip}`);
  logger.debug(req.body);
  next();
});

// initialize passport
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {  // this populates req.user
  let userInfo = {};
  db.User.findOne({ where: { id } })
  .then(user => {
    userInfo['id'] = user.id;
    userInfo['userName'] = user.userName;
    return user.getChannel();
  })
  .then(channel => {
    userInfo['channelName'] = channel.channelName;
    userInfo['channelClaimId'] = channel.channelClaimId;
    return db.getShortChannelIdFromLongChannelId(channel.channelClaimId, channel.channelName);
  })
  .then(shortChannelId => {
    userInfo['shortChannelId'] = shortChannelId;
    done(null, userInfo);
    return null;
  })
  .catch(error => {
    logger.error('sequelize error', error);
    done(error, null);
  });
});
const localSignupStrategy = require('./passport/local-signup.js');
const localLoginStrategy = require('./passport/local-login.js');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// configure handlebars & register it with express app
const hbs = expressHandlebars.create({
  defaultLayout: 'main', // sets the default layout
  handlebars   : Handlebars, // includes basic handlebars for access to that library
  helpers      : handlebarsHelpers,  // custom defined helpers
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware to pass user info back to client (for handlebars access), if user is logged in
app.use((req, res, next) => {
  if (req.user) {
    logger.verbose(req.user);
    res.locals.user = {
      id            : req.user.id,
      userName      : req.user.userName,
      channelName   : req.user.channelName,
      channelClaimId: req.user.channelClaimId,
      shortChannelId: req.user.shortChannelId,
    };
  }
  next();
});

// start the server
db.sequelize
  .sync() // sync sequelize
  .then(() => {  // get the download directory from the daemon
    logger.info('Retrieving daemon download directory...');
    return getDownloadDirectory();
  })
  .then(hostedContentPath => {
    // add the hosted content folder at a static path
    app.use('/media', express.static(hostedContentPath));
    // require routes & wrap in socket.io
    require('./routes/auth-routes.js')(app);
    require('./routes/api-routes.js')(app);
    require('./routes/page-routes.js')(app);
    require('./routes/serve-routes.js')(app);
    require('./routes/home-routes.js')(app);
    return require('./routes/sockets-routes.js')(app, siofu, hostedContentPath);
  })
  .then(server => { // start the server
    server.listen(PORT, () => {
      logger.info('Trusting proxy?', app.get('trust proxy'));
      logger.info(`Server is listening on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error(`Startup Error >> ${error.message}`, error);
  });
