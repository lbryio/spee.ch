const checkForLocalConfig = require('./utils/checkForLocalConfig.js');

try {
  checkForLocalConfig('lbryConfig');
  checkForLocalConfig('loggerConfig');
  checkForLocalConfig('slackConfig');
  checkForLocalConfig('mysqlConfig');
  checkForLocalConfig('siteConfig');
} catch (error) {
  console.log(error);
  process.exit(1);
}

let currentApp;

try {
  const Server = require('./server/');
  currentApp = Server;

  const speech = new Server();
  speech.start();

} catch (error) {
  console.log('server startup error:', error);
  process.exit(1);
}

/*
TODO: Finish SSR HMR
if (module.hot) {
 module.hot.accept('./server', () => {
  server.removeListener('request', currentApp);
  server.on('request', app);
  currentApp = app;
 })
}
*/
