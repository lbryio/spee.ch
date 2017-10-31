const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const config = require('config');
const db = {};
const logger = require('winston');

const NO_CHANNEL = 'NO_CHANNEL';

const database = config.get('Database.Database');
const username = config.get('Database.Username');
const password = config.get('Database.Password');

const sequelize = new Sequelize(database, username, password, {
  host   : 'localhost',
  dialect: 'mysql',
  logging: false,
  pool   : {
    max    : 5,
    min    : 0,
    idle   : 10000,
    acquire: 10000,
  },
});

function getLongChannelIdFromShortChannelId (channelName, channelId) {
  return new Promise((resolve, reject) => {
    db
      .sequelize.query(`SELECT claimId, height FROM Certificate WHERE name = '${channelName}' AND claimId LIKE '${channelId}%' ORDER BY height ASC LIMIT 1;`, { type: db.sequelize.QueryTypes.SELECT })
      .then(result => {
        switch (result.length) {
          case 0:
            return resolve(NO_CHANNEL);
          default: // note results must be sorted
            return resolve(result[0].claimId);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function getLongChannelIdFromChannelName (channelName) {
  logger.debug(`getLongChannelIdFromChannelName(${channelName})`);
  return new Promise((resolve, reject) => {
    db
      .sequelize.query(`SELECT claimId, amount, height FROM Certificate WHERE name = '${channelName}' ORDER BY effectiveAmount DESC, height ASC LIMIT 1;`, { type: db.sequelize.QueryTypes.SELECT })
      .then(result => {
        switch (result.length) {
          case 0:
            return resolve(NO_CHANNEL);
          default:
            return resolve(result[0].claimId);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db['upsert'] = (Model, values, condition, tableName) => {
  return Model
    .findOne({ where: condition })
    .then(function (obj) {
      if (obj) {  // update
        logger.debug(`updating "${values.name}" "${values.claimId}" in db.${tableName}`);
        return obj.update(values);
      } else {  // insert
        logger.debug(`creating "${values.name}" "${values.claimId}" in db.${tableName}`);
        return Model.create(values);
      }
    })
    .catch(function (error) {
      logger.error('Sequelize findOne error', error);
    });
};

db['getTrendingClaims'] = (startDate) => {
  return db.sequelize.query(`SELECT COUNT(*), File.* FROM Request LEFT JOIN File ON Request.FileId = File.id WHERE FileId IS NOT NULL AND nsfw != 1 AND trendingEligible = 1 AND Request.createdAt > "${startDate}" GROUP BY FileId ORDER BY COUNT(*) DESC LIMIT 25;`, { type: db.sequelize.QueryTypes.SELECT });
};

db['getRecentClaims'] = () => {
  return db.sequelize.query(`SELECT * FROM File WHERE nsfw != 1 AND trendingEligible = 1 ORDER BY createdAt DESC LIMIT 25;`, { type: db.sequelize.QueryTypes.SELECT });
};

db['resolveClaim'] = (name, claimId) => {
  return new Promise((resolve, reject) => {
    db
      .sequelize.query(`SELECT name, claimId, outpoint, height, address, title, description, thumbnail, certificateId, channelName FROM Claim WHERE name = '${name}' AND claimId = '${claimId}'`, { type: db.sequelize.QueryTypes.SELECT })
      .then(result => {
        switch (result.length) {
          case 0:
            return resolve(null);
          case 1:
            return resolve(result[0]);
          default:
            throw new Error('more than one entry matches that name and claimID');
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

db['getLongChannelId'] = (channelName, channelId) => {
  logger.debug(`getLongChannelId (${channelName}, ${channelId})`);
  if (channelId && (channelId.length === 40)) {  // if a full channel id is provided
    return new Promise((resolve, reject) => resolve(channelId));
  } else if (channelId && channelId.length < 40) {  // if a short channel id is provided
    return getLongChannelIdFromShortChannelId(channelName, channelId);
  } else {
    return getLongChannelIdFromChannelName(channelName);  // if no channel id provided
  }
};

module.exports = db;
