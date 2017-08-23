const lbryApi = require('../helpers/lbryApi.js');
const db = require('../models');
const logger = require('winston');
const { getTopFreeClaim, getFullClaimIdFromShortId, resolveAgainstClaimTable, getClaimIdByChannel } = require('../helpers/serveHelpers.js');

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

function getAssetByClaimId (fullClaimId, name) {
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
      resolveAgainstClaimTable(name, fullClaimId)
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
  getAssetByChannel (channelName, channelId, claimName) {
    logger.debug('channelId =', channelId);
    return new Promise((resolve, reject) => {
      getClaimIdByChannel(channelName, channelId, claimName)
      .then(claimId => {
        logger.debug('claim id = ', claimId);
        resolve(getAssetByClaimId(claimId, claimName));
      })
      .catch(error => {
        reject(error);
      });
    });
  },
  getAssetByShortId: function (shortId, name) {
    logger.debug('...getting asset by short id...');
    return new Promise((resolve, reject) => {
      // get the full claimId
      getFullClaimIdFromShortId(shortId, name)
      // get the asset by the claimId
      .then(claimId => {
        logger.debug('claim id =', claimId);
        resolve(getAssetByClaimId(claimId, name));
      })
      .catch(error => {
        reject(error);
      });
    });
  },
  getAssetByClaimId (fullClaimId, name) {
    return getAssetByClaimId(fullClaimId, name);
  },
  getAssetByName (name) {
    logger.debug('...getting asset by claim name...');
    return new Promise((resolve, reject) => {
      // 1. get a list of the free public claims
      getTopFreeClaim(name)
      // 2. check locally for the top claim
      .then(topFreeClaim => {
        // if no claims were found, return null
        if (!topFreeClaim) {
          return resolve(null);
        }
        // parse the result
        const claimId = topFreeClaim.claimId;
        logger.debug('top free claim id =', claimId);
        // get the asset
        resolve(getAssetByClaimId(claimId, name));
      })
      .catch(error => {
        reject(error);
      });
    });
  },
  getChannelByName (name) {
    logger.debug('...getting channel by channel name...');
    return new Promise((resolve, reject) => {
      reject(new Error('This feature is not yet supported'));
    });
  },
};
