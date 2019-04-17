import Sequelize from 'sequelize';
import { database, username, password } from '@config/mysqlConfig';

const createDatabaseIfNotExists = () => {
  const sequelize = new Sequelize('', username, password, {
    dialect: 'mysql',
    logging: false,
    operatorsAliases: false,
  });
  return new Promise((resolve, reject) => {
    sequelize
      .query(`CREATE DATABASE IF NOT EXISTS ${database};`)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default createDatabaseIfNotExists;
