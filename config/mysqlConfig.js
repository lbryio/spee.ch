const logger = require('winston');

function mysql () {
  this.database = 'default';
  this.username = 'default';
  this.password = 'default';
  this.configure = (config) => {
    if (!config) {
      return logger.warn('No MySQL config received.');
    }
    // configure credentials
    logger.info('configuring mysql...');
    const { database, username, password } = config;
    this.database = database;
    this.username = username;
    this.password = password;
  };
};

module.exports = new mysql();
