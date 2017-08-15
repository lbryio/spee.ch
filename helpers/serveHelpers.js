const logger = require('winston');
const db = require('../models');
const lbryApi = require('./lbryApi');

function determineShortClaimId (claimId, height, claimList) {
  logger.debug('determining short url based on claim id and claim list');
  logger.debug('claimlist starting length:', claimList.length);
  // remove this claim from the claim list, if it exists
  claimList = claimList.filter(claim => {
    return claim.claim_id !== claimId;
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
        const otherClaimIdSegmentToCompare = claim.claim_id.substring(0, i);
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
      return (claim.claim_id.substring(0, lastMatchIndex) === lastMatch);
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

function checkLocalDbForClaims (name, shortId) {
  return db.File
    .findAll({
      where: {
        name,
        claimId: { $like: `${shortId}%` },
      },
    })
    .then(records => {
      logger.debug('number of local search results:', records.length);
      if (records.length === 0) {
        return records;
      }
      const localClaims = records.map(record => {  // format the data to match what lbry daemon would have returned
        return { name: record.dataValues.name, claim_id: record.dataValues.claimId, height: record.dataValues.height };
      });
      return localClaims;
    })
    .catch(error => {
      return error;
    });
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
      lbryApi.getClaimList(name)
      .then(({ claims }) => {
        logger.debug('Number of claims from getClaimList:', claims.length);
        // if no claims were found, check locally for possible claims
        if (claims.length === 0) {
          return checkLocalDbForClaims(name, shortId);
        } else {
          return claims;
        }
      })
      // handle the claims list
      .then(claims => {
        logger.debug('Claims ready for filtering');
        const regex = new RegExp(`^${shortId}`);
        const filteredClaimsList = claims.filter(claim => {
          return regex.test(claim.claim_id);
        });
        switch (filteredClaimsList.length) {
          case 0:
            reject(new Error('That is an invalid short url'));
            break;
          case 1:
            resolve(filteredClaimsList[0].claim_id);
            break;
          default:
            const sortedClaimsList = filteredClaimsList.sort((a, b) => {
              return a.height > b.height;
            });
            resolve(sortedClaimsList[0].claim_id);
            break;
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
      // get a list of all the claims
      lbryApi.getClaimList(name)
      // find the smallest possible unique url for this claim
      .then(({ claims }) => {
        const shortId = determineShortClaimId(claimId, height, claims);
        logger.debug('short claim id ===', shortId);
        resolve(shortId);
      })
      .catch(error => {
        reject(error);
      });
    });
  },
};
