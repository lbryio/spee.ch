function mysql () {
  this.database = 'default';
  this.username = 'default';
  this.password = 'default';
  this.configure = (config) => {
    if (!config) {
      return console.log('No MySQL config received.');
    }
    console.log('configuring mysql credentials...');
    const {database, username, password} = config;
    this.database = database;
    this.username = username;
    this.password = password;
  };
};

module.exports = new mysql();
