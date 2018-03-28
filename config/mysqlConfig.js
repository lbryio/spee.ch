function mysql () {
  this.db = {};
  this.configure = (db) => {
    if (!db) {
      return console.log('No MySQL config received.');
    }
    // configure credentials
    console.log('configuring mysql...');
    this.db = db;
  };
};

module.exports = new mysql();
