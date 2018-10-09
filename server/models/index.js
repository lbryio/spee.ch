const Sequelize = require('sequelize');
const logger = require('winston');

const Blocked = require('./blocked');
const Certificate = require('./certificate');
const Channel = require('./channel');
const Claim = require('./claim');
const File = require('./file');
const Metrics = require('./metrics');
const Tor = require('./tor');
const User = require('./user');

const {
  database,
  username,
  password,
} = require('@config/mysqlConfig');

if (!database || !username || !password) {
  logger.warn('missing database, user, or password from mysqlConfig');
}

// set sequelize options
const sequelize = new Sequelize(database, username, password, {
  host          : 'localhost',
  dialect       : 'mysql',
  dialectOptions: {
    decimalNumbers: true,
  },
  logging: false,
  pool   : {
    max    : 5,
    min    : 0,
    idle   : 10000,
    acquire: 10000,
  },
  operatorsAliases: false,
});

// establish mysql connection
sequelize
  .authenticate()
  .then(() => {
    logger.info('Sequelize has established mysql connection successfully.');
  })
  .catch(err => {
    logger.error('Sequelize was unable to connect to the database:', err);
  });

// manually add each model to the db object (note: make this dynamic)
const db = {};
db['Blocked'] = sequelize.import('Blocked', Blocked);
db['Certificate'] = sequelize.import('Certificate', Certificate);
db['Channel'] = sequelize.import('Channel', Channel);
db['Claim'] = sequelize.import('Claim', Claim);
db['File'] = sequelize.import('File', File);
db['Metrics'] = sequelize.import('Metrics', Metrics);
db['Tor'] = sequelize.import('Tor', Tor);
db['User'] = sequelize.import('User', User);

// run model.association for each model in the db object that has an association
logger.info('associating db models...');
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    logger.info('Associating model:', modelName);
    db[modelName].associate(db);
  }
});

// add sequelize/Sequelize to db
db.sequelize = sequelize;
db.Sequelize = Sequelize;
// add an 'upsert' method to the db object
db.upsert = (Model, values, condition, tableName) => {
  return Model
    .findOne({
      where: condition,
    })
    .then(obj => {
      if (obj) {  // update
        logger.debug(`updating record in db.${tableName}`);
        return obj.update(values);
      } else {  // insert
        logger.debug(`creating record in db.${tableName}`);
        return Model.create(values);
      }
    })
    .catch(function (error) {
      logger.error(`${tableName}.upsert error`, error);
      throw error;
    });
};

module.exports = db;
