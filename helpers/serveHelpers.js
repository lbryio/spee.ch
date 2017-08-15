const logger = require('winston');
const db = require('../models');

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
      db.sequelize.query(`SELECT claimId FROM Claim WHERE name = '${name}' AND claimId LIKE '${shortId}%' ORDER BY height ASC LIMIT 1;`)
      .then(result => {
        switch (result.length) {
          case 0:
            return reject(new Error('That is an invalid Short Id'));
          default: // note results must be sorted
            return resolve(result[0].datavalues.claimId);
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
      db.sequelize.query(`SELECT claimId, height FROM Claim WHERE name = '${name}' ORDER BY claimId;`)
      .then(result => {
        switch (result.length) {
          case 0:
            return reject(new Error('That is an invalid Claim Id'));
          default: // note results must be sorted
            const resultsArray = result.map(claim => {
              return claim.dataValues;
            });
            const shortId = determineShortClaimId(claimId, height, resultsArray);
            logger.debug('short claim id ===', shortId);
            return resolve(shortId);
        }
      })
      .catch(error => {
        reject(error);
      });
    });
  },
  getAllFreeClaims (claimName) {
    return new Promise((resolve, reject) => {
      db.sequelize.query(`SELECT * FROM Claim WHERE name = '${claimName}' ORDER BY amount DESC, height ASC`)
      .then(result => {
        if (result.length === 0) {
          logger.debug('exiting due to lack of claims');
          return resolve(null);
        }
        const claims = result.map(claim => {
          return claim.dataValues;
        });
        return resolve(claims);
      })
      .catch(error => {
        reject(error);
      });
    });
  },
  getTopFreeClaim (claimName) {
    return new Promise((resolve, reject) => {
      db.sequelize.query(`SELECT * FROM Claim WHERE name = '${claimName}' ORDER BY amount DESC, height ASC LIMIT 1`)
      .then(result => {
        if (result.length === 0) {
          return resolve(null);
        }
        return resolve(result[0].dataValues);
      })
      .catch(error => {
        reject(error);
      });
    });
  },
};
