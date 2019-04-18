const Sequelize = require('sequelize');
const logger = require('winston');

const Blocked = require('./blocked');
const Certificate = require('./certificate');
const Channel = require('./channel');
const Claim = require('./claim');
const File = require('./file');
const Metrics = require('./metrics');
const Tor = require('./tor');
const Trending = require('./trending');
const User = require('./user');
const Views = require('./views');

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

db['Blocked'] = Blocked(sequelize, Sequelize);
db['Certificate'] = Certificate(sequelize, Sequelize);
db['Channel'] = Channel(sequelize, Sequelize);
db['Claim'] = Claim(sequelize, Sequelize);
db['File'] = File(sequelize, Sequelize);
db['Metrics'] = Metrics(sequelize, Sequelize);
db['Tor'] = Tor(sequelize, Sequelize);
db['Trending'] = Trending(sequelize, Sequelize);
db['User'] = User(sequelize, Sequelize);
db['Views'] = Views(sequelize, Sequelize);

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
