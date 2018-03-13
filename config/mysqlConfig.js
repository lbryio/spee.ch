const logger = require('winston');

function MysqlConfig () {
  this.database = 'default';
  this.username = 'default';
  this.password = 'default';
  this.configure = (config) => {
    if (!config) {
      return logger.warn('No MySQL config received.');
    }
    const {database, username, password} = config;
    this.database = database;
    this.username = username;
    this.password = password;
  };
};

module.exports = new MysqlConfig();
