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
  pool   : {
    max    : 5,
    min    : 0,
    idle   : 20000,
    acquire: 20000,
  },
});

function sortResult (result, longId) {
  let claimIndex;
  let shortId = longId.substring(0, 1); // default sort id is the first letter
  let shortIdLength = 0;
  // find the index of this certificate
  claimIndex = result.findIndex(element => {
    return element.claimId === longId;
  });
  if (claimIndex < 0) { throw new Error('claimid not found in possible sorted list') }
  // get an array of all certificates with lower height
  let possibleMatches = result.slice(0, claimIndex);
  // remove certificates with the same prefixes until none are left.
  while (possibleMatches.length > 0) {
    shortIdLength += 1;
    shortId = longId.substring(0, shortIdLength);
    possibleMatches = possibleMatches.filter(element => {
      return (element.claimId.substring(0, shortIdLength) === shortId);
    });
  }
  // return the short Id
  logger.debug('short channel id ===', shortId);
  return shortId;
}

function getLongClaimIdFromShortClaimId (name, shortId) {
  return new Promise((resolve, reject) => {
    db
      .sequelize.query(`SELECT claimId FROM Claim WHERE name = '${name}' AND claimId LIKE '${shortId}%' ORDER BY height ASC LIMIT 1;`, { type: db.sequelize.QueryTypes.SELECT })
      .then(result => {
        switch (result.length) {
          case 0:
            return reject(new Error('That is an invalid Short Claim Id'));
          default: // note results must be sorted
            return resolve(result[0].claimId);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function getTopFreeClaimIdByClaimName (name) {
  return new Promise((resolve, reject) => {
    db
      .sequelize.query(`SELECT claimId FROM Claim WHERE name = '${name}' ORDER BY amount DESC, height ASC LIMIT 1`, { type: db.sequelize.QueryTypes.SELECT })
      .then(result => {
        switch (result.length) {
          case 0:
            return resolve(null);
          default:
            return resolve(result[0].claimId);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

function getLongChannelIdFromShortChannelId (channelName, channelId) {
  return new Promise((resolve, reject) => {
    db
      .sequelize.query(`SELECT claimId, height FROM Certificate WHERE name = '${channelName}' AND claimId LIKE '${channelId}%' ORDER BY height ASC LIMIT 1;`, { type: db.sequelize.QueryTypes.SELECT })
      .then(result => {
        switch (result.length) {
          case 0:
            throw new Error('That is an invalid Short Channel Id');
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
  return new Promise((resolve, reject) => {
    db
      .sequelize.query(`SELECT claimId, amount, height FROM Certificate WHERE name = '${channelName}' ORDER BY amount DESC, height ASC LIMIT 1;`, { type: db.sequelize.QueryTypes.SELECT })
      .then(result => {
        switch (result.length) {
          case 0:
            throw new Error('That is an invalid Channel Name');
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

db['getShortClaimIdFromLongClaimId'] = (claimId, claimName) => {
  return new Promise((resolve, reject) => {
    logger.debug('finding short channel id');
    db
      .sequelize.query(`SELECT claimId, height FROM Claim WHERE name = '${claimName}' ORDER BY height;`, { type: db.sequelize.QueryTypes.SELECT })
      .then(result => {
        switch (result.length) {
          case 0:
            return reject(new Error('That is an invalid claim name'));
          default:
            return resolve(sortResult(result, claimId));
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

db['getShortChannelIdFromLongChannelId'] = (channelName, longChannelId) => {
  return new Promise((resolve, reject) => {
    logger.debug('finding short channel id');
    db
      .sequelize.query(`SELECT claimId, height FROM Certificate WHERE name = '${channelName}' ORDER BY height;`, { type: db.sequelize.QueryTypes.SELECT })
      .then(result => {
        switch (result.length) {
          case 0:
            return reject(new Error('That is an invalid channel name'));
          default:
            return resolve(sortResult(result, longChannelId));
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

db['getAllFreeClaims'] = (name) => {
  return new Promise((resolve, reject) => {
    db
      .sequelize.query(`SELECT name, claimId, outpoint, height, address FROM Claim WHERE name = '${name}' ORDER BY amount DESC, height ASC`, { type: db.sequelize.QueryTypes.SELECT })
      .then(result => {
        switch (result.length) {
          case 0:
            return resolve(null);
          default:
            return resolve(result);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

db['resolveClaim'] = (name, claimId) => {
  return new Promise((resolve, reject) => {
    db
      .sequelize.query(`SELECT name, claimId, outpoint, height, address, title, description FROM Claim WHERE name = '${name}' AND claimId = '${claimId}'`, { type: db.sequelize.QueryTypes.SELECT })
      .then(result => {
        switch (result.length) {
          case 0:
            return resolve(null);
          case 1:
            return resolve(result[0]);
          default:
            return new Error('more than one entry matches that name and claimID');
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

db['getClaimIdByLongChannelId'] = (channelId, claimName) => {
  return new Promise((resolve, reject) => {
    logger.debug(`finding claim id for claim "${claimName}" from channel "${channelId}"`);
    db
      .sequelize.query(`SELECT claimId FROM Claim WHERE name = '${claimName}' AND certificateId = '${channelId}' LIMIT 1;`, { type: db.sequelize.QueryTypes.SELECT })
      .then(result => {
        switch (result.length) {
          case 0:
            return reject(new Error('There is no such claim for that channel'));
          default:
            return resolve(result[0].claimId);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

db['getAllChannelClaims'] = (channelId) => {
  return new Promise((resolve, reject) => {
    logger.debug(`finding all claims in channel "${channelId}"`);
    db
      .sequelize.query(`SELECT name, claimId, outpoint, height, address, contentType, title, description, license, thumbnail FROM Claim WHERE certificateId = '${channelId}' ORDeR BY height DESC;`, { type: db.sequelize.QueryTypes.SELECT })
      .then(result => {
        switch (result.length) {
          case 0:
            return resolve(null);
          default:
            return resolve(result);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

db['getLongClaimId'] = (claimName, claimId) => {
  if (claimId && (claimId.length === 40)) {
    return new Promise((resolve, reject) => resolve(claimId));
  } else if (claimId && claimId.length < 40) {
    return getLongClaimIdFromShortClaimId(claimName, claimId);  // need to create this function
  } else {  // if no claim id provided
    return getTopFreeClaimIdByClaimName(claimName);
  }
};

db['getLongChannelId'] = (channelName, channelId) => {
  if (channelId && (channelId.length === 40)) {  // full channel id
    return new Promise((resolve, reject) => resolve(channelId));
  } else if (channelId && channelId.length < 40) {  // short channel id
    return getLongChannelIdFromShortChannelId(channelName, channelId);
  } else {
    return getLongChannelIdFromChannelName(channelName);
  }
};

module.exports = db;
