const logger = require('winston');
const fs = require('fs');
const config = require('../config/speechConfig.js');

module.exports = {
  parsePublishApiRequestBody ({name, nsfw, license, title, description, thumbnail}) {
    // validate name
    if (!name) {
      throw new Error('no name field found in request');
    }
    const invalidNameCharacters = /[^A-Za-z0-9,-]/.exec(name);
    if (invalidNameCharacters) {
      throw new Error('The claim name you provided is not allowed.  Only the following characters are allowed: A-Z, a-z, 0-9, and "-"');
    }
    // optional parameters
    nsfw = (nsfw === 'true');
    license = license || null;
    title = title || null;
    description = description || null;
    thumbnail = thumbnail || null;
    // return results
    return {
      name,
      nsfw,
      license,
      title,
      description,
      thumbnail,
    };
  },
  parsePublishApiRequestFiles ({file}) {
    // make sure a file was provided
    if (!file) {
      throw new Error('no file with key of [file] found in request');
    }
    if (!file.path) {
      throw new Error('no file path found');
    }
    if (!file.type) {
      throw new Error('no file type found');
    }
    if (!file.size) {
      throw new Error('no file type found');
    }
    // validate the file name
    if (/'/.test(file.name)) {
      logger.debug('publish > file validation > file name had apostrophe in it');
      throw new Error('apostrophes are not allowed in the file name');
    }
    // validate the file
    module.exports.validateFileTypeAndSize(file);
    // return results
    return {
      fileName: file.name,
      filePath: file.path,
      fileType: file.type,
    };
  },
  parsePublishApiChannel ({channelName, channelPassword}, user) {
    let anonymous = (channelName === null || channelName === undefined || channelName === '');
    if (user) {
      channelName = user.channelName || null;
    } else {
      channelName = channelName || null;
    }
    channelPassword = channelPassword || null;
    let skipAuth = false;
    // case 1: publish from spee.ch, client logged in
    if (user) {
      skipAuth = true;
      if (anonymous) {
        channelName = null;
      }
      // case 2: publish from api or spee.ch, client not logged in
    } else {
      if (anonymous) {
        skipAuth = true;
        channelName = null;
      }
    }
    // cleanse channel name
    if (channelName) {
      if (channelName.indexOf('@') !== 0) {
        channelName = `@${channelName}`;
      }
    }
    return {
      channelName,
      channelPassword,
      skipAuth,
    };
  },
  validateFileTypeAndSize (file) {
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

};
