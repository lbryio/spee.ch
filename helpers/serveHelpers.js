const logger = require('winston');
const db = require('../models');

// function determineShortChannelId (name, longChannelId) {
//   return new Promise((resolve, reject) => {
//     logger.debug('finding short channel id');
//     db.sequelize.query(`SELECT claimId, height FROM Certificate WHERE name = '${name}' ORDER BY height;`, { type: db.sequelize.QueryTypes.SELECT })
//     .then(result => {
//       switch (result.length) {
//         case 0:
//           return reject(new Error('That is an invalid channel name'));
//         default:
//           let certificateIndex;
//           let shortId = longChannelId.substring(0, 1); // default sort id is the first letter
//           let shortIdLength = 0;
//           // find the index of this certificate
//           certificateIndex = result.findIndex(element => {
//             return element.claimId === longChannelId;
//           });
//           if (certificateIndex < 0) { throw new Error('claimid not found in possible sorted list') }
//           // get an array of all certificates with lower height
//           let possibleMatches = result.slice(0, certificateIndex);
//           // remove certificates with the same prefixes until none are left.
//           while (possibleMatches.length > 0) {
//             shortIdLength += 1;
//             shortId = longChannelId.substring(0, shortIdLength);
//             possibleMatches = possibleMatches.filter(element => {
//               return (element.claimId.substring(0, shortIdLength) === shortId);
//             });
//           }
//           // return the short Id
//           logger.debug('short claim id ===', shortId);
//           return resolve(shortId);
//       }
//     })
//     .catch(error => {
//       reject(error);
//     });
//   });
// }

function getLongChannelId (channelName, channelId) {
  if (channelId && (channelId.length === 40)) {  // full channel id
    return new Promise((resolve, reject) => resolve(channelId));
  } else if (channelId && channelId.length < 40) {  // short channel id
    return getLongChannelIdFromShortChannelId(channelName, channelId);
  } else {
    return getLongChannelIdFromChannelName(channelName);
  }
};

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

function getClaimIdByLongChannelId (channelId, claimName) {
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
}

function determineShortClaimId (claimId, height, claimList) {
  logger.debug('determining short url based on claim id and claim list');
  logger.debug('claimlist starting length:', claimList.length);
  // remove this claim from the claim list, if it exists
  claimList = claimList.filter(claim => {
    return claim.claimId !== claimId;
  });
  logger.debug('claim list length without this claim:', claimList.length);
  // If there are no other claims, return the first letter of the claim id...
  if (claimList.length === 0) {
    return claimId.substring(0, 1);
  // ...otherwise determine the proper short id.
  } else {
    const claimListCopy = claimList;
    let i = 0;
    // find the longest shared prefix (there is a better way to do this that filters, checks next filter, then filters (i.e. combine this step and next))
    while (claimList.length !== 0) {
      i++;
      claimList = claimList.filter(claim => {
        const otherClaimIdSegmentToCompare = claim.claimId.substring(0, i);
        const thisClaimIdSegmentToCompare = claimId.substring(0, i);
        logger.debug('compare:', otherClaimIdSegmentToCompare, '===', thisClaimIdSegmentToCompare, '?');
        return (otherClaimIdSegmentToCompare === thisClaimIdSegmentToCompare);
      });
    }
    // use that longest shared prefix to get only those competing claims
    const lastMatchIndex = i - 1;
    const lastMatch = claimId.substring(0, lastMatchIndex);
    logger.debug('last match index:', lastMatchIndex, 'last match:', lastMatch);
    if (lastMatchIndex === 0) { // if no other claims share a prefix, return with first letter.
      return claimId.substring(0, 1);
    }
    const allMatchingClaimsAtLastMatch = claimListCopy.filter(claim => {
      return (claim.claimId.substring(0, lastMatchIndex) === lastMatch);
    });
    // for those that share the longest shared prefix: see which came first in time. whichever is earliest, the others take the extra character
    const sortedMatchingClaims = allMatchingClaimsAtLastMatch.sort((a, b) => {
      return (a.height < b.height);
    });
    // compare to the earliest one, if it is earlier, this claim takes the extra character
    if (sortedMatchingClaims[0].height < height) {
      return claimId.substring(0, lastMatchIndex + 1);
    }
    return claimId.substring(0, lastMatchIndex);
  }
}

function createOpenGraphInfo ({ fileType, claimId, name, fileName, fileExt }) {
  return {
    embedUrl     : `https://spee.ch/embed/${claimId}/${name}`,
    showUrl      : `https://spee.ch/${claimId}/${name}`,
    source       : `https://spee.ch/${claimId}/${name}${fileExt}`,
    directFileUrl: `https://spee.ch/media/${fileName}`,
  };
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
  getFullClaimIdFromShortId (shortId, name) {
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
  },
  getShortIdFromClaimId (claimId, height, name) {
    return new Promise((resolve, reject) => {
      logger.debug('finding short claim id from full claim id');
      db.sequelize.query(`SELECT claimId, height FROM Claim WHERE name = '${name}' ORDER BY claimId;`, { type: db.sequelize.QueryTypes.SELECT })
      .then(result => {
        switch (result.length) {
          case 0:
            return reject(new Error('That is an invalid claim name'));
          default: // note results must be sorted
            const shortId = determineShortClaimId(claimId, height, result);
            logger.debug('short claim id ===', shortId);
            return resolve(shortId);
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
  getTopFreeClaim (name) {
    return new Promise((resolve, reject) => {
      db.sequelize.query(`SELECT * FROM Claim WHERE name = '${name}' ORDER BY amount DESC, height ASC LIMIT 1`, { type: db.sequelize.QueryTypes.SELECT })
      .then(result => {
        switch (result.length) {
          case 0:
            return resolve(null);
          default:
            return resolve(result[0]);
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
  getClaimIdByChannel (channelName, channelId, claimName) {
    return new Promise((resolve, reject) => {
      // 1. get the long channel id
      getLongChannelId(channelName, channelId)
      // 2. get the claim Id
      .then(longChannelId => {
        return getClaimIdByLongChannelId(longChannelId, claimName);
      })
      .then(claimId => {
        return resolve(claimId);
      })
      .catch(error => {
        reject(error);
      });
    });
  },
};
