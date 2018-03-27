const Sequelize = require('sequelize');
const logger = require('winston');

function mysql () {
  this.database = 'default';
  this.username = 'default';
  this.password = 'default';
  this.db = {};
  this.configure = (config) => {
    if (!config) {
      return console.log('No MySQL config received.');
    }
    // configure credentials
    console.log('configuring mysql credentials...');
    const {database, username, password} = config;
    this.database = database;
    this.username = username;
    this.password = password;
    // configure db
    // set sequelize options
    const sequelize = new Sequelize(database, username, password, {
      host          : 'localhost',
      dialect       : 'mysql',
      dialectOptions: {decimalNumbers: true},
      logging       : false,
      pool          : {
        max    : 5,
        min    : 0,
        idle   : 10000,
        acquire: 10000,
      },
    });

    // establish mysql connection
    sequelize
      .authenticate()
      .then(() => {
        logger.info('Sequelize has established mysql connection successfully.');
      })
      .catch(err => {
        logger.debug('mysqlconfig', { database, username, password });
        logger.error('Sequelize was unable to connect to the database:', err);
      });

    // manually add each model to the db object (note: make this dynamic)
    const db = {};
    const Certificate = require('models/certificate.js');
    const Channel = require('models/channel.js');
    const Claim = require('models/claim.js');
    const File = require('models/file.js');
    const Request = require('models/request.js');
    const User = require('models/user.js');
    db['Certificate'] = sequelize.import('Certificate', Certificate);
    db['Channel'] = sequelize.import('Channel', Channel);
    db['Claim'] = sequelize.import('Claim', Claim);
    db['File'] = sequelize.import('File', File);
    db['Request'] = sequelize.import('Request', Request);
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
    this.db = db;
  };
};

module.exports = new mysql();
