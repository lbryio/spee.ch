const logger = require('winston');
const fs = require('fs');
const { site, wallet, publish } = require('../config/speechConfig.js');

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
  parsePublishApiRequestFiles ({file, thumbnail}) {
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
      throw new Error('apostrophes are not allowed in the file name');
    }
    // validate the file
    module.exports.validateFileTypeAndSize(file);
    // return results
    return {
      fileName         : file.name,
      filePath         : file.path,
      fileType         : file.type,
      thumbnailFileName: (thumbnail ? thumbnail.name : null),
      thumbnailFilePath: (thumbnail ? thumbnail.path : null),
      thumbnailFileType: (thumbnail ? thumbnail.type : null),
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
      case 'video/ogg':
        if (file.size > 50000000) {
          logger.debug('publish > file validation > .ogg was too big');
          throw new Error('Sorry, videos are limited to 50 megabytes.');
        }
        break;
      case 'video/webm':
        if (file.size > 50000000) {
          logger.debug('publish > file validation > .webm was too big');
          throw new Error('Sorry, videos are limited to 50 megabytes.');
        }
        break;
      default:
        logger.debug('publish > file validation > unrecognized file type');
        throw new Error('The ' + file.type + ' content type is not supported.  Only, .jpeg, .png, .gif, .mp4, .ogg, and .webm  files are currently supported.');
    }
    return file;
  },
  createBasicPublishParams (filePath, name, title, description, license, nsfw, thumbnail) {
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
        author  : site.title,
        language: 'en',
        license,
        nsfw,
      },
      claim_address: wallet.lbryClaimAddress,
    };
    // add thumbnail to channel if video
    if (thumbnail) {
      publishParams['metadata']['thumbnail'] = thumbnail;
    }
    return publishParams;
  },
  createThumbnailPublishParams (thumbnailFilePath, claimName, license, nsfw) {
    if (!thumbnailFilePath) {
      return;
    }
    logger.debug(`Creating Thumbnail Publish Parameters`);
    // create the publish params
    return {
      name     : `${claimName}-thumb`,
      file_path: thumbnailFilePath,
      bid      : 0.01,
      metadata : {
        title      : `${claimName} thumbnail`,
        description: `a thumbnail for ${claimName}`,
        author     : site.title,
        language   : 'en',
        license,
        nsfw,
      },
      claim_address: wallet.lbryClaimAddress,
      channel_name : publish.thumbnailChannel,
      channel_id   : publish.thumbnailChannelId,
    };
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
  addGetResultsToFileData (fileInfo, getResult) {
    fileInfo.fileName = getResult.file_name;
    fileInfo.filePath = getResult.download_path;
    return fileInfo;
  },
  createFileData ({ name, claimId, outpoint, height, address, nsfw, contentType }) {
    return {
      name,
      claimId,
      outpoint,
      height,
      address,
      fileName: '',
      filePath: '',
      fileType: contentType,
      nsfw,
    };
  },
};
