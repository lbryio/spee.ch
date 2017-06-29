// load dependencies
const express = require('express');
const bodyParser = require('body-parser');
const siofu = require('socketio-file-upload');
const expressHandlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const config = require('config');
const winston = require('winston');

const hostedContentPath = config.get('Database.PublishUploadPath');

// configure logging
const logLevel = config.get('Logging.LogLevel');
const logDir = config.get('Logging.LogDirectory');
require('./config/loggerSetup.js')(winston, logLevel, logDir);

// set port
const PORT = 3000;
// create an Express application
const app = express();
// require our models for syncing
const db = require('./models');

// serve static files from public directory (css/js/img)
app.use(express.static(`${__dirname}/public`));

// configure express app
app.enable('trust proxy');  // trust the proxy to get ip address for us
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(siofu.router);

// configure handlebars & register it with Express app
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
  },
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// require express routes
require('./routes/api-routes.js')(app);
require('./routes/analytics-routes.js')(app);
require('./routes/show-routes.js')(app);
require('./routes/serve-routes.js')(app);
require('./routes/home-routes.js')(app);

// require socket.io routes
const http = require('./routes/sockets-routes.js')(app, siofu, hostedContentPath);

// sync sequelize
// wrap the server in socket.io to intercept incoming sockets requests
// start server
db.sequelize.sync().then(() => {
  http.listen(PORT, () => {
    winston.info('Trusting proxy?', app.get('trust proxy'));
    winston.info(`Server is listening on PORT ${PORT}`);
  });
});
