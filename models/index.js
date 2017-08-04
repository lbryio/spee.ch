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
    logger.info('Sequelize has established mysql connection successfully.');
  })
  .catch(err => {
    logger.error('Sequelize was unable to connect to the database:', err);
  });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    logger.info('Associating model:', modelName);
    db[modelName].associate(db);
  }
});

db['upsert'] = (Model, values, condition) => {
  return Model
    .findOne({ where: condition })
    .then(function (obj) {
      if (obj) {  // update
        logger.silly(`updating ${values.name}:${values.claimId} in File db`);
        return obj.update(values);
      } else {  // insert
        logger.silly(`creating ${values.name}:${values.claimId} in File db`);
        return Model.create(values);
      }
    }).catch(function (error) {
      logger.error('Sequelize findOne error', error);
    });
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
