const logger = require('winston');
const db = require('../models');
const lbryApi = require('../helpers/lbryApi.js');
const publishHelpers = require('../helpers/publishHelpers.js');
const config = require('../config/speechConfig.js');

module.exports = {
  publish (publishParams, fileName, fileType) {
    return new Promise((resolve, reject) => {
      let publishResults, certificateId, channelName;
      // publish the file
      return lbryApi.publishClaim(publishParams)
      .then(tx => {
        logger.info(`Successfully published ${fileName}`, tx);
        publishResults = tx;
        // get the channel information
        if (publishParams.channel_name) {
          logger.debug(`this claim was published in channel: ${publishParams.channel_name}`);
          return db.Channel.findOne({where: {channelName: publishParams.channel_name}});
        } else {
          logger.debug('this claim was published in channel: n/a');
          return null;
        }
      })
      .then(channel => {
        // set channel information
        certificateId = null;
        channelName = null;
        if (channel) {
          certificateId = channel.channelClaimId;
          channelName = channel.channelName;
        }
        logger.debug(`certificateId: ${certificateId}`);
      })
      .then(() => {
        // create the File record
        const fileRecord = {
          name       : publishParams.name,
          claimId    : publishResults.claim_id,
          title      : publishParams.metadata.title,
          description: publishParams.metadata.description,
          address    : publishParams.claim_address,
          outpoint   : `${publishResults.txid}:${publishResults.nout}`,
          height     : 0,
          fileName,
          filePath   : publishParams.file_path,
          fileType,
          nsfw       : publishParams.metadata.nsfw,
        };
        // create the Claim record
        const claimRecord = {
          name       : publishParams.name,
          claimId    : publishResults.claim_id,
          title      : publishParams.metadata.title,
          description: publishParams.metadata.description,
          address    : publishParams.claim_address,
          thumbnail  : publishParams.metadata.thumbnail,
          outpoint   : `${publishResults.txid}:${publishResults.nout}`,
          height     : 0,
          contentType: fileType,
          nsfw       : publishParams.metadata.nsfw,
          amount     : publishParams.bid,
          certificateId,
          channelName,
        };
        // upsert criteria
        const upsertCriteria = {
          name   : publishParams.name,
          claimId: publishResults.claim_id,
        };
        // upsert the records
        return Promise.all([db.upsert(db.File, fileRecord, upsertCriteria, 'File'), db.upsert(db.Claim, claimRecord, upsertCriteria, 'Claim')]);
      })
      .then(([file, claim]) => {
        logger.debug('File and Claim records successfully created');
        return Promise.all([file.setClaim(claim), claim.setFile(file)]);
      })
      .then(() => {
        logger.debug('File and Claim records successfully associated');
        resolve(publishResults); // resolve the promise with the result from lbryApi.publishClaim;
      })
      .catch(error => {
        publishHelpers.deleteTemporaryFile(publishParams.file_path); // delete the local file
        reject(error);
      });
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
