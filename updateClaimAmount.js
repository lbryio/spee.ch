/*
    This script will update all the records in the Claim table and update the amount.
*/
let db = require('./models');
const lbryApi = require('./helpers/lbryApi.js');
let sleep = require('sleep');

// configure logging
const config = require('config');
const logger = require('winston');
const logLevel = config.get('Logging.LogLevel');
require('./config/loggerSetup.js')(logger, logLevel);

// start the server
db.sequelize
  .sync() // sync sequelize
  .then(() => {  // get the download directory from the daemon
    console.log('db has synced');
    console.log('retrieving files');
    return db.Claim.findAll({where: {amount: null}});
  })
  .then(result => {
    const totalResults = result.length;
    console.log('total results found:', totalResults);
    console.log('starting update...');
    sleep.sleep(2);
    result.forEach((record, index) => {
      const uri = `${record.name}#${record.claimId}`;
      setTimeout(() => {
        lbryApi.resolveUri(uri)
        .then(result => {
          console.log('resolve worked! :)');
          if (result['claim']) {
            const amount = result['claim'].amount;
            return record.update({ amount });
          }
        })
        .then(() => {
          if (index + 1 === totalResults) {
            console.log('All done.');
            process.exit(0);
          }
        })
        .catch(error => console.log('error getting/setting amount >>', error));
      }, 100 * index, uri);
    });
  })
  .catch((error) => {
    console.log('error getting record >>', error);
  });
