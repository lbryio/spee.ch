function MysqlConfig () {
  this.database = 'default';
  this.username = 'default';
  this.password = 'default';
  this.configure = ({database, username, password}) => {
    if (database) this.database = database;
    if (username) this.username = username;
    if (password) this.password = password;
  };
};

module.exports = new MysqlConfig();
