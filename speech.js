// load dependencies
const express = require('express');
const bodyParser = require('body-parser');
const siofu = require('socketio-file-upload');
const expressHandlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const config = require('config');
const logger = require('winston');
const { getDownloadDirectory } = require('./helpers/lbryApi');

const PORT = 3000; // set port
const app = express(); // create an Express application
const db = require('./models'); // require our models for syncing

// configure logging
const logLevel = config.get('Logging.LogLevel');
require('./config/loggerSetup.js')(logger, logLevel);

// trust the proxy to get ip address for us
app.enable('trust proxy');
// add middleware
app.use(express.static(`${__dirname}/public`)); // 'express.static' to serve static files from public directory
app.use(express.static(`${__dirname}/public`)); // 'express.static' to serve static files from public directory
app.use(bodyParser.json()); // 'body parser' for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // 'body parser' for parsing application/x-www-form-urlencoded
app.use(siofu.router); // 'socketio-file-upload' router for uploading with socket.io
app.use((req, res, next) => {  // custom logging middleware to log all incomming http requests
  logger.verbose(`Request on ${req.originalUrl} from ${req.ip}`);
  next();
});

// configure handlebars & register it with express app
const hbs = expressHandlebars.create({
  defaultLayout: 'main', // sets the default layout
  handlebars   : Handlebars, // includes basic handlebars for access to that library
  helpers      : {
    // define any extra helpers you may need
    googleAnalytics () {
      const googleApiKey = config.get('AnalyticsConfig.GoogleId');
      return new Handlebars.SafeString(
        `<script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', '${googleApiKey}', 'auto');
        ga('send', 'pageview');
        </script>`
      );
    },
    addOpenGraph (title, mimeType, showUrl, source) {
      let basicTags = `<meta property="og:title" content="${title}"> 
          <meta property="og:url" content="${showUrl}" > 
          <meta property="og:site_name" content="Spee.ch" > 
          <meta property="og:description" content="View or download ${title} from spee.ch: the open-source, decentralized content host." >`;
      if (mimeType === 'video/mp4') {
        return new Handlebars.SafeString(
          `${basicTags} <meta property="og:image" content="https://spee.ch/assets/img/content-freedom-large.png" > 
          <meta property="og:image:type" content="image/png" >
          <meta property="og:image:width" content="600" >
          <meta property="og:image:height" content="315" >
          <meta property="og:type" content="video" > 
          <meta property="og:video" content="${source}" > 
          <meta property="og:video:secure_url" content="${source}" > 
          <meta property="og:video:type" content="${mimeType}" >`
        );
      } else if (mimeType === 'image/gif') {
        return new Handlebars.SafeString(
          `${basicTags} <meta property="og:image" content="${source}" > 
          <meta property="og:image:type" content="${mimeType}" >
          <meta property="og:image:width" content="600" >
          <meta property="og:image:height" content="315" >
          <meta property="og:type" content="video.other" >`
        );
      } else {
        return new Handlebars.SafeString(
          `${basicTags} <meta property="og:image" content="${source}" > 
          <meta property="og:image:type" content="${mimeType}" >
          <meta property="og:image:width" content="600" >
          <meta property="og:image:height" content="315" >
          <meta property="og:type" content="article" >`
        );
      }
    },
    addTwitterCard (mimeType, source, embedUrl, directFileUrl) {
      let basicTwitterTags = `<meta name="twitter:site" content="@speechch" >`;
      if (mimeType === 'video/mp4') {
        return new Handlebars.SafeString(
          `${basicTwitterTags} <meta name="twitter:card" content="player" >
          <meta name="twitter:player" content="${embedUrl}>
          <meta name="twitter:player:width" content="600" >
          <meta name="twitter:text:player_width" content="600" >
          <meta name="twitter:player:height" content="325" >
          <meta name="twitter:player:stream" content="${directFileUrl}" >
          <meta name="twitter:player:stream:content_type" content="video/mp4" >
          `
        );
      } else {
        return new Handlebars.SafeString(
          `${basicTwitterTags} <meta name="twitter:card" content="summary_large_image" >`
        );
      }
    },
    ifConditional (varOne, operator, varTwo, options) {
      switch (operator) {
        case '===':
          return (varOne === varTwo) ? options.fn(this) : options.inverse(this);
        case '!==':
          return (varOne !== varTwo) ? options.fn(this) : options.inverse(this);
        case '<':
          return (varOne < varTwo) ? options.fn(this) : options.inverse(this);
        case '<=':
          return (varOne <= varTwo) ? options.fn(this) : options.inverse(this);
        case '>':
          return (varOne > varTwo) ? options.fn(this) : options.inverse(this);
        case '>=':
          return (varOne >= varTwo) ? options.fn(this) : options.inverse(this);
        case '&&':
          return (varOne && varTwo) ? options.fn(this) : options.inverse(this);
        case '||':
          return (varOne || varTwo) ? options.fn(this) : options.inverse(this);
        case 'mod3':
          return ((parseInt(varOne) % 3) === 0) ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    },
  },
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// start the server
db.sequelize
  .sync() // sync sequelize
  .then(() => {  // get the download directory from the daemon
    logger.info('Retrieving daemon download directory');
    return getDownloadDirectory();
  })
  .then(hostedContentPath => {
    // add the hosted content folder at a static path
    app.use('/media', express.static(hostedContentPath));
    // require routes & wrap in socket.io
    require('./routes/api-routes.js')(app, hostedContentPath);
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
    logger.error('Startup Error >>', error);
  });
