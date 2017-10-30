const db = require('../models');
const bcrypt = require('bcrypt');
const logger = require('winston');

module.exports = {
  up: (queryInterface, Sequelize) => {
    // get all the users
    return db.User
        .findAll()
        .then((users) => {
          // create an array of promises, with each promise bcrypting a password and updating the record
          const promises = users.map((record) => {
            // bcrypt
            // generate a salt string to use for hashing
            return new Promise((resolve, reject) => {
              bcrypt.genSalt((saltError, salt) => {
                if (saltError) {
                  logger.error('salt error', saltError);
                  reject(saltError);
                  return;
                }
                // generate a hashed version of the user's password
                bcrypt.hash(record.password, salt, (hashError, hash) => {
                  // if there is an error with the hash generation return the error
                  if (hashError) {
                    logger.error('hash error', hashError);
                    reject(hashError);
                    return;
                  }
                  // replace the password string with the hash password value
                  resolve(queryInterface.sequelize.query(`UPDATE User SET User.password = "${hash}" WHERE User.id = ${record.id}`));
                });
              });
            });
          });
          // return the array of promises
          return Promise.all(promises);
        })
        .catch(error => {
          logger.error('error prepping promises array', error);
        });
  },
  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
  },
};
