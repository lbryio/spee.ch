const axios = require('axios');
const db = require('../../models');
const logger = require('winston');

function createFilesRecord (name, claimId, outpoint, fileName, filePath, fileType, nsfw) {
  db.File
    .create({ name, claimId, outpoint, fileName, filePath, fileType, nsfw })
    .catch(error => {
      logger.error(`Sequelize File.create error`, error);
    });
}

module.exports = {
  publishClaim (publishParams, fileName, fileType) {
    logger.debug(`Publishing claim for "${fileName}"`);
    const deferred = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'publish',
          params: publishParams,
        })
        .then(response => {
          const result = response.data.result;
          createFilesRecord(
            publishParams.name, result.claim_id, `${result.txid}:${result.nout}`, fileName, publishParams.file_path, fileType, publishParams.metadata.nsfw);
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
    return deferred;
  },
  getClaim (uri) {
    logger.debug(`Getting Claim for "${uri}"`);
    const deferred = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'get',
          params: { uri, timeout: 30 },
        })
        .then(({ data }) => {
          // check to make sure the daemon didn't just time out
          if (!data.result) {
            reject(JSON.stringify(data));
          }
          if (data.result.error) {
            reject(data.result.error);
          }
          /*
            note: put in a check to make sure we do not resolve until the download is actually complete (response.data.completed === true)
          */
          // save a record of the file to the Files table
          const result = data.result;
          createFilesRecord(
            result.name, result.claim_id, result.outpoint, result.file_name, result.download_path, result.mime_type, result.metadata.stream.metadata.nsfw);
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
    return deferred;
  },
  getClaimsList (claimName) {
    logger.debug(`Getting Claim List for "${claimName}"`);
    const deferred = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'claim_list',
          params: { name: claimName },
        })
        .then(({ data }) => {
          resolve(data.result);
        })
        .catch(error => {
          reject(error);
        });
    });
    return deferred;
  },
  resolveUri (uri) {
    logger.debug(`Resolving URI for "${uri}"`);
    const deferred = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'resolve',
          params: { uri },
        })
        .then(({ data }) => {
          resolve(data.result);
        })
        .catch(error => {
          reject(error);
        });
    });
    return deferred;
  },
};
