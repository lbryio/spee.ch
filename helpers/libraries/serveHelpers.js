const logger = require('winston');
const db = require('../../models');

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
      // make sure the claim id is 40 characters
      if (claimId.length === 40) {
        logger.debug('Claim Id length is valid.');
        resolve(claimId);
      // if the claim id is shorter than 40, check the db for the full claim id
      } else if (claimId.length === 1) {
        logger.debug(`Finding claim id for "${name}" "${claimId}"`);
        db.File
          .findOne({
            where: {
              name,
              claimId: { $like: `${claimId}%` },
            },
          })
          .then(file => {
            // if no results were found, throw an error
            if (!file) {
              reject(new Error('That is not a valid short URL.'));
            }
            // if a result was found, resolve with the full claim id
            logger.debug('Full claim id:', file.dataValues.claimId);
            resolve(file.dataValues.claimId);
          })
          .catch(error => {
            reject(error);
          });
      } else {
        logger.error('The Claim Id was neither 40 nor 1 character in length');
        reject(new Error('That Claim Id is not valid.'));
      }
    });
    return deferred;
  },
};
