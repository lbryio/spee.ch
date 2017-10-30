const lbryApi = require('../helpers/lbryApi.js');
const db = require('../models');
const logger = require('winston');
const { serveFile, showFile, showFileLite } = require('../helpers/serveHelpers.js');
const { postToStats, sendGoogleAnalytics } = require('../controllers/statsController.js');

const SERVE = 'SERVE';
const SHOW = 'SHOW';
const SHOWLITE = 'SHOWLITE';
const DEFAULT_THUMBNAIL = 'https://spee.ch/assets/img/video_thumb_default.png';
const NO_CHANNEL = 'NO_CHANNEL';
const NO_CLAIM = 'NO_CLAIM';

function checkForLocalAssetByClaimId (claimId, name) {
  logger.debug(`checkForLocalAssetsByClaimId(${claimId}, ${name}`);
  return new Promise((resolve, reject) => {
    db.File
      .findOne({where: { name, claimId }})
      .then(result => {
        if (result) {
          resolve(result.dataValues);
        } else {
          resolve(null);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

function addGetResultsToFileRecord (fileInfo, getResult) {
  fileInfo.fileName = getResult.file_name;
  fileInfo.filePath = getResult.download_path;
  fileInfo.fileType = getResult.mime_type;
  return fileInfo;
}

function createFileRecord ({ name, claimId, outpoint, height, address, nsfw }) {
  return {
    name,
    claimId,
    outpoint,
    height,
    address,
    fileName: '',
    filePath: '',
    fileType: '',
    nsfw,
  };
}

function getAssetByLongClaimId (fullClaimId, name) {
  logger.debug('...getting asset by claim Id...');
  return new Promise((resolve, reject) => {
    // 1. check locally for claim
    checkForLocalAssetByClaimId(fullClaimId, name)
    .then(dataValues => {
      // if a result was found, return early with the result
      if (dataValues) {
        logger.debug('found a local file for this name and claimId');
        resolve(dataValues);
        return;
      }
      logger.debug('no local file found for this name and claimId');
      // 2. if no local claim, resolve and get the claim
      db
        .resolveClaim(name, fullClaimId)
        .then(resolveResult => {
          logger.debug('resolve result >> ', resolveResult);
          // if no result, return early (claim doesn't exist or isn't free)
          if (!resolveResult) {
            resolve(NO_CLAIM);
            return;
          }
          let fileRecord = {};
          // get the claim
          lbryApi.getClaim(`${name}#${fullClaimId}`)
          .then(getResult => {
            logger.debug('getResult >>', getResult);
            fileRecord = createFileRecord(resolveResult);
            fileRecord = addGetResultsToFileRecord(fileRecord, getResult);
            // insert a record in the File table & Update Claim table
            return db.File.create(fileRecord);
          })
          .then(() => {
            logger.debug('File record successfully updated');
            resolve(fileRecord);
          })
          .catch(error => {
            reject(error);
          });
        })
        .catch(error => {
          reject(error);
        });
    })
    .catch(error => {
      reject(error);
    });
  });
}

function chooseThumbnail (claimInfo, defaultThumbnail) {
  if (!claimInfo.thumbnail || claimInfo.thumbnail.trim() === '') {
    return defaultThumbnail;
  }
  return claimInfo.thumbnail;
}

module.exports = {
  getAssetByClaim (claimName, claimId) {
    logger.debug(`getAssetByClaim(${claimName}, ${claimId})`);
    return new Promise((resolve, reject) => {
      db.getLongClaimId(claimName, claimId) // 1. get the long claim id
        .then(result => {  // 2. get the asset using the long claim id
          logger.debug('getLongClaimId result:', result);
          if (result === NO_CLAIM) {
            logger.debug('resolving NO_CLAIM');
            resolve(NO_CLAIM);
            return;
          }
          resolve(getAssetByLongClaimId(result, claimName));
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getAssetByChannel (channelName, channelId, claimName) {
    logger.debug('getting asset by channel');
    return new Promise((resolve, reject) => {
      db.getLongChannelId(channelName, channelId) // 1. get the long channel id
        .then(result => { // 2. get the long claim Id
          if (result === NO_CHANNEL) {
            resolve(NO_CHANNEL);
            return;
          }
          return db.getClaimIdByLongChannelId(result, claimName);
        })
        .then(result => { // 3. get the asset using the long claim id
          logger.debug('asset claim id =', result);
          if (result === NO_CHANNEL || result === NO_CLAIM) {
            resolve(result);
            return;
          }
          resolve(getAssetByLongClaimId(result, claimName));
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getChannelContents (channelName, channelId) {
    return new Promise((resolve, reject) => {
      let longChannelId;
      let shortChannelId;
      db.getLongChannelId(channelName, channelId)  // 1. get the long channel Id
        .then(result => {  // 2. get all claims for that channel
          if (result === NO_CHANNEL) {
            return NO_CHANNEL;
          }
          longChannelId = result;
          return db.getShortChannelIdFromLongChannelId(longChannelId, channelName);
        })
        .then(result => {  // 3. get all Claim records for this channel
          if (result === NO_CHANNEL) {
            return NO_CHANNEL;
          }
          shortChannelId = result;
          return db.getAllChannelClaims(longChannelId);
        })
        .then(result => {  // 4. add extra data not available from Claim table
          if (result === NO_CHANNEL) {
            resolve(NO_CHANNEL);
            return;
          }
          if (result) {
            result.forEach(element => {
              const fileExtenstion = element.contentType.substring(element.contentType.lastIndexOf('/') + 1);
              element['showUrlLong'] = `/${channelName}:${longChannelId}/${element.name}`;
              element['directUrlLong'] = `/${channelName}:${longChannelId}/${element.name}.${fileExtenstion}`;
              element['showUrlShort'] = `/${channelName}:${shortChannelId}/${element.name}`;
              element['directUrlShort'] = `/${channelName}:${shortChannelId}/${element.name}.${fileExtenstion}`;
              element['thumbnail'] = chooseThumbnail(element, DEFAULT_THUMBNAIL);
            });
          }
          resolve({
            channelName,
            longChannelId,
            shortChannelId,
            claims: result,
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  serveOrShowAsset (fileInfo, extension, method, headers, originalUrl, ip, res) {
    // add file extension to the file info
    if (extension === 'gifv') {
      fileInfo['fileExt'] = 'gifv';
    } else {
      fileInfo['fileExt'] = fileInfo.fileName.substring(fileInfo.fileName.lastIndexOf('.') + 1);
    }
    // add stats table
    postToStats(method, originalUrl, ip, fileInfo.name, fileInfo.claimId, 'success');
    // serve or show
    switch (method) {
      case SERVE:
        serveFile(fileInfo, res);
        sendGoogleAnalytics(method, headers, ip, originalUrl);
        return fileInfo;
      case SHOWLITE:
        showFileLite(fileInfo, res);
        return fileInfo;
      case SHOW:
        return db
          .getShortClaimIdFromLongClaimId(fileInfo.claimId, fileInfo.name)
          .then(shortId => {
            fileInfo['shortId'] = shortId;
            return db.resolveClaim(fileInfo.name, fileInfo.claimId);
          })
          .then(resolveResult => {
            logger.debug('resolve result >>', resolveResult);
            fileInfo['thumbnail'] = chooseThumbnail(resolveResult, DEFAULT_THUMBNAIL);
            fileInfo['title'] = resolveResult.title;
            fileInfo['description'] = resolveResult.description;
            if (resolveResult.certificateId) { fileInfo['certificateId'] = resolveResult.certificateId };
            if (resolveResult.channelName) { fileInfo['channelName'] = resolveResult.channelName };
            showFile(fileInfo, res);
            return fileInfo;
          })
          .catch(error => {
            logger.error('throwing serve/show error...');
            throw error;
          });
      default:
        logger.error('I did not recognize that method');
        break;
    }
  },
};
