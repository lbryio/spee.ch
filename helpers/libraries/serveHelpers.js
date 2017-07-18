const logger = require('winston');
// const db = require('../../models');
const { getClaimsList } = require('./lbryApi');

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
  validateClaimId (name, claimId) {
    const deferred = new Promise((resolve, reject) => {
      logger.debug('claim id length:', claimId.length);
      // see if claim id is the full 40 characters
      if (claimId.length === 40) {
        logger.debug('Full 40-character claim id was provided.');
        resolve(claimId);
      // if the claim id is shorter than 40, check the db for the full claim id
      } else if (claimId.length < 40) {
        getClaimsList(name)
          .then(({ claims }) => {
            const regex = new RegExp(`^${claimId}`);
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
        // logger.debug(`Finding claim id for "${name}" "${claimId}"`);
        // db.File
        //   .find({
        //     where: {
        //       name,
        //       claimId: { $like: `${claimId}%` },
        //     },
        //   })
        //   .then(file => {
        //     // if no results were found, throw an error
        //     if (!file) {
        //       reject(new Error('That is not a valid short URL.'));
        //     }
        //     // if a result was found, resolve with the full claim id
        //     logger.debug('Full claim id:', file.dataValues.claimId);
        //     resolve(file.dataValues.claimId);
        //   })
        //   .catch(error => {
        //     reject(error);
        //   });
      } else {
        logger.error('The Claim Id was larger than 40 characters');
        reject(new Error('That Claim Id is not valid.'));
      }
    });
    return deferred;
  },
};
