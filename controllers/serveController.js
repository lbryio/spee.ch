const lbryApi = require('../helpers/lbryApi.js');
const db = require('../models');
const logger = require('winston');
const { serveFile, showFile, showFileLite } = require('../helpers/serveHelpers.js');
const { postToStats, sendGoogleAnalytics } = require('../controllers/statsController.js');

const SERVE = 'SERVE';
const SHOW = 'SHOW';
const SHOWLITE = 'SHOWLITE';

function checkForLocalAssetByClaimId (claimId, name) {
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
        return resolve(dataValues);
      }
      logger.debug('no local file found for this name and claimId');
      // 2. if no local claim, resolve and get the claim
      db
        .resolveClaim(name, fullClaimId)
        .then(resolveResult => {
          logger.debug('resolve result >> ', resolveResult);
          // if no result, return early (claim doesn't exist or isn't free)
          if (!resolveResult) {
            return resolve(null);
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
          .then(fileRecordResults => {
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

module.exports = {
  getAssetByClaim (claimName, claimId) {
    logger.debug('getting asset by claim');
    return new Promise((resolve, reject) => {
      // 1. get the long claim id
      db
        .getLongClaimId(claimName, claimId)
        // 2. get the claim Id
        .then(longClaimId => {
          logger.debug('long claim id = ', longClaimId);
          resolve(getAssetByLongClaimId(longClaimId, claimName));
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getAssetByChannel (channelName, channelId, claimName) {
    logger.debug('getting asset by channel');
    return new Promise((resolve, reject) => {
      // 1. get the long channel id
      db
        .getLongChannelId(channelName, channelId)
        // 2. get the claim Id
        .then(longChannelId => {
          return db.getClaimIdByLongChannelId(longChannelId, claimName);
        })
        // 3. get the asset by this claim id and name
        .then(claimId => {
          logger.debug('asset claim id = ', claimId);
          resolve(getAssetByLongClaimId(claimId, claimName));
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
      // 1. get the long channel Id
      db
        .getLongChannelId(channelName, channelId)
        // 2. get all claims for that channel
        .then(result => {
          longChannelId = result;
          return db.getShortChannelIdFromLongChannelId(channelName, longChannelId);
        })
        // 3. get all Claim records for this channel
        .then(result => {
          shortChannelId = result;
          return db.getAllChannelClaims(longChannelId);
        })
        // 4. add extra data not available from Claim table
        .then(allChannelClaims => {
          if (allChannelClaims) {
            allChannelClaims.forEach(element => {
              const fileExtenstion = element.contentType.substring(element.contentType.lastIndexOf('/') + 1);
              element['showUrlLong'] = `/${channelName}:${longChannelId}/${element.name}`;
              element['showUrlShort'] = `/${channelName}:${shortChannelId}/${element.name}`;
              element['directUrlLong'] = `/${channelName}:${longChannelId}/${element.name}.${fileExtenstion}`;
              element['directUrlShort'] = `/${channelName}:${shortChannelId}/${element.name}.${fileExtenstion}`;
            });
          }
          return resolve(allChannelClaims);
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
            fileInfo['title'] = resolveResult.title;
            fileInfo['description'] = resolveResult.description;
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
