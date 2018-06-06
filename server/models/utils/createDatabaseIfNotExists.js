const Sequelize = require('sequelize');

const createDatabaseIfNotExists = () => {
  const {database, username, password} = require('@config/mysqlConfig.js');
  const sequelize = new Sequelize('', username, password, {
    dialect         : 'mysql',
    logging         : false,
    operatorsAliases: false,
  });
  return new Promise((resolve, reject) => {
    sequelize.query(`CREATE DATABASE IF NOT EXISTS ${database};`)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = createDatabaseIfNotExists;
