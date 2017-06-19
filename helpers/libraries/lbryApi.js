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
    logger.silly(`publishClaim start for ${fileName}`);
    const deferred = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'publish',
          params: publishParams,
        })
        .then(response => {
          logger.silly(`publishClaim success for ${fileName}`);
          const result = response.data.result;
          createFilesRecord(
            publishParams.name, result.claim_id, `${result.txid}:${result.nout}`, fileName, publishParams.file_path, fileType, publishParams.metadata.nsfw);
          resolve(result);
        })
        .catch(error => {
          logger.error(`publishClaim error for ${fileName}`, error);
          reject(error);
        });
    });
    return deferred;
  },
  getClaim (uri) {
    logger.silly(`getClaim start for ${uri}`);
    const deferred = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'get',
          params: { uri, timeout: 30 },
        })
        .then(({ data }) => {
          logger.silly(`getClaim success for ${uri}`);
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
          logger.error(`getClaim error for ${uri}`, error);
          reject(error);
        });
    });
    return deferred;
  },
  getClaimsList (claimName) {
    logger.silly(`getClaimsList start for ${claimName}`);
    const deferred = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'claim_list',
          params: { name: claimName },
        })
        .then(({ data }) => {
          logger.silly(`getClaimsList success for ${claimName}`);
          resolve(data.result);
        })
        .catch(error => {
          logger.error(`getClaimsList error for ${claimName}`, error);
          reject(error);
        });
    });
    return deferred;
  },
  resolveUri (uri) {
    logger.silly(`resolveUri start for ${uri}`);
    const deferred = new Promise((resolve, reject) => {
      axios
        .post('http://localhost:5279/lbryapi', {
          method: 'resolve',
          params: { uri },
        })
        .then(({ data }) => {
          logger.silly(`resolveUri success for ${uri}`);
          resolve(data.result);
        })
        .catch(error => {
          logger.error(`resolveUri error for ${uri}`, error);
          reject(error);
        });
    });
    return deferred;
  },
};
