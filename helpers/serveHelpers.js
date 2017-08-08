const logger = require('winston');
const db = require('../models');
const lbryApi = require('./lbryApi');

function determineShortUrl (claimId, height, claimList) {
  logger.debug('determining short url based on claim id and claim list');
  // remove this claim from the claim list, if it exists
  claimList = claimList.filter(claim => {
    return claim.claim_id !== claimId;
  });
  logger.debug('claim list length:', claimList.length);
  // if there are no other claims, return the first letter of the claim id
  if (claimList.length === 0) {
    return claimId.substring(0, 1);
  // otherwise determine the proper url
  } else {
    let i = 0;
    const claimListCopy = claimList;
    while (claimList.length !== 0) {  // filter out matching claims
      i++;
      claimList = claimList.filter(claim => {
        return (claim.claim_id.substring(0, i) === claimId.substring(0, i));
      });
    }
    i -= 1;
    const lastMatch = claimId.substring(0, i);

    const matchingClaims = claimListCopy.filter(claim => {
      return (claim.claim_id.substring(0, i) === lastMatch);
    });
    for (let j = 0; j < matchingClaims.length; j++) {
      if (matchingClaims[j].height < height) {
        return claimId.substring(0, i + 1);
      }
    }
    return claimId.substring(0, i);
  }
}

function checkLocalDbForClaims (name, shortUrl) {
  return db.File
    .findAll({
      where: {
        name,
        claimId: { $like: `${shortUrl}%` },
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
  getClaimIdFromShortUrl (shortUrl, name) {
    return new Promise((resolve, reject) => {
      logger.debug('getting claim_id from short url');
      // use the daemon to check for claims list
      lbryApi.getClaimsList(name)
      .then(({ claims }) => {
        logger.debug('Number of claims from getClaimsList:', claims.length);
        // if no claims were found, check locally for possible claims
        if (claims.length === 0) {
          return checkLocalDbForClaims(name, shortUrl);
        } else {
          return claims;
        }
      })
      // handle the claims list
      .then(claims => {
        logger.debug('Claims ready for filtering');
        const regex = new RegExp(`^${shortUrl}`);
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
  getShortUrlFromClaimId (claimId, height, name) {
    return new Promise((resolve, reject) => {
      logger.debug('finding short url from claim_id');
      // get a list of all the claims
      lbryApi.getClaimsList(name)
      // find the smallest possible unique url for this claim
      .then(({ claims }) => {
        const shortUrl = determineShortUrl(claimId, height, claims);
        resolve(shortUrl);
      })
      .catch(error => {
        reject(error);
      });
    });
  },
};
