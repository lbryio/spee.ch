const logger = require('winston');
const fs = require('fs');
const db = require('../models');
const config = require('../config/speechConfig.js');

module.exports = {
  validateApiPublishRequest (body, files) {
    if (!body) {
      throw new Error('no body found in request');
    }
    if (!body.name) {
      throw new Error('no name field found in request');
    }
    if (!files) {
      throw new Error('no files found in request');
    }
    if (!files.file) {
      throw new Error('no file with key of [file] found in request');
    }
  },
  validatePublishSubmission (file, claimName) {
    try {
      module.exports.validateFile(file);
      module.exports.validateClaimName(claimName);
    } catch (error) {
      throw error;
    }
  },
  validateFile (file) {
    if (!file) {
      logger.debug('publish > file validation > no file found');
      throw new Error('no file provided');
    }
    // check the file name
    if (/'/.test(file.name)) {
      logger.debug('publish > file validation > file name had apostrophe in it');
      throw new Error('apostrophes are not allowed in the file name');
    }
    // check file type and size
    switch (file.type) {
      case 'image/jpeg':
      case 'image/jpg':
      case 'image/png':
        if (file.size > 10000000) {
          logger.debug('publish > file validation > .jpeg/.jpg/.png was too big');
          throw new Error('Sorry, images are limited to 10 megabytes.');
        }
        break;
      case 'image/gif':
        if (file.size > 50000000) {
          logger.debug('publish > file validation > .gif was too big');
          throw new Error('Sorry, .gifs are limited to 50 megabytes.');
        }
        break;
      case 'video/mp4':
        if (file.size > 50000000) {
          logger.debug('publish > file validation > .mp4 was too big');
          throw new Error('Sorry, videos are limited to 50 megabytes.');
        }
        break;
      default:
        logger.debug('publish > file validation > unrecognized file type');
        throw new Error('The ' + file.type + ' content type is not supported.  Only, .jpeg, .png, .gif, and .mp4 files are currently supported.');
    }
    return file;
  },
  validateClaimName (claimName) {
    const invalidCharacters = /[^A-Za-z0-9,-]/.exec(claimName);
    if (invalidCharacters) {
      throw new Error('The claim name you provided is not allowed.  Only the following characters are allowed: A-Z, a-z, 0-9, and "-"');
    }
  },
  validateLicense (license) {
    if ((license.indexOf('Public Domain') === -1) && (license.indexOf('Creative Commons') === -1)) {
      throw new Error('Only posts with a "Public Domain" or "Creative Commons" license are eligible for publishing through spee.ch');
    }
  },
  cleanseChannelName (channelName) {
    if (channelName) {
      if (channelName.indexOf('@') !== 0) {
        channelName = `@${channelName}`;
      }
    }
    return channelName;
  },
  createPublishParams (filePath, name, title, description, license, nsfw, thumbnail, channelName) {
    logger.debug(`Creating Publish Parameters`);
    // provide defaults for title
    if (title === null || title.trim() === '') {
      title = name;
    }
    // provide default for description
    if (description === null || description.trim() === '') {
      description = '';
    }
    // provide default for license
    if (license === null || license.trim() === '') {
      license = ' ';  // default to empty string
    }
    // create the publish params
    const publishParams = {
      name,
      file_path: filePath,
      bid      : 0.01,
      metadata : {
        description,
        title,
        author  : 'spee.ch',
        language: 'en',
        license,
        nsfw,
      },
      claim_address: config.wallet.lbryClaimAddress,
    };
    // add thumbnail to channel if video
    if (thumbnail !== null) {
      publishParams['metadata']['thumbnail'] = thumbnail;
    }
    // add channel to params, if applicable
    if (channelName) {
      publishParams['channel_name'] = channelName;
    }
    return publishParams;
  },
  deleteTemporaryFile (filePath) {
    fs.unlink(filePath, err => {
      if (err) {
        logger.error(`error deleting temporary file ${filePath}`);
        throw err;
      }
      logger.debug(`successfully deleted ${filePath}`);
    });
  },
  checkClaimNameAvailability (name) {
    return new Promise((resolve, reject) => {
      // find any records where the name is used
      db.File.findAll({ where: { name } })
      .then(result => {
        if (result.length >= 1) {
          const claimAddress = config.wallet.lbryClaimAddress;
          // filter out any results that were not published from spee.ch's wallet address
          const filteredResult = result.filter((claim) => {
            return (claim.address === claimAddress);
          });
          // return based on whether any non-spee.ch claims were left
          if (filteredResult.length >= 1) {
            resolve(false);
          } else {
            resolve(true);
          }
        } else {
          resolve(true);
        }
      })
      .catch(error => {
        reject(error);
      });
    });
  },
  checkChannelAvailability (name) {
    return new Promise((resolve, reject) => {
      // find any records where the name is used
      db.Channel.findAll({ where: { channelName: name } })
        .then(result => {
          if (result.length >= 1) {
            return resolve(false);
          }
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};
