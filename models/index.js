const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const config = require('config');
const db = {};
const logger = require('winston');

const connectionUri = config.get('Database.MySqlConnectionUri');
const sequelize = new Sequelize(connectionUri, {
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    logger.info('Sequelize has has been established mysql connection successfully.');
  })
  .catch(err => {
    logger.error('Sequelize was nable to connect to the database:', err);
  });

fs.readdirSync(__dirname).filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js').forEach(file => {
  const model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
