const logger = require('winston');
const db = require('../../models');
const lbryApi = require('./lbryApi');

function determineShortUrl (claimId, claimList) {
  logger.debug('determining short url based on claim id and claim list');
  const thisClaim = claimList.filter(claim => {  // find this claim in the list & store it
    return claim.claim_id === claimId;
  })[0];
  claimList = claimList.filter(claim => {  // remove this claim from the claim list
    return claim.claim_id !== claimId;
  });
  if (claimList.length === 0) {  // if there are no other claims, return the first letter of the claim id
    return claimId.substring(0, 1);
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
      if (matchingClaims[j].height < thisClaim.height) {
        return claimId.substring(0, i + 1);
      }
    }
    return claimId.substring(0, i);
  }
}

function getClaimAndUpdate (uri, address, height) {
  // 1. get the claim
  lbryApi
    .getClaim(uri)
    .then(({ name, claim_id, outpoint, file_name, download_path, mime_type, metadata }) => {
      logger.debug(' Get returned outpoint: ', outpoint);
      // 2. update the entry in db
      db.File
        .update({
          outpoint,
          height, // note: height is coming from the 'resolve', not 'get'.
          address,  // note: address is coming from the 'resolve', not 'get'.
          fileName: file_name,
          filePath: download_path,
          fileType: mime_type,
          nsfw    : metadata.stream.metadata.nsfw,
        }, {
          where: {
            name,
            claimId: claim_id,
          },
        })
        .then(result => {
          logger.debug('successfully updated mysql record', result);
        })
        .catch(error => {
          logger.error('sequelize error', error);
        });
    })
    .catch(error => {
      logger.error(`error while getting claim for ${uri} >> `, error);
    });
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
  getClaimIdByShortUrl (name, shortUrl) {
    const deferred = new Promise((resolve, reject) => {
      lbryApi.getClaimsList(name)
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
  },
  getShortUrlByClaimId (name, claimId) {
    const deferred = new Promise((resolve, reject) => {
      // get a list of all the claims
      lbryApi.getClaimsList(name)
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
  },
  determineShortUrl (claimId, claimList) {
    return determineShortUrl(claimId, claimList);
  },
  updateFileIfNeeded (uri, localOutpoint, localHeight) {
    logger.debug(`Initiating resolve to check outpoint for ${uri}`);
    // 1. resolve claim
    lbryApi
      .resolveUri(uri)
      .then(result => {
        // check to make sure the result is a claim
        if (!result.claim) {
          logger.debug('resolve did not return a claim');
          return;
        }
        // logger.debug('resolved result:', result);
        const resolvedOutpoint = `${result.claim.txid}:${result.claim.nout}`;
        const resolvedHeight = result.claim.height;
        const resolvedAddress = result.claim.address;
        logger.debug('database outpoint:', localOutpoint);
        logger.debug('resolved outpoint:', resolvedOutpoint);
        // 2. if the outpoint's match, no further work needed
        if (localOutpoint === resolvedOutpoint) {
          logger.debug('local outpoint matched');
        // 2. if the outpoints don't match, check the height
        } else if (localHeight > resolvedHeight) {
          logger.debug('local height was greater than resolved height');
        // 2. get the resolved claim
        } else {
          logger.debug(`local outpoint did not match for ${uri}.  Initiating update.`);
          getClaimAndUpdate(uri, resolvedAddress, resolvedHeight);
        }
      })
      .catch(error => {
        logger.error(error);
      });
  },
  getClaimAndHandleResponse (uri, address, height, resolve, reject) {
    lbryApi
      .getClaim(uri)
      .then(({ name, claim_id, outpoint, file_name, download_path, mime_type, metadata }) => {
        // create entry in the db
        logger.silly(`creating "${name}" record in File db`);
        db.File
          .create({
            name,
            claimId : claim_id,
            address,  // note: comes from parent 'resolve,' not this 'get' call
            outpoint,
            height, // note: comes from parent 'resolve,' not this 'get' call
            fileName: file_name,
            filePath: download_path,
            fileType: mime_type,
            nsfw    : metadata.stream.metadata.nsfw,
          })
          .then(result => {
            logger.debug('successfully created mysql record');
          })
          .catch(error => {
            logger.error('sequelize create error', error);
          });
        // resolve the request
        resolve({
          name,
          claimId : claim_id,
          fileName: file_name,
          filePath: download_path,
          fileType: mime_type,
        });
      })
      .catch(error => {
        reject(error);
      });
  },
  getClaimAndReturnResponse (uri, address, height) {
    const deferred = new Promise((resolve, reject) => {
      lbryApi
        .getClaim(uri)
        .then(({ name, claim_id, outpoint, file_name, download_path, mime_type, metadata }) => {
          // create entry in the db
          logger.silly(`Creating new File record`);
          db.File
            .create({
              name,
              claimId : claim_id,
              address,  // note: passed as an arguent, not from this 'get' call
              outpoint,
              height, // note: passed as an arguent, not from this 'get' call
              fileName: file_name,
              filePath: download_path,
              fileType: mime_type,
              nsfw    : metadata.stream.metadata.nsfw,
            })
            .then(result => {
              logger.debug('Successfully created File record');
              resolve(result); // note: result.dataValues ?
            })
            .catch(error => {
              logger.debug('db.File.create error');
              reject(error);
            });
        })
        .catch(error => {
          logger.debug('lbryApi.getClaim error');
          reject(error);
        });
    });
    return deferred;
  },
};
