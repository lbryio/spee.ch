const logger = require('winston');
const db = require('../models');

function createOpenGraphInfo ({ fileType, claimId, name, fileName, fileExt }) {
  return {
    embedUrl     : `https://spee.ch/embed/${claimId}/${name}`,
    showUrl      : `https://spee.ch/${claimId}/${name}`,
    source       : `https://spee.ch/${claimId}/${name}${fileExt}`,
    directFileUrl: `https://spee.ch/media/${fileName}`,
  };
}

function getLongChannelIdFromShortChannelId (channelName, channelId) {
  return new Promise((resolve, reject) => {
    logger.debug(`finding long channel id for ${channelName}:${channelId}`);
    // get the long channel Id
    db.sequelize.query(`SELECT claimId, height FROM Certificate WHERE name = '${channelName}' AND claimId LIKE '${channelId}%' ORDER BY height ASC LIMIT 1;`, { type: db.sequelize.QueryTypes.SELECT })
    .then(result => {
      logger.debug('result >>', result);
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
  // select the top top channel id
  return new Promise((resolve, reject) => {
    logger.debug(`finding long channel id for ${channelName}`);
    // get the long channel Id
    db.sequelize.query(`SELECT claimId, amount, height FROM Certificate WHERE name = '${channelName}' ORDER BY amount DESC, height ASC LIMIT 1;`, { type: db.sequelize.QueryTypes.SELECT })
    .then(result => {
      logger.debug('result >>', result);
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

function getLongClaimIdFromShortClaimId (name, shortId) {
  return new Promise((resolve, reject) => {
    logger.debug('getting claim_id from short url');
    // use the daemon to check for claims list
    db.sequelize.query(`SELECT claimId FROM Claim WHERE name = '${name}' AND claimId LIKE '${shortId}%' ORDER BY height ASC LIMIT 1;`, { type: db.sequelize.QueryTypes.SELECT })
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
    db.sequelize.query(`SELECT claimId FROM Claim WHERE name = '${name}' ORDER BY amount DESC, height ASC LIMIT 1`, { type: db.sequelize.QueryTypes.SELECT })
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

module.exports = {
  serveFile ({ fileName, fileType, filePath }, res) {
    logger.info(`serving file ${fileName}`);
    // set default options
    let options = {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'Content-Type'          : fileType,
      },
    };
    // adjust default options as needed
    switch (fileType) {
      case 'image/jpeg':
      case 'image/gif':
      case 'image/png':
      case 'video/mp4':
        break;
      default:
        logger.warn('sending file with unknown type as .jpeg');
        options['headers']['Content-Type'] = 'image/jpeg';
        break;
    }
    // send the file
    res.status(200).sendFile(filePath, options);
  },
  showFile (fileInfo, res) {
    const openGraphInfo = createOpenGraphInfo(fileInfo);
    res.status(200).render('show', { layout: 'show', fileInfo, openGraphInfo });
  },
  showFileLite (fileInfo, res) {
    const openGraphInfo = createOpenGraphInfo(fileInfo);
    res.status(200).render('showLite', { layout: 'show', fileInfo, openGraphInfo });
  },
  getLongClaimId (claimName, claimId) {  // read the various inputs and decide how to return the long claim id
    if (claimId && (claimId.length === 40)) {
      return new Promise((resolve, reject) => resolve(claimId));
    } else if (claimId && claimId.length < 40) {
      return getLongClaimIdFromShortClaimId(claimName, claimId);  // need to create this function
    } else {  // if no claim id provided
      return getTopFreeClaimIdByClaimName(claimName);
    }
  },
  getShortClaimIdFromLongClaimId (claimId, claimName) {
    return new Promise((resolve, reject) => {
      logger.debug('finding short channel id');
      db.sequelize.query(`SELECT claimId, height FROM Claim WHERE name = '${claimName}' ORDER BY height;`, { type: db.sequelize.QueryTypes.SELECT })
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
  },
  getAllFreeClaims (name) {
    return new Promise((resolve, reject) => {
      db.sequelize.query(`SELECT * FROM Claim WHERE name = '${name}' ORDER BY amount DESC, height ASC`, { type: db.sequelize.QueryTypes.SELECT })
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
  },
  resolveAgainstClaimTable (name, claimId) {
    return new Promise((resolve, reject) => {
      db.sequelize.query(`SELECT * FROM Claim WHERE name = '${name}' AND claimId = '${claimId}'`, { type: db.sequelize.QueryTypes.SELECT })
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
  },
  getClaimIdByLongChannelId (channelId, claimName) {
    return new Promise((resolve, reject) => {
      logger.debug(`finding claim id for claim "${claimName}" from channel "${channelId}"`);
      db.sequelize.query(`SELECT claimId FROM Claim WHERE name = '${claimName}' AND certificateId = '${channelId}' LIMIT 1;`, { type: db.sequelize.QueryTypes.SELECT })
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
  },
  getAllChannelClaims (channelId) {
    return new Promise((resolve, reject) => {
      logger.debug(`finding all claims in channel "${channelId}"`);
      db.sequelize.query(`SELECT * FROM Claim WHERE certificateId = '${channelId}' ORDeR BY height DESC;`, { type: db.sequelize.QueryTypes.SELECT })
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
  },
  getLongChannelId (channelName, channelId) {
    if (channelId && (channelId.length === 40)) {  // full channel id
      return new Promise((resolve, reject) => resolve(channelId));
    } else if (channelId && channelId.length < 40) {  // short channel id
      return getLongChannelIdFromShortChannelId(channelName, channelId);
    } else {
      return getLongChannelIdFromChannelName(channelName);
    }
  },
  getShortChannelIdFromLongChannelId (channelName, longChannelId) {
    return new Promise((resolve, reject) => {
      logger.debug('finding short channel id');
      db.sequelize.query(`SELECT claimId, height FROM Certificate WHERE name = '${channelName}' ORDER BY height;`, { type: db.sequelize.QueryTypes.SELECT })
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
  },
};
