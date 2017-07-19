const logger = require('winston');
// const db = require('../../models');
const { getClaimsList } = require('./lbryApi');

function determineShortUrl (claimId, claimList) {
  let shortUrl = claimId.substring(0, 1);
  let i = 1;
  claimList = claimList.filter(claim => {  // filter out this exact claim id
    return claim.claim_id !== claimId;
  });
  while (claimList.length !== 0) {  // filter out matching claims until none or left
    shortUrl = claimId.substring(0, i);
    claimList = claimList.filter(claim => {
      return (claim.claim_id.substring(0, i) === shortUrl);
    });
    i++;
  }
  return (shortUrl);
}

function getClaimIdByShortUrl (name, shortUrl) {
  const deferred = new Promise((resolve, reject) => {
    getClaimsList(name)
    .then(({ claims }) => {
      const regex = new RegExp(`^${shortUrl}`);
      logger.debug('regex:', regex);
      const filteredClaimsList = claims.filter(claim => {
        return regex.test(claim.claim_id);
      });
      logger.debug('filtered claims list', filteredClaimsList);
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
  return deferred;
}

function getShortUrlByClaimId (name, claimId) {
  const deferred = new Promise((resolve, reject) => {
    // get a list of all the claims
    getClaimsList(name)
    // find the smallest possible unique url for this claim
    .then(({ claims }) => {
      const shortUrl = determineShortUrl(claimId, claims);
      resolve(shortUrl);
    })
    .catch(error => {
      reject(error);
    });
  });
  return deferred;
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
        break;
      case 'image/gif':
        break;
      case 'image/png':
        break;
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
  getClaimIdandShortUrl (name, url) {
    const deferred = new Promise((resolve, reject) => {
      let claimId;
      let shortUrl;
      logger.debug('claim url length:', url.length);
      // if claim id is full 40 chars, retrieve the shortest possible url
      if (url.length === 40) {
        getShortUrlByClaimId(name, url)
          .then(result => {
            claimId = url;
            shortUrl = result;
            resolve({ claimId, shortUrl });
          })
          .catch(error => {
            reject(error);
          });
      // if the claim id is shorter than 40, retrieve the full claim id & shortest possible url
      } else if (url.length < 40) {
        getClaimIdByShortUrl(name, url)
          .then(result => {
            claimId = result;
            resolve({claimId, shortUrl: url});
          })
          .catch(error => {
            reject(error);
          });
      } else {
        reject(new Error('That Claim Id is not valid.'));
      }
    });
    return deferred;
  },
  determineShortUrl (claimId, claimList) {
    return determineShortUrl(claimId, claimList);
  },
};
