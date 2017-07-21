// load dependencies
const express = require('express');
const bodyParser = require('body-parser');
const siofu = require('socketio-file-upload');
const expressHandlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const config = require('config');
const logger = require('winston');
const { getDownloadDirectory } = require('./helpers/libraries/lbryApi');

const PORT = 3000; // set port
const app = express(); // create an Express application
const db = require('./models'); // require our models for syncing

// configure logging
const logLevel = config.get('Logging.LogLevel');
require('./config/loggerSetup.js')(logger, logLevel);

// serve static files from public directory (css/js/img)
app.use(express.static(`${__dirname}/public`));

// configure express app
app.enable('trust proxy');  // trust the proxy to get ip address for us
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(siofu.router);
app.use((req, res, next) => {  // logging middleware
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
    grouped_each (every, context, options) {
      let out = '';
      let subcontext = [];
      let i;
      if (context && context.length > 0) {
        for (i = 0; i < context.length; i++) {
          if (i > 0 && i % every === 0) {
            out += options.fn(subcontext);
            subcontext = [];
          }
          subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
      }
      return out;
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
  .then(hostedContentPath => { // require routes & wrap in socket.io
    require('./routes/api-routes.js')(app, hostedContentPath);
    require('./routes/show-routes.js')(app);
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
