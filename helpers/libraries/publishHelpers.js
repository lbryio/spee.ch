const logger = require('winston');
const config = require('config');
const fs = require('fs');

module.exports = {
  validateFile (file, name, license, nsfw) {
    if (!file) {
      throw new Error('No file was submitted or the key used was incorrect.  Files posted through this route must use a key of "speech" or null');
    }
    // check file type and size
    var magic = require('magic-number');
    switch (magic.detectFile('file')) {
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
        if (file.size > 50000000) {
          throw new Error('Your image exceeds the 50 megabyte limit.');
        }
        break;
      case 'video/mp4':
        if (file.size > 50000000) {
          throw new Error('Your video exceeds the 50 megabyte limit.');
        }
        break;
      default:
        throw new Error('The ' + magic.detectFile('file') + ' content type is not supported.  Only, .jpeg, .png, .gif, and .mp4 files are currently supported.');
    }
    // validate claim name
    const invalidCharacters = /[^A-Za-z0-9,-]/.exec(name);
    if (invalidCharacters) {
      throw new Error('The claim name you provided is not allowed.  Only the following characters are allowed: A-Z, a-z, 0-9, and "-"');
    }
    // validate license
    if ((license.indexOf('Public Domain') === -1) && (license.indexOf('Creative Commons') === -1) && (license.indecOf('CC Attribution-NonCommercial 4.0 International') === -1)) {
      throw new Error('Only posts with a "Public Domain" license,  or one of the Creative Commons licenses are eligible for publishing through spee.ch');
    }
    switch (nsfw) {
      case true:
      case false:
      case 'true':
      case 'false':
      case 'on':
      case 'off':
      case 0:
      case '0':
      case 1:
      case '1':
        break;
      default:
        throw new Error('NSFW value was not accepted.  NSFW must be set to either true, false, "on", or "off"');
    }
  },
  createPublishParams (name, filePath, license, nsfw) {
    logger.debug(`Creating Publish Parameters for "${name}"`);
    const claimAddress = config.get('WalletConfig.LbryClaimAddress');
    // filter nsfw and ensure it is a boolean
    if (nsfw === false) {
      nsfw = false;
    } else if (nsfw.toLowerCase === 'false') {
      nsfw = false;
    } else if (nsfw.toLowerCase === 'off') {
      nsfw = false;
    } else if (nsfw === 0) {
      nsfw = false;
    } else if (nsfw === '0') {
      nsfw = false;
    } else {
      nsfw = true;
    }
    const publishParams = {
      name,
      file_path: filePath,
      bid      : 0.01,
      metadata : {
        description: `${name} published via spee.ch`,
        title      : name,
        author     : 'spee.ch',
        language   : 'en',
        license,
        nsfw,
      },
      claim_address: claimAddress,
      // change_address: changeAddress,
    };
    logger.debug('publishParams:', publishParams);
    return publishParams;
  },
  deleteTemporaryFile (filePath) {
    fs.unlink(filePath, err => {
      if (err) throw err;
      logger.debug(`successfully deleted ${filePath}`);
    });
  },
};
