'use strict';
const bcrypt = require('bcrypt');
const logger = require('winston');

module.exports = (sequelize, { STRING }) => {
  const User = sequelize.define(
    'User',
    {
      userName: {
        type     : STRING,
        allowNull: false,
      },
      password: {
        type     : STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  User.associate = db => {
    User.hasOne(db.Channel);
  };

  User.prototype.comparePassword = function (password, callback) {
    logger.debug(`User.prototype.comparePassword ${password} ${this.password}`);
    bcrypt.compare(password, this.password, callback);
  };

  // pre-save hook method to hash the user's password before the user's info is saved to the db.
  User.hook('beforeCreate', (user, options) => {
    logger.debug('...beforeCreate hook...');
    return new Promise((resolve, reject) => {
      // generate a salt string to use for hashing
      bcrypt.genSalt((saltError, salt) => {
        if (saltError) {
          logger.error('salt error', saltError);
          reject(saltError);
          return;
        }
        // generate a hashed version of the user's password
        bcrypt.hash(user.password, salt, (hashError, hash) => {
          // if there is an error with the hash generation return the error
          if (hashError) {
            logger.error('hash error', hashError);
            reject(hashError);
            return;
          }
          // replace the password string with the hash password value
          user.password = hash;
          resolve();
        });
      });
    });
  });

  return User;
};
